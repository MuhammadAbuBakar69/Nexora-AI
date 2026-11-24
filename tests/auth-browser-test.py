"""Browser-level authentication tests for Nexora against the live Supabase project.

Runs against http://localhost:3000 (production build) and project
khzziddzqrbzugoucmjd. Real Supabase Auth throughout: no mocks, no fake redirects.

Email delivery note: this project has no custom SMTP, and Supabase hard-caps the
built-in mailer at 2 emails/hour (rate_limit_email_sent cannot be raised above 2
without custom SMTP). Two consequences, both handled explicitly:
  * the UI signup test temporarily enables mailer_autoconfirm so the account is
    created without sending mail, then restores the setting in a finally block;
  * email verification is exercised through the real verification token and the
    /auth/callback route, which does not require an SMTP round trip.
"""
import json, os, time, urllib.request, urllib.error
from playwright.sync_api import sync_playwright

REF = "khzziddzqrbzugoucmjd"
SB = f"https://{REF}.supabase.co"
APP = "http://localhost:3000"
PUB = os.environ.get("SUPABASE_PUBLISHABLE_KEY") or open("/tmp/supapub.txt").read().strip()
SVC = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or open("/tmp/svckey.txt").read().strip()
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
PW = "NexoraTest!2026"
NEW_PW = "NexoraReset!2026"
STAMP = int(time.time())
SIGNUP_EMAIL = f"qa.signup.{STAMP}@nexoraqa.dev"
LOGIN_EMAIL = f"qa.login.{STAMP}@nexoraqa.dev"
VERIFY_EMAIL = f"qa.verify.{STAMP}@nexoraqa.dev"
RECOVERY_EMAIL = f"qa.recovery.{STAMP}@nexoraqa.dev"

results = []


def rec(name, status, detail=""):
    results.append((name, status, detail))
    print(f"[{status:7}] {name}: {detail}", flush=True)


def sql(q):
    req = urllib.request.Request(
        f"https://api.supabase.com/v1/projects/{REF}/database/query",
        data=json.dumps({"query": q}).encode(),
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read() or b"[]")


def auth_admin(path, body, method="POST"):
    req = urllib.request.Request(
        SB + path,
        data=json.dumps(body).encode(),
        headers={"apikey": SVC, "Authorization": f"Bearer {SVC}", "Content-Type": "application/json"},
        method=method,
    )
    try:
        with urllib.request.urlopen(req) as r:
            return True, json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        return False, e.read().decode()[:300]


def config_auth(patch):
    req = urllib.request.Request(
        f"https://api.supabase.com/v1/projects/{REF}/config/auth",
        data=json.dumps(patch).encode(),
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
        method="PATCH",
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read() or b"{}")


def get_config():
    req = urllib.request.Request(
        f"https://api.supabase.com/v1/projects/{REF}/config/auth",
        headers={"Authorization": f"Bearer {TOKEN}"},
        method="GET",
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read() or b"{}")


def password_login(email, password):
    req = urllib.request.Request(
        f"{SB}/auth/v1/token?grant_type=password",
        data=json.dumps({"email": email, "password": password}).encode(),
        headers={"apikey": PUB, "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as r:
            return True, json.loads(r.read())
    except urllib.error.HTTPError as e:
        return False, e.read().decode()[:200]


def make_user(email, name, confirm=True):
    ok, res = auth_admin("/auth/v1/admin/users", {
        "email": email, "password": PW, "email_confirm": confirm,
        "user_metadata": {"full_name": name},
    })
    if not ok:
        rec(f"fixture: {email}", "FAIL", res)
    return res


def login(page, email, password, wait=6000):
    page.goto(f"{APP}/login", wait_until="networkidle")
    page.fill("#email", email)
    page.fill("#password", password)
    page.get_by_role("button", name="Sign In to Console").click()
    page.wait_for_timeout(wait)


# ---------------------------------------------------------------- fixtures
make_user(LOGIN_EMAIL, "QA Login Customer", confirm=True)
make_user(VERIFY_EMAIL, "QA Verify Customer", confirm=False)
make_user(RECOVERY_EMAIL, "QA Recovery Customer", confirm=True)

with sync_playwright() as p:
    browser = p.chromium.launch()

    # ------------------------------------------------------------- SIGNUP UI
    # Temporarily bypass email sending (the built-in SMTP is hard-capped at
    # 2/hour) and wait for the setting to propagate before testing.
    try:
        config_auth({"mailer_autoconfirm": True})
        for _ in range(25):
            if get_config().get("mailer_autoconfirm") is True:
                break
            time.sleep(1)
        # The management API reports the new value before the auth service
        # actually honours it, so allow it to settle before the first attempt.
        time.sleep(10)

        sctx = browser.new_context()
        sp = sctx.new_page()
        for attempt in range(1, 4):
            sp.goto(f"{APP}/signup", wait_until="networkidle")
            sp.fill("#fullName", "QA Signup User")
            sp.fill("#email", SIGNUP_EMAIL)
            sp.fill("#password", PW)
            sp.fill("#confirmPassword", PW)
            sp.locator('input[type="checkbox"]').check()
            sp.get_by_role("button", name="Create Account").click()
            sp.wait_for_timeout(6000)
            if "rate limit" not in sp.inner_text("body").lower():
                break
            print(f"    (signup attempt {attempt} hit the mailer cap, retrying)", flush=True)
            time.sleep(8)

        if "/dashboard" in sp.url:
            rec("Signup: account created and session established", "PASS",
                "UI signup reached /dashboard with a real session")
        else:
            rec("Signup: account created", "FAIL", f"landed {sp.url} :: {sp.inner_text('body')[:120]}")

        row = sql(f"select p.email, p.full_name, o.name as org, "
                  f"(select count(*) from public.user_roles r where r.user_id=p.id and r.role='customer') as cust, "
                  f"(select count(*) from public.user_roles r where r.user_id=p.id and r.role='admin') as adm "
                  f"from public.profiles p left join public.organizations o on o.id=p.organization_id "
                  f"where p.email='{SIGNUP_EMAIL}';")
        if row and row[0]["org"] and row[0]["cust"] == 1 and row[0]["adm"] == 0:
            rec("Signup: profile, organization and customer role provisioned", "PASS",
                f"org='{row[0]['org']}', customer=1, admin=0")
        else:
            rec("Signup: provisioning", "FAIL", json.dumps(row))
        sctx.close()

        # duplicate address must be rejected (own context, logged out)
        dctx = browser.new_context()
        dp = dctx.new_page()
        dp.goto(f"{APP}/signup", wait_until="networkidle")
        dp.fill("#fullName", "QA Duplicate")
        dp.fill("#email", SIGNUP_EMAIL)
        dp.fill("#password", PW)
        dp.fill("#confirmPassword", PW)
        dp.locator('input[type="checkbox"]').check()
        dp.get_by_role("button", name="Create Account").click()
        dp.wait_for_timeout(4000)
        body_d = dp.inner_text("body")
        # With confirmation enabled Supabase returns an obfuscated user (handled
        # as "already exists"); with autoconfirm it returns an explicit error.
        if "already exists" in body_d or "already registered" in body_d.lower():
            rec("Signup: duplicate email rejected", "PASS",
                "duplicate rejected with an explicit message")
        else:
            rec("Signup: duplicate email rejected", "FAIL", body_d[:120])
        dctx.close()

        # password length rule
        vctx1 = browser.new_context()
        v1 = vctx1.new_page()
        v1.goto(f"{APP}/signup", wait_until="networkidle")
        v1.fill("#fullName", "QA Short")
        v1.fill("#email", f"qa.short.{STAMP}@nexoraqa.dev")
        v1.fill("#password", "short")
        v1.fill("#confirmPassword", "short")
        v1.locator('input[type="checkbox"]').check()
        v1.get_by_role("button", name="Create Account").click()
        v1.wait_for_timeout(1200)
        rec("Signup: password length validation",
            "PASS" if "at least 8 characters" in v1.inner_text("body") else "FAIL",
            "rejected a 5-character password")
        vctx1.close()

        # confirmation mismatch rule
        vctx2 = browser.new_context()
        v2 = vctx2.new_page()
        v2.goto(f"{APP}/signup", wait_until="networkidle")
        v2.fill("#fullName", "QA Mismatch")
        v2.fill("#email", f"qa.mismatch.{STAMP}@nexoraqa.dev")
        v2.fill("#password", "LongEnough!2026")
        v2.fill("#confirmPassword", "Different!2026")
        v2.locator('input[type="checkbox"]').check()
        v2.get_by_role("button", name="Create Account").click()
        v2.wait_for_timeout(1200)
        rec("Signup: password confirmation mismatch",
            "PASS" if "do not match" in v2.inner_text("body") else "FAIL",
            "rejected mismatched passwords")
        vctx2.close()
    except Exception as e:
        rec("Signup UI", "FAIL", f"exception: {str(e)[:200]}")
    finally:
        restored = config_auth({"mailer_autoconfirm": False})
        print(f"    (restored mailer_autoconfirm={restored.get('mailer_autoconfirm')})", flush=True)

    # ------------------------------------------------ EMAIL VERIFICATION
    try:
        ok, link = auth_admin("/auth/v1/admin/generate_link",
                              {"type": "signup", "email": VERIFY_EMAIL, "password": PW})
        if not ok or "hashed_token" not in link:
            rec("Email verification", "BLOCKED", f"generate_link: {str(link)[:150]}")
        else:
            vctx = browser.new_context()
            vp = vctx.new_page()
            vp.goto(f"{APP}/auth/callback?token_hash={link['hashed_token']}&type=signup&next=/dashboard",
                    wait_until="networkidle")
            vp.wait_for_timeout(3000)
            confirmed = sql(f"select (email_confirmed_at is not null) as ok from auth.users where email='{VERIFY_EMAIL}';")
            if "/dashboard" in vp.url and confirmed and confirmed[0]["ok"]:
                rec("Email verification: token confirms account and opens session", "PASS",
                    f"landed {vp.url.replace(APP,'')}; email_confirmed_at set")
            else:
                rec("Email verification", "FAIL", f"landed {vp.url}, db={confirmed}")
            vctx.close()
    except Exception as e:
        rec("Email verification", "FAIL", f"exception: {e}")

    # ---------------------------------------------------------------- LOGIN
    ctx = browser.new_context()
    page = ctx.new_page()
    try:
        login(page, LOGIN_EMAIL, PW)
        if page.url.rstrip("/").endswith("/dashboard"):
            rec("Login: valid credentials reach the console", "PASS", "redirected to /dashboard")
        else:
            rec("Login: valid credentials", "FAIL", f"landed {page.url}")

        page.goto(f"{APP}/dashboard", wait_until="networkidle")
        page.wait_for_timeout(1200)
        rec("Session persistence after reload",
            "PASS" if "/dashboard" in page.url else "FAIL", page.url.replace(APP, ""))

        page.goto(f"{APP}/admin", wait_until="networkidle")
        page.wait_for_timeout(1500)
        rec("Route protection: customer denied /admin",
            "PASS" if page.url.rstrip("/").endswith("/dashboard") else "FAIL",
            f"landed {page.url.replace(APP,'')} (server-side role check)")

        # logout must actually terminate the session
        page.goto(f"{APP}/dashboard", wait_until="networkidle")
        page.get_by_label("Sign out").click()
        page.wait_for_timeout(5000)
        after = page.url
        page.goto(f"{APP}/dashboard", wait_until="networkidle")
        page.wait_for_timeout(1500)
        rec("Logout terminates the session",
            "PASS" if "/login" in after and "/login" in page.url else "FAIL",
            f"after logout={after.replace(APP,'')}, revisit={page.url.replace(APP,'')}")
    except Exception as e:
        rec("Login / session / logout", "FAIL", f"exception: {e}")
    ctx.close()

    # ------------------------------------------------ INVALID PASSWORD
    ctx = browser.new_context()
    page = ctx.new_page()
    try:
        login(page, LOGIN_EMAIL, "WrongPassword!999", wait=5000)
        body = page.inner_text("body")
        ok = "/login" in page.url and ("Incorrect email or password" in body or "Invalid login" in body)
        rec("Login: invalid password rejected", "PASS" if ok else "FAIL",
            "stayed on /login with an error" if ok else f"{page.url} :: {body[:120]}")
    except Exception as e:
        rec("Login: invalid password", "FAIL", f"exception: {e}")
    ctx.close()

    # ------------------------------------------- UNAUTHENTICATED GUARDS
    ctx = browser.new_context()
    page = ctx.new_page()
    try:
        page.goto(f"{APP}/dashboard", wait_until="networkidle")
        d = page.url
        page.goto(f"{APP}/admin", wait_until="networkidle")
        a = page.url
        rec("Route protection: unauthenticated /dashboard",
            "PASS" if "/login" in d and "next=%2Fdashboard" in d else "FAIL", d.replace(APP, ""))
        rec("Route protection: unauthenticated /admin",
            "PASS" if "/login" in a and "next=%2Fadmin" in a else "FAIL", a.replace(APP, ""))
    except Exception as e:
        rec("Unauthenticated guards", "FAIL", f"exception: {e}")
    ctx.close()

    # -------------------------------------------------- ADMIN ACCESS
    ctx = browser.new_context()
    page = ctx.new_page()
    try:
        login(page, "admin@nexora.test", PW)
        rec("Login: admin lands on the admin console",
            "PASS" if "/admin" in page.url else "FAIL", page.url.replace(APP, ""))

        page.goto(f"{APP}/admin", wait_until="networkidle")
        page.wait_for_timeout(1500)
        body = page.inner_text("body")
        ok = "/admin" in page.url and "ADMIN CONTROL" in body.upper()
        rec("Route protection: authorized admin allowed", "PASS" if ok else "FAIL",
            "admin console rendered" if ok else f"{page.url} :: {body[:100]}")
    except Exception as e:
        rec("Admin access", "FAIL", f"exception: {e}")
    ctx.close()

    # --------------------------------------------- PASSWORD RECOVERY
    try:
        rctx = browser.new_context()
        rp = rctx.new_page()
        rp.goto(f"{APP}/forgot-password", wait_until="networkidle")
        rp.fill("#resetEmail", RECOVERY_EMAIL)
        rp.get_by_role("button", name="Send Reset Instructions").click()
        rp.wait_for_timeout(4000)
        body = rp.inner_text("body")
        if "Check your inbox" in body:
            rec("Password recovery: request accepted", "PASS", "confirmation state shown")
        elif "rate limit" in body.lower():
            rec("Password recovery: request accepted", "BLOCKED",
                "built-in SMTP cap reached (2/hour); no custom SMTP configured")
        else:
            rec("Password recovery: request accepted", "FAIL", body[:140])

        ok, link = auth_admin("/auth/v1/admin/generate_link",
                              {"type": "recovery", "email": RECOVERY_EMAIL})
        if not ok or "hashed_token" not in link:
            rec("Password recovery: callback", "BLOCKED", str(link)[:150])
        else:
            rp.goto(f"{APP}/auth/callback?token_hash={link['hashed_token']}&type=recovery&next=/reset-password",
                    wait_until="networkidle")
            rp.wait_for_timeout(3000)
            if "/reset-password" in rp.url:
                rec("Password recovery: callback opens the reset form", "PASS",
                    rp.url.replace(APP, ""))
                rp.fill("#newPassword", NEW_PW)
                rp.fill("#confirmNewPassword", NEW_PW)
                rp.get_by_role("button", name="Update Password").click()
                rp.wait_for_timeout(4000)
                ok_saved = "Password updated" in rp.inner_text("body") or "/dashboard" in rp.url
                rec("Password recovery: new password saved", "PASS" if ok_saved else "FAIL",
                    "update accepted" if ok_saved else rp.inner_text("body")[:140])
            else:
                rec("Password recovery: callback", "FAIL", f"landed {rp.url}")
        rctx.close()

        ok_new, _ = password_login(RECOVERY_EMAIL, NEW_PW)
        ok_old, _ = password_login(RECOVERY_EMAIL, PW)
        rec("Password recovery: new password authenticates, old rejected",
            "PASS" if (ok_new and not ok_old) else "FAIL", f"new={ok_new} old={ok_old}")
    except Exception as e:
        rec("Password recovery", "FAIL", f"exception: {e}")

    browser.close()

print("\n" + "=" * 80)
passed = sum(1 for r in results if r[1] == "PASS")
failed = sum(1 for r in results if r[1] == "FAIL")
blocked = sum(1 for r in results if r[1] == "BLOCKED")
print(f"TOTAL {len(results)} | PASS {passed} | FAIL {failed} | BLOCKED {blocked}")
json.dump([{"test": n, "status": s, "detail": d} for n, s, d in results],
          open("/tmp/browser_results.json", "w"), indent=2)

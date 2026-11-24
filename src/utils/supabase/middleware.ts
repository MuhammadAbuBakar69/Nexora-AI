import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

const PROTECTED_PREFIXES = ["/dashboard", "/admin"] as const;

function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/** Copies refreshed auth cookies onto a redirect so the session is not lost. */
function redirectWithCookies(
  request: NextRequest,
  response: NextResponse,
  pathname: string,
  params?: Record<string, string>
): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  for (const [key, value] of Object.entries(params ?? {})) {
    url.searchParams.set(key, value);
  }
  const redirect = NextResponse.redirect(url);
  response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  return redirect;
}

/**
 * Refreshes the Supabase session cookie and enforces route protection.
 *
 * Identity comes from supabase.auth.getUser(), which validates the JWT against
 * the auth server. The admin check reads user_roles in Postgres through RLS, so
 * a tampered client-side role value cannot grant access.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({ request });

  const { url, key } = getSupabaseEnv();

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Do not remove: this call refreshes the session and is what makes the
  // cookie trustworthy for the rest of the request.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    matchesPrefix(pathname, prefix)
  );

  if (!user) {
    if (isProtected) {
      return redirectWithCookies(request, response, "/login", {
        next: pathname,
      });
    }
    return response;
  }

  const isAdmin = async (): Promise<boolean> => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (error) {
      // Fail closed: an unreadable role table must never grant admin access.
      console.error("admin role lookup failed:", error.message);
      return false;
    }
    return Boolean(data);
  };

  // Authenticated visitors have no business on the auth screens.
  if (pathname === "/login" || pathname === "/signup") {
    const admin = await isAdmin();
    return redirectWithCookies(
      request,
      response,
      admin ? "/admin" : "/dashboard"
    );
  }

  // Customers must never reach the admin console.
  if (matchesPrefix(pathname, "/admin")) {
    if (!(await isAdmin())) {
      return redirectWithCookies(request, response, "/dashboard");
    }
  }

  return response;
}

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { tryGetSupabaseEnv } from "@/lib/supabase/env";
import type { User } from "@supabase/supabase-js";

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
 *
 * Resilience guarantees:
 * 1. Public marketing routes (/, /pricing, /solutions, /developers, etc.) NEVER
 *    fail with HTTP 500 if Supabase is unconfigured, unreachable, or timing out.
 *    They safely render in guest mode.
 * 2. Protected routes (/dashboard, /admin) FAIL CLOSED: if identity or role
 *    cannot be definitively verified on the server, requests are redirected
 *    to /login without granting access.
 * 3. Never leaks tokens, keys, or stack traces to HTTP responses.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({ request });
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    matchesPrefix(pathname, prefix)
  );

  const env = tryGetSupabaseEnv();
  if (!env) {
    if (isProtected) {
      console.warn(
        `[auth-middleware] Fail-closed: access to protected route '${pathname}' redirected to /login (Supabase unconfigured).`
      );
      return redirectWithCookies(request, response, "/login", {
        next: pathname,
      });
    }
    // Public routes safely render in guest mode
    return response;
  }

  let user: User | null = null;
  let supabaseClient: ReturnType<typeof createServerClient> | null = null;

  try {
    const supabase = createServerClient(env.url, env.key, {
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

    supabaseClient = supabase;

    // Validate token against auth server and refresh cookies.
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      // Expected when no session cookie exists or session is expired
      user = null;
    } else {
      user = data.user;
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown auth error";
    console.error(
      `[auth-middleware] Session verification failed for '${pathname}': ${message}`
    );
    user = null;
  }

  if (!user || !supabaseClient) {
    if (isProtected) {
      return redirectWithCookies(request, response, "/login", {
        next: pathname,
      });
    }
    return response;
  }

  const client = supabaseClient;
  const currentUser = user;

  const isAdmin = async (): Promise<boolean> => {
    try {
      const { data, error } = await client
        .from("user_roles")
        .select("role")
        .eq("user_id", currentUser.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        // Fail closed: an unreadable role table must never grant admin access.
        console.error(
          `[auth-middleware] Admin role lookup failed for user ${currentUser.id}: ${error.message}`
        );
        return false;
      }
      return Boolean(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Role query exception";
      console.error(
        `[auth-middleware] Admin role query exception for user ${currentUser.id}: ${msg}`
      );
      return false;
    }
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

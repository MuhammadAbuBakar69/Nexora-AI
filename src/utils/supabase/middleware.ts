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
 * Resilience guarantees:
 * 1. ZERO-LATENCY GUEST CHECK: If no Supabase auth token cookies exist in the
 *    request headers, guest visitors on public routes and auth routes (/login, /signup)
 *    render instantaneously with 0ms overhead and zero external network calls.
 * 2. Protected routes (/dashboard, /admin) fail closed: if unauthenticated, they
 *    immediately redirect to /login?next=... without stalling or looping.
 * 3. Bounded network timeouts: Any token verification against Supabase is wrapped in
 *    a timeout to prevent slow remote connections from hanging RSC transitions.
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
      return redirectWithCookies(request, response, "/login", {
        next: pathname,
      });
    }
    return response;
  }

  // Fast-path: Check for actual Supabase authentication cookies
  const allCookies = request.cookies.getAll();
  const hasAuthCookie = allCookies.some(
    (c) =>
      c.name.startsWith("sb-") &&
      (c.name.includes("-auth-token") || c.name.includes("access-token"))
  );

  // If no auth cookie exists, visitor is definitively unauthenticated:
  if (!hasAuthCookie) {
    if (isProtected) {
      return redirectWithCookies(request, response, "/login", {
        next: pathname,
      });
    }
    // Public routes, /login, and /signup immediately continue with zero network calls
    return response;
  }

  // An auth cookie exists: validate token with bounded timeout
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

    // Validate token against auth server with a 3.5s timeout guard
    const authPromise = supabase.auth.getUser();
    const timeoutPromise = new Promise<{ data: { user: null }; error: Error }>((_, reject) =>
      setTimeout(() => reject(new Error("Supabase auth verification timed out")), 3500)
    );

    const result = (await Promise.race([authPromise, timeoutPromise])) as Awaited<typeof authPromise>;
    if (result.error) {
      user = null;
    } else {
      user = result.data.user;
    }
  } catch {
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
        return false;
      }
      return Boolean(data);
    } catch {
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

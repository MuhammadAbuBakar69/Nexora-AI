import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export interface SessionContext {
  userId: string;
  email: string | null;
  fullName: string | null;
  organizationId: string | null;
  isAdmin: boolean;
}

/**
 * Server-side session resolution. Always validates the token with
 * supabase.auth.getUser() rather than trusting the cookie payload, and reads the
 * role from public.user_roles so authorization is database-backed.
 */
export async function getSessionContext(): Promise<SessionContext | null> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const hasAuthCookie = allCookies.some(
    (c) =>
      c.name.startsWith("sb-") &&
      (c.name.includes("-auth-token") || c.name.includes("access-token"))
  );
  if (!hasAuthCookie) return null;

  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const [{ data: profile }, { data: adminRole }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, organization_id")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle(),
  ]);

  return {
    userId: user.id,
    email: user.email ?? null,
    fullName: profile?.full_name ?? null,
    organizationId: profile?.organization_id ?? null,
    isAdmin: Boolean(adminRole),
  };
}

/** Layout guard for the customer console. */
export async function requireUser(
  nextPath = "/dashboard"
): Promise<SessionContext> {
  const session = await getSessionContext();
  if (!session) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return session;
}

/** Layout guard for the admin console. Customers are sent to their own console. */
export async function requireAdmin(): Promise<SessionContext> {
  const session = await getSessionContext();
  if (!session) {
    redirect("/login?next=%2Fadmin");
  }
  if (!session.isAdmin) {
    redirect("/dashboard");
  }
  return session;
}

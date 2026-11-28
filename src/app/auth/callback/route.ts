import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

/**
 * Single entry point for Supabase email links (signup confirmation and password
 * recovery). Exchanges the one-time code for a session cookie, then forwards to
 * a same-origin path only.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const isLocal = process.env.NODE_ENV === "development";
  const baseUrl =
    !isLocal && forwardedHost ? `${forwardedProto}://${forwardedHost}` : origin;

  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const requestedNext = searchParams.get("next") ?? "/dashboard";

  // Never redirect off-site: only relative paths are accepted.
  const next =
    requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/dashboard";

  const failureRedirect = (reason: string) =>
    NextResponse.redirect(
      `${baseUrl}/login?auth_error=${encodeURIComponent(reason)}`
    );

  const providerError =
    searchParams.get("error_description") ?? searchParams.get("error");
  if (providerError) {
    return failureRedirect(providerError);
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return failureRedirect(error.message);
    return NextResponse.redirect(`${baseUrl}${next}`);
  }

  // Token-hash links (email OTP / recovery) can be verified directly.
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as "signup" | "recovery" | "email" | "magiclink" | "invite" | "email_change",
    });
    if (error) return failureRedirect(error.message);
    return NextResponse.redirect(`${baseUrl}${next}`);
  }

  return failureRedirect("The link is missing its verification code.");
}

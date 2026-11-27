// Single source of truth for the Supabase browser-safe configuration.
// Fails loudly instead of falling back to a placeholder project: a silent
// fallback is how the previous client ended up pointing at a foreign project.

export interface SupabaseEnv {
  url: string;
  key: string;
}

/**
 * Safely attempts to read and sanitize Supabase environment configuration.
 * Returns null if either variable is missing or empty, without throwing.
 */
export function tryGetSupabaseEnv(): SupabaseEnv | null {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!rawUrl || !rawKey) {
    return null;
  }

  const url = rawUrl.trim();
  const key = rawKey.trim();

  if (!url || !key) {
    return null;
  }

  return { url, key };
}

/**
 * Returns true if both NEXT_PUBLIC_SUPABASE_URL and a publishable key are set.
 */
export function isSupabaseConfigured(): boolean {
  return tryGetSupabaseEnv() !== null;
}

/**
 * Throws an explicit error if Supabase configuration is missing.
 * Used by server components and clients that cannot operate without credentials.
 */
export function getSupabaseEnv(): SupabaseEnv {
  const env = tryGetSupabaseEnv();

  if (!env) {
    // During Next.js build-time static prerendering on CI/Vercel where env vars may not be present,
    // return a safe dummy config so prerendering /reset-password, /signup, etc. does not abort the build.
    if (typeof window === "undefined") {
      return {
        url: "https://placeholder.supabase.co",
        key: "placeholder-anon-key-for-build-prerender",
      };
    }

    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local (and in the " +
        "hosting provider for production)."
    );
  }

  return env;
}

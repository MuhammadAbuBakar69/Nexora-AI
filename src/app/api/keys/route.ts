import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const ALLOWED_SCOPES = new Set([
  "read",
  "write",
  "models:chat",
  "models:embeddings",
  "models:video",
  "models:audio",
]);

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const rateLimitRpm = Number(body?.rateLimitRpm ?? 1000);
    const rawPermissions: unknown[] = Array.isArray(body?.permissions)
      ? body.permissions
      : [];

    if (!name || name.length > 120) {
      return NextResponse.json(
        { error: "Credential name must be between 1 and 120 characters." },
        { status: 400 }
      );
    }

    if (!Number.isInteger(rateLimitRpm) || rateLimitRpm < 1 || rateLimitRpm > 100000) {
      return NextResponse.json(
        { error: "Rate limit RPM must be an integer between 1 and 100,000." },
        { status: 400 }
      );
    }

    const permissions = rawPermissions
      .filter((p): p is string => typeof p === "string" && ALLOWED_SCOPES.has(p));

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError || !profile?.organization_id) {
      return NextResponse.json(
        { error: "Organization workspace not found for this account." },
        { status: 400 }
      );
    }

    // Cryptographically secure key generation; only SHA-256 hash is persisted.
    const randomHex = crypto.randomBytes(24).toString("hex");
    const secret = `nx_live_${randomHex}`;
    const prefix = secret.slice(0, 12);
    const lastFour = secret.slice(-4);
    const keyHash = crypto.createHash("sha256").update(secret).digest("hex");

    const { data: inserted, error: insertError } = await supabase
      .from("api_keys")
      .insert({
        organization_id: profile.organization_id,
        name,
        prefix,
        last_four: lastFour,
        key_hash: keyHash,
        permissions: permissions.length > 0 ? permissions : ["read", "models:chat"],
        status: "active",
        rate_limit_rpm: rateLimitRpm,
        created_by: user.id,
      })
      .select("id, name, prefix, last_four, permissions, created_at, last_used_at, status, rate_limit_rpm")
      .single();

    if (insertError || !inserted) {
      return NextResponse.json(
        { error: insertError?.message || "Failed to persist API key." },
        { status: 500 }
      );
    }

    await supabase.from("audit_logs").insert({
      organization_id: profile.organization_id,
      actor_id: user.id,
      action: "api_key.created",
      target_type: "api_key",
      target_id: inserted.id,
      metadata: { name: inserted.name, prefix: inserted.prefix, rate_limit_rpm: inserted.rate_limit_rpm },
    });

    return NextResponse.json(
      {
        key: {
          id: inserted.id,
          name: inserted.name,
          prefix: inserted.prefix,
          maskedKey: `${inserted.prefix}••••••••••••••••${inserted.last_four}`,
          fullSecret: secret,
          permissions: inserted.permissions ?? [],
          createdAt: inserted.created_at,
          lastUsedAt: inserted.last_used_at,
          status: inserted.status,
          rateLimitRpm: inserted.rate_limit_rpm,
          totalRequests: 0,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unexpected error generating API key." },
      { status: 500 }
    );
  }
}

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { inferPlanTier, PLAN_CATALOG } from "@/lib/payments";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Please sign in before submitting a SadaPay / Raast transfer." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => null);
    const planName = typeof body?.planName === "string" ? body.planName.trim() : "Growth Tier";
    const amountPkr = Math.round(Number(body?.amountPkr || 0));
    const amountUsd = body?.amountUsd ? Number(body.amountUsd) : null;
    const referenceCode =
      typeof body?.referenceCode === "string" ? body.referenceCode.trim() : "";
    const tier = inferPlanTier(planName);
    const tokensAllocated = Number(body?.tokensAllocated || PLAN_CATALOG[tier].tokens);

    if (!referenceCode || referenceCode.length < 6 || referenceCode.length > 80) {
      return NextResponse.json(
        { error: "Please enter a valid SadaPay / Raast Transaction ID (6-80 characters)." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(amountPkr) || amountPkr < 100) {
      return NextResponse.json({ error: "Invalid PKR amount." }, { status: 400 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile?.organization_id) {
      return NextResponse.json(
        { error: "Workspace organization not found for your account." },
        { status: 400 }
      );
    }

    const trackerId = `SP-${Date.now().toString(36).toUpperCase()}-${crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase()}`;

    const { data: tx, error: insertError } = await supabase
      .from("payment_transactions")
      .insert({
        organization_id: profile.organization_id,
        user_id: user.id,
        gateway: "sadapay_raast",
        method: "SadaPay / Raast Direct Transfer",
        plan: planName,
        amount_pkr: amountPkr,
        amount_usd: amountUsd,
        tokens_allocated: tokensAllocated,
        tracker_id: trackerId,
        reference_code: referenceCode,
        status: "pending_verification",
      })
      .select("*")
      .single();

    if (insertError || !tx) {
      return NextResponse.json(
        {
          error:
            insertError?.message ||
            "Could not record transfer. Ensure database migration 0003_billing_and_requests.sql has been applied.",
        },
        { status: 500 }
      );
    }

    await supabase.from("audit_logs").insert({
      organization_id: profile.organization_id,
      actor_id: user.id,
      action: "payment.sadapay_transfer_submitted",
      target_type: "payment_transactions",
      target_id: tx.id,
      metadata: {
        tracker_id: trackerId,
        reference_code: referenceCode,
        amount_pkr: amountPkr,
      },
    });

    return NextResponse.json({ transaction: tx }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to submit transfer." },
      { status: 500 }
    );
  }
}

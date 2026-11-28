import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminClient, hasSupabaseSecretKey } from "@/lib/supabase/admin";
import { activateSubscriptionAndQuota } from "@/lib/payments";

export async function POST(request: Request) {
  try {
    const webhookSecret =
      process.env.SAFEPAY_WEBHOOK_SECRET?.trim() ||
      process.env.SAFEPAY_SECRET_KEY?.trim();

    if (!webhookSecret || !hasSupabaseSecretKey()) {
      return NextResponse.json(
        { error: "Webhook secret or SUPABASE_SECRET_KEY not configured." },
        { status: 503 }
      );
    }

    const rawBody = await request.text();
    const signature = request.headers.get("x-sfpy-signature")?.trim() || "";

    if (!signature) {
      return NextResponse.json({ error: "Missing Safepay signature." }, { status: 401 });
    }

    const expected = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const sigBuf = Buffer.from(signature, "utf8");
    const expBuf = Buffer.from(expected, "utf8");
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return NextResponse.json({ error: "Invalid Safepay signature." }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const eventType: string = event?.type || event?.data?.state || "";
    const tracker: string | undefined =
      event?.data?.tracker || event?.data?.token || event?.tracker;

    if (!tracker) {
      return NextResponse.json({ received: true });
    }

    const admin = createAdminClient();
    const { data: tx } = await admin
      .from("payment_transactions")
      .select("*")
      .eq("tracker_id", tracker)
      .maybeSingle();

    if (!tx) {
      return NextResponse.json({ received: true });
    }

    if (eventType === "payment.succeeded" || eventType === "TRACKER_ENDED") {
      if (tx.status !== "paid") {
        await admin
          .from("payment_transactions")
          .update({
            status: "paid",
            reference_code: event?.data?.reference || tracker,
            verified_at: new Date().toISOString(),
            metadata: { ...(tx.metadata || {}), webhookEvent: eventType },
          })
          .eq("id", tx.id);

        await activateSubscriptionAndQuota(admin, {
          organizationId: tx.organization_id,
          plan: tx.plan,
          tokensAllocated: Number(tx.tokens_allocated || 0),
          note: `Safepay verified payment (${tracker})`,
          actorId: tx.user_id,
        });

        await admin.from("audit_logs").insert({
          organization_id: tx.organization_id,
          actor_id: tx.user_id,
          action: "payment.safepay_succeeded",
          target_type: "payment_transactions",
          target_id: tx.id,
          metadata: { tracker, amount_pkr: tx.amount_pkr },
        });
      }
    } else if (eventType === "payment.failed" || eventType === "payment.canceled") {
      await admin
        .from("payment_transactions")
        .update({
          status: eventType === "payment.canceled" ? "canceled" : "failed",
        })
        .eq("id", tx.id);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Webhook processing error." },
      { status: 500 }
    );
  }
}

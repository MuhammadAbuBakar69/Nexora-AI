import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { activateSubscriptionAndQuota } from "@/lib/payments";

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

    const { data: adminRole } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!adminRole) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json().catch(() => null);
    const transactionId =
      typeof body?.transactionId === "string" ? body.transactionId : "";
    const action = body?.action === "reject" ? "reject" : "approve";

    if (!transactionId) {
      return NextResponse.json({ error: "transactionId is required." }, { status: 400 });
    }

    const { data: tx, error: fetchError } = await supabase
      .from("payment_transactions")
      .select("*")
      .eq("id", transactionId)
      .maybeSingle();

    if (fetchError || !tx) {
      return NextResponse.json({ error: "Payment transaction not found." }, { status: 404 });
    }

    const nextStatus = action === "approve" ? "paid" : "failed";

    const { error: updateError } = await supabase
      .from("payment_transactions")
      .update({
        status: nextStatus,
        verified_by: user.id,
        verified_at: new Date().toISOString(),
      })
      .eq("id", tx.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    if (action === "approve") {
      await activateSubscriptionAndQuota(supabase, {
        organizationId: tx.organization_id,
        plan: tx.plan,
        tokensAllocated: Number(tx.tokens_allocated || 0),
        note: `Admin verified ${tx.gateway} payment (${tx.reference_code || tx.tracker_id})`,
        actorId: user.id,
      });
    }

    await supabase.from("audit_logs").insert({
      organization_id: tx.organization_id,
      actor_id: user.id,
      action: action === "approve" ? "payment.approved" : "payment.rejected",
      target_type: "payment_transactions",
      target_id: tx.id,
      metadata: {
        gateway: tx.gateway,
        amount_pkr: tx.amount_pkr,
        reference_code: tx.reference_code,
      },
    });

    return NextResponse.json({ status: nextStatus, transactionId: tx.id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to process payment approval." },
      { status: 500 }
    );
  }
}

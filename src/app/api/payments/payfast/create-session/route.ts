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
      return NextResponse.json({ error: "Please sign in to initiate checkout." }, { status: 401 });
    }

    const merchantId = process.env.PAYFAST_MERCHANT_ID?.trim();
    const securedKey = process.env.PAYFAST_SECURED_KEY?.trim();
    const env = process.env.PAYFAST_ENV?.trim() === "production" ? "production" : "sandbox";

    if (!merchantId || !securedKey) {
      return NextResponse.json(
        {
          code: "GATEWAY_NOT_CONFIGURED",
          error:
            "PayFast merchant credentials are not configured yet. Add PAYFAST_MERCHANT_ID and PAYFAST_SECURED_KEY in .env.local.",
        },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => null);
    const planName = typeof body?.planName === "string" ? body.planName.trim() : "Growth Tier";
    const amountPkr = Math.round(Number(body?.amountPkr || 0));
    const amountUsd = body?.amountUsd ? Number(body.amountUsd) : null;
    const tier = inferPlanTier(planName);
    const tokensAllocated = Number(body?.tokensAllocated || PLAN_CATALOG[tier].tokens);

    if (!Number.isFinite(amountPkr) || amountPkr < 100) {
      return NextResponse.json({ error: "Minimum payable amount is ₨100 PKR." }, { status: 400 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile?.organization_id) {
      return NextResponse.json({ error: "Workspace organization not found." }, { status: 400 });
    }

    const basketId = `NX-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const apiHost =
      env === "production" ? "https://ipg1.apps.net.pk" : "https://ipguat.apps.net.pk";

    const tokenParams = new URLSearchParams({
      MERCHANT_ID: merchantId,
      SECURED_KEY: securedKey,
      BASKET_ID: basketId,
      TXNAMT: String(amountPkr),
      CURRENCY_CODE: "PKR",
    });

    const tokenRes = await fetch(`${apiHost}/Ecommerce/api/Transaction/GetAccessToken`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    });

    const tokenData = await tokenRes.json().catch(() => null);
    const accessToken = tokenData?.ACCESS_TOKEN;

    if (!tokenRes.ok || !accessToken) {
      return NextResponse.json(
        { error: tokenData?.ERROR_MESSAGE || "PayFast rejected token initialization." },
        { status: 502 }
      );
    }

    const { data: tx, error: txError } = await supabase
      .from("payment_transactions")
      .insert({
        organization_id: profile.organization_id,
        user_id: user.id,
        gateway: "payfast",
        method: "PayFast (Card / 1Link / JazzCash / Easypaisa)",
        plan: planName,
        amount_pkr: amountPkr,
        amount_usd: amountUsd,
        tokens_allocated: tokensAllocated,
        tracker_id: basketId,
        status: "pending",
        metadata: { env },
      })
      .select("id")
      .single();

    if (txError || !tx) {
      return NextResponse.json(
        { error: txError?.message || "Failed to record pending transaction." },
        { status: 500 }
      );
    }

    const origin = new URL(request.url).origin;
    const orderDate = new Date().toISOString().slice(0, 10);

    return NextResponse.json({
      actionUrl: `${apiHost}/Ecommerce/api/Transaction/PostTransaction`,
      transactionId: tx.id,
      fields: {
        CURRENCY_CODE: "PKR",
        MERCHANT_ID: merchantId,
        TOKEN: accessToken,
        SUCCESS_URL: `${origin}/dashboard/billing?payment=success&tracker=${encodeURIComponent(basketId)}`,
        FAILURE_URL: `${origin}/dashboard/billing?payment=failed&tracker=${encodeURIComponent(basketId)}`,
        CHECKOUT_URL: `${origin}/dashboard/billing`,
        CUSTOMER_EMAIL_ADDRESS: user.email || "",
        TXNAMT: String(amountPkr),
        BASKET_ID: basketId,
        ORDER_DATE: orderDate,
        SIGNATURE: "NEXORA-GATEWAY",
        VERSION: "MERCHANT-CART-0.1",
        TXNDESC: `Nexora ${planName}`,
        PROCCODE: "00",
        TRAN_TYPE: "ECOMM_PURCHASE",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to initialize PayFast checkout." },
      { status: 500 }
    );
  }
}

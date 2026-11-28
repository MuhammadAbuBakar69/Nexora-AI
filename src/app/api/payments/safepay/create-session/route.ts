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

    const apiKey = process.env.SAFEPAY_API_KEY?.trim();
    const secretKey = process.env.SAFEPAY_SECRET_KEY?.trim();
    const env = process.env.SAFEPAY_ENV?.trim() === "production" ? "production" : "sandbox";

    if (!apiKey || !secretKey) {
      return NextResponse.json(
        {
          code: "GATEWAY_NOT_CONFIGURED",
          error:
            "Safepay API keys are not configured yet. Add SAFEPAY_API_KEY and SAFEPAY_SECRET_KEY in .env.local to enable live/sandbox card & Raast checkout.",
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
      return NextResponse.json(
        { error: "Minimum payable amount is ₨100 PKR." },
        { status: 400 }
      );
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

    const apiBase =
      env === "production"
        ? "https://api.getsafepay.com"
        : "https://sandbox.api.getsafepay.com";

    const initRes = await fetch(`${apiBase}/order/v1/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-SFPY-MERCHANT-SECRET": secretKey,
      },
      body: JSON.stringify({
        client: apiKey,
        amount: amountPkr,
        currency: "PKR",
        environment: env,
      }),
    });

    const initData = await initRes.json().catch(() => null);
    const tracker = initData?.data?.token;

    if (!initRes.ok || !tracker) {
      return NextResponse.json(
        {
          error:
            initData?.status?.message ||
            "Safepay rejected the checkout initialization request.",
        },
        { status: 502 }
      );
    }

    const { data: tx, error: txError } = await supabase
      .from("payment_transactions")
      .insert({
        organization_id: profile.organization_id,
        user_id: user.id,
        gateway: "safepay",
        method: "Safepay Checkout (Card / SadaPay / Raast)",
        plan: planName,
        amount_pkr: amountPkr,
        amount_usd: amountUsd,
        tokens_allocated: tokensAllocated,
        tracker_id: tracker,
        status: "pending",
        metadata: { env },
      })
      .select("id")
      .single();

    if (txError || !tx) {
      return NextResponse.json(
        { error: txError?.message || "Failed to record pending checkout." },
        { status: 500 }
      );
    }

    const origin = new URL(request.url).origin;
    const redirectUrl = `${origin}/dashboard/billing?payment=success&tracker=${encodeURIComponent(tracker)}`;
    const cancelUrl = `${origin}/dashboard/billing?payment=canceled&tracker=${encodeURIComponent(tracker)}`;

    const checkoutBase =
      env === "production"
        ? "https://getsafepay.com/checkout/pay"
        : "https://sandbox.api.getsafepay.com/checkout/pay";

    const checkoutUrl =
      `${checkoutBase}?env=${env}` +
      `&beacon=${encodeURIComponent(tracker)}` +
      `&source=custom` +
      `&order_id=${encodeURIComponent(tx.id)}` +
      `&redirect_url=${encodeURIComponent(redirectUrl)}` +
      `&cancel_url=${encodeURIComponent(cancelUrl)}`;

    return NextResponse.json({
      checkoutUrl,
      tracker,
      transactionId: tx.id,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to initialize Safepay session." },
      { status: 500 }
    );
  }
}

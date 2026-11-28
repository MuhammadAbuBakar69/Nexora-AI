import type { SupabaseClient } from "@supabase/supabase-js";

export type PlanTier = "starter" | "growth" | "enterprise";

export const PLAN_CATALOG: Record<
  PlanTier,
  { label: string; tokens: number; priceUsd: number; pricePkr: number }
> = {
  starter: {
    label: "Starter",
    tokens: 10_000_000,
    priceUsd: 49,
    pricePkr: 13_720,
  },
  growth: {
    label: "Growth",
    tokens: 75_000_000,
    priceUsd: 249,
    pricePkr: 69_720,
  },
  enterprise: {
    label: "Enterprise",
    tokens: 250_000_000,
    priceUsd: 999,
    pricePkr: 279_720,
  },
};

export function inferPlanTier(planName: string): PlanTier {
  const normalized = planName.toLowerCase();
  if (normalized.includes("enterprise")) return "enterprise";
  if (normalized.includes("growth")) return "growth";
  return "starter";
}

/**
 * Activates a subscription and provisions a monthly token quota allocation
 * for an organization once a payment has been verified.
 */
export async function activateSubscriptionAndQuota(
  client: SupabaseClient,
  params: {
    organizationId: string;
    plan: string;
    tokensAllocated: number;
    note: string;
    actorId?: string | null;
  }
) {
  const tier = inferPlanTier(params.plan);
  const tokens =
    params.tokensAllocated > 0
      ? params.tokensAllocated
      : PLAN_CATALOG[tier].tokens;

  const now = new Date();
  const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  // Cancel/supersede existing active/trialing subscription so unique index stays valid.
  await client
    .from("subscriptions")
    .update({ status: "canceled" })
    .eq("organization_id", params.organizationId)
    .in("status", ["trialing", "active"]);

  const { error: subError } = await client.from("subscriptions").insert({
    organization_id: params.organizationId,
    plan: tier,
    status: "active",
    current_period_start: now.toISOString(),
    current_period_end: periodEnd.toISOString(),
  });

  if (subError) {
    throw new Error(`Subscription activation failed: ${subError.message}`);
  }

  await client
    .from("organizations")
    .update({ plan: tier })
    .eq("id", params.organizationId);

  const { error: quotaError } = await client.from("quota_allocations").insert({
    organization_id: params.organizationId,
    period_start: now.toISOString(),
    period_end: periodEnd.toISOString(),
    tokens_allocated: tokens,
    note: params.note,
    created_by: params.actorId ?? null,
  });

  if (quotaError) {
    throw new Error(`Quota provisioning failed: ${quotaError.message}`);
  }
}

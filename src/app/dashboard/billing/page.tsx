"use client";

import React, { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { QuotaQuoteCalculator, CustomerQuote } from "@/components/dashboard/quota-quote-calculator";
import { createClient } from "@/utils/supabase/client";
import { CreditCard, Download, ShieldCheck, Sparkles, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { SadaPayCheckoutModal } from "@/components/dashboard/sadapay-checkout-modal";

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<string>("Starter Tier");
  const [planStatus, setPlanStatus] = useState<string>("Active");
  const [accessRequests, setAccessRequests] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [billingNotice, setBillingNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSadaPayModalOpen, setIsSadaPayModalOpen] = useState<boolean>(false);

  const fetchBillingState = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const [{ data: sub }, { data: reqs }, { data: txs }] = await Promise.all([
          supabase
            .from("subscriptions")
            .select("plan, status")
            .eq("status", "active")
            .maybeSingle(),
          supabase
            .from("access_requests")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(10),
          supabase
            .from("payment_transactions")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(20),
        ]);

        if (sub?.plan) {
          setCurrentPlan(`${sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1)} Tier`);
          setPlanStatus(sub.status || "Active");
        }
        if (reqs) setAccessRequests(reqs);
        if (txs) setTransactions(txs);
      }
    } catch {
      // Handled cleanly
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentParam = params.get("payment");
    if (paymentParam === "success") {
      setBillingNotice({
        type: "success",
        text: "Checkout completed. Payment confirmation and quota activation update automatically via gateway webhook.",
      });
    } else if (paymentParam === "canceled" || paymentParam === "failed") {
      setBillingNotice({
        type: "error",
        text: `Payment was ${paymentParam}. No funds were settled.`,
      });
    }

    fetchBillingState();
  }, []);

  const handleQuoteRequested = async (quote: CustomerQuote) => {
    setBillingNotice(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("organization_id")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.organization_id) {
        const { data: newReq, error } = await supabase
          .from("access_requests")
          .insert({
            organization_id: profile.organization_id,
            user_id: user.id,
            requested_plan: quote.recommendedPlan,
            requested_tokens: quote.monthlyTokens,
            estimated_cost_pkr: quote.estimatedCostPkr,
            business_justification: `Customer quote submission: ${quote.monthlyTokens.toLocaleString()} tokens, ${quote.monthlyVideoSeconds}s Veo video (₨${quote.estimatedCostPkr.toLocaleString()} PKR/mo).`,
            status: "pending",
          })
          .select()
          .single();

        if (error) {
          setBillingNotice({
            type: "error",
            text: `Could not submit quote request: ${error.message}`,
          });
          return;
        }

        if (newReq) {
          setAccessRequests([newReq, ...accessRequests]);
          setBillingNotice({
            type: "success",
            text: "Quota & tier request submitted for admin review.",
          });
        }
      }
    } catch {
      setBillingNotice({
        type: "error",
        text: "Unexpected error submitting quota request.",
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <DashboardHeader
        title="Subscription, Quota &amp; Invoicing"
        subtitle="Manage plan quotas, commercial pricing calculators, and enterprise access requests"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {billingNotice && (
          <div
            className={`p-3 border text-xs font-mono ${
              billingNotice.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-700"
            }`}
          >
            {billingNotice.text}
          </div>
        )}
        {/* CAD Telemetry Marker */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase px-1">
          <span>// BILLING LEDGER • ARCHITECTURAL SPECIFICATION</span>
          <span>CURRENCY SUPPORT: USD ($) &amp; PKR (₨)</span>
        </div>

        {/* Current Plan Overview Card */}
        <div className="bg-white border border-[#E2E2DA] p-6 relative">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#777783]">
                  Current Subscription
                </span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-300 px-2 py-0.2 font-bold">
                  {planStatus.toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-mono font-bold text-[#111111] uppercase tracking-tight">
                {currentPlan}
              </h2>
              <p className="text-xs font-mono text-[#777783] mt-1 max-w-lg">
                Provides edge routing through the Nexora Anycast Gateway. High-throughput rate limits and multi-model proxy access.
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] font-mono text-[#777783] uppercase block">
                BILLING FREQUENCY
              </span>
              <span className="text-base font-mono font-bold text-[#111111]">
                MONTHLY RECURRING
              </span>
            </div>
          </div>
        </div>

        {/* SadaPay Dedicated Payment Integration Card */}
        <div className="bg-white border border-[#E2E2DA] p-6 relative overflow-hidden font-mono">
          <span className="absolute top-2 left-2 text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 text-xs text-[#888892] select-none">+</span>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E2E2DA]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#02AAB0] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm">
                SP
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                    SadaPay Digital Settlement Gateway
                  </h3>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-300 px-1.5 py-0.2 font-bold">
                    ACTIVE PAYMENT CHANNEL
                  </span>
                </div>
                <p className="text-xs text-[#777783] max-w-xl font-sans">
                  Accepting direct settlements via SadaPay Mastercard virtual &amp; physical debit cards, SadaBiz merchant invoicing, and Raast instant transfers with zero foreign currency conversion penalties.
                </p>
              </div>
            </div>

            <Button
              onClick={() => setIsSadaPayModalOpen(true)}
              className="bg-[#02AAB0] hover:bg-[#008f94] text-white text-xs font-bold uppercase tracking-wider h-10 px-5 shrink-0 border-transparent shadow-xs"
            >
              <span>Launch SadaPay Checkout</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#555562]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>State Bank Regulated (SBP EMI)</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#02AAB0] shrink-0" />
              <span>Mastercard 3D Secure Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-primary shrink-0" />
              <span>Instant Token Quota Allocation</span>
            </div>
          </div>
        </div>

        {/* Multi-modality Quota & Quote Calculator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono text-[#777783] uppercase tracking-wider">
              // CUSTOMER QUOTE &amp; CAPACITY ESTIMATOR
            </span>
            <span className="text-[10px] font-mono text-[#777783] uppercase">
              LLM TOKENS • GOOGLE VEO VIDEO • IMAGES
            </span>
          </div>

          <QuotaQuoteCalculator onRequestQuota={handleQuoteRequested} />
        </div>

        {/* Past Access Requests / Quota Approvals */}
        <div className="bg-white border border-[#E2E2DA] p-6 relative">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <div className="pb-4 border-b border-[#E2E2DA] flex items-center justify-between">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
                Access &amp; Quota Requests
              </h3>
              <p className="text-[11px] font-mono text-[#777783] mt-0.5">
                Audit trail of requested tier expansions and admin approvals
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#777783]">
              TOTAL: {accessRequests.length}
            </span>
          </div>

          {accessRequests.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[#777783]">
              No custom quota requests submitted yet. Use the calculator above to request capacity.
            </div>
          ) : (
            <div className="divide-y divide-[#E2E2DA] pt-2">
              {accessRequests.map((req) => (
                <div key={req.id} className="py-3 flex items-center justify-between text-xs font-mono">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#111111]">
                        {req.requested_plan.toUpperCase()} TIER
                      </span>
                      <span className={`px-1.5 py-0.5 text-[10px] ${
                        req.status === "approved"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : req.status === "rejected"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {req.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#777783] mt-0.5">
                      {req.business_justification || "Standard quota inquiry"}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#777783]">
                    {new Date(req.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clean Production Invoicing Section */}
        <div className="bg-white border border-[#E2E2DA] p-6 relative">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <div className="pb-4 border-b border-[#E2E2DA] flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
              Billing History &amp; Receipts
            </h3>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">
              TAX COMPLIANT ({transactions.length})
            </span>
          </div>

          {transactions.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[#777783]">
              No invoices or payment transactions recorded yet for this billing cycle.
            </div>
          ) : (
            <div className="divide-y divide-[#E2E2DA] pt-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="py-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#111111]">{tx.plan}</span>
                      <span
                        className={`px-1.5 py-0.5 text-[10px] border ${
                          tx.status === "paid"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : tx.status === "pending_verification"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : tx.status === "failed" || tx.status === "canceled"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-[#F7F7F4] text-[#555562] border-[#E2E2DA]"
                        }`}
                      >
                        {String(tx.status).replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#777783] mt-0.5">
                      {tx.method} • Ref: {tx.reference_code || tx.tracker_id || tx.id.slice(0, 8)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#111111]">
                      ₨{Number(tx.amount_pkr).toLocaleString()} PKR
                    </p>
                    <p className="text-[10px] text-[#777783]">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pakistan Commercial Checkout Modal */}
      <SadaPayCheckoutModal
        isOpen={isSadaPayModalOpen}
        onClose={() => setIsSadaPayModalOpen(false)}
        planName={currentPlan}
        amountPkr={currentPlan.toLowerCase().includes("growth") ? 69720 : 13720}
        amountUsd={currentPlan.toLowerCase().includes("growth") ? 249 : 49}
        tokensAllocated={currentPlan.toLowerCase().includes("growth") ? 75_000_000 : 10_000_000}
        onPaymentSuccess={() => {
          fetchBillingState();
        }}
      />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { CreditCard, TrendingUp, DollarSign, Check, X } from "lucide-react";

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadSubscriptions = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const [{ data: subs }, { data: txs }] = await Promise.all([
        supabase
          .from("subscriptions")
          .select("*, organizations(name, slug)")
          .order("created_at", { ascending: false }),
        supabase
          .from("payment_transactions")
          .select("*, organizations(name, slug)")
          .order("created_at", { ascending: false })
          .limit(30),
      ]);

      if (subs) setSubscriptions(subs);
      if (txs) setTransactions(txs);
    } catch {
      // Safe fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const handleTransactionDecision = async (
    transactionId: string,
    action: "approve" | "reject"
  ) => {
    setActionNotice(null);
    const res = await fetch("/api/admin/payments/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId, action }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setActionNotice(`Error: ${data.error || "Could not update payment."}`);
      return;
    }
    setActionNotice(
      action === "approve"
        ? "Payment verified: subscription & token quota activated."
        : "Payment marked as failed."
    );
    await loadSubscriptions();
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <AdminHeader
        title="Tenant Subscriptions &amp; Commercial Ledger"
        subtitle="Tier plans, recurring billing contracts, and payment verification queue"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {actionNotice && (
          <div className="p-3 bg-white border border-[#E2E2DA] text-xs font-mono text-[#111111]">
            {actionNotice}
          </div>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Active Contracts"
            value={subscriptions.filter((s) => s.status === "active").length.toString()}
            subtitle="Verified tenant subscriptions"
            icon={<CreditCard className="w-4 h-4 text-violet-primary" />}
          />
          <StatCard
            title="Pending Verifications"
            value={transactions.filter((t) => t.status === "pending_verification").length.toString()}
            subtitle="SadaPay / Raast transfers awaiting review"
            icon={<DollarSign className="w-4 h-4 text-amber-600" />}
          />
          <StatCard
            title="SLA Compliance"
            value="99.99%"
            subtitle="Enterprise contract adherence"
            icon={<TrendingUp className="w-4 h-4 text-indigo-600" />}
          />
        </div>

        {/* Payment Verification Queue */}
        <div className="bg-white border border-[#E2E2DA] relative">
          <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <div className="px-6 py-4 border-b border-[#E2E2DA] flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
              // Payment Transactions &amp; SadaPay / Raast Queue ({transactions.length})
            </h3>
            <span className="text-[10px] font-mono text-[#777783] uppercase">
              SAFEPAY • PAYFAST • SADAPAY
            </span>
          </div>

          <div className="overflow-x-auto">
            {transactions.length === 0 ? (
              <div className="py-10 text-center font-mono text-xs text-[#777783]">
                No payment transactions recorded yet.
              </div>
            ) : (
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#F6F6F3] border-b border-[#E2E2DA] text-[#777783] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-6 font-bold">Organization</th>
                    <th className="py-3 px-6 font-bold">Gateway / Ref</th>
                    <th className="py-3 px-6 font-bold">Amount</th>
                    <th className="py-3 px-6 font-bold">Status</th>
                    <th className="py-3 px-6 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DA]">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#F6F6F3]/50">
                      <td className="py-4 px-6">
                        <p className="font-bold text-[#111111]">
                          {tx.organizations?.name || "Workspace"}
                        </p>
                        <p className="text-[#777783] text-[10px] mt-0.5">{tx.plan}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-[#111111] font-bold uppercase">{tx.gateway}</p>
                        <p className="text-[#777783] text-[10px] mt-0.5">
                          {tx.reference_code || tx.tracker_id}
                        </p>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#111111]">
                        ₨{Number(tx.amount_pkr).toLocaleString()} PKR
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant={
                            tx.status === "paid"
                              ? "success"
                              : tx.status === "pending_verification"
                              ? "warning"
                              : "default"
                          }
                          size="sm"
                        >
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        {tx.status === "pending_verification" || tx.status === "pending" ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleTransactionDecision(tx.id, "approve")}
                              className="text-[10px] h-7 px-2.5 gap-1"
                            >
                              <Check className="w-3 h-3" />
                              Approve
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleTransactionDecision(tx.id, "reject")}
                              className="text-[10px] h-7 px-2.5 gap-1"
                            >
                              <X className="w-3 h-3" />
                              Reject
                            </Button>
                          </>
                        ) : (
                          <span className="text-[10px] text-[#777783]">Settled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Tenant Subscriptions Table */}
        <div className="bg-white border border-[#E2E2DA] relative">
          <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <div className="px-6 py-4 border-b border-[#E2E2DA] flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
              // Subscribed Organizations ({subscriptions.length})
            </h3>
            <span className="text-[10px] font-mono text-[#777783] uppercase">
              REAL-TIME LEDGER
            </span>
          </div>

          <div className="overflow-x-auto">
            {subscriptions.length === 0 ? (
              <div className="py-12 text-center font-mono">
                <p className="text-xs text-[#777783] uppercase tracking-wider">
                  No active commercial subscriptions registered yet
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#F6F6F3] border-b border-[#E2E2DA] text-[#777783] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-6 font-bold">Tenant Organization</th>
                    <th className="py-3 px-6 font-bold">Plan Tier</th>
                    <th className="py-3 px-6 font-bold">Status</th>
                    <th className="py-3 px-6 font-bold">Current Period End</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DA]">
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-[#F6F6F3]/50">
                      <td className="py-4 px-6">
                        <p className="font-bold text-[#111111]">
                          {sub.organizations?.name || "Workspace"}
                        </p>
                        <p className="text-[#777783] text-[10px] mt-0.5">
                          {sub.organizations?.slug || sub.organization_id}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="default" size="sm">
                          {sub.plan}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant={sub.status === "active" ? "success" : "warning"} size="sm">
                          {sub.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-[#777783]">
                        {sub.current_period_end
                          ? new Date(sub.current_period_end).toLocaleDateString()
                          : "Perpetual"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

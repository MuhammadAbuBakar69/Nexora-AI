"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TokenAllocateModal } from "@/components/admin/token-allocate-modal";
import { createClient } from "@/utils/supabase/client";
import { CustomerAccount } from "@/types";
import { Coins, Zap, Edit3, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function AdminTokenAllocationPage() {
  const [customers, setCustomers] = useState<CustomerAccount[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAccount | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [totalProvisioned, setTotalProvisioned] = useState<number>(0);

  useEffect(() => {
    async function loadTokenAllocations() {
      try {
        const supabase = createClient();
        const { data: orgs } = await supabase
          .from("organizations")
          .select("id, name, slug, created_at");

        const { data: quotas } = await supabase
          .from("quota_allocations")
          .select("id, organization_id, tokens_allocated");

        const total = quotas?.reduce((acc, q) => acc + (Number(q.tokens_allocated) || 0), 0) || 0;
        setTotalProvisioned(total);

        if (orgs && orgs.length > 0) {
          const mapped: CustomerAccount[] = orgs.map((org) => {
            const orgQuotas = quotas?.filter((q) => q.organization_id === org.id) || [];
            const orgAlloc = orgQuotas.reduce((acc, q) => acc + (Number(q.tokens_allocated) || 0), 0);
            return {
              id: org.id,
              name: org.name,
              email: `${org.slug || "admin"}@workspace.internal`,
              company: org.name,
              plan: "Enterprise",
              status: "active",
              allocatedTokens: orgAlloc,
              consumedTokens: 0,
              activeApiKeysCount: 0,
              storageUsageBytes: 0,
              monthlySpend: 0,
              joinedDate: org.created_at || new Date().toISOString(),
              lastActive: "Active",
            };
          });
          setCustomers(mapped);
        } else {
          setCustomers([]);
        }
      } catch (err) {
        // Safe fallback
      }
    }

    loadTokenAllocations();
  }, []);

  const handleUpdateAllocation = async (customerId: string, newTotalTokens: number) => {
    setErrorToast(null);
    setSuccessToast(null);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const now = new Date();
      const periodStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0));
      const periodEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0));

      const { error } = await supabase.from("quota_allocations").upsert(
        {
          organization_id: customerId,
          period_start: periodStart.toISOString(),
          period_end: periodEnd.toISOString(),
          tokens_allocated: newTotalTokens,
          note: "Admin manual quota allocation",
          created_by: user?.id ?? null,
        },
        { onConflict: "organization_id,period_start" }
      );

      if (error) {
        setErrorToast(`Failed to persist quota: ${error.message}`);
        return;
      }

      if (user) {
        await supabase.from("audit_logs").insert({
          organization_id: customerId,
          actor_id: user.id,
          action: "quota.allocated",
          target_type: "quota_allocations",
          target_id: customerId,
          metadata: { tokens_allocated: newTotalTokens },
        });
      }

      const updated = customers.map((c) =>
        c.id === customerId ? { ...c, allocatedTokens: newTotalTokens } : c
      );
      setCustomers(updated);
      setTotalProvisioned(updated.reduce((acc, c) => acc + c.allocatedTokens, 0));
      setSuccessToast(`Token allocation persisted to database: ${(newTotalTokens / 1_000_000).toFixed(1)}M tokens.`);
      setTimeout(() => setSuccessToast(null), 4000);
    } catch {
      setErrorToast("Unexpected error saving quota allocation.");
    }
  };

  const openAllocateModal = (customer: CustomerAccount) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <AdminHeader
        title="Token Quota &amp; Allocation Engine"
        subtitle="Manage computational token balances, hard quota ceilings, and emergency overrides"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {errorToast && (
          <div className="p-3 bg-rose-50 border border-rose-300 text-xs font-mono text-rose-800">
            {errorToast}
          </div>
        )}
        {successToast && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Overview Banner */}
        <div className="p-6 bg-white border border-[#E2E2DA] flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#777783] font-bold">
                // Global Token Ceiling Pool
              </span>
            </div>
            <h2 className="text-2xl font-mono font-bold text-[#111111]">
              {totalProvisioned > 0 ? `${totalProvisioned.toLocaleString()} Tokens Provisioned` : "0.0M Tokens Provisioned"}
            </h2>
            <p className="text-xs font-mono text-[#777783] mt-1">
              Aggregated quota balance active across all tenant clusters.
            </p>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-[#E2E2DA] pt-4 md:pt-0 md:pl-6 text-xs font-mono">
            <div>
              <p className="text-[10px] uppercase text-[#777783] font-bold">Total Tenants</p>
              <p className="text-lg font-bold text-[#111111]">{customers.length}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-[#777783] font-bold">Zero-Overdraft</p>
              <p className="text-lg font-bold text-emerald-700">ENFORCED</p>
            </div>
          </div>
        </div>

        {/* Tenant Token Allocation Table */}
        <div className="bg-white border border-[#E2E2DA] relative">
          <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <div className="px-6 py-4 border-b border-[#E2E2DA] flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
              // Active Tenant Quotas
            </h3>
            <span className="text-[10px] font-mono text-[#777783] uppercase">
              HARD LIMIT CEILING ENFORCEMENT
            </span>
          </div>

          <div className="overflow-x-auto">
            {customers.length === 0 ? (
              <div className="py-12 text-center font-mono">
                <p className="text-xs text-[#777783] uppercase tracking-wider">
                  No tenant organizations to allocate tokens
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#F6F6F3] border-b border-[#E2E2DA] text-[#777783] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-6 font-bold">Tenant Organization</th>
                    <th className="py-3 px-6 font-bold">Allocated Quota</th>
                    <th className="py-3 px-6 font-bold">Status</th>
                    <th className="py-3 px-6 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DA]">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F6F6F3]/50">
                      <td className="py-4 px-6">
                        <p className="font-bold text-[#111111]">{c.company}</p>
                        <p className="text-[#777783] text-[10px] mt-0.5">{c.email}</p>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#111111]">
                        {(c.allocatedTokens / 1_000_000).toFixed(1)}M Tokens
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="success" size="sm">
                          ACTIVE
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openAllocateModal(c)}
                          className="text-[10px] h-7 px-3 gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          Adjust Quota
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <TokenAllocateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        onAllocate={handleUpdateAllocation}
      />
    </div>
  );
}

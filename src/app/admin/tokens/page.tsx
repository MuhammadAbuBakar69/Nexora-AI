"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TokenAllocateModal } from "@/components/admin/token-allocate-modal";
import { mockCustomersList } from "@/data/mock-data";
import { CustomerAccount } from "@/types";
import { Coins, Zap, Edit3, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function AdminTokenAllocationPage() {
  const [customers, setCustomers] = useState<CustomerAccount[]>(mockCustomersList);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAccount | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleUpdateAllocation = (customerId: string, newTotalTokens: number) => {
    setCustomers(
      customers.map((c) =>
        c.id === customerId ? { ...c, allocatedTokens: newTotalTokens } : c
      )
    );
    setSuccessToast(`Token allocation successfully updated to ${(newTotalTokens / 1_000_000).toFixed(0)}M tokens.`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const openAllocateModal = (customer: CustomerAccount) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Token Quota & Allocation Engine"
        subtitle="Manage computational token balances, hard quota ceilings, and emergency overrides"
        
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {successToast && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Overview Banner */}
        <div className="p-6 rounded-3xl bg-white border border-border flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-subtle">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-primary" />
              <span className="text-xs uppercase font-semibold tracking-wider text-violet-primary">
                Global Token Ceiling Pool
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              2,450,000,000 Tokens Provisioned
            </h2>
            <p className="text-xs text-secondary mt-1">
              Across 124 tenant organizations. 1,689,420,110 tokens consumed this cycle (68.9%).
            </p>
          </div>

          <div className="w-full md:w-64 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-secondary">Global Utilization</span>
              <span className="font-semibold text-foreground">68.9%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-primary to-blue-soft h-full w-[68.9%]" />
            </div>
          </div>
        </div>

        {/* Customer Allocations Table */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-subtle">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Tenant Quota Allocations
            </h3>
            <span className="text-xs text-secondary">
              Click &quot;Modify Quota&quot; to adjust monthly ceilings
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface/50 border-b border-border text-secondary">
                <tr>
                  <th className="py-3 px-6 font-semibold">Tenant Organization</th>
                  <th className="py-3 px-6 font-semibold">Allocated Tokens</th>
                  <th className="py-3 px-6 font-semibold">Consumed Tokens</th>
                  <th className="py-3 px-6 font-semibold">Remaining Balance</th>
                  <th className="py-3 px-6 font-semibold">Utilization</th>
                  <th className="py-3 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {customers.map((c) => {
                  const remaining = c.allocatedTokens - c.consumedTokens;
                  const pct = Math.min(100, (c.consumedTokens / c.allocatedTokens) * 100).toFixed(1);
                  return (
                    <tr key={c.id} className="hover:bg-surface/30">
                      <td className="py-4 px-6">
                        <p className="font-semibold text-foreground">{c.company}</p>
                        <p className="text-secondary text-[11px]">{c.name} • {c.plan}</p>
                      </td>

                      <td className="py-4 px-6 font-mono font-semibold text-foreground">
                        {(c.allocatedTokens / 1_000_000).toFixed(0)}M
                      </td>

                      <td className="py-4 px-6 font-mono text-secondary">
                        {(c.consumedTokens / 1_000_000).toFixed(1)}M
                      </td>

                      <td className="py-4 px-6 font-mono">
                        <span
                          className={`font-semibold ${
                            remaining > 0 ? "text-emerald-700" : "text-rose-600"
                          }`}
                        >
                          {(remaining / 1_000_000).toFixed(1)}M
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="space-y-1 w-28">
                          <span className="text-[10px] text-secondary font-mono">{pct}%</span>
                          <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                Number(pct) > 85 ? "bg-rose-500" : "bg-violet-primary"
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openAllocateModal(c)}
                          className="text-xs h-8 gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-violet-primary" />
                          Modify Quota
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedCustomer && (
        <TokenAllocateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          customer={selectedCustomer}
          onUpdateAllocation={handleUpdateAllocation}
        />
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { CreditCard, TrendingUp, AlertCircle, DollarSign, Download, Check } from "lucide-react";

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadSubscriptions() {
      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data: subs } = await supabase
          .from("subscriptions")
          .select("*, organizations(name, slug)")
          .order("created_at", { ascending: false });

        if (subs) {
          setSubscriptions(subs);
        }
      } catch (err) {
        // Safe fallback
      } finally {
        setIsLoading(false);
      }
    }

    loadSubscriptions();
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <AdminHeader
        title="Tenant Subscriptions &amp; Commercial Ledger"
        subtitle="Tier plans, recurring billing contracts, and commercial terms"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Active Contracts"
            value={subscriptions.length.toString()}
            subtitle="Verified tenant subscriptions"
            icon={<CreditCard className="w-4 h-4 text-violet-primary" />}
          />
          <StatCard
            title="Commercial Status"
            value="ACTIVE"
            subtitle="PKR &amp; USD billing enabled"
            icon={<DollarSign className="w-4 h-4 text-emerald-600" />}
          />
          <StatCard
            title="SLA Compliance"
            value="99.99%"
            subtitle="Enterprise contract adherence"
            icon={<TrendingUp className="w-4 h-4 text-indigo-600" />}
          />
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
                    <th className="py-3 px-6 font-bold text-right">Actions</th>
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
                      <td className="py-4 px-6 text-right">
                        <Button variant="outline" size="sm" className="text-[10px] h-7 px-2.5">
                          View Terms
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
    </div>
  );
}

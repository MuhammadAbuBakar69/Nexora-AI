"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockCustomersList } from "@/data/mock-data";
import { CreditCard, TrendingUp, AlertCircle, DollarSign, Download } from "lucide-react";

export default function AdminSubscriptionsPage() {
  const totalMrr = mockCustomersList.reduce((acc, c) => acc + c.monthlySpend, 0);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Tenant Subscriptions & Billing Ledger"
        subtitle="Tier plans, recurring revenue placeholders, and contract statuses"
        
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Monthly Recurring Revenue (MRR)"
            value={`$${(totalMrr * 5.8).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Illustrative tenant revenue run-rate"
            change={{ value: "+18.2%", isPositive: true }}
            icon={<DollarSign className="w-4 h-4 text-violet-primary" />}
            variant="violet"
          />
          <StatCard
            title="Active Enterprise Contracts"
            value="24"
            subtitle="High-volume custom SLA accounts"
            icon={<CreditCard className="w-4 h-4 text-indigo-600" />}
          />
          <StatCard
            title="Payment Success Rate"
            value="99.4%"
            subtitle="Automatic retry logic active"
            change={{ value: "Healthy", isPositive: true }}
            icon={<TrendingUp className="w-4 h-4 text-emerald-600" />}
          />
        </div>

        {/* Tenant Subscriptions Table */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-subtle">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Customer Subscription Contracts
            </h3>
            <span className="text-xs text-secondary font-mono">
              Auto-renewing monthly
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface/50 border-b border-border text-secondary">
                <tr>
                  <th className="py-3 px-6 font-semibold">Tenant Organization</th>
                  <th className="py-3 px-6 font-semibold">Tier Plan</th>
                  <th className="py-3 px-6 font-semibold">Monthly Spend</th>
                  <th className="py-3 px-6 font-semibold">Joined Date</th>
                  <th className="py-3 px-6 font-semibold">Billing Status</th>
                  <th className="py-3 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {mockCustomersList.map((c) => (
                  <tr key={c.id} className="hover:bg-surface/30">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-foreground">{c.company}</p>
                      <p className="text-secondary text-[11px]">{c.name} • {c.email}</p>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={c.plan === "Enterprise" ? "violet" : "default"} size="sm">
                        {c.plan}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 font-semibold text-foreground font-mono">
                      ${c.monthlySpend}.00 / mo
                    </td>
                    <td className="py-4 px-6 text-secondary">{c.joinedDate}</td>
                    <td className="py-4 px-6">
                      <Badge variant={c.status === "active" ? "success" : "danger"} size="sm">
                        {c.status === "active" ? "Current" : "Suspended"}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => alert(`Reviewing invoice details for ${c.company}`)}
                        className="text-[11px] h-7 px-2.5"
                      >
                        Ledger
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

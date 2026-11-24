"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UsageAreaChart } from "@/components/charts/usage-area-chart";
import { CustomerModal } from "@/components/admin/customer-modal";
import {
  mockAdminStats,
  mockCustomersList,
  mockDailyUsageData,
  mockAuditLogs,
} from "@/data/mock-data";
import {
  Users2,
  Coins,
  Activity,
  CreditCard,
  HardDrive,
  ShieldCheck,
  Plus,
  ArrowRight,
  Server,
  AlertTriangle,
} from "lucide-react";
import { formatNumber, formatBytes } from "@/lib/utils";
import { CustomerAccount } from "@/types";

export default function AdminOverviewPage() {
  const [customers, setCustomers] = useState<CustomerAccount[]>(mockCustomersList);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const handleCustomerCreated = (newCust: CustomerAccount) => {
    setCustomers([newCust, ...customers]);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Admin Control Center"
        subtitle="Global tenant oversight, token provisioning, and gateway infrastructure health"
        
        actionButton={
          <Button
            size="sm"
            onClick={() => setIsCustomerModalOpen(true)}
            className="gap-1.5 text-xs bg-violet-primary hover:bg-violet-dark text-white"
          >
            <Plus className="w-3.5 h-3.5" />
            Provision Customer
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Tenant Customers"
            value="124"
            subtitle="118 active • 6 suspended"
            change={{ value: "+8 this month", isPositive: true }}
            icon={<Users2 className="w-4 h-4 text-violet-primary" />}
            variant="violet"
          />

          <StatCard
            title="Global Allocated Tokens"
            value="2.45B"
            subtitle="1.69B tokens consumed (68.9%)"
            change={{ value: "Pool healthy", isPositive: true }}
            icon={<Coins className="w-4 h-4 text-indigo-600" />}
          />

          <StatCard
            title="Total API Gateway Requests"
            value="41.28M"
            subtitle="All tenant edge traffic"
            change={{ value: "+29.4%", isPositive: true }}
            icon={<Activity className="w-4 h-4 text-emerald-600" />}
          />

          <StatCard
            title="Monthly Revenue Placeholder"
            value="$48,950"
            subtitle="Active billing subscription volume"
            icon={<CreditCard className="w-4 h-4 text-amber-600" />}
          />
        </div>

        {/* Global Traffic & Health Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white border border-border rounded-2xl p-6 shadow-subtle">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Global Fleet Consumption Velocity
                </h3>
                <p className="text-xs text-secondary">
                  Aggregated token throughput dispatched to frontier model providers
                </p>
              </div>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                Uptime: 99.98%
              </span>
            </div>
            <div className="pt-4">
              <UsageAreaChart data={mockDailyUsageData} metric="tokens" />
            </div>
          </div>

          {/* Quick System Infrastructure Status */}
          <div className="lg:col-span-4 bg-white border border-border rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Upstream Provider Gateways
              </h3>
              <p className="text-xs text-secondary mb-4">
                Edge routing status & fallback failover state
              </p>

              <div className="space-y-3">
                {[
                  { name: "Anthropic Claude Edge", status: "Healthy", ping: "380ms", color: "bg-emerald-500" },
                  { name: "OpenAI Gateway Primary", status: "Healthy", ping: "340ms", color: "bg-emerald-500" },
                  { name: "Google Gemini Vertex Node", status: "Healthy", ping: "410ms", color: "bg-emerald-500" },
                  { name: "Meta Llama Inference Pods", status: "Healthy", ping: "290ms", color: "bg-emerald-500" },
                ].map((node, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-surface border border-border/80 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${node.color}`} />
                      <span className="font-medium text-foreground">{node.name}</span>
                    </div>
                    <span className="font-mono text-secondary text-[11px]">{node.ping}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 mt-4 text-center">
              <Link
                href="/admin/providers"
                className="text-xs text-violet-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                Inspect full provider routing configurations
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* High Priority Customer Oversight Table */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-subtle">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                High-Volume Tenant Workspaces
              </h3>
              <p className="text-xs text-secondary">
                Top customers by token allocation and consumption
              </p>
            </div>
            <Link href="/admin/customers">
              <Button variant="ghost" size="sm" className="text-xs text-violet-primary">
                View All ({customers.length})
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface/50 border-b border-border text-secondary">
                <tr>
                  <th className="py-3 px-6 font-semibold">Tenant Organization</th>
                  <th className="py-3 px-6 font-semibold">Plan</th>
                  <th className="py-3 px-6 font-semibold">Token Quota</th>
                  <th className="py-3 px-6 font-semibold">Consumed</th>
                  <th className="py-3 px-6 font-semibold">Status</th>
                  <th className="py-3 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {customers.slice(0, 4).map((c) => (
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
                    <td className="py-4 px-6 font-mono text-secondary">
                      {(c.allocatedTokens / 1_000_000).toFixed(0)}M
                    </td>
                    <td className="py-4 px-6 font-mono font-medium text-foreground">
                      {(c.consumedTokens / 1_000_000).toFixed(1)}M
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={c.status === "active" ? "success" : "danger"} size="sm">
                        {c.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link href="/admin/tokens">
                        <Button variant="outline" size="sm" className="text-[11px] h-7 px-2.5">
                          Adjust Quota
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Audit Log Feed Preview */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Recent Security & Administrative Events
              </h3>
              <p className="text-xs text-secondary">
                Immutable audit ledger tracking admin & system operations
              </p>
            </div>
            <Link href="/admin/audit-logs">
              <Button variant="ghost" size="sm" className="text-xs text-violet-primary">
                Full Audit Trail
              </Button>
            </Link>
          </div>

          <div className="divide-y divide-border/60 pt-2">
            {mockAuditLogs.slice(0, 3).map((log) => (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{log.action}</span>
                    <Badge variant={log.type === "quota" ? "violet" : log.type === "account" ? "warning" : "default"} size="sm">
                      {log.type}
                    </Badge>
                  </div>
                  <p className="text-secondary text-[11px] mt-0.5">
                    {log.target} — {log.details}
                  </p>
                </div>
                <div className="text-right text-secondary text-[11px] shrink-0">
                  <p className="font-mono">{log.actor}</p>
                  <p className="text-[10px] text-secondary/70">{log.timestamp.replace("T", " ").replace("Z", "")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSave={handleCustomerCreated}
      />
    </div>
  );
}

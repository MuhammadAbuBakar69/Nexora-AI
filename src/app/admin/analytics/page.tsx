"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { UsageAreaChart } from "@/components/charts/usage-area-chart";
import { ModelDonutChart } from "@/components/charts/model-donut-chart";
import { StatCard } from "@/components/ui/stat-card";
import { mockDailyUsageData, mockModelDistribution, mockCustomersList } from "@/data/mock-data";
import { Activity, Coins, Clock, ArrowUpRight } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [metric, setMetric] = useState<"requests" | "tokens" | "cost">("tokens");

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Fleet Analytics & Telemetry"
        subtitle="Global cross-tenant analytics, upstream load distribution, and cost reporting"
        
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Global Daily Requests"
            value="1.42M"
            subtitle="Current 24h rolling velocity"
            change={{ value: "+14.8%", isPositive: true }}
            icon={<Activity className="w-4 h-4 text-violet-primary" />}
            variant="violet"
          />
          <StatCard
            title="Total Tokens In Flight"
            value="68.4M / hr"
            subtitle="Throughput dispatched to providers"
            change={{ value: "Healthy", isPositive: true }}
            icon={<Coins className="w-4 h-4 text-indigo-600" />}
          />
          <StatCard
            title="Global Edge Latency"
            value="38 ms"
            subtitle="Direct CDN gateway routing"
            change={{ value: "-4ms", isPositive: true }}
            icon={<Clock className="w-4 h-4 text-emerald-600" />}
          />
        </div>

        {/* Global Consumption Chart */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/60 gap-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Aggregated Fleet Throughput
              </h3>
              <p className="text-xs text-secondary">
                Cumulative gateway request and token velocity across all tenants
              </p>
            </div>

            <div className="inline-flex items-center p-1 bg-surface border border-border rounded-xl">
              {(["tokens", "requests", "cost"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                    metric === m
                      ? "bg-white text-foreground shadow-xs font-semibold"
                      : "text-secondary hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <UsageAreaChart data={mockDailyUsageData} metric={metric} />
          </div>
        </div>

        {/* 2-Column: Customer Comparison & Model Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top Customers Comparison */}
          <div className="lg:col-span-7 bg-white border border-border rounded-2xl p-6 shadow-subtle">
            <h3 className="text-base font-semibold text-foreground mb-1">
              Top Tenant Workspaces by Consumption
            </h3>
            <p className="text-xs text-secondary mb-4">
              Relative consumption vs monthly quota
            </p>

            <div className="space-y-4">
              {mockCustomersList.map((c) => {
                const pct = Math.min(100, (c.consumedTokens / c.allocatedTokens) * 100);
                return (
                  <div key={c.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-foreground">{c.company}</span>
                      <span className="text-secondary font-mono">
                        {(c.consumedTokens / 1_000_000).toFixed(1)}M / {(c.allocatedTokens / 1_000_000).toFixed(0)}M ({pct.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-violet-primary h-full rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upstream Provider Distribution */}
          <div className="lg:col-span-5 bg-white border border-border rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                Upstream Provider Share
              </h3>
              <p className="text-xs text-secondary mb-4">
                Distribution of API calls across frontier labs
              </p>
              <ModelDonutChart data={mockModelDistribution} />
            </div>

            <div className="pt-4 border-t border-border/60 mt-4 text-xs text-secondary">
              <span className="font-semibold text-foreground">Failover Readiness:</span> 100% of routes configured with automatic fallback redundancy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

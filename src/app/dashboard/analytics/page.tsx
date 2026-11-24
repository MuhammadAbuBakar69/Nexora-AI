"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UsageAreaChart } from "@/components/charts/usage-area-chart";
import { ModelDonutChart } from "@/components/charts/model-donut-chart";
import { StatCard } from "@/components/ui/stat-card";
import { mockDailyUsageData, mockModelDistribution } from "@/data/mock-data";
import { Activity, Clock, AlertTriangle, ArrowUpRight, Filter } from "lucide-react";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "90d">("30d");
  const [selectedMetric, setSelectedMetric] = useState<"tokens" | "requests" | "cost">("requests");

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="Gateway Usage Analytics"
        subtitle="End-to-end performance metrics, request velocity, and latency percentiles"
        
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Filter & Metric Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1 bg-white border border-border p-1 rounded-xl shadow-subtle">
            {(["24h", "7d", "30d", "90d"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  timeframe === t
                    ? "bg-[#111111] text-white shadow-xs font-semibold"
                    : "text-secondary hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center p-1 bg-white border border-border rounded-xl shadow-subtle">
            {(["requests", "tokens", "cost"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMetric(m)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                  selectedMetric === m
                    ? "bg-violet-light text-violet-primary font-bold border border-violet-soft/30"
                    : "text-secondary hover:text-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Gateway Requests"
            value="349,200"
            subtitle="Processed across all models"
            change={{ value: "+24.5%", isPositive: true }}
            icon={<Activity className="w-4 h-4 text-violet-primary" />}
          />
          <StatCard
            title="P95 Edge Latency"
            value="210 ms"
            subtitle="Including TTFT & proxy routing"
            change={{ value: "-12 ms", isPositive: true }}
            icon={<Clock className="w-4 h-4 text-emerald-600" />}
          />
          <StatCard
            title="Error Rate"
            value="0.02%"
            subtitle="Automatic retry coverage active"
            change={{ value: "Healthy", isPositive: true }}
            icon={<AlertTriangle className="w-4 h-4 text-indigo-600" />}
          />
        </div>

        {/* Main Chart */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <div>
              <h3 className="text-base font-semibold text-foreground capitalize">
                {selectedMetric} Velocity Trend
              </h3>
              <p className="text-xs text-secondary">
                Filtered for timeframe: <span className="font-semibold text-foreground">{timeframe}</span>
              </p>
            </div>
            <span className="text-[11px] font-mono text-secondary">
              p50: 160ms • p95: 210ms • p99: 380ms
            </span>
          </div>

          <div className="pt-4">
            <UsageAreaChart data={mockDailyUsageData} metric={selectedMetric} />
          </div>
        </div>

        {/* Provider Latency Benchmarks */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-subtle">
          <h3 className="text-base font-semibold text-foreground mb-4">
            Upstream Provider Latency & Health
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { provider: "Anthropic Claude 3.5", p95: "380ms", status: "Operational", color: "text-emerald-600" },
              { provider: "OpenAI GPT-4o", p95: "340ms", status: "Operational", color: "text-emerald-600" },
              { provider: "Google Gemini 1.5 Pro", p95: "410ms", status: "Operational", color: "text-emerald-600" },
              { provider: "Meta Llama 3.3 70B", p95: "290ms", status: "Operational", color: "text-emerald-600" },
            ].map((p, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-foreground">{p.provider}</span>
                  <span className={`text-[10px] font-semibold ${p.color}`}>● {p.status}</span>
                </div>
                <div className="text-lg font-bold text-foreground font-mono">{p.p95}</div>
                <span className="text-[10px] text-secondary">Median p95 response time</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

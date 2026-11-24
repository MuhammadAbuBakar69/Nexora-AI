"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/ui/stat-card";
import { UsageAreaChart } from "@/components/charts/usage-area-chart";
import {
  mockCustomerTokenUsage,
  mockDailyUsageData,
  mockModelDistribution,
} from "@/data/mock-data";
import { Zap, Coins, ArrowUpRight, ArrowDownRight, Layers, Sliders, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TokenUsagePage() {
  const [softWarningPercent, setSoftWarningPercent] = useState(80);
  const [alertSaved, setAlertSaved] = useState(false);

  const handleSaveAlerts = () => {
    setAlertSaved(true);
    setTimeout(() => setAlertSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="Token Telemetry & Allocation"
        subtitle="Detailed consumption metrics, prompt/completion splits, and quota guardrails"
        
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Allocated Tokens"
            value="50.0M"
            subtitle="Monthly pool budget"
            icon={<Coins className="w-4 h-4 text-violet-primary" />}
            variant="violet"
          />
          <StatCard
            title="Consumed Tokens"
            value="32.45M"
            subtitle="64.9% of limit consumed"
            icon={<Zap className="w-4 h-4 text-indigo-600" />}
          />
          <StatCard
            title="Remaining Balance"
            value="17.55M"
            subtitle="Available computational pool"
            icon={<Coins className="w-4 h-4 text-emerald-600" />}
          />
          <StatCard
            title="Estimated Cost"
            value="$128.45"
            subtitle="Blended rate across models"
            icon={<Zap className="w-4 h-4 text-amber-600" />}
          />
        </div>

        {/* Input vs Output Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-border shadow-subtle flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                Input Prompt Tokens
              </span>
              <div className="text-2xl font-bold text-foreground mt-1">21,890,200</div>
              <p className="text-xs text-secondary mt-0.5">67.4% of total token volume</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-surface border border-border flex items-center justify-center text-foreground font-mono font-bold text-xs">
              IN
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border shadow-subtle flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                Output Completion Tokens
              </span>
              <div className="text-2xl font-bold text-foreground mt-1">10,560,620</div>
              <p className="text-xs text-secondary mt-0.5">32.6% generated completions</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-surface border border-border flex items-center justify-center text-foreground font-mono font-bold text-xs">
              OUT
            </div>
          </div>
        </div>

        {/* Usage Trend Chart */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-subtle">
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Daily Token Consumption Velocity
              </h3>
              <p className="text-xs text-secondary">
                Cumulative prompt + completion tokens proxied per day
              </p>
            </div>
            <span className="text-xs text-violet-primary font-medium bg-violet-light px-3 py-1 rounded-full">
              November 2026 Cycle
            </span>
          </div>
          <div className="pt-4">
            <UsageAreaChart data={mockDailyUsageData} metric="tokens" />
          </div>
        </div>

        {/* Model-wise Consumption Breakdown & Quota Guardrail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Table */}
          <div className="lg:col-span-7 bg-white border border-border rounded-2xl p-6 shadow-subtle">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Model-wise Consumption Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface/50 border-b border-border text-secondary">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Model</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Tokens Consumed</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Share</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Estimated Spend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {mockModelDistribution.map((row, i) => (
                    <tr key={i} className="hover:bg-surface/30">
                      <td className="py-3 px-3 font-medium text-foreground">{row.model}</td>
                      <td className="py-3 px-3 text-right font-mono text-secondary">
                        {(row.tokens / 1_000_000).toFixed(2)}M
                      </td>
                      <td className="py-3 px-3 text-right font-semibold text-foreground">
                        {row.percentage}%
                      </td>
                      <td className="py-3 px-3 text-right text-secondary font-mono">
                        ${row.cost.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quota Ceiling Guardrails */}
          <div className="lg:col-span-5 bg-white border border-border rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-violet-primary" />
                <h3 className="text-base font-semibold text-foreground">Quota Guardrails</h3>
              </div>
              <p className="text-xs text-secondary mb-4 leading-relaxed">
                Configure automated email alerts and gateway throttle responses when your monthly budget is reached.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-secondary">Soft Warning Threshold</span>
                    <span className="font-semibold text-foreground">{softWarningPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={softWarningPercent}
                    onChange={(e) => setSoftWarningPercent(Number(e.target.value))}
                    className="w-full accent-violet-primary"
                  />
                  <p className="text-[10px] text-secondary mt-1">
                    Triggers webhook alert when {(50 * (softWarningPercent / 100)).toFixed(1)}M tokens are reached.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border text-xs text-secondary space-y-1">
                  <div className="font-semibold text-foreground">Hard Ceiling: Enabled</div>
                  <p className="text-[11px]">
                    Requests exceeding 50,000,000 tokens receive HTTP 429 Too Many Requests to prevent billing overruns.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 mt-4">
              <Button size="sm" onClick={handleSaveAlerts} className="w-full text-xs">
                {alertSaved ? "Guardrails Saved ✓" : "Save Guardrail Preferences"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { UsageAreaChart } from "@/components/charts/usage-area-chart";
import { ModelDonutChart } from "@/components/charts/model-donut-chart";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/utils/supabase/client";
import { Activity, Coins, Clock, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [metric, setMetric] = useState<"requests" | "tokens" | "cost">("tokens");
  const [orgsCount, setOrgsCount] = useState<number>(0);
  const [totalTokens, setTotalTokens] = useState<number>(0);

  useEffect(() => {
    async function loadTelemetry() {
      try {
        const supabase = createClient();
        const { count } = await supabase.from("organizations").select("*", { count: "exact", head: true });
        setOrgsCount(count || 0);

        const { data: quotas } = await supabase.from("quota_allocations").select("tokens_allocated");
        const total = quotas?.reduce((acc, q) => acc + (Number(q.tokens_allocated) || 0), 0) || 0;
        setTotalTokens(total);
      } catch (err) {
        // Safe fallback
      }
    }

    loadTelemetry();
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <AdminHeader
        title="Fleet Analytics &amp; Mesh Telemetry"
        subtitle="Global cross-tenant analytics, upstream load distribution, and cost reporting"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Global Edge Latency"
            value="14 ms"
            subtitle="Anycast CDN dispatching"
            icon={<Clock className="w-4 h-4 text-emerald-600" />}
          />
          <StatCard
            title="Provisioned Quota Pool"
            value={totalTokens > 0 ? `${(totalTokens / 1_000_000).toFixed(1)}M` : "0.0M"}
            subtitle="Global token allocation"
            icon={<Coins className="w-4 h-4 text-indigo-600" />}
          />
          <StatCard
            title="Active Workspaces"
            value={orgsCount.toString()}
            subtitle="Tenant organizations on mesh"
            icon={<Activity className="w-4 h-4 text-violet-primary" />}
          />
        </div>

        {/* Global Consumption Chart */}
        <div className="bg-white border border-[#E2E2DA] p-6 relative font-mono">
          <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E2DA] gap-4 mb-4">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
                // Aggregated Fleet Throughput Telemetry
              </h3>
              <p className="text-[11px] text-[#777783] mt-0.5">
                Cumulative gateway request and token velocity across all tenants
              </p>
            </div>

            <div className="inline-flex items-center p-1 bg-[#F6F6F3] border border-[#E2E2DA] gap-1">
              {(["tokens", "requests", "cost"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`px-3 py-1 text-xs uppercase font-mono transition-all border ${
                    metric === m
                      ? "bg-white text-[#111111] font-bold border-[#E2E2DA] shadow-xs"
                      : "text-[#777783] border-transparent hover:text-[#111111]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <UsageAreaChart
              data={[
                { date: "Day 1", tokens: 0, requests: 0, cost: 0 },
                { date: "Day 2", tokens: 0, requests: 0, cost: 0 },
                { date: "Day 3", tokens: 0, requests: 0, cost: 0 },
                { date: "Day 4", tokens: 0, requests: 0, cost: 0 },
                { date: "Day 5", tokens: 0, requests: 0, cost: 0 },
                { date: "Day 6", tokens: 0, requests: 0, cost: 0 },
                { date: "Day 7", tokens: 0, requests: 0, cost: 0 },
              ]}
              metric={metric}
            />
          </div>
        </div>

        {/* Upstream Provider Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12 bg-white border border-[#E2E2DA] p-6 relative font-mono">
            <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
            <div className="pb-4 border-b border-[#E2E2DA] mb-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
                // Upstream Frontier Provider Distribution
              </h3>
              <p className="text-[11px] text-[#777783] mt-0.5">
                Frontier model routing capacity across Google, Anthropic, and OpenAI
              </p>
            </div>
            <ModelDonutChart
              data={[
                { model: "Google Gemini 2.5 Pro & Flash", tokens: 40000000, percentage: 40, cost: 0 },
                { model: "Google Veo Video Engine", tokens: 25000000, percentage: 25, cost: 0 },
                { model: "Anthropic Claude 3.5 Sonnet", tokens: 20000000, percentage: 20, cost: 0 },
                { model: "OpenAI GPT-4o & Embeddings", tokens: 15000000, percentage: 15, cost: 0 },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

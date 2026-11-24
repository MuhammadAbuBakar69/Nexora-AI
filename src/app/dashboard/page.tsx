"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UsageAreaChart } from "@/components/charts/usage-area-chart";
import { ModelDonutChart } from "@/components/charts/model-donut-chart";
import { ApiKeyModal } from "@/components/dashboard/api-key-modal";
import {
  mockCustomerTokenUsage,
  mockDailyUsageData,
  mockModelDistribution,
  mockCustomerApiKeys,
} from "@/data/mock-data";
import {
  Coins,
  Key,
  HardDrive,
  Activity,
  ArrowRight,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { formatNumber, formatBytes } from "@/lib/utils";
import { ApiKey } from "@/types";

export default function CustomerDashboardOverview() {
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [keysList, setKeysList] = useState<ApiKey[]>(mockCustomerApiKeys);
  const [chartMetric, setChartMetric] = useState<"tokens" | "requests" | "cost">("tokens");

  const handleKeyCreated = (newKey: ApiKey) => {
    setKeysList([newKey, ...keysList]);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="Workspace Overview"
        subtitle="Real-time monitoring of tokens, API requests, and model routing"
        
        actionButton={
          <Button size="sm" onClick={() => setIsKeyModalOpen(true)} className="gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" />
            Create API Key
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Notification Banner */}
        <div className="p-4 rounded-2xl bg-white border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-light border border-violet-soft/30 flex items-center justify-center text-violet-primary shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">
                Current Plan: <span className="text-violet-primary">Growth Tier</span> • Monthly Cycle
              </p>
              <p className="text-[11px] text-secondary">
                Auto-renews Dec 1, 2026. Quota resets to 50,000,000 tokens.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/billing">
              <Button variant="outline" size="sm" className="text-xs h-8">
                Manage Subscription
              </Button>
            </Link>
          </div>
        </div>

        {/* Core Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Allocated Tokens"
            value="50.0M"
            subtitle="Monthly workspace quota"
            change={{ value: "100%", isPositive: true }}
            icon={<Coins className="w-4 h-4 text-violet-primary" />}
            variant="violet"
          />

          <StatCard
            title="Tokens Consumed"
            value="32.4M"
            subtitle="64.9% of allocated budget"
            change={{ value: "+18%", isPositive: false }}
            icon={<Activity className="w-4 h-4 text-indigo-600" />}
          />

          <StatCard
            title="Remaining Balance"
            value="17.5M"
            subtitle="Safe buffer remaining"
            icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
          />

          <StatCard
            title="Active API Keys"
            value={keysList.filter((k) => k.status === "active").length}
            subtitle="Provisioned edge credentials"
            icon={<Key className="w-4 h-4 text-amber-600" />}
          />
        </div>

        {/* Charts & Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Area Chart */}
          <div className="lg:col-span-8 bg-white border border-border rounded-2xl p-6 shadow-subtle">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/60 gap-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Consumption Telemetry
                </h3>
                <p className="text-xs text-secondary">
                  Daily token consumption & gateway traffic velocity
                </p>
              </div>

              {/* Metric Selector Pills */}
              <div className="inline-flex items-center p-1 bg-surface border border-border rounded-xl">
                {(["tokens", "requests", "cost"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setChartMetric(m)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                      chartMetric === m
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
              <UsageAreaChart data={mockDailyUsageData} metric={chartMetric} />
            </div>
          </div>

          {/* Model Distribution Donut */}
          <div className="lg:col-span-4 bg-white border border-border rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Model Distribution
              </h3>
              <p className="text-xs text-secondary mb-4">
                Share of tokens consumed per frontier provider
              </p>
              <ModelDonutChart data={mockModelDistribution} />
            </div>

            <div className="pt-4 border-t border-border/60 mt-4 text-center">
              <Link
                href="/dashboard/models"
                className="text-xs text-violet-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                View full model catalog & rates
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Active Keys & Recent Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active API Keys List Preview */}
          <div className="lg:col-span-7 bg-white border border-border rounded-2xl p-6 shadow-subtle">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Active API Credentials
                </h3>
                <p className="text-xs text-secondary">
                  Keys authorized to route via Nexora gateway
                </p>
              </div>
              <Link href="/dashboard/api-keys">
                <Button variant="ghost" size="sm" className="text-xs text-violet-primary">
                  View All ({keysList.length})
                </Button>
              </Link>
            </div>

            <div className="divide-y divide-border/60 pt-2">
              {keysList.slice(0, 3).map((key) => (
                <div key={key.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{key.name}</span>
                      <Badge variant={key.status === "active" ? "success" : "default"} size="sm">
                        {key.status}
                      </Badge>
                    </div>
                    <p className="font-mono text-secondary text-[11px] mt-0.5">{key.maskedKey}</p>
                  </div>
                  <div className="text-right text-secondary text-[11px]">
                    <p>{key.rateLimitRpm} RPM</p>
                    <p className="text-[10px] text-secondary/70">
                      {key.lastUsedAt ? "Active recently" : "Never used"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud Storage Resource Allocation */}
          <div className="lg:col-span-5 bg-white border border-border rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Cloud Storage Capacity
                  </h3>
                  <p className="text-xs text-secondary">
                    Allocated storage for cache & vector artifacts
                  </p>
                </div>
                <HardDrive className="w-4 h-4 text-secondary" />
              </div>

              <div className="py-4 space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-secondary">Total Used: 276.4 GB</span>
                    <span className="font-semibold text-foreground">36.8% of 750 GB</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-primary to-blue-soft h-full w-[36.8%]" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border/80 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-secondary">nexora-cache-us-east4</span>
                    <span className="font-medium text-foreground">84.6 GB</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-secondary">vector-artifacts-eu-west1</span>
                    <span className="font-medium text-foreground">192.4 GB</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/dashboard/storage"
                className="text-xs text-violet-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                Manage cloud storage buckets
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onKeyCreated={handleKeyCreated}
      />
    </div>
  );
}

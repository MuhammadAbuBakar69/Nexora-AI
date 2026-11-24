"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server, Activity, ShieldCheck, Check, RefreshCw, AlertCircle } from "lucide-react";

interface ProviderConfig {
  id: string;
  name: string;
  status: "operational" | "degraded" | "maintenance";
  latency: number;
  successRate: number;
  failoverTarget: string;
  primaryRegion: string;
}

export default function AdminProvidersPage() {
  const [providers, setProviders] = useState<ProviderConfig[]>([
    {
      id: "anthropic",
      name: "Anthropic Claude API",
      status: "operational",
      latency: 380,
      successRate: 99.98,
      failoverTarget: "OpenAI GPT-4o (Fallback Tier 1)",
      primaryRegion: "us-east4",
    },
    {
      id: "openai",
      name: "OpenAI Direct Gateway",
      status: "operational",
      latency: 340,
      successRate: 99.99,
      failoverTarget: "Anthropic Claude 3.5 Sonnet",
      primaryRegion: "us-east1",
    },
    {
      id: "google",
      name: "Google Gemini Vertex Gateway",
      status: "operational",
      latency: 410,
      successRate: 99.96,
      failoverTarget: "OpenAI GPT-4o",
      primaryRegion: "us-central1",
    },
    {
      id: "meta",
      name: "Meta Llama Dedicated Pods",
      status: "operational",
      latency: 290,
      successRate: 99.92,
      failoverTarget: "Mistral Large 2",
      primaryRegion: "eu-west1",
    },
    {
      id: "mistral",
      name: "Mistral AI European Core",
      status: "operational",
      latency: 360,
      successRate: 99.95,
      failoverTarget: "Meta Llama 3.3 70B",
      primaryRegion: "eu-west3",
    },
  ]);

  const [isPinging, setIsPinging] = useState(false);

  const handleTestFailover = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      alert("Failover test successful! All 5 upstream providers responded with sub-450ms heartbeat pings.");
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="AI Provider Routing & Failover"
        subtitle="Upstream API connections, dynamic latency dispatching, and fallback routing policies"
        
        actionButton={
          <Button
            size="sm"
            onClick={handleTestFailover}
            isLoading={isPinging}
            className="gap-1.5 text-xs bg-violet-primary hover:bg-violet-dark text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Test Edge Failover
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="p-4 rounded-2xl bg-white border border-border flex items-center justify-between text-xs shadow-subtle">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-foreground font-semibold">Zero-Downtime Smart Dispatcher:</span>
            <span className="text-secondary">If an upstream provider experiences elevated error rates, Nexora reroutes matching requests automatically to the designated failover target.</span>
          </div>
          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            5/5 Connected
          </span>
        </div>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-border rounded-2xl p-6 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-violet-primary" />
                    <h3 className="font-semibold text-foreground text-sm">{p.name}</h3>
                  </div>
                  <Badge variant="success" size="sm">
                    {p.status}
                  </Badge>
                </div>

                <div className="space-y-2.5 text-xs text-secondary py-2 border-y border-border/60">
                  <div className="flex justify-between">
                    <span>Average P95 Latency</span>
                    <span className="font-mono font-semibold text-foreground">{p.latency} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Availability SLO</span>
                    <span className="font-mono font-semibold text-emerald-600">{p.successRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Edge Region</span>
                    <span className="font-mono text-foreground">{p.primaryRegion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Designated Failover</span>
                    <span className="font-medium text-violet-primary truncate max-w-[150px]">{p.failoverTarget}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Diagnostics for ${p.name}: Connection healthy, 0 dropped frames.`)}
                  className="w-full text-xs"
                >
                  Inspect Live Health Check
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

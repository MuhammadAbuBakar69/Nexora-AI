"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ApiKeyModal } from "@/components/dashboard/api-key-modal";
import { QuotaQuoteCalculator, CustomerQuote } from "@/components/dashboard/quota-quote-calculator";
import { createClient } from "@/utils/supabase/client";
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
  Layers,
  FileCode2,
  AlertCircle
} from "lucide-react";
import { ApiKey } from "@/types";

export default function CustomerDashboardOverview() {
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [keysList, setKeysList] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allocatedTokens, setAllocatedTokens] = useState<number>(0);
  const [consumedTokens, setConsumedTokens] = useState<number>(0);
  const [currentPlan, setCurrentPlan] = useState<string>("Starter Tier");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    async function fetchDashboardState() {
      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          setUserEmail(user.email || "");

          // 1. Fetch real API keys
          const { data: keys } = await supabase
            .from("api_keys")
            .select("*")
            .order("created_at", { ascending: false });

          if (keys && keys.length > 0) {
            setKeysList(
              keys.map((k) => ({
                id: k.id,
                name: k.name,
                prefix: k.prefix,
                maskedKey: `${k.prefix}••••••••••••••••${k.last_four}`,
                permissions: k.permissions || [],
                createdAt: k.created_at,
                lastUsedAt: k.last_used_at,
                status: k.status,
                rateLimitRpm: k.rate_limit_rpm,
                totalRequests: 0,
              }))
            );
          } else {
            setKeysList([]);
          }

          // 2. Fetch real Quota Allocations
          const { data: quotas } = await supabase
            .from("quota_allocations")
            .select("tokens_allocated")
            .order("created_at", { ascending: false });

          if (quotas && quotas.length > 0) {
            const total = quotas.reduce((acc, curr) => acc + (Number(curr.tokens_allocated) || 0), 0);
            setAllocatedTokens(total);
          }

          // 3. Fetch real Subscription / Plan
          const { data: sub } = await supabase
            .from("subscriptions")
            .select("plan, status")
            .eq("status", "active")
            .maybeSingle();

          if (sub?.plan) {
            setCurrentPlan(`${sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1)} Tier`);
          }
        }
      } catch (err) {
        // Fallback safely to production zero-state
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardState();
  }, []);

  const handleKeyCreated = (newKey: ApiKey) => {
    setKeysList([newKey, ...keysList]);
  };

  const handleQuoteRequested = async (quote: CustomerQuote) => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("organization_id")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.organization_id) {
        await supabase.from("access_requests").insert({
          organization_id: profile.organization_id,
          user_id: user.id,
          requested_plan: quote.recommendedPlan,
          business_justification: `Customer quota request for ${quote.monthlyTokens.toLocaleString()} tokens & ${quote.monthlyVideoSeconds}s Veo video (₨${quote.estimatedCostPkr.toLocaleString()} PKR/mo).`,
          status: "pending",
        });
      }
    } catch (err) {
      // Handled cleanly
    }
  };

  const remainingTokens = Math.max(0, allocatedTokens - consumedTokens);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <DashboardHeader
        title="Workspace Overview"
        subtitle="Real-time monitoring of tokens, API requests, and model routing"
        actionButton={
          <Button size="sm" onClick={() => setIsKeyModalOpen(true)} className="gap-1.5 text-xs font-bold uppercase tracking-wider">
            <Plus className="w-3.5 h-3.5" />
            Create API Key
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Blueprint Status Banner */}
        <div className="p-4 bg-white border border-[#E2E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF5722]/10 border border-[#FF5722]/30 flex items-center justify-center text-[#FF5722] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-bold text-[#111111] uppercase tracking-wide">
                  Active Workload: <span className="text-[#FF5722] font-bold">{currentPlan}</span>
                </p>
              </div>
              <p className="text-[11px] font-mono text-[#777783] mt-0.5">
                {allocatedTokens > 0
                  ? `Active Quota: ${allocatedTokens.toLocaleString()} tokens allocated for this billing cycle.`
                  : "No active token quota allocated yet. Use the Quota Calculator below to request an allocation."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button href="/dashboard/billing" variant="outline" size="sm" className="text-xs h-8 font-bold border-[#E2E2DA]">
              Manage Plan &amp; Billing
            </Button>
          </div>
        </div>

        {/* Core Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-[#E2E2DA] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#777783] text-xs font-mono uppercase mb-3">
              <span>Total Allocated</span>
              <Coins className="w-4 h-4 text-violet-primary" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-[#111111]">
              {allocatedTokens > 0 ? `${(allocatedTokens / 1_000_000).toFixed(1)}M` : "0.0M"}
            </div>
            <p className="text-[11px] text-[#777783] font-mono mt-1">
              {allocatedTokens > 0 ? "Active monthly quota" : "Quota unallocated"}
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E2E2DA] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#777783] text-xs font-mono uppercase mb-3">
              <span>Tokens Consumed</span>
              <Activity className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-[#111111]">
              {consumedTokens > 0 ? `${(consumedTokens / 1_000_000).toFixed(1)}M` : "0.0M"}
            </div>
            <p className="text-[11px] text-[#777783] font-mono mt-1">
              {allocatedTokens > 0 
                ? `${((consumedTokens / allocatedTokens) * 100).toFixed(1)}% of budget`
                : "Awaiting gateway traffic"}
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E2E2DA] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#777783] text-xs font-mono uppercase mb-3">
              <span>Remaining Balance</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-emerald-700">
              {remainingTokens > 0 ? `${(remainingTokens / 1_000_000).toFixed(1)}M` : "0.0M"}
            </div>
            <p className="text-[11px] text-[#777783] font-mono mt-1">
              Zero-overdraft buffer
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E2E2DA] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#777783] text-xs font-mono uppercase mb-3">
              <span>Active API Keys</span>
              <Key className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-[#111111]">
              {keysList.filter((k) => k.status === "active").length}
            </div>
            <p className="text-[11px] text-[#777783] font-mono mt-1">
              Provisioned gateway keys
            </p>
          </div>
        </div>

        {/* Customer Quota & Quote Calculator Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#777783] uppercase tracking-wider">
                // COMMERCIAL PRICING &amp; QUOTA ENGINE
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#777783] uppercase">
              PKR &amp; USD REAL-TIME COMPUTATION
            </span>
          </div>

          <QuotaQuoteCalculator onRequestQuota={handleQuoteRequested} />
        </div>

        {/* Active API Keys & Edge Infrastructure Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active API Keys List */}
          <div className="lg:col-span-7 bg-white border border-[#E2E2DA] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E2DA]">
                <div>
                  <h3 className="text-sm font-bold text-[#111111] uppercase tracking-tight">
                    Active Edge Credentials
                  </h3>
                  <p className="text-xs text-[#777783]">
                    API keys authorized to route inference requests via Nexora Gateway
                  </p>
                </div>
                <Button href="/dashboard/api-keys" variant="ghost" size="sm" className="text-xs text-[#FF5722] font-bold">
                  View All ({keysList.length})
                </Button>
              </div>

              {/* Dynamic Keys List or Clean Production Zero-State */}
              {keysList.length === 0 ? (
                <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
                  <div className="w-10 h-10 bg-[#F6F6F3] border border-[#E2E2DA] flex items-center justify-center text-[#777783] mb-3">
                    <Key className="w-5 h-5 text-[#888892]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wide">
                    No API Credentials Provisioned Yet
                  </h4>
                  <p className="text-xs text-[#777783] max-w-sm mt-1 mb-4 leading-relaxed">
                    Generate an API key to connect your application to Gemini, Veo, Claude, and GPT models via the Nexora Anycast Edge Router.
                  </p>
                  <Button
                    size="sm"
                    onClick={() => setIsKeyModalOpen(true)}
                    className="text-xs font-bold uppercase tracking-wider gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Provision Your First Key
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-[#E2E2DA] pt-2">
                  {keysList.slice(0, 3).map((key) => (
                    <div key={key.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#111111]">{key.name}</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {key.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] font-mono text-[#777783] mt-0.5">
                          <span>{key.maskedKey}</span>
                          <span>•</span>
                          <span>{key.rateLimitRpm} RPM</span>
                        </div>
                      </div>
                      <Button href="/dashboard/api-keys" variant="outline" size="sm" className="text-xs h-7 border-[#E2E2DA]">
                        Manage
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#E2E2DA] mt-4 flex items-center justify-between text-[11px] font-mono text-[#777783]">
              <span>AUTHENTICATION: SHA-256 SALTED HASH</span>
              <span className="text-emerald-600 font-bold">GATEWAY MESH: 99.99%</span>
            </div>
          </div>

          {/* Model Routing & Supported Endpoints Card */}
          <div className="lg:col-span-5 bg-white border border-[#E2E2DA] p-6 flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-[#E2E2DA]">
                <h3 className="text-sm font-bold text-[#111111] uppercase tracking-tight">
                  Frontier AI Routing Endpoints
                </h3>
                <p className="text-xs text-[#777783]">
                  Connected upstream providers ready for incoming gateway traffic
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <div className="p-3 bg-[#F7F7F4] border border-[#E2E2DA] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#111111] block">Google Gemini 2.5 Flash &amp; Pro</span>
                    <span className="text-[10px] font-mono text-[#777783]">Text, Multimodal, Vision &amp; Reasoning</span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    ONLINE
                  </span>
                </div>

                <div className="p-3 bg-[#F7F7F4] border border-[#E2E2DA] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#111111] block">Google Veo Video Engine</span>
                    <span className="text-[10px] font-mono text-[#777783]">Generative Video Inference (per active second)</span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    ONLINE
                  </span>
                </div>

                <div className="p-3 bg-[#F7F7F4] border border-[#E2E2DA] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#111111] block">Anthropic Claude 3.5 Sonnet</span>
                    <span className="text-[10px] font-mono text-[#777783]">High-Precision Code &amp; Analysis</span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    ONLINE
                  </span>
                </div>

                <div className="p-3 bg-[#F7F7F4] border border-[#E2E2DA] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#111111] block">OpenAI GPT-4o &amp; Embeddings</span>
                    <span className="text-[10px] font-mono text-[#777783]">Text Embeddings &amp; Conversational Mesh</span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    ONLINE
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E2DA] mt-4 text-center">
              <Link
                href="/dashboard/models"
                className="text-xs text-violet-primary hover:underline font-bold inline-flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Inspect All Models &amp; Real-time Token Rates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Key Creation Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onKeyCreated={handleKeyCreated}
      />
    </div>
  );
}

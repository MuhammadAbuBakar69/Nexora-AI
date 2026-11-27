"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  GitBranch,
  Server,
  Activity,
  HardDrive,
  KeyRound,
  Check,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArchitectureFlowSection } from "@/components/landing/architecture-flow";
import { EdgeTopologySection } from "@/components/landing/edge-topology";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";

export default function PlatformPage() {
  const [activeTab, setActiveTab] = useState<"routing" | "quotas" | "caching" | "storage">("routing");

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F3] font-sans select-none">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* CAD Blueprint Platform Hero */}
        <section className="relative py-20 sm:py-28 overflow-hidden bg-[#F6F6F3] border-b border-[#E2E2DA]">
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply z-[1]"
            style={{
              backgroundImage:
                "radial-gradient(#111111 1px, transparent 1px), radial-gradient(#111111 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              backgroundPosition: "0 0, 12px 12px",
            }}
          />

          <span className="absolute top-4 left-4 font-mono text-sm font-semibold text-[#888892] select-none">+</span>
          <span className="absolute top-4 right-4 font-mono text-sm font-semibold text-[#888892] select-none">+</span>
          <span className="absolute bottom-4 left-4 font-mono text-sm font-semibold text-[#888892] select-none">+</span>
          <span className="absolute bottom-4 right-4 font-mono text-sm font-semibold text-[#888892] select-none">+</span>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center font-mono">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-[10px] uppercase font-bold tracking-wider text-violet-primary bg-violet-50 px-2.5 py-1 border border-violet-200">
                DWG: SPEC-PLATFORM-01 // CORE MESH
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#111111] mb-6 leading-[1.08]">
              THE INTELLIGENT CONTROL PLANE FOR <span className="text-violet-primary">FRONTIER AI</span> WORKLOADS
            </h1>

            <p className="text-xs sm:text-sm text-[#444452] max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
              Explore the multi-layer infrastructure powering Nexora: sub-20ms edge termination, granular token quota governance, distributed semantic vector caching, and automated multi-cloud failover.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                href="/signup"
                size="lg"
                className="w-full sm:w-auto bg-[#111111] text-white hover:bg-black font-bold uppercase tracking-wider text-xs px-8 py-3.5 border border-[#111111]"
              >
                <span>Deploy Gateway Key</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                href="/developers"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white text-[#111111] hover:bg-[#F2F2EE] font-bold uppercase tracking-wider text-xs px-7 py-3.5 border border-[#E2E2DA]"
              >
                <Terminal className="w-4 h-4 mr-2 text-[#777783]" />
                <span>Developer Quickstart</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Interactive Architecture Pillars Navigation */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E2E2DA]">
          <div className="max-w-3xl mb-10 font-mono">
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-primary bg-violet-50 px-2.5 py-1 border border-violet-200">
              ARCHITECTURE SPECIFICATIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] mt-4 mb-2">
              FOUR CORE INFRASTRUCTURE PILLARS
            </h2>
            <p className="text-xs sm:text-sm text-[#555562] font-sans">
              Select an architectural layer below to examine its internal mechanics, telemetry headers, and reliability guarantees.
            </p>
          </div>

          {/* Pillar Tabs in CAD Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 font-mono">
            {[
              { id: "routing", label: "Smart Routing & Failover", icon: GitBranch },
              { id: "quotas", label: "Token Quota Engine", icon: Zap },
              { id: "caching", label: "Semantic Vector Caching", icon: Database },
              { id: "storage", label: "Encrypted Cloud Partitions", icon: HardDrive },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`p-4 border transition-all text-left flex items-center gap-3 relative ${isSelected
                    ? "bg-white border-[#111111] ring-1 ring-[#111111]"
                    : "bg-[#F7F7F4] border-[#E2E2DA] hover:border-[#111111]"
                    }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-violet-primary" : "text-[#777783]"}`} />
                  <span className="text-xs font-bold uppercase text-[#111111]">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="bg-white border border-[#E2E2DA] p-6 sm:p-10 relative font-mono">
            <span className="absolute top-2 left-2 text-xs text-[#888892] select-none">+</span>
            <span className="absolute top-2 right-2 text-xs text-[#888892] select-none">+</span>
            <span className="absolute bottom-2 left-2 text-xs text-[#888892] select-none">+</span>
            <span className="absolute bottom-2 right-2 text-xs text-[#888892] select-none">+</span>

            {activeTab === "routing" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[10px] uppercase text-violet-primary font-bold">
                    LAYER 01 // DYNAMIC PROXY ROUTER
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#111111]">
                    Sub-second Multi-Provider Failover &amp; Load Balancing
                  </h3>
                  <p className="text-xs text-[#555562] leading-relaxed font-sans">
                    Nexora maintains persistent connection pools to Google Gemini, Google Veo, Anthropic, and OpenAI. If upstream providers throttle (HTTP 429) or return 500/503 errors, traffic cascades to your secondary configured fallback in under 12 milliseconds.
                  </p>
                  <div className="space-y-2 pt-2 text-xs font-sans">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero-code SDK provider switching via standard model identifiers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Standardized OpenAI-compatible payload transformation across all providers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Circuit breakers isolate flaky endpoints without crashing client microservices</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#111111] p-5 text-white font-mono text-xs border border-[#333333] space-y-3">
                  <div className="text-[10px] text-[#888899] pb-2 border-b border-[#282828] flex justify-between">
                    <span>CIRCUIT BREAKER STATE</span>
                    <span className="text-emerald-400 font-bold">STATUS: ACTIVE</span>
                  </div>
                  <pre className="text-[11px] text-[#DDDDDD] overflow-x-auto leading-relaxed">
                    {`{
  "route": "google/gemini-2.5-flash",
  "circuit_breaker": "CLOSED",
  "upstream_latency_p95": "18ms",
  "concurrency_limit": 2500,
  "fallback_model": "anthropic/claude-3-5-sonnet"
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "quotas" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[10px] uppercase text-violet-primary font-bold">
                    LAYER 02 // VOLATILE MEMORY LEDGER
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#111111]">
                    Sub-millisecond Token Accounting &amp; Quota Ceilings
                  </h3>
                  <p className="text-xs text-[#555562] leading-relaxed font-sans">
                    Every incoming prompt is tokenized and debited against the organization’s in-memory volatile quota buffer in sub-0.8ms. Hard ceiling limits enforce zero overdrafts by returning standard HTTP 429 status codes.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-[#111111] p-5 text-white font-mono text-xs border border-[#333333] space-y-3">
                  <div className="text-[10px] text-[#888899] pb-2 border-b border-[#282828] flex justify-between">
                    <span>LEDGER EVALUATION</span>
                    <span className="text-emerald-400 font-bold">200 AUTHORIZED</span>
                  </div>
                  <pre className="text-[11px] text-[#DDDDDD] overflow-x-auto leading-relaxed">
                    {`{
  "tenant_id": "org_enterprise_primary",
  "allocated_quota": 75000000,
  "consumed_tokens": 32410800,
  "overdraft_protection": "STRICT_HARD_CEILING"
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "caching" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[10px] uppercase text-violet-primary font-bold">
                    LAYER 03 // VECTOR CACHE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#111111]">
                    Sub-5ms Semantic Vector Prompt Caching
                  </h3>
                  <p className="text-xs text-[#555562] leading-relaxed font-sans">
                    Identical or high-similarity prompts (cosine similarity ≥ 0.96) return cached completions from your encrypted tenant partition, reducing external API token charges by up to 40%.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-[#111111] p-5 text-white font-mono text-xs border border-[#333333] space-y-3">
                  <div className="text-[10px] text-[#888899] pb-2 border-b border-[#282828] flex justify-between">
                    <span>VECTOR INDEX EVALUATION</span>
                    <span className="text-violet-400 font-bold">CACHE HIT (0.984)</span>
                  </div>
                  <pre className="text-[11px] text-[#DDDDDD] overflow-x-auto leading-relaxed">
                    {`{
  "cache_status": "HIT",
  "cosine_similarity": 0.984,
  "latency_saved": "320ms",
  "cost_saved": "100%"
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "storage" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[10px] uppercase text-violet-primary font-bold">
                    LAYER 04 // STORAGE VAULTS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#111111]">
                    Hardware KMS Encrypted Vector Partitions
                  </h3>
                  <p className="text-xs text-[#555562] leading-relaxed font-sans">
                    Vector caches and telemetry partitions are isolated per tenant with hardware AES-256-GCM encryption. CMEK customer-managed keys available for enterprise compliance.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-[#111111] p-5 text-white font-mono text-xs border border-[#333333] space-y-3">
                  <div className="text-[10px] text-[#888899] pb-2 border-b border-[#282828] flex justify-between">
                    <span>VAULT SECURITY</span>
                    <span className="text-emerald-400 font-bold">AES-256-GCM</span>
                  </div>
                  <pre className="text-[11px] text-[#DDDDDD] overflow-x-auto leading-relaxed">
                    {`{
  "vault_id": "vlt_tenant_sec_01",
  "cipher": "AES-256-GCM",
  "key_derivation": "PBKDF2_SHA256",
  "isolation_mode": "TENANT_SEPARATE"
}`}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* In-depth Request Lifecycle Flow */}
        <ArchitectureFlowSection />

        {/* Global Edge Topology */}
        <EdgeTopologySection />
      </main>

      <Footer />
    </div>
  );
}

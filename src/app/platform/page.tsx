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
  RefreshCw,
  Server,
  Activity,
  HardDrive,
  KeyRound,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArchitectureFlowSection } from "@/components/landing/architecture-flow";
import { EdgeTopologySection } from "@/components/landing/edge-topology";

export default function PlatformPage() {
  const [activeTab, setActiveTab] = useState<"routing" | "quotas" | "caching" | "storage">("routing");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Editorial Platform Hero */}
        <section className="relative py-20 sm:py-28 overflow-hidden bg-white border-b border-border">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-hero-glow blur-3xl pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase font-semibold tracking-wider text-violet-primary bg-violet-light px-3 py-1 rounded-full border border-violet-soft/30 inline-flex items-center gap-1.5 mb-6">
              <Cpu className="w-3.5 h-3.5" />
              Nexora Core Architecture
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#111111] mb-6 leading-[1.08] font-heritage">
              The Intelligent Control Plane
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-primary via-[#5D38F0] to-[#7E88FF]">
                for Frontier AI Workloads.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
              Explore the multi-layer infrastructure powering Nexora: sub-20ms edge termination, granular token quota governance, distributed semantic vector caching, and automated multi-cloud failover.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="shadow-md gap-2 font-medium">
                  Deploy Free Gateway Key
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/developers">
                <Button variant="secondary" size="lg" className="gap-2">
                  <Terminal className="w-4 h-4 text-secondary" />
                  Read Developer Documentation
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Architecture Pillars Navigation */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-semibold text-foreground font-heritage">
              Four Core Infrastructure Pillars
            </h2>
            <p className="text-secondary text-sm mt-2">
              Select an architectural layer below to examine its internal mechanics, telemetry headers, and reliability guarantees.
            </p>
          </div>

          {/* Pillar Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { id: "routing", label: "Smart Routing & Failover", icon: GitBranch },
              { id: "quotas", label: "Token Quota Engine", icon: Zap },
              { id: "caching", label: "Semantic Vector Caching", icon: Database },
              { id: "storage", label: "Encrypted Cloud Partitions", icon: HardDrive },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
                    activeTab === tab.id
                      ? "bg-violet-light/50 border-violet-soft text-foreground shadow-subtle"
                      : "bg-surface border-border text-secondary hover:text-foreground hover:bg-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      activeTab === tab.id ? "text-violet-primary" : "text-secondary"
                    }`}
                  />
                  <span className="text-xs sm:text-sm font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="bg-[#FAFAFC] border border-border rounded-3xl p-6 sm:p-10 shadow-premium">
            {activeTab === "routing" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono uppercase text-violet-primary font-bold">
                    LAYER 01 // DYNAMIC PROXY ROUTER
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heritage text-[#111111]">
                    Sub-second Multi-Provider Failover & Load Balancing
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    Nexora maintains persistent connection pools to OpenAI, Anthropic, Google Vertex, and open-weights clusters. If upstream providers throttle your application (HTTP 429), return 500/503 errors, or breach your latency SLA, Nexora dynamically cascades requests to your secondary configured fallback in under 12 milliseconds.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero-code SDK provider switching via <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-border">model: &quot;auto-cheapest&quot;</code> or <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-border">&quot;auto-fastest&quot;</code></span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Standardized OpenAI-compatible payload transformation across all providers</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Circuit breakers isolate flaky endpoints without crashing client microservices</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#100E20] rounded-2xl p-5 text-white font-mono text-xs border border-white/10 space-y-3">
                  <div className="text-[11px] text-violet-soft pb-2 border-b border-white/10 flex justify-between">
                    <span>CIRCUIT BREAKER STATE</span>
                    <span className="text-emerald-400">STATUS: ACTIVE</span>
                  </div>
                  <pre className="text-[11px] text-white/80 leading-relaxed overflow-x-auto">
{`{
  "target_model": "claude-3-5-sonnet",
  "active_upstream": "anthropic-us-east-1",
  "circuit_breaker": "CLOSED",
  "p95_latency_ms": 320,
  "error_rate_window": 0.0001,
  "fallback_rules": [
    { "on": [429, 503], "route_to": "gpt-4o" },
    { "on": "ttft > 1800ms", "route_to": "gemini-1.5-pro" }
  ]
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "quotas" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono uppercase text-violet-primary font-bold">
                    LAYER 02 // RATE & QUOTA ENFORCEMENT
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heritage text-[#111111]">
                    Granular Token Governance with Hard & Soft Ceilings
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    Protect your organization from runaway AI bills. Allocate dedicated token quotas to individual teams, projects, or external clients. Nexora delivers real-time token tracking in high-speed Redis-compatible memory, firing webhook warnings at 80% usage and gracefully enforcing hard limits.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Separate token pools for Prompt Ingress vs. Completion Generation</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Per-key concurrency rate limits (Tokens/min and Requests/min)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Automated monthly rollover or hard expiration policies</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#100E20] rounded-2xl p-5 text-white font-mono text-xs border border-white/10 space-y-3">
                  <div className="text-[11px] text-violet-soft pb-2 border-b border-white/10 flex justify-between">
                    <span>TOKEN GOVERNANCE POLICY</span>
                    <span className="text-amber-300">LIMIT: ENFORCED</span>
                  </div>
                  <pre className="text-[11px] text-white/80 leading-relaxed overflow-x-auto">
{`{
  "tenant_id": "cust_acme_corp",
  "monthly_allowance": 50000000,
  "consumed_tokens": 32410800,
  "burn_rate_pct": 64.82,
  "soft_alert_threshold": 0.80,
  "hard_ceiling_action": "REJECT_WITH_429",
  "burst_allowance_pct": 0.15,
  "reset_timestamp": "2026-12-01T00:00:00Z"
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "caching" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono uppercase text-violet-primary font-bold">
                    LAYER 03 // VECTOR CACHING ENGINE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heritage text-[#111111]">
                    Sub-5ms Semantic Vector Caching
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    Identical or semantically equivalent prompts don&apos;t need to hit expensive frontier models repeatedly. Nexora calculates high-speed vector embeddings and performs nearest-neighbor lookups inside your private tenant cache, returning full completions in milliseconds at zero upstream cost.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Configurable similarity threshold (e.g., 0.95 to 1.0 exact match)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Reduces repeated prompt costs by up to 40% on production workloads</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Custom TTL (Time-To-Live) cache invalidation rules per API key</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#100E20] rounded-2xl p-5 text-white font-mono text-xs border border-white/10 space-y-3">
                  <div className="text-[11px] text-violet-soft pb-2 border-b border-white/10 flex justify-between">
                    <span>SEMANTIC VECTOR LOOKUP</span>
                    <span className="text-emerald-400">CACHE HIT</span>
                  </div>
                  <pre className="text-[11px] text-white/80 leading-relaxed overflow-x-auto">
{`// Vector Embedding Match
prompt_hash: "sha256:d8a93e..."
embedding_dimensions: 1536
similarity_score: 0.982
threshold_required: 0.960
cache_lookup_latency: "3.4ms"
upstream_model_bypassed: true
tokens_saved: 2450
cost_delta: "$0.00 vs $0.042"`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "storage" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono uppercase text-violet-primary font-bold">
                    LAYER 04 // CLOUD RESOURCE STORAGE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heritage text-[#111111]">
                    Encrypted Multi-Region Object & Vector Partitions
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    Store fine-tuning datasets, prompt template repositories, generated artifacts, and multimodal assets in customer-isolated storage partitions. Directly integrated with Nexora&apos;s API gateway for high-throughput streaming attachments.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Hardware-backed AES-256 GCM encryption at rest and in transit</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Native S3-compatible and Google Cloud Storage bucket peering</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Automated versioning and immutable retention policies</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#100E20] rounded-2xl p-5 text-white font-mono text-xs border border-white/10 space-y-3">
                  <div className="text-[11px] text-violet-soft pb-2 border-b border-white/10 flex justify-between">
                    <span>STORAGE PARTITION SPEC</span>
                    <span className="text-emerald-400">ENCRYPTED</span>
                  </div>
                  <pre className="text-[11px] text-white/80 leading-relaxed overflow-x-auto">
{`{
  "partition_id": "vol_eu_fra_01",
  "tenant_id": "cust_88291",
  "allocated_gb": 150,
  "consumed_gb": 48.6,
  "encryption": "AES-256-GCM (AWS-KMS)",
  "replication": "MULTI-AZ (Frankfurt/Dublin)",
  "throughput_mbps": 1200,
  "access_protocol": "S3-COMPATIBLE / HTTPS"
}`}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Global Edge Topology Section */}
        <EdgeTopologySection />

        {/* Interactive Request Flow Section */}
        <ArchitectureFlowSection />

        {/* Technical Specification Table */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold text-foreground font-heritage">
              Complete Technical Specifications
            </h2>
            <p className="text-secondary text-sm mt-2">
              Architectural tolerances, protocol compliance, and security dimensions.
            </p>
          </div>

          <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-surface border-b border-border">
                  <tr className="text-secondary font-semibold">
                    <th className="py-3.5 px-6">Specification Parameter</th>
                    <th className="py-3.5 px-6">Nexora Standard</th>
                    <th className="py-3.5 px-6">Industry Average</th>
                    <th className="py-3.5 px-6">Benefit to Engineers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-secondary">
                  <tr>
                    <td className="py-4 px-6 font-medium text-foreground">Edge Termination Latency</td>
                    <td className="py-4 px-6 text-emerald-600 font-mono font-semibold">14 - 28 ms (Anycast)</td>
                    <td className="py-4 px-6 font-mono">110 - 250 ms</td>
                    <td className="py-4 px-6">Faster TTFT for interactive chat & agent reasoning</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-foreground">Failover Switch Latency</td>
                    <td className="py-4 px-6 text-emerald-600 font-mono font-semibold">&lt; 12 ms</td>
                    <td className="py-4 px-6 font-mono">3,000+ ms (Manual)</td>
                    <td className="py-4 px-6">Zero downtime during upstream OpenAI/Anthropic outages</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-foreground">Data Retention Policy</td>
                    <td className="py-4 px-6 text-emerald-600 font-semibold">Zero-Data Retention (ZDR)</td>
                    <td className="py-4 px-6">30-day logs stored</td>
                    <td className="py-4 px-6">HIPAA & SOC2 audit conformance without custom BAAs</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-foreground">Streaming Protocols</td>
                    <td className="py-4 px-6 font-mono text-foreground font-semibold">HTTP/2 SSE & WebSockets</td>
                    <td className="py-4 px-6 font-mono">HTTP/1.1 chunked</td>
                    <td className="py-4 px-6">Smooth word-by-word streaming without connection drops</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-foreground">Encryption Standard</td>
                    <td className="py-4 px-6 font-mono text-foreground font-semibold">TLS 1.3 / AES-256-GCM</td>
                    <td className="py-4 px-6 font-mono">TLS 1.2</td>
                    <td className="py-4 px-6">Military-grade protection for proprietary prompt IP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#100E20] text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl sm:text-5xl font-bold font-heritage mb-4">
              Ready to unify your AI architecture?
            </h2>
            <p className="text-secondary text-sm sm:text-base max-w-xl mx-auto mb-8 text-white/70">
              Start integrating with one unified API key today. No credit card required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-[#100E20] hover:bg-violet-light font-semibold">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  Open Live Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

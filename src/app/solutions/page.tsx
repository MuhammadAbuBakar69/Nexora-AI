"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Rocket,
  Building2,
  Users2,
  Bot,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  BarChart3,
  Lock,
  Globe2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CaseStudiesSection } from "@/components/landing/case-studies";
import { SecurityComplianceSection } from "@/components/landing/security-compliance";

export default function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState<"startups" | "enterprise" | "agencies" | "agents">("startups");

  const solutions = {
    startups: {
      title: "AI Startups & Scaleups",
      badge: "Rapid Scale & Zero Vendor Lock-in",
      headline: "Ship multi-model AI features without building complex backend plumbing.",
      description:
        "Avoid rewrites and vendor lock-in as model benchmarks shift weekly. With Nexora, your engineers write to one unified interface and instantly leverage Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro, and Llama 3.3 with automatic fallback and predictable token spending.",
      benefits: [
        "Single API key integration across OpenAI, Anthropic, Google, and Meta",
        "Semantic caching cuts early-stage token costs by up to 40%",
        "Soft limit alerts prevent surprise bills when your product goes viral",
        "Free tier with 10M tokens to prototype and validate fast",
      ],
      stat: "4.2x Faster",
      statLabel: "Time to market for new AI features",
    },
    enterprise: {
      title: "Regulated Enterprise & FinTech",
      badge: "Bank-Grade Compliance & Security",
      headline: "Deploy frontier generative AI with Zero Data Retention and absolute control.",
      description:
        "Satisfy the most stringent security, legal, and compliance standards. Nexora guarantees Zero Data Retention (ZDR), hardware-backed AES-256 KMS key isolation, private VPC peering, and tamper-proof SHA-256 HMAC audit logs for SOC2 Type II and HIPAA certification.",
      benefits: [
        "Zero-Data Retention (ZDR): No prompts or completions ever written to persistent disk",
        "Dedicated AWS PrivateLink and Google Cloud Interconnect VPC peering",
        "Customer-Managed Encryption Keys (CMEK) via AWS KMS or HashiCorp Vault",
        "Granular Role-Based Access Control (RBAC) and immutable audit ledgers",
      ],
      stat: "100% ZDR",
      statLabel: "Zero data retention on inference payloads",
    },
    agencies: {
      title: "AI Consultancies & Software Agencies",
      badge: "Multi-Tenant Client Governance",
      headline: "Manage 50+ client accounts and token budgets from one master console.",
      description:
        "Stop juggling separate billing accounts, individual credit cards, and chaotic API keys for every client project. Nexora gives agencies multi-tenant workspaces with customer-scoped API keys, individual token allocations, and transparent usage telemetry.",
      benefits: [
        "Issue client-specific API keys with pre-funded token quotas",
        "Real-time usage breakdown per client for exact, frictionless pass-through billing",
        "Revoke or adjust client permissions instantly from the master admin dashboard",
        "Separate cloud storage partitions for client vector databases and fine-tunes",
      ],
      stat: "94% Fewer",
      statLabel: "Billing disputes and invoice reconciliations",
    },
    agents: {
      title: "Autonomous Agent Swarms",
      badge: "High-Concurrency Parallel Workflows",
      headline: "Scale agentic workflows with 10k+ concurrent tool calls and automatic backoff.",
      description:
        "Autonomous multi-agent swarms generate massive spikes of concurrent tool calls and reasoning loops that trigger immediate rate-limiting from standard LLM endpoints. Nexora provides high-throughput queuing, sub-second retry backoff, and parallel stream coordination.",
      benefits: [
        "Handles 10,000+ parallel async requests without dropped frames or socket exhaustion",
        "Sub-second circuit breaking cascades to secondary models when upstream latency spikes",
        "Token usage rate-limits enforced per-agent to prevent infinite recursive loop expenses",
        "Persistent HTTP/2 connection pooling minimizes connection setup overhead",
      ],
      stat: "99.99%",
      statLabel: "Agent swarm execution completion rate",
    },
  };

  const current = solutions[activeSolution];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Editorial Solutions Hero */}
        <section className="relative py-20 sm:py-28 overflow-hidden bg-white border-b border-border">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-hero-glow blur-3xl pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase font-semibold tracking-wider text-violet-primary bg-violet-light px-3 py-1 rounded-full border border-violet-soft/30 inline-flex items-center gap-1.5 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Tailored Engineering Solutions
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#111111] mb-6 leading-[1.08] font-heritage">
              Architected for Every Scale.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-primary via-[#5D38F0] to-[#7E88FF]">
                From Seed to Global Enterprise.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
              Whether you are an ambitious AI startup shipping your first agent or a multinational bank orchestrating millions of daily requests, Nexora provides the precise controls your infrastructure requires.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="shadow-md gap-2 font-medium">
                  Start Your Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="lg" className="gap-2">
                  View Pricing Tiers
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Segment Showcase */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Solution Selector Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            {[
              { id: "startups", label: "Startups & Scaleups", icon: Rocket },
              { id: "enterprise", label: "Enterprise & FinTech", icon: Building2 },
              { id: "agencies", label: "AI Consultancies & Agencies", icon: Users2 },
              { id: "agents", label: "Autonomous Agent Swarms", icon: Bot },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSolution(item.id as any)}
                  className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
                    activeSolution === item.id
                      ? "bg-violet-light/50 border-violet-soft text-foreground shadow-subtle"
                      : "bg-surface border-border text-secondary hover:text-foreground hover:bg-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      activeSolution === item.id ? "text-violet-primary" : "text-secondary"
                    }`}
                  />
                  <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Solution Detail Card */}
          <div className="bg-[#FAFAFC] border border-border rounded-3xl p-6 sm:p-10 shadow-premium">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-violet-primary bg-violet-light/60 px-3 py-1 rounded-full border border-violet-soft/30">
                    {current.badge}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold font-heritage text-[#111111] mt-3 mb-3 leading-snug">
                    {current.headline}
                  </h2>
                  <p className="text-sm sm:text-base text-secondary leading-relaxed">
                    {current.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {current.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Link href="/signup">
                    <Button size="sm" className="gap-1.5 font-medium">
                      Deploy Solution Architecture
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <Link href="/developers">
                    <Button variant="outline" size="sm">
                      Read Integration Specs
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Solution Stat Callout */}
              <div className="lg:col-span-4 bg-gradient-to-b from-[#100E20] to-[#151329] text-white p-8 rounded-3xl border border-white/10 text-center space-y-4 shadow-float">
                <span className="text-[10px] uppercase font-mono tracking-widest text-violet-soft block">
                  Measured Customer Value
                </span>
                <div className="text-5xl sm:text-6xl font-bold font-heritage text-white">
                  {current.stat}
                </div>
                <p className="text-xs text-white/70 font-medium">
                  {current.statLabel}
                </p>
                <div className="pt-4 border-t border-white/10 text-[11px] text-white/50">
                  Based on benchmark telemetry across 45M+ simulated gateway transactions.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Security Section */}
        <SecurityComplianceSection />

        {/* In-Depth Customer Case Studies */}
        <CaseStudiesSection />

        {/* Enterprise Consultation CTA */}
        <section className="py-24 bg-white border-t border-border">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-xs uppercase font-semibold tracking-wider text-violet-primary bg-violet-light px-3 py-1 rounded-full border border-violet-soft/30 mb-4 inline-block">
              Dedicated Support & Custom Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-heritage text-[#111111] mb-5">
              Need custom VPC peering or custom SLAs?
            </h2>
            <p className="text-secondary text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Our infrastructure engineering team works directly with enterprise clients to configure dedicated edge gateways, customized routing cascades, and tailored compliance agreements.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/signup">
                <Button size="lg" className="shadow-md">
                  Book Enterprise Consultation
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="lg">
                  Compare Enterprise Features
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

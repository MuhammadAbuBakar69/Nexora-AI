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
  Check,
  ArrowRight,
  Zap,
  Globe2,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SecurityComplianceSection } from "@/components/landing/security-compliance";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";

export default function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState<"startups" | "enterprise" | "agencies" | "agents">("startups");

  const solutions = {
    startups: {
      code: "SOL-01",
      title: "AI Startups & Scaleups",
      badge: "RAPID DEPLOYMENT",
      headline: "Ship multi-model AI features without building complex backend plumbing.",
      description:
        "Avoid rewrites and vendor lock-in as model benchmarks shift. With Nexora, your engineers integrate one unified interface and instantly leverage Google Gemini 2.5, Google Veo Video, Claude 3.5 Sonnet, and GPT-4o with automatic fallback and predictable token spending.",
      benefits: [
        "Single API key integration across Google, Anthropic, and OpenAI",
        "Semantic caching cuts early-stage token burn by up to 40%",
        "Soft limit alerts prevent surprise charges when your product goes viral",
        "Starter tier with 10M tokens to prototype and validate quickly",
      ],
      stat: "4.2x Faster",
      statLabel: "Time to market for new AI features",
    },
    enterprise: {
      code: "SOL-02",
      title: "Regulated Enterprise & FinTech",
      badge: "BANK-GRADE COMPLIANCE",
      headline: "Deploy frontier generative AI with Zero Data Retention and absolute control.",
      description:
        "Satisfy the most stringent security, legal, and compliance standards. Nexora guarantees Zero Data Retention (ZDR), hardware-backed AES-256 KMS key isolation, private VPC peering, and tamper-proof SHA-256 audit ledgers for SOC2 Type II and HIPAA certification.",
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
      code: "SOL-03",
      title: "AI Consultancies & Software Agencies",
      badge: "MULTI-TENANT GOVERNANCE",
      headline: "Manage multi-client accounts and token budgets from one master console.",
      description:
        "Stop juggling separate billing accounts, individual credit cards, and chaotic API keys for every client project. Nexora gives agencies multi-tenant workspaces with customer-scoped API keys, individual token allocations, and transparent usage telemetry.",
      benefits: [
        "Issue client-specific API keys with pre-funded token quotas",
        "Real-time usage breakdown per client for exact, frictionless pass-through billing",
        "Revoke or adjust client permissions instantly from the master admin dashboard",
        "Separate cloud storage partitions for client vector databases",
      ],
      stat: "94% Fewer",
      statLabel: "Billing disputes and invoice reconciliations",
    },
    agents: {
      code: "SOL-04",
      title: "Autonomous Agent Swarms",
      badge: "HIGH CONCURRENCY",
      headline: "Scale agentic workflows with 10k+ concurrent tool calls and automatic backoff.",
      description:
        "Autonomous multi-agent swarms generate massive spikes of concurrent tool calls and reasoning loops that trigger immediate rate-limiting from standard LLM endpoints. Nexora provides high-throughput queuing, sub-second retry backoff, and parallel stream coordination.",
      benefits: [
        "Handles 10,000+ parallel async requests without dropped sockets",
        "Sub-second circuit breaking cascades to secondary models when latency spikes",
        "Token usage rate-limits enforced per-agent to prevent runaway loop expenses",
        "Persistent connection pooling minimizes connection setup overhead",
      ],
      stat: "99.99%",
      statLabel: "Agent swarm execution completion rate",
    },
  };

  const current = solutions[activeSolution];

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F3] font-sans select-none">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* CAD Blueprint Solutions Hero */}
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
                DWG: SPEC-SOLUTIONS-01 // PRODUCTION USE-CASES
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#111111] mb-6 leading-[1.08]">
              ARCHITECTED FOR EVERY SCALE. FROM <span className="text-violet-primary">SEED TO GLOBAL ENTERPRISE</span>.
            </h1>

            <p className="text-xs sm:text-sm text-[#444452] max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
              Whether you are an ambitious startup shipping agentic features or a regulated bank orchestrating millions of daily requests, Nexora provides the precise controls your infrastructure requires.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                href="/signup"
                size="lg"
                className="w-full sm:w-auto bg-[#111111] text-white hover:bg-black font-bold uppercase tracking-wider text-xs px-8 py-3.5 border border-[#111111]"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                href="/pricing"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white text-[#111111] hover:bg-[#F2F2EE] font-bold uppercase tracking-wider text-xs px-7 py-3.5 border border-[#E2E2DA]"
              >
                <span>Explore Pricing Tiers</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Industry Solutions Switcher */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E2E2DA]">
          {/* Solution Category Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 font-mono">
            {[
              { id: "startups", label: "Startups & Scaleups", icon: Rocket },
              { id: "enterprise", label: "Regulated Enterprise", icon: Building2 },
              { id: "agencies", label: "Consultancies & Agencies", icon: Users2 },
              { id: "agents", label: "Autonomous Agent Swarms", icon: Bot },
            ].map((sol) => {
              const Icon = sol.icon;
              const isSelected = activeSolution === sol.id;
              return (
                <button
                  key={sol.id}
                  onClick={() => setActiveSolution(sol.id as any)}
                  className={`p-4 border transition-all text-left flex items-center gap-3 relative ${
                    isSelected
                      ? "bg-white border-[#111111] ring-1 ring-[#111111]"
                      : "bg-[#F7F7F4] border-[#E2E2DA] hover:border-[#111111]"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-violet-primary" : "text-[#777783]"}`} />
                  <span className="text-xs font-bold uppercase text-[#111111]">{sol.label}</span>
                </button>
              );
            })}
          </div>

          {/* Solution Detail Card */}
          <div className="bg-white border border-[#E2E2DA] p-6 sm:p-10 relative font-mono">
            <span className="absolute top-2 left-2 text-xs text-[#888892] select-none">+</span>
            <span className="absolute top-2 right-2 text-xs text-[#888892] select-none">+</span>
            <span className="absolute bottom-2 left-2 text-xs text-[#888892] select-none">+</span>
            <span className="absolute bottom-2 right-2 text-xs text-[#888892] select-none">+</span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-violet-primary font-bold">
                    // {current.code}
                  </span>
                  <span className="text-[9px] uppercase px-2 py-0.5 bg-[#F7F7F4] border border-[#E2E2DA] text-[#555562]">
                    {current.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#111111]">
                  {current.headline}
                </h3>

                <p className="text-xs text-[#555562] leading-relaxed font-sans">
                  {current.description}
                </p>

                <div className="space-y-2 pt-2 text-xs font-sans">
                  {current.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 p-6 bg-[#F7F7F4] border border-[#E2E2DA] text-center flex flex-col justify-center items-center">
                <span className="text-[10px] uppercase text-[#777783] block mb-2">VERIFIED IMPACT</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#111111]">{current.stat}</div>
                <p className="text-xs text-[#555562] mt-2 font-sans">{current.statLabel}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Compliance Section */}
        <SecurityComplianceSection />
      </main>

      <Footer />
    </div>
  );
}

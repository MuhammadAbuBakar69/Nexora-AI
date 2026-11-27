"use client";

import React from "react";
import {
  Cpu,
  Coins,
  KeyRound,
  LineChart,
  HardDrive,
  ShieldCheck,
  Server,
  Zap,
} from "lucide-react";
import { AnimatedGradientCard } from "@/components/ui/animated-gradient-card";

export function Features() {
  const features = [
    {
      num: "SYS-01",
      title: "Intelligent AI Proxy Gateway",
      tag: "ANYCAST ROUTING",
      description:
        "Centralized low-latency proxy routing client requests to Gemini, Veo, Claude, and GPT. Handles automated retries, rate limits, and fallback failovers with zero data retention.",
      icon: Cpu,
      telemetry: "LATENCY: < 18ms",
    },
    {
      num: "SYS-02",
      title: "Token Quota & Budget Governance",
      tag: "OVERDRAFT PROTECTION",
      description:
        "Assign granular token budgets to teams, projects, or end-customers. Enforce automated soft alerts at 80% and strict hard ceilings (HTTP 429) to eliminate runaway compute costs.",
      icon: Coins,
      telemetry: "ALLOCATION: POOL BUFFER",
    },
    {
      num: "SYS-03",
      title: "Scoped Edge Credentials",
      tag: "SHA-256 SALTED",
      description:
        "Issue customer-scoped API keys with customizable rate limits (RPM), model-level permissions, and expiration windows. Rotate or revoke keys instantly via UI or REST API.",
      icon: KeyRound,
      telemetry: "HASH: CRYPTOGRAPHIC",
    },
    {
      num: "SYS-04",
      title: "Deep Usage Telemetry Mesh",
      tag: "REAL-TIME OBSERVABILITY",
      description:
        "Inspect real-time telemetry: request velocity, prompt vs. completion token splits, error rates, and model cost breakdowns across your entire organization with microsecond precision.",
      icon: LineChart,
      telemetry: "TELEMETRY: P95 RADAR",
    },
    {
      num: "SYS-05",
      title: "Encrypted Vector Caching Vaults",
      tag: "AES-256-GCM",
      description:
        "Reduce upstream model expenditures by up to 40% using hardware-accelerated semantic vector caching. Matches near-identical prompts and returns cached completions in <5ms.",
      icon: HardDrive,
      telemetry: "CACHE HIT: SUB-5MS",
    },
    {
      num: "SYS-06",
      title: "Multi-Provider Failover Mesh",
      tag: "99.99% AVAILABILITY",
      description:
        "High-availability mesh routing with automatic multi-region circuit breakers. If an upstream provider suffers degraded performance, traffic seamlessly routes to secondary endpoints.",
      icon: Server,
      telemetry: "UPSTREAM: AUTO-FAILOVER",
    },
  ];

  return (
    <section id="platform" className="py-20 bg-[#F6F6F3] border-b border-[#E2E2DA] select-none font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CAD Blueprint Header */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase mb-8 pb-2 border-b border-[#E2E2DA]">
          <span>// SUBSYSTEM SPECIFICATIONS: PLATFORM CORE ARCHITECTURE</span>
          <span>COMPLIANCE: SOC2 TYPE II • HIPAA READY</span>
        </div>

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-primary bg-violet-50 px-2.5 py-1 border border-violet-200">
            ENTERPRISE CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] font-mono mt-4 mb-3">
            ARCHITECTED FOR PRECISION, GOVERNANCE &amp; SPEED
          </h2>
          <p className="text-xs sm:text-sm text-[#555562] font-mono leading-relaxed">
            Six high-performance subsystems engineered to manage multi-model production traffic at scale.
          </p>
        </div>

        {/* 6 CAD Grid Compartments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <AnimatedGradientCard
                key={idx}
                intensity="vibrant"
                className="p-6 flex flex-col justify-between font-mono h-full"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DA] mb-4">
                    <span className="text-[10px] text-violet-primary font-bold">
                      // {feat.num}
                    </span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#F7F7F4] border border-[#E2E2DA] text-[#555562]">
                      {feat.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-[#F7F7F4] border border-[#E2E2DA] flex items-center justify-center text-[#111111] group-hover:text-violet-primary group-hover:border-violet-300 transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-[#111111] group-hover:text-black uppercase tracking-tight transition-colors">
                      {feat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#555562] leading-relaxed font-sans mb-4">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2E2DA] flex items-center justify-between text-[10px]">
                  <span className="text-[#777783]">{feat.telemetry}</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 border border-emerald-200">
                    ONLINE
                  </span>
                </div>
              </AnimatedGradientCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

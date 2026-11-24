"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, TrendingUp, ShieldCheck, Zap, Quote, Sparkles } from "lucide-react";
import Link from "next/link";

export function CaseStudiesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const stories = [
    {
      company: "Cognitive Synthetics",
      domain: "Autonomous Multi-Agent Research",
      headline: "Scaling 45M Daily Tokens Across 4 Model Providers with Zero Outages",
      quote:
        "Before Nexora, a single rate-limit spike from our primary LLM provider would bring our synthetic research pipeline to a standstill. Nexora's dynamic fallback engine solved it overnight.",
      author: "Dr. Elena Vance",
      role: "VP of Autonomous Engineering",
      metrics: [
        { label: "Token Cost Reduction", value: "-42%", sub: "Through semantic caching" },
        { label: "P95 TTFT Latency", value: "310 ms", sub: "Down from 890 ms" },
        { label: "Uptime Reliability", value: "99.99%", sub: "Automated failovers" },
        { label: "Daily Token Volume", value: "45M+", sub: "Managed seamlessly" },
      ],
      stack: ["Claude 3.5 Sonnet", "GPT-4o", "Text Embedding 3", "Nexora Vector Cache"],
      summary:
        "Cognitive Synthetics needed high-concurrency token routing for over 500 parallel autonomous research agents. Nexora unified their API keys, provided granular per-agent budget limits, and reduced prompt repetition costs with sub-5ms semantic cache hits.",
    },
    {
      company: "Aether Financial Technologies",
      domain: "Real-Time Algorithmic Fraud Detection",
      headline: "SOC2 Type II & HIPAA Compliance with Zero Data Retention at 12k RPM",
      quote:
        "Financial institutions cannot compromise on data privacy. Nexora gives us enterprise KMS encryption and absolute Zero Data Retention while letting our models inspect millions of transactions.",
      author: "Marcus Sterling",
      role: "Chief Information Security Officer",
      metrics: [
        { label: "Data Retention", value: "0 bytes", sub: "Volatile memory only" },
        { label: "Peak Ingress Rate", value: "12,000 RPM", sub: "Zero throttle incidents" },
        { label: "Audit Compliance", value: "100%", sub: "Cryptographic hash logs" },
        { label: "Failover Speed", value: "12 ms", sub: "Sub-second failover" },
      ],
      stack: ["Mistral Large 2", "Llama 3.3 70B", "Nexora KMS Vault", "VPC Direct Peering"],
      summary:
        "Aether required bank-grade data security with zero disk writes for sensitive financial transactions. Nexora's private VPC tunneling and isolated customer key containers allowed them to satisfy strict compliance auditors without sacrificing generative performance.",
    },
    {
      company: "OmniVerse Creative Studios",
      domain: "Multimodal Generative Media Suite",
      headline: "Eliminating Multi-Tenancy Headaches for 2.4M Creative Professionals",
      quote:
        "Managing API billing across 2.4 million creators was our biggest operational bottleneck. Nexora gave each creator an isolated token balance with automatic replenishment.",
      author: "Seraphina Lin",
      role: "Co-Founder & Head of Product",
      metrics: [
        { label: "Customer Onboarding", value: "< 2 min", sub: "Instant token key creation" },
        { label: "Billing Disputes", value: "-94%", sub: "Transparent token meters" },
        { label: "Storage Handled", value: "85 TB", sub: "Encrypted asset partitions" },
        { label: "Active Creators", value: "2.4M", sub: "Global multi-region" },
      ],
      stack: ["Gemini 1.5 Pro", "GPT-4o Vision", "Cloud Storage Engine", "Stripe Metering Sync"],
      summary:
        "OmniVerse needed to meter AI generation down to the exact input and output token while allowing users to store generated audio, images, and documents in cloud partitions. Nexora's customer management APIs automated user quotas seamlessly.",
    },
  ];

  const current = stories[activeTab];

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-border gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-semibold text-secondary mb-4">
              <Sparkles className="w-3.5 h-3.5 text-violet-primary" />
              Verified Enterprise Deployments
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#111111] leading-tight font-heritage">
              Powering the next wave
              <br />
              <span className="text-violet-primary">of frontier intelligence.</span>
            </h2>
          </div>
          <p className="text-sm text-secondary max-w-md">
            Discover how leading engineering teams replace chaotic custom API wrappers with Nexora&apos;s unified control plane.
          </p>
        </div>

        {/* Company Selector Tabs */}
        <div className="flex gap-2 sm:gap-4 overflow-x-auto py-8 border-b border-border no-scrollbar">
          {stories.map((story, idx) => (
            <button
              key={story.company}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all shrink-0 flex items-center gap-2.5 ${
                activeTab === idx
                  ? "bg-[#100E20] text-white shadow-md font-semibold"
                  : "bg-surface text-secondary hover:text-foreground hover:bg-surface/80"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  activeTab === idx ? "bg-violet-soft animate-pulse" : "bg-border"
                }`}
              />
              {story.company}
            </button>
          ))}
        </div>

        {/* Story Deep Dive Container */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Editorial Quote & Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-violet-primary">
                {current.domain}
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#111111] mt-2 mb-4 leading-snug font-heritage">
                {current.headline}
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                {current.summary}
              </p>
            </div>

            {/* Sonivale-style High-End Pull Quote */}
            <div className="p-6 sm:p-8 rounded-3xl bg-surface/70 border border-border relative">
              <Quote className="w-8 h-8 text-violet-soft/40 mb-3" />
              <blockquote className="text-base sm:text-lg text-foreground font-medium leading-relaxed italic">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{current.author}</p>
                  <p className="text-xs text-secondary">{current.role}</p>
                </div>
                <span className="text-[11px] font-semibold text-violet-primary uppercase tracking-wider">
                  Verified Case Study
                </span>
              </div>
            </div>

            {/* Model Stack Deployed */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary block mb-3">
                Production AI Infrastructure Stack:
              </span>
              <div className="flex flex-wrap gap-2">
                {current.stack.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-xl bg-white border border-border text-xs text-foreground font-mono shadow-subtle flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Quantitative Impact Metrics */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#100E20] to-[#151329] text-white p-8 sm:p-10 rounded-3xl border border-white/10 shadow-premium space-y-8">
            <div>
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-violet-soft block mb-1">
                Quantitative Results
              </span>
              <h4 className="text-xl font-bold font-heritage">
                Measured Production Impact
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {current.metrics.map((metric, i) => (
                <div key={i} className="border-b border-white/10 pb-4">
                  <div className="text-3xl sm:text-4xl font-bold font-heritage text-white tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-violet-soft mt-1">
                    {metric.label}
                  </div>
                  <div className="text-xs text-white/70 font-medium mt-1">
                    {metric.sub}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center w-full px-5 py-3 rounded-2xl bg-white text-[#100E20] text-xs font-bold hover:bg-violet-light transition-all gap-1.5 shadow-md active:scale-98"
              >
                Read Full Enterprise Case Study
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

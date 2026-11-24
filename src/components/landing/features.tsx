"use client";

import React from "react";
import {
  Cpu,
  Coins,
  KeyRound,
  LineChart,
  HardDrive,
  Users2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Features() {
  const features = [
    {
      title: "AI API Gateway",
      tag: "Intelligent Routing",
      description:
        "Centralized low-latency proxy between your client apps and frontier providers (OpenAI, Anthropic, Google, Meta). Automatically handles retries and fallback failovers.",
      icon: Cpu,
      badgeVariant: "violet" as const,
      visual: (
        <div className="p-3.5 bg-surface rounded-2xl border border-border text-xs font-mono space-y-1.5 text-[#3b3b48]">
          <div className="flex justify-between text-foreground font-bold">
            <span>Route: /v1/chat/completions</span>
            <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full text-xs">200 OK</span>
          </div>
          <div className="text-xs text-[#525263] font-medium">upstream: anthropic/claude-3.5-sonnet</div>
          <div className="flex justify-between text-xs font-semibold pt-1 border-t border-border">
            <span>latency: 18ms</span>
            <span className="text-violet-primary font-bold">tokens: 1,420</span>
          </div>
        </div>
      ),
    },
    {
      title: "Token Management",
      tag: "Budget & Quota Controls",
      description:
        "Assign granular token budgets to individual teams, projects, or end-customers. Configure soft alerts at 80% and hard ceiling caps to eliminate runaway costs.",
      icon: Coins,
      badgeVariant: "blue" as const,
      visual: (
        <div className="p-3.5 bg-surface rounded-2xl border border-border space-y-2">
          <div className="flex justify-between text-xs font-bold text-[#1e1e24]">
            <span>Workspace Monthly Quota</span>
            <span className="text-violet-primary">64.9% used</span>
          </div>
          <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-primary to-blue-soft h-full w-[65%]" />
          </div>
          <div className="flex justify-between text-xs font-semibold text-[#525263]">
            <span>32.4M used</span>
            <span className="font-bold text-violet-primary">17.6M remaining</span>
          </div>
        </div>
      ),
    },
    {
      title: "API Key Management",
      tag: "Granular Security",
      description:
        "Issue customer-scoped credentials with customized rate limits (RPM), model permissions, and expiration windows. Rotate or revoke keys instantly via UI or REST API.",
      icon: KeyRound,
      badgeVariant: "success" as const,
      visual: (
        <div className="p-3.5 bg-surface rounded-2xl border border-border space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-foreground font-bold">nx_live_98e1••••</span>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Active</span>
          </div>
          <p className="text-xs text-[#525263] font-medium">Scopes: models:chat, models:embeddings</p>
          <p className="text-xs font-bold text-[#1e1e24]">Rate Limit: 2,500 RPM</p>
        </div>
      ),
    },
    {
      title: "Usage Analytics",
      tag: "Deep Observability",
      description:
        "Inspect real-time telemetry: request velocity, prompt vs. completion token splits, error rates, and model cost breakdowns across your entire organization.",
      icon: LineChart,
      badgeVariant: "violet" as const,
      visual: (
        <div className="p-3.5 bg-surface rounded-2xl border border-border space-y-2">
          <div className="flex justify-between text-xs font-bold text-[#1e1e24]">
            <span>Daily Telemetry Throughput</span>
            <span className="text-emerald-700">99.98% SLA</span>
          </div>
          <div className="flex items-end gap-1.5 h-12 pt-1">
            {[40, 65, 50, 75, 60, 90, 85, 100, 70, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-violet-primary/80 rounded-t hover:bg-violet-primary transition-all duration-200"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Cloud Storage",
      tag: "AI Resource Governance",
      description:
        "Manage allocated storage for fine-tuning datasets, embedding vector indexes, and audit logs with region-specific compliance controls and encryption.",
      icon: HardDrive,
      badgeVariant: "default" as const,
      visual: (
        <div className="p-3.5 bg-surface rounded-2xl border border-border space-y-1.5 text-xs">
          <div className="flex justify-between font-bold text-foreground">
            <span>Encrypted Vault Bucket</span>
            <span className="text-violet-primary font-mono">192 GB</span>
          </div>
          <div className="text-xs text-[#525263] font-medium">Region: eu-west1 (Belgium)</div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            AES-256 GCM In-Flight & At-Rest
          </div>
        </div>
      ),
    },
    {
      title: "Customer Management",
      tag: "Multi-tenant Governance",
      description:
        "Manage customer accounts, assign plans, provision quotas, suspend abusive clients, and audit administrative actions with immutable event trails.",
      icon: Users2,
      badgeVariant: "blue" as const,
      visual: (
        <div className="p-3.5 bg-surface rounded-2xl border border-border space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground">Aether Dynamics</span>
            <span className="text-xs bg-violet-light text-violet-primary font-bold px-2.5 py-0.5 rounded-full border border-violet-soft/40">Enterprise</span>
          </div>
          <p className="text-xs text-[#525263] font-medium">8 API Keys • 382.1M consumed</p>
          <p className="text-xs text-emerald-700 font-bold">Status: Active & Verified</p>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="violet" className="mb-4">
            Core Architecture
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-5 font-heritage">
            Everything your AI infrastructure needs.
          </h2>
          <p className="text-base sm:text-lg text-[#3f3f4c] leading-relaxed font-medium">
            A comprehensive suite of control-plane tools designed for engineering organizations deploying mission-critical AI workloads.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-8 border border-border hover:border-violet-soft/60 hover:shadow-premium transition-all duration-300 flex flex-col justify-between hover-lift"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-foreground group-hover:scale-110 group-hover:bg-violet-light group-hover:text-violet-primary transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant={feature.badgeVariant} size="sm">
                      {feature.tag}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-foreground font-sans tracking-tight mb-3 group-hover:text-violet-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#40404f] leading-relaxed mb-6 font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Card Visual Element */}
                <div className="mt-2">{feature.visual}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

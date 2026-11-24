"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Database,
  ArrowRight,
  Sparkles,
  Server,
  Lock,
  GitBranch,
} from "lucide-react";

export function ArchitectureFlowSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Edge Ingress & TLS Termination",
      icon: ShieldCheck,
      short: "Anycast BGP routes to the nearest edge PoP in <15ms.",
      details:
        "Requests from your backend or client SDK terminate at the closest edge point-of-presence using TLS 1.3 0-RTT handshakes. DDoS scrubbing and IP allowlisting execute in under 2ms.",
      meta: { latency: "2.1 ms", protocol: "HTTP/2 & HTTP/3", security: "TLS 1.3 / mTLS" },
      code: `POST /v1/chat/completions HTTP/2
Host: api.nexora.cloud
Authorization: Bearer nx_live_98e1...
Content-Type: application/json`,
    },
    {
      num: "02",
      title: "Identity & Token Quota Gatekeeper",
      icon: Lock,
      short: "Validates tenant keys and real-time token balances in memory.",
      details:
        "High-performance Redis-compatible volatile caches verify the API key, inspect current monthly token burn, and enforce rate ceilings (RPM/TPM). If a quota is exceeded, clean 429 errors return without calling expensive upstream models.",
      meta: { latency: "0.8 ms", storage: "In-Memory Volatile", isolation: "Tenant-Isolated" },
      code: `{
  "status": "APPROVED",
  "tenant_id": "cust_88291",
  "remaining_tokens": 17640200,
  "rate_limit_remaining": 2490
}`,
    },
    {
      num: "03",
      title: "Semantic Vector Caching Layer",
      icon: Database,
      short: "Serves matching or high-similarity prompts in sub-5ms.",
      details:
        "Nexora computes prompt embeddings and searches your tenant's private vector cache. Identical or near-identical prompts (configurable cosine threshold ≥ 0.96) return cached completions instantly, cutting upstream LLM API costs by up to 40%.",
      meta: { latency: "4.5 ms", cacheHitRate: "34.8%", costSaved: "100% on hit" },
      code: `// Cache Evaluation
cos_similarity: 0.984 (> 0.96 threshold)
cache_status: "HIT"
upstream_skipped: true
cost: $0.00`,
    },
    {
      num: "04",
      title: "Intelligent Routing & Upstream Balancing",
      icon: GitBranch,
      short: "Selects healthiest provider or cascades to secondary models.",
      details:
        "On cache miss, Nexora's dynamic load balancer evaluates real-time upstream provider health, TTFT benchmarks, and pricing. If Anthropic or OpenAI latency exceeds SLA, traffic automatically reroutes to the optimal secondary provider in under 12ms.",
      meta: { fallbackLatency: "12 ms", providers: "OpenAI, Anthropic, Google, Mistral", health: "Active Probing" },
      code: `// Dynamic Provider Dispatch
primary: "anthropic/claude-3-5-sonnet"
status: "HEALTHY (320ms TTFT)"
active_fallback: "openai/gpt-4o"
circuit_breaker: "CLOSED"`,
    },
    {
      num: "05",
      title: "Zero-Retention Streaming & Telemetry",
      icon: Zap,
      short: "Pipes Server-Sent Events to client; records usage hashes.",
      details:
        "Tokens stream back to your application with zero disk persistence. Nexora logs only token counts, execution latency, and cryptographic audit proofs for billing, strictly adhering to Zero Data Retention compliance standards.",
      meta: { streamProtocol: "SSE", dataRetention: "0 bytes", auditTrail: "SHA-256 HMAC" },
      code: `data: {"id":"chatcmpl-nx82","choices":[{"delta":{"content":"Nexora"}}]}
data: {"id":"chatcmpl-nx82","choices":[{"delta":{"content":" Gateway"}}]}
data: [DONE]

// Usage Telemetry
X-Nexora-Tokens-Prompt: 142
X-Nexora-Tokens-Completion: 68`,
    },
  ];

  const current = steps[activeStep];

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-semibold text-secondary mb-4">
            <Cpu className="w-3.5 h-3.5 text-violet-primary" />
            Under the Hood
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#111111] mb-5 font-heritage">
            The Request Lifecycle.
            <br />
            <span className="text-violet-primary">From Edge Ingress to Output Stream.</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary leading-relaxed">
            See how every API call travels through Nexora&apos;s low-latency security, quota validation, semantic caching, and dynamic routing layers.
          </p>
        </div>

        {/* Step Selector Horizontal Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pb-8 border-b border-border">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  activeStep === idx
                    ? "bg-violet-light/50 border-violet-soft text-foreground shadow-subtle"
                    : "bg-surface/60 border-border/70 text-secondary hover:text-foreground hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-violet-primary">
                    STAGE {s.num}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      activeStep === idx ? "text-violet-primary" : "text-secondary"
                    }`}
                  />
                </div>
                <p className="text-xs font-bold text-foreground truncate">{s.title}</p>
                <p className="text-xs text-[#525263] font-medium truncate mt-0.5">{s.short}</p>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Inspector */}
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-violet-primary text-white flex items-center justify-center font-bold text-lg shadow-sm">
                {current.num}
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-[#111111]">
                  {current.title}
                </h3>
                <p className="text-xs text-violet-primary font-bold">{current.short}</p>
              </div>
            </div>

            <p className="text-sm text-[#40404f] leading-relaxed font-medium">
              {current.details}
            </p>

            {/* Architecture Metadata Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {Object.entries(current.meta).map(([key, val]) => (
                <div key={key} className="bg-surface border border-border p-3.5 rounded-2xl">
                  <span className="text-xs uppercase font-bold text-[#555562] block">
                    {key}
                  </span>
                  <span className="text-xs font-mono font-bold text-foreground mt-0.5 block truncate">
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#100E20] text-white text-xs font-bold hover:bg-violet-dark transition-all cursor-pointer shadow-sm active:scale-97"
              >
                Next Architecture Stage
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-semibold text-secondary">
                Step {activeStep + 1} of {steps.length}
              </span>
            </div>
          </div>

          {/* Right Code/Telemetry Inspector Window */}
          <div className="lg:col-span-6 bg-[#100E20] rounded-2xl border border-white/10 p-6 text-white font-mono text-xs shadow-premium relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-white/50 ml-2 font-mono">
                  gateway-stage-{current.num}.log
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-violet-primary/30 text-violet-soft border border-violet-soft/30">
                LIVE TELEMETRY
              </span>
            </div>

            <pre className="text-[11px] text-violet-soft/90 leading-relaxed overflow-x-auto whitespace-pre p-2 bg-black/30 rounded-xl border border-white/5">
              {current.code}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

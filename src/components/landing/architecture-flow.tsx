"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Database,
  ArrowRight,
  Server,
  Lock,
} from "lucide-react";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";
import { GsapHeadline } from "@/components/animations/gsap-animator";

export function ArchitectureFlowSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Edge Ingress & TLS 1.3 Termination",
      icon: ShieldCheck,
      short: "Anycast BGP routes client traffic to the nearest edge PoP in <15ms.",
      details:
        "Requests from your backend or client SDK terminate at the closest edge point-of-presence using TLS 1.3 0-RTT handshakes. DDoS scrubbing and IP allowlisting execute in under 2ms.",
      meta: { latency: "1.8 ms", protocol: "HTTP/2 & HTTP/3", security: "TLS 1.3 / mTLS" },
      code: `POST /v1/chat/completions HTTP/2
Host: api.nexora.cloud
Authorization: Bearer nx_live_98e1...
Content-Type: application/json`,
    },
    {
      num: "02",
      title: "Token Quota Gatekeeper & Authorization",
      icon: Lock,
      short: "Validates tenant keys and real-time token balances in sub-millisecond memory.",
      details:
        "High-performance volatile caches verify the API key, inspect current monthly token burn, and enforce rate ceilings (RPM/TPM). Overdraft requests return clean 429 errors without consuming expensive upstream models.",
      meta: { latency: "0.6 ms", storage: "In-Memory Volatile", isolation: "Tenant-Isolated" },
      code: `{
  "status": "AUTHORIZED",
  "tenant_id": "org_enterprise_primary",
  "quota_remaining": 17500000,
  "rate_limit_remaining": 2490
}`,
    },
    {
      num: "03",
      title: "Semantic Vector Caching Subsystem",
      icon: Database,
      short: "Serves identical or semantically similar prompts in sub-5ms.",
      details:
        "Nexora computes prompt embeddings and evaluates your tenant's private vector cache. High-similarity queries (cosine threshold ≥ 0.96) return cached completions instantly, cutting upstream latency and token cost by up to 40%.",
      meta: { latency: "4.2 ms", cacheHitRate: "34.8%", costSaved: "100% on cache hit" },
      code: `// Semantic Cache Evaluation
cosine_similarity: 0.984 (> 0.96 threshold)
cache_status: "HIT"
upstream_skipped: true`,
    },
    {
      num: "04",
      title: "Frontier Upstream Dispatch & Failover",
      icon: Cpu,
      short: "Proxies request to Gemini, Veo, Claude, or GPT with zero data retention.",
      details:
        "The gateway dispatches the payload to the designated frontier model provider. If the primary provider experiences elevated latency or outages, traffic automatically routes to an enabled fallback model with zero packet loss.",
      meta: { latency: "18 ms TTFT", providers: "Google • Anthropic • OpenAI", retention: "Zero-Data Retention" },
      code: `{
  "id": "chatcmpl_98a72e81",
  "model": "google/gemini-2.5-flash",
  "choices": [{"message": {"role": "assistant"}}],
  "usage": {"prompt_tokens": 1420, "completion_tokens": 340}
}`,
    },
  ];

  const current = steps[activeStep];
  const StepIcon = current.icon;

  return (
    <section className="py-20 bg-[#F6F6F3] border-b border-[#E2E2DA] select-none font-sans relative overflow-hidden">
      {/* Subtle Ambient Sunset Glow */}
      <AnimatedSunsetMesh intensity="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CAD Blueprint Header */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase mb-8 pb-2 border-b border-[#E2E2DA]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
            // PROTOCOL ARCHITECTURE: REQUEST LIFECYCLE &amp; ROUTING PIPELINE
          </span>
          <span>DWG: ARCH-FLOW-01 • SCALE: 1:1</span>
        </div>

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF5722] bg-[#FF5722]/10 px-2.5 py-1 border border-[#FF5722]/30 inline-block mb-3">
            INGRESS TO COMPLETION
          </span>
          <GsapHeadline
            text="HOW REQUESTS TRAVERSE THE"
            highlight="NEXORA EDGE MESH"
            className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] font-mono leading-[1.12] mb-3"
          />
          <p className="text-xs sm:text-sm text-[#555562] font-mono leading-relaxed">
            Every inference call is authenticated, quota-checked, and proxied with sub-millisecond overhead and strict Zero-Data Retention.
          </p>
        </div>

        {/* 4 Architectural Step Compartments with Connecting Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeStep === idx;
            return (
              <motion.button
                key={idx}
                onClick={() => setActiveStep(idx)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`p-5 text-left transition-all border relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-[#FF5722] ring-1 ring-[#FF5722] shadow-sm"
                    : "bg-[#F7F7F4]/90 hover:bg-white border-[#E2E2DA] hover:border-[#111111]"
                }`}
              >
                <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
                <span className="absolute top-1.5 right-2 font-mono text-xs text-[#888892] select-none">+</span>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono text-xs font-bold ${isSelected ? "text-[#FF5722]" : "text-[#777783]"}`}>
                      PHASE // {s.num}
                    </span>
                    <Icon className={`w-4 h-4 ${isSelected ? "text-[#FF5722]" : "text-[#111111]"}`} />
                  </div>
                  <h3 className="text-xs font-mono font-bold uppercase text-[#111111] mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-[11px] font-mono text-[#777783] leading-relaxed">
                    {s.short}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2E2DA] mt-4 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#777783]">LATENCY:</span>
                  <span className="font-bold text-[#111111]">{s.meta.latency}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Step Deep-Dive Drafting Box */}
        <div className="bg-white/95 backdrop-blur-xs border border-[#E2E2DA] p-6 sm:p-8 relative shadow-sm">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute bottom-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute bottom-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-6 space-y-4 font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/30">
                    PHASE {current.num} SPECIFICATION
                  </span>
                  <span className="text-[11px] text-[#777783]">•</span>
                  <span className="text-[11px] text-emerald-600 font-bold">OPERATIONAL</span>
                </div>

                <h3 className="text-lg font-bold text-[#111111] uppercase tracking-tight">
                  {current.title}
                </h3>

                <p className="text-xs text-[#555562] leading-relaxed font-sans">
                  {current.details}
                </p>

                <div className="pt-4 border-t border-[#E2E2DA] grid grid-cols-3 gap-3 text-xs">
                  {Object.entries(current.meta).map(([k, v]) => (
                    <div key={k} className="p-2.5 bg-[#F7F7F4] border border-[#E2E2DA]">
                      <span className="text-[9px] uppercase text-[#777783] block">{k}</span>
                      <span className="font-bold text-[#111111] text-[11px] mt-0.5 block">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E2E2DA] text-[11px] font-mono text-[#777783]">
                  <span>PAYLOAD PROTOCOL VERIFICATION</span>
                  <span className="text-[#FF5722] font-bold">RFC-8259 JSON</span>
                </div>

                <pre className="p-4 bg-[#111111] text-[#EAEAEA] font-mono text-xs overflow-x-auto leading-relaxed border border-[#333333] h-full flex items-center">
                  <code>{current.code}</code>
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

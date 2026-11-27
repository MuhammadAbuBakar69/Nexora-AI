"use client";

import React, { useState } from "react";
import {
  Play,
  Check,
  Cpu,
  Zap,
  ShieldCheck,
  RotateCw,
  Database,
  Terminal,
  Copy,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GsapHeadline } from "@/components/animations/gsap-animator";

export function InteractiveGatewaySimulator() {
  const [selectedModel, setSelectedModel] = useState("google/gemini-2.5-flash");
  const [promptType, setPromptType] = useState<"analysis" | "video" | "code">("analysis");
  const [status, setStatus] = useState<"idle" | "loading" | "complete">("idle");
  const [cacheHit, setCacheHit] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const prompts = {
    analysis: {
      label: "Multimodal Risk Analysis",
      prompt: "Analyze multi-region infrastructure latency logs and detect anomaly signatures.",
      response:
        "Analysis complete: Zero high-risk anomalies detected. Cross-referenced with historical cluster metrics in 18ms. Volatile memory scrubbed in compliance with Zero Data Retention standards.",
      tokens: { prompt: 148, completion: 42, total: 190 },
      latency: "18 ms",
      cost: "$0.00002",
      savings: "42%",
    },
    video: {
      label: "Google Veo Video Prompt",
      prompt: "Generate 1080p architectural isometric wireframe simulation with volumetric lighting.",
      response:
        "Video inference complete: 1080p @ 60fps render generated across 12 active compute seconds. Frame-accurate physical continuity verified.",
      tokens: { prompt: 85, completion: 0, total: 85 },
      latency: "45 ms (queue)",
      cost: "$1.80000 (12s @ $0.15/s)",
      savings: "N/A",
    },
    code: {
      label: "Structured Schema Generation",
      prompt: "Generate typed TypeScript schema with runtime Zod verification for token quota ledger.",
      response:
        '{\n  "status": "APPROVED",\n  "tenant_id": "org_enterprise_primary",\n  "quota_remaining": 17500000,\n  "audit_hash": "sha256:d8a93e82b7c4..."\n}',
      tokens: { prompt: 95, completion: 64, total: 159 },
      latency: "34 ms",
      cost: "$0.00045",
      savings: "65%",
    },
  };

  const current = prompts[promptType];

  const handleExecute = (forceCache = false) => {
    setStatus("loading");
    setCacheHit(forceCache);
    setTimeout(() => {
      setStatus("complete");
    }, forceCache ? 250 : 850);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(current.prompt);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <section id="sandbox" className="py-20 bg-[#F6F6F3] border-b border-[#E2E2DA] select-none font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CAD Blueprint Header */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase mb-8 pb-2 border-b border-[#E2E2DA]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            // RUNTIME BENCHMARK: INTERACTIVE GATEWAY SIMULATOR TERMINAL
          </span>
          <span>EMULATION: PROXY INTERCEPTOR</span>
        </div>

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-primary bg-violet-50 px-2.5 py-1 border border-violet-200 inline-block mb-3">
            INTERACTIVE RUNTIME
          </span>
          <GsapHeadline
            text="TEST ROUTING, CACHING &amp; LATENCY IN"
            highlight="REAL TIME"
            className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] font-mono leading-[1.12] mb-3"
          />
          <p className="text-xs sm:text-sm text-[#555562] font-mono leading-relaxed">
            Execute simulated gateway requests to test how prompt evaluation, token accounting, and vector caching perform under production load.
          </p>
        </div>

        {/* Hyper-Professional Terminal Simulator Box */}
        <div className="rounded-none border border-[#22222E] bg-[#0E0E14] text-[#E0E0EA] shadow-xl relative font-mono overflow-hidden">
          <span className="absolute top-2 left-2 text-xs text-[#555566] select-none z-20">+</span>
          <span className="absolute top-2 right-2 text-xs text-[#555566] select-none z-20">+</span>
          <span className="absolute bottom-2 left-2 text-xs text-[#555566] select-none z-20">+</span>
          <span className="absolute bottom-2 right-2 text-xs text-[#555566] select-none z-20">+</span>

          {/* Window Header Chrome */}
          <div className="px-5 py-3 border-b border-[#252535] bg-[#15151F] flex flex-wrap items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block" />
              <span className="text-[11px] text-[#888899] font-mono ml-2 hidden sm:inline">
                nx-proxy-gateway:~ // runtime-simulator
              </span>
            </div>

            <div className="flex items-center gap-4 text-[10px] text-[#888899]">
              <span>PROTOCOL: HTTP/3 (QUIC)</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">ZERO-DATA RETENTION: ON</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="p-5 border-b border-[#222232] bg-[#12121A] grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
            <div className="md:col-span-5 space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-[#888899]">
                Target Model Route
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-[#181824] border border-[#2B2B3D] px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-[#111111]"
              >
                <option value="google/gemini-2.5-flash">google/gemini-2.5-flash (Fastest LLM)</option>
                <option value="google/veo-video-2">google/veo-video-2 (Generative Video)</option>
                <option value="anthropic/claude-3-5-sonnet">anthropic/claude-3-5-sonnet (High Precision)</option>
                <option value="openai/gpt-4o">openai/gpt-4o (Multimodal)</option>
              </select>
            </div>

            <div className="md:col-span-4 space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-[#888899]">
                Payload Modality
              </label>
              <div className="flex gap-2">
                {(["analysis", "video", "code"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setPromptType(t);
                      setStatus("idle");
                    }}
                    className={`flex-1 py-2 text-[11px] font-bold uppercase border transition-all ${
                      promptType === t
                        ? "bg-[#252535] text-white border-[#3A3A4E]"
                        : "bg-[#181824] text-[#888899] border-[#2B2B3D] hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 flex items-end gap-2">
              <Button
                onClick={() => handleExecute(false)}
                disabled={status === "loading"}
                className="w-full bg-[#111111] hover:bg-neutral-800 text-white font-bold uppercase text-xs h-9 px-4 border border-[#111111] shadow-sm transition-all"
              >
                {status === "loading" ? (
                  <RotateCw className="w-3.5 h-3.5 animate-spin mr-1.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 mr-1.5 fill-current text-white" />
                )}
                <span>Run Payload</span>
              </Button>
            </div>
          </div>

          {/* Simulator Terminal Output */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-[#888899]">
                  REQUEST PAYLOAD (CLIENT DISPATCH)
                </span>
                <button
                  onClick={handleCopy}
                  className="text-[10px] text-[#888899] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedPayload ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPayload ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <div className="p-4 bg-[#14141E] border border-[#222232] text-xs leading-relaxed text-[#D0D0E0] min-h-[110px]">
                <p className="font-mono text-emerald-300">{current.prompt}</p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-[#888899]">
                  GATEWAY RESPONSE STREAM
                </span>
                {status === "complete" && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 border border-emerald-800">
                    200 OK • {current.latency}
                  </span>
                )}
              </div>

              <div className="p-4 bg-[#14141E] border border-[#222232] text-xs text-[#EAEAEA] min-h-[110px] flex items-center">
                {status === "idle" && (
                  <span className="text-[#666677]">Standing by. Click &quot;Run Payload&quot; to test real-time proxying.</span>
                )}
                {status === "loading" && (
                  <span className="text-emerald-400 flex items-center gap-2">
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    Proxying request to {selectedModel}...
                  </span>
                )}
                {status === "complete" && (
                  <p className="font-mono text-emerald-300 leading-relaxed">{current.response}</p>
                )}
              </div>
            </div>
          </div>

          {/* Terminal Telemetry Metric Strip */}
          <div className="px-5 py-2.5 bg-[#12121A] border-t border-[#222230] flex flex-wrap items-center justify-between text-[10px] text-[#777788]">
            <div className="flex items-center gap-3">
              <span>ESTIMATED TOKENS: <strong className="text-white">{current.tokens.total}</strong></span>
              <span>•</span>
              <span>ESTIMATED COST: <strong className="text-white">{current.cost}</strong></span>
              <span>•</span>
              <span>CACHE HIT SAVINGS: <strong className="text-emerald-400">{current.savings}</strong></span>
            </div>
            <div>
              <span>ENCLAVE: <strong className="text-emerald-400">ISOLATED</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

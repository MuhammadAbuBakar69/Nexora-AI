"use client";

import React, { useState } from "react";
import {
  Play,
  CheckCircle2,
  Cpu,
  Zap,
  ShieldCheck,
  RotateCw,
  Sparkles,
  Database,
  Lock,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import confetti from "canvas-confetti";

export function InteractiveGatewaySimulator() {
  const [selectedModel, setSelectedModel] = useState("anthropic/claude-3-5-sonnet");
  const [promptType, setPromptType] = useState<"analysis" | "summarize" | "code">("analysis");
  const [status, setStatus] = useState<"idle" | "loading" | "complete">("idle");
  const [cacheHit, setCacheHit] = useState(false);

  const prompts = {
    analysis: {
      label: "Autonomous Risk Analysis",
      prompt: "Inspect transactional payload for anomaly signature and calculate variance.",
      response:
        "Analysis complete: Zero high-risk anomalies detected. Cross-referenced with historical cluster metrics in 18ms. Volatile memory scrubbed in compliance with Zero Data Retention standards.",
      tokens: { prompt: 148, completion: 42, total: 190 },
      latency: "284 ms",
      cost: "$0.0006",
    },
    summarize: {
      label: "Multimodal Document Extraction",
      prompt: "Synthesize quarterly cloud resource consumption and compute quota burn rate.",
      response:
        "Synthesis verified: Organization consumed 64.9% of allocated monthly token pool. Vector cache absorption reduced upstream provider billing by 38.4% over 30 days.",
      tokens: { prompt: 512, completion: 88, total: 600 },
      latency: "340 ms",
      cost: "$0.0019",
    },
    code: {
      label: "Structured JSON Output",
      prompt: "Generate typed TypeScript gateway schema with strict Zod validation.",
      response:
        '{\n  "status": "APPROVED",\n  "tenant_id": "cust_88291",\n  "quota_remaining": 17640200,\n  "audit_hash": "sha256:d8a93e82b7..."\n}',
      tokens: { prompt: 95, completion: 64, total: 159 },
      latency: "195 ms",
      cost: "$0.0004",
    },
  };

  const current = prompts[promptType];

  const handleExecute = (forceCache = false) => {
    setStatus("loading");
    setCacheHit(forceCache);

    setTimeout(() => {
      setStatus("complete");
      if (!forceCache) {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#7557FF", "#B4A3FF", "#A5B4FC"],
        });
      }
    }, 1200);
  };

  return (
    <section className="py-24 sm:py-32 bg-surface/50 border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="violet" className="mb-4">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-violet-primary" />
            Interactive Gateway Sandbox
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-5 font-heritage">
            Test the Gateway in Real Time.
            <br />
            <span className="text-violet-primary">Observe Sub-Second Routing & Caching.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#3f3f4c] leading-relaxed">
            Trigger a simulated API call to experience in-memory token authentication, semantic vector caching, and zero-retention response streaming.
          </p>
        </div>

        {/* Sandbox Console Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-premium">
          {/* Left: Interactive Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#1e1e24] block mb-2">
                1. Select Target Model Engine
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "anthropic/claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic" },
                  { id: "openai/gpt-4o", name: "GPT-4o (Omni)", provider: "OpenAI" },
                  { id: "google/gemini-1-5-pro", name: "Gemini 1.5 Pro", provider: "Google" },
                  { id: "meta/llama-3-3-70b", name: "Llama 3.3 70B", provider: "Meta" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedModel(m.id);
                      setStatus("idle");
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedModel === m.id
                        ? "bg-violet-light/50 border-violet-primary text-foreground shadow-sm font-semibold"
                        : "bg-surface border-border text-[#4a4a58] hover:text-foreground hover:bg-surface-hover"
                    }`}
                  >
                    <p className="text-xs font-bold text-foreground">{m.name}</p>
                    <p className="text-xs text-[#6e6e7c]">{m.provider}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#1e1e24] block mb-2">
                2. Select Payload Scenario
              </label>
              <div className="flex flex-col gap-2">
                {(["analysis", "summarize", "code"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setPromptType(type);
                      setStatus("idle");
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      promptType === type
                        ? "bg-[#100E20] text-white border-[#100E20] shadow-sm font-semibold"
                        : "bg-surface border-border text-[#4a4a58] hover:text-foreground hover:bg-surface-hover"
                    }`}
                  >
                    <span className="text-xs font-bold">{prompts[type].label}</span>
                    <Badge variant={promptType === type ? "violet" : "default"} size="sm">
                      {type.toUpperCase()}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <Button
                variant="violet"
                onClick={() => handleExecute(false)}
                disabled={status === "loading"}
                className="flex-1 shadow-md gap-2"
              >
                {status === "loading" ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    Executing Gateway...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Send Live Request
                  </>
                )}
              </Button>

              <Button
                variant="secondary"
                onClick={() => handleExecute(true)}
                disabled={status === "loading"}
                className="gap-2"
              >
                <Database className="w-4 h-4 text-violet-primary" />
                Simulate Cache Hit
              </Button>
            </div>

            <p className="text-xs text-[#6e6e7c] leading-relaxed">
              * The simulator exercises client-side telemetry against Nexora&apos;s normalized schema format.
            </p>
          </div>

          {/* Right: Live Gateway Screen & Loading Skeleton States */}
          <div className="lg:col-span-7 bg-[#100E20] rounded-2xl p-6 sm:p-8 text-white border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[460px]">
            {/* Top Bar inside Terminal */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-white/60 ml-2">
                    POST https://api.nexora.cloud/v1/chat/completions
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-violet-soft bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  {selectedModel.split("/")[1]}
                </span>
              </div>

              {/* IDLE STATE */}
              {status === "idle" && (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-violet-soft">
                    <Cpu className="w-8 h-8 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-sans">
                      Gateway Ready for Request
                    </h4>
                    <p className="text-xs text-white/60 mt-1 max-w-sm mx-auto">
                      Click &quot;Send Live Request&quot; or &quot;Simulate Cache Hit&quot; to inspect real-time quota gates and SSE streaming.
                    </p>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/10 rounded-xl text-left max-w-md mx-auto font-mono text-xs text-white/70">
                    <span className="text-white/40 block mb-1">// Outgoing Payload:</span>
                    {`"${current.prompt}"`}
                  </div>
                </div>
              )}

              {/* LOADING SKELETON STATE */}
              {status === "loading" && (
                <div className="space-y-4 py-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-mono text-violet-soft flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-violet-primary animate-ping" />
                      In-Flight Gateway Pipeline
                    </span>
                    <span className="text-xs font-mono text-amber-300">PROCESSING...</span>
                  </div>

                  {/* Stage 1 Skeleton: Quota Check */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex justify-between items-center">
                      <Skeleton className="w-40 h-4 bg-white/20 rounded" />
                      <Skeleton className="w-16 h-4 bg-white/20 rounded" />
                    </div>
                    <Skeleton className="w-3/4 h-3 bg-white/10 rounded" />
                  </div>

                  {/* Stage 2 Skeleton: Semantic Lookup */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex justify-between items-center">
                      <Skeleton className="w-48 h-4 bg-white/20 rounded" />
                      <Skeleton className="w-20 h-4 bg-white/20 rounded" />
                    </div>
                    <Skeleton className="w-5/6 h-3 bg-white/10 rounded" />
                  </div>

                  {/* Stage 3 Skeleton: Stream Output */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <Skeleton className="w-32 h-4 bg-white/20 rounded" />
                    <Skeleton className="w-full h-8 bg-white/10 rounded" />
                  </div>
                </div>
              )}

              {/* COMPLETED STATE */}
              {status === "complete" && (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      HTTP 200 OK (Zero Dropped Tokens)
                    </span>
                    {cacheHit ? (
                      <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        ⚡ CACHE HIT (0.00ms upstream)
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-bold text-violet-soft bg-violet-500/20 px-2.5 py-0.5 rounded-full border border-violet-soft/30">
                        ROUTED DIRECT (Upstream Pipe)
                      </span>
                    )}
                  </div>

                  {/* Output content bubble */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/90 leading-relaxed whitespace-pre-wrap">
                    {current.response}
                  </div>

                  {/* Telemetry Stats Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-xs text-white/50 block font-sans">TTFT Latency</span>
                      <span className="text-sm font-bold font-mono text-emerald-400">
                        {cacheHit ? "3.8 ms" : current.latency}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-xs text-white/50 block font-sans">Total Tokens</span>
                      <span className="text-sm font-bold font-mono text-white">
                        {current.tokens.total}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-xs text-white/50 block font-sans">Estimated Cost</span>
                      <span className="text-sm font-bold font-mono text-violet-soft">
                        {cacheHit ? "$0.00" : current.cost}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-xs text-white/50 block font-sans">Data Retention</span>
                      <span className="text-sm font-bold font-mono text-emerald-400">
                        0 Bytes
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Cryptographic Hash */}
            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Audit Proof: SHA-256 HMAC Verified
              </span>
              <span>TLS 1.3 / ChaCha20</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

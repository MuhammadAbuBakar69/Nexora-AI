"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Terminal,
  Shield,
  Zap,
  Cpu,
  Sparkles,
  Activity,
  Check,
  Pause,
  Play,
  RotateCw,
  Copy,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";

export function Hero() {
  const [activeRequestCount, setActiveRequestCount] = useState(142850);
  const [livePing, setLivePing] = useState(18);
  const [activeTerminalTab, setActiveTerminalTab] = useState<"stream" | "audit" | "mesh">("stream");
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);

  // Live real-time streaming telemetry generator
  const [streamLogs, setStreamLogs] = useState([
    {
      id: "log-1",
      method: "POST",
      endpoint: "/v1/chat/completions",
      target: "google/gemini-2.5-flash",
      tokens: 1420,
      latency: 18,
      status: "200 OK",
      pop: "US-WEST-01",
      time: "15:02:14.082",
    },
    {
      id: "log-2",
      method: "POST",
      endpoint: "/v1/video/generations",
      target: "google/veo-video-2",
      tokens: 85,
      duration: "12.0s",
      latency: 42,
      status: "200 OK",
      pop: "US-EAST-02",
      time: "15:02:13.891",
    },
    {
      id: "log-3",
      method: "POST",
      endpoint: "/v1/chat/completions",
      target: "anthropic/claude-3-5-sonnet",
      tokens: 3890,
      latency: 34,
      status: "200 OK",
      pop: "EU-CENTRAL-01",
      time: "15:02:13.620",
    },
    {
      id: "log-4",
      method: "POST",
      endpoint: "/v1/embeddings",
      target: "openai/text-embedding-3-large",
      tokens: 512,
      latency: 12,
      status: "200 OK",
      pop: "AP-EAST-01",
      time: "15:02:13.245",
    },
  ]);

  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      setActiveRequestCount((prev) => prev + Math.floor(Math.random() * 6) + 2);
      setLivePing((prev) => Math.min(22, Math.max(15, prev + (Math.random() > 0.5 ? 1 : -1))));

      // Add fresh log entry dynamically
      const targets = [
        { ep: "/v1/chat/completions", target: "google/gemini-2.5-flash", baseTokens: 1840, baseLat: 17, pop: "US-WEST-01" },
        { ep: "/v1/video/generations", target: "google/veo-video-2", baseTokens: 120, duration: "16.0s", baseLat: 46, pop: "US-EAST-01" },
        { ep: "/v1/chat/completions", target: "anthropic/claude-3-5-sonnet", baseTokens: 2950, baseLat: 32, pop: "EU-CENTRAL-01" },
        { ep: "/v1/chat/completions", target: "openai/gpt-4o", baseTokens: 2100, baseLat: 26, pop: "AP-EAST-01" },
      ];
      const randomT = targets[Math.floor(Math.random() * targets.length)];
      const now = new Date();
      const timeStr = `${now.toTimeString().split(" ")[0]}.${Math.floor(now.getMilliseconds()).toString().padStart(3, "0")}`;

      const newLog = {
        id: `log-${Date.now()}`,
        method: "POST",
        endpoint: randomT.ep,
        target: randomT.target,
        tokens: randomT.baseTokens + Math.floor(Math.random() * 300),
        duration: randomT.duration,
        latency: randomT.baseLat + (Math.random() > 0.5 ? 1 : -1),
        status: "200 OK",
        pop: randomT.pop,
        time: timeStr,
      };

      setStreamLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    }, 2800);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden bg-[#F6F6F3] select-none border-b border-[#E2E2DA]">
      {/* Millimeter CAD Graph Paper Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(#111111 1px, transparent 1px), radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      {/* 4 Corner Crosshairs */}
      <span className="absolute top-4 left-4 font-mono text-sm font-semibold text-[#888892] select-none">+</span>
      <span className="absolute top-4 right-4 font-mono text-sm font-semibold text-[#888892] select-none">+</span>
      <span className="absolute bottom-4 left-4 font-mono text-sm font-semibold text-[#888892] select-none">+</span>
      <span className="absolute bottom-4 right-4 font-mono text-sm font-semibold text-[#888892] select-none">+</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Architectural Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-[#777783] uppercase mb-8 pb-3 border-b border-[#E2E2DA]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#111111] font-bold">ANYCAST EDGE ROUTER v2.4</span>
            <span className="text-[#777783] hidden sm:inline">// NODE: US-WEST-01</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[#777783]">
            <span>LAT: 37.7749° N, LONG: 122.4194° W</span>
            <span>•</span>
            <span className="text-[#111111] font-bold">PROJECTION: VECTOR AXIS</span>
          </div>
          <div className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-300">
            STATUS: 99.99% UPSTREAM MESH
          </div>
        </div>

        {/* Editorial Architectural Headline */}
        <div className="max-w-4xl text-left sm:text-center sm:mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#111111] uppercase leading-[1.08] font-mono mb-6">
            AN INTELLIGENT <span className="text-violet-primary">AI GATEWAY</span> THAT POWERS YOUR CLOUD INFRASTRUCTURE
          </h1>

          <div className="flex flex-wrap items-center sm:justify-center gap-4 text-xs font-mono text-[#555562] mb-6">
            <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs border border-[#E2E2DA] font-bold text-[#111111] shadow-xs">
              // ENTERPRISE AI INFERENCE
            </span>
            <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs border border-[#E2E2DA] text-emerald-700 font-bold shadow-xs">
              ◎ SOC2 / HIPAA READY
            </span>
            <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs border border-[#E2E2DA] text-violet-primary font-bold shadow-xs">
              ⚡ ZERO-DATA RETENTION
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#444452] leading-relaxed max-w-2xl sm:mx-auto font-sans mb-8">
            Access frontier AI APIs (Gemini 2.5, Google Veo, Claude 3.5, GPT-4o), manage customer token quotas, and govern your cloud infrastructure through one unified, developer-first gateway.
          </p>

          {/* Action Buttons in CAD Blueprint Style */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-mono">
            <Button
              href="/signup"
              size="lg"
              className="w-full sm:w-auto bg-[#111111] text-white hover:bg-black font-bold uppercase tracking-wider text-xs px-8 py-3.5 border border-[#111111] shadow-sm"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              href="/dashboard"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-white/95 backdrop-blur-xs text-[#111111] hover:bg-[#F2F2EE] font-bold uppercase tracking-wider text-xs px-7 py-3.5 border border-[#E2E2DA]"
            >
              <Terminal className="w-4 h-4 mr-2 text-[#777783]" />
              <span>Explore Gateway Console</span>
            </Button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HYPER-PROFESSIONAL CAD TELEMETRY TERMINAL & LIVE INFERENCE HUD            */}
        {/* ========================================================================= */}
        <div className="mt-12 max-w-4xl mx-auto rounded-none border border-[#22222E] bg-[#0E0E14] text-[#E0E0EA] shadow-2xl relative font-mono overflow-hidden">
          {/* 4 Corner Crosshairs */}
          <span className="absolute top-2 left-2 text-xs text-[#555566] select-none z-20">+</span>
          <span className="absolute top-2 right-2 text-xs text-[#555566] select-none z-20">+</span>
          <span className="absolute bottom-2 left-2 text-xs text-[#555566] select-none z-20">+</span>
          <span className="absolute bottom-2 right-2 text-xs text-[#555566] select-none z-20">+</span>

          {/* Terminal Window Chrome Header */}
          <div className="px-4 py-3 bg-[#15151F] border-b border-[#252535] flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* macOS / Unix Style Precision Dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block" />
              <span className="text-[11px] text-[#888899] font-mono ml-2 hidden sm:inline">
                nx-edge-router@us-west-01:~ // live-telemetry-hud.sh
              </span>
            </div>

            {/* Interactive Live Stream Tabs */}
            <div className="flex items-center gap-1 bg-[#0E0E14] p-1 border border-[#222230]">
              <button
                type="button"
                onClick={() => setActiveTerminalTab("stream")}
                className={`px-2.5 py-1 text-[10px] uppercase font-bold transition-all ${
                  activeTerminalTab === "stream"
                    ? "bg-[#252535] text-white shadow-xs"
                    : "text-[#888899] hover:text-white"
                }`}
              >
                Live Proxy Stream
              </button>
              <button
                type="button"
                onClick={() => setActiveTerminalTab("audit")}
                className={`px-2.5 py-1 text-[10px] uppercase font-bold transition-all ${
                  activeTerminalTab === "audit"
                    ? "bg-[#252535] text-white shadow-xs"
                    : "text-[#888899] hover:text-white"
                }`}
              >
                KMS Hash Ledger
              </button>
              <button
                type="button"
                onClick={() => setActiveTerminalTab("mesh")}
                className={`px-2.5 py-1 text-[10px] uppercase font-bold transition-all ${
                  activeTerminalTab === "mesh"
                    ? "bg-[#252535] text-white shadow-xs"
                    : "text-[#888899] hover:text-white"
                }`}
              >
                PoP Mesh Status
              </button>
            </div>

            {/* Live Play / Pause Controls & TTFT */}
            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-[#888899]">
                RTT: <strong className="text-white">{livePing}ms</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsLiveStreaming(!isLiveStreaming)}
                className="p-1 bg-[#1A1A26] border border-[#2B2B3D] text-[#AAAAAA] hover:text-white transition-colors"
                title={isLiveStreaming ? "Pause Live Feed" : "Resume Live Feed"}
              >
                {isLiveStreaming ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-[#27C93F]" />}
              </button>
            </div>
          </div>

          {/* Terminal Content Views */}
          <div className="p-5 min-h-[220px]">
            {activeTerminalTab === "stream" && (
              <div className="space-y-2.5">
                <AnimatePresence initial={false}>
                  {streamLogs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.22 }}
                      className="p-2.5 bg-[#14141E] border border-[#222232] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:border-[#38384E] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-[10px] text-[#666677] font-mono">{log.time}</span>
                        <span className="text-emerald-400 font-bold font-mono">{log.method}</span>
                        <span className="text-white font-bold">{log.endpoint}</span>
                        <span className="text-violet-300 font-mono text-[11px]">→ {log.target}</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-[11px] text-[#888899]">
                        <span className="text-[#BBBBCC]">{log.pop}</span>
                        <span>•</span>
                        <span>{log.duration ? log.duration : `${log.tokens} TOKENS`}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">{log.latency}ms</span>
                        <span className="text-emerald-300 font-bold bg-emerald-950/80 px-1.5 py-0.5 border border-emerald-800 text-[10px]">
                          {log.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Prompt Cursor */}
                <div className="pt-2 flex items-center gap-2 text-[11px] text-[#777788]">
                  <span className="text-emerald-400 font-bold">nx-gateway:~$</span>
                  <span>listening on Anycast BGP interface (TLS 1.3 0-RTT)...</span>
                  <span className="w-2 h-3.5 bg-emerald-400 animate-pulse inline-block" />
                </div>
              </div>
            )}

            {activeTerminalTab === "audit" && (
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-[#14141E] border border-[#222232] space-y-1.5">
                  <div className="flex items-center justify-between text-[#888899] text-[10px]">
                    <span>EPOCH HASH: 0x98f12a...77b</span>
                    <span className="text-emerald-400 font-bold">VERIFIED IMMUTABLE</span>
                  </div>
                  <p className="text-[11px] text-[#CCCCCC]">
                    Session payloads scrubbed across 32 volatile memory enclaves upon TCP FIN packet. Zero disk write verification score: 100%.
                  </p>
                </div>
                <div className="p-3 bg-[#14141E] border border-[#222232] space-y-1.5">
                  <div className="flex items-center justify-between text-[#888899] text-[10px]">
                    <span>KMS KEY ROTATION: HOURLY</span>
                    <span className="text-emerald-400 font-bold">NEXT IN 24M</span>
                  </div>
                  <p className="text-[11px] text-[#CCCCCC]">
                    AES-256 GCM hardware encryption with automatic HSM master rotation and SOC2 Type II cryptographic nonces.
                  </p>
                </div>
              </div>
            )}

            {activeTerminalTab === "mesh" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { pop: "US-WEST-01 (San Francisco)", rtt: "18ms", status: "OPTIMAL", load: "34%" },
                  { pop: "US-EAST-02 (Virginia)", rtt: "14ms", status: "OPTIMAL", load: "42%" },
                  { pop: "EU-CENTRAL-01 (Frankfurt)", rtt: "19ms", status: "OPTIMAL", load: "28%" },
                  { pop: "AP-EAST-01 (Tokyo)", rtt: "16ms", status: "OPTIMAL", load: "39%" },
                ].map((node, i) => (
                  <div key={i} className="p-3 bg-[#14141E] border border-[#222232] flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">{node.pop}</span>
                      <span className="text-[10px] text-[#777788]">Load Factor: {node.load}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold block">{node.rtt}</span>
                      <span className="text-[9px] text-emerald-500">{node.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Terminal Status Bar Footer */}
          <div className="px-4 py-2 bg-[#12121A] border-t border-[#222230] flex flex-wrap items-center justify-between text-[10px] text-[#777788]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ANYCAST BGP 32 PoPs</span>
              </span>
              <span>•</span>
              <span>MEMORY ENCLAVE: ENCRYPTED</span>
            </div>
            <div>
              <span>PACKETS PROXIED: <strong className="text-white">{activeRequestCount.toLocaleString()}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

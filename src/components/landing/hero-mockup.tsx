"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Zap,
  Database,
  Key,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroMockup() {
  const [tokensConsumed, setTokensConsumed] = useState(32410800);
  const [activeRPM, setActiveRPM] = useState(2840);
  const [pingLatency, setPingLatency] = useState(18);

  // Organic real-time simulation for live dashboard heartbeat
  useEffect(() => {
    const timer = setInterval(() => {
      setTokensConsumed((prev) => prev + Math.floor(Math.random() * 60) + 25);
      setActiveRPM((prev) =>
        Math.min(3150, Math.max(2780, prev + (Math.random() > 0.45 ? 6 : -5)))
      );
      setPingLatency((prev) =>
        Math.min(22, Math.max(14, prev + (Math.random() > 0.5 ? 1 : -1)))
      );
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const waveformHeights = [
    35, 55, 75, 45, 85, 60, 95, 80, 45, 65, 90, 100, 75, 55, 85, 95, 70, 40,
    60, 80, 100, 85, 70, 50, 65, 85, 90, 60, 40, 55, 75, 90, 85, 50, 30,
  ];

  return (
    <div className="relative mx-auto max-w-4xl w-full">
      {/* Radiant Glow Behind Mockup */}
      <div className="absolute -inset-6 bg-gradient-to-r from-violet-primary/20 via-violet-soft/25 to-blue-soft/25 rounded-[40px] blur-3xl -z-10 opacity-70 animate-pulse-glow" />

      {/* Main Floating Mockup Container */}
      <div className="relative bg-white/95 backdrop-blur-xl border border-border rounded-3xl shadow-float overflow-hidden transition-all duration-300 hover:shadow-[0_24px_60px_-12px_rgba(117,87,255,0.18)]">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-3 text-xs font-mono font-semibold text-[#3b3b48] flex items-center gap-1.5">
              <span>api.nexora.cloud/v1/gateway</span>
              <span className="inline-block w-1.5 h-3 bg-violet-primary animate-pulse" />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Badge variant="success" size="sm" className="font-mono font-semibold">
              Edge Active • {pingLatency}ms
            </Badge>
          </div>
        </div>

        {/* Mockup Dashboard Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Top KPI Cards in Mockup */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* KPI 1: Token Allowance */}
            <div className="p-4 rounded-2xl bg-surface border border-border hover:border-violet-soft/50 transition-colors">
              <div className="flex items-center justify-between text-[#555562] mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1e1e24]">
                  Token Allowance
                </span>
                <Zap className="w-4 h-4 text-violet-primary" />
              </div>
              <div className="text-2xl font-bold font-sans text-[#111111] tracking-tight">
                50.0M <span className="text-xs font-semibold text-[#666675]">quota</span>
              </div>
              <div className="mt-2.5 w-full bg-border rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-violet-primary to-violet-soft h-full rounded-full"
                  initial={{ width: "62%" }}
                  animate={{ width: "64.82%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-xs font-semibold text-[#555564] mt-2 font-mono">
                <span>{(tokensConsumed / 1000000).toFixed(2)}M consumed</span>
                <span className="text-violet-primary font-bold">
                  {((50000000 - tokensConsumed) / 1000000).toFixed(2)}M left
                </span>
              </div>
            </div>

            {/* KPI 2: Gateway Velocity */}
            <div className="p-4 rounded-2xl bg-surface border border-border hover:border-violet-soft/50 transition-colors">
              <div className="flex items-center justify-between text-[#555562] mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1e1e24]">
                  Gateway Velocity
                </span>
                <Activity className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold font-sans text-[#111111] tracking-tight flex items-baseline gap-1.5">
                <span>{activeRPM.toLocaleString()}</span>
                <span className="text-xs font-bold text-emerald-600 font-mono">↑ 14% RPM</span>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs font-semibold text-[#555564]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Zero throttled requests (ZDR)</span>
              </div>
            </div>

            {/* KPI 3: Semantic Vector Cache */}
            <div className="p-4 rounded-2xl bg-surface border border-border hover:border-violet-soft/50 transition-colors">
              <div className="flex items-center justify-between text-[#555562] mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1e1e24]">
                  Semantic Vector Cache
                </span>
                <Database className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold font-sans text-[#111111] tracking-tight">
                276.4 GB <span className="text-xs font-semibold text-[#666675]">used</span>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs font-semibold text-[#555564]">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>3 encrypted isolated partitions</span>
              </div>
            </div>
          </div>

          {/* Abstract Waveform & Neural Pulse Visualization (Sonivale inspiration) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#100E20] via-[#16132D] to-[#1C1838] text-white relative overflow-hidden shadow-inner">
            {/* Ambient waveform curves */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-soft animate-spin-slow" />
                <span className="text-xs font-bold tracking-wider uppercase text-violet-soft">
                  Intelligent Provider Dispatcher
                </span>
              </div>
              <span className="text-xs text-white/80 font-mono font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                p95 TTFT Latency: {pingLatency}ms
              </span>
            </div>

            {/* Simulated Live Waveform / Signal Visualizer with Organically Breathing Bars */}
            <div className="h-20 flex items-center justify-between gap-1 sm:gap-1.5 px-2 relative z-10">
              {waveformHeights.map((val, i) => {
                const targetH1 = Math.max(25, (val * 1.15) % 100);
                const targetH2 = Math.max(20, (val * 0.75));
                return (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-violet-primary via-violet-soft to-blue-soft rounded-full opacity-85 hover:opacity-100 transition-opacity"
                    initial={{ height: `${val}%` }}
                    animate={{
                      height: [
                        `${val}%`,
                        `${targetH1}%`,
                        `${targetH2}%`,
                        `${val}%`,
                      ],
                    }}
                    transition={{
                      duration: 2.2 + (i % 5) * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.04,
                    }}
                  />
                );
              })}
            </div>

            {/* Provider Status Ticker */}
            <div className="flex flex-wrap items-center justify-between mt-4 text-xs font-semibold text-white/80 relative z-10 pt-3 border-t border-white/10 gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Claude 3.5 Sonnet
                </span>
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-2 h-2 rounded-full bg-violet-soft" />
                  GPT-4o (Omni)
                </span>
                <span className="hidden sm:flex items-center gap-1.5 text-white">
                  <span className="w-2 h-2 rounded-full bg-blue-soft" />
                  Gemini 1.5 Pro
                </span>
              </div>
              <span className="font-mono font-bold text-emerald-400">
                99.99% Routing SLA
              </span>
            </div>
          </div>

          {/* Active API Keys & Activity Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-surface border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#111111] flex items-center gap-2">
                  <Key className="w-4 h-4 text-violet-primary" />
                  Active API Credentials
                </span>
                <Badge variant="default" size="sm">
                  3 Active
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-border text-xs font-semibold text-[#1e1e24] shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Production Gateway</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-violet-primary">
                    nx_live_98e1••••
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-border text-xs font-semibold text-[#1e1e24] shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Staging Service</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-violet-primary">
                    nx_test_41b7••••
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#111111] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Security & Token Guardrails
                </span>
                <Badge variant="success" size="sm">
                  Enforced
                </Badge>
              </div>
              <div className="space-y-2 text-xs font-semibold text-[#40404f]">
                <div className="flex items-center justify-between py-1 border-b border-border">
                  <span>Hard Token Ceiling</span>
                  <span className="font-bold text-foreground font-mono">50,000,000</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-border">
                  <span>Soft Quota Warning (80%)</span>
                  <span className="font-bold text-foreground font-mono">40,000,000</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Authorized Models</span>
                  <span className="font-bold text-violet-primary">6 Frontier Providers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Accent Badge 1 (Top Left) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex items-center gap-3 absolute -left-12 top-1/4 bg-white/95 backdrop-blur-md border border-border p-3.5 rounded-2xl shadow-float z-20"
      >
        <div className="w-9 h-9 rounded-xl bg-violet-light flex items-center justify-center text-violet-primary shrink-0 shadow-sm border border-violet-soft/30">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-foreground">Token Quota Synced</p>
          <p className="text-xs text-[#525263] font-medium">+50M monthly allowance</p>
        </div>
      </motion.div>

      {/* Floating Accent Badge 2 (Bottom Right) */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden lg:flex items-center gap-3 absolute -right-10 bottom-1/4 bg-white/95 backdrop-blur-md border border-border p-3.5 rounded-2xl shadow-float z-20"
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm border border-emerald-200">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-foreground">99.99% Gateway SLA</p>
          <p className="text-xs text-[#525263] font-medium">Automatic multi-cloud failover</p>
        </div>
      </motion.div>

      {/* Floating Accent Badge 3 (Top Right) */}
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="hidden xl:flex items-center gap-2.5 absolute -right-8 -top-6 bg-white/95 backdrop-blur-md border border-border px-3.5 py-2 rounded-full shadow-float z-20 text-xs font-semibold"
      >
        <span className="w-2 h-2 rounded-full bg-violet-primary animate-pulse" />
        <span className="text-[#111111]">Cache Hit Rate:</span>
        <span className="text-violet-primary font-mono font-bold">98.4%</span>
      </motion.div>
    </div>
  );
}

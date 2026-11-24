"use client";

import React, { useState } from "react";
import { Globe2, Server, Shield, Zap, Activity, Cpu, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EdgeTopologySection() {
  const [selectedRegion, setSelectedRegion] = useState("iad");

  const regions = [
    {
      id: "iad",
      name: "US-East (Virginia)",
      code: "iad-edge-01",
      latency: "14 ms",
      health: "Optimal",
      throughput: "14.2k req/s",
      providers: ["OpenAI", "Anthropic", "Google"],
      uptime: "99.99%",
    },
    {
      id: "pdx",
      name: "US-West (Oregon)",
      code: "pdx-edge-02",
      latency: "18 ms",
      health: "Optimal",
      throughput: "9.8k req/s",
      providers: ["OpenAI", "Google", "Meta"],
      uptime: "99.98%",
    },
    {
      id: "fra",
      name: "EU-Central (Frankfurt)",
      code: "fra-edge-01",
      latency: "19 ms",
      health: "Optimal",
      throughput: "12.5k req/s",
      providers: ["Mistral", "Anthropic", "OpenAI"],
      uptime: "99.99%",
    },
    {
      id: "dub",
      name: "EU-West (Dublin)",
      code: "dub-edge-02",
      latency: "22 ms",
      health: "Optimal",
      throughput: "8.1k req/s",
      providers: ["Mistral", "OpenAI"],
      uptime: "99.99%",
    },
    {
      id: "tyo",
      name: "AP-East (Tokyo)",
      code: "tyo-edge-01",
      latency: "26 ms",
      health: "Optimal",
      throughput: "10.4k req/s",
      providers: ["Google", "OpenAI", "Anthropic"],
      uptime: "99.97%",
    },
    {
      id: "sin",
      name: "AP-South (Singapore)",
      code: "sin-edge-02",
      latency: "28 ms",
      health: "Optimal",
      throughput: "7.6k req/s",
      providers: ["OpenAI", "Google"],
      uptime: "99.98%",
    },
  ];

  const current = regions.find((r) => r.id === selectedRegion) || regions[0];

  return (
    <section className="py-24 sm:py-32 bg-[#FAFAFC] border-t border-border relative overflow-hidden">
      {/* Subtle radial ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-violet-soft/10 via-blue-soft/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border text-xs font-semibold text-secondary shadow-subtle mb-4">
            <Globe2 className="w-3.5 h-3.5 text-violet-primary" />
            Distributed Anycast Infrastructure
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#111111] mb-5 font-heritage">
            Global Edge Topology.
            <br />
            <span className="text-violet-primary">Sub-20ms Gateway Latency.</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary leading-relaxed">
            Requests hit the nearest Nexora edge point-of-presence (PoP), terminating TLS and validating token quotas locally before intelligent routing to upstream model servers.
          </p>
        </div>

        {/* Interactive Edge Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-premium">
          {/* Region Picker & Node List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Active Edge PoPs (24 Nodes)
              </span>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                All Operational
              </span>
            </div>

            <div className="space-y-2">
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                    selectedRegion === reg.id
                      ? "bg-violet-light/40 border-violet-soft text-foreground shadow-sm"
                      : "bg-surface border-border/80 text-secondary hover:text-foreground hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${
                        selectedRegion === reg.id
                          ? "bg-violet-primary text-white"
                          : "bg-white text-secondary border border-border"
                      }`}
                    >
                      {reg.id.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">{reg.name}</p>
                      <p className="text-xs font-mono text-[#525263] font-semibold">{reg.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-700">
                      {reg.latency}
                    </span>
                    <p className="text-xs font-bold text-[#6e6e7c]">p95 TTFT</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Node Telemetry Visualizer */}
          <div className="lg:col-span-7 bg-[#100E20] rounded-2xl p-6 sm:p-8 text-white border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-violet-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Header inside Dark Terminal */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs uppercase font-mono font-bold tracking-widest text-violet-soft">
                    PoP Node Telemetry
                  </span>
                  <h3 className="text-xl font-bold font-heritage text-white mt-0.5">
                    {current.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {current.health}
                  </span>
                  <span className="text-xs font-mono font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                    {current.uptime} SLA
                  </span>
                </div>
              </div>

              {/* Live Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <span className="text-xs text-white/70 block mb-1 font-semibold">p95 TTFT Latency</span>
                  <span className="text-2xl font-mono font-bold text-violet-soft">
                    {current.latency}
                  </span>
                  <span className="text-xs text-emerald-400 block mt-1 font-semibold">Direct fiber link</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <span className="text-xs text-white/70 block mb-1 font-semibold">Live Ingress Rate</span>
                  <span className="text-2xl font-mono font-bold text-white">
                    {current.throughput}
                  </span>
                  <span className="text-xs text-white/60 block mt-1 font-semibold">Real-time telemetry</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 col-span-2 sm:col-span-1">
                  <span className="text-xs text-white/70 block mb-1 font-semibold">TLS Handshake</span>
                  <span className="text-2xl font-mono font-bold text-blue-soft">0-RTT</span>
                  <span className="text-xs text-white/60 block mt-1 font-semibold">TLS 1.3 / ChaCha20</span>
                </div>
              </div>

              {/* Connected Model Upstream Pipes */}
              <div>
                <span className="text-xs text-white/60 block mb-2 font-medium">
                  Direct Private Peering Upstreams:
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.providers.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1.5 rounded-lg bg-white/10 text-xs text-white border border-white/15 flex items-center gap-1.5"
                    >
                      <Zap className="w-3 h-3 text-violet-soft" />
                      {p} Direct Pipe
                    </span>
                  ))}
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-xs text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
                    <Shield className="w-3 h-3" />
                    Layer 7 Anti-DDoS
                  </span>
                </div>
              </div>

              {/* Edge routing mock terminal feed */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-[11px] text-white/70 space-y-1">
                <div className="flex justify-between text-white/40 text-[10px]">
                  <span>INGRESS STREAM</span>
                  <span>TCP BBR CONGESTION CONTROL</span>
                </div>
                <div className="text-emerald-400">
                  ✔ 08:44:12 [TLS-TERM] Client TLS terminated at {current.code} in 3.2ms
                </div>
                <div className="text-blue-300">
                  ✔ 08:44:12 [AUTH-GATE] API key verified; token budget quota valid
                </div>
                <div className="text-violet-300">
                  ✔ 08:44:13 [ROUTE-DISPATCH] Proxied to {current.providers[0]} upstream with 0% dropped frames
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Architecture Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white border border-border p-6 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-violet-light border border-violet-soft/30 flex items-center justify-center text-violet-primary shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground font-heritage">
                BGP Anycast Routing
              </h4>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                Single global IP address announces via BGP across 24 tier-1 transit providers, routing developers to the physically nearest PoP automatically.
              </p>
            </div>
          </div>

          <div className="bg-white border border-border p-6 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-light border border-blue-soft/30 flex items-center justify-center text-indigo-700 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground font-heritage">
                Zero Cold-Start Buffering
              </h4>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                Persistent keep-alive connection pools to Anthropic, OpenAI, and Google data centers eliminate TCP handshake overhead on every generation call.
              </p>
            </div>
          </div>

          <div className="bg-white border border-border p-6 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground font-heritage">
                Multi-Provider Failover
              </h4>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                If an upstream provider returns 502/503 or degrades beyond 1,500ms TTFT, Nexora reroutes requests to your configured secondary model in under 12ms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

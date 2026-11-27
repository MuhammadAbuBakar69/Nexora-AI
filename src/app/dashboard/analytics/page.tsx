"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Activity, Clock, ShieldCheck, Cpu, ArrowUpRight, Filter, AlertCircle } from "lucide-react";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("24h");

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <DashboardHeader
        title="Gateway Telemetry &amp; Latency Analytics"
        subtitle="End-to-end performance metrics, request velocity, and provider latency percentiles"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* CAD Telemetry Marker */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase px-1">
          <span>// TELEMETRY RADAR • DWG: ANL-PERF-01</span>
          <span>ROUTING TOPOLOGY: ANYCAST (32 POPs)</span>
        </div>

        {/* Timeframe Bar */}
        <div className="flex items-center justify-between p-4 bg-white border border-[#E2E2DA]">
          <div className="flex items-center gap-2">
            {(["24h", "7d", "30d"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 text-xs font-mono font-bold uppercase transition-all ${
                  timeframe === t
                    ? "bg-[#111111] text-white"
                    : "bg-[#F7F7F4] text-[#555562] border border-[#E2E2DA] hover:border-[#111111]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="text-[11px] font-mono text-emerald-600 font-bold">
            GATEWAY HEALTH: 99.99%
          </span>
        </div>

        {/* 3 Core Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white border border-[#E2E2DA] relative">
            <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
            <div className="flex items-center justify-between text-[#777783] text-xs font-mono uppercase mb-2">
              <span>Gateway Requests</span>
              <Activity className="w-4 h-4 text-violet-primary" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-[#111111]">
              0
            </div>
            <p className="text-[11px] text-[#777783] font-mono mt-1">
              Awaiting client incoming traffic
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E2E2DA] relative">
            <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
            <div className="flex items-center justify-between text-[#777783] text-xs font-mono uppercase mb-2">
              <span>P95 Edge Latency</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-[#111111]">
              18 ms
            </div>
            <p className="text-[11px] text-[#777783] font-mono mt-1">
              Anycast edge proxy overhead
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E2E2DA] relative">
            <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
            <div className="flex items-center justify-between text-[#777783] text-xs font-mono uppercase mb-2">
              <span>Gateway Error Rate</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-emerald-700">
              0.00%
            </div>
            <p className="text-[11px] text-[#777783] font-mono mt-1">
              Zero-packet drop routing mesh
            </p>
          </div>
        </div>

        {/* Live Provider Health & Latency Benchmarks */}
        <div className="bg-white border border-[#E2E2DA] p-6 relative">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <div className="pb-4 border-b border-[#E2E2DA] mb-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
              Upstream Provider Mesh Telemetry
            </h3>
            <p className="text-[11px] font-mono text-[#777783] mt-0.5">
              Live automated ping &amp; health checks from the Nexora Anycast router
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { provider: "Google Gemini (Vertex AI)", p95: "19ms", status: "NORMAL" },
              { provider: "Google Veo (Video)", p95: "45ms", status: "NORMAL" },
              { provider: "Anthropic (Direct API)", p95: "38ms", status: "NORMAL" },
              { provider: "OpenAI (Direct API)", p95: "32ms", status: "NORMAL" },
            ].map((p, idx) => (
              <div key={idx} className="p-4 bg-[#F7F7F4] border border-[#E2E2DA]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#111111]">{p.provider}</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 border border-emerald-200">
                    {p.status}
                  </span>
                </div>
                <div className="text-lg font-bold text-[#111111] font-mono">{p.p95}</div>
                <span className="text-[10px] font-mono text-[#777783]">Edge connection latency</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

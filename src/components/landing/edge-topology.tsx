"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe2, Server, Shield, Zap, Activity, Cpu } from "lucide-react";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";
import { GsapHeadline } from "@/components/animations/gsap-animator";

export function EdgeTopologySection() {
  const [selectedRegion, setSelectedRegion] = useState("iad");

  const regions = [
    {
      id: "iad",
      name: "US-East (Virginia)",
      code: "iad-edge-01",
      latency: "14 ms",
      health: "OPTIMAL",
      throughput: "14.2k req/s",
      providers: ["Google", "Anthropic", "OpenAI"],
      uptime: "99.99%",
    },
    {
      id: "pdx",
      name: "US-West (Oregon)",
      code: "pdx-edge-02",
      latency: "18 ms",
      health: "OPTIMAL",
      throughput: "9.8k req/s",
      providers: ["Google", "OpenAI"],
      uptime: "99.99%",
    },
    {
      id: "fra",
      name: "EU-Central (Frankfurt)",
      code: "fra-edge-01",
      latency: "19 ms",
      health: "OPTIMAL",
      throughput: "12.5k req/s",
      providers: ["Google", "Anthropic", "OpenAI"],
      uptime: "99.99%",
    },
    {
      id: "sin",
      name: "AP-East (Singapore)",
      code: "sin-edge-01",
      latency: "24 ms",
      health: "OPTIMAL",
      throughput: "7.6k req/s",
      providers: ["Google", "OpenAI"],
      uptime: "99.99%",
    },
  ];

  const active = regions.find((r) => r.id === selectedRegion) || regions[0];

  return (
    <section className="py-20 bg-[#F6F6F3] border-b border-[#E2E2DA] select-none font-sans relative overflow-hidden">
      {/* Subtle Ambient Sunset Glow */}
      <AnimatedSunsetMesh intensity="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CAD Blueprint Header */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase mb-8 pb-2 border-b border-[#E2E2DA]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            // TOPOLOGY SPECIFICATION: ANYCAST GLOBAL INGRESS RADAR
          </span>
          <span>MESH NODES: 32 ACTIVE EDGE PoPs</span>
        </div>

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-primary bg-violet-50 px-2.5 py-1 border border-violet-200 inline-block mb-3">
            DISTRIBUTED EDGE TOPOLOGY
          </span>
          <GsapHeadline
            text="SUB-20MS INFERENCE ROUTING ACROSS"
            highlight="32 GLOBAL PoPs"
            className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] font-mono leading-[1.12] mb-3"
          />
          <p className="text-xs sm:text-sm text-[#555562] font-mono leading-relaxed">
            Requests hit the nearest physical Anycast node via BGP Anycast routing, minimizing time-to-first-token (TTFT) and providing resilient zero-packet-drop failover.
          </p>
        </div>

        {/* Region Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-mono">
          {regions.map((reg) => {
            const isSelected = selectedRegion === reg.id;
            return (
              <motion.button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`p-5 text-left border relative transition-all ${
                  isSelected
                    ? "bg-white border-[#111111] ring-1 ring-[#111111] shadow-sm"
                    : "bg-[#F7F7F4]/90 hover:bg-white border-[#E2E2DA] hover:border-[#111111]"
                }`}
              >
                <span className="absolute top-1.5 left-2 text-xs text-[#888892] select-none">+</span>
                <span className="absolute top-1.5 right-2 text-xs text-[#888892] select-none">+</span>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-[#777783] uppercase tracking-wider">{reg.code}</span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-emerald-500 animate-ping" : "bg-emerald-500"}`} />
                </div>

                <div className="text-sm font-bold text-[#111111] uppercase mb-1">
                  {reg.name}
                </div>

                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-xl font-extrabold text-[#111111]">{reg.latency}</span>
                  <span className="text-[10px] text-[#777783]">TTFT</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Region Telemetry Board */}
        <div className="bg-white/95 backdrop-blur-xs border border-[#E2E2DA] p-6 sm:p-8 relative shadow-sm">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute bottom-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute bottom-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 font-mono">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-[#111111] uppercase">{active.name}</span>
                <span className="text-xs text-[#777783]">({active.code})</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F7F7F4] border border-[#E2E2DA]">
                  <span className="text-[10px] text-[#777783] uppercase block">HEALTH STATUS</span>
                  <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{active.health}</span>
                </div>
                <div className="p-3 bg-[#F7F7F4] border border-[#E2E2DA]">
                  <span className="text-[10px] text-[#777783] uppercase block">THROUGHPUT</span>
                  <span className="font-bold text-[#111111] text-sm mt-0.5 block">{active.throughput}</span>
                </div>
              </div>

              <p className="text-xs text-[#555562] font-sans leading-relaxed">
                Hardware-accelerated edge routing node with local vector caching and zero-copy packet proxying directly into Google Cloud, AWS, and Cloudflare interconnects.
              </p>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold text-[#777783] tracking-wider block">
                  SUPPORTED UPSTREAM MESH PROVIDERS
                </span>
                <div className="flex flex-wrap gap-2">
                  {active.providers.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 bg-[#F7F7F4] border border-[#E2E2DA] text-xs font-bold text-[#111111]"
                    >
                      {p} Direct Interconnect
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E2DA] flex items-center justify-between text-xs">
                <span className="text-[#777783]">FINANCIAL SLA:</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-300">
                  {active.uptime} BACKED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Activity, Zap } from "lucide-react";
import { GsapCounter, GsapReveal } from "@/components/animations/gsap-animator";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";
import { AnimatedGradientCard } from "@/components/ui/animated-gradient-card";

export function MetricsSection() {
  const metrics = [
    {
      numeric: 32,
      decimals: 0,
      suffix: "",
      unit: "PoPs",
      label: "Anycast Edge Nodes",
      sublabel: "Global low-latency ingress mesh",
      icon: Cpu,
    },
    {
      numeric: 6,
      decimals: 0,
      suffix: "+",
      unit: "Engines",
      label: "Frontier AI Modalities",
      sublabel: "Gemini, Veo, Claude, GPT-4o",
      icon: Zap,
    },
    {
      numeric: 18,
      decimals: 0,
      prefix: "< ",
      suffix: "",
      unit: "ms",
      label: "Median Edge Routing",
      sublabel: "Intelligent proxy cache TTFT",
      icon: Activity,
    },
    {
      numeric: 99.99,
      decimals: 2,
      suffix: "%",
      unit: "SLA",
      label: "Platform Availability",
      sublabel: "Automatic multi-region failover",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-20 border-b border-[#E2E2DA] bg-[#F6F6F3] select-none font-sans relative overflow-hidden">
      {/* Subtle Ambient Sunset Glow under the metrics */}
      <AnimatedSunsetMesh intensity="ambient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CAD Blueprint Callout Header */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase mb-8 pb-2 border-b border-[#E2E2DA]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            // TELEMETRY HUD: PERFORMANCE SPECIFICATIONS &amp; TOPOLOGY
          </span>
          <span>TOLERANCE: ±0.002MS • ZERO-DATA RETENTION</span>
        </div>

        {/* 4 CAD Compartments with Animated Sunset Gradients and GSAP Stagger */}
        <GsapReveal stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((item, idx) => (
            <AnimatedGradientCard
              key={idx}
              intensity="vibrant"
              className="p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#111111] flex items-baseline gap-1">
                    <GsapCounter
                      target={item.numeric}
                      decimals={item.decimals}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      className="text-gradient-sunset"
                    />
                    <span className="text-xs font-mono font-bold text-[#111111] uppercase ml-1">
                      {item.unit}
                    </span>
                  </div>
                  <item.icon className="w-4 h-4 text-[#FF5722] opacity-75 group-hover:opacity-100 transition-opacity" />
                </div>

                <h4 className="text-xs font-mono font-bold uppercase text-[#111111] mt-2 group-hover:text-[#FF5722] transition-colors">
                  {item.label}
                </h4>
              </div>

              <p className="text-[11px] font-mono text-[#777783] mt-3 pt-3 border-t border-[#E2E2DA]">
                {item.sublabel}
              </p>
            </AnimatedGradientCard>
          ))}
        </GsapReveal>
      </div>
    </section>
  );
}

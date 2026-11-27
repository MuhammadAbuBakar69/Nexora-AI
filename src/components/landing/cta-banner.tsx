"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Terminal, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20 bg-[#F6F6F3] border-b border-[#E2E2DA] select-none font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-white p-8 sm:p-14 relative border border-[#282828] font-mono overflow-hidden">
          {/* Subtle Ambient Indigo Mesh Glow */}
          <div className="absolute -top-[30%] -right-[20%] w-[550px] h-[550px] bg-indigo-600/10 opacity-30 filter blur-[100px] rounded-full pointer-events-none" />

          {/* Corner Crosshairs */}
          <span className="absolute top-2 left-3 text-xs text-[#666666] select-none">+</span>
          <span className="absolute top-2 right-3 text-xs text-[#666666] select-none">+</span>
          <span className="absolute bottom-2 left-3 text-xs text-[#666666] select-none">+</span>
          <span className="absolute bottom-2 right-3 text-xs text-[#666666] select-none">+</span>

          {/* Top Telemetry Header */}
          <div className="flex flex-wrap items-center justify-between text-[10px] tracking-widest text-[#888899] uppercase mb-6 pb-3 border-b border-[#282828]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              DWG: CTA-INGRESS-01 // MESH READY
            </span>
            <span>SCALE: 1:1 • NODE: ANYCAST-GLOBAL</span>
          </div>

          <div className="max-w-3xl relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300 bg-violet-950/60 px-2.5 py-1 border border-violet-800/60 mb-4 inline-block">
              // UNIFIED CONTROL PLANE
            </span>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white mb-5 leading-[1.12]">
              EXPERIENCE TOTAL GOVERNANCE OVER YOUR <span className="text-violet-400">AI INFRASTRUCTURE</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed mb-8 max-w-2xl font-sans">
              Join engineering teams orchestrating multi-provider AI workloads with single-key governance, hard cost caps, Google Veo video inference, and real-time observability.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                href="/signup"
                size="lg"
                className="w-full sm:w-auto bg-white text-[#111111] hover:bg-[#EAEAEA] font-bold uppercase tracking-wider text-xs px-8 py-3.5 border border-white"
              >
                <span>Provision Account</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                href="/dashboard"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent text-white hover:bg-[#1A1A1A] font-bold uppercase tracking-wider text-xs px-7 py-3.5 border border-[#444444]"
              >
                <Terminal className="w-4 h-4 mr-2 text-[#888888]" />
                <span>Launch Gateway Console</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

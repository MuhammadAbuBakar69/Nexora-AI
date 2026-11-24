"use client";

import React from "react";
import { KeyRound, Zap, AlertTriangle, HardDrive, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PurpleShowcase() {
  return (
    <section className="py-32 sm:py-40 bg-[#FAFAFC] relative overflow-hidden">
      {/* Sonivale-style Soft Lavender Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] sm:h-[650px] bg-gradient-to-r from-violet-soft/30 via-violet-primary/20 to-blue-soft/30 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative concentric subtle circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-violet-soft/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-violet-soft/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Eyebrow */}
        <Badge variant="violet" className="mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Autonomous Telemetry & Alerts
        </Badge>

        {/* Central Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] max-w-2xl mx-auto mb-6 leading-[1.12] font-heritage">
          Your AI resources.
          <br />
          <span className="text-violet-primary">Under your control.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#3f3f4c] max-w-xl mx-auto mb-16 leading-relaxed font-medium">
          Real-time alerts, proactive quota guardrails, and automated provisioning keep your intelligence pipelines operating seamlessly.
        </p>

        {/* Floating Notification Cards Around the Center (Sonivale layout) */}
        <div className="relative max-w-4xl mx-auto h-[400px]">
          {/* Notification 1: Top-Left */}
          <div className="absolute top-2 left-0 sm:left-4 bg-white/95 backdrop-blur-md border border-border p-4 rounded-2xl shadow-float flex items-center gap-4 max-w-xs text-left animate-float-slow hover:border-violet-soft hover-lift cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-sm">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111111]">API Key Provisioned</p>
              <p className="text-xs text-[#525263] mt-0.5 font-medium">
                Key <span className="font-mono font-bold text-foreground">nx_live_98e1</span> assigned to Production.
              </p>
            </div>
          </div>

          {/* Notification 2: Top-Right */}
          <div className="absolute top-8 right-0 sm:right-6 bg-white/95 backdrop-blur-md border border-border p-4 rounded-2xl shadow-float flex items-center gap-4 max-w-xs text-left animate-float-delayed hover:border-violet-soft hover-lift cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-violet-light border border-violet-soft/40 flex items-center justify-center text-violet-primary shrink-0 shadow-sm">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111111]">Token Quota Updated</p>
              <p className="text-xs text-[#525263] mt-0.5 font-medium">
                Workspace quota renewed: <span className="font-bold text-foreground">+50,000,000</span> tokens.
              </p>
            </div>
          </div>

          {/* Notification 3: Bottom-Left */}
          <div className="absolute bottom-10 left-2 sm:left-12 bg-white/95 backdrop-blur-md border border-border p-4 rounded-2xl shadow-float flex items-center gap-4 max-w-xs text-left animate-float-delayed hover:border-amber-300 hover-lift cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111111]">Soft Limit Approaching</p>
              <p className="text-xs text-[#525263] mt-0.5 font-medium">
                Staging environment reached 80% soft quota ceiling.
              </p>
            </div>
          </div>

          {/* Notification 4: Bottom-Right */}
          <div className="absolute bottom-4 right-2 sm:right-10 bg-white/95 backdrop-blur-md border border-border p-4 rounded-2xl shadow-float flex items-center gap-4 max-w-xs text-left animate-float-slow hover:border-blue-300 hover-lift cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-indigo-700 shrink-0 shadow-sm">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#111111]">Vector Partitions Synced</p>
              <p className="text-xs text-[#525263] mt-0.5 font-medium">
                Multi-region cache replicated across Frankfurt and Virginia.
              </p>
            </div>
          </div>

          {/* Central Pulsing Beacon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/90 border border-violet-soft/50 shadow-glow-violet flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-primary via-[#6846FF] to-blue-soft flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        <p className="text-xs font-semibold text-[#6e6e7c] mt-6">
          * Illustrative interface notifications demonstrating platform telemetry behavior.
        </p>
      </div>
    </section>
  );
}

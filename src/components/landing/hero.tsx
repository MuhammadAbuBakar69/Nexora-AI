"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Terminal, Shield, Zap, Globe, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroMockup } from "@/components/landing/hero-mockup";
import { HeroWaveform } from "@/components/landing/hero-waveform";
import { GsapHeadline, GsapFloat } from "@/components/animations/gsap-animator";
import { FadeIn } from "@/components/animations/motion-wrapper";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden bg-white">
      {/* Sonivale-style Ambient Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-hero-glow blur-3xl pointer-events-none -z-20" />

      {/* Signature Sonivale-style Flowing Abstract Waveform Ribbon */}
      <HeroWaveform />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Sonivale-style Sub-badge with Electric Pulse */}
        <FadeIn delay={0.05} direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/90 backdrop-blur-sm border border-border text-xs text-[#2a2a35] font-semibold mb-8 hover:border-violet-soft/60 transition-all shadow-subtle hover-lift">
            <span className="w-2 h-2 rounded-full bg-violet-primary animate-pulse" />
            <span>Next-Generation AI Gateway &amp; Quota Engine</span>
            <span className="text-[#111111] font-bold flex items-center gap-1">
              v1.0 Ready <ArrowRight className="w-3 h-3 text-secondary" />
            </span>
          </div>
        </FadeIn>

        {/* Sonivale Editorial Oversized Hero Headline with GSAP Reveal */}
        <GsapHeadline
          text="Your AI Infrastructure."
          highlight="One Powerful Platform."
          className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#111111] max-w-4xl mx-auto leading-[1.08] mb-6 font-heritage"
        />

        {/* Supporting Editorial Paragraph with High-End Legibility */}
        <FadeIn delay={0.18} direction="up">
          <p className="text-base sm:text-xl text-[#383847] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Access frontier AI APIs, manage customer token quotas, and govern your cloud
            infrastructure through one unified, developer-first gateway.
          </p>
        </FadeIn>

        {/* Call to Actions with Shimmer & Micro-Interactions */}
        <FadeIn delay={0.28} direction="up">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button
                variant="violet"
                size="lg"
                className="w-full sm:w-auto shadow-md gap-2 font-bold tracking-tight text-sm px-7 py-3 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto gap-2 font-semibold text-sm px-6 py-3 hover:bg-white hover:border-[#111111]/20 transition-all"
              >
                <Terminal className="w-4 h-4 text-secondary" />
                Explore Platform Demo
              </Button>
            </Link>
          </div>

          {/* Micro-Stats Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#525264] font-medium mb-16">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>32 Anycast Edge PoPs</span>
            </span>
            <span className="text-border hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-primary" />
              <span>Sub-20ms P95 TTFT</span>
            </span>
            <span className="text-border hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Zero-Data Retention (ZDR)</span>
            </span>
          </div>
        </FadeIn>

        {/* Floating Product Dashboard Mockup with Organic GSAP Float & Shadow Depth */}
        <div className="relative">
          <GsapFloat duration={5.5} y={10}>
            <HeroMockup />
          </GsapFloat>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  ArrowRight,
  Shield,
  Activity,
  Layers,
  Check,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";

export default function ResourcesPage() {
  const whitepapers = [
    {
      id: "zdr-whitepaper",
      title: "Zero-Data Retention (ZDR) Architecture in Enterprise AI Gateways",
      category: "SECURITY & COMPLIANCE",
      pages: "18 PAGES PDF",
      readTime: "12 MIN READ",
      summary:
        "An in-depth security whitepaper detailing volatile memory buffering, TLS 1.3 termination, ephemeral tokenization, and cryptographic SHA-256 HMAC audit proofs.",
    },
    {
      id: "token-optimization",
      title: "The 2026 Token Quota & Cost Optimization Handbook",
      category: "ENGINEERING BEST PRACTICES",
      pages: "24 PAGES PDF",
      readTime: "15 MIN READ",
      summary:
        "A practical guide for engineering leaders to eliminate runaway LLM bills, set intelligent rate limits, and implement semantic vector caching to reduce token spend by 40%.",
    },
    {
      id: "multi-provider-failover",
      title: "High-Availability AI: Multi-Provider Failover & Circuit Breaking",
      category: "SYSTEMS ENGINEERING",
      pages: "16 PAGES PDF",
      readTime: "10 MIN READ",
      summary:
        "Technical analysis of sub-second multi-region connection pools, health check cascades between Gemini, Veo, Claude, and GPT, and automated circuit breaking.",
    },
  ];

  const handleDownload = (title: string) => {
    alert(`Downloading ${title} (PDF)...`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F3] font-sans select-none">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* CAD Blueprint Resources Hero */}
        <section className="relative py-20 sm:py-28 overflow-hidden bg-[#F6F6F3] border-b border-[#E2E2DA]">
          {/* Animated Sunset Mesh Gradient */}
          <AnimatedSunsetMesh intensity="subtle" />

          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply z-[1]"
            style={{
              backgroundImage:
                "radial-gradient(#111111 1px, transparent 1px), radial-gradient(#111111 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              backgroundPosition: "0 0, 12px 12px",
            }}
          />

          <span className="absolute top-4 left-4 font-mono text-sm font-semibold text-[#888892] select-none">+</span>
          <span className="absolute top-4 right-4 font-mono text-sm font-semibold text-[#888892] select-none">+</span>
          <span className="absolute bottom-4 left-4 font-mono text-sm font-semibold text-[#888892] select-none">+</span>
          <span className="absolute bottom-4 right-4 font-mono text-sm font-semibold text-[#888892] select-none">+</span>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center font-mono">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF5722] bg-[#FF5722]/10 px-2.5 py-1 border border-[#FF5722]/30">
                DWG: SPEC-RES-01 // ENGINEERING RESEARCH
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#111111] mb-6 leading-[1.08]">
              ENGINEERING WHITEPAPERS &amp; <span className="text-gradient-sunset">ARCHITECTURAL GUIDES</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#444452] max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
              Comprehensive architectural specifications, security evaluations, and operational benchmarks published by the Nexora systems research team.
            </p>
          </div>
        </section>

        {/* Whitepapers Grid in CAD Style */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E2E2DA]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            {whitepapers.map((wp) => (
              <div
                key={wp.id}
                className="bg-white border border-[#E2E2DA] p-6 sm:p-8 flex flex-col justify-between relative hover:border-[#111111] transition-colors"
              >
                <span className="absolute top-2 left-2 text-xs text-[#888892] select-none">+</span>
                <span className="absolute top-2 right-2 text-xs text-[#888892] select-none">+</span>

                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DA] mb-4">
                    <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#F7F7F4] border border-[#E2E2DA] text-[#555562]">
                      {wp.category}
                    </span>
                    <span className="text-[10px] text-[#777783]">{wp.pages}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#111111] uppercase tracking-tight mb-3">
                    {wp.title}
                  </h3>

                  <p className="text-xs text-[#555562] leading-relaxed font-sans mb-6">
                    {wp.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E2DA]">
                  <Button
                    size="sm"
                    onClick={() => handleDownload(wp.title)}
                    className="w-full text-xs font-bold uppercase tracking-wider bg-[#111111] text-white hover:bg-black"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    <span>Download Whitepaper</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

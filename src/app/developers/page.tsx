"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DeveloperSection } from "@/components/landing/developer-section";
import { Code, Terminal, Key, Shield, ArrowRight, BookOpen, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";

export default function DevelopersPage() {
  const sdks = [
    {
      lang: "TypeScript / Node.js",
      tag: "@google/genai & openai SDK",
      desc: "Full strict typing for requests, streaming events, usage headers, and structured schema outputs.",
      install: "npm install openai",
    },
    {
      lang: "Python SDK",
      tag: "python >= 3.8",
      desc: "Drop-in base_url configuration for OpenAI and LangChain clients with built-in retry backoff.",
      install: "pip install openai",
    },
    {
      lang: "Go Client",
      tag: "go 1.20+",
      desc: "High-performance goroutine connection pooling with native context cancellation and streaming support.",
      install: "go get github.com/sashabaranov/go-openai",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F3] font-sans select-none">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* CAD Blueprint Developer Hero */}
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
                DWG: SPEC-DEV-01 // DEVELOPER PROTOCOL
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#111111] mb-6 leading-[1.08]">
              INTEGRATE NEXORA IN <span className="text-gradient-sunset">UNDER 5 MINUTES</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#444452] max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
              Drop-in compatibility with OpenAI, Google GenAI, and LangChain client libraries. One API key unlocks every frontier model with zero refactoring.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                href="/dashboard/api-keys"
                size="lg"
                className="w-full sm:w-auto bg-[#111111] text-white hover:bg-black font-bold uppercase tracking-wider text-xs px-8 py-3.5 border border-[#111111]"
              >
                <span>Provision API Key</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                href="/dashboard/docs"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white text-[#111111] hover:bg-[#F2F2EE] font-bold uppercase tracking-wider text-xs px-7 py-3.5 border border-[#E2E2DA]"
              >
                <BookOpen className="w-4 h-4 mr-2 text-[#777783]" />
                <span>API Reference</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Developer interactive snippet showcase */}
        <DeveloperSection />

        {/* SDK & Endpoints Reference Cards */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E2E2DA]">
          <div className="max-w-3xl mb-10 font-mono">
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-primary bg-violet-50 px-2.5 py-1 border border-violet-200">
              CLIENT BINDINGS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] mt-4 mb-2">
              OFFICIAL SDK LIBRARIES &amp; ADAPTERS
            </h2>
            <p className="text-xs sm:text-sm text-[#555562] font-sans">
              Native bindings with built-in retry backoff, token telemetry tracking, and streaming support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            {sdks.map((sdk, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E2E2DA] p-6 flex flex-col justify-between relative hover:border-[#111111] transition-colors"
              >
                <span className="absolute top-2 left-2 text-xs text-[#888892] select-none">+</span>
                <span className="absolute top-2 right-2 text-xs text-[#888892] select-none">+</span>

                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DA] mb-4">
                    <span className="text-xs font-bold text-[#111111]">{sdk.lang}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#F7F7F4] border border-[#E2E2DA] text-[#555562]">
                      {sdk.tag}
                    </span>
                  </div>

                  <p className="text-xs text-[#555562] leading-relaxed font-sans mb-4">
                    {sdk.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2E2DA]">
                  <code className="text-[11px] bg-[#F7F7F4] border border-[#E2E2DA] p-2 block text-[#111111]">
                    {sdk.install}
                  </code>
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DeveloperSection } from "@/components/landing/developer-section";
import { Code, Terminal, Key, Shield, ExternalLink, ArrowRight, BookOpen, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DevelopersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Header */}
        <section className="py-16 sm:py-24 text-center px-4 max-w-4xl mx-auto">
          <span className="text-xs uppercase font-semibold tracking-wider text-violet-primary bg-violet-light px-3 py-1 rounded-full border border-violet-soft/30">
            Developer Documentation & SDKs
          </span>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#111111] mt-4 mb-5">
            Integrate NEXORA in under 5 minutes.
          </h1>
          <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto">
            Drop-in compatibility with OpenAI, Anthropic, and LangChain client libraries. One API key unlocks every frontier model.
          </p>
        </section>

        {/* Developer interactive snippet showcase */}
        <DeveloperSection />

        {/* SDK & Endpoints Reference Cards */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-semibold text-foreground">
              Official SDK Libraries & Adapters
            </h2>
            <p className="text-secondary text-sm mt-2">
              Native bindings with built-in retry backoff, token telemetry tracking, and streaming support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl border border-border bg-white hover:border-violet-soft hover:shadow-premium transition-all hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-foreground font-mono font-bold mb-4 shadow-sm">
                TS
              </div>
              <h3 className="text-lg font-bold font-sans text-foreground mb-2">TypeScript / Node.js</h3>
              <p className="text-xs text-[#40404f] font-medium mb-4 leading-relaxed">
                Full strict typing for requests, streaming events, usage headers, and structured schema outputs.
              </p>
              <div className="p-3 rounded-xl bg-surface font-mono text-xs font-bold text-violet-primary border border-border">
                npm i @nexora/sdk
              </div>
            </div>

            <div className="p-7 rounded-3xl border border-border bg-white hover:border-violet-soft hover:shadow-premium transition-all hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-foreground font-mono font-bold mb-4 shadow-sm">
                PY
              </div>
              <h3 className="text-lg font-bold font-sans text-foreground mb-2">Python Client</h3>
              <p className="text-xs text-[#40404f] font-medium mb-4 leading-relaxed">
                Async/await ready, Pydantic v2 validation, LangChain & LlamaIndex integrations out-of-the-box.
              </p>
              <div className="p-3 rounded-xl bg-surface font-mono text-xs font-bold text-violet-primary border border-border">
                pip install nexora-client
              </div>
            </div>

            <div className="p-7 rounded-3xl border border-border bg-white hover:border-violet-soft hover:shadow-premium transition-all hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-foreground font-mono font-bold mb-4 shadow-sm">
                GO
              </div>
              <h3 className="text-lg font-bold font-sans text-foreground mb-2">Go Package</h3>
              <p className="text-xs text-[#40404f] font-medium mb-4 leading-relaxed">
                High-throughput, zero-allocation HTTP transport client for backend microservices and streaming proxies.
              </p>
              <div className="p-3 rounded-xl bg-surface font-mono text-xs font-bold text-violet-primary border border-border">
                go get github.com/nexora/sdk-go
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

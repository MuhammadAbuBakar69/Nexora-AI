"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Copy, ArrowRight, Sparkles, Video, Cpu, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";
import { GsapHeadline } from "@/components/animations/gsap-animator";
import { AnimatedGradientCard } from "@/components/ui/animated-gradient-card";

export function ModelsMatrixSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "google" | "anthropic" | "openai">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const models = [
    {
      id: "gemini-2.5-flash",
      name: "Google Gemini 2.5 Flash",
      provider: "Google",
      category: "google",
      modality: "Multimodal LLM",
      context: "1,048,576 tokens",
      latency: "18 ms",
      inputPrice: "$0.075 / 1M",
      outputPrice: "$0.30 / 1M",
      highlight: "Sub-20ms first-token latency, 1M context native",
      badge: "Fastest Routing",
    },
    {
      id: "gemini-2.5-pro",
      name: "Google Gemini 2.5 Pro",
      provider: "Google",
      category: "google",
      modality: "Multimodal LLM",
      context: "2,097,152 tokens",
      latency: "38 ms",
      inputPrice: "$1.25 / 1M",
      outputPrice: "$5.00 / 1M",
      highlight: "Vast 2M context window, high-precision code & document reasoning",
      badge: "Massive Context",
    },
    {
      id: "google-veo-video-2",
      name: "Google Veo Video Engine",
      provider: "Google",
      category: "google",
      modality: "Generative Video",
      context: "1080p / 60fps",
      latency: "45 ms",
      inputPrice: "$0.150 / active second",
      outputPrice: "Included in per-second rate",
      highlight: "High-definition video generation with cinematic lighting and physics consistency",
      badge: "Generative Video",
    },
    {
      id: "claude-3-5-sonnet",
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      category: "anthropic",
      modality: "Code & Reasoning",
      context: "200,000 tokens",
      latency: "34 ms",
      inputPrice: "$3.00 / 1M",
      outputPrice: "$15.00 / 1M",
      highlight: "Industry-standard software architecture and complex instructions execution",
      badge: "Highest Precision",
    },
    {
      id: "gpt-4o",
      name: "OpenAI GPT-4o",
      provider: "OpenAI",
      category: "openai",
      modality: "Multimodal LLM",
      context: "128,000 tokens",
      latency: "28 ms",
      inputPrice: "$2.50 / 1M",
      outputPrice: "$10.00 / 1M",
      highlight: "High-throughput structured JSON outputs and conversational intelligence",
      badge: "High Throughput",
    },
    {
      id: "text-embedding-3-large",
      name: "OpenAI Text Embeddings 3",
      provider: "OpenAI",
      category: "openai",
      modality: "Vector Embeddings",
      context: "8,191 tokens",
      latency: "12 ms",
      inputPrice: "$0.020 / 1M",
      outputPrice: "N/A (3072-dim Vector)",
      highlight: "High-density vector embeddings for enterprise semantic cache and RAG",
      badge: "Semantic Caching",
    },
  ];

  const filtered =
    activeCategory === "all"
      ? models
      : models.filter((m) => m.category === activeCategory);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="models" className="py-20 bg-[#F6F6F3] border-b border-[#E2E2DA] select-none font-sans relative overflow-hidden">
      {/* Subtle Ambient Sunset Glow */}
      <AnimatedSunsetMesh intensity="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CAD Blueprint Header */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase mb-8 pb-2 border-b border-[#E2E2DA]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
            // ENDPOINT REGISTRY: MULTI-PROVIDER FRONTIER MODEL MATRIX
          </span>
          <span>ROUTING: ZERO-DATA RETENTION ANYCAST</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF5722] bg-[#FF5722]/10 px-2.5 py-1 border border-[#FF5722]/30 inline-block mb-3">
              UNIFIED INFERENCE CATALOG
            </span>
            <GsapHeadline
              text="FRONTIER AI ENDPOINTS AT"
              highlight="STANDARDIZED RATES"
              className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] font-mono leading-[1.12] mb-3"
            />
            <p className="text-xs sm:text-sm text-[#555562] font-mono leading-relaxed">
              Route requests to leading frontier AI providers using a single Nexora API credential. Automated failover, token tracking, and rate enforcement out of the box.
            </p>
          </div>

          {/* Provider Filter Tabs */}
          <div className="inline-flex items-center p-1 bg-white/90 backdrop-blur-xs border border-[#E2E2DA] font-mono text-xs shadow-xs">
            {(["all", "google", "anthropic", "openai"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 font-bold uppercase transition-all ${
                  activeCategory === cat
                    ? "bg-[#111111] text-white shadow-xs"
                    : "text-[#555562] hover:text-[#111111]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* CAD Blueprint Model Cards Grid with Animated Sunset Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m) => (
            <AnimatedGradientCard
              key={m.id}
              intensity="vibrant"
              className="p-6 flex flex-col justify-between font-mono h-full"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DA] mb-3">
                  <span className="text-[10px] uppercase bg-[#F7F7F4] border border-[#E2E2DA] px-2 py-0.5 text-[#555562] font-bold">
                    {m.provider}
                  </span>
                  <span className="text-[10px] text-[#FF5722] font-bold bg-[#FF5722]/10 px-2 py-0.5 border border-[#FF5722]/30">
                    {m.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#111111] uppercase tracking-tight group-hover:text-[#FF5722] transition-colors">
                  {m.name}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-[#777783] mt-1 mb-3">
                  <span>{m.modality}</span>
                  <span>•</span>
                  <span>{m.context}</span>
                </div>

                <p className="text-xs text-[#555562] leading-relaxed font-sans mb-4">
                  {m.highlight}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E2DA] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#777783]">Input Pricing:</span>
                  <span className="font-bold text-[#111111]">{m.inputPrice}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#777783]">Output / Unit:</span>
                  <span className="font-bold text-[#111111]">{m.outputPrice}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#777783]">Proxy Overhead:</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
                    {m.latency}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(m.id)}
                  className="w-full mt-3 py-1.5 px-3 bg-[#F7F7F4] border border-[#E2E2DA] text-[11px] flex items-center justify-center gap-1.5 hover:bg-[#111111] hover:text-white transition-all text-[#111111] font-bold cursor-pointer"
                >
                  {copiedId === m.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied: {m.id}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#777783]" />
                      <span>Copy Model Tag</span>
                    </>
                  )}
                </button>
              </div>
            </AnimatedGradientCard>
          ))}
        </div>
      </div>
    </section>
  );
}

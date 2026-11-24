"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Zap, Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export function ModelsMatrixSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "frontier" | "multimodal" | "embeddings">("all");

  const models = [
    {
      id: "claude-3-5-sonnet",
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      category: "frontier",
      context: "200k tokens",
      latency: "380 ms",
      inputPrice: "$3.00 / 1M",
      outputPrice: "$15.00 / 1M",
      strengths: "Top-tier coding, complex reasoning, nuanced multilingual comprehension",
      mrrScore: "92.0% MMLU",
      badge: "Fastest Coding",
    },
    {
      id: "gpt-4o",
      name: "GPT-4o (Omni)",
      provider: "OpenAI",
      category: "multimodal",
      context: "128k tokens",
      latency: "340 ms",
      inputPrice: "$2.50 / 1M",
      outputPrice: "$10.00 / 1M",
      strengths: "High-speed multimodal vision, audio reasoning, structured JSON schemas",
      mrrScore: "90.2% MMLU",
      badge: "High Throughput",
    },
    {
      id: "gemini-1-5-pro",
      name: "Gemini 1.5 Pro",
      provider: "Google",
      category: "multimodal",
      context: "2,000k tokens",
      latency: "410 ms",
      inputPrice: "$1.25 / 1M",
      outputPrice: "$5.00 / 1M",
      strengths: "2-million token breakthrough context window, extensive document & video ingestion",
      mrrScore: "85.9% MMLU",
      badge: "Massive Context",
    },
    {
      id: "llama-3-3-70b",
      name: "Llama 3.3 70B Instruct",
      provider: "Meta",
      category: "frontier",
      context: "128k tokens",
      latency: "290 ms",
      inputPrice: "$0.80 / 1M",
      outputPrice: "$1.60 / 1M",
      strengths: "Economical frontier performance, fine-tune compatibility, open-weights efficiency",
      mrrScore: "88.6% MMLU",
      badge: "Cost Efficient",
    },
    {
      id: "mistral-large-2",
      name: "Mistral Large 2",
      provider: "Mistral",
      category: "frontier",
      context: "128k tokens",
      latency: "360 ms",
      inputPrice: "$2.00 / 1M",
      outputPrice: "$6.00 / 1M",
      strengths: "Enterprise European reasoning, high math accuracy, compact function calling",
      mrrScore: "84.0% MMLU",
      badge: "EU Sovereign",
    },
    {
      id: "text-embedding-3-large",
      name: "Text Embedding 3 Large",
      provider: "OpenAI",
      category: "embeddings",
      context: "8k tokens",
      latency: "120 ms",
      inputPrice: "$0.13 / 1M",
      outputPrice: "N/A",
      strengths: "High-density vector representations with flexible dimensions (256 - 3072)",
      mrrScore: "64.6 MTEB",
      badge: "Vector Search",
    },
  ];

  const filtered =
    activeCategory === "all"
      ? models
      : models.filter((m) => m.category === activeCategory);

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-border gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-semibold tracking-wider text-violet-primary bg-violet-light px-3 py-1 rounded-full border border-violet-soft/30">
              Gateway Model Matrix
            </span>
            <h2 className="text-3xl sm:text-5xl font-heritage font-semibold tracking-tight text-[#111111] mt-4 mb-4">
              Frontier intelligence, unified under one API.
            </h2>
            <p className="text-base text-secondary leading-relaxed">
              Dynamically route requests between Anthropic, OpenAI, Google, Meta, and Mistral. Zero individual lab accounts required.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-surface border border-border rounded-xl self-start md:self-end">
            {(["all", "frontier", "multimodal", "embeddings"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  activeCategory === cat
                    ? "bg-[#111111] text-white shadow-xs font-semibold"
                    : "text-secondary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Table */}
        <div className="mt-8 border border-border rounded-3xl overflow-hidden shadow-subtle bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-surface border-b border-border text-[#1e1e24] font-bold text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Model & Provider</th>
                  <th className="py-4 px-6">Context Window</th>
                  <th className="py-4 px-6">P95 Latency</th>
                  <th className="py-4 px-6">Blended Pricing</th>
                  <th className="py-4 px-6">Key Strength</th>
                  <th className="py-4 px-6">Benchmark</th>
                  <th className="py-4 px-6 text-right">Routing ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-surface/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm">{m.name}</span>
                        <Badge variant="violet" size="sm">
                          {m.badge}
                        </Badge>
                      </div>
                      <span className="text-xs font-semibold text-[#525263]">{m.provider}</span>
                    </td>
                    <td className="py-4 px-6 font-mono text-foreground font-bold text-xs">
                      {m.context}
                    </td>
                    <td className="py-4 px-6 font-mono text-emerald-700 font-bold text-xs">
                      {m.latency}
                    </td>
                    <td className="py-4 px-6 text-[#40404f] text-xs font-medium">
                      <div>Input: <span className="font-mono text-foreground font-bold">{m.inputPrice}</span></div>
                      <div>Output: <span className="font-mono text-foreground font-bold">{m.outputPrice}</span></div>
                    </td>
                    <td className="py-4 px-6 text-[#40404f] text-xs max-w-xs leading-relaxed font-medium">
                      {m.strengths}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-foreground">
                      {m.mrrScore}
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-xs font-bold text-violet-primary">
                      {m.provider.toLowerCase()}/{m.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between p-6 bg-surface/70 border border-border rounded-2xl gap-4">
          <div className="text-xs text-secondary leading-relaxed">
            <span className="font-semibold text-foreground">Custom Fine-Tuning & Private VPC Inference:</span> Available for enterprise customers with dedicated compute instances and private model weights.
          </div>
          <Link href="/pricing">
            <Button variant="outline" size="sm" className="text-xs shrink-0 gap-1.5">
              Compare Enterprise SLAs
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

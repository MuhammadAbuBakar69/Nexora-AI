"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Boxes, Zap, Terminal, Copy, Check, ArrowRight, Video, Sparkles, Cpu } from "lucide-react";

interface GatewayModel {
  id: string;
  name: string;
  provider: "Google" | "Anthropic" | "OpenAI";
  modality: "Multimodal LLM" | "Generative Video" | "Code & Reasoning" | "Embeddings";
  contextWindow: string;
  inputPricing: string;
  outputPricing: string;
  unit: string;
  status: "ONLINE" | "PROVISIONED";
  description: string;
}

const SUPPORTED_GATEWAY_MODELS: GatewayModel[] = [
  {
    id: "gemini-2.5-flash",
    name: "Google Gemini 2.5 Flash",
    provider: "Google",
    modality: "Multimodal LLM",
    contextWindow: "1,048,576 tokens",
    inputPricing: "$0.075 / 1M tokens",
    outputPricing: "$0.30 / 1M tokens",
    unit: "tokens",
    status: "ONLINE",
    description: "Ultra-fast multimodal reasoning model with 1M native context and sub-20ms first-token latency.",
  },
  {
    id: "gemini-2.5-pro",
    name: "Google Gemini 2.5 Pro",
    provider: "Google",
    modality: "Multimodal LLM",
    contextWindow: "2,097,152 tokens",
    inputPricing: "$1.25 / 1M tokens",
    outputPricing: "$5.00 / 1M tokens",
    unit: "tokens",
    status: "ONLINE",
    description: "Frontier multimodal flagship for complex mathematical reasoning, code generation, and vast corpus synthesis.",
  },
  {
    id: "google-veo-video-2",
    name: "Google Veo Video Engine",
    provider: "Google",
    modality: "Generative Video",
    contextWindow: "1080p / 60fps",
    inputPricing: "$0.150 / active second",
    outputPricing: "Included in per-second rate",
    unit: "seconds",
    status: "ONLINE",
    description: "High-definition generative video creation with cinematic lighting, prompt adherence, and consistent temporal physics.",
  },
  {
    id: "claude-3-5-sonnet",
    name: "Anthropic Claude 3.5 Sonnet",
    provider: "Anthropic",
    modality: "Code & Reasoning",
    contextWindow: "200,000 tokens",
    inputPricing: "$3.00 / 1M tokens",
    outputPricing: "$15.00 / 1M tokens",
    unit: "tokens",
    status: "ONLINE",
    description: "State-of-the-art software engineering, instruction execution, and architectural code analysis.",
  },
  {
    id: "gpt-4o",
    name: "OpenAI GPT-4o",
    provider: "OpenAI",
    modality: "Multimodal LLM",
    contextWindow: "128,000 tokens",
    inputPricing: "$2.50 / 1M tokens",
    outputPricing: "$10.00 / 1M tokens",
    unit: "tokens",
    status: "ONLINE",
    description: "Omni-modal conversational intelligence and structured JSON data extraction at high throughput.",
  },
  {
    id: "text-embedding-3-large",
    name: "OpenAI Text Embeddings 3",
    provider: "OpenAI",
    modality: "Embeddings",
    contextWindow: "8,191 tokens",
    inputPricing: "$0.020 / 1M tokens",
    outputPricing: "N/A (Vector Output)",
    unit: "tokens",
    status: "ONLINE",
    description: "High-density 3072-dimensional semantic vector representations for enterprise semantic search and RAG.",
  },
];

export default function ModelsCatalogPage() {
  const [selectedProvider, setSelectedProvider] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const providers = ["All", "Google", "Anthropic", "OpenAI"];

  const filteredModels =
    selectedProvider === "All"
      ? SUPPORTED_GATEWAY_MODELS
      : SUPPORTED_GATEWAY_MODELS.filter((m) => m.provider === selectedProvider);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <DashboardHeader
        title="Frontier AI Model Catalog &amp; Rates"
        subtitle="Gateway-routed models accessible via your scoped Nexora API key"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* CAD Telemetry Marker */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase px-1">
          <span>// MODEL REGISTRY • DWG: MDLS-CAT-2026</span>
          <span>UPSTREAM FAILOVER: MULTI-REGION AUTOMATED</span>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-[#E2E2DA]">
          <div className="flex items-center gap-2">
            {providers.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedProvider(p)}
                className={`px-3 py-1 text-xs font-mono font-bold uppercase transition-all ${
                  selectedProvider === p
                    ? "bg-[#111111] text-white"
                    : "bg-[#F7F7F4] text-[#555562] border border-[#E2E2DA] hover:border-[#111111]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <span className="text-[11px] font-mono text-[#777783]">
            SHOWING {filteredModels.length} ENDPOINTS
          </span>
        </div>

        {/* Models Grid in CAD Blueprint Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="bg-white border border-[#E2E2DA] p-5 flex flex-col justify-between relative hover:border-[#111111] transition-colors"
            >
              <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
              <span className="absolute top-1.5 right-2 font-mono text-xs text-[#888892] select-none">+</span>

              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DA]">
                  <span className="text-[10px] font-mono uppercase bg-[#F7F7F4] border border-[#E2E2DA] px-2 py-0.5 text-[#555562]">
                    {model.provider}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 font-bold border border-emerald-200">
                    {model.status}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-[#111111] font-mono">
                    {model.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-[#777783]">
                    <span>{model.modality}</span>
                    <span>•</span>
                    <span>{model.contextWindow}</span>
                  </div>
                  <p className="text-xs text-[#555562] mt-2 leading-relaxed">
                    {model.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E2E2DA] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#777783]">Input Pricing:</span>
                  <span className="font-bold text-[#111111]">{model.inputPricing}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#777783]">Output / Unit:</span>
                  <span className="font-bold text-[#111111]">{model.outputPricing}</span>
                </div>

                <button
                  onClick={() => handleCopyId(model.id)}
                  className="w-full mt-2 py-1.5 px-2 bg-[#F7F7F4] border border-[#E2E2DA] text-[11px] font-mono flex items-center justify-center gap-1.5 hover:bg-[#EAEAE2] text-[#111111]"
                >
                  {copiedId === model.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied: {model.id}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#777783]" />
                      <span>Copy Model Identifier</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

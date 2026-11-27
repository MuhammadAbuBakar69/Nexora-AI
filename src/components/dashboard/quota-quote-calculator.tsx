"use client";

import React, { useState, useId } from "react";
import { 
  Calculator, 
  Sparkles, 
  Video, 
  Coins, 
  Cpu, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Info,
  Layers,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SadaPayCheckoutModal } from "@/components/dashboard/sadapay-checkout-modal";

interface QuotaQuoteCalculatorProps {
  onQuoteGenerated?: (quote: CustomerQuote) => void;
  onRequestQuota?: (quote: CustomerQuote) => void;
}

export interface CustomerQuote {
  monthlyTokens: number;
  monthlyVideoSeconds: number;
  monthlyImages: number;
  estimatedCostUsd: number;
  estimatedCostPkr: number;
  recommendedPlan: "starter" | "growth" | "enterprise";
  selectedModels: string[];
}

const USD_TO_PKR_RATE = 280; // Configurable commercial exchange rate

export function QuotaQuoteCalculator({ onQuoteGenerated, onRequestQuota }: QuotaQuoteCalculatorProps) {
  // Input dimensions
  const [tokenMillions, setTokenMillions] = useState<number>(10); // 10M tokens
  const [videoSeconds, setVideoSeconds] = useState<number>(60);   // 60 seconds Google Veo
  const [imageUnits, setImageUnits] = useState<number>(250);      // 250 image generations
  const [currency, setCurrency] = useState<"PKR" | "USD">("PKR");
  const [selectedTier, setSelectedTier] = useState<"standard" | "priority">("priority");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSadaPayOpen, setIsSadaPayOpen] = useState(false);

  // Pricing formula
  // Blended LLM average: $2.50 per 1M tokens (e.g. Gemini 2.5 Flash / Pro mix)
  const tokenCostUsd = tokenMillions * 2.50;
  // Google Veo: $0.15 per second of video generation
  const videoCostUsd = videoSeconds * 0.15;
  // Image Generation: $0.04 per image unit
  const imageCostUsd = imageUnits * 0.04;

  const subtotalUsd = tokenCostUsd + videoCostUsd + imageCostUsd;
  const platformFeeUsd = selectedTier === "priority" ? 25 : 10;
  const totalUsd = Math.round((subtotalUsd + platformFeeUsd) * 100) / 100;
  const totalPkr = Math.round(totalUsd * USD_TO_PKR_RATE);

  // Recommended plan tier
  const recommendedPlan: "starter" | "growth" | "enterprise" = 
    tokenMillions >= 50 || videoSeconds >= 300 
      ? "enterprise" 
      : tokenMillions >= 10 || videoSeconds >= 60 
        ? "growth" 
        : "starter";

  const handleRequestAllocation = () => {
    const quote: CustomerQuote = {
      monthlyTokens: tokenMillions * 1_000_000,
      monthlyVideoSeconds: videoSeconds,
      monthlyImages: imageUnits,
      estimatedCostUsd: totalUsd,
      estimatedCostPkr: totalPkr,
      recommendedPlan,
      selectedModels: ["gemini-2.5-flash", "google-veo", "text-embedding-004"]
    };

    if (onRequestQuota) {
      onRequestQuota(quote);
    }
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="relative w-full bg-[#F7F7F4] border border-[#E2E2DA] rounded-none select-none font-sans overflow-hidden">
      {/* 4 Corner CAD Crosshairs */}
      <span className="absolute top-2 left-3 font-mono text-xs font-semibold text-[#888892] select-none">+</span>
      <span className="absolute top-2 right-3 font-mono text-xs font-semibold text-[#888892] select-none">+</span>
      <span className="absolute bottom-2 left-3 font-mono text-xs font-semibold text-[#888892] select-none">+</span>
      <span className="absolute bottom-2 right-3 font-mono text-xs font-semibold text-[#888892] select-none">+</span>

      {/* Technical Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3.5 border-b border-[#E2E2DA] bg-[#F2F2EE] text-[10px] font-mono uppercase tracking-widest text-[#777783]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>SPEC: NX-CUSTOMER-QUOTA // REAL-TIME ESTIMATOR</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">EXCHANGE RATE: $1.00 = ₨280.00 PKR</span>
          <span className="text-foreground font-bold">STATUS: COMMERCIAL ACTIVE</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Multi-Modality Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-4 h-4 text-violet-primary" />
              <h3 className="text-base sm:text-lg font-bold text-[#111111] uppercase tracking-tight">
                Enterprise Quota &amp; Pricing Calculator
              </h3>
            </div>
            <p className="text-xs text-[#555562] leading-relaxed">
              Configure your expected monthly workload across text LLMs, Google Veo video generation, and media generation.
            </p>
          </div>

          {/* Slider 1: LLM Text Inference Tokens */}
          <div className="p-4 bg-white border border-[#E2E2DA]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-violet-primary" />
                <span className="text-xs font-bold text-[#111111] uppercase">LLM Text Tokens</span>
              </div>
              <span className="text-xs font-mono font-bold text-violet-primary bg-violet-50 px-2 py-0.5 border border-violet-200">
                {tokenMillions}M Tokens / Mo
              </span>
            </div>
            <p className="text-[11px] text-[#777783] mb-3">
              Covers Gemini 2.5 Flash, Gemini 1.5 Pro, Claude 3.5, and GPT-4o input/output tokens.
            </p>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={tokenMillions}
              onChange={(e) => setTokenMillions(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-[#EAEAE2] rounded-none appearance-none cursor-pointer accent-violet-600"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#888892] mt-1.5">
              <span>1M ($2.50)</span>
              <span>25M</span>
              <span>50M</span>
              <span>100M ($250)</span>
            </div>
          </div>

          {/* Slider 2: Google Veo Video Generation (Billed per second) */}
          <div className="p-4 bg-white border border-[#E2E2DA]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-[#111111] uppercase">Google Veo Video Generation</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                {videoSeconds} Seconds / Mo
              </span>
            </div>
            <p className="text-[11px] text-[#777783] mb-3">
              Frontier high-definition text-to-video and image-to-video inference billed per active second.
            </p>
            <input
              type="range"
              min="0"
              max="600"
              step="10"
              value={videoSeconds}
              onChange={(e) => setVideoSeconds(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-[#EAEAE2] rounded-none appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#888892] mt-1.5">
              <span>0s</span>
              <span>120s (~20 clips)</span>
              <span>300s (~50 clips)</span>
              <span>600s ($90.00)</span>
            </div>
          </div>

          {/* Slider 3: Image Units & Media */}
          <div className="p-4 bg-white border border-[#E2E2DA]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-[#111111] uppercase">Image Generation Units</span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200">
                {imageUnits} Images / Mo
              </span>
            </div>
            <p className="text-[11px] text-[#777783] mb-3">
              High-resolution diffusion and photorealistic rendering (Imagen 3, DALL-E 3).
            </p>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={imageUnits}
              onChange={(e) => setImageUnits(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-[#EAEAE2] rounded-none appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#888892] mt-1.5">
              <span>0 units</span>
              <span>500 units</span>
              <span>1000 units</span>
              <span>2000 units ($80.00)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Commercial Quote Breakdown & Quota Action (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-white border border-[#E2E2DA] relative">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E2DA]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#777783] block">
                  COMMERCIAL ESTIMATE
                </span>
                <span className="text-sm font-bold text-[#111111] uppercase">
                  Monthly Quota Summary
                </span>
              </div>
              {/* Currency toggle */}
              <div className="flex border border-[#D5D5CD]">
                <button
                  type="button"
                  onClick={() => setCurrency("PKR")}
                  className={`px-2.5 py-1 text-[10px] font-mono font-bold transition-colors ${
                    currency === "PKR" ? "bg-[#111111] text-white" : "bg-white text-[#777783] hover:text-[#111111]"
                  }`}
                >
                  PKR (₨)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`px-2.5 py-1 text-[10px] font-mono font-bold transition-colors ${
                    currency === "USD" ? "bg-[#111111] text-white" : "bg-white text-[#777783] hover:text-[#111111]"
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>

            {/* Total Price Display */}
            <div className="py-6 border-b border-[#E2E2DA]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777783] block mb-1">
                Estimated Monthly Commitment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#111111] tracking-tight">
                  {currency === "PKR" 
                    ? `₨${totalPkr.toLocaleString()}` 
                    : `$${totalUsd.toFixed(2)}`}
                </span>
                <span className="text-xs font-mono text-[#777783]">/ month</span>
              </div>
              <p className="text-[11px] text-[#777783] mt-2">
                Includes {tokenMillions}M tokens, {videoSeconds}s Veo video generation, and {imageUnits} images with priority Anycast routing.
              </p>
            </div>

            {/* Itemized Breakdown Table */}
            <div className="py-4 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#555562]">
                <span>LLM Text Tokens ({tokenMillions}M):</span>
                <span className="font-mono font-semibold text-[#111111]">
                  {currency === "PKR" ? `₨${Math.round(tokenCostUsd * USD_TO_PKR_RATE).toLocaleString()}` : `$${tokenCostUsd.toFixed(2)}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#555562]">
                <span>Google Veo Video ({videoSeconds}s):</span>
                <span className="font-mono font-semibold text-[#111111]">
                  {currency === "PKR" ? `₨${Math.round(videoCostUsd * USD_TO_PKR_RATE).toLocaleString()}` : `$${videoCostUsd.toFixed(2)}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#555562]">
                <span>Media Generation ({imageUnits} img):</span>
                <span className="font-mono font-semibold text-[#111111]">
                  {currency === "PKR" ? `₨${Math.round(imageCostUsd * USD_TO_PKR_RATE).toLocaleString()}` : `$${imageCostUsd.toFixed(2)}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#555562]">
                <span>Gateway Infrastructure &amp; Caching:</span>
                <span className="font-mono font-semibold text-[#111111]">
                  {currency === "PKR" ? `₨${Math.round(platformFeeUsd * USD_TO_PKR_RATE).toLocaleString()}` : `$${platformFeeUsd.toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* Recommended Tier Pill */}
            <div className="p-3 bg-[#F7F7F4] border border-[#E2E2DA] flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono uppercase text-[#777783]">Recommended Tier:</span>
              <span className="font-mono font-bold text-[#111111] uppercase bg-[#111111]/5 px-2 py-0.5 border border-[#111111]/20">
                {recommendedPlan} Package
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-[#E2E2DA] space-y-2.5">
            {isSubmitted ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Access &amp; Quota Request submitted. Standing by for admin approval.</span>
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={() => setIsSadaPayOpen(true)}
                  className="w-full text-xs font-bold h-11 tracking-wide uppercase gap-2 shadow-sm bg-[#02AAB0] hover:bg-[#008f94] text-white border-transparent"
                >
                  <span className="w-5 h-5 rounded-none bg-white text-[#02AAB0] flex items-center justify-center font-bold text-[10px]">
                    SP
                  </span>
                  <span>Instant Checkout with SadaPay (₨{totalPkr.toLocaleString()} PKR)</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button
                  onClick={handleRequestAllocation}
                  variant="outline"
                  className="w-full text-xs font-bold h-10 tracking-wide uppercase gap-2 border-[#E2E2DA] hover:bg-[#F2F2EE]"
                >
                  <span>Request Custom Enterprise Invoice</span>
                </Button>
              </div>
            )}
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#777783]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>SadaPay SBP Regulated • Zero Foreign Transaction Fees • Instant Activation</span>
            </div>
          </div>
        </div>
      </div>

      {/* SadaPay Interactive Checkout Modal */}
      <SadaPayCheckoutModal
        isOpen={isSadaPayOpen}
        onClose={() => setIsSadaPayOpen(false)}
        planName={`${recommendedPlan.toUpperCase()} Tier (${tokenMillions}M Tokens)`}
        amountPkr={totalPkr}
        amountUsd={totalUsd}
        onPaymentSuccess={() => {
          handleRequestAllocation();
        }}
      />
    </div>
  );
}

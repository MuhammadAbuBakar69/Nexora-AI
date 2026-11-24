"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight, Zap, TrendingDown, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export function RoiCalculatorSection() {
  const [tokensInMillions, setTokensInMillions] = useState(150);

  // Blended raw cost per 1M tokens approx $5.50
  const rawCostPerMillion = 5.5;
  // Nexora smart caching & model routing saves approx 38%
  const savingsRate = 0.38;

  const rawMonthlyCost = tokensInMillions * rawCostPerMillion;
  const nexoraMonthlyCost = rawMonthlyCost * (1 - savingsRate);
  const monthlySavings = rawMonthlyCost - nexoraMonthlyCost;
  const annualSavings = monthlySavings * 12;

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-wider text-violet-primary bg-violet-light px-3 py-1 rounded-full border border-violet-soft/30">
            Efficiency Benchmark
          </span>
          <h2 className="text-3xl sm:text-5xl font-heritage font-semibold tracking-tight text-[#111111] mt-4 mb-4">
            Calculate your token cost optimization.
          </h2>
          <p className="text-base text-secondary leading-relaxed">
            See how much your organization saves through Nexora’s intelligent prompt caching, semantic deduplication, and low-latency gateway routing.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-surface/60 border border-border rounded-3xl p-6 sm:p-10 shadow-premium">
          <div className="space-y-8">
            {/* Slider Control */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                <label className="text-sm font-semibold text-foreground">
                  Estimated Monthly Token Consumption:
                </label>
                <span className="text-2xl font-bold font-heritage text-violet-primary">
                  {tokensInMillions >= 1000 ? `${(tokensInMillions / 1000).toFixed(1)} Billion` : `${tokensInMillions} Million`} Tokens
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={tokensInMillions}
                onChange={(e) => setTokensInMillions(Number(e.target.value))}
                className="w-full h-2.5 bg-border rounded-lg appearance-none cursor-pointer accent-violet-primary"
              />
              <div className="flex justify-between text-xs text-[#525263] mt-2 font-mono font-semibold">
                <span>10M tokens / mo</span>
                <span>500M tokens</span>
                <span>1,000M (1B) tokens / mo</span>
              </div>
            </div>

            {/* Calculations 3-Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="p-5 bg-white rounded-2xl border border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1e1e24] block mb-1">Direct Provider Cost</span>
                <div className="text-2xl font-bold text-foreground font-mono">
                  ${rawMonthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  <span className="text-xs font-semibold text-[#666675]"> / mo</span>
                </div>
                <p className="text-xs text-[#525263] font-semibold mt-1">Raw un-cached API pricing</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-violet-soft/60 shadow-subtle">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1e1e24] block mb-1">Nexora Optimized Cost</span>
                <div className="text-2xl font-bold text-violet-primary font-mono">
                  ${nexoraMonthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  <span className="text-xs font-semibold text-[#666675]"> / mo</span>
                </div>
                <p className="text-xs text-emerald-700 font-bold mt-1">With 38% smart cache hit rate</p>
              </div>

              <div className="p-5 bg-gradient-to-br from-violet-light/60 to-white rounded-2xl border border-violet-soft">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-primary block mb-1">Estimated Annual Savings</span>
                <div className="text-2xl font-bold text-foreground font-mono">
                  ${annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <p className="text-xs text-[#525263] font-semibold mt-1">Saved directly across budget cycle</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-border gap-4 text-xs font-medium text-[#444452]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-primary shrink-0" />
                <span>Simulated estimate based on industry benchmark RAG & prompt caching patterns.</span>
              </div>
              <Link href="/signup">
                <Button variant="violet" size="sm" className="shrink-0 text-xs gap-1.5 font-bold shadow-md">
                  Start Optimizing Tokens
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

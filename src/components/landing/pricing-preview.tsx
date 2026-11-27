"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuotaQuoteCalculator } from "@/components/dashboard/quota-quote-calculator";
import { AnimatedGradientCard } from "@/components/ui/animated-gradient-card";

export function PricingPreview() {
  const [activeTab, setActiveTab] = useState<"tiers" | "calculator">("calculator");

  const plans = [
    {
      name: "Starter",
      badge: "Experimentation",
      description: "Ideal for solo engineers, researchers, and prototypes testing unified AI gateway routing.",
      price: "$49",
      pkrPrice: "₨13,720",
      period: "/ month",
      isPopular: false,
      ctaText: "Start Starter Plan",
      features: [
        "10,000,000 monthly token quota",
        "Up to 3 active API keys",
        "Access to Gemini 2.5 Flash & standard LLMs",
        "25 GB vector cache storage",
        "Community support & docs",
        "Basic rate limiting (600 RPM)",
      ],
    },
    {
      name: "Growth",
      badge: "Most Popular",
      description: "Designed for high-growth startups and product teams deploying production AI applications.",
      price: "$249",
      pkrPrice: "₨69,720",
      period: "/ month",
      isPopular: true,
      ctaText: "Start Growth Plan",
      features: [
        "75,000,000 monthly token quota",
        "Up to 25 scoped API keys",
        "Full access: Gemini, Veo Video, Claude, GPT",
        "150 GB encrypted vector storage",
        "Real-time telemetry & webhook alerts",
        "Sub-20ms multi-region gateway proxy",
        "High-throughput rate limits (2,500 RPM)",
        "Priority developer engineering support",
      ],
    },
    {
      name: "Enterprise",
      badge: "Custom Scale",
      description: "Dedicated infrastructure, custom SLAs, audit compliance, and private VPC routing for enterprise.",
      price: "Custom",
      pkrPrice: "Custom",
      period: "",
      isPopular: false,
      ctaText: "Contact Sales",
      features: [
        "Custom or multi-billion token quotas",
        "Unlimited granular API keys",
        "Google Veo high-concurrency dedicated queue",
        "Private edge proxy & dedicated tenant VPC",
        "Multi-TB encrypted storage vaults",
        "99.99% uptime SLA with financial backing",
        "SOC2 Type II & HIPAA compliance docs",
        "Dedicated Technical Account Manager",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-[#F6F6F3] border-b border-[#E2E2DA] select-none font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CAD Blueprint Header */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase mb-8 pb-2 border-b border-[#E2E2DA]">
          <span>// COMMERCIAL PRICING &amp; ALLOCATION SPECIFICATION</span>
          <span>CURRENCIES: USD ($) &amp; PKR (₨) REAL-TIME</span>
        </div>

        <div className="text-left sm:text-center max-w-3xl sm:mx-auto mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-primary bg-violet-50 px-2.5 py-1 border border-violet-200">
            TRANSPARENT ALLOCATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] font-mono mt-4 mb-3">
            PREDICTABLE PLANS. NO OVERDRAFT SURPRISES.
          </h2>
          <p className="text-xs sm:text-sm text-[#555562] font-mono leading-relaxed">
            Provision token quotas, Google Veo video inference seconds, and image units according to your workload requirements.
          </p>

          {/* Toggle between Calculator and Plan Tiers */}
          <div className="inline-flex items-center p-1 bg-white border border-[#E2E2DA] mt-6 font-mono text-xs">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-4 py-1.5 font-bold uppercase transition-all ${
                activeTab === "calculator"
                  ? "bg-[#111111] text-white"
                  : "text-[#555562] hover:text-[#111111]"
              }`}
            >
              Interactive Quota Calculator
            </button>
            <button
              onClick={() => setActiveTab("tiers")}
              className={`px-4 py-1.5 font-bold uppercase transition-all ${
                activeTab === "tiers"
                  ? "bg-[#111111] text-white"
                  : "text-[#555562] hover:text-[#111111]"
              }`}
            >
              Standard Tier Matrix
            </button>
          </div>
        </div>

        {activeTab === "calculator" ? (
          <div className="max-w-4xl mx-auto">
            <QuotaQuoteCalculator />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan, idx) => (
              <AnimatedGradientCard
                key={idx}
                isFeatured={plan.isPopular}
                intensity={plan.isPopular ? "glow" : "vibrant"}
                className="p-6 sm:p-8 flex flex-col justify-between font-mono h-full"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DA] mb-4">
                    <h3 className="text-base font-bold text-[#111111] font-mono uppercase">
                      {plan.name}
                    </h3>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 border font-semibold ${
                        plan.isPopular
                          ? "bg-gradient-sunset text-white border-transparent shadow-xs"
                          : "bg-[#F7F7F4] border-[#E2E2DA] text-[#555562]"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  <p className="text-xs text-[#555562] leading-relaxed mb-6 font-mono">
                    {plan.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-[#E2E2DA]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold font-mono text-[#111111]">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-xs font-mono text-[#777783]">{plan.period}</span>
                      )}
                    </div>
                    {plan.pkrPrice !== "Custom" && (
                      <span className="text-[11px] font-mono text-[#777783] block mt-1">
                        ≈ {plan.pkrPrice} PKR / month
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5 font-mono text-xs text-[#555562]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#111111] block mb-2">
                      SPECIFICATIONS
                    </span>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF5722] shrink-0 mt-0.5" />
                        <span className="text-[11px]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E2E2DA]">
                  <Button
                    href="/signup"
                    size="sm"
                    className={`w-full text-xs font-mono font-bold uppercase tracking-wider ${
                      plan.isPopular
                        ? "bg-gradient-sunset text-white hover:opacity-95 shadow-md border-transparent"
                        : ""
                    }`}
                  >
                    {plan.ctaText}
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </AnimatedGradientCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

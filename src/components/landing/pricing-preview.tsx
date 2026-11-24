"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingPreview() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Starter",
      badge: "Experimentation",
      description: "Ideal for solo engineers, researchers, and prototypes testing unified AI gateway routing.",
      monthlyPrice: "$49",
      annualPrice: "$39",
      period: "/ month",
      isPopular: false,
      ctaText: "Start Starter Plan",
      features: [
        "10,000,000 monthly token quota",
        "Up to 3 active API keys",
        "Access to standard LLM endpoints",
        "25 GB vector cache storage",
        "Community support & docs",
        "Basic rate limiting (600 RPM)",
      ],
    },
    {
      name: "Growth",
      badge: "Most Popular",
      description: "Designed for high-growth startups and product teams deploying production AI applications.",
      monthlyPrice: "$249",
      annualPrice: "$199",
      period: "/ month",
      isPopular: true,
      ctaText: "Start Growth Plan",
      features: [
        "75,000,000 monthly token quota",
        "Up to 25 scoped API keys",
        "Full access: OpenAI, Anthropic, Google",
        "150 GB encrypted vector storage",
        "Real-time telemetry & webhook alerts",
        "Sub-100ms multi-region gateway proxy",
        "High-throughput rate limits (2,500 RPM)",
        "Priority developer engineering support",
      ],
    },
    {
      name: "Enterprise",
      badge: "Custom Scale",
      description: "Dedicated infrastructure, custom SLAs, audit compliance, and private VPC routing for enterprise.",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      period: "",
      isPopular: false,
      ctaText: "Contact Sales",
      features: [
        "Custom or multi-billion token quotas",
        "Unlimited granular API keys",
        "Private edge proxy & dedicated tenant VPC",
        "Multi-TB encrypted storage vaults",
        "99.99% uptime SLA with financial backing",
        "SOC2 Type II & HIPAA compliance docs",
        "Dedicated Technical Account Manager",
        "Custom model fine-tuning cache routing",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-surface/60 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-wider text-violet-primary bg-violet-light px-3 py-1 rounded-full border border-violet-soft/30">
            Transparent Allocation
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#111111] mt-4 mb-4 font-heritage">
            Predictable plans. No surprises.
          </h2>
          <p className="text-base sm:text-lg text-secondary">
            Provision token quotas and gateway capacity according to your team’s workload requirements.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-white border border-border rounded-full mt-8 shadow-subtle">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-[#111111] text-white shadow-sm font-semibold"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-[#111111] text-white shadow-sm font-semibold"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              Annual Billing
              <span className="bg-violet-light text-violet-primary text-[10px] px-2 py-0.2 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 bg-white border transition-all duration-300 flex flex-col justify-between ${
                plan.isPopular
                  ? "border-violet-primary ring-2 ring-violet-primary/20 shadow-float"
                  : "border-border hover:border-violet-soft/40 hover:shadow-premium"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-violet-primary text-white text-[11px] font-semibold px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground tracking-tight">
                    {plan.name}
                  </h3>
                  {!plan.isPopular && (
                    <span className="text-[11px] font-medium text-secondary bg-surface px-2.5 py-1 rounded-full border border-border">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-secondary leading-relaxed mb-6">
                  {plan.description}
                </p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                    </span>
                    {plan.period && (
                      <span className="text-xs text-secondary font-normal">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-secondary/70 mt-1">
                    * Clearly marked illustrative model tiers subject to finalized SLA terms.
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-border">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Included Capabilities
                  </p>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-secondary leading-relaxed">
                      <Check className="w-4 h-4 text-violet-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6">
                <Link href={plan.name === "Enterprise" ? "/pricing#contact" : "/signup"}>
                  <Button
                    variant={plan.isPopular ? "primary" : "secondary"}
                    className="w-full text-xs font-semibold"
                  >
                    {plan.ctaText}
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

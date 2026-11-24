"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PricingPreview } from "@/components/landing/pricing-preview";
import { FaqSection } from "@/components/landing/faq";
import { ShieldCheck, Zap, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Editorial Header */}
        <section className="py-16 sm:py-24 text-center px-4 max-w-4xl mx-auto">
          <span className="text-xs uppercase font-semibold tracking-wider text-violet-primary bg-violet-light px-3 py-1 rounded-full border border-violet-soft/30">
            Flexible Resource Tiers
          </span>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#111111] mt-4 mb-5">
            Transparent pricing for teams at any scale.
          </h1>
          <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto">
            Pay only for the gateway routing capacity and token quotas your engineering teams consume. All plans include multi-provider failover.
          </p>
        </section>

        <PricingPreview />

        {/* Feature Comparison Matrix */}
        <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-border rounded-3xl p-6 sm:p-10 bg-surface/50">
            <h3 className="text-2xl font-bold font-sans text-foreground mb-6 text-center">
              Detailed Plan Capabilities
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border text-[#1e1e24] font-bold text-xs uppercase tracking-wider">
                    <th className="pb-3.5 font-bold">Capability</th>
                    <th className="pb-3.5 font-bold text-center">Starter</th>
                    <th className="pb-3.5 font-bold text-center text-violet-primary">Growth</th>
                    <th className="pb-3.5 font-bold text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-[#444452]">
                  <tr>
                    <td className="py-3.5 text-foreground font-bold">Monthly Token Quota</td>
                    <td className="py-3.5 text-center font-semibold">10,000,000</td>
                    <td className="py-3.5 text-center font-bold text-foreground">75,000,000</td>
                    <td className="py-3.5 text-center font-semibold">Custom (Multi-Billion)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 text-foreground font-bold">Active API Keys</td>
                    <td className="py-3.5 text-center font-semibold">3 Keys</td>
                    <td className="py-3.5 text-center font-bold text-foreground">25 Keys</td>
                    <td className="py-3.5 text-center font-semibold">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 text-foreground font-bold">Model Availability</td>
                    <td className="py-3.5 text-center font-semibold">Standard LLMs</td>
                    <td className="py-3.5 text-center font-bold text-foreground">All Providers & Vision</td>
                    <td className="py-3.5 text-center font-semibold">All + Custom Fine-tunes</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 text-foreground font-bold">Cloud Vector Storage</td>
                    <td className="py-3.5 text-center font-semibold">25 GB</td>
                    <td className="py-3.5 text-center font-bold text-foreground">150 GB</td>
                    <td className="py-3.5 text-center font-semibold">Dedicated Terabytes</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 text-foreground font-bold">Service SLA</td>
                    <td className="py-3.5 text-center font-semibold">99.5%</td>
                    <td className="py-3.5 text-center font-bold text-foreground">99.9%</td>
                    <td className="py-3.5 text-center font-bold text-emerald-700">99.99% Guaranteed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}

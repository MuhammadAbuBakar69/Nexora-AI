"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PricingPreview } from "@/components/landing/pricing-preview";
import { FaqSection } from "@/components/landing/faq";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";

export default function PricingPage() {
  const comparisonRows = [
    { name: "Monthly Token Allowance", starter: "10,000,000", growth: "75,000,000", enterprise: "Custom / Multi-Billion" },
    { name: "Google Veo Video 2.0 (per second)", starter: "Available on demand", growth: "$0.150 / active sec", enterprise: "Dedicated Queue" },
    { name: "Active Scoped API Keys", starter: "Up to 3 keys", growth: "Up to 25 keys", enterprise: "Unlimited" },
    { name: "Anycast Edge PoPs", starter: "All 32 PoPs", growth: "All 32 PoPs", enterprise: "Dedicated Edge IP" },
    { name: "Semantic Vector Cache", starter: "25 GB Vault", growth: "150 GB Vault", enterprise: "Multi-TB Vault" },
    { name: "Rate Limit Ceilings", starter: "600 RPM", growth: "2,500 RPM", enterprise: "Custom (10k+ RPM)" },
    { name: "Zero-Data Retention (ZDR)", starter: "Enforced", growth: "Enforced", enterprise: "Enforced + Audit Proofs" },
    { name: "SLA Availability", starter: "99.9%", growth: "99.98%", enterprise: "99.99% Financial Backing" },
    { name: "Currency Support", starter: "USD & PKR", growth: "USD & PKR", enterprise: "Multi-Currency Wire / Invoicing" },
    { name: "Payment Gateways", starter: "SadaPay / Mastercard / Raast", growth: "SadaPay / Mastercard / Raast", enterprise: "SadaBiz / Multi-Currency Invoicing" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F3] font-sans select-none">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* CAD Blueprint Pricing Hero */}
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
                DWG: SPEC-PRICING-01 // COMMERCIAL LEDGER
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#111111] mb-6 leading-[1.08]">
              TRANSPARENT PRICING FOR <span className="text-gradient-sunset">TEAMS AT ANY SCALE</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#444452] max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
              Pay only for the gateway routing capacity and token quotas your engineering teams consume. All plans include multi-provider failover and live PKR conversion.
            </p>
          </div>
        </section>

        {/* Pricing Preview with Calculator */}
        <PricingPreview />

        {/* Detailed Comparison Table in CAD Blueprint Style */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E2E2DA]">
          <div className="bg-white border border-[#E2E2DA] p-6 sm:p-10 relative font-mono">
            <span className="absolute top-2 left-2 text-xs text-[#888892] select-none">+</span>
            <span className="absolute top-2 right-2 text-xs text-[#888892] select-none">+</span>
            <span className="absolute bottom-2 left-2 text-xs text-[#888892] select-none">+</span>
            <span className="absolute bottom-2 right-2 text-xs text-[#888892] select-none">+</span>

            <div className="pb-4 mb-6 border-b border-[#E2E2DA] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#777783] uppercase block">CAPABILITY MATRIX</span>
                <h3 className="text-lg font-bold text-[#111111] uppercase mt-0.5">
                  Detailed Feature Breakdown
                </h3>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-300 font-bold">
                REAL-TIME PKR (₨ @ 280)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E2DA] bg-[#F7F7F4] text-[#111111]">
                    <th className="py-3 px-4 font-bold uppercase">Capability</th>
                    <th className="py-3 px-4 font-bold uppercase text-center">Starter</th>
                    <th className="py-3 px-4 font-bold uppercase text-center text-violet-primary">Growth</th>
                    <th className="py-3 px-4 font-bold uppercase text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DA] text-[#444452]">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="hover:bg-[#F9F9F7]">
                      <td className="py-3.5 px-4 font-bold text-[#111111]">{row.name}</td>
                      <td className="py-3.5 px-4 text-center">{row.starter}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-violet-primary">{row.growth}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#111111]">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Technical FAQ */}
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}

"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { MetricsSection } from "@/components/landing/metrics";
import { ArchitectureFlowSection } from "@/components/landing/architecture-flow";
import { ModelsMatrixSection } from "@/components/landing/models-matrix";
import { Features } from "@/components/landing/features";
import { PurpleShowcase } from "@/components/landing/purple-showcase";
import { EdgeTopologySection } from "@/components/landing/edge-topology";
import { RoiCalculatorSection } from "@/components/landing/roi-calculator";
import { SecurityComplianceSection } from "@/components/landing/security-compliance";
import { CaseStudiesSection } from "@/components/landing/case-studies";
import { HowItWorks } from "@/components/landing/how-it-works";
import { DeveloperSection } from "@/components/landing/developer-section";
import { PricingPreview } from "@/components/landing/pricing-preview";
import { FaqSection } from "@/components/landing/faq";
import { CtaBanner } from "@/components/landing/cta-banner";
import { InteractiveGatewaySimulator } from "@/components/landing/interactive-gateway-simulator";
import { ScrollProgressBar } from "@/components/animations/motion-wrapper";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sleek Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      <Navbar />
      <main className="flex-1">
        {/* 1. Sonivale-inspired Editorial Hero with Floating Dashboard Mockup */}
        <Hero />

        {/* 2. Platform Capability Statistics & Philosophy Callout */}
        <MetricsSection />

        {/* 3. Under the Hood: Request Lifecycle & Gateway Layers */}
        <ArchitectureFlowSection />

        {/* 4. Interactive Live Gateway Simulator with Loading Skeletons */}
        <div id="sandbox">
          <InteractiveGatewaySimulator />
        </div>

        {/* 5. Multi-Provider Frontier Model Matrix & Benchmarks */}
        <div id="models">
          <ModelsMatrixSection />
        </div>

        {/* 5. Six Core Platform Architecture Capabilities */}
        <div id="platform">
          <Features />
        </div>

        {/* 6. Central Lavender Glowing Section with Floating UI Notifications */}
        <PurpleShowcase />

        {/* 7. Global Anycast Edge Infrastructure & Real-Time Latency Radar */}
        <EdgeTopologySection />

        {/* 8. Interactive Token Cost & Semantic Caching ROI Calculator */}
        <RoiCalculatorSection />

        {/* 9. Enterprise Security, Zero-Data Retention & Compliance */}
        <SecurityComplianceSection />

        {/* 10. Verified Enterprise Production Case Studies */}
        <CaseStudiesSection />

        {/* 11. Three-Step Technical Integration Walkthrough */}
        <HowItWorks />

        {/* 12. Developer Code Editor Mockup & Multi-Language Quickstarts */}
        <DeveloperSection />

        {/* 13. Transparent Pricing Plans Preview */}
        <PricingPreview />

        {/* 14. Frequently Asked Questions Accordion */}
        <div id="faq">
          <FaqSection />
        </div>

        {/* 15. Luxury High-Contrast Closing Call To Action */}
        <CtaBanner />
      </main>

      {/* 16. Luxury Navy Footer with Gigantic Editorial NEXORA Wordmark */}
      <Footer />
    </div>
  );
}

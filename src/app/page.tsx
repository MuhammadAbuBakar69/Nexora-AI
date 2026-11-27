"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { MetricsSection } from "@/components/landing/metrics";
import { ArchitectureFlowSection } from "@/components/landing/architecture-flow";
import { ScrollProgressBar } from "@/components/animations/motion-wrapper";

// Dynamic code-splitting for below-the-fold sections to optimize initial TTI & LCP
const DesignerShowcase = dynamic(
  () => import("@/components/landing/designer-showcase").then((mod) => mod.DesignerShowcase)
);
const InteractiveGatewaySimulator = dynamic(
  () => import("@/components/landing/interactive-gateway-simulator").then((mod) => mod.InteractiveGatewaySimulator)
);
const ModelsMatrixSection = dynamic(
  () => import("@/components/landing/models-matrix").then((mod) => mod.ModelsMatrixSection)
);
const Features = dynamic(
  () => import("@/components/landing/features").then((mod) => mod.Features)
);
const EdgeTopologySection = dynamic(
  () => import("@/components/landing/edge-topology").then((mod) => mod.EdgeTopologySection)
);
const SecurityComplianceSection = dynamic(
  () => import("@/components/landing/security-compliance").then((mod) => mod.SecurityComplianceSection)
);
const DeveloperSection = dynamic(
  () => import("@/components/landing/developer-section").then((mod) => mod.DeveloperSection)
);
const PricingPreview = dynamic(
  () => import("@/components/landing/pricing-preview").then((mod) => mod.PricingPreview)
);
const FaqSection = dynamic(
  () => import("@/components/landing/faq").then((mod) => mod.FaqSection)
);
const CtaBanner = dynamic(
  () => import("@/components/landing/cta-banner").then((mod) => mod.CtaBanner)
);

// Section motion animation configuration
const sectionMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F3]">
      {/* Sleek Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Architectural CAD Blueprint Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Architectural CAD Hero with Live Telemetry Inspector & Animated Sunset Mesh */}
        <Hero />

        {/* 2. Platform Capability Statistics & Topology Callouts with GSAP Counters */}
        <motion.div {...sectionMotion}>
          <MetricsSection />
        </motion.div>

        {/* 3. Under the Hood: Request Lifecycle & Gateway Layers */}
        <motion.div {...sectionMotion}>
          <ArchitectureFlowSection />
        </motion.div>

        {/* 4. High-End UI/UX Designer Showcase & 3D Spatial Canvas */}
        <motion.div {...sectionMotion}>
          <DesignerShowcase />
        </motion.div>

        {/* 5. Interactive Live Gateway Simulator */}
        <motion.div {...sectionMotion} id="sandbox">
          <InteractiveGatewaySimulator />
        </motion.div>

        {/* 6. Multi-Provider Frontier Model Matrix & Benchmarks */}
        <motion.div {...sectionMotion} id="models">
          <ModelsMatrixSection />
        </motion.div>

        {/* 7. Core Subsystem Architecture */}
        <motion.div {...sectionMotion} id="platform">
          <Features />
        </motion.div>

        {/* 8. Global Anycast Edge Infrastructure Radar */}
        <motion.div {...sectionMotion}>
          <EdgeTopologySection />
        </motion.div>

        {/* 9. Enterprise Security, Zero-Data Retention & Compliance */}
        <motion.div {...sectionMotion}>
          <SecurityComplianceSection />
        </motion.div>

        {/* 10. Developer Code Quickstarts & Multi-Language Drop-in SDKs */}
        <motion.div {...sectionMotion}>
          <DeveloperSection />
        </motion.div>

        {/* 11. Transparent Pricing & Interactive Quota/Quote Calculator */}
        <motion.div {...sectionMotion}>
          <PricingPreview />
        </motion.div>

        {/* 12. Frequently Asked Questions Accordion */}
        <motion.div {...sectionMotion} id="faq">
          <FaqSection />
        </motion.div>

        {/* 13. Enterprise Ingress Call To Action with Multi-Layer Sunset Orbs */}
        <motion.div {...sectionMotion}>
          <CtaBanner />
        </motion.div>
      </main>

      {/* 14. Architectural CAD Blueprint Footer */}
      <Footer />
    </div>
  );
}

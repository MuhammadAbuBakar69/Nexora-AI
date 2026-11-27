"use client";

import React from "react";
import { ShieldCheck, Lock, Key, Server, EyeOff, FileText, Check } from "lucide-react";
import { AnimatedGradientCard } from "@/components/ui/animated-gradient-card";

export function SecurityComplianceSection() {
  const securityPillars = [
    {
      code: "SEC-01",
      title: "Zero-Data Retention Architecture",
      description:
        "Prompts and completions stream strictly through volatile edge memory. Nexora never logs payload content, never stores customer outputs, and never uses your traffic for model training.",
      icon: EyeOff,
      badge: "ZDR ENFORCED",
    },
    {
      code: "SEC-02",
      title: "Hardware KMS & In-Transit Encryption",
      description:
        "Every request is encrypted using TLS 1.3 with Perfect Forward Secrecy in transit, and AES-256-GCM for encrypted vector storage. Customer-managed keys (CMEK) supported.",
      icon: Lock,
      badge: "AES-256-GCM",
    },
    {
      code: "SEC-03",
      title: "SOC2 Type II & HIPAA Compliance",
      description:
        "Independently verified security controls, continuous automated penetration testing, and formal Business Associate Agreements (BAAs) available for enterprise workloads.",
      icon: ShieldCheck,
      badge: "AUDITED",
    },
    {
      code: "SEC-04",
      title: "Dedicated Tenant VPC Peering",
      description:
        "Isolate your AI API gateway inside private virtual networks with static IP egress, AWS PrivateLink, and GCP VPC Service Controls to eliminate public internet exposure.",
      icon: Server,
      badge: "VPC PEERING",
    },
    {
      code: "SEC-05",
      title: "Cryptographic Key Scoping & RBAC",
      description:
        "Issue credentials locked to specific models, maximum rate ceilings (RPM), and IP allowlists. Rotate or revoke keys instantly via UI or REST API with zero downtime.",
      icon: Key,
      badge: "SCOPED ACCESS",
    },
    {
      code: "SEC-06",
      title: "Immutable Event Audit Ledger",
      description:
        "Every administrative operation—key generation, quota grants, access requests, or revocations—is cryptographically hashed into an append-only compliance audit trail.",
      icon: FileText,
      badge: "COMPLIANCE LEDGER",
    },
  ];

  return (
    <section className="py-20 bg-[#F6F6F3] border-b border-[#E2E2DA] select-none font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CAD Blueprint Header */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase mb-8 pb-2 border-b border-[#E2E2DA]">
          <span>// SECURITY GOVERNANCE: ZERO-DATA RETENTION &amp; AUDIT SPECIFICATION</span>
          <span>STANDARDS: SOC2 TYPE II • HIPAA BAA</span>
        </div>

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-300">
            SOVEREIGNTY &amp; GOVERNANCE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] font-mono mt-4 mb-3">
            SECURITY GROUNDED INTO EVERY GATEWAY TOKEN
          </h2>
          <p className="text-xs sm:text-sm text-[#555562] font-mono leading-relaxed">
            Engineered from day one for heavily regulated enterprises. Control your AI workloads without compromising data sovereignty or compliance.
          </p>
        </div>

        {/* 6 CAD Grid Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <AnimatedGradientCard
                key={idx}
                intensity="vibrant"
                className="p-6 flex flex-col justify-between h-full font-mono"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DA] mb-4">
                    <span className="text-[10px] text-emerald-600 font-bold">
                      // {pillar.code}
                    </span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold">
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-[#F7F7F4] border border-[#E2E2DA] flex items-center justify-center text-[#111111] group-hover:text-emerald-600 group-hover:border-emerald-300 transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-[#111111] uppercase tracking-tight group-hover:text-black transition-colors">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#555562] leading-relaxed font-sans mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2E2DA] flex items-center gap-2 text-[10px] text-[#777783]">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Enforced across all gateway endpoints</span>
                </div>
              </AnimatedGradientCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

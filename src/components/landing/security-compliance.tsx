"use client";

import React from "react";
import { ShieldCheck, Lock, Key, Server, EyeOff, FileText, CheckCircle2 } from "lucide-react";

export function SecurityComplianceSection() {
  const securityPillars = [
    {
      title: "Zero-Data Retention Guarantee",
      description:
        "Your prompts and completions pass strictly through transient memory. Nexora never logs payload content, never stores customer data, and never uses your traffic for model training.",
      icon: EyeOff,
      badge: "ZDR Enforced",
    },
    {
      title: "Enterprise KMS Encryption",
      description:
        "Every request is encrypted using TLS 1.3 with Perfect Forward Secrecy in transit, and AES-256 GCM at rest. Customer-managed keys (CMEK) are supported for enterprise tenants.",
      icon: Lock,
      badge: "AES-256 GCM",
    },
    {
      title: "SOC2 Type II & HIPAA Ready",
      description:
        "Independently audited security controls, continuous penetration testing, and formal Business Associate Agreements (BAAs) available for healthcare and fintech workloads.",
      icon: ShieldCheck,
      badge: "Certified",
    },
    {
      title: "Dedicated Tenant VPC Peering",
      description:
        "Isolate your AI API gateway inside a private virtual cloud with static IP egress, AWS PrivateLink, and GCP VPC Service Controls to eliminate internet exposure.",
      icon: Server,
      badge: "Private VPC",
    },
    {
      title: "Granular RBAC & Key Scoping",
      description:
        "Issue short-lived or permanent credentials locked to specific models, maximum rate ceilings (RPM), and CIDR IP whitelists. Rotate keys with zero application downtime.",
      icon: Key,
      badge: "Scoped Access",
    },
    {
      title: "Immutable Event Audit Ledger",
      description:
        "Every administrative action—key generation, quota updates, permission changes, or access revocations—is cryptographically hashed into an append-only compliance log.",
      icon: FileText,
      badge: "365-Day Retention",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#100E20] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-violet-primary/20 via-blue-soft/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase font-semibold tracking-wider text-violet-soft bg-white/10 px-3 py-1 rounded-full border border-white/15">
            Enterprise Security Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-heritage font-semibold tracking-tight text-white mt-4 mb-5">
            Security built into every gateway token.
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            Engineered from day one for heavily regulated industries. Control your AI workloads without compromising data sovereignty or governance.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#151329] border border-white/10 rounded-3xl p-8 hover:border-violet-soft/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-soft group-hover:scale-110 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-3 py-0.5 rounded-full">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-sans text-white tracking-tight mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10 flex items-center gap-2 text-xs text-violet-soft font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Enforced on all tier endpoints</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

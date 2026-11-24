"use client";

import React from "react";
import { UserCheck, SlidersHorizontal, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Create Your Workspace",
      description:
        "Provision your secure NEXORA organization in seconds. Establish team permissions, role-based access control, and environment separation.",
      icon: UserCheck,
      details: ["Organization setup", "Role-based access", "Instant workspace"],
    },
    {
      step: "02",
      title: "Configure Your Resources",
      description:
        "Define token budget ceilings, authorize target frontier models (OpenAI, Anthropic, Google, Meta), and attach optional cloud storage buckets.",
      icon: SlidersHorizontal,
      details: ["Monthly token limits", "Provider whitelist", "Storage allocations"],
    },
    {
      step: "03",
      title: "Connect & Monitor",
      description:
        "Drop our drop-in endpoint into your existing SDKs using your Nexora API key. Observe real-time latency, token usage, and cost analytics.",
      icon: Activity,
      details: ["Zero SDK rewrites", "Real-time telemetry", "Automated failover"],
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <Badge variant="violet" className="mb-4">
            Integration Lifecycle
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-5 font-heritage">
            How NEXORA works.
          </h2>
          <p className="text-base sm:text-lg text-[#3f3f4c] font-medium leading-relaxed">
            Three simple steps from initial setup to enterprise-grade AI infrastructure governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-surface rounded-3xl p-8 border border-border hover:border-violet-soft/60 hover:bg-white transition-all duration-300 hover:shadow-premium flex flex-col justify-between hover-lift"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl font-bold font-heritage text-violet-primary">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-border flex items-center justify-center text-foreground shadow-sm">
                      <Icon className="w-6 h-6 text-violet-primary" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-sans text-foreground tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#40404f] leading-relaxed mb-6 font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border space-y-2.5">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2.5 text-xs text-[#1e1e24] font-semibold">
                      <div className="w-2 h-2 rounded-full bg-violet-primary" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

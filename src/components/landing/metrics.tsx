"use client";

import React from "react";
import { Quote } from "lucide-react";

export function MetricsSection() {
  const metrics = [
    {
      value: "45M+",
      label: "API Requests Processed",
      sublabel: "Illustrative gateway throughput",
    },
    {
      value: "40+",
      label: "AI Models Supported",
      sublabel: "Frontier LLMs, vision & embeddings",
    },
    {
      value: "85%",
      label: "Resource Optimization",
      sublabel: "Through intelligent request caching",
    },
    {
      value: "99.98%",
      label: "Platform Availability",
      sublabel: "Multi-region failover architecture",
    },
  ];

  return (
    <section className="py-20 border-y border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sonivale-style Testimonial Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-16 border-b border-border">
          <div className="lg:col-span-4">
            <span className="text-xs uppercase font-semibold tracking-wider text-secondary">
              Product Philosophy
            </span>
            <h3 className="text-lg font-semibold text-foreground mt-1">
              Engineered for Precision & Governance
            </h3>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-violet-soft/30 border-2 border-white flex items-center justify-center text-[10px] font-bold text-violet-primary">
                  ER
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-soft/30 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-700">
                  MV
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-700">
                  SC
                </div>
              </div>
              <p className="text-xs text-secondary">
                Designed for engineering teams managing multi-model architectures.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 relative pl-0 lg:pl-8 lg:border-l border-border">
            <Quote className="w-10 h-10 text-border absolute -top-4 right-2 pointer-events-none opacity-40" />
            <blockquote className="text-xl sm:text-2xl font-normal text-foreground leading-snug font-heritage">
              &ldquo;NEXORA feels less like cumbersome cloud plumbing and more like a dedicated infrastructure copilot. We allocate tokens, configure scoped keys, and let engineering scale without unexpected cost spikes.&rdquo;
            </blockquote>
            <p className="text-xs text-secondary mt-3">
              <span className="font-medium text-foreground">SaaS Infrastructure Architect</span> — Autonomous Workflow Labs (Simulated Benchmark)
            </p>
          </div>
        </div>

        {/* Statistics Row (Sonivale oversized number styling) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
          {metrics.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="text-4xl sm:text-6xl font-bold font-heritage tracking-tight text-foreground flex items-baseline">
                {item.value}
                <span className="text-violet-primary ml-0.5 text-2xl font-normal">*</span>
              </div>
              <span className="text-sm font-semibold text-foreground mt-2">
                {item.label}
              </span>
              <span className="text-xs text-secondary mt-0.5">
                {item.sublabel}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-secondary/60 text-center mt-10">
          * Metrics displayed represent benchmark simulation and architectural capability capacity.
        </p>
      </div>
    </section>
  );
}

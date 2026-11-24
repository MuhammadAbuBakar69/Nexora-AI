"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Activity,
  CheckCircle2,
  Clock,
  Cpu,
  Shield,
  Layers,
  Terminal,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ResourcesPage() {
  const [downloadModal, setDownloadModal] = useState<string | null>(null);

  const whitepapers = [
    {
      id: "zdr-whitepaper",
      title: "Zero-Data Retention (ZDR) Architecture in Enterprise AI Gateways",
      category: "Security & Compliance",
      pages: "18 pages PDF",
      readTime: "12 min read",
      summary:
        "An in-depth security whitepaper detailing volatile memory buffering, TLS 1.3 termination, ephemeral tokenization, and cryptographic SHA-256 HMAC audit proofs.",
    },
    {
      id: "token-optimization",
      title: "The 2026 Token Quota & Cost Optimization Handbook",
      category: "Engineering Best Practices",
      pages: "24 pages PDF",
      readTime: "15 min read",
      summary:
        "A practical guide for engineering leaders to eliminate runaway LLM bills, set intelligent rate limits, and implement semantic vector caching to reduce token spend by 40%.",
    },
    {
      id: "multi-provider-failover",
      title: "High-Availability AI: Multi-Provider Failover & Circuit Breaking",
      category: "Systems Engineering",
      pages: "14 pages PDF",
      readTime: "9 min read",
      summary:
        "Design patterns for resilient AI systems: detecting upstream degradation, sub-second routing cascades, and normalized schema translation across frontier models.",
    },
  ];

  const providerStatuses = [
    { provider: "Anthropic", model: "Claude 3.5 Sonnet", p95Latency: "340 ms", status: "Operational", uptime: "99.98%" },
    { provider: "OpenAI", model: "GPT-4o (Omni)", p95Latency: "310 ms", status: "Operational", uptime: "99.95%" },
    { provider: "Google Vertex", model: "Gemini 1.5 Pro", p95Latency: "390 ms", status: "Operational", uptime: "99.99%" },
    { provider: "Mistral AI", model: "Mistral Large 2", p95Latency: "355 ms", status: "Operational", uptime: "99.97%" },
    { provider: "Meta Llama", model: "Llama 3.3 70B", p95Latency: "275 ms", status: "Operational", uptime: "99.99%" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Editorial Resources Hero */}
        <section className="relative py-20 sm:py-28 overflow-hidden bg-white border-b border-border">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-hero-glow blur-3xl pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase font-semibold tracking-wider text-violet-primary bg-violet-light px-3 py-1 rounded-full border border-violet-soft/30 inline-flex items-center gap-1.5 mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Technical Knowledge Center
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#111111] mb-6 leading-[1.08] font-heritage">
              Architectural Research,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-primary via-[#5D38F0] to-[#7E88FF]">
                Guides & Live Telemetry.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
              Explore technical whitepapers, real-time provider latency benchmarks, integration recipes, and developer resources to accelerate your AI infrastructure.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/developers">
                <Button size="lg" className="shadow-md gap-2 font-medium">
                  <Terminal className="w-4 h-4" />
                  View API Documentation
                </Button>
              </Link>
              <a href="#whitepapers">
                <Button variant="secondary" size="lg" className="gap-2">
                  <FileText className="w-4 h-4 text-secondary" />
                  Browse Whitepapers
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Live Provider Health & Latency Monitor */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-border">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-primary flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-violet-primary" />
                Live Edge Radar
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-heritage text-[#111111] mt-1">
                Upstream Provider Latency Index
              </h2>
            </div>
            <p className="text-xs text-secondary max-w-sm">
              Continuous synthetic ping probes measured from 24 global Nexora Edge PoPs across primary model endpoints.
            </p>
          </div>

          <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-surface border-b border-border">
                  <tr className="text-secondary font-semibold">
                    <th className="py-3.5 px-6">Model Provider</th>
                    <th className="py-3.5 px-6">Benchmark Model</th>
                    <th className="py-3.5 px-6">P95 TTFT Latency</th>
                    <th className="py-3.5 px-6">Health Status</th>
                    <th className="py-3.5 px-6">30-Day SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-secondary">
                  {providerStatuses.map((p, idx) => (
                    <tr key={idx} className="hover:bg-surface/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-foreground">{p.provider}</td>
                      <td className="py-4 px-6 font-mono text-xs text-foreground">{p.model}</td>
                      <td className="py-4 px-6 font-mono font-semibold text-violet-primary">{p.p95Latency}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs">{p.uptime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Technical Whitepapers Grid */}
        <section id="whitepapers" className="py-20 bg-[#FAFAFC] border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase font-semibold tracking-wider text-violet-primary bg-violet-light px-3 py-1 rounded-full border border-violet-soft/30 mb-3 inline-block">
                Peer-Reviewed Publications
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heritage text-[#111111]">
                Technical Whitepapers & Architecture Briefs
              </h2>
              <p className="text-secondary text-sm mt-2">
                Downloadable engineering guides written by our systems architecture team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whitepapers.map((wp) => (
                <div
                  key={wp.id}
                  className="bg-white border border-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-violet-soft/50 hover:shadow-premium transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-secondary">
                      <span className="font-semibold text-violet-primary bg-violet-light/50 px-2.5 py-1 rounded-md">
                        {wp.category}
                      </span>
                      <span>{wp.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold font-heritage text-foreground leading-snug">
                      {wp.title}
                    </h3>

                    <p className="text-xs text-secondary leading-relaxed">
                      {wp.summary}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                    <span className="text-[11px] font-mono text-secondary">
                      {wp.pages}
                    </span>
                    <button
                      onClick={() => setDownloadModal(wp.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-primary hover:text-violet-dark transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Brief
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Developer Integration Tools */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heritage text-foreground">
              Developer Ecosystem & Community
            </h2>
            <p className="text-secondary text-sm mt-2">
              Everything you need to build, test, and monitor your AI infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/developers"
              className="p-6 rounded-2xl border border-border bg-white hover:border-violet-soft/40 hover:shadow-subtle transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-light text-violet-primary flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground font-heritage mb-1">
                API Reference
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Complete REST endpoints, authentication specs, and telemetry response headers.
              </p>
            </Link>

            <Link
              href="/dashboard/docs"
              className="p-6 rounded-2xl border border-border bg-white hover:border-violet-soft/40 hover:shadow-subtle transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-light text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground font-heritage mb-1">
                Quickstart Walkthrough
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Copy-paste SDK snippets in TypeScript, Python, and Go for 5-minute integration.
              </p>
            </Link>

            <Link
              href="/pricing"
              className="p-6 rounded-2xl border border-border bg-white hover:border-violet-soft/40 hover:shadow-subtle transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground font-heritage mb-1">
                SLA & Guarantees
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Review uptime commitments, multi-region failover tolerances, and data privacy.
              </p>
            </Link>

            <Link
              href="/dashboard"
              className="p-6 rounded-2xl border border-border bg-white hover:border-violet-soft/40 hover:shadow-subtle transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground font-heritage mb-1">
                Interactive Console
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Test API keys, review token usage telemetry, and manage cloud storage partitions.
              </p>
            </Link>
          </div>
        </section>

        {/* Download Modal Simulation */}
        {downloadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-light text-violet-primary flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heritage text-foreground">
                  Download Architecture Brief
                </h3>
                <p className="text-xs text-secondary mt-1">
                  You are downloading: <strong className="text-foreground">{downloadModal}</strong>
                </p>
              </div>
              <div className="p-3 bg-surface rounded-xl border border-border text-xs text-secondary">
                <p>✔ Comprehensive architectural diagrams</p>
                <p>✔ SOC2 & HIPAA compliance checklist</p>
                <p>✔ Token cost reduction benchmarks</p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => setDownloadModal(null)}
                  className="flex-1 bg-violet-primary text-white"
                >
                  Download PDF (Simulated)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDownloadModal(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

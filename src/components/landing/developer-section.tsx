"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, Check, ArrowRight, Code2, Terminal, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";
import { GsapHeadline } from "@/components/animations/gsap-animator";

export function DeveloperSection() {
  const [activeLang, setActiveLang] = useState<"curl" | "typescript" | "python">("curl");
  const [copied, setCopied] = useState(false);

  const snippets = {
    curl: {
      filename: "request.sh",
      code: `curl -X POST https://api.nexora.cloud/v1/chat/completions \\
  -H "Authorization: Bearer nx_live_YOUR_GATEWAY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "google/gemini-2.5-flash",
    "messages": [
      {"role": "user", "content": "Analyze our infrastructure architecture latency metrics."}
    ],
    "temperature": 0.2
  }'`,
    },
    typescript: {
      filename: "nexora-gateway.ts",
      code: `import OpenAI from "openai";

// 100% OpenAI-SDK drop-in gateway compatibility
const nexora = new OpenAI({
  apiKey: process.env.NEXORA_API_KEY,
  baseURL: "https://api.nexora.cloud/v1",
});

const response = await nexora.chat.completions.create({
  model: "google/gemini-2.5-flash", // Or "google/veo-video-2", "anthropic/claude-3-5-sonnet"
  messages: [{ role: "user", content: "Analyze infrastructure latency logs." }],
});

console.log(response.choices[0].message.content);`,
    },
    python: {
      filename: "nexora_gateway.py",
      code: `import os
from openai import OpenAI

# Drop-in SDK endpoint replacement
client = OpenAI(
    api_key=os.environ.get("NEXORA_API_KEY"),
    base_url="https://api.nexora.cloud/v1"
)

response = client.chat.completions.create(
    model="google/gemini-2.5-flash",
    messages=[{"role": "user", "content": "Generate system architecture telemetry report."}]
)

print(response.choices[0].message.content)`,
    },
  };

  const current = snippets[activeLang];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = current.code.split("\n");

  return (
    <section className="py-20 bg-[#F6F6F3] border-b border-[#E2E2DA] select-none font-sans relative overflow-hidden">
      {/* Subtle Ambient Sunset Glow */}
      <AnimatedSunsetMesh intensity="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CAD Blueprint Header */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase mb-8 pb-2 border-b border-[#E2E2DA]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            // DEVELOPER INTEGRATION SPECIFICATION: DROP-IN SDK TERMINAL
          </span>
          <span>PROTOCOL: RFC-8259 JSON OVER HTTP/2 &amp; HTTP/3</span>
        </div>

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-primary bg-violet-50 px-2.5 py-1 border border-violet-200 inline-block mb-3">
            RAPID INTEGRATION
          </span>
          <GsapHeadline
            text="ZERO REFACTORING."
            highlight="OPENAI-SDK COMPATIBLE."
            className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] font-mono leading-[1.12] mb-3"
          />
          <p className="text-xs sm:text-sm text-[#555562] font-mono leading-relaxed">
            Swap two lines of configuration in your existing codebase. Route requests to Gemini 2.5 Flash, Google Veo, Claude 3.5, and GPT-4o without altering your payload schemas.
          </p>
        </div>

        {/* Hyper-Professional Code Terminal Window */}
        <div className="rounded-none border border-[#22222E] bg-[#0E0E14] text-[#E0E0EA] shadow-xl relative font-mono overflow-hidden">
          {/* 4 Corner Crosshairs */}
          <span className="absolute top-2 left-2 text-xs text-[#555566] select-none z-20">+</span>
          <span className="absolute top-2 right-2 text-xs text-[#555566] select-none z-20">+</span>
          <span className="absolute bottom-2 left-2 text-xs text-[#555566] select-none z-20">+</span>
          <span className="absolute bottom-2 right-2 text-xs text-[#555566] select-none z-20">+</span>

          {/* Window Chrome Header Bar */}
          <div className="px-5 py-3 border-b border-[#252535] bg-[#15151F] flex flex-wrap items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-3">
              {/* macOS Dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block" />
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center gap-1 ml-2 bg-[#0E0E14] p-1 border border-[#222230]">
                {(["curl", "typescript", "python"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-3 py-1 text-xs font-bold uppercase transition-all ${
                      activeLang === lang
                        ? "bg-[#252535] text-white shadow-xs"
                        : "text-[#888899] hover:text-white"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Active Filename & Copy Button */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#777788] hidden sm:inline">
                {current.filename}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-[#1A1A26] border border-[#2B2B3D] text-[#CCCCCC] hover:text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#888899]" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Body with Line Numbers */}
          <div className="p-6 overflow-x-auto text-xs leading-relaxed font-mono flex">
            {/* Line Number Column */}
            <div className="select-none text-[#555566] pr-4 border-r border-[#222230] text-right">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code Content */}
            <pre className="pl-4 text-[#D8D8E6] overflow-x-auto w-full">
              <code>{current.code}</code>
            </pre>
          </div>

          {/* Terminal Footer */}
          <div className="px-5 py-2.5 bg-[#12121A] border-t border-[#222230] flex flex-wrap items-center justify-between text-[10px] text-[#777788]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>TLS 1.3 0-RTT • HARD COST CAP ENFORCED • SUB-20MS TTFT</span>
            </div>
            <Link
              href="/developers"
              className="text-violet-primary hover:text-violet-700 flex items-center gap-1 font-bold transition-colors"
            >
              <span>Explore SDK Reference</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Copy, Check, Terminal, Code2, ShieldAlert } from "lucide-react";

export default function DocsPage() {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const curlSnippet = `curl -X POST https://api.nexora.cloud/v1/chat/completions \\
  -H "Authorization: Bearer nx_live_YOUR_KEY_HERE" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gemini-2.5-flash",
    "messages": [
      {"role": "user", "content": "Analyze our infrastructure architecture latency metrics."}
    ]
  }'`;

  const pythonSnippet = `import os
from openai import OpenAI

# The Nexora Anycast Gateway is 100% OpenAI-SDK compatible
client = OpenAI(
    base_url="https://api.nexora.cloud/v1",
    api_key=os.environ.get("NEXORA_API_KEY")
)

response = client.chat.completions.create(
    model="gemini-2.5-flash", # Or "google-veo-video-2", "claude-3-5-sonnet", "gpt-4o"
    messages=[
        {"role": "user", "content": "Generate technical system architecture draft."}
    ]
)

print(response.choices[0].message.content)`;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <DashboardHeader
        title="Developer Quickstart &amp; API Gateway Specification"
        subtitle="Standardized HTTP and SDK integration routes for the Nexora Anycast Gateway"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
        {/* CAD Telemetry Marker */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase px-1">
          <span>// SPECIFICATION: OPENAI-COMPATIBLE API PROTOCOL</span>
          <span>COMPLIANCE: RFC-8259 JSON</span>
        </div>

        {/* Quickstart 3-step section */}
        <div className="bg-white border border-[#E2E2DA] p-6 relative">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <div className="pb-4 border-b border-[#E2E2DA]">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
              Rapid Edge Integration Protocol
            </h3>
            <p className="text-[11px] font-mono text-[#777783] mt-0.5">
              Connect your production application to Gemini, Veo, Claude, and GPT in 3 steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs font-mono">
            <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA]">
              <span className="text-violet-primary font-bold block mb-1">01 // PROVISION KEY</span>
              <p className="text-[#555562] text-[11px]">
                Create a scoped API key from the API Keys tab. Rate limits and model permissions are enforced server-side.
              </p>
            </div>

            <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA]">
              <span className="text-violet-primary font-bold block mb-1">02 // POINT BASE URL</span>
              <p className="text-[#555562] text-[11px]">
                Set your upstream client base URL to <code className="bg-[#EAEAE4] px-1 text-[#111111]">https://api.nexora.cloud/v1</code>.
              </p>
            </div>

            <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA]">
              <span className="text-violet-primary font-bold block mb-1">03 // ROUTE INFERENCE</span>
              <p className="text-[#555562] text-[11px]">
                Pass your desired model tag (e.g. <code className="bg-[#EAEAE4] px-1 text-[#111111]">gemini-2.5-flash</code>) in the payload.
              </p>
            </div>
          </div>
        </div>

        {/* Python SDK Example */}
        <div className="bg-white border border-[#E2E2DA] p-6 relative">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DA] mb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-violet-primary" />
              <span className="text-xs font-mono font-bold uppercase text-[#111111]">
                Python SDK (OpenAI SDK Drop-in)
              </span>
            </div>
            <button
              onClick={() => copyToClipboard("python", pythonSnippet)}
              className="text-[11px] font-mono text-[#555562] hover:text-[#111111] flex items-center gap-1"
            >
              {copiedSnippet === "python" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet === "python" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <pre className="p-4 bg-[#111111] text-[#EAEAEA] font-mono text-xs overflow-x-auto leading-relaxed border border-[#333333]">
            {pythonSnippet}
          </pre>
        </div>

        {/* cURL Example */}
        <div className="bg-white border border-[#E2E2DA] p-6 relative">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DA] mb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-primary" />
              <span className="text-xs font-mono font-bold uppercase text-[#111111]">
                cURL CLI Request
              </span>
            </div>
            <button
              onClick={() => copyToClipboard("curl", curlSnippet)}
              className="text-[11px] font-mono text-[#555562] hover:text-[#111111] flex items-center gap-1"
            >
              {copiedSnippet === "curl" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet === "curl" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <pre className="p-4 bg-[#111111] text-[#EAEAEA] font-mono text-xs overflow-x-auto leading-relaxed border border-[#333333]">
            {curlSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}

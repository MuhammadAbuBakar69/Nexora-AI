"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Copy, Check, BookOpen, Terminal, Code2, ShieldAlert } from "lucide-react";

export default function DocsPage() {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="Developer Documentation & API Quickstart"
        subtitle="Step-by-step guidance to route requests through the Nexora Gateway"
        
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl">
        {/* Quickstart 3 Steps */}
        <section className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-subtle space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-primary">
              Quickstart Guide
            </span>
            <h2 className="text-xl font-semibold text-foreground mt-1">
              Connect in 3 Simple Steps
            </h2>
          </div>

          <div className="space-y-6 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-light text-violet-primary font-bold flex items-center justify-center text-xs">
                  1
                </span>
                <h3 className="font-semibold text-foreground">Obtain your Nexora API Key</h3>
              </div>
              <p className="text-secondary pl-8">
                Generate a scoped credential in the <span className="font-semibold text-foreground">API Keys</span> dashboard. Store your key securely in your environment variables as <code className="bg-surface px-1.5 py-0.5 rounded text-foreground">NEXORA_API_KEY</code>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-light text-violet-primary font-bold flex items-center justify-center text-xs">
                  2
                </span>
                <h3 className="font-semibold text-foreground">Point your Base URL to Nexora</h3>
              </div>
              <p className="text-secondary pl-8">
                In your existing OpenAI SDK client initialization, configure <code className="bg-surface px-1.5 py-0.5 rounded text-foreground">baseURL</code> to <code className="bg-surface px-1.5 py-0.5 rounded text-foreground">https://api.nexora.cloud/v1</code>.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-light text-violet-primary font-bold flex items-center justify-center text-xs">
                  3
                </span>
                <h3 className="font-semibold text-foreground">Specify the Provider Model</h3>
              </div>
              <p className="text-secondary pl-8">
                Prefix the model name with the provider (e.g. <code className="bg-surface px-1.5 py-0.5 rounded text-foreground">anthropic/claude-3-5-sonnet</code> or <code className="bg-surface px-1.5 py-0.5 rounded text-foreground">openai/gpt-4o</code>).
              </p>
            </div>
          </div>
        </section>

        {/* Code Snippet Box */}
        <section className="bg-[#100E20] text-white rounded-2xl p-6 border border-white/10 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-mono text-xs text-violet-soft">Node.js (TypeScript) Sample</span>
            <button
              onClick={() =>
                copyToClipboard(
                  "sampleCode",
                  `import OpenAI from "openai";\n\nconst nexora = new OpenAI({\n  apiKey: process.env.NEXORA_API_KEY,\n  baseURL: "https://api.nexora.cloud/v1",\n});\n\nconst completion = await nexora.chat.completions.create({\n  model: "anthropic/claude-3-5-sonnet",\n  messages: [{ role: "user", content: "Synthesize this data." }],\n});\n\nconsole.log(completion.choices[0].message.content);`
                )
              }
              className="text-xs text-white/60 hover:text-white flex items-center gap-1.5"
            >
              {copiedSnippet === "sampleCode" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet === "sampleCode" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <pre className="text-xs sm:text-sm font-mono text-violet-soft/90 overflow-x-auto leading-relaxed">
            {`import OpenAI from "openai";

const nexora = new OpenAI({
  apiKey: process.env.NEXORA_API_KEY,
  baseURL: "https://api.nexora.cloud/v1",
});

const completion = await nexora.chat.completions.create({
  model: "anthropic/claude-3-5-sonnet",
  messages: [{ role: "user", content: "Synthesize this data." }],
});

console.log(completion.choices[0].message.content);`}
          </pre>
        </section>

        {/* Headers and Quota Response Specifications */}
        <section className="bg-white border border-border rounded-2xl p-6 shadow-subtle space-y-4">
          <h3 className="text-base font-semibold text-foreground">
            Gateway Telemetry HTTP Headers
          </h3>
          <p className="text-xs text-secondary leading-relaxed">
            Every response from the Nexora proxy contains real-time quota telemetry in standard response headers:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface/50 border-b border-border text-secondary">
                <tr>
                  <th className="py-2.5 px-3">Header Name</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-secondary">
                <tr>
                  <td className="py-2.5 px-3 text-foreground font-semibold">x-nexora-tokens-consumed</td>
                  <td className="py-2.5 px-3">Tokens consumed by this request</td>
                  <td className="py-2.5 px-3">1420</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-foreground font-semibold">x-nexora-quota-remaining</td>
                  <td className="py-2.5 px-3">Remaining monthly token balance</td>
                  <td className="py-2.5 px-3">17549180</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-foreground font-semibold">x-nexora-upstream-latency</td>
                  <td className="py-2.5 px-3">Upstream provider TTFT</td>
                  <td className="py-2.5 px-3">340ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

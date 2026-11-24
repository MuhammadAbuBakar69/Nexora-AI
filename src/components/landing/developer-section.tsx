"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Copy, Check, ArrowRight, Code2, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeveloperSection() {
  const [activeLang, setActiveLang] = useState<"curl" | "typescript" | "python" | "go">("curl");
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    curl: `curl https://api.nexora.cloud/v1/chat/completions \\
  -H "Authorization: Bearer nx_live_98e1f02c48ba9" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "anthropic/claude-3-5-sonnet",
    "messages": [
      {"role": "system", "content": "You are an AI infrastructure agent."},
      {"role": "user", "content": "Optimize our vector token budget."}
    ],
    "temperature": 0.2
  }'`,
    typescript: `import OpenAI from "openai";

// Drop-in compatibility with OpenAI SDK
const nexora = new OpenAI({
  apiKey: process.env.NEXORA_API_KEY, // "nx_live_98e1..."
  baseURL: "https://api.nexora.cloud/v1",
});

const response = await nexora.chat.completions.create({
  model: "anthropic/claude-3-5-sonnet", // routed dynamically
  messages: [{ role: "user", content: "Optimize token budget" }],
});

console.log(response.choices[0].message);`,
    python: `from openai import OpenAI

# Drop-in SDK endpoint replacement
client = OpenAI(
    api_key="nx_live_98e1f02c48ba9",
    base_url="https://api.nexora.cloud/v1"
)

response = client.chat.completions.create(
    model="google/gemini-1-5-pro",
    messages=[{"role": "user", "content": "Analyze system latency log."}]
)

print(response.choices[0].message.content)`,
    go: `package main

import (
    "bytes"
    "net/http"
)

func main() {
    url := "https://api.nexora.cloud/v1/chat/completions"
    payload := []byte(\`{
        "model": "openai/gpt-4o",
        "messages": [{"role": "user", "content": "Stream response"}]
    }\`)

    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(payload))
    req.Header.Set("Authorization", "Bearer nx_live_98e1...")
    req.Header.Set("Content-Type", "application/json")
    
    // Dispatched via Nexora low-latency edge proxy
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#100E20] text-white relative overflow-hidden">
      {/* Background soft glows */}
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-violet-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-blue-soft/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-violet-soft">
              <Code2 className="w-3.5 h-3.5" />
              Developer Gateway Experience
            </div>

            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.1] font-heritage">
              Built for developers.
              <br />
              <span className="text-violet-soft">Designed for scale.</span>
            </h2>

            <p className="text-base text-white/85 leading-relaxed font-normal">
              Switching providers usually means rewriting client code, managing fragmented billing accounts, and rebuilding telemetry from scratch.
            </p>

            <p className="text-base text-white/85 leading-relaxed font-normal">
              With NEXORA, you keep your favorite client SDKs (OpenAI, LangChain, LlamaIndex, or Vercel AI SDK) and switch only the endpoint and authorization token.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-white font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Standardized OpenAI-compatible REST API interface</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white font-semibold">
                <span className="w-2 h-2 rounded-full bg-violet-soft" />
                <span>Customer-scoped token budgets with zero client key leakage</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-soft" />
                <span>Automatic multi-provider latency routing and failover fallback</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link href="/developers">
                <Button size="md" className="bg-white text-[#100E20] hover:bg-violet-light font-bold tracking-tight shadow-md">
                  <BookOpen className="w-4 h-4 mr-1.5" />
                  API Documentation
                </Button>
              </Link>
              <Link href="/dashboard/api-keys">
                <Button variant="outline" size="md" className="border-white/20 text-white hover:bg-white/10 font-semibold">
                  Generate Sandbox Key
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Code Editor Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-[#151329] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
              {/* Editor Tab Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#0E0C1C]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-xs font-mono text-white/40 hidden sm:inline">
                    POST /v1/chat/completions
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {(["curl", "typescript", "python", "go"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`text-xs px-2.5 py-1 rounded-md font-mono uppercase transition-colors ${
                        activeLang === lang
                          ? "bg-violet-primary text-white font-semibold shadow-sm"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                  <button
                    onClick={handleCopy}
                    className="ml-2 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    title="Copy code snippet"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Code Display Area */}
              <div className="p-6 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-violet-soft/90">
                <pre>
                  <code>{codeSnippets[activeLang]}</code>
                </pre>
              </div>

              {/* Notice Bar */}
              <div className="px-6 py-3 border-t border-white/10 bg-[#0E0C1C] flex items-center justify-between text-[11px] text-white/40">
                <span>* Illustrative endpoint schema based on official NEXORA API architecture.</span>
                <span className="font-mono text-emerald-400">HTTP/2 • TLS 1.3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

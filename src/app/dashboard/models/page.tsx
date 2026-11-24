"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { mockAiModelsCatalog } from "@/data/mock-data";
import { AiModel } from "@/types";
import { Boxes, Zap, Clock, Sparkles, Terminal, Copy, Check, ArrowRight } from "lucide-react";

export default function ModelsCatalogPage() {
  const [selectedProvider, setSelectedProvider] = useState<string>("All");
  const [activeModelForIntegration, setActiveModelForIntegration] = useState<AiModel | null>(null);
  const [copied, setCopied] = useState(false);

  const providers = ["All", "Anthropic", "OpenAI", "Google", "Meta", "Mistral"];

  const filteredModels =
    selectedProvider === "All"
      ? mockAiModelsCatalog
      : mockAiModelsCatalog.filter((m) => m.provider === selectedProvider);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="AI Model Catalog"
        subtitle="Gateway-routed frontier models available through your Nexora API key"
        
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Disclaimer Pill */}
        <div className="p-4 rounded-2xl bg-white border border-border flex items-center justify-between text-xs text-secondary shadow-subtle">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-primary" />
            <span>
              All models displayed are dynamically proxied through the Nexora Gateway. No provider accounts required.
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            6 Operational Endpoints
          </span>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {providers.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedProvider(p)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedProvider === p
                  ? "bg-[#111111] text-white shadow-xs font-semibold"
                  : "bg-white text-secondary border border-border hover:border-violet-soft/50 hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="bg-white border border-border rounded-2xl p-6 hover:border-violet-soft/50 hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
                    {model.provider}
                  </span>
                  <Badge variant={model.status === "operational" ? "success" : "warning"} size="sm">
                    {model.status}
                  </Badge>
                </div>

                <h3 className="text-base font-semibold text-foreground mb-1.5">{model.name}</h3>
                <p className="text-xs text-secondary leading-relaxed mb-4">{model.description}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-border/60">
                <div className="grid grid-cols-2 gap-2 text-[11px] text-secondary">
                  <div>
                    <span className="block text-secondary/60">Context Window</span>
                    <span className="font-semibold text-foreground">{model.contextWindow}</span>
                  </div>
                  <div>
                    <span className="block text-secondary/60">Average Latency</span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3 text-secondary" />
                      {model.latencyMs}ms
                    </span>
                  </div>
                  <div>
                    <span className="block text-secondary/60">Input Pricing</span>
                    <span className="font-semibold text-foreground">{model.inputPricing}</span>
                  </div>
                  <div>
                    <span className="block text-secondary/60">Output Pricing</span>
                    <span className="font-semibold text-foreground">{model.outputPricing}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveModelForIntegration(model)}
                  className="w-full text-xs font-medium mt-2"
                >
                  <Terminal className="w-3.5 h-3.5 mr-1.5 text-secondary" />
                  Integration Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Instructions Modal */}
      {activeModelForIntegration && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModelForIntegration(null)}
          title={`Integrate ${activeModelForIntegration.name}`}
          description={`Gateway routing identifier: ${activeModelForIntegration.id}`}
        >
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-surface border border-border text-xs text-secondary leading-relaxed">
              Use standard OpenAI client libraries pointing to the Nexora base URL. Nexora automatically routes, authenticates, and checks token quotas.
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-secondary">
                <span>Code Example (cURL / OpenAI SDK)</span>
                <button
                  onClick={() =>
                    handleCopyCode(
                      `curl https://api.nexora.cloud/v1/chat/completions \\\n  -H "Authorization: Bearer YOUR_NEXORA_API_KEY" \\\n  -d '{"model": "${activeModelForIntegration.provider.toLowerCase()}/${activeModelForIntegration.id}", "messages": [{"role": "user", "content": "Hello world"}]}'`
                    )
                  }
                  className="text-violet-primary hover:underline flex items-center gap-1 text-[11px]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy snippet"}
                </button>
              </div>

              <div className="p-3 bg-[#100E20] text-violet-soft font-mono text-xs rounded-xl overflow-x-auto leading-relaxed">
                <pre>
                  {`curl https://api.nexora.cloud/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_NEXORA_API_KEY" \\
  -d '{
    "model": "${activeModelForIntegration.provider.toLowerCase()}/${activeModelForIntegration.id}",
    "messages": [{"role": "user", "content": "Hello world"}]
  }'`}
                </pre>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-border">
              <Button size="sm" onClick={() => setActiveModelForIntegration(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

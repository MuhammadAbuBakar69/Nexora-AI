"use client";

import React, { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "HOW DOES THE NEXORA ANYCAST GATEWAY ROUTE INFERENCE REQUESTS?",
      a: "Nexora operates a global mesh across 32 Anycast Edge Points of Presence. Incoming requests automatically terminate at the lowest-latency edge router, undergo cryptographic authentication, verify customer token quota balances in volatile memory, and proxy directly to the chosen upstream model provider (Google Gemini, Google Veo, Anthropic Claude, or OpenAI) with Zero-Data Retention.",
    },
    {
      q: "HOW DOES GOOGLE VEO VIDEO GENERATION BILLING WORK?",
      a: "Unlike text models which are measured in prompt and completion tokens, Google Veo Generative Video is metered per active second of high-definition video produced ($0.150 / active second). Our Commercial Quota Calculator supports setting monthly video second budgets alongside text token allowances.",
    },
    {
      q: "WHAT HAPPENS WHEN AN ORGANIZATION EXCEEDS ITS MONTHLY QUOTA?",
      a: "Nexora enforces zero-overdraft governance. When an organization approaches 80% consumption, automated webhook and email notifications trigger. Upon reaching 100%, the gateway returns HTTP 429 Too Many Requests to prevent unauthorized cloud spend. You can request temporary quota increases via the customer console at any time.",
    },
    {
      q: "DOES NEXORA STORE OR LOG PROMPT PAYLOADS?",
      a: "No. Nexora operates under strict Zero-Data Retention (ZDR) architecture. Requests stream ephemerally through edge memory to the upstream provider and responses stream back to the client. Only non-sensitive operational metadata (token counts, latency percentiles, and HTTP status codes) are recorded for audit compliance and invoicing.",
    },
    {
      q: "CAN WE PAY FOR TOKEN QUOTAS IN PAKISTANI RUPEES (PKR)?",
      a: "Yes. Our commercial pricing engine natively supports real-time currency conversion between USD ($) and Pakistani Rupee (PKR ₨ @ 280 rate) with localized invoice generation and compliant tax receipts.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#F6F6F3] border-b border-[#E2E2DA] select-none font-sans relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CAD Blueprint Header */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase mb-8 pb-2 border-b border-[#E2E2DA]">
          <span>// TECHNICAL INQUIRIES &amp; ARCHITECTURAL PROTOCOLS</span>
          <span>DOCUMENTATION: SPEC-FAQ-2026</span>
        </div>

        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-primary bg-violet-50 px-2.5 py-1 border border-violet-200">
            KNOWLEDGE SPECIFICATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] font-mono mt-4 mb-3">
            FREQUENTLY ASKED TECHNICAL QUESTIONS
          </h2>
          <p className="text-xs sm:text-sm text-[#555562] font-mono leading-relaxed">
            Essential protocols governing edge routing, token ceilings, model failover, and zero-retention security.
          </p>
        </div>

        {/* CAD Blueprint Accordion */}
        <div className="space-y-3 font-mono">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E2E2DA] relative transition-colors"
              >
                <span className="absolute top-1.5 left-2 text-xs text-[#888892] select-none">+</span>
                <span className="absolute top-1.5 right-2 text-xs text-[#888892] select-none">+</span>

                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F9F9F7] transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-[#111111] tracking-tight">
                    {faq.q}
                  </span>
                  <div className="w-6 h-6 border border-[#E2E2DA] bg-[#F7F7F4] flex items-center justify-center text-[#111111] shrink-0 text-xs">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-xs text-[#555562] leading-relaxed border-t border-[#E2E2DA] font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

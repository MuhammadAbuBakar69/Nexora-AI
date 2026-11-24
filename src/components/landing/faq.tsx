"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { mockFaqs } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="violet" className="mb-4">
            Common Inquiries
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-4 font-heritage">
            Frequently asked questions.
          </h2>
          <p className="text-base sm:text-lg text-[#3f3f4c] font-medium leading-relaxed">
            Everything you need to know about the NEXORA gateway, token ceilings, and security model.
          </p>
        </div>

        <div className="space-y-3.5">
          {mockFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-border rounded-2xl bg-white overflow-hidden transition-all duration-200 hover:border-violet-soft/60"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-surface/50 transition-colors cursor-pointer"
                >
                  <span className="text-base font-bold text-foreground tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-secondary transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 bg-violet-light text-violet-primary" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#40404f] leading-relaxed font-normal border-t border-border/40 animate-in fade-in duration-200">
                    {faq.answer}
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

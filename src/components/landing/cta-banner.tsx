"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-[#151329] via-[#1C1838] to-[#100E20] text-white p-10 sm:p-16 overflow-hidden border border-surface-borderDark shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[450px] h-[350px] bg-violet-primary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-semibold tracking-wider text-violet-soft flex items-center gap-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Unified Control Plane
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-6 leading-[1.15] font-heritage">
              Experience total governance over your AI infrastructure.
            </h2>
            <p className="text-base text-white/85 mb-8 leading-relaxed font-medium">
              Join engineering teams orchestrating multi-provider AI workloads with single-key governance, hard cost caps, and real-time observability.
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-[#100E20] hover:bg-violet-light font-bold shadow-lg active:scale-97">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 font-bold">
                  <Terminal className="w-4 h-4 mr-1.5 text-violet-soft" />
                  Explore Demo Console
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

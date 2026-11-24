import React from "react";
import { asset } from "@/lib/asset";
import Link from "next/link";
import { ArrowRight, Home, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 relative overflow-hidden text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-hero-glow blur-3xl pointer-events-none -z-10" />

      <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 group-hover:scale-105 transition-transform">
        <img src={asset("/logo.png")} alt="NEXORA Logo" className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(117,87,255,0.35)]" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-violet-primary bg-violet-light px-3.5 py-1 rounded-full border border-violet-soft/40 mb-4">
        HTTP 404 • Resource Not Found
      </span>

      <h1 className="text-5xl sm:text-7xl font-bold font-heritage tracking-tight text-[#111111] mb-4">
        Page Lost in Transit.
      </h1>

      <p className="text-base sm:text-lg text-[#3f3f4c] font-medium max-w-md mx-auto mb-8 leading-relaxed">
        The route or resource you requested does not exist on the Nexora Edge Gateway or has been moved to a new cluster partition.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button variant="violet" size="lg" className="shadow-md gap-2 font-bold">
            <Home className="w-4 h-4" />
            Return to Homepage
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="secondary" size="lg" className="gap-2 font-semibold">
            <Terminal className="w-4 h-4 text-secondary" />
            Open Live Console
          </Button>
        </Link>
      </div>
    </div>
  );
}

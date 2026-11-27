"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCw, Home, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Detect ChunkLoadError caused by server restarts or hot-reloading cache mismatch
    const isChunkError =
      error.name === "ChunkLoadError" ||
      error.message?.includes("Loading chunk") ||
      error.message?.includes("failed to fetch") ||
      error.message?.includes("dynamically imported module");

    if (isChunkError && typeof window !== "undefined") {
      const lastReload = sessionStorage.getItem("nexora_chunk_reload_ts");
      const now = Date.now();
      // Auto-reload once if not reloaded within the last 8 seconds
      if (!lastReload || now - parseInt(lastReload, 10) > 8000) {
        sessionStorage.setItem("nexora_chunk_reload_ts", now.toString());
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 relative overflow-hidden text-center bg-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-hero-glow blur-3xl pointer-events-none -z-10" />

      <div className="w-14 h-14 rounded-2xl bg-violet-light border border-violet-soft/40 flex items-center justify-center text-violet-primary mb-5 shadow-subtle">
        <AlertCircle className="w-7 h-7" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-violet-primary bg-violet-light px-3.5 py-1 rounded-full border border-violet-soft/40 mb-3">
        System Notice
      </span>

      <h1 className="text-3xl sm:text-5xl font-bold font-heritage tracking-tight text-[#111111] mb-3">
        Client Route Sync in Progress
      </h1>

      <p className="text-sm sm:text-base text-[#3f3f4c] font-medium max-w-md mx-auto mb-8 leading-relaxed">
        The application received an updated bundle from the development server. Refresh to sync your browser with the latest compiled assets.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="violet"
          size="lg"
          onClick={() => window.location.reload()}
          className="shadow-md gap-2 font-bold"
        >
          <RotateCw className="w-4 h-4" />
          Reload Route
        </Button>
        <Button href="/" variant="secondary" size="lg" className="gap-2 font-semibold">
          <Home className="w-4 h-4 text-secondary" />
          Return Home
        </Button>
      </div>
    </div>
  );
}

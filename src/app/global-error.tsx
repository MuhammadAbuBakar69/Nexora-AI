"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const isChunkError =
      error.name === "ChunkLoadError" ||
      error.message?.includes("Loading chunk") ||
      error.message?.includes("failed to fetch") ||
      error.message?.includes("dynamically imported module");

    if (isChunkError && typeof window !== "undefined") {
      const lastReload = sessionStorage.getItem("nexora_chunk_reload_ts");
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 8000) {
        sessionStorage.setItem("nexora_chunk_reload_ts", now.toString());
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans antialiased text-[#111111]">
        <div className="w-14 h-14 rounded-2xl bg-[#F7F7FA] border border-[#ECECF1] flex items-center justify-center text-[#7557FF] mb-5">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Application Update Detected
        </h1>
        <p className="text-sm text-[#777783] max-w-sm mb-6">
          A new version of the application has been built. Please reload to sync the latest components.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#7557FF] text-white text-sm font-semibold hover:bg-[#6342FF] transition-all shadow-md"
        >
          <RotateCw className="w-4 h-4" />
          Reload Page
        </button>
      </body>
    </html>
  );
}

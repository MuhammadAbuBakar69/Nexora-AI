"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { HardDrive, Plus, Database, Shield, Lock, Server } from "lucide-react";

export default function CloudStoragePage() {
  const [buckets, setBuckets] = useState<any[]>([]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <DashboardHeader
        title="Encrypted Vector &amp; Cloud Storage"
        subtitle="Manage provisioned object storage vaults, cache pools, and encrypted artifacts"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* CAD Telemetry Marker */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase px-1">
          <span>// STORAGE VAULT • DWG: STRG-ENC-01</span>
          <span>ENCRYPTION: AES-256-GCM HARDWARE MESH</span>
        </div>

        {/* Core Storage Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white border border-[#E2E2DA] relative">
            <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
            <div className="flex items-center justify-between text-[#777783] text-xs font-mono uppercase mb-2">
              <span>Total Provisioned</span>
              <HardDrive className="w-4 h-4 text-violet-primary" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-[#111111]">
              0.0 GB
            </div>
            <p className="text-[11px] text-[#777783] font-mono mt-1">
              On-demand vector storage
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E2E2DA] relative">
            <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
            <div className="flex items-center justify-between text-[#777783] text-xs font-mono uppercase mb-2">
              <span>Encrypted Objects</span>
              <Database className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-[#111111]">
              0
            </div>
            <p className="text-[11px] text-[#777783] font-mono mt-1">
              Active cached vectors
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E2E2DA] relative">
            <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
            <div className="flex items-center justify-between text-[#777783] text-xs font-mono uppercase mb-2">
              <span>Storage Security</span>
              <Shield className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-mono font-extrabold text-emerald-700">
              AES-256
            </div>
            <p className="text-[11px] text-[#777783] font-mono mt-1">
              Hardware key isolation
            </p>
          </div>
        </div>

        {/* Clean Zero-State Buckets List */}
        <div className="bg-white border border-[#E2E2DA] p-8 text-center flex flex-col items-center justify-center relative">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <div className="w-12 h-12 bg-[#F6F6F3] border border-[#E2E2DA] flex items-center justify-center text-[#777783] mb-3">
            <Server className="w-6 h-6 text-[#888892]" />
          </div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
            No Storage Buckets Provisioned
          </h3>
          <p className="text-xs text-[#777783] max-w-md mt-1 mb-5 leading-relaxed font-mono">
            Storage vaults for vector embeddings and model cache are automatically provisioned when utilizing the Nexora Vector Cache API or requested via your account manager.
          </p>
        </div>
      </div>
    </div>
  );
}

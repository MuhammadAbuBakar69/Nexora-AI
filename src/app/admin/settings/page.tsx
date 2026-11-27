"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, Bell, Server, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [rateLimitCeiling, setRateLimitCeiling] = useState("5000");
  const [defaultTokens, setDefaultTokens] = useState("50000000");
  const [saved, setSaved] = useState(false);
  const [rotated, setRotated] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRotate = () => {
    setRotated(true);
    setTimeout(() => setRotated(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <AdminHeader
        title="Superadmin Infrastructure Settings"
        subtitle="Global gateway policies, default provisioning quotas, and edge failover configurations"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl">
        <div className="bg-white border border-[#E2E2DA] p-6 sm:p-8 relative font-mono">
          <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <div className="pb-4 border-b border-[#E2E2DA] mb-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
              // Tenant Provisioning Baseline Parameters
            </h3>
            <p className="text-[11px] text-[#777783] mt-0.5">
              Default quota and rate ceilings applied to newly provisioned edge workspaces
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="defaultQuota"
                label="Baseline Starter Quota (Tokens)"
                type="number"
                value={defaultTokens}
                onChange={(e) => setDefaultTokens(e.target.value)}
                required
              />
              <Input
                id="maxRpm"
                label="Global Gateway Rate Limit (RPM)"
                type="number"
                value={rateLimitCeiling}
                onChange={(e) => setRateLimitCeiling(e.target.value)}
                required
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button type="submit" size="sm" className="text-xs font-bold uppercase tracking-wider">
                {saved ? "Saved Configuration ✓" : "Save Baseline Defaults"}
              </Button>
            </div>
          </form>
        </div>

        {/* Master Gateway Encryption Keys */}
        <div className="bg-white border border-[#E2E2DA] p-6 sm:p-8 relative font-mono">
          <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <div className="pb-4 border-b border-[#E2E2DA] mb-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
              // Cryptographic Key Rotation &amp; KMS
            </h3>
            <p className="text-[11px] text-[#777783] mt-0.5">
              Master keys used to sign transient edge tokens and hash credentials at rest
            </p>
          </div>

          {rotated && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-2 mb-4">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>KEY ROTATION COMPLETED: kms-nx-us-east4-2026-v3 deployed across all 32 Anycast PoPs.</span>
            </div>
          )}

          <div className="p-4 bg-[#F6F6F3] border border-[#E2E2DA] space-y-2 text-xs mb-4">
            <div className="flex justify-between">
              <span className="font-bold text-[#111111]">Active Signing KMS Key:</span>
              <span className="font-bold text-[#111111]">kms-nx-us-east4-2026-v2</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-[#111111]">Enforcement Cycle:</span>
              <span className="text-[#777783]">Automatic 90-day cryptographic cycle</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRotate}
            className="text-xs font-bold uppercase tracking-wider border-[#E2E2DA]"
          >
            Trigger Key Rotation
          </Button>
        </div>
      </div>
    </div>
  );
}

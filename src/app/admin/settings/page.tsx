"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Key, Bell, Server, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [rateLimitCeiling, setRateLimitCeiling] = useState("5000");
  const [defaultTokens, setDefaultTokens] = useState("50000000");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Superadmin Infrastructure Settings"
        subtitle="Global gateway policies, default provisioning quotas, and edge failover configurations"
        
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl">
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="pb-4 border-b border-border">
            <h3 className="text-base font-semibold text-foreground">
              Tenant Provisioning Defaults
            </h3>
            <p className="text-xs text-secondary">
              Default baseline parameters applied to newly registered workspaces
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="defaultQuota"
                label="Default Starter Token Quota"
                type="number"
                value={defaultTokens}
                onChange={(e) => setDefaultTokens(e.target.value)}
                required
              />
              <Input
                id="maxRpm"
                label="Maximum Gateway Rate Limit (RPM)"
                type="number"
                value={rateLimitCeiling}
                onChange={(e) => setRateLimitCeiling(e.target.value)}
                required
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button type="submit" size="sm" className="text-xs">
                {saved ? "Saved Global Defaults ✓" : "Save Global Defaults"}
              </Button>
            </div>
          </form>
        </div>

        {/* Master Gateway Encryption Keys */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-subtle space-y-4">
          <div className="pb-4 border-b border-border">
            <h3 className="text-base font-semibold text-foreground">
              Master Gateway Key Rotation
            </h3>
            <p className="text-xs text-secondary">
              Cryptographic keys used to sign transient edge tokens and encrypt secrets at rest
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Active Signing Key:</span>
              <span className="font-mono text-secondary">kms-nx-us-east4-2026-v2</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Last Rotated:</span>
              <span className="text-secondary">October 1, 2026 (Automatic 90-day cycle)</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => alert("Simulated master key rotation scheduled.")}
            className="text-xs"
          >
            Trigger Key Rotation
          </Button>
        </div>
      </div>
    </div>
  );
}

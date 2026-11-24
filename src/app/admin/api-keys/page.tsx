"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { mockCustomerApiKeys, mockCustomersList } from "@/data/mock-data";
import { ApiKey } from "@/types";
import { Key, Plus, ShieldCheck, Trash2, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminApiManagementPage() {
  const [keys, setKeys] = useState<(ApiKey & { tenantName: string })[]>([
    { ...mockCustomerApiKeys[0], tenantName: "Aether Dynamics Inc." },
    { ...mockCustomerApiKeys[1], tenantName: "Cognitive Synthetics" },
    { ...mockCustomerApiKeys[2], tenantName: "NeuralPulse Labs" },
    { ...mockCustomerApiKeys[3], tenantName: "HyperScale Vector" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(mockCustomersList[0].company);
  const [keyName, setKeyName] = useState("");
  const [rateLimit, setRateLimit] = useState("2500");

  const handleGenerateForTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName) return;

    const randomHex = Math.random().toString(36).substring(2, 8);
    const newKey: ApiKey & { tenantName: string } = {
      id: `key_${Date.now()}`,
      name: keyName,
      prefix: `nx_live_${randomHex}`,
      maskedKey: `nx_live_${randomHex}••••••••••••••••88`,
      permissions: ["read", "write", "models:chat"],
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
      status: "active",
      rateLimitRpm: parseInt(rateLimit, 10) || 1500,
      totalRequests: 0,
      tenantName: selectedTenant,
    };

    setKeys([newKey, ...keys]);
    setIsModalOpen(false);
    setKeyName("");
  };

  const handleRevoke = (id: string) => {
    if (confirm("Revoke this tenant API credential immediately?")) {
      setKeys(
        keys.map((k) => (k.id === id ? { ...k, status: "revoked" as const } : k))
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Gateway API Credential Provisioning"
        subtitle="Manage active customer keys, enforce rate limits, and execute emergency revocations"
        
        actionButton={
          <Button
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="gap-1.5 text-xs bg-violet-primary hover:bg-violet-dark text-white"
          >
            <Plus className="w-3.5 h-3.5" />
            Provision Tenant Key
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-subtle">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Tenant Gateway Credentials ({keys.length})
            </h3>
            <span className="text-xs text-secondary">
              Centralized Secret Store
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface/50 border-b border-border text-secondary">
                <tr>
                  <th className="py-3 px-6 font-semibold">Tenant Organization</th>
                  <th className="py-3 px-6 font-semibold">Key Identifier</th>
                  <th className="py-3 px-6 font-semibold">Masked Hash</th>
                  <th className="py-3 px-6 font-semibold">Rate Limit</th>
                  <th className="py-3 px-6 font-semibold">Created</th>
                  <th className="py-3 px-6 font-semibold">Status</th>
                  <th className="py-3 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {keys.map((k) => (
                  <tr key={k.id} className="hover:bg-surface/30">
                    <td className="py-4 px-6 font-semibold text-foreground">
                      {k.tenantName}
                    </td>
                    <td className="py-4 px-6 text-secondary">{k.name}</td>
                    <td className="py-4 px-6 font-mono text-secondary">{k.maskedKey}</td>
                    <td className="py-4 px-6 text-secondary">{k.rateLimitRpm} RPM</td>
                    <td className="py-4 px-6 text-secondary">{formatDate(k.createdAt)}</td>
                    <td className="py-4 px-6">
                      <Badge variant={k.status === "active" ? "success" : "danger"} size="sm">
                        {k.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {k.status === "active" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRevoke(k.id)}
                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-[11px] h-7"
                        >
                          Revoke Key
                        </Button>
                      ) : (
                        <span className="text-secondary/50 italic text-[11px]">Revoked</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Provision Key for Customer Tenant"
        description="Issue a new gateway credential with tenant-level rate ceiling and permission scopes."
      >
        <form onSubmit={handleGenerateForTenant} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-foreground tracking-wide">
              Assign to Tenant Organization
            </label>
            <select
              value={selectedTenant}
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="w-full rounded-xl bg-surface border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-violet-primary"
            >
              {mockCustomersList.map((c) => (
                <option key={c.id} value={c.company}>
                  {c.company} ({c.name})
                </option>
              ))}
            </select>
          </div>

          <Input
            id="adminKeyName"
            label="Key Identifier"
            placeholder="e.g. Primary Production Gateway"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            required
            autoFocus
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-foreground tracking-wide">
              Rate Limit (RPM)
            </label>
            <Input
              id="adminRpm"
              type="number"
              value={rateLimit}
              onChange={(e) => setRateLimit(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-border mt-4">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Generate & Assign
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

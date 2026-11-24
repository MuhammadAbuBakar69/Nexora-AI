"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ApiKeyModal } from "@/components/dashboard/api-key-modal";
import { mockCustomerApiKeys } from "@/data/mock-data";
import { ApiKey } from "@/types";
import { formatDate } from "@/lib/utils";
import { Plus, Key, Copy, Check, Trash2, Shield, AlertCircle } from "lucide-react";

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(mockCustomerApiKeys);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleKeyCreated = (newKey: ApiKey) => {
    setKeys([newKey, ...keys]);
  };

  const handleRevoke = (id: string) => {
    if (confirm("Are you sure you want to revoke this API key? This action is immediate and cannot be undone.")) {
      setKeys(
        keys.map((k) => (k.id === id ? { ...k, status: "revoked" as const } : k))
      );
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="API Credentials Management"
        subtitle="Provision, rotate, and revoke customer keys for the Nexora Gateway"
        
        actionButton={
          <Button size="sm" onClick={() => setIsModalOpen(true)} className="gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" />
            Create API Key
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Security Warning Notice */}
        <div className="p-4 rounded-2xl bg-white border border-border flex items-start gap-3.5 shadow-subtle">
          <div className="w-8 h-8 rounded-xl bg-violet-light text-violet-primary flex items-center justify-center shrink-0 mt-0.5">
            <Shield className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <h4 className="font-semibold text-foreground">API Security Standard</h4>
            <p className="text-secondary mt-0.5 leading-relaxed">
              Your secret keys are hashed using industry-standard salted SHA-256. Raw secrets are revealed only once upon creation. Never commit API keys to version control repositories.
            </p>
          </div>
        </div>

        {/* Keys Table Container */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-subtle">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Configured Keys ({keys.length})
            </h3>
            <span className="text-xs text-secondary">
              {keys.filter((k) => k.status === "active").length} active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface/50 border-b border-border text-secondary">
                <tr>
                  <th className="py-3 px-6 font-semibold">Key Name</th>
                  <th className="py-3 px-6 font-semibold">Masked Secret</th>
                  <th className="py-3 px-6 font-semibold">Permissions</th>
                  <th className="py-3 px-6 font-semibold">Rate Limit</th>
                  <th className="py-3 px-6 font-semibold">Created</th>
                  <th className="py-3 px-6 font-semibold">Status</th>
                  <th className="py-3 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {keys.map((key) => (
                  <tr key={key.id} className="hover:bg-surface/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <Key className="w-3.5 h-3.5 text-secondary" />
                        <span>{key.name}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-secondary">
                      <div className="flex items-center gap-2">
                        <span>{key.maskedKey}</span>
                        <button
                          onClick={() => handleCopy(key.id, key.maskedKey)}
                          className="p-1 hover:text-foreground text-secondary/60 transition-colors"
                          title="Copy masked identifier"
                        >
                          {copiedId === key.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {key.permissions.map((perm) => (
                          <span
                            key={perm}
                            className="text-[10px] bg-surface border border-border px-1.5 py-0.5 rounded text-secondary"
                          >
                            {perm}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-secondary">{key.rateLimitRpm} RPM</td>

                    <td className="py-4 px-6 text-secondary">{formatDate(key.createdAt)}</td>

                    <td className="py-4 px-6">
                      <Badge
                        variant={
                          key.status === "active"
                            ? "success"
                            : key.status === "revoked"
                            ? "danger"
                            : "default"
                        }
                        size="sm"
                      >
                        {key.status}
                      </Badge>
                    </td>

                    <td className="py-4 px-6 text-right">
                      {key.status === "active" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRevoke(key.id)}
                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-[11px] h-7 px-2.5"
                        >
                          Revoke
                        </Button>
                      ) : (
                        <span className="text-[11px] text-secondary/50 italic">Revoked</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onKeyCreated={handleKeyCreated}
      />
    </div>
  );
}

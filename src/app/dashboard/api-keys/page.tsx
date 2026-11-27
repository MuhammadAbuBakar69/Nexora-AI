"use client";

import React, { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ApiKeyModal } from "@/components/dashboard/api-key-modal";
import { ApiKey } from "@/types";
import { formatDate } from "@/lib/utils";
import { Plus, Key, Copy, Check, Trash2, Shield, AlertCircle, ShieldCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadKeys() {
      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from("api_keys")
            .select("*")
            .order("created_at", { ascending: false });

          if (data && data.length > 0) {
            setKeys(
              data.map((k) => ({
                id: k.id,
                name: k.name,
                prefix: k.prefix,
                maskedKey: `${k.prefix}••••••••••••••••${k.last_four}`,
                permissions: k.permissions || [],
                createdAt: k.created_at,
                lastUsedAt: k.last_used_at,
                status: k.status,
                rateLimitRpm: k.rate_limit_rpm,
                totalRequests: 0,
              }))
            );
          } else {
            setKeys([]);
          }
        }
      } catch (err) {
        setKeys([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadKeys();
  }, []);

  const handleKeyCreated = (newKey: ApiKey) => {
    setKeys([newKey, ...keys]);
  };

  const handleRevoke = async (id: string) => {
    if (confirm("Are you sure you want to revoke this API key? This action is immediate and cannot be undone.")) {
      try {
        const supabase = createClient();
        // Update status in database
        await supabase
          .from("api_keys")
          .update({ status: "revoked", updated_at: new Date().toISOString() })
          .eq("id", id);

        setKeys(
          keys.map((k) => (k.id === id ? { ...k, status: "revoked" as const } : k))
        );
      } catch (err) {
        // Optimistic UI update
        setKeys(
          keys.map((k) => (k.id === id ? { ...k, status: "revoked" as const } : k))
        );
      }
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <DashboardHeader
        title="API Credentials Management"
        subtitle="Provision, rotate, and revoke customer keys for the Nexora Gateway"
        actionButton={
          <Button size="sm" onClick={() => setIsModalOpen(true)} className="gap-1.5 text-xs font-bold uppercase tracking-wider">
            <Plus className="w-3.5 h-3.5" />
            Create API Key
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Security Standard Blueprint Notice */}
        <div className="p-4 bg-white border border-[#E2E2DA] flex items-start gap-3.5">
          <div className="w-8 h-8 bg-violet-light/60 border border-violet-soft/30 text-violet-primary flex items-center justify-center shrink-0 mt-0.5">
            <Shield className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-[#111111] uppercase tracking-wide">
              Edge Security Standard &amp; Key Governance
            </h4>
            <p className="text-[#555562] mt-0.5 leading-relaxed">
              Your secret keys are hashed using salted SHA-256 before storage. Raw secrets are revealed strictly once upon creation. Never commit credentials to version control.
            </p>
          </div>
        </div>

        {/* API Keys Table or Clean Production Zero-State */}
        <div className="bg-white border border-[#E2E2DA] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E2E2DA] bg-[#F2F2EE] flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              Provisioned Keys ({keys.length})
            </span>
            <span className="text-[10px] font-mono text-[#777783] uppercase">
              ENCRYPTION: SHA-256 SALTED HASH
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-xs font-mono text-[#777783]">
              Loading edge credentials from database...
            </div>
          ) : keys.length === 0 ? (
            <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-[#F6F6F3] border border-[#E2E2DA] flex items-center justify-center text-[#777783] mb-3">
                <Key className="w-6 h-6 text-[#888892]" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wide">
                No API Credentials Provisioned Yet
              </h3>
              <p className="text-xs text-[#777783] max-w-md mt-1 mb-6 leading-relaxed">
                Generate an API key to connect your application to Gemini, Veo, Claude, and GPT models via the Nexora Anycast Edge Router.
              </p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-bold uppercase tracking-wider gap-2 px-5 py-2.5"
              >
                <Plus className="w-4 h-4" />
                Provision Your First API Key
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F7F4] border-b border-[#E2E2DA] text-[10px] font-mono uppercase text-[#777783]">
                  <tr>
                    <th className="py-3 px-6 font-semibold">Key Identifier</th>
                    <th className="py-3 px-6 font-semibold">Key Prefix</th>
                    <th className="py-3 px-6 font-semibold">Permissions</th>
                    <th className="py-3 px-6 font-semibold">Rate Limit</th>
                    <th className="py-3 px-6 font-semibold">Created</th>
                    <th className="py-3 px-6 font-semibold">Status</th>
                    <th className="py-3 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DA]">
                  {keys.map((key) => (
                    <tr key={key.id} className="hover:bg-[#F9F9F7] transition-colors">
                      <td className="py-3.5 px-6 font-bold text-[#111111]">
                        {key.name}
                      </td>
                      <td className="py-3.5 px-6 font-mono text-[11px] text-[#555562]">
                        <span className="px-2 py-0.5 bg-[#F6F6F3] border border-[#E2E2DA]">
                          {key.maskedKey}
                        </span>
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="flex flex-wrap gap-1">
                          {key.permissions.slice(0, 2).map((perm) => (
                            <span key={perm} className="px-1.5 py-0.5 text-[9px] font-mono bg-violet-light/50 text-violet-primary border border-violet-soft/30">
                              {perm}
                            </span>
                          ))}
                          {key.permissions.length > 2 && (
                            <span className="text-[10px] text-[#777783]">
                              +{key.permissions.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-6 font-mono text-[11px] text-[#111111]">
                        {key.rateLimitRpm} RPM
                      </td>
                      <td className="py-3.5 px-6 text-[#777783] text-[11px] font-mono">
                        {formatDate(key.createdAt)}
                      </td>
                      <td className="py-3.5 px-6">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                            key.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {key.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        {key.status === "active" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevoke(key.id)}
                            className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-7 px-2.5 font-bold"
                          >
                            Revoke
                          </Button>
                        ) : (
                          <span className="text-[11px] font-mono text-[#888892] italic">
                            Revoked
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

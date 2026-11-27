"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { ApiKey } from "@/types";
import { Key, Plus, ShieldCheck, Trash2, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminApiManagementPage() {
  const [keys, setKeys] = useState<(ApiKey & { tenantName: string })[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [rateLimit, setRateLimit] = useState("2500");

  useEffect(() => {
    async function loadAllKeys() {
      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data: dbKeys } = await supabase
          .from("api_keys")
          .select("*, organizations(name)")
          .order("created_at", { ascending: false });

        if (dbKeys && dbKeys.length > 0) {
          setKeys(
            dbKeys.map((k) => ({
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
              tenantName: k.organizations?.name || "Global Workspace",
            }))
          );
        } else {
          setKeys([]);
        }
      } catch (err) {
        // Safe fallback
      } finally {
        setIsLoading(false);
      }
    }

    loadAllKeys();
  }, []);

  const handleRevokeKey = async (id: string) => {
    try {
      const supabase = createClient();
      await supabase.from("api_keys").update({ status: "revoked" }).eq("id", id);
      setKeys(keys.map((k) => (k.id === id ? { ...k, status: "revoked" } : k)));
    } catch (err) {
      // Safe fallback
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <AdminHeader
        title="Edge API Credentials &amp; Rate Governance"
        subtitle="Manage global routing keys, rate ceilings, SHA-256 validation hashes, and revocations"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Security Notice */}
        <div className="p-4 bg-white border border-[#E2E2DA] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-[#111111] uppercase tracking-wider block">
                // HARDENED CRYPTOGRAPHIC STORAGE ENFORCED
              </span>
              <p className="text-[11px] text-[#777783] mt-0.5">
                Secret keys are hashed with SHA-256 upon generation. Edge gateway validates signatures at layer 7.
              </p>
            </div>
          </div>
          <Badge variant="success" size="sm">
            TLS 1.3 / E2E
          </Badge>
        </div>

        {/* Global Keys Table */}
        <div className="bg-white border border-[#E2E2DA] relative">
          <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <div className="px-6 py-4 border-b border-[#E2E2DA] flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
              // Active Credentials ({keys.length})
            </h3>
            <span className="text-[10px] font-mono text-[#777783] uppercase">
              ANYCAST EDGE ROUTING
            </span>
          </div>

          <div className="overflow-x-auto">
            {keys.length === 0 ? (
              <div className="py-12 text-center font-mono">
                <p className="text-xs text-[#777783] uppercase tracking-wider">
                  No active API keys found in directory
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#F6F6F3] border-b border-[#E2E2DA] text-[#777783] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-6 font-bold">Key Identifier</th>
                    <th className="py-3 px-6 font-bold">Tenant Workspace</th>
                    <th className="py-3 px-6 font-bold">Masked Fingerprint</th>
                    <th className="py-3 px-6 font-bold">Rate Ceiling</th>
                    <th className="py-3 px-6 font-bold">Status</th>
                    <th className="py-3 px-6 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DA]">
                  {keys.map((k) => (
                    <tr key={k.id} className="hover:bg-[#F6F6F3]/50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Key className="w-3.5 h-3.5 text-[#777783]" />
                          <span className="font-bold text-[#111111]">{k.name}</span>
                        </div>
                        <span className="text-[10px] text-[#777783] block mt-0.5">
                          Created {formatDate(k.createdAt)}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#111111]">{k.tenantName}</td>
                      <td className="py-4 px-6 text-[#777783]">{k.maskedKey}</td>
                      <td className="py-4 px-6 text-[#111111] font-bold">{k.rateLimitRpm} RPM</td>
                      <td className="py-4 px-6">
                        <Badge variant={k.status === "active" ? "success" : "danger"} size="sm">
                          {k.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {k.status === "active" && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRevokeKey(k.id)}
                            className="text-[10px] h-7 px-2.5"
                          >
                            Revoke
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

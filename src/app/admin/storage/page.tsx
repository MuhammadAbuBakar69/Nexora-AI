"use client";

import React from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HardDrive, Server, Shield, Database, Plus } from "lucide-react";
import { formatBytes } from "@/lib/utils";

export default function AdminStoragePage() {
  const buckets = [
    {
      id: "bkt-vector-01",
      name: "nx-vector-embeddings-prod",
      bucketType: "Vector Embeddings & Cache",
      region: "us-central1 (Iowa)",
      capacity: 50 * 1024 * 1024 * 1024 * 1024,
      used: 0,
      encryption: "AES-256 GCM",
      status: "ACTIVE",
    },
    {
      id: "bkt-multimodal-02",
      name: "nx-multimodal-artifacts-prod",
      bucketType: "Veo & Vision Frame Store",
      region: "us-east4 (N. Virginia)",
      capacity: 100 * 1024 * 1024 * 1024 * 1024,
      used: 0,
      encryption: "AES-256 GCM",
      status: "ACTIVE",
    },
    {
      id: "bkt-telemetry-03",
      name: "nx-edge-telemetry-cold",
      bucketType: "Forensic Audit Ledger",
      region: "eu-west1 (Belgium)",
      capacity: 25 * 1024 * 1024 * 1024 * 1024,
      used: 0,
      encryption: "AES-256 GCM",
      status: "ACTIVE",
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <AdminHeader
        title="Fleet Cloud Storage Infrastructure"
        subtitle="Global vector storage pools, multi-region replication nodes, and data isolation"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Provisioned Storage Pool"
            value="175 TB"
            subtitle="Global vector pool allocation"
            icon={<HardDrive className="w-4 h-4 text-violet-primary" />}
          />
          <StatCard
            title="Zero Data Retention"
            value="ENFORCED"
            subtitle="Transient inference pass-through"
            icon={<Shield className="w-4 h-4 text-emerald-600" />}
          />
          <StatCard
            title="Encrypted Buckets"
            value="3"
            subtitle="AES-256 tenant-isolated partitions"
            icon={<Database className="w-4 h-4 text-indigo-600" />}
          />
        </div>

        {/* Global Storage Pools Table */}
        <div className="bg-white border border-[#E2E2DA] relative">
          <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <div className="px-6 py-4 border-b border-[#E2E2DA] flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
              // Core Multi-Tenant Storage Partitions
            </h3>
            <span className="text-[10px] font-mono text-[#777783] uppercase">
              CROSS-REGION REPLICATED
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F6F6F3] border-b border-[#E2E2DA] text-[#777783] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-6 font-bold">Bucket Identifier</th>
                  <th className="py-3 px-6 font-bold">Class</th>
                  <th className="py-3 px-6 font-bold">Region Node</th>
                  <th className="py-3 px-6 font-bold">Capacity</th>
                  <th className="py-3 px-6 font-bold">Encryption</th>
                  <th className="py-3 px-6 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E2DA]">
                {buckets.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F6F6F3]/50">
                    <td className="py-4 px-6 font-bold text-[#111111]">
                      <div className="flex items-center gap-2">
                        <Server className="w-3.5 h-3.5 text-[#777783]" />
                        <span>{b.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#777783]">{b.bucketType}</td>
                    <td className="py-4 px-6 text-[#777783]">{b.region}</td>
                    <td className="py-4 px-6 text-[#111111] font-bold">{formatBytes(b.capacity)}</td>
                    <td className="py-4 px-6 text-emerald-700 font-bold">{b.encryption}</td>
                    <td className="py-4 px-6">
                      <Badge variant="success" size="sm">
                        {b.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

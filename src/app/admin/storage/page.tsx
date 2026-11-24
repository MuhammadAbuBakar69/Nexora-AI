"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockCloudStorage, mockCustomersList } from "@/data/mock-data";
import { HardDrive, Server, Shield, Database, Plus } from "lucide-react";
import { formatBytes } from "@/lib/utils";

export default function AdminStoragePage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Fleet Cloud Storage Infrastructure"
        subtitle="Global vector storage pools, multi-region replication nodes, and data isolation"
        
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Total Provisioned Storage"
            value="45,000 GB"
            subtitle="45 TB fleet pool allocation"
            icon={<HardDrive className="w-4 h-4 text-violet-primary" />}
            variant="violet"
          />
          <StatCard
            title="Global Used Storage"
            value="28,410 GB"
            subtitle="63.1% fleet utilization"
            icon={<Database className="w-4 h-4 text-indigo-600" />}
          />
          <StatCard
            title="Encrypted Buckets"
            value="142"
            subtitle="AES-256 tenant-isolated partitions"
            icon={<Shield className="w-4 h-4 text-emerald-600" />}
          />
        </div>

        {/* Global Storage Pools Table */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-subtle">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Core Multi-Tenant Storage Partitions
            </h3>
            <span className="text-xs text-secondary">
              Cross-Region Replicated
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface/50 border-b border-border text-secondary">
                <tr>
                  <th className="py-3 px-6 font-semibold">Bucket Pool</th>
                  <th className="py-3 px-6 font-semibold">Tier Class</th>
                  <th className="py-3 px-6 font-semibold">Region Node</th>
                  <th className="py-3 px-6 font-semibold">Total Capacity</th>
                  <th className="py-3 px-6 font-semibold">Consumed</th>
                  <th className="py-3 px-6 font-semibold">Encryption</th>
                  <th className="py-3 px-6 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {mockCloudStorage.map((b) => (
                  <tr key={b.id} className="hover:bg-surface/30">
                    <td className="py-4 px-6 font-mono font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <Server className="w-3.5 h-3.5 text-secondary" />
                        <span>{b.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-secondary">{b.bucketType}</td>
                    <td className="py-4 px-6 text-secondary">{b.region}</td>
                    <td className="py-4 px-6 font-mono text-secondary">{formatBytes(b.totalCapacityBytes)}</td>
                    <td className="py-4 px-6 font-mono font-medium text-foreground">{formatBytes(b.usedBytes)}</td>
                    <td className="py-4 px-6 text-emerald-600 font-medium">AES-256 GCM</td>
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

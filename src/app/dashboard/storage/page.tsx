"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { mockCloudStorage } from "@/data/mock-data";
import { CloudStorageResource } from "@/types";
import { formatBytes, formatDate } from "@/lib/utils";
import { HardDrive, Plus, Database, Shield, Lock, Info, Server } from "lucide-react";

export default function CloudStoragePage() {
  const [buckets, setBuckets] = useState<CloudStorageResource[]>(mockCloudStorage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bucketName, setBucketName] = useState("");
  const [region, setRegion] = useState("us-east4");

  const totalCapacityBytes = buckets.reduce((acc, b) => acc + b.totalCapacityBytes, 0);
  const totalUsedBytes = buckets.reduce((acc, b) => acc + b.usedBytes, 0);
  const remainingBytes = totalCapacityBytes - totalUsedBytes;
  const usedPercentage = ((totalUsedBytes / totalCapacityBytes) * 100).toFixed(1);

  const handleCreateBucket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bucketName) return;

    const newBucket: CloudStorageResource = {
      id: `bucket_${Date.now()}`,
      name: bucketName.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      bucketType: "Standard",
      region: region,
      totalCapacityBytes: 250 * 1024 * 1024 * 1024,
      usedBytes: 0,
      objectsCount: 0,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    setBuckets([newBucket, ...buckets]);
    setBucketName("");
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="Cloud Storage Management"
        subtitle="Manage vector artifact buckets, prompt cache, and fine-tuning datasets"
        
        actionButton={
          <Button size="sm" onClick={() => setIsModalOpen(true)} className="gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" />
            Attach Storage Bucket
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Illustrative Notice Banner */}
        <div className="p-4 rounded-2xl bg-white border border-border flex items-start gap-3 shadow-subtle">
          <Info className="w-4 h-4 text-violet-primary shrink-0 mt-0.5" />
          <div className="text-xs text-secondary leading-relaxed">
            <span className="font-semibold text-foreground">Storage Virtualization Mode:</span> Buckets below illustrate attached storage partitions for vector caching, fine-tuning datasets, and audit vaults. Multi-cloud encryption (AES-256 GCM) is enabled.
          </div>
        </div>

        {/* 3 Capacity Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Total Allocated Storage"
            value={formatBytes(totalCapacityBytes)}
            subtitle="Provisioned multi-region capacity"
            icon={<HardDrive className="w-4 h-4 text-violet-primary" />}
            variant="violet"
          />
          <StatCard
            title="Storage Consumed"
            value={formatBytes(totalUsedBytes)}
            subtitle={`${usedPercentage}% overall utilization`}
            icon={<Database className="w-4 h-4 text-indigo-600" />}
          />
          <StatCard
            title="Remaining Free Storage"
            value={formatBytes(remainingBytes)}
            subtitle="Available for vector embeddings"
            icon={<Shield className="w-4 h-4 text-emerald-600" />}
          />
        </div>

        {/* Storage Bar Overview */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-subtle space-y-3">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-foreground">Global Storage Footprint</span>
            <span className="text-secondary">{formatBytes(totalUsedBytes)} of {formatBytes(totalCapacityBytes)} used</span>
          </div>
          <div className="w-full bg-border rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-primary via-violet-soft to-blue-soft h-full rounded-full transition-all duration-500"
              style={{ width: `${usedPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-secondary pt-1">
            <span>Primary: us-east4 (N. Virginia)</span>
            <span>Secondary: eu-west1 (Belgium)</span>
            <span>Coldline: us-central1 (Iowa)</span>
          </div>
        </div>

        {/* Buckets Table */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-subtle">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Configured Storage Buckets ({buckets.length})
            </h3>
            <span className="text-xs text-secondary font-mono">
              Encryption: AES-256
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface/50 border-b border-border text-secondary">
                <tr>
                  <th className="py-3 px-6 font-semibold">Bucket Identifier</th>
                  <th className="py-3 px-6 font-semibold">Class</th>
                  <th className="py-3 px-6 font-semibold">Region</th>
                  <th className="py-3 px-6 font-semibold">Objects</th>
                  <th className="py-3 px-6 font-semibold">Utilization</th>
                  <th className="py-3 px-6 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {buckets.map((b) => {
                  const pct = ((b.usedBytes / b.totalCapacityBytes) * 100).toFixed(1);
                  return (
                    <tr key={b.id} className="hover:bg-surface/30">
                      <td className="py-4 px-6 font-mono font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <Server className="w-3.5 h-3.5 text-secondary" />
                          <span>{b.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-secondary">{b.bucketType}</td>
                      <td className="py-4 px-6 text-secondary">{b.region}</td>
                      <td className="py-4 px-6 font-mono text-secondary">
                        {b.objectsCount.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-secondary">
                            <span>{formatBytes(b.usedBytes)}</span>
                            <span>{pct}%</span>
                          </div>
                          <div className="w-24 bg-border rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-violet-primary h-full rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="success" size="sm">
                          {b.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Attach Bucket Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Attach Storage Bucket"
        description="Provision an isolated encrypted partition for model cache or dataset training."
      >
        <form onSubmit={handleCreateBucket} className="space-y-4">
          <Input
            id="bucketName"
            label="Bucket Name"
            placeholder="e.g. nexora-vector-cache-west"
            value={bucketName}
            onChange={(e) => setBucketName(e.target.value)}
            required
            autoFocus
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-foreground tracking-wide">
              Target Cloud Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-xl bg-surface border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-violet-primary"
            >
              <option value="us-east4 (N. Virginia)">us-east4 (N. Virginia - Low Latency)</option>
              <option value="eu-west1 (Belgium)">eu-west1 (Belgium - GDPR Compliant)</option>
              <option value="us-central1 (Iowa)">us-central1 (Iowa)</option>
              <option value="ap-southeast1 (Singapore)">ap-southeast1 (Singapore)</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Provision Bucket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockAuditLogs } from "@/data/mock-data";
import { AuditLogItem } from "@/types";
import { Search, ShieldAlert, Download, FileText, CheckCircle2 } from "lucide-react";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>(mockAuditLogs);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "all" || log.type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Immutable Administrative Audit Log"
        subtitle="Forensic audit trail tracking privileged tenant, quota, and key lifecycle operations"
        
        actionButton={
          <Button
            size="sm"
            variant="outline"
            onClick={() => alert("Audit log report exported (CSV format).")}
            className="gap-1.5 text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Export Audit CSV
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Notice */}
        <div className="p-4 rounded-2xl bg-white border border-border flex items-center justify-between text-xs shadow-subtle">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-violet-primary" />
            <span className="text-secondary">
              Logs are cryptographically hashed and retained for 365 days in compliance with enterprise audit governance standards.
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Immutable Storage
          </span>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="w-full sm:w-80">
            <Input
              id="logSearch"
              placeholder="Search actions, targets, actors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center gap-2">
            {(["all", "keys", "quota", "account", "security"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase transition-all ${
                  typeFilter === t
                    ? "bg-[#100E20] text-white shadow-xs font-semibold"
                    : "bg-white text-secondary border border-border hover:border-violet-soft/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface/50 border-b border-border text-secondary">
                <tr>
                  <th className="py-3 px-6 font-semibold">Event Action</th>
                  <th className="py-3 px-6 font-semibold">Classification</th>
                  <th className="py-3 px-6 font-semibold">Target Entity</th>
                  <th className="py-3 px-6 font-semibold">Actor</th>
                  <th className="py-3 px-6 font-semibold">Source IP</th>
                  <th className="py-3 px-6 font-semibold text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface/30">
                    <td className="py-4 px-6 font-semibold text-foreground">
                      {log.action}
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        variant={
                          log.type === "quota"
                            ? "violet"
                            : log.type === "account"
                            ? "warning"
                            : "default"
                        }
                        size="sm"
                      >
                        {log.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-foreground">{log.target}</p>
                      <p className="text-secondary text-[11px] mt-0.5">{log.details}</p>
                    </td>
                    <td className="py-4 px-6 font-mono text-secondary">{log.actor}</td>
                    <td className="py-4 px-6 font-mono text-secondary">{log.ipAddress}</td>
                    <td className="py-4 px-6 text-right font-mono text-secondary">
                      {log.timestamp.replace("T", " ").replace("Z", "")}
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

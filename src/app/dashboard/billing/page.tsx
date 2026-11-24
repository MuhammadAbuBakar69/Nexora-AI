"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { mockInvoices } from "@/data/mock-data";
import { CreditCard, Download, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function BillingPage() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [invoices, setInvoices] = useState(mockInvoices);

  const handleSimulateDownload = (invoiceNumber: string) => {
    alert(`Downloading receipt for ${invoiceNumber} (PDF format)...`);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="Subscription & Billing"
        subtitle="Manage plan quotas, credit balance, payment instruments, and past invoices"
        
        actionButton={
          <Button size="sm" onClick={() => setIsUpgradeModalOpen(true)} className="gap-1.5 text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Change Plan
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Active Plan Overview Card */}
        <div className="bg-gradient-to-tr from-[#151329] to-[#100E20] text-white rounded-3xl p-6 sm:p-8 border border-surface-borderDark shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-primary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase font-semibold tracking-wider text-violet-soft">
                  Active Subscription
                </span>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.2 rounded-full font-semibold">
                  Good Standing
                </span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Growth Tier Plan
              </h2>
              <p className="text-xs text-white/70 mt-1 max-w-md">
                Includes 75,000,000 monthly tokens, up to 25 scoped keys, and multi-region failover.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-3xl font-bold tracking-tight text-white">$249.00</div>
              <p className="text-xs text-white/60">Billed monthly • Renews Dec 1, 2026</p>
              <Button
                size="sm"
                onClick={() => setIsUpgradeModalOpen(true)}
                className="mt-3 bg-white text-[#100E20] hover:bg-violet-light font-semibold text-xs"
              >
                Upgrade to Enterprise
              </Button>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Current Billing Cycle Spend"
            value="$128.45"
            subtitle="Tokens & compute charges"
            icon={<CreditCard className="w-4 h-4 text-violet-primary" />}
            variant="violet"
          />
          <StatCard
            title="Payment Method"
            value="Mastercard •••• 4242"
            subtitle="Expires 08/2028"
            icon={<ShieldCheck className="w-4 h-4 text-indigo-600" />}
          />
          <StatCard
            title="Next Invoice Date"
            value="Dec 1, 2026"
            subtitle="Estimated total: $249.00"
            icon={<CreditCard className="w-4 h-4 text-emerald-600" />}
          />
        </div>

        {/* Invoices List */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-subtle">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Billing History & Tax Receipts
            </h3>
            <span className="text-xs text-secondary">
              All transactions securely logged
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface/50 border-b border-border text-secondary">
                <tr>
                  <th className="py-3 px-6 font-semibold">Invoice Number</th>
                  <th className="py-3 px-6 font-semibold">Billing Date</th>
                  <th className="py-3 px-6 font-semibold">Tier Plan</th>
                  <th className="py-3 px-6 font-semibold">Amount</th>
                  <th className="py-3 px-6 font-semibold">Status</th>
                  <th className="py-3 px-6 font-semibold text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-surface/30">
                    <td className="py-4 px-6 font-mono font-medium text-foreground">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-4 px-6 text-secondary">{inv.date}</td>
                    <td className="py-4 px-6 text-secondary">{inv.plan}</td>
                    <td className="py-4 px-6 font-semibold text-foreground">
                      ${inv.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="success" size="sm">
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleSimulateDownload(inv.invoiceNumber)}
                        className="text-violet-primary hover:text-violet-dark inline-flex items-center gap-1 font-medium"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      <Modal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        title="Upgrade Your Workspace Plan"
        description="Select a subscription tier that fits your expanding AI engineering requirements."
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-violet-soft/50 bg-violet-light/30 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground text-sm">Enterprise Tier</span>
              <span className="font-bold text-violet-primary text-sm">Custom Quota</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Unlock multi-billion token allocations, dedicated VPC proxy routing, SOC2 Type II compliance reports, and 24/7 dedicated engineering support.
            </p>
          </div>

          <div className="p-3 bg-surface rounded-xl text-xs text-secondary leading-relaxed">
            * This is an illustrative SaaS billing interface. Plan upgrades in the demo environment are instant and require no payment card charge.
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button variant="outline" size="sm" onClick={() => setIsUpgradeModalOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                alert("Enterprise upgrade request submitted to your account manager.");
                setIsUpgradeModalOpen(false);
              }}
            >
              Confirm Upgrade Request
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

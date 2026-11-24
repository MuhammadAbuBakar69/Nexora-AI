"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CustomerModal } from "@/components/admin/customer-modal";
import { mockCustomersList } from "@/data/mock-data";
import { CustomerAccount } from "@/types";
import { Search, Plus, UserCheck, ShieldAlert, Edit2, Ban, CheckCircle2 } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerAccount[]>(mockCustomersList);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerAccount | null>(null);

  const handleSaveCustomer = (customerData: CustomerAccount) => {
    if (editingCustomer) {
      setCustomers(customers.map((c) => (c.id === customerData.id ? customerData : c)));
    } else {
      setCustomers([customerData, ...customers]);
    }
  };

  const toggleCustomerStatus = (id: string) => {
    setCustomers(
      customers.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === "active" ? "suspended" : "active";
          return { ...c, status: nextStatus as any };
        }
        return c;
      })
    );
  };

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesPlan = planFilter === "all" || c.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Tenant Customer Management"
        subtitle="Provision accounts, edit quotas, manage subscription tiers, and enforce access controls"
        
        actionButton={
          <Button
            size="sm"
            onClick={() => {
              setEditingCustomer(null);
              setIsModalOpen(true);
            }}
            className="gap-1.5 text-xs bg-violet-primary hover:bg-violet-dark text-white"
          >
            <Plus className="w-3.5 h-3.5" />
            New Customer
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-80">
            <Input
              id="customerSearch"
              placeholder="Search by company, name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl bg-white border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-violet-primary"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="suspended">Suspended Only</option>
            </select>

            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="rounded-xl bg-white border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-violet-primary"
            >
              <option value="all">All Plans</option>
              <option value="Starter">Starter</option>
              <option value="Growth">Growth</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-subtle">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Tenant Accounts ({filteredCustomers.length})
            </h3>
            <span className="text-xs text-secondary">
              Real-time directory sync
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface/50 border-b border-border text-secondary">
                <tr>
                  <th className="py-3 px-6 font-semibold">Tenant Organization</th>
                  <th className="py-3 px-6 font-semibold">Plan</th>
                  <th className="py-3 px-6 font-semibold">Token Quota</th>
                  <th className="py-3 px-6 font-semibold">Keys</th>
                  <th className="py-3 px-6 font-semibold">Monthly Spend</th>
                  <th className="py-3 px-6 font-semibold">Status</th>
                  <th className="py-3 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-surface/30">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-foreground">{c.company}</p>
                      <p className="text-secondary text-[11px] mt-0.5">
                        {c.name} • <span className="font-mono">{c.email}</span>
                      </p>
                    </td>

                    <td className="py-4 px-6">
                      <Badge variant={c.plan === "Enterprise" ? "violet" : "default"} size="sm">
                        {c.plan}
                      </Badge>
                    </td>

                    <td className="py-4 px-6 font-mono">
                      <div>
                        <span className="font-semibold text-foreground">
                          {(c.consumedTokens / 1_000_000).toFixed(1)}M
                        </span>
                        <span className="text-secondary text-[10px]">
                          {" "}
                          / {(c.allocatedTokens / 1_000_000).toFixed(0)}M
                        </span>
                      </div>
                      <div className="w-20 bg-border rounded-full h-1 mt-1 overflow-hidden">
                        <div
                          className="bg-violet-primary h-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (c.consumedTokens / c.allocatedTokens) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-secondary">
                      {c.activeApiKeysCount} active
                    </td>

                    <td className="py-4 px-6 font-semibold text-foreground">
                      ${c.monthlySpend}/mo
                    </td>

                    <td className="py-4 px-6">
                      <Badge variant={c.status === "active" ? "success" : "danger"} size="sm">
                        {c.status}
                      </Badge>
                    </td>

                    <td className="py-4 px-6 text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingCustomer(c);
                          setIsModalOpen(true);
                        }}
                        className="text-[11px] h-7 px-2"
                        title="Edit customer account"
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>

                      <Button
                        variant={c.status === "active" ? "danger" : "secondary"}
                        size="sm"
                        onClick={() => toggleCustomerStatus(c.id)}
                        className="text-[11px] h-7 px-2"
                        title={c.status === "active" ? "Suspend tenant" : "Reactivate tenant"}
                      >
                        {c.status === "active" ? <Ban className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCustomer}
        existingCustomer={editingCustomer}
      />
    </div>
  );
}

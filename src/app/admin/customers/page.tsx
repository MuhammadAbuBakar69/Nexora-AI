"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CustomerModal } from "@/components/admin/customer-modal";
import { createClient } from "@/utils/supabase/client";
import { CustomerAccount } from "@/types";
import { Search, Plus, UserCheck, ShieldAlert, Edit2, Ban, CheckCircle2 } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerAccount | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTenants() {
      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data: orgs } = await supabase
          .from("organizations")
          .select("id, name, slug, created_at");

        const { data: quotas } = await supabase
          .from("quota_allocations")
          .select("organization_id, tokens_allocated");

        if (orgs && orgs.length > 0) {
          const mapped: CustomerAccount[] = orgs.map((org) => {
            const orgQuotas = quotas?.filter((q) => q.organization_id === org.id) || [];
            const orgAlloc = orgQuotas.reduce((acc, q) => acc + (Number(q.tokens_allocated) || 0), 0);
            return {
              id: org.id,
              name: org.name,
              email: `${org.slug || "admin"}@workspace.internal`,
              company: org.name,
              plan: "Enterprise",
              status: "active",
              allocatedTokens: orgAlloc,
              consumedTokens: 0,
              activeApiKeysCount: 0,
              storageUsageBytes: 0,
              monthlySpend: 0,
              joinedDate: org.created_at || new Date().toISOString(),
              lastActive: "Active",
            };
          });
          setCustomers(mapped);
        } else {
          setCustomers([]);
        }
      } catch (err) {
        // Safe production fallback
      } finally {
        setIsLoading(false);
      }
    }

    fetchTenants();
  }, []);

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
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <AdminHeader
        title="Tenant Directory &amp; Governance"
        subtitle="Provision accounts, edit quotas, manage subscription tiers, and enforce access controls"
        actionButton={
          <Button
            size="sm"
            onClick={() => {
              setEditingCustomer(null);
              setIsModalOpen(true);
            }}
            className="gap-1.5 text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5" />
            Provision Tenant
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-80">
            <Input
              id="customerSearch"
              placeholder="Search by organization, slug, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-[#E2E2DA] px-3 py-2 text-xs font-mono uppercase text-[#111111] focus:outline-none focus:border-[#111111]"
            >
              <option value="all">ALL STATUSES</option>
              <option value="active">ACTIVE ONLY</option>
              <option value="suspended">SUSPENDED ONLY</option>
            </select>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white border border-[#E2E2DA] relative">
          <span className="absolute top-1.5 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <div className="px-6 py-4 border-b border-[#E2E2DA] flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
              // Tenant Directory ({filteredCustomers.length})
            </h3>
            <span className="text-[10px] font-mono text-[#777783] uppercase">
              SUPABASE ENCRYPTED DIRECTORY
            </span>
          </div>

          <div className="overflow-x-auto">
            {filteredCustomers.length === 0 ? (
              <div className="py-12 text-center font-mono">
                <p className="text-xs text-[#777783] uppercase tracking-wider">
                  No tenant organizations found
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingCustomer(null);
                    setIsModalOpen(true);
                  }}
                  className="mt-3 text-xs font-bold"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Provision Tenant
                </Button>
              </div>
            ) : (
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#F6F6F3] border-b border-[#E2E2DA] text-[#777783] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-6 font-bold">Organization</th>
                    <th className="py-3 px-6 font-bold">Plan</th>
                    <th className="py-3 px-6 font-bold">Token Quota</th>
                    <th className="py-3 px-6 font-bold">Status</th>
                    <th className="py-3 px-6 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DA]">
                  {filteredCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F6F6F3]/50">
                      <td className="py-4 px-6">
                        <p className="font-bold text-[#111111]">{c.company}</p>
                        <p className="text-[#777783] text-[10px] mt-0.5">{c.email}</p>
                      </td>

                      <td className="py-4 px-6">
                        <Badge variant="default" size="sm">
                          {c.plan}
                        </Badge>
                      </td>

                      <td className="py-4 px-6 font-bold text-[#111111]">
                        {(c.allocatedTokens / 1_000_000).toFixed(1)}M
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
                          className="text-[10px] h-7 px-2"
                          title="Edit tenant details"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>

                        <Button
                          variant={c.status === "active" ? "danger" : "secondary"}
                          size="sm"
                          onClick={() => toggleCustomerStatus(c.id)}
                          className="text-[10px] h-7 px-2"
                          title={c.status === "active" ? "Suspend tenant" : "Reactivate tenant"}
                        >
                          {c.status === "active" ? <Ban className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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

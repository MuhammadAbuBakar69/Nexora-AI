"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomerAccount } from "@/types";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: CustomerAccount) => void;
  existingCustomer?: CustomerAccount | null;
}

export function CustomerModal({
  isOpen,
  onClose,
  onSave,
  existingCustomer,
}: CustomerModalProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<"Starter" | "Growth" | "Enterprise">("Enterprise");
  const [tokensAllocated, setTokensAllocated] = useState("100000000");

  useEffect(() => {
    if (existingCustomer) {
      setName(existingCustomer.name);
      setCompany(existingCustomer.company);
      setEmail(existingCustomer.email);
      setPlan(existingCustomer.plan);
      setTokensAllocated(existingCustomer.allocatedTokens.toString());
    } else {
      setName("");
      setCompany("");
      setEmail("");
      setPlan("Enterprise");
      setTokensAllocated("100000000");
    }
  }, [existingCustomer, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company) return;

    const savedAccount: CustomerAccount = {
      id: existingCustomer ? existingCustomer.id : `cust_${Date.now()}`,
      name,
      company,
      email,
      plan,
      status: existingCustomer ? existingCustomer.status : "active",
      allocatedTokens: parseInt(tokensAllocated, 10) || 50000000,
      consumedTokens: existingCustomer ? existingCustomer.consumedTokens : 0,
      activeApiKeysCount: existingCustomer ? existingCustomer.activeApiKeysCount : 1,
      storageUsageBytes: existingCustomer ? existingCustomer.storageUsageBytes : 10 * 1024 * 1024 * 1024,
      monthlySpend: plan === "Starter" ? 99 : plan === "Growth" ? 349 : 2450,
      joinedDate: existingCustomer ? existingCustomer.joinedDate : new Date().toISOString().split("T")[0],
      lastActive: "Just now",
    };

    onSave(savedAccount);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={existingCustomer ? "Edit Tenant Workspace" : "Provision New Tenant"}
      description="Create a tenant organization, configure monthly token allowances, and assign tier permissions."
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            id="custName"
            label="Primary Operator Name"
            placeholder="Operator Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
          <Input
            id="custCompany"
            label="Organization / Entity"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <Input
          id="custEmail"
          type="email"
          label="Corporate Ingress Email"
          placeholder="admin@organization.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#777783]">
              // Subscription Plan
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value as any)}
              className="w-full bg-white border border-[#E2E2DA] px-3 py-2 text-xs font-mono text-[#111111] focus:outline-none focus:border-[#111111]"
            >
              <option value="Starter">Starter Plan</option>
              <option value="Growth">Growth Plan</option>
              <option value="Enterprise">Enterprise Plan</option>
            </select>
          </div>

          <Input
            id="custTokens"
            type="number"
            label="Initial Token Allowance"
            value={tokensAllocated}
            onChange={(e) => setTokensAllocated(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E2E2DA] mt-4">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm">
            {existingCustomer ? "Save Changes" : "Provision Tenant"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

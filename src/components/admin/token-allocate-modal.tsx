"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomerAccount } from "@/types";
import { Coins, Zap, ShieldAlert, ArrowRight } from "lucide-react";

interface TokenAllocateModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerAccount;
  onUpdateAllocation: (customerId: string, newTotalTokens: number) => void;
}

export function TokenAllocateModal({
  isOpen,
  onClose,
  customer,
  onUpdateAllocation,
}: TokenAllocateModalProps) {
  const [allocationInput, setAllocationInput] = useState(
    customer.allocatedTokens.toString()
  );
  const [quotaCeilingMode, setQuotaCeilingMode] = useState<"hard" | "soft">("hard");

  const currentAllocation = customer.allocatedTokens;
  const consumed = customer.consumedTokens;
  const newAllocationNumber = parseInt(allocationInput, 10) || currentAllocation;
  const projectedRemaining = newAllocationNumber - consumed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAllocation(customer.id, newAllocationNumber);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Modify Customer Token Allocation"
      description={`Adjust monthly allocation limits for ${customer.company} (${customer.name})`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Previous vs New Allocation Summary */}
        <div className="grid grid-cols-2 gap-3 p-3.5 bg-surface rounded-2xl border border-border text-xs">
          <div>
            <span className="text-secondary block">Current Allocation</span>
            <span className="font-semibold text-foreground text-sm">
              {(currentAllocation / 1_000_000).toFixed(1)}M tokens
            </span>
            <span className="text-[10px] text-secondary block mt-0.5">
              {(consumed / 1_000_000).toFixed(1)}M consumed
            </span>
          </div>

          <div>
            <span className="text-secondary block">Projected Balance</span>
            <span
              className={`font-semibold text-sm ${
                projectedRemaining >= 0 ? "text-emerald-700" : "text-rose-600"
              }`}
            >
              {(projectedRemaining / 1_000_000).toFixed(1)}M remaining
            </span>
            <span className="text-[10px] text-secondary block mt-0.5">
              After new allocation
            </span>
          </div>
        </div>

        <Input
          id="tokenAmount"
          type="number"
          label="New Monthly Token Allocation"
          placeholder="e.g. 150000000"
          value={allocationInput}
          onChange={(e) => setAllocationInput(e.target.value)}
          required
        />

        {/* Quick adjustment buttons */}
        <div className="flex items-center gap-1.5 pt-1">
          <span className="text-[11px] text-secondary mr-1">Quick Add:</span>
          {[25_000_000, 50_000_000, 100_000_000].map((inc) => (
            <button
              key={inc}
              type="button"
              onClick={() =>
                setAllocationInput((newAllocationNumber + inc).toString())
              }
              className="text-[10px] px-2 py-1 rounded-lg bg-surface border border-border hover:bg-violet-light/40 hover:text-violet-primary font-mono transition-colors"
            >
              +{inc / 1_000_000}M
            </button>
          ))}
        </div>

        <div className="space-y-1.5 pt-2">
          <label className="block text-xs font-medium text-foreground tracking-wide">
            Ceiling Enforcement Policy
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="p-2.5 rounded-xl border border-border bg-surface flex items-center gap-2 cursor-pointer hover:bg-white">
              <input
                type="radio"
                name="quotaMode"
                checked={quotaCeilingMode === "hard"}
                onChange={() => setQuotaCeilingMode("hard")}
                className="text-violet-primary"
              />
              <div>
                <span className="font-semibold block text-[11px]">Hard Ceiling</span>
                <span className="text-[10px] text-secondary">Block on limit</span>
              </div>
            </label>
            <label className="p-2.5 rounded-xl border border-border bg-surface flex items-center gap-2 cursor-pointer hover:bg-white">
              <input
                type="radio"
                name="quotaMode"
                checked={quotaCeilingMode === "soft"}
                onChange={() => setQuotaCeilingMode("soft")}
                className="text-violet-primary"
              />
              <div>
                <span className="font-semibold block text-[11px]">Soft Cap</span>
                <span className="text-[10px] text-secondary">Overage billing</span>
              </div>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-border mt-4">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm" className="gap-1.5">
            <Coins className="w-3.5 h-3.5" />
            Apply Token Update
          </Button>
        </div>
      </form>
    </Modal>
  );
}

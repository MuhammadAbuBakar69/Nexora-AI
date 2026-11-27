"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomerAccount } from "@/types";
import { Coins, Zap, ShieldAlert, ArrowRight } from "lucide-react";

interface TokenAllocateModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerAccount | null;
  onAllocate?: (customerId: string, newTotalTokens: number) => void;
  onUpdateAllocation?: (customerId: string, newTotalTokens: number) => void;
}

export function TokenAllocateModal({
  isOpen,
  onClose,
  customer,
  onAllocate,
  onUpdateAllocation,
}: TokenAllocateModalProps) {
  const [allocationInput, setAllocationInput] = useState("100000000");
  const [quotaCeilingMode, setQuotaCeilingMode] = useState<"hard" | "soft">("hard");

  useEffect(() => {
    if (customer) {
      setAllocationInput(customer.allocatedTokens.toString());
    }
  }, [customer, isOpen]);

  if (!customer) return null;

  const currentAllocation = customer.allocatedTokens;
  const consumed = customer.consumedTokens;
  const newAllocationNumber = parseInt(allocationInput, 10) || currentAllocation;
  const projectedRemaining = newAllocationNumber - consumed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const handler = onAllocate || onUpdateAllocation;
    if (handler) {
      handler(customer.id, newAllocationNumber);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adjust Tenant Token Quota"
      description={`Configure edge token limits for ${customer.company} (${customer.name})`}
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-mono">
        {/* Previous vs New Allocation Summary */}
        <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#F6F6F3] border border-[#E2E2DA] text-xs">
          <div>
            <span className="text-[#777783] text-[10px] block uppercase">Current Quota</span>
            <span className="font-bold text-[#111111] text-sm">
              {(currentAllocation / 1_000_000).toFixed(1)}M Tokens
            </span>
          </div>

          <div>
            <span className="text-[#777783] text-[10px] block uppercase">Projected Balance</span>
            <span
              className={`font-bold text-sm ${
                projectedRemaining >= 0 ? "text-emerald-700" : "text-rose-600"
              }`}
            >
              {(projectedRemaining / 1_000_000).toFixed(1)}M Remaining
            </span>
          </div>
        </div>

        <Input
          id="tokenAmount"
          type="number"
          label="New Monthly Token Allowance"
          placeholder="100000000"
          value={allocationInput}
          onChange={(e) => setAllocationInput(e.target.value)}
          required
        />

        {/* Quick adjustment buttons */}
        <div className="flex items-center gap-1.5 pt-1">
          <span className="text-[10px] text-[#777783] uppercase mr-1">Quick Add:</span>
          {[25_000_000, 50_000_000, 100_000_000].map((inc) => (
            <button
              key={inc}
              type="button"
              onClick={() =>
                setAllocationInput((newAllocationNumber + inc).toString())
              }
              className="text-[10px] px-2 py-0.5 bg-white border border-[#E2E2DA] hover:border-[#111111] text-[#111111] font-mono transition-colors"
            >
              +{inc / 1_000_000}M
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E2E2DA] mt-4">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm" className="gap-1.5">
            <Coins className="w-3.5 h-3.5" />
            Apply Quota
          </Button>
        </div>
      </form>
    </Modal>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  variant?: "default" | "violet" | "subtle";
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  change,
  icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative bg-white border border-[#E2E2DA] p-5 font-sans transition-all",
        "before:content-['+'] before:absolute before:-top-2 before:-left-2 before:text-[10px] before:font-mono before:text-[#999990] before:select-none",
        "after:content-['+'] after:absolute after:-bottom-2 after:-right-2 after:text-[10px] after:font-mono after:text-[#999990] after:select-none",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3 border-b border-[#E2E2DA]/60 pb-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#777783]">
          // {title}
        </span>
        {icon && (
          <div className="p-1.5 bg-[#F6F6F3] border border-[#E2E2DA] text-[#111111]">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <div className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-[#111111]">
          {value}
        </div>
        {change && (
          <span
            className={cn(
              "inline-flex items-center text-[10px] font-mono font-bold px-1.5 py-0.5 border",
              change.isPositive
                ? "text-emerald-800 bg-emerald-50 border-emerald-300"
                : "text-rose-800 bg-rose-50 border-rose-300"
            )}
          >
            {change.isPositive ? (
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
            )}
            {change.value}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] font-mono text-[#777783] mt-2 leading-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}

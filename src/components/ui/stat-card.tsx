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
  variant = "default",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 border border-border bg-white transition-all duration-200 hover:shadow-subtle hover:border-violet-soft/40",
        variant === "violet" && "bg-gradient-to-br from-violet-light/30 via-white to-white border-violet-soft/30",
        variant === "subtle" && "bg-surface/60",
        className
      )}
    >
      <div className="flex items-center justify-between text-secondary mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-secondary/90">
          {title}
        </span>
        {icon && (
          <div className="p-2 rounded-xl bg-surface border border-border/80 text-foreground">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {value}
        </div>
        {change && (
          <span
            className={cn(
              "inline-flex items-center text-xs font-medium px-1.5 py-0.5 rounded-md",
              change.isPositive
                ? "text-emerald-700 bg-emerald-50"
                : "text-rose-700 bg-rose-50"
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
        <p className="text-xs text-secondary mt-1.5 leading-normal">{subtitle}</p>
      )}
    </div>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "pill" | "underline";
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "pill",
}: TabsProps) {
  if (variant === "underline") {
    return (
      <div className={cn("flex items-center gap-4 border-b border-[#E2E2DA]", className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex items-center gap-2 pb-2.5 text-xs font-mono uppercase tracking-wider transition-colors relative border-b-2 -mb-[1px]",
                isActive
                  ? "text-[#111111] font-bold border-[#111111]"
                  : "text-[#777783] hover:text-[#111111] border-transparent"
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "text-[9px] font-mono px-1.5 py-0.2 border",
                    isActive
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-[#F6F6F3] text-[#777783] border-[#E2E2DA]"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center p-1 bg-[#F6F6F3] border border-[#E2E2DA] gap-1",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all",
              isActive
                ? "bg-white text-[#111111] font-bold border border-[#E2E2DA] shadow-xs"
                : "text-[#777783] hover:text-[#111111] hover:bg-white/60 border border-transparent"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "text-[9px] font-mono px-1.5 py-0.2 border",
                  isActive
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-[#E2E2DA] text-[#555562] border-[#E2E2DA]"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

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
      <div className={cn("flex items-center gap-6 border-b border-border", className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex items-center gap-2 pb-3 text-sm font-medium transition-colors relative",
                isActive
                  ? "text-foreground font-semibold"
                  : "text-secondary hover:text-foreground"
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-normal",
                    isActive
                      ? "bg-violet-light text-violet-primary"
                      : "bg-surface text-secondary"
                  )}
                >
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-primary rounded-full" />
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
        "inline-flex items-center p-1 bg-surface border border-border rounded-xl gap-1",
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
              "flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150",
              isActive
                ? "bg-white text-foreground shadow-sm font-semibold"
                : "text-secondary hover:text-foreground hover:bg-white/50"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-full",
                  isActive
                    ? "bg-violet-light text-violet-primary font-bold"
                    : "bg-border text-secondary"
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

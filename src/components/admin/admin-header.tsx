"use client";

import React from "react";
import Link from "next/link";
import { Menu, ShieldAlert, Bell, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/lib/dashboard-context";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu?: () => void;
  actionButton?: React.ReactNode;
}

export function AdminHeader({
  title,
  subtitle,
  onOpenMobileMenu,
  actionButton,
}: AdminHeaderProps) {
  const { openMobileSidebar } = useDashboard();
  const handleOpen = onOpenMobileMenu || openMobileSidebar;

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 relative z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={handleOpen}
          className="lg:hidden p-2 rounded-xl text-secondary hover:text-foreground hover:bg-surface border border-border"
          aria-label="Open Admin Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200/60 px-2 py-0.2 rounded-full">
              Privileged
            </span>
          </div>
          {subtitle && (
            <p className="text-xs text-secondary hidden sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-light border border-violet-soft/30 text-[11px] text-violet-primary font-medium">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Audit Logging Enforced</span>
        </div>

        {actionButton}
      </div>
    </header>
  );
}

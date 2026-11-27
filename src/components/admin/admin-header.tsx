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
    <header className="h-16 bg-[#F6F6F3] border-b border-[#E2E2DA] flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 relative z-20 font-sans select-none">
      <div className="flex items-center gap-3">
        <button
          onClick={handleOpen}
          className="lg:hidden p-2 bg-white text-[#111111] hover:bg-[#EAEAE2] border border-[#E2E2DA]"
          aria-label="Open Admin Menu"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold uppercase tracking-tight text-[#111111] font-mono">
              {title}
            </h1>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-300 px-1.5 py-0.2 font-mono">
              PRIVILEGED // ROOT
            </span>
          </div>
          {subtitle && (
            <p className="text-[11px] font-mono text-[#777783] hidden sm:block mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white border border-[#E2E2DA] text-[11px] font-mono text-[#555562]">
          <ShieldAlert className="w-3.5 h-3.5 text-violet-primary" />
          <span>AUDIT LOGGING: STRICT ENFORCEMENT</span>
        </div>

        {actionButton}
      </div>
    </header>
  );
}

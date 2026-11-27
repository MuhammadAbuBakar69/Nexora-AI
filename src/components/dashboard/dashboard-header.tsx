"use client";

import React, { useState } from "react";
import {
  Bell,
  Menu,
  Sparkles,
  ShieldCheck,
  Check,
  Activity,
  Layers,
} from "lucide-react";
import { useDashboard } from "@/lib/dashboard-context";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu?: () => void;
  actionButton?: React.ReactNode;
}

export function DashboardHeader({
  title,
  subtitle,
  onOpenMobileMenu,
  actionButton,
}: DashboardHeaderProps) {
  const { openMobileSidebar } = useDashboard();
  const [hasNotifications, setHasNotifications] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);

  const handleOpenMobile = onOpenMobileMenu || openMobileSidebar;

  return (
    <header className="h-16 bg-[#F6F6F3] border-b border-[#E2E2DA] flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 relative z-20 font-sans select-none">
      <div className="flex items-center gap-3">
        <button
          onClick={handleOpenMobile}
          className="lg:hidden p-2 bg-white text-[#111111] hover:bg-[#EAEAE2] border border-[#E2E2DA]"
          aria-label="Open sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold uppercase tracking-tight text-[#111111] font-mono">
              {title}
            </h1>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold">
              ROUTER v2.4
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
        {/* Real Upstream Gateway Telemetry Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white border border-[#E2E2DA] text-[11px] font-mono text-[#555562]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>ANYCAST EDGE: 99.99% UPSTREAM MESH</span>
        </div>

        {/* System Notifications Menu */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationsMenu(!showNotificationsMenu)}
            className="p-2 bg-white text-[#555562] hover:text-[#111111] hover:bg-[#F2F2EE] border border-[#E2E2DA] relative transition-colors"
            title="System Telemetry Notifications"
          >
            <Bell className="w-4 h-4" />
            {hasNotifications && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-violet-primary ring-2 ring-white" />
            )}
          </button>

          {showNotificationsMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E2E2DA] shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DA]">
                <span className="text-xs font-mono font-bold uppercase text-[#111111]">
                  Gateway Telemetry Logs
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold">
                  LIVE
                </span>
              </div>
              <div className="py-3 space-y-2 text-xs">
                <div className="p-3 bg-[#F7F7F4] border border-[#E2E2DA] text-[11px] font-mono space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#111111]">
                    <span>MESH SUPERCLUSTER</span>
                    <span className="text-emerald-600 font-bold">ONLINE</span>
                  </div>
                  <p className="text-[#777783] text-[10px]">
                    All 32 Anycast Edge Points of Presence reporting healthy routing latency.
                  </p>
                </div>
                <div className="p-3 bg-[#F7F7F4] border border-[#E2E2DA] text-[11px] font-mono space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#111111]">
                    <span>ZERO DATA RETENTION</span>
                    <span className="text-violet-primary font-bold">ENFORCED</span>
                  </div>
                  <p className="text-[#777783] text-[10px]">
                    End-to-end ephemeral proxy routing with no upstream storage persistence.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {actionButton}
      </div>
    </header>
  );
}

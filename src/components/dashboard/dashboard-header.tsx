"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Menu,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [hasNotifications, setHasNotifications] = useState(true);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);

  const handleOpenMobile = onOpenMobileMenu || openMobileSidebar;

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 relative z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={handleOpenMobile}
          className="lg:hidden p-2 rounded-xl text-secondary hover:text-foreground hover:bg-surface border border-border"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-secondary hidden sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Illustrative Notice Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border text-[11px] text-secondary">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Demo Gateway: v1.0.4 Connected</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationsMenu(!showNotificationsMenu)}
            className="p-2 rounded-xl text-secondary hover:text-foreground hover:bg-surface border border-border relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {hasNotifications && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-primary ring-2 ring-white" />
            )}
          </button>

          {showNotificationsMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-2xl shadow-float p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-semibold text-foreground">Notifications</span>
                <button
                  onClick={() => {
                    setHasNotifications(false);
                    setShowNotificationsMenu(false);
                  }}
                  className="text-[10px] text-violet-primary hover:underline font-medium"
                >
                  Mark all as read
                </button>
              </div>
              <div className="py-2 space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-violet-light/30 border border-violet-soft/30">
                  <p className="font-semibold text-foreground text-[11px]">Monthly Quota Renewed</p>
                  <p className="text-[10px] text-secondary mt-0.5">50,000,000 tokens provisioned for Nov 2026.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-surface border border-border">
                  <p className="font-semibold text-foreground text-[11px]">API Key Generated</p>
                  <p className="text-[10px] text-secondary mt-0.5">Key &quot;Production Gateway&quot; is active.</p>
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

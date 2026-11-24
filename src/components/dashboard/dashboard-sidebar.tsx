"use client";

import React from "react";
import { asset } from "@/lib/asset";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Key,
  Boxes,
  Zap,
  LineChart,
  HardDrive,
  CreditCard,
  BookOpen,
  Settings,
  ShieldAlert,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  onCloseMobile?: () => void;
}

export function DashboardSidebar({ onCloseMobile }: DashboardSidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "API Keys", href: "/dashboard/api-keys", icon: Key },
    { name: "AI Models", href: "/dashboard/models", icon: Boxes },
    { name: "Token Usage", href: "/dashboard/tokens", icon: Zap },
    { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
    { name: "Cloud Storage", href: "/dashboard/storage", icon: HardDrive },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Documentation", href: "/dashboard/docs", icon: BookOpen },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-border h-full flex flex-col justify-between select-none">
      <div>
        {/* Brand Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={asset("/logo.png")}
                alt="NEXORA Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heritage font-bold text-base tracking-tight text-foreground">
                NEXORA
              </span>
              <span className="text-[10px] text-secondary font-mono">Customer Portal</span>
            </div>
          </Link>
        </div>

        {/* Workspace pill */}
        <div className="px-4 py-3 border-b border-border/60">
          <div className="p-2.5 rounded-xl bg-surface border border-border/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-violet-light text-violet-primary flex items-center justify-center text-xs font-bold">
                A
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-foreground truncate">Aether Dynamics</p>
                <p className="text-[10px] text-secondary">Growth Workspace</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          </div>
        </div>

        {/* Nav Links */}
        <nav className="p-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                  isActive
                    ? "bg-violet-light/60 text-violet-primary font-semibold border border-violet-soft/30 shadow-xs"
                    : "text-secondary hover:text-foreground hover:bg-surface"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-violet-primary" : "text-secondary")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section: switch to admin & user account */}
      <div className="p-3 border-t border-border space-y-2">
        <Link
          href="/admin"
          className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-violet-light/40 border border-border transition-colors text-xs text-foreground group"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-violet-primary" />
            <span className="font-medium">Admin Interface</span>
          </div>
          <span className="text-[10px] text-violet-primary font-bold group-hover:translate-x-0.5 transition-transform">
            Switch →
          </span>
        </Link>

        <div className="flex items-center justify-between px-3 py-2 text-xs text-secondary">
          <div className="flex items-center gap-2 truncate">
            <div className="w-6 h-6 rounded-full bg-surface border border-border text-[10px] font-bold flex items-center justify-center text-foreground">
              ER
            </div>
            <span className="truncate text-foreground font-medium">Elena Rostova</span>
          </div>
          <Link href="/login" className="hover:text-rose-600 transition-colors" title="Sign out">
            <LogOut className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users2,
  Key,
  Coins,
  LineChart,
  Boxes,
  HardDrive,
  CreditCard,
  FileText,
  Settings,
  ArrowLeft,
  ShieldAlert,
  Server,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Customers", href: "/admin/customers", icon: Users2 },
    { name: "Token Allocation", href: "/admin/tokens", icon: Coins },
    { name: "API Management", href: "/admin/api-keys", icon: Key },
    { name: "Usage Analytics", href: "/admin/analytics", icon: LineChart },
    { name: "AI Providers", href: "/admin/providers", icon: Server },
    { name: "Cloud Storage", href: "/admin/storage", icon: HardDrive },
    { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
    { name: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
    { name: "Admin Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#100E20] text-white border-r border-white/10 h-full flex flex-col justify-between select-none">
      <div>
        {/* Brand Logo & Admin Badge */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="NEXORA Logo"
                className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(117,87,255,0.4)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heritage font-bold text-base tracking-tight text-white">
                NEXORA
              </span>
              <span className="text-[10px] text-violet-soft font-mono font-bold tracking-wider uppercase">
                Admin Control
              </span>
            </div>
          </Link>
        </div>

        {/* Status Pill */}
        <div className="px-4 py-3 border-b border-white/5">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/80 font-medium">Gateway Supercluster</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">99.98%</span>
          </div>
        </div>

        {/* Navigation Links */}
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
                    ? "bg-violet-primary text-white font-semibold shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-white/50")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Switch back to Customer Portal */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs text-white group"
        >
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5 text-violet-soft group-hover:-translate-x-0.5 transition-transform" />
            <span>Customer Portal</span>
          </div>
          <span className="text-[10px] text-white/40">Exit Admin</span>
        </Link>

        <div className="px-3 py-1.5 flex items-center justify-between text-[11px] text-white/40">
          <span>Signed in as Superadmin</span>
          <span className="font-mono text-emerald-400">2FA Active</span>
        </div>
      </div>
    </aside>
  );
}

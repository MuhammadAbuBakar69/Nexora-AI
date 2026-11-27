"use client";

import React, { useState, useEffect } from "react";
import { asset } from "@/lib/asset";
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
import { createClient } from "@/utils/supabase/client";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const [adminEmail, setAdminEmail] = useState<string>("admin@nexora.cloud");

  useEffect(() => {
    async function loadAdminUser() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          setAdminEmail(user.email);
        }
      } catch (err) {
        // Safe fallback
      }
    }
    loadAdminUser();
  }, []);

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
    <aside className="w-64 bg-[#0E0E14] text-white border-r border-[#22222E] h-full flex flex-col justify-between select-none font-mono text-xs">
      <div>
        {/* Brand Logo & Admin Badge in CAD Drafting Style */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#22222E] bg-[#14141C]">
          <Link href="/admin" className="flex items-center">
            <img
              src={asset("/logo-full.png")}
              alt="nexora AI"
              className="h-7 w-auto object-contain brightness-125"
            />
          </Link>
          <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase bg-rose-950 text-rose-300 border border-rose-800">
            ROOT
          </span>
        </div>

        {/* Status Pill */}
        <div className="px-4 py-2.5 border-b border-[#22222E] bg-[#101018] text-[10px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#AAAAAA]">CLUSTER: US-WEST</span>
            </div>
            <span className="text-emerald-400 font-bold">99.99%</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-2.5 space-y-0.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 text-xs transition-colors",
                  isActive
                    ? "bg-[#222230] text-white font-bold border-l-2 border-[#FF5722]"
                    : "text-[#888899] hover:text-white hover:bg-[#181822]"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-[#FFA726]" : "text-[#666677]")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Admin User Status & Switch to Customer Portal */}
      <div className="p-3 border-t border-[#22222E] bg-[#12121A] space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center justify-between p-2 bg-[#1A1A24] hover:bg-[#242432] border border-[#2E2E3E] transition-colors text-xs text-white"
        >
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5 text-[#FFA726]" />
            <span className="font-bold">Customer Portal</span>
          </div>
          <span className="text-[9px] text-[#777788] uppercase">Exit Admin</span>
        </Link>

        <div className="px-2 py-1 text-[10px] text-[#777788] truncate">
          <span className="block text-[#555566] text-[8px] uppercase">OPERATOR IDENTITY</span>
          <span className="text-white truncate font-mono">{adminEmail}</span>
        </div>
      </div>
    </aside>
  );
}

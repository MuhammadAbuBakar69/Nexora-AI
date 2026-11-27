"use client";

import React, { useEffect, useState } from "react";
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
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { createClient } from "@/utils/supabase/client";

interface DashboardSidebarProps {
  onCloseMobile?: () => void;
}

export function DashboardSidebar({ onCloseMobile }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string>("user@nexora.cloud");
  const [workspaceName, setWorkspaceName] = useState<string>("Production Workspace");
  const [planName, setPlanName] = useState<string>("Commercial Gateway");
  const [initials, setInitials] = useState<string>("NX");

  useEffect(() => {
    async function loadUserData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.email) {
          setUserEmail(user.email);
          const namePart = user.email.split("@")[0];
          setInitials(namePart.slice(0, 2).toUpperCase());
          setWorkspaceName(`${namePart.charAt(0).toUpperCase() + namePart.slice(1)}'s Workspace`);

          // Attempt to read real profile & organization if tables exist
          const { data: profile } = await supabase
            .from("profiles")
            .select("organization_id, full_name")
            .eq("id", user.id)
            .maybeSingle();

          if (profile?.full_name) {
            const parts = profile.full_name.trim().split(" ");
            setInitials(parts.map((p: string) => p[0]).join("").slice(0, 2).toUpperCase());
          }

          if (profile?.organization_id) {
            const { data: org } = await supabase
              .from("organizations")
              .select("name, plan")
              .eq("id", profile.organization_id)
              .maybeSingle();
            if (org?.name) setWorkspaceName(org.name);
            if (org?.plan) setPlanName(`${org.plan.charAt(0).toUpperCase() + org.plan.slice(1)} Plan`);
          }
        }
      } catch (err) {
        // Fallback safely to production defaults
      }
    }
    loadUserData();
  }, []);

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "API Keys", href: "/dashboard/api-keys", icon: Key },
    { name: "AI Models", href: "/dashboard/models", icon: Boxes },
    { name: "Token Usage", href: "/dashboard/tokens", icon: Zap },
    { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
    { name: "Cloud Storage", href: "/dashboard/storage", icon: HardDrive },
    { name: "Billing & Quotes", href: "/dashboard/billing", icon: CreditCard },
    { name: "Documentation", href: "/dashboard/docs", icon: BookOpen },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#F6F6F3] border-r border-[#E2E2DA] h-full flex flex-col justify-between select-none font-sans">
      <div>
        {/* Brand Logo & Telemetry Header */}
        <div className="h-16 flex items-center px-5 border-b border-[#E2E2DA] bg-[#F2F2EE]">
          <Link href="/" className="flex items-center group">
            <img
              src={asset("/logo-full.png")}
              alt="nexora AI"
              className="h-7 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Real Workspace Indicator */}
        <div className="p-3 border-b border-[#E2E2DA]">
          <div className="p-2.5 bg-white border border-[#E2E2DA] flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <div className="w-6 h-6 bg-[#111111] text-white flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                {initials}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-[#111111] truncate">{workspaceName}</p>
                <p className="text-[10px] font-mono text-[#777783]">{planName}</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active Connection" />
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
                  "flex items-center gap-3 px-3 py-2 text-xs font-semibold transition-colors border",
                  isActive
                    ? "bg-white text-[#111111] font-bold border-[#E2E2DA] shadow-xs"
                    : "border-transparent text-[#555562] hover:text-[#111111] hover:bg-white/60"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-[#111111]" : "text-[#777783]")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Admin Switch & Real User Account */}
      <div className="p-3 border-t border-[#E2E2DA] space-y-2 bg-[#F2F2EE]/50">
        <Link
          href="/admin"
          className="flex items-center justify-between p-2.5 bg-white hover:bg-[#111111] hover:text-white border border-[#E2E2DA] transition-all text-xs text-[#111111] group"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#111111] group-hover:text-white" />
            <span className="font-bold text-[11px] uppercase tracking-wider">Admin Console</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#111111] group-hover:text-white">
            Switch →
          </span>
        </Link>

        {/* Real Authenticated User */}
        <div className="flex items-center justify-between px-2 py-1.5 text-xs text-[#555562]">
          <div className="flex items-center gap-2 truncate">
            <div className="w-6 h-6 rounded-none bg-white border border-[#E2E2DA] text-[10px] font-mono font-bold flex items-center justify-center text-[#111111] shrink-0">
              {initials}
            </div>
            <span className="truncate text-[#111111] font-mono text-[11px]">{userEmail}</span>
          </div>
          <SignOutButton />
        </div>
      </div>
    </aside>
  );
}

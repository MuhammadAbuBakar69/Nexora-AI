"use client";

import React from "react";
import { DashboardProvider, useDashboard } from "@/lib/dashboard-context";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

type ConsoleVariant = "dashboard" | "admin";

interface ConsoleShellProps {
  children: React.ReactNode;
  variant: ConsoleVariant;
}

function ConsoleShellContent({
  children,
  variant,
}: ConsoleShellProps) {
  const { mobileSidebarOpen, closeMobileSidebar } = useDashboard();
  const isAdmin = variant === "admin";

  // Markup mirrors the original per-area layouts exactly; only the sidebar and
  // drawer treatment differ between the customer and admin consoles.
  return (
    <div className="flex h-screen bg-[#F6F6F3] overflow-hidden font-sans">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        {isAdmin ? <AdminSidebar /> : <DashboardSidebar />}
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className={`fixed inset-0 backdrop-blur-sm transition-opacity ${
              isAdmin ? "bg-[#100E20]/60" : "bg-[#100E20]/40"
            }`}
            onClick={closeMobileSidebar}
          />
          <div
            className={`relative w-64 h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200 ${
              isAdmin ? "bg-[#100E20]" : "bg-white"
            }`}
          >
            {isAdmin ? (
              <AdminSidebar onCloseMobile={closeMobileSidebar} />
            ) : (
              <DashboardSidebar onCloseMobile={closeMobileSidebar} />
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function ConsoleShell(props: ConsoleShellProps) {
  return (
    <DashboardProvider>
      <ConsoleShellContent {...props} />
    </DashboardProvider>
  );
}

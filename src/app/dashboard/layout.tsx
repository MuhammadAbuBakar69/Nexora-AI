"use client";

import React from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardProvider, useDashboard } from "@/lib/dashboard-context";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { mobileSidebarOpen, closeMobileSidebar } = useDashboard();

  return (
    <div className="flex h-screen bg-[#F7F7FA] overflow-hidden">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        <DashboardSidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#100E20]/40 backdrop-blur-sm transition-opacity"
            onClick={closeMobileSidebar}
          />
          <div className="relative w-64 h-full bg-white z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            <DashboardSidebar onCloseMobile={closeMobileSidebar} />
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}

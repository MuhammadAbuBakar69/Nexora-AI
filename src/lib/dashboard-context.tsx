"use client";

import React, { createContext, useContext, useState } from "react";

interface DashboardContextType {
  mobileSidebarOpen: boolean;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

const DashboardContext = createContext<DashboardContextType>({
  mobileSidebarOpen: false,
  openMobileSidebar: () => {},
  closeMobileSidebar: () => {},
});

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <DashboardContext.Provider
      value={{
        mobileSidebarOpen,
        openMobileSidebar: () => setMobileSidebarOpen(true),
        closeMobileSidebar: () => setMobileSidebarOpen(false),
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}

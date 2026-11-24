import React from "react";
import { ConsoleShell } from "@/components/layout/console-shell";
import { requireUser } from "@/lib/auth";

// Server component: no session, no dashboard. The middleware redirects earlier,
// but this check is the authoritative guard because it runs per request on the
// server and cannot be skipped by a client-side navigation.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser("/dashboard");

  return <ConsoleShell variant="dashboard">{children}</ConsoleShell>;
}

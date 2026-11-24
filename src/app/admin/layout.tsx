import React from "react";
import { ConsoleShell } from "@/components/layout/console-shell";
import { requireAdmin } from "@/lib/auth";

// Server component: verifies the caller holds the admin role in Postgres.
// A customer hitting /admin is redirected to /dashboard before any admin UI renders.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return <ConsoleShell variant="admin">{children}</ConsoleShell>;
}

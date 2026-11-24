import type { Metadata } from "next";
import "./globals.css";
import { basePath } from "@/lib/asset";

export const metadata: Metadata = {
  title: "NEXORA — Unified AI Infrastructure & Cloud Resource Platform",
  description:
    "Centralize AI API access, manage customer token quotas, monitor consumption analytics, and govern cloud infrastructure across frontier AI providers.",
  keywords: [
    "AI Infrastructure",
    "API Gateway",
    "Token Management",
    "LLM Proxy",
    "Cloud Resources",
    "Enterprise AI",
    "AI Analytics",
  ],
  icons: {
    icon: [
      { url: `${basePath}/favicon.png`, type: "image/png" },
      { url: `${basePath}/favicon.svg`, type: "image/svg+xml" },
    ],
    shortcut: `${basePath}/favicon.png`,
    apple: `${basePath}/logo.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen bg-white text-[#111111] antialiased selection:bg-violet-light selection:text-violet-primary font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

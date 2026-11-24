import type { Metadata } from "next";
import "./globals.css";

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
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.png",
    apple: "/logo.png",
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

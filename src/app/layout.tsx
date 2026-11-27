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
      { url: `${basePath}/favicon.png?v=2`, type: "image/png" },
      { url: `${basePath}/favicon.svg?v=2`, type: "image/svg+xml" },
      { url: `${basePath}/favicon.ico?v=2` },
    ],
    shortcut: `${basePath}/favicon.png?v=2`,
    apple: `${basePath}/logo-icon.png?v=2`,
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                window.addEventListener('unhandledrejection', function(event) {
                  var r = event && event.reason;
                  if (
                    r instanceof Event ||
                    (r && typeof r === 'object' && ('isTrusted' in r || 'target' in r || 'currentTarget' in r))
                  ) {
                    event.preventDefault();
                    if (typeof event.stopImmediatePropagation === 'function') {
                      event.stopImmediatePropagation();
                    }
                    console.warn('[Nexora Shield] Intercepted non-Error unhandled rejection:', r);
                  }
                }, true);
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}

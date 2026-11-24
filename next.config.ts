import type { NextConfig } from "next";

// GitHub Pages serves this project site from a subpath (/Nexora-AI), so every
// asset and route needs the prefix baked in at build time. Local dev and Vercel
// builds leave the variable unset and keep serving from the domain root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fully static output: the app has no route handlers or server-only features,
  // so `next build` can emit a plain `out/` directory for any static host.
  output: "export",
  basePath,
  // Emit `route/index.html` instead of `route.html` so GitHub Pages resolves
  // clean URLs without a rewrite rule.
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

// GitHub Pages served this project from a subpath; the variable is kept so a
// subpath deployment still works. Production runs as a Node server (Vercel),
// where middleware and server components require dynamic rendering.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

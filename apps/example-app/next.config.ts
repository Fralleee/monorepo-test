import path from "node:path";
import type { NextConfig } from "next";

// Minimal config for the monorepo that keeps Turbopack happy.
const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../../"),
  },
};

export default nextConfig;

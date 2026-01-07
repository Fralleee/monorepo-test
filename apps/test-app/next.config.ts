import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ["@acme/api-contract", "@acme/auth"],
};

export default nextConfig;

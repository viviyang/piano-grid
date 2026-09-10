import type { NextConfig } from "next";

// Preserve the project's existing Foundation-stage agent instructions verbatim.
const nextConfig: NextConfig = { agentRules: false };

export default nextConfig;

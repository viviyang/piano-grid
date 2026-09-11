import type { NextConfig } from "next";

// Preserve the project's existing Foundation-stage agent instructions verbatim.
const nextConfig: NextConfig = {
  agentRules: false,
  // Bounded local verification can build beside an active `.next` dev server.
  distDir: process.env.PIANO_NEXT_DIST_DIR || ".next",
};

export default nextConfig;

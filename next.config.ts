import type { NextConfig } from "next";

// Preserve the project's existing Foundation-stage agent instructions verbatim.
const nextConfig: NextConfig = {
  agentRules: false,
  // Bounded local verification can build beside an active `.next` dev server.
  distDir: process.env.PIANO_NEXT_DIST_DIR || ".next",
  // Staging score/audio sources are audit inputs, never deployable runtime files.
  outputFileTracingExcludes: {
    '*': ['docs/content/songs-sheet-v2/content-data/assets/**/*'],
  },
  // Keep bounded verification builds below Windows worker timeout pressure.
  experimental: process.env.PIANO_NEXT_DIST_DIR ? {
    cpus: 4,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 20,
  } : undefined,
  // Ensure content-backed routes keep site-master JSON in serverless traces.
  outputFileTracingIncludes: {
    '/tools/hear-the-difference': [
      './docs/content/site-master/**/*',
      './scripts/scale-faq-contract.mjs',
    ],
    '/keyboard-notes': [
      './docs/content/site-master/**/*',
      './scripts/scale-faq-contract.mjs',
    ],
    '/keyboard-notes/labeled': [
      './docs/content/site-master/**/*',
      './scripts/scale-faq-contract.mjs',
    ],
  },
};

export default nextConfig;

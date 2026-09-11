import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Keep text-pr-* font sizes independent from text-foreground/text-primary colors.
// Mirror the namespace names in src/app/globals.css, not their visual values.
const merge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["pr-h1", "pr-h2", "pr-section-title", "pr-h3", "pr-body", "pr-copy", "pr-label", "pr-ui", "pr-meta", "pr-notes", "pr-result", "pr-chord", "pr-formula", "pr-key-label"],
      spacing: ["pr-2", "pr-4", "pr-6", "pr-8", "pr-10", "pr-12", "pr-14", "pr-16", "pr-20", "pr-24", "pr-32", "pr-40", "pr-48", "pr-64", "pr-gutter", "pr-tool", "pr-section", "pr-reading-gap", "pr-control", "pr-segment", "pr-icon-sm", "pr-icon", "pr-icon-lg"],
      container: ["pr-page", "pr-tool-width", "pr-reading", "pr-tool-copy"],
      radius: ["pr-track", "pr-key"],
      shadow: ["pr-surface"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return merge(clsx(inputs));
}

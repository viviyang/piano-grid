import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site-config";

const paths = [
  "/",
  "/tools",
  "/chords",
  "/chords/a-minor",
  "/chords/a-major",
  "/chords/c-major",
  "/keyboard-notes",
  "/keyboard-notes/labeled",
  "/keyboard-notes/chart",
  "/scales",
  "/scales/c-major",
  "/scales/a-minor",
  "/songs",
  "/songs/easy",
  "/guide",
  "/guide/read-sheet-music",
  "/tools/blank-sheet-music",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: new URL(path, `${SITE_ORIGIN}/`).href }));
}

import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site-config";
import { PUBLIC_ROUTES } from "@/lib/site-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((path) => ({ url: new URL(path, `${SITE_ORIGIN}/`).href }));
}

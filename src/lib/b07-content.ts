import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type PageSeoEntry = {
  url: string;
  mode: string;
  title: string;
  description: string;
  h1: string;
  intent: string;
  batch: string;
  canonical: string;
  leadCopy: string | null;
  ogTitle?: string;
  ogDescription?: string;
  ogImageAlt?: string;
  status: string;
  sections?: Array<{ h2: string; body: string; h3?: string[]; preserveSlot?: string }>;
};

let cached: PageSeoEntry[] | null = null;

export function getPageSeoEntries(): PageSeoEntry[] {
  if (!cached) {
    cached = JSON.parse(
      readFileSync(resolve('docs/product-upgrade/b05-b07-v2/data/page-seo.json'), 'utf8'),
    ) as PageSeoEntry[];
  }
  return cached;
}

export function getPageSeo(url: string): PageSeoEntry | null {
  return getPageSeoEntries().find((entry) => entry.url === url) ?? null;
}

export function getLeadCopy(url: string, fallback: string): string {
  return getPageSeo(url)?.leadCopy ?? fallback;
}

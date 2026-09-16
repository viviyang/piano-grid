import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require(
  process.env.PIANO_PLAYWRIGHT_PATH ||
    'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright',
);

const seo = JSON.parse(readFileSync('docs/product-upgrade/b05-b07-v2/data/page-seo.json', 'utf8'));
const base = process.env.PIANO_BASE_URL || 'http://localhost:3116';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
const rows = [];

for (const entry of seo) {
  await page.goto(base + entry.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const meta = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    return {
      title: document.title,
      description: q('meta[name="description"]')?.content || '',
      canonical: q('link[rel="canonical"]')?.href || '',
      robots: q('meta[name="robots"]')?.content || '',
      ogTitle: q('meta[property="og:title"]')?.content || '',
      ogDescription: q('meta[property="og:description"]')?.content || '',
      ogImage: q('meta[property="og:image"]')?.content || '',
      h1: [...document.querySelectorAll('h1')].map((el) => el.textContent.trim()),
      h2: [...document.querySelectorAll('main h2')].slice(0, 12).map((el) => el.textContent.trim()),
    };
  });
  const titleOk = meta.title === entry.title;
  const descOk = meta.description === entry.description;
  const h1Ok = meta.h1.includes(entry.h1) || meta.h1[0] === entry.h1;
  const canonicalOk = meta.canonical.replace(/\/$/, '') === entry.canonical.replace(/\/$/, '');
  const robotsOk = /index/i.test(meta.robots) && !/noindex/i.test(meta.robots);
  const pass = titleOk && descOk && h1Ok && canonicalOk && robotsOk;
  rows.push({
    url: entry.url,
    pass,
    titleOk,
    descOk,
    h1Ok,
    canonicalOk,
    robotsOk,
    ...meta,
    expectedTitle: entry.title,
    expectedDescription: entry.description,
    expectedH1: entry.h1,
    expectedCanonical: entry.canonical,
  });
  console.log(entry.url, pass ? 'PASS' : 'FAIL', { titleOk, descOk, h1Ok, canonicalOk, robotsOk });
}

await browser.close();
mkdirSync('docs/product-upgrade/b05-b07-v2/delivery/final/closeout-logs', { recursive: true });
writeFileSync(
  'docs/product-upgrade/b05-b07-v2/delivery/final/closeout-logs/seo-live.json',
  JSON.stringify(rows, null, 2),
);
const failed = rows.filter((r) => !r.pass);
console.log(JSON.stringify({ total: rows.length, failed: failed.length, failedUrls: failed.map((r) => r.url) }));
process.exit(failed.length ? 1 : 0);

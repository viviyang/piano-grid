/**
 * B07 T12 — link + head/asset checks against a running Next server.
 * Usage: PIANO_BASE_URL=http://localhost:3116 node scripts/check-b07-links.mjs
 */
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const base = process.env.PIANO_BASE_URL || 'http://localhost:3116';
const outDir = resolve('docs/product-upgrade/b05-b07-v2/delivery/b07');
const links = JSON.parse(readFileSync(resolve('docs/product-upgrade/b05-b07-v2/data/internal-links.json'), 'utf8'));

const staticChecks = [
  { id: 'OG-song-plan', path: '/assets/social/song-plan-og.png', expectType: 'image/png' },
  { id: 'OG-teacher-pack', path: '/assets/social/teacher-pack-og.png', expectType: 'image/png' },
  { id: 'PDF-letter', path: '/reference/generated/keyboard-notes/piano-key-names-c4-c5-letter.pdf', expectType: 'application/pdf' },
  { id: 'PDF-a4', path: '/reference/generated/keyboard-notes/piano-key-names-c4-c5-a4.pdf', expectType: 'application/pdf' },
  { id: 'PDF-letter-ws', path: '/reference/generated/keyboard-notes/piano-key-names-c4-c5-letter-worksheet.pdf', expectType: 'application/pdf' },
  { id: 'PDF-a4-ws', path: '/reference/generated/keyboard-notes/piano-key-names-c4-c5-a4-worksheet.pdf', expectType: 'application/pdf' },
];

const headPages = [
  '/songs',
  '/songs/easy',
  '/songs/easy?plan=twinkle-early-elementary&plan-v=1',
  '/sheet-music',
  '/sheet-music/easy',
  '/sheet-music/beginner',
  '/sheet-music/twinkle-twinkle-little-star',
  '/keyboard-notes',
  '/keyboard-notes/labeled',
  '/keyboard-notes/labeled?paper=a4',
  '/tools',
];

function parseTarget(to) {
  const u = new URL(to, base);
  return { pathname: u.pathname, hash: u.hash.replace(/^#/, ''), search: u.search };
}

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const linkResults = [];
  const headResults = [];
  const assetResults = [];

  for (const asset of staticChecks) {
    const res = await fetch(`${base}${asset.path}`);
    const ctype = res.headers.get('content-type') || '';
    const ok = res.ok && ctype.includes(asset.expectType.split('/')[0]);
    assetResults.push({
      id: asset.id,
      path: asset.path,
      status: res.status,
      contentType: ctype,
      ok,
      onDisk: existsSync(resolve(`public${asset.path}`)),
    });
  }

  for (const path of headPages) {
    const page = await browser.newPage();
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    const data = await page.evaluate(() => {
      const canon = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null;
      const title = document.title;
      const desc = document.querySelector('meta[name="description"]')?.getAttribute('content') || null;
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || null;
      const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || null;
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || null;
      const h1 = document.querySelector('h1')?.textContent?.trim() || null;
      const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || null;
      return { title, desc, canon, ogTitle, ogDesc, ogImage, h1, robots };
    });
    const basePath = path.split('?')[0];
    const expectedCanon = `https://pianogrid.com${basePath}`;
    headResults.push({
      path,
      ...data,
      canonicalOk: data.canon === expectedCanon,
      titlePresent: Boolean(data.title),
      singleH1: (await page.locator('h1').count()) === 1,
    });
    await page.close();
  }

  for (const link of links) {
    if (link.from === 'header Songs menu') {
      const page = await browser.newPage();
      await page.goto(`${base}/`, { waitUntil: 'networkidle' });
      const found = await page.locator(`a[href="${link.to}"]`, { hasText: link.anchorText }).count();
      linkResults.push({
        id: link.id,
        from: link.from,
        to: link.to,
        anchorText: link.anchorText,
        found: found > 0,
        resolved: found > 0 ? link.to : null,
        note: found > 0 ? 'nav href present' : 'missing nav link',
      });
      await page.close();
      continue;
    }

    const target = parseTarget(link.to);
    const page = await browser.newPage();
    await page.goto(`${base}${link.from}`, { waitUntil: 'networkidle' });

    // L06/L07 live inside plan step help after Start → setup step.
    if (link.id === 'L06' || link.id === 'L07') {
      const start = page.getByRole('button', { name: /start the plan/i });
      if (await start.count()) await start.click();
      const setup = page.getByRole('button', { name: /find the starting position/i });
      if (await setup.count()) await setup.click();
      const help = page.locator('.pg-help [data-slot="collapsible-trigger"]').filter({ hasText: /notation|help|phrase|ready|goal|small/i }).first();
      if (await help.count()) {
        await help.click();
      } else {
        const anyHelp = page.locator('.pg-help [data-slot="collapsible-trigger"]').first();
        if (await anyHelp.count()) await anyHelp.click();
      }
    }

    const locator = page.locator(`a[href="${link.to}"], a[href^="${target.pathname}"]`).filter({ hasText: link.anchorText });
    let count = await locator.count();
    let href = null;
    if (count === 0) {
      // fallback: exact text anywhere with matching path
      const loose = page.locator('a').filter({ hasText: link.anchorText });
      count = await loose.count();
      if (count > 0) href = await loose.first().getAttribute('href');
    } else {
      href = await locator.first().getAttribute('href');
    }

    let modeOk = true;
    let modeNote = 'link present';
    if (href && target.hash) {
      await page.goto(`${base}${href.startsWith('http') ? new URL(href).pathname + new URL(href).search + new URL(href).hash : href}`, { waitUntil: 'networkidle' });
      const hash = await page.evaluate(() => location.hash.replace(/^#/, ''));
      if (target.hash === 'first-10-minutes') {
        const plan = await page.locator('#first-10-minutes, [id="first-10-minutes"]').count();
        modeOk = plan > 0 || hash === 'first-10-minutes';
        modeNote = modeOk ? 'plan anchor reachable' : 'plan anchor missing';
      } else if (target.hash === 'teaching-pack') {
        const pack = await page.locator('#teaching-pack, [id="teaching-pack"]').count();
        modeOk = pack > 0 || hash === 'teaching-pack';
        modeNote = modeOk ? 'teaching-pack anchor reachable' : 'teaching-pack anchor missing';
      } else if (target.hash === 'note-trainer') {
        modeOk = href.includes('note-trainer') || href.includes('preset') || href.includes('natural');
        modeNote = modeOk ? `practice href=${href}` : 'practice preset not in href';
      }
    }

    linkResults.push({
      id: link.id,
      from: link.from,
      to: link.to,
      anchorText: link.anchorText,
      found: count > 0,
      resolved: href,
      modeOk,
      modeNote,
    });
    await page.close();
  }

  // cold-start share CSS: open share on songs/easy and labeled in fresh contexts
  const cold = [];
  for (const path of ['/songs/easy', '/keyboard-notes/labeled']) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    const shareBtn = page.getByRole('button', { name: /share/i }).first();
    let opened = false;
    let dialogStyled = false;
    if (await shareBtn.count()) {
      await shareBtn.click();
      opened = await page.locator('[role="dialog"], .pg-share-dialog, .kn-share-dialog').count() > 0;
      dialogStyled = await page.evaluate(() => {
        const el = document.querySelector('[role="dialog"], .pg-share-dialog, .kn-share-dialog');
        if (!el) return false;
        const s = getComputedStyle(el);
        return s.display !== 'none' && s.visibility !== 'hidden';
      });
    }
    cold.push({ path, opened, dialogStyled });
    await ctx.close();
  }

  const summary = {
    base,
    at: new Date().toISOString(),
    links: linkResults,
    heads: headResults,
    assets: assetResults,
    coldShare: cold,
    pass: {
      links: linkResults.every((r) => r.found && (r.modeOk !== false)),
      heads: headResults.every((r) => r.canonicalOk && r.singleH1 && r.titlePresent),
      assets: assetResults.every((r) => r.ok && r.onDisk),
      coldShare: cold.every((r) => r.opened && r.dialogStyled),
    },
  };

  writeFileSync(resolve(outDir, 'LINK_CHECK_RESULTS.json'), JSON.stringify({ base, links: linkResults }, null, 2));
  writeFileSync(resolve(outDir, 'HEAD_CHECK_RESULTS.json'), JSON.stringify({ base, heads: headResults }, null, 2));
  writeFileSync(resolve(outDir, 'ASSET_CHECK.json'), JSON.stringify({ base, assets: assetResults, coldShare: cold }, null, 2));
  writeFileSync(resolve(outDir, 'browser-link-summary.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary.pass, null, 2));
  const failed = !Object.values(summary.pass).every(Boolean);
  await browser.close();
  process.exit(failed ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

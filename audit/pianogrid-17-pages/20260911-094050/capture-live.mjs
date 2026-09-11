import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium, request } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = 'https://pianogrid.com';
const root = resolve('audit/pianogrid-17-pages/20260911-094050');
const routes = ['/', '/tools', '/songs', '/songs/easy', '/tools/blank-sheet-music', '/keyboard-notes', '/keyboard-notes/labeled', '/keyboard-notes/chart', '/chords', '/chords/a-major', '/chords/a-minor', '/chords/c-major', '/scales', '/scales/c-major', '/scales/a-minor', '/guide', '/guide/read-sheet-music'];
const slug = route => route === '/' ? 'home' : route.slice(1).replaceAll('/', '--');
const iso = () => new Date().toISOString();
const sha256 = data => createHash('sha256').update(data).digest('hex');
const ensure = (...parts) => mkdir(resolve(root, ...parts), { recursive: true });
await Promise.all(['desktop','mobile','extra','dom','aria','downloads','performance'].map(name => ensure('evidence', name)));

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const pages = [];
const downloadLinks = new Map();

async function capture(route, mode, viewport) {
  const errors = [], failedResponses = [];
  const context = await browser.newContext({ viewport, colorScheme: 'light', reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('console', message => { if (message.type() === 'error') errors.push({ type: 'console', text: message.text() }); });
  page.on('pageerror', error => errors.push({ type: 'pageerror', text: error.message }));
  page.on('response', response => { if (response.status() >= 400) failedResponses.push({ status: response.status(), url: response.url() }); });
  const startedAt = iso();
  let response, loadError = null;
  try { response = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 30000 }); }
  catch (error) { loadError = error.message; }
  const finalURL = page.url();
  const responseHeaders = response ? await response.allHeaders() : {};
  const html = await page.content();
  const screenshotPath = resolve(root, 'evidence', mode, `${slug(route)}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  let aria = '';
  try { aria = await page.locator('body').ariaSnapshot({ timeout: 5000 }); } catch (error) { aria = `ARIA snapshot unavailable: ${error.message}`; }
  const observed = await page.evaluate(() => {
    const abs = value => { try { return new URL(value, location.href).href; } catch { return value; } };
    const links = selector => [...document.querySelectorAll(selector)].map(a => ({ text: (a.textContent || '').replace(/\s+/g,' ').trim(), href: abs(a.getAttribute('href') || ''), download: a.hasAttribute('download'), target: a.getAttribute('target') }));
    const imgs = [...document.images].map(img => ({ src: abs(img.currentSrc || img.src), alt: img.alt, width: img.naturalWidth, height: img.naturalHeight, complete: img.complete }));
    const visible = element => { const style = getComputedStyle(element); const box = element.getBoundingClientRect(); return style.display !== 'none' && style.visibility !== 'hidden' && box.width > 0 && box.height > 0; };
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content ?? null,
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      robots: document.querySelector('meta[name="robots"]')?.content ?? null,
      h1: [...document.querySelectorAll('h1')].map(node => ({ text: node.textContent?.replace(/\s+/g,' ').trim(), visible: visible(node) })),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(node => node.textContent || ''),
      bodyText: document.body.innerText,
      mainLinks: links('main a[href]'),
      globalLinks: links('header a[href], footer a[href]'),
      downloadLinks: links('a[download], a[href$=".pdf"], a[href*=".pdf?"]'),
      externalLinks: links('main a[href^="http"]'),
      images: imgs,
      imagesHealthy: imgs.every(img => img.complete && img.width > 0 && img.height > 0),
      documentOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      viewport: { width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight },
      fonts: { status: document.fonts.status, bodyFamily: getComputedStyle(document.body).fontFamily },
      focusableWithoutLabel: [...document.querySelectorAll('button,input,select,textarea')].filter(el => {
        const name = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.closest('label')?.innerText || el.textContent;
        return visible(el) && !(name || '').trim();
      }).map(el => el.outerHTML.slice(0,240)),
      selectedStates: [...document.querySelectorAll('[aria-current],[aria-pressed],input:checked')].map(el => ({ tag: el.tagName, text: (el.textContent || el.closest('label')?.textContent || '').replace(/\s+/g,' ').trim(), ariaCurrent: el.getAttribute('aria-current'), ariaPressed: el.getAttribute('aria-pressed'), checked: 'checked' in el ? el.checked : undefined })),
    };
  });
  for (const link of observed.downloadLinks) if (link.href.startsWith('https://pianogrid.com/')) downloadLinks.set(link.href, link);
  const domPath = resolve(root, 'evidence', 'dom', `${slug(route)}-${mode}.html`);
  const ariaPath = resolve(root, 'evidence', 'aria', `${slug(route)}-${mode}.yml`);
  await Promise.all([writeFile(domPath, html), writeFile(ariaPath, aria)]);
  const record = {
    route, mode, requested_url: base + route, final_url: finalURL,
    started_at: startedAt, completed_at: iso(), http_status: response?.status() ?? null,
    load_error: loadError, response_headers: responseHeaders,
    html_sha256: sha256(html), html_bytes: Buffer.byteLength(html),
    evidence: {
      screenshot: `evidence/${mode}/${slug(route)}.png`,
      dom: `evidence/dom/${slug(route)}-${mode}.html`,
      aria: `evidence/aria/${slug(route)}-${mode}.yml`,
    },
    console_errors: errors, failed_responses: failedResponses, ...observed,
  };
  await context.close();
  return record;
}

for (const route of routes) {
  const desktop = await capture(route, 'desktop', { width: 1440, height: 1000 });
  const mobile = await capture(route, 'mobile', { width: 390, height: 844 });
  pages.push({ route, desktop, mobile });
  console.log(`captured ${route}`);
}

const interactiveRoutes = ['/keyboard-notes','/keyboard-notes/labeled','/keyboard-notes/chart','/chords','/chords/a-minor','/scales','/scales/a-minor','/tools/blank-sheet-music','/songs'];
const extra = [];
for (const route of interactiveRoutes) {
  const p320 = await capture(route, 'extra', { width: 320, height: 844 });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(base + route, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: 'html{font-size:200%!important}' });
  const zoomPath = resolve(root, 'evidence', 'extra', `${slug(route)}-text-200.png`);
  await page.screenshot({ path: zoomPath, fullPage: true });
  const zoom = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
  await context.close();
  extra.push({ route, at320: p320, text200: { evidence: `evidence/extra/${slug(route)}-text-200.png`, ...zoom } });
  console.log(`extra ${route}`);
}
await writeFile(resolve(root,'evidence','page-captures.json'), JSON.stringify({ captured_at: iso(), base, routes, pages, extra },null,2)+'\n');

const interactionContext = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
await interactionContext.addInitScript(() => {
  const Native = window.AudioContext || window.webkitAudioContext;
  window.__auditAudio = { available: Boolean(Native), contexts: 0, oscillators: [], pagehide: 0 };
  if (Native) {
    class ObservedAudioContext extends Native {
      constructor(...args) { super(...args); window.__auditAudio.contexts += 1; }
      createOscillator() {
        const osc = super.createOscillator(); const item = { starts: 0, stops: 0, disconnects: 0, frequency: null }; window.__auditAudio.oscillators.push(item);
        const nativeStart = osc.start.bind(osc), nativeStop = osc.stop.bind(osc), nativeDisconnect = osc.disconnect.bind(osc), nativeSet = osc.frequency.setValueAtTime.bind(osc.frequency);
        osc.start = (...args) => { item.starts += 1; return nativeStart(...args); };
        osc.stop = (...args) => { item.stops += 1; try { return nativeStop(...args); } catch {} };
        osc.disconnect = (...args) => { item.disconnects += 1; return nativeDisconnect(...args); };
        osc.frequency.setValueAtTime = (value, time) => { item.frequency = value; return nativeSet(value, time); };
        return osc;
      }
    }
    window.AudioContext = ObservedAudioContext; window.webkitAudioContext = ObservedAudioContext;
  }
  addEventListener('pagehide', () => { window.__auditAudio.pagehide += 1; });
});
const ipage = await interactionContext.newPage();
const interactions = { executed_at: iso(), base, tests: [], console_errors: [] };
ipage.on('console', message => { if (message.type() === 'error') interactions.console_errors.push(message.text()); });
const add = (id, route, input, actual, passed, evidence = null, limit = null) => interactions.tests.push({ id, route, input, actual, passed, evidence, limit });
async function open(route) { await ipage.goto(base + route, { waitUntil: 'networkidle' }); }

await open('/keyboard-notes');
await ipage.getByLabel('Find a note').waitFor();
for (const query of ['C','C4','A-flat','A♭4','Cb4','B#3','D8']) {
  await ipage.getByLabel('Find a note').fill(query); await ipage.getByRole('button', { name: 'Find', exact: true }).click();
  const actual = await ipage.evaluate(() => ({ result: document.querySelector('.kn-result')?.innerText, midi: document.querySelector('.kn-result')?.getAttribute('data-selected-midi'), status: document.querySelector('.kn-tool [role="status"]')?.textContent?.trim(), choices: [...document.querySelectorAll('[aria-label="Choose an octave"] button')].map(x => x.textContent?.trim()), selectedKeys: [...document.querySelectorAll('.kn-key[aria-pressed="true"]')].map(x => x.getAttribute('data-midi')) }));
  const rules = { C: actual.status === 'Which octave?' && actual.choices.length > 1, C4: actual.result?.startsWith('C4') && actual.midi === '60', 'A-flat': actual.status === 'Which octave?' && actual.choices.length > 1, 'A♭4': actual.result?.startsWith('Ab4') && actual.midi === '68', Cb4: actual.result?.startsWith('Cb4') && actual.midi === '59', 'B#3': actual.result?.startsWith('B#3') && actual.midi === '60', D8: actual.status?.includes('outside the selected keyboard range') };
  add(`KN-${query}`, '/keyboard-notes', query, actual, Boolean(rules[query]));
}
await ipage.getByLabel('Keyboard layout').selectOption('61-key-C2-C7');
for (const query of ['C4','D8']) {
  await ipage.getByLabel('Find a note').fill(query); await ipage.getByRole('button', { name: 'Find', exact: true }).click();
  const actual = await ipage.evaluate(() => ({ result: document.querySelector('.kn-result')?.innerText, midi: document.querySelector('.kn-result')?.getAttribute('data-selected-midi'), status: document.querySelector('.kn-tool [role="status"]')?.textContent?.trim(), range: document.querySelector('.kn-range')?.textContent?.trim() }));
  add(`KN-61-${query}`, '/keyboard-notes', query, actual, query === 'C4' ? actual.midi === '60' : actual.status?.includes('outside'));
}
await ipage.getByLabel('Keyboard layout').selectOption('88-key-A0-C8');
const c4Key = ipage.locator('.kn-key[data-midi="60"]'); await c4Key.click();
add('KN-click', '/keyboard-notes', 'click C4 key', await ipage.locator('.kn-result').innerText(), (await ipage.locator('.kn-result').getAttribute('data-selected-midi')) === '60');
await c4Key.press('ArrowRight'); await ipage.locator('.kn-key:focus').press('Enter');
add('KN-keyboard', '/keyboard-notes', 'focus C4, ArrowRight, Enter', await ipage.locator('.kn-result').innerText(), (await ipage.locator('.kn-result').getAttribute('data-selected-midi')) === '61');

await open('/chords');
const chordInventory = await ipage.locator('.ch-result').evaluateAll(nodes => nodes.map(n => ({ id: n.getAttribute('data-chord-id'), text: n.querySelector('h3')?.textContent?.replace(/\s+/g,' ').trim() })));
add('CH-inventory', '/chords', 'latest supported collection', chordInventory, chordInventory.length > 0);
for (const requested of ['C/G','Am','F','Dm','Em']) add(`CH-support-${requested}`, '/chords', requested, chordInventory.filter(x => x.text?.includes(requested)), chordInventory.some(x => x.text?.includes(requested)), null, chordInventory.some(x => x.text?.includes(requested)) ? null : 'Recorded as scope, not theory error.');
for (const route of ['/chords/a-major','/chords/a-minor','/chords/c-major']) {
  await open(route);
  const labels = await ipage.locator('input[name="position"]').evaluateAll(nodes => nodes.map(n => n.closest('label')?.innerText.trim()));
  for (const label of labels) {
    await ipage.getByRole('radio', { name: label, exact: true }).check();
    const actual = await ipage.evaluate(() => ({ checked: document.querySelector('input[name="position"]:checked')?.value, symbol: document.querySelector('#current-symbol')?.textContent, bass: document.querySelector('#current-bass')?.textContent, notes: [...document.querySelectorAll('#note-order .am-pitch')].map(x => x.textContent), selectedMidi: [...document.querySelectorAll('#keyboard-scroll .am-is-selected')].map(x => x.getAttribute('data-midi')), currentRows: [...document.querySelectorAll('.am-inversion-table tbody tr')].filter(row => getComputedStyle(row).backgroundColor !== 'rgba(0, 0, 0, 0)').map(row => ({ id: row.getAttribute('data-voicing-id'), ariaCurrent: row.getAttribute('aria-current'), text: row.innerText })), currentSelectionText: [...document.querySelectorAll('.am-inversion-table tbody tr')].filter(row => row.textContent?.includes('current selection')).map(row => row.getAttribute('data-voicing-id')) }));
    add(`CH-${slug(route)}-${label}`, route, label, actual, actual.notes.length === 3 && actual.selectedMidi.length === 3);
  }
  if (route === '/chords/a-minor') {
    const aria = await ipage.locator('.am-inversion-table').ariaSnapshot();
    await writeFile(resolve(root,'evidence','aria','a-minor-current-selection.yml'), aria);
    const selectedCount = await ipage.locator('.am-inversion-table tr[aria-current="true"]').count();
    const selectedTextCount = await ipage.locator('.am-inversion-table tbody').getByText('current selection', { exact: false }).count();
    add('CH-Am-current-semantics', route, 'three positions inspected', { selectedCount, selectedTextCount, aria }, selectedCount === 1 && selectedTextCount === 1, 'evidence/aria/a-minor-current-selection.yml');
  }
}

for (const route of ['/scales','/scales/c-major','/scales/a-minor']) {
  await open(route);
  const forms = route === '/scales' ? ['major','natural_minor','harmonic_minor','melodic_minor_classical'] : route.endsWith('a-minor') ? ['natural_minor','harmonic_minor','melodic_minor_classical'] : ['major'];
  for (const form of forms) {
    const control = route === '/scales' ? ipage.getByLabel('Scale type', { exact: true }) : ipage.getByLabel('Minor form', { exact: true });
    if (await control.count()) await control.selectOption(form);
    for (const hand of ['RH','LH']) for (const direction of ['ascending','descending','up_down']) {
      await ipage.getByLabel('Hand', { exact: true }).selectOption(hand); await ipage.getByLabel('Direction', { exact: true }).selectOption(direction);
      const actual = await ipage.evaluate(() => ({ id: document.querySelector('.sc-reference')?.getAttribute('data-scale-id'), hand: document.querySelector('.sc-reference')?.getAttribute('data-hand'), direction: document.querySelector('.sc-reference')?.getAttribute('data-direction'), line: document.querySelector('.sc-note-line')?.textContent?.trim(), tableNotes: [...document.querySelectorAll('.sc-sequence-table tr:first-child td')].map(x => x.textContent?.trim()), fingers: [...document.querySelectorAll('.sc-sequence-table tr:nth-child(2) td')].map(x => x.textContent?.trim()), marked: [...document.querySelectorAll('.kn-key.kn-marked')].map(x => x.getAttribute('data-midi')) }));
      add(`SC-${slug(route)}-${form}-${hand}-${direction}`, route, { form, hand, direction }, actual, Boolean(actual.id && actual.line && actual.tableNotes.length >= 8 && actual.marked.length >= 8));
    }
  }
}
await open('/scales/a-minor'); await ipage.getByLabel('Minor form', { exact: true }).selectOption('melodic_minor_classical'); await ipage.getByLabel('Direction', { exact: true }).selectOption('descending');
const melodicDown = await ipage.locator('.sc-tool .sc-note-line').innerText();
add('SC-melodic-down', '/scales/a-minor', 'classical melodic minor descending', melodicDown, /A.*G.*F.*E.*D.*C.*B.*A/.test(melodicDown) && !melodicDown.includes('G♯') && !melodicDown.includes('F♯'));

await open('/songs');
const songCards = await ipage.locator('.sg-resource').evaluateAll(nodes => nodes.map(n => ({ id: n.getAttribute('data-resource-id'), text: n.innerText, href: n.querySelector('.sg-resource-link')?.href, byline: n.querySelector('.sg-byline')?.textContent })));
add('SG-fields', '/songs', 'card field separation', songCards.map(x => ({ id: x.id, headings: ['Difficulty (publisher label)','Arrangement','Acquisition format'].filter(h => x.text.includes(h)) })), songCards.every(x => ['Difficulty (publisher label)','Arrangement','Acquisition format'].every(h => x.text.includes(h))));
const sweden = songCards.find(x => x.id === 'cr-04-1'), allOfMe = songCards.find(x => x.id === 'cr-19-1');
add('SG-Sweden', '/songs', 'Sweden attribution and acquisition', sweden, Boolean(sweden && sweden.byline === 'C418 / Daniel Rosenfeld' && sweden.text.includes('online-only') && sweden.text.includes('cannot be downloaded or printed')));
add('SG-AllOfMe', '/songs', 'All of Me difficulty vs arrangement', allOfMe, Boolean(allOfMe && allOfMe.text.includes('Unknown — no publisher level listed') && allOfMe.text.includes('piano/vocal with guitar chord frames')));
const search = ipage.getByLabel('Search title, artist or edition'); await search.fill('Minecraft');
add('SG-search', '/songs', 'Minecraft', await ipage.locator('.sg-resource h3').allTextContents(), await ipage.locator('.sg-resource').count() === 1);
await ipage.getByRole('button', { name: 'Clear filters' }).click(); await ipage.locator('.sg-filters select').nth(0).selectOption('Easy Piano');
add('SG-filter', '/songs', 'Easy Piano', await ipage.locator('.sg-resource h3').allTextContents(), await ipage.locator('.sg-resource').count() === 3);
await ipage.locator('.sg-filters select').nth(1).selectOption('sing-and-play');
add('SG-empty', '/songs', 'combined filters', await ipage.locator('.sg-empty').innerText(), await ipage.locator('.sg-empty').count() === 1);
await ipage.getByRole('button', { name: 'Show all editions' }).click();
add('SG-reset', '/songs', 'reset', await ipage.locator('.sg-resource').count(), await ipage.locator('.sg-resource').count() === 6);

await open('/tools/blank-sheet-music');
const paperOptions = await ipage.locator('input[name="paper"]').evaluateAll(nodes => nodes.map(n => ({ value: n.value, label: n.closest('label')?.innerText })));
for (const option of paperOptions) { await ipage.locator(`input[name="paper"][value="${option.value}"]`).check(); add(`BS-${option.value}`, '/tools/blank-sheet-music', option, await ipage.locator('.bs-preview-scroll').getAttribute('aria-label'), (await ipage.locator('.bs-preview-scroll').getAttribute('aria-label'))?.includes(option.label.split('\n')[0])); }
await ipage.getByLabel(/Screen zoom/).fill('150');
add('BS-zoom', '/tools/blank-sheet-music', '150%', await ipage.locator('.bs-preview-scroll').getAttribute('aria-label'), (await ipage.locator('.bs-preview-scroll').getAttribute('aria-label'))?.includes('150%'));

await open('/keyboard-notes/chart');
const staffButton = ipage.locator('.kn-staff-note[role="button"]').nth(2); const staffNote = await staffButton.getAttribute('data-note'); await staffButton.press('Enter');
add('KC-staff-keyboard-sync', '/keyboard-notes/chart', staffNote, { result: await ipage.locator('.kn-result h2').innerText(), selectedMidi: await ipage.locator('.kn-result').getAttribute('data-selected-midi'), pressed: await ipage.locator('.kn-staff-note[aria-pressed="true"]').count() }, (await ipage.locator('.kn-result h2').innerText()) === staffNote);

await open('/chords/a-minor');
const beforeAudio = await ipage.evaluate(() => window.__auditAudio);
await ipage.getByRole('button', { name: 'Play chord', exact: true }).click(); await ipage.waitForTimeout(80); await ipage.getByRole('button', { name: 'Stop', exact: true }).click();
await ipage.getByRole('button', { name: 'Play notes one at a time', exact: true }).click(); await ipage.getByRole('radio', { name: 'First inversion', exact: true }).check();
const afterAudio = await ipage.evaluate(() => window.__auditAudio);
add('AU-chord-technical', '/chords/a-minor', 'play, stop, sequence, quick switch', { beforeAudio, afterAudio }, afterAudio.contexts >= 1 && afterAudio.oscillators.some(x => x.starts > 0) && afterAudio.oscillators.some(x => x.disconnects > 0), null, 'Technical scheduling only; not human listening or iPhone evidence.');

for (const route of ['/chords/a-minor','/scales/a-minor','/keyboard-notes/chart']) {
  await open(route); await ipage.evaluate(() => { window.print = () => window.dispatchEvent(new Event('beforeprint')); });
  const buttonName = route.includes('chords') ? 'Print this position' : route.includes('scales') ? 'Print current scale' : 'Print current range';
  await ipage.getByRole('button', { name: buttonName, exact: true }).first().click();
  const actual = await ipage.evaluate(() => ({ chord: document.querySelector('#print-content')?.getAttribute('data-voicing-id'), scale: document.querySelector('.sc-print-only')?.getAttribute('data-print-scale'), chart: document.querySelector('.kn-print-only')?.getAttribute('data-print-selected') }));
  add(`PRINT-${slug(route)}`, route, buttonName, actual, Boolean(actual.chord || actual.scale || actual.chart), null, 'Print snapshot checked; native dialog and physical printing not claimed.');
  await ipage.evaluate(() => window.dispatchEvent(new Event('afterprint')));
}

await writeFile(resolve(root,'evidence','interaction-results.json'), JSON.stringify(interactions,null,2)+'\n');
await interactionContext.close();

const api = await request.newContext({ userAgent: 'PianoGridIndependentAudit/1.0' });
const downloads = [];
for (const [url, link] of downloadLinks) {
  try {
    const response = await api.get(url, { timeout: 30000 }); const body = await response.body();
    const name = new URL(url).pathname.split('/').pop() || `${sha256(url).slice(0,12)}.bin`;
    const path = resolve(root,'evidence','downloads',name); await writeFile(path, body);
    downloads.push({ url, link, status: response.status(), contentType: response.headers()['content-type'], bytes: body.length, sha256: sha256(body), evidence: `evidence/downloads/${name}` });
  } catch (error) { downloads.push({ url, link, error: error.message }); }
}
await writeFile(resolve(root,'evidence','download-results.json'), JSON.stringify(downloads,null,2)+'\n');

const performance = [];
for (const route of ['/','/keyboard-notes','/chords/a-minor','/scales/a-minor']) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } }); const page = await context.newPage();
  const started = Date.now(); await page.goto(base+route,{waitUntil:'networkidle'}); const wallMs = Date.now()-started;
  const metrics = await page.evaluate(() => { const nav = performance.getEntriesByType('navigation')[0]; const resources = performance.getEntriesByType('resource'); return { navigation: nav ? { duration: nav.duration, domContentLoaded: nav.domContentLoadedEventEnd, loadEvent: nav.loadEventEnd, transferSize: nav.transferSize, encodedBodySize: nav.encodedBodySize } : null, resourceCount: resources.length, transferSize: resources.reduce((sum,r)=>sum+(r.transferSize||0),0), observedAt: new Date().toISOString() }; });
  performance.push({ route, conditions: 'Headless Chrome, desktop 1440x1000, single audit host/network run; laboratory sample only.', wallMs, ...metrics }); await context.close();
}
await writeFile(resolve(root,'evidence','performance','navigation-timing.json'), JSON.stringify(performance,null,2)+'\n');

await api.dispose(); await browser.close();
await writeFile(resolve(root,'evidence','page-captures.json'), JSON.stringify({ captured_at: iso(), base, routes, pages, extra },null,2)+'\n');
console.log(`done ${pages.length} pages, ${downloads.length} downloads, ${interactions.tests.length} interaction checks`);

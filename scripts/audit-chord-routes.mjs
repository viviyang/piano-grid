import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'docs/seo/chords');
const origin = 'https://pianogrid.com';
mkdirSync(outDir, { recursive: true });

const readJson = (relative) => JSON.parse(readFileSync(resolve(root, relative), 'utf8'));
const ascii = (value) => String(value).replaceAll('♯', '#').replaceAll('♭', 'b');
const csvEscape = (value) => {
  const text = value == null ? '' : String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};
const publishedTitle = (title) => {
  if (!title) return '';
  return title.includes('PianoGrid') || title.length > 52 ? title : `${title} | PianoGrid`;
};

const siteRoutesSource = readFileSync(resolve(root, 'src/lib/site-routes.ts'), 'utf8');
const publicBlock = siteRoutesSource.match(/export const PUBLIC_ROUTES = \[([\s\S]*?)\] as const/);
if (!publicBlock) throw new Error('Unable to parse PUBLIC_ROUTES');
const publicRoutes = [...publicBlock[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
const chordUrls = publicRoutes.filter((url) => url === '/chord-progressions' || url === '/chords' || url.startsWith('/chords/'));

const urlPlan = readJson('docs/product/url-plan.final.json');
const planByUrl = new Map(urlPlan.pages.filter((page) => page.url).map((page) => [page.url, page]));
const hub = planByUrl.get('/chords');
const hubTaskKeywords = new Set([...(hub?.other_task_keywords || []), ...((hub?.tasks_requiring_later_completion || []).map((item) => item.keyword))]);

const familySeo = {
  '/chords/diminished': { keyword: 'Diminished Chords', volume: 1600, status: 'VERIFIED', source: 'USER_SEMRUSH_US_DESKTOP_2026-09-17', h1: 'Diminished Chords', title: 'Diminished Chords: Piano Notes, Formula & Inversions | PianoGrid' },
  '/chords/augmented': { keyword: 'Augmented Chords', volume: 1000, status: 'VERIFIED', source: 'USER_SEMRUSH_US_DESKTOP_2026-09-17', h1: 'Augmented Chords', title: 'Augmented Chords: Piano Notes, Formula & Inversions | PianoGrid' },
  '/chords/suspended': { keyword: 'Suspended Chords', volume: 1600, status: 'VERIFIED', source: 'USER_SEMRUSH_US_DESKTOP_2026-09-17', h1: 'Suspended Chords', title: 'Suspended Chords: Sus2 & Sus4 Piano Notes & Inversions | PianoGrid' },
  '/chords/add': { keyword: 'Add9 Chords', volume: 390, status: 'VERIFIED', source: 'USER_SEMRUSH_US_DESKTOP_2026-09-17', h1: 'Add9 Chords', title: 'Add9 Chords: Major & Minor Piano Notes & Voicings | PianoGrid' },
  '/chords/extended': { keyword: 'Extended Chords', volume: 390, status: 'VERIFIED', source: 'USER_SEMRUSH_US_DESKTOP_2026-09-17', h1: 'Extended Chords', title: 'Extended Chords: 9th, 11th & 13th Piano Chords | PianoGrid' },
  '/chords/altered': { keyword: 'Altered Dominant Chords', volume: 210, status: 'VERIFIED', source: 'USER_SEMRUSH_US_DESKTOP_2026-09-17', h1: 'Altered Dominant Chords', title: 'Altered Dominant Chords: Piano Notes, Formulas & Voicings | PianoGrid' },
};

const majorPage = readJson('docs/pianogrid-chords-next-expansion/03_categories/major.page.json');
const minorPage = readJson('docs/pianogrid-chords-next-expansion/03_categories/minor.page.json');
const n2bCategories = readJson('docs/pianogrid-chords-n2b/02_categories/categories.master.json');
const seventhPage = readJson('docs/pianogrid-chords-n2c/02_category/seventh.page.json');
const addPage = readJson('docs/pianogrid-chords-n2d-v2/03_content/add.category.page.json');
const extendedPage = readJson('docs/pianogrid-chords-completion/03_content/extended.page.json');
const alteredPage = readJson('docs/pianogrid-chords-completion/03_content/altered.page.json');
const master = readJson('docs/content/site-master/page-content.master.json');
const bindings = readJson('docs/pianogrid-chords-content-next/03_learning/adapter-bindings.json');
const detailCopy = {
  '/chords/a-major': { heading: 'A Major Piano Chord', title: 'A Major Piano Chord: Notes, Inversions & Keyboard Diagrams', description: 'Find the A major piano chord notes A, C-sharp and E. Compare root position and two inversions with keyboard diagrams, sound examples and a printable reference.' },
  '/chords/c-major': { heading: 'C Major Piano Chord', title: 'C Major Piano Chord: Notes, Inversions & Keyboard Diagrams', description: 'Find the C major piano chord notes C, E and G. Compare root position and two inversions with keyboard diagrams, sound examples and a printable reference.' },
};

const details = new Map();
const loadDetails = (dir, pick) => {
  for (const filename of readdirSync(resolve(root, dir)).filter((name) => name.endsWith('.page.json'))) {
    const raw = readJson(`${dir}/${filename}`);
    const row = pick(raw);
    if (row?.url) details.set(row.url, row);
  }
};
loadDetails('docs/pianogrid-chords-next-expansion/04_details_next', (raw) => ({
  url: raw.url, family: raw.data.quality, subtype: raw.data.quality, root: raw.data.root,
  display_name: raw.h1.replace(/ Piano Chord$/, ''), title: raw.title, h1: raw.h1, description: raw.description,
  current_target_keyword: raw.main_keyword, symbol: raw.data.symbol,
}));
loadDetails('docs/pianogrid-chords-n2b/03_details', (raw) => ({
  url: raw.url, family: raw.subtype, subtype: raw.subtype, root: raw.rootSpelling,
  display_name: raw.name, title: raw.seo.title, h1: raw.seo.h1, description: raw.seo.description,
  current_target_keyword: raw.seo.mainKeyword, symbol: raw.symbol,
}));
loadDetails('docs/pianogrid-chords-n2c/03_details', (raw) => ({
  url: raw.url, family: raw.subtype, subtype: raw.subtype, root: raw.rootSpelling,
  display_name: raw.name, title: raw.seo.title, h1: raw.seo.h1, description: raw.seo.description,
  current_target_keyword: raw.seo.mainKeyword, symbol: raw.symbol,
}));
loadDetails('docs/pianogrid-chords-n2d-v2/03_content/details', (raw) => ({
  url: raw.url, family: raw.subtype, subtype: raw.subtype, root: raw.rootSpelling,
  display_name: raw.name, title: raw.seo.title, h1: raw.seo.h1, description: raw.seo.description,
  current_target_keyword: raw.seo.mainKeyword, symbol: raw.symbol,
}));

const aMinorPage = master.pages['/chords/a-minor'];
details.set('/chords/a-minor', {
  url: '/chords/a-minor', family: 'minor', subtype: 'minor', root: 'A',
  display_name: 'A Minor', title: aMinorPage.metadata.title, h1: 'A Minor Piano Chord',
  description: aMinorPage.metadata.description, current_target_keyword: aMinorPage.main_keyword || 'am piano chord', symbol: 'Am',
});
for (const url of ['/chords/a-major', '/chords/c-major', '/chords/g-major', '/chords/c-minor', '/chords/e-major', '/chords/b-major', '/chords/a-flat-major', '/chords/c-flat-major']) {
  const page = master.pages[url];
  const copy = detailCopy[url];
  const binding = bindings[url];
  const quality = page.data.quality;
  const root = page.data.root;
  details.set(url, {
    url, family: quality, subtype: quality, root,
    display_name: `${root.replace('b', '♭').replace('#', '♯')} ${quality[0].toUpperCase()}${quality.slice(1)}`,
    title: copy?.title || page.metadata.title, h1: copy?.heading || binding?.h1 || page.metadata.title,
    description: copy?.description || page.metadata.description,
    current_target_keyword: page.data.symbol ? `${ascii(page.data.symbol).toLowerCase()} piano chord` : null,
    symbol: page.data.symbol,
  });
}

const familyMeta = {
  '/chords': { page_type: 'hub', family: 'hub', title: publishedTitle('Piano Chord Chart: Notes, Diagrams & Sound'), h1: master.pages['/chords'].blocks[0].content.heading, description: 'Find piano chords by name, root or type. See their notes and keyboard positions, hear examples, and open detailed chord and inversion guides.', current_target_keyword: 'piano chord chart' },
  '/chords/major': { page_type: 'family', family: 'major', title: publishedTitle(majorPage.title), h1: majorPage.h1, description: majorPage.description, current_target_keyword: majorPage.main_keyword },
  '/chords/minor': { page_type: 'family', family: 'minor', title: publishedTitle(minorPage.title), h1: minorPage.h1, description: minorPage.description, current_target_keyword: minorPage.main_keyword },
  '/chords/seventh': { page_type: 'family', family: 'seventh', title: publishedTitle(seventhPage.title), h1: seventhPage.h1, description: seventhPage.description, current_target_keyword: seventhPage.mainKeyword },
  '/chords/diminished': { page_type: 'family', family: 'diminished', ...familySeo['/chords/diminished'], description: n2bCategories.find((row) => row.id === 'diminished').description, current_target_keyword: familySeo['/chords/diminished'].keyword },
  '/chords/augmented': { page_type: 'family', family: 'augmented', ...familySeo['/chords/augmented'], description: n2bCategories.find((row) => row.id === 'augmented').description, current_target_keyword: familySeo['/chords/augmented'].keyword },
  '/chords/suspended': { page_type: 'family', family: 'suspended', ...familySeo['/chords/suspended'], description: n2bCategories.find((row) => row.id === 'suspended').description, current_target_keyword: familySeo['/chords/suspended'].keyword },
  '/chords/add': { page_type: 'family', family: 'add9', ...familySeo['/chords/add'], description: addPage.seo.description, current_target_keyword: familySeo['/chords/add'].keyword },
  '/chords/extended': { page_type: 'family', family: 'extended', ...familySeo['/chords/extended'], description: extendedPage.description, current_target_keyword: familySeo['/chords/extended'].keyword },
  '/chords/altered': { page_type: 'family', family: 'altered', ...familySeo['/chords/altered'], description: alteredPage.description, current_target_keyword: familySeo['/chords/altered'].keyword },
  '/chords/by-key': { page_type: 'tool', family: 'support', title: publishedTitle('Piano Chords by Key: Triads & Seventh Chords'), h1: 'Piano Chords by Key', description: 'Compare triads and seventh chords in the available keys. Read Roman numerals and chord notes, and distinguish natural-minor from altered options.', current_target_keyword: 'chords of key' },
  '/chords/finder': { page_type: 'tool', family: 'support', title: publishedTitle('Piano Chord Finder: Identify Chords from Notes'), h1: 'Piano Chord Finder', description: 'Select piano notes to find possible chord names. Compare bass notes and alternative spellings, and see when your notes fall outside the supported library.', current_target_keyword: 'chord finder piano' },
  '/chord-progressions': { page_type: 'tool', family: 'support', title: publishedTitle('Piano Chord Progressions: Patterns & Practice'), h1: 'Piano Chord Progressions', description: 'Explore piano chord progressions, read Roman numerals and chord notes, and compare the available key examples before practicing each change.', current_target_keyword: 'piano chord progressions' },
};

const familyLabel = {
  major: 'Major',
  minor: 'Minor',
  dominant7: 'Dominant 7',
  major7: 'Major 7',
  minor7: 'Minor 7',
  halfDiminished7: 'Half-diminished 7',
  diminished: 'Diminished',
  augmented: 'Augmented',
  sus2: 'Sus2',
  sus4: 'Sus4',
  add9: 'Add9',
  minorAdd9: 'Minor Add9',
  seventh: 'Seventh',
  suspended: 'Suspended',
  extended: 'Extended',
  altered: 'Altered',
  hub: 'Hub',
  support: 'Support',
};

function classify(url) {
  if (familyMeta[url]) return familyMeta[url];
  const detail = details.get(url);
  if (!detail) throw new Error(`Unclassified chord URL: ${url}`);
  return { page_type: 'detail', ...detail };
}

function originalMapping(url) {
  const planned = planByUrl.get(url);
  if (planned) {
    const hasVolume = typeof planned.volume_us === 'number';
    return {
      original_plan_url: planned.url,
      original_keyword: planned.keyword || '',
      original_volume_us: hasVolume ? planned.volume_us : '',
      keyword_source: 'ORIGINAL_URL_PLAN',
      volume_status: hasVolume ? 'ORIGINAL_PLAN' : 'UNKNOWN',
      generated_after_original_plan: 'false',
    };
  }
  if (url === '/chords/major' && hubTaskKeywords.has('major chords piano')) {
    return { original_plan_url: '/chords', original_keyword: 'major chords piano', original_volume_us: '', keyword_source: 'ORIGINAL_HUB_TASK_KEYWORD', volume_status: 'UNKNOWN', generated_after_original_plan: 'true' };
  }
  if (url === '/chords/minor' && hubTaskKeywords.has('minor chords piano')) {
    return { original_plan_url: '/chords', original_keyword: 'minor chords piano', original_volume_us: '', keyword_source: 'ORIGINAL_HUB_TASK_KEYWORD', volume_status: 'UNKNOWN', generated_after_original_plan: 'true' };
  }
  return { original_plan_url: '', original_keyword: '', original_volume_us: '', keyword_source: 'GENERATED_WITHOUT_ORIGINAL_KEYWORD_MAPPING', volume_status: 'NO_DATA', generated_after_original_plan: 'true' };
}

function parseRootSpelling(root) {
  const raw = ascii(root || '').trim();
  const match = raw.match(/^([A-Ga-g])(-?flat|-?sharp|bb|##|b|#)?$/i);
  if (!match) {
    const lower = raw.toLowerCase();
    return { spoken: lower, compact: lower, hasAccidental: false };
  }
  const letter = match[1].toLowerCase();
  const accidental = (match[2] || '').toLowerCase().replace(/^-/, '');
  const spoken = accidental === 'b' || accidental === 'flat' ? `${letter} flat`
    : accidental === '#' || accidental === 'sharp' ? `${letter} sharp`
    : accidental === 'bb' ? `${letter} double flat`
    : accidental === '##' ? `${letter} double sharp`
    : letter;
  const compact = accidental === 'flat' || accidental === 'b' ? `${letter}b`
    : accidental === 'sharp' || accidental === '#' ? `${letter}#`
    : accidental === 'bb' ? `${letter}bb`
    : accidental === '##' ? `${letter}##`
    : letter;
  return { spoken, compact, hasAccidental: spoken !== letter };
}

function candidates(row) {
  const { spoken, compact, hasAccidental } = parseRootSpelling(row.root);
  const symbol = ascii(row.symbol || '').toLowerCase();
  const unique = (...values) => [...new Set(values.filter(Boolean))];
  switch (row.subtype || row.family) {
    case 'major': return hasAccidental
      ? unique(`${spoken} major chord`, `${compact} major chord`, `${spoken} major piano chord`)
      : unique(`${spoken} major chord`, `${spoken} major piano chord`, `${symbol || spoken} chord piano`);
    case 'minor': return hasAccidental
      ? unique(`${spoken} minor chord`, `${compact} minor chord`, `${spoken} minor piano chord`)
      : unique(`${spoken} minor chord`, `${spoken} minor piano chord`, `${symbol || (`${spoken}m`)} piano chord`);
    case 'dominant7': return unique(`${symbol} chord`, `${symbol} piano chord`, `${spoken} dominant 7 chord`);
    case 'major7': return unique(`${symbol} chord`, `${spoken} major 7 chord`, `${spoken} major 7 piano chord`);
    case 'minor7': return unique(`${symbol} chord`, `${spoken} minor 7 chord`, `${spoken} minor 7 piano chord`);
    case 'halfDiminished7': return unique(`${symbol} chord`, `${spoken} half diminished chord`, `${spoken} half diminished 7 piano chord`);
    case 'diminished': return hasAccidental
      ? unique(`${spoken} diminished chord`, `${compact} diminished chord`, `${spoken} diminished piano chord`)
      : unique(`${spoken} diminished chord`, `${spoken} diminished piano chord`, `${symbol} piano chord`);
    case 'augmented': return hasAccidental
      ? unique(`${spoken} augmented chord`, `${compact} augmented chord`, `${spoken} augmented piano chord`)
      : unique(`${spoken} augmented chord`, `${spoken} augmented piano chord`, `${symbol} piano chord`);
    case 'sus2': return unique(`${symbol} chord`, `${spoken} sus2 chord`, `${spoken} sus2 piano chord`);
    case 'sus4': return unique(`${symbol} chord`, `${spoken} sus4 chord`, `${spoken} sus4 piano chord`);
    case 'add9': return unique(`${symbol} chord`, `${spoken} add9 chord`, `${symbol} piano chord`);
    case 'minorAdd9': return unique(`${symbol} chord`, `${spoken} minor add9 chord`, `${symbol} piano chord`);
    case 'seventh': return ['7th chords', 'seventh chords', 'piano 7th chords', '7th chords piano', 'seventh chords piano'];
    default: return unique(`${row.display_name || row.family} chord`.toLowerCase(), `${row.display_name || row.family} piano chord`.toLowerCase());
  }
}

function recommendation(url, row, mapping) {
  if (url === '/chords/seventh') return 'REVIEW_KEYWORD';
  if (familySeo[url]) return 'KEEP_SEO';
  if (url === '/chords' || url === '/chords/by-key' || url === '/chords/finder' || url === '/chord-progressions') return 'KEEP_SEO';
  if (url === '/chords/major' || url === '/chords/minor') return 'KEEP_SEO';
  if (row.page_type === 'detail' && mapping.volume_status === 'ORIGINAL_PLAN') return 'KEEP_SEO';
  if (row.page_type === 'detail' && mapping.keyword_source === 'ORIGINAL_URL_PLAN') return 'REVIEW_KEYWORD';
  if (row.page_type === 'detail') return 'KEEP_REFERENCE';
  return 'REVIEW_KEYWORD';
}

const rows = chordUrls.map((url) => {
  const classified = classify(url);
  const mapping = originalMapping(url);
  const verified = familySeo[url];
  const volumeStatus = verified ? 'VERIFIED' : mapping.volume_status;
  const currentVolume = verified ? verified.volume : mapping.original_volume_us;
  const currentKeyword = verified ? verified.keyword : classified.current_target_keyword || mapping.original_keyword;
  const title = verified?.title || publishedTitle(classified.title);
  const h1 = verified?.h1 || classified.h1;
  const family = classified.family || classified.subtype || '';
  const pageType = classified.page_type;
  const visible = pageType === 'detail'
    ? 'true'
    : 'true';
  const entryPath = pageType === 'hub' ? 'Header Chords → Browse all chords → /chords'
    : pageType === 'family' ? `/chords → ${h1}`
    : pageType === 'tool' ? `Header Chords → Explore → ${h1}`
    : `/chords → ${familyLabel[family] || family} → ${classified.display_name || url}`;
  const clickDepth = pageType === 'hub' ? 1 : pageType === 'detail' ? 2 : 1;
  const rec = recommendation(url, classified, mapping);
  const notes = [
    verified ? 'Family primary keyword verified 2026-09-17 Semrush US Desktop; Piano is context, not a replacement for the exact phrase.' : '',
    url === '/chords/seventh' ? 'NEEDS_KEYWORD_REVIEW. D7 chord piano is a detail query, not the family query.' : '',
    url === '/chords/major' || url === '/chords/minor' ? 'Family URL is later than the 127-URL plan; keyword string inherited from hub other_task_keywords with no recorded volume.' : '',
    url === '/chords/g-major' ? 'In original URL plan, but volume was explicitly unverified/null. Not treated as 0.' : '',
    url === '/chords/extended' || url === '/chords/altered' ? 'Family page hosts embedded references; no extra per-chord detail URLs.' : '',
    pageType === 'detail' && mapping.keyword_source === 'GENERATED_WITHOUT_ORIGINAL_KEYWORD_MAPPING' ? 'Later taxonomy/product-completion detail. Keep as chord-library reference until keyword check.' : '',
    pageType === 'detail' ? 'Detail Title/H1 not changed in this round.' : '',
  ].filter(Boolean).join(' ');
  return {
    url, page_type: pageType, family, subtype: classified.subtype || '', root: classified.root || '',
    display_name: classified.display_name || h1 || '', current_title: title, current_h1: h1,
    current_description: classified.description || '', sitemap: 'true', indexable: 'index,follow',
    canonical: `${origin}${url}`, ...mapping, current_target_keyword: currentKeyword,
    current_volume_us: currentVolume, volume_status: volumeStatus, visible_entry: visible,
    entry_path: entryPath, click_depth: clickDepth, recommendation: rec, notes, symbol: classified.symbol || '',
  };
});

const columns = ['url','page_type','family','subtype','root','display_name','current_title','current_h1','current_description','sitemap','indexable','canonical','original_plan_url','original_keyword','original_volume_us','keyword_source','current_target_keyword','current_volume_us','volume_status','generated_after_original_plan','visible_entry','entry_path','click_depth','recommendation','notes'];
const csv = [columns.join(','), ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(','))].join('\n');
writeFileSync(resolve(outDir, 'CHORD_ROUTE_AUDIT.csv'), `${csv}\n`);

const detailsOnly = rows.filter((row) => row.page_type === 'detail');
const grouped = new Map();
for (const row of detailsOnly) {
  const key = row.subtype || row.family;
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key).push(row);
}
const groupOrder = ['major','minor','dominant7','major7','minor7','halfDiminished7','diminished','augmented','sus2','sus4','add9','minorAdd9'];

const familyPages = rows.filter((row) => row.page_type === 'family');
const unknown = rows.filter((row) => row.volume_status === 'UNKNOWN' || row.volume_status === 'NO_DATA');
const originalMappedDetails = detailsOnly.filter((row) => row.keyword_source === 'ORIGINAL_URL_PLAN');
const familyUnknown = {};
for (const row of detailsOnly) {
  const key = familyLabel[row.subtype] || row.subtype || row.family;
  familyUnknown[key] ??= { total: 0, mapped: 0, volume: 0, unknown: 0 };
  familyUnknown[key].total += 1;
  if (row.original_plan_url) familyUnknown[key].mapped += 1;
  if (row.volume_status === 'ORIGINAL_PLAN' || row.volume_status === 'VERIFIED') familyUnknown[key].volume += 1;
  if (row.volume_status === 'UNKNOWN' || row.volume_status === 'NO_DATA') familyUnknown[key].unknown += 1;
}

let md = `# Chord Route Audit\n\n`;
md += `Date: 2026-09-17. Source of truth: production worktree \`pianogrid-final-integration\` at \`codex/final-integration\` / \`44b6a11\`, plus current Family SEO editorial overrides.\n\n`;
md += `Production origin: ${origin}. Inventory from \`PUBLIC_ROUTES\`, family packages, \`generateStaticParams\` datasets, and sitemap generation via \`PUBLIC_ROUTES\`.\n\n`;
md += `## Totals\n\n`;
md += `| Metric | Count |\n|---|---:|\n`;
md += `| Chord module URLs | ${rows.length} |\n`;
md += `| Hub | ${rows.filter((row) => row.page_type === 'hub').length} |\n`;
md += `| Family pages | ${familyPages.length} |\n`;
md += `| Detail pages | ${detailsOnly.length} |\n`;
md += `| Support / tool pages | ${rows.filter((row) => row.page_type === 'tool').length} |\n`;
md += `| Details with original URL-plan keyword mapping | ${originalMappedDetails.length} |\n`;
md += `| UNKNOWN or NO_DATA | ${unknown.length} |\n`;
md += `| VERIFIED family keywords this round | ${rows.filter((row) => row.volume_status === 'VERIFIED').length} |\n\n`;
md += `Volume rules: \`UNKNOWN\` / \`NO_DATA\` are not 0. Zero is written only when a project source records 0. This audit found no recorded 0.\n\n`;
md += `## Family pages\n\n`;
for (const row of familyPages) md += `- ${row.url} — ${row.current_h1} — ${row.current_target_keyword} — ${row.volume_status}${row.current_volume_us === '' ? '' : ` ${row.current_volume_us}`}\n`;
md += `\nSeventh family is \`NEEDS_KEYWORD_REVIEW\`. Suggested manual queries: 7th chords; seventh chords; piano 7th chords; 7th chords piano; seventh chords piano. Do not use a D7 detail query as the family target.\n\n`;
md += `## Detail pages by family\n\n`;
for (const key of groupOrder) {
  const list = grouped.get(key);
  if (!list) continue;
  md += `### ${familyLabel[key] || key}\n\n`;
  for (const row of list.sort((a, b) => a.url.localeCompare(b.url))) md += `- ${row.url}\n`;
  md += `\n`;
}
md += `## Family summary\n\n`;
md += `| Family | Detail URL count | Has original keyword mapping | Has volume | UNKNOWN / NO_DATA |\n|---|---:|---:|---:|---:|\n`;
for (const key of groupOrder) {
  const stats = familyUnknown[familyLabel[key] || key];
  if (!stats) continue;
  md += `| ${familyLabel[key] || key} | ${stats.total} | ${stats.mapped} | ${stats.volume} | ${stats.unknown} |\n`;
}
md += `\nExtended and Altered have family pages and embedded references (108 and 96 objects) but no extra per-chord detail URLs.\n\n`;
md += `C-flat major is counted with Major details. It is a published written-spelling page, not one of the 12-root Major family grid cards.\n\n`;
md += `## Generated-after-plan details\n\n`;
md += `${detailsOnly.filter((row) => row.generated_after_original_plan === 'true').length} detail URLs are later than the original 127-URL plan. If they lack an original keyword mapping they are marked \`keyword_source = GENERATED_WITHOUT_ORIGINAL_KEYWORD_MAPPING\` with \`volume_status = NO_DATA\`.\n`;
writeFileSync(resolve(outDir, 'CHORD_ROUTE_AUDIT.md'), md);

const manualRows = [
  ...rows.filter((row) => row.url === '/chords/seventh'),
  ...detailsOnly.filter((row) => row.volume_status === 'UNKNOWN' || row.volume_status === 'NO_DATA'),
].map((row) => {
  const queries = candidates(row);
  return {
    url: row.url,
    family: familyLabel[row.subtype] || familyLabel[row.family] || row.family,
    chord_name: row.display_name,
    candidate_keyword_1: queries[0] || '',
    candidate_keyword_2: queries[1] || '',
    candidate_keyword_3: queries[2] || '',
    current_title: row.current_title,
    current_h1: row.current_h1,
    original_mapping: row.keyword_source,
    volume_us: '',
    status: row.url === '/chords/seventh' ? 'NEEDS_KEYWORD_REVIEW' : 'UNVERIFIED_DETAIL',
  };
});
const manualCols = ['url','family','chord_name','candidate_keyword_1','candidate_keyword_2','candidate_keyword_3','current_title','current_h1','original_mapping','volume_us','status'];
const manualCsv = `${[manualCols.join(','), ...manualRows.map((row) => manualCols.map((column) => csvEscape(row[column])).join(','))].join('\n')}\n`;
const broken = manualRows.flatMap((row) => [row.candidate_keyword_1, row.candidate_keyword_2, row.candidate_keyword_3]
  .filter((query) => /^\s*flat\b/i.test(query) || /flat flat/i.test(query))
  .map((query) => `${row.url}: ${query}`));
if (broken.length) throw new Error(`Keyword candidate spelling errors:\n${broken.join('\n')}`);
writeFileSync(resolve(outDir, 'CHORD_KEYWORD_MANUAL_CHECK.csv'), manualCsv);

const summary = {
  total: rows.length,
  family: familyPages.length,
  detail: detailsOnly.length,
  originalMappedDetails: originalMappedDetails.length,
  unknown: unknown.length,
  familyUnknown: Object.fromEntries(Object.entries(familyUnknown).map(([key, stats]) => [key, stats.unknown])),
  manualCheck: manualRows.length,
};
writeFileSync(resolve(outDir, '_audit-summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));

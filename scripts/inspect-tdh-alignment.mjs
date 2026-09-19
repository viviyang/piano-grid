import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const src = String(text).replace(/^\uFEFF/, '');
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') { cell += '"'; i += 1; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
    else cell += ch;
  }
  if (cell.length || row.length) { row.push(cell.replace(/\r$/, '')); rows.push(row); }
  const header = rows.shift() || [];
  return rows.filter((item) => item.some((value) => value !== '')).map((item) => {
    const out = {};
    header.forEach((key, index) => { out[key] = item[index] ?? ''; });
    return out;
  });
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const alignment = parseCsv(readFileSync(resolve(root, 'docs/seo/chords/evidence-2026-09-18/tdh-alignment-2026-09-19/CHORD_TDH_ALIGNMENT.csv'), 'utf8'));
const b7 = alignment.find((row) => row.url === '/chords/b-7');
const inspect = {
  rows: alignment.length,
  unique_current_titles: new Set(alignment.map((row) => row.current_title)).size,
  unique_suggested_titles: new Set(alignment.filter((row) => row.suggested_title).map((row) => row.suggested_title)).size,
  b7: {
    current_title: b7.current_title,
    current_h1: b7.current_h1,
    suggested_title: b7.suggested_title,
    suggested_h1: b7.suggested_h1,
    suggested_description: b7.suggested_description,
    suggested_intro: b7.suggested_intro,
    generic_query: b7.generic_query,
    generic_volume: b7.generic_volume,
    piano_query: b7.piano_query,
    piano_volume: b7.piano_volume,
    related_piano_queries: b7.related_piano_queries,
    query_source: b7.query_source,
    query_date: b7.query_date,
    intent_fit: b7.intent_fit,
    applied: b7.applied,
    execution_state: b7.execution_state,
  },
  identities: ['/chords/b-7', '/chords/b-maj7', '/chords/b-m7', '/chords/b-m7-flat5', '/chords/b-minor', '/chords/b-flat-7', '/chords/c-m7', '/chords/c-madd9', '/chords/c-sus2', '/chords/c-sus4', '/chords/c-maj7'].map((url) => {
    const row = alignment.find((item) => item.url === url);
    return row ? { url, symbol: row.symbol, h1: row.current_h1, suggested: row.suggested_h1, issue: row.issue_type } : { url, missing: true };
  }),
  protected: alignment.filter((row) => row.upstream_protected === 'true').map((row) => ({ url: row.url, h1: row.current_h1, title: row.current_title })),
  hold: alignment.filter((row) => row.execution_state === 'HOLD_PRODUCT_REVIEW').map((row) => row.url),
};
console.log(JSON.stringify(inspect, null, 2));

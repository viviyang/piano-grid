/**
 * Query-string candidates for Chord SEO checks.
 * Root identity comes from structured letter + accidental + quality fields.
 * Display spelling, query normalization, and URL slugs stay separate.
 */
const LETTERS = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G']);

export function asciiAccidentals(value) {
  return String(value ?? '')
    .replaceAll('\u266F', '#')
    .replaceAll('\u266D', 'b')
    .replaceAll('\uD834\uDD2A', '##')
    .replaceAll('\uD834\uDD2B', 'bb');
}

export function normalizeLegalAccidentals(value) {
  return String(value ?? '').replace(/([A-Ga-g])([\u266F#\u266Db]{1,2})/g, (_, letter, mark) => {
    const accidental = mark.replaceAll('\u266F', '#').replaceAll('\u266D', 'b');
    return letter + accidental;
  });
}

export function queryForm(value) {
  return asciiAccidentals(value).trim().toLowerCase();
}

export function parseRootSpelling(root) {
  const raw = asciiAccidentals(root).trim();
  const match = raw.match(/^([A-Ga-g])(-?flat|-?sharp|bb|##|b|#)?$/);
  if (!match) {
    return { letter: '', accidental: 'unknown', spoken: queryForm(raw), compact: queryForm(raw), hasAccidental: false };
  }
  const letter = match[1].toUpperCase();
  if (!LETTERS.has(letter)) {
    return { letter: '', accidental: 'unknown', spoken: queryForm(raw), compact: queryForm(raw), hasAccidental: false };
  }
  const accidentalRaw = (match[2] || '').toLowerCase().replace(/^-/, '');
  const accidental = accidentalRaw === 'b' || accidentalRaw === 'flat' ? 'flat'
    : accidentalRaw === '#' || accidentalRaw === 'sharp' ? 'sharp'
    : accidentalRaw === 'bb' ? 'double-flat'
    : accidentalRaw === '##' ? 'double-sharp'
    : 'natural';
  const spokenLetter = letter.toLowerCase();
  const spoken = accidental === 'flat' ? spokenLetter + ' flat'
    : accidental === 'sharp' ? spokenLetter + ' sharp'
    : accidental === 'double-flat' ? spokenLetter + ' double flat'
    : accidental === 'double-sharp' ? spokenLetter + ' double sharp'
    : spokenLetter;
  const compact = accidental === 'flat' ? spokenLetter + 'b'
    : accidental === 'sharp' ? spokenLetter + '#'
    : accidental === 'double-flat' ? spokenLetter + 'bb'
    : accidental === 'double-sharp' ? spokenLetter + '##'
    : spokenLetter;
  return { letter, accidental, spoken, compact, hasAccidental: accidental !== 'natural' };
}

function uniqueQueries(...values) {
  const seen = new Set();
  const out = [];
  for (const value of values) {
    const query = String(value ?? '').replace(/\s+/g, ' ').trim();
    if (!query || seen.has(query)) continue;
    seen.add(query);
    out.push(query);
  }
  return out;
}

function aliasQueries(aliases) {
  const out = [];
  for (const alias of aliases || []) {
    const compact = queryForm(alias);
    if (!compact) continue;
    out.push(compact + ' chord', compact + ' piano chord');
    const noParens = compact.replace(/[()]/g, '');
    if (noParens !== compact) out.push(noParens + ' chord', noParens + ' piano chord');
  }
  return out;
}

export function queryCandidates(row) {
  const subtype = row.subtype || row.family;
  if (subtype === 'seventh' && (row.url === '/chords/seventh' || !row.root)) {
    return uniqueQueries('7th chords', 'seventh chords', 'piano 7th chords', '7th chords piano', 'seventh chords piano');
  }
  const parsed = parseRootSpelling(row.root);
  const spoken = parsed.spoken;
  const compact = parsed.compact;
  const hasAccidental = parsed.hasAccidental;
  const letter = parsed.letter;
  if (!letter) {
    throw new Error('Missing structured root for ' + (row.url || row.display_name || 'unknown chord'));
  }
  const symbol = queryForm(row.symbol);
  const extras = aliasQueries(row.aliases);
  switch (subtype) {
    case 'major':
      return uniqueQueries(
        spoken + ' major chord',
        hasAccidental ? compact + ' major chord' : spoken + ' major piano chord',
        hasAccidental ? spoken + ' major piano chord' : (symbol || spoken) + ' chord piano',
        ...extras,
      );
    case 'minor':
      return uniqueQueries(
        spoken + ' minor chord',
        hasAccidental ? compact + ' minor chord' : spoken + ' minor piano chord',
        hasAccidental ? spoken + ' minor piano chord' : (symbol || (spoken + 'm')) + ' piano chord',
        ...extras,
      );
    case 'dominant7':
      return uniqueQueries(symbol + ' chord', symbol + ' piano chord', spoken + ' dominant 7 chord', ...extras);
    case 'major7':
      return uniqueQueries(symbol + ' chord', spoken + ' major 7 chord', spoken + ' major 7 piano chord', ...extras);
    case 'minor7':
      return uniqueQueries(symbol + ' chord', spoken + ' minor 7 chord', spoken + ' minor 7 piano chord', ...extras);
    case 'halfDiminished7':
      return uniqueQueries(symbol + ' chord', spoken + ' half diminished chord', spoken + ' half diminished 7 piano chord', ...extras);
    case 'diminished':
      return uniqueQueries(
        spoken + ' diminished chord',
        hasAccidental ? compact + ' diminished chord' : spoken + ' diminished piano chord',
        hasAccidental ? spoken + ' diminished piano chord' : symbol + ' piano chord',
        ...extras,
      );
    case 'augmented':
      return uniqueQueries(
        spoken + ' augmented chord',
        hasAccidental ? compact + ' augmented chord' : spoken + ' augmented piano chord',
        hasAccidental ? spoken + ' augmented piano chord' : symbol + ' piano chord',
        ...extras,
      );
    case 'sus2':
      return uniqueQueries(symbol + ' chord', spoken + ' sus2 chord', spoken + ' sus2 piano chord', ...extras);
    case 'sus4':
      return uniqueQueries(symbol + ' chord', spoken + ' sus4 chord', spoken + ' sus4 piano chord', ...extras);
    case 'add9':
      return uniqueQueries(
        symbol + ' chord',
        spoken + ' add9 chord',
        symbol + ' piano chord',
        symbol.replace(/[()]/g, '') !== symbol ? symbol.replace(/[()]/g, '') + ' chord' : '',
        ...extras,
      );
    case 'minorAdd9':
      return uniqueQueries(
        symbol + ' chord',
        spoken + ' minor add9 chord',
        symbol + ' piano chord',
        symbol.replace(/[()]/g, '') ? symbol.replace(/[()]/g, '') + ' chord' : '',
        ...extras,
      );
    case 'seventh':
      return uniqueQueries('7th chords', 'seventh chords', 'piano 7th chords', '7th chords piano', 'seventh chords piano');
    default:
      return uniqueQueries(
        queryForm(row.display_name || row.family) + ' chord',
        queryForm(row.display_name || row.family) + ' piano chord',
        ...extras,
      );
  }
}

export function assertCandidateQuality(query, url) {
  const trimmed = String(query ?? '');
  if (trimmed !== trimmed.trim() || /\s{2,}/.test(trimmed) || trimmed.includes('\n')) {
    throw new Error('Untrimmed or concatenated candidate for ' + url + ': ' + JSON.stringify(query));
  }
  if (!trimmed) throw new Error('Empty candidate for ' + url);
  if (/^\s*flat\b/i.test(trimmed) || /flat flat/i.test(trimmed)) {
    throw new Error('B/B-flat parse error for ' + url + ': ' + trimmed);
  }
}

export function candidateQueryMap(rows) {
  const map = new Map();
  const collisions = [];
  for (const row of rows) {
    const queries = queryCandidates(row);
    for (const query of queries) {
      assertCandidateQuality(query, row.url);
      const prior = map.get(query);
      if (prior && prior !== row.url) collisions.push({ query, urls: [prior, row.url] });
      else map.set(query, row.url);
    }
  }
  if (collisions.length) {
    throw new Error('Query mapped to multiple URLs:\n' + collisions.map((item) => item.query + ' -> ' + item.urls.join(' | ')).join('\n'));
  }
  return map;
}

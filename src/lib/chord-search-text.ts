/** Compact a typed chord name so Bb, B-flat, and B♭ match the same library row. */
export function compactChordSearchText(value: string): string {
  return value
    .toLowerCase()
    .replaceAll('♭', 'b')
    .replaceAll('♯', '#')
    .replaceAll('♮', '')
    .replace(/-?flats?\b/g, 'b')
    .replace(/-?sharps?\b/g, '#')
    .replace(/[^a-z0-9#]+/g, '');
}

export function chordSearchMatches(query: string, fields: Iterable<string>): boolean {
  const raw = query.trim();
  if (!raw) return true;
  const lower = raw.toLowerCase();
  const compactQuery = compactChordSearchText(raw);
  for (const field of fields) {
    if (field.toLowerCase().includes(lower)) return true;
    if (compactQuery.length >= 2 && compactChordSearchText(field).includes(compactQuery)) return true;
  }
  return false;
}

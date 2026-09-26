/** Reader-facing attribution. Remove review bookkeeping, never evidence limits. */
export function publicSourceText(text: string): string {
  return text
    .replace(/no independent(?:ly)? authorized fingering dataset is provided[^.]*\.?/gi, 'Fingerings are not provided. The diagrams show note positions, not a prescribed hand shape.')
    .replace(/no independent fingering dataset is authorized[^.]*\.?/gi, 'Fingerings are not provided. The diagrams show note positions, not a prescribed hand shape.')
    .replace(/competitor family coverage/gi, '')
    .replace(/cross-check examples only/gi, 'Example comparison only')
    .replace(/visually checked in the approved Scales plan evidence/gi, '')
    .replace(/approved[- ]plan evidence/gi, '')
    .replace(/\bchecked \d{4}-\d{2}-\d{2}(?:\s*·\s*(?:AT|AM|AN|PG|N2[A-D])-[A-Z0-9-]+)?/gi, '')
    .replace(/\b(?:AT|AM|AN|PG|N2[A-D])-[A-Z0-9-]+\b/g, '')
    .replace(/Screenshots?:\s*(?:turn\d+(?:view|search|file)\d+[;,\s]*)+/gi, '')
    .replace(/\bturn\d+(?:view|search|file)\d+\b/g, '')
    .replace(/Source record:\s*/gi, '')
    .replace(/Checked for:\s*/gi, 'Supports: ')
    .replace(/source-scoped/gi, 'source-specific')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.;])/g, '$1')
    .replace(/([,;])\s*\./g, '.')
    .replace(/^[,;.\s]+|[,;\s]+$/g, '')
    .trim();
}

/** A triad has root position plus TWO inversions, not three inversions. */
export function publicTriadDescription(path: string, description: string): string {
  // Restrict this correction to existing major/minor chord detail paths.
  // Seventh chords really do have three inversions and must remain unchanged.
  return /^\/chords\/[a-g](?:-flat|-sharp)?-(?:major|minor)$/.test(path)
    ? description.replace(/compare three inversions/gi, 'compare root position and two inversions')
    : description;
}

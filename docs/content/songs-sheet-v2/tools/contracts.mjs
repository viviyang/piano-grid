/** Portable adapter contract examples. No framework/dependency assumption.
 * Server/build code must supply approvals; never accept rights or flags from URL input.
 */
export function safeProviderUrl(value) {
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password ? u.href : null; }
  catch { return null; }
}
export function capabilities(record, approvals = {}) {
  const external = record.availability === 'EXTERNAL_REFERENCE';
  const approved = approvals[record.arrangement_id];
  const local = !external && approved?.content === true && approved?.rights === true && approved?.engineering === true && approved?.humanSmoke === true;
  return Object.freeze({
    openProvider: external && !!safeProviderUrl(record.provider_url),
    previewLocal: local && !!record.score_asset_id && approved?.scoreAssetExists === true,
    printLocal: local && !!record.score_asset_id && approved?.pdfAssetExists === true,
    playLocal: local && !!record.audio_asset_id && approved?.audioAssetExists === true,
    tempoAndSegments: local && approved?.eventSchedulerVerified === true,
    assessPerformance: false,
    checkout: false
  });
}
export function matchesVerified(record, filters = {}) {
  // Unknown does not count as a positive match. Multi-hands != hands-together.
  if (filters.access && record.access_kind !== filters.access) return false;
  if (filters.key && record.key !== filters.key) return false;
  if (filters.hand && (!Array.isArray(record.hands) || !record.hands.includes(filters.hand))) return false;
  if (filters.singleHand && (!Array.isArray(record.hands) || record.hands.length !== 1)) return false;
  if (filters.withFingerNumbers && record.finger_numbers_verified !== true) return false;
  return true;
}
export function parsePracticeHash(hash, records) {
  const fallback = {ok:false, error:'invalid_or_unavailable_selection'};
  if (typeof hash !== 'string' || hash.length > 350) return fallback;
  const p = new URLSearchParams(hash.replace(/^#/,''));
  for (const key of p.keys()) if (!['pg-arr','pg-ex','segment','speed'].includes(key) || p.getAll(key).length !== 1) return fallback;
  if (p.has('pg-arr') && p.has('pg-ex')) return fallback;
  const id = p.get('pg-arr'); const slug = p.get('pg-ex');
  const rec = records.find(r => id ? r.arrangement_id === id : slug && r.arrangement_id === `arr-pg-${slug}-v1`);
  if (!rec) return fallback;
  const segment = p.get('segment') || 'all'; const speed = Number(p.get('speed') || '100');
  if (![50,75,100].includes(speed)) return fallback;
  const external = rec.availability === 'EXTERNAL_REFERENCE';
  if (external && (segment !== 'all' || speed !== 100)) return fallback;
  if (!external && !(rec.segments || []).some(s => s.id === segment)) return fallback;
  return {ok:true, arrangementId:rec.arrangement_id, segment, speed};
}
export function practiceUrl(page, record, segment='all', speed=100) {
  const u = new URL(page,'https://pianogrid.com');
  if (u.origin !== 'https://pianogrid.com' || u.search) throw new Error('Use an approved canonical PianoGrid page');
  const p = new URLSearchParams({'pg-arr':record.arrangement_id,segment,speed:String(speed)});
  const decoded = parsePracticeHash('#'+p.toString(),[record]);
  if (!decoded.ok) throw new Error('Unsupported version/segment/speed');
  u.hash = p.toString(); return u.href;
}

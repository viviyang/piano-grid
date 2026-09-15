/** Executable reference gate. Adapt into one server/build pipeline, not a second engine.
 * All approval/QA context must come from reviewed repository records, NEVER browser input.
 * This validates records, not the truth of a legal opinion or a human approval. */
const ACTIONS = new Set(['display', 'download', 'print', 'play']);
const LAYERS = ['work','arrangement','engraving','recording','samples','fonts'];
const SAFE_PATH = /^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[A-Za-z0-9_./-]+$/;
const SHA = /^[a-f0-9]{64}$/;
export function safeProviderUrl(raw) {
  try { const u=new URL(raw); return u.protocol==='https:' && !u.username && !u.password ? u.href : null; }
  catch { return null; }
}
export function validateCatalog(c) {
  const errors=[];
  const make=(rows,key)=>{
    const map=new Map();
    if (!Array.isArray(rows)) { errors.push(`missing_list:${key}`); return map; }
    for (const r of rows) {
      if (!r || typeof r[key]!=='string' || !r[key]) {errors.push(`invalid_id:${key}`);continue;}
      if(map.has(r[key]))errors.push(`duplicate:${r[key]}`);map.set(r[key],r);
    } return map;
  };
  const ws=make(c.works,'work_id'), as=make(c.arrangements,'arrangement_id'),
    rs=make(c.resources,'resource_id'), fs=make(c.assets,'asset_id');
  for(const a of as.values()) {
    if(!ws.has(a.work_id))errors.push(`missing_work:${a.arrangement_id}`);
    for(const id of a.resource_ids||[])if(rs.get(id)?.arrangement_id!==a.arrangement_id)errors.push(`wrong_resource:${id}`);
    for(const id of [a.score_asset_id,a.audio_asset_id,a.music_events_asset_id].filter(Boolean))
      if(fs.get(id)?.arrangement_id!==a.arrangement_id)errors.push(`wrong_asset:${id}`);
  }
  for(const r of rs.values()) {
    const a=as.get(r.arrangement_id);
    if(!a||a.work_id!==r.work_id)errors.push(`resource_identity:${r.resource_id}`);
    if(r.location==='external' && !safeProviderUrl(r.provider_url))errors.push(`unsafe_provider:${r.resource_id}`);
    if(r.location==='external' && r.asset_ids?.length)errors.push(`external_has_local_assets:${r.resource_id}`);
    for(const id of r.asset_ids||[])if(fs.get(id)?.resource_id!==r.resource_id)errors.push(`resource_asset:${id}`);
  }
  for(const f of fs.values()) {
    const a=as.get(f.arrangement_id),r=rs.get(f.resource_id);
    if(!a||!r||a.work_id!==f.work_id||r.arrangement_id!==f.arrangement_id)errors.push(`asset_identity:${f.asset_id}`);
    if(!SHA.test(f.sha256||'')||!Number.isInteger(f.bytes)||f.bytes<=0)errors.push(`asset_hash_or_size:${f.asset_id}`);
    if(!SAFE_PATH.test(f.path||''))errors.push(`asset_path:${f.asset_id}`);
  }
  return {ok:errors.length===0, errors};
}
function requiredQa(asset,action) {
  const qa=asset.validation||{};
  if(!['passed','PASS_FORMAT_AND_SIGNAL_CHECKS'].includes(qa.format_signal_check))return 'format_not_passed';
  if(qa.independent_music_review!=='passed')return 'independent_music_review_pending';
  const score=/\.(?:pdf|svg)$/.test(asset.path);
  if(score && qa.visual_notation!=='passed')return 'visual_notation_pending';
  if(score && ['download','print'].includes(action) && qa.physical_print!=='passed')return 'physical_print_pending';
  if(action==='play' && qa.human_listening!=='passed')return 'human_listening_pending';
  return null;
}
export function canPublishAsset(c,assetId,action,context) {
  const no=(reason)=>({allowed:false,reason});
  if(!ACTIONS.has(action))return no('unsupported_action');
  const asset=c.assets?.find(a=>a.asset_id===assetId);
  if(!asset)return no('asset_not_found');
  const arrangement=c.arrangements?.find(a=>a.arrangement_id===asset.arrangement_id);
  const resource=c.resources?.find(r=>r.resource_id===asset.resource_id);
  if(!arrangement||resource?.location!=='local'||resource.arrangement_id!==arrangement.arrangement_id||asset.work_id!==arrangement.work_id)
    return no('identity_mismatch');
  if(asset.release_state!=='approved'||arrangement.release?.public_asset_enabled!==true)return no('staging_or_withdrawn');
  const q=requiredQa(asset,action);if(q)return no(q);
  const deployed=context?.deploymentTerritories;
  const now=Date.parse(context?.now||'');
  if(!Array.isArray(deployed)||!deployed.length||!Number.isFinite(now)||context?.commercialSite!==true)
    return no('invalid_deployment_context');
  // Region-only deployment requires enforced access restriction, not user geolocation.
  if(!deployed.includes('WORLDWIDE')&&context?.territorialRestrictionVerified!==true)
    return no('territorial_restriction_not_verified');
  const evidence=new Set((c.rights_evidence||[]).map(r=>r.rights_id));
  const grants=c.runtime_grants||[];
  const grant=grants.find(g=>{
    if(g.status!=='approved'||g.asset_id!==assetId||g.sha256!==asset.sha256||g.action!==action||
      g.arrangement_id!==arrangement.arrangement_id||g.edition_revision!==arrangement.edition_revision||
      g.commercial_use!==true||!g.approved_by?.trim()||!g.approval_record?.trim())return false;
    if(!Array.isArray(g.territories)||!deployed.every(t=>g.territories.includes('WORLDWIDE')||g.territories.includes(t)))return false;
    const issued=Date.parse(g.issued_at),expiry=g.expires_at===null?Infinity:Date.parse(g.expires_at);
    if(!Number.isFinite(issued)||issued>now||!(expiry>now))return false;
    if(!Array.isArray(g.evidence_ids)||!g.evidence_ids.length||!g.evidence_ids.every(id=>evidence.has(id)))return false;
    if(!g.evidence_ids.includes(asset.rights_record_id))return false;
    return LAYERS.every(k=>['allow','not_applicable'].includes(g.layers?.[k]?.decision)&&g.layers[k].basis?.trim());
  });
  return grant?{allowed:true,reason:'reviewed_records_match',grantId:grant.grant_id}:no('no_matching_approved_grant');
}
export function capabilities(c,resourceId,context) {
  const r=c.resources?.find(r=>r.resource_id===resourceId);
  const a=c.arrangements?.find(a=>a.arrangement_id===r?.arrangement_id);
  const f=(id,action)=>id?canPublishAsset(c,id,action,context).allowed:false;
  const local=r?.location==='local';
  const printable=(r?.asset_ids||[]).filter(id=>c.assets.find(x=>x.asset_id===id)?.path.endsWith('.pdf'));
  const events=a?.music_events_asset_id;
  const localPlay=local&&f(a?.audio_asset_id,'play');
  return Object.freeze({
    openProvider:r?.location==='external'&&!!safeProviderUrl(r.provider_url),
    previewLocal:local&&f(a?.score_asset_id,'display'),
    downloadLocal:local&&printable.some(id=>f(id,'download')),
    printLocal:local&&printable.some(id=>f(id,'print')),
    playLocal:localPlay,
    tempoAndSegments:localPlay&&f(events,'play')&&context?.eventSchedulerVerified===true,
    assessPerformance:false,checkout:false,
  });
}
export function parsePracticeHash(hash,arrangements,aliases={}) {
  const fail={ok:false,error:'invalid_or_unavailable_selection'};
  if(typeof hash!=='string'||hash.length>350)return fail;
  const p=new URLSearchParams(hash.replace(/^#/,''));
  for(const k of p.keys())if(!['pg-arr','pg-ex','segment','speed'].includes(k)||p.getAll(k).length!==1)return fail;
  if(p.has('pg-arr')&&p.has('pg-ex'))return fail;
  const id=p.get('pg-arr')||aliases[p.get('pg-ex')];
  const a=arrangements.find(x=>x.arrangement_id===id);if(!a)return fail;
  const segment=p.get('segment')||'all',rawSpeed=p.get('speed')||'100';
  if(!['50','75','100'].includes(rawSpeed))return fail;
  const speed=Number(rawSpeed),external=a.representation==='external_reference';
  if(external&&(segment!=='all'||speed!==100))return fail;
  if(!external&&!(a.segments||[]).some(s=>s.id===segment))return fail;
  return {ok:true,arrangementId:a.arrangement_id,segment,speed,autoplay:false};
}
export function practiceUrl(path,a,segment='all',speed=100,allowedPaths=[]) {
  if(!allowedPaths.includes(path))throw new Error('Unapproved destination');
  const u=new URL(path,'https://pianogrid.com');
  if(u.origin!=='https://pianogrid.com'||u.search||u.hash)throw new Error('Use a canonical path');
  const p=new URLSearchParams({'pg-arr':a.arrangement_id,segment,speed:String(speed)});
  if(!parsePracticeHash('#'+p,[a]).ok)throw new Error('Unsupported practice state');
  u.hash=p.toString();return u.href;
}

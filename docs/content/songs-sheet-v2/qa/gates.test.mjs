/** Test-only grants are synthetic and MUST NOT be copied into content-data/runtime_grants. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateCatalog,canPublishAsset,capabilities,parsePracticeHash,practiceUrl,safeProviderUrl} from '../contracts/gates.mjs';
const c=JSON.parse(fs.readFileSync(new URL('../content-data/catalog.v2.json',import.meta.url),'utf8'));
const ctx={now:'2026-09-15T02:00:00Z',deploymentTerritories:['WORLDWIDE'],commercialSite:true,eventSchedulerVerified:true};
const original=c.arrangements.find(a=>a.arrangement_id==='arr-pg-step-and-hold-v1');
const external=c.arrangements.find(a=>a.arrangement_id==='arr-ext-0a05b7954f5256');
const aliases={'step-and-hold':original.arrangement_id,'left-hand-answer':'arr-pg-left-hand-answer-v1','one-hand-at-a-time':'arr-pg-one-hand-at-a-time-v1'};
function fixture(action='display',select=(a)=>a.score_asset_id) {
 const d=structuredClone(c),a=d.arrangements.find(x=>x.arrangement_id===original.arrangement_id);
 a.release.public_asset_enabled=true;
 const id=select(a),asset=d.assets.find(f=>f.asset_id===id);
 asset.release_state='approved';asset.validation={format_signal_check:'passed',independent_music_review:'passed',visual_notation:'passed',human_listening:'passed',physical_print:'passed',teacher_review:'not_reviewed'};
 const g={grant_id:'TEST-ONLY-NOT-A-REAL-GRANT',asset_id:id,sha256:asset.sha256,arrangement_id:a.arrangement_id,edition_revision:a.edition_revision,
 status:'approved',action,territories:['WORLDWIDE'],commercial_use:true,issued_at:'2026-09-14T00:00:00Z',expires_at:null,
 approved_by:'TEST FIXTURE',approval_record:'test-only/non-publishable',evidence_ids:[asset.rights_record_id],
 layers:Object.fromEntries(['work','arrangement','engraving','recording','samples','fonts'].map(k=>[k,{decision:'allow',basis:'TEST FIXTURE; not an actual licence'}]))};
 d.runtime_grants.push(g);return {d,id,g,asset,a};
}
test('real catalog IDs and asset ownership resolve',()=>assert.deepEqual(validateCatalog(c),{ok:true,errors:[]}));
test('real catalog has no runtime grants',()=>assert.equal(c.runtime_grants.length,0));
test('all real local resources remain off publicly',()=>{
 for(const r of c.resources.filter(r=>r.location==='local')){
  const caps=capabilities(c,r.resource_id,ctx);for(const k of ['previewLocal','playLocal','printLocal','downloadLocal','tempoAndSegments'])assert.equal(caps[k],false);
 }
});
test('external resource opens provider but cannot expose local capability',()=>{
 const caps=capabilities(c,external.resource_ids[0],ctx);assert.equal(caps.openProvider,true);assert.equal(caps.playLocal,false);assert.equal(caps.previewLocal,false);
});
test('synthetic approved record matches only its precise action',()=>{const {d,id}=fixture();assert.equal(canPublishAsset(d,id,'display',ctx).allowed,true);assert.equal(canPublishAsset(d,id,'print',ctx).allowed,false);});
test('staging blocks despite a matching synthetic grant',()=>{const {d,id,asset}=fixture();asset.release_state='staging';assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('asset hash mutation invalidates grant',()=>{const {d,id,asset}=fixture();asset.sha256='0'.repeat(64);assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('arrangement revision mutation invalidates grant',()=>{const {d,id,a}=fixture();a.edition_revision='v2';assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('grant cannot cross arrangement',()=>{const {d,id,g}=fixture();g.arrangement_id=external.arrangement_id;assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('US permission does not allow global CDN',()=>{const {d,id,g}=fixture();g.territories=['US'];assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('region-only use requires actual territorial enforcement',()=>{const {d,id,g}=fixture();g.territories=['US'];const local={...ctx,deploymentTerritories:['US']};assert.equal(canPublishAsset(d,id,'display',local).allowed,false);assert.equal(canPublishAsset(d,id,'display',{...local,territorialRestrictionVerified:true}).allowed,true);});
test('expired grant blocks',()=>{const {d,id,g}=fixture();g.expires_at='2026-09-15T01:00:00Z';assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('future grant blocks',()=>{const {d,id,g}=fixture();g.issued_at='2026-09-16T00:00:00Z';assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('revoked grant blocks',()=>{const {d,id,g}=fixture();g.status='revoked';assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('noncommercial grant cannot authorize commercial site',()=>{const {d,id,g}=fixture();g.commercial_use=false;assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('unknown arrangement rights block',()=>{const {d,id,g}=fixture();g.layers.arrangement.decision='unknown';assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('unresolvable rights evidence blocks',()=>{const {d,id,g}=fixture();g.evidence_ids=['imaginary'];assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('missing real approval record blocks',()=>{const {d,id,g}=fixture();g.approval_record='';assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('independent music review pending blocks',()=>{const {d,id,asset}=fixture();asset.validation.independent_music_review='not_run';assert.equal(canPublishAsset(d,id,'display',ctx).allowed,false);});
test('audio needs real listening',()=>{const {d,id,asset}=fixture('play',a=>a.audio_asset_id);asset.validation.human_listening='not_run';assert.equal(canPublishAsset(d,id,'play',ctx).allowed,false);});
test('downloadable printable needs physical print check',()=>{const {d,id,asset}=fixture('download',a=>c.assets.find(f=>f.arrangement_id===a.arrangement_id&&f.path.endsWith('score-a4.pdf')).asset_id);asset.validation.physical_print='not_run';assert.equal(canPublishAsset(d,id,'download',ctx).allowed,false);});
test('unsafe provider URLs rejected',()=>{for(const x of ['http://example.org','javascript:alert(1)','https://u:p@example.org'])assert.equal(safeProviderUrl(x),null);});
test('asset traversal and duplicate IDs are rejected',()=>{const d=structuredClone(c);d.assets[0].path='../private.pdf';d.arrangements.push(d.arrangements[0]);assert.equal(validateCatalog(d).ok,false);});
test('wrong ownership is rejected',()=>{const d=structuredClone(c);d.assets[0].arrangement_id=external.arrangement_id;assert.equal(validateCatalog(d).ok,false);});
test('version and segment restoration never auto plays',()=>assert.deepEqual(parsePracticeHash(`#pg-arr=${original.arrangement_id}&segment=bars-1-2&speed=75`,c.arrangements),{ok:true,arrangementId:original.arrangement_id,segment:'bars-1-2',speed:75,autoplay:false}));
test('old printed aliases preserved',()=>{for(const [slug,id] of Object.entries(aliases))assert.equal(parsePracticeHash('#pg-ex='+slug,c.arrangements,aliases).arrangementId,id);});
test('external edition only supports selection not local segment playback',()=>{assert.equal(parsePracticeHash(`#pg-arr=${external.arrangement_id}`,c.arrangements).ok,true);assert.equal(parsePracticeHash(`#pg-arr=${external.arrangement_id}&segment=bars-1-2`,c.arrangements).ok,false);});
test('unknown duplicate mixed and unapproved share fields fail closed',()=>{
 for(const h of ['#pg-arr=nope',`#pg-arr=${original.arrangement_id}&pg-arr=nope`,`#pg-arr=${original.arrangement_id}&pg-ex=step-and-hold`, `#pg-arr=${original.arrangement_id}&rights=true`,`#pg-arr=${original.arrangement_id}&speed=80`, `#pg-arr=${original.arrangement_id}&speed=075`])assert.equal(parsePracticeHash(h,c.arrangements,aliases).ok,false);
});
test('share URL destinations are explicitly approved and roundtrip same version',()=>{
 const u=practiceUrl('/songs/easy',original,'bars-3-4',50,['/songs/easy']);assert.equal(parsePracticeHash(new URL(u).hash,c.arrangements).arrangementId,original.arrangement_id);
 assert.throws(()=>practiceUrl('https://evil.test/',original,'all',100,['/songs/easy']));
});
test('no performance detector or checkout falsely enabled',()=>{const {d}=fixture();const cap=capabilities(d,original.resource_ids[0],ctx);assert.equal(cap.assessPerformance,false);assert.equal(cap.checkout,false);});

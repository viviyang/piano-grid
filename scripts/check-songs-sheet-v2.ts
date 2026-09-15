import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { canPublishAsset, capabilities, parsePracticeHash, practiceUrl, publicDeploymentContext, resolveFirstCheckFields, safeProviderUrl, validateCatalog } from '../src/lib/songs-sheet-contracts.ts';
import { PUBLIC_ROUTES } from '../src/lib/site-routes.ts';
import { prepareExerciseEvents } from '../src/lib/original-exercise-playback.ts';
import type { ArrangementRecord, CatalogAsset, RuntimeGrant, SongsSheetCatalog } from '../src/lib/songs-sheet-types.ts';

const source = 'docs/content/songs-sheet-v2/content-data';
const catalog = JSON.parse(fs.readFileSync(`${source}/catalog.v2.json`, 'utf8'));
const patches = JSON.parse(fs.readFileSync(`${source}/english/pages.patch.json`, 'utf8'));
const contracts = JSON.parse(fs.readFileSync(`${source}/page-section-contracts.v2.json`, 'utf8'));
const scope = JSON.parse(fs.readFileSync(`${source}/scope-ledger.json`, 'utf8'));
const inventory = JSON.parse(fs.readFileSync(`${source}/inventory-summary.json`, 'utf8'));
const master = JSON.parse(fs.readFileSync('docs/content/site-master/page-content.master.json', 'utf8'));
const firstBatch = ['/songs','/songs/easy','/sheet-music','/sheet-music/easy','/sheet-music/beginner','/sheet-music/hot-cross-buns','/sheet-music/twinkle-twinkle-little-star','/sheet-music/ode-to-joy'];
const externalIDs = ['arr-ext-0a05b7954f5256','arr-ext-c3a78b0c5cb213','arr-ext-a60b8d92c5a325'];
const localIDs = ['arr-pg-step-and-hold-v1','arr-pg-left-hand-answer-v1','arr-pg-one-hand-at-a-time-v1'];
const arrangements = catalog.arrangements as ArrangementRecord[];
const assets = catalog.assets as CatalogAsset[];
const typedCatalog = catalog as SongsSheetCatalog;
const worldwideContext = publicDeploymentContext(new Date('2026-09-15T02:00:00Z'));
const results:{name:string;passed:boolean;detail?:string}[]=[];
function test(name:string, callback:()=>void){try{callback();results.push({name,passed:true});}catch(error){results.push({name,passed:false,detail:(error as Error).message});}}
function equal(name:string, actual:unknown, expected:unknown){test(name,()=>assert.deepEqual(actual,expected));}

equal('catalog counts', [catalog.arrangements.length,catalog.resources.length,catalog.assets.length,catalog.aliases.length], [203,203,24,265]);
equal('scope counts', [inventory.songs_pages,inventory.sheet_pages,inventory.paused_sheet_pages,inventory.occurrences], [22,41,19,265]);
equal('runtime grants start empty', catalog.runtime_grants, []);
equal('production catalog validates', validateCatalog(typedCatalog), {ok:true,errors:[]});
equal('eight page patches', patches.map((item:any)=>item.url), firstBatch);
equal('eight section contracts', contracts.map((item:any)=>item.url), firstBatch);
test('all first batch canonicals exact',()=>assert.ok(patches.every((item:any)=>item.url===item.metadata.canonical_path)));
test('all first batch routes public',()=>assert.ok(firstBatch.every((url)=>PUBLIC_ROUTES.includes(url as never))));
equal('old Songs content preserved', [master.pages['/songs'].blocks.length,master.pages['/songs/easy'].blocks.length,master.pages['/songs/easy'].data.featured_resources.length,master.pages['/songs/easy'].data.additional_catalog_options.length], [8,6,9,50]);
equal('unassigned and historical clues retained', [scope.unassigned_tasks.length,scope.historical_unmapped_evidence.length], [17,2]);
test('no dynamic songs or sheet route',()=>assert.ok(!fs.existsSync('src/app/songs/[slug]')&&!fs.existsSync('src/app/sheet-music/[slug]')));

for(const id of externalIDs){
  const arrangement=arrangements.find((item)=>item.arrangement_id===id)!;
  const resource=catalog.resources.find((item:any)=>item.arrangement_id===id);
  test(`${id} external identity`,()=>{assert.equal(arrangement.representation,'external_reference');assert.equal(arrangement.score_asset_id,null);assert.equal(arrangement.audio_asset_id,null);assert.equal(resource.location,'external');assert.ok(safeProviderUrl(resource.provider_url));});
  equal(`${id} external capability`,capabilities(typedCatalog,resource.resource_id),{openProvider:true,previewLocal:false,downloadLocal:false,printLocal:false,playLocal:false,tempoAndSegments:false,assessPerformance:false,checkout:false});
}
for(const id of localIDs){
  const arrangement=arrangements.find((item)=>item.arrangement_id===id)!;
  test(`${id} separate original`,()=>{assert.equal(arrangement.representation,'original_exercise_not_known_song');assert.ok(!externalIDs.includes(arrangement.arrangement_id));});
  const resource=catalog.resources.find((item:any)=>item.arrangement_id===id);
  equal(`${id} locked without grant`,capabilities(typedCatalog,resource.resource_id),{openProvider:false,previewLocal:false,downloadLocal:false,printLocal:false,playLocal:false,tempoAndSegments:false,assessPerformance:false,checkout:false});
}

for(const asset of assets){
  test(`staging ${asset.asset_id}`,()=>{assert.equal(asset.storage,'staging_not_public');assert.equal(asset.release_state,'staging');const target=path.join('docs/content/songs-sheet-v2',asset.path);assert.ok(fs.existsSync(target));const hash=createHash('sha256').update(fs.readFileSync(target)).digest('hex');assert.equal(hash,asset.sha256);assert.ok(!fs.existsSync(path.join('public',path.basename(asset.path))));});
}

const local=arrangements.find((item)=>item.arrangement_id===localIDs[0])!;
const localResource=catalog.resources.find((item:any)=>item.arrangement_id===local.arrangement_id);
function releaseFixture(){
  const data=structuredClone(typedCatalog);
  const arrangement=data.arrangements.find((item)=>item.arrangement_id===local.arrangement_id)!;
  arrangement.release.public_asset_enabled=true;
  for(const asset of data.assets.filter((item)=>item.arrangement_id===local.arrangement_id)){
    asset.storage='public';asset.release_state='approved';asset.validation={...asset.validation,format_signal_check:'passed',independent_music_review:'passed',visual_notation:'passed',human_listening:'passed',physical_print:'passed'};
  }
  function grant(assetID:string,action:RuntimeGrant['action']){
    const asset=data.assets.find((item)=>item.asset_id===assetID)!;
    const value:RuntimeGrant={grant_id:`TEST-${assetID}-${action}`,asset_id:assetID,sha256:asset.sha256,arrangement_id:arrangement.arrangement_id,edition_revision:arrangement.edition_revision,status:'approved',action,territories:['WORLDWIDE'],commercial_use:true,issued_at:'2026-09-14T00:00:00Z',expires_at:null,approved_by:'TEST FIXTURE',approval_record:'test-only/non-publishable',evidence_ids:[asset.rights_record_id],layers:Object.fromEntries(['work','arrangement','engraving','recording','samples','fonts'].map((key)=>[key,{decision:'allow',basis:'TEST FIXTURE; not an actual licence'}]))};
    data.runtime_grants.push(value);return value;
  }
  return {data,arrangement,grant};
}
test('display grant matches only exact score asset and action',()=>{const {data,arrangement,grant}=releaseFixture();grant(arrangement.score_asset_id!,'display');const cap=capabilities(data,localResource.resource_id);assert.equal(cap.previewLocal,true);assert.equal(cap.printLocal,false);assert.equal(cap.playLocal,false);});
test('download never substitutes for print permission',()=>{const {data,grant}=releaseFixture();const pdf=data.assets.find((item)=>item.arrangement_id===local.arrangement_id&&item.path.endsWith('score-a4.pdf'))!;grant(pdf.asset_id,'download');const cap=capabilities(data,localResource.resource_id);assert.equal(cap.downloadLocal,true);assert.equal(cap.printLocal,false);});
test('print grant matches one precise PDF',()=>{const {data,grant}=releaseFixture();const pdf=data.assets.find((item)=>item.arrangement_id===local.arrangement_id&&item.path.endsWith('score-a4.pdf'))!;grant(pdf.asset_id,'print');assert.equal(capabilities(data,localResource.resource_id).printLocal,true);});
test('audio grant without event grant cannot enable tempo or segments',()=>{const {data,arrangement,grant}=releaseFixture();grant(arrangement.audio_asset_id!,'play');const cap=capabilities(data,localResource.resource_id);assert.equal(cap.playLocal,true);assert.equal(cap.tempoAndSegments,false);});
test('audio and exact event grants enable scheduled segments',()=>{const {data,arrangement,grant}=releaseFixture();grant(arrangement.audio_asset_id!,'play');grant(arrangement.music_events_asset_id!,'play');assert.equal(capabilities(data,localResource.resource_id).tempoAndSegments,true);});
test('wrong hash rejected',()=>{const {data,arrangement,grant}=releaseFixture();const value=grant(arrangement.score_asset_id!,'display');value.sha256='0'.repeat(64);assert.equal(capabilities(data,localResource.resource_id).previewLocal,false);});
test('wrong revision rejected',()=>{const {data,arrangement,grant}=releaseFixture();const value=grant(arrangement.score_asset_id!,'display');value.edition_revision='other';assert.equal(capabilities(data,localResource.resource_id).previewLocal,false);});
test('US-only permission rejected for worldwide deployment',()=>{const {data,arrangement,grant}=releaseFixture();const value=grant(arrangement.score_asset_id!,'display');value.territories=['US'];assert.equal(capabilities(data,localResource.resource_id,worldwideContext).previewLocal,false);});
test('non-commercial rejected',()=>{const {data,arrangement,grant}=releaseFixture();const value=grant(arrangement.score_asset_id!,'display');value.commercial_use=false;assert.equal(capabilities(data,localResource.resource_id).previewLocal,false);});
test('revoked rejected',()=>{const {data,arrangement,grant}=releaseFixture();const value=grant(arrangement.score_asset_id!,'display');value.status='revoked';assert.equal(capabilities(data,localResource.resource_id).previewLocal,false);});
test('expired rejected',()=>{const {data,arrangement,grant}=releaseFixture();const value=grant(arrangement.score_asset_id!,'display');value.expires_at='2020-01-01T00:00:00Z';assert.equal(capabilities(data,localResource.resource_id).previewLocal,false);});
test('blank or duplicated layer labels cannot satisfy structured rights layers',()=>{const {data,arrangement,grant}=releaseFixture();const value=grant(arrangement.score_asset_id!,'display');value.layers.arrangement={decision:'allow',basis:'   '};assert.equal(capabilities(data,localResource.resource_id).previewLocal,false);});
test('unrelated public asset cannot release arrangement actions',()=>{const {data}=releaseFixture();const unrelated=data.assets.find((item)=>item.arrangement_id!==local.arrangement_id)!;unrelated.storage='public';unrelated.release_state='approved';assert.equal(canPublishAsset(data,unrelated.asset_id,'display').allowed,false);assert.equal(capabilities(data,localResource.resource_id).previewLocal,false);});
test('staging storage stays disabled even with matching grant',()=>{const {data,arrangement,grant}=releaseFixture();grant(arrangement.score_asset_id!,'display');data.assets.find((item)=>item.asset_id===arrangement.score_asset_id)!.storage='staging_not_public';assert.equal(capabilities(data,localResource.resource_id).previewLocal,false);});

const eventSource=JSON.parse(fs.readFileSync(`${source}/assets/pg-step-and-hold-v1/events.json`,'utf8'));
const all100=prepareExerciseEvents(eventSource,'all',100);
const first75=prepareExerciseEvents(eventSource,'bars-1-2',75);
const first50=prepareExerciseEvents(eventSource,'bars-1-2',50);
equal('event adapter keeps all source events',all100.length,eventSource.events.length);
equal('segment uses exact measures',first75.map((item)=>item.midi),eventSource.events.filter((item:any)=>item.measure<=2).map((item:any)=>item.midi));
test('speed changes time not pitch',()=>{assert.deepEqual(first75.map((item)=>item.frequency_hz),first50.map((item)=>item.frequency_hz));assert.ok(first50.at(-1)!.onset_ms>first75.at(-1)!.onset_ms);});
test('segment rebases onset to zero',()=>assert.equal(prepareExerciseEvents(eventSource,'bars-3-4',75)[0].onset_ms,0));
test('unknown segment rejected',()=>assert.throws(()=>prepareExerciseEvents(eventSource,'bars-2-9',75)));

equal('first_check primary',resolveFirstCheckFields('primary','fallback'),{value:'primary',conflict:true});
equal('first_check compatibility fallback',resolveFirstCheckFields(null,'fallback'),{value:'fallback',conflict:false});
const external=arrangements.find((item)=>item.arrangement_id===externalIDs[0])!;
equal('valid exact version share',parsePracticeHash(`#pg-arr=${external.arrangement_id}&segment=all`,arrangements),{ok:true,arrangementId:external.arrangement_id,segment:'all',speed:100,autoplay:false});
test('unknown version rejected',()=>assert.equal(parsePracticeHash('#pg-arr=missing&segment=all',arrangements).ok,false));
test('duplicate key rejected',()=>assert.equal(parsePracticeHash(`#pg-arr=${external.arrangement_id}&pg-arr=missing&segment=all`,arrangements).ok,false));
test('redirect rejected',()=>assert.equal(parsePracticeHash(`#pg-arr=${external.arrangement_id}&redirect=https://evil.test`,arrangements).ok,false));
test('external explicit default speed accepted',()=>assert.equal(parsePracticeHash(`#pg-arr=${external.arrangement_id}&segment=all&speed=100`,arrangements).ok,true));
test('external non-default speed rejected',()=>assert.equal(parsePracticeHash(`#pg-arr=${external.arrangement_id}&segment=all&speed=75`,arrangements).ok,false));
test('oversized share fragment rejected',()=>assert.equal(parsePracticeHash(`#pg-arr=${external.arrangement_id}&segment=all&padding=${'x'.repeat(400)}&`,arrangements).ok,false));
test('legacy local share resolves exact exercise',()=>{const parsed=parsePracticeHash('#pg-ex=step-and-hold&segment=bars-1-2&speed=75',arrangements);assert.equal(parsed.ok&&parsed.arrangementId,local.arrangement_id);});
test('share URL canonical path and fragment',()=>{const url=new URL(practiceUrl('/songs/easy',external));assert.equal(url.origin,'https://pianogrid.com');assert.equal(url.pathname,'/songs/easy');assert.equal(url.search,'');assert.equal(url.hash,`#pg-arr=${external.arrangement_id}&segment=all&speed=100`);});
test('share URL rejects unapproved path and query',()=>assert.throws(()=>practiceUrl('/not-approved?x=1',external)));

fs.mkdirSync('songs-sheet-v2',{recursive:true});
fs.writeFileSync('songs-sheet-v2/test-results.json',JSON.stringify({passed:results.filter(item=>item.passed).length,failed:results.filter(item=>!item.passed).length,results},null,2));
console.log(`${results.filter(item=>item.passed).length} passed / ${results.filter(item=>!item.passed).length} failed`);
for(const result of results.filter(item=>!item.passed))console.error(`FAIL ${result.name}: ${result.detail}`);
process.exitCode=results.some(item=>!item.passed)?1:0;

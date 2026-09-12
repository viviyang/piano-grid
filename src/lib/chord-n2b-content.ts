import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Block, ChordDetailData, ChordDetailModel, ChordPractice, ChordSource, DetailVoicing, ThreeNoteSubtype } from './a-minor-types';
import { positionForThreeNote, resolveThreeNoteDefinition } from './chord-family-model';
import { finalizeChordDetailModel } from './chord-detail-model';
import { readMaster } from './site-content';
import { isPublicRoute } from './site-routes';
import type { CenterItem, ChordCategoryModel } from './chord-content';

const packageRoot = resolve('docs/pianogrid-chords-n2b');
const detailRoot = resolve(packageRoot, '03_details');

export const N2B_DETAIL_ROUTES = [
  '/chords/a-augmented','/chords/a-diminished','/chords/a-flat-augmented','/chords/a-flat-diminished','/chords/a-flat-sus2','/chords/a-flat-sus4','/chords/a-sus2','/chords/a-sus4',
  '/chords/b-augmented','/chords/b-diminished','/chords/b-flat-augmented','/chords/b-flat-diminished','/chords/b-flat-sus2','/chords/b-flat-sus4','/chords/b-sus2','/chords/b-sus4',
  '/chords/c-augmented','/chords/c-diminished','/chords/c-sus2','/chords/c-sus4',
  '/chords/d-augmented','/chords/d-diminished','/chords/d-flat-augmented','/chords/d-flat-diminished','/chords/d-flat-sus2','/chords/d-flat-sus4','/chords/d-sus2','/chords/d-sus4',
  '/chords/e-augmented','/chords/e-diminished','/chords/e-flat-augmented','/chords/e-flat-diminished','/chords/e-flat-sus2','/chords/e-flat-sus4','/chords/e-sus2','/chords/e-sus4',
  '/chords/f-augmented','/chords/f-diminished','/chords/f-sharp-augmented','/chords/f-sharp-diminished','/chords/f-sharp-sus2','/chords/f-sharp-sus4','/chords/f-sus2','/chords/f-sus4',
  '/chords/g-augmented','/chords/g-diminished','/chords/g-sus2','/chords/g-sus4',
] as const;
export type N2BChordDetailRoute = (typeof N2B_DETAIL_ROUTES)[number];
export type N2BCategory = 'diminished' | 'augmented' | 'suspended';

type RawPitch = { midi: number; writtenSpelling: string };
type RawVoicing = {
  id: 'root' | 'first' | 'second'; label: string;
  position: { kind: 'root' | 'inversion'; inversionIndex: number; bassDegree: string };
  symbol: string; notesLowToHigh: string[]; midiLowToHigh: number[]; bass: string;
  keyboardHighlights: RawPitch[]; playbackEvents: { midi: number; onsetMs: number; durationMs: number }[];
  printPitches: string[]; fingering: { status: 'not_provided'; right: null; left: null };
};
type RawDetail = {
  schemaVersion: 'N2B-1.0'; releaseStatus: 'publish_in_N2B'; family: 'triad'; subtype: ThreeNoteSubtype;
  expectedNoteCount: 3; url: N2BChordDetailRoute; categoryRoute: string; rootSpelling: string;
  name: string; symbol: string; qualityLabel: string;
  definition: { toneSpellings: string[]; formulaDegrees: string[]; semitonesFromRoot: number[] };
  voicings: RawVoicing[];
  seo: { title: string; description: string; h1: string; mainKeyword: string; secondaryKeywords: string[]; keywordVolume: null };
  content: { directAnswer: string; theory: string; comparison: string; inversionExplanation: string; spellingNote: string; faq: { q: string; a: string }[] };
  fingering: { status: 'not_provided'; reason: string }; sources: string[];
};
type RawCategory = {
  url: string; id: N2BCategory; label: string; title: string; description: string; h1: string;
  mainKeyword: string; secondaryKeywords: string[]; formula?: string[]; formulaFamilies?: Record<'sus2'|'sus4',string[]>;
  familySubtypes: ThreeNoteSubtype[]; intro: string; rootOrder: string[];
};
type LinkEdge = { from: string; to: string; anchor: string; relation: string; placement: string; activation: string };
type SourceLedger = Record<string,{title:string;url:string;supports:string[]}>;

const normalizeDegree = (value: string) => value.replaceAll('𝄪','##').replaceAll('𝄫','bb').replaceAll('♯','#').replaceAll('♭','b');
const notePattern = /^([A-G])(𝄪|𝄫|♯|♭)?(-?\d+)?$/u;
const natural: Record<string,number> = { C:0,D:2,E:4,F:5,G:7,A:9,B:11 };
const accidental: Record<string,number> = {'':0,'♯':1,'♭':-1,'𝄪':2,'𝄫':-2};
const same = (left: unknown, right: unknown) => JSON.stringify(left) === JSON.stringify(right);
const pc = (value:number) => ((value%12)+12)%12;
function parsedNote(value:string) {
  const match=notePattern.exec(value);if(!match)throw new Error(`Invalid N2B pitch spelling: ${value}`);
  const [,letter,mark='',octaveText]=match,raw=natural[letter]+accidental[mark];
  return {pitchClass:pc(raw),midi:octaveText===undefined?null:(Number(octaveText)+1)*12+raw};
}
const empty = (heading:string):Block['content'] => ({heading,paragraphs:[],steps:[],table:null,links:[]});
const frequency = (midi:number) => 440*2**((midi-69)/12);

const detailSet = new Set<string>(N2B_DETAIL_ROUTES);
const rawDetails = new Map<N2BChordDetailRoute,RawDetail>();
for(const filename of readdirSync(detailRoot).filter(name=>name.endsWith('.page.json'))){
  const raw=JSON.parse(readFileSync(resolve(detailRoot,filename),'utf8')) as RawDetail;
  rawDetails.set(raw.url,raw);
}
if(rawDetails.size!==48||N2B_DETAIL_ROUTES.some(url=>!rawDetails.has(url)))throw new Error('Incomplete N2B detail package');
const categoryRows=JSON.parse(readFileSync(resolve(packageRoot,'02_categories/categories.master.json'),'utf8')) as RawCategory[];
const rawCategories=new Map(categoryRows.map(row=>[row.id,row]));
const linkPlan=JSON.parse(readFileSync(resolve(packageRoot,'05_internal_links/N2B.internal-links.json'),'utf8')) as LinkEdge[];
const sourceLedger=JSON.parse(readFileSync(resolve(packageRoot,'06_sources/source-ledger.json'),'utf8')) as SourceLedger;

export function isN2BChordDetailRoute(url:string):url is N2BChordDetailRoute{return detailSet.has(url);}
export function getRawN2BDetails(){return N2B_DETAIL_ROUTES.map(url=>rawDetails.get(url)!);}

function validateRaw(raw:RawDetail){
  const definition=resolveThreeNoteDefinition(raw.subtype);
  if(raw.schemaVersion!=='N2B-1.0'||raw.releaseStatus!=='publish_in_N2B'||raw.family!=='triad'||raw.expectedNoteCount!==3)throw new Error(`Blocked N2B detail: ${raw.url}`);
  // N2B source files use "triad" as a broad three-note container. The accepted N2A model keeps sus2/sus4 in the suspended family.
  if(raw.categoryRoute!==definition.categoryRoute||!same(raw.definition.formulaDegrees.map(normalizeDegree),definition.formulaDegrees)||!same(raw.definition.semitonesFromRoot,definition.semitonesFromRoot))throw new Error(`N2B family definition mismatch: ${raw.url}`);
  const root=parsedNote(raw.rootSpelling).pitchClass;
  if(raw.definition.toneSpellings.length!==3||!same(raw.definition.toneSpellings.map(note=>pc(parsedNote(note).pitchClass-root)),definition.semitonesFromRoot))throw new Error(`N2B written definition mismatch: ${raw.url}`);
  if(raw.voicings.length!==3||raw.fingering.status!=='not_provided')throw new Error(`N2B cardinality/fingering gate failed: ${raw.url}`);
  raw.voicings.forEach((voicing,index)=>{
    const position=positionForThreeNote(definition,index),midis=voicing.notesLowToHigh.map(note=>parsedNote(note).midi);
    if(midis.some(midi=>midi===null)||!same(midis,voicing.midiLowToHigh)||!same(midis,voicing.keyboardHighlights.map(item=>item.midi))||!same(midis,voicing.playbackEvents.map(item=>item.midi))||!same(voicing.notesLowToHigh,voicing.keyboardHighlights.map(item=>item.writtenSpelling))||!same(voicing.notesLowToHigh,voicing.printPitches))throw new Error(`N2B voicing channel drift: ${raw.url}/${voicing.id}`);
    if(voicing.position.inversionIndex!==position.inversionIndex||voicing.position.kind!==position.kind||voicing.label!==position.label||voicing.bass!==voicing.notesLowToHigh[0]||voicing.fingering.status!=='not_provided'||voicing.fingering.right!==null||voicing.fingering.left!==null)throw new Error(`N2B position/fingering mismatch: ${raw.url}/${voicing.id}`);
    if(!same([...voicing.midiLowToHigh].sort((a,b)=>a-b),voicing.midiLowToHigh)||!same(voicing.midiLowToHigh.map(pc).sort((a,b)=>a-b),raw.voicings[0].midiLowToHigh.map(pc).sort((a,b)=>a-b)))throw new Error(`N2B pitch set mismatch: ${raw.url}/${voicing.id}`);
  });
  return definition;
}

function sourcesFor(raw:RawDetail):ChordSource[]{
  return raw.sources.map(id=>{const source=sourceLedger[id];if(!source)throw new Error(`Missing N2B source: ${id}`);return{id,title:source.title,publisher:id==='N2B-OMT-TRIADS'?'Open Music Theory':'PianoChord.org',url:source.url,checkedOn:'2026-09-12',supports:source.supports.join('; '),limitation:'Theory and spelling cross-check only; no source prose, artwork, fingering or PDF is copied.'};});
}

export function getN2BChordDetail(url:N2BChordDetailRoute):ChordDetailModel{
  const raw=rawDetails.get(url)!;
  const definition=validateRaw(raw),slug=url.split('/').at(-1)!;
  const voicings:DetailVoicing[]=raw.voicings.map((voicing,index)=>({
    voicing_id:`${slug}--${voicing.id}`,inversion_label:voicing.label,position:positionForThreeNote(definition,index),chord_symbol:voicing.symbol,bass_spelling:voicing.bass,
    notes_low_to_high:voicing.notesLowToHigh.map((display_pitch,noteIndex)=>({display_pitch,midi:voicing.midiLowToHigh[noteIndex]})),
    diagram:{keyboard_range_midi:[48,84],highlight_midi:[...voicing.midiLowToHigh],alt_text:`${raw.seo.h1}, ${voicing.label}: ${voicing.notesLowToHigh.join(', ')} from low to high. Marked keys are the sounding piano keys; written spellings are retained.`},
    playback:{together:voicing.midiLowToHigh.map(midi=>({midi,frequency_hz:frequency(midi),onset_ms:0,duration_ms:1200})),ascending:voicing.playbackEvents.map(event=>({midi:event.midi,frequency_hz:frequency(event.midi),onset_ms:event.onsetMs,duration_ms:event.durationMs}))},
    print_data:{spelled_pitches:[...voicing.printPitches],highlight_midi:[...voicing.midiLowToHigh]},
  }));
  const master=readMaster();
  const data:ChordDetailData={
    url,namespace:slug,toolId:`${slug}-result`,rangeLabel:'C3–C6',pdf:{url:`/reference/assets/chord-${slug}.pdf`,label:`Download ${raw.symbol} PDF`},
    defaultId:`${slug}--root`,options:voicings.map(voicing=>({value:voicing.voicing_id,label:voicing.inversion_label})),
    chord:{id:slug,slug,name_en:raw.name,symbol:raw.symbol,root_spelling:raw.rootSpelling,quality:raw.subtype,note_spellings:[...raw.definition.toneSpellings],formula_degrees:[...definition.formulaDegrees],definition},
    voicings,whitePitchClasses:master.legacy_chords_support.shared_data.conventions.white_pitch_classes,microcopy:master.pages['/chords/a-minor'].microcopy,
    heading:raw.seo.h1,toolHeading:`${raw.name} keyboard and inversions`,printDisclaimer:'Written note names are preserved even when an enharmonic spelling uses the same piano key. Fingering is intentionally not assigned.',fingeringStatus:'not_provided',
  };
  const related=new Map<string,{url:string;label:string;published:boolean}>();
  for(const edge of linkPlan.filter(edge=>edge.from===url))if(isPublicRoute(edge.to)&&edge.to!==url)related.set(edge.to,{url:edge.to,label:edge.anchor,published:true});
  related.set(definition.categoryRoute,{url:definition.categoryRoute,label:`Browse ${definition.categoryLabel.toLowerCase()}`,published:true});
  const blocks:Block[]=[
    {block_id:`${slug}-intro`,content:{...empty(raw.seo.h1),paragraphs:[raw.content.theory,raw.content.spellingNote]}},
    {block_id:data.toolId,content:{...empty(data.toolHeading),paragraphs:['Choose a position to keep the written notes, sounding keys, bass note, playback and print reference synchronized.']}},
    {block_id:`${slug}-formula`,content:{...empty(`${raw.name} formula`),paragraphs:[`${raw.symbol} uses ${raw.definition.formulaDegrees.join('–')}: ${raw.definition.toneSpellings.join('–')}.`,raw.content.theory]}},
    {block_id:`${slug}-comparison`,content:{...empty(`Compare ${raw.name}`),paragraphs:[raw.content.comparison]}},
    {block_id:`${slug}-inversions`,content:{...empty(`${raw.name} inversions`),paragraphs:[raw.content.inversionExplanation],table:{columns:['Position','Symbol','Notes, low to high','Bass'],rows:voicings.map(voicing=>[voicing.inversion_label,voicing.chord_symbol,voicing.notes_low_to_high.map(note=>note.display_pitch).join('–'),voicing.bass_spelling])}}},
    {block_id:`${slug}-fingering-example`,content:{...empty('Fingering is not provided for this reference'),paragraphs:[raw.fingering.reason,'Use the written notes, keyboard positions and playback without treating the diagram as a required hand shape.'],links:[{url:'/keyboard-notes/finger-numbers',label:'Read left- and right-hand finger numbers',published:true}]}},
    {block_id:`${slug}-questions`,content:{...empty(`Questions about ${raw.symbol}`),table:{columns:['Question','Answer'],rows:raw.content.faq.map(item=>[item.q,item.a])}}},
  ];
  const practice:ChordPractice={id:'practice',heading:`Build ${raw.symbol} on the keyboard`,prompt:`Select the three pitch classes that make ${raw.symbol}, then check your answer.`,scope:'This one-octave exercise checks pitch classes. Order and octave do not affect the result; fingering and live performance are not assessed.',requiredPitchClassCount:3};
  blocks.push({block_id:'practice',content:{...empty(practice.heading),paragraphs:[practice.prompt,practice.scope]}});
  blocks.push({block_id:`${slug}-print`,content:empty('Print this chord reference')});
  blocks.push({block_id:`${slug}-related`,content:{...empty('Related chord references'),links:[...related.values()]}});
  const byId=Object.fromEntries(blocks.map(block=>[block.block_id,block]));
  return finalizeChordDetailModel({metadata:{title:raw.seo.title,description:raw.seo.description,canonical_path:url},data,blocks,byId,answer:raw.content.directAnswer,introduction:[],fingeringExamples:[],sources:sourcesFor(raw),practice,searchSections:blocks.filter(block=>block.block_id!==`${slug}-intro`).map(block=>({id:block.block_id,heading:block.content.heading,text:JSON.stringify(block.content)})),tocItems:[{id:data.toolId,label:'Chord & positions'},...blocks.filter(block=>![`${slug}-intro`,data.toolId].includes(block.block_id)).map(block=>({id:block.block_id,label:block.content.heading}))]});
}

function categoryItem(raw:RawDetail):CenterItem{
  const model=getN2BChordDetail(raw.url),voicing=model.data.voicings[0];
  return{id:model.data.chord.id,name:raw.name,root:raw.rootSpelling,quality:raw.subtype,url:raw.url,tones:[...raw.definition.toneSpellings],formula:[...model.data.chord.formula_degrees],voicing};
}

export function getN2BCategory(category:N2BCategory):ChordCategoryModel{
  const raw=rawCategories.get(category);if(!raw||raw.rootOrder.length!==12)throw new Error(`Missing N2B category: ${category}`);
  const allowed=new Set(raw.familySubtypes),items=getRawN2BDetails().filter(detail=>allowed.has(detail.subtype)).map(categoryItem);
  const expected=category==='suspended'?24:12;
  if(items.length!==expected||items.some(item=>!isPublicRoute(item.url!)))throw new Error(`Incomplete N2B category grid: ${category}`);
  const ordered=raw.rootOrder.flatMap(root=>raw.familySubtypes.map(subtype=>items.find(item=>item.root===root&&item.quality===subtype))).filter(Boolean) as CenterItem[];
  if(ordered.length!==expected)throw new Error(`N2B category order mismatch: ${category}`);
  const links=new Map<string,{url:string;label:string}>();
  for(const edge of linkPlan.filter(edge=>edge.from===raw.url))if(isPublicRoute(edge.to)&&edge.to!==raw.url&&!detailSet.has(edge.to))links.set(edge.to,{url:edge.to,label:edge.anchor});
  const formulas=raw.familySubtypes.map(subtype=>resolveThreeNoteDefinition(subtype).formulaDegrees.join('–')).join(' and ');
  const contentBlocks=[
    {heading:`How ${raw.label.toLowerCase()} are built`,body:`${raw.intro} The formula${raw.familySubtypes.length>1?'s are':' is'} ${formulas}. Written note names remain visible even when two names share the same piano key.`},
    {heading:'Root position and inversions',body:'Each detail page keeps the same three chord tones across root position, first inversion and second inversion. The lowest chord tone changes while the chord root and written spelling stay the same.'},
  ];
  return{url:raw.url as ChordCategoryModel['url'],quality:category,title:raw.h1,directAnswer:raw.intro,metadata:{title:raw.title,description:raw.description,canonical_path:raw.url},items:ordered,rootOrder:raw.rootOrder,familySubtypes:[...raw.familySubtypes],contentBlocks,links:[...links.values()],whitePitchClasses:readMaster().legacy_chords_support.shared_data.conventions.white_pitch_classes};
}

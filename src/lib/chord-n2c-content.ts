import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Block, ChordDetailData, ChordDetailModel, ChordPractice, ChordSource, DetailVoicing, SeventhSubtype } from './a-minor-types';
import { positionForSeventh, resolveSeventhDefinition, validateSeventhDefinition } from './chord-seventh-model';
import { finalizeChordDetailModel } from './chord-detail-model';
import { readMaster } from './site-content';
import { isPublicRoute } from './site-routes';
import type { CenterItem, ChordCategoryModel } from './chord-content';

const packageRoot=resolve('docs/pianogrid-chords-n2c');
const detailRoot=resolve(packageRoot,'03_details');

export const N2C_DETAIL_ROUTES=[
  '/chords/a-7','/chords/a-flat-7','/chords/a-flat-m7','/chords/a-flat-m7-flat5','/chords/a-flat-maj7','/chords/a-m7','/chords/a-m7-flat5','/chords/a-maj7',
  '/chords/b-7','/chords/b-flat-7','/chords/b-flat-m7','/chords/b-flat-m7-flat5','/chords/b-flat-maj7','/chords/b-m7','/chords/b-m7-flat5','/chords/b-maj7',
  '/chords/c-7','/chords/c-m7','/chords/c-m7-flat5','/chords/c-maj7',
  '/chords/d-7','/chords/d-flat-7','/chords/d-flat-m7','/chords/d-flat-m7-flat5','/chords/d-flat-maj7','/chords/d-m7','/chords/d-m7-flat5','/chords/d-maj7',
  '/chords/e-7','/chords/e-flat-7','/chords/e-flat-m7','/chords/e-flat-m7-flat5','/chords/e-flat-maj7','/chords/e-m7','/chords/e-m7-flat5','/chords/e-maj7',
  '/chords/f-7','/chords/f-m7','/chords/f-m7-flat5','/chords/f-maj7','/chords/f-sharp-7','/chords/f-sharp-m7','/chords/f-sharp-m7-flat5','/chords/f-sharp-maj7',
  '/chords/g-7','/chords/g-m7','/chords/g-m7-flat5','/chords/g-maj7',
] as const;
export type N2CChordDetailRoute=(typeof N2C_DETAIL_ROUTES)[number];
export type N2CCategory='seventh';

type RawPitch={midi:number;writtenSpelling:string};
type RawVoicing={
  id:'root'|'first'|'second'|'third';label:string;
  position:{kind:'root'|'inversion';inversionIndex:number;bassDegree:string};
  symbol:string;notesLowToHigh:string[];midiLowToHigh:number[];bass:string;
  keyboardHighlights:RawPitch[];playbackEvents:{midi:number;onsetMs:number;durationMs:number}[];
  printPitches:string[];fingering:{status:'not_provided';right:null;left:null};
};
type RawDetail={
  schemaVersion:'N2C-1.0';releaseStatus:'publish_in_N2C';family:'seventh';subtype:SeventhSubtype;expectedNoteCount:4;
  positionPolicy:{count:4;labels:string[]};url:N2CChordDetailRoute;categoryRoute:'/chords/seventh';rootSpelling:string;
  name:string;symbol:string;qualityLabel:string;
  definition:{toneSpellings:string[];formulaDegrees:string[];semitonesFromRoot:number[];familyConstruction:string};voicings:RawVoicing[];
  practice:{requiredPitchClassCount:4;answerPitchClasses:number[];allowInversionEquivalent:true;fingeringRequired:false};
  seo:{title:string;description:string;h1:string;mainKeyword:string;secondaryKeywords:string[];keywordVolume:null;keywordEvidence:string};
  content:{directAnswer:string;theory:string;comparison:string;inversionExplanation:string;spellingNote:string;faq:{q:string;a:string}[]};
  fingering:{status:'not_provided';reason:string};sources:string[];
};
type RawCategory={
  url:'/chords/seventh';id:'seventh';label:string;title:string;description:string;h1:string;mainKeyword:string;secondaryKeywords:string[];
  familySubtypes:SeventhSubtype[];formulaFamilies:Record<SeventhSubtype,string[]>;intro:string;rootOrder:string[];subtypeOrder:SeventhSubtype[];
};
type LinkEdge={from:string;to:string;anchor:string;relation:string;placement:string;activation:string};
type SourceLedger=Record<string,{title:string;url:string;supports:string[];use?:string}>;

const normalizeDegree=(value:string)=>value.replaceAll('𝄪','##').replaceAll('𝄫','bb').replaceAll('♯','#').replaceAll('♭','b');
const notePattern=/^([A-G])(𝄪|𝄫|♯|♭)?(-?\d+)?$/u;
const natural:Record<string,number>={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const accidental:Record<string,number>={'':0,'♯':1,'♭':-1,'𝄪':2,'𝄫':-2};
const same=(left:unknown,right:unknown)=>JSON.stringify(left)===JSON.stringify(right);
const pc=(value:number)=>((value%12)+12)%12;
const sorted=(values:number[])=>[...values].sort((a,b)=>a-b);
const withoutOctave=(value:string)=>value.replace(/-?\d+$/,'');
const empty=(heading:string):Block['content']=>({heading,paragraphs:[],steps:[],table:null,links:[]});
const frequency=(midi:number)=>440*2**((midi-69)/12);
function parsedNote(value:string){const match=notePattern.exec(value);if(!match)throw new Error(`Invalid N2C pitch spelling: ${value}`);const [,letter,mark='',octaveText]=match,raw=natural[letter]+accidental[mark];return{pitchClass:pc(raw),midi:octaveText===undefined?null:(Number(octaveText)+1)*12+raw};}

const detailSet=new Set<string>(N2C_DETAIL_ROUTES);
const rawDetails=new Map<N2CChordDetailRoute,RawDetail>();
for(const filename of readdirSync(detailRoot).filter(name=>name.endsWith('.page.json'))){const raw=JSON.parse(readFileSync(resolve(detailRoot,filename),'utf8')) as RawDetail;rawDetails.set(raw.url,raw);}
if(rawDetails.size!==48||N2C_DETAIL_ROUTES.some(url=>!rawDetails.has(url)))throw new Error('Incomplete N2C detail package');
const rawCategory=JSON.parse(readFileSync(resolve(packageRoot,'02_category/seventh.page.json'),'utf8')) as RawCategory;
const linkPlan=JSON.parse(readFileSync(resolve(packageRoot,'05_internal_links/N2C.internal-links.json'),'utf8')) as LinkEdge[];
const sourceLedger=JSON.parse(readFileSync(resolve(packageRoot,'06_sources/source-ledger.json'),'utf8')) as SourceLedger;

export function isN2CChordDetailRoute(url:string):url is N2CChordDetailRoute{return detailSet.has(url);}
export function getRawN2CDetails(){return N2C_DETAIL_ROUTES.map(url=>rawDetails.get(url)!);}

function validateRaw(raw:RawDetail){
  const definition=resolveSeventhDefinition(raw.subtype);validateSeventhDefinition(definition);
  if(raw.schemaVersion!=='N2C-1.0'||raw.releaseStatus!=='publish_in_N2C'||raw.family!=='seventh'||raw.expectedNoteCount!==4||raw.categoryRoute!==definition.categoryRoute)throw new Error(`Blocked N2C detail: ${raw.url}`);
  if(!same(raw.definition.formulaDegrees.map(normalizeDegree),definition.formulaDegrees)||!same(raw.definition.semitonesFromRoot,definition.semitonesFromRoot))throw new Error(`N2C seventh definition mismatch: ${raw.url}`);
  const root=parsedNote(raw.rootSpelling).pitchClass,definitionPcs=raw.definition.toneSpellings.map(note=>parsedNote(note).pitchClass);
  if(definitionPcs.length!==4||new Set(definitionPcs).size!==4||!same(definitionPcs.map(value=>pc(value-root)),definition.semitonesFromRoot))throw new Error(`N2C written definition mismatch: ${raw.url}`);
  if(raw.voicings.length!==4||raw.positionPolicy.count!==4||!same(raw.positionPolicy.labels,definition.positionLabels)||raw.fingering.status!=='not_provided')throw new Error(`N2C cardinality/fingering gate failed: ${raw.url}`);
  if(raw.practice.requiredPitchClassCount!==4||!raw.practice.allowInversionEquivalent||raw.practice.fingeringRequired||!same(sorted(raw.practice.answerPitchClasses),sorted(definitionPcs)))throw new Error(`N2C practice mismatch: ${raw.url}`);
  const ids=['root','first','second','third'];
  raw.voicings.forEach((voicing,index)=>{
    const position=positionForSeventh(definition,index),midis=voicing.notesLowToHigh.map(note=>parsedNote(note).midi),expectedSymbol=index===0?raw.symbol:`${raw.symbol}/${withoutOctave(voicing.bass)}`;
    if(voicing.id!==ids[index]||voicing.position.inversionIndex!==position.inversionIndex||voicing.position.kind!==position.kind||voicing.position.bassDegree!==position.bassDegree||voicing.label!==position.label||voicing.symbol!==expectedSymbol)throw new Error(`N2C position/slash mismatch: ${raw.url}/${voicing.id}`);
    if(midis.some(midi=>midi===null)||!same(midis,voicing.midiLowToHigh)||!same(midis,voicing.keyboardHighlights.map(item=>item.midi))||!same(midis,voicing.playbackEvents.map(item=>item.midi))||!same(voicing.notesLowToHigh,voicing.keyboardHighlights.map(item=>item.writtenSpelling))||!same(voicing.notesLowToHigh,voicing.printPitches))throw new Error(`N2C voicing channel drift: ${raw.url}/${voicing.id}`);
    if(voicing.midiLowToHigh.length!==4||new Set(voicing.midiLowToHigh.map(pc)).size!==4||!same([...voicing.midiLowToHigh].sort((a,b)=>a-b),voicing.midiLowToHigh)||!same(sorted(voicing.midiLowToHigh.map(pc)),sorted(definitionPcs)))throw new Error(`N2C pitch set mismatch: ${raw.url}/${voicing.id}`);
    if(voicing.playbackEvents.length!==4||!same(voicing.playbackEvents.map(event=>event.onsetMs),[0,600,1200,1800])||voicing.bass!==voicing.notesLowToHigh[0]||voicing.fingering.status!=='not_provided'||voicing.fingering.right!==null||voicing.fingering.left!==null)throw new Error(`N2C playback/bass/fingering mismatch: ${raw.url}/${voicing.id}`);
  });
  return definition;
}

function sourcesFor(raw:RawDetail):ChordSource[]{return raw.sources.map(id=>{const source=sourceLedger[id];if(!source)throw new Error(`Missing N2C source: ${id}`);return{id,title:source.title,publisher:id.startsWith('N2C-OMT')?'Open Music Theory':'PianoChord.org',url:source.url,checkedOn:'2026-09-12',supports:source.supports.join('; '),limitation:'Theory and spelling cross-check only; no source prose, artwork, fingering or PDF is copied.'};});}

export function getN2CChordDetail(url:N2CChordDetailRoute):ChordDetailModel{
  const raw=rawDetails.get(url)!;const definition=validateRaw(raw),slug=url.split('/').at(-1)!;
  const voicings:DetailVoicing[]=raw.voicings.map((voicing,index)=>({
    voicing_id:`${slug}--${voicing.id}`,inversion_label:voicing.label,position:positionForSeventh(definition,index),chord_symbol:voicing.symbol,bass_spelling:voicing.bass,
    notes_low_to_high:voicing.notesLowToHigh.map((display_pitch,noteIndex)=>({display_pitch,midi:voicing.midiLowToHigh[noteIndex]})),
    diagram:{keyboard_range_midi:[48,84],highlight_midi:[...voicing.midiLowToHigh],alt_text:`${raw.seo.h1}, ${voicing.label}: ${voicing.notesLowToHigh.join(', ')} from low to high. Marked keys are the sounding piano keys; written spellings are retained.`},
    playback:{together:voicing.midiLowToHigh.map(midi=>({midi,frequency_hz:frequency(midi),onset_ms:0,duration_ms:1400})),ascending:voicing.playbackEvents.map(event=>({midi:event.midi,frequency_hz:frequency(event.midi),onset_ms:event.onsetMs,duration_ms:event.durationMs}))},
    print_data:{spelled_pitches:[...voicing.printPitches],highlight_midi:[...voicing.midiLowToHigh]},
  }));
  const master=readMaster();const data:ChordDetailData={
    url,namespace:slug,toolId:`${slug}-result`,rangeLabel:'C3–C6',pdf:{url:`/reference/assets/chord-${slug}.pdf`,label:`Download ${raw.symbol} PDF`},defaultId:`${slug}--root`,
    options:voicings.map(voicing=>({value:voicing.voicing_id,label:voicing.inversion_label})),chord:{id:slug,slug,name_en:raw.name,symbol:raw.symbol,root_spelling:raw.rootSpelling,quality:raw.subtype,note_spellings:[...raw.definition.toneSpellings],formula_degrees:[...definition.formulaDegrees],definition},
    voicings,whitePitchClasses:master.legacy_chords_support.shared_data.conventions.white_pitch_classes,microcopy:master.pages['/chords/a-minor'].microcopy,heading:raw.seo.h1,toolHeading:`${raw.name} keyboard and inversions`,printDisclaimer:'Written note names are preserved even when an enharmonic spelling uses the same piano key. Fingering is intentionally not assigned.',fingeringStatus:'not_provided',
  };
  const related=new Map<string,{url:string;label:string;published:boolean}>();
  for(const edge of linkPlan.filter(edge=>edge.from===url))if(isPublicRoute(edge.to)&&edge.to!==url)related.set(edge.to,{url:edge.to,label:edge.anchor,published:true});
  related.set('/chords/seventh',{url:'/chords/seventh',label:'Browse seventh chords',published:true});
  const blocks:Block[]=[
    {block_id:`${slug}-intro`,content:{...empty(raw.seo.h1),paragraphs:[raw.content.theory,raw.content.spellingNote]}},
    {block_id:data.toolId,content:{...empty(data.toolHeading),paragraphs:['Choose a position to keep the four written notes, sounding keys, bass note, playback and print reference synchronized.']}},
    {block_id:`${slug}-formula`,content:{...empty(`${raw.name} formula`),paragraphs:[`${raw.symbol} uses ${raw.definition.formulaDegrees.join('–')}: ${raw.definition.toneSpellings.join('–')}.`,raw.definition.familyConstruction]}},
    {block_id:`${slug}-comparison`,content:{...empty(`Compare ${raw.name}`),paragraphs:[raw.content.comparison]}},
    {block_id:`${slug}-inversions`,content:{...empty(`${raw.name} positions and inversions`),paragraphs:[raw.content.inversionExplanation],table:{columns:['Position','Symbol','Notes, low to high','Bass'],rows:voicings.map(voicing=>[voicing.inversion_label,voicing.chord_symbol,voicing.notes_low_to_high.map(note=>note.display_pitch).join('–'),voicing.bass_spelling])}}},
    {block_id:`${slug}-fingering-example`,content:{...empty('Fingering is not provided for this reference'),paragraphs:[raw.fingering.reason,'Use the written notes, keyboard positions and playback without treating the diagram as a required hand shape.'],links:[{url:'/keyboard-notes/finger-numbers',label:'Read left- and right-hand finger numbers',published:true}]}},
    {block_id:`${slug}-questions`,content:{...empty(`Questions about ${raw.symbol}`),table:{columns:['Question','Answer'],rows:raw.content.faq.map(item=>[item.q,item.a])}}},
  ];
  const practice:ChordPractice={id:'practice',heading:`Build ${raw.symbol} on the keyboard`,prompt:`Select the four pitch classes that make ${raw.symbol}, then check your answer.`,scope:'This one-octave exercise checks the exact four-note pitch-class set. Order and inversion do not affect the result; missing and extra notes are reported, while fingering and live performance are not assessed.',requiredPitchClassCount:4};
  blocks.push({block_id:'practice',content:{...empty(practice.heading),paragraphs:[practice.prompt,practice.scope]}});
  blocks.push({block_id:`${slug}-print`,content:empty('Print this chord reference')});
  blocks.push({block_id:`${slug}-related`,content:{...empty('Related chord references'),links:[...related.values()]}});
  const byId=Object.fromEntries(blocks.map(block=>[block.block_id,block]));
  return finalizeChordDetailModel({metadata:{title:raw.seo.title,description:raw.seo.description,canonical_path:url},data,blocks,byId,answer:raw.content.directAnswer,introduction:[],fingeringExamples:[],sources:sourcesFor(raw),practice,searchSections:blocks.filter(block=>block.block_id!==`${slug}-intro`).map(block=>({id:block.block_id,heading:block.content.heading,text:JSON.stringify(block.content)})),tocItems:[{id:data.toolId,label:'Chord & positions'},...blocks.filter(block=>![`${slug}-intro`,data.toolId].includes(block.block_id)).map(block=>({id:block.block_id,label:block.content.heading}))]});
}

function categoryItem(raw:RawDetail):CenterItem{const model=getN2CChordDetail(raw.url),voicing=model.data.voicings[0];return{id:model.data.chord.id,name:raw.name,root:raw.rootSpelling,quality:raw.subtype,url:raw.url,tones:[...raw.definition.toneSpellings],formula:[...model.data.chord.formula_degrees],voicing};}

export function getN2CCategory():ChordCategoryModel{
  if(rawCategory.url!=='/chords/seventh'||rawCategory.rootOrder.length!==12||rawCategory.familySubtypes.length!==4)throw new Error('Missing N2C seventh category');
  const items=getRawN2CDetails().map(categoryItem),ordered=rawCategory.rootOrder.flatMap(root=>rawCategory.subtypeOrder.map(subtype=>items.find(item=>item.root===root&&item.quality===subtype))).filter(Boolean) as CenterItem[];
  if(ordered.length!==48||ordered.some(item=>!isPublicRoute(item.url!)))throw new Error('Incomplete N2C seventh category grid');
  const links=new Map<string,{url:string;label:string}>();for(const edge of linkPlan.filter(edge=>edge.from===rawCategory.url))if(isPublicRoute(edge.to)&&edge.to!==rawCategory.url&&!detailSet.has(edge.to))links.set(edge.to,{url:edge.to,label:edge.anchor});
  const formulas=rawCategory.subtypeOrder.map(subtype=>`${subtype}: ${resolveSeventhDefinition(subtype).formulaDegrees.join('–')}`).join('; ');
  const contentBlocks=[
    {heading:'How seventh chords are built',body:`${rawCategory.intro} The family formulas are ${formulas}. Written note names remain visible even when two names share the same piano key.`},
    {heading:'Four positions for four chord tones',body:'Each detail page keeps the same four chord tones across root position, first inversion, second inversion and third inversion. The lowest chord tone changes while the chord root and written spelling stay the same.'},
  ];
  return{url:'/chords/seventh',quality:'seventh',title:rawCategory.h1,directAnswer:rawCategory.intro,metadata:{title:rawCategory.title,description:rawCategory.description,canonical_path:rawCategory.url},items:ordered,rootOrder:rawCategory.rootOrder,familySubtypes:[...rawCategory.subtypeOrder],contentBlocks,links:[...links.values()],whitePitchClasses:readMaster().legacy_chords_support.shared_data.conventions.white_pitch_classes};
}

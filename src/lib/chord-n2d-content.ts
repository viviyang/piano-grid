import {readFileSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import type {AddChordPractice,AddSubtype,Block,ChordDetailData,ChordDetailModel,ChordSource,DetailVoicing} from './a-minor-types';
import {resolveAddDefinition,positionForAdd,validateAddDefinition} from './chord-add-model';
import {finalizeChordDetailModel} from './chord-detail-model';
import {isPublicRoute} from './site-routes';
import {readMaster} from './site-content';
import type {CenterItem,ChordCategoryModel} from './chord-content';

const packageRoot=resolve('docs/pianogrid-chords-n2d-v2');
const detailRoot=resolve(packageRoot,'03_content/details');
export const N2D_DETAIL_ROUTES=[
 '/chords/c-add9','/chords/d-flat-add9','/chords/d-add9','/chords/e-flat-add9','/chords/e-add9','/chords/f-add9','/chords/f-sharp-add9','/chords/g-add9','/chords/a-flat-add9','/chords/a-add9','/chords/b-flat-add9','/chords/b-add9',
 '/chords/c-madd9','/chords/d-flat-madd9','/chords/d-madd9','/chords/e-flat-madd9','/chords/e-madd9','/chords/f-madd9','/chords/f-sharp-madd9','/chords/g-madd9','/chords/a-flat-madd9','/chords/a-madd9','/chords/b-flat-madd9','/chords/b-madd9',
] as const;
export type N2DChordDetailRoute=(typeof N2D_DETAIL_ROUTES)[number];

type RawEvent={midi:number;onsetMs:number;durationMs:number};
type RawRealization={id:'ninth-above'|'added-note-inside';label:string;chordSymbol:string;notationHint:string;bass:{spelling:string;midi:number;degree:string};notesLowToHigh:string[];midiLowToHigh:number[];realizedDegrees:string[];intervalsFromBassSemitones:number[];omittedDegrees:string[];doubledDegrees:string[];keyboard:{minimumMidi:number;maximumMidi:number;rangeLabel:string;highlightMidi:number[];highlightLabels:string[]};playback:{together:RawEvent[];ascending:RawEvent[];descending:RawEvent[]};print:{pitches:string[];midi:number[];formulaDegrees:string[]};fingering:{status:string;left:null;right:null}};
type RawBlock={id:string;heading:string;kind:string;paragraphs:string[]};
type RawDetail={schemaVersion:string;id:string;url:N2DChordDetailRoute;categoryRoute:string;releaseStatus:string;family:string;subtype:AddSubtype;rootSpelling:string;name:string;symbol:string;aliases:string[];aliasPolicy:string;definition:{expectedUniquePitchClassCount:number;formulaDegrees:string[];components:{degree:string;spelling:string;pitchClass:number;semitonesMod12:number}[];requiredDegrees:string[];optionalDegrees:string[];forbiddenDegrees:string[];validationScope:string};positionPolicy:{kind:string;exampleCount:number;defaultRealizationId:string;enumerateInversions:boolean;reason:string};realizations:RawRealization[];practice:{defaultMode:string;modes:[{id:'chordTones';label:string;expectedPitchClasses:number[];allowOctaveDoublings:true;requiredUniquePitchClassCount:number;instruction:string},{id:'matchExample';label:string;samePitchClassesWrongRegisterFeedback:string;instruction:string}];commonActions:string[];modeOrExampleChange:string};content:{directAnswer:string;blocks:RawBlock[];faq:{question:string;answer:string}[];comparisonRows:{symbol:string;tones?:string[];formula?:string[];seventhIncluded:boolean;thirdIncluded:boolean;route?:string|null;status:string}[]};seo:{title:string;description:string;h1:string;canonical:string;mainKeyword:string;secondaryKeywords:string[];keywordVolume:null};assets:{pdf:string;svg:string;status:string;realizationIds:string[]};fingering:{status:string;sourceIds:string[]};sourceIds:string[]};
type RawCategory={url:string;detailIds:string[];subtypes:AddSubtype[];rootOrder:string[];scopeNote:string;content:{directAnswer:string;blocks:{heading:string;paragraphs:string[]}[];faq:{question:string;answer:string}[]};interaction:{noNewFilterRoutes:boolean};seo:{title:string;description:string;h1:string;canonical:string;keywordVolume:null}};
type LinkEdge={from:string;to:string;anchor:string;relation:string;placement:string;requiredInTargetBatch:boolean};
type SourceRow={id:string;title:string;publisher:string;url:string;accessedOn:string;supports:string[];limits:string[]};

const same=(a:unknown,b:unknown)=>JSON.stringify(a)===JSON.stringify(b);
const pc=(n:number)=>((n%12)+12)%12;
const sorted=(n:number[])=>[...n].sort((a,b)=>a-b);
const empty=(heading:string):Block['content']=>({heading,paragraphs:[],steps:[],table:null,links:[]});
const notePattern=/^([A-G])(𝄪|𝄫|♯|♭)?(-?\d+)?$/u;
const natural:Record<string,number>={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const accidental:Record<string,number>={'':0,'♯':1,'♭':-1,'𝄪':2,'𝄫':-2};
function parseNote(value:string){const match=notePattern.exec(value);if(!match)throw new Error(`Invalid Add pitch spelling: ${value}`);const [,letter,mark='',octaveText]=match,raw=natural[letter]+accidental[mark];return{letter,pitchClass:pc(raw),midi:octaveText===undefined?null:(Number(octaveText)+1)*12+raw};}
const frequency=(midi:number)=>440*2**((midi-69)/12);
const detailSet=new Set<string>(N2D_DETAIL_ROUTES);
const rawDetails=new Map<N2DChordDetailRoute,RawDetail>();
for(const filename of readdirSync(detailRoot).filter(name=>name.endsWith('.page.json'))){const raw=JSON.parse(readFileSync(resolve(detailRoot,filename),'utf8')) as RawDetail;rawDetails.set(raw.url,raw);}
if(rawDetails.size!==24||N2D_DETAIL_ROUTES.some(url=>!rawDetails.has(url)))throw new Error('Incomplete N2D detail package');
const rawCategory=JSON.parse(readFileSync(resolve(packageRoot,'03_content/add.category.page.json'),'utf8')) as RawCategory;
const links=JSON.parse(readFileSync(resolve(packageRoot,'05_navigation_links/internal-links.json'),'utf8')) as LinkEdge[];
const sources=JSON.parse(readFileSync(resolve(packageRoot,'07_sources/source-ledger.json'),'utf8')) as SourceRow[];
const sourceMap=new Map(sources.map(source=>[source.id,source]));

export function isN2DChordDetailRoute(url:string):url is N2DChordDetailRoute{return detailSet.has(url);}
export function getRawN2DDetails(){return N2D_DETAIL_ROUTES.map(url=>rawDetails.get(url)!);}

function validateRaw(raw:RawDetail){
 const definition=resolveAddDefinition(raw.subtype);validateAddDefinition(definition);
 if(raw.schemaVersion!=='N2D-2.0'||raw.family!=='add'||raw.categoryRoute!=='/chords/add'||raw.definition.expectedUniquePitchClassCount!==4||raw.positionPolicy.kind!=='voicingExamples'||raw.positionPolicy.exampleCount!==2||raw.positionPolicy.enumerateInversions||raw.fingering.status!=='not_provided')throw new Error(`Blocked Add detail: ${raw.url}`);
 if(!same(raw.definition.formulaDegrees.map(v=>v.replace('♭','b')),definition.formulaDegrees)||!same(raw.definition.requiredDegrees,raw.definition.formulaDegrees)||raw.definition.optionalDegrees.length||!same(raw.definition.forbiddenDegrees,['7','♭7']))throw new Error(`Add definition formula mismatch: ${raw.url}`);
 const root=parseNote(raw.rootSpelling),components=raw.definition.components;
 if(components.length!==4||new Set(components.map(item=>item.pitchClass)).size!==4||components[0].spelling!==raw.rootSpelling||!same(components.map(item=>item.degree),raw.definition.formulaDegrees)||!same(components.map(item=>item.spelling),raw.definition.components.map(item=>item.spelling)))throw new Error(`Add component shape mismatch: ${raw.url}`);
 const expectedSemitones=definition.semitonesFromRoot;
 components.forEach((item,index)=>{const parsed=parseNote(item.spelling);if(parsed.pitchClass!==item.pitchClass||pc(item.pitchClass-root.pitchClass)!==expectedSemitones[index]||item.semitonesMod12!==expectedSemitones[index])throw new Error(`Add spelling/formula mismatch: ${raw.url}/${item.degree}`);});
 if(raw.realizations.length!==2||!same(raw.realizations.map(item=>item.id),['ninth-above','added-note-inside'])||raw.positionPolicy.defaultRealizationId!=='ninth-above')throw new Error(`Add example set mismatch: ${raw.url}`);
 const definitionPcs=components.map(item=>item.pitchClass);
 raw.realizations.forEach((item,index)=>{
  const midis=item.notesLowToHigh.map(note=>parseNote(note).midi);
  if(midis.some(midi=>midi===null)||!same(midis,item.midiLowToHigh)||!same(midis,item.keyboard.highlightMidi)||!same(midis,item.playback.together.map(event=>event.midi))||!same(midis,item.playback.ascending.map(event=>event.midi))||!same(midis,item.print.midi)||!same(item.notesLowToHigh,item.keyboard.highlightLabels)||!same(item.notesLowToHigh,item.print.pitches))throw new Error(`Add output channel drift: ${raw.url}/${item.id}`);
  if(!same(sorted(item.midiLowToHigh.map(pc)),sorted(definitionPcs))||!same(item.realizedDegrees,index===0?raw.definition.formulaDegrees:['1','9',raw.subtype==='add9'?'3':'♭3','5'])||item.omittedDegrees.length||item.doubledDegrees.length)throw new Error(`Add definition/realization mismatch: ${raw.url}/${item.id}`);
  const expectedIntervals=index===0?[0,definition.semitonesFromRoot[1],7,14]:[0,2,definition.semitonesFromRoot[1],7];
  if(!same(item.intervalsFromBassSemitones,expectedIntervals)||item.bass.midi!==item.midiLowToHigh[0]||item.bass.spelling!==item.notesLowToHigh[0]||item.bass.degree!=='1')throw new Error(`Add register/bass mismatch: ${raw.url}/${item.id}`);
  if(item.midiLowToHigh.some(midi=>midi<item.keyboard.minimumMidi||midi>item.keyboard.maximumMidi)||!same(item.playback.together.map(e=>e.onsetMs),[0,0,0,0])||!same(item.playback.ascending.map(e=>e.onsetMs),[0,600,1200,1800])||item.fingering.status!=='not_provided'||item.fingering.left!==null||item.fingering.right!==null)throw new Error(`Add keyboard/audio/fingering mismatch: ${raw.url}/${item.id}`);
 });
 const tones=raw.practice.modes[0];
 if(raw.practice.defaultMode!=='chordTones'||tones.requiredUniquePitchClassCount!==4||!tones.allowOctaveDoublings||!same(sorted(tones.expectedPitchClasses),sorted(definitionPcs))||raw.practice.modes[1].samePitchClassesWrongRegisterFeedback!=='The chord tones are correct. Now match the octaves shown in this example.')throw new Error(`Add practice contract mismatch: ${raw.url}`);
 if(raw.assets.status!=='to_generate_and_validate_in_repository'||!same(raw.assets.realizationIds,['ninth-above','added-note-inside']))throw new Error(`Add asset contract mismatch: ${raw.url}`);
 return definition;
}

function sourceRows(raw:RawDetail):ChordSource[]{return raw.sourceIds.map(id=>{const source=sourceMap.get(id);if(!source)throw new Error(`Missing Add source: ${id}`);return{id,title:source.title,publisher:source.publisher,url:source.url,checkedOn:source.accessedOn,supports:source.supports.join('; '),limitation:source.limits.join(' ')};});}

export function getN2DChordDetail(url:N2DChordDetailRoute):ChordDetailModel{
 const raw=rawDetails.get(url)!;const definition=validateRaw(raw),master=readMaster(),slug=raw.id;
 const voicings:DetailVoicing[]=raw.realizations.map((item,index)=>({
  voicing_id:`${slug}--${item.id}`,inversion_label:item.label,position:positionForAdd(definition,index,item.notationHint),chord_symbol:item.notationHint,bass_spelling:item.bass.spelling,
  notes_low_to_high:item.notesLowToHigh.map((display_pitch,noteIndex)=>({display_pitch,midi:item.midiLowToHigh[noteIndex]})),
  diagram:{keyboard_range_midi:[item.keyboard.minimumMidi,item.keyboard.maximumMidi],highlight_midi:[...item.midiLowToHigh],alt_text:`${raw.seo.h1}, ${item.label}: ${item.notesLowToHigh.join(', ')} from low to high. These are reference pitches, not a fingering prescription.`},
  playback:{together:item.playback.together.map(event=>({midi:event.midi,frequency_hz:frequency(event.midi),onset_ms:event.onsetMs,duration_ms:event.durationMs})),ascending:item.playback.ascending.map(event=>({midi:event.midi,frequency_hz:frequency(event.midi),onset_ms:event.onsetMs,duration_ms:event.durationMs}))},
  print_data:{spelled_pitches:[...item.print.pitches],highlight_midi:[...item.print.midi]},
 }));
 const data:ChordDetailData={url,namespace:slug,toolId:`${slug}-result`,pdf:{url:raw.assets.pdf,label:`Download ${raw.symbol} PDF`},rangeLabel:raw.realizations[0].keyboard.rangeLabel,defaultId:`${slug}--ninth-above`,options:voicings.map(item=>({value:item.voicing_id,label:item.inversion_label})),chord:{id:slug,slug,name_en:raw.name,symbol:raw.symbol,root_spelling:raw.rootSpelling,quality:raw.subtype,note_spellings:raw.definition.components.map(item=>item.spelling),formula_degrees:[...definition.formulaDegrees],definition},voicings,whitePitchClasses:master.legacy_chords_support.shared_data.conventions.white_pitch_classes,microcopy:master.pages['/chords/a-minor'].microcopy,heading:raw.seo.h1,toolHeading:`${raw.name} keyboard layouts`,printDisclaimer:'These two root-bass layouts are reference examples. Fingering is intentionally not assigned.',fingeringStatus:'not_provided',selectorLegend:'Example',selectorNoun:'layout',noScriptDescription:'The first keyboard layout, both layout tables, explanations, and PDF remain available. Enable JavaScript to switch examples, play sound, or use practice.'};
 const related=new Map<string,{url:string;label:string;published:boolean}>();
 for(const edge of links.filter(edge=>edge.from===url))if(edge.to!==url&&isPublicRoute(edge.to))related.set(edge.to,{url:edge.to,label:edge.anchor,published:true});
 related.set('/chords/add',{url:'/chords/add',label:'Browse add9 and minor add9 chords',published:true});
 const blocks:Block[]=[{block_id:`${slug}-intro`,content:{...empty(raw.seo.h1),paragraphs:[raw.aliasPolicy,raw.definition.validationScope]}},{block_id:data.toolId,content:{...empty(data.toolHeading),paragraphs:[raw.positionPolicy.reason]}}];
 for(const content of raw.content.blocks)blocks.push({block_id:`${slug}-${content.id}`,content:{...empty(content.heading),paragraphs:[...content.paragraphs]}});
 const voicingBlock=blocks.find(block=>block.block_id===`${slug}-voicings`)!;
 voicingBlock.content.table={columns:['Example','Notation hint','Notes, low to high','Bass'],rows:voicings.map(item=>[item.inversion_label,item.chord_symbol,item.notes_low_to_high.map(note=>note.display_pitch).join('–'),item.bass_spelling])};
 const comparison=blocks.find(block=>block.block_id===`${slug}-comparison`)!;
 comparison.content.table={columns:['Symbol','Notes or formula','Third','Seventh'],rows:raw.content.comparisonRows.map(row=>[row.symbol,(row.tones||row.formula||[]).join('–'),row.thirdIncluded?'Included':'Not included',row.seventhIncluded?'Included':'Not included'])};
 blocks.push({block_id:`${slug}-fingering-example`,content:{...empty('Fingering is not provided for these layouts'),paragraphs:['The keyboard and octave labels show the pitches to compare, but they do not prescribe a one-hand shape.'],links:[{url:'/keyboard-notes/finger-numbers',label:'Read left- and right-hand finger numbers',published:true}]}});
 blocks.push({block_id:`${slug}-questions`,content:{...empty(`Questions about ${raw.symbol}`),table:{columns:['Question','Answer'],rows:raw.content.faq.map(item=>[item.question,item.answer])}}});
 const practice:AddChordPractice={id:'practice',kind:'add',heading:`Practise ${raw.symbol} chord tones and layouts`,prompt:raw.content.blocks.find(block=>block.id==='practice')!.paragraphs[0],scope:raw.content.blocks.find(block=>block.id==='practice')!.paragraphs[1],requiredPitchClassCount:4,defaultMode:'chordTones',modes:[{...raw.practice.modes[0]},{...raw.practice.modes[1]}],midiRange:[48,76]};
 blocks.push({block_id:'practice',content:{...empty(practice.heading),paragraphs:[practice.prompt,practice.scope]}});
 blocks.push({block_id:`${slug}-related`,content:{...empty('Related chord references'),links:[...related.values()]}});
 const byId=Object.fromEntries(blocks.map(block=>[block.block_id,block]));
 const tocItems=[{id:data.toolId,label:'Chord & layouts'},...blocks.filter(block=>![`${slug}-intro`,data.toolId,'practice'].includes(block.block_id)).map(block=>({id:block.block_id,label:block.content.heading})),{id:'practice',label:'Practice'}];
 return finalizeChordDetailModel({metadata:{title:raw.seo.title,description:raw.seo.description,canonical_path:url},data,blocks,byId,answer:raw.content.directAnswer,introduction:[],fingeringExamples:[],sources:sourceRows(raw),practice,searchSections:blocks.filter(block=>block.block_id!==`${slug}-intro`).map(block=>({id:block.block_id,heading:block.content.heading,text:JSON.stringify(block.content)})),tocItems});
}

function categoryItem(raw:RawDetail):CenterItem{const model=getN2DChordDetail(raw.url),voicing=model.data.voicings[0];return{id:raw.id,name:raw.name,root:raw.rootSpelling,quality:raw.subtype,url:raw.url,tones:[...model.data.chord.note_spellings],formula:[...model.data.chord.formula_degrees],voicing};}
export function getN2DCategory():ChordCategoryModel{
 if(rawCategory.url!=='/chords/add'||rawCategory.detailIds.length!==24||rawCategory.rootOrder.length!==12||!rawCategory.interaction.noNewFilterRoutes)throw new Error('Invalid Add category package');
 const all=getRawN2DDetails().map(categoryItem),items=rawCategory.rootOrder.flatMap(root=>rawCategory.subtypes.map(subtype=>all.find(item=>item.root===root&&item.quality===subtype))).filter(Boolean) as CenterItem[];
 if(items.length!==24||items.some(item=>!isPublicRoute(item.url!)))throw new Error('Incomplete Add category grid');
 const support=new Map<string,{url:string;label:string}>();for(const edge of links.filter(edge=>edge.from==='/chords/add'))if(isPublicRoute(edge.to)&&!detailSet.has(edge.to)&&edge.to!=='/chords/add')support.set(edge.to,{url:edge.to,label:edge.anchor});
 return{url:'/chords/add',quality:'add',title:rawCategory.seo.h1,directAnswer:rawCategory.content.directAnswer,metadata:{title:rawCategory.seo.title,description:rawCategory.seo.description,canonical_path:'/chords/add'},items,rootOrder:[...rawCategory.rootOrder],familySubtypes:[...rawCategory.subtypes],contentBlocks:rawCategory.content.blocks.filter(block=>block.heading!=='Choose a root and added-note type').map(block=>({heading:block.heading,body:block.paragraphs.join(' ')})),links:[...support.values()],whitePitchClasses:readMaster().legacy_chords_support.shared_data.conventions.white_pitch_classes};
}

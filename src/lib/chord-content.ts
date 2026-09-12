import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { readAuthorizedPage } from './site-content';
import { isPublicRoute } from './site-routes';
import { getAMinorContent } from './a-minor-content';
import type { ChordDetailData, ChordDetailModel, Block, ChordQuality, DetailVoicing, Voicing } from './a-minor-types';
import { positionForThreeNote, resolveThreeNoteDefinition } from './chord-family-model';
import { finalizeChordDetailModel, type ChordDetailRoute } from './chord-detail-model';
import { cMajorConnectionBlock, fingeringBlock, getChordLearning, practiceBlock } from './chord-learning-content';
import { getExpansionChordDetail, isExpansionChordDetailRoute } from './chord-expansion-content';
import { getN2BCategory, getN2BChordDetail, isN2BChordDetailRoute, type N2BCategory } from './chord-n2b-content';

type NewVoicing = {id:string;label:string;symbol:string;bass:string;notes:string[];midi:number[];keyboard_highlights:{midi:number;spelling:string}[];playback:{simultaneous_midi:number[];ascending_midi:number[]}};
type DetailBinding={h1:string;tool_heading:string;answer:string;keyboard_range_midi:number[];range_label:string;pdf:{url:string;label:string};quality:ChordQuality;formula_degrees:string[];namespace:string;detail_publish_gate:string};
type LinkEdge={id:string;from:string;to:string;fragment:string|null;href:string;anchor:string};
const detailCopy: Record<'/chords/a-major' | '/chords/c-major', { heading: string; title: string; description: string }> = {
 '/chords/a-major': {heading:'A Major Piano Chord',title:'A Major Piano Chord: Notes, Inversions & Keyboard Diagrams',description:'Find the A major piano chord notes A, C-sharp and E. Compare root position and two inversions with keyboard diagrams, sound examples and a printable reference.'},
 '/chords/c-major': {heading:'C Major Piano Chord',title:'C Major Piano Chord: Notes, Inversions & Keyboard Diagrams',description:'Find the C major piano chord notes C, E and G. Compare root position and two inversions with keyboard diagrams, sound examples and a printable reference.'},
};
const nextBindings=JSON.parse(readFileSync(resolve('docs/pianogrid-chords-content-next/03_learning/adapter-bindings.json'),'utf8')) as Partial<Record<ChordDetailRoute,DetailBinding>>;
const linkPlan=JSON.parse(readFileSync(resolve('docs/pianogrid-chords-content-next/01_planning/internal-links.json'),'utf8')) as {edges:LinkEdge[]};
const selectedLinkIds=new Set(['L003','L005','L006','L007','L008','L011','L012','L013','L014','L015','L018','L019','L020','L022','L023','L024','L027','L030','L031','L032','L035','L036','L037','L038','L039','L041','L042','L043','L044','L045','L047','L057','L058','L059','L060','L065','L066','L067','L068','L069']);
const empty=(heading:string):Block['content']=>({heading,paragraphs:[],steps:[],table:null,links:[]});
function splitHref(href:string){const index=href.indexOf('#');return index<0?{pathname:href,fragment:null}:{pathname:href.slice(0,index),fragment:href.slice(index+1)};}
function canPublishLink(href:string,anchors:Set<string>){const {pathname,fragment}=splitHref(href);return isPublicRoute(pathname)&&(!fragment||anchors.has(fragment));}
export function getChordDetail(url:ChordDetailRoute):ChordDetailModel {
 if(url==='/chords/a-minor')return getAMinorContent();
 if(isExpansionChordDetailRoute(url))return getExpansionChordDetail(url);
 if(isN2BChordDetailRoute(url))return getN2BChordDetail(url);
 const {page,master}=readAuthorizedPage(url);
 const copy=detailCopy[url as keyof typeof detailCopy];
 const nextBinding=nextBindings[url];
 if(!copy&&!nextBinding)throw new Error(`Wrong detail adapter: ${url}`);
 const binding:DetailBinding=nextBinding||{h1:copy.heading,tool_heading:page.blocks[0].heading,answer:page.blocks[0].body,keyboard_range_midi:[60,84],range_label:'C4–C6',pdf:{url:`/reference/assets/chord-${url.split('/').at(-1)}.pdf`,label:`Download ${page.data.root} ${page.data.quality} PDF`},quality:'major',formula_degrees:['1','3','5'],namespace:url.split('/').at(-1)!,detail_publish_gate:'b3_existing'};
 const optionalFingering=url==='/chords/c-flat-major'&&binding.detail_publish_gate==='root_fingering_missing';
 if(binding.detail_publish_gate!=='b3_existing'&&binding.detail_publish_gate!=='integration_and_regression_pending'&&!optionalFingering)throw new Error(`Blocked detail binding: ${url}`);
 const expected=['Notes and keyboard position','What to notice','Compare three positions'];
 if(page.blocks.length!==3||page.blocks.some((b:{heading:string;body:string},i:number)=>b.heading!==expected[i]||typeof b.body!=='string'))throw new Error(`Unknown/missing core block: ${url}`);
 const prefix=url.split('/').at(-1)!,d=page.data,contract=master.legacy_chords_support.playback_contract,definition=resolveThreeNoteDefinition(binding.quality);
 if(binding.namespace!==prefix||binding.quality!==d.quality)throw new Error(`Binding identity mismatch: ${url}`);
 const voicings:DetailVoicing[]=d.voicings.map((v:NewVoicing,index:number)=>{
  if(v.notes.length!==3||v.midi.length!==3||JSON.stringify(v.keyboard_highlights.map(h=>h.midi))!==JSON.stringify(v.midi))throw new Error(`Missing voicing: ${url}`);
  // Full displayed registers differ between legacy and new content: never transpose to fit.
  const notes=v.notes.map((pitch,i)=>({display_pitch:displayAccidentals(pitch),midi:v.midi[i]}));
  const events=(midis:number[],mode:'together'|'ascending')=>midis.map((midi,i)=>({midi,frequency_hz:440*2**((midi-69)/12),onset_ms:mode==='together'?0:contract.ascending_onsets_ms[i],duration_ms:mode==='together'?contract.together_duration_ms:contract.ascending_duration_ms}));
  return {voicing_id:`${prefix}--${v.id}`,inversion_label:v.label,position:positionForThreeNote(definition,index),chord_symbol:displayAccidentals(v.symbol),bass_spelling:displayAccidentals(v.bass),notes_low_to_high:notes,diagram:{keyboard_range_midi:binding.keyboard_range_midi,highlight_midi:v.keyboard_highlights.map(h=>h.midi),alt_text:`${displayAccidentals(d.root)} ${d.quality}, ${v.label}: ${v.notes.map(displayAccidentals).join(', ')} from low to high. Marked keys are the notes to play.`},playback:{together:events(v.playback.simultaneous_midi,'together'),ascending:events(v.playback.ascending_midi,'ascending')},print_data:{spelled_pitches:[...v.notes],highlight_midi:[...v.midi]}};
 });
 const name=`${displayAccidentals(d.root)} ${d.quality}`;
 const expectedSemitones=binding.quality==='major'?[0,4,7]:[0,3,7];
 if(JSON.stringify(d.semitones_from_root)!==JSON.stringify(expectedSemitones)||JSON.stringify(binding.formula_degrees)!==JSON.stringify(binding.quality==='major'?['1','3','5']:['1','b3','5']))throw new Error(`Unsupported chord definition: ${url}`);
 const data:ChordDetailData={url,namespace:prefix,toolId:`${prefix}-result`,rangeLabel:binding.range_label,pdf:binding.pdf,defaultId:`${prefix}--${d.default_voicing}`,options:voicings.map(v=>({value:v.voicing_id,label:v.inversion_label})),chord:{id:prefix,slug:prefix,name_en:name,symbol:displayAccidentals(d.symbol),root_spelling:displayAccidentals(d.root),quality:binding.quality,note_spellings:d.pitch_classes.map(displayAccidentals),formula_degrees:binding.formula_degrees,definition},voicings,whitePitchClasses:master.legacy_chords_support.shared_data.conventions.white_pitch_classes,microcopy:master.pages['/chords/a-minor'].microcopy,heading:binding.h1,toolHeading:binding.tool_heading,printDisclaimer:'The marked keys show pitches, not a hand shape or a required fingering.',fingeringStatus:optionalFingering?'not_provided':'verified_examples'};
 const blocks:Block[]=[{block_id:`${prefix}-intro`,content:{...empty(binding.h1),paragraphs:[page.blocks[0].body]}},{block_id:data.toolId,content:empty(binding.tool_heading)},{block_id:`${prefix}-notice`,content:{...empty(page.blocks[1].heading),paragraphs:[page.blocks[1].body]}},{block_id:`${prefix}-inversions`,content:{...empty(page.blocks[2].heading),paragraphs:[page.blocks[2].body],table:{columns:['Position','Symbol','Notes, low to high','Bass'],rows:voicings.map(v=>[v.inversion_label,v.chord_symbol,v.notes_low_to_high.map(n=>n.display_pitch).join('–'),v.bass_spelling])}}},{block_id:`${prefix}-reference`,content:{...empty('Chord reference'),paragraphs:[`Common names: ${d.aliases.join(', ')}.`,`Intervals from the root: ${d.intervals.join(', ')}.`]}},{block_id:`${prefix}-print`,content:empty('Print this chord reference')}];
 const learning=getChordLearning(url,data);
 const existingFingering=d.verified_fingering_example?{block_id:`${prefix}-fingering-example`,content:{...empty('Root-position fingering examples'),paragraphs:[`${d.verified_fingering_example.scope}: ${d.verified_fingering_example.notes.map(displayAccidentals).join('–')} → ${d.verified_fingering_example.fingers.join('–')}.`]}}:undefined;
 const fingeringSection=optionalFingering?{block_id:`${prefix}-fingering-example`,content:{...empty('Fingering is not provided for this reference'),paragraphs:['No verified hand-number examples are currently provided for C-flat major. The chord tones, written spelling, keyboard positions, playback and print reference remain available without assigning a fingering.'],links:isPublicRoute('/keyboard-notes/finger-numbers')?[{url:'/keyboard-notes/finger-numbers',label:'Read left- and right-hand finger numbers',published:true}]:[]}}:fingeringBlock(data,existingFingering);
 blocks.splice(4,0,fingeringSection);
 if(url==='/chords/c-major')blocks.splice(5,0,cMajorConnectionBlock());
 let printIndex=blocks.findIndex(block=>block.block_id===`${prefix}-print`);
 if(learning.extraBlocks.length){const extra=learning.extraBlocks.map(block=>({block_id:block.block_id,content:{...block.content,paragraphs:[...block.content.paragraphs],steps:[...block.content.steps],links:[...block.content.links],table:block.content.table?{columns:[...block.content.table.columns],rows:block.content.table.rows.map(row=>[...row])}:null}}));blocks.splice(printIndex,0,...extra);}
 printIndex=blocks.findIndex(block=>block.block_id===`${prefix}-print`);
 blocks.splice(printIndex,0,practiceBlock(data,learning.practice));
 const anchors=new Set(blocks.map(block=>block.block_id));
 const links=new Map<string,{url:string;label:string;published:boolean}>();
 for(const href of d.related as string[])if(canPublishLink(href,anchors))links.set(href,{url:href,label:href==='/chords'?'Piano chord chart':href,published:true});
 for(const edge of linkPlan.edges)if(edge.from===url&&selectedLinkIds.has(edge.id)&&canPublishLink(edge.href,anchors))links.set(edge.href,{url:edge.href,label:edge.anchor,published:true});
 if(new Set(['/chords/a-major','/chords/c-major','/chords/g-major','/chords/e-major','/chords/b-major']).has(url)&&isPublicRoute('/chord-progressions'))links.set('/chord-progressions',{url:'/chord-progressions',label:'Use this chord in a progression',published:true});
 if(links.size)blocks.push({block_id:`${prefix}-related`,content:{...empty('Related references'),links:[...links.values()]}});
 if(url==='/chords/a-major')blocks.find(block=>block.block_id==='a-major-notice')!.content.links.push({url:'/chords/a-minor',label:'Compare with A minor',published:true});
 const byId=Object.fromEntries(blocks.map(b=>[b.block_id,b]));
 const metadata=copy?{...page.metadata,title:copy.title,description:copy.description}:page.metadata;
 return finalizeChordDetailModel({data,blocks,byId,metadata,answer:binding.answer,introduction:[],fingeringExamples:learning.fingerings,sources:learning.sources,practice:learning.practice,
  searchSections:blocks.filter(b=>b.block_id!==`${prefix}-intro`).map(b=>({id:b.block_id,heading:b.content.heading,text:JSON.stringify(b.content)})),
  tocItems:[{id:data.toolId,label:'Chord & positions'},...blocks.filter(block=>![`${prefix}-intro`,data.toolId].includes(block.block_id)).map(block=>({id:block.block_id,label:block.content.heading}))]});
}

export type CenterItem={id:string;name:string;root:string;quality:string;url:string|null;voicing:Voicing;tones:string[];formula:string[]};
export type CenterModel={title:string;metadata:{title:string;description:string;canonical_path:string};blocks:Block[];items:CenterItem[];comparisons:{left:CenterItem;right:CenterItem}[];practiceLinks:{url:string;label:string;description:string}[];filters:{defaults:{root:string|null;quality:string|null;selected_chord_id:string};root_options:{value:string|null;label:string}[];quality_options:{value:string|null;label:string}[]};microcopy:ChordDetailData['microcopy']&{no_results:string};whitePitchClasses:number[];pdf:string};
export type ChordCategoryId='major'|'minor'|N2BCategory;
export type ChordCategoryModel={url:`/chords/${ChordCategoryId}`;quality:ChordCategoryId;title:string;directAnswer:string;metadata:{title:string;description:string;canonical_path:string};items:CenterItem[];rootOrder:string[];familySubtypes:string[];contentBlocks:{heading:string;body:string}[];links:{url:string;label:string}[];whitePitchClasses:number[]};
type KeyChordSource={symbol:string;quality:'major'|'minor'|'diminished';notes:string[];semitones_from_root:number[];reference_voicing:string[];fingering:null};
type HubAddition={id:string;name:string;symbol:string;root:string;quality:'major'|'minor';url:string;tones:string[];formula:string[];voicing:{notes:string[];midi:number[]};status:string};
const pitchClasses:Record<string,number>={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const displayAccidentals=(value:string)=>value.replaceAll('#','♯').replaceAll('b','♭');
const rootName=(root:string)=>root.replace('#','-sharp').replace('b','-flat');
const chordID=(root:string,quality:string)=>`${rootName(root).toLowerCase()}-${quality}`;
function parsedPitch(value:string){const match=/^([A-G])([#b]?)(-?\d+)$/.exec(value);if(!match)throw new Error(`Invalid pitch: ${value}`);const [,letter,accidental,octaveText]=match,octave=Number(octaveText),offset=accidental==='#'?1:accidental==='b'?-1:0;return{letter,accidental,octave,midi:(octave+1)*12+pitchClasses[letter]+offset};}
function keyChordItem(row:KeyChordSource):CenterItem{
 if(!['major','minor'].includes(row.quality)||row.notes.length!==3||row.reference_voicing.length!==3||row.fingering!==null)throw new Error(`Unsupported key-chord row: ${row.symbol}`);
 const parsed=row.reference_voicing.map(parsedPitch),intervals=parsed.map(note=>note.midi-parsed[0].midi),expected=row.quality==='major'?[0,4,7]:[0,3,7];
 if(JSON.stringify(row.semitones_from_root)!==JSON.stringify(expected)||JSON.stringify(intervals)!==JSON.stringify(expected)||JSON.stringify(parsed.map(note=>`${note.letter}${note.accidental}`))!==JSON.stringify(row.notes))throw new Error(`Invalid key-chord spelling: ${row.symbol}`);
 const octaveShift=Math.max(...parsed.map(note=>note.midi))>72?-1:0,notes=parsed.map(note=>({display_pitch:displayAccidentals(`${note.letter}${note.accidental}${note.octave+octaveShift}`),midi:note.midi+octaveShift*12}));
 if(notes.some(note=>note.midi<48||note.midi>72))throw new Error(`Key-chord voicing outside C3-C5: ${row.symbol}`);
 const root=row.notes[0],id=chordID(root,row.quality),name=`${rootName(root)} ${row.quality}`,midis=notes.map(note=>note.midi),events=(mode:'together'|'ascending')=>midis.map((midi,index)=>({midi,frequency_hz:440*2**((midi-69)/12),onset_ms:mode==='together'?0:index*600,duration_ms:mode==='together'?1200:500}));
 const detailURL=`/chords/${id}`;
 return{id,name,root,quality:row.quality,url:isPublicRoute(detailURL)?detailURL:null,tones:row.notes.map(displayAccidentals),formula:['1',row.quality==='major'?'3':'b3','5'],voicing:{voicing_id:`${id}--root`,inversion_label:'Root position',chord_symbol:displayAccidentals(row.symbol),bass_spelling:notes[0].display_pitch,notes_low_to_high:notes,diagram:{highlight_midi:midis,keyboard_range_midi:[48,72],alt_text:`${name}, root position: ${notes.map(note=>note.display_pitch).join(', ')} from low to high. Marked keys are the notes to play.`},playback:{together:events('together'),ascending:events('ascending')},print_data:{spelled_pitches:notes.map(note=>note.display_pitch),highlight_midi:midis}}};
}
export function getChordCenter():CenterModel {
 const {page,master}=readAuthorizedPage('/chords'),shared=master.legacy_chords_support.shared_data;
 const ids=['chords-intro','chords-chart','chords-how-to-read','chords-major-minor','chords-print','chords-questions','chords-next'];
 if(JSON.stringify(page.blocks.map((b:Block)=>b.block_id))!==JSON.stringify(ids))throw new Error('Unknown/missing center block');
 const originalItems:CenterItem[]=page.data.chord_ids.map((id:string)=>{const c=shared.chords[id],v=shared.voicings[c.root_voicing_id];if(!v)throw new Error(`Missing ${id}`);return {id,tones:c.note_spellings,formula:c.formula_degrees,name:c.name_en,root:c.root_spelling,quality:c.quality,url:isPublicRoute(c.canonical_url)?c.canonical_url:null,voicing:{voicing_id:v.voicing_id,inversion_label:v.inversion_label,chord_symbol:v.chord_symbol,bass_spelling:v.bass_spelling,notes_low_to_high:v.notes_low_to_high.map((n:{display_pitch:string;midi:number})=>({display_pitch:n.display_pitch,midi:n.midi})),diagram:v.diagram,playback:{together:v.playback.together,ascending:v.playback.ascending},print_data:v.print_data}};});
 const keyPage=master.pages['/chords/by-key'];if(!keyPage||keyPage.data.keys.some((key:{evidence_status:string})=>!key.evidence_status.includes('formula crosscheck passed')))throw new Error('Key-chord source rows are not ready for reuse');
 const keyRows=new Map<string,KeyChordSource>();for(const key of keyPage.data.keys)for(const row of key.chords as KeyChordSource[]){if(!['major','minor'].includes(row.quality))continue;const identity=`${row.notes[0]}|${row.quality}`,prior=keyRows.get(identity);if(prior&&JSON.stringify([prior.notes,prior.reference_voicing])!==JSON.stringify([row.notes,row.reference_voicing]))throw new Error(`Conflicting key-chord rows: ${identity}`);keyRows.set(identity,row);}
 const itemMap=new Map(originalItems.map(item=>[item.id,item]));for(const row of keyRows.values()){const item=keyChordItem(row);if(!itemMap.has(item.id))itemMap.set(item.id,item);}
 const additions=JSON.parse(readFileSync(resolve('docs/pianogrid-chords-next-expansion/02_routes/hub.additions.N1.json'),'utf8')) as {new_objects:HubAddition[];expected_hub_count_after_additions:number};
 if(additions.expected_hub_count_after_additions!==25||additions.new_objects.length!==6)throw new Error('Unexpected N1 hub additions');
 for(const addition of additions.new_objects){
  if(addition.status!=='add_to_hub_in_N1'||!isPublicRoute(addition.url))throw new Error(`Blocked N1 hub object: ${addition.id}`);
  const ascii=(value:string)=>value.replaceAll('♯','#').replaceAll('♭','b');
  const item=keyChordItem({symbol:ascii(addition.symbol),quality:addition.quality,notes:addition.tones.map(ascii),semitones_from_root:addition.quality==='major'?[0,4,7]:[0,3,7],reference_voicing:addition.voicing.notes.map(ascii),fingering:null});
  if(item.id!==addition.id||item.url!==addition.url||JSON.stringify(item.voicing.notes_low_to_high.map(note=>note.midi))!==JSON.stringify(addition.voicing.midi))throw new Error(`N1 hub identity mismatch: ${addition.id}`);
  itemMap.set(item.id,{...item,name:addition.name});
 }
 const order=['c-major','a-minor','f-major','d-minor','g-major','e-minor','d-major','b-minor','a-major','f-sharp-minor','e-major','c-sharp-minor','b-major','g-sharp-minor','b-flat-major','g-minor','c-minor','a-flat-major','c-flat-major','d-flat-major','e-flat-major','f-sharp-major','f-minor','b-flat-minor','e-flat-minor'];
 const items=order.map(id=>itemMap.get(id));if(items.some(item=>!item)||items.length!==itemMap.size)throw new Error('Expanded chord collection order is incomplete');const completeItems=items as CenterItem[];
 const comparisons=Object.values(shared.comparisons).map(pair=>{const p=pair as {left:string;right:string};return {left:completeItems.find(i=>i.voicing.voicing_id===p.left)!,right:completeItems.find(i=>i.voicing.voicing_id===p.right)!};});
 const blocks:Block[]=page.blocks.map((block:Block)=>({block_id:block.block_id,content:{...block.content,paragraphs:[...block.content.paragraphs],steps:[...block.content.steps],links:[...block.content.links],table:block.content.table?{columns:[...block.content.table.columns],rows:block.content.table.rows.map(row=>[...row])}:null}}));
 const next=blocks.find(block=>block.block_id==='chords-next')!;
 for(const edge of linkPlan.edges)if(edge.from==='/chords'&&['L053','L054','L061','L062','L063'].includes(edge.id)&&canPublishLink(edge.href,new Set()))next.content.links.push({url:edge.href,label:edge.anchor,published:true});
 next.content.links.push({url:'/chords/major',label:'Browse major chords',published:true},{url:'/chords/minor',label:'Browse minor chords',published:true});
 next.content.links.push({url:'/chords/diminished',label:'Browse diminished chords',published:true},{url:'/chords/augmented',label:'Browse augmented chords',published:true},{url:'/chords/suspended',label:'Browse suspended chords',published:true});
 blocks.find(block=>block.block_id==='chords-intro')!.content.paragraphs=['Use this piano chord chart to find the notes and keyboard positions for 25 major and minor triads. Read the notes from low to high, hear them together or one at a time, and print a reference to keep beside your keyboard.','The chart covers the practical 12 major and 12 minor pitch-class families, plus the published C-flat major written-spelling reference.'];
 blocks.find(block=>block.block_id==='chords-print')!.content.paragraphs[0]='Download the original three-page reference with nine selected chord names. The interactive chart above contains the broader 25-chord collection; use Print this chord or Print matching chords for those results.';
 blocks.find(block=>block.block_id==='chords-how-to-read')!.content.paragraphs.push(
  'A root note names the chord’s tonal starting point; the chord type tells you the interval pattern above that root. For example, A is the root in both A major and A minor, while the type changes the third.',
  'Root position places the root as the lowest note. An inversion keeps the same chord tones but places another chord tone lowest. Right-hand and left-hand fingerings are performance examples for a particular voicing, not additional chord types.',
  'A note name identifies a pitch class, an octave number identifies its register, a scale degree describes the note’s place in a scale or chord formula, and a finger number identifies a digit on one hand.'
 );
 const faq=blocks.find(block=>block.block_id==='chords-questions')!.content.table!;faq.rows=faq.rows.map(row=>row[0]==='Are these all the chords on piano?'?[row[0],'No. This main chart keeps the practical 25 major and minor references. Separate category pages cover diminished, augmented, sus2 and sus4 chords; seventh and extended families are not yet included.']:row);
 const roots=['C','C#','Cb','Db','D','Eb','E','F','F#','G','G#','Ab','A','Bb','B'].filter(root=>completeItems.some(item=>item.root===root));
 const filters={...page.filters,root_options:[{value:null,label:'Any root'},...roots.map(root=>({value:root,label:displayAccidentals(root)}))]};
 const practiceLinks=[
  {url:'/chords/a-minor#practice',label:'Build A minor',description:'Choose A, C, and E.'},
  {url:'/chords/a-major#practice',label:'Build A major',description:'Choose A, C♯, and E.'},
  {url:'/chords/c-major#practice',label:'Build C major',description:'Choose C, E, and G.'},
 ];
 return {title:blocks[0].content.heading,metadata:{...page.metadata,description:'Explore major and minor piano chords with note names, keyboard diagrams, sound examples, and printable references.'},blocks,items:completeItems,comparisons,practiceLinks,filters,microcopy:page.microcopy,whitePitchClasses:shared.conventions.white_pitch_classes,pdf:'/reference/preserved-chords/assets/piano-chord-chart-selected.pdf'};
}

export function getChordCategory(quality:ChordCategoryId):ChordCategoryModel {
 if(quality==='diminished'||quality==='augmented'||quality==='suspended')return getN2BCategory(quality);
 const url=`/chords/${quality}` as const;
 const raw=JSON.parse(readFileSync(resolve(`docs/pianogrid-chords-next-expansion/03_categories/${quality}.page.json`),'utf8')) as {url:string;status:string;title:string;description:string;h1:string;direct_answer:string;root_order:string[];content_blocks:{heading:string;body:string}[]};
 if(raw.url!==url||raw.status!=='publish_in_N1'||raw.root_order.length!==12)throw new Error(`Invalid ${quality} category package`);
 const ascii=(value:string)=>value.replaceAll('♯','#').replaceAll('♭','b');
 const center=getChordCenter();
 const items=raw.root_order.map(root=>center.items.find(item=>item.quality===quality&&item.root===ascii(root)));
 if(items.some(item=>!item)||new Set(items).size!==12||items.some(item=>!item!.url))throw new Error(`Incomplete ${quality} category grid`);
 const planned=JSON.parse(readFileSync(resolve('docs/pianogrid-chords-next-expansion/06_internal_links/internal-links.N1.json'),'utf8')) as {from:string;to:string;anchor:string}[];
 const supportTargets=new Set(['/chords','/chords/by-key','/chord-progressions','/chords/finder','/guide/piano-chords']);
 const links=planned.filter(edge=>edge.from===url&&isPublicRoute(edge.to)&&supportTargets.has(edge.to)).map(edge=>({url:edge.to,label:edge.anchor}));
 if(quality==='major'&&isPublicRoute('/chords/c-flat-major'))links.push({url:'/chords/c-flat-major',label:'Open the C-flat major written-spelling reference'});
 return {url,quality,title:raw.h1,directAnswer:raw.direct_answer,metadata:{title:raw.title,description:raw.description,canonical_path:url},items:items as CenterItem[],rootOrder:raw.root_order.map(ascii),familySubtypes:[quality],contentBlocks:raw.content_blocks,links,whitePitchClasses:center.whitePitchClasses};
}

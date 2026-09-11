import { readAuthorizedPage } from './site-content';
import { isPublicRoute } from './site-routes';
import { getAMinorContent } from './a-minor-content';
import type { ChordDetailData, ChordDetailModel, Block, Voicing } from './a-minor-types';
import { finalizeChordDetailModel, type ChordDetailRoute } from './chord-detail-model';
import { cMajorConnectionBlock, fingeringBlock, getChordLearning, practiceBlock } from './chord-learning-content';

type NewVoicing = {id:string;label:string;symbol:string;bass:string;notes:string[];midi:number[];keyboard_highlights:{midi:number;spelling:string}[];playback:{simultaneous_midi:number[];ascending_midi:number[]}};
const detailCopy: Record<'/chords/a-major' | '/chords/c-major', { heading: string; title: string; description: string }> = {
 '/chords/a-major': {heading:'A Major Piano Chord',title:'A Major Piano Chord: Notes, Inversions & Keyboard Diagrams',description:'Find the A major piano chord notes A, C-sharp and E. Compare root position and two inversions with keyboard diagrams, sound examples and a printable reference.'},
 '/chords/c-major': {heading:'C Major Piano Chord',title:'C Major Piano Chord: Notes, Inversions & Keyboard Diagrams',description:'Find the C major piano chord notes C, E and G. Compare root position and two inversions with keyboard diagrams, sound examples and a printable reference.'},
};
const empty=(heading:string):Block['content']=>({heading,paragraphs:[],steps:[],table:null,links:[]});
export function getChordDetail(url:ChordDetailRoute):ChordDetailModel {
 if(url==='/chords/a-minor')return getAMinorContent();
 const {page,master}=readAuthorizedPage(url);if(!['/chords/a-major','/chords/c-major'].includes(url))throw new Error('Wrong detail adapter');
 const copy=detailCopy[url as keyof typeof detailCopy];
 const expected=['Notes and keyboard position','What to notice','Compare three positions'];
 if(page.blocks.length!==3||page.blocks.some((b:{heading:string;body:string},i:number)=>b.heading!==expected[i]||typeof b.body!=='string'))throw new Error(`Unknown/missing core block: ${url}`);
 const prefix=url.split('/').at(-1)!,d=page.data,contract=master.legacy_chords_support.playback_contract;
 const voicings:Voicing[]=d.voicings.map((v:NewVoicing)=>{
  if(v.notes.length!==3||v.midi.length!==3||JSON.stringify(v.keyboard_highlights.map(h=>h.midi))!==JSON.stringify(v.midi))throw new Error(`Missing voicing: ${url}`);
  // Full displayed registers differ between legacy and new content: never transpose to fit.
  const notes=v.notes.map((pitch,i)=>({display_pitch:displayAccidentals(pitch),midi:v.midi[i]}));
  const events=(midis:number[],mode:'together'|'ascending')=>midis.map((midi,i)=>({midi,frequency_hz:440*2**((midi-69)/12),onset_ms:mode==='together'?0:contract.ascending_onsets_ms[i],duration_ms:mode==='together'?contract.together_duration_ms:contract.ascending_duration_ms}));
  return {voicing_id:`${prefix}--${v.id}`,inversion_label:v.label,chord_symbol:displayAccidentals(v.symbol),bass_spelling:displayAccidentals(v.bass),notes_low_to_high:notes,diagram:{keyboard_range_midi:[60,84],highlight_midi:v.keyboard_highlights.map(h=>h.midi),alt_text:`${d.root} ${d.quality}, ${v.label}: ${v.notes.map(displayAccidentals).join(', ')} from low to high. Marked keys are the notes to play.`},playback:{together:events(v.playback.simultaneous_midi,'together'),ascending:events(v.playback.ascending_midi,'ascending')},print_data:{spelled_pitches:[...v.notes],highlight_midi:[...v.midi]}};
 });
 const name=`${d.root} ${d.quality}`;
 if(d.quality!=='major'||JSON.stringify(d.semitones_from_root)!==JSON.stringify([0,4,7]))throw new Error(`Unsupported chord definition: ${url}`);
 const data:ChordDetailData={url,namespace:prefix,toolId:`${prefix}-result`,rangeLabel:'C4–C6',pdf:{url:`/reference/assets/chord-${prefix}.pdf`,label:`Download ${name} PDF`},defaultId:`${prefix}--${d.default_voicing}`,options:voicings.map(v=>({value:v.voicing_id,label:v.inversion_label})),chord:{id:prefix,slug:prefix,name_en:name,symbol:displayAccidentals(d.symbol),root_spelling:displayAccidentals(d.root),quality:d.quality,note_spellings:d.pitch_classes.map(displayAccidentals),formula_degrees:['1','3','5']},voicings,whitePitchClasses:master.legacy_chords_support.shared_data.conventions.white_pitch_classes,microcopy:master.pages['/chords/a-minor'].microcopy,heading:copy.heading,toolHeading:page.blocks[0].heading,printDisclaimer:'The marked keys show pitches, not a hand shape or a required fingering.'};
 const blocks:Block[]=[{block_id:`${prefix}-intro`,content:{...empty(copy.heading),paragraphs:[page.blocks[0].body]}},{block_id:data.toolId,content:empty(page.blocks[0].heading)},{block_id:`${prefix}-notice`,content:{...empty(page.blocks[1].heading),paragraphs:[page.blocks[1].body]}},{block_id:`${prefix}-inversions`,content:{...empty(page.blocks[2].heading),paragraphs:[page.blocks[2].body],table:{columns:['Position','Symbol','Notes, low to high','Bass'],rows:voicings.map(v=>[v.inversion_label,v.chord_symbol,v.notes_low_to_high.map(n=>n.display_pitch).join('–'),v.bass_spelling])}}},{block_id:`${prefix}-reference`,content:{...empty('Chord reference'),paragraphs:[`Common names: ${d.aliases.join(', ')}.`,`Intervals from the root: ${d.intervals.join(', ')}.`]}},{block_id:`${prefix}-print`,content:empty('Print this chord reference')}];
 const learning=getChordLearning(url,data);
 const existingFingering=d.verified_fingering_example?{block_id:`${prefix}-fingering-example`,content:{...empty('Root-position fingering examples'),paragraphs:[`${d.verified_fingering_example.scope}: ${d.verified_fingering_example.notes.map(displayAccidentals).join('–')} → ${d.verified_fingering_example.fingers.join('–')}.`]}}:undefined;
 blocks.splice(4,0,fingeringBlock(data,existingFingering));
 if(url==='/chords/c-major')blocks.splice(5,0,cMajorConnectionBlock());
 const printIndex=blocks.findIndex(block=>block.block_id===`${prefix}-print`);
 blocks.splice(printIndex,0,practiceBlock(data,learning.practice));
 const related=d.related.filter((u:string)=>isPublicRoute(u));
 if(related.length)blocks.push({block_id:`${prefix}-related`,content:{...empty('Related references'),links:related.map((u:string)=>({url:u,label:u==='/chords'?'Piano chord chart':u,published:true}))}});
 if(url==='/chords/a-major')blocks.find(block=>block.block_id==='a-major-notice')!.content.links.push({url:'/chords/a-minor',label:'Compare with A minor',published:true});
 const byId=Object.fromEntries(blocks.map(b=>[b.block_id,b]));
 return finalizeChordDetailModel({data,blocks,byId,metadata:{...page.metadata,title:copy.title,description:copy.description},answer:page.blocks[0].body,introduction:[],fingeringExamples:learning.fingerings,sources:learning.sources,practice:learning.practice,
  searchSections:blocks.filter(b=>b.block_id!==`${prefix}-intro`).map(b=>({id:b.block_id,heading:b.content.heading,text:JSON.stringify(b.content)})),
  tocItems:[{id:data.toolId,label:'Chord & positions'},...blocks.filter(block=>![`${prefix}-intro`,data.toolId].includes(block.block_id)).map(block=>({id:block.block_id,label:block.content.heading}))]});
}

export type CenterItem={id:string;name:string;root:string;quality:string;url:string|null;voicing:Voicing;tones:string[];formula:string[]};
export type CenterModel={title:string;metadata:{title:string;description:string;canonical_path:string};blocks:Block[];items:CenterItem[];comparisons:{left:CenterItem;right:CenterItem}[];practiceLinks:{url:string;label:string;description:string}[];filters:{defaults:{root:string|null;quality:string|null;selected_chord_id:string};root_options:{value:string|null;label:string}[];quality_options:{value:string|null;label:string}[]};microcopy:ChordDetailData['microcopy']&{no_results:string};whitePitchClasses:number[];pdf:string};
type KeyChordSource={symbol:string;quality:'major'|'minor'|'diminished';notes:string[];semitones_from_root:number[];reference_voicing:string[];fingering:null};
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
 return{id,name,root,quality:row.quality,url:null,tones:row.notes.map(displayAccidentals),formula:['1',row.quality==='major'?'3':'b3','5'],voicing:{voicing_id:`${id}--root`,inversion_label:'Root position',chord_symbol:displayAccidentals(row.symbol),bass_spelling:notes[0].display_pitch,notes_low_to_high:notes,diagram:{highlight_midi:midis,keyboard_range_midi:[48,72],alt_text:`${name}, root position: ${notes.map(note=>note.display_pitch).join(', ')} from low to high. Marked keys are the notes to play.`},playback:{together:events('together'),ascending:events('ascending')},print_data:{spelled_pitches:notes.map(note=>note.display_pitch),highlight_midi:midis}}};
}
export function getChordCenter():CenterModel {
 const {page,master}=readAuthorizedPage('/chords'),shared=master.legacy_chords_support.shared_data;
 const ids=['chords-intro','chords-chart','chords-how-to-read','chords-major-minor','chords-print','chords-questions','chords-next'];
 if(JSON.stringify(page.blocks.map((b:Block)=>b.block_id))!==JSON.stringify(ids))throw new Error('Unknown/missing center block');
 const originalItems:CenterItem[]=page.data.chord_ids.map((id:string)=>{const c=shared.chords[id],v=shared.voicings[c.root_voicing_id];if(!v)throw new Error(`Missing ${id}`);return {id,tones:c.note_spellings,formula:c.formula_degrees,name:c.name_en,root:c.root_spelling,quality:c.quality,url:isPublicRoute(c.canonical_url)?c.canonical_url:null,voicing:{voicing_id:v.voicing_id,inversion_label:v.inversion_label,chord_symbol:v.chord_symbol,bass_spelling:v.bass_spelling,notes_low_to_high:v.notes_low_to_high.map((n:{display_pitch:string;midi:number})=>({display_pitch:n.display_pitch,midi:n.midi})),diagram:v.diagram,playback:{together:v.playback.together,ascending:v.playback.ascending},print_data:v.print_data}};});
 const keyPage=master.pages['/chords/by-key'];if(!keyPage||keyPage.data.keys.some((key:{evidence_status:string})=>!key.evidence_status.includes('formula crosscheck passed')))throw new Error('Key-chord source rows are not ready for reuse');
 const keyRows=new Map<string,KeyChordSource>();for(const key of keyPage.data.keys)for(const row of key.chords as KeyChordSource[]){if(!['major','minor'].includes(row.quality))continue;const identity=`${row.notes[0]}|${row.quality}`,prior=keyRows.get(identity);if(prior&&JSON.stringify([prior.notes,prior.reference_voicing])!==JSON.stringify([row.notes,row.reference_voicing]))throw new Error(`Conflicting key-chord rows: ${identity}`);keyRows.set(identity,row);}
 const itemMap=new Map(originalItems.map(item=>[item.id,item]));for(const row of keyRows.values()){const item=keyChordItem(row);if(!itemMap.has(item.id))itemMap.set(item.id,item);}
 const order=['c-major','a-minor','f-major','d-minor','g-major','e-minor','d-major','b-minor','a-major','f-sharp-minor','e-major','c-sharp-minor','b-major','g-sharp-minor','b-flat-major','g-minor','c-minor','a-flat-major','c-flat-major'];
 const items=order.map(id=>itemMap.get(id));if(items.some(item=>!item)||items.length!==itemMap.size)throw new Error('Expanded chord collection order is incomplete');const completeItems=items as CenterItem[];
 const comparisons=Object.values(shared.comparisons).map(pair=>{const p=pair as {left:string;right:string};return {left:completeItems.find(i=>i.voicing.voicing_id===p.left)!,right:completeItems.find(i=>i.voicing.voicing_id===p.right)!};});
 const blocks:Block[]=page.blocks.map((block:Block)=>({block_id:block.block_id,content:{...block.content,paragraphs:[...block.content.paragraphs],steps:[...block.content.steps],links:[...block.content.links],table:block.content.table?{columns:[...block.content.table.columns],rows:block.content.table.rows.map(row=>[...row])}:null}}));
 blocks.find(block=>block.block_id==='chords-intro')!.content.paragraphs=['Use this piano chord chart to find the notes and keyboard positions for 19 major and minor triads. Read the notes from low to high, hear them together or one at a time, and print a reference to keep beside your keyboard.','The chart includes the major and minor triads already prepared across six common major keys and D minor, plus selected parallel and enharmonic comparisons. It is a practical foundation, not a complete list of piano chords.'];
 blocks.find(block=>block.block_id==='chords-print')!.content.paragraphs[0]='Download the original three-page reference with nine selected chord names. The interactive chart above contains the broader 19-chord collection; use Print this chord or Print matching chords for those results.';
 blocks.find(block=>block.block_id==='chords-how-to-read')!.content.paragraphs.push(
  'A root note names the chord’s tonal starting point; the chord type tells you the interval pattern above that root. For example, A is the root in both A major and A minor, while the type changes the third.',
  'Root position places the root as the lowest note. An inversion keeps the same chord tones but places another chord tone lowest. Right-hand and left-hand fingerings are performance examples for a particular voicing, not additional chord types.',
  'A note name identifies a pitch class, an octave number identifies its register, a scale degree describes the note’s place in a scale or chord formula, and a finger number identifies a digit on one hand.'
 );
 const faq=blocks.find(block=>block.block_id==='chords-questions')!.content.table!;faq.rows=faq.rows.map(row=>row[0]==='Are these all the chords on piano?'?[row[0],'No. This chart covers 19 major and minor triads. Diminished, seventh, power, and jazz chords are not included in this collection.']:row);
 const roots=['C','C#','Cb','D','E','F','F#','G','G#','Ab','A','Bb','B'].filter(root=>completeItems.some(item=>item.root===root));
 const filters={...page.filters,root_options:[{value:null,label:'Any root'},...roots.map(root=>({value:root,label:displayAccidentals(root)}))]};
 const practiceLinks=[
  {url:'/chords/a-minor#practice',label:'Build A minor',description:'Choose A, C, and E.'},
  {url:'/chords/a-major#practice',label:'Build A major',description:'Choose A, C♯, and E.'},
  {url:'/chords/c-major#practice',label:'Build C major',description:'Choose C, E, and G.'},
 ];
 return {title:blocks[0].content.heading,metadata:{...page.metadata,description:'Explore major and minor piano chords with note names, keyboard diagrams, sound examples, and printable references.'},blocks,items:completeItems,comparisons,practiceLinks,filters,microcopy:page.microcopy,whitePitchClasses:shared.conventions.white_pitch_classes,pdf:'/reference/preserved-chords/assets/piano-chord-chart-selected.pdf'};
}


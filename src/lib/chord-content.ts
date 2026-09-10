import { readAuthorizedPage, localPreview, authorizedURLs } from './site-content';
import { getAMinorContent } from './a-minor-content';
import type { AMData, Block, Voicing } from './a-minor-types';

type NewVoicing = {id:string;label:string;symbol:string;bass:string;notes:string[];midi:number[];keyboard_highlights:{midi:number;spelling:string}[];playback:{simultaneous_midi:number[];ascending_midi:number[]}};
const empty=(heading:string):Block['content']=>({heading,paragraphs:[],steps:[],table:null,links:[]});
export function getChordDetail(url:string):ReturnType<typeof getAMinorContent> {
 const {page,master}=readAuthorizedPage(url);if(!['/chords/a-major','/chords/c-major'].includes(url))throw new Error('Wrong detail adapter');
 const expected=['Notes and keyboard position','What to notice','Compare three positions'];
 if(page.blocks.length!==3||page.blocks.some((b:{heading:string;body:string},i:number)=>b.heading!==expected[i]||typeof b.body!=='string'))throw new Error(`Unknown/missing core block: ${url}`);
 const prefix=url.split('/').at(-1)!,d=page.data,contract=master.legacy_chords_support.playback_contract;
 const voicings:Voicing[]=d.voicings.map((v:NewVoicing)=>{
  if(v.notes.length!==3||v.midi.length!==3||JSON.stringify(v.keyboard_highlights.map(h=>h.midi))!==JSON.stringify(v.midi))throw new Error(`Missing voicing: ${url}`);
  // Full displayed registers differ between legacy and new content: never transpose to fit.
  const notes=v.notes.map((display_pitch,i)=>({display_pitch,midi:v.midi[i]}));
  const events=(midis:number[],mode:'together'|'ascending')=>midis.map((midi,i)=>({midi,frequency_hz:440*2**((midi-69)/12),onset_ms:mode==='together'?0:contract.ascending_onsets_ms[i],duration_ms:mode==='together'?contract.together_duration_ms:contract.ascending_duration_ms}));
  return {voicing_id:`${prefix}--${v.id}`,inversion_label:v.label,chord_symbol:v.symbol,bass_spelling:v.bass,notes_low_to_high:notes,diagram:{keyboard_range_midi:[60,84],highlight_midi:v.keyboard_highlights.map(h=>h.midi),alt_text:`${d.root} ${d.quality}, ${v.label}: ${v.notes.join(', ')} from low to high. Marked keys are the notes to play.`},playback:{together:events(v.playback.simultaneous_midi,'together'),ascending:events(v.playback.ascending_midi,'ascending')},print_data:{spelled_pitches:[...v.notes],highlight_midi:[...v.midi]}};
 });
 const name=`${d.root} ${d.quality}`;
 const data:AMData={url,namespace:prefix,toolId:`${prefix}-result`,rangeLabel:'C4–C6',pdf:{url:`/reference/assets/chord-${prefix}.pdf`,label:`Download ${name} PDF`},defaultId:`${prefix}--${d.default_voicing}`,options:voicings.map(v=>({value:v.voicing_id,label:v.inversion_label})),chord:{name_en:name,symbol:d.symbol,root_spelling:d.root,note_spellings:d.pitch_classes,formula_degrees:['1','3','5']},voicings,whitePitchClasses:master.legacy_chords_support.shared_data.conventions.white_pitch_classes,microcopy:master.pages['/chords/a-minor'].microcopy,heading:page.title,toolHeading:page.blocks[0].heading,printDisclaimer:'The marked keys show pitches, not a hand shape or a required fingering.'};
 const blocks:Block[]=[{block_id:`${prefix}-intro`,content:{...empty(page.title),paragraphs:[page.blocks[0].body]}},{block_id:data.toolId,content:empty(page.blocks[0].heading)},{block_id:`${prefix}-notice`,content:{...empty(page.blocks[1].heading),paragraphs:[page.blocks[1].body]}},{block_id:`${prefix}-inversions`,content:{...empty(page.blocks[2].heading),paragraphs:[page.blocks[2].body],table:{columns:['Position','Symbol','Notes, low to high','Bass'],rows:voicings.map(v=>[v.inversion_label,v.chord_symbol,v.notes_low_to_high.map(n=>n.display_pitch).join('–'),v.bass_spelling])}}},{block_id:`${prefix}-reference`,content:{...empty('Chord reference'),paragraphs:[`Common names: ${d.aliases.join(', ')}.`,`Intervals from the root: ${d.intervals.join(', ')}.`]}},{block_id:`${prefix}-print`,content:empty('Print this chord reference')}];
 // Independently sourced RH example remains separate from all null inversion fingerings.
 if(d.verified_fingering_example){const f=d.verified_fingering_example;blocks.splice(4,0,{block_id:`${prefix}-fingering-example`,content:{...empty('Right-hand root-position example'),paragraphs:[`${f.scope}: ${f.notes.join('–')} → ${f.fingers.join('–')}.`]}});}
 const related=d.related.filter((u:string)=>localPreview&&(authorizedURLs as readonly string[]).includes(u));
 if(related.length)blocks.push({block_id:`${prefix}-related`,content:{...empty('Related local previews'),links:related.map((u:string)=>({url:u,label:u==='/chords'?'Piano chord chart':u,published:true}))}});
 const byId=Object.fromEntries(blocks.map(b=>[b.block_id,b]));
 return {data,blocks,byId,metadata:page.metadata,answer:page.blocks[0].body,introduction:[],searchSections:blocks.filter(b=>b.block_id!==`${prefix}-intro`).map(b=>({id:b.block_id,heading:b.content.heading,text:JSON.stringify(b.content)}))};
}

export type CenterItem={id:string;name:string;root:string;quality:string;url:string|null;voicing:Voicing;tones:string[];formula:string[]};
export type CenterModel={title:string;metadata:{title:string;description:string;canonical_path:string};blocks:Block[];items:CenterItem[];comparisons:{left:CenterItem;right:CenterItem}[];filters:{defaults:{root:string|null;quality:string|null;selected_chord_id:string};root_options:{value:string|null;label:string}[];quality_options:{value:string|null;label:string}[]};microcopy:AMData['microcopy']&{no_results:string};whitePitchClasses:number[];pdf:string};
export function getChordCenter():CenterModel {
 const {page,master}=readAuthorizedPage('/chords'),shared=master.legacy_chords_support.shared_data;
 const ids=['chords-intro','chords-chart','chords-how-to-read','chords-major-minor','chords-print','chords-questions','chords-next'];
 if(JSON.stringify(page.blocks.map((b:Block)=>b.block_id))!==JSON.stringify(ids))throw new Error('Unknown/missing center block');
 const items:CenterItem[]=page.data.chord_ids.map((id:string)=>{const c=shared.chords[id],v=shared.voicings[c.root_voicing_id];if(!v)throw new Error(`Missing ${id}`);return {id,tones:c.note_spellings,formula:c.formula_degrees,name:c.name_en,root:c.root_spelling,quality:c.quality,url:localPreview&&(authorizedURLs as readonly string[]).includes(c.canonical_url)?c.canonical_url:null,voicing:{voicing_id:v.voicing_id,inversion_label:v.inversion_label,chord_symbol:v.chord_symbol,bass_spelling:v.bass_spelling,notes_low_to_high:v.notes_low_to_high.map((n:{display_pitch:string;midi:number})=>({display_pitch:n.display_pitch,midi:n.midi})),diagram:v.diagram,playback:{together:v.playback.together,ascending:v.playback.ascending},print_data:v.print_data}};});
 const comparisons=Object.values(shared.comparisons).map(pair=>{const p=pair as {left:string;right:string};return {left:items.find(i=>i.voicing.voicing_id===p.left)!,right:items.find(i=>i.voicing.voicing_id===p.right)!};});
 return {title:page.blocks[0].content.heading,metadata:page.metadata,blocks:page.blocks,items,comparisons,filters:page.filters,microcopy:page.microcopy,whitePitchClasses:shared.conventions.white_pitch_classes,pdf:'/reference/preserved-chords/assets/piano-chord-chart-selected.pdf'};
}


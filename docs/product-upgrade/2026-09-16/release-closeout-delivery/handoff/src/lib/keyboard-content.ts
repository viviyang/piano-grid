import { editorialHeading } from './seo-editorial';
import { readAuthorizedPage } from './site-content';
import { isPublicRoute } from './site-routes';
import type { KeyboardPageModel, Layout, ChartKey, StaffNote } from './keyboard-types';
import { plannedLinksFor } from './support-content';
const blockIDs = {
  '/keyboard-notes': ['start','layout','key-count','black-keys','octaves','spelling-and-range'],
  '/keyboard-notes/labeled': ['choose-layout','read-labels','how-to-label','61-key-labeling','print'],
  '/keyboard-notes/chart': ['start','treble','bass','ledger','range','use'],
  '/keyboard-notes/frequencies': ['basis','lookup','c4','conventions','formula'],
  '/keyboard-notes/blank': ['output','exercise','printing'],
} as const;
export function getKeyboardPage(url: keyof typeof blockIDs) {
  const {page} = readAuthorizedPage(url);
  if (page.blocks.map((b:{id:string})=>b.id).join() !== blockIDs[url].join()) throw new Error(`Unknown or missing keyboard content block: ${url}`);
  const planned = plannedLinksFor(url).map(link => ({ url: link.url, label: link.label }));
  const related = (page.data.related_links ?? page.data.related_urls ?? []).map((link:string|{url:string;label?:string}) => typeof link === 'string' ? {url:link,label:editorialHeading(link,link.split('/').at(-1)?.replaceAll('-',' ') ?? link)} : link);
  const links = [...related.filter((l:{url:string})=>isPublicRoute(l.url) && Object.keys(blockIDs).includes(l.url)), ...planned]
    .filter((link, index, all) => all.findIndex(item => item.url === link.url) === index);
  const model:KeyboardPageModel = {url,title:editorialHeading(url,page.title),description:page.description,metadata:page.metadata,
    blocks:page.blocks.map((b:{id:string;heading:string;body:string})=>({id:b.id,heading:b.heading,body:b.body})),
    links,
    provenance:{template_id:page.template_id,source_groups:page.source_groups.map((g:{id:string})=>g.id),source_ids:page.source_ids,block_ids:page.blocks.map((b:{id:string})=>b.id)}};
  return {model, data:page.data};
}
export function getLayouts(url:'/keyboard-notes'|'/keyboard-notes/labeled') : Layout[] {
  const {data}=getKeyboardPage(url);
  return data.layouts.map((l:Layout)=>{
    if(!['88-key-A0-C8','61-key-C2-C7'].includes(l.layout_id)||l.keys.length!==l.key_count)throw new Error('Unverified keyboard layout');
    return {layout_id:l.layout_id,label:l.label,lowest_note:l.lowest_note,highest_note:l.highest_note,key_count:l.key_count,white_key_count:l.white_key_count,black_key_count:l.black_key_count,keys:l.keys.map(k=>({key_id:k.key_id,midi:k.midi,color:k.color,default_label:k.default_label,label_with_octave:k.label_with_octave,lookup_spellings:k.lookup_spellings,white_key_index:k.white_key_index,black_key_between_white_indices:k.black_key_between_white_indices})),reading_segments:l.reading_segments.map(s=>({label:s.label,midi_range:s.midi_range})),scope_note:l.scope_note};
  });
}
export function getChartData() {
  const {data}=getKeyboardPage('/keyboard-notes/chart');
  const notes:ChartKey[]=data.keyboard_notes.map((k:ChartKey)=>({midi:k.midi,color:k.color,display_names:k.display_names,staff_spellings:k.staff_spellings.map(s=>({name:s.name,treble:staff(s.treble),bass:staff(s.bass)}))}));
  if(notes.length!==88||notes.some(k=>!k.staff_spellings.length))throw new Error('Incomplete staff mapping');
  return {notes,ranges:[...data.range_modes.filter((r:{id:string;first_release_scope?:string})=>!r.first_release_scope||r.id==='61_keys'),...(['treble','bass'] as const).map(c=>({id:c,label:`${c==='treble'?'Treble':'Bass'} reference: ${data.core_views[c].range.join('–')}`,min_midi:data.core_views[c].natural_notes[0].midi,max_midi:data.core_views[c].natural_notes.at(-1).midi}))],defaultNote:data.default_linked_example.selected_note as string};
}
function staff(n:StaffNote):StaffNote {if(!Number.isInteger(n.staff_step_from_bottom_line)||!Array.isArray(n.ledger_line_steps))throw new Error('Missing staff coordinate');return {note:n.note,midi:n.midi,clef:n.clef,accidental:n.accidental,staff_step_from_bottom_line:n.staff_step_from_bottom_line,ledger_line_steps:n.ledger_line_steps};}

export function getFrequencyData() {
  const layout = getLayouts('/keyboard-notes')[0];
  if (layout.layout_id !== '88-key-A0-C8') throw new Error('Missing canonical 88-key layout');
  return {
    layout,
    rows: layout.keys.map((key, index) => ({
      pianoKey: index + 1,
      midi: key.midi,
      note: key.label_with_octave,
      frequency: 440 * 2 ** ((key.midi - 69) / 12),
    })),
  };
}

export function getBlankData() {
  const { data } = getKeyboardPage('/keyboard-notes/blank');
  if (data.layouts.length !== 2 || data.layouts.map((item:{key_count:number})=>item.key_count).join() !== '13,25') throw new Error('Incomplete blank-keyboard layouts');
  if (data.pdf_assets.length !== 2) throw new Error('Incomplete blank-keyboard PDFs');
  return {
    layouts: data.layouts.map((item:{id:string;key_count:number;white_keys:number;black_keys:number;range:string;svg_asset:string}) => ({ id:item.id,keyCount:item.key_count,whiteKeys:item.white_keys,blackKeys:item.black_keys,range:item.range,asset:`/reference/generated/keyboard-notes/${item.svg_asset.split('/').at(-1)}` })),
    pdfs: data.pdf_assets.map((item:{paper:string;file:string;pages:number}) => ({ paper:item.paper,pages:item.pages,asset:`/reference/generated/keyboard-notes/${item.file.split('/').at(-1)}` })),
    answerURL: data.answer_key_url as string,
  };
}

export type LabeledSourceRef = { id: string; title: string; publisher: string; url: string };

/** Resolve labeled-page source IDs to public titles/links from the master registry (RC01). */
export function getLabeledSources(): LabeledSourceRef[] {
  const { page, master } = readAuthorizedPage('/keyboard-notes/labeled');
  const byID = new Map((master.sources as Array<{ source_id: string; title?: string; publisher?: string; url?: string }>).map(source => [source.source_id, source]));
  return (page.source_ids as string[]).map(id => {
    const source = byID.get(id);
    if (!source?.title || !source.publisher || !source.url?.startsWith('https://')) {
      throw new Error(`Labeled source is not ready for public display: ${id}`);
    }
    return { id, title: source.title, publisher: source.publisher, url: source.url };
  });
}

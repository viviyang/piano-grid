import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ChordDetailData, Block, Voicing, SearchSection, ChordDetailModel } from './a-minor-types';
import { isPublicRoute } from './site-routes';
import { finalizeChordDetailModel } from './chord-detail-model';
import { fingeringBlock, getChordLearning, practiceBlock } from './chord-learning-content';
import { plannedLinksFor } from './support-content';

// Server-only adapter. Client props contain no whole-site ledger, keywords or base64 PDF.
export function getAMinorContent():ChordDetailModel {
  const source = JSON.parse(readFileSync(join(process.cwd(), 'docs/content/chords/page-content.json'), 'utf8'));
  const page = source.pages['/chords/a-minor'];
  // Publication comes from the actual route whitelist; the historical source stays intact.
  const blocks = (page.blocks as Block[]).map(block=>block.block_id==='am-next'
    ? {...block,content:{...block.content,links:block.content.links.map(link=>({...link,published:isPublicRoute(link.url)}))}}
    : {...block,content:{...block.content}});
  const next = blocks.find(block => block.block_id === 'am-next')!;
  for (const link of plannedLinksFor('/chords/a-minor', new Set(['L055', 'L056', 'L064']))) {
    if (!next.content.links.some(existing => existing.url === link.url)) next.content.links.push({ url: link.url, label: link.label, published: true });
  }
  if (isPublicRoute('/chord-progressions') && !next.content.links.some(existing => existing.url === '/chord-progressions')) next.content.links.push({ url: '/chord-progressions', label: 'Use A minor in a progression', published: true });
  let byId = Object.fromEntries(blocks.map(block => [block.block_id, block]));
  const majorLink=byId['am-next'].content.links.find(link=>link.url==='/chords/a-major'&&link.published);
  if(majorLink)byId['am-why-minor'].content.links=[...byId['am-why-minor'].content.links,majorLink];
  const chord = source.shared_data.chords['a-minor'];
  const voicings: Voicing[] = page.data.voicing_ids.map((id: string) => {
    const v = source.shared_data.voicings[id];
    return { voicing_id: v.voicing_id, inversion_label: v.inversion_label, chord_symbol: v.chord_symbol,
      bass_spelling: v.bass_spelling, notes_low_to_high: v.notes_low_to_high.map((n: {display_pitch:string;midi:number})=>({display_pitch:n.display_pitch,midi:n.midi})),
      diagram: v.diagram, playback: { together: v.playback.together, ascending: v.playback.ascending }, print_data: v.print_data };
  });
  const intro = byId['am-intro'].content;
  const split = intro.paragraphs[0].indexOf('. ') + 1;
  // Approved final reference adaptation; source JSON stays unchanged.
  const introduction = [intro.paragraphs[0].slice(split + 1), intro.paragraphs[1].replace('The example below', 'The root-position example')];
  const data: ChordDetailData = {
    url:'/chords/a-minor',namespace:'am',toolId:'am-result',pdf:{url:'/assets/chords/a-minor-notes-inversions.pdf',label:'Download A minor PDF'},rangeLabel:'C3–C5',
    defaultId: page.selection.default_voicing_id, options: page.selection.options.map((o: {value:string;label:string})=>({value:o.value,label:o.label})),
    chord: {id:chord.chord_id,slug:'a-minor',name_en:chord.name_en,symbol:chord.symbol,root_spelling:chord.root_spelling,quality:chord.quality,note_spellings:chord.note_spellings,formula_degrees:chord.formula_degrees},
    voicings, whitePitchClasses:source.shared_data.conventions.white_pitch_classes,
    microcopy:page.microcopy,heading:intro.heading,toolHeading:byId['am-result'].content.heading,printDisclaimer:byId['am-find-notes'].content.paragraphs[1],fingeringStatus:'verified_examples',
  };
  const learning=getChordLearning('/chords/a-minor',data);
  const inversionIndex=blocks.findIndex(block=>block.block_id==='am-inversions');
  blocks.splice(inversionIndex+1,0,fingeringBlock(data));
  const originalPracticeIndex=blocks.findIndex(block=>block.block_id==='am-practice');
  blocks.splice(originalPracticeIndex+1,0,practiceBlock(data,learning.practice));
  byId=Object.fromEntries(blocks.map(block => [block.block_id, block]));
  const searchSections: SearchSection[] = blocks.filter(b=>b.block_id!=='am-intro').map(b=>({id:b.block_id,heading:b.content.heading,text:JSON.stringify(b.content)}));
  return finalizeChordDetailModel({ metadata:page.metadata as {title:string;description:string;canonical_path:string}, blocks, byId, data, introduction,
    answer:intro.paragraphs[0].slice(0,split), searchSections, fingeringExamples:learning.fingerings,sources:learning.sources,practice:learning.practice,tocItems:[
      {id:data.toolId,label:'Chord & positions'},{id:'am-root-example',label:'Root-position example'},{id:'am-find-notes',label:'Find the notes'},
      {id:'am-inversions',label:'Inversions'},{id:'am-fingering-example',label:'Fingering'},{id:'am-why-minor',label:'Why minor?'},{id:'am-practice',label:'Practice steps'},{id:'practice',label:'Build the chord'},
      {id:'am-print',label:'Print & PDF'},{id:'am-questions',label:'Questions'},{id:'am-next',label:'Next steps'},
    ] });
}

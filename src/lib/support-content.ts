import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { readAuthorizedPage } from './site-content';
import { isPublicRoute } from './site-routes';
import { getChordCenter } from './chord-content';
import { completionPitchClass, getSupportedChordRegistry, type CompletionReference } from './chord-completion-content';

export type SupportRoute = '/guide/piano-chords' | '/keyboard-notes/finger-numbers' | '/chords/by-key' | '/chord-progressions' | '/chords/finder';
export type SupportLink = { id: string; url: string; label: string; placement: string };
export type SupportTable = { columns: string[]; rows: string[][] } | null;
export type SupportBlock = {
  id: string;
  heading: string;
  paragraphs: string[];
  steps: string[];
  table: SupportTable;
  sourceIDs: string[];
  originalBlocks: { heading: string; body: string }[];
};
type Raw = Record<string, any>;
type LinkEdge = { id: string; from: string; href: string; anchor: string; placement: string };

const packageRoot = resolve('docs/pianogrid-chords-content-next');
const modules = JSON.parse(readFileSync(resolve(packageRoot, '02_content/support.modules.json'), 'utf8')) as Record<SupportRoute, Raw>;
const seo = JSON.parse(readFileSync(resolve(packageRoot, '01_planning/url-seo-keywords.master.json'), 'utf8')) as { pages: Raw[] };
const linkPlan = JSON.parse(readFileSync(resolve(packageRoot, '01_planning/internal-links.json'), 'utf8')) as { edges: LinkEdge[] };

function requiredString(value: unknown, label: string) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing ${label}`);
  return value;
}

function pathOf(href: string) {
  const index = href.indexOf('#');
  return index < 0 ? href : href.slice(0, index);
}

export function plannedLinksFor(url: string, allowedIDs?: ReadonlySet<string>): SupportLink[] {
  return linkPlan.edges
    .filter(edge => edge.from === url && (!allowedIDs || allowedIDs.has(edge.id)) && isPublicRoute(pathOf(edge.href)))
    .map(edge => ({ id: edge.id, url: edge.href, label: edge.anchor, placement: edge.placement }));
}

function mergeBlocks(url: SupportRoute, page: Raw): SupportBlock[] {
  const prepared = modules[url];
  if (!prepared || prepared.runtime_status !== 'not_implemented_by_this_pack') throw new Error(`Missing prepared modules: ${url}`);
  const rawByTarget: Record<SupportRoute, Record<string, Raw[]>> = {
    '/guide/piano-chords': {
      'start-here': [page.blocks[0]],
      'read-a-symbol': [page.blocks[1]],
      'first-change': [page.blocks[2]],
    },
    '/keyboard-notes/finger-numbers': {
      'quick-answer': [page.blocks.find((block: Raw) => block.id === 'mapping')],
      'read-the-chart': [page.blocks.find((block: Raw) => block.id === 'orientation')],
      'not-key-numbers': [page.blocks.find((block: Raw) => block.id === 'not-keys')],
      'three-number-systems': [page.blocks.find((block: Raw) => block.id === 'degrees')],
      'self-check': [page.blocks.find((block: Raw) => block.id === 'check')],
    },
    '/chords/by-key': {
      'read-degrees': [page.blocks[0]],
      'minor-options': [page.blocks[1]],
      'build-a-row': [page.blocks[2]],
    },
    '/chord-progressions': {
      'start-with-c': [page.blocks[0]],
      'three-patterns': [page.blocks[1], page.blocks[2]],
    },
    '/chords/finder': {
      'how-to-enter': [page.blocks[0]],
      'multiple-names': [page.blocks[1]],
      'no-match': [page.blocks[2]],
    },
  };
  const seen = new Set<Raw>();
  const blocks = prepared.supplemental_blocks.map((block: Raw): SupportBlock => {
    const originals = (rawByTarget[url][block.block_id] || []).filter(Boolean);
    originals.forEach(original => seen.add(original));
    const content = block.content;
    return {
      id: requiredString(block.block_id, `${url}.block_id`),
      heading: requiredString(content.heading, `${url}.heading`),
      paragraphs: content.paragraphs.map((value: unknown) => requiredString(value, `${url}.paragraph`)),
      steps: content.steps.map((value: unknown) => requiredString(value, `${url}.step`)),
      table: content.table ? {
        columns: content.table.columns.map((value: unknown) => requiredString(value, `${url}.table.column`)),
        rows: content.table.rows.map((row: unknown[]) => row.map(value => requiredString(value, `${url}.table.cell`))),
      } : null,
      sourceIDs: [...block.source_ids],
      originalBlocks: originals.map(original => ({ heading: requiredString(original.heading, `${url}.original.heading`), body: requiredString(original.body, `${url}.original.body`) })),
    };
  });
  if (seen.size !== page.blocks.length) throw new Error(`Original support blocks were not merged exactly once: ${url}`);
  return blocks;
}

function base(url: SupportRoute) {
  const { page } = readAuthorizedPage(url);
  const planned = seo.pages.find(item => item.url === url);
  const prepared = modules[url];
  if (!planned || planned.canonical !== `https://pianogrid.com${url}`) throw new Error(`Missing planned SEO record: ${url}`);
  if (planned.title !== page.metadata?.title || planned.description !== page.metadata?.description || planned.h1 !== prepared.h1) throw new Error(`SEO/content mismatch: ${url}`);
  if (planned.meta_keywords !== null) throw new Error(`Unexpected meta keywords: ${url}`);
  return {
    url,
    title: requiredString(prepared.h1, `${url}.h1`),
    description: requiredString(page.description, `${url}.description`),
    scope: requiredString(prepared.scope, `${url}.scope`),
    metadata: { title: planned.title as string, description: planned.description as string, canonicalPath: url },
    blocks: mergeBlocks(url, page),
    links: plannedLinksFor(url),
    sourceIDs: [...page.source_ids] as string[],
    primaryKeyword: planned.primary_keyword_original as string,
  };
}

export function getPianoChordsGuide() {
  const { page } = readAuthorizedPage('/guide/piano-chords');
  const original = base('/guide/piano-chords');
  if (page.data.finger_diagram !== null || page.data.transition_fingering !== null) throw new Error('Unsupported guide asset or transition fingering');
  if (page.data.starter_chords.length !== 4 || page.data.transition_voicings.length !== 3) throw new Error('Incomplete piano-chords guide data');
  const guide=JSON.parse(readFileSync(resolve('docs/pianogrid-chords-completion/03_content/guide.piano-chords.modules.json'),'utf8')) as {modules:{id:string;title:string;goal:string;body:string[];next:string;sourceIds:string[]}[]};
  const blocks=[...original.blocks];const ids=new Set(blocks.map(block=>block.id));const links=[...original.links];
  for(const module of guide.modules){if(!ids.has(module.id)){blocks.push({id:module.id,heading:module.title,paragraphs:[...module.body],steps:[module.goal],table:null,sourceIDs:[...module.sourceIds],originalBlocks:[]});ids.add(module.id);}if(isPublicRoute(module.next.split('#')[0]))links.push({id:`completion-${module.id}`,url:module.next,label:`Continue: ${module.title}`,placement:module.id});}
  const model={...original,scope:'A practical path from chord symbols and formula tones through inversions, seventh chords, omissions, alterations, transitions and print references. Existing guide content remains in place.',blocks,links};
  return { model, data: page.data as {
    starter_chords: { name: string; notes: string[] }[];
    verified_fingering_example: { hand: 'right'; notes: string[]; fingers: number[]; scope: string };
    transition_voicings: string[][];
    reference_url: string;
    professional_review: string;
  } };
}

export function getFingerNumbersReference() {
  const { page } = readAuthorizedPage('/keyboard-notes/finger-numbers');
  const model = base('/keyboard-notes/finger-numbers');
  if (page.data.diagram_contract.svg_or_image_asset !== null || page.data.print.pdf_asset !== null) throw new Error('Finger-number page must not expose a missing asset');
  if (page.data.hands.length !== 2 || page.data.hands.some((hand: Raw) => hand.fingers.length !== 5)) throw new Error('Incomplete hand mapping');
  const left = page.data.hands.find((hand: Raw) => hand.hand === 'left');
  const right = page.data.hands.find((hand: Raw) => hand.hand === 'right');
  if (left.diagram.fingertip_numbers_left_to_right.join() !== '5,4,3,2,1' || right.diagram.fingertip_numbers_left_to_right.join() !== '1,2,3,4,5') throw new Error('Invalid player-view hand ordering');
  return { model, data: page.data as {
    hands: { hand: 'left' | 'right'; abbreviation: 'LH' | 'RH'; label: string; fingers: { number: number; name: string; aliases: string[] }[]; diagram: { fingertip_numbers_left_to_right: number[]; view: string } }[];
    diagram_contract: { shared_caption: string; pair_geometry: string };
    number_system_comparison: { system: string; example: string; meaning: string }[];
    reading_examples: { instruction: string; answer: string }[];
  } };
}

const pitchClasses: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
function pitchClass(note: string) {
  const match = /^([A-G])([#b]?)$/.exec(note.replaceAll('♯', '#').replaceAll('♭', 'b'));
  if (!match) throw new Error(`Invalid note spelling in by-key data: ${note}`);
  return (pitchClasses[match[1]] + (match[2] === '#' ? 1 : match[2] === 'b' ? -1 : 0) + 12) % 12;
}
function noteSlug(note: string) { return note.replace('#', '-sharp').replace('b', '-flat').toLowerCase(); }
function detailURL(note: string, quality: string) {
  if (!['major', 'minor'].includes(quality)) return null;
  const url = `/chords/${noteSlug(note)}-${quality}`;
  return isPublicRoute(url) ? url : null;
}

export type ByKeyChord = { degree: number; roman: string; symbol: string; quality: string; notes: string[]; referenceVoicing: string[]; detailURL: string | null; destination: string | null; isDiatonic: boolean };
export type ByKeyTable = { id: string; key: string; mode: 'major'|'natural_minor'; scale: string[]; basis: string; evidenceStatus: string; chords: ByKeyChord[]; raisedLeadingToneOptions: { roman: string; symbol: string; notes: string[]; change: string; detailURL: string | null }[] };

const completionRoot = resolve('docs/pianogrid-chords-completion');
function supportedRegistry(){return getSupportedChordRegistry(getChordCenter().items);}
function resolveReference(symbol:string, root:string, quality:string, registry:CompletionReference[]){
  const exact=registry.find(item=>item.symbol===symbol&&item.root===root&&item.subtype===quality)||registry.find(item=>item.symbol===symbol&&item.root===root);
  return exact?{detailURL:exact.detailURL,destination:exact.destination,reference:exact}:{detailURL:null,destination:null,reference:null};
}

export function getChordsByKey() {
  const model = base('/chords/by-key');
  const raw=JSON.parse(readFileSync(resolve(completionRoot,'04_music/by-key.contexts.json'),'utf8')) as Raw[];
  const registry=supportedRegistry();
  const keys:ByKeyTable[]=raw.map(context=>{
    if(context.scaleNotes.length!==7||context.rows.length!==14||!['major','natural_minor'].includes(context.mode))throw new Error(`Invalid by-key context: ${context.id}`);
    const chords=context.rows.map((row:Raw):ByKeyChord=>{
      const ref=resolveReference(row.symbol,row.rootSpelling,row.quality,registry);
      if(row.toneSpellings.length<3||row.isDiatonicToSelectedScale!==true)throw new Error(`Invalid by-key row: ${context.id}/${row.symbol}`);
      return{degree:row.scaleDegree,roman:row.roman,symbol:row.symbol,quality:row.quality,notes:[...row.toneSpellings],referenceVoicing:[...row.toneSpellings],detailURL:ref.detailURL,destination:ref.destination,isDiatonic:true};
    });
    return{id:context.id,key:`${context.tonic} ${context.mode==='major'?'major':'natural minor'}`,mode:context.mode,scale:[...context.scaleNotes],basis:context.mode==='major'?'major':'natural minor',evidenceStatus:'package validator passed',chords,raisedLeadingToneOptions:[]};
  });
  if(keys.length!==24||keys.reduce((sum,key)=>sum+key.chords.length,0)!==336)throw new Error('Incomplete completion by-key data');
  return {model:{...model,scope:'Twenty-four key contexts: twelve major and twelve natural-minor scales. Each table keeps key, root, quality and Roman numeral as separate fields.'},data:{keys,defaultKey:'C major',professionalReview:'pending'}};
}

export type ProgressionPattern = { id: string; title: string; mode: 'major'|'natural_minor'; steps: [number,string][] };
export type ProgressionStep = {degree:number;roman:string;subtype:string;rootSpelling:string;symbol:string;formulaDegrees:string[];referenceTones:string[];midi:number[];beats:number;nonDiatonicTones:string[];notDiatonicReason:string|null;destination:string|null};
export type ProgressionExample = {id:string;patternId:string;name:string;keyId:string;tonic:string;steps:ProgressionStep[];tempoBpmDefault:number;bpmRange:number[];meter:number[];countInBars:number;moodDisclaimer:string};

export function getChordProgressions() {
  const model = base('/chord-progressions');
  const registry=supportedRegistry();
  const rawPatterns=JSON.parse(readFileSync(resolve(completionRoot,'04_music/progressions.patterns.json'),'utf8')) as Raw[];
  const patterns:ProgressionPattern[]=rawPatterns.map(item=>({id:item.id,title:item.name,mode:item.mode,steps:item.steps.map((step:unknown[])=>[Number(step[0]),String(step[1])] as [number,string])}));
  const rawExamples=JSON.parse(readFileSync(resolve(completionRoot,'04_music/progressions.examples.json'),'utf8')) as Raw[];
  const examples:ProgressionExample[]=rawExamples.map(item=>{const pattern=rawPatterns.find(candidate=>candidate.id===item.patternId);if(!pattern)throw new Error(`Missing progression pattern: ${item.patternId}`);return{id:item.id,patternId:item.patternId,name:item.name,keyId:item.keyId,tonic:item.tonic,steps:item.steps.map((step:Raw,index:number)=>{const ref=resolveReference(step.symbol,step.rootSpelling,step.subtype,registry),realization=ref.reference?.realizations.find(candidate=>candidate.id===ref.reference?.defaultRealizationId)||ref.reference?.realizations[0];return{degree:step.degree,roman:String(pattern.steps[index][1]),subtype:step.subtype,rootSpelling:step.rootSpelling,symbol:step.symbol,formulaDegrees:[...step.formulaDegrees],referenceTones:[...step.referenceTones],midi:realization?[...realization.midi]:[],beats:step.beats,nonDiatonicTones:[...step.nonDiatonicTones],notDiatonicReason:step.notDiatonicReason,destination:ref.destination};}),tempoBpmDefault:item.tempoBpmDefault,bpmRange:[...item.bpmRange],meter:[...item.meter],countInBars:item.countInBars,moodDisclaimer:item.moodDisclaimer};});
  if(patterns.length!==8||examples.length!==96||examples.some(example=>!patterns.some(pattern=>pattern.id===example.patternId)))throw new Error('Incomplete completion progression data');
  return{model:{...model,scope:'Eight named practice patterns mapped to twelve suitable key contexts each. Symbols, formulas and note spellings come from the validated progression dataset.'},data:{patterns,examples,defaultExample:'pop-four-c-major',professionalReview:'pending'}};
}

export type FinderChordSource = { id: string; name: string; root: string; quality: string; url: string | null; tones: string[] };
export type FinderChord = { id: string; name: string; symbol: string; root: string; rootPitchClass: number; quality: string; family:string; pitchClasses: number[]; tones: string[]; detailURL: string | null; destination:string; suppliedVoicings:{id:string;label:string;pitchClasses:number[];omittedDegrees:string[]}[] };

export function getChordFinder(sourceChords: FinderChordSource[]) {
  const { page } = readAuthorizedPage('/chords/finder');
  const baseModel = base('/chords/finder');
  if (page.data.runtime_engine !== null || page.data.professional_review !== 'pending') throw new Error('Unexpected finder preparation state');
  if(sourceChords.length!==25)throw new Error('Finder core catalogue drift');
  const chords:FinderChord[]=supportedRegistry().map(item=>({id:item.id,name:item.name,symbol:item.symbol,root:item.root,rootPitchClass:item.rootPitchClass,quality:item.subtype,family:item.family,pitchClasses:[...new Set(item.definition.toneSpellings.map(completionPitchClass))].sort((a,b)=>a-b),tones:[...item.definition.toneSpellings],detailURL:item.detailURL,destination:item.destination,suppliedVoicings:item.realizations.filter(realization=>realization.purpose!=='theory_inventory').map(realization=>({id:realization.id,label:realization.label,pitchClasses:[...new Set(realization.midi.map(midi=>midi%12))].sort((a,b)=>a-b),omittedDegrees:[...realization.omittedDegrees]}))}));
  if(chords.length!==433||new Set(chords.map(chord=>chord.id)).size!==433)throw new Error('Finder supported registry drift');
  const exampleByInput = new Map((page.data.examples as Raw[]).map(example => [example.input.join(','), example]));
  for (const input of ['C4,E4,G4', 'E3,G3,C4', 'C4,Eb4,G4', 'C4,C5,E5,G5']) if (!exampleByInput.has(input)) throw new Error(`Missing prepared finder example: ${input}`);
  const planned = plannedLinksFor('/chords/finder');
  const links = planned.some(link => link.url === '/chords/by-key') ? planned : [...planned, { id: 'FINAL-FINDER-BY-KEY', url: '/chords/by-key', label: 'Browse chords by key', placement: 'after instructions' }];
  const blocks=baseModel.blocks.map(block=>({...block,paragraphs:[...block.paragraphs]}));
  const limits=blocks.find(block=>block.id==='limits');if(limits)limits.paragraphs[1]='The supported registry includes triads, power fifths, sixths, seventh chords, add chords, extended chords and explicit altered structures. Each family is validated before it enters this shared matcher; a reduced supplied voicing remains labeled separately from a complete formula match.';
  return {
    model: { ...baseModel, scope: 'Matches all 433 objects in the supported registry by complete formula pitch classes or an explicitly supplied voicing. Results can be ambiguous; the finder does not infer missing tones freely.', links,blocks },
    data: { chords, labels: page.data.result_labels as { multiple: string; none: string; incomplete: string }, professionalReview: page.data.professional_review as string },
  };
}

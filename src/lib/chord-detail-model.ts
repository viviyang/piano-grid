import type {ChordDetailModel,DetailVoicing} from './a-minor-types';
import {positionForThreeNote,validateThreeNoteDefinition} from './chord-family-model';
import {isPublicRoute} from './site-routes';
import type {N2BChordDetailRoute} from './chord-n2b-content';

export type ChordDetailRoute=
  |'/chords/a-minor'|'/chords/a-major'|'/chords/c-major'
  |'/chords/g-major'|'/chords/c-minor'|'/chords/e-major'|'/chords/b-major'|'/chords/a-flat-major'|'/chords/c-flat-major'
  |'/chords/f-major'|'/chords/d-minor'|'/chords/e-minor'|'/chords/d-major'|'/chords/b-minor'
  |'/chords/f-sharp-minor'|'/chords/c-sharp-minor'|'/chords/g-sharp-minor'|'/chords/b-flat-major'|'/chords/g-minor'
  |'/chords/d-flat-major'|'/chords/e-flat-major'|'/chords/f-sharp-major'|'/chords/f-minor'|'/chords/b-flat-minor'|'/chords/e-flat-minor'
  |N2BChordDetailRoute;
const ascii=(value:string)=>value.replaceAll('𝄪','##').replaceAll('𝄫','bb').replaceAll('♯','#').replaceAll('♭','b');
const pitchClass=(value:string)=>{const match=/^([A-G](?:##|bb|#|b)?)-?\d*$/.exec(ascii(value));if(!match)throw new Error(`Invalid pitch spelling: ${value}`);return match[1];};
const same=(a:unknown,b:unknown)=>JSON.stringify(a)===JSON.stringify(b);
const sorted=(values:string[])=>[...values].sort();

function validateVoicing(model:ChordDetailModel,voicing:DetailVoicing,index:number){
  const {data}=model,notes=voicing.notes_low_to_high,definition=data.chord.definition;
  if(notes.length!==definition.expectedNoteCount||new Set(notes.map(note=>note.midi)).size!==definition.expectedNoteCount)throw new Error(`Invalid three-note voicing: ${voicing.voicing_id}`);
  const expectedPosition=positionForThreeNote(definition,index);
  if(!same(voicing.position,expectedPosition)||voicing.inversion_label!==expectedPosition.label)throw new Error(`Invalid position contract: ${voicing.voicing_id}`);
  if(!same(sorted(notes.map(note=>pitchClass(note.display_pitch))),sorted(data.chord.note_spellings.map(pitchClass))))throw new Error(`Voicing changes chord definition: ${voicing.voicing_id}`);
  if(voicing.bass_spelling!==notes[0].display_pitch)throw new Error(`Bass is not the lowest pitch: ${voicing.voicing_id}`);
  const midi=notes.map(note=>note.midi);
  if(!same(voicing.diagram.highlight_midi,midi)||!same(voicing.print_data.highlight_midi,midi))throw new Error(`Keyboard/print MIDI drift: ${voicing.voicing_id}`);
  if(!same(voicing.playback.together.map(event=>event.midi),midi)||!same(voicing.playback.ascending.map(event=>event.midi),midi))throw new Error(`Audio MIDI drift: ${voicing.voicing_id}`);
  if(!same(voicing.print_data.spelled_pitches.map(ascii),notes.map(note=>ascii(note.display_pitch))))throw new Error(`Print spelling drift: ${voicing.voicing_id}`);
  if(notes.some(note=>note.midi<voicing.diagram.keyboard_range_midi[0]||note.midi>voicing.diagram.keyboard_range_midi[1]))throw new Error(`Pitch outside keyboard range: ${voicing.voicing_id}`);
}

export function finalizeChordDetailModel(model:ChordDetailModel):ChordDetailModel{
  const {data}=model,definition=data.chord.definition;
  if(!isPublicRoute(data.url)||model.metadata.canonical_path!==data.url)throw new Error(`Invalid chord detail route: ${data.url}`);
  if(data.chord.slug!==data.url.split('/').at(-1)||data.chord.id!==data.chord.slug)throw new Error(`Chord identity mismatch: ${data.url}`);
  validateThreeNoteDefinition(definition);
  if(data.chord.quality!==definition.subtype||!same(data.chord.formula_degrees,definition.formulaDegrees))throw new Error(`Formula/quality mismatch: ${data.url}`);
  if(data.chord.note_spellings.length!==definition.expectedNoteCount||data.voicings.length!==definition.expectedPositionCount||data.options.length!==definition.expectedPositionCount)throw new Error(`Incomplete three-note detail: ${data.url}`);
  if(!data.voicings.some(voicing=>voicing.voicing_id===data.defaultId))throw new Error(`Missing default voicing: ${data.url}`);
  if(!same(data.options.map(option=>option.value),data.voicings.map(voicing=>voicing.voicing_id))||!same(data.options.map(option=>option.label),data.voicings.map(voicing=>voicing.inversion_label)))throw new Error(`Selection/voicing drift: ${data.url}`);
  data.voicings.forEach((voicing,index)=>validateVoicing(model,voicing,index));
  const targetIds=new Set([data.toolId,...model.blocks.map(block=>block.block_id),...(model.introduction.length?[`${data.namespace}-root-example`]:[])]);
  if(model.tocItems.some(item=>!targetIds.has(item.id))||new Set(model.tocItems.map(item=>item.id)).size!==model.tocItems.length)throw new Error(`Invalid detail TOC: ${data.url}`);
  if(data.fingeringStatus==='verified_examples'){
    if(model.fingeringExamples.length!==2||new Set(model.fingeringExamples.map(example=>example.id)).size!==2)throw new Error(`Incomplete/duplicate fingering examples: ${data.url}`);
    if(!same(sorted(model.fingeringExamples.map(example=>example.hand)),['left','right']))throw new Error(`Missing hand-specific fingering: ${data.url}`);
  }else if(data.fingeringStatus==='not_provided'){
    if(model.fingeringExamples.length!==0)throw new Error(`Invalid optional fingering state: ${data.url}`);
  }else throw new Error(`Unknown fingering state: ${data.url}`);
  const sourceIds=new Set(model.sources.map(source=>source.id));
  if(sourceIds.size!==model.sources.length||model.sources.some(source=>!source.title||!source.publisher||!source.url.startsWith('https://')||!/^\d{4}-\d{2}-\d{2}$/.test(source.checkedOn)||!source.supports||!source.limitation))throw new Error(`Invalid fingering source record: ${data.url}`);
  for(const example of model.fingeringExamples){
    const voicing=data.voicings.find(item=>item.voicing_id===example.voicingId);
    if(!voicing||example.voicingId!==data.defaultId||example.notes.length!==example.fingers.length||!example.sourceIds.length||example.verificationStatus!=='source_verified_with_octave_adaptation'||!example.scope||!example.limitation)throw new Error(`Invalid fingering example: ${data.url}`);
    if(example.sourceIds.some(id=>!sourceIds.has(id)))throw new Error(`Unresolved fingering source: ${data.url}`);
    if(!same(example.notes.map(ascii),voicing.notes_low_to_high.map(note=>ascii(note.display_pitch))))throw new Error(`Fingering/voicing drift: ${data.url}`);
    const expected=example.hand==='right'?[1,3,5]:[5,3,1];
    if(!same(example.fingers,expected))throw new Error(`Unexpected root-position fingering: ${data.url}`);
  }
  if(model.practice.id!=='practice'||!model.practice.heading||!model.practice.prompt||!model.practice.scope||model.practice.requiredPitchClassCount!==definition.expectedNoteCount||!model.blocks.some(block=>block.block_id==='practice'))throw new Error(`Invalid practice model: ${data.url}`);
  return model;
}

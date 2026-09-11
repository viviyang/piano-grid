import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import type {Block,ChordDetailData,ChordPractice,ChordSource,FingeringExample,Voicing} from './a-minor-types';
import type {ChordDetailRoute} from './chord-detail-model';
import {NEXT_CHORD_LEARNING,type NextChordLearning} from './chord-learning-next';

const cFlatLearning=JSON.parse(readFileSync(resolve('docs/pianogrid-chords-content-next/03_learning/c-flat-major.learning.json'),'utf8')) as NextChordLearning;

const sources:Record<string,ChordSource>={
  'SKOOVE-AM':{
    id:'SKOOVE-AM',title:'A minor chord on piano',publisher:'Skoove; reviewed by Matthew Dickman, composer and music educator',
    url:'https://www.skoove.com/en/tools/piano-chords/a-minor',checkedOn:'2026-09-11',
    supports:'A–C–E root position; right hand 1–3–5 and left hand 5–3–1.',
    limitation:'The source specifies chord tones and fingers, but not PianoGrid’s A3–C4–E4 octave placement.',
  },
  'SKOOVE-A':{
    id:'SKOOVE-A',title:'A major chord on piano',publisher:'Skoove; reviewed by Matthew Dickman, composer and music educator',
    url:'https://www.skoove.com/en/tools/piano-chords/a-major',checkedOn:'2026-09-11',
    supports:'A–C♯–E root position; right hand 1–3–5 and left hand 5–3–1.',
    limitation:'The source specifies chord tones and fingers, but not PianoGrid’s A4–C♯5–E5 octave placement.',
  },
  'SKOOVE-C':{
    id:'SKOOVE-C',title:'C major chord on piano',publisher:'Skoove; reviewed by Matthew Dickman, composer and music educator',
    url:'https://www.skoove.com/en/tools/piano-chords/c-major',checkedOn:'2026-09-11',
    supports:'C–E–G root position; right hand 1–3–5 and left hand 5–3–1.',
    limitation:'The source specifies chord tones and fingers, but not PianoGrid’s C4–E4–G4 octave placement.',
  },
  'E-CHORD':{
    id:'E-CHORD',title:'Basic Piano Chords for Beginners, Part 1',publisher:'Yamaha / Jerry Kovarsky',
    url:'https://hub.yamaha.com/keyboards/k-how-to/basic-piano-chords-for-beginners-part-1/',checkedOn:'2026-09-11',
    supports:'Major and minor root-position triads usually use thumb, middle finger and pinky; C major is the illustrated reference.',
    limitation:'The article supports the right-hand root-position convention; it does not specify PianoGrid’s octave placement or a left-hand C example.',
  },
};

const pageSourceIds:Partial<Record<ChordDetailRoute,string[]>>={
  '/chords/a-minor':['SKOOVE-AM'],
  '/chords/a-major':['SKOOVE-A'],
  '/chords/c-major':['SKOOVE-C','E-CHORD'],
};

function fingering(data:ChordDetailData,root:Voicing,hand:'right'|'left',sourceIds:string[]):FingeringExample{
  const fingers=hand==='right'?[1,3,5]:[5,3,1];
  return {
    id:`${data.chord.slug}--root--${hand}`,voicingId:root.voicing_id,hand,
    notes:root.notes_low_to_high.map(note=>note.display_pitch),fingers,
    scope:`Single-hand ${hand}-hand example for this root-position voicing.`,
    limitation:'A starting example for a close-position triad. Hand size and musical context may call for another fingering; it is not assigned to the inversions.',
    sourceIds,verificationStatus:'source_verified_with_octave_adaptation',
  };
}

export function getChordLearning(url:ChordDetailRoute,data:ChordDetailData){
  if(url==='/chords/c-flat-major'){
    if(cFlatLearning.fingerings.length!==0||!cFlatLearning.sources.some(source=>source.id==='PG-CB'))throw new Error('C-flat optional fingering contract changed');
    return cFlatLearning;
  }
  if(url in NEXT_CHORD_LEARNING)return NEXT_CHORD_LEARNING[url as keyof typeof NEXT_CHORD_LEARNING];
  const root=data.voicings.find(voicing=>voicing.voicing_id===data.defaultId);
  if(!root)throw new Error(`Missing root-position learning voicing: ${url}`);
  const sourceIds=pageSourceIds[url];
  if(!sourceIds)throw new Error(`Missing chord learning source binding: ${url}`);
  const rightSources=url==='/chords/c-major'?['SKOOVE-C','E-CHORD']:sourceIds;
  const fingerings=[fingering(data,root,'right',rightSources),fingering(data,root,'left',[sourceIds[0]])];
  const practice:ChordPractice={
    id:'practice',heading:`Build ${data.chord.symbol} on the keyboard`,
    prompt:`Select the three pitch classes that make ${data.chord.name_en}, then check your answer.`,
    scope:'This one-octave keyboard checks pitch classes. Order and octave do not affect the result; fingering and live performance are not assessed.',
  };
  return {fingerings,sources:sourceIds.map(id=>sources[id]),practice,extraBlocks:[] as Block[]};
}

export function fingeringBlock(data:ChordDetailData,existing?:Block):Block{
  return existing||{block_id:`${data.namespace}-fingering-example`,content:{
    heading:'Root-position fingering examples',
    paragraphs:['These are separate one-hand starting examples for the root-position voicing. Change to an inversion and the finger numbers are intentionally withheld.'],
    steps:[],table:null,links:[],
  }};
}

export function practiceBlock(data:ChordDetailData,practice:ChordPractice):Block{
  return {block_id:practice.id,content:{heading:practice.heading,paragraphs:[practice.prompt,practice.scope],steps:[],table:null,links:[]}};
}

export function cMajorConnectionBlock():Block{
  return {block_id:'c-major-connections',content:{
    heading:'Chord, scale, and shared tones',
    paragraphs:[
      'The C major chord contains three pitch classes: C, E, and G. The C major scale contains seven: C, D, E, F, G, A, and B. Scale degrees 1, 3, and 5 describe positions in that scale; finger numbers describe the digits used in one specific hand example.',
      'C major and A minor share C and E, but they remain different chords: C major is C–E–G, while A minor is A–C–E.',
    ],steps:[],table:null,links:[
      {label:'See the C major scale',url:'/scales/c-major',published:true},
      {label:'Compare the shared tones with A minor',url:'/chords/a-minor',published:true},
    ],
  }};
}

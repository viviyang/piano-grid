import type { ChordPosition, PublishedThreeNoteChordDefinition, ThreeNoteChordDefinition, ThreeNoteSubtype } from './a-minor-types';

const positionLabels = ['Root position', 'First inversion', 'Second inversion'];

type ThreeNoteSpec = Omit<ThreeNoteChordDefinition, 'subtype'>;

const THREE_NOTE_SPECS = {
  major: {
    family: 'triad', familyLabel: 'Triad', qualityLabel: 'Major triad',
    formulaDegrees: ['1', '3', '5'], semitonesFromRoot: [0, 4, 7],
    expectedNoteCount: 3, expectedPositionCount: 3, positionLabels, positionBassDegrees: ['1', '3', '5'],
    categoryRoute: '/chords/major', categoryLabel: 'Major Chords',
  },
  minor: {
    family: 'triad', familyLabel: 'Triad', qualityLabel: 'Minor triad',
    formulaDegrees: ['1', 'b3', '5'], semitonesFromRoot: [0, 3, 7],
    expectedNoteCount: 3, expectedPositionCount: 3, positionLabels, positionBassDegrees: ['1', 'b3', '5'],
    categoryRoute: '/chords/minor', categoryLabel: 'Minor Chords',
  },
  diminished: {
    family: 'triad', familyLabel: 'Triad', qualityLabel: 'Diminished triad',
    formulaDegrees: ['1', 'b3', 'b5'], semitonesFromRoot: [0, 3, 6],
    expectedNoteCount: 3, expectedPositionCount: 3, positionLabels, positionBassDegrees: ['1', 'b3', 'b5'],
    categoryRoute: '/chords/diminished', categoryLabel: 'Diminished Chords',
  },
  augmented: {
    family: 'triad', familyLabel: 'Triad', qualityLabel: 'Augmented triad',
    formulaDegrees: ['1', '3', '#5'], semitonesFromRoot: [0, 4, 8],
    expectedNoteCount: 3, expectedPositionCount: 3, positionLabels, positionBassDegrees: ['1', '3', '#5'],
    categoryRoute: '/chords/augmented', categoryLabel: 'Augmented Chords',
  },
  sus2: {
    family: 'triad', familyLabel: 'Triad', qualityLabel: 'Suspended second chord',
    formulaDegrees: ['1', '2', '5'], semitonesFromRoot: [0, 2, 7],
    expectedNoteCount: 3, expectedPositionCount: 3, positionLabels, positionBassDegrees: ['1', '2', '5'],
    categoryRoute: '/chords/suspended', categoryLabel: 'Suspended Chords',
  },
  sus4: {
    family: 'triad', familyLabel: 'Triad', qualityLabel: 'Suspended fourth chord',
    formulaDegrees: ['1', '4', '5'], semitonesFromRoot: [0, 5, 7],
    expectedNoteCount: 3, expectedPositionCount: 3, positionLabels, positionBassDegrees: ['1', '4', '5'],
    categoryRoute: '/chords/suspended', categoryLabel: 'Suspended Chords',
  },
} satisfies { [Subtype in ThreeNoteSubtype]: ThreeNoteSpec };

const same = (left: unknown, right: unknown) => JSON.stringify(left) === JSON.stringify(right);
const pitchClass = (midi: number) => ((midi % 12) + 12) % 12;

export function resolveThreeNoteDefinition(subtype: ThreeNoteSubtype): PublishedThreeNoteChordDefinition {
  const spec = THREE_NOTE_SPECS[subtype];
  return {
    subtype, ...spec,
    formulaDegrees: [...spec.formulaDegrees], semitonesFromRoot: [...spec.semitonesFromRoot],
    positionLabels: [...spec.positionLabels], positionBassDegrees: [...spec.positionBassDegrees],
  } as PublishedThreeNoteChordDefinition;
}

export function validateThreeNoteDefinition(definition: ThreeNoteChordDefinition) {
  const expected = resolveThreeNoteDefinition(definition.subtype);
  if (definition.family !== expected.family || definition.familyLabel !== expected.familyLabel || definition.qualityLabel !== expected.qualityLabel ||
    definition.expectedNoteCount !== expected.expectedNoteCount || definition.expectedPositionCount !== expected.expectedPositionCount ||
    definition.categoryRoute !== expected.categoryRoute || definition.categoryLabel !== expected.categoryLabel ||
    !same(definition.formulaDegrees, expected.formulaDegrees) || !same(definition.semitonesFromRoot, expected.semitonesFromRoot) ||
    !same(definition.positionLabels, expected.positionLabels) || !same(definition.positionBassDegrees, expected.positionBassDegrees)) {
    throw new Error(`Invalid ${definition.subtype} family definition`);
  }
}

export function positionForThreeNote(definition: ThreeNoteChordDefinition, inversionIndex: number): ChordPosition {
  if (!Number.isInteger(inversionIndex) || inversionIndex < 0 || inversionIndex >= definition.expectedPositionCount) {
    throw new Error(`Invalid ${definition.subtype} inversion index: ${inversionIndex}`);
  }
  return {
    kind: inversionIndex === 0 ? 'root' : 'inversion',
    inversionIndex: inversionIndex as 0 | 1 | 2,
    label: definition.positionLabels[inversionIndex],
    bassDegree: definition.positionBassDegrees[inversionIndex],
  };
}

export type ThreeNoteFamilyFixture = {
  id: string; status: 'data_only_not_published'; rootSpelling: string; subtype: ThreeNoteSubtype;
  symbol: string; noteSpellings: string[]; semitonesFromRoot: number[]; fingeringStatus: 'not_provided';
  positions: {
    id: string; label: string; inversionIndex: number; bassDegree: string; symbol: string; bassSpelling: string;
    notesLowToHigh: { displayPitch: string; midi: number }[];
  }[];
};

export function validateThreeNoteFamilyFixture(fixture: ThreeNoteFamilyFixture) {
  const definition = resolveThreeNoteDefinition(fixture.subtype);
  validateThreeNoteDefinition(definition);
  if (fixture.status !== 'data_only_not_published' || fixture.fingeringStatus !== 'not_provided') throw new Error(`Fixture publication/fingering gate failed: ${fixture.id}`);
  if (!fixture.id || !fixture.rootSpelling || !fixture.symbol || fixture.noteSpellings.length !== definition.expectedNoteCount || new Set(fixture.noteSpellings).size !== definition.expectedNoteCount || fixture.noteSpellings[0] !== fixture.rootSpelling) throw new Error(`Incomplete fixture identity: ${fixture.id}`);
  if (!same(fixture.semitonesFromRoot, definition.semitonesFromRoot) || fixture.positions.length !== definition.expectedPositionCount) throw new Error(`Fixture cardinality/formula mismatch: ${fixture.id}`);
  const root = fixture.positions[0];
  const rootMidis = root.notesLowToHigh.map(note => note.midi);
  if (!rootMidis.every((midi, index) => index === 0 || midi > rootMidis[index - 1])) throw new Error(`Fixture root pitches are not ascending: ${fixture.id}`);
  if (!same(rootMidis.map(midi => midi - rootMidis[0]), definition.semitonesFromRoot)) throw new Error(`Fixture root voicing intervals mismatch: ${fixture.id}`);
  const pitchClasses = [...rootMidis.map(pitchClass)].sort((a, b) => a - b);
  const expectedPositionIds=['root','first','second'];
  fixture.positions.forEach((position, index) => {
    const expectedPosition = positionForThreeNote(definition, index);
    const midis = position.notesLowToHigh.map(note => note.midi);
    const bassPitch=position.bassSpelling.replace(/-?\d+$/, '');
    const expectedSymbol=index===0?fixture.symbol:`${fixture.symbol}/${bassPitch}`;
    if (position.id !== expectedPositionIds[index] || position.inversionIndex !== expectedPosition.inversionIndex || position.label !== expectedPosition.label || position.bassDegree !== expectedPosition.bassDegree || position.symbol !== expectedSymbol) throw new Error(`Fixture position metadata mismatch: ${fixture.id}/${position.id}`);
    if (position.notesLowToHigh.length !== definition.expectedNoteCount || new Set(midis).size !== definition.expectedNoteCount || !midis.every((midi, noteIndex) => noteIndex === 0 || midi > midis[noteIndex - 1])) throw new Error(`Fixture voicing mismatch: ${fixture.id}/${position.id}`);
    if (!same([...midis.map(pitchClass)].sort((a, b) => a - b), pitchClasses) || position.bassSpelling !== position.notesLowToHigh[0].displayPitch) throw new Error(`Fixture pitch/bass drift: ${fixture.id}/${position.id}`);
    if (index === 0 && !same(position.notesLowToHigh.map(note => note.displayPitch.replace(/-?\d+$/, '')), fixture.noteSpellings)) throw new Error(`Fixture written spelling mismatch: ${fixture.id}`);
  });
  return definition;
}

import type { ChordPosition, SeventhChordDefinition, SeventhSubtype } from './a-minor-types';

const positionLabels = ['Root position', 'First inversion', 'Second inversion', 'Third inversion'];

type SeventhSpec = Omit<SeventhChordDefinition, 'subtype'>;

const SEVENTH_SPECS = {
  dominant7: {
    family: 'seventh', familyLabel: 'Seventh chord', qualityLabel: 'Dominant seventh chord',
    formulaDegrees: ['1', '3', '5', 'b7'], semitonesFromRoot: [0, 4, 7, 10],
    expectedNoteCount: 4, expectedPositionCount: 4, positionLabels, positionBassDegrees: ['1', '3', '5', '7'],
    categoryRoute: '/chords/seventh', categoryLabel: 'Seventh Chords',
  },
  major7: {
    family: 'seventh', familyLabel: 'Seventh chord', qualityLabel: 'Major seventh chord',
    formulaDegrees: ['1', '3', '5', '7'], semitonesFromRoot: [0, 4, 7, 11],
    expectedNoteCount: 4, expectedPositionCount: 4, positionLabels, positionBassDegrees: ['1', '3', '5', '7'],
    categoryRoute: '/chords/seventh', categoryLabel: 'Seventh Chords',
  },
  minor7: {
    family: 'seventh', familyLabel: 'Seventh chord', qualityLabel: 'Minor seventh chord',
    formulaDegrees: ['1', 'b3', '5', 'b7'], semitonesFromRoot: [0, 3, 7, 10],
    expectedNoteCount: 4, expectedPositionCount: 4, positionLabels, positionBassDegrees: ['1', '3', '5', '7'],
    categoryRoute: '/chords/seventh', categoryLabel: 'Seventh Chords',
  },
  halfDiminished7: {
    family: 'seventh', familyLabel: 'Seventh chord', qualityLabel: 'Half-diminished seventh chord',
    formulaDegrees: ['1', 'b3', 'b5', 'b7'], semitonesFromRoot: [0, 3, 6, 10],
    expectedNoteCount: 4, expectedPositionCount: 4, positionLabels, positionBassDegrees: ['1', '3', '5', '7'],
    categoryRoute: '/chords/seventh', categoryLabel: 'Seventh Chords',
  },
} satisfies { [Subtype in SeventhSubtype]: SeventhSpec };

const same = (left: unknown, right: unknown) => JSON.stringify(left) === JSON.stringify(right);

export function resolveSeventhDefinition(subtype: SeventhSubtype): SeventhChordDefinition {
  const spec = SEVENTH_SPECS[subtype];
  return {
    subtype, ...spec,
    formulaDegrees: [...spec.formulaDegrees], semitonesFromRoot: [...spec.semitonesFromRoot],
    positionLabels: [...spec.positionLabels], positionBassDegrees: [...spec.positionBassDegrees],
  } as SeventhChordDefinition;
}

export function validateSeventhDefinition(definition: SeventhChordDefinition) {
  const expected = resolveSeventhDefinition(definition.subtype);
  if (definition.family !== expected.family || definition.familyLabel !== expected.familyLabel || definition.qualityLabel !== expected.qualityLabel ||
    definition.expectedNoteCount !== 4 || definition.expectedPositionCount !== 4 ||
    definition.categoryRoute !== expected.categoryRoute || definition.categoryLabel !== expected.categoryLabel ||
    new Set(definition.semitonesFromRoot.map(value => ((value % 12) + 12) % 12)).size !== 4 ||
    !same(definition.formulaDegrees, expected.formulaDegrees) || !same(definition.semitonesFromRoot, expected.semitonesFromRoot) ||
    !same(definition.positionLabels, expected.positionLabels) || !same(definition.positionBassDegrees, expected.positionBassDegrees)) {
    throw new Error(`Invalid ${definition.subtype} seventh definition`);
  }
}

export function positionForSeventh(definition: SeventhChordDefinition, inversionIndex: number): ChordPosition {
  if (!Number.isInteger(inversionIndex) || inversionIndex < 0 || inversionIndex >= definition.expectedPositionCount) {
    throw new Error(`Invalid ${definition.subtype} inversion index: ${inversionIndex}`);
  }
  return {
    kind: inversionIndex === 0 ? 'root' : 'inversion',
    inversionIndex: inversionIndex as 0 | 1 | 2 | 3,
    label: definition.positionLabels[inversionIndex],
    bassDegree: definition.positionBassDegrees[inversionIndex],
  };
}

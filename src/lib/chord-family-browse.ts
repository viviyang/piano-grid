import { N2B_DETAIL_ROUTES } from './chord-n2b-content';
import { N2C_DETAIL_ROUTES } from './chord-n2c-content';
import { N2D_DETAIL_ROUTES } from './chord-n2d-content';
import { ALTERED_REFERENCES, EXTENDED_REFERENCES } from './chord-completion-content';
import { CHORD_MAJOR_NAVIGATION, CHORD_MINOR_NAVIGATION } from './site-routes';

export type ChordFamilyBrowseCard = {
  url: '/chords/major' | '/chords/minor' | '/chords/seventh' | '/chords/diminished' | '/chords/augmented' | '/chords/suspended' | '/chords/add' | '/chords/extended' | '/chords/altered';
  name: string;
  blurb: string;
  count: number;
  countKind: 'independent_pages' | 'embedded_references';
  cta: string;
};

export type ChordFamilyBrowseModel = {
  common: ChordFamilyBrowseCard[];
  more: ChordFamilyBrowseCard[];
};

const n2bCount = (suffix: 'diminished' | 'augmented' | 'sus2' | 'sus4') =>
  N2B_DETAIL_ROUTES.filter(url => url.endsWith(`-${suffix}`)).length;

export function getChordFamilyBrowse(): ChordFamilyBrowseModel {
  return {
    common: [
      {
        url: '/chords/major',
        name: 'Major Chords',
        blurb: 'Root, major third and fifth.',
        count: CHORD_MAJOR_NAVIGATION.length,
        countKind: 'independent_pages',
        cta: 'Browse major chords →',
      },
      {
        url: '/chords/minor',
        name: 'Minor Chords',
        blurb: 'Root, minor third and fifth.',
        count: CHORD_MINOR_NAVIGATION.length,
        countKind: 'independent_pages',
        cta: 'Browse minor chords →',
      },
      {
        url: '/chords/seventh',
        name: 'Seventh Chords',
        blurb: 'Dominant 7, maj7, min7 and half-diminished.',
        count: N2C_DETAIL_ROUTES.length,
        countKind: 'independent_pages',
        cta: 'Browse seventh chords →',
      },
    ],
    more: [
      {
        url: '/chords/diminished',
        name: 'Diminished Chords',
        blurb: 'Root, minor third and diminished fifth.',
        count: n2bCount('diminished'),
        countKind: 'independent_pages',
        cta: 'Browse diminished chords →',
      },
      {
        url: '/chords/augmented',
        name: 'Augmented Chords',
        blurb: 'Root, major third and augmented fifth.',
        count: n2bCount('augmented'),
        countKind: 'independent_pages',
        cta: 'Browse augmented chords →',
      },
      {
        url: '/chords/suspended',
        name: 'Suspended Chords',
        blurb: 'Sus2 and sus4 replace the third.',
        count: n2bCount('sus2') + n2bCount('sus4'),
        countKind: 'independent_pages',
        cta: 'Browse suspended chords →',
      },
      {
        url: '/chords/add',
        name: 'Add9 Chords',
        blurb: 'Major and minor add9, with no seventh.',
        count: N2D_DETAIL_ROUTES.length,
        countKind: 'independent_pages',
        cta: 'Browse add9 chords →',
      },
      {
        url: '/chords/extended',
        name: 'Extended Chords',
        blurb: '9th, 11th and 13th references.',
        count: EXTENDED_REFERENCES.length,
        countKind: 'embedded_references',
        cta: 'Browse extended chords →',
      },
      {
        url: '/chords/altered',
        name: 'Altered Dominant Chords',
        blurb: 'Named dominant-seventh alterations.',
        count: ALTERED_REFERENCES.length,
        countKind: 'embedded_references',
        cta: 'Browse altered dominant chords →',
      },
    ],
  };
}

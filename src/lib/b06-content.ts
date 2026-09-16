export type B06TeacherCopy = {
  anchor: string;
  title: string;
  subtitle: string;
  body: string;
  formatLegend: string;
  letter: string;
  a4: string;
  download: string;
  print: string;
  share: string;
  practice: string;
  pageLabels: [string, string, string];
  scope: string;
  caveat: string;
  emptyError: string;
  accessible: string;
  successCopy: string;
  shareTitle: string;
  shareBody: string;
  footerInstruction: string;
};

/** Implementation copy — keep aligned with docs/product-upgrade/b05-b07-v2/data/content.en.json teacher. */
export const B06_TEACHER_COPY: B06TeacherCopy = {
  anchor: 'teaching-pack',
  title: 'A small pack for your next lesson',
  subtitle: 'Piano key names · C4–C5',
  body: 'Use a labeled reference, a write-in worksheet and an answer page to practice white-key names. Print all three pages, or just the worksheet.',
  formatLegend: 'Paper size',
  letter: 'US Letter',
  a4: 'A4',
  download: 'Download 3-page PDF',
  print: 'Print this pack',
  share: 'Share resource',
  practice: 'Try the matching online practice',
  pageLabels: ['Reference', 'Worksheet', 'Answers & use notes'],
  scope: 'White-key names from C4 to C5. Octave numbers identify register, not fingers.',
  caveat: 'A reference worksheet, not a full-size keyboard sticker template.',
  emptyError: 'The PDF could not be opened. Try again or use the accessible HTML version.',
  accessible: 'Read the accessible text version',
  successCopy: 'Link copied.',
  shareTitle: 'A piano-key practice pack',
  shareBody: 'Reference, worksheet and answers for C4–C5, with an optional online practice.',
  footerInstruction: 'Share the resource page link so others can find the current version.',
};

export function getB06TeacherCopy(): B06TeacherCopy {
  return B06_TEACHER_COPY;
}

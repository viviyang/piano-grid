import type { ScalePageCopy } from './scale-types';

export const SCALE_PAGE_COPY = {
  '/scales': {
    h1: 'Piano Scales',
    intro: 'Find the notes, check a hand-specific reference, then listen, practice or print.',
    jumps: [
      { label: 'Explore', href: '#sc-start' },
      { label: 'Scale charts', href: '#chart' },
      { label: 'Understand the patterns', href: '#formulas' },
      { label: 'Practice', href: '#practice' },
      { label: 'Print & downloads', href: '#print' },
    ],
    sections: [
      {
        id: 'explore', legacyBlockID: 'start', heading: 'Explore a piano scale',
        paragraphs: [
          'Choose a tonic - the note the scale is organized around - and a scale type. Start with C major, or choose a minor form to compare its changed notes.',
          'The final tonic completes the octave. In the major and minor forms shown here there are seven different scale degrees, not eight.',
          'The range shows which octave this reference uses. Finger numbers describe the selected hand and direction; they are not scale-degree numbers.',
        ],
      },
      {
        id: 'patterns', legacyBlockID: 'formula', heading: 'Major scales at a glance',
        paragraphs: [
          'A major scale follows Whole - Whole - Half - Whole - Whole - Whole - Half, or 2 - 2 - 1 - 2 - 2 - 2 - 1 semitones, from one tonic to the next.',
          'A half step moves to the next piano key, whether that key is white or black. A whole step is two half steps. Keep the spelling for the key you chose: F-sharp major includes E-sharp, even though E-sharp uses the same piano key as F.',
          'This chart keeps fifteen conventional major-key spellings. Some share piano keys, so it represents twelve tonic pitch classes rather than fifteen different starting-key positions.',
        ],
      },
      {
        id: 'minor-forms', legacyBlockID: 'minor', heading: 'Choose a minor form',
        paragraphs: [
          'Minor does not identify one unchanging note list. Check the form before you play or print.',
          'In the classical melodic-minor exercise, the sixth and seventh degrees are raised while ascending and return to the natural-minor form while descending. The descending line is written in the order you play it, from the upper tonic to the lower tonic.',
          'Jazz melodic minor commonly retains the raised sixth and seventh in both directions. That convention is not the selected classical exercise mode here, and neither convention dictates every note in every real melody.',
        ],
      },
      {
        id: 'numbers', legacyBlockID: 'degrees', heading: 'Read note names, degrees and fingers',
        paragraphs: [
          'A note name tells you which note is meant, such as C or F-sharp. An octave number, as in C4, places it in a register. A scale degree describes a note position relative to the tonic. A finger number describes which finger a particular hand reference uses.',
          'Finger 1 is the thumb; 2 is the index finger; 3 is the middle finger; 4 is the ring finger; and 5 is the little finger. Do not read a finger row as scale degrees.',
          'In natural minor, the seventh degree lies a whole step below the tonic and is called the subtonic. A raised seventh a half step below the tonic can function as a leading tone.',
          'Each fingering belongs to a specific scale, form, hand, direction and one-octave range. A blank fingering is not an invitation to borrow numbers from another scale. Showing both hand references does not mean the tool listens to two-handed playing or teaches contrary motion.',
        ],
      },
      {
        id: 'relationships', legacyBlockID: 'compare', heading: 'Relative and parallel scales',
        paragraphs: [
          'C major and A natural minor use the same seven note names: C, D, E, F, G, A and B. Their tonics are different. They are a relative major/minor pair, not two names for the same tonic.',
          'That shared collection does not describe every A-minor form. A harmonic minor includes G-sharp, and the ascending classical melodic form includes F-sharp and G-sharp.',
          'C major and C natural minor share the tonic C. C natural minor lowers E, A and B to E-flat, A-flat and B-flat. These are parallel scales. Starting a melody on a note does not, by itself, prove which tonic its context establishes.',
        ],
        noteLines: ['C major: C-D-E-F-G-A-B-C', 'C natural minor: C-D-E-flat-F-G-A-flat-B-flat-C'],
        links: [
          { label: 'C major: notes and fingering', href: '/scales/c-major' },
          { label: 'A minor: compare three forms', href: '/scales/a-minor' },
        ],
      },
      {
        id: 'other-types', legacyBlockID: 'types', heading: 'Other ways to organize notes',
        paragraphs: [
          'Modes, pentatonic scales, blues scales, chromatic scales and harmonic major are different reference topics - not hand settings. The interactive selector currently covers major, natural minor, harmonic minor and classical melodic minor.',
          'Pentatonic examples use five different notes. A common minor-blues pattern has six. A chromatic octave includes all twelve pitch classes. A renderer or practice question must not assume every scale has seven different notes.',
        ],
      },
      {
        id: 'jazz-examples', legacyBlockID: 'jazz', heading: 'A few jazz-related examples',
        paragraphs: [
          'An example is not a promise that every note will fit every chord or phrase. Choose notes with the harmony, rhythm and musical context in mind. These examples do not add new playable types to the selector above.',
        ],
      },
      {
        id: 'practice', legacyBlockID: 'practice', heading: 'Practice on this page',
        paragraphs: [
          'Test the selected scale with a note-selection question or an ordered-note question. The page checks your answer on this website; it does not listen to your piano.',
          'For a classical melodic-minor selection, you can also compare two descending patterns. The question states the convention so the task has a clear answer.',
          'Choose one hand and a comfortable pulse. Listen to the reference, then try a single pass while naming the notes. The pulse, highlighted notes and optional sound are a guide; completion is self-reported and no playing accuracy is measured.',
          'Start with 60 BPM, 1 note per beat, a 4-beat count-in and 1 pass. The staff is a pitch reference; the pulse controls timing.',
        ],
      },
      {
        id: 'print', legacyBlockID: 'print', heading: 'Take a reference to the piano',
        paragraphs: [
          'Print current reference includes the selected scale, form, hand, direction, range, notes, available fingering and source notes. A notes-only section stays notes-only in print.',
          'C Major & A Minor - One-Octave Piano Reference contains C major plus natural, harmonic and classical melodic A minor, with right- and left-hand references shown separately. It is not an all-scales or two-octave book.',
          'Piano Scale Notes - Practice Worksheet contains three short note-reading tasks, a separate answer section and space to record your own practice.',
        ],
        links: [
          { label: 'Download the one-octave C major and A minor reference (PDF)', href: '/downloads/scales/pianogrid-scales-starter-reference.pdf' },
          { label: 'Download the scale-notes practice worksheet (PDF)', href: '/downloads/scales/pianogrid-scales-notes-check-worksheet.pdf' },
          { label: 'Blank staff paper', href: '/tools/blank-sheet-music' },
        ],
      },
    ],
    faqs: [
      { question: 'Does every piano scale use seven different notes?', answer: 'No. The major and minor forms in the current selector use seven, but other families have different note counts. Repeating the tonic at the end does not create another distinct scale degree.' },
      { question: 'Are C major and A minor the same scale?', answer: 'C major and A natural minor share a note collection but have different tonics. A harmonic minor and the ascending classical melodic form change notes from that collection.' },
      { question: 'Why does a scale show Notes only?', answer: 'The notes are available, but a source-checked fingering for this exact form, hand, direction and range is not. The reference does not reuse a previous selection finger numbers.' },
      { question: 'Can this page tell whether I played correctly?', answer: 'It can check note answers entered in the web exercises. It does not use MIDI or a microphone to evaluate piano performance. Practice completion is self-reported.' },
      { question: 'Can I use the page without JavaScript?', answer: 'You can read the default reference, charts, explanations, sources and static exercise answers. Interactive checking and audio require JavaScript. Use the browser print command for the static page.' },
    ],
    sourceNote: 'Use Open Music Theory for scale patterns and terminology, the University of Puget Sound material for the jazz-related examples, and each named fingering source only for the hands, directions and ranges stated beside that reference. A citation is not a claim that a teacher has reviewed this website or your hand position.',
  },
  '/scales/c-major': {
    h1: 'C Major Scale on Piano',
    intro: 'See the notes, compare the two hand references, and practice one octave at a time.',
    jumps: [
      { label: 'Notes & fingering', href: '#sc-notes' },
      { label: 'How it is built', href: '#sc-focus' },
      { label: 'Practice', href: '#practice' },
      { label: 'Print', href: '#print' },
    ],
    sections: [
      { id: 'notes', legacyBlockID: 'notes', heading: 'C major notes', paragraphs: ['C major has no sharps or flats in its key signature. The last C repeats the tonic one octave higher. The reference is fixed to C while hand and direction remain selectable.'], noteLines: ['C-D-E-F-G-A-B-C'] },
      { id: 'fingering', legacyBlockID: 'fingering', heading: 'One-octave fingering and hand references', paragraphs: ['Read each finger with the note above it. These are source-documented one-octave references, not a rule that the same ending fingers should be repeated across two octaves.', 'Ascending with the right hand, move from E with finger 3 to F with the thumb. Ascending with the left hand, move from G with the thumb to A with finger 3. Read the separate descending row when reversing direction.', 'The two references have separately labeled ranges. They are not a two-hand synchronization exercise. The displayed register is a PianoGrid reference choice, not a source-prescribed range for every learner.'], table: { label: 'C major one-octave fingering', columns: ['Hand and direction', 'Notes in playing order', 'Fingers'], rows: [['Right hand, ascending','C4-D4-E4-F4-G4-A4-B4-C5','1-2-3-1-2-3-4-5'],['Right hand, descending','C5-B4-A4-G4-F4-E4-D4-C4','5-4-3-2-1-3-2-1'],['Left hand, ascending','C3-D3-E3-F3-G3-A3-B3-C4','5-4-3-2-1-3-2-1'],['Left hand, descending','C4-B3-A3-G3-F3-E3-D3-C3','1-2-3-1-2-3-4-5']] } },
      { id: 'built', legacyBlockID: 'focus', heading: 'White keys, unequal distances', paragraphs: ['C major uses white keys, but adjacent white keys are not all the same distance apart in pitch. E-F and B-C are half steps. C-D, D-E, F-G, G-A and A-B are whole steps.', 'Compare the note names with the keyboard and staff. The staff shows spelled notes; the keyboard shows physical key positions. A reference starting and ending on C demonstrates C major. Starting a melody on another note does not by itself determine a different tonic.', 'Scale degrees are not finger numbers. F is degree 4 but uses right-hand finger 1 in this ascending one-octave reference.'], noteLines: ['C-D 2 · D-E 2 · E-F 1 · F-G 2 · G-A 2 · A-B 2 · B-C 1 semitones'] },
      { id: 'practice', legacyBlockID: 'practice', heading: 'Practice a short section, then the octave', paragraphs: ['Play C-D-E, pause, then continue F-G-A-B-C. Connect E to F only when the note and finger pairing is clear. Do not hurry the crossing to keep up with a preset speed.', 'Use the left-hand reference and focus on G to A in the ascending line. Then read its descending row before playing back down. Name the notes as you go.', 'Select the notes of C major, or enter C4 through C5 in ascending order. The web exercise includes the final upper C but does not measure piano playing.', 'Begin with one pass at a pace you choose. The default is 60 BPM with one note per beat and four count-in beats. Pause or stop at any time and mark completion yourself.'], links: [{label:'Match notes to the staff',href:'/keyboard-notes/chart'},{label:'Read piano sheet music',href:'/guide/read-sheet-music'}] },
      { id: 'related', heading: 'Related scales and chords', paragraphs: ['C major and A natural minor use the same white-key collection but have different tonics. A harmonic and classical melodic A minor change notes, so same notes does not describe every A-minor form.', 'C major and C natural minor share tonic C. C natural minor changes E, A and B to E-flat, A-flat and B-flat.', 'Degrees 1, 3 and 5 of C major are C-E-G. They form a C-major triad, not the entire seven-note scale.'], links: [{label:'Compare A natural minor',href:'/scales/a-minor'},{label:'Parallel-scale comparison',href:'/scales#sc-compare'},{label:'Build the C major chord: C-E-G',href:'/chords/c-major'}] },
      { id: 'print', heading: 'Print this C-major reference', paragraphs: ['Print the selected hand and direction, or use the C-major section of C Major & A Minor - One-Octave Piano Reference. Each printed reference includes its range and source notes. Do not extend one-octave fingering by repeating the ending pattern.'], links: [{label:'Download the one-octave reference (PDF)',href:'/downloads/scales/pianogrid-scales-starter-reference.pdf'},{label:'Download the practice worksheet (PDF)',href:'/downloads/scales/pianogrid-scales-notes-check-worksheet.pdf'}] },
    ],
    faqs: [
      { question: 'Why are E-F and B-C half steps without a black key between them?', answer: 'A half step is the distance between adjacent piano keys. E and F are adjacent keys, as are B and C. White-key color alone does not tell you whether the next scale step is whole or half.' },
      { question: 'Which hand should I select?', answer: 'Select the hand whose reference you want to read. The numbers and labeled range change with it. This setting does not detect which hand you use on a real piano.' },
      { question: 'Can I repeat the fingering row to play two octaves?', answer: 'No two-octave fingering is supplied. A one-octave ending is not automatically the correct connection into another octave. Use an explicitly matched two-octave source before extending it.' },
      { question: 'Is the C-major chord the same as the C-major scale?', answer: 'No. The C-major triad uses C, E and G. The scale uses seven different notes. The chord is one useful selection from the scale, not a replacement for it.' },
    ],
    sourceNote: 'Berklee C-major material and the cited theory sources support the notes and pattern. LearnMusicTheory and Music Fun support the stated one-octave fingerings. Displayed hand ranges are PianoGrid reference registers. Sources do not represent a teacher assessment of your technique.',
  },
  '/scales/a-minor': {
    h1: 'A Minor Scale on Piano',
    intro: 'Compare natural, harmonic and classical melodic minor, with the notes shown in the direction you play them.',
    jumps: [
      { label: 'Compare forms', href: '#sc-section-1' },
      { label: 'Fingering', href: '#sc-section-2' },
      { label: 'Practice', href: '#practice' },
      { label: 'Chords', href: '#sc-section-4' },
      { label: 'Print', href: '#print' },
    ],
    sections: [
      { id: 'forms', legacyBlockID: 'section-1', heading: 'Compare the three forms', paragraphs: ['A natural minor uses F and G in both directions. Harmonic minor raises G to G-sharp in both directions of this exercise. Classical melodic minor uses F-sharp and G-sharp ascending, then F and G descending.', 'Compare E-F-G-A, E-F-G-sharp-A, and E-F-sharp-G-sharp-A. Say which notes change before listening to or playing the next version.', 'The classical selector convention is not interchangeable with jazz melodic minor, which commonly keeps the raised sixth and seventh in both directions. Actual melodies can use minor inflections according to musical context.'], table: {label:'A minor forms and directions',columns:['Form','Ascending, one octave','Descending, one octave','Change from natural'],rows:[['Natural minor','A-B-C-D-E-F-G-A','A-G-F-E-D-C-B-A','No change'],['Harmonic minor','A-B-C-D-E-F-G-sharp-A','A-G-sharp-F-E-D-C-B-A','G becomes G-sharp'],['Classical melodic minor','A-B-C-D-E-F-sharp-G-sharp-A','A-G-F-E-D-C-B-A','F and G raised ascending; natural descending']]} },
      { id: 'fingering', legacyBlockID: 'section-2', heading: 'Fingering and availability', paragraphs: ['The numbers belong to the corresponding form, hand and direction. Use the full note-aligned row in the current reference to see where each finger goes.', 'The descending natural-minor numbers were read from the A row of LearnMusicTheory one-octave chart. Its written range is A3-A4. The left-hand reference uses that range; the right-hand display is one octave higher and is labeled as a register adaptation.', 'Harmonic and classical melodic descending notes, staff and audio remain available without finger numbers. These are separate-hand references, not contrary motion, a universal fingering rule or an individual teacher assessment.'], table: {label:'A minor fingering availability',columns:['Form','RH ascending','LH ascending','RH descending','LH descending'],rows:[['Natural minor','1-2-3-1-2-3-4-5','5-4-3-2-1-3-2-1','5-4-3-2-1-3-2-1','1-2-3-1-2-3-4-5'],['Harmonic minor','1-2-3-1-2-3-4-5','5-4-3-2-1-3-2-1','Notes only','Notes only'],['Classical melodic minor','1-2-3-1-2-3-4-5','5-4-3-2-1-3-2-1','Notes only','Notes only']]} },
      { id: 'practice', legacyBlockID: 'section-3', heading: 'Practice the ending', paragraphs: ['Read or play E-F-G-A, then E-F-G-sharp-A, followed by E-F-sharp-G-sharp-A. Before each pass, name the form and identify changed notes.', 'For the classical descent, start at upper A and continue A-G-F-E. Check the descending line instead of copying the ascending black keys.', 'The note-set and ordered-note questions evaluate answers entered on the page, not piano performance or fingering. Start with a single hand and one pass, count in, pause or stop as needed, and record completion yourself.'] },
      { id: 'chords', legacyBlockID: 'section-4', heading: 'Relative major and chords', paragraphs: ['A natural minor and C major share a key signature and seven-note collection, but their tonics differ. Harmonic and ascending classical melodic A minor include notes outside that collection.', 'Build a triad on each natural-minor degree by taking every other note. E major uses E-G-sharp-B instead of E-G-B; the G-sharp matches the raised seventh in A harmonic minor.', 'A chord voicing or inversion is not the same task as an ascending or descending scale.'], links:[{label:'C major: notes and fingering',href:'/scales/c-major'},{label:'A minor chord: A-C-E',href:'/chords/a-minor'}] },
      { id: 'print', heading: 'Keep the form visible in print', paragraphs: ['Print the current A-minor reference with its form, direction, hand and range. The starter PDF includes all three A-minor forms with hands shown separately. Missing descending fingerings stay labeled Notes only; no numbers are borrowed from another form.'], links:[{label:'Download the one-octave reference (PDF)',href:'/downloads/scales/pianogrid-scales-starter-reference.pdf'},{label:'Download the practice worksheet (PDF)',href:'/downloads/scales/pianogrid-scales-notes-check-worksheet.pdf'}] },
    ],
    faqs: [
      { question: 'Is A minor played only on white keys?', answer: 'A natural minor uses white keys. A harmonic minor uses G-sharp, and the ascending classical melodic form uses F-sharp and G-sharp. Read the form label first.' },
      { question: 'Why is melodic minor different on the way down?', answer: 'This reference uses the classical exercise convention: raised sixth and seventh ascending, natural-minor notes descending. Jazz melodic minor commonly retains the raised notes in both directions.' },
      { question: 'Does changing F or G change the key signature shown here?', answer: 'The A-minor key signature remains without sharps or flats. Raised notes in these examples are shown with accidentals. A key signature is not a list of every alteration that can occur in a piece.' },
      { question: 'Why are some descending fingerings missing?', answer: 'A source-checked fingering for that exact form, hand, direction and presentation is not available. Notes can still be displayed and played; the tool does not infer missing fingers by reversing another row.' },
      { question: 'Does the practice tool hear my piano?', answer: 'No. It provides a pulse, note animation and optional reference sound. Questions check entered answers; completion is your own report. MIDI and microphone evaluation are not included.' },
    ],
    sourceNote: 'Use the cited minor-scale theory references for form and direction rules, the named A-minor sources for spelling, Hoffman Academy for the stated ascending fingering scope, and the LearnMusicTheory natural-minor chart for the descending natural-minor row. Source consultation is distinct from an independent teacher review of PianoGrid.',
  },
} satisfies Record<'/scales' | '/scales/c-major' | '/scales/a-minor', ScalePageCopy>;

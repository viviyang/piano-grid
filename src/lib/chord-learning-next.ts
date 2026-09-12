/** Pure-data additions. Merge through the existing adapter; do not overwrite chord-learning-content.ts.
 * C-flat is deliberately excluded from the typed publishable records until its fingering gate is resolved.
 */
import type { Block, ChordPractice, ChordSource, FingeringExample } from './a-minor-types';

export type NextChordLearning = {
  fingerings: FingeringExample[];
  sources: ChordSource[];
  practice: Omit<ChordPractice, 'requiredPitchClassCount'> & { requiredPitchClassCount?: number };
  extraBlocks: Block[];
};

export const NEXT_CHORD_LEARNING = {
  "/chords/g-major": {
    "fingerings": [
      {
        "id": "g-major--root--right",
        "voicingId": "g-major--root",
        "hand": "right",
        "notes": [
          "G4",
          "B4",
          "D5"
        ],
        "fingers": [
          1,
          3,
          5
        ],
        "scope": "Separate right-hand example for the displayed root-position voicing G4–B4–D5.",
        "limitation": "The source supplies these chord-tone and hand-number pairings, not this octave placement. This is a starting example, not a universal rule; no fingering is assigned to the inversions.",
        "sourceIds": [
          "PG-SKOOVE-G-MAJOR"
        ],
        "verificationStatus": "source_verified_with_octave_adaptation"
      },
      {
        "id": "g-major--root--left",
        "voicingId": "g-major--root",
        "hand": "left",
        "notes": [
          "G4",
          "B4",
          "D5"
        ],
        "fingers": [
          5,
          3,
          1
        ],
        "scope": "Separate left-hand example for the displayed root-position voicing G4–B4–D5.",
        "limitation": "The source supplies these chord-tone and hand-number pairings, not this octave placement. This is a starting example, not a universal rule; no fingering is assigned to the inversions.",
        "sourceIds": [
          "PG-SKOOVE-G-MAJOR"
        ],
        "verificationStatus": "source_verified_with_octave_adaptation"
      }
    ],
    "sources": [
      {
        "id": "PG-TRIADS",
        "title": "Introduction to Triads",
        "publisher": "Music Theory for the 21st-Century Classroom / University of Puget Sound",
        "url": "https://musictheory.pugetsound.edu/mt21c/TriadsIntroduction.html",
        "checkedOn": "2026-09-11",
        "supports": "Triad construction, major/minor intervals.",
        "limitation": "General rule; exact PianoGrid registers, diagrams, exercises and explanations are original applications."
      },
      {
        "id": "PG-OMT",
        "title": "Triads",
        "publisher": "Open Music Theory",
        "url": "https://openmusictheory.github.io/triads.html",
        "checkedOn": "2026-09-11",
        "supports": "Chord quality, chord members, inversion and lead-sheet conventions.",
        "limitation": "Not a source for our hand-specific fingerings or recordings."
      },
      {
        "id": "PG-ASPN",
        "title": "American Standard Pitch Notation (ASPN)",
        "publisher": "Open Music Theory",
        "url": "https://viva.pressbooks.pub/openmusictheory/chapter/aspn/",
        "checkedOn": "2026-09-11",
        "supports": "Written note letters and octave numbering.",
        "limitation": "Cb4 = MIDI 59 is a derived application of the notation rule, not a quotation of a PianoGrid example."
      },
      {
        "id": "PG-SKOOVE-G-MAJOR",
        "title": "G Major chord on piano",
        "publisher": "Skoove",
        "url": "https://www.skoove.com/en/tools/piano-chords/g-major",
        "checkedOn": "2026-09-11",
        "supports": "Root-position G–B–D; right hand 1–3–5 and left hand 5–3–1.",
        "limitation": "The root-position hand numbers are shown by the source. It does not specify PianoGrid’s G4–B4–D5 register. We do not adopt song lists, mood labels or inversion fingerings."
      }
    ],
    "practice": {
      "id": "practice",
      "heading": "Build G on the keyboard",
      "prompt": "Select the three pitch classes that make G major, then check your answer.",
      "scope": "This keyboard checks an unordered pitch-class set. Order, octave, fingering and live piano performance are not assessed."
    },
    "extraBlocks": [
      {
        "block_id": "g-major-locate",
        "content": {
          "heading": "Find the notes on your keyboard",
          "paragraphs": [],
          "steps": [
            "Find a group of three black keys. G is the white key between its first and second black keys.",
            "From G, locate B and D. For the root example shown here, use G4, B4 and D5.",
            "Name the three pitches before using Play. Use the note-by-note mode to check their low-to-high order."
          ],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "g-major-compare",
        "content": {
          "heading": "G major or G minor: check B",
          "paragraphs": [
            "Keep G and D unchanged. G major uses B; G minor uses B-flat. Only the third changes, so the root name alone is not enough to identify the chord.",
            "For a written comparison, use G4–B4–D5 and G4–B♭4–D5. This is a self-check example, not a separate scored activity. The chart already includes G minor; no new G-minor detail URL is required."
          ],
          "steps": [],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "g-major-connections",
        "content": {
          "heading": "See G as a chord inside C major",
          "paragraphs": [
            "In the key of C major, G major is the chord built on scale degree 5. The same G–B–D chord can also appear in other keys; its identity does not determine the key of an entire song.",
            "Compare C4–E4–G4 with B3–D4–G4. The second voicing is G/B. G4 can remain in place while C4 moves to B3 and E4 moves to D4. These are exact written examples, not a claim that this is the only or best fingering."
          ],
          "steps": [],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "g-major-self-check",
        "content": {
          "heading": "Check the idea without JavaScript",
          "paragraphs": [
            "Name the three chord tones before looking back at the answer. Then name the bass of the first inversion. These are written self-checks, not additional scored modes."
          ],
          "steps": [
            "Chord-tone answer: G, B, D.",
            "First-inversion bass: B. The root is still G."
          ],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "g-major-questions",
        "content": {
          "heading": "Questions about G major",
          "paragraphs": [],
          "steps": [],
          "table": {
            "columns": [
              "Question",
              "Answer"
            ],
            "rows": [
              [
                "Does a G major chord need F-sharp?",
                "No. The triad is G–B–D. F-sharp belongs to the G major scale, not to this three-note chord."
              ],
              [
                "What does G/B mean?",
                "Play a G major chord with B as its lowest sounding note. The slash identifies the bass; the chord root stays G."
              ],
              [
                "Is G major the same as G minor?",
                "No. G major contains B, whereas G minor contains B-flat. Both retain G and D."
              ],
              [
                "Why does the second-inversion example sound lower?",
                "The reference uses D4–G4–B4 to show second inversion. Inversion describes the lowest chord member, not a requirement that each example be higher than the last."
              ],
              [
                "What does the keyboard exercise check?",
                "It checks the set G, B and D. It does not grade your hands, timing, articulation or an acoustic piano performance."
              ]
            ]
          },
          "links": []
        }
      }
    ]
  },
  "/chords/c-minor": {
    "fingerings": [
      {
        "id": "c-minor--root--right",
        "voicingId": "c-minor--root",
        "hand": "right",
        "notes": [
          "C4",
          "E♭4",
          "G4"
        ],
        "fingers": [
          1,
          3,
          5
        ],
        "scope": "Separate right-hand example for the displayed root-position voicing C4–E♭4–G4.",
        "limitation": "The source supplies these chord-tone and hand-number pairings, not this octave placement. This is a starting example, not a universal rule; no fingering is assigned to the inversions.",
        "sourceIds": [
          "PG-SKOOVE-C-MINOR"
        ],
        "verificationStatus": "source_verified_with_octave_adaptation"
      },
      {
        "id": "c-minor--root--left",
        "voicingId": "c-minor--root",
        "hand": "left",
        "notes": [
          "C4",
          "E♭4",
          "G4"
        ],
        "fingers": [
          5,
          3,
          1
        ],
        "scope": "Separate left-hand example for the displayed root-position voicing C4–E♭4–G4.",
        "limitation": "The source supplies these chord-tone and hand-number pairings, not this octave placement. This is a starting example, not a universal rule; no fingering is assigned to the inversions.",
        "sourceIds": [
          "PG-SKOOVE-C-MINOR"
        ],
        "verificationStatus": "source_verified_with_octave_adaptation"
      }
    ],
    "sources": [
      {
        "id": "PG-TRIADS",
        "title": "Introduction to Triads",
        "publisher": "Music Theory for the 21st-Century Classroom / University of Puget Sound",
        "url": "https://musictheory.pugetsound.edu/mt21c/TriadsIntroduction.html",
        "checkedOn": "2026-09-11",
        "supports": "Triad construction, major/minor intervals.",
        "limitation": "General rule; exact PianoGrid registers, diagrams, exercises and explanations are original applications."
      },
      {
        "id": "PG-OMT",
        "title": "Triads",
        "publisher": "Open Music Theory",
        "url": "https://openmusictheory.github.io/triads.html",
        "checkedOn": "2026-09-11",
        "supports": "Chord quality, chord members, inversion and lead-sheet conventions.",
        "limitation": "Not a source for our hand-specific fingerings or recordings."
      },
      {
        "id": "PG-ASPN",
        "title": "American Standard Pitch Notation (ASPN)",
        "publisher": "Open Music Theory",
        "url": "https://viva.pressbooks.pub/openmusictheory/chapter/aspn/",
        "checkedOn": "2026-09-11",
        "supports": "Written note letters and octave numbering.",
        "limitation": "Cb4 = MIDI 59 is a derived application of the notation rule, not a quotation of a PianoGrid example."
      },
      {
        "id": "PG-SKOOVE-C-MINOR",
        "title": "C Minor chord on piano",
        "publisher": "Skoove",
        "url": "https://www.skoove.com/en/tools/piano-chords/c-minor",
        "checkedOn": "2026-09-11",
        "supports": "Root-position C–E♭–G; right hand 1–3–5 and left hand 5–3–1.",
        "limitation": "The root-position hand numbers are shown by the source. It does not specify PianoGrid’s C4–E♭4–G4 register. We do not adopt song lists, mood labels or inversion fingerings."
      }
    ],
    "practice": {
      "id": "practice",
      "heading": "Build Cm on the keyboard",
      "prompt": "Select the three pitch classes that make C minor, then check your answer.",
      "scope": "This keyboard checks an unordered pitch-class set. Order, octave, fingering and live piano performance are not assessed."
    },
    "extraBlocks": [
      {
        "block_id": "c-minor-locate",
        "content": {
          "heading": "Find the notes on your keyboard",
          "paragraphs": [],
          "steps": [
            "Find C immediately to the left of a group of two black keys.",
            "Locate E-flat, the second black key in that two-key group, and then G.",
            "Use C4–E♭4–G4 for the root example. Read the flat sign as part of the note name; it is not a request to move every note down."
          ],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "c-minor-compare",
        "content": {
          "heading": "Change E, not the whole chord",
          "paragraphs": [
            "Compare C4–E4–G4 with C4–E♭4–G4. C4 and G4 are shared, while the middle note moves down one semitone. This isolates the difference between C major and C minor.",
            "Listen without treating a mood word as the definition. Chord quality is determined by the interval structure; a piece’s overall effect also depends on rhythm, register and context."
          ],
          "steps": [],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "c-minor-connections",
        "content": {
          "heading": "Two shared tones with A-flat major",
          "paragraphs": [
            "C minor is C–E♭–G. A-flat major is A♭–C–E♭. They share C and E-flat even though their roots and qualities differ.",
            "For a compact written comparison, use C4–E♭4–G4, followed by C4–E♭4–A♭4. The latter is A♭/C because C remains the lowest note. This demonstrates shared tones, not a universal hand-shape recommendation."
          ],
          "steps": [],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "c-minor-self-check",
        "content": {
          "heading": "Check the idea without JavaScript",
          "paragraphs": [
            "Name the three chord tones before looking back at the answer. Then name the bass of the first inversion. These are written self-checks, not additional scored modes."
          ],
          "steps": [
            "Chord-tone answer: C, E♭, G.",
            "First-inversion bass: E♭. The root is still C."
          ],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "c-minor-questions",
        "content": {
          "heading": "Questions about C minor",
          "paragraphs": [],
          "steps": [],
          "table": {
            "columns": [
              "Question",
              "Answer"
            ],
            "rows": [
              [
                "What notes make Cm?",
                "C, E-flat and G. The symbol Cm identifies C as the root and minor as the quality."
              ],
              [
                "Is Cm/E-flat a different chord from Cm?",
                "It has the same three chord tones, with E-flat in the bass. It is the first inversion of C minor."
              ],
              [
                "Can I replace E-flat with D-sharp in the label?",
                "They share a key in equal temperament, but C minor is spelled C–E-flat–G so its members are written as root, third and fifth."
              ],
              [
                "Does the C minor chord contain every note of the C minor scale?",
                "No. This page is about a three-note triad, not the full scale or every chord available in a minor key."
              ],
              [
                "Are the finger numbers used for every inversion?",
                "No. The sourced examples apply only to the displayed root-position voicing, separately for each hand."
              ]
            ]
          },
          "links": []
        }
      }
    ]
  },
  "/chords/e-major": {
    "fingerings": [
      {
        "id": "e-major--root--right",
        "voicingId": "e-major--root",
        "hand": "right",
        "notes": [
          "E4",
          "G♯4",
          "B4"
        ],
        "fingers": [
          1,
          3,
          5
        ],
        "scope": "Separate right-hand example for the displayed root-position voicing E4–G♯4–B4.",
        "limitation": "The source supplies these chord-tone and hand-number pairings, not this octave placement. This is a starting example, not a universal rule; no fingering is assigned to the inversions.",
        "sourceIds": [
          "PG-SKOOVE-E-MAJOR"
        ],
        "verificationStatus": "source_verified_with_octave_adaptation"
      },
      {
        "id": "e-major--root--left",
        "voicingId": "e-major--root",
        "hand": "left",
        "notes": [
          "E4",
          "G♯4",
          "B4"
        ],
        "fingers": [
          5,
          3,
          1
        ],
        "scope": "Separate left-hand example for the displayed root-position voicing E4–G♯4–B4.",
        "limitation": "The source supplies these chord-tone and hand-number pairings, not this octave placement. This is a starting example, not a universal rule; no fingering is assigned to the inversions.",
        "sourceIds": [
          "PG-SKOOVE-E-MAJOR"
        ],
        "verificationStatus": "source_verified_with_octave_adaptation"
      }
    ],
    "sources": [
      {
        "id": "PG-TRIADS",
        "title": "Introduction to Triads",
        "publisher": "Music Theory for the 21st-Century Classroom / University of Puget Sound",
        "url": "https://musictheory.pugetsound.edu/mt21c/TriadsIntroduction.html",
        "checkedOn": "2026-09-11",
        "supports": "Triad construction, major/minor intervals.",
        "limitation": "General rule; exact PianoGrid registers, diagrams, exercises and explanations are original applications."
      },
      {
        "id": "PG-OMT",
        "title": "Triads",
        "publisher": "Open Music Theory",
        "url": "https://openmusictheory.github.io/triads.html",
        "checkedOn": "2026-09-11",
        "supports": "Chord quality, chord members, inversion and lead-sheet conventions.",
        "limitation": "Not a source for our hand-specific fingerings or recordings."
      },
      {
        "id": "PG-ASPN",
        "title": "American Standard Pitch Notation (ASPN)",
        "publisher": "Open Music Theory",
        "url": "https://viva.pressbooks.pub/openmusictheory/chapter/aspn/",
        "checkedOn": "2026-09-11",
        "supports": "Written note letters and octave numbering.",
        "limitation": "Cb4 = MIDI 59 is a derived application of the notation rule, not a quotation of a PianoGrid example."
      },
      {
        "id": "PG-SKOOVE-E-MAJOR",
        "title": "E Major chord on piano",
        "publisher": "Skoove",
        "url": "https://www.skoove.com/en/tools/piano-chords/e-major",
        "checkedOn": "2026-09-11",
        "supports": "Root-position E–G♯–B; right hand 1–3–5 and left hand 5–3–1.",
        "limitation": "The root-position hand numbers are shown by the source. It does not specify PianoGrid’s E4–G♯4–B4 register. We do not adopt song lists, mood labels or inversion fingerings."
      }
    ],
    "practice": {
      "id": "practice",
      "heading": "Build E on the keyboard",
      "prompt": "Select the three pitch classes that make E major, then check your answer.",
      "scope": "This keyboard checks an unordered pitch-class set. Order, octave, fingering and live piano performance are not assessed."
    },
    "extraBlocks": [
      {
        "block_id": "e-major-locate",
        "content": {
          "heading": "Find the notes on your keyboard",
          "paragraphs": [],
          "steps": [
            "Locate E, the white key immediately to the right of a group of two black keys.",
            "Find G-sharp between G and A, then B immediately before the next C.",
            "Use E4–G♯4–B4 for the root example. Check G-sharp carefully before you play the three notes together."
          ],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "e-major-compare",
        "content": {
          "heading": "E major and E minor differ at the third",
          "paragraphs": [
            "Keep E and B fixed. E major uses G-sharp, while E minor uses G natural. Test the difference with E4–G♯4–B4 and E4–G4–B4.",
            "The root-position builder on this page still asks for E major. A written comparison is useful for self-checking, but it does not add an E-minor mode or claim to assess your playing."
          ],
          "steps": [],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "e-major-connections",
        "content": {
          "heading": "An E chord can lead to A major or A minor",
          "paragraphs": [
            "In A major, the chord on scale degree 5 is E major. In an A-minor context, using G-sharp supplies the raised leading tone A minor often uses in its dominant chord. The destination and surrounding harmony supply that context.",
            "Compare E4–G♯4–B4 with E4–A4–C5. The latter is Am/E, not root-position Am, because E is the bass. The shared E stays fixed while the other two notes move."
          ],
          "steps": [],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "e-major-self-check",
        "content": {
          "heading": "Check the idea without JavaScript",
          "paragraphs": [
            "Name the three chord tones before looking back at the answer. Then name the bass of the first inversion. These are written self-checks, not additional scored modes."
          ],
          "steps": [
            "Chord-tone answer: E, G♯, B.",
            "First-inversion bass: G♯. The root is still E."
          ],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "e-major-questions",
        "content": {
          "heading": "Questions about E major",
          "paragraphs": [],
          "steps": [],
          "table": {
            "columns": [
              "Question",
              "Answer"
            ],
            "rows": [
              [
                "Which key is G-sharp?",
                "The black key between G and A. It is the only black key in the root-position E major example."
              ],
              [
                "Does E mean E major or E minor?",
                "A plain E chord symbol normally denotes the major triad. Em specifies E minor."
              ],
              [
                "What does E/G-sharp mean?",
                "An E major chord with G-sharp as the lowest sounding note: its first inversion."
              ],
              [
                "Why is E/B still E major?",
                "Moving B into the bass changes the inversion, not the E–G-sharp–B chord-tone set."
              ],
              [
                "Are these piano audio recordings?",
                "The page uses the site’s user-triggered reference tone. This content pack does not supply or license an acoustic piano recording."
              ]
            ]
          },
          "links": []
        }
      }
    ]
  },
  "/chords/b-major": {
    "fingerings": [
      {
        "id": "b-major--root--right",
        "voicingId": "b-major--root",
        "hand": "right",
        "notes": [
          "B4",
          "D♯5",
          "F♯5"
        ],
        "fingers": [
          1,
          3,
          5
        ],
        "scope": "Separate right-hand example for the displayed root-position voicing B4–D♯5–F♯5.",
        "limitation": "The source supplies these chord-tone and hand-number pairings, not this octave placement. This is a starting example, not a universal rule; no fingering is assigned to the inversions.",
        "sourceIds": [
          "PG-SKOOVE-B-MAJOR"
        ],
        "verificationStatus": "source_verified_with_octave_adaptation"
      },
      {
        "id": "b-major--root--left",
        "voicingId": "b-major--root",
        "hand": "left",
        "notes": [
          "B4",
          "D♯5",
          "F♯5"
        ],
        "fingers": [
          5,
          3,
          1
        ],
        "scope": "Separate left-hand example for the displayed root-position voicing B4–D♯5–F♯5.",
        "limitation": "The source supplies these chord-tone and hand-number pairings, not this octave placement. This is a starting example, not a universal rule; no fingering is assigned to the inversions.",
        "sourceIds": [
          "PG-SKOOVE-B-MAJOR"
        ],
        "verificationStatus": "source_verified_with_octave_adaptation"
      }
    ],
    "sources": [
      {
        "id": "PG-TRIADS",
        "title": "Introduction to Triads",
        "publisher": "Music Theory for the 21st-Century Classroom / University of Puget Sound",
        "url": "https://musictheory.pugetsound.edu/mt21c/TriadsIntroduction.html",
        "checkedOn": "2026-09-11",
        "supports": "Triad construction, major/minor intervals.",
        "limitation": "General rule; exact PianoGrid registers, diagrams, exercises and explanations are original applications."
      },
      {
        "id": "PG-OMT",
        "title": "Triads",
        "publisher": "Open Music Theory",
        "url": "https://openmusictheory.github.io/triads.html",
        "checkedOn": "2026-09-11",
        "supports": "Chord quality, chord members, inversion and lead-sheet conventions.",
        "limitation": "Not a source for our hand-specific fingerings or recordings."
      },
      {
        "id": "PG-ASPN",
        "title": "American Standard Pitch Notation (ASPN)",
        "publisher": "Open Music Theory",
        "url": "https://viva.pressbooks.pub/openmusictheory/chapter/aspn/",
        "checkedOn": "2026-09-11",
        "supports": "Written note letters and octave numbering.",
        "limitation": "Cb4 = MIDI 59 is a derived application of the notation rule, not a quotation of a PianoGrid example."
      },
      {
        "id": "PG-SKOOVE-B-MAJOR",
        "title": "B Major chord on piano",
        "publisher": "Skoove",
        "url": "https://www.skoove.com/en/tools/piano-chords/b-major",
        "checkedOn": "2026-09-11",
        "supports": "Root-position B–D♯–F♯; right hand 1–3–5 and left hand 5–3–1.",
        "limitation": "The root-position hand numbers are shown by the source. It does not specify PianoGrid’s B4–D♯5–F♯5 register. We do not adopt song lists, mood labels or inversion fingerings."
      }
    ],
    "practice": {
      "id": "practice",
      "heading": "Build B on the keyboard",
      "prompt": "Select the three pitch classes that make B major, then check your answer.",
      "scope": "This keyboard checks an unordered pitch-class set. Order, octave, fingering and live piano performance are not assessed."
    },
    "extraBlocks": [
      {
        "block_id": "b-major-locate",
        "content": {
          "heading": "Find the notes on your keyboard",
          "paragraphs": [],
          "steps": [
            "Locate B immediately to the left of C.",
            "Locate D-sharp between D and E, and F-sharp between F and G.",
            "The preserved root example is B4–D♯5–F♯5. The lower B3 version in the chord chart has the same pitch classes in a different octave."
          ],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "b-major-compare",
        "content": {
          "heading": "B major and C-flat major: keys versus spelling",
          "paragraphs": [
            "On an equal-tempered piano, B–D♯–F♯ and C♭–E♭–G♭ can use the same keys when their registers match. The spellings serve different written contexts and are kept separate in this reference.",
            "B3–D♯4–F♯4 matches C♭4–E♭4–G♭4. The root example higher on this page starts at B4, so it is an octave above that C-flat example; do not compare unequal registers and call their sounding pitches identical."
          ],
          "steps": [],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "b-major-connections",
        "content": {
          "heading": "Find B in an E-major context",
          "paragraphs": [
            "B major is the V chord in E major. That tells you its function in that key; it does not change its note spelling.",
            "For an exact shared-tone comparison, write B3–D♯4–F♯4 followed by B3–E4–G♯4. The second voicing is E/B. B remains in the bass, so the comparison is not two root-position shapes."
          ],
          "steps": [],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "b-major-self-check",
        "content": {
          "heading": "Check the idea without JavaScript",
          "paragraphs": [
            "Name the three chord tones before looking back at the answer. Then name the bass of the first inversion. These are written self-checks, not additional scored modes."
          ],
          "steps": [
            "Chord-tone answer: B, D♯, F♯.",
            "First-inversion bass: D♯. The root is still B."
          ],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "b-major-questions",
        "content": {
          "heading": "Questions about B major",
          "paragraphs": [],
          "steps": [],
          "table": {
            "columns": [
              "Question",
              "Answer"
            ],
            "rows": [
              [
                "Is the B major chord all black keys?",
                "No. B is a white key, while D-sharp and F-sharp are black keys."
              ],
              [
                "What is the difference between B and Bm?",
                "B major uses D-sharp; B minor uses D natural. Both use B and F-sharp."
              ],
              [
                "What does B/F-sharp mean?",
                "B major with F-sharp as the lowest note: second inversion."
              ],
              [
                "Why do the inversion examples jump down in register?",
                "The original reference uses B4 for root position but lower examples for the inversions. Bass membership determines inversion, not whether the next diagram moves upward."
              ],
              [
                "Can C-flat major be replaced with B in written music?",
                "They can be enharmonic on a piano, but the spelling communicates the written harmonic context. This reference preserves the requested chord spelling."
              ]
            ]
          },
          "links": []
        }
      }
    ]
  },
  "/chords/a-flat-major": {
    "fingerings": [
      {
        "id": "a-flat-major--root--right",
        "voicingId": "a-flat-major--root",
        "hand": "right",
        "notes": [
          "A♭4",
          "C5",
          "E♭5"
        ],
        "fingers": [
          1,
          3,
          5
        ],
        "scope": "Separate right-hand example for the displayed root-position voicing A♭4–C5–E♭5.",
        "limitation": "The source supplies these chord-tone and hand-number pairings, not this octave placement. This is a starting example, not a universal rule; no fingering is assigned to the inversions.",
        "sourceIds": [
          "PG-SKOOVE-A-FLAT-MAJOR"
        ],
        "verificationStatus": "source_verified_with_octave_adaptation"
      },
      {
        "id": "a-flat-major--root--left",
        "voicingId": "a-flat-major--root",
        "hand": "left",
        "notes": [
          "A♭4",
          "C5",
          "E♭5"
        ],
        "fingers": [
          5,
          3,
          1
        ],
        "scope": "Separate left-hand example for the displayed root-position voicing A♭4–C5–E♭5.",
        "limitation": "The source supplies these chord-tone and hand-number pairings, not this octave placement. This is a starting example, not a universal rule; no fingering is assigned to the inversions.",
        "sourceIds": [
          "PG-SKOOVE-A-FLAT-MAJOR"
        ],
        "verificationStatus": "source_verified_with_octave_adaptation"
      }
    ],
    "sources": [
      {
        "id": "PG-TRIADS",
        "title": "Introduction to Triads",
        "publisher": "Music Theory for the 21st-Century Classroom / University of Puget Sound",
        "url": "https://musictheory.pugetsound.edu/mt21c/TriadsIntroduction.html",
        "checkedOn": "2026-09-11",
        "supports": "Triad construction, major/minor intervals.",
        "limitation": "General rule; exact PianoGrid registers, diagrams, exercises and explanations are original applications."
      },
      {
        "id": "PG-OMT",
        "title": "Triads",
        "publisher": "Open Music Theory",
        "url": "https://openmusictheory.github.io/triads.html",
        "checkedOn": "2026-09-11",
        "supports": "Chord quality, chord members, inversion and lead-sheet conventions.",
        "limitation": "Not a source for our hand-specific fingerings or recordings."
      },
      {
        "id": "PG-ASPN",
        "title": "American Standard Pitch Notation (ASPN)",
        "publisher": "Open Music Theory",
        "url": "https://viva.pressbooks.pub/openmusictheory/chapter/aspn/",
        "checkedOn": "2026-09-11",
        "supports": "Written note letters and octave numbering.",
        "limitation": "Cb4 = MIDI 59 is a derived application of the notation rule, not a quotation of a PianoGrid example."
      },
      {
        "id": "PG-SKOOVE-A-FLAT-MAJOR",
        "title": "A Flat Major chord on piano",
        "publisher": "Skoove",
        "url": "https://www.skoove.com/en/tools/piano-chords/a-flat-major",
        "checkedOn": "2026-09-11",
        "supports": "Root-position A♭–C–E♭; right hand 1–3–5 and left hand 5–3–1.",
        "limitation": "The root-position hand numbers are shown by the source. It does not specify PianoGrid’s A♭4–C5–E♭5 register. We do not adopt song lists, mood labels or inversion fingerings."
      }
    ],
    "practice": {
      "id": "practice",
      "heading": "Build A♭ on the keyboard",
      "prompt": "Select the three pitch classes that make A flat major, then check your answer.",
      "scope": "This keyboard checks an unordered pitch-class set. Order, octave, fingering and live piano performance are not assessed."
    },
    "extraBlocks": [
      {
        "block_id": "a-flat-major-locate",
        "content": {
          "heading": "Find the notes on your keyboard",
          "paragraphs": [],
          "steps": [
            "Locate A-flat on the black key between G and A.",
            "Add C and E-flat, preserving each written name.",
            "The root example is A♭4–C5–E♭5. Other inversions on this page use a lower register; their bass labels tell you which chord member is lowest."
          ],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "a-flat-major-compare",
        "content": {
          "heading": "A-flat major versus A major",
          "paragraphs": [
            "Compare A♭4–C5–E♭5 with A4–C♯5–E5. All three sounding pitches move up one semitone to make A major; simply changing A-flat to A would not give the same result.",
            "G-sharp major is enharmonically related but spelled G♯–B♯–D♯. This page keeps A♭–C–E♭ because it answers the A-flat query, not a separate G-sharp spelling lesson."
          ],
          "steps": [],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "a-flat-major-connections",
        "content": {
          "heading": "Connect A-flat major with C minor",
          "paragraphs": [
            "A♭–C–E♭ and C–E♭–G have two shared tones, C and E-flat. Shared tones can make a comparison easier to follow without making the chord names interchangeable.",
            "Use C4–E♭4–A♭4, then C4–E♭4–G4. The first is A♭/C; the second is Cm. Only the highest written note changes in this example. No transition fingering has been assigned."
          ],
          "steps": [],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "a-flat-major-self-check",
        "content": {
          "heading": "Check the idea without JavaScript",
          "paragraphs": [
            "Name the three chord tones before looking back at the answer. Then name the bass of the first inversion. These are written self-checks, not additional scored modes."
          ],
          "steps": [
            "Chord-tone answer: A♭, C, E♭.",
            "First-inversion bass: C. The root is still A♭."
          ],
          "table": null,
          "links": []
        }
      },
      {
        "block_id": "a-flat-major-questions",
        "content": {
          "heading": "Questions about A flat major",
          "paragraphs": [],
          "steps": [],
          "table": {
            "columns": [
              "Question",
              "Answer"
            ],
            "rows": [
              [
                "Does Ab mean A-flat minor?",
                "No. Ab or A♭ normally names A-flat major. A-flat minor needs a minor marker such as Abm."
              ],
              [
                "Which note is natural in A-flat major?",
                "C. The other two triad tones are A-flat and E-flat."
              ],
              [
                "What does A-flat/C mean?",
                "An A-flat major chord with C in the bass. It is the first inversion."
              ],
              [
                "Does the PDF include finger numbers?",
                "No. The printable reference shows note names, bass notes and keyboard positions. Hand-specific root examples are explained on the page."
              ],
              [
                "Does A-flat major have the same chord tones as C minor?",
                "Not all of them. They share C and E-flat, but A-flat major uses A-flat where C minor uses G."
              ]
            ]
          },
          "links": []
        }
      }
    ]
  }
} satisfies Record<string, NextChordLearning>;

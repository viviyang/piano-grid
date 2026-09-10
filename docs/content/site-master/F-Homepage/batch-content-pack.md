# Batch F — Homepage + Tools + Chord Progressions + remaining structural/chord pages

[已核实] 共 14 页。基线字段原样保留，核查日期 2026-09-09。

证据标签为后台记录；英文文案在各模块 body 中。计算数据与编辑建议标 [推断]。待确认字段不供上线渲染。

## /

[已核实] 目标关键词：`None`；模板 T01；基线优先级：先做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose the correct starting point for a piano lookup or learning task.

### 页面需回答的问题

- Where should I start?
- Can I identify a key or chord?
- Where can I find a suitable song and score?

### 英文页面内容

**Piano Reference**

Find the notes, chords, scales and music resources you need for the next thing you want to play.

#### What would you like to do?

Find a note on the keyboard, look up a chord, check a scale, or choose a piece to learn. Start with the task you have now; each reference gives a specific result or a concrete next step.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：原创编辑建议。 

#### New to piano? Try three notes

Find the white C key immediately left of a group of two black keys. Continue right to D and E. The beginner guide turns those three notes into a short reading and counting exercise.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：BN-MUSICCA-NOTES。 

#### Choose music with a usable edition

Use Songs to compare repertoire and difficulty descriptions. Use Sheet Music to inspect exact editions, formats and access conditions. The score listings distinguish official sources, external references and unclear licenses.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：原创编辑建议。 

### 结构化数据

```json
{
  "primary_tasks": [
    {
      "label": "Find a note",
      "url": "/keyboard-notes"
    },
    {
      "label": "Look up a chord",
      "url": "/chords"
    },
    {
      "label": "Check a scale",
      "url": "/scales"
    },
    {
      "label": "Choose a song",
      "url": "/songs"
    },
    {
      "label": "Find sheet music",
      "url": "/sheet-music"
    },
    {
      "label": "Learn the basics",
      "url": "/guide"
    }
  ],
  "secondary_link": {
    "label": "Tools and printables",
    "url": "/tools"
  },
  "first_action": {
    "notes": [
      "C",
      "D",
      "E"
    ],
    "instruction": "Locate C to the left of two black keys, then the next two white keys."
  },
  "navigation_release_policy": "render a link only if its destination has passed the baseline release gate",
  "copy_state": "draft for implementation; no claim that unreleased functions are live"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |

### 待确认

- F-HOME-RELEASE — navigation and site claims：Homepage copy is prepared; destination release status must be supplied by implementation.；解决：Use actual release manifest so paused and unpublished pages are not offered as working routes.

来源：BN-MUSICCA-NOTES

## /tools

[已核实] 目标关键词：`None`；模板 T02；基线优先级：先做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Find the correct reference or an actual printable, without duplicate tool pages.

### 页面需回答的问题

- Where can I look up notes or chords?
- Which original PDFs are available?

### 英文页面内容

**Piano Tools and Printables**

Choose a specific lookup or a printable resource for your next practice task.

#### Choose the job

Use the keyboard chart to locate a note, the chord reference to look up a known chord, and the scale reference to inspect a selected scale. If you have notes but no chord name, use the chord finder’s supported examples and candidate explanations.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：原创编辑建议。 

#### Print something useful

The original print collection includes a piano cheat sheet, blank grand staffs, a blank-keyboard worksheet, a starter and reading pack, and chord progressions in three keys. Each resource card states what is included before you download it.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：原创编辑建议。 

### 结构化数据

```json
{
  "printables": [
    {
      "label": "Piano cheat sheet",
      "task": "Keep core notes and chords nearby",
      "url": "/tools/piano-cheat-sheet",
      "asset": "assets/piano-cheat-sheet.pdf"
    },
    {
      "label": "Blank piano sheet music",
      "task": "Write on six grand staffs",
      "url": "/tools/blank-sheet-music",
      "asset": "assets/blank-piano-staff-letter.pdf"
    },
    {
      "label": "Blank keyboard worksheet",
      "task": "Label your own keyboard",
      "url": "/keyboard-notes/blank",
      "asset": "assets/blank-keyboard-worksheet-letter.pdf"
    },
    {
      "label": "Starter and reading pack",
      "task": "Read and clap original exercises",
      "url": "/guide",
      "asset": "assets/piano-starter-and-reading.pdf"
    },
    {
      "label": "Chord progression reference",
      "task": "Compare three patterns in three keys",
      "url": "/chord-progressions",
      "asset": "assets/chord-progressions-c-e-a.pdf"
    }
  ],
  "lookup_links": [
    {
      "url": "/keyboard-notes/chart",
      "label": "Find a note"
    },
    {
      "url": "/chords",
      "label": "Look up a chord"
    },
    {
      "url": "/scales",
      "label": "Check a scale"
    },
    {
      "url": "/chords/finder",
      "label": "Compare chord names"
    }
  ],
  "visibility_policy": "show destination links only when that page is released; asset availability does not imply page release"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P113 | content_and_data_prepared; implementation gates remain | 真实可用打印资源的入口，不要求新建重复工具页。 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-TOOLS-LINKS — release-dependent links：Prepared pages and files are not proof that website routes are live.；解决：Enable only published destinations and verified downloadable files.

来源：

## /chords/a-major

[已核实] 目标关键词：`a chord piano`；模板 T07；基线优先级：先做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Locate this exact triad and compare its three bass positions.

### 页面需回答的问题

- Which notes form A major?
- How do its inversions change the bass?
- Which fingerings are verified?

### 英文页面内容

**A major Piano Chord**

Find A major notes, intervals, keyboard positions and inversions.

#### Notes and keyboard position

A major contains A–C#–E. The intervals from the root are a major third and a perfect fifth.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, E-TRIADS。 

#### What to notice

Compare with A minor: C-sharp replaces C while A and E stay the same. The sharp is the chord’s third, so calling it D-flat would hide the stacked-third spelling.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, BN-PUGET-OCTAVES。 

#### Compare three positions

The diagrams keep the chord’s spelling while changing which chord tone is lowest. Read the bass note under each position, then compare the note order. Finger numbers are shown only where the exact example has a source; no hand shape is prescribed for the remaining voicings.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT。 

### 结构化数据

```json
{
  "root": "A",
  "quality": "major",
  "symbol": "A",
  "aliases": [
    "A",
    "A major",
    "Amaj"
  ],
  "pitch_classes": [
    "A",
    "C#",
    "E"
  ],
  "semitones_from_root": [
    0,
    4,
    7
  ],
  "intervals": [
    "perfect unison",
    "major third",
    "perfect fifth"
  ],
  "voicings": [
    {
      "id": "root",
      "label": "Root position",
      "notes": [
        "A4",
        "C#5",
        "E5"
      ],
      "midi": [
        69,
        73,
        76
      ],
      "bass": "A4",
      "symbol": "A",
      "keyboard_highlights": [
        {
          "midi": 69,
          "spelling": "A4"
        },
        {
          "midi": 73,
          "spelling": "C#5"
        },
        {
          "midi": 76,
          "spelling": "E5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          69,
          73,
          76
        ],
        "ascending_midi": [
          69,
          73,
          76
        ],
        "descending_midi": [
          76,
          73,
          69
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "first",
      "label": "First inversion",
      "notes": [
        "C#4",
        "E4",
        "A4"
      ],
      "midi": [
        61,
        64,
        69
      ],
      "bass": "C#4",
      "symbol": "A/C#",
      "keyboard_highlights": [
        {
          "midi": 61,
          "spelling": "C#4"
        },
        {
          "midi": 64,
          "spelling": "E4"
        },
        {
          "midi": 69,
          "spelling": "A4"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          61,
          64,
          69
        ],
        "ascending_midi": [
          61,
          64,
          69
        ],
        "descending_midi": [
          69,
          64,
          61
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "second",
      "label": "Second inversion",
      "notes": [
        "E4",
        "A4",
        "C#5"
      ],
      "midi": [
        64,
        69,
        73
      ],
      "bass": "E4",
      "symbol": "A/E",
      "keyboard_highlights": [
        {
          "midi": 64,
          "spelling": "E4"
        },
        {
          "midi": 69,
          "spelling": "A4"
        },
        {
          "midi": 73,
          "spelling": "C#5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          64,
          69,
          73
        ],
        "ascending_midi": [
          64,
          69,
          73
        ],
        "descending_midi": [
          73,
          69,
          64
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    }
  ],
  "default_voicing": "root",
  "derivation": {
    "status": "[推断] computed from independently verified chord formulas and written pitch registers",
    "source_ids": [
      "F-OMT",
      "E-TRIADS",
      "BN-PUGET-OCTAVES"
    ]
  },
  "assets": [
    {
      "path": "assets/chord-a-major.svg",
      "format": "SVG",
      "content": "three inversion keyboard diagrams"
    },
    {
      "path": "assets/chord-a-major.pdf",
      "format": "PDF",
      "pages": 1,
      "content": "three inversion keyboard diagrams",
      "visual_qa": "passed; every final PDF page rendered and inspected"
    }
  ],
  "related": [
    "/chords",
    "/guide/piano-chords",
    "/chords/by-key"
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P149 | content_and_data_prepared; implementation gates remain | 当前和弦的音名/键位/音程；原位和转位；可用时播放；清晰指法说明；相关查询链接 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-FINGER-a-major — fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-a-major — runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

来源：F-OMT, E-TRIADS, BN-PUGET-OCTAVES

## /chords/c-major

[已核实] 目标关键词：`c chords piano`；模板 T07；基线优先级：先做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Locate this exact triad and compare its three bass positions.

### 页面需回答的问题

- Which notes form C major?
- How do its inversions change the bass?
- Which fingerings are verified?

### 英文页面内容

**C major Piano Chord**

Find C major notes, intervals, keyboard positions and inversions.

#### Notes and keyboard position

C major contains C–E–G. The intervals from the root are a major third and a perfect fifth.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, E-TRIADS。 

#### What to notice

All three chord tones are white keys. Moving C above E and G gives E–G–C; E in the bass makes that first inversion, while C remains the root.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, BN-PUGET-OCTAVES。 

#### Compare three positions

The diagrams keep the chord’s spelling while changing which chord tone is lowest. Read the bass note under each position, then compare the note order. Finger numbers are shown only where the exact example has a source; no hand shape is prescribed for the remaining voicings.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT。 

### 结构化数据

```json
{
  "root": "C",
  "quality": "major",
  "symbol": "C",
  "aliases": [
    "C",
    "C major",
    "Cmaj"
  ],
  "pitch_classes": [
    "C",
    "E",
    "G"
  ],
  "semitones_from_root": [
    0,
    4,
    7
  ],
  "intervals": [
    "perfect unison",
    "major third",
    "perfect fifth"
  ],
  "voicings": [
    {
      "id": "root",
      "label": "Root position",
      "notes": [
        "C4",
        "E4",
        "G4"
      ],
      "midi": [
        60,
        64,
        67
      ],
      "bass": "C4",
      "symbol": "C",
      "keyboard_highlights": [
        {
          "midi": 60,
          "spelling": "C4"
        },
        {
          "midi": 64,
          "spelling": "E4"
        },
        {
          "midi": 67,
          "spelling": "G4"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          60,
          64,
          67
        ],
        "ascending_midi": [
          60,
          64,
          67
        ],
        "descending_midi": [
          67,
          64,
          60
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "first",
      "label": "First inversion",
      "notes": [
        "E4",
        "G4",
        "C5"
      ],
      "midi": [
        64,
        67,
        72
      ],
      "bass": "E4",
      "symbol": "C/E",
      "keyboard_highlights": [
        {
          "midi": 64,
          "spelling": "E4"
        },
        {
          "midi": 67,
          "spelling": "G4"
        },
        {
          "midi": 72,
          "spelling": "C5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          64,
          67,
          72
        ],
        "ascending_midi": [
          64,
          67,
          72
        ],
        "descending_midi": [
          72,
          67,
          64
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "second",
      "label": "Second inversion",
      "notes": [
        "G4",
        "C5",
        "E5"
      ],
      "midi": [
        67,
        72,
        76
      ],
      "bass": "G4",
      "symbol": "C/G",
      "keyboard_highlights": [
        {
          "midi": 67,
          "spelling": "G4"
        },
        {
          "midi": 72,
          "spelling": "C5"
        },
        {
          "midi": 76,
          "spelling": "E5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          67,
          72,
          76
        ],
        "ascending_midi": [
          67,
          72,
          76
        ],
        "descending_midi": [
          76,
          72,
          67
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    }
  ],
  "default_voicing": "root",
  "derivation": {
    "status": "[推断] computed from independently verified chord formulas and written pitch registers",
    "source_ids": [
      "F-OMT",
      "E-TRIADS",
      "BN-PUGET-OCTAVES"
    ]
  },
  "assets": [
    {
      "path": "assets/chord-c-major.svg",
      "format": "SVG",
      "content": "three inversion keyboard diagrams"
    },
    {
      "path": "assets/chord-c-major.pdf",
      "format": "PDF",
      "pages": 1,
      "content": "three inversion keyboard diagrams",
      "visual_qa": "passed; every final PDF page rendered and inspected"
    }
  ],
  "related": [
    "/chords",
    "/guide/piano-chords",
    "/chords/by-key"
  ],
  "verified_fingering_example": {
    "scope": "RH root position only, usual choice from Yamaha",
    "notes": [
      "C",
      "E",
      "G"
    ],
    "fingers": [
      1,
      3,
      5
    ],
    "source_ids": [
      "E-CHORD"
    ]
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P163 | content_and_data_prepared; implementation gates remain | 当前和弦的音名/键位/音程；原位和转位；可用时播放；清晰指法说明；相关查询链接 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-FINGER-c-major — fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-c-major — runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

来源：F-OMT, E-TRIADS, BN-PUGET-OCTAVES, E-CHORD

## /tools/piano-cheat-sheet

[已核实] 目标关键词：`piano cheat sheet`；模板 T20；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Download one concise original piano reference sheet.

### 页面需回答的问题

- What is included?
- Does the sheet contain verified notes?
- Is it a complete fingering chart?

### 英文页面内容

**Piano Cheat Sheet**

Print a compact reference for notes, common triads, two major scales and basic durations.

#### Keep a small reference by the keyboard

The one-page sheet includes treble and bass note names, nine triads, C and G major scale notes, and note values measured in quarter-note units. It is a lookup aid for the examples covered, not an all-keys method book.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：BN-OMT-CLEFS, F-OMT, E-DURATION。 

#### Follow the detailed reference when needed

Use the keyboard chart for a specific octave, the chord page for inversions, and the scale page for a verified fingering. This sheet does not prescribe fingers. Print at a readable size and keep the source date with the page.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：原创编辑建议。 

### 结构化数据

```json
{
  "note_names": [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B"
  ],
  "middle_c": "C4",
  "treble_lines": [
    "E4",
    "G4",
    "B4",
    "D5",
    "F5"
  ],
  "treble_spaces": [
    "F4",
    "A4",
    "C5",
    "E5"
  ],
  "bass_lines": [
    "G2",
    "B2",
    "D3",
    "F3",
    "A3"
  ],
  "bass_spaces": [
    "A2",
    "C3",
    "E3",
    "G3"
  ],
  "chords": [
    {
      "name": "A major",
      "symbol": "A",
      "notes": [
        "A",
        "C#",
        "E"
      ]
    },
    {
      "name": "C major",
      "symbol": "C",
      "notes": [
        "C",
        "E",
        "G"
      ]
    },
    {
      "name": "B major",
      "symbol": "B",
      "notes": [
        "B",
        "D#",
        "F#"
      ]
    },
    {
      "name": "A-flat major",
      "symbol": "Ab",
      "notes": [
        "Ab",
        "C",
        "Eb"
      ]
    },
    {
      "name": "E major",
      "symbol": "E",
      "notes": [
        "E",
        "G#",
        "B"
      ]
    },
    {
      "name": "C minor",
      "symbol": "Cm",
      "notes": [
        "C",
        "Eb",
        "G"
      ]
    },
    {
      "name": "C-flat major",
      "symbol": "Cb",
      "notes": [
        "Cb",
        "Eb",
        "Gb"
      ]
    },
    {
      "name": "G major",
      "symbol": "G",
      "notes": [
        "G",
        "B",
        "D"
      ]
    },
    {
      "name": "A minor",
      "symbol": "Am",
      "notes": [
        "A",
        "C",
        "E"
      ]
    }
  ],
  "scales": [
    {
      "name": "C major",
      "notes": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "B",
        "C"
      ]
    },
    {
      "name": "G major",
      "notes": [
        "G",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F#",
        "G"
      ]
    }
  ],
  "duration_quarters": {
    "whole": 4,
    "half": 2,
    "quarter": 1,
    "eighth": 0.5
  },
  "fingering": null,
  "assets": [
    {
      "path": "assets/piano-cheat-sheet.pdf",
      "format": "PDF",
      "pages": 1,
      "visual_qa": "passed; every final PDF page rendered and inspected"
    }
  ],
  "sources_by_module": {
    "notes": [
      "BN-OMT-CLEFS",
      "BN-MUSICCA-NOTES"
    ],
    "chords": [
      "F-OMT",
      "E-TRIADS"
    ],
    "scales": [
      "AM-NOTES-C-MAJOR",
      "AM-NOTES-G-MAJOR"
    ],
    "rhythm": [
      "E-DURATION"
    ]
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P131 | content_and_data_prepared; implementation gates remain | 从已审核音名、和弦、音阶模块组织原创简明打印资料；明确内容目录 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-CHEAT-REVIEW — professional review：The compact reference is generated from checked data; named music review remains a baseline gate.；解决：Review note spellings and the final print before publishing.

来源：BN-OMT-CLEFS, BN-MUSICCA-NOTES, F-OMT, E-TRIADS, AM-NOTES-C-MAJOR, AM-NOTES-G-MAJOR, E-DURATION

## /chords/b-major

[已核实] 目标关键词：`b chord piano`；模板 T07；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Locate this exact triad and compare its three bass positions.

### 页面需回答的问题

- Which notes form B major?
- How do its inversions change the bass?
- Which fingerings are verified?

### 英文页面内容

**B major Piano Chord**

Find B major notes, intervals, keyboard positions and inversions.

#### Notes and keyboard position

B major contains B–D#–F#. The intervals from the root are a major third and a perfect fifth.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, E-TRIADS。 

#### What to notice

The root is a white key and the third and fifth are black keys. D-sharp and F-sharp are the written chord tones; E-flat and G-flat are keyboard equivalents but different spellings.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, BN-PUGET-OCTAVES。 

#### Compare three positions

The diagrams keep the chord’s spelling while changing which chord tone is lowest. Read the bass note under each position, then compare the note order. Finger numbers are shown only where the exact example has a source; no hand shape is prescribed for the remaining voicings.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT。 

### 结构化数据

```json
{
  "root": "B",
  "quality": "major",
  "symbol": "B",
  "aliases": [
    "B",
    "B major",
    "Bmaj"
  ],
  "pitch_classes": [
    "B",
    "D#",
    "F#"
  ],
  "semitones_from_root": [
    0,
    4,
    7
  ],
  "intervals": [
    "perfect unison",
    "major third",
    "perfect fifth"
  ],
  "voicings": [
    {
      "id": "root",
      "label": "Root position",
      "notes": [
        "B4",
        "D#5",
        "F#5"
      ],
      "midi": [
        71,
        75,
        78
      ],
      "bass": "B4",
      "symbol": "B",
      "keyboard_highlights": [
        {
          "midi": 71,
          "spelling": "B4"
        },
        {
          "midi": 75,
          "spelling": "D#5"
        },
        {
          "midi": 78,
          "spelling": "F#5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          71,
          75,
          78
        ],
        "ascending_midi": [
          71,
          75,
          78
        ],
        "descending_midi": [
          78,
          75,
          71
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "first",
      "label": "First inversion",
      "notes": [
        "D#4",
        "F#4",
        "B4"
      ],
      "midi": [
        63,
        66,
        71
      ],
      "bass": "D#4",
      "symbol": "B/D#",
      "keyboard_highlights": [
        {
          "midi": 63,
          "spelling": "D#4"
        },
        {
          "midi": 66,
          "spelling": "F#4"
        },
        {
          "midi": 71,
          "spelling": "B4"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          63,
          66,
          71
        ],
        "ascending_midi": [
          63,
          66,
          71
        ],
        "descending_midi": [
          71,
          66,
          63
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "second",
      "label": "Second inversion",
      "notes": [
        "F#4",
        "B4",
        "D#5"
      ],
      "midi": [
        66,
        71,
        75
      ],
      "bass": "F#4",
      "symbol": "B/F#",
      "keyboard_highlights": [
        {
          "midi": 66,
          "spelling": "F#4"
        },
        {
          "midi": 71,
          "spelling": "B4"
        },
        {
          "midi": 75,
          "spelling": "D#5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          66,
          71,
          75
        ],
        "ascending_midi": [
          66,
          71,
          75
        ],
        "descending_midi": [
          75,
          71,
          66
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    }
  ],
  "default_voicing": "root",
  "derivation": {
    "status": "[推断] computed from independently verified chord formulas and written pitch registers",
    "source_ids": [
      "F-OMT",
      "E-TRIADS",
      "BN-PUGET-OCTAVES"
    ]
  },
  "assets": [
    {
      "path": "assets/chord-b-major.svg",
      "format": "SVG",
      "content": "three inversion keyboard diagrams"
    },
    {
      "path": "assets/chord-b-major.pdf",
      "format": "PDF",
      "pages": 1,
      "content": "three inversion keyboard diagrams",
      "visual_qa": "passed; every final PDF page rendered and inspected"
    }
  ],
  "related": [
    "/chords",
    "/guide/piano-chords",
    "/chords/by-key"
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P150 | content_and_data_prepared; implementation gates remain | 当前和弦的音名/键位/音程；原位和转位；可用时播放；清晰指法说明；相关查询链接 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-FINGER-b-major — fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-b-major — runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

来源：F-OMT, E-TRIADS, BN-PUGET-OCTAVES

## /chords/a-flat-major

[已核实] 目标关键词：`a flat chord piano`；模板 T07；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Locate this exact triad and compare its three bass positions.

### 页面需回答的问题

- Which notes form A-flat major?
- How do its inversions change the bass?
- Which fingerings are verified?

### 英文页面内容

**A-flat major Piano Chord**

Find A-flat major notes, intervals, keyboard positions and inversions.

#### Notes and keyboard position

A-flat major contains Ab–C–Eb. The intervals from the root are a major third and a perfect fifth.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, E-TRIADS。 

#### What to notice

The white C lies between two black-key chord tones, A-flat and E-flat. Ab means A-flat major when used as this plain chord symbol; Abm would ask for a different third.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, BN-PUGET-OCTAVES。 

#### Compare three positions

The diagrams keep the chord’s spelling while changing which chord tone is lowest. Read the bass note under each position, then compare the note order. Finger numbers are shown only where the exact example has a source; no hand shape is prescribed for the remaining voicings.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT。 

### 结构化数据

```json
{
  "root": "Ab",
  "quality": "major",
  "symbol": "Ab",
  "aliases": [
    "Ab",
    "A-flat major",
    "Abmaj"
  ],
  "pitch_classes": [
    "Ab",
    "C",
    "Eb"
  ],
  "semitones_from_root": [
    0,
    4,
    7
  ],
  "intervals": [
    "perfect unison",
    "major third",
    "perfect fifth"
  ],
  "voicings": [
    {
      "id": "root",
      "label": "Root position",
      "notes": [
        "Ab4",
        "C5",
        "Eb5"
      ],
      "midi": [
        68,
        72,
        75
      ],
      "bass": "Ab4",
      "symbol": "Ab",
      "keyboard_highlights": [
        {
          "midi": 68,
          "spelling": "Ab4"
        },
        {
          "midi": 72,
          "spelling": "C5"
        },
        {
          "midi": 75,
          "spelling": "Eb5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          68,
          72,
          75
        ],
        "ascending_midi": [
          68,
          72,
          75
        ],
        "descending_midi": [
          75,
          72,
          68
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "first",
      "label": "First inversion",
      "notes": [
        "C4",
        "Eb4",
        "Ab4"
      ],
      "midi": [
        60,
        63,
        68
      ],
      "bass": "C4",
      "symbol": "Ab/C",
      "keyboard_highlights": [
        {
          "midi": 60,
          "spelling": "C4"
        },
        {
          "midi": 63,
          "spelling": "Eb4"
        },
        {
          "midi": 68,
          "spelling": "Ab4"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          60,
          63,
          68
        ],
        "ascending_midi": [
          60,
          63,
          68
        ],
        "descending_midi": [
          68,
          63,
          60
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "second",
      "label": "Second inversion",
      "notes": [
        "Eb4",
        "Ab4",
        "C5"
      ],
      "midi": [
        63,
        68,
        72
      ],
      "bass": "Eb4",
      "symbol": "Ab/Eb",
      "keyboard_highlights": [
        {
          "midi": 63,
          "spelling": "Eb4"
        },
        {
          "midi": 68,
          "spelling": "Ab4"
        },
        {
          "midi": 72,
          "spelling": "C5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          63,
          68,
          72
        ],
        "ascending_midi": [
          63,
          68,
          72
        ],
        "descending_midi": [
          72,
          68,
          63
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    }
  ],
  "default_voicing": "root",
  "derivation": {
    "status": "[推断] computed from independently verified chord formulas and written pitch registers",
    "source_ids": [
      "F-OMT",
      "E-TRIADS",
      "BN-PUGET-OCTAVES"
    ]
  },
  "assets": [
    {
      "path": "assets/chord-a-flat-major.svg",
      "format": "SVG",
      "content": "three inversion keyboard diagrams"
    },
    {
      "path": "assets/chord-a-flat-major.pdf",
      "format": "PDF",
      "pages": 1,
      "content": "three inversion keyboard diagrams",
      "visual_qa": "passed; every final PDF page rendered and inspected"
    }
  ],
  "related": [
    "/chords",
    "/guide/piano-chords",
    "/chords/by-key"
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P155 | content_and_data_prepared; implementation gates remain | 当前和弦的音名/键位/音程；原位和转位；可用时播放；清晰指法说明；相关查询链接 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-FINGER-a-flat-major — fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-a-flat-major — runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

来源：F-OMT, E-TRIADS, BN-PUGET-OCTAVES

## /chords/e-major

[已核实] 目标关键词：`piano e chord`；模板 T07；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Locate this exact triad and compare its three bass positions.

### 页面需回答的问题

- Which notes form E major?
- How do its inversions change the bass?
- Which fingerings are verified?

### 英文页面内容

**E major Piano Chord**

Find E major notes, intervals, keyboard positions and inversions.

#### Notes and keyboard position

E major contains E–G#–B. The intervals from the root are a major third and a perfect fifth.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, E-TRIADS。 

#### What to notice

G-sharp is the only black-key chord tone. Compare E minor, E–G–B: the changed third explains both the spelling and the different quality.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, BN-PUGET-OCTAVES。 

#### Compare three positions

The diagrams keep the chord’s spelling while changing which chord tone is lowest. Read the bass note under each position, then compare the note order. Finger numbers are shown only where the exact example has a source; no hand shape is prescribed for the remaining voicings.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT。 

### 结构化数据

```json
{
  "root": "E",
  "quality": "major",
  "symbol": "E",
  "aliases": [
    "E",
    "E major",
    "Emaj"
  ],
  "pitch_classes": [
    "E",
    "G#",
    "B"
  ],
  "semitones_from_root": [
    0,
    4,
    7
  ],
  "intervals": [
    "perfect unison",
    "major third",
    "perfect fifth"
  ],
  "voicings": [
    {
      "id": "root",
      "label": "Root position",
      "notes": [
        "E4",
        "G#4",
        "B4"
      ],
      "midi": [
        64,
        68,
        71
      ],
      "bass": "E4",
      "symbol": "E",
      "keyboard_highlights": [
        {
          "midi": 64,
          "spelling": "E4"
        },
        {
          "midi": 68,
          "spelling": "G#4"
        },
        {
          "midi": 71,
          "spelling": "B4"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          64,
          68,
          71
        ],
        "ascending_midi": [
          64,
          68,
          71
        ],
        "descending_midi": [
          71,
          68,
          64
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "first",
      "label": "First inversion",
      "notes": [
        "G#4",
        "B4",
        "E5"
      ],
      "midi": [
        68,
        71,
        76
      ],
      "bass": "G#4",
      "symbol": "E/G#",
      "keyboard_highlights": [
        {
          "midi": 68,
          "spelling": "G#4"
        },
        {
          "midi": 71,
          "spelling": "B4"
        },
        {
          "midi": 76,
          "spelling": "E5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          68,
          71,
          76
        ],
        "ascending_midi": [
          68,
          71,
          76
        ],
        "descending_midi": [
          76,
          71,
          68
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "second",
      "label": "Second inversion",
      "notes": [
        "B4",
        "E5",
        "G#5"
      ],
      "midi": [
        71,
        76,
        80
      ],
      "bass": "B4",
      "symbol": "E/B",
      "keyboard_highlights": [
        {
          "midi": 71,
          "spelling": "B4"
        },
        {
          "midi": 76,
          "spelling": "E5"
        },
        {
          "midi": 80,
          "spelling": "G#5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          71,
          76,
          80
        ],
        "ascending_midi": [
          71,
          76,
          80
        ],
        "descending_midi": [
          80,
          76,
          71
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    }
  ],
  "default_voicing": "root",
  "derivation": {
    "status": "[推断] computed from independently verified chord formulas and written pitch registers",
    "source_ids": [
      "F-OMT",
      "E-TRIADS",
      "BN-PUGET-OCTAVES"
    ]
  },
  "assets": [
    {
      "path": "assets/chord-e-major.svg",
      "format": "SVG",
      "content": "three inversion keyboard diagrams"
    },
    {
      "path": "assets/chord-e-major.pdf",
      "format": "PDF",
      "pages": 1,
      "content": "three inversion keyboard diagrams",
      "visual_qa": "passed; every final PDF page rendered and inspected"
    }
  ],
  "related": [
    "/chords",
    "/guide/piano-chords",
    "/chords/by-key"
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P162 | content_and_data_prepared; implementation gates remain | 当前和弦的音名/键位/音程；原位和转位；可用时播放；清晰指法说明；相关查询链接 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-FINGER-e-major — fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-e-major — runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

来源：F-OMT, E-TRIADS, BN-PUGET-OCTAVES

## /chords/c-minor

[已核实] 目标关键词：`c minor in piano`；模板 T07；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Locate this exact triad and compare its three bass positions.

### 页面需回答的问题

- Which notes form C minor?
- How do its inversions change the bass?
- Which fingerings are verified?

### 英文页面内容

**C minor Piano Chord**

Find C minor notes, intervals, keyboard positions and inversions.

#### Notes and keyboard position

C minor contains C–Eb–G. The intervals from the root are a minor third and a perfect fifth.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, E-TRIADS。 

#### What to notice

The third is E-flat, not E. C and G remain the same as in C major, so this comparison isolates the one changed key.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, BN-PUGET-OCTAVES。 

#### Compare three positions

The diagrams keep the chord’s spelling while changing which chord tone is lowest. Read the bass note under each position, then compare the note order. Finger numbers are shown only where the exact example has a source; no hand shape is prescribed for the remaining voicings.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT。 

### 结构化数据

```json
{
  "root": "C",
  "quality": "minor",
  "symbol": "Cm",
  "aliases": [
    "Cm",
    "C minor",
    "Cmin",
    "C-"
  ],
  "pitch_classes": [
    "C",
    "Eb",
    "G"
  ],
  "semitones_from_root": [
    0,
    3,
    7
  ],
  "intervals": [
    "perfect unison",
    "minor third",
    "perfect fifth"
  ],
  "voicings": [
    {
      "id": "root",
      "label": "Root position",
      "notes": [
        "C4",
        "Eb4",
        "G4"
      ],
      "midi": [
        60,
        63,
        67
      ],
      "bass": "C4",
      "symbol": "Cm",
      "keyboard_highlights": [
        {
          "midi": 60,
          "spelling": "C4"
        },
        {
          "midi": 63,
          "spelling": "Eb4"
        },
        {
          "midi": 67,
          "spelling": "G4"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          60,
          63,
          67
        ],
        "ascending_midi": [
          60,
          63,
          67
        ],
        "descending_midi": [
          67,
          63,
          60
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "first",
      "label": "First inversion",
      "notes": [
        "Eb4",
        "G4",
        "C5"
      ],
      "midi": [
        63,
        67,
        72
      ],
      "bass": "Eb4",
      "symbol": "Cm/Eb",
      "keyboard_highlights": [
        {
          "midi": 63,
          "spelling": "Eb4"
        },
        {
          "midi": 67,
          "spelling": "G4"
        },
        {
          "midi": 72,
          "spelling": "C5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          63,
          67,
          72
        ],
        "ascending_midi": [
          63,
          67,
          72
        ],
        "descending_midi": [
          72,
          67,
          63
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "second",
      "label": "Second inversion",
      "notes": [
        "G4",
        "C5",
        "Eb5"
      ],
      "midi": [
        67,
        72,
        75
      ],
      "bass": "G4",
      "symbol": "Cm/G",
      "keyboard_highlights": [
        {
          "midi": 67,
          "spelling": "G4"
        },
        {
          "midi": 72,
          "spelling": "C5"
        },
        {
          "midi": 75,
          "spelling": "Eb5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          67,
          72,
          75
        ],
        "ascending_midi": [
          67,
          72,
          75
        ],
        "descending_midi": [
          75,
          72,
          67
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    }
  ],
  "default_voicing": "root",
  "derivation": {
    "status": "[推断] computed from independently verified chord formulas and written pitch registers",
    "source_ids": [
      "F-OMT",
      "E-TRIADS",
      "BN-PUGET-OCTAVES"
    ]
  },
  "assets": [
    {
      "path": "assets/chord-c-minor.svg",
      "format": "SVG",
      "content": "three inversion keyboard diagrams"
    },
    {
      "path": "assets/chord-c-minor.pdf",
      "format": "PDF",
      "pages": 1,
      "content": "three inversion keyboard diagrams",
      "visual_qa": "passed; every final PDF page rendered and inspected"
    }
  ],
  "related": [
    "/chords",
    "/guide/piano-chords",
    "/chords/by-key"
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P166 | content_and_data_prepared; implementation gates remain | 当前和弦的音名/键位/音程；原位和转位；可用时播放；清晰指法说明；相关查询链接 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-FINGER-c-minor — fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-c-minor — runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

来源：F-OMT, E-TRIADS, BN-PUGET-OCTAVES

## /chords/c-flat-major

[已核实] 目标关键词：`cb piano chord`；模板 T07；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Locate this exact triad and compare its three bass positions.

### 页面需回答的问题

- Which notes form C-flat major?
- How do its inversions change the bass?
- Which fingerings are verified?

### 英文页面内容

**C-flat major Piano Chord**

Find C-flat major notes, intervals, keyboard positions and inversions.

#### Notes and keyboard position

C-flat major contains Cb–Eb–Gb. The intervals from the root are a major third and a perfect fifth.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, E-TRIADS。 

#### What to notice

C-flat major uses C-flat, E-flat and G-flat. On an equal-tempered keyboard these match B, D-sharp and F-sharp. Cb4 sounds as B3, not B4: octave labels follow written C boundaries.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, BN-PUGET-OCTAVES。 

#### Compare three positions

The diagrams keep the chord’s spelling while changing which chord tone is lowest. Read the bass note under each position, then compare the note order. Finger numbers are shown only where the exact example has a source; no hand shape is prescribed for the remaining voicings.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT。 

### 结构化数据

```json
{
  "root": "Cb",
  "quality": "major",
  "symbol": "Cb",
  "aliases": [
    "Cb",
    "C-flat major",
    "Cbmaj"
  ],
  "pitch_classes": [
    "Cb",
    "Eb",
    "Gb"
  ],
  "semitones_from_root": [
    0,
    4,
    7
  ],
  "intervals": [
    "perfect unison",
    "major third",
    "perfect fifth"
  ],
  "voicings": [
    {
      "id": "root",
      "label": "Root position",
      "notes": [
        "Cb4",
        "Eb4",
        "Gb4"
      ],
      "midi": [
        59,
        63,
        66
      ],
      "bass": "Cb4",
      "symbol": "Cb",
      "keyboard_highlights": [
        {
          "midi": 59,
          "spelling": "Cb4"
        },
        {
          "midi": 63,
          "spelling": "Eb4"
        },
        {
          "midi": 66,
          "spelling": "Gb4"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          59,
          63,
          66
        ],
        "ascending_midi": [
          59,
          63,
          66
        ],
        "descending_midi": [
          66,
          63,
          59
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "first",
      "label": "First inversion",
      "notes": [
        "Eb4",
        "Gb4",
        "Cb5"
      ],
      "midi": [
        63,
        66,
        71
      ],
      "bass": "Eb4",
      "symbol": "Cb/Eb",
      "keyboard_highlights": [
        {
          "midi": 63,
          "spelling": "Eb4"
        },
        {
          "midi": 66,
          "spelling": "Gb4"
        },
        {
          "midi": 71,
          "spelling": "Cb5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          63,
          66,
          71
        ],
        "ascending_midi": [
          63,
          66,
          71
        ],
        "descending_midi": [
          71,
          66,
          63
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "second",
      "label": "Second inversion",
      "notes": [
        "Gb4",
        "Cb5",
        "Eb5"
      ],
      "midi": [
        66,
        71,
        75
      ],
      "bass": "Gb4",
      "symbol": "Cb/Gb",
      "keyboard_highlights": [
        {
          "midi": 66,
          "spelling": "Gb4"
        },
        {
          "midi": 71,
          "spelling": "Cb5"
        },
        {
          "midi": 75,
          "spelling": "Eb5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          66,
          71,
          75
        ],
        "ascending_midi": [
          66,
          71,
          75
        ],
        "descending_midi": [
          75,
          71,
          66
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    }
  ],
  "default_voicing": "root",
  "derivation": {
    "status": "[推断] computed from independently verified chord formulas and written pitch registers",
    "source_ids": [
      "F-OMT",
      "E-TRIADS",
      "BN-PUGET-OCTAVES"
    ]
  },
  "assets": [
    {
      "path": "assets/chord-c-flat-major.svg",
      "format": "SVG",
      "content": "three inversion keyboard diagrams"
    },
    {
      "path": "assets/chord-c-flat-major.pdf",
      "format": "PDF",
      "pages": 1,
      "content": "three inversion keyboard diagrams",
      "visual_qa": "passed; every final PDF page rendered and inspected"
    }
  ],
  "related": [
    "/chords",
    "/guide/piano-chords",
    "/chords/by-key"
  ],
  "enharmonic_root_example": {
    "written": "Cb4",
    "midi": 59,
    "same_key": "B3"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P167 | content_and_data_prepared; implementation gates remain | 当前和弦的音名/键位/音程；原位和转位；可用时播放；清晰指法说明；相关查询链接 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-FINGER-c-flat-major — fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-c-flat-major — runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

来源：F-OMT, E-TRIADS, BN-PUGET-OCTAVES

## /chords/g-major

[已核实] 目标关键词：`g chord piano`；模板 T07；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Locate this exact triad and compare its three bass positions.

### 页面需回答的问题

- Which notes form G major?
- How do its inversions change the bass?
- Which fingerings are verified?

### 英文页面内容

**G major Piano Chord**

Find G major notes, intervals, keyboard positions and inversions.

#### Notes and keyboard position

G major contains G–B–D. The intervals from the root are a major third and a perfect fifth.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, E-TRIADS。 

#### What to notice

This triad uses only white keys even though the G major scale contains F-sharp. A triad uses scale degrees 1, 3 and 5; it does not contain every scale tone.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, BN-PUGET-OCTAVES。 

#### Compare three positions

The diagrams keep the chord’s spelling while changing which chord tone is lowest. Read the bass note under each position, then compare the note order. Finger numbers are shown only where the exact example has a source; no hand shape is prescribed for the remaining voicings.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT。 

### 结构化数据

```json
{
  "root": "G",
  "quality": "major",
  "symbol": "G",
  "aliases": [
    "G",
    "G major",
    "Gmaj"
  ],
  "pitch_classes": [
    "G",
    "B",
    "D"
  ],
  "semitones_from_root": [
    0,
    4,
    7
  ],
  "intervals": [
    "perfect unison",
    "major third",
    "perfect fifth"
  ],
  "voicings": [
    {
      "id": "root",
      "label": "Root position",
      "notes": [
        "G4",
        "B4",
        "D5"
      ],
      "midi": [
        67,
        71,
        74
      ],
      "bass": "G4",
      "symbol": "G",
      "keyboard_highlights": [
        {
          "midi": 67,
          "spelling": "G4"
        },
        {
          "midi": 71,
          "spelling": "B4"
        },
        {
          "midi": 74,
          "spelling": "D5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          67,
          71,
          74
        ],
        "ascending_midi": [
          67,
          71,
          74
        ],
        "descending_midi": [
          74,
          71,
          67
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "first",
      "label": "First inversion",
      "notes": [
        "B4",
        "D5",
        "G5"
      ],
      "midi": [
        71,
        74,
        79
      ],
      "bass": "B4",
      "symbol": "G/B",
      "keyboard_highlights": [
        {
          "midi": 71,
          "spelling": "B4"
        },
        {
          "midi": 74,
          "spelling": "D5"
        },
        {
          "midi": 79,
          "spelling": "G5"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          71,
          74,
          79
        ],
        "ascending_midi": [
          71,
          74,
          79
        ],
        "descending_midi": [
          79,
          74,
          71
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    },
    {
      "id": "second",
      "label": "Second inversion",
      "notes": [
        "D4",
        "G4",
        "B4"
      ],
      "midi": [
        62,
        67,
        71
      ],
      "bass": "D4",
      "symbol": "G/D",
      "keyboard_highlights": [
        {
          "midi": 62,
          "spelling": "D4"
        },
        {
          "midi": 67,
          "spelling": "G4"
        },
        {
          "midi": 71,
          "spelling": "B4"
        }
      ],
      "fingering": {
        "right": null,
        "left": null
      },
      "playback": {
        "simultaneous_midi": [
          62,
          67,
          71
        ],
        "ascending_midi": [
          62,
          67,
          71
        ],
        "descending_midi": [
          71,
          67,
          62
        ],
        "user_initiated": true,
        "audio_asset": null
      }
    }
  ],
  "default_voicing": "root",
  "derivation": {
    "status": "[推断] computed from independently verified chord formulas and written pitch registers",
    "source_ids": [
      "F-OMT",
      "E-TRIADS",
      "BN-PUGET-OCTAVES"
    ]
  },
  "assets": [
    {
      "path": "assets/chord-g-major.svg",
      "format": "SVG",
      "content": "three inversion keyboard diagrams"
    },
    {
      "path": "assets/chord-g-major.pdf",
      "format": "PDF",
      "pages": 1,
      "content": "three inversion keyboard diagrams",
      "visual_qa": "passed; every final PDF page rendered and inspected"
    }
  ],
  "related": [
    "/chords",
    "/guide/piano-chords",
    "/chords/by-key"
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P169 | content_and_data_prepared; implementation gates remain | 当前和弦的音名/键位/音程；原位和转位；可用时播放；清晰指法说明；相关查询链接 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-FINGER-g-major — fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-g-major — runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

来源：F-OMT, E-TRIADS, BN-PUGET-OCTAVES

## /chords/by-key

[已核实] 目标关键词：`chords of key`；模板 T08；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a supported key and get its complete chord set.

### 页面需回答的问题

- Which chords belong to this key?
- What do uppercase and lowercase numerals mean?
- Why can D minor use both A minor and A major?

### 英文页面内容

**Piano Chords by Key**

See all seven triads in C, G, D, E, A and F major, plus D minor.

#### Read the table by scale degree

Each row stacks alternate notes from the selected scale. In major, the resulting qualities are major, minor, minor, major, major, minor and diminished. Uppercase Roman numerals indicate major triads; lowercase indicate minor, with ° for diminished.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT, F-MAJOR。 

#### Keep minor forms explicit

The D minor table starts with natural minor: D E F G A B-flat C. It therefore includes A minor. The separate raised-leading-tone options use C-sharp, producing A major and C-sharp diminished; do not silently replace the natural-minor row.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-MINOR, F-OMT。 

#### Try a key-specific result

In E major, I–IV–V is E–A–B. Read the complete notes in each row before playing: E–G-sharp–B, A–C-sharp–E, then B–D-sharp–F-sharp. In F major, remember B-flat in the scale and its derived chords.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-MAJOR。 

### 结构化数据

```json
{
  "keys": [
    {
      "key": "C major",
      "scale": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "B"
      ],
      "basis": "major",
      "chords": [
        {
          "degree": 1,
          "roman": "I",
          "symbol": "C",
          "quality": "major",
          "notes": [
            "C",
            "E",
            "G"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "C4",
            "E4",
            "G4"
          ],
          "fingering": null
        },
        {
          "degree": 2,
          "roman": "ii",
          "symbol": "Dm",
          "quality": "minor",
          "notes": [
            "D",
            "F",
            "A"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "D4",
            "F4",
            "A4"
          ],
          "fingering": null
        },
        {
          "degree": 3,
          "roman": "iii",
          "symbol": "Em",
          "quality": "minor",
          "notes": [
            "E",
            "G",
            "B"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "E4",
            "G4",
            "B4"
          ],
          "fingering": null
        },
        {
          "degree": 4,
          "roman": "IV",
          "symbol": "F",
          "quality": "major",
          "notes": [
            "F",
            "A",
            "C"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "F4",
            "A4",
            "C5"
          ],
          "fingering": null
        },
        {
          "degree": 5,
          "roman": "V",
          "symbol": "G",
          "quality": "major",
          "notes": [
            "G",
            "B",
            "D"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "G4",
            "B4",
            "D5"
          ],
          "fingering": null
        },
        {
          "degree": 6,
          "roman": "vi",
          "symbol": "Am",
          "quality": "minor",
          "notes": [
            "A",
            "C",
            "E"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "A4",
            "C5",
            "E5"
          ],
          "fingering": null
        },
        {
          "degree": 7,
          "roman": "vii°",
          "symbol": "Bdim",
          "quality": "diminished",
          "notes": [
            "B",
            "D",
            "F"
          ],
          "semitones_from_root": [
            0,
            3,
            6
          ],
          "reference_voicing": [
            "B4",
            "D5",
            "F5"
          ],
          "fingering": null
        }
      ],
      "evidence_status": "[推断] explicit stacking of scale degrees 1,3,5; formula crosscheck passed",
      "source_ids": [
        "F-OMT",
        "F-MAJOR",
        "AM-THEORY"
      ]
    },
    {
      "key": "G major",
      "scale": [
        "G",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F#"
      ],
      "basis": "major",
      "chords": [
        {
          "degree": 1,
          "roman": "I",
          "symbol": "G",
          "quality": "major",
          "notes": [
            "G",
            "B",
            "D"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "G4",
            "B4",
            "D5"
          ],
          "fingering": null
        },
        {
          "degree": 2,
          "roman": "ii",
          "symbol": "Am",
          "quality": "minor",
          "notes": [
            "A",
            "C",
            "E"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "A4",
            "C5",
            "E5"
          ],
          "fingering": null
        },
        {
          "degree": 3,
          "roman": "iii",
          "symbol": "Bm",
          "quality": "minor",
          "notes": [
            "B",
            "D",
            "F#"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "B4",
            "D5",
            "F#5"
          ],
          "fingering": null
        },
        {
          "degree": 4,
          "roman": "IV",
          "symbol": "C",
          "quality": "major",
          "notes": [
            "C",
            "E",
            "G"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "C4",
            "E4",
            "G4"
          ],
          "fingering": null
        },
        {
          "degree": 5,
          "roman": "V",
          "symbol": "D",
          "quality": "major",
          "notes": [
            "D",
            "F#",
            "A"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "D4",
            "F#4",
            "A4"
          ],
          "fingering": null
        },
        {
          "degree": 6,
          "roman": "vi",
          "symbol": "Em",
          "quality": "minor",
          "notes": [
            "E",
            "G",
            "B"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "E4",
            "G4",
            "B4"
          ],
          "fingering": null
        },
        {
          "degree": 7,
          "roman": "vii°",
          "symbol": "F#dim",
          "quality": "diminished",
          "notes": [
            "F#",
            "A",
            "C"
          ],
          "semitones_from_root": [
            0,
            3,
            6
          ],
          "reference_voicing": [
            "F#4",
            "A4",
            "C5"
          ],
          "fingering": null
        }
      ],
      "evidence_status": "[推断] explicit stacking of scale degrees 1,3,5; formula crosscheck passed",
      "source_ids": [
        "F-OMT",
        "F-MAJOR",
        "AM-THEORY"
      ]
    },
    {
      "key": "D major",
      "scale": [
        "D",
        "E",
        "F#",
        "G",
        "A",
        "B",
        "C#"
      ],
      "basis": "major",
      "chords": [
        {
          "degree": 1,
          "roman": "I",
          "symbol": "D",
          "quality": "major",
          "notes": [
            "D",
            "F#",
            "A"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "D4",
            "F#4",
            "A4"
          ],
          "fingering": null
        },
        {
          "degree": 2,
          "roman": "ii",
          "symbol": "Em",
          "quality": "minor",
          "notes": [
            "E",
            "G",
            "B"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "E4",
            "G4",
            "B4"
          ],
          "fingering": null
        },
        {
          "degree": 3,
          "roman": "iii",
          "symbol": "F#m",
          "quality": "minor",
          "notes": [
            "F#",
            "A",
            "C#"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "F#4",
            "A4",
            "C#5"
          ],
          "fingering": null
        },
        {
          "degree": 4,
          "roman": "IV",
          "symbol": "G",
          "quality": "major",
          "notes": [
            "G",
            "B",
            "D"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "G4",
            "B4",
            "D5"
          ],
          "fingering": null
        },
        {
          "degree": 5,
          "roman": "V",
          "symbol": "A",
          "quality": "major",
          "notes": [
            "A",
            "C#",
            "E"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "A4",
            "C#5",
            "E5"
          ],
          "fingering": null
        },
        {
          "degree": 6,
          "roman": "vi",
          "symbol": "Bm",
          "quality": "minor",
          "notes": [
            "B",
            "D",
            "F#"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "B4",
            "D5",
            "F#5"
          ],
          "fingering": null
        },
        {
          "degree": 7,
          "roman": "vii°",
          "symbol": "C#dim",
          "quality": "diminished",
          "notes": [
            "C#",
            "E",
            "G"
          ],
          "semitones_from_root": [
            0,
            3,
            6
          ],
          "reference_voicing": [
            "C#4",
            "E4",
            "G4"
          ],
          "fingering": null
        }
      ],
      "evidence_status": "[推断] explicit stacking of scale degrees 1,3,5; formula crosscheck passed",
      "source_ids": [
        "F-OMT",
        "F-MAJOR",
        "AM-THEORY"
      ]
    },
    {
      "key": "E major",
      "scale": [
        "E",
        "F#",
        "G#",
        "A",
        "B",
        "C#",
        "D#"
      ],
      "basis": "major",
      "chords": [
        {
          "degree": 1,
          "roman": "I",
          "symbol": "E",
          "quality": "major",
          "notes": [
            "E",
            "G#",
            "B"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "E4",
            "G#4",
            "B4"
          ],
          "fingering": null
        },
        {
          "degree": 2,
          "roman": "ii",
          "symbol": "F#m",
          "quality": "minor",
          "notes": [
            "F#",
            "A",
            "C#"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "F#4",
            "A4",
            "C#5"
          ],
          "fingering": null
        },
        {
          "degree": 3,
          "roman": "iii",
          "symbol": "G#m",
          "quality": "minor",
          "notes": [
            "G#",
            "B",
            "D#"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "G#4",
            "B4",
            "D#5"
          ],
          "fingering": null
        },
        {
          "degree": 4,
          "roman": "IV",
          "symbol": "A",
          "quality": "major",
          "notes": [
            "A",
            "C#",
            "E"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "A4",
            "C#5",
            "E5"
          ],
          "fingering": null
        },
        {
          "degree": 5,
          "roman": "V",
          "symbol": "B",
          "quality": "major",
          "notes": [
            "B",
            "D#",
            "F#"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "B4",
            "D#5",
            "F#5"
          ],
          "fingering": null
        },
        {
          "degree": 6,
          "roman": "vi",
          "symbol": "C#m",
          "quality": "minor",
          "notes": [
            "C#",
            "E",
            "G#"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "C#4",
            "E4",
            "G#4"
          ],
          "fingering": null
        },
        {
          "degree": 7,
          "roman": "vii°",
          "symbol": "D#dim",
          "quality": "diminished",
          "notes": [
            "D#",
            "F#",
            "A"
          ],
          "semitones_from_root": [
            0,
            3,
            6
          ],
          "reference_voicing": [
            "D#4",
            "F#4",
            "A4"
          ],
          "fingering": null
        }
      ],
      "evidence_status": "[推断] explicit stacking of scale degrees 1,3,5; formula crosscheck passed",
      "source_ids": [
        "F-OMT",
        "F-MAJOR",
        "AM-THEORY"
      ]
    },
    {
      "key": "A major",
      "scale": [
        "A",
        "B",
        "C#",
        "D",
        "E",
        "F#",
        "G#"
      ],
      "basis": "major",
      "chords": [
        {
          "degree": 1,
          "roman": "I",
          "symbol": "A",
          "quality": "major",
          "notes": [
            "A",
            "C#",
            "E"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "A4",
            "C#5",
            "E5"
          ],
          "fingering": null
        },
        {
          "degree": 2,
          "roman": "ii",
          "symbol": "Bm",
          "quality": "minor",
          "notes": [
            "B",
            "D",
            "F#"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "B4",
            "D5",
            "F#5"
          ],
          "fingering": null
        },
        {
          "degree": 3,
          "roman": "iii",
          "symbol": "C#m",
          "quality": "minor",
          "notes": [
            "C#",
            "E",
            "G#"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "C#4",
            "E4",
            "G#4"
          ],
          "fingering": null
        },
        {
          "degree": 4,
          "roman": "IV",
          "symbol": "D",
          "quality": "major",
          "notes": [
            "D",
            "F#",
            "A"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "D4",
            "F#4",
            "A4"
          ],
          "fingering": null
        },
        {
          "degree": 5,
          "roman": "V",
          "symbol": "E",
          "quality": "major",
          "notes": [
            "E",
            "G#",
            "B"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "E4",
            "G#4",
            "B4"
          ],
          "fingering": null
        },
        {
          "degree": 6,
          "roman": "vi",
          "symbol": "F#m",
          "quality": "minor",
          "notes": [
            "F#",
            "A",
            "C#"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "F#4",
            "A4",
            "C#5"
          ],
          "fingering": null
        },
        {
          "degree": 7,
          "roman": "vii°",
          "symbol": "G#dim",
          "quality": "diminished",
          "notes": [
            "G#",
            "B",
            "D"
          ],
          "semitones_from_root": [
            0,
            3,
            6
          ],
          "reference_voicing": [
            "G#4",
            "B4",
            "D5"
          ],
          "fingering": null
        }
      ],
      "evidence_status": "[推断] explicit stacking of scale degrees 1,3,5; formula crosscheck passed",
      "source_ids": [
        "F-OMT",
        "F-MAJOR",
        "AM-THEORY"
      ]
    },
    {
      "key": "F major",
      "scale": [
        "F",
        "G",
        "A",
        "Bb",
        "C",
        "D",
        "E"
      ],
      "basis": "major",
      "chords": [
        {
          "degree": 1,
          "roman": "I",
          "symbol": "F",
          "quality": "major",
          "notes": [
            "F",
            "A",
            "C"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "F4",
            "A4",
            "C5"
          ],
          "fingering": null
        },
        {
          "degree": 2,
          "roman": "ii",
          "symbol": "Gm",
          "quality": "minor",
          "notes": [
            "G",
            "Bb",
            "D"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "G4",
            "Bb4",
            "D5"
          ],
          "fingering": null
        },
        {
          "degree": 3,
          "roman": "iii",
          "symbol": "Am",
          "quality": "minor",
          "notes": [
            "A",
            "C",
            "E"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "A4",
            "C5",
            "E5"
          ],
          "fingering": null
        },
        {
          "degree": 4,
          "roman": "IV",
          "symbol": "Bb",
          "quality": "major",
          "notes": [
            "Bb",
            "D",
            "F"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "Bb4",
            "D5",
            "F5"
          ],
          "fingering": null
        },
        {
          "degree": 5,
          "roman": "V",
          "symbol": "C",
          "quality": "major",
          "notes": [
            "C",
            "E",
            "G"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "C4",
            "E4",
            "G4"
          ],
          "fingering": null
        },
        {
          "degree": 6,
          "roman": "vi",
          "symbol": "Dm",
          "quality": "minor",
          "notes": [
            "D",
            "F",
            "A"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "D4",
            "F4",
            "A4"
          ],
          "fingering": null
        },
        {
          "degree": 7,
          "roman": "vii°",
          "symbol": "Edim",
          "quality": "diminished",
          "notes": [
            "E",
            "G",
            "Bb"
          ],
          "semitones_from_root": [
            0,
            3,
            6
          ],
          "reference_voicing": [
            "E4",
            "G4",
            "Bb4"
          ],
          "fingering": null
        }
      ],
      "evidence_status": "[推断] explicit stacking of scale degrees 1,3,5; formula crosscheck passed",
      "source_ids": [
        "F-OMT",
        "F-MAJOR",
        "AM-THEORY"
      ]
    },
    {
      "key": "D minor",
      "scale": [
        "D",
        "E",
        "F",
        "G",
        "A",
        "Bb",
        "C"
      ],
      "basis": "natural minor",
      "chords": [
        {
          "degree": 1,
          "roman": "i",
          "symbol": "Dm",
          "quality": "minor",
          "notes": [
            "D",
            "F",
            "A"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "D4",
            "F4",
            "A4"
          ],
          "fingering": null
        },
        {
          "degree": 2,
          "roman": "ii°",
          "symbol": "Edim",
          "quality": "diminished",
          "notes": [
            "E",
            "G",
            "Bb"
          ],
          "semitones_from_root": [
            0,
            3,
            6
          ],
          "reference_voicing": [
            "E4",
            "G4",
            "Bb4"
          ],
          "fingering": null
        },
        {
          "degree": 3,
          "roman": "III",
          "symbol": "F",
          "quality": "major",
          "notes": [
            "F",
            "A",
            "C"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "F4",
            "A4",
            "C5"
          ],
          "fingering": null
        },
        {
          "degree": 4,
          "roman": "iv",
          "symbol": "Gm",
          "quality": "minor",
          "notes": [
            "G",
            "Bb",
            "D"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "G4",
            "Bb4",
            "D5"
          ],
          "fingering": null
        },
        {
          "degree": 5,
          "roman": "v",
          "symbol": "Am",
          "quality": "minor",
          "notes": [
            "A",
            "C",
            "E"
          ],
          "semitones_from_root": [
            0,
            3,
            7
          ],
          "reference_voicing": [
            "A4",
            "C5",
            "E5"
          ],
          "fingering": null
        },
        {
          "degree": 6,
          "roman": "VI",
          "symbol": "Bb",
          "quality": "major",
          "notes": [
            "Bb",
            "D",
            "F"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "Bb4",
            "D5",
            "F5"
          ],
          "fingering": null
        },
        {
          "degree": 7,
          "roman": "VII",
          "symbol": "C",
          "quality": "major",
          "notes": [
            "C",
            "E",
            "G"
          ],
          "semitones_from_root": [
            0,
            4,
            7
          ],
          "reference_voicing": [
            "C4",
            "E4",
            "G4"
          ],
          "fingering": null
        }
      ],
      "evidence_status": "[推断] explicit stacking of scale degrees 1,3,5; formula crosscheck passed",
      "source_ids": [
        "F-OMT",
        "F-MINOR",
        "AM-THEORY"
      ],
      "raised_leading_tone_options": [
        {
          "roman": "V",
          "symbol": "A",
          "notes": [
            "A",
            "C#",
            "E"
          ],
          "change": "C becomes C-sharp"
        },
        {
          "roman": "vii°",
          "symbol": "C#dim",
          "notes": [
            "C#",
            "E",
            "G"
          ],
          "change": "root uses raised seventh C-sharp"
        }
      ]
    }
  ],
  "supported_keys": [
    "C major",
    "G major",
    "D major",
    "E major",
    "A major",
    "F major",
    "D minor"
  ],
  "default_key": "C major",
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P152 | content_and_data_prepared; implementation gates remain | 有内容的调性选择器与各级和弦表；支持已有G/D/C/E/A/F及D minor任务 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P156 | content_and_data_prepared; implementation gates remain | 查G大调各级和弦；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P157 | content_and_data_prepared; implementation gates remain | 查D大调各级和弦；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P159 | content_and_data_prepared; implementation gates remain | 查C大调各级和弦；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P160 | content_and_data_prepared; implementation gates remain | 查E大调各级和弦；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P161 | content_and_data_prepared; implementation gates remain | 查询A大调和弦集合；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P164 | content_and_data_prepared; implementation gates remain | 查F大调各级和弦；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P165 | content_and_data_prepared; implementation gates remain | 查D小调各级和弦；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-KEY-UI — selector and professional review：All seven key datasets exist; interactive rendering and specialist review remain.；解决：Verify every selector result and retain the explicit minor-form distinction.

来源：F-OMT, F-MAJOR, F-MINOR, AM-THEORY

## /chords/finder

[已核实] 目标关键词：`chord finder piano`；模板 T09；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Identify candidate chords from notes rather than looking up a known name.

### 页面需回答的问题

- Can one group of notes have multiple names?
- Does the lowest note determine the root?
- What if the input lacks a third?

### 英文页面内容

**Piano Chord Finder**

Choose played notes and compare possible names, including the bass note.

#### Enter what you actually play

Select the notes and, if known, the lowest sounding note. Repeated notes in different octaves do not add new pitch classes, but the bass and spacing still matter. E–G–C with E lowest can be C/E: a C major chord in first inversion.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT。 

#### Compare candidates

C, E, G and A can form C6 or Am7. The same keys alone do not establish one harmonic meaning. Read the bass and surrounding chords before choosing a label. The prepared examples display both interpretations where appropriate.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-CHORDS。 

#### An incomplete answer can be useful

C and G contain no third, so this input does not decide between a C major and C minor triad. If a collection falls outside the supported vocabulary, keep the note list visible and show that no supported match has been confirmed.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-OMT。 

### 结构化数据

```json
{
  "input_modes": [
    "pitch names with octaves",
    "optional bass note"
  ],
  "examples": [
    {
      "input": [
        "C4",
        "E4",
        "G4"
      ],
      "bass": "C4",
      "candidates": [
        {
          "name": "C major",
          "symbol": "C",
          "root": "C"
        }
      ],
      "reason": "Major triad in root position.",
      "input_midi": [
        60,
        64,
        67
      ],
      "source_ids": [
        "F-OMT",
        "F-CHORDS"
      ],
      "evidence_status": "[推断] example evaluated against verified formulas"
    },
    {
      "input": [
        "E3",
        "G3",
        "C4"
      ],
      "bass": "E3",
      "candidates": [
        {
          "name": "C major, first inversion",
          "symbol": "C/E",
          "root": "C"
        }
      ],
      "reason": "E is the bass; the root remains C.",
      "input_midi": [
        52,
        55,
        60
      ],
      "source_ids": [
        "F-OMT",
        "F-CHORDS"
      ],
      "evidence_status": "[推断] example evaluated against verified formulas"
    },
    {
      "input": [
        "C4",
        "Eb4",
        "G4"
      ],
      "bass": "C4",
      "candidates": [
        {
          "name": "C minor",
          "symbol": "Cm",
          "root": "C"
        }
      ],
      "reason": "The minor third is E-flat.",
      "input_midi": [
        60,
        63,
        67
      ],
      "source_ids": [
        "F-OMT",
        "F-CHORDS"
      ],
      "evidence_status": "[推断] example evaluated against verified formulas"
    },
    {
      "input": [
        "C4",
        "E4",
        "G4",
        "A4"
      ],
      "bass": null,
      "candidates": [
        {
          "name": "C major sixth",
          "symbol": "C6",
          "root": "C"
        },
        {
          "name": "A minor seventh",
          "symbol": "Am7",
          "root": "A"
        }
      ],
      "reason": "Same pitch-class collection; bass and context can favour one interpretation.",
      "input_midi": [
        60,
        64,
        67,
        69
      ],
      "source_ids": [
        "F-OMT",
        "F-CHORDS"
      ],
      "evidence_status": "[推断] example evaluated against verified formulas"
    },
    {
      "input": [
        "A2",
        "C4",
        "E4",
        "G4"
      ],
      "bass": "A2",
      "candidates": [
        {
          "name": "A minor seventh",
          "symbol": "Am7",
          "root": "A"
        },
        {
          "name": "C major sixth over A",
          "symbol": "C6/A",
          "root": "C"
        }
      ],
      "reason": "A bass favours Am7 in many contexts, but context is not supplied.",
      "input_midi": [
        45,
        60,
        64,
        67
      ],
      "source_ids": [
        "F-OMT",
        "F-CHORDS"
      ],
      "evidence_status": "[推断] example evaluated against verified formulas"
    },
    {
      "input": [
        "C4",
        "G4"
      ],
      "bass": "C4",
      "candidates": [],
      "reason": "An open fifth has no third; major/minor triad quality cannot be determined.",
      "input_midi": [
        60,
        67
      ],
      "source_ids": [
        "F-OMT",
        "F-CHORDS"
      ],
      "evidence_status": "[推断] example evaluated against verified formulas"
    },
    {
      "input": [
        "C4",
        "C5",
        "E5",
        "G5"
      ],
      "bass": "C4",
      "candidates": [
        {
          "name": "C major",
          "symbol": "C",
          "root": "C"
        }
      ],
      "reason": "Duplicated C changes spacing, not the distinct chord tones.",
      "input_midi": [
        60,
        72,
        76,
        79
      ],
      "source_ids": [
        "F-OMT",
        "F-CHORDS"
      ],
      "evidence_status": "[推断] example evaluated against verified formulas"
    },
    {
      "input": [
        "C4",
        "C#4",
        "D4"
      ],
      "bass": "C4",
      "candidates": [],
      "reason": "No match in the prepared basic-chord vocabulary; do not invent a unique label.",
      "input_midi": [
        60,
        61,
        62
      ],
      "source_ids": [
        "F-OMT",
        "F-CHORDS"
      ],
      "evidence_status": "[推断] example evaluated against verified formulas"
    }
  ],
  "normalization": {
    "deduplicate_pitch_classes_for_matching": true,
    "retain_original_spelling_and_register": true,
    "bass_must_be_selected_note": true
  },
  "result_labels": {
    "multiple": "Possible chord names",
    "none": "No supported match confirmed",
    "incomplete": "More context needed"
  },
  "runtime_engine": null,
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P153 | content_and_data_prepared; implementation gates remain | 选择音符；列出可能命名、低音与拼写说明 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-FINDER-ENGINE — classification scope：Verified examples are prepared; a general recognition engine and exhaustive vocabulary are not implemented or validated.；解决：Implement only reviewed vocabulary, reproduce these examples and show unsupported/ambiguous states.

来源：F-OMT, F-CHORDS

## /chord-progressions

[已核实] 目标关键词：`piano chord progressions`；模板 T10；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a progression, inspect every chord and try an original realization.

### 页面需回答的问题

- What is a progression?
- What are the actual chords in C, E or A?
- Can a progression guarantee a happy or beautiful sound?

### 英文页面内容

**Piano Chord Progressions**

Try complete examples in C, E and A major and compare how they return or repeat.

#### Hear the sequence

A chord progression is an ordered sequence of harmonies. I–V–vi–IV becomes C–G–Am–F in C major, E–B–C-sharp minor–A in E major, and A–E–F-sharp minor–D in A major. The original examples below give a concrete register and four counts per chord.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-POP, F-MAJOR。 

#### Compare three patterns

The collection includes I–V–vi–IV, I–vi–IV–V, and a four-bar I–IV–V–I practice example. Try the first two as loops, then compare the last pattern’s final return to I. The printable includes all three keys and every chord’s notes.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：F-POP, F-FUNCTION。 

#### Explore an effect

For a “beautiful” starting point, try the I–vi–IV–V example slowly, sounding chord tones in sequence. For a “happy” starting point, try the I–IV–V–I example with light, even pulses. These are subjective playing suggestions: neither label is a property guaranteed by the chord order.

[已核实] source formulas; [推断] original voicings/editorial examples 来源：原创编辑建议。 

### 结构化数据

```json
{
  "progressions": [
    {
      "id": "pop-loop-c-major",
      "key": "C major",
      "pattern": [
        "I",
        "V",
        "vi",
        "IV"
      ],
      "title": "Common four-chord loop",
      "bars": [
        {
          "bar": 1,
          "roman": "I",
          "symbol": "C",
          "notes": [
            "C3",
            "E3",
            "G3"
          ],
          "midi": [
            48,
            52,
            55
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 2,
          "roman": "V",
          "symbol": "G",
          "notes": [
            "G3",
            "B3",
            "D4"
          ],
          "midi": [
            55,
            59,
            62
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 3,
          "roman": "vi",
          "symbol": "Am",
          "notes": [
            "A3",
            "C4",
            "E4"
          ],
          "midi": [
            57,
            60,
            64
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 4,
          "roman": "IV",
          "symbol": "F",
          "notes": [
            "F3",
            "A3",
            "C4"
          ],
          "midi": [
            53,
            57,
            60
          ],
          "duration_quarters": 4,
          "fingering": null
        }
      ],
      "meter": "4/4",
      "tempo_bpm": null,
      "practice_goal": "Compare a repeating loop with a more decisive return to I.",
      "source_ids": [
        "F-POP",
        "F-OMT"
      ],
      "evidence_status": "[推断] original voicing/register/rhythm; sourced harmonic pattern",
      "mood_tags": [],
      "mood_basis": "subjective editorial starting point; tempo, voicing, articulation and listener alter the effect",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference realization; distributable"
      }
    },
    {
      "id": "fifties-c-major",
      "key": "C major",
      "pattern": [
        "I",
        "vi",
        "IV",
        "V"
      ],
      "title": "I–vi–IV–V",
      "bars": [
        {
          "bar": 1,
          "roman": "I",
          "symbol": "C",
          "notes": [
            "C3",
            "E3",
            "G3"
          ],
          "midi": [
            48,
            52,
            55
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 2,
          "roman": "vi",
          "symbol": "Am",
          "notes": [
            "A3",
            "C4",
            "E4"
          ],
          "midi": [
            57,
            60,
            64
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 3,
          "roman": "IV",
          "symbol": "F",
          "notes": [
            "F3",
            "A3",
            "C4"
          ],
          "midi": [
            53,
            57,
            60
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 4,
          "roman": "V",
          "symbol": "G",
          "notes": [
            "G3",
            "B3",
            "D4"
          ],
          "midi": [
            55,
            59,
            62
          ],
          "duration_quarters": 4,
          "fingering": null
        }
      ],
      "meter": "4/4",
      "tempo_bpm": null,
      "practice_goal": "Try one chord per bar, then return to I after the final V.",
      "source_ids": [
        "F-FUNCTION",
        "F-OMT"
      ],
      "evidence_status": "[推断] original voicing/register/rhythm; sourced harmonic pattern",
      "mood_tags": [
        "beautiful"
      ],
      "mood_basis": "subjective editorial starting point; tempo, voicing, articulation and listener alter the effect",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference realization; distributable"
      }
    },
    {
      "id": "return-home-c-major",
      "key": "C major",
      "pattern": [
        "I",
        "IV",
        "V",
        "I"
      ],
      "title": "Clear return to the tonic",
      "bars": [
        {
          "bar": 1,
          "roman": "I",
          "symbol": "C",
          "notes": [
            "C3",
            "E3",
            "G3"
          ],
          "midi": [
            48,
            52,
            55
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 2,
          "roman": "IV",
          "symbol": "F",
          "notes": [
            "F3",
            "A3",
            "C4"
          ],
          "midi": [
            53,
            57,
            60
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 3,
          "roman": "V",
          "symbol": "G",
          "notes": [
            "G3",
            "B3",
            "D4"
          ],
          "midi": [
            55,
            59,
            62
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 4,
          "roman": "I",
          "symbol": "C",
          "notes": [
            "C3",
            "E3",
            "G3"
          ],
          "midi": [
            48,
            52,
            55
          ],
          "duration_quarters": 4,
          "fingering": null
        }
      ],
      "meter": "4/4",
      "tempo_bpm": null,
      "practice_goal": "An original four-bar practice realization, with I in the final bar.",
      "source_ids": [
        "F-FUNCTION",
        "F-MAJOR",
        "F-OMT"
      ],
      "evidence_status": "[推断] original voicing/register/rhythm; sourced harmonic pattern",
      "mood_tags": [
        "happy"
      ],
      "mood_basis": "subjective editorial starting point; tempo, voicing, articulation and listener alter the effect",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference realization; distributable"
      }
    },
    {
      "id": "pop-loop-e-major",
      "key": "E major",
      "pattern": [
        "I",
        "V",
        "vi",
        "IV"
      ],
      "title": "Common four-chord loop",
      "bars": [
        {
          "bar": 1,
          "roman": "I",
          "symbol": "E",
          "notes": [
            "E3",
            "G#3",
            "B3"
          ],
          "midi": [
            52,
            56,
            59
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 2,
          "roman": "V",
          "symbol": "B",
          "notes": [
            "B3",
            "D#4",
            "F#4"
          ],
          "midi": [
            59,
            63,
            66
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 3,
          "roman": "vi",
          "symbol": "C#m",
          "notes": [
            "C#3",
            "E3",
            "G#3"
          ],
          "midi": [
            49,
            52,
            56
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 4,
          "roman": "IV",
          "symbol": "A",
          "notes": [
            "A3",
            "C#4",
            "E4"
          ],
          "midi": [
            57,
            61,
            64
          ],
          "duration_quarters": 4,
          "fingering": null
        }
      ],
      "meter": "4/4",
      "tempo_bpm": null,
      "practice_goal": "Compare a repeating loop with a more decisive return to I.",
      "source_ids": [
        "F-POP",
        "F-OMT"
      ],
      "evidence_status": "[推断] original voicing/register/rhythm; sourced harmonic pattern",
      "mood_tags": [],
      "mood_basis": "subjective editorial starting point; tempo, voicing, articulation and listener alter the effect",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference realization; distributable"
      }
    },
    {
      "id": "fifties-e-major",
      "key": "E major",
      "pattern": [
        "I",
        "vi",
        "IV",
        "V"
      ],
      "title": "I–vi–IV–V",
      "bars": [
        {
          "bar": 1,
          "roman": "I",
          "symbol": "E",
          "notes": [
            "E3",
            "G#3",
            "B3"
          ],
          "midi": [
            52,
            56,
            59
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 2,
          "roman": "vi",
          "symbol": "C#m",
          "notes": [
            "C#3",
            "E3",
            "G#3"
          ],
          "midi": [
            49,
            52,
            56
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 3,
          "roman": "IV",
          "symbol": "A",
          "notes": [
            "A3",
            "C#4",
            "E4"
          ],
          "midi": [
            57,
            61,
            64
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 4,
          "roman": "V",
          "symbol": "B",
          "notes": [
            "B3",
            "D#4",
            "F#4"
          ],
          "midi": [
            59,
            63,
            66
          ],
          "duration_quarters": 4,
          "fingering": null
        }
      ],
      "meter": "4/4",
      "tempo_bpm": null,
      "practice_goal": "Try one chord per bar, then return to I after the final V.",
      "source_ids": [
        "F-FUNCTION",
        "F-OMT"
      ],
      "evidence_status": "[推断] original voicing/register/rhythm; sourced harmonic pattern",
      "mood_tags": [
        "beautiful"
      ],
      "mood_basis": "subjective editorial starting point; tempo, voicing, articulation and listener alter the effect",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference realization; distributable"
      }
    },
    {
      "id": "return-home-e-major",
      "key": "E major",
      "pattern": [
        "I",
        "IV",
        "V",
        "I"
      ],
      "title": "Clear return to the tonic",
      "bars": [
        {
          "bar": 1,
          "roman": "I",
          "symbol": "E",
          "notes": [
            "E3",
            "G#3",
            "B3"
          ],
          "midi": [
            52,
            56,
            59
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 2,
          "roman": "IV",
          "symbol": "A",
          "notes": [
            "A3",
            "C#4",
            "E4"
          ],
          "midi": [
            57,
            61,
            64
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 3,
          "roman": "V",
          "symbol": "B",
          "notes": [
            "B3",
            "D#4",
            "F#4"
          ],
          "midi": [
            59,
            63,
            66
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 4,
          "roman": "I",
          "symbol": "E",
          "notes": [
            "E3",
            "G#3",
            "B3"
          ],
          "midi": [
            52,
            56,
            59
          ],
          "duration_quarters": 4,
          "fingering": null
        }
      ],
      "meter": "4/4",
      "tempo_bpm": null,
      "practice_goal": "An original four-bar practice realization, with I in the final bar.",
      "source_ids": [
        "F-FUNCTION",
        "F-MAJOR",
        "F-OMT"
      ],
      "evidence_status": "[推断] original voicing/register/rhythm; sourced harmonic pattern",
      "mood_tags": [
        "happy"
      ],
      "mood_basis": "subjective editorial starting point; tempo, voicing, articulation and listener alter the effect",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference realization; distributable"
      }
    },
    {
      "id": "pop-loop-a-major",
      "key": "A major",
      "pattern": [
        "I",
        "V",
        "vi",
        "IV"
      ],
      "title": "Common four-chord loop",
      "bars": [
        {
          "bar": 1,
          "roman": "I",
          "symbol": "A",
          "notes": [
            "A3",
            "C#4",
            "E4"
          ],
          "midi": [
            57,
            61,
            64
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 2,
          "roman": "V",
          "symbol": "E",
          "notes": [
            "E3",
            "G#3",
            "B3"
          ],
          "midi": [
            52,
            56,
            59
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 3,
          "roman": "vi",
          "symbol": "F#m",
          "notes": [
            "F#3",
            "A3",
            "C#4"
          ],
          "midi": [
            54,
            57,
            61
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 4,
          "roman": "IV",
          "symbol": "D",
          "notes": [
            "D3",
            "F#3",
            "A3"
          ],
          "midi": [
            50,
            54,
            57
          ],
          "duration_quarters": 4,
          "fingering": null
        }
      ],
      "meter": "4/4",
      "tempo_bpm": null,
      "practice_goal": "Compare a repeating loop with a more decisive return to I.",
      "source_ids": [
        "F-POP",
        "F-OMT"
      ],
      "evidence_status": "[推断] original voicing/register/rhythm; sourced harmonic pattern",
      "mood_tags": [],
      "mood_basis": "subjective editorial starting point; tempo, voicing, articulation and listener alter the effect",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference realization; distributable"
      }
    },
    {
      "id": "fifties-a-major",
      "key": "A major",
      "pattern": [
        "I",
        "vi",
        "IV",
        "V"
      ],
      "title": "I–vi–IV–V",
      "bars": [
        {
          "bar": 1,
          "roman": "I",
          "symbol": "A",
          "notes": [
            "A3",
            "C#4",
            "E4"
          ],
          "midi": [
            57,
            61,
            64
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 2,
          "roman": "vi",
          "symbol": "F#m",
          "notes": [
            "F#3",
            "A3",
            "C#4"
          ],
          "midi": [
            54,
            57,
            61
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 3,
          "roman": "IV",
          "symbol": "D",
          "notes": [
            "D3",
            "F#3",
            "A3"
          ],
          "midi": [
            50,
            54,
            57
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 4,
          "roman": "V",
          "symbol": "E",
          "notes": [
            "E3",
            "G#3",
            "B3"
          ],
          "midi": [
            52,
            56,
            59
          ],
          "duration_quarters": 4,
          "fingering": null
        }
      ],
      "meter": "4/4",
      "tempo_bpm": null,
      "practice_goal": "Try one chord per bar, then return to I after the final V.",
      "source_ids": [
        "F-FUNCTION",
        "F-OMT"
      ],
      "evidence_status": "[推断] original voicing/register/rhythm; sourced harmonic pattern",
      "mood_tags": [
        "beautiful"
      ],
      "mood_basis": "subjective editorial starting point; tempo, voicing, articulation and listener alter the effect",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference realization; distributable"
      }
    },
    {
      "id": "return-home-a-major",
      "key": "A major",
      "pattern": [
        "I",
        "IV",
        "V",
        "I"
      ],
      "title": "Clear return to the tonic",
      "bars": [
        {
          "bar": 1,
          "roman": "I",
          "symbol": "A",
          "notes": [
            "A3",
            "C#4",
            "E4"
          ],
          "midi": [
            57,
            61,
            64
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 2,
          "roman": "IV",
          "symbol": "D",
          "notes": [
            "D3",
            "F#3",
            "A3"
          ],
          "midi": [
            50,
            54,
            57
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 3,
          "roman": "V",
          "symbol": "E",
          "notes": [
            "E3",
            "G#3",
            "B3"
          ],
          "midi": [
            52,
            56,
            59
          ],
          "duration_quarters": 4,
          "fingering": null
        },
        {
          "bar": 4,
          "roman": "I",
          "symbol": "A",
          "notes": [
            "A3",
            "C#4",
            "E4"
          ],
          "midi": [
            57,
            61,
            64
          ],
          "duration_quarters": 4,
          "fingering": null
        }
      ],
      "meter": "4/4",
      "tempo_bpm": null,
      "practice_goal": "An original four-bar practice realization, with I in the final bar.",
      "source_ids": [
        "F-FUNCTION",
        "F-MAJOR",
        "F-OMT"
      ],
      "evidence_status": "[推断] original voicing/register/rhythm; sourced harmonic pattern",
      "mood_tags": [
        "happy"
      ],
      "mood_basis": "subjective editorial starting point; tempo, voicing, articulation and listener alter the effect",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference realization; distributable"
      }
    }
  ],
  "default_key": "C major",
  "effect_tags": [
    "beautiful",
    "happy"
  ],
  "tag_policy": "subjective editorial suggestion; never a factual emotional guarantee",
  "assets": [
    {
      "path": "assets/chord-progressions-c-e-a.pdf",
      "format": "PDF",
      "pages": 3,
      "visual_qa": "passed; every final PDF page rendered and inspected"
    }
  ],
  "related": [
    "/guide/piano-chords",
    "/chords/by-key"
  ],
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P172 | content_and_data_prepared; implementation gates remain | 常见和弦走向集合；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P173 | content_and_data_prepared; implementation gates remain | 常见走向列表；C/E/A调转写选择；优美/愉快效果标签；含义与使用说明；打印 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P174 | content_and_data_prepared; implementation gates remain | C大调和弦走向；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P175 | content_and_data_prepared; implementation gates remain | E调常用和弦走向；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P176 | content_and_data_prepared; implementation gates remain | A大调和弦走向；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P177 | content_and_data_prepared; implementation gates remain | 查询优美钢琴和弦走向；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P178 | content_and_data_prepared; implementation gates remain | 愉快情绪和弦走向；必须在该页提供实际结果，不只增加一个关键词。 — actual records below. | Runtime, print UI and professional release checks; see issues. |
| P237 | content_and_data_prepared; implementation gates remain | 说明走向是什么，附可试弹例子。 — actual records below. | Runtime, print UI and professional release checks; see issues. |

### 待确认

- F-PROGRESSION-REVIEW — voicing and interface：Original examples and printable data are prepared; performance review and key/effect selector integration remain.；解决：Check all nine realizations, labels and printed notes before release.

来源：F-POP, F-FUNCTION, F-MAJOR, F-OMT

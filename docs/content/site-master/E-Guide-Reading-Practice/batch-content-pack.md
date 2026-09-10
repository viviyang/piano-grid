# Batch E — Guide / Reading / Practice

[已核实] 共 14 页。基线字段原样保留，核查日期 2026-09-09。

证据标签为后台记录；英文文案在各模块 body 中。计算数据与编辑建议标 [推断]。待确认字段不供上线渲染。

## /guide

[已核实] 目标关键词：`how to play piano for beginners`；模板 T21；基线优先级：先做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Start playing with a short ordered lesson, then select the right guide.

### 页面需回答的问题

- Where do I start?
- What do I try at the keyboard?
- Is there a printable lesson?

### 英文页面内容

**Learn Piano: Your First Useful Steps**

Find a note, read a short pattern and choose your next practice task.

#### Start with three keys

Find a group of two black keys. The white key immediately to its left is C. On an 88-key piano, middle C is C4. Find C4, then the next two white keys to its right: D4 and E4. Use the keyboard chart if your instrument has a different range.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：BN-MUSICCA-NOTES, BN-PUGET-OCTAVES。 

#### Try a four-count pattern

Original first task: play C4 on count 1, D4 on count 2, then E4 for counts 3–4. Keep saying the counts while the last note lasts. This gives you one bar of our 4/4 example. Start with one hand and choose a comfortable pace.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-DURATION。 

#### Choose the next step

Read the same notes on the staff, then clap a rhythm before learning a short piece. The printable starter pack includes both-clef note examples, two sight-reading lines and two rhythm lines. For chord playing, begin with C–E–G and follow the chord guide.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-CHORD。 

### 结构化数据

```json
{
  "path": [
    {
      "step": 1,
      "task": "Locate C4 D4 E4",
      "url": "/keyboard-notes/chart"
    },
    {
      "step": 2,
      "task": "Read those notes",
      "url": "/guide/read-sheet-music"
    },
    {
      "step": 3,
      "task": "Clap four counts",
      "url": "/guide/note-values-and-rhythm"
    },
    {
      "step": 4,
      "task": "Learn a short phrase",
      "url": "/guide/learn-a-piano-song"
    }
  ],
  "first_example": {
    "number": 1,
    "events": [
      {
        "pitch": "C4",
        "kind": "note",
        "onset_quarters": 0,
        "duration_quarters": 1,
        "finger": null
      },
      {
        "pitch": "D4",
        "kind": "note",
        "onset_quarters": 1,
        "duration_quarters": 1,
        "finger": null
      },
      {
        "pitch": "E4",
        "kind": "note",
        "onset_quarters": 2,
        "duration_quarters": 2,
        "finger": null
      }
    ],
    "total_quarters": 4
  },
  "assets": [
    {
      "path": "assets/piano-starter-and-reading.pdf",
      "format": "PDF",
      "pages": 4,
      "access": "original printable download",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference material; distributable",
        "font": "Bravura OFL; license included"
      },
      "visual_qa": "passed; four pages rendered and inspected, final rhythm spacing corrected"
    }
  ],
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P226 | content_and_data_prepared; professional/implementation gates remain | 简明学习顺序；每步真实示例与相关资源；已完成时提供可打印入门材料 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P240 | content_and_data_prepared; professional/implementation gates remain | 真实可用的入门 PDF 才算承接 pdf 查询。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P255 | content_and_data_prepared; professional/implementation gates remain | 入门路径中有键盘乐理示例，不只是把该词放在导航里。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-REVIEW-guide — professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

来源：BN-MUSICCA-NOTES, BN-PUGET-OCTAVES, E-DURATION, E-CHORD

## /guide/read-sheet-music

[已核实] 目标关键词：`how to read sheet music piano`；模板 T22；基线优先级：先做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Decode a short score and identify notes in the correct register.

### 页面需回答的问题

- How do clefs map to keys?
- Where does FACE apply?
- What does two ledger lines below mean?

### 英文页面内容

**How to Read Piano Sheet Music**

Connect the clef, staff position, key and duration before you play.

#### Read in a useful order

Identify the clef first. Read the key signature and any accidental beside the note, then locate the note on a line or space. Finally read its duration. A higher position on a staff means a higher written note; alternating lines and spaces move through successive letter names.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：BN-OMT-CLEFS, BN-MUSICCA-STAFF, BN-MUSICCA-ACCIDENTALS。 

#### Use anchors, then count steps

In treble clef, the second line from the bottom is G4. In bass clef, the fourth line is F3. Middle C, C4, is on the first ledger line below treble or above bass. These two written positions represent the same piano key.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：BN-OMT-CLEFS, BN-MUSICCA-CLEFS。 

#### FACE has a specific job

F4–A4–C5–E5 names the four spaces inside the treble staff, from bottom to top. It does not name the bass spaces. For “two lines below,” first identify the clef: the second ledger line below treble is A3; below bass it is C2.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：BN-OMT-CLEFS, BN-PUGET-OCTAVES。 

#### Check yourself

Name the first ledger-line note below treble, then the next two staff positions upward. Answer: C4, D4, E4. Find them on the keyboard and play the first bar of Steps around middle C. The printable shows both the notation and an answer key.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：BN-OMT-CLEFS。 

### 结构化数据

```json
{
  "anchor_map": [
    {
      "clef": "treble",
      "pitch": "E4",
      "position": "bottom line"
    },
    {
      "clef": "treble",
      "pitch": "G4",
      "position": "second line"
    },
    {
      "clef": "treble",
      "pitch": "C4",
      "position": "first ledger line below"
    },
    {
      "clef": "treble",
      "pitch": "A3",
      "position": "second ledger line below"
    },
    {
      "clef": "bass",
      "pitch": "G2",
      "position": "bottom line"
    },
    {
      "clef": "bass",
      "pitch": "F3",
      "position": "fourth line"
    },
    {
      "clef": "bass",
      "pitch": "C4",
      "position": "first ledger line above"
    },
    {
      "clef": "bass",
      "pitch": "E2",
      "position": "first ledger line below"
    },
    {
      "clef": "bass",
      "pitch": "C2",
      "position": "second ledger line below"
    }
  ],
  "treble_spaces": [
    "F4",
    "A4",
    "C5",
    "E5"
  ],
  "bass_spaces": [
    "A2",
    "C3",
    "E3",
    "G3"
  ],
  "exercise": {
    "id": "E-SR1",
    "title": "Steps around middle C",
    "clef": "treble",
    "meter": "4/4",
    "key_signature": "no sharps or flats",
    "quarter_units_per_bar": 4,
    "bars": [
      {
        "number": 1,
        "events": [
          {
            "pitch": "C4",
            "kind": "note",
            "onset_quarters": 0,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "D4",
            "kind": "note",
            "onset_quarters": 1,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "E4",
            "kind": "note",
            "onset_quarters": 2,
            "duration_quarters": 2,
            "finger": null
          }
        ],
        "total_quarters": 4
      },
      {
        "number": 2,
        "events": [
          {
            "pitch": "E4",
            "kind": "note",
            "onset_quarters": 0,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "D4",
            "kind": "note",
            "onset_quarters": 1,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "C4",
            "kind": "note",
            "onset_quarters": 2,
            "duration_quarters": 2,
            "finger": null
          }
        ],
        "total_quarters": 4
      },
      {
        "number": 3,
        "events": [
          {
            "pitch": "D4",
            "kind": "note",
            "onset_quarters": 0,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "E4",
            "kind": "note",
            "onset_quarters": 1,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "F4",
            "kind": "note",
            "onset_quarters": 2,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "D4",
            "kind": "note",
            "onset_quarters": 3,
            "duration_quarters": 1,
            "finger": null
          }
        ],
        "total_quarters": 4
      },
      {
        "number": 4,
        "events": [
          {
            "pitch": "C4",
            "kind": "note",
            "onset_quarters": 0,
            "duration_quarters": 4,
            "finger": null
          }
        ],
        "total_quarters": 4
      }
    ],
    "goal": "One staff, C4–F4, steps and one third, quarter/half/whole notes; no simultaneous hands.",
    "difficulty": {
      "label": "introductory editorial exercise",
      "basis": "One staff, C4–F4, steps and one third, quarter/half/whole notes; no simultaneous hands.",
      "exam_grade": null
    },
    "tempo_bpm": null,
    "evidence_status": "[推断] original exercise; pitch/duration arithmetic checked",
    "source_ids": [
      "E-DURATION",
      "BN-OMT-CLEFS"
    ],
    "rights": {
      "edition_status": "official / authorized",
      "site_use": "original Piano Reference exercise; distributable"
    },
    "fingering_status": "not supplied; do not infer"
  },
  "assets": [
    {
      "path": "assets/piano-starter-and-reading.pdf",
      "format": "PDF",
      "pages": 4,
      "access": "original printable download",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference material; distributable",
        "font": "Bravura OFL; license included"
      },
      "visual_qa": "passed; four pages rendered and inspected, final rhythm spacing corrected"
    }
  ],
  "chart_url": "/keyboard-notes/chart",
  "diagram_pages": [
    1,
    2
  ],
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P218 | content_and_data_prepared; professional/implementation gates remain | 高低谱号与键盘对照；音符/加线示例；FACE与记忆方法；练习题；链接可操作的notes chart — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P228 | content_and_data_prepared; professional/implementation gates remain | 在识谱教程中提供记谱方法与实际图例。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P229 | content_and_data_prepared; professional/implementation gates remain | 简单音符的谱表和键位例子与练习。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P236 | content_and_data_prepared; professional/implementation gates remain | 核实 FACE 的适用范围并示例，不扩成万能记忆规则。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P248 | content_and_data_prepared; professional/implementation gates remain | 给出具体谱号、音区和加线例子，不猜用户指的哪一个音。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P249 | content_and_data_prepared; professional/implementation gates remain | 明确方法和练习例子，工具仅辅助查图。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-REVIEW-read-sheet-music — professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

来源：BN-OMT-CLEFS, BN-MUSICCA-CLEFS, BN-MUSICCA-STAFF, BN-MUSICCA-ACCIDENTALS, BN-PUGET-OCTAVES

## /guide/sight-reading

[已核实] 目标关键词：`sight reading piano tips for improvement`；模板 T22；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Try unfamiliar music in a continuous first reading.

### 页面需回答的问题

- How does sight-reading differ from decoding notes?
- What should I inspect first?
- Where are actual printable exercises?

### 英文页面内容

**Piano Sight-Reading Practice**

Preview a short unfamiliar line, keep the pulse and review one useful detail.

#### Prepare before the first attempt

Basic reading can stop at each symbol. In this sight-reading activity, aim to carry an unfamiliar short line through a steady pulse. Check the clef, starting note, range, meter and longest or shortest note values before playing. This is an editorial practice procedure, not an exam test.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-BOOK-SIGHT, E-DURATION。 

#### Use one attempt, then one observation

Count one empty bar and play Steps around middle C. Keep the beat through a mistake if you can. Afterwards, mark the bar that interrupted your pulse and study it separately. Once rehearsed, the line becomes reading practice; use a different line for another first attempt.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：原创编辑建议。 

#### Read rhythm without pitch

Clap E-R1 while speaking 1 2 3 4, including the rests. E-R2 adds eighth-note subdivisions. Preview the silent beats before starting. The two rhythm lines are printed separately from the melody so you can work on timing alone.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-DURATION, E-DOTS。 

### 结构化数据

```json
{
  "exercises": [
    {
      "id": "E-SR1",
      "title": "Steps around middle C",
      "clef": "treble",
      "meter": "4/4",
      "key_signature": "no sharps or flats",
      "quarter_units_per_bar": 4,
      "bars": [
        {
          "number": 1,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "D4",
              "kind": "note",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "E4",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 2,
          "events": [
            {
              "pitch": "E4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "D4",
              "kind": "note",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 3,
          "events": [
            {
              "pitch": "D4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "E4",
              "kind": "note",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "F4",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "D4",
              "kind": "note",
              "onset_quarters": 3,
              "duration_quarters": 1,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 4,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 4,
              "finger": null
            }
          ],
          "total_quarters": 4
        }
      ],
      "goal": "One staff, C4–F4, steps and one third, quarter/half/whole notes; no simultaneous hands.",
      "difficulty": {
        "label": "introductory editorial exercise",
        "basis": "One staff, C4–F4, steps and one third, quarter/half/whole notes; no simultaneous hands.",
        "exam_grade": null
      },
      "tempo_bpm": null,
      "evidence_status": "[推断] original exercise; pitch/duration arithmetic checked",
      "source_ids": [
        "E-DURATION",
        "BN-OMT-CLEFS"
      ],
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference exercise; distributable"
      },
      "fingering_status": "not supplied; do not infer"
    },
    {
      "id": "E-SR2",
      "title": "Read the bass staff",
      "clef": "bass",
      "meter": "4/4",
      "key_signature": "no sharps or flats",
      "quarter_units_per_bar": 4,
      "bars": [
        {
          "number": 1,
          "events": [
            {
              "pitch": "C3",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 2,
              "finger": null
            },
            {
              "pitch": "G2",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 2,
          "events": [
            {
              "pitch": "C3",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "D3",
              "kind": "note",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "E3",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 3,
          "events": [
            {
              "pitch": "F3",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "E3",
              "kind": "note",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "D3",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C3",
              "kind": "note",
              "onset_quarters": 3,
              "duration_quarters": 1,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 4,
          "events": [
            {
              "pitch": "G2",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 2,
              "finger": null
            },
            {
              "pitch": "C3",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4
        }
      ],
      "goal": "Bass clef G2–F3; adds a fourth/fifth leap and half-note changes.",
      "difficulty": {
        "label": "introductory editorial exercise",
        "basis": "Bass clef G2–F3; adds a fourth/fifth leap and half-note changes.",
        "exam_grade": null
      },
      "tempo_bpm": null,
      "evidence_status": "[推断] original exercise; pitch/duration arithmetic checked",
      "source_ids": [
        "E-DURATION",
        "BN-OMT-CLEFS"
      ],
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference exercise; distributable"
      },
      "fingering_status": "not supplied; do not infer"
    },
    {
      "id": "E-R1",
      "title": "Clap and leave a beat silent",
      "clef": "rhythm",
      "meter": "4/4",
      "key_signature": "no sharps or flats",
      "quarter_units_per_bar": 4,
      "bars": [
        {
          "number": 1,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": null,
              "kind": "rest",
              "onset_quarters": 2,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 3,
              "duration_quarters": 1,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 2,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 2,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 3,
              "duration_quarters": 1,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 3,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": null,
              "kind": "rest",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 4,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 4,
              "finger": null
            }
          ],
          "total_quarters": 4
        }
      ],
      "goal": "Rhythm only; quarters, halves, whole notes and quarter rests. Say 1 2 3 4 through silence.",
      "difficulty": {
        "label": "introductory editorial exercise",
        "basis": "Rhythm only; quarters, halves, whole notes and quarter rests. Say 1 2 3 4 through silence.",
        "exam_grade": null
      },
      "tempo_bpm": null,
      "evidence_status": "[推断] original exercise; pitch/duration arithmetic checked",
      "source_ids": [
        "E-DURATION",
        "BN-OMT-CLEFS"
      ],
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference exercise; distributable"
      },
      "fingering_status": "not supplied; do not infer"
    },
    {
      "id": "E-R2",
      "title": "Count eighth-note pairs",
      "clef": "rhythm",
      "meter": "4/4",
      "key_signature": "no sharps or flats",
      "quarter_units_per_bar": 4,
      "bars": [
        {
          "number": 1,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 0.5,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0.5,
              "duration_quarters": 0.5,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 1.0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2.0,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4.0
        },
        {
          "number": 2,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1.5,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 1.5,
              "duration_quarters": 0.5,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2.0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 3.0,
              "duration_quarters": 1,
              "finger": null
            }
          ],
          "total_quarters": 4.0
        },
        {
          "number": 3,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 0.5,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0.5,
              "duration_quarters": 0.5,
              "finger": null
            },
            {
              "pitch": null,
              "kind": "rest",
              "onset_quarters": 1.0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2.0,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4.0
        },
        {
          "number": 4,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 4,
              "finger": null
            }
          ],
          "total_quarters": 4
        }
      ],
      "goal": "Adds paired eighths and a dotted quarter followed by an eighth; count 1 & 2 & 3 & 4 &.",
      "difficulty": {
        "label": "introductory editorial exercise",
        "basis": "Adds paired eighths and a dotted quarter followed by an eighth; count 1 & 2 & 3 & 4 &.",
        "exam_grade": null
      },
      "tempo_bpm": null,
      "evidence_status": "[推断] original exercise; pitch/duration arithmetic checked",
      "source_ids": [
        "E-DURATION",
        "BN-OMT-CLEFS"
      ],
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference exercise; distributable"
      },
      "fingering_status": "not supplied; do not infer"
    }
  ],
  "procedure": [
    "Preview",
    "Count in",
    "Play once",
    "Identify one issue",
    "Study separately"
  ],
  "assets": [
    {
      "path": "assets/piano-starter-and-reading.pdf",
      "format": "PDF",
      "pages": 4,
      "access": "original printable download",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference material; distributable",
        "font": "Bravura OFL; license included"
      },
      "visual_qa": "passed; four pages rendered and inspected, final rhythm spacing corrected"
    }
  ],
  "scoring": {
    "midi": false,
    "microphone": false,
    "automatic_grade": null
  },
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P219 | content_and_data_prepared; professional/implementation gates remain | 视奏方法；有难度说明的原创/可用练习材料；节奏练习；打印；不做MIDI/麦克风评分 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P234 | content_and_data_prepared; professional/implementation gates remain | 与基础识谱区分，提供具体视奏过程与材料。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P264 | content_and_data_prepared; professional/implementation gates remain | 提供实际节奏材料和练法，不以旋律音名辨识题代替。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-REVIEW-sight-reading — professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

来源：E-DURATION, E-DOTS, BN-OMT-CLEFS, E-BOOK-SIGHT

## /guide/piano-chords

[已核实] 目标关键词：`how to play chords on piano`；模板 T22；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Learn the actions behind a chord chart.

### 页面需回答的问题

- How is a triad built?
- Which fingers are documented for the example?
- How can I practise changing chords?

### 英文页面内容

**How to Play Piano Chords**

Build a triad, hear its notes together and practise a small change.

#### Build C major

C–E–G is a C major triad. From C, E is four semitones higher and G is seven semitones higher. Find the three keys, play each once, then sound them together. Yamaha gives right-hand 1–3–5 as the usual root-position fingering for this example.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-CHORD, E-TRIADS。 

#### Change the middle note

Compare C–E–G with C–E♭–G. Lowering E by one semitone gives C minor. Compare the keyboard shapes and sound; the black key is E-flat in this chord’s spelling.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-TRIADS。 

#### Practise a connection

Original exercise: play C4–E4–G4 for four counts, then C4–E4–A4 for four counts, and return. The second group is A minor in first inversion. C4 and E4 stay in place while G4 changes to A4. Plan the movement before counting in; use the chord chart to inspect each voicing. Fingering for this transition is not prescribed.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-TRIADS。 

### 结构化数据

```json
{
  "starter_chords": [
    {
      "name": "C major",
      "notes": [
        "C",
        "E",
        "G"
      ]
    },
    {
      "name": "A minor",
      "notes": [
        "A",
        "C",
        "E"
      ]
    },
    {
      "name": "F major",
      "notes": [
        "F",
        "A",
        "C"
      ]
    },
    {
      "name": "G major",
      "notes": [
        "G",
        "B",
        "D"
      ]
    }
  ],
  "verified_fingering_example": {
    "hand": "right",
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
    "scope": "Yamaha usual root-position C major example; no transfer to other shapes",
    "source_ids": [
      "E-CHORD"
    ]
  },
  "finger_diagram": "assets/c-major-rh-fingers.svg",
  "transition_voicings": [
    [
      "C4",
      "E4",
      "G4"
    ],
    [
      "C4",
      "E4",
      "A4"
    ],
    [
      "C4",
      "E4",
      "G4"
    ]
  ],
  "transition_fingering": null,
  "reference_url": "/chords",
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P220 | content_and_data_prepared; professional/implementation gates remain | 步骤、构成、指法示意及连接练习；链接查图工具 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P225 | content_and_data_prepared; professional/implementation gates remain | 初学钢琴基础和弦选择与弹法；必须在该页提供实际结果，不只增加一个关键词。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P242 | content_and_data_prepared; professional/implementation gates remain | 练习钢琴和弦连接/换和弦动作；必须在该页提供实际结果，不只增加一个关键词。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-REVIEW-piano-chords — professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

来源：E-CHORD, E-TRIADS, BR-03, BR-04

## /guide/piano-books

[已核实] 目标关键词：`piano books for beginners`；模板 T23；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose an exact edition for a stated level and practice purpose.

### 页面需回答的问题

- Which course fits an adult beginner?
- Which choice is intermediate?
- Which books focus on scales or sight-reading?

### 英文页面内容

**Choose a Piano Book for Your Goal**

Compare an adult course, a beginner course, intermediate repertoire and focused reference books.

#### Start with the kind of work you need

For an adult starting from scratch, consider Alfred’s Basic Adult All-in-One Course, Book 1, item 00-5753. For a younger beginner working with a teacher, compare the separate Basic All-in-One Course, Book 1, item 00-5740. These are different products; check the series name as well as Book 1.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-BOOK-ADULT, E-BOOK-CHILD。 

#### Add repertoire at the right level

Martha Mier’s Jazz, Rags & Blues, Book 3, item 00-16871, is labelled Intermediate / Late Intermediate by Alfred. Choose it for that style once the reading and coordination in its sample feel manageable. This recommendation is based on publisher metadata, not a hands-on review.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-BOOK-JAZZ。 

#### Choose a focused supplement

For key-by-key reference, compare The Complete Book of Scales, Chords, Arpeggios & Cadences, 00-5743. For short sight-reading activities, Joining the Dots, Book 1 by Alan Bullard is the Grade 1 volume, ISBN 9781860969768. Neither serves the same job as a full beginner course.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-BOOK-SCALES, E-BOOK-SIGHT。 

### 结构化数据

```json
{
  "books": [
    {
      "id": "E-BOOK-ADULT",
      "title": "Alfred’s Basic Adult All-in-One Course, Book 1",
      "item": "00-5753",
      "url": "https://www.alfred.com/products/alfred-s-basic-adult-all-in-one-course-book-1-00-5753",
      "level": "adult beginner",
      "contents": "Lesson, theory and technique in one course.",
      "editorial_fit": "A structured starting book for an adult who wants coordinated reading and keyboard work.",
      "fit_status": "[推断] editorial selection, no hands-on review",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "work_status": "license unclear"
      },
      "price": null,
      "source_ids": [
        "E-BOOK-ADULT"
      ]
    },
    {
      "id": "E-BOOK-CHILD",
      "title": "Alfred’s Basic All-in-One Course, Book 1",
      "item": "00-5740",
      "url": "https://www.alfred.com/products/alfred-s-basic-all-in-one-course-book-1-00-5740",
      "level": "beginner",
      "contents": "Combines material from the Basic Piano Library in an all-in-one course.",
      "editorial_fit": "Choose with a teacher for a younger beginner; this is a different series from the adult course.",
      "fit_status": "[推断] editorial selection, no hands-on review",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "work_status": "license unclear"
      },
      "price": null,
      "source_ids": [
        "E-BOOK-CHILD"
      ]
    },
    {
      "id": "E-BOOK-SCALES",
      "title": "The Complete Book of Scales, Chords, Arpeggios & Cadences",
      "item": "00-5743",
      "url": "https://www.alfred.com/products/the-complete-book-of-scales-chords-arpeggios-cadences-00-5743",
      "level": "reference; level not independently assessed",
      "contents": "Major and minor keys, scale fundamentals and fingering guidance.",
      "editorial_fit": "Choose when you need a key-by-key reference alongside lessons, rather than a first reading course.",
      "fit_status": "[推断] editorial selection, no hands-on review",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "work_status": "license unclear"
      },
      "price": null,
      "source_ids": [
        "E-BOOK-SCALES"
      ]
    },
    {
      "id": "E-BOOK-JAZZ",
      "title": "Jazz, Rags & Blues, Book 3",
      "item": "00-16871",
      "url": "https://www.alfred.com/products/jazz-rags-blues-book-3-00-16871",
      "level": "Intermediate / Late Intermediate",
      "contents": "Martha Mier original piano solos; Book & Online Audio.",
      "editorial_fit": "For a player already reading both staves who wants this style; inspect a sample with a teacher before choosing.",
      "fit_status": "[推断] editorial selection, no hands-on review",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "work_status": "license unclear"
      },
      "price": null,
      "source_ids": [
        "E-BOOK-JAZZ"
      ]
    },
    {
      "id": "E-HANON",
      "title": "Hanon: The Virtuoso Pianist in 60 Exercises (Complete)",
      "item": "00-616",
      "url": "https://www.alfred.com/products/hanon-the-virtuoso-pianist-in-60-exercises-complete-00-616",
      "level": "Intermediate / Advanced",
      "contents": "Charles-Louis Hanon, edited by Allan Small; complete exercises 1–60.",
      "editorial_fit": "A targeted technique reference for teacher-selected work, not a complete beginner course.",
      "fit_status": "[推断] editorial selection, no hands-on review",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "work_status": "license unclear"
      },
      "price": null,
      "source_ids": [
        "E-HANON"
      ]
    },
    {
      "id": "E-BOOK-SIGHT",
      "title": "Joining the Dots, Book 1 (Piano)",
      "author": "Alan Bullard",
      "isbn": "9781860969768",
      "year": 2010,
      "pages": 32,
      "level": "Grade 1",
      "url": "https://shop.abrsm.org/products/joining-the-dots-book-1-piano",
      "editorial_fit": "For short unfamiliar pieces and key-based activities after basic note reading; not a replacement for an introductory lesson course.",
      "format": "Book per product details and shipping data; generic digital delivery banner conflicts",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "work_status": "license unclear"
      },
      "source_ids": [
        "E-BOOK-SIGHT"
      ]
    }
  ],
  "selection_basis": "official edition metadata plus clearly labelled editorial fit; no first-hand test claims",
  "purchase_links_external": true,
  "professional_review": "not claimed"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P221 | content_and_data_prepared; professional/implementation gates remain | 按级别和练习目标分区；适用对象与选择依据；正版获取入口 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P251 | content_and_data_prepared; professional/implementation gates remain | 中级教材的真实适用条件与版本信息。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P258 | content_and_data_prepared; professional/implementation gates remain | 音阶教材选择说明，不只有初学教材列表。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P260 | content_and_data_prepared; professional/implementation gates remain | 视奏教材选择说明，和平台/软件推荐区分。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-BOOK-FORMAT — Joining the Dots delivery format：ABRSM details say Book and item requires shipping, but a generic digital banner also appears.；解决：Confirm format in checkout; do not promise an instant PDF download.

来源：E-BOOK-ADULT, E-BOOK-CHILD, E-BOOK-SCALES, E-BOOK-JAZZ, E-HANON, E-BOOK-SIGHT

## /guide/learn-a-piano-song

[已核实] 目标关键词：`how to play piano songs`；模板 T22；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Turn a selected piece into a concrete practice sequence.

### 页面需回答的问题

- How do I choose a version?
- What should I practise first?
- How do I connect sections?

### 英文页面内容

**How to Learn a Piano Song**

Choose an achievable edition and work from a small phrase to a continuous performance.

#### Choose an edition before a target speed

Look at the actual score: range, note values, hand changes and chord size matter more than the song title. Use the easy-song list to select a version and the sheet-music pages to check the exact edition. Begin with a phrase you can describe before playing.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：原创编辑建议。 

#### Try the method on an original phrase

Use bars 1–2 of Steps around middle C. First speak C4 D4 E4, E4 D4 C4 while pointing to the notes. Clap each bar’s 1, 1, 2 duration pattern. Then play one bar, play the next, and join them without inserting a pause at the barline.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-DURATION, BN-OMT-CLEFS。 

#### Build a connected run

Practise the join by starting one beat before the change. Add the next phrase only when you can explain what changes. For two-hand music, inspect each part separately before combining them. Save one slow continuous run for the end and write down the next small problem to solve.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：原创编辑建议。 

### 结构化数据

```json
{
  "worked_example": {
    "id": "E-SR1",
    "title": "Steps around middle C",
    "clef": "treble",
    "meter": "4/4",
    "key_signature": "no sharps or flats",
    "quarter_units_per_bar": 4,
    "bars": [
      {
        "number": 1,
        "events": [
          {
            "pitch": "C4",
            "kind": "note",
            "onset_quarters": 0,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "D4",
            "kind": "note",
            "onset_quarters": 1,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "E4",
            "kind": "note",
            "onset_quarters": 2,
            "duration_quarters": 2,
            "finger": null
          }
        ],
        "total_quarters": 4
      },
      {
        "number": 2,
        "events": [
          {
            "pitch": "E4",
            "kind": "note",
            "onset_quarters": 0,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "D4",
            "kind": "note",
            "onset_quarters": 1,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "C4",
            "kind": "note",
            "onset_quarters": 2,
            "duration_quarters": 2,
            "finger": null
          }
        ],
        "total_quarters": 4
      },
      {
        "number": 3,
        "events": [
          {
            "pitch": "D4",
            "kind": "note",
            "onset_quarters": 0,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "E4",
            "kind": "note",
            "onset_quarters": 1,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "F4",
            "kind": "note",
            "onset_quarters": 2,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "D4",
            "kind": "note",
            "onset_quarters": 3,
            "duration_quarters": 1,
            "finger": null
          }
        ],
        "total_quarters": 4
      },
      {
        "number": 4,
        "events": [
          {
            "pitch": "C4",
            "kind": "note",
            "onset_quarters": 0,
            "duration_quarters": 4,
            "finger": null
          }
        ],
        "total_quarters": 4
      }
    ],
    "goal": "One staff, C4–F4, steps and one third, quarter/half/whole notes; no simultaneous hands.",
    "difficulty": {
      "label": "introductory editorial exercise",
      "basis": "One staff, C4–F4, steps and one third, quarter/half/whole notes; no simultaneous hands.",
      "exam_grade": null
    },
    "tempo_bpm": null,
    "evidence_status": "[推断] original exercise; pitch/duration arithmetic checked",
    "source_ids": [
      "E-DURATION",
      "BN-OMT-CLEFS"
    ],
    "rights": {
      "edition_status": "official / authorized",
      "site_use": "original Piano Reference exercise; distributable"
    },
    "fingering_status": "not supplied; do not infer"
  },
  "checklist": [
    "Confirm edition",
    "Mark a phrase",
    "Read pitches",
    "Clap rhythm",
    "Play short sections",
    "Practise the join",
    "Attempt a continuous run"
  ],
  "related": [
    "/songs/easy",
    "/sheet-music/easy",
    "/guide/piano-practice"
  ],
  "assets": [
    {
      "path": "assets/piano-starter-and-reading.pdf",
      "format": "PDF",
      "pages": 4,
      "access": "original printable download",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference material; distributable",
        "font": "Bravura OFL; license included"
      },
      "visual_qa": "passed; four pages rendered and inspected, final rhythm spacing corrected"
    }
  ],
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P230 | content_and_data_prepared; professional/implementation gates remain | 可复用方法；示例与入门步骤；链接选曲/谱源 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P232 | content_and_data_prepared; professional/implementation gates remain | 初学者如何开始弹易曲；必须在该页提供实际结果，不只增加一个关键词。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-REVIEW-learn-a-piano-song — professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

来源：E-DURATION, BN-OMT-CLEFS

## /guide/piano-scales

[已核实] 目标关键词：`piano scales for beginners`；模板 T22；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Use a scale reference to plan short, specific practice.

### 页面需回答的问题

- Which scale can I start with?
- When should I add the other hand?
- What can I change when notes are uneven?

### 英文页面内容

**How to Practise Piano Scales**

Start with one octave and one clear listening goal.

#### Choose a small starting set

Editorial starting order: C major, then G major, then F major. C uses white keys; G introduces F-sharp and F introduces B-flat. This is one learning route, not a universal difficulty ranking. Open each scale’s own chart and verified fingering before playing.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：AM-NOTES-C-MAJOR, AM-NOTES-G-MAJOR, AM-THEORY。 

#### Separate the tasks

Name the scale notes first. Play one octave with one hand, pause, then check the return journey. Use the exact ascending and descending fingering shown in the selected chart; do not reverse or extend a number pattern by assumption. Add the other hand separately before trying hands together.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：AM-FINGER-LMT, AM-FINGER-MF。 

#### Make one useful change

Original five-minute plan: one minute naming C D E F G A B C; two minutes checking each hand slowly; one minute on a single uneven crossing; one minute playing and listening again. If the crossing rushes, pause before it in the isolated exercise, then restore an even pulse. This timing is a sample allocation, not a required daily dose.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：原创编辑建议。 

### 结构化数据

```json
{
  "starter_order": [
    "/scales/c-major",
    "/scales/g-major",
    "/scales/f-major"
  ],
  "original_demo": {
    "name": "Name then play one octave",
    "notes": [
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "B4",
      "C5"
    ],
    "rhythm": "equal values chosen by learner",
    "finger_source_page": "/scales/c-major",
    "fingering": "use verified data there; no new inferred sequence"
  },
  "routine_minutes": [
    1,
    2,
    1,
    1
  ],
  "common_problems": [
    {
      "problem": "Wrong F in G major",
      "action": "Check F-sharp in the scale reference before restarting."
    },
    {
      "problem": "Uneven crossing",
      "action": "Isolate the join; choose a slower even pulse."
    },
    {
      "problem": "Hands lose alignment",
      "action": "Return to separate hands, then join a shorter segment."
    }
  ],
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P231 | content_and_data_prepared; professional/implementation gates remain | 起步顺序、双手练习步骤、常见问题；链接具体音阶和指法图；原创示范 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P259 | content_and_data_prepared; professional/implementation gates remain | 音阶练习方法和安排，不重复参考工具完整数据。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-REVIEW-piano-scales — professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

来源：AM-THEORY, AM-NOTES-C-MAJOR, AM-NOTES-G-MAJOR, AM-FINGER-LMT, AM-FINGER-MF

## /guide/compose-a-piano-song

[已核实] 目标关键词：`make a piano song`；模板 T22；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Write and revise a small original melody with harmony.

### 页面需回答的问题

- How can I start a melody?
- How do chords support it?
- What can I vary?

### 英文页面内容

**Compose a Short Piano Piece**

Make a four-bar idea, keep a recognisable pattern and choose an ending.

#### Start with a repeatable rhythm

Our original Four-bar sketch uses a one-beat, one-beat, two-beat pattern for three bars. Its melody changes with C, F and G harmony, then ends over C. Play the melody alone first; the supplied lower chord notes are an optional accompaniment.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-DURATION, E-TRIADS。 

#### Make one variation

Keep bar 1, then change bar 2 to A4–F4–A4 with the same durations. Compare the contour. Next keep the original pitches but change the last bar to C4 for four counts. Decide which ending suits your idea; neither is a prescribed composition rule.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：原创编辑建议。 

#### Write enough information to replay it

Record the clef, key signature, 4/4 meter, pitches and durations. Add chord symbols above the bars if useful. Use the blank grand staff to write your revision and the chord-progressions reference to compare other harmonic choices.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：BN-OMT-CLEFS, E-DURATION。 

### 结构化数据

```json
{
  "original_score": {
    "id": "E-COMP",
    "title": "Four-bar sketch",
    "clef": "treble",
    "meter": "4/4",
    "key_signature": "no sharps or flats",
    "quarter_units_per_bar": 4,
    "bars": [
      {
        "number": 1,
        "events": [
          {
            "pitch": "E4",
            "kind": "note",
            "onset_quarters": 0,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "G4",
            "kind": "note",
            "onset_quarters": 1,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "E4",
            "kind": "note",
            "onset_quarters": 2,
            "duration_quarters": 2,
            "finger": null
          }
        ],
        "total_quarters": 4
      },
      {
        "number": 2,
        "events": [
          {
            "pitch": "F4",
            "kind": "note",
            "onset_quarters": 0,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "A4",
            "kind": "note",
            "onset_quarters": 1,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "F4",
            "kind": "note",
            "onset_quarters": 2,
            "duration_quarters": 2,
            "finger": null
          }
        ],
        "total_quarters": 4
      },
      {
        "number": 3,
        "events": [
          {
            "pitch": "D4",
            "kind": "note",
            "onset_quarters": 0,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "G4",
            "kind": "note",
            "onset_quarters": 1,
            "duration_quarters": 1,
            "finger": null
          },
          {
            "pitch": "B4",
            "kind": "note",
            "onset_quarters": 2,
            "duration_quarters": 2,
            "finger": null
          }
        ],
        "total_quarters": 4
      },
      {
        "number": 4,
        "events": [
          {
            "pitch": "E4",
            "kind": "note",
            "onset_quarters": 0,
            "duration_quarters": 2,
            "finger": null
          },
          {
            "pitch": "C4",
            "kind": "note",
            "onset_quarters": 2,
            "duration_quarters": 2,
            "finger": null
          }
        ],
        "total_quarters": 4
      }
    ],
    "goal": "Original compositional example: repeated rhythm with changing pitches; not a graded sight-reading test.",
    "difficulty": {
      "label": "introductory editorial exercise",
      "basis": "Original compositional example: repeated rhythm with changing pitches; not a graded sight-reading test.",
      "exam_grade": null
    },
    "tempo_bpm": null,
    "evidence_status": "[推断] original exercise; pitch/duration arithmetic checked",
    "source_ids": [
      "E-DURATION",
      "BN-OMT-CLEFS"
    ],
    "rights": {
      "edition_status": "official / authorized",
      "site_use": "original Piano Reference exercise; distributable"
    },
    "fingering_status": "not supplied; do not infer",
    "harmony": [
      {
        "bar": 1,
        "symbol": "C",
        "notes": [
          "C3",
          "E3",
          "G3"
        ],
        "duration_quarters": 4
      },
      {
        "bar": 2,
        "symbol": "F",
        "notes": [
          "F2",
          "A2",
          "C3"
        ],
        "duration_quarters": 4
      },
      {
        "bar": 3,
        "symbol": "G",
        "notes": [
          "G2",
          "B2",
          "D3"
        ],
        "duration_quarters": 4
      },
      {
        "bar": 4,
        "symbol": "C",
        "notes": [
          "C3",
          "E3",
          "G3"
        ],
        "duration_quarters": 4
      }
    ]
  },
  "variation_tasks": [
    "Change only pitches in bar 2",
    "Change only rhythm in bar 4",
    "Choose a different chord for bar 2 and rewrite its melody"
  ],
  "assets": [
    {
      "path": "assets/piano-starter-and-reading.pdf",
      "format": "PDF",
      "pages": 4,
      "access": "original printable download",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference material; distributable",
        "font": "Bravura OFL; license included"
      },
      "visual_qa": "passed; four pages rendered and inspected, final rhythm spacing corrected"
    }
  ],
  "related": [
    "/tools/blank-sheet-music",
    "/chord-progressions"
  ],
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P239 | content_and_data_prepared; professional/implementation gates remain | 旋律与和声组织步骤；原创短例子；相关工具链接 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-REVIEW-compose-a-piano-song — professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

来源：E-DURATION, E-TRIADS, BN-OMT-CLEFS

## /guide/hanon-exercises

[已核实] 目标关键词：`hanon piano exercises`；模板 T22；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Decide whether and how to use a verified Hanon edition.

### 页面需回答的问题

- Which edition is referenced?
- Is this a beginner method?
- What is a useful practice goal?

### 英文页面内容

**Using Hanon Exercises with a Clear Goal**

Identify the edition and select a small passage for a specific technique task.

#### Check the exact book

This reference is Alfred item 00-616: Charles-Louis Hanon, The Virtuoso Pianist in 60 Exercises, Complete, edited by Allan Small. Alfred labels it Intermediate / Advanced and includes exercises 1–60. It is not presented here as a first piano method.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-HANON。 

#### Select rather than race through

With a teacher, select a short passage that addresses an observed issue, such as an uneven rhythm or an unclear release. Read that edition’s notes and finger numbers before repeating it. Keep the excerpt small enough to notice a change; a speed target alone does not define success.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：原创编辑建议。 

#### Use an observable check

Editorial practice card: identify one bar, state one listening goal, play it slowly, pause, and compare the next attempt. Stop when the hand becomes uncomfortable or tense and reset with your teacher. No claim is made that repetitions prevent injury or guarantee strength.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-POSTURE。 

### 结构化数据

```json
{
  "edition": {
    "id": "E-HANON",
    "title": "Hanon: The Virtuoso Pianist in 60 Exercises (Complete)",
    "item": "00-616",
    "url": "https://www.alfred.com/products/hanon-the-virtuoso-pianist-in-60-exercises-complete-00-616",
    "level": "Intermediate / Advanced",
    "contents": "Charles-Louis Hanon, edited by Allan Small; complete exercises 1–60.",
    "editorial_fit": "A targeted technique reference for teacher-selected work, not a complete beginner course.",
    "fit_status": "[推断] editorial selection, no hands-on review",
    "rights": {
      "edition_status": "official / authorized",
      "site_use": "external reference only",
      "work_status": "license unclear"
    },
    "price": null,
    "source_ids": [
      "E-HANON"
    ]
  },
  "practice_card": {
    "selected_exercise": null,
    "selected_bar": null,
    "goal": "one teacher-selected issue",
    "repetitions": null,
    "tempo_bpm": null
  },
  "hosted_score": null,
  "original_pattern_transcription": null,
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P245 | content_and_data_prepared; professional/implementation gates remain | 明确版本、适用条件、练法和可用材料入口 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-REVIEW-hanon-exercises — professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

来源：E-HANON, E-POSTURE

## /guide/note-values-and-rhythm

[已核实] 目标关键词：`kinds of notes music`；模板 T22；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Decode basic duration symbols and perform original rhythm exercises.

### 页面需回答的问题

- How long is each note?
- What do dots and ties do?
- How do 4/4 and 6/8 differ?

### 英文页面内容

**Note Values and Rhythm**

Read how long to play, how long to rest and how to count a bar.

#### Use a stated beat unit

In these 4/4 exercises, a quarter note lasts one beat: whole 4, half 2, eighth 1/2 and sixteenth 1/4. Corresponding rests use the same durations but leave silence. These beat counts depend on the chosen beat unit; a whole note does not fill every possible meter.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-DURATION, E-RHYTHM-CROSS。 

#### Add duration carefully

A dot adds half the undotted value, so a dotted quarter lasts 1.5 quarter-note units. A tie joins two notes of the same pitch into one sustained duration; do not strike the second note again. A slur is a different instruction.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-DOTS。 

#### Count the subdivision

For E-R2 say 1 & 2 & 3 & 4 &. The first bar starts with two eighth notes, then a quarter and a half. In compound 6/8, six eighth-note units are normally grouped into two dotted-quarter beats: ONE-and-a TWO-and-a. Keep that grouping distinct from the four quarter-note beats in our 4/4 lines.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-METER。 

#### Clap, then check

Try the printed rhythm lines without looking at their answer counts. Keep counting during rests. After one attempt, check that each 4/4 bar totals four quarter-note units and mark any attack that arrived early or late.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：原创编辑建议。 

### 结构化数据

```json
{
  "duration_table": [
    {
      "name": "whole",
      "uk_name": "semibreve",
      "quarter_units": 4,
      "note_smufl": "E1D2",
      "rest_smufl": "E4E3"
    },
    {
      "name": "half",
      "uk_name": "minim",
      "quarter_units": 2,
      "note_smufl": "E1D3",
      "rest_smufl": "E4E4"
    },
    {
      "name": "quarter",
      "uk_name": "crotchet",
      "quarter_units": 1,
      "note_smufl": "E1D5",
      "rest_smufl": "E4E5"
    },
    {
      "name": "eighth",
      "uk_name": "quaver",
      "quarter_units": 0.5,
      "note_smufl": "E1D7",
      "rest_smufl": "E4E6"
    },
    {
      "name": "sixteenth",
      "uk_name": "semiquaver",
      "quarter_units": 0.25,
      "note_smufl": "E1D9",
      "rest_smufl": "E4E7"
    }
  ],
  "exercises": [
    {
      "id": "E-R1",
      "title": "Clap and leave a beat silent",
      "clef": "rhythm",
      "meter": "4/4",
      "key_signature": "no sharps or flats",
      "quarter_units_per_bar": 4,
      "bars": [
        {
          "number": 1,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": null,
              "kind": "rest",
              "onset_quarters": 2,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 3,
              "duration_quarters": 1,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 2,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 2,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 3,
              "duration_quarters": 1,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 3,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": null,
              "kind": "rest",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 4,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 4,
              "finger": null
            }
          ],
          "total_quarters": 4
        }
      ],
      "goal": "Rhythm only; quarters, halves, whole notes and quarter rests. Say 1 2 3 4 through silence.",
      "difficulty": {
        "label": "introductory editorial exercise",
        "basis": "Rhythm only; quarters, halves, whole notes and quarter rests. Say 1 2 3 4 through silence.",
        "exam_grade": null
      },
      "tempo_bpm": null,
      "evidence_status": "[推断] original exercise; pitch/duration arithmetic checked",
      "source_ids": [
        "E-DURATION",
        "BN-OMT-CLEFS"
      ],
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference exercise; distributable"
      },
      "fingering_status": "not supplied; do not infer"
    },
    {
      "id": "E-R2",
      "title": "Count eighth-note pairs",
      "clef": "rhythm",
      "meter": "4/4",
      "key_signature": "no sharps or flats",
      "quarter_units_per_bar": 4,
      "bars": [
        {
          "number": 1,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 0.5,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0.5,
              "duration_quarters": 0.5,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 1.0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2.0,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4.0
        },
        {
          "number": 2,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1.5,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 1.5,
              "duration_quarters": 0.5,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2.0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 3.0,
              "duration_quarters": 1,
              "finger": null
            }
          ],
          "total_quarters": 4.0
        },
        {
          "number": 3,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 0.5,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0.5,
              "duration_quarters": 0.5,
              "finger": null
            },
            {
              "pitch": null,
              "kind": "rest",
              "onset_quarters": 1.0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2.0,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4.0
        },
        {
          "number": 4,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 4,
              "finger": null
            }
          ],
          "total_quarters": 4
        }
      ],
      "goal": "Adds paired eighths and a dotted quarter followed by an eighth; count 1 & 2 & 3 & 4 &.",
      "difficulty": {
        "label": "introductory editorial exercise",
        "basis": "Adds paired eighths and a dotted quarter followed by an eighth; count 1 & 2 & 3 & 4 &.",
        "exam_grade": null
      },
      "tempo_bpm": null,
      "evidence_status": "[推断] original exercise; pitch/duration arithmetic checked",
      "source_ids": [
        "E-DURATION",
        "BN-OMT-CLEFS"
      ],
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference exercise; distributable"
      },
      "fingering_status": "not supplied; do not infer"
    }
  ],
  "dot_example": {
    "base_quarters": 1,
    "added": 0.5,
    "total": 1.5
  },
  "tie_example": {
    "pitch": "C4",
    "durations": [
      2,
      1
    ],
    "total_quarters": 3,
    "reattack_second": false
  },
  "assets": [
    {
      "path": "assets/piano-starter-and-reading.pdf",
      "format": "PDF",
      "pages": 4,
      "access": "original printable download",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference material; distributable",
        "font": "Bravura OFL; license included"
      },
      "visual_qa": "passed; four pages rendered and inspected, final rhythm spacing corrected"
    }
  ],
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P227 | content_and_data_prepared; professional/implementation gates remain | 时值与休止符图例；拍号/计数示例；实际节奏练习 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P252 | content_and_data_prepared; professional/implementation gates remain | 学习节奏记谱；必须在该页提供实际结果，不只增加一个关键词。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-REVIEW-note-values-and-rhythm — professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

来源：E-DURATION, E-RHYTHM-CROSS, E-DOTS, E-METER, BN-OMT-CLEFS

## /guide/piano-exercises

[已核实] 目标关键词：`piano exercises for beginners`；模板 T22；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Select a small exercise for reading, timing or chord movement.

### 页面需回答的问题

- Which exercise fits my problem?
- What result should I listen for?
- How much repetition is needed?

### 英文页面内容

**Piano Exercises by Practice Goal**

Choose one short task and listen for a specific result.

#### Choose the problem first

For uncertain note locations, play E-SR1 and name each starting pitch. For a pulse that stops at rests, clap E-R1 while continuing to count. For a difficult chord change, compare C4–E4–G4 with C4–E4–A4 and identify the one moving note before playing.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：BN-OMT-CLEFS, E-DURATION, E-TRIADS。 

#### Keep the feedback specific

Original procedure: choose one bar, make one attempt, name one observable issue, and change one thing. If pitch is correct but time is uneven, remove pitch and clap. If the hand feels rigid, pause and revisit your sitting position instead of increasing the repetition count.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-POSTURE。 

#### Finish with a transfer

Use the same listening goal in a short phrase from your piece. The exercise has done its job when it helps that phrase. These tasks are introductory editorial examples; a teacher should adapt movement and workload to the player.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：原创编辑建议。 

### 结构化数据

```json
{
  "tasks": [
    {
      "goal": "note location",
      "exercise_id": "E-SR1",
      "success": "identify the correct octave before each bar"
    },
    {
      "goal": "pulse through silence",
      "exercise_id": "E-R1",
      "success": "continue four equal spoken counts through rests"
    },
    {
      "goal": "one-note chord change",
      "notes": [
        [
          "C4",
          "E4",
          "G4"
        ],
        [
          "C4",
          "E4",
          "A4"
        ]
      ],
      "success": "keep common notes in the same locations",
      "fingering": null
    }
  ],
  "exercises": [
    {
      "id": "E-SR1",
      "title": "Steps around middle C",
      "clef": "treble",
      "meter": "4/4",
      "key_signature": "no sharps or flats",
      "quarter_units_per_bar": 4,
      "bars": [
        {
          "number": 1,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "D4",
              "kind": "note",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "E4",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 2,
          "events": [
            {
              "pitch": "E4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "D4",
              "kind": "note",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 3,
          "events": [
            {
              "pitch": "D4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "E4",
              "kind": "note",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "F4",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "D4",
              "kind": "note",
              "onset_quarters": 3,
              "duration_quarters": 1,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 4,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 4,
              "finger": null
            }
          ],
          "total_quarters": 4
        }
      ],
      "goal": "One staff, C4–F4, steps and one third, quarter/half/whole notes; no simultaneous hands.",
      "difficulty": {
        "label": "introductory editorial exercise",
        "basis": "One staff, C4–F4, steps and one third, quarter/half/whole notes; no simultaneous hands.",
        "exam_grade": null
      },
      "tempo_bpm": null,
      "evidence_status": "[推断] original exercise; pitch/duration arithmetic checked",
      "source_ids": [
        "E-DURATION",
        "BN-OMT-CLEFS"
      ],
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference exercise; distributable"
      },
      "fingering_status": "not supplied; do not infer"
    },
    {
      "id": "E-R1",
      "title": "Clap and leave a beat silent",
      "clef": "rhythm",
      "meter": "4/4",
      "key_signature": "no sharps or flats",
      "quarter_units_per_bar": 4,
      "bars": [
        {
          "number": 1,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": null,
              "kind": "rest",
              "onset_quarters": 2,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 3,
              "duration_quarters": 1,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 2,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 2,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 3,
              "duration_quarters": 1,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 3,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": null,
              "kind": "rest",
              "onset_quarters": 1,
              "duration_quarters": 1,
              "finger": null
            },
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 2,
              "duration_quarters": 2,
              "finger": null
            }
          ],
          "total_quarters": 4
        },
        {
          "number": 4,
          "events": [
            {
              "pitch": "C4",
              "kind": "note",
              "onset_quarters": 0,
              "duration_quarters": 4,
              "finger": null
            }
          ],
          "total_quarters": 4
        }
      ],
      "goal": "Rhythm only; quarters, halves, whole notes and quarter rests. Say 1 2 3 4 through silence.",
      "difficulty": {
        "label": "introductory editorial exercise",
        "basis": "Rhythm only; quarters, halves, whole notes and quarter rests. Say 1 2 3 4 through silence.",
        "exam_grade": null
      },
      "tempo_bpm": null,
      "evidence_status": "[推断] original exercise; pitch/duration arithmetic checked",
      "source_ids": [
        "E-DURATION",
        "BN-OMT-CLEFS"
      ],
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference exercise; distributable"
      },
      "fingering_status": "not supplied; do not infer"
    }
  ],
  "fixed_repetition_dose": null,
  "assets": [
    {
      "path": "assets/piano-starter-and-reading.pdf",
      "format": "PDF",
      "pages": 4,
      "access": "original printable download",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference material; distributable",
        "font": "Bravura OFL; license included"
      },
      "visual_qa": "passed; four pages rendered and inspected, final rhythm spacing corrected"
    }
  ],
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P253 | content_and_data_prepared; professional/implementation gates remain | 按明确技巧目标组织少量可执行练习；专业审核与适用说明 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P261 | content_and_data_prepared; professional/implementation gates remain | 钢琴演奏技巧练习方法；必须在该页提供实际结果，不只增加一个关键词。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-REVIEW-piano-exercises — professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

来源：BN-OMT-CLEFS, E-DURATION, E-TRIADS, E-POSTURE

## /guide/piano-hand-position

[已核实] 目标关键词：`piano hand posture`；模板 T22；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Check a comfortable starting posture using a simple diagram.

### 页面需回答的问题

- How high should I sit?
- How should fingers and wrists look?
- Which common ideas are misleading?

### 英文页面内容

**Piano Hand Position and Sitting Setup**

Set up your seat, let the arms move and avoid forcing a fixed hand shape.

#### Set up before playing

Sit near the front of a stable bench, facing the keyboard. Support your feet. Adjust your height so your elbows are approximately level with the keys, with shoulders and arms relaxed. Reach the keyboard without lifting the shoulders.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-POSTURE。 

#### Let the hand remain mobile

Use gently curved fingers and a wrist that continues the general line of the forearm. The side-view diagram is a starting reference, not a fixed angle to hold throughout a piece. Key position and musical movement change how the hand travels.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-POSTURE, E-POSTURE-CROSS。 

#### Check a single note

Place a hand over a small group of keys, play one note and release. Notice whether the shoulder rises or the wrist locks. Pause and reset if the action feels forced. Avoid treating “curved fingers” as an instruction to claw tightly or “level wrist” as an instruction never to move.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-POSTURE。 

### 结构化数据

```json
{
  "diagram": {
    "path": "assets/piano-hand-position.svg",
    "view": "simplified side view",
    "labels": [
      "relaxed shoulder and arm",
      "wrist follows forearm",
      "gently curved fingers",
      "keyboard surface"
    ],
    "is_anatomical_measurement": false
  },
  "teacher_checkpoints": [
    "bench height and distance",
    "foot support",
    "free arm movement",
    "unforced hand shape"
  ],
  "angle_degrees": null,
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P254 | content_and_data_prepared; professional/implementation gates remain | 原创/可用示意图、具体操作说明及应避免的误解 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-REVIEW-piano-hand-position — professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

来源：E-POSTURE, E-POSTURE-CROSS

## /guide/piano-practice

[已核实] 目标关键词：`piano practice`；模板 T22；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a short plan matched to a current goal.

### 页面需回答的问题

- What should I practise today?
- How can a short session be organised?
- How do I decide what to do next?

### 英文页面内容

**Plan a Useful Piano Practice Session**

Give each part of practice a small goal and leave a clear next step.

#### A ten-minute beginner plan

Use two minutes to find the starting notes, three to clap and read a phrase, three to play and join two sections, and two for a continuous attempt and a written note. Treat these times as an editable example, not a minimum requirement.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：BN-OMT-CLEFS, E-DURATION。 

#### A twenty-minute developing-player plan

Spend three minutes on one scale issue, five on an unfamiliar reading line, eight on one passage from your piece, and four on a familiar section and a brief log. Choose material at a manageable level so the goals stay observable.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：原创编辑建议。 

#### Write a useful next step

Replace “practise more” with a concrete observation such as “count through the rest in bar 3.” Record what improved and what still interrupted the phrase. The final page of the starter pack has a printable session checklist.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：原创编辑建议。 

### 结构化数据

```json
{
  "sample_plans": [
    {
      "level": "beginner",
      "goal": "read and connect a short phrase",
      "minutes": [
        2,
        3,
        3,
        2
      ],
      "tasks": [
        "Locate starting notes",
        "Clap and read one phrase",
        "Play and join two short sections",
        "One continuous attempt and a note for next time"
      ]
    },
    {
      "level": "developing player",
      "goal": "solve one passage and retain repertoire",
      "minutes": [
        3,
        5,
        8,
        4
      ],
      "tasks": [
        "One scale goal",
        "One unfamiliar reading line",
        "Isolate and reconnect a piece passage",
        "Play a familiar section and log one result"
      ]
    }
  ],
  "log_fields": [
    "date",
    "piece or exercise",
    "specific goal",
    "what changed",
    "next small task"
  ],
  "related": [
    "/guide/sight-reading",
    "/guide/piano-scales",
    "/guide/learn-a-piano-song"
  ],
  "assets": [
    {
      "path": "assets/piano-starter-and-reading.pdf",
      "format": "PDF",
      "pages": 4,
      "access": "original printable download",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference material; distributable",
        "font": "Bravura OFL; license included"
      },
      "visual_qa": "passed; four pages rendered and inspected, final rhythm spacing corrected"
    }
  ],
  "professional_review": "pending"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P257 | content_and_data_prepared; professional/implementation gates remain | 明确水平和目标的练习安排样例；资源链接；可选打印清单 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- E-REVIEW-piano-practice — professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

来源：BN-OMT-CLEFS, E-DURATION

## /guide/music-symbols-and-piano-terms

[已核实] 目标关键词：`piano terms`；模板 T22；基线优先级：后做。
状态：`content_and_data_prepared`；发布状态：未验收。

任务：Interpret common notation and performance words without mixing them with instrument names.

### 页面需回答的问题

- What does piano mean on a score?
- How do note symbols and performance words differ?
- How should I interpret repeat directions?

### 英文页面内容

**Music Symbols and Piano Terms**

Look up a marking, its meaning and a short reading example.

#### Piano on a score means soft

As a dynamic instruction, piano, abbreviated p, means soft. It does not ask for a different instrument. The nearby musical context tells you where the dynamic begins and how it relates to surrounding markings.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-TERMS。 

#### Read symbols by their job

A clef sets the pitch reference, an accidental changes a written pitch, and a note or rest value gives duration. A dot beside a note adds duration; a staccato dot above or below a note asks for separation. Position matters.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：BN-OMT-CLEFS, BN-MUSICCA-ACCIDENTALS, E-DURATION, E-DOTS, E-TERMS。 

#### Follow the whole instruction

D.C. asks for a return to the beginning; D.S. asks for a return to the segno. A following al Fine tells you to end at Fine after that return. Read the full direction and its destination together. Tempo words such as allegro do not specify one universal metronome number.

[已核实] factual core; [推断] editorial exercise/method where stated 来源：E-TERMS。 

### 结构化数据

```json
{
  "terms": [
    {
      "term": "piano",
      "abbreviation": "p",
      "meaning": "soft",
      "example": "Play the marked phrase softly.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "forte",
      "abbreviation": "f",
      "meaning": "loud",
      "example": "Play the marked phrase loudly, with control.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "pianissimo",
      "abbreviation": "pp",
      "meaning": "very soft",
      "example": "Use a softer dynamic than p in this passage.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "mezzo piano",
      "abbreviation": "mp",
      "meaning": "moderately soft",
      "example": "Set a moderate soft dynamic.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "mezzo forte",
      "abbreviation": "mf",
      "meaning": "moderately loud",
      "example": "Set a moderate loud dynamic.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "fortissimo",
      "abbreviation": "ff",
      "meaning": "very loud",
      "example": "Use the marked strong dynamic.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "crescendo",
      "abbreviation": "cresc.",
      "meaning": "gradually louder",
      "example": "Increase loudness across the marked span.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "diminuendo",
      "abbreviation": "dim.",
      "meaning": "gradually softer",
      "example": "Reduce loudness across the marked span.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "allegro",
      "abbreviation": null,
      "meaning": "fast",
      "example": "Treat the tempo word as context, not one fixed BPM.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "andante",
      "abbreviation": null,
      "meaning": "at a walking pace",
      "example": "Choose the pulse in the context of the piece.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "adagio",
      "abbreviation": null,
      "meaning": "slow",
      "example": "Use the score or edition for a metronome indication.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "legato",
      "abbreviation": null,
      "meaning": "smoothly connected",
      "example": "Connect the indicated phrase.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "staccato",
      "abbreviation": "stacc.",
      "meaning": "shortened and separated",
      "example": "Shorten the marked note without deleting its place in the rhythm.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "mano destra",
      "abbreviation": "m.d.",
      "meaning": "right hand",
      "example": "Assign the marked passage to the right hand.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "mano sinistra",
      "abbreviation": "m.s.",
      "meaning": "left hand",
      "example": "Assign the marked passage to the left hand.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "Da Capo",
      "abbreviation": "D.C.",
      "meaning": "from the beginning",
      "example": "Return to the beginning when instructed.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "Dal Segno",
      "abbreviation": "D.S.",
      "meaning": "from the sign",
      "example": "Return to the marked segno.",
      "source_ids": [
        "E-TERMS"
      ]
    },
    {
      "term": "Fine",
      "abbreviation": null,
      "meaning": "end",
      "example": "Stop here after the relevant return instruction.",
      "source_ids": [
        "E-TERMS"
      ]
    }
  ],
  "symbols": [
    {
      "name": "treble clef",
      "smufl": "E050",
      "meaning": "G4 on second line",
      "source_ids": [
        "BN-OMT-CLEFS"
      ]
    },
    {
      "name": "bass clef",
      "smufl": "E062",
      "meaning": "F3 on fourth line",
      "source_ids": [
        "BN-OMT-CLEFS"
      ]
    },
    {
      "name": "sharp",
      "smufl": "E262",
      "meaning": "raise written pitch by a semitone",
      "source_ids": [
        "BN-MUSICCA-ACCIDENTALS"
      ]
    },
    {
      "name": "flat",
      "smufl": "E260",
      "meaning": "lower written pitch by a semitone",
      "source_ids": [
        "BN-MUSICCA-ACCIDENTALS"
      ]
    },
    {
      "name": "natural",
      "smufl": "E261",
      "meaning": "cancel the applicable sharp or flat",
      "source_ids": [
        "BN-MUSICCA-ACCIDENTALS"
      ]
    },
    {
      "name": "duration dot",
      "smufl": "E1E7",
      "meaning": "add half the undotted value",
      "source_ids": [
        "E-DOTS"
      ]
    }
  ],
  "duration_symbols": [
    [
      "whole",
      "semibreve",
      4,
      "E1D2",
      "E4E3"
    ],
    [
      "half",
      "minim",
      2,
      "E1D3",
      "E4E4"
    ],
    [
      "quarter",
      "crotchet",
      1,
      "E1D5",
      "E4E5"
    ],
    [
      "eighth",
      "quaver",
      0.5,
      "E1D7",
      "E4E6"
    ],
    [
      "sixteenth",
      "semiquaver",
      0.25,
      "E1D9",
      "E4E7"
    ]
  ],
  "symbol_asset": "assets/music-symbols.svg",
  "professional_review": "not claimed"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P144 | content_and_data_prepared; professional/implementation gates remain | 乐谱记号参考；必须在该页提供实际结果，不只增加一个关键词。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P256 | content_and_data_prepared; professional/implementation gates remain | 说明谱面 piano 用语，区别乐器主题，不作完整新词页。 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |
| P262 | content_and_data_prepared; professional/implementation gates remain | 可索引术语表；每项原意和示例；piano力度词条；不编造词义 — see named modules and data below. | Professional review where required; final asset/link integration. Specific gaps are listed in issues. |

### 待确认

- 无新增音乐事实缺项；开发后仍需按基线完成播放、打印、资源链接等验收。

来源：E-TERMS, BN-OMT-CLEFS, BN-MUSICCA-ACCIDENTALS, E-DURATION, E-DOTS

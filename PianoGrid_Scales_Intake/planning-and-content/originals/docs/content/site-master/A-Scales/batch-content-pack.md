# Batch A — Scales + Arpeggios

[已核实] 共 26 页。基线字段原样保留，核查日期 2026-09-09。

证据标签为后台记录；英文文案在各模块 body 中。计算数据与编辑建议标 [推断]。待确认字段不供上线渲染。

## /scales

[已核实] 目标关键词：`piano scales`；模板 T11；基线优先级：先做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a scale and understand its notes, form, fingering availability and next practice action.

### 页面需回答的问题

- Which notes belong to my scale?
- How do natural, harmonic and melodic minor differ?
- What do scale degrees mean?
- Which hand, direction and range does a fingering cover?
- What can I listen to or print?

### 英文页面内容

**Piano Scales: Notes, Patterns and Practice References**

Compare major and minor scale notes, explore other scale types, and check the exact form before practicing.

#### Piano scales: choose a sound, then a starting note

Start with C major: C–D–E–F–G–A–B–C. Choose another tonic to compare its notes. The final C repeats the first note one octave higher; it is not an eighth distinct scale degree.

[已核实] 来源：AC-01, AC-04。 

#### Read the pattern

For a major scale, move by whole, whole, half, whole, whole, whole, half steps. A whole step spans two adjacent-key steps; a half step spans one. Keep the note spelling shown for the chosen key. Fifteen conventional major-key spellings in this chart represent twelve tonic pitch classes on an equal-tempered keyboard.

[推断] 由核实音程及本表15行音高类集合计算 来源：AC-01, AC-04。 

#### Choose the minor form

A natural minor uses A–B–C–D–E–F–G. Harmonic minor raises G to G♯. Classical melodic minor raises F and G on the way up and returns to the natural-minor notes on the way down. Select the form before comparing, listening, or printing.

[已核实] 来源：AC-02。 

#### Same notes or same tonic?

C major and A natural minor share a note collection but organize it around different tonics. C major and C minor start on the same tonic; C natural minor lowers E, A and B to E♭, A♭ and B♭.

[已核实] 来源：AC-02。 

#### Give each note a job

In C major the degrees are C tonic, D supertonic, E mediant, F subdominant, G dominant, A submediant and B leading tone. In natural minor, degree seven is a whole step below the tonic and is called the subtonic.

[已核实] 来源：AC-01, AC-02。 

#### A few jazz scale examples

Compare C Dorian (C D E♭ F G A B♭), C Mixolydian (C D E F G A B♭), and C blues (C E♭ F G♭ G B♭). Bebop dominant adds a major seventh to Mixolydian; C B B♭ A G F E D C gives a descending example. The choice of notes still depends on the musical context.

[已核实] 来源：AC-03。 

#### Continue with a different type

Use the modes page to compare seven diatonic modes. Pentatonic and blues pages show their own note collections. Chromatic practice moves through every neighboring key. Harmonic major has its own reference page; it is not another name for harmonic minor.

[推断] 根据已规划类型页组织导航；定义以对应页来源为准 来源：AC-03。 

#### Try one comparison

Pick two examples and name the notes that change. Play one hand at a time at a pace you can follow. Keep the tonic visible in the result. When a fingering is available, use only its stated hand, direction and octave range; a blank field is not an invitation to reuse another scale’s fingering.

[推断] 原创编辑练习与数据使用约束 来源：原创编辑建议。 

#### Print the selected reference

The print view should name the tonic, scale form, direction and range, and show exactly the notes in the result. Finger numbers belong on the printout only when that combination has been checked. See the individual scale reference for its available fingering.

[推断] 待实现功能文案，非已上线声明 来源：原创编辑建议。 

### 结构化数据

```json
{
  "default_selection": {
    "tonic": "C",
    "form": "major",
    "range_octaves": 1,
    "hand": "right",
    "direction": "ascending"
  },
  "major_overview": [
    {
      "tonic": "C",
      "notes": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "B"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "Db",
      "notes": [
        "Db",
        "Eb",
        "F",
        "Gb",
        "Ab",
        "Bb",
        "C"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "D",
      "notes": [
        "D",
        "E",
        "F#",
        "G",
        "A",
        "B",
        "C#"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "Eb",
      "notes": [
        "Eb",
        "F",
        "G",
        "Ab",
        "Bb",
        "C",
        "D"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "E",
      "notes": [
        "E",
        "F#",
        "G#",
        "A",
        "B",
        "C#",
        "D#"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "F",
      "notes": [
        "F",
        "G",
        "A",
        "Bb",
        "C",
        "D",
        "E"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "F#",
      "notes": [
        "F#",
        "G#",
        "A#",
        "B",
        "C#",
        "D#",
        "E#"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "G",
      "notes": [
        "G",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F#"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "Ab",
      "notes": [
        "Ab",
        "Bb",
        "C",
        "Db",
        "Eb",
        "F",
        "G"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "A",
      "notes": [
        "A",
        "B",
        "C#",
        "D",
        "E",
        "F#",
        "G#"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "Bb",
      "notes": [
        "Bb",
        "C",
        "D",
        "Eb",
        "F",
        "G",
        "A"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "B",
      "notes": [
        "B",
        "C#",
        "D#",
        "E",
        "F#",
        "G#",
        "A#"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "Cb",
      "notes": [
        "Cb",
        "Db",
        "Eb",
        "Fb",
        "Gb",
        "Ab",
        "Bb"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "Gb",
      "notes": [
        "Gb",
        "Ab",
        "Bb",
        "Cb",
        "Db",
        "Eb",
        "F"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    },
    {
      "tonic": "C#",
      "notes": [
        "C#",
        "D#",
        "E#",
        "F#",
        "G#",
        "A#",
        "B#"
      ],
      "evidence_status": "[推断] 用已核实大调音程及逐字母拼写规则计算；与本批具体页交叉核对",
      "source_ids": [
        "AC-01",
        "AC-04"
      ]
    }
  ],
  "form_comparison": [
    {
      "id": "major",
      "steps_semitones": [
        2,
        2,
        1,
        2,
        2,
        2,
        1
      ],
      "C_example": [
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
      "id": "natural-minor",
      "steps_semitones": [
        2,
        1,
        2,
        2,
        1,
        2,
        2
      ],
      "A_example": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "A"
      ]
    },
    {
      "id": "harmonic-minor",
      "steps_semitones": [
        2,
        1,
        2,
        2,
        1,
        3,
        1
      ],
      "A_example": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G#",
        "A"
      ]
    },
    {
      "id": "melodic-minor-classical",
      "ascending_steps_semitones": [
        2,
        1,
        2,
        2,
        2,
        2,
        1
      ],
      "A_ascending": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F#",
        "G#",
        "A"
      ],
      "A_descending": [
        "A",
        "G",
        "F",
        "E",
        "D",
        "C",
        "B",
        "A"
      ]
    }
  ],
  "scale_degrees": [
    {
      "degree": 1,
      "name": "tonic"
    },
    {
      "degree": 2,
      "name": "supertonic"
    },
    {
      "degree": 3,
      "name": "mediant"
    },
    {
      "degree": 4,
      "name": "subdominant"
    },
    {
      "degree": 5,
      "name": "dominant"
    },
    {
      "degree": 6,
      "name": "submediant"
    },
    {
      "degree": 7,
      "name": "leading tone"
    }
  ],
  "jazz_examples": [
    {
      "name": "C Dorian",
      "notes": [
        "C",
        "D",
        "Eb",
        "F",
        "G",
        "A",
        "Bb"
      ]
    },
    {
      "name": "C Mixolydian",
      "notes": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "Bb"
      ]
    },
    {
      "name": "C blues",
      "notes": [
        "C",
        "Eb",
        "F",
        "Gb",
        "G",
        "Bb"
      ]
    },
    {
      "name": "C bebop dominant",
      "descending": [
        "C5",
        "B4",
        "Bb4",
        "A4",
        "G4",
        "F4",
        "E4",
        "D4",
        "C4"
      ]
    }
  ],
  "fingering_resolution": "Reuse exact verified hand/direction/octave records from the corresponding batch-A page; no pattern inference.",
  "print_assets": null,
  "audio_assets": null,
  "ui_copy": {
    "tonic": "Starting note",
    "form": "Scale type",
    "direction": "Direction",
    "hand": "Hand",
    "range": "Octaves",
    "play": "Play scale",
    "stop": "Stop",
    "print": "Print this scale",
    "unverified_fingering": "Fingering is not available for this selection."
  },
  "source_ids": [
    "AC-01",
    "AC-02",
    "AC-03",
    "AC-04"
  ],
  "evidence_status": "[推断] 表中音阶序列依核实规则构造；来源支持规则，非对每条机器输出作独立出版核验",
  "minor_overview": [
    {
      "tonic": "A",
      "natural_ascending": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "A"
      ],
      "natural_descending": [
        "A",
        "G",
        "F",
        "E",
        "D",
        "C",
        "B",
        "A"
      ],
      "harmonic_ascending": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G#",
        "A"
      ],
      "harmonic_descending": [
        "A",
        "G#",
        "F",
        "E",
        "D",
        "C",
        "B",
        "A"
      ],
      "melodic_classical_ascending": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F#",
        "G#",
        "A"
      ],
      "melodic_classical_descending": [
        "A",
        "G",
        "F",
        "E",
        "D",
        "C",
        "B",
        "A"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "E",
      "natural_ascending": [
        "E",
        "F#",
        "G",
        "A",
        "B",
        "C",
        "D",
        "E"
      ],
      "natural_descending": [
        "E",
        "D",
        "C",
        "B",
        "A",
        "G",
        "F#",
        "E"
      ],
      "harmonic_ascending": [
        "E",
        "F#",
        "G",
        "A",
        "B",
        "C",
        "D#",
        "E"
      ],
      "harmonic_descending": [
        "E",
        "D#",
        "C",
        "B",
        "A",
        "G",
        "F#",
        "E"
      ],
      "melodic_classical_ascending": [
        "E",
        "F#",
        "G",
        "A",
        "B",
        "C#",
        "D#",
        "E"
      ],
      "melodic_classical_descending": [
        "E",
        "D",
        "C",
        "B",
        "A",
        "G",
        "F#",
        "E"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "B",
      "natural_ascending": [
        "B",
        "C#",
        "D",
        "E",
        "F#",
        "G",
        "A",
        "B"
      ],
      "natural_descending": [
        "B",
        "A",
        "G",
        "F#",
        "E",
        "D",
        "C#",
        "B"
      ],
      "harmonic_ascending": [
        "B",
        "C#",
        "D",
        "E",
        "F#",
        "G",
        "A#",
        "B"
      ],
      "harmonic_descending": [
        "B",
        "A#",
        "G",
        "F#",
        "E",
        "D",
        "C#",
        "B"
      ],
      "melodic_classical_ascending": [
        "B",
        "C#",
        "D",
        "E",
        "F#",
        "G#",
        "A#",
        "B"
      ],
      "melodic_classical_descending": [
        "B",
        "A",
        "G",
        "F#",
        "E",
        "D",
        "C#",
        "B"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "F#",
      "natural_ascending": [
        "F#",
        "G#",
        "A",
        "B",
        "C#",
        "D",
        "E",
        "F#"
      ],
      "natural_descending": [
        "F#",
        "E",
        "D",
        "C#",
        "B",
        "A",
        "G#",
        "F#"
      ],
      "harmonic_ascending": [
        "F#",
        "G#",
        "A",
        "B",
        "C#",
        "D",
        "E#",
        "F#"
      ],
      "harmonic_descending": [
        "F#",
        "E#",
        "D",
        "C#",
        "B",
        "A",
        "G#",
        "F#"
      ],
      "melodic_classical_ascending": [
        "F#",
        "G#",
        "A",
        "B",
        "C#",
        "D#",
        "E#",
        "F#"
      ],
      "melodic_classical_descending": [
        "F#",
        "E",
        "D",
        "C#",
        "B",
        "A",
        "G#",
        "F#"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "C#",
      "natural_ascending": [
        "C#",
        "D#",
        "E",
        "F#",
        "G#",
        "A",
        "B",
        "C#"
      ],
      "natural_descending": [
        "C#",
        "B",
        "A",
        "G#",
        "F#",
        "E",
        "D#",
        "C#"
      ],
      "harmonic_ascending": [
        "C#",
        "D#",
        "E",
        "F#",
        "G#",
        "A",
        "B#",
        "C#"
      ],
      "harmonic_descending": [
        "C#",
        "B#",
        "A",
        "G#",
        "F#",
        "E",
        "D#",
        "C#"
      ],
      "melodic_classical_ascending": [
        "C#",
        "D#",
        "E",
        "F#",
        "G#",
        "A#",
        "B#",
        "C#"
      ],
      "melodic_classical_descending": [
        "C#",
        "B",
        "A",
        "G#",
        "F#",
        "E",
        "D#",
        "C#"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "G#",
      "natural_ascending": [
        "G#",
        "A#",
        "B",
        "C#",
        "D#",
        "E",
        "F#",
        "G#"
      ],
      "natural_descending": [
        "G#",
        "F#",
        "E",
        "D#",
        "C#",
        "B",
        "A#",
        "G#"
      ],
      "harmonic_ascending": [
        "G#",
        "A#",
        "B",
        "C#",
        "D#",
        "E",
        "F##",
        "G#"
      ],
      "harmonic_descending": [
        "G#",
        "F##",
        "E",
        "D#",
        "C#",
        "B",
        "A#",
        "G#"
      ],
      "melodic_classical_ascending": [
        "G#",
        "A#",
        "B",
        "C#",
        "D#",
        "E#",
        "F##",
        "G#"
      ],
      "melodic_classical_descending": [
        "G#",
        "F#",
        "E",
        "D#",
        "C#",
        "B",
        "A#",
        "G#"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "D#",
      "natural_ascending": [
        "D#",
        "E#",
        "F#",
        "G#",
        "A#",
        "B",
        "C#",
        "D#"
      ],
      "natural_descending": [
        "D#",
        "C#",
        "B",
        "A#",
        "G#",
        "F#",
        "E#",
        "D#"
      ],
      "harmonic_ascending": [
        "D#",
        "E#",
        "F#",
        "G#",
        "A#",
        "B",
        "C##",
        "D#"
      ],
      "harmonic_descending": [
        "D#",
        "C##",
        "B",
        "A#",
        "G#",
        "F#",
        "E#",
        "D#"
      ],
      "melodic_classical_ascending": [
        "D#",
        "E#",
        "F#",
        "G#",
        "A#",
        "B#",
        "C##",
        "D#"
      ],
      "melodic_classical_descending": [
        "D#",
        "C#",
        "B",
        "A#",
        "G#",
        "F#",
        "E#",
        "D#"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "A#",
      "natural_ascending": [
        "A#",
        "B#",
        "C#",
        "D#",
        "E#",
        "F#",
        "G#",
        "A#"
      ],
      "natural_descending": [
        "A#",
        "G#",
        "F#",
        "E#",
        "D#",
        "C#",
        "B#",
        "A#"
      ],
      "harmonic_ascending": [
        "A#",
        "B#",
        "C#",
        "D#",
        "E#",
        "F#",
        "G##",
        "A#"
      ],
      "harmonic_descending": [
        "A#",
        "G##",
        "F#",
        "E#",
        "D#",
        "C#",
        "B#",
        "A#"
      ],
      "melodic_classical_ascending": [
        "A#",
        "B#",
        "C#",
        "D#",
        "E#",
        "F##",
        "G##",
        "A#"
      ],
      "melodic_classical_descending": [
        "A#",
        "G#",
        "F#",
        "E#",
        "D#",
        "C#",
        "B#",
        "A#"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "D",
      "natural_ascending": [
        "D",
        "E",
        "F",
        "G",
        "A",
        "Bb",
        "C",
        "D"
      ],
      "natural_descending": [
        "D",
        "C",
        "Bb",
        "A",
        "G",
        "F",
        "E",
        "D"
      ],
      "harmonic_ascending": [
        "D",
        "E",
        "F",
        "G",
        "A",
        "Bb",
        "C#",
        "D"
      ],
      "harmonic_descending": [
        "D",
        "C#",
        "Bb",
        "A",
        "G",
        "F",
        "E",
        "D"
      ],
      "melodic_classical_ascending": [
        "D",
        "E",
        "F",
        "G",
        "A",
        "B",
        "C#",
        "D"
      ],
      "melodic_classical_descending": [
        "D",
        "C",
        "Bb",
        "A",
        "G",
        "F",
        "E",
        "D"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "G",
      "natural_ascending": [
        "G",
        "A",
        "Bb",
        "C",
        "D",
        "Eb",
        "F",
        "G"
      ],
      "natural_descending": [
        "G",
        "F",
        "Eb",
        "D",
        "C",
        "Bb",
        "A",
        "G"
      ],
      "harmonic_ascending": [
        "G",
        "A",
        "Bb",
        "C",
        "D",
        "Eb",
        "F#",
        "G"
      ],
      "harmonic_descending": [
        "G",
        "F#",
        "Eb",
        "D",
        "C",
        "Bb",
        "A",
        "G"
      ],
      "melodic_classical_ascending": [
        "G",
        "A",
        "Bb",
        "C",
        "D",
        "E",
        "F#",
        "G"
      ],
      "melodic_classical_descending": [
        "G",
        "F",
        "Eb",
        "D",
        "C",
        "Bb",
        "A",
        "G"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "C",
      "natural_ascending": [
        "C",
        "D",
        "Eb",
        "F",
        "G",
        "Ab",
        "Bb",
        "C"
      ],
      "natural_descending": [
        "C",
        "Bb",
        "Ab",
        "G",
        "F",
        "Eb",
        "D",
        "C"
      ],
      "harmonic_ascending": [
        "C",
        "D",
        "Eb",
        "F",
        "G",
        "Ab",
        "B",
        "C"
      ],
      "harmonic_descending": [
        "C",
        "B",
        "Ab",
        "G",
        "F",
        "Eb",
        "D",
        "C"
      ],
      "melodic_classical_ascending": [
        "C",
        "D",
        "Eb",
        "F",
        "G",
        "A",
        "B",
        "C"
      ],
      "melodic_classical_descending": [
        "C",
        "Bb",
        "Ab",
        "G",
        "F",
        "Eb",
        "D",
        "C"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "F",
      "natural_ascending": [
        "F",
        "G",
        "Ab",
        "Bb",
        "C",
        "Db",
        "Eb",
        "F"
      ],
      "natural_descending": [
        "F",
        "Eb",
        "Db",
        "C",
        "Bb",
        "Ab",
        "G",
        "F"
      ],
      "harmonic_ascending": [
        "F",
        "G",
        "Ab",
        "Bb",
        "C",
        "Db",
        "E",
        "F"
      ],
      "harmonic_descending": [
        "F",
        "E",
        "Db",
        "C",
        "Bb",
        "Ab",
        "G",
        "F"
      ],
      "melodic_classical_ascending": [
        "F",
        "G",
        "Ab",
        "Bb",
        "C",
        "D",
        "E",
        "F"
      ],
      "melodic_classical_descending": [
        "F",
        "Eb",
        "Db",
        "C",
        "Bb",
        "Ab",
        "G",
        "F"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "Bb",
      "natural_ascending": [
        "Bb",
        "C",
        "Db",
        "Eb",
        "F",
        "Gb",
        "Ab",
        "Bb"
      ],
      "natural_descending": [
        "Bb",
        "Ab",
        "Gb",
        "F",
        "Eb",
        "Db",
        "C",
        "Bb"
      ],
      "harmonic_ascending": [
        "Bb",
        "C",
        "Db",
        "Eb",
        "F",
        "Gb",
        "A",
        "Bb"
      ],
      "harmonic_descending": [
        "Bb",
        "A",
        "Gb",
        "F",
        "Eb",
        "Db",
        "C",
        "Bb"
      ],
      "melodic_classical_ascending": [
        "Bb",
        "C",
        "Db",
        "Eb",
        "F",
        "G",
        "A",
        "Bb"
      ],
      "melodic_classical_descending": [
        "Bb",
        "Ab",
        "Gb",
        "F",
        "Eb",
        "Db",
        "C",
        "Bb"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "Eb",
      "natural_ascending": [
        "Eb",
        "F",
        "Gb",
        "Ab",
        "Bb",
        "Cb",
        "Db",
        "Eb"
      ],
      "natural_descending": [
        "Eb",
        "Db",
        "Cb",
        "Bb",
        "Ab",
        "Gb",
        "F",
        "Eb"
      ],
      "harmonic_ascending": [
        "Eb",
        "F",
        "Gb",
        "Ab",
        "Bb",
        "Cb",
        "D",
        "Eb"
      ],
      "harmonic_descending": [
        "Eb",
        "D",
        "Cb",
        "Bb",
        "Ab",
        "Gb",
        "F",
        "Eb"
      ],
      "melodic_classical_ascending": [
        "Eb",
        "F",
        "Gb",
        "Ab",
        "Bb",
        "C",
        "D",
        "Eb"
      ],
      "melodic_classical_descending": [
        "Eb",
        "Db",
        "Cb",
        "Bb",
        "Ab",
        "Gb",
        "F",
        "Eb"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    },
    {
      "tonic": "Ab",
      "natural_ascending": [
        "Ab",
        "Bb",
        "Cb",
        "Db",
        "Eb",
        "Fb",
        "Gb",
        "Ab"
      ],
      "natural_descending": [
        "Ab",
        "Gb",
        "Fb",
        "Eb",
        "Db",
        "Cb",
        "Bb",
        "Ab"
      ],
      "harmonic_ascending": [
        "Ab",
        "Bb",
        "Cb",
        "Db",
        "Eb",
        "Fb",
        "G",
        "Ab"
      ],
      "harmonic_descending": [
        "Ab",
        "G",
        "Fb",
        "Eb",
        "Db",
        "Cb",
        "Bb",
        "Ab"
      ],
      "melodic_classical_ascending": [
        "Ab",
        "Bb",
        "Cb",
        "Db",
        "Eb",
        "F",
        "G",
        "Ab"
      ],
      "melodic_classical_descending": [
        "Ab",
        "Gb",
        "Fb",
        "Eb",
        "Db",
        "Cb",
        "Bb",
        "Ab"
      ],
      "fingering": null,
      "evidence_status": "[推断] 根据双源核实的三种小调音程规则与逐字母拼写计算；非指法推算",
      "source_ids": [
        "AC-02",
        "AC-03"
      ]
    }
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P179 | partial | 对应英文模块与data中的真实定义、例子或大调总表 | 试听与打印实现验收 |
| P180 | partial | 对应英文模块与data中的真实定义、例子或大调总表 | 实际PDF文件及范围验收 |
| P181 | content_prepared | 对应英文模块与data中的真实定义、例子或大调总表 |  |
| P190 | content_prepared | 对应英文模块与data中的真实定义、例子或大调总表 |  |
| P196 | content_prepared | 15种调性拼写的三种小调上下行音名表；未推测指法 | 各调音图和试听的实现验收 |
| P204 | content_prepared | 对应英文模块与data中的真实定义、例子或大调总表 |  |
| P208 | partial | 对应英文模块与data中的真实定义、例子或大调总表 | 未核手别/方向的指法 |
| P210 | partial | 对应英文模块与data中的真实定义、例子或大调总表 | 实际PDF文件及范围验收 |
| P213 | content_prepared | 对应英文模块与data中的真实定义、例子或大调总表 |  |
| P214 | partial | 对应英文模块与data中的真实定义、例子或大调总表 | 浏览器实际查询功能验收 |
| P222 | content_prepared | 对应英文模块与data中的真实定义、例子或大调总表 |  |
| P224 | content_prepared | 对应英文模块与data中的真实定义、例子或大调总表 |  |
| P233 | content_prepared | 对应英文模块与data中的真实定义、例子或大调总表 |  |
| P235 | content_prepared | 对应英文模块与data中的真实定义、例子或大调总表 |  |

### 待确认

- A-CENTER-PRINT — data.print_assets：本轮提供打印内容及字段；尚无涵盖全中心范围的真实PDF资产，不能宣称all/双手PDF交付。；解决：由本批已核实手别/方向数据生成原创PDF并视觉验收；未核指法组合不输出数字。
- A-CENTER-IMPLEMENT — playback/print：提供内容与选择数据；查询、播放、打印功能未开发验收。；解决：Codex实现后对显示/发声/打印三者一致性验收。

来源：AC-01, AC-02, AC-03, AC-04

## /scales/c-major

[已核实] 目标关键词：`c major scale piano`；模板 T12；基线优先级：先做。
状态：`content_data_ready_with_implementation_qa_pending`；发布状态：未验收。

任务：Find the C-major notes and learn the first one-octave hand crossing without confusing scale degrees with finger numbers.

### 页面需回答的问题

- What are the notes and key signature of C major?
- Why are E–F and B–C closer in pitch even though the scale uses only white keys?
- Which fingers are used by each hand ascending and descending over one octave?
- What should I check during a short practice run?

### 英文页面内容

**C Major Piano Scale: Notes and Fingering**

See C major notes, key signature, keyboard pitches and separately verified one-octave fingering for each hand and direction.

#### C Major notes

C Major contains C, D, E, F, G, A, B. Repeat C at the top to complete one octave. Its key signature has no sharps or flats.

[已核实] 来源：AM-NOTES-C-MAJOR, AM-FINGER-LMT。 

#### White keys, unequal distances

C major uses only white keys, but those keys are not equally spaced in pitch. E–F and B–C are half steps; the other adjacent pairs in the scale are whole steps. Keep that distinction when checking the keyboard against the staff. Beginning on another white key does not preserve the C-major tonic.

[推断] 来源：AM-NOTES-C-MAJOR, AM-FINGER-LMT, AM-THEORY。 Explanatory relationships derived from independently checked note spelling and the verified major-scale interval rule.

#### One-octave fingering

In this one-octave version, the right hand crosses from E with finger 3 to F with the thumb. The left hand crosses from G with the thumb to A with finger 3. Read the separate descending row when coming back. Finger numbers identify the fingers, not the scale degrees.

[已核实] 来源：AM-FINGER-LMT, AM-FINGER-MF。 

#### A short practice check

Suggested drill: play C–D–E, pause, then continue F–G–A–B–C with the printed right-hand fingers. Next, connect E–F without the pause. With the left hand, isolate G–A instead. Finish with one unhurried ascent and descent, saying each note name.

[推断] 来源：AM-FINGER-LMT, AM-FINGER-MF, AM-NOTES-C-MAJOR, AM-FINGER-LMT。 Original suggested drill using only the source-verified notes and explicit fingering for this key. No effectiveness or fixed learning-time claim.

### 结构化数据

```json
{
  "tonic": "C",
  "scale_type": "major",
  "notes_ascending": [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "C"
  ],
  "notes_descending": [
    "C",
    "B",
    "A",
    "G",
    "F",
    "E",
    "D",
    "C"
  ],
  "note_spelling_status": "[已核实]",
  "note_source_ids": [
    "AM-NOTES-C-MAJOR",
    "AM-FINGER-LMT"
  ],
  "key_signature": {
    "fifths": 0,
    "ordered_accidentals": [],
    "count": 0,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AM-NOTES-C-MAJOR",
      "AM-FINGER-LMT"
    ]
  },
  "intervals": {
    "ascending_semitones": [
      2,
      2,
      1,
      2,
      2,
      2,
      1
    ],
    "descending_semitones": [
      1,
      2,
      2,
      2,
      1,
      2,
      2
    ],
    "half_step_pairs": [
      [
        "E",
        "F"
      ],
      [
        "B",
        "C"
      ]
    ],
    "evidence_status": "[推断]",
    "basis": "Apply the verified major-scale interval rule to the independently checked note spelling. Descending order follows the same pitches from upper tonic to lower tonic.",
    "source_ids": [
      "AM-NOTES-C-MAJOR",
      "AM-FINGER-LMT",
      "AM-THEORY"
    ]
  },
  "display_register": {
    "RH": "tonic written in octave 4 to tonic written in octave 5",
    "LH": "tonic written in octave 3 to tonic written in octave 4",
    "evidence_status": "[推断]",
    "basis": "Editorial display choice; octave labels follow MusicXML C4=middle C; each accidental remains attached to its written octave. This register choice is not asserted to be a source-prescribed exercise range.",
    "source_ids": [
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "pitch_sequences": {
    "RH": {
      "ascending": [
        {
          "note": "C4",
          "step": "C",
          "alter": 0,
          "octave": 4,
          "midi": 60,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "F4",
          "step": "F",
          "alter": 0,
          "octave": 4,
          "midi": 65,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "C5",
          "step": "C",
          "alter": 0,
          "octave": 5,
          "midi": 72,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "C5",
          "step": "C",
          "alter": 0,
          "octave": 5,
          "midi": 72,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "F4",
          "step": "F",
          "alter": 0,
          "octave": 4,
          "midi": 65,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "C4",
          "step": "C",
          "alter": 0,
          "octave": 4,
          "midi": 60,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "LH": {
      "ascending": [
        {
          "note": "C3",
          "step": "C",
          "alter": 0,
          "octave": 3,
          "midi": 48,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "D3",
          "step": "D",
          "alter": 0,
          "octave": 3,
          "midi": 50,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "E3",
          "step": "E",
          "alter": 0,
          "octave": 3,
          "midi": 52,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "F3",
          "step": "F",
          "alter": 0,
          "octave": 3,
          "midi": 53,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "G3",
          "step": "G",
          "alter": 0,
          "octave": 3,
          "midi": 55,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "A3",
          "step": "A",
          "alter": 0,
          "octave": 3,
          "midi": 57,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "B3",
          "step": "B",
          "alter": 0,
          "octave": 3,
          "midi": 59,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "C4",
          "step": "C",
          "alter": 0,
          "octave": 4,
          "midi": 60,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "C4",
          "step": "C",
          "alter": 0,
          "octave": 4,
          "midi": 60,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "B3",
          "step": "B",
          "alter": 0,
          "octave": 3,
          "midi": 59,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "A3",
          "step": "A",
          "alter": 0,
          "octave": 3,
          "midi": 57,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "G3",
          "step": "G",
          "alter": 0,
          "octave": 3,
          "midi": 55,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "F3",
          "step": "F",
          "alter": 0,
          "octave": 3,
          "midi": 53,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "E3",
          "step": "E",
          "alter": 0,
          "octave": 3,
          "midi": 52,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "D3",
          "step": "D",
          "alter": 0,
          "octave": 3,
          "midi": 50,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "C3",
          "step": "C",
          "alter": 0,
          "octave": 3,
          "midi": 48,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "evidence_status": "[推断]",
    "basis": "MIDI = 12*(written_octave+1)+natural_letter_pitch_class+alter; computed from verified spelling. Cb4=59, equivalent to B3, not B4.",
    "source_ids": [
      "AM-NOTES-C-MAJOR",
      "AM-FINGER-LMT",
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "fingering": {
    "instrument": "piano",
    "motion": "similar motion or hands separately",
    "octaves": 1,
    "directions_in_performance_order": true,
    "RH": {
      "ascending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ],
      "descending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ]
    },
    "LH": {
      "ascending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ],
      "descending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ]
    },
    "evidence_status": "[已核实]",
    "verification": "explicit_two_independent_source_charts",
    "source_ids": [
      "AM-FINGER-LMT",
      "AM-FINGER-MF"
    ],
    "source_locator": "LearnMusicTheory PDF page 1 C major row; Music Fun PDF page 3 staff",
    "review_status": "source_verified; professional release review pending",
    "variant_note": "A source-documented single-octave choice, not a claim that no alternative fingering is valid. Do not extend to multiple octaves by repeating these rows.",
    "additional_octave_fingerings": null,
    "direction_evidence": "Both ascending and descending notes and finger numbers were read directly in each displayed source staff; descending arrays were not merely assumed from an ascending-only source.",
    "visual_evidence_refs": [
      "turn781025view0",
      "turn655244view0"
    ]
  },
  "renderer_payload": {
    "clefs": {
      "RH": "treble",
      "LH": "bass"
    },
    "key_fifths": 0,
    "mode": "major",
    "duration_beats_per_note": 1,
    "default_tempo_bpm": 60,
    "tempo_status": "editorial playback default; not a sourced examination speed or promised learning target",
    "ascending_then_descending_index_order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "source_of_truth": "pitch_sequences plus same-hand fingering rows; no automatic enharmonic respelling",
    "print_fields": [
      "title",
      "key_signature",
      "note_spelling",
      "selected_hand",
      "one_octave_range",
      "ascending_and_descending_staff_notes",
      "matching_fingering",
      "short_practice_tip",
      "source_ids"
    ],
    "status": "content_and_data_handoff; notation/audio/print implementations have not been built or tested"
  },
  "labels": {
    "hand": "Hand",
    "right_hand": "Right hand",
    "left_hand": "Left hand",
    "both_hands": "Both hands",
    "direction": "Direction",
    "ascending": "Ascending",
    "descending": "Descending",
    "up_and_down": "Up and down",
    "octaves": "1 octave",
    "play": "Play scale",
    "stop": "Stop",
    "print": "Print current scale"
  },
  "related_links": [
    {
      "url": "/scales",
      "label": "All piano scales",
      "activation": "only when target is live"
    }
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P183 | content_data_prepared; rendered delivery pending | ['independent English page content', 'notes and key signature cross-checked', 'spelled pitches with octave and MIDI mapping', 'source-specific one-octave RH/LH ascending and descending fingering', 'key-specific hand-crossing explanation', 'original short practice check', 'notation/audio/print common data payload'] | ['professional release review', 'visual keyboard and staff rendering plus playback/print consistency QA'] |

### 待确认

- AM-C-MAJOR-RENDER — notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-C-MAJOR-RANGE — fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

来源：AM-NOTES-C-MAJOR, AM-FINGER-LMT, AM-FINGER-MF, AM-THEORY, AM-MUSICXML, AM-MIDI, AM-BAYLOR

## /scales/a-minor

[已核实] 目标关键词：`a minor scale piano`；模板 T12；基线优先级：先做。
状态：`content_and_note_data_ready_with_fingering_gaps`；发布状态：未验收。

任务：直接查看指定调性的音阶、键位、手别指法和示范。

### 页面需回答的问题

- What notes are in A natural minor?
- Which notes change in A harmonic and melodic minor?
- What is the descending classical melodic-minor sequence?
- Which fingers are supported for each hand and range?
- How do I match the keyboard, score and printed note names?
- Which chords use the A natural minor scale?

### 英文页面内容

**A Minor Scale on Piano: Natural, Harmonic & Melodic**

Find the notes of A minor, compare its three forms and descending patterns, and read source-checked piano fingerings.

#### Start with A natural minor

A natural minor uses A, B, C, D, E, F, and G. Its key signature has no sharps or flats. C major shares that signature, but A is the starting note and tonal reference here. The all-white-key description applies to natural minor; it does not describe every form of A minor.

[已核实] 来源：AN-HMT-A。 

#### Listen for the changed ending

Harmonic minor replaces G with G#. Classical melodic minor uses F# and G# on the way up, then F and G on the way down. Keep the form label visible when comparing the examples: a descending melodic scale is not simply the ascending note list played backward.

[已核实] 来源：AN-HMT-A。 

#### Practice the last four notes

Try E-F-G-A first, then E-F-G#-A, then E-F#-G#-A. Say the changed note names before playing each group. Next, start at the upper A and return through G-F-E. Keep this a note-recognition exercise; choose your own slow pace and pause between forms. Finish by naming which version you just played.

[推断] 来源：AN-HMT-A。 

#### Connect the scale to chords

The natural-minor triads are Am, Bdim, C, Dm, Em, F, and G. Compare Em with E major: E major contains G#, matching the raised seventh in A harmonic minor. Use the existing A minor chord reference for voicing and inversions; this scale page focuses on which notes the chords draw from.

[已核实] 来源：AN-HA-A-CHORDS, AN-PKG-A-CHORDS, AN-PS-HAR。 

### 结构化数据

```json
{
  "tonic": "A",
  "default_form": "natural_minor",
  "key_signature": {
    "accidentals": [],
    "count": 0,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-A",
      "AN-PS-NAT"
    ]
  },
  "relative_major": {
    "name": "C major",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-A",
      "AN-PS-NAT"
    ]
  },
  "forms": [
    {
      "id": "natural_minor",
      "label": "Natural minor",
      "notes_ascending": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "A"
      ],
      "notes_descending": [
        "A",
        "G",
        "F",
        "E",
        "D",
        "C",
        "B",
        "A"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-A",
        "AN-PS-NAT"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        2,
        2
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-NAT"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-A",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 5,
            "midi": 81,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "A",
            "written_octave": 5,
            "midi": 81,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "harmonic_minor",
      "label": "Harmonic minor",
      "notes_ascending": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G#",
        "A"
      ],
      "notes_descending": [
        "A",
        "G#",
        "F",
        "E",
        "D",
        "C",
        "B",
        "A"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-A",
        "AN-PS-HAR"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        3,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-HAR"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-A",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G#",
            "written_octave": 5,
            "midi": 80,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 5,
            "midi": 81,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "A",
            "written_octave": 5,
            "midi": 81,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G#",
            "written_octave": 5,
            "midi": 80,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "melodic_minor_classical",
      "label": "Melodic minor (classical exercise)",
      "notes_ascending": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F#",
        "G#",
        "A"
      ],
      "notes_descending": [
        "A",
        "G",
        "F",
        "E",
        "D",
        "C",
        "B",
        "A"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-A",
        "AN-DENTON"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        2,
        2,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-HA-A"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Hoffman explicitly states the given one-octave finger patterns also apply to harmonic and melodic minor. Descending row not explicitly transcribed, remains null."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-A",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 5,
            "midi": 80,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 5,
            "midi": 81,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "A",
            "written_octave": 5,
            "midi": 81,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          }
        ]
      }
    }
  ],
  "scope": {
    "minor_convention": "Classical scale exercise: melodic minor restores natural-minor sixth/seventh on descent. This is not a claim that compositions must always follow that direction rule.",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-OMT",
      "AN-HA-A"
    ],
    "audited_note_octaves": 1,
    "audited_finger_octaves": 1,
    "hands_together_fingering": null,
    "continuous_turnaround_fingering": null
  },
  "approved_playback_octaves": [
    1
  ],
  "print_and_audio": {
    "status": "implementation_pending",
    "source_asset_reuse": "external reference only; no source diagrams, recordings, scores or PDFs bundled or authorized for reuse",
    "print_fields": [
      "page title",
      "form",
      "direction",
      "hand",
      "exact note spellings",
      "key signature",
      "one-octave staff events",
      "non-null source-reviewed fingers only",
      "source ids",
      "checked date"
    ],
    "tempo_presets_bpm": [
      40,
      60,
      80
    ],
    "tempo_presets_status": "[推断] 编辑默认值；不代表考试要求或专业建议",
    "audio_render_contract": "Use matching selected-form selected-direction pitch events. Do not apply fingering to audio pitches or respell notes to physical-key labels. Keep display spelling separate from MIDI pitch."
  },
  "natural_scale_chords": {
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HA-A-CHORDS",
      "AN-PKG-A-CHORDS"
    ],
    "items": [
      {
        "degree": 1,
        "roman": "i",
        "name": "A minor",
        "notes": [
          "A",
          "C",
          "E"
        ]
      },
      {
        "degree": 2,
        "roman": "ii°",
        "name": "B diminished",
        "notes": [
          "B",
          "D",
          "F"
        ]
      },
      {
        "degree": 3,
        "roman": "III",
        "name": "C major",
        "notes": [
          "C",
          "E",
          "G"
        ]
      },
      {
        "degree": 4,
        "roman": "iv",
        "name": "D minor",
        "notes": [
          "D",
          "F",
          "A"
        ]
      },
      {
        "degree": 5,
        "roman": "v",
        "name": "E minor",
        "notes": [
          "E",
          "G",
          "B"
        ]
      },
      {
        "degree": 6,
        "roman": "VI",
        "name": "F major",
        "notes": [
          "F",
          "A",
          "C"
        ]
      },
      {
        "degree": 7,
        "roman": "VII",
        "name": "G major",
        "notes": [
          "G",
          "B",
          "D"
        ]
      }
    ],
    "harmonic_dominant": {
      "name": "E major",
      "notes": [
        "E",
        "G#",
        "B"
      ],
      "source_ids": [
        "AN-PS-HAR"
      ]
    },
    "voicing_reference_url": "/chords/a-minor",
    "boundary": "Scale-to-chord relation only; existing chord pack is unchanged."
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P184 | partial_content_ready_data_gaps | ['本调三种小调的严格音名、构成与上下行', '键位/MIDI/谱表事件数据（运算映射已标推断）', '已查实的指法行；未核实组合明确为 null', '独立英文说明和练习', '打印字段、来源、状态与待办', 'a minor scale and chords：自然小调7个三和弦与和声小调属和弦对照'] | ['缺失手别/方向指法（见本页逐项 issues）', '扩大八度和连续往返连接指法审核', '实际谱表/音频/打印成品一致性验收'] |

### 待确认

- AN-U091-natural_minor-FINGER — data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U091-harmonic_minor-FINGER — data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U091-melodic_minor_classical-FINGER — data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U091-RANGE — data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U091-QA — data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

来源：AN-BMT-AS, AN-DENTON, AN-HA-A, AN-HA-A-CHORDS, AN-HA-GUIDE, AN-HMT-A, AN-OMT, AN-PKG-A-CHORDS, AN-PS-HAR, AN-PS-MEL, AN-PS-NAT

## /scales/modes

[已核实] 目标关键词：`scale modes`；模板 T13；基线优先级：后做。
状态：`content_and_pitch_data_prepared_with_open_issues`；发布状态：未验收。

任务：Compare seven modes with the same tonic, then distinguish parallel modes from relative collections.

### 页面需回答的问题

- What notes are in each mode on C?
- Which scale degrees change?
- How are parallel modes different from relative modes?
- Which example can I compare next?

### 英文页面内容

**Seven Scale Modes on Piano**

Compare all seven diatonic modes on C, with notes, interval patterns and related major collections.

#### Compare seven modes on C

A mode is more than a new starting label. The seven diatonic modes have different arrangements of whole and half steps. Keeping C as the tonic makes those differences easier to compare: the first and last note stay C while selected notes inside the octave change. The table gives one complete C example for every mode.

[已核实] 来源：AT-01。 

#### Find the changing notes

Compare C Ionian with C Lydian: F becomes F-sharp. Compare Ionian with Mixolydian: B becomes B-flat. Within the minor group, C Dorian uses A-natural where C Aeolian uses A-flat. C Phrygian also lowers D to D-flat; C Locrian lowers G to G-flat as well. Read each note list before playing so the altered notes remain visible.

[已核实] 来源：AT-03, AT-04, AT-05, AT-06, AT-07, AT-08, AT-09。 

#### Same tonic or same collection?

Parallel examples share C as their tonic. Relative examples share a pitch collection but have different tonal centers. For instance, C Dorian and B-flat major use the same pitch classes. That relationship helps identify notes; it does not establish that a passage is in C Dorian simply because those notes appear.

[推断] 来源：AT-01, AT-02。 

#### Try one comparison

Play C Ionian, then C Lydian. Pause on F and F-sharp and return to C after each example. Next compare the A-flat in C Aeolian with the A-natural in C Dorian. Keep the comparison short and use the note lists as your check.

[推断] 来源：AT-03, AT-04, AT-06, AT-08。 

### 结构化数据

```json
{
  "scope": "seven diatonic modes; all seven parallel C examples",
  "examples": [
    {
      "id": "c-ionian",
      "label": "C Ionian",
      "root": "C",
      "pitch_names": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "B"
      ],
      "degrees": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-03",
        "AT-01"
      ],
      "cross_check": "Berklee direct pitch list cross-checked against Open Music Theory modal interval pattern",
      "ascending_notes": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "B",
        "C"
      ],
      "descending_notes": [
        "C",
        "B",
        "A",
        "G",
        "F",
        "E",
        "D",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          2,
          4,
          5,
          7,
          9,
          11,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "mode": "ionian",
      "step_pattern_semitones": [
        2,
        2,
        1,
        2,
        2,
        2,
        1
      ],
      "comparison": "Major scale",
      "parent_major_collection": "C major",
      "parent_degree": 1,
      "relationship_evidence_status": "[推断]",
      "relationship_basis": "Relative-mode index and parent major relationship checked using AT-02; parent label is a theory derivation, not a claim about the key of a piece."
    },
    {
      "id": "c-dorian",
      "label": "C Dorian",
      "root": "C",
      "pitch_names": [
        "C",
        "D",
        "Eb",
        "F",
        "G",
        "A",
        "Bb"
      ],
      "degrees": [
        "1",
        "2",
        "b3",
        "4",
        "5",
        "6",
        "b7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-04",
        "AT-01"
      ],
      "cross_check": "Berklee direct pitch list cross-checked against Open Music Theory modal interval pattern",
      "ascending_notes": [
        "C",
        "D",
        "Eb",
        "F",
        "G",
        "A",
        "Bb",
        "C"
      ],
      "descending_notes": [
        "C",
        "Bb",
        "A",
        "G",
        "F",
        "Eb",
        "D",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          2,
          3,
          5,
          7,
          9,
          10,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "mode": "dorian",
      "step_pattern_semitones": [
        2,
        1,
        2,
        2,
        2,
        1,
        2
      ],
      "comparison": "Natural minor with raised sixth",
      "parent_major_collection": "Bb major",
      "parent_degree": 2,
      "relationship_evidence_status": "[推断]",
      "relationship_basis": "Relative-mode index and parent major relationship checked using AT-02; parent label is a theory derivation, not a claim about the key of a piece."
    },
    {
      "id": "c-phrygian",
      "label": "C Phrygian",
      "root": "C",
      "pitch_names": [
        "C",
        "Db",
        "Eb",
        "F",
        "G",
        "Ab",
        "Bb"
      ],
      "degrees": [
        "1",
        "b2",
        "b3",
        "4",
        "5",
        "b6",
        "b7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-05",
        "AT-01"
      ],
      "cross_check": "Berklee direct pitch list cross-checked against Open Music Theory modal interval pattern",
      "ascending_notes": [
        "C",
        "Db",
        "Eb",
        "F",
        "G",
        "Ab",
        "Bb",
        "C"
      ],
      "descending_notes": [
        "C",
        "Bb",
        "Ab",
        "G",
        "F",
        "Eb",
        "Db",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          1,
          3,
          5,
          7,
          8,
          10,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Db",
            "octave": 4,
            "letter": "D",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Ab",
            "octave": 4,
            "letter": "A",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "Ab",
            "octave": 4,
            "letter": "A",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "Db",
            "octave": 4,
            "letter": "D",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "mode": "phrygian",
      "step_pattern_semitones": [
        1,
        2,
        2,
        2,
        1,
        2,
        2
      ],
      "comparison": "Natural minor with lowered second",
      "parent_major_collection": "Ab major",
      "parent_degree": 3,
      "relationship_evidence_status": "[推断]",
      "relationship_basis": "Relative-mode index and parent major relationship checked using AT-02; parent label is a theory derivation, not a claim about the key of a piece."
    },
    {
      "id": "c-lydian",
      "label": "C Lydian",
      "root": "C",
      "pitch_names": [
        "C",
        "D",
        "E",
        "F#",
        "G",
        "A",
        "B"
      ],
      "degrees": [
        "1",
        "2",
        "3",
        "#4",
        "5",
        "6",
        "7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-06",
        "AT-01"
      ],
      "cross_check": "Berklee direct pitch list cross-checked against Open Music Theory modal interval pattern",
      "ascending_notes": [
        "C",
        "D",
        "E",
        "F#",
        "G",
        "A",
        "B",
        "C"
      ],
      "descending_notes": [
        "C",
        "B",
        "A",
        "G",
        "F#",
        "E",
        "D",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          2,
          4,
          6,
          7,
          9,
          11,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F#",
            "octave": 4,
            "letter": "F",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F#",
            "octave": 4,
            "letter": "F",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "mode": "lydian",
      "step_pattern_semitones": [
        2,
        2,
        2,
        1,
        2,
        2,
        1
      ],
      "comparison": "Major with raised fourth",
      "parent_major_collection": "G major",
      "parent_degree": 4,
      "relationship_evidence_status": "[推断]",
      "relationship_basis": "Relative-mode index and parent major relationship checked using AT-02; parent label is a theory derivation, not a claim about the key of a piece."
    },
    {
      "id": "c-mixolydian",
      "label": "C Mixolydian",
      "root": "C",
      "pitch_names": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "Bb"
      ],
      "degrees": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "b7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-07",
        "AT-01"
      ],
      "cross_check": "Berklee direct pitch list cross-checked against Open Music Theory modal interval pattern",
      "ascending_notes": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "Bb",
        "C"
      ],
      "descending_notes": [
        "C",
        "Bb",
        "A",
        "G",
        "F",
        "E",
        "D",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          2,
          4,
          5,
          7,
          9,
          10,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "mode": "mixolydian",
      "step_pattern_semitones": [
        2,
        2,
        1,
        2,
        2,
        1,
        2
      ],
      "comparison": "Major with lowered seventh",
      "parent_major_collection": "F major",
      "parent_degree": 5,
      "relationship_evidence_status": "[推断]",
      "relationship_basis": "Relative-mode index and parent major relationship checked using AT-02; parent label is a theory derivation, not a claim about the key of a piece."
    },
    {
      "id": "c-aeolian",
      "label": "C Aeolian",
      "root": "C",
      "pitch_names": [
        "C",
        "D",
        "Eb",
        "F",
        "G",
        "Ab",
        "Bb"
      ],
      "degrees": [
        "1",
        "2",
        "b3",
        "4",
        "5",
        "b6",
        "b7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-08",
        "AT-01"
      ],
      "cross_check": "Berklee direct pitch list cross-checked against Open Music Theory modal interval pattern",
      "ascending_notes": [
        "C",
        "D",
        "Eb",
        "F",
        "G",
        "Ab",
        "Bb",
        "C"
      ],
      "descending_notes": [
        "C",
        "Bb",
        "Ab",
        "G",
        "F",
        "Eb",
        "D",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          2,
          3,
          5,
          7,
          8,
          10,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Ab",
            "octave": 4,
            "letter": "A",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "Ab",
            "octave": 4,
            "letter": "A",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "mode": "aeolian",
      "step_pattern_semitones": [
        2,
        1,
        2,
        2,
        1,
        2,
        2
      ],
      "comparison": "Natural minor scale",
      "parent_major_collection": "Eb major",
      "parent_degree": 6,
      "relationship_evidence_status": "[推断]",
      "relationship_basis": "Relative-mode index and parent major relationship checked using AT-02; parent label is a theory derivation, not a claim about the key of a piece."
    },
    {
      "id": "c-locrian",
      "label": "C Locrian",
      "root": "C",
      "pitch_names": [
        "C",
        "Db",
        "Eb",
        "F",
        "Gb",
        "Ab",
        "Bb"
      ],
      "degrees": [
        "1",
        "b2",
        "b3",
        "4",
        "b5",
        "b6",
        "b7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-09",
        "AT-01"
      ],
      "cross_check": "Berklee direct pitch list cross-checked against Open Music Theory modal interval pattern",
      "ascending_notes": [
        "C",
        "Db",
        "Eb",
        "F",
        "Gb",
        "Ab",
        "Bb",
        "C"
      ],
      "descending_notes": [
        "C",
        "Bb",
        "Ab",
        "Gb",
        "F",
        "Eb",
        "Db",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          1,
          3,
          5,
          6,
          8,
          10,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Db",
            "octave": 4,
            "letter": "D",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Gb",
            "octave": 4,
            "letter": "G",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "Ab",
            "octave": 4,
            "letter": "A",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "Ab",
            "octave": 4,
            "letter": "A",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "Gb",
            "octave": 4,
            "letter": "G",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "Db",
            "octave": 4,
            "letter": "D",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "mode": "locrian",
      "step_pattern_semitones": [
        1,
        2,
        2,
        1,
        2,
        2,
        2
      ],
      "comparison": "Natural minor with lowered second and fifth",
      "parent_major_collection": "Db major",
      "parent_degree": 7,
      "relationship_evidence_status": "[推断]",
      "relationship_basis": "Relative-mode index and parent major relationship checked using AT-02; parent label is a theory derivation, not a claim about the key of a piece."
    }
  ],
  "related_urls": [
    "/scales",
    "/scales/c-major",
    "/scales/c-minor"
  ],
  "content_role_note": "数据准备稿，不代表网页交互或打印资源已上线。实际谱表/键盘图须由这些具体音符数据渲染后验收。"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P182 | partial_pending_assets_and_applicable_fingering | 独立英文内容、具体对象音符与构成、键盘/谱表渲染数据、出处、编辑练习；见本页数据及各组专门结果。 | 实际图示/播放/打印成品验收；未核实的手别方向八度指法。 |

### 待确认

- AT-scales-modes-FINGERING — data.examples[*].fingering：缺少对应对象、手别、方向、八度范围的完整专业指法来源；不得由模式补写。；解决：逐个选择明确标注全部音符指法的正规教学资料，并经钢琴教师复核；已明确收录的例外见对象数据。
- AT-scales-modes-OUTPUT — rendered_staff_keyboard_audio_pdf：已提供音符与渲染数据；本轮未生成并视检实际谱表/键盘图、音频或打印PDF，不能声称这些功能已可用。；解决：实现时用本页数据渲染并逐音视检/试听；PDF生成检查成功后才显示下载入口。
- AT-scales-modes-PRACTICE — blocks.practice：练习是基于已核实音符的编辑提议，未通过专业教学效果或动作审核。；解决：钢琴教师核对适用水平和练习安排；不承诺学习效果。

来源：AT-01, AT-02, AT-03, AT-04, AT-05, AT-06, AT-07, AT-08, AT-09

## /scales/blues

[已核实] 目标关键词：`blues scale piano`；模板 T13；基线优先级：后做。
状态：`content_and_pitch_data_prepared_with_open_issues`；发布状态：未验收。

任务：Find the notes of a blues scale and compare its major and minor forms.

### 页面需回答的问题

- What is the minor blues formula?
- What changes in the major blues scale?
- Where is the extra note compared with pentatonic?
- Does a scale name determine every chord it can accompany?

### 英文页面内容

**Blues Scales on Piano: Major and Minor**

Compare C and G major and minor blues scales with note lists and the added blue-note position.

#### Choose major or minor blues

This reference covers two six-note blues-scale forms in C and G. Minor blues adds a note between the fourth and fifth degrees of minor pentatonic. In C, that gives C, E-flat, F, G-flat, G and B-flat. Major blues adds a chromatic note between the second and third degrees of major pentatonic. C major blues contains C, D, E-flat, E, G and A.

[已核实] 来源：AT-10, AT-11, AT-12, AT-14。 

#### Read the blue-note label

The minor examples use the label flat fifth: G-flat in C, D-flat in G. You may also see the same piano keys named sharp fourth. The major examples use flat third for the extra note; some theory texts spell that passing tone as sharp second. Keep the displayed spelling when reading a particular example.

[已核实] 来源：AT-10, AT-11, AT-12, AT-13, AT-14, AT-15。 

#### Use the scale as a reference

Minor blues vocabulary can occur over major blues harmony. A major or minor label therefore does not provide a rule that every note will fit every chord in the same way. These note collections are a starting reference; phrasing and the accompanying harmony still matter.

[已核实] 来源：AT-11。 

#### Hear the added note

Compare C minor pentatonic with C minor blues. Play F, G-flat, G slowly, then finish on C. Next compare D, E-flat, E in the C major blues example. Keep the two forms separately labeled so their different thirds do not get mixed together.

[推断] 来源：AT-12, AT-14, AT-20。 

### 结构化数据

```json
{
  "scope": "C and G, major and minor blues",
  "examples": [
    {
      "id": "c-minor-blues",
      "label": "C minor blues",
      "root": "C",
      "pitch_names": [
        "C",
        "Eb",
        "F",
        "Gb",
        "G",
        "Bb"
      ],
      "degrees": [
        "1",
        "b3",
        "4",
        "b5",
        "5",
        "b7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-12",
        "AT-10"
      ],
      "cross_check": "Berklee direct note list plus independent textbook formula; #4/b5 and #2/b3 are enharmonic alternatives on equal-tempered piano",
      "ascending_notes": [
        "C",
        "Eb",
        "F",
        "Gb",
        "G",
        "Bb",
        "C"
      ],
      "descending_notes": [
        "C",
        "Bb",
        "G",
        "Gb",
        "F",
        "Eb",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          3,
          5,
          6,
          7,
          10,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Gb",
            "octave": 4,
            "letter": "G",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Gb",
            "octave": 4,
            "letter": "G",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "quality": "minor",
      "step_pattern_semitones": [
        3,
        2,
        1,
        1,
        3,
        2
      ],
      "additional_pentatonic_note": "b5"
    },
    {
      "id": "g-minor-blues",
      "label": "G minor blues",
      "root": "G",
      "pitch_names": [
        "G",
        "Bb",
        "C",
        "Db",
        "D",
        "F"
      ],
      "degrees": [
        "1",
        "b3",
        "4",
        "b5",
        "5",
        "b7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-13",
        "AT-10"
      ],
      "cross_check": "Berklee direct note list plus independent textbook formula; #4/b5 and #2/b3 are enharmonic alternatives on equal-tempered piano",
      "ascending_notes": [
        "G",
        "Bb",
        "C",
        "Db",
        "D",
        "F",
        "G"
      ],
      "descending_notes": [
        "G",
        "F",
        "D",
        "Db",
        "C",
        "Bb",
        "G"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          3,
          5,
          6,
          7,
          10,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Db",
            "octave": 5,
            "letter": "D",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 5,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 5,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "G",
            "octave": 5,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 5,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Db",
            "octave": 5,
            "letter": "D",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "quality": "minor",
      "step_pattern_semitones": [
        3,
        2,
        1,
        1,
        3,
        2
      ],
      "additional_pentatonic_note": "b5"
    },
    {
      "id": "c-major-blues",
      "label": "C major blues",
      "root": "C",
      "pitch_names": [
        "C",
        "D",
        "Eb",
        "E",
        "G",
        "A"
      ],
      "degrees": [
        "1",
        "2",
        "b3",
        "3",
        "5",
        "6"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-14",
        "AT-11"
      ],
      "cross_check": "Berklee direct note list plus independent textbook formula; #4/b5 and #2/b3 are enharmonic alternatives on equal-tempered piano",
      "ascending_notes": [
        "C",
        "D",
        "Eb",
        "E",
        "G",
        "A",
        "C"
      ],
      "descending_notes": [
        "C",
        "A",
        "G",
        "E",
        "Eb",
        "D",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          2,
          3,
          4,
          7,
          9,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "quality": "major",
      "step_pattern_semitones": [
        2,
        1,
        1,
        3,
        2,
        3
      ],
      "additional_pentatonic_note": "b3"
    },
    {
      "id": "g-major-blues",
      "label": "G major blues",
      "root": "G",
      "pitch_names": [
        "G",
        "A",
        "Bb",
        "B",
        "D",
        "E"
      ],
      "degrees": [
        "1",
        "2",
        "b3",
        "3",
        "5",
        "6"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-15",
        "AT-11"
      ],
      "cross_check": "Berklee direct note list plus independent textbook formula; #4/b5 and #2/b3 are enharmonic alternatives on equal-tempered piano",
      "ascending_notes": [
        "G",
        "A",
        "Bb",
        "B",
        "D",
        "E",
        "G"
      ],
      "descending_notes": [
        "G",
        "E",
        "D",
        "B",
        "Bb",
        "A",
        "G"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          2,
          3,
          4,
          7,
          9,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 5,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 5,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "G",
            "octave": 5,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 5,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "quality": "major",
      "step_pattern_semitones": [
        2,
        1,
        1,
        3,
        2,
        3
      ],
      "additional_pentatonic_note": "b3"
    }
  ],
  "related_urls": [
    "/scales/pentatonic",
    "/scales"
  ],
  "content_role_note": "数据准备稿，不代表网页交互或打印资源已上线。实际谱表/键盘图须由这些具体音符数据渲染后验收。"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P185 | partial_pending_assets_and_applicable_fingering | 独立英文内容、具体对象音符与构成、键盘/谱表渲染数据、出处、编辑练习；见本页数据及各组专门结果。 | 实际图示/播放/打印成品验收；未核实的手别方向八度指法。 |

### 待确认

- AT-scales-blues-FINGERING — data.examples[*].fingering：缺少对应对象、手别、方向、八度范围的完整专业指法来源；不得由模式补写。；解决：逐个选择明确标注全部音符指法的正规教学资料，并经钢琴教师复核；已明确收录的例外见对象数据。
- AT-scales-blues-OUTPUT — rendered_staff_keyboard_audio_pdf：已提供音符与渲染数据；本轮未生成并视检实际谱表/键盘图、音频或打印PDF，不能声称这些功能已可用。；解决：实现时用本页数据渲染并逐音视检/试听；PDF生成检查成功后才显示下载入口。
- AT-scales-blues-PRACTICE — blocks.practice：练习是基于已核实音符的编辑提议，未通过专业教学效果或动作审核。；解决：钢琴教师核对适用水平和练习安排；不承诺学习效果。

来源：AT-10, AT-11, AT-12, AT-13, AT-14, AT-15, AT-20

## /scales/d-major

[已核实] 目标关键词：`d major scale piano`；模板 T12；基线优先级：后做。
状态：`content_data_ready_with_implementation_qa_pending`；发布状态：未验收。

任务：Play D major in either direction while preserving F-sharp and C-sharp and the documented hand changes.

### 页面需回答的问题

- What are the notes and key signature of D major?
- Do F-sharp and C-sharp stay sharp when D major descends?
- Which fingers are used by each hand ascending and descending over one octave?
- What should I check during a short practice run?

### 英文页面内容

**D Major Piano Scale: Notes and Fingering**

See D major notes, key signature, keyboard pitches and separately verified one-octave fingering for each hand and direction.

#### D Major notes

D Major contains D, E, F#, G, A, B, C#. Repeat D at the top to complete one octave. Its key signature has 2 sharps.

[已核实] 来源：AM-NOTES-D-MAJOR, AM-FINGER-LMT。 

#### Keep both sharps through the return

The two sharps are F-sharp and C-sharp. They belong to both directions of this major scale. F♯–G and C♯–D are its half steps. On the staff, the key signature supplies those sharps; on the keyboard, locate the named black keys before beginning.

[推断] 来源：AM-NOTES-D-MAJOR, AM-FINGER-LMT, AM-THEORY。 Explanatory relationships derived from independently checked note spelling and the verified major-scale interval rule.

#### One-octave fingering

For the one-octave ascent, the right-hand thumb follows finger 3 from F♯ to G. In the left hand, finger 3 follows the thumb from A to B. The final C♯–D is played with right-hand fingers 4–5 and left-hand fingers 2–1.

[已核实] 来源：AM-FINGER-LMT, AM-FINGER-MF。 

#### A short practice check

Suggested drill: locate F♯ and C♯ without playing the whole scale. Then play D–E–F♯–G and A–B–C♯–D as two listening groups. Join them at the same pulse, turn around at the upper D, and check that neither sharp has become a natural on the descent.

[推断] 来源：AM-FINGER-LMT, AM-FINGER-MF, AM-NOTES-D-MAJOR, AM-FINGER-LMT。 Original suggested drill using only the source-verified notes and explicit fingering for this key. No effectiveness or fixed learning-time claim.

### 结构化数据

```json
{
  "tonic": "D",
  "scale_type": "major",
  "notes_ascending": [
    "D",
    "E",
    "F#",
    "G",
    "A",
    "B",
    "C#",
    "D"
  ],
  "notes_descending": [
    "D",
    "C#",
    "B",
    "A",
    "G",
    "F#",
    "E",
    "D"
  ],
  "note_spelling_status": "[已核实]",
  "note_source_ids": [
    "AM-NOTES-D-MAJOR",
    "AM-FINGER-LMT"
  ],
  "key_signature": {
    "fifths": 2,
    "ordered_accidentals": [
      "F#",
      "C#"
    ],
    "count": 2,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AM-NOTES-D-MAJOR",
      "AM-FINGER-LMT"
    ]
  },
  "intervals": {
    "ascending_semitones": [
      2,
      2,
      1,
      2,
      2,
      2,
      1
    ],
    "descending_semitones": [
      1,
      2,
      2,
      2,
      1,
      2,
      2
    ],
    "half_step_pairs": [
      [
        "F#",
        "G"
      ],
      [
        "C#",
        "D"
      ]
    ],
    "evidence_status": "[推断]",
    "basis": "Apply the verified major-scale interval rule to the independently checked note spelling. Descending order follows the same pitches from upper tonic to lower tonic.",
    "source_ids": [
      "AM-NOTES-D-MAJOR",
      "AM-FINGER-LMT",
      "AM-THEORY"
    ]
  },
  "display_register": {
    "RH": "tonic written in octave 4 to tonic written in octave 5",
    "LH": "tonic written in octave 3 to tonic written in octave 4",
    "evidence_status": "[推断]",
    "basis": "Editorial display choice; octave labels follow MusicXML C4=middle C; each accidental remains attached to its written octave. This register choice is not asserted to be a source-prescribed exercise range.",
    "source_ids": [
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "pitch_sequences": {
    "RH": {
      "ascending": [
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "F#4",
          "step": "F",
          "alter": 1,
          "octave": 4,
          "midi": 66,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "C#5",
          "step": "C",
          "alter": 1,
          "octave": 5,
          "midi": 73,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "D5",
          "step": "D",
          "alter": 0,
          "octave": 5,
          "midi": 74,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "D5",
          "step": "D",
          "alter": 0,
          "octave": 5,
          "midi": 74,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "C#5",
          "step": "C",
          "alter": 1,
          "octave": 5,
          "midi": 73,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "F#4",
          "step": "F",
          "alter": 1,
          "octave": 4,
          "midi": 66,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "LH": {
      "ascending": [
        {
          "note": "D3",
          "step": "D",
          "alter": 0,
          "octave": 3,
          "midi": 50,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "E3",
          "step": "E",
          "alter": 0,
          "octave": 3,
          "midi": 52,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "F#3",
          "step": "F",
          "alter": 1,
          "octave": 3,
          "midi": 54,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "G3",
          "step": "G",
          "alter": 0,
          "octave": 3,
          "midi": 55,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "A3",
          "step": "A",
          "alter": 0,
          "octave": 3,
          "midi": 57,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "B3",
          "step": "B",
          "alter": 0,
          "octave": 3,
          "midi": 59,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "C#4",
          "step": "C",
          "alter": 1,
          "octave": 4,
          "midi": 61,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "C#4",
          "step": "C",
          "alter": 1,
          "octave": 4,
          "midi": 61,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "B3",
          "step": "B",
          "alter": 0,
          "octave": 3,
          "midi": 59,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "A3",
          "step": "A",
          "alter": 0,
          "octave": 3,
          "midi": 57,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "G3",
          "step": "G",
          "alter": 0,
          "octave": 3,
          "midi": 55,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "F#3",
          "step": "F",
          "alter": 1,
          "octave": 3,
          "midi": 54,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "E3",
          "step": "E",
          "alter": 0,
          "octave": 3,
          "midi": 52,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "D3",
          "step": "D",
          "alter": 0,
          "octave": 3,
          "midi": 50,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "evidence_status": "[推断]",
    "basis": "MIDI = 12*(written_octave+1)+natural_letter_pitch_class+alter; computed from verified spelling. Cb4=59, equivalent to B3, not B4.",
    "source_ids": [
      "AM-NOTES-D-MAJOR",
      "AM-FINGER-LMT",
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "fingering": {
    "instrument": "piano",
    "motion": "similar motion or hands separately",
    "octaves": 1,
    "directions_in_performance_order": true,
    "RH": {
      "ascending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ],
      "descending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ]
    },
    "LH": {
      "ascending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ],
      "descending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ]
    },
    "evidence_status": "[已核实]",
    "verification": "explicit_two_independent_source_charts",
    "source_ids": [
      "AM-FINGER-LMT",
      "AM-FINGER-MF"
    ],
    "source_locator": "LearnMusicTheory PDF page 1 D major row; Music Fun PDF page 5 staff",
    "review_status": "source_verified; professional release review pending",
    "variant_note": "A source-documented single-octave choice, not a claim that no alternative fingering is valid. Do not extend to multiple octaves by repeating these rows.",
    "additional_octave_fingerings": null,
    "direction_evidence": "Both ascending and descending notes and finger numbers were read directly in each displayed source staff; descending arrays were not merely assumed from an ascending-only source.",
    "visual_evidence_refs": [
      "turn781025view0",
      "turn621017view2"
    ]
  },
  "renderer_payload": {
    "clefs": {
      "RH": "treble",
      "LH": "bass"
    },
    "key_fifths": 2,
    "mode": "major",
    "duration_beats_per_note": 1,
    "default_tempo_bpm": 60,
    "tempo_status": "editorial playback default; not a sourced examination speed or promised learning target",
    "ascending_then_descending_index_order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "source_of_truth": "pitch_sequences plus same-hand fingering rows; no automatic enharmonic respelling",
    "print_fields": [
      "title",
      "key_signature",
      "note_spelling",
      "selected_hand",
      "one_octave_range",
      "ascending_and_descending_staff_notes",
      "matching_fingering",
      "short_practice_tip",
      "source_ids"
    ],
    "status": "content_and_data_handoff; notation/audio/print implementations have not been built or tested"
  },
  "labels": {
    "hand": "Hand",
    "right_hand": "Right hand",
    "left_hand": "Left hand",
    "both_hands": "Both hands",
    "direction": "Direction",
    "ascending": "Ascending",
    "descending": "Descending",
    "up_and_down": "Up and down",
    "octaves": "1 octave",
    "play": "Play scale",
    "stop": "Stop",
    "print": "Print current scale"
  },
  "related_links": [
    {
      "url": "/scales",
      "label": "All piano scales",
      "activation": "only when target is live"
    }
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P186 | content_data_prepared; rendered delivery pending | ['independent English page content', 'notes and key signature cross-checked', 'spelled pitches with octave and MIDI mapping', 'source-specific one-octave RH/LH ascending and descending fingering', 'key-specific hand-crossing explanation', 'original short practice check', 'notation/audio/print common data payload'] | ['professional release review', 'visual keyboard and staff rendering plus playback/print consistency QA'] |

### 待确认

- AM-D-MAJOR-RENDER — notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-D-MAJOR-RANGE — fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

来源：AM-NOTES-D-MAJOR, AM-FINGER-LMT, AM-FINGER-MF, AM-THEORY, AM-MUSICXML, AM-MIDI, AM-BAYLOR

## /scales/e-minor

[已核实] 目标关键词：`e minor scale piano`；模板 T12；基线优先级：后做。
状态：`content_and_note_data_ready_with_fingering_gaps`；发布状态：未验收。

任务：直接查看指定调性的音阶、键位、手别指法和示范。

### 页面需回答的问题

- What notes are in E natural minor?
- Which notes change in E harmonic and melodic minor?
- What is the descending classical melodic-minor sequence?
- Which fingers are supported for each hand and range?
- How do I match the keyboard, score and printed note names?

### 英文页面内容

**E Minor Scale on Piano: Natural, Harmonic & Melodic**

Find the notes of E minor, compare its three forms and descending patterns, and read source-checked piano fingerings.

#### One sharp stays in place

E natural minor contains E, F#, G, A, B, C, and D. The key signature has F#, and its relative major is G major. F# stays in all three minor forms shown here. The changing notes are near the end of the octave, rather than at the opening F#.

[已核实] 来源：AN-HMT-E。 

#### Compare C and D carefully

E harmonic minor has D# while C remains natural. Classical melodic minor raises both C and D on ascent, giving C# and D#. Its descent returns through D and C, with F# still present. Keep these two jobs separate: retaining the key-signature F# and tracking the altered sixth and seventh degrees.

[已核实] 来源：AN-HMT-E。 

#### A focused listening exercise

Play E-F#-G and stop. Then move to B-C-D-E, B-C-D#-E, and B-C#-D#-E as three separate endings. Name each ending before you play it. Try a descending check from the upper E and identify whether you selected natural, harmonic, or classical melodic minor. Review any changed note individually before repeating the full octave.

[推断] 来源：AN-HMT-E。 

#### Use the fingering that matches the example

For the sourced one-octave natural and harmonic ascents, the right hand begins 1-2-3 on E-F#-G and continues with the thumb on A. The left-hand row begins with finger 5 on the lower E. Read the selected form and direction before following a numbered row; missing rows remain unavailable until reviewed.

[已核实] 来源：AN-PS-NAT, AN-PS-HAR。 

### 结构化数据

```json
{
  "tonic": "E",
  "default_form": "natural_minor",
  "key_signature": {
    "accidentals": [
      "F#"
    ],
    "count": 1,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-E",
      "AN-PS-NAT"
    ]
  },
  "relative_major": {
    "name": "G major",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-E",
      "AN-PS-NAT"
    ]
  },
  "forms": [
    {
      "id": "natural_minor",
      "label": "Natural minor",
      "notes_ascending": [
        "E",
        "F#",
        "G",
        "A",
        "B",
        "C",
        "D",
        "E"
      ],
      "notes_descending": [
        "E",
        "D",
        "C",
        "B",
        "A",
        "G",
        "F#",
        "E"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-E",
        "AN-PS-NAT"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        2,
        2
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-NAT"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-E",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "E",
            "written_octave": 3,
            "midi": 52,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 3,
            "midi": 54,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 3,
            "midi": 54,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 3,
            "midi": 52,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "harmonic_minor",
      "label": "Harmonic minor",
      "notes_ascending": [
        "E",
        "F#",
        "G",
        "A",
        "B",
        "C",
        "D#",
        "E"
      ],
      "notes_descending": [
        "E",
        "D#",
        "C",
        "B",
        "A",
        "G",
        "F#",
        "E"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-E",
        "AN-PS-HAR"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        3,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-HAR"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-E",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D#",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "E",
            "written_octave": 3,
            "midi": 52,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 3,
            "midi": 54,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D#",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D#",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D#",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 3,
            "midi": 54,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 3,
            "midi": 52,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "melodic_minor_classical",
      "label": "Melodic minor (classical exercise)",
      "notes_ascending": [
        "E",
        "F#",
        "G",
        "A",
        "B",
        "C#",
        "D#",
        "E"
      ],
      "notes_descending": [
        "E",
        "D",
        "C",
        "B",
        "A",
        "G",
        "F#",
        "E"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-E",
        "AN-DENTON"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        2,
        2,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": null,
          "left_hand": null
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [],
        "evidence_status": "待确认",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-E",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D#",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "E",
            "written_octave": 3,
            "midi": 52,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 3,
            "midi": 54,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D#",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 3,
            "midi": 54,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 3,
            "midi": 52,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          }
        ]
      }
    }
  ],
  "scope": {
    "minor_convention": "Classical scale exercise: melodic minor restores natural-minor sixth/seventh on descent. This is not a claim that compositions must always follow that direction rule.",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-OMT",
      "AN-HA-A"
    ],
    "audited_note_octaves": 1,
    "audited_finger_octaves": 1,
    "hands_together_fingering": null,
    "continuous_turnaround_fingering": null
  },
  "approved_playback_octaves": [
    1
  ],
  "print_and_audio": {
    "status": "implementation_pending",
    "source_asset_reuse": "external reference only; no source diagrams, recordings, scores or PDFs bundled or authorized for reuse",
    "print_fields": [
      "page title",
      "form",
      "direction",
      "hand",
      "exact note spellings",
      "key signature",
      "one-octave staff events",
      "non-null source-reviewed fingers only",
      "source ids",
      "checked date"
    ],
    "tempo_presets_bpm": [
      40,
      60,
      80
    ],
    "tempo_presets_status": "[推断] 编辑默认值；不代表考试要求或专业建议",
    "audio_render_contract": "Use matching selected-form selected-direction pitch events. Do not apply fingering to audio pitches or respell notes to physical-key labels. Keep display spelling separate from MIDI pitch."
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P187 | partial_content_ready_data_gaps | ['本调三种小调的严格音名、构成与上下行', '键位/MIDI/谱表事件数据（运算映射已标推断）', '已查实的指法行；未核实组合明确为 null', '独立英文说明和练习', '打印字段、来源、状态与待办'] | ['缺失手别/方向指法（见本页逐项 issues）', '扩大八度和连续往返连接指法审核', '实际谱表/音频/打印成品一致性验收'] |

### 待确认

- AN-U094-natural_minor-FINGER — data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U094-harmonic_minor-FINGER — data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U094-melodic_minor_classical-FINGER — data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U094-RANGE — data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U094-QA — data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

来源：AN-BMT-AS, AN-DENTON, AN-HA-GUIDE, AN-HMT-E, AN-OMT, AN-PS-HAR, AN-PS-MEL, AN-PS-NAT

## /scales/f-major

[已核实] 目标关键词：`f major scale for piano`；模板 T12；基线优先级：后做。
状态：`content_data_ready_with_implementation_qa_pending`；发布状态：未验收。

任务：Find F major’s B-flat and use its specific right-hand fingering rather than copying C major.

### 页面需回答的问题

- What are the notes and key signature of F major?
- Why does the right hand use finger 4 on B-flat?
- Which fingers are used by each hand ascending and descending over one octave?
- What should I check during a short practice run?

### 英文页面内容

**F Major Piano Scale: Notes and Fingering**

See F major notes, key signature, keyboard pitches and separately verified one-octave fingering for each hand and direction.

#### F Major notes

F Major contains F, G, A, Bb, C, D, E. Repeat F at the top to complete one octave. Its key signature has 1 flat.

[已核实] 来源：AM-NOTES-F-MAJOR, AM-FINGER-LMT。 

#### B-flat changes the right-hand crossing

F major contains B-flat, with A–B♭ and E–F as the half-step pairs. Write B♭, rather than A♯, in this scale: each scale degree keeps its own letter name. The one-flat key signature applies in both ascending and descending notation.

[推断] 来源：AM-NOTES-F-MAJOR, AM-FINGER-LMT, AM-THEORY。 Explanatory relationships derived from independently checked note spelling and the verified major-scale interval rule.

#### One-octave fingering

The documented right-hand ascent is 1–2–3–4–1–2–3–4: finger 4 plays B♭, then the thumb plays C. The left hand uses 5–4–3–2–1–3–2–1. The right hand therefore ends this single octave on finger 4, not finger 5.

[已核实] 来源：AM-FINGER-LMT, AM-FINGER-MF。 

#### A short practice check

Suggested drill: with the right hand, practice A–B♭–C–D using 3–4–1–2, then return using 2–1–4–3. Add the surrounding notes only after you can follow those numbers without stopping. In the left hand, check the separate C–D crossing before joining the hands.

[推断] 来源：AM-FINGER-LMT, AM-FINGER-MF, AM-NOTES-F-MAJOR, AM-FINGER-LMT。 Original suggested drill using only the source-verified notes and explicit fingering for this key. No effectiveness or fixed learning-time claim.

### 结构化数据

```json
{
  "tonic": "F",
  "scale_type": "major",
  "notes_ascending": [
    "F",
    "G",
    "A",
    "Bb",
    "C",
    "D",
    "E",
    "F"
  ],
  "notes_descending": [
    "F",
    "E",
    "D",
    "C",
    "Bb",
    "A",
    "G",
    "F"
  ],
  "note_spelling_status": "[已核实]",
  "note_source_ids": [
    "AM-NOTES-F-MAJOR",
    "AM-FINGER-LMT"
  ],
  "key_signature": {
    "fifths": -1,
    "ordered_accidentals": [
      "Bb"
    ],
    "count": 1,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AM-NOTES-F-MAJOR",
      "AM-FINGER-LMT"
    ]
  },
  "intervals": {
    "ascending_semitones": [
      2,
      2,
      1,
      2,
      2,
      2,
      1
    ],
    "descending_semitones": [
      1,
      2,
      2,
      2,
      1,
      2,
      2
    ],
    "half_step_pairs": [
      [
        "A",
        "Bb"
      ],
      [
        "E",
        "F"
      ]
    ],
    "evidence_status": "[推断]",
    "basis": "Apply the verified major-scale interval rule to the independently checked note spelling. Descending order follows the same pitches from upper tonic to lower tonic.",
    "source_ids": [
      "AM-NOTES-F-MAJOR",
      "AM-FINGER-LMT",
      "AM-THEORY"
    ]
  },
  "display_register": {
    "RH": "tonic written in octave 4 to tonic written in octave 5",
    "LH": "tonic written in octave 3 to tonic written in octave 4",
    "evidence_status": "[推断]",
    "basis": "Editorial display choice; octave labels follow MusicXML C4=middle C; each accidental remains attached to its written octave. This register choice is not asserted to be a source-prescribed exercise range.",
    "source_ids": [
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "pitch_sequences": {
    "RH": {
      "ascending": [
        {
          "note": "F4",
          "step": "F",
          "alter": 0,
          "octave": 4,
          "midi": 65,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "Bb4",
          "step": "B",
          "alter": -1,
          "octave": 4,
          "midi": 70,
          "scale_degree": 4,
          "key_color": "black"
        },
        {
          "note": "C5",
          "step": "C",
          "alter": 0,
          "octave": 5,
          "midi": 72,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "D5",
          "step": "D",
          "alter": 0,
          "octave": 5,
          "midi": 74,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "E5",
          "step": "E",
          "alter": 0,
          "octave": 5,
          "midi": 76,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "F5",
          "step": "F",
          "alter": 0,
          "octave": 5,
          "midi": 77,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "F5",
          "step": "F",
          "alter": 0,
          "octave": 5,
          "midi": 77,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "E5",
          "step": "E",
          "alter": 0,
          "octave": 5,
          "midi": 76,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "D5",
          "step": "D",
          "alter": 0,
          "octave": 5,
          "midi": 74,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "C5",
          "step": "C",
          "alter": 0,
          "octave": 5,
          "midi": 72,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "Bb4",
          "step": "B",
          "alter": -1,
          "octave": 4,
          "midi": 70,
          "scale_degree": 4,
          "key_color": "black"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "F4",
          "step": "F",
          "alter": 0,
          "octave": 4,
          "midi": 65,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "LH": {
      "ascending": [
        {
          "note": "F3",
          "step": "F",
          "alter": 0,
          "octave": 3,
          "midi": 53,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "G3",
          "step": "G",
          "alter": 0,
          "octave": 3,
          "midi": 55,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "A3",
          "step": "A",
          "alter": 0,
          "octave": 3,
          "midi": 57,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "Bb3",
          "step": "B",
          "alter": -1,
          "octave": 3,
          "midi": 58,
          "scale_degree": 4,
          "key_color": "black"
        },
        {
          "note": "C4",
          "step": "C",
          "alter": 0,
          "octave": 4,
          "midi": 60,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "F4",
          "step": "F",
          "alter": 0,
          "octave": 4,
          "midi": 65,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "F4",
          "step": "F",
          "alter": 0,
          "octave": 4,
          "midi": 65,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "C4",
          "step": "C",
          "alter": 0,
          "octave": 4,
          "midi": 60,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "Bb3",
          "step": "B",
          "alter": -1,
          "octave": 3,
          "midi": 58,
          "scale_degree": 4,
          "key_color": "black"
        },
        {
          "note": "A3",
          "step": "A",
          "alter": 0,
          "octave": 3,
          "midi": 57,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "G3",
          "step": "G",
          "alter": 0,
          "octave": 3,
          "midi": 55,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "F3",
          "step": "F",
          "alter": 0,
          "octave": 3,
          "midi": 53,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "evidence_status": "[推断]",
    "basis": "MIDI = 12*(written_octave+1)+natural_letter_pitch_class+alter; computed from verified spelling. Cb4=59, equivalent to B3, not B4.",
    "source_ids": [
      "AM-NOTES-F-MAJOR",
      "AM-FINGER-LMT",
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "fingering": {
    "instrument": "piano",
    "motion": "similar motion or hands separately",
    "octaves": 1,
    "directions_in_performance_order": true,
    "RH": {
      "ascending": [
        1,
        2,
        3,
        4,
        1,
        2,
        3,
        4
      ],
      "descending": [
        4,
        3,
        2,
        1,
        4,
        3,
        2,
        1
      ]
    },
    "LH": {
      "ascending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ],
      "descending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ]
    },
    "evidence_status": "[已核实]",
    "verification": "explicit_two_independent_source_charts",
    "source_ids": [
      "AM-FINGER-LMT",
      "AM-FINGER-MF"
    ],
    "source_locator": "LearnMusicTheory PDF page 1 F major row; Music Fun PDF page 10 staff",
    "review_status": "source_verified; professional release review pending",
    "variant_note": "A source-documented single-octave choice, not a claim that no alternative fingering is valid. Do not extend to multiple octaves by repeating these rows.",
    "additional_octave_fingerings": null,
    "direction_evidence": "Both ascending and descending notes and finger numbers were read directly in each displayed source staff; descending arrays were not merely assumed from an ascending-only source.",
    "visual_evidence_refs": [
      "turn781025view0",
      "turn621244view6"
    ]
  },
  "renderer_payload": {
    "clefs": {
      "RH": "treble",
      "LH": "bass"
    },
    "key_fifths": -1,
    "mode": "major",
    "duration_beats_per_note": 1,
    "default_tempo_bpm": 60,
    "tempo_status": "editorial playback default; not a sourced examination speed or promised learning target",
    "ascending_then_descending_index_order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "source_of_truth": "pitch_sequences plus same-hand fingering rows; no automatic enharmonic respelling",
    "print_fields": [
      "title",
      "key_signature",
      "note_spelling",
      "selected_hand",
      "one_octave_range",
      "ascending_and_descending_staff_notes",
      "matching_fingering",
      "short_practice_tip",
      "source_ids"
    ],
    "status": "content_and_data_handoff; notation/audio/print implementations have not been built or tested"
  },
  "labels": {
    "hand": "Hand",
    "right_hand": "Right hand",
    "left_hand": "Left hand",
    "both_hands": "Both hands",
    "direction": "Direction",
    "ascending": "Ascending",
    "descending": "Descending",
    "up_and_down": "Up and down",
    "octaves": "1 octave",
    "play": "Play scale",
    "stop": "Stop",
    "print": "Print current scale"
  },
  "related_links": [
    {
      "url": "/scales",
      "label": "All piano scales",
      "activation": "only when target is live"
    }
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P188 | content_data_prepared; rendered delivery pending | ['independent English page content', 'notes and key signature cross-checked', 'spelled pitches with octave and MIDI mapping', 'source-specific one-octave RH/LH ascending and descending fingering', 'key-specific hand-crossing explanation', 'original short practice check', 'notation/audio/print common data payload'] | ['professional release review', 'visual keyboard and staff rendering plus playback/print consistency QA'] |

### 待确认

- AM-F-MAJOR-RENDER — notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-F-MAJOR-RANGE — fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

来源：AM-NOTES-F-MAJOR, AM-FINGER-LMT, AM-FINGER-MF, AM-THEORY, AM-MUSICXML, AM-MIDI, AM-BAYLOR

## /scales/g-major

[已核实] 目标关键词：`g major scale piano`；模板 T12；基线优先级：后做。
状态：`content_data_ready_with_implementation_qa_pending`；发布状态：未验收。

任务：Identify the one black key in G major and connect the final F-sharp to G with accurate fingering.

### 页面需回答的问题

- What are the notes and key signature of G major?
- Why is playing all the white keys from G to G not a G-major scale?
- Which fingers are used by each hand ascending and descending over one octave?
- What should I check during a short practice run?

### 英文页面内容

**G Major Piano Scale: Notes and Fingering**

See G major notes, key signature, keyboard pitches and separately verified one-octave fingering for each hand and direction.

#### G Major notes

G Major contains G, A, B, C, D, E, F#. Repeat G at the top to complete one octave. Its key signature has 1 sharp.

[已核实] 来源：AM-NOTES-G-MAJOR, AM-FINGER-LMT。 

#### The last step is F-sharp to G

The seventh degree is F-sharp, not F natural. F♯–G is a half step; the other half step is B–C. A run of white keys from G to G would therefore miss one of the notes required for G major. The single sharp remains present on the way down.

[推断] 来源：AM-NOTES-G-MAJOR, AM-FINGER-LMT, AM-THEORY。 Explanatory relationships derived from independently checked note spelling and the verified major-scale interval rule.

#### One-octave fingering

The right hand changes from finger 3 on B to the thumb on C, then reaches F♯ with finger 4. In the left hand, the thumb on D is followed by finger 3 on E. These are separate crossing points even when both hands move upward.

[已核实] 来源：AM-FINGER-LMT, AM-FINGER-MF。 

#### A short practice check

Suggested drill: play E–F♯–G, then G–F♯–E, keeping F♯ in both directions. Next, start the full scale from the lower G and name the two half-step pairs as you reach them. Use the descending finger row rather than restarting the ascending row from the top.

[推断] 来源：AM-FINGER-LMT, AM-FINGER-MF, AM-NOTES-G-MAJOR, AM-FINGER-LMT。 Original suggested drill using only the source-verified notes and explicit fingering for this key. No effectiveness or fixed learning-time claim.

### 结构化数据

```json
{
  "tonic": "G",
  "scale_type": "major",
  "notes_ascending": [
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F#",
    "G"
  ],
  "notes_descending": [
    "G",
    "F#",
    "E",
    "D",
    "C",
    "B",
    "A",
    "G"
  ],
  "note_spelling_status": "[已核实]",
  "note_source_ids": [
    "AM-NOTES-G-MAJOR",
    "AM-FINGER-LMT"
  ],
  "key_signature": {
    "fifths": 1,
    "ordered_accidentals": [
      "F#"
    ],
    "count": 1,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AM-NOTES-G-MAJOR",
      "AM-FINGER-LMT"
    ]
  },
  "intervals": {
    "ascending_semitones": [
      2,
      2,
      1,
      2,
      2,
      2,
      1
    ],
    "descending_semitones": [
      1,
      2,
      2,
      2,
      1,
      2,
      2
    ],
    "half_step_pairs": [
      [
        "B",
        "C"
      ],
      [
        "F#",
        "G"
      ]
    ],
    "evidence_status": "[推断]",
    "basis": "Apply the verified major-scale interval rule to the independently checked note spelling. Descending order follows the same pitches from upper tonic to lower tonic.",
    "source_ids": [
      "AM-NOTES-G-MAJOR",
      "AM-FINGER-LMT",
      "AM-THEORY"
    ]
  },
  "display_register": {
    "RH": "tonic written in octave 4 to tonic written in octave 5",
    "LH": "tonic written in octave 3 to tonic written in octave 4",
    "evidence_status": "[推断]",
    "basis": "Editorial display choice; octave labels follow MusicXML C4=middle C; each accidental remains attached to its written octave. This register choice is not asserted to be a source-prescribed exercise range.",
    "source_ids": [
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "pitch_sequences": {
    "RH": {
      "ascending": [
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "C5",
          "step": "C",
          "alter": 0,
          "octave": 5,
          "midi": 72,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "D5",
          "step": "D",
          "alter": 0,
          "octave": 5,
          "midi": 74,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "E5",
          "step": "E",
          "alter": 0,
          "octave": 5,
          "midi": 76,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "F#5",
          "step": "F",
          "alter": 1,
          "octave": 5,
          "midi": 78,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "G5",
          "step": "G",
          "alter": 0,
          "octave": 5,
          "midi": 79,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "G5",
          "step": "G",
          "alter": 0,
          "octave": 5,
          "midi": 79,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "F#5",
          "step": "F",
          "alter": 1,
          "octave": 5,
          "midi": 78,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "E5",
          "step": "E",
          "alter": 0,
          "octave": 5,
          "midi": 76,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "D5",
          "step": "D",
          "alter": 0,
          "octave": 5,
          "midi": 74,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "C5",
          "step": "C",
          "alter": 0,
          "octave": 5,
          "midi": 72,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "LH": {
      "ascending": [
        {
          "note": "G3",
          "step": "G",
          "alter": 0,
          "octave": 3,
          "midi": 55,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "A3",
          "step": "A",
          "alter": 0,
          "octave": 3,
          "midi": 57,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "B3",
          "step": "B",
          "alter": 0,
          "octave": 3,
          "midi": 59,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "C4",
          "step": "C",
          "alter": 0,
          "octave": 4,
          "midi": 60,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "F#4",
          "step": "F",
          "alter": 1,
          "octave": 4,
          "midi": 66,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "F#4",
          "step": "F",
          "alter": 1,
          "octave": 4,
          "midi": 66,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "C4",
          "step": "C",
          "alter": 0,
          "octave": 4,
          "midi": 60,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "B3",
          "step": "B",
          "alter": 0,
          "octave": 3,
          "midi": 59,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "A3",
          "step": "A",
          "alter": 0,
          "octave": 3,
          "midi": 57,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "G3",
          "step": "G",
          "alter": 0,
          "octave": 3,
          "midi": 55,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "evidence_status": "[推断]",
    "basis": "MIDI = 12*(written_octave+1)+natural_letter_pitch_class+alter; computed from verified spelling. Cb4=59, equivalent to B3, not B4.",
    "source_ids": [
      "AM-NOTES-G-MAJOR",
      "AM-FINGER-LMT",
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "fingering": {
    "instrument": "piano",
    "motion": "similar motion or hands separately",
    "octaves": 1,
    "directions_in_performance_order": true,
    "RH": {
      "ascending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ],
      "descending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ]
    },
    "LH": {
      "ascending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ],
      "descending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ]
    },
    "evidence_status": "[已核实]",
    "verification": "explicit_two_independent_source_charts",
    "source_ids": [
      "AM-FINGER-LMT",
      "AM-FINGER-MF"
    ],
    "source_locator": "LearnMusicTheory PDF page 1 G major row; Music Fun PDF page 4 staff",
    "review_status": "source_verified; professional release review pending",
    "variant_note": "A source-documented single-octave choice, not a claim that no alternative fingering is valid. Do not extend to multiple octaves by repeating these rows.",
    "additional_octave_fingerings": null,
    "direction_evidence": "Both ascending and descending notes and finger numbers were read directly in each displayed source staff; descending arrays were not merely assumed from an ascending-only source.",
    "visual_evidence_refs": [
      "turn781025view0",
      "turn641788view0"
    ]
  },
  "renderer_payload": {
    "clefs": {
      "RH": "treble",
      "LH": "bass"
    },
    "key_fifths": 1,
    "mode": "major",
    "duration_beats_per_note": 1,
    "default_tempo_bpm": 60,
    "tempo_status": "editorial playback default; not a sourced examination speed or promised learning target",
    "ascending_then_descending_index_order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "source_of_truth": "pitch_sequences plus same-hand fingering rows; no automatic enharmonic respelling",
    "print_fields": [
      "title",
      "key_signature",
      "note_spelling",
      "selected_hand",
      "one_octave_range",
      "ascending_and_descending_staff_notes",
      "matching_fingering",
      "short_practice_tip",
      "source_ids"
    ],
    "status": "content_and_data_handoff; notation/audio/print implementations have not been built or tested"
  },
  "labels": {
    "hand": "Hand",
    "right_hand": "Right hand",
    "left_hand": "Left hand",
    "both_hands": "Both hands",
    "direction": "Direction",
    "ascending": "Ascending",
    "descending": "Descending",
    "up_and_down": "Up and down",
    "octaves": "1 octave",
    "play": "Play scale",
    "stop": "Stop",
    "print": "Print current scale"
  },
  "related_links": [
    {
      "url": "/scales",
      "label": "All piano scales",
      "activation": "only when target is live"
    }
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P189 | content_data_prepared; rendered delivery pending | ['independent English page content', 'notes and key signature cross-checked', 'spelled pitches with octave and MIDI mapping', 'source-specific one-octave RH/LH ascending and descending fingering', 'key-specific hand-crossing explanation', 'original short practice check', 'notation/audio/print common data payload'] | ['professional release review', 'visual keyboard and staff rendering plus playback/print consistency QA'] |

### 待确认

- AM-G-MAJOR-RENDER — notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-G-MAJOR-RANGE — fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

来源：AM-NOTES-G-MAJOR, AM-FINGER-LMT, AM-FINGER-MF, AM-THEORY, AM-MUSICXML, AM-MIDI, AM-BAYLOR

## /scales/pentatonic

[已核实] 目标关键词：`pentatonic scale piano`；模板 T13；基线优先级：后做。
状态：`content_and_pitch_data_prepared_with_open_issues`；发布状态：未验收。

任务：Compare the five-note major and minor pentatonic collections using concrete piano examples.

### 页面需回答的问题

- Which five notes belong to major and minor pentatonic?
- How do C major and C minor pentatonic differ?
- Why do C major and A minor pentatonic share notes?
- Which notes are omitted from the seven-note scale?

### 英文页面内容

**Pentatonic Scales on Piano: Major and Minor**

See five pentatonic examples, compare major and minor forms, and find their notes on the keyboard.

#### Five different notes

Pentatonic means five tones. This page focuses on the common major and minor forms. Major pentatonic keeps degrees 1, 2, 3, 5 and 6 of the major scale. Minor pentatonic keeps 1, flat 3, 4, 5 and flat 7. Repeating the starting note at the octave completes the exercise without adding a sixth pitch class.

[已核实] 来源：AT-02。 

#### Compare the same tonic

C major pentatonic contains C, D, E, G and A. C minor pentatonic contains C, E-flat, F, G and B-flat. They share C and G, but the remaining notes change. Use this pair when the question is how major and minor pentatonic differ on the same root.

[已核实] 来源：AT-16, AT-20。 

#### Compare related collections

C major pentatonic and A minor pentatonic share their five pitch classes, ordered around different tonics. G major pentatonic and E minor pentatonic make another related pair. These comparisons explain shared notes; they do not make the two tonic labels interchangeable in a musical passage.

[推断] 来源：AT-16, AT-17, AT-18, AT-19。 

#### Try a short note check

Read C major pentatonic upward and return to C. Then read C minor pentatonic and name the three changed notes. For a second check, find the same five keys used by C major pentatonic and A minor pentatonic, starting and ending on the named tonic each time.

[推断] 来源：AT-16, AT-17, AT-20。 

### 结构化数据

```json
{
  "scope": "C major, A minor, G major, E minor and C minor pentatonic",
  "examples": [
    {
      "id": "c-major-pentatonic",
      "label": "C major pentatonic",
      "root": "C",
      "pitch_names": [
        "C",
        "D",
        "E",
        "G",
        "A"
      ],
      "degrees": [
        "1",
        "2",
        "3",
        "5",
        "6"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-16",
        "AT-02"
      ],
      "cross_check": "Direct note list checked against Texas A&M major/minor pentatonic construction",
      "ascending_notes": [
        "C",
        "D",
        "E",
        "G",
        "A",
        "C"
      ],
      "descending_notes": [
        "C",
        "A",
        "G",
        "E",
        "D",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          2,
          4,
          7,
          9,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "quality": "major",
      "step_pattern_semitones": [
        2,
        2,
        3,
        2,
        3
      ]
    },
    {
      "id": "a-minor-pentatonic",
      "label": "A minor pentatonic",
      "root": "A",
      "pitch_names": [
        "A",
        "C",
        "D",
        "E",
        "G"
      ],
      "degrees": [
        "1",
        "b3",
        "4",
        "5",
        "b7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-17",
        "AT-02"
      ],
      "cross_check": "Direct note list checked against Texas A&M major/minor pentatonic construction",
      "ascending_notes": [
        "A",
        "C",
        "D",
        "E",
        "G",
        "A"
      ],
      "descending_notes": [
        "A",
        "G",
        "E",
        "D",
        "C",
        "A"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          3,
          5,
          7,
          10,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 5,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 5,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 5,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "A",
            "octave": 5,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 5,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 5,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "quality": "minor",
      "step_pattern_semitones": [
        3,
        2,
        2,
        3,
        2
      ]
    },
    {
      "id": "g-major-pentatonic",
      "label": "G major pentatonic",
      "root": "G",
      "pitch_names": [
        "G",
        "A",
        "B",
        "D",
        "E"
      ],
      "degrees": [
        "1",
        "2",
        "3",
        "5",
        "6"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-18",
        "AT-02"
      ],
      "cross_check": "Direct note list checked against Texas A&M major/minor pentatonic construction",
      "ascending_notes": [
        "G",
        "A",
        "B",
        "D",
        "E",
        "G"
      ],
      "descending_notes": [
        "G",
        "E",
        "D",
        "B",
        "A",
        "G"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          2,
          4,
          7,
          9,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 5,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 5,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "G",
            "octave": 5,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 5,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "quality": "major",
      "step_pattern_semitones": [
        2,
        2,
        3,
        2,
        3
      ]
    },
    {
      "id": "e-minor-pentatonic",
      "label": "E minor pentatonic",
      "root": "E",
      "pitch_names": [
        "E",
        "G",
        "A",
        "B",
        "D"
      ],
      "degrees": [
        "1",
        "b3",
        "4",
        "5",
        "b7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-19",
        "AT-02"
      ],
      "cross_check": "Direct note list checked against Texas A&M major/minor pentatonic construction",
      "ascending_notes": [
        "E",
        "G",
        "A",
        "B",
        "D",
        "E"
      ],
      "descending_notes": [
        "E",
        "D",
        "B",
        "A",
        "G",
        "E"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          3,
          5,
          7,
          10,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 5,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "E",
            "octave": 5,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "quality": "minor",
      "step_pattern_semitones": [
        3,
        2,
        2,
        3,
        2
      ]
    },
    {
      "id": "c-minor-pentatonic",
      "label": "C minor pentatonic",
      "root": "C",
      "pitch_names": [
        "C",
        "Eb",
        "F",
        "G",
        "Bb"
      ],
      "degrees": [
        "1",
        "b3",
        "4",
        "5",
        "b7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-20",
        "AT-02"
      ],
      "cross_check": "Direct note list checked against Texas A&M major/minor pentatonic construction",
      "ascending_notes": [
        "C",
        "Eb",
        "F",
        "G",
        "Bb",
        "C"
      ],
      "descending_notes": [
        "C",
        "Bb",
        "G",
        "F",
        "Eb",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          3,
          5,
          7,
          10,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "quality": "minor",
      "step_pattern_semitones": [
        3,
        2,
        2,
        3,
        2
      ]
    }
  ],
  "related_collections": [
    {
      "ids": [
        "c-major-pentatonic",
        "a-minor-pentatonic"
      ],
      "evidence_status": "[推断]",
      "basis": "Equal pitch-class sets in AT-16 and AT-17."
    },
    {
      "ids": [
        "g-major-pentatonic",
        "e-minor-pentatonic"
      ],
      "evidence_status": "[推断]",
      "basis": "Equal pitch-class sets in AT-18 and AT-19."
    }
  ],
  "related_urls": [
    "/scales/blues",
    "/scales"
  ],
  "content_role_note": "数据准备稿，不代表网页交互或打印资源已上线。实际谱表/键盘图须由这些具体音符数据渲染后验收。"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P191 | partial_pending_assets_and_applicable_fingering | 独立英文内容、具体对象音符与构成、键盘/谱表渲染数据、出处、编辑练习；见本页数据及各组专门结果。 | 实际图示/播放/打印成品验收；未核实的手别方向八度指法。 |

### 待确认

- AT-scales-pentatonic-FINGERING — data.examples[*].fingering：缺少对应对象、手别、方向、八度范围的完整专业指法来源；不得由模式补写。；解决：逐个选择明确标注全部音符指法的正规教学资料，并经钢琴教师复核；已明确收录的例外见对象数据。
- AT-scales-pentatonic-OUTPUT — rendered_staff_keyboard_audio_pdf：已提供音符与渲染数据；本轮未生成并视检实际谱表/键盘图、音频或打印PDF，不能声称这些功能已可用。；解决：实现时用本页数据渲染并逐音视检/试听；PDF生成检查成功后才显示下载入口。
- AT-scales-pentatonic-PRACTICE — blocks.practice：练习是基于已核实音符的编辑提议，未通过专业教学效果或动作审核。；解决：钢琴教师核对适用水平和练习安排；不承诺学习效果。

来源：AT-02, AT-16, AT-17, AT-18, AT-19, AT-20

## /scales/a-major

[已核实] 目标关键词：`a major scale for piano`；模板 T12；基线优先级：后做。
状态：`content_data_ready_with_implementation_qa_pending`；发布状态：未验收。

任务：Translate the three-sharp A-major key signature into the correct ordered piano notes.

### 页面需回答的问题

- What are the notes and key signature of A major?
- Why is F-sharp first in the key signature when C-sharp comes first in the scale?
- Which fingers are used by each hand ascending and descending over one octave?
- What should I check during a short practice run?

### 英文页面内容

**A Major Piano Scale: Notes and Fingering**

See A major notes, key signature, keyboard pitches and separately verified one-octave fingering for each hand and direction.

#### A Major notes

A Major contains A, B, C#, D, E, F#, G#. Repeat A at the top to complete one octave. Its key signature has 3 sharps.

[已核实] 来源：AM-NOTES-A-MAJOR, AM-FINGER-LMT。 

#### Read all three sharps

A major uses C-sharp, F-sharp, and G-sharp. In the key signature, their written order is F♯, C♯, G♯; in the ascending scale, C♯ is encountered first. The half-step pairs are C♯–D and G♯–A. Key signatures list accidentals in a fixed order; a scale lists notes starting from its tonic.

[推断] 来源：AM-NOTES-A-MAJOR, AM-FINGER-LMT, AM-THEORY。 Explanatory relationships derived from independently checked note spelling and the verified major-scale interval rule.

#### One-octave fingering

For this one-octave version, the right hand crosses from C♯ with finger 3 to D with the thumb. The left hand crosses from E with the thumb to F♯ with finger 3. The final G♯–A uses right-hand fingers 4–5 and left-hand fingers 2–1.

[已核实] 来源：AM-FINGER-LMT, AM-FINGER-MF。 

#### A short practice check

Suggested drill: point to the three altered notes in the note list, then play A–B–C♯–D followed by E–F♯–G♯–A. During a return run, say G-sharp and F-sharp aloud. Finish by checking the same passage on the staff without adding unnecessary accidental symbols beside every note.

[推断] 来源：AM-FINGER-LMT, AM-FINGER-MF, AM-NOTES-A-MAJOR, AM-FINGER-LMT。 Original suggested drill using only the source-verified notes and explicit fingering for this key. No effectiveness or fixed learning-time claim.

### 结构化数据

```json
{
  "tonic": "A",
  "scale_type": "major",
  "notes_ascending": [
    "A",
    "B",
    "C#",
    "D",
    "E",
    "F#",
    "G#",
    "A"
  ],
  "notes_descending": [
    "A",
    "G#",
    "F#",
    "E",
    "D",
    "C#",
    "B",
    "A"
  ],
  "note_spelling_status": "[已核实]",
  "note_source_ids": [
    "AM-NOTES-A-MAJOR",
    "AM-FINGER-LMT"
  ],
  "key_signature": {
    "fifths": 3,
    "ordered_accidentals": [
      "F#",
      "C#",
      "G#"
    ],
    "count": 3,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AM-NOTES-A-MAJOR",
      "AM-FINGER-LMT"
    ]
  },
  "intervals": {
    "ascending_semitones": [
      2,
      2,
      1,
      2,
      2,
      2,
      1
    ],
    "descending_semitones": [
      1,
      2,
      2,
      2,
      1,
      2,
      2
    ],
    "half_step_pairs": [
      [
        "C#",
        "D"
      ],
      [
        "G#",
        "A"
      ]
    ],
    "evidence_status": "[推断]",
    "basis": "Apply the verified major-scale interval rule to the independently checked note spelling. Descending order follows the same pitches from upper tonic to lower tonic.",
    "source_ids": [
      "AM-NOTES-A-MAJOR",
      "AM-FINGER-LMT",
      "AM-THEORY"
    ]
  },
  "display_register": {
    "RH": "tonic written in octave 4 to tonic written in octave 5",
    "LH": "tonic written in octave 3 to tonic written in octave 4",
    "evidence_status": "[推断]",
    "basis": "Editorial display choice; octave labels follow MusicXML C4=middle C; each accidental remains attached to its written octave. This register choice is not asserted to be a source-prescribed exercise range.",
    "source_ids": [
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "pitch_sequences": {
    "RH": {
      "ascending": [
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "C#5",
          "step": "C",
          "alter": 1,
          "octave": 5,
          "midi": 73,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "D5",
          "step": "D",
          "alter": 0,
          "octave": 5,
          "midi": 74,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "E5",
          "step": "E",
          "alter": 0,
          "octave": 5,
          "midi": 76,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "F#5",
          "step": "F",
          "alter": 1,
          "octave": 5,
          "midi": 78,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "G#5",
          "step": "G",
          "alter": 1,
          "octave": 5,
          "midi": 80,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "A5",
          "step": "A",
          "alter": 0,
          "octave": 5,
          "midi": 81,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "A5",
          "step": "A",
          "alter": 0,
          "octave": 5,
          "midi": 81,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "G#5",
          "step": "G",
          "alter": 1,
          "octave": 5,
          "midi": 80,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "F#5",
          "step": "F",
          "alter": 1,
          "octave": 5,
          "midi": 78,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "E5",
          "step": "E",
          "alter": 0,
          "octave": 5,
          "midi": 76,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "D5",
          "step": "D",
          "alter": 0,
          "octave": 5,
          "midi": 74,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "C#5",
          "step": "C",
          "alter": 1,
          "octave": 5,
          "midi": 73,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "LH": {
      "ascending": [
        {
          "note": "A3",
          "step": "A",
          "alter": 0,
          "octave": 3,
          "midi": 57,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "B3",
          "step": "B",
          "alter": 0,
          "octave": 3,
          "midi": 59,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "C#4",
          "step": "C",
          "alter": 1,
          "octave": 4,
          "midi": 61,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "F#4",
          "step": "F",
          "alter": 1,
          "octave": 4,
          "midi": 66,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "G#4",
          "step": "G",
          "alter": 1,
          "octave": 4,
          "midi": 68,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "G#4",
          "step": "G",
          "alter": 1,
          "octave": 4,
          "midi": 68,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "F#4",
          "step": "F",
          "alter": 1,
          "octave": 4,
          "midi": 66,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "C#4",
          "step": "C",
          "alter": 1,
          "octave": 4,
          "midi": 61,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "B3",
          "step": "B",
          "alter": 0,
          "octave": 3,
          "midi": 59,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "A3",
          "step": "A",
          "alter": 0,
          "octave": 3,
          "midi": 57,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "evidence_status": "[推断]",
    "basis": "MIDI = 12*(written_octave+1)+natural_letter_pitch_class+alter; computed from verified spelling. Cb4=59, equivalent to B3, not B4.",
    "source_ids": [
      "AM-NOTES-A-MAJOR",
      "AM-FINGER-LMT",
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "fingering": {
    "instrument": "piano",
    "motion": "similar motion or hands separately",
    "octaves": 1,
    "directions_in_performance_order": true,
    "RH": {
      "ascending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ],
      "descending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ]
    },
    "LH": {
      "ascending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ],
      "descending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ]
    },
    "evidence_status": "[已核实]",
    "verification": "explicit_two_independent_source_charts",
    "source_ids": [
      "AM-FINGER-LMT",
      "AM-FINGER-MF"
    ],
    "source_locator": "LearnMusicTheory PDF page 1 A major row; Music Fun PDF page 6 staff",
    "review_status": "source_verified; professional release review pending",
    "variant_note": "A source-documented single-octave choice, not a claim that no alternative fingering is valid. Do not extend to multiple octaves by repeating these rows.",
    "additional_octave_fingerings": null,
    "direction_evidence": "Both ascending and descending notes and finger numbers were read directly in each displayed source staff; descending arrays were not merely assumed from an ascending-only source.",
    "visual_evidence_refs": [
      "turn781025view0",
      "turn699204view0"
    ]
  },
  "renderer_payload": {
    "clefs": {
      "RH": "treble",
      "LH": "bass"
    },
    "key_fifths": 3,
    "mode": "major",
    "duration_beats_per_note": 1,
    "default_tempo_bpm": 60,
    "tempo_status": "editorial playback default; not a sourced examination speed or promised learning target",
    "ascending_then_descending_index_order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "source_of_truth": "pitch_sequences plus same-hand fingering rows; no automatic enharmonic respelling",
    "print_fields": [
      "title",
      "key_signature",
      "note_spelling",
      "selected_hand",
      "one_octave_range",
      "ascending_and_descending_staff_notes",
      "matching_fingering",
      "short_practice_tip",
      "source_ids"
    ],
    "status": "content_and_data_handoff; notation/audio/print implementations have not been built or tested"
  },
  "labels": {
    "hand": "Hand",
    "right_hand": "Right hand",
    "left_hand": "Left hand",
    "both_hands": "Both hands",
    "direction": "Direction",
    "ascending": "Ascending",
    "descending": "Descending",
    "up_and_down": "Up and down",
    "octaves": "1 octave",
    "play": "Play scale",
    "stop": "Stop",
    "print": "Print current scale"
  },
  "related_links": [
    {
      "url": "/scales",
      "label": "All piano scales",
      "activation": "only when target is live"
    }
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P192 | content_data_prepared; rendered delivery pending | ['independent English page content', 'notes and key signature cross-checked', 'spelled pitches with octave and MIDI mapping', 'source-specific one-octave RH/LH ascending and descending fingering', 'key-specific hand-crossing explanation', 'original short practice check', 'notation/audio/print common data payload'] | ['professional release review', 'visual keyboard and staff rendering plus playback/print consistency QA'] |

### 待确认

- AM-A-MAJOR-RENDER — notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-A-MAJOR-RANGE — fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

来源：AM-NOTES-A-MAJOR, AM-FINGER-LMT, AM-FINGER-MF, AM-THEORY, AM-MUSICXML, AM-MIDI, AM-BAYLOR

## /scales/c-minor

[已核实] 目标关键词：`c minor scale piano`；模板 T12；基线优先级：后做。
状态：`content_and_note_data_ready_with_fingering_gaps`；发布状态：未验收。

任务：直接查看指定调性的音阶、键位、手别指法和示范。

### 页面需回答的问题

- What notes are in C natural minor?
- Which notes change in C harmonic and melodic minor?
- What is the descending classical melodic-minor sequence?
- Which fingers are supported for each hand and range?
- How do I match the keyboard, score and printed note names?

### 英文页面内容

**C Minor Scale on Piano: Natural, Harmonic & Melodic**

Find the notes of C minor, compare its three forms and descending patterns, and read source-checked piano fingerings.

#### Find the three-flat starting point

C natural minor uses C, D, Eb, F, G, Ab, and Bb. Its signature contains Bb, Eb, and Ab, shared with Eb major. Keep Eb as the third degree in every minor form on this page. Changing the upper part of the scale does not turn that Eb into E.

[已核实] 来源：AN-HMT-C。 

#### B natural changes the harmonic form

The harmonic version replaces Bb with B natural and retains Ab. Ascending classical melodic minor uses A natural and B natural; descending it returns to Bb and Ab. Compare the spelling as well as the sound. The B in harmonic minor is a raised seventh degree, not an extra note added between Bb and C.

[已核实] 来源：AN-HMT-C。 

#### Separate the opening from the ending

First play C-D-Eb-F-G, then stop. Continue with Ab-Bb-C for natural minor, Ab-B-C for harmonic minor, or A-B-C for melodic ascent. Return to the upper C before testing each descent. For a written check, label the sixth and seventh degrees in all three versions and circle only the notes that change.

[推断] 来源：AN-HMT-C。 

#### Keep the register and direction together

The one-octave ascent rows below are kept separate from the additional two-octave natural-minor demonstration. Use one complete row for its stated range. A continuous two-octave run passes through the middle C and ends only at the top C, so its middle and ending finger choices are not interchangeable.

[推断] 来源：AN-HA-C。 

### 结构化数据

```json
{
  "tonic": "C",
  "default_form": "natural_minor",
  "key_signature": {
    "accidentals": [
      "Bb",
      "Eb",
      "Ab"
    ],
    "count": 3,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-C",
      "AN-PS-NAT"
    ]
  },
  "relative_major": {
    "name": "Eb major",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-C",
      "AN-PS-NAT"
    ]
  },
  "forms": [
    {
      "id": "natural_minor",
      "label": "Natural minor",
      "notes_ascending": [
        "C",
        "D",
        "Eb",
        "F",
        "G",
        "Ab",
        "Bb",
        "C"
      ],
      "notes_descending": [
        "C",
        "Bb",
        "Ab",
        "G",
        "F",
        "Eb",
        "D",
        "C"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-C",
        "AN-PS-NAT"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        2,
        2
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-NAT"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-C",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "Ab",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "C",
            "written_octave": 3,
            "midi": 48,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 3,
            "midi": 50,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 3,
            "midi": 51,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "Ab",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "Ab",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "Ab",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 3,
            "midi": 51,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 3,
            "midi": 50,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 3,
            "midi": 48,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "harmonic_minor",
      "label": "Harmonic minor",
      "notes_ascending": [
        "C",
        "D",
        "Eb",
        "F",
        "G",
        "Ab",
        "B",
        "C"
      ],
      "notes_descending": [
        "C",
        "B",
        "Ab",
        "G",
        "F",
        "Eb",
        "D",
        "C"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-C",
        "AN-PS-HAR"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        3,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-HAR"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-C",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "Ab",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "C",
            "written_octave": 3,
            "midi": 48,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 3,
            "midi": 50,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 3,
            "midi": 51,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "Ab",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "Ab",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "Ab",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 3,
            "midi": 51,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 3,
            "midi": 50,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 3,
            "midi": 48,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "melodic_minor_classical",
      "label": "Melodic minor (classical exercise)",
      "notes_ascending": [
        "C",
        "D",
        "Eb",
        "F",
        "G",
        "A",
        "B",
        "C"
      ],
      "notes_descending": [
        "C",
        "Bb",
        "Ab",
        "G",
        "F",
        "Eb",
        "D",
        "C"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-C",
        "AN-DENTON"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        2,
        2,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": null,
          "left_hand": null
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [],
        "evidence_status": "待确认",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-C",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "C",
            "written_octave": 3,
            "midi": 48,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 3,
            "midi": 50,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 3,
            "midi": 51,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "Ab",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "Ab",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 3,
            "midi": 51,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 3,
            "midi": 50,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 3,
            "midi": 48,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          }
        ]
      }
    }
  ],
  "scope": {
    "minor_convention": "Classical scale exercise: melodic minor restores natural-minor sixth/seventh on descent. This is not a claim that compositions must always follow that direction rule.",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-OMT",
      "AN-HA-A"
    ],
    "audited_note_octaves": 1,
    "audited_finger_octaves": 1,
    "hands_together_fingering": null,
    "continuous_turnaround_fingering": null
  },
  "approved_playback_octaves": [
    1
  ],
  "print_and_audio": {
    "status": "implementation_pending",
    "source_asset_reuse": "external reference only; no source diagrams, recordings, scores or PDFs bundled or authorized for reuse",
    "print_fields": [
      "page title",
      "form",
      "direction",
      "hand",
      "exact note spellings",
      "key signature",
      "one-octave staff events",
      "non-null source-reviewed fingers only",
      "source ids",
      "checked date"
    ],
    "tempo_presets_bpm": [
      40,
      60,
      80
    ],
    "tempo_presets_status": "[推断] 编辑默认值；不代表考试要求或专业建议",
    "audio_render_contract": "Use matching selected-form selected-direction pitch events. Do not apply fingering to audio pitches or respell notes to physical-key labels. Keep display spelling separate from MIDI pitch."
  },
  "additional_sourced_fingering": {
    "form": "natural_minor",
    "octaves": 2,
    "right_hand": {
      "ascending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ],
      "descending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ]
    },
    "left_hand": {
      "ascending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ],
      "descending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ]
    },
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HA-C"
    ],
    "basis": "Source explicitly states a two-octave ascent then the same in reverse; reversal here follows that direct instruction. Not generalized to any other form.",
    "independent_source_count": 1,
    "release_status": "requires per-page performance and rendering review"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P193 | partial_content_ready_data_gaps | ['本调三种小调的严格音名、构成与上下行', '键位/MIDI/谱表事件数据（运算映射已标推断）', '已查实的指法行；未核实组合明确为 null', '独立英文说明和练习', '打印字段、来源、状态与待办'] | ['缺失手别/方向指法（见本页逐项 issues）', '扩大八度和连续往返连接指法审核', '实际谱表/音频/打印成品一致性验收'] |

### 待确认

- AN-U099-natural_minor-FINGER — data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U099-harmonic_minor-FINGER — data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U099-melodic_minor_classical-FINGER — data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U099-RANGE — data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U099-QA — data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

来源：AN-BMT-AS, AN-DENTON, AN-HA-C, AN-HA-GUIDE, AN-HMT-C, AN-OMT, AN-PS-HAR, AN-PS-MEL, AN-PS-NAT

## /scales/d-minor

[已核实] 目标关键词：`d minor scale piano`；模板 T12；基线优先级：后做。
状态：`content_and_note_data_ready_with_fingering_gaps`；发布状态：未验收。

任务：直接查看指定调性的音阶、键位、手别指法和示范。

### 页面需回答的问题

- What notes are in D natural minor?
- Which notes change in D harmonic and melodic minor?
- What is the descending classical melodic-minor sequence?
- Which fingers are supported for each hand and range?
- How do I match the keyboard, score and printed note names?

### 英文页面内容

**D Minor Scale on Piano: Natural, Harmonic & Melodic**

Find the notes of D minor, compare its three forms and descending patterns, and read source-checked piano fingerings.

#### Begin with the B-flat

D natural minor contains D, E, F, G, A, Bb, and C. Its one-flat signature is shared with F major. Bb belongs to this starting collection. Keep the note spelling visible when locating it on the keyboard so that it remains the sixth degree of D minor.

[已核实] 来源：AN-HMT-D。 

#### A flat and a sharp can appear together

D harmonic minor keeps Bb and changes C to C#. In ascending classical melodic minor, Bb also rises to B natural. The descending melodic version uses C and Bb again. The form selector therefore changes specific scale degrees; it does not apply a rule that every note must use only flats or only sharps.

[已核实] 来源：AN-HMT-D。 

#### Compare three routes back to D

Try A-Bb-C-D, then A-Bb-C#-D, then A-B-C#-D. Leave a short pause after the final D and say the name of the form. Next, play down from the upper D using the displayed descending row. Before restarting, check whether the next sixth degree is Bb or B natural.

[推断] 来源：AN-HMT-D。 

#### Check the transition before a full run

For the sourced natural and harmonic one-octave ascents, the right-hand third finger plays F before the thumb moves to G. Practice that small connection slowly, then add the selected ending. The left-hand row has its own sequence. Do not transfer a right-hand crossing instruction to the left hand.

[已核实] 来源：AN-PS-NAT, AN-PS-HAR。 

### 结构化数据

```json
{
  "tonic": "D",
  "default_form": "natural_minor",
  "key_signature": {
    "accidentals": [
      "Bb"
    ],
    "count": 1,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-D",
      "AN-PS-NAT"
    ]
  },
  "relative_major": {
    "name": "F major",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-D",
      "AN-PS-NAT"
    ]
  },
  "forms": [
    {
      "id": "natural_minor",
      "label": "Natural minor",
      "notes_ascending": [
        "D",
        "E",
        "F",
        "G",
        "A",
        "Bb",
        "C",
        "D"
      ],
      "notes_descending": [
        "D",
        "C",
        "Bb",
        "A",
        "G",
        "F",
        "E",
        "D"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-D",
        "AN-PS-NAT"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        2,
        2
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-NAT"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-D",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "D",
            "written_octave": 3,
            "midi": 50,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 3,
            "midi": 52,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 3,
            "midi": 52,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 3,
            "midi": 50,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "harmonic_minor",
      "label": "Harmonic minor",
      "notes_ascending": [
        "D",
        "E",
        "F",
        "G",
        "A",
        "Bb",
        "C#",
        "D"
      ],
      "notes_descending": [
        "D",
        "C#",
        "Bb",
        "A",
        "G",
        "F",
        "E",
        "D"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-D",
        "AN-PS-HAR"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        3,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-HAR"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-D",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "D",
            "written_octave": 3,
            "midi": 50,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 3,
            "midi": 52,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 3,
            "midi": 52,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 3,
            "midi": 50,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "melodic_minor_classical",
      "label": "Melodic minor (classical exercise)",
      "notes_ascending": [
        "D",
        "E",
        "F",
        "G",
        "A",
        "B",
        "C#",
        "D"
      ],
      "notes_descending": [
        "D",
        "C",
        "Bb",
        "A",
        "G",
        "F",
        "E",
        "D"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-D",
        "AN-DENTON"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        2,
        2,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": null,
          "left_hand": null
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [],
        "evidence_status": "待确认",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-D",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "D",
            "written_octave": 3,
            "midi": 50,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 3,
            "midi": 52,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 3,
            "midi": 52,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 3,
            "midi": 50,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          }
        ]
      }
    }
  ],
  "scope": {
    "minor_convention": "Classical scale exercise: melodic minor restores natural-minor sixth/seventh on descent. This is not a claim that compositions must always follow that direction rule.",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-OMT",
      "AN-HA-A"
    ],
    "audited_note_octaves": 1,
    "audited_finger_octaves": 1,
    "hands_together_fingering": null,
    "continuous_turnaround_fingering": null
  },
  "approved_playback_octaves": [
    1
  ],
  "print_and_audio": {
    "status": "implementation_pending",
    "source_asset_reuse": "external reference only; no source diagrams, recordings, scores or PDFs bundled or authorized for reuse",
    "print_fields": [
      "page title",
      "form",
      "direction",
      "hand",
      "exact note spellings",
      "key signature",
      "one-octave staff events",
      "non-null source-reviewed fingers only",
      "source ids",
      "checked date"
    ],
    "tempo_presets_bpm": [
      40,
      60,
      80
    ],
    "tempo_presets_status": "[推断] 编辑默认值；不代表考试要求或专业建议",
    "audio_render_contract": "Use matching selected-form selected-direction pitch events. Do not apply fingering to audio pitches or respell notes to physical-key labels. Keep display spelling separate from MIDI pitch."
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P194 | partial_content_ready_data_gaps | ['本调三种小调的严格音名、构成与上下行', '键位/MIDI/谱表事件数据（运算映射已标推断）', '已查实的指法行；未核实组合明确为 null', '独立英文说明和练习', '打印字段、来源、状态与待办'] | ['缺失手别/方向指法（见本页逐项 issues）', '扩大八度和连续往返连接指法审核', '实际谱表/音频/打印成品一致性验收'] |

### 待确认

- AN-U100-natural_minor-FINGER — data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U100-harmonic_minor-FINGER — data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U100-melodic_minor_classical-FINGER — data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U100-RANGE — data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U100-QA — data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

来源：AN-BMT-AS, AN-DENTON, AN-HA-GUIDE, AN-HMT-D, AN-OMT, AN-PS-HAR, AN-PS-MEL, AN-PS-NAT

## /scales/e-major

[已核实] 目标关键词：`e major scale piano`；模板 T12；基线优先级：后做。
状态：`content_data_ready_with_implementation_qa_pending`；发布状态：未验收。

任务：Navigate E major’s four black keys while keeping the white-key anchors and hand crossings visible.

### 页面需回答的问题

- What are the notes and key signature of E major?
- Which notes remain natural in the four-sharp key of E major?
- Which fingers are used by each hand ascending and descending over one octave?
- What should I check during a short practice run?

### 英文页面内容

**E Major Piano Scale: Notes and Fingering**

See E major notes, key signature, keyboard pitches and separately verified one-octave fingering for each hand and direction.

#### E Major notes

E Major contains E, F#, G#, A, B, C#, D#. Repeat E at the top to complete one octave. Its key signature has 4 sharps.

[已核实] 来源：AM-NOTES-E-MAJOR, AM-FINGER-LMT。 

#### Use E, A, and B as visual anchors

The unaltered note names in E major are E, A, and B. F♯, G♯, C♯, and D♯ fill the remaining degrees. Its half steps are G♯–A and D♯–E. Both involve a black key followed by a white key in the ascent.

[推断] 来源：AM-NOTES-E-MAJOR, AM-FINGER-LMT, AM-THEORY。 Explanatory relationships derived from independently checked note spelling and the verified major-scale interval rule.

#### One-octave fingering

The right-hand thumb moves from its initial E to A after fingers 2 and 3 play F♯ and G♯. The left-hand thumb reaches B, then finger 3 crosses to C♯. On the descent, use the separately recorded reverse-direction fingers attached to the notes.

[已核实] 来源：AM-FINGER-LMT, AM-FINGER-MF。 

#### A short practice check

Suggested drill: locate E, A, and B first, then fill in the intervening scale notes. Play G♯–A and D♯–E separately and listen to each half step. Finally, run from E to E and back while checking that the four sharp names survive the change of direction.

[推断] 来源：AM-FINGER-LMT, AM-FINGER-MF, AM-NOTES-E-MAJOR, AM-FINGER-LMT。 Original suggested drill using only the source-verified notes and explicit fingering for this key. No effectiveness or fixed learning-time claim.

### 结构化数据

```json
{
  "tonic": "E",
  "scale_type": "major",
  "notes_ascending": [
    "E",
    "F#",
    "G#",
    "A",
    "B",
    "C#",
    "D#",
    "E"
  ],
  "notes_descending": [
    "E",
    "D#",
    "C#",
    "B",
    "A",
    "G#",
    "F#",
    "E"
  ],
  "note_spelling_status": "[已核实]",
  "note_source_ids": [
    "AM-NOTES-E-MAJOR",
    "AM-FINGER-LMT"
  ],
  "key_signature": {
    "fifths": 4,
    "ordered_accidentals": [
      "F#",
      "C#",
      "G#",
      "D#"
    ],
    "count": 4,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AM-NOTES-E-MAJOR",
      "AM-FINGER-LMT"
    ]
  },
  "intervals": {
    "ascending_semitones": [
      2,
      2,
      1,
      2,
      2,
      2,
      1
    ],
    "descending_semitones": [
      1,
      2,
      2,
      2,
      1,
      2,
      2
    ],
    "half_step_pairs": [
      [
        "G#",
        "A"
      ],
      [
        "D#",
        "E"
      ]
    ],
    "evidence_status": "[推断]",
    "basis": "Apply the verified major-scale interval rule to the independently checked note spelling. Descending order follows the same pitches from upper tonic to lower tonic.",
    "source_ids": [
      "AM-NOTES-E-MAJOR",
      "AM-FINGER-LMT",
      "AM-THEORY"
    ]
  },
  "display_register": {
    "RH": "tonic written in octave 4 to tonic written in octave 5",
    "LH": "tonic written in octave 3 to tonic written in octave 4",
    "evidence_status": "[推断]",
    "basis": "Editorial display choice; octave labels follow MusicXML C4=middle C; each accidental remains attached to its written octave. This register choice is not asserted to be a source-prescribed exercise range.",
    "source_ids": [
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "pitch_sequences": {
    "RH": {
      "ascending": [
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "F#4",
          "step": "F",
          "alter": 1,
          "octave": 4,
          "midi": 66,
          "scale_degree": 2,
          "key_color": "black"
        },
        {
          "note": "G#4",
          "step": "G",
          "alter": 1,
          "octave": 4,
          "midi": 68,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "C#5",
          "step": "C",
          "alter": 1,
          "octave": 5,
          "midi": 73,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "D#5",
          "step": "D",
          "alter": 1,
          "octave": 5,
          "midi": 75,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "E5",
          "step": "E",
          "alter": 0,
          "octave": 5,
          "midi": 76,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "E5",
          "step": "E",
          "alter": 0,
          "octave": 5,
          "midi": 76,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "D#5",
          "step": "D",
          "alter": 1,
          "octave": 5,
          "midi": 75,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "C#5",
          "step": "C",
          "alter": 1,
          "octave": 5,
          "midi": 73,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "G#4",
          "step": "G",
          "alter": 1,
          "octave": 4,
          "midi": 68,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "F#4",
          "step": "F",
          "alter": 1,
          "octave": 4,
          "midi": 66,
          "scale_degree": 2,
          "key_color": "black"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "LH": {
      "ascending": [
        {
          "note": "E3",
          "step": "E",
          "alter": 0,
          "octave": 3,
          "midi": 52,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "F#3",
          "step": "F",
          "alter": 1,
          "octave": 3,
          "midi": 54,
          "scale_degree": 2,
          "key_color": "black"
        },
        {
          "note": "G#3",
          "step": "G",
          "alter": 1,
          "octave": 3,
          "midi": 56,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "A3",
          "step": "A",
          "alter": 0,
          "octave": 3,
          "midi": 57,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "B3",
          "step": "B",
          "alter": 0,
          "octave": 3,
          "midi": 59,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "C#4",
          "step": "C",
          "alter": 1,
          "octave": 4,
          "midi": 61,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "D#4",
          "step": "D",
          "alter": 1,
          "octave": 4,
          "midi": 63,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "D#4",
          "step": "D",
          "alter": 1,
          "octave": 4,
          "midi": 63,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "C#4",
          "step": "C",
          "alter": 1,
          "octave": 4,
          "midi": 61,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "B3",
          "step": "B",
          "alter": 0,
          "octave": 3,
          "midi": 59,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "A3",
          "step": "A",
          "alter": 0,
          "octave": 3,
          "midi": 57,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "G#3",
          "step": "G",
          "alter": 1,
          "octave": 3,
          "midi": 56,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "F#3",
          "step": "F",
          "alter": 1,
          "octave": 3,
          "midi": 54,
          "scale_degree": 2,
          "key_color": "black"
        },
        {
          "note": "E3",
          "step": "E",
          "alter": 0,
          "octave": 3,
          "midi": 52,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "evidence_status": "[推断]",
    "basis": "MIDI = 12*(written_octave+1)+natural_letter_pitch_class+alter; computed from verified spelling. Cb4=59, equivalent to B3, not B4.",
    "source_ids": [
      "AM-NOTES-E-MAJOR",
      "AM-FINGER-LMT",
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "fingering": {
    "instrument": "piano",
    "motion": "similar motion or hands separately",
    "octaves": 1,
    "directions_in_performance_order": true,
    "RH": {
      "ascending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ],
      "descending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ]
    },
    "LH": {
      "ascending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ],
      "descending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ]
    },
    "evidence_status": "[已核实]",
    "verification": "explicit_two_independent_source_charts",
    "source_ids": [
      "AM-FINGER-LMT",
      "AM-FINGER-MF"
    ],
    "source_locator": "LearnMusicTheory PDF page 1 E major row; Music Fun PDF page 7 staff",
    "review_status": "source_verified; professional release review pending",
    "variant_note": "A source-documented single-octave choice, not a claim that no alternative fingering is valid. Do not extend to multiple octaves by repeating these rows.",
    "additional_octave_fingerings": null,
    "direction_evidence": "Both ascending and descending notes and finger numbers were read directly in each displayed source staff; descending arrays were not merely assumed from an ascending-only source.",
    "visual_evidence_refs": [
      "turn781025view0",
      "turn254414view3"
    ]
  },
  "renderer_payload": {
    "clefs": {
      "RH": "treble",
      "LH": "bass"
    },
    "key_fifths": 4,
    "mode": "major",
    "duration_beats_per_note": 1,
    "default_tempo_bpm": 60,
    "tempo_status": "editorial playback default; not a sourced examination speed or promised learning target",
    "ascending_then_descending_index_order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "source_of_truth": "pitch_sequences plus same-hand fingering rows; no automatic enharmonic respelling",
    "print_fields": [
      "title",
      "key_signature",
      "note_spelling",
      "selected_hand",
      "one_octave_range",
      "ascending_and_descending_staff_notes",
      "matching_fingering",
      "short_practice_tip",
      "source_ids"
    ],
    "status": "content_and_data_handoff; notation/audio/print implementations have not been built or tested"
  },
  "labels": {
    "hand": "Hand",
    "right_hand": "Right hand",
    "left_hand": "Left hand",
    "both_hands": "Both hands",
    "direction": "Direction",
    "ascending": "Ascending",
    "descending": "Descending",
    "up_and_down": "Up and down",
    "octaves": "1 octave",
    "play": "Play scale",
    "stop": "Stop",
    "print": "Print current scale"
  },
  "related_links": [
    {
      "url": "/scales",
      "label": "All piano scales",
      "activation": "only when target is live"
    }
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P195 | content_data_prepared; rendered delivery pending | ['independent English page content', 'notes and key signature cross-checked', 'spelled pitches with octave and MIDI mapping', 'source-specific one-octave RH/LH ascending and descending fingering', 'key-specific hand-crossing explanation', 'original short practice check', 'notation/audio/print common data payload'] | ['professional release review', 'visual keyboard and staff rendering plus playback/print consistency QA'] |

### 待确认

- AM-E-MAJOR-RENDER — notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-E-MAJOR-RANGE — fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

来源：AM-NOTES-E-MAJOR, AM-FINGER-LMT, AM-FINGER-MF, AM-THEORY, AM-MUSICXML, AM-MIDI, AM-BAYLOR

## /scales/b-minor

[已核实] 目标关键词：`b minor scale piano`；模板 T12；基线优先级：后做。
状态：`content_and_note_data_ready_with_fingering_gaps`；发布状态：未验收。

任务：直接查看指定调性的音阶、键位、手别指法和示范。

### 页面需回答的问题

- What notes are in B natural minor?
- Which notes change in B harmonic and melodic minor?
- What is the descending classical melodic-minor sequence?
- Which fingers are supported for each hand and range?
- How do I match the keyboard, score and printed note names?

### 英文页面内容

**B Minor Scale on Piano: Natural, Harmonic & Melodic**

Find the notes of B minor, compare its three forms and descending patterns, and read source-checked piano fingerings.

#### Keep C-sharp and F-sharp

B natural minor uses B, C#, D, E, F#, G, and A. Its two-sharp signature is shared with D major. C# and F# remain present in each version here. G and A are the degrees to watch when switching between natural, harmonic, and melodic minor.

[已核实] 来源：AN-HMT-B。 

#### The raised seventh is A-sharp

B harmonic minor replaces A with A# while leaving G natural. Ascending classical melodic minor uses G# and A#. Its descending form restores A and G. The last step into the upper B is therefore A#-B in harmonic minor and melodic ascent, while natural minor uses A-B.

[已核实] 来源：AN-HMT-B。 

#### Start each hand from its own row

In the sourced one-octave natural and harmonic ascents, the left hand starts with finger 4 on B. Its first four notes use 4-3-2-1; the right-hand row starts with the thumb. This distinction matters when changing hands. Check the hand label before rehearsing the notes or marking a printed copy.

[已核实] 来源：AN-PS-NAT, AN-PS-HAR。 

#### Practice one fixed opening and two changing notes

Play B-C#-D-E-F# and pause. Add G-A-B, G-A#-B, or G#-A#-B. Name the ending you chose, then try the other versions without changing the opening. Finish by reading the selected descending notes out loud before playing them. Keep the exercise short enough that you can identify every accidental without guessing.

[推断] 来源：AN-HMT-B。 

### 结构化数据

```json
{
  "tonic": "B",
  "default_form": "natural_minor",
  "key_signature": {
    "accidentals": [
      "F#",
      "C#"
    ],
    "count": 2,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-B",
      "AN-PS-NAT"
    ]
  },
  "relative_major": {
    "name": "D major",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-B",
      "AN-PS-NAT"
    ]
  },
  "forms": [
    {
      "id": "natural_minor",
      "label": "Natural minor",
      "notes_ascending": [
        "B",
        "C#",
        "D",
        "E",
        "F#",
        "G",
        "A",
        "B"
      ],
      "notes_descending": [
        "B",
        "A",
        "G",
        "F#",
        "E",
        "D",
        "C#",
        "B"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-B",
        "AN-PS-NAT"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        2,
        2
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            4,
            3,
            2,
            1,
            4,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-NAT"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-B",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 5,
            "midi": 81,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 5,
            "midi": 83,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "B",
            "written_octave": 5,
            "midi": 83,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 5,
            "midi": 81,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "harmonic_minor",
      "label": "Harmonic minor",
      "notes_ascending": [
        "B",
        "C#",
        "D",
        "E",
        "F#",
        "G",
        "A#",
        "B"
      ],
      "notes_descending": [
        "B",
        "A#",
        "G",
        "F#",
        "E",
        "D",
        "C#",
        "B"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-B",
        "AN-PS-HAR"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        3,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            4,
            3,
            2,
            1,
            4,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-HAR"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-B",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 5,
            "midi": 82,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 5,
            "midi": 83,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "B",
            "written_octave": 5,
            "midi": 83,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 5,
            "midi": 82,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "melodic_minor_classical",
      "label": "Melodic minor (classical exercise)",
      "notes_ascending": [
        "B",
        "C#",
        "D",
        "E",
        "F#",
        "G#",
        "A#",
        "B"
      ],
      "notes_descending": [
        "B",
        "A",
        "G",
        "F#",
        "E",
        "D",
        "C#",
        "B"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-B",
        "AN-DENTON"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        2,
        2,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": null,
          "left_hand": null
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [],
        "evidence_status": "待确认",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-B",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 5,
            "midi": 80,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A#",
            "written_octave": 5,
            "midi": 82,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 5,
            "midi": 83,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "B",
            "written_octave": 5,
            "midi": 83,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 5,
            "midi": 81,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          }
        ]
      }
    }
  ],
  "scope": {
    "minor_convention": "Classical scale exercise: melodic minor restores natural-minor sixth/seventh on descent. This is not a claim that compositions must always follow that direction rule.",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-OMT",
      "AN-HA-A"
    ],
    "audited_note_octaves": 1,
    "audited_finger_octaves": 1,
    "hands_together_fingering": null,
    "continuous_turnaround_fingering": null
  },
  "approved_playback_octaves": [
    1
  ],
  "print_and_audio": {
    "status": "implementation_pending",
    "source_asset_reuse": "external reference only; no source diagrams, recordings, scores or PDFs bundled or authorized for reuse",
    "print_fields": [
      "page title",
      "form",
      "direction",
      "hand",
      "exact note spellings",
      "key signature",
      "one-octave staff events",
      "non-null source-reviewed fingers only",
      "source ids",
      "checked date"
    ],
    "tempo_presets_bpm": [
      40,
      60,
      80
    ],
    "tempo_presets_status": "[推断] 编辑默认值；不代表考试要求或专业建议",
    "audio_render_contract": "Use matching selected-form selected-direction pitch events. Do not apply fingering to audio pitches or respell notes to physical-key labels. Keep display spelling separate from MIDI pitch."
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P197 | partial_content_ready_data_gaps | ['本调三种小调的严格音名、构成与上下行', '键位/MIDI/谱表事件数据（运算映射已标推断）', '已查实的指法行；未核实组合明确为 null', '独立英文说明和练习', '打印字段、来源、状态与待办'] | ['缺失手别/方向指法（见本页逐项 issues）', '扩大八度和连续往返连接指法审核', '实际谱表/音频/打印成品一致性验收'] |

### 待确认

- AN-U102-natural_minor-FINGER — data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U102-harmonic_minor-FINGER — data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U102-melodic_minor_classical-FINGER — data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U102-RANGE — data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U102-QA — data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

来源：AN-BMT-AS, AN-DENTON, AN-HA-GUIDE, AN-HMT-B, AN-OMT, AN-PS-HAR, AN-PS-MEL, AN-PS-NAT

## /scales/f-minor

[已核实] 目标关键词：`f minor scale piano`；模板 T12；基线优先级：后做。
状态：`content_and_note_data_ready_with_fingering_gaps`；发布状态：未验收。

任务：直接查看指定调性的音阶、键位、手别指法和示范。

### 页面需回答的问题

- What notes are in F natural minor?
- Which notes change in F harmonic and melodic minor?
- What is the descending classical melodic-minor sequence?
- Which fingers are supported for each hand and range?
- How do I match the keyboard, score and printed note names?

### 英文页面内容

**F Minor Scale on Piano: Natural, Harmonic & Melodic**

Find the notes of F minor, compare its three forms and descending patterns, and read source-checked piano fingerings.

#### Read the four-flat collection

F natural minor contains F, G, Ab, Bb, C, Db, and Eb. Its signature is shared with Ab major. The four flats are Bb, Eb, Ab, and Db. In all forms here, Ab and Bb remain in the lower part of the scale; the sixth and seventh degrees distinguish the versions.

[已核实] 来源：AN-HMT-F。 

#### E natural replaces E-flat

F harmonic minor changes Eb to E natural while keeping Db. Ascending classical melodic minor uses D natural and E natural. Descending melodic minor restores Eb and Db. Read those natural signs as changes to the key-signature pitches when you compare the written forms.

[已核实] 来源：AN-HMT-F。 

#### Watch the right-hand ending

The sourced one-octave natural and harmonic ascents use right-hand fingers 1-2-3-4-1-2-3-4. The thumb moves to C after finger 4 on Bb, and finger 4 ends on the upper F. Keep this row with its one-octave example; do not replace its ending with a memorized five-finger finish.

[已核实] 来源：AN-PS-NAT, AN-PS-HAR。 

#### Use a small comparison task

Start with F-G-Ab-Bb-C, then pause. Add Db-Eb-F, Db-E-F, and D-E-F in separate attempts. Before the melodic descent, name Eb and Db again. On a printed note list, underline Ab and Bb as the unchanged lower notes and mark the two upper degrees separately. Replay only the ending you misread, then return to the full octave.

[推断] 来源：AN-HMT-F。 

### 结构化数据

```json
{
  "tonic": "F",
  "default_form": "natural_minor",
  "key_signature": {
    "accidentals": [
      "Bb",
      "Eb",
      "Ab",
      "Db"
    ],
    "count": 4,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-F",
      "AN-PS-NAT"
    ]
  },
  "relative_major": {
    "name": "Ab major",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-F",
      "AN-PS-NAT"
    ]
  },
  "forms": [
    {
      "id": "natural_minor",
      "label": "Natural minor",
      "notes_ascending": [
        "F",
        "G",
        "Ab",
        "Bb",
        "C",
        "Db",
        "Eb",
        "F"
      ],
      "notes_descending": [
        "F",
        "Eb",
        "Db",
        "C",
        "Bb",
        "Ab",
        "G",
        "F"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-F",
        "AN-PS-NAT"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        2,
        2
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            4,
            1,
            2,
            3,
            4
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-NAT"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-F",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "Ab",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Db",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "Eb",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "Ab",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Db",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "Db",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "Ab",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "Db",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "Ab",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "harmonic_minor",
      "label": "Harmonic minor",
      "notes_ascending": [
        "F",
        "G",
        "Ab",
        "Bb",
        "C",
        "Db",
        "E",
        "F"
      ],
      "notes_descending": [
        "F",
        "E",
        "Db",
        "C",
        "Bb",
        "Ab",
        "G",
        "F"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-F",
        "AN-PS-HAR"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        3,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            4,
            1,
            2,
            3,
            4
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-HAR"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-F",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "Ab",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Db",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "Ab",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Db",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "Db",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "Ab",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "Db",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "Ab",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "melodic_minor_classical",
      "label": "Melodic minor (classical exercise)",
      "notes_ascending": [
        "F",
        "G",
        "Ab",
        "Bb",
        "C",
        "D",
        "E",
        "F"
      ],
      "notes_descending": [
        "F",
        "Eb",
        "Db",
        "C",
        "Bb",
        "Ab",
        "G",
        "F"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-F",
        "AN-DENTON"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        2,
        2,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": null,
          "left_hand": null
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [],
        "evidence_status": "待确认",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-F",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "Ab",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "Ab",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "Db",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "Ab",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "Db",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "Ab",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 3,
            "midi": 53,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          }
        ]
      }
    }
  ],
  "scope": {
    "minor_convention": "Classical scale exercise: melodic minor restores natural-minor sixth/seventh on descent. This is not a claim that compositions must always follow that direction rule.",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-OMT",
      "AN-HA-A"
    ],
    "audited_note_octaves": 1,
    "audited_finger_octaves": 1,
    "hands_together_fingering": null,
    "continuous_turnaround_fingering": null
  },
  "approved_playback_octaves": [
    1
  ],
  "print_and_audio": {
    "status": "implementation_pending",
    "source_asset_reuse": "external reference only; no source diagrams, recordings, scores or PDFs bundled or authorized for reuse",
    "print_fields": [
      "page title",
      "form",
      "direction",
      "hand",
      "exact note spellings",
      "key signature",
      "one-octave staff events",
      "non-null source-reviewed fingers only",
      "source ids",
      "checked date"
    ],
    "tempo_presets_bpm": [
      40,
      60,
      80
    ],
    "tempo_presets_status": "[推断] 编辑默认值；不代表考试要求或专业建议",
    "audio_render_contract": "Use matching selected-form selected-direction pitch events. Do not apply fingering to audio pitches or respell notes to physical-key labels. Keep display spelling separate from MIDI pitch."
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P198 | partial_content_ready_data_gaps | ['本调三种小调的严格音名、构成与上下行', '键位/MIDI/谱表事件数据（运算映射已标推断）', '已查实的指法行；未核实组合明确为 null', '独立英文说明和练习', '打印字段、来源、状态与待办'] | ['缺失手别/方向指法（见本页逐项 issues）', '扩大八度和连续往返连接指法审核', '实际谱表/音频/打印成品一致性验收'] |

### 待确认

- AN-U103-natural_minor-FINGER — data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U103-harmonic_minor-FINGER — data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U103-melodic_minor_classical-FINGER — data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U103-RANGE — data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U103-QA — data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

来源：AN-BMT-AS, AN-DENTON, AN-HA-GUIDE, AN-HMT-F, AN-OMT, AN-PS-HAR, AN-PS-MEL, AN-PS-NAT

## /scales/harmonic-major

[已核实] 目标关键词：`harmonic major scale`；模板 T13；基线优先级：后做。
状态：`content_and_pitch_data_prepared_with_open_issues`；发布状态：未验收。

任务：Identify harmonic major, compare it with major and harmonic minor, and read C/G examples.

### 页面需回答的问题

- What changes from the major scale?
- What are the notes in C and G harmonic major?
- Where is the augmented second?
- How is harmonic major different from harmonic minor?

### 英文页面内容

**Harmonic Major Scale on Piano**

Compare C and G harmonic major with their major scales, including the lowered sixth and augmented second.

#### Major with a lowered sixth

Harmonic major keeps the major third and major seventh of a major scale while lowering its sixth degree. Its formula is 1, 2, 3, 4, 5, flat 6, 7. C harmonic major therefore uses A-flat in place of the A-natural found in C major. The remaining C-major note names stay the same.

[已核实] 来源：AT-21, AT-22, AT-03。 

#### Read two concrete examples

C harmonic major contains C, D, E, F, G, A-flat and B. G harmonic major contains G, A, B, C, D, E-flat and F-sharp. The G example retains F-sharp: lowering the sixth changes E, not the seventh. Compare the major and harmonic-major rows before following the keyboard sequence.

[已核实] 来源：AT-21, AT-23, AT-29。 

#### Notice the larger step

The gap from the lowered sixth to the seventh spans three semitones: A-flat to B in C, or E-flat to F-sharp in G. With those letter spellings, the interval is an augmented second. Harmonic minor also contains this gap, but its third degree is minor; harmonic major retains the major third.

[推断] 来源：AT-21, AT-22。 

#### Compare one changed note

Read G major once, then G harmonic major. Isolate D, E-flat, F-sharp, G and check the written accidentals. Repeat the comparison on C using G, A-flat, B, C. Keep the spelling visible rather than renaming A-flat as G-sharp.

[推断] 来源：AT-21, AT-23, AT-29。 

### 结构化数据

```json
{
  "scope": "C and G harmonic major; compare with ordinary major",
  "examples": [
    {
      "id": "c-harmonic-major",
      "label": "C harmonic major",
      "root": "C",
      "pitch_names": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "Ab",
        "B"
      ],
      "degrees": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "b6",
        "7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-21",
        "AT-22",
        "AT-03"
      ],
      "cross_check": "Berklee original score checked visually; independent Hub Guitar degree formula; G also explicitly spelled by Robin Stone",
      "ascending_notes": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "Ab",
        "B",
        "C"
      ],
      "descending_notes": [
        "C",
        "B",
        "Ab",
        "G",
        "F",
        "E",
        "D",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          2,
          4,
          5,
          7,
          8,
          11,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Ab",
            "octave": 4,
            "letter": "A",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Ab",
            "octave": 4,
            "letter": "A",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "step_pattern_semitones": [
        2,
        2,
        1,
        2,
        1,
        3,
        1
      ],
      "comparison_major_notes": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "B"
      ],
      "changed_degree": "6 lowered by a semitone",
      "augmented_second": [
        "Ab",
        "B"
      ],
      "interval_evidence_status": "[推断]",
      "interval_basis": "Letter spelling and semitone distance from the directly verified notes; consistent with AT-21 interval annotations."
    },
    {
      "id": "g-harmonic-major",
      "label": "G harmonic major",
      "root": "G",
      "pitch_names": [
        "G",
        "A",
        "B",
        "C",
        "D",
        "Eb",
        "F#"
      ],
      "degrees": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "b6",
        "7"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-21",
        "AT-22",
        "AT-23",
        "AT-29"
      ],
      "cross_check": "Berklee original score checked visually; independent Hub Guitar degree formula; G also explicitly spelled by Robin Stone",
      "ascending_notes": [
        "G",
        "A",
        "B",
        "C",
        "D",
        "Eb",
        "F#",
        "G"
      ],
      "descending_notes": [
        "G",
        "F#",
        "Eb",
        "D",
        "C",
        "B",
        "A",
        "G"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          2,
          4,
          5,
          7,
          8,
          11,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 5,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "F#",
            "octave": 5,
            "letter": "F",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 5,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "G",
            "octave": 5,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F#",
            "octave": 5,
            "letter": "F",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "Eb",
            "octave": 5,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "step_pattern_semitones": [
        2,
        2,
        1,
        2,
        1,
        3,
        1
      ],
      "comparison_major_notes": [
        "G",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F#"
      ],
      "changed_degree": "6 lowered by a semitone",
      "augmented_second": [
        "Eb",
        "F#"
      ],
      "interval_evidence_status": "[推断]",
      "interval_basis": "Letter spelling and semitone distance from the directly verified notes; consistent with AT-21 interval annotations."
    }
  ],
  "related_urls": [
    "/scales",
    "/scales/c-major",
    "/scales/g-major",
    "/scales/c-minor"
  ],
  "content_role_note": "数据准备稿，不代表网页交互或打印资源已上线。实际谱表/键盘图须由这些具体音符数据渲染后验收。"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P199 | partial_pending_assets_and_applicable_fingering | 独立英文内容、具体对象音符与构成、键盘/谱表渲染数据、出处、编辑练习；见本页数据及各组专门结果。 | 实际图示/播放/打印成品验收；未核实的手别方向八度指法。 |

### 待确认

- AT-scales-harmonic-major-FINGERING — data.examples[*].fingering：缺少对应对象、手别、方向、八度范围的完整专业指法来源；不得由模式补写。；解决：逐个选择明确标注全部音符指法的正规教学资料，并经钢琴教师复核；已明确收录的例外见对象数据。
- AT-scales-harmonic-major-OUTPUT — rendered_staff_keyboard_audio_pdf：已提供音符与渲染数据；本轮未生成并视检实际谱表/键盘图、音频或打印PDF，不能声称这些功能已可用。；解决：实现时用本页数据渲染并逐音视检/试听；PDF生成检查成功后才显示下载入口。
- AT-scales-harmonic-major-PRACTICE — blocks.practice：练习是基于已核实音符的编辑提议，未通过专业教学效果或动作审核。；解决：钢琴教师核对适用水平和练习安排；不承诺学习效果。

来源：AT-21, AT-22, AT-23, AT-03, AT-29

## /scales/a-sharp-minor

[已核实] 目标关键词：`a# minor scale`；模板 T12；基线优先级：后做。
状态：`content_and_note_data_ready_with_fingering_gaps`；发布状态：未验收。

任务：直接查看指定调性的音阶、键位、手别指法和示范。

### 页面需回答的问题

- What notes are in A# natural minor?
- Which notes change in A# harmonic and melodic minor?
- What is the descending classical melodic-minor sequence?
- Which fingers are supported for each hand and range?
- How do I match the keyboard, score and printed note names?
- Why are B#, E#, F## and G## retained instead of respelling the key?

### 英文页面内容

**A# Minor Scale on Piano: Natural, Harmonic & Melodic**

Find the notes of A# minor, compare its three forms and descending patterns, and read source-checked piano fingerings.

#### Keep the A-sharp spelling

A# natural minor is A#, B#, C#, D#, E#, F#, and G#. Its signature has seven sharps, shared with C# major. B# and E# are intentional spellings. On a standard piano they use the physical C and F keys; a sharp in the written name does not guarantee a black key.

[已核实] 来源：AN-HMT-A-SHARP, AN-BMT-AS。 

#### The double-sharps have a purpose

A# harmonic minor raises G# to G##. Ascending classical melodic minor also raises F# to F##, giving A#-B#-C#-D#-E#-F##-G##-A#. Descending melodic minor returns through G# and F#. Keep the written G## and F## labels even though their piano keys sound as A and G in the keyboard mapping.

[已核实] 来源：AN-HMT-A-SHARP, AN-BMT-AS。 

#### Read before following the hand diagram

For the reviewed melodic-minor left-hand example, the one-octave ascent starts with finger 3 on A#. The natural-minor left-hand ascent starts with finger 2 instead. The separate melodic descent is also recorded from its own diagram. Select the form before following finger numbers; these rows are not interchangeable.

[已核实] 来源：AN-PFF-AS-LH-MEL, AN-PFF-AS-LH-NAT。 

#### A spelling-first practice task

Before playing, point to B#, E#, F##, and G## and name their physical keys. Then compare E#-F#-G##-A# with E#-F##-G##-A#. Return through A#-G#-F#-E# for the classical melodic descent. Write the note names once using double-sharp notation, then read your list without substituting a B-flat-minor spelling.

[推断] 来源：AN-HMT-A-SHARP。 

### 结构化数据

```json
{
  "tonic": "A#",
  "default_form": "natural_minor",
  "key_signature": {
    "accidentals": [
      "F#",
      "C#",
      "G#",
      "D#",
      "A#",
      "E#",
      "B#"
    ],
    "count": 7,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-A-SHARP",
      "AN-PS-NAT"
    ]
  },
  "relative_major": {
    "name": "C# major",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-A-SHARP",
      "AN-PS-NAT"
    ]
  },
  "forms": [
    {
      "id": "natural_minor",
      "label": "Natural minor",
      "notes_ascending": [
        "A#",
        "B#",
        "C#",
        "D#",
        "E#",
        "F#",
        "G#",
        "A#"
      ],
      "notes_descending": [
        "A#",
        "G#",
        "F#",
        "E#",
        "D#",
        "C#",
        "B#",
        "A#"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-A-SHARP",
        "AN-PS-NAT"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        2,
        2
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            2,
            1,
            2,
            3,
            1,
            2,
            3,
            4
          ],
          "left_hand": [
            2,
            1,
            3,
            2,
            1,
            4,
            3,
            2
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-NAT",
          "AN-PFF-AS-RH-NAT",
          "AN-PFF-AS-LH-NAT"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-A-SHARP",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "B#",
            "written_octave": 4,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D#",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 5,
            "midi": 80,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A#",
            "written_octave": 5,
            "midi": 82,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "A#",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "B#",
            "written_octave": 3,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D#",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "A#",
            "written_octave": 5,
            "midi": 82,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 5,
            "midi": 80,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "D#",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B#",
            "written_octave": 4,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "D#",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B#",
            "written_octave": 3,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          }
        ]
      }
    },
    {
      "id": "harmonic_minor",
      "label": "Harmonic minor",
      "notes_ascending": [
        "A#",
        "B#",
        "C#",
        "D#",
        "E#",
        "F#",
        "G##",
        "A#"
      ],
      "notes_descending": [
        "A#",
        "G##",
        "F#",
        "E#",
        "D#",
        "C#",
        "B#",
        "A#"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-A-SHARP",
        "AN-PS-HAR"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        3,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            2,
            1,
            2,
            3,
            1,
            2,
            3,
            4
          ],
          "left_hand": [
            2,
            1,
            3,
            2,
            1,
            4,
            3,
            2
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-HAR"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-A-SHARP",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "B#",
            "written_octave": 4,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D#",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G##",
            "written_octave": 5,
            "midi": 81,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 5,
            "midi": 82,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "A#",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "B#",
            "written_octave": 3,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D#",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G##",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "A#",
            "written_octave": 5,
            "midi": 82,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "G##",
            "written_octave": 5,
            "midi": 81,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "D#",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B#",
            "written_octave": 4,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "G##",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "D#",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B#",
            "written_octave": 3,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          }
        ]
      }
    },
    {
      "id": "melodic_minor_classical",
      "label": "Melodic minor (classical exercise)",
      "notes_ascending": [
        "A#",
        "B#",
        "C#",
        "D#",
        "E#",
        "F##",
        "G##",
        "A#"
      ],
      "notes_descending": [
        "A#",
        "G#",
        "F#",
        "E#",
        "D#",
        "C#",
        "B#",
        "A#"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-A-SHARP",
        "AN-BMT-AS"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        2,
        2,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": null,
          "left_hand": [
            3,
            2,
            1,
            4,
            3,
            2,
            1,
            3
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": [
            3,
            4,
            3,
            1,
            2,
            3,
            1,
            2
          ]
        },
        "source_ids": [
          "AN-PFF-AS-LH-MEL"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Both LH rows directly read from separate one-octave ascending and descending diagrams. RH remains null. Single original source; independent pedagogical review still pending."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-A-SHARP",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "B#",
            "written_octave": 4,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D#",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "F##",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "G##",
            "written_octave": 5,
            "midi": 81,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 5,
            "midi": 82,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "A#",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "B#",
            "written_octave": 3,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D#",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "F##",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "G##",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "A#",
            "written_octave": 5,
            "midi": 82,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 5,
            "midi": 80,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "D#",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B#",
            "written_octave": 4,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "A#",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "D#",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B#",
            "written_octave": 3,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "A#",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          }
        ]
      }
    }
  ],
  "scope": {
    "minor_convention": "Classical scale exercise: melodic minor restores natural-minor sixth/seventh on descent. This is not a claim that compositions must always follow that direction rule.",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-OMT",
      "AN-HA-A"
    ],
    "audited_note_octaves": 1,
    "audited_finger_octaves": 1,
    "hands_together_fingering": null,
    "continuous_turnaround_fingering": null
  },
  "approved_playback_octaves": [
    1
  ],
  "print_and_audio": {
    "status": "implementation_pending",
    "source_asset_reuse": "external reference only; no source diagrams, recordings, scores or PDFs bundled or authorized for reuse",
    "print_fields": [
      "page title",
      "form",
      "direction",
      "hand",
      "exact note spellings",
      "key signature",
      "one-octave staff events",
      "non-null source-reviewed fingers only",
      "source ids",
      "checked date"
    ],
    "tempo_presets_bpm": [
      40,
      60,
      80
    ],
    "tempo_presets_status": "[推断] 编辑默认值；不代表考试要求或专业建议",
    "audio_render_contract": "Use matching selected-form selected-direction pitch events. Do not apply fingering to audio pitches or respell notes to physical-key labels. Keep display spelling separate from MIDI pitch."
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P200 | partial_content_ready_data_gaps | ['本调三种小调的严格音名、构成与上下行', '键位/MIDI/谱表事件数据（运算映射已标推断）', '已查实的指法行；未核实组合明确为 null', '独立英文说明和练习', '打印字段、来源、状态与待办'] | ['缺失手别/方向指法（见本页逐项 issues）', '扩大八度和连续往返连接指法审核', '实际谱表/音频/打印成品一致性验收'] |

### 待确认

- AN-U105-natural_minor-FINGER — data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U105-harmonic_minor-FINGER — data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U105-melodic_minor_classical-FINGER — data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, descending.right_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U105-RANGE — data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U105-QA — data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

来源：AN-BMT-AS, AN-HA-GUIDE, AN-HMT-A-SHARP, AN-OMT, AN-PFF-AS-LH-MEL, AN-PFF-AS-LH-NAT, AN-PFF-AS-RH-NAT, AN-PS-HAR, AN-PS-MEL, AN-PS-NAT

## /scales/b-major

[已核实] 目标关键词：`b major scale piano`；模板 T12；基线优先级：后做。
状态：`content_data_ready_with_implementation_qa_pending`；发布状态：未验收。

任务：Learn B major’s five-sharp note set and its left-hand start on finger 4.

### 页面需回答的问题

- What are the notes and key signature of B major?
- Why does the left hand start B major with finger 4?
- Which fingers are used by each hand ascending and descending over one octave?
- What should I check during a short practice run?

### 英文页面内容

**B Major Piano Scale: Notes and Fingering**

See B major notes, key signature, keyboard pitches and separately verified one-octave fingering for each hand and direction.

#### B Major notes

B Major contains B, C#, D#, E, F#, G#, A#. Repeat B at the top to complete one octave. Its key signature has 5 sharps.

[已核实] 来源：AM-NOTES-B-MAJOR, AM-FINGER-LMT。 

#### Five sharps still leave E natural

B major uses five black keys, while B and E remain natural. The half-step pairs are D♯–E and A♯–B. Do not add an E-sharp just because this is a sharp key: E is the fourth degree in the verified note spelling.

[推断] 来源：AM-NOTES-B-MAJOR, AM-FINGER-LMT, AM-THEORY。 Explanatory relationships derived from independently checked note spelling and the verified major-scale interval rule.

#### One-octave fingering

This left-hand version begins B–C♯–D♯–E with 4–3–2–1. The thumb therefore reaches E before finger 4 crosses to F♯. The right hand begins with its thumb on B and uses 1–2–3–1–2–3–4–5. Each hand has its own starting finger.

[已核实] 来源：AM-FINGER-LMT, AM-FINGER-MF。 

#### A short practice check

Suggested drill: practice the left-hand opening four notes, then connect E to F♯ using 1–4. On the return, check F♯–E with 4–1. Complete one octave before increasing the range. Keep the B-major spelling in the staff and note labels even when comparing with an enharmonic scale.

[推断] 来源：AM-FINGER-LMT, AM-FINGER-MF, AM-NOTES-B-MAJOR, AM-FINGER-LMT。 Original suggested drill using only the source-verified notes and explicit fingering for this key. No effectiveness or fixed learning-time claim.

### 结构化数据

```json
{
  "tonic": "B",
  "scale_type": "major",
  "notes_ascending": [
    "B",
    "C#",
    "D#",
    "E",
    "F#",
    "G#",
    "A#",
    "B"
  ],
  "notes_descending": [
    "B",
    "A#",
    "G#",
    "F#",
    "E",
    "D#",
    "C#",
    "B"
  ],
  "note_spelling_status": "[已核实]",
  "note_source_ids": [
    "AM-NOTES-B-MAJOR",
    "AM-FINGER-LMT"
  ],
  "key_signature": {
    "fifths": 5,
    "ordered_accidentals": [
      "F#",
      "C#",
      "G#",
      "D#",
      "A#"
    ],
    "count": 5,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AM-NOTES-B-MAJOR",
      "AM-FINGER-LMT"
    ]
  },
  "intervals": {
    "ascending_semitones": [
      2,
      2,
      1,
      2,
      2,
      2,
      1
    ],
    "descending_semitones": [
      1,
      2,
      2,
      2,
      1,
      2,
      2
    ],
    "half_step_pairs": [
      [
        "D#",
        "E"
      ],
      [
        "A#",
        "B"
      ]
    ],
    "evidence_status": "[推断]",
    "basis": "Apply the verified major-scale interval rule to the independently checked note spelling. Descending order follows the same pitches from upper tonic to lower tonic.",
    "source_ids": [
      "AM-NOTES-B-MAJOR",
      "AM-FINGER-LMT",
      "AM-THEORY"
    ]
  },
  "display_register": {
    "RH": "tonic written in octave 4 to tonic written in octave 5",
    "LH": "tonic written in octave 3 to tonic written in octave 4",
    "evidence_status": "[推断]",
    "basis": "Editorial display choice; octave labels follow MusicXML C4=middle C; each accidental remains attached to its written octave. This register choice is not asserted to be a source-prescribed exercise range.",
    "source_ids": [
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "pitch_sequences": {
    "RH": {
      "ascending": [
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "C#5",
          "step": "C",
          "alter": 1,
          "octave": 5,
          "midi": 73,
          "scale_degree": 2,
          "key_color": "black"
        },
        {
          "note": "D#5",
          "step": "D",
          "alter": 1,
          "octave": 5,
          "midi": 75,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "E5",
          "step": "E",
          "alter": 0,
          "octave": 5,
          "midi": 76,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "F#5",
          "step": "F",
          "alter": 1,
          "octave": 5,
          "midi": 78,
          "scale_degree": 5,
          "key_color": "black"
        },
        {
          "note": "G#5",
          "step": "G",
          "alter": 1,
          "octave": 5,
          "midi": 80,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "A#5",
          "step": "A",
          "alter": 1,
          "octave": 5,
          "midi": 82,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "B5",
          "step": "B",
          "alter": 0,
          "octave": 5,
          "midi": 83,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "B5",
          "step": "B",
          "alter": 0,
          "octave": 5,
          "midi": 83,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "A#5",
          "step": "A",
          "alter": 1,
          "octave": 5,
          "midi": 82,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "G#5",
          "step": "G",
          "alter": 1,
          "octave": 5,
          "midi": 80,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "F#5",
          "step": "F",
          "alter": 1,
          "octave": 5,
          "midi": 78,
          "scale_degree": 5,
          "key_color": "black"
        },
        {
          "note": "E5",
          "step": "E",
          "alter": 0,
          "octave": 5,
          "midi": 76,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "D#5",
          "step": "D",
          "alter": 1,
          "octave": 5,
          "midi": 75,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "C#5",
          "step": "C",
          "alter": 1,
          "octave": 5,
          "midi": 73,
          "scale_degree": 2,
          "key_color": "black"
        },
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "LH": {
      "ascending": [
        {
          "note": "B3",
          "step": "B",
          "alter": 0,
          "octave": 3,
          "midi": 59,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "C#4",
          "step": "C",
          "alter": 1,
          "octave": 4,
          "midi": 61,
          "scale_degree": 2,
          "key_color": "black"
        },
        {
          "note": "D#4",
          "step": "D",
          "alter": 1,
          "octave": 4,
          "midi": 63,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "F#4",
          "step": "F",
          "alter": 1,
          "octave": 4,
          "midi": 66,
          "scale_degree": 5,
          "key_color": "black"
        },
        {
          "note": "G#4",
          "step": "G",
          "alter": 1,
          "octave": 4,
          "midi": 68,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "A#4",
          "step": "A",
          "alter": 1,
          "octave": 4,
          "midi": 70,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "B4",
          "step": "B",
          "alter": 0,
          "octave": 4,
          "midi": 71,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "A#4",
          "step": "A",
          "alter": 1,
          "octave": 4,
          "midi": 70,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "G#4",
          "step": "G",
          "alter": 1,
          "octave": 4,
          "midi": 68,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "F#4",
          "step": "F",
          "alter": 1,
          "octave": 4,
          "midi": 66,
          "scale_degree": 5,
          "key_color": "black"
        },
        {
          "note": "E4",
          "step": "E",
          "alter": 0,
          "octave": 4,
          "midi": 64,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "D#4",
          "step": "D",
          "alter": 1,
          "octave": 4,
          "midi": 63,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "C#4",
          "step": "C",
          "alter": 1,
          "octave": 4,
          "midi": 61,
          "scale_degree": 2,
          "key_color": "black"
        },
        {
          "note": "B3",
          "step": "B",
          "alter": 0,
          "octave": 3,
          "midi": 59,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "evidence_status": "[推断]",
    "basis": "MIDI = 12*(written_octave+1)+natural_letter_pitch_class+alter; computed from verified spelling. Cb4=59, equivalent to B3, not B4.",
    "source_ids": [
      "AM-NOTES-B-MAJOR",
      "AM-FINGER-LMT",
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "fingering": {
    "instrument": "piano",
    "motion": "similar motion or hands separately",
    "octaves": 1,
    "directions_in_performance_order": true,
    "RH": {
      "ascending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ],
      "descending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ]
    },
    "LH": {
      "ascending": [
        4,
        3,
        2,
        1,
        4,
        3,
        2,
        1
      ],
      "descending": [
        1,
        2,
        3,
        4,
        1,
        2,
        3,
        4
      ]
    },
    "evidence_status": "[已核实]",
    "verification": "explicit_two_independent_source_charts",
    "source_ids": [
      "AM-FINGER-LMT",
      "AM-FINGER-MF"
    ],
    "source_locator": "LearnMusicTheory PDF page 1 B major row; Music Fun PDF page 8 staff",
    "review_status": "source_verified; professional release review pending",
    "variant_note": "A source-documented single-octave choice, not a claim that no alternative fingering is valid. Do not extend to multiple octaves by repeating these rows.",
    "additional_octave_fingerings": null,
    "direction_evidence": "Both ascending and descending notes and finger numbers were read directly in each displayed source staff; descending arrays were not merely assumed from an ascending-only source.",
    "visual_evidence_refs": [
      "turn781025view0",
      "turn509801view2"
    ]
  },
  "renderer_payload": {
    "clefs": {
      "RH": "treble",
      "LH": "bass"
    },
    "key_fifths": 5,
    "mode": "major",
    "duration_beats_per_note": 1,
    "default_tempo_bpm": 60,
    "tempo_status": "editorial playback default; not a sourced examination speed or promised learning target",
    "ascending_then_descending_index_order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "source_of_truth": "pitch_sequences plus same-hand fingering rows; no automatic enharmonic respelling",
    "print_fields": [
      "title",
      "key_signature",
      "note_spelling",
      "selected_hand",
      "one_octave_range",
      "ascending_and_descending_staff_notes",
      "matching_fingering",
      "short_practice_tip",
      "source_ids"
    ],
    "status": "content_and_data_handoff; notation/audio/print implementations have not been built or tested"
  },
  "labels": {
    "hand": "Hand",
    "right_hand": "Right hand",
    "left_hand": "Left hand",
    "both_hands": "Both hands",
    "direction": "Direction",
    "ascending": "Ascending",
    "descending": "Descending",
    "up_and_down": "Up and down",
    "octaves": "1 octave",
    "play": "Play scale",
    "stop": "Stop",
    "print": "Print current scale"
  },
  "related_links": [
    {
      "url": "/scales",
      "label": "All piano scales",
      "activation": "only when target is live"
    }
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P201 | content_data_prepared; rendered delivery pending | ['independent English page content', 'notes and key signature cross-checked', 'spelled pitches with octave and MIDI mapping', 'source-specific one-octave RH/LH ascending and descending fingering', 'key-specific hand-crossing explanation', 'original short practice check', 'notation/audio/print common data payload'] | ['professional release review', 'visual keyboard and staff rendering plus playback/print consistency QA'] |

### 待确认

- AM-B-MAJOR-RENDER — notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-B-MAJOR-RANGE — fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

来源：AM-NOTES-B-MAJOR, AM-FINGER-LMT, AM-FINGER-MF, AM-THEORY, AM-MUSICXML, AM-MIDI, AM-BAYLOR

## /scales/b-flat-major

[已核实] 目标关键词：`b flat major scale piano`；模板 T12；基线优先级：后做。
状态：`content_data_ready_with_implementation_qa_pending`；发布状态：未验收。

任务：Start B-flat major on a black key and follow a documented one-octave turnaround in both hands.

### 页面需回答的问题

- What are the notes and key signature of B-flat major?
- Which fingers start and turn around in this one-octave B-flat-major version?
- Which fingers are used by each hand ascending and descending over one octave?
- What should I check during a short practice run?

### 英文页面内容

**B-Flat Major Piano Scale: Notes and Fingering**

See B-flat major notes, key signature, keyboard pitches and separately verified one-octave fingering for each hand and direction.

#### B-Flat Major notes

B-Flat Major contains Bb, C, D, Eb, F, G, A. Repeat Bb at the top to complete one octave. Its key signature has 2 flats.

[已核实] 来源：AM-NOTES-B-FLAT-MAJOR, AM-FINGER-LMT。 

#### Two flats, two early thumb landings

B-flat and E-flat are the altered notes in B-flat major. D–E♭ and A–B♭ are its half-step pairs. The tonic is the black key B♭; it must keep that spelling in the note list and staff rather than being silently renamed A-sharp.

[推断] 来源：AM-NOTES-B-FLAT-MAJOR, AM-FINGER-LMT, AM-THEORY。 Explanatory relationships derived from independently checked note spelling and the verified major-scale interval rule.

#### One-octave fingering

The source-selected right hand starts on B♭ with finger 2, places the thumb on C, and places it on F after E♭. It turns at the upper B♭ with finger 4. The left hand starts on finger 3 and turns at the upper B♭ with finger 2 in this documented single-octave version.

[已核实] 来源：AM-FINGER-LMT, AM-FINGER-MF。 

#### A short practice check

Suggested drill: play the right-hand pairs B♭–C and E♭–F with 2–1 and 3–1. Then rehearse the top A–B♭–A using 3–4–3 in the right hand and 1–2–1 in the left. Keep this selected fingering attached to its one-octave scope; do not extend it by simply repeating the row.

[推断] 来源：AM-FINGER-LMT, AM-FINGER-MF, AM-NOTES-B-FLAT-MAJOR, AM-FINGER-LMT。 Original suggested drill using only the source-verified notes and explicit fingering for this key. No effectiveness or fixed learning-time claim.

### 结构化数据

```json
{
  "tonic": "Bb",
  "scale_type": "major",
  "notes_ascending": [
    "Bb",
    "C",
    "D",
    "Eb",
    "F",
    "G",
    "A",
    "Bb"
  ],
  "notes_descending": [
    "Bb",
    "A",
    "G",
    "F",
    "Eb",
    "D",
    "C",
    "Bb"
  ],
  "note_spelling_status": "[已核实]",
  "note_source_ids": [
    "AM-NOTES-B-FLAT-MAJOR",
    "AM-FINGER-LMT"
  ],
  "key_signature": {
    "fifths": -2,
    "ordered_accidentals": [
      "Bb",
      "Eb"
    ],
    "count": 2,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AM-NOTES-B-FLAT-MAJOR",
      "AM-FINGER-LMT"
    ]
  },
  "intervals": {
    "ascending_semitones": [
      2,
      2,
      1,
      2,
      2,
      2,
      1
    ],
    "descending_semitones": [
      1,
      2,
      2,
      2,
      1,
      2,
      2
    ],
    "half_step_pairs": [
      [
        "D",
        "Eb"
      ],
      [
        "A",
        "Bb"
      ]
    ],
    "evidence_status": "[推断]",
    "basis": "Apply the verified major-scale interval rule to the independently checked note spelling. Descending order follows the same pitches from upper tonic to lower tonic.",
    "source_ids": [
      "AM-NOTES-B-FLAT-MAJOR",
      "AM-FINGER-LMT",
      "AM-THEORY"
    ]
  },
  "display_register": {
    "RH": "tonic written in octave 4 to tonic written in octave 5",
    "LH": "tonic written in octave 3 to tonic written in octave 4",
    "evidence_status": "[推断]",
    "basis": "Editorial display choice; octave labels follow MusicXML C4=middle C; each accidental remains attached to its written octave. This register choice is not asserted to be a source-prescribed exercise range.",
    "source_ids": [
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "pitch_sequences": {
    "RH": {
      "ascending": [
        {
          "note": "Bb4",
          "step": "B",
          "alter": -1,
          "octave": 4,
          "midi": 70,
          "scale_degree": 1,
          "key_color": "black"
        },
        {
          "note": "C5",
          "step": "C",
          "alter": 0,
          "octave": 5,
          "midi": 72,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "D5",
          "step": "D",
          "alter": 0,
          "octave": 5,
          "midi": 74,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "Eb5",
          "step": "E",
          "alter": -1,
          "octave": 5,
          "midi": 75,
          "scale_degree": 4,
          "key_color": "black"
        },
        {
          "note": "F5",
          "step": "F",
          "alter": 0,
          "octave": 5,
          "midi": 77,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "G5",
          "step": "G",
          "alter": 0,
          "octave": 5,
          "midi": 79,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "A5",
          "step": "A",
          "alter": 0,
          "octave": 5,
          "midi": 81,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "Bb5",
          "step": "B",
          "alter": -1,
          "octave": 5,
          "midi": 82,
          "scale_degree": 1,
          "key_color": "black"
        }
      ],
      "descending": [
        {
          "note": "Bb5",
          "step": "B",
          "alter": -1,
          "octave": 5,
          "midi": 82,
          "scale_degree": 1,
          "key_color": "black"
        },
        {
          "note": "A5",
          "step": "A",
          "alter": 0,
          "octave": 5,
          "midi": 81,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "G5",
          "step": "G",
          "alter": 0,
          "octave": 5,
          "midi": 79,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "F5",
          "step": "F",
          "alter": 0,
          "octave": 5,
          "midi": 77,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "Eb5",
          "step": "E",
          "alter": -1,
          "octave": 5,
          "midi": 75,
          "scale_degree": 4,
          "key_color": "black"
        },
        {
          "note": "D5",
          "step": "D",
          "alter": 0,
          "octave": 5,
          "midi": 74,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "C5",
          "step": "C",
          "alter": 0,
          "octave": 5,
          "midi": 72,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "Bb4",
          "step": "B",
          "alter": -1,
          "octave": 4,
          "midi": 70,
          "scale_degree": 1,
          "key_color": "black"
        }
      ]
    },
    "LH": {
      "ascending": [
        {
          "note": "Bb3",
          "step": "B",
          "alter": -1,
          "octave": 3,
          "midi": 58,
          "scale_degree": 1,
          "key_color": "black"
        },
        {
          "note": "C4",
          "step": "C",
          "alter": 0,
          "octave": 4,
          "midi": 60,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "Eb4",
          "step": "E",
          "alter": -1,
          "octave": 4,
          "midi": 63,
          "scale_degree": 4,
          "key_color": "black"
        },
        {
          "note": "F4",
          "step": "F",
          "alter": 0,
          "octave": 4,
          "midi": 65,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "Bb4",
          "step": "B",
          "alter": -1,
          "octave": 4,
          "midi": 70,
          "scale_degree": 1,
          "key_color": "black"
        }
      ],
      "descending": [
        {
          "note": "Bb4",
          "step": "B",
          "alter": -1,
          "octave": 4,
          "midi": 70,
          "scale_degree": 1,
          "key_color": "black"
        },
        {
          "note": "A4",
          "step": "A",
          "alter": 0,
          "octave": 4,
          "midi": 69,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "F4",
          "step": "F",
          "alter": 0,
          "octave": 4,
          "midi": 65,
          "scale_degree": 5,
          "key_color": "white"
        },
        {
          "note": "Eb4",
          "step": "E",
          "alter": -1,
          "octave": 4,
          "midi": 63,
          "scale_degree": 4,
          "key_color": "black"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "C4",
          "step": "C",
          "alter": 0,
          "octave": 4,
          "midi": 60,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "Bb3",
          "step": "B",
          "alter": -1,
          "octave": 3,
          "midi": 58,
          "scale_degree": 1,
          "key_color": "black"
        }
      ]
    },
    "evidence_status": "[推断]",
    "basis": "MIDI = 12*(written_octave+1)+natural_letter_pitch_class+alter; computed from verified spelling. Cb4=59, equivalent to B3, not B4.",
    "source_ids": [
      "AM-NOTES-B-FLAT-MAJOR",
      "AM-FINGER-LMT",
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "fingering": {
    "instrument": "piano",
    "motion": "similar motion or hands separately",
    "octaves": 1,
    "directions_in_performance_order": true,
    "RH": {
      "ascending": [
        2,
        1,
        2,
        3,
        1,
        2,
        3,
        4
      ],
      "descending": [
        4,
        3,
        2,
        1,
        3,
        2,
        1,
        2
      ]
    },
    "LH": {
      "ascending": [
        3,
        2,
        1,
        4,
        3,
        2,
        1,
        2
      ],
      "descending": [
        2,
        1,
        2,
        3,
        4,
        1,
        2,
        3
      ]
    },
    "evidence_status": "[已核实]",
    "verification": "explicit_two_independent_source_charts",
    "source_ids": [
      "AM-FINGER-LMT",
      "AM-FINGER-MF"
    ],
    "source_locator": "LearnMusicTheory PDF page 1 B-flat major row; Music Fun PDF page 11 staff",
    "review_status": "source_verified; professional release review pending",
    "variant_note": "A source-documented single-octave choice, not a claim that no alternative fingering is valid. Do not extend to multiple octaves by repeating these rows. Both checked PDFs choose LH finger 2 for the upper tonic turnaround. E-flat RH starts on 2 in these checked source examples. Preserve the source choice rather than silently normalizing it to another school.",
    "additional_octave_fingerings": null,
    "direction_evidence": "Both ascending and descending notes and finger numbers were read directly in each displayed source staff; descending arrays were not merely assumed from an ascending-only source.",
    "visual_evidence_refs": [
      "turn781025view0",
      "turn206026view2"
    ]
  },
  "renderer_payload": {
    "clefs": {
      "RH": "treble",
      "LH": "bass"
    },
    "key_fifths": -2,
    "mode": "major",
    "duration_beats_per_note": 1,
    "default_tempo_bpm": 60,
    "tempo_status": "editorial playback default; not a sourced examination speed or promised learning target",
    "ascending_then_descending_index_order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "source_of_truth": "pitch_sequences plus same-hand fingering rows; no automatic enharmonic respelling",
    "print_fields": [
      "title",
      "key_signature",
      "note_spelling",
      "selected_hand",
      "one_octave_range",
      "ascending_and_descending_staff_notes",
      "matching_fingering",
      "short_practice_tip",
      "source_ids"
    ],
    "status": "content_and_data_handoff; notation/audio/print implementations have not been built or tested"
  },
  "labels": {
    "hand": "Hand",
    "right_hand": "Right hand",
    "left_hand": "Left hand",
    "both_hands": "Both hands",
    "direction": "Direction",
    "ascending": "Ascending",
    "descending": "Descending",
    "up_and_down": "Up and down",
    "octaves": "1 octave",
    "play": "Play scale",
    "stop": "Stop",
    "print": "Print current scale"
  },
  "related_links": [
    {
      "url": "/scales",
      "label": "All piano scales",
      "activation": "only when target is live"
    }
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P202 | content_data_prepared; rendered delivery pending | ['independent English page content', 'notes and key signature cross-checked', 'spelled pitches with octave and MIDI mapping', 'source-specific one-octave RH/LH ascending and descending fingering', 'key-specific hand-crossing explanation', 'original short practice check', 'notation/audio/print common data payload'] | ['professional release review', 'visual keyboard and staff rendering plus playback/print consistency QA'] |

### 待确认

- AM-B-FLAT-MAJOR-RENDER — notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-B-FLAT-MAJOR-RANGE — fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

来源：AM-NOTES-B-FLAT-MAJOR, AM-FINGER-LMT, AM-FINGER-MF, AM-THEORY, AM-MUSICXML, AM-MIDI

## /scales/g-minor

[已核实] 目标关键词：`g minor scale piano`；模板 T12；基线优先级：后做。
状态：`content_and_note_data_ready_with_fingering_gaps`；发布状态：未验收。

任务：直接查看指定调性的音阶、键位、手别指法和示范。

### 页面需回答的问题

- What notes are in G natural minor?
- Which notes change in G harmonic and melodic minor?
- What is the descending classical melodic-minor sequence?
- Which fingers are supported for each hand and range?
- How do I match the keyboard, score and printed note names?

### 英文页面内容

**G Minor Scale on Piano: Natural, Harmonic & Melodic**

Find the notes of G minor, compare its three forms and descending patterns, and read source-checked piano fingerings.

#### Use B-flat and E-flat as the baseline

G natural minor contains G, A, Bb, C, D, Eb, and F. Its signature has Bb and Eb, shared with Bb major. Bb remains the third degree in all three minor forms here. Keep that note in place while comparing the changes nearer the upper G.

[已核实] 来源：AN-HMT-G。 

#### F-sharp belongs to the harmonic form

G harmonic minor changes F to F# and keeps Eb. Ascending classical melodic minor also raises Eb to E natural, while melodic descent returns through F and Eb. The coexistence of Bb and F# is intentional. Each spelling shows its own degree in the G-minor scale.

[已核实] 来源：AN-HMT-G。 

#### Practice an ending without changing the opening

First locate G-A-Bb-C-D. Add Eb-F-G for natural minor, Eb-F#-G for harmonic minor, or E-F#-G for melodic ascent. Stop after each ending and identify it. For a return-trip check, choose a form before starting at the upper G, then read the descending sequence rather than relying on the ascent you just played.

[推断] 来源：AN-HMT-G。 

#### Rehearse the crossing in context

The sourced one-octave natural and harmonic ascents use right-hand finger 3 on Bb followed by the thumb on C. In the left-hand row, the thumb reaches D before finger 3 continues to Eb. Practice these connections separately, keeping the hand and selected form labels attached to your notes.

[已核实] 来源：AN-PS-NAT, AN-PS-HAR。 

### 结构化数据

```json
{
  "tonic": "G",
  "default_form": "natural_minor",
  "key_signature": {
    "accidentals": [
      "Bb",
      "Eb"
    ],
    "count": 2,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-G",
      "AN-PS-NAT"
    ]
  },
  "relative_major": {
    "name": "Bb major",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-G",
      "AN-PS-NAT"
    ]
  },
  "forms": [
    {
      "id": "natural_minor",
      "label": "Natural minor",
      "notes_ascending": [
        "G",
        "A",
        "Bb",
        "C",
        "D",
        "Eb",
        "F",
        "G"
      ],
      "notes_descending": [
        "G",
        "F",
        "Eb",
        "D",
        "C",
        "Bb",
        "A",
        "G"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-G",
        "AN-PS-NAT"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        2,
        2
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-NAT"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-G",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "harmonic_minor",
      "label": "Harmonic minor",
      "notes_ascending": [
        "G",
        "A",
        "Bb",
        "C",
        "D",
        "Eb",
        "F#",
        "G"
      ],
      "notes_descending": [
        "G",
        "F#",
        "Eb",
        "D",
        "C",
        "Bb",
        "A",
        "G"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-G",
        "AN-PS-HAR"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        3,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            5
          ],
          "left_hand": [
            5,
            4,
            3,
            2,
            1,
            3,
            2,
            1
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-HAR"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-G",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "Eb",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          }
        ]
      }
    },
    {
      "id": "melodic_minor_classical",
      "label": "Melodic minor (classical exercise)",
      "notes_ascending": [
        "G",
        "A",
        "Bb",
        "C",
        "D",
        "E",
        "F#",
        "G"
      ],
      "notes_descending": [
        "G",
        "F",
        "Eb",
        "D",
        "C",
        "Bb",
        "A",
        "G"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-G",
        "AN-DENTON"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        2,
        2,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": null,
          "left_hand": null
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [],
        "evidence_status": "待确认",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-G",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "G",
            "written_octave": 5,
            "midi": 79,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 5,
            "midi": 72,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 4,
            "midi": 70,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "G",
            "written_octave": 4,
            "midi": 67,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          },
          {
            "spelling": "F",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "Eb",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C",
            "written_octave": 4,
            "midi": 60,
            "pitch_class": 0,
            "physical_key_name": "C",
            "key_color": "white"
          },
          {
            "spelling": "Bb",
            "written_octave": 3,
            "midi": 58,
            "pitch_class": 10,
            "physical_key_name": "A#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G",
            "written_octave": 3,
            "midi": 55,
            "pitch_class": 7,
            "physical_key_name": "G",
            "key_color": "white"
          }
        ]
      }
    }
  ],
  "scope": {
    "minor_convention": "Classical scale exercise: melodic minor restores natural-minor sixth/seventh on descent. This is not a claim that compositions must always follow that direction rule.",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-OMT",
      "AN-HA-A"
    ],
    "audited_note_octaves": 1,
    "audited_finger_octaves": 1,
    "hands_together_fingering": null,
    "continuous_turnaround_fingering": null
  },
  "approved_playback_octaves": [
    1
  ],
  "print_and_audio": {
    "status": "implementation_pending",
    "source_asset_reuse": "external reference only; no source diagrams, recordings, scores or PDFs bundled or authorized for reuse",
    "print_fields": [
      "page title",
      "form",
      "direction",
      "hand",
      "exact note spellings",
      "key signature",
      "one-octave staff events",
      "non-null source-reviewed fingers only",
      "source ids",
      "checked date"
    ],
    "tempo_presets_bpm": [
      40,
      60,
      80
    ],
    "tempo_presets_status": "[推断] 编辑默认值；不代表考试要求或专业建议",
    "audio_render_contract": "Use matching selected-form selected-direction pitch events. Do not apply fingering to audio pitches or respell notes to physical-key labels. Keep display spelling separate from MIDI pitch."
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P203 | partial_content_ready_data_gaps | ['本调三种小调的严格音名、构成与上下行', '键位/MIDI/谱表事件数据（运算映射已标推断）', '已查实的指法行；未核实组合明确为 null', '独立英文说明和练习', '打印字段、来源、状态与待办'] | ['缺失手别/方向指法（见本页逐项 issues）', '扩大八度和连续往返连接指法审核', '实际谱表/音频/打印成品一致性验收'] |

### 待确认

- AN-U108-natural_minor-FINGER — data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U108-harmonic_minor-FINGER — data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U108-melodic_minor_classical-FINGER — data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U108-RANGE — data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U108-QA — data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

来源：AN-BMT-AS, AN-DENTON, AN-HA-GUIDE, AN-HMT-G, AN-OMT, AN-PS-HAR, AN-PS-MEL, AN-PS-NAT

## /scales/chromatic

[已核实] 目标关键词：`chromatic scale piano`；模板 T13；基线优先级：后做。
状态：`content_and_pitch_data_prepared_with_open_issues`；发布状态：未验收。

任务：Find every successive piano key in a chromatic octave and distinguish pitches from their written spellings.

### 页面需回答的问题

- How many different pitches are in a chromatic octave?
- Which white keys are already a half step apart?
- Must ascending notes use sharps and descending notes use flats?
- Does starting on G change the interval pattern?

### 英文页面内容

**Chromatic Scale on Piano**

Read one-octave chromatic scales from C and G, including white-key half steps and alternative note spellings.

#### Every adjacent key

A chromatic scale moves through successive half steps. One octave contains twelve different pitch classes; the written exercise repeats the starting pitch at the top. On the keyboard, include both black and white keys. E to F and B to C are already half steps, so no black key is needed between either pair.

[已核实] 来源：AT-01, AT-24。 

#### Start with the C example

The C example ascends through C, C-sharp, D, D-sharp, E, F, F-sharp, G, G-sharp, A, A-sharp, B and the next C. Check the two adjacent white-key pairs as you read. Every movement is the same size even when the pattern of black and white keys changes.

[已核实] 来源：AT-24, AT-01。 

#### Different names can identify one key

Ascending sharp spellings and descending flat spellings are common, but they are not a universal rule. The displayed G example uses F for the key that the source names E-sharp. That is an editorial spelling choice; it does not change which key sounds. The descending examples use flats where appropriate for this reference.

[推断] 来源：AT-01, AT-25。 

#### Check the route in both directions

Read the C example upward, then return through every adjacent key. Next begin on G and compare the interval pattern. Keep the starting and ending notes visible. Use the written note names to check the route; finger numbers remain separate from note identification.

[推断] 来源：AT-24, AT-25。 

### 结构化数据

```json
{
  "scope": "one-octave C and G chromatic reference sequences",
  "examples": [
    {
      "id": "c-chromatic",
      "label": "C chromatic",
      "root": "C",
      "pitch_names": [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B"
      ],
      "degrees": null,
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-24",
        "AT-01"
      ],
      "cross_check": "Berklee pitch collection plus Open Music Theory adjacent-half-step definition and spelling guidance",
      "ascending_notes": [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B",
        "C"
      ],
      "descending_notes": [
        "C",
        "B",
        "Bb",
        "A",
        "Ab",
        "G",
        "Gb",
        "F",
        "E",
        "Eb",
        "D",
        "Db",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C#",
            "octave": 4,
            "letter": "C",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D#",
            "octave": 4,
            "letter": "D",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F#",
            "octave": 4,
            "letter": "F",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G#",
            "octave": 4,
            "letter": "G",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A#",
            "octave": 4,
            "letter": "A",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Ab",
            "octave": 4,
            "letter": "A",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Gb",
            "octave": 4,
            "letter": "G",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "F",
            "octave": 4,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 4,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "D",
            "octave": 4,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Db",
            "octave": 4,
            "letter": "D",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "step_pattern_semitones": [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "spelling_note": "Ascending sharp spelling directly matches source.",
      "descending_evidence_status": "[推断]",
      "descending_basis": "Editorial flat spelling of the reverse chromatic pitch sequence, following AT-01 common convention; not claimed to be the sole correct spelling."
    },
    {
      "id": "g-chromatic",
      "label": "G chromatic",
      "root": "G",
      "pitch_names": [
        "G",
        "G#",
        "A",
        "A#",
        "B",
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#"
      ],
      "degrees": null,
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-25",
        "AT-01"
      ],
      "cross_check": "Berklee pitch collection plus Open Music Theory adjacent-half-step definition and spelling guidance",
      "ascending_notes": [
        "G",
        "G#",
        "A",
        "A#",
        "B",
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G"
      ],
      "descending_notes": [
        "G",
        "Gb",
        "F",
        "E",
        "Eb",
        "D",
        "Db",
        "C",
        "B",
        "Bb",
        "A",
        "Ab",
        "G"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G#",
            "octave": 4,
            "letter": "G",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "A#",
            "octave": 4,
            "letter": "A",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C#",
            "octave": 5,
            "letter": "C",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "D#",
            "octave": 5,
            "letter": "D",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "E",
            "octave": 5,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F",
            "octave": 5,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "F#",
            "octave": 5,
            "letter": "F",
            "accidental": "#",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 5,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "G",
            "octave": 5,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Gb",
            "octave": 5,
            "letter": "G",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "F",
            "octave": 5,
            "letter": "F",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 5,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Eb",
            "octave": 5,
            "letter": "E",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "D",
            "octave": 5,
            "letter": "D",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Db",
            "octave": 5,
            "letter": "D",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "B",
            "octave": 4,
            "letter": "B",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Bb",
            "octave": 4,
            "letter": "B",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "A",
            "octave": 4,
            "letter": "A",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "Ab",
            "octave": 4,
            "letter": "A",
            "accidental": "b",
            "key_color": "black"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": null,
        "left_hand": null,
        "status": "待确认"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "step_pattern_semitones": [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "spelling_note": "Editorial display uses F rather than source E# for the same piano key.",
      "descending_evidence_status": "[推断]",
      "descending_basis": "Editorial flat spelling of the reverse chromatic pitch sequence, following AT-01 common convention; not claimed to be the sole correct spelling."
    }
  ],
  "related_urls": [
    "/scales"
  ],
  "content_role_note": "数据准备稿，不代表网页交互或打印资源已上线。实际谱表/键盘图须由这些具体音符数据渲染后验收。"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P205 | partial_pending_assets_and_applicable_fingering | 独立英文内容、具体对象音符与构成、键盘/谱表渲染数据、出处、编辑练习；见本页数据及各组专门结果。 | 实际图示/播放/打印成品验收；未核实的手别方向八度指法。 |

### 待确认

- AT-scales-chromatic-FINGERING — data.examples[*].fingering：缺少对应对象、手别、方向、八度范围的完整专业指法来源；不得由模式补写。；解决：逐个选择明确标注全部音符指法的正规教学资料，并经钢琴教师复核；已明确收录的例外见对象数据。
- AT-scales-chromatic-OUTPUT — rendered_staff_keyboard_audio_pdf：已提供音符与渲染数据；本轮未生成并视检实际谱表/键盘图、音频或打印PDF，不能声称这些功能已可用。；解决：实现时用本页数据渲染并逐音视检/试听；PDF生成检查成功后才显示下载入口。
- AT-scales-chromatic-PRACTICE — blocks.practice：练习是基于已核实音符的编辑提议，未通过专业教学效果或动作审核。；解决：钢琴教师核对适用水平和练习安排；不承诺学习效果。

来源：AT-01, AT-24, AT-25

## /scales/e-flat-major

[已核实] 目标关键词：`e flat major scale piano`；模板 T12；基线优先级：后做。
状态：`content_data_ready_with_implementation_qa_pending`；发布状态：未验收。

任务：Play E-flat major through its adjacent A-flat and B-flat notes and the following thumb crossing to C.

### 页面需回答的问题

- What are the notes and key signature of E-flat major?
- How do the right-hand fingers move from A-flat and B-flat to C?
- Which fingers are used by each hand ascending and descending over one octave?
- What should I check during a short practice run?

### 英文页面内容

**E-Flat Major Piano Scale: Notes and Fingering**

See E-flat major notes, key signature, keyboard pitches and separately verified one-octave fingering for each hand and direction.

#### E-Flat Major notes

E-Flat Major contains Eb, F, G, Ab, Bb, C, D. Repeat Eb at the top to complete one octave. Its key signature has 3 flats.

[已核实] 来源：AM-NOTES-E-FLAT-MAJOR, AM-FINGER-LMT。 

#### Keep the A-flat–B-flat pair together

E-flat major contains E♭, A♭, and B♭, with G–A♭ and D–E♭ as the half-step pairs. A♭ and B♭ are consecutive scale notes, but the distance between them is a whole step. The key signature lists the flats in the order B♭, E♭, A♭.

[推断] 来源：AM-NOTES-E-FLAT-MAJOR, AM-FINGER-LMT, AM-THEORY。 Explanatory relationships derived from independently checked note spelling and the verified major-scale interval rule.

#### One-octave fingering

This one-octave source version starts the right hand with finger 2 on E♭. It assigns 3–4–1 to A♭–B♭–C and finishes on finger 3. The left hand starts E♭ with finger 3, crosses from G with the thumb to A♭ with finger 4, and turns at upper E♭ with finger 2.

[已核实] 来源：AM-FINGER-LMT, AM-FINGER-MF。 

#### A short practice check

Suggested drill: play G–A♭–B♭–C in the right hand with 2–3–4–1, then return with 1–4–3–2. Follow this with a left-hand G–A♭ connection. Once those changes are clear, combine each fragment into a complete one-octave run while retaining the flat spellings.

[推断] 来源：AM-FINGER-LMT, AM-FINGER-MF, AM-NOTES-E-FLAT-MAJOR, AM-FINGER-LMT。 Original suggested drill using only the source-verified notes and explicit fingering for this key. No effectiveness or fixed learning-time claim.

### 结构化数据

```json
{
  "tonic": "Eb",
  "scale_type": "major",
  "notes_ascending": [
    "Eb",
    "F",
    "G",
    "Ab",
    "Bb",
    "C",
    "D",
    "Eb"
  ],
  "notes_descending": [
    "Eb",
    "D",
    "C",
    "Bb",
    "Ab",
    "G",
    "F",
    "Eb"
  ],
  "note_spelling_status": "[已核实]",
  "note_source_ids": [
    "AM-NOTES-E-FLAT-MAJOR",
    "AM-FINGER-LMT"
  ],
  "key_signature": {
    "fifths": -3,
    "ordered_accidentals": [
      "Bb",
      "Eb",
      "Ab"
    ],
    "count": 3,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AM-NOTES-E-FLAT-MAJOR",
      "AM-FINGER-LMT"
    ]
  },
  "intervals": {
    "ascending_semitones": [
      2,
      2,
      1,
      2,
      2,
      2,
      1
    ],
    "descending_semitones": [
      1,
      2,
      2,
      2,
      1,
      2,
      2
    ],
    "half_step_pairs": [
      [
        "G",
        "Ab"
      ],
      [
        "D",
        "Eb"
      ]
    ],
    "evidence_status": "[推断]",
    "basis": "Apply the verified major-scale interval rule to the independently checked note spelling. Descending order follows the same pitches from upper tonic to lower tonic.",
    "source_ids": [
      "AM-NOTES-E-FLAT-MAJOR",
      "AM-FINGER-LMT",
      "AM-THEORY"
    ]
  },
  "display_register": {
    "RH": "tonic written in octave 4 to tonic written in octave 5",
    "LH": "tonic written in octave 3 to tonic written in octave 4",
    "evidence_status": "[推断]",
    "basis": "Editorial display choice; octave labels follow MusicXML C4=middle C; each accidental remains attached to its written octave. This register choice is not asserted to be a source-prescribed exercise range.",
    "source_ids": [
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "pitch_sequences": {
    "RH": {
      "ascending": [
        {
          "note": "Eb4",
          "step": "E",
          "alter": -1,
          "octave": 4,
          "midi": 63,
          "scale_degree": 1,
          "key_color": "black"
        },
        {
          "note": "F4",
          "step": "F",
          "alter": 0,
          "octave": 4,
          "midi": 65,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "Ab4",
          "step": "A",
          "alter": -1,
          "octave": 4,
          "midi": 68,
          "scale_degree": 4,
          "key_color": "black"
        },
        {
          "note": "Bb4",
          "step": "B",
          "alter": -1,
          "octave": 4,
          "midi": 70,
          "scale_degree": 5,
          "key_color": "black"
        },
        {
          "note": "C5",
          "step": "C",
          "alter": 0,
          "octave": 5,
          "midi": 72,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "D5",
          "step": "D",
          "alter": 0,
          "octave": 5,
          "midi": 74,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "Eb5",
          "step": "E",
          "alter": -1,
          "octave": 5,
          "midi": 75,
          "scale_degree": 1,
          "key_color": "black"
        }
      ],
      "descending": [
        {
          "note": "Eb5",
          "step": "E",
          "alter": -1,
          "octave": 5,
          "midi": 75,
          "scale_degree": 1,
          "key_color": "black"
        },
        {
          "note": "D5",
          "step": "D",
          "alter": 0,
          "octave": 5,
          "midi": 74,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "C5",
          "step": "C",
          "alter": 0,
          "octave": 5,
          "midi": 72,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "Bb4",
          "step": "B",
          "alter": -1,
          "octave": 4,
          "midi": 70,
          "scale_degree": 5,
          "key_color": "black"
        },
        {
          "note": "Ab4",
          "step": "A",
          "alter": -1,
          "octave": 4,
          "midi": 68,
          "scale_degree": 4,
          "key_color": "black"
        },
        {
          "note": "G4",
          "step": "G",
          "alter": 0,
          "octave": 4,
          "midi": 67,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "F4",
          "step": "F",
          "alter": 0,
          "octave": 4,
          "midi": 65,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "Eb4",
          "step": "E",
          "alter": -1,
          "octave": 4,
          "midi": 63,
          "scale_degree": 1,
          "key_color": "black"
        }
      ]
    },
    "LH": {
      "ascending": [
        {
          "note": "Eb3",
          "step": "E",
          "alter": -1,
          "octave": 3,
          "midi": 51,
          "scale_degree": 1,
          "key_color": "black"
        },
        {
          "note": "F3",
          "step": "F",
          "alter": 0,
          "octave": 3,
          "midi": 53,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "G3",
          "step": "G",
          "alter": 0,
          "octave": 3,
          "midi": 55,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "Ab3",
          "step": "A",
          "alter": -1,
          "octave": 3,
          "midi": 56,
          "scale_degree": 4,
          "key_color": "black"
        },
        {
          "note": "Bb3",
          "step": "B",
          "alter": -1,
          "octave": 3,
          "midi": 58,
          "scale_degree": 5,
          "key_color": "black"
        },
        {
          "note": "C4",
          "step": "C",
          "alter": 0,
          "octave": 4,
          "midi": 60,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "Eb4",
          "step": "E",
          "alter": -1,
          "octave": 4,
          "midi": 63,
          "scale_degree": 1,
          "key_color": "black"
        }
      ],
      "descending": [
        {
          "note": "Eb4",
          "step": "E",
          "alter": -1,
          "octave": 4,
          "midi": 63,
          "scale_degree": 1,
          "key_color": "black"
        },
        {
          "note": "D4",
          "step": "D",
          "alter": 0,
          "octave": 4,
          "midi": 62,
          "scale_degree": 7,
          "key_color": "white"
        },
        {
          "note": "C4",
          "step": "C",
          "alter": 0,
          "octave": 4,
          "midi": 60,
          "scale_degree": 6,
          "key_color": "white"
        },
        {
          "note": "Bb3",
          "step": "B",
          "alter": -1,
          "octave": 3,
          "midi": 58,
          "scale_degree": 5,
          "key_color": "black"
        },
        {
          "note": "Ab3",
          "step": "A",
          "alter": -1,
          "octave": 3,
          "midi": 56,
          "scale_degree": 4,
          "key_color": "black"
        },
        {
          "note": "G3",
          "step": "G",
          "alter": 0,
          "octave": 3,
          "midi": 55,
          "scale_degree": 3,
          "key_color": "white"
        },
        {
          "note": "F3",
          "step": "F",
          "alter": 0,
          "octave": 3,
          "midi": 53,
          "scale_degree": 2,
          "key_color": "white"
        },
        {
          "note": "Eb3",
          "step": "E",
          "alter": -1,
          "octave": 3,
          "midi": 51,
          "scale_degree": 1,
          "key_color": "black"
        }
      ]
    },
    "evidence_status": "[推断]",
    "basis": "MIDI = 12*(written_octave+1)+natural_letter_pitch_class+alter; computed from verified spelling. Cb4=59, equivalent to B3, not B4.",
    "source_ids": [
      "AM-NOTES-E-FLAT-MAJOR",
      "AM-FINGER-LMT",
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "fingering": {
    "instrument": "piano",
    "motion": "similar motion or hands separately",
    "octaves": 1,
    "directions_in_performance_order": true,
    "RH": {
      "ascending": [
        2,
        1,
        2,
        3,
        4,
        1,
        2,
        3
      ],
      "descending": [
        3,
        2,
        1,
        4,
        3,
        2,
        1,
        2
      ]
    },
    "LH": {
      "ascending": [
        3,
        2,
        1,
        4,
        3,
        2,
        1,
        2
      ],
      "descending": [
        2,
        1,
        2,
        3,
        4,
        1,
        2,
        3
      ]
    },
    "evidence_status": "[已核实]",
    "verification": "explicit_two_independent_source_charts",
    "source_ids": [
      "AM-FINGER-LMT",
      "AM-FINGER-MF"
    ],
    "source_locator": "LearnMusicTheory PDF page 1 E-flat major row; Music Fun PDF page 12 staff",
    "review_status": "source_verified; professional release review pending",
    "variant_note": "A source-documented single-octave choice, not a claim that no alternative fingering is valid. Do not extend to multiple octaves by repeating these rows. Both checked PDFs choose LH finger 2 for the upper tonic turnaround. E-flat RH starts on 2 in these checked source examples. Preserve the source choice rather than silently normalizing it to another school.",
    "additional_octave_fingerings": null,
    "direction_evidence": "Both ascending and descending notes and finger numbers were read directly in each displayed source staff; descending arrays were not merely assumed from an ascending-only source.",
    "visual_evidence_refs": [
      "turn781025view0",
      "turn509801view1"
    ]
  },
  "renderer_payload": {
    "clefs": {
      "RH": "treble",
      "LH": "bass"
    },
    "key_fifths": -3,
    "mode": "major",
    "duration_beats_per_note": 1,
    "default_tempo_bpm": 60,
    "tempo_status": "editorial playback default; not a sourced examination speed or promised learning target",
    "ascending_then_descending_index_order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "source_of_truth": "pitch_sequences plus same-hand fingering rows; no automatic enharmonic respelling",
    "print_fields": [
      "title",
      "key_signature",
      "note_spelling",
      "selected_hand",
      "one_octave_range",
      "ascending_and_descending_staff_notes",
      "matching_fingering",
      "short_practice_tip",
      "source_ids"
    ],
    "status": "content_and_data_handoff; notation/audio/print implementations have not been built or tested"
  },
  "labels": {
    "hand": "Hand",
    "right_hand": "Right hand",
    "left_hand": "Left hand",
    "both_hands": "Both hands",
    "direction": "Direction",
    "ascending": "Ascending",
    "descending": "Descending",
    "up_and_down": "Up and down",
    "octaves": "1 octave",
    "play": "Play scale",
    "stop": "Stop",
    "print": "Print current scale"
  },
  "related_links": [
    {
      "url": "/scales",
      "label": "All piano scales",
      "activation": "only when target is live"
    }
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P206 | content_data_prepared; rendered delivery pending | ['independent English page content', 'notes and key signature cross-checked', 'spelled pitches with octave and MIDI mapping', 'source-specific one-octave RH/LH ascending and descending fingering', 'key-specific hand-crossing explanation', 'original short practice check', 'notation/audio/print common data payload'] | ['professional release review', 'visual keyboard and staff rendering plus playback/print consistency QA'] |

### 待确认

- AM-E-FLAT-MAJOR-RENDER — notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-E-FLAT-MAJOR-RANGE — fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

来源：AM-NOTES-E-FLAT-MAJOR, AM-FINGER-LMT, AM-FINGER-MF, AM-THEORY, AM-MUSICXML, AM-MIDI

## /scales/f-sharp-minor

[已核实] 目标关键词：`f#m piano scale`；模板 T12；基线优先级：后做。
状态：`content_and_note_data_ready_with_fingering_gaps`；发布状态：未验收。

任务：直接查看指定调性的音阶、键位、手别指法和示范。

### 页面需回答的问题

- What notes are in F# natural minor?
- Which notes change in F# harmonic and melodic minor?
- What is the descending classical melodic-minor sequence?
- Which fingers are supported for each hand and range?
- How do I match the keyboard, score and printed note names?
- Why does E# use the physical F key?

### 英文页面内容

**F# Minor Scale on Piano: Natural, Harmonic & Melodic**

Find the notes of F# minor, compare its three forms and descending patterns, and read source-checked piano fingerings.

#### Start with three sharps

F# natural minor is F#, G#, A, B, C#, D, and E. Its signature is shared with A major. F#, C#, and G# remain in the signature for each form. A stays natural throughout these minor versions, while the upper D and E are the changing degrees.

[已核实] 来源：AN-HMT-F-SHARP。 

#### Write E-sharp, even on a white key

F# harmonic minor uses E# instead of E. Ascending classical melodic minor uses D# and E#. The classical melodic descent returns through E and D. E# is the seventh-degree spelling here; its physical piano key is F. Keep the displayed E# label in the score and note list rather than renaming it F.

[已核实] 来源：AN-HMT-F-SHARP。 

#### Use the specified starting fingers

The sourced one-octave natural and harmonic ascents begin with right-hand finger 2 and left-hand finger 4 on F#. In the right hand, fingers 2-3 play F#-G# before the thumb plays A. Read the complete row for the selected hand. The melodic form requires its own reviewed row before finger numbers are offered.

[已核实] 来源：AN-PS-NAT, AN-PS-HAR。 

#### Check the white-key leading note

Play C#-D-E-F#, then C#-D-E#-F#, then C#-D#-E#-F#. Say E-sharp before touching its white key. For the descending melodic check, begin at the upper F# and return through E-D-C#. Finish by writing the seventh degree for each form and matching it to the keyboard without changing its spelling.

[推断] 来源：AN-HMT-F-SHARP。 

### 结构化数据

```json
{
  "tonic": "F#",
  "default_form": "natural_minor",
  "key_signature": {
    "accidentals": [
      "F#",
      "C#",
      "G#"
    ],
    "count": 3,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-F-SHARP",
      "AN-PS-NAT"
    ]
  },
  "relative_major": {
    "name": "A major",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-HMT-F-SHARP",
      "AN-PS-NAT"
    ]
  },
  "forms": [
    {
      "id": "natural_minor",
      "label": "Natural minor",
      "notes_ascending": [
        "F#",
        "G#",
        "A",
        "B",
        "C#",
        "D",
        "E",
        "F#"
      ],
      "notes_descending": [
        "F#",
        "E",
        "D",
        "C#",
        "B",
        "A",
        "G#",
        "F#"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-F-SHARP",
        "AN-PS-NAT"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        2,
        2
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            2,
            3,
            1,
            2,
            3,
            1,
            2,
            3
          ],
          "left_hand": [
            4,
            3,
            2,
            1,
            3,
            2,
            1,
            4
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-NAT"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-F-SHARP",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "F#",
            "written_octave": 3,
            "midi": 54,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G#",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "F#",
            "written_octave": 3,
            "midi": 54,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          }
        ]
      }
    },
    {
      "id": "harmonic_minor",
      "label": "Harmonic minor",
      "notes_ascending": [
        "F#",
        "G#",
        "A",
        "B",
        "C#",
        "D",
        "E#",
        "F#"
      ],
      "notes_descending": [
        "F#",
        "E#",
        "D",
        "C#",
        "B",
        "A",
        "G#",
        "F#"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-F-SHARP",
        "AN-PS-HAR"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        1,
        3,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": [
            2,
            3,
            1,
            2,
            3,
            1,
            2,
            3
          ],
          "left_hand": [
            4,
            3,
            2,
            1,
            3,
            2,
            1,
            4
          ]
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [
          "AN-PS-HAR"
        ],
        "evidence_status": "[已核实]",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-F-SHARP",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E#",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "F#",
            "written_octave": 3,
            "midi": 54,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "E#",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G#",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "F#",
            "written_octave": 3,
            "midi": 54,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          }
        ]
      }
    },
    {
      "id": "melodic_minor_classical",
      "label": "Melodic minor (classical exercise)",
      "notes_ascending": [
        "F#",
        "G#",
        "A",
        "B",
        "C#",
        "D#",
        "E#",
        "F#"
      ],
      "notes_descending": [
        "F#",
        "E",
        "D",
        "C#",
        "B",
        "A",
        "G#",
        "F#"
      ],
      "notes_evidence_status": "[已核实]",
      "source_ids": [
        "AN-HMT-F-SHARP",
        "AN-DENTON"
      ],
      "independent_note_source_count": 2,
      "ascending_semitone_steps": [
        2,
        1,
        2,
        2,
        2,
        2,
        1
      ],
      "fingering": {
        "scope": "one_octave_separate_hands",
        "ascending": {
          "right_hand": null,
          "left_hand": null
        },
        "descending": {
          "right_hand": null,
          "left_hand": null
        },
        "source_ids": [],
        "evidence_status": "待确认",
        "review_scope": "Only non-null finger sequences are supported. Source shows fingers aligned with eight ascending tonic-to-tonic notes; do not reverse, transpose, or extend those finger rows."
      },
      "pitch_mapping": {
        "evidence_status": "[推断]",
        "basis": "Arithmetic from verified note spelling and semitone rules; C4=MIDI60 convention from AN-BMT-AS. Display octave is an editorial choice, not a sourced performance prescription.",
        "source_ids": [
          "AN-HMT-F-SHARP",
          "AN-OMT",
          "AN-BMT-AS"
        ],
        "right_hand_ascending_example": [
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D#",
            "written_octave": 5,
            "midi": 75,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 5,
            "midi": 77,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          }
        ],
        "left_hand_ascending_example": [
          {
            "spelling": "F#",
            "written_octave": 3,
            "midi": 54,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "G#",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "D#",
            "written_octave": 4,
            "midi": 63,
            "pitch_class": 3,
            "physical_key_name": "D#",
            "key_color": "black"
          },
          {
            "spelling": "E#",
            "written_octave": 4,
            "midi": 65,
            "pitch_class": 5,
            "physical_key_name": "F",
            "key_color": "white"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          }
        ],
        "right_hand_descending_example": [
          {
            "spelling": "F#",
            "written_octave": 5,
            "midi": 78,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 5,
            "midi": 76,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 5,
            "midi": 74,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 5,
            "midi": 73,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 4,
            "midi": 71,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 4,
            "midi": 69,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G#",
            "written_octave": 4,
            "midi": 68,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          }
        ],
        "left_hand_descending_example": [
          {
            "spelling": "F#",
            "written_octave": 4,
            "midi": 66,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          },
          {
            "spelling": "E",
            "written_octave": 4,
            "midi": 64,
            "pitch_class": 4,
            "physical_key_name": "E",
            "key_color": "white"
          },
          {
            "spelling": "D",
            "written_octave": 4,
            "midi": 62,
            "pitch_class": 2,
            "physical_key_name": "D",
            "key_color": "white"
          },
          {
            "spelling": "C#",
            "written_octave": 4,
            "midi": 61,
            "pitch_class": 1,
            "physical_key_name": "C#",
            "key_color": "black"
          },
          {
            "spelling": "B",
            "written_octave": 3,
            "midi": 59,
            "pitch_class": 11,
            "physical_key_name": "B",
            "key_color": "white"
          },
          {
            "spelling": "A",
            "written_octave": 3,
            "midi": 57,
            "pitch_class": 9,
            "physical_key_name": "A",
            "key_color": "white"
          },
          {
            "spelling": "G#",
            "written_octave": 3,
            "midi": 56,
            "pitch_class": 8,
            "physical_key_name": "G#",
            "key_color": "black"
          },
          {
            "spelling": "F#",
            "written_octave": 3,
            "midi": 54,
            "pitch_class": 6,
            "physical_key_name": "F#",
            "key_color": "black"
          }
        ]
      }
    }
  ],
  "scope": {
    "minor_convention": "Classical scale exercise: melodic minor restores natural-minor sixth/seventh on descent. This is not a claim that compositions must always follow that direction rule.",
    "evidence_status": "[已核实]",
    "source_ids": [
      "AN-OMT",
      "AN-HA-A"
    ],
    "audited_note_octaves": 1,
    "audited_finger_octaves": 1,
    "hands_together_fingering": null,
    "continuous_turnaround_fingering": null
  },
  "approved_playback_octaves": [
    1
  ],
  "print_and_audio": {
    "status": "implementation_pending",
    "source_asset_reuse": "external reference only; no source diagrams, recordings, scores or PDFs bundled or authorized for reuse",
    "print_fields": [
      "page title",
      "form",
      "direction",
      "hand",
      "exact note spellings",
      "key signature",
      "one-octave staff events",
      "non-null source-reviewed fingers only",
      "source ids",
      "checked date"
    ],
    "tempo_presets_bpm": [
      40,
      60,
      80
    ],
    "tempo_presets_status": "[推断] 编辑默认值；不代表考试要求或专业建议",
    "audio_render_contract": "Use matching selected-form selected-direction pitch events. Do not apply fingering to audio pitches or respell notes to physical-key labels. Keep display spelling separate from MIDI pitch."
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P207 | partial_content_ready_data_gaps | ['本调三种小调的严格音名、构成与上下行', '键位/MIDI/谱表事件数据（运算映射已标推断）', '已查实的指法行；未核实组合明确为 null', '独立英文说明和练习', '打印字段、来源、状态与待办'] | ['缺失手别/方向指法（见本页逐项 issues）', '扩大八度和连续往返连接指法审核', '实际谱表/音频/打印成品一致性验收'] |

### 待确认

- AN-U111-natural_minor-FINGER — data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U111-harmonic_minor-FINGER — data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U111-melodic_minor_classical-FINGER — data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U111-RANGE — data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U111-QA — data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

来源：AN-BMT-AS, AN-DENTON, AN-HA-GUIDE, AN-HMT-F-SHARP, AN-OMT, AN-PS-HAR, AN-PS-MEL, AN-PS-NAT

## /scales/c-flat-major

[已核实] 目标关键词：`cb major scale piano`；模板 T12；基线优先级：后做。
状态：`content_data_ready_with_secondary_fingering_review`；发布状态：未验收。

任务：Read the seven-flat C-flat-major spelling accurately and map C-flat and F-flat to the correct piano keys.

### 页面需回答的问题

- What are the notes and key signature of C-flat major?
- Why does the scale say C-flat and F-flat instead of B and E?
- Which fingers are used by each hand ascending and descending over one octave?
- What should I check during a short practice run?

### 英文页面内容

**C-Flat Major Piano Scale: Notes and Fingering**

See C-flat major notes, key signature, keyboard pitches and separately verified one-octave fingering for each hand and direction.

#### C-Flat Major notes

C-Flat Major contains Cb, Db, Eb, Fb, Gb, Ab, Bb. Repeat Cb at the top to complete one octave. Its key signature has 7 flats.

[已核实] 来源：AM-NOTES-C-FLAT-MAJOR, AM-CB-SPELLING。 

#### Keep C-flat and F-flat in the notation

Every letter name in C-flat major carries a flat. C♭ and F♭ are played on the same piano keys as B and E, respectively, but retain their flat names here. That spelling gives the scale one C, one D, one E, and so on. The key signature contains seven flats.

[推断] 来源：AM-NOTES-C-FLAT-MAJOR, AM-CB-SPELLING, AM-THEORY。 Explanatory relationships derived from independently checked note spelling and the verified major-scale interval rule.

#### One-octave fingering

The cited C-flat-specific lesson gives right-hand 1–2–3–1–2–3–4–5 and left-hand 4–3–2–1–4–3–2–1 for a one-octave ascent, with explicit descending rows. These are documented on the C-flat page itself; they have not been inferred by substituting B-major finger numbers.

[已核实] 来源：AM-CB-FINGER。 

#### A short practice check

Suggested drill: say the flat name of every note before playing it. Pay special attention to E♭–F♭ and B♭–C♭, the half-step pairs. With octave labels enabled, compare C♭4 with B3: they identify the same sounding key under this notation convention. Do not relabel C♭4 as B4.

[推断] 来源：AM-CB-FINGER, AM-NOTES-C-FLAT-MAJOR, AM-CB-SPELLING, AM-MUSICXML, AM-MIDI。 Original suggested drill using only the source-verified notes and explicit fingering for this key. No effectiveness or fixed learning-time claim.

### 结构化数据

```json
{
  "tonic": "Cb",
  "scale_type": "major",
  "notes_ascending": [
    "Cb",
    "Db",
    "Eb",
    "Fb",
    "Gb",
    "Ab",
    "Bb",
    "Cb"
  ],
  "notes_descending": [
    "Cb",
    "Bb",
    "Ab",
    "Gb",
    "Fb",
    "Eb",
    "Db",
    "Cb"
  ],
  "note_spelling_status": "[已核实]",
  "note_source_ids": [
    "AM-NOTES-C-FLAT-MAJOR",
    "AM-CB-SPELLING"
  ],
  "key_signature": {
    "fifths": -7,
    "ordered_accidentals": [
      "Bb",
      "Eb",
      "Ab",
      "Db",
      "Gb",
      "Cb",
      "Fb"
    ],
    "count": 7,
    "evidence_status": "[已核实]",
    "source_ids": [
      "AM-NOTES-C-FLAT-MAJOR",
      "AM-CB-SPELLING"
    ]
  },
  "intervals": {
    "ascending_semitones": [
      2,
      2,
      1,
      2,
      2,
      2,
      1
    ],
    "descending_semitones": [
      1,
      2,
      2,
      2,
      1,
      2,
      2
    ],
    "half_step_pairs": [
      [
        "Eb",
        "Fb"
      ],
      [
        "Bb",
        "Cb"
      ]
    ],
    "evidence_status": "[推断]",
    "basis": "Apply the verified major-scale interval rule to the independently checked note spelling. Descending order follows the same pitches from upper tonic to lower tonic.",
    "source_ids": [
      "AM-NOTES-C-FLAT-MAJOR",
      "AM-CB-SPELLING",
      "AM-THEORY"
    ]
  },
  "display_register": {
    "RH": "tonic written in octave 4 to tonic written in octave 5",
    "LH": "tonic written in octave 3 to tonic written in octave 4",
    "evidence_status": "[推断]",
    "basis": "Editorial display choice; octave labels follow MusicXML C4=middle C; each accidental remains attached to its written octave. This register choice is not asserted to be a source-prescribed exercise range.",
    "source_ids": [
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "pitch_sequences": {
    "RH": {
      "ascending": [
        {
          "note": "Cb4",
          "step": "C",
          "alter": -1,
          "octave": 4,
          "midi": 59,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "Db4",
          "step": "D",
          "alter": -1,
          "octave": 4,
          "midi": 61,
          "scale_degree": 2,
          "key_color": "black"
        },
        {
          "note": "Eb4",
          "step": "E",
          "alter": -1,
          "octave": 4,
          "midi": 63,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "Fb4",
          "step": "F",
          "alter": -1,
          "octave": 4,
          "midi": 64,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "Gb4",
          "step": "G",
          "alter": -1,
          "octave": 4,
          "midi": 66,
          "scale_degree": 5,
          "key_color": "black"
        },
        {
          "note": "Ab4",
          "step": "A",
          "alter": -1,
          "octave": 4,
          "midi": 68,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "Bb4",
          "step": "B",
          "alter": -1,
          "octave": 4,
          "midi": 70,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "Cb5",
          "step": "C",
          "alter": -1,
          "octave": 5,
          "midi": 71,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "Cb5",
          "step": "C",
          "alter": -1,
          "octave": 5,
          "midi": 71,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "Bb4",
          "step": "B",
          "alter": -1,
          "octave": 4,
          "midi": 70,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "Ab4",
          "step": "A",
          "alter": -1,
          "octave": 4,
          "midi": 68,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "Gb4",
          "step": "G",
          "alter": -1,
          "octave": 4,
          "midi": 66,
          "scale_degree": 5,
          "key_color": "black"
        },
        {
          "note": "Fb4",
          "step": "F",
          "alter": -1,
          "octave": 4,
          "midi": 64,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "Eb4",
          "step": "E",
          "alter": -1,
          "octave": 4,
          "midi": 63,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "Db4",
          "step": "D",
          "alter": -1,
          "octave": 4,
          "midi": 61,
          "scale_degree": 2,
          "key_color": "black"
        },
        {
          "note": "Cb4",
          "step": "C",
          "alter": -1,
          "octave": 4,
          "midi": 59,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "LH": {
      "ascending": [
        {
          "note": "Cb3",
          "step": "C",
          "alter": -1,
          "octave": 3,
          "midi": 47,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "Db3",
          "step": "D",
          "alter": -1,
          "octave": 3,
          "midi": 49,
          "scale_degree": 2,
          "key_color": "black"
        },
        {
          "note": "Eb3",
          "step": "E",
          "alter": -1,
          "octave": 3,
          "midi": 51,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "Fb3",
          "step": "F",
          "alter": -1,
          "octave": 3,
          "midi": 52,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "Gb3",
          "step": "G",
          "alter": -1,
          "octave": 3,
          "midi": 54,
          "scale_degree": 5,
          "key_color": "black"
        },
        {
          "note": "Ab3",
          "step": "A",
          "alter": -1,
          "octave": 3,
          "midi": 56,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "Bb3",
          "step": "B",
          "alter": -1,
          "octave": 3,
          "midi": 58,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "Cb4",
          "step": "C",
          "alter": -1,
          "octave": 4,
          "midi": 59,
          "scale_degree": 1,
          "key_color": "white"
        }
      ],
      "descending": [
        {
          "note": "Cb4",
          "step": "C",
          "alter": -1,
          "octave": 4,
          "midi": 59,
          "scale_degree": 1,
          "key_color": "white"
        },
        {
          "note": "Bb3",
          "step": "B",
          "alter": -1,
          "octave": 3,
          "midi": 58,
          "scale_degree": 7,
          "key_color": "black"
        },
        {
          "note": "Ab3",
          "step": "A",
          "alter": -1,
          "octave": 3,
          "midi": 56,
          "scale_degree": 6,
          "key_color": "black"
        },
        {
          "note": "Gb3",
          "step": "G",
          "alter": -1,
          "octave": 3,
          "midi": 54,
          "scale_degree": 5,
          "key_color": "black"
        },
        {
          "note": "Fb3",
          "step": "F",
          "alter": -1,
          "octave": 3,
          "midi": 52,
          "scale_degree": 4,
          "key_color": "white"
        },
        {
          "note": "Eb3",
          "step": "E",
          "alter": -1,
          "octave": 3,
          "midi": 51,
          "scale_degree": 3,
          "key_color": "black"
        },
        {
          "note": "Db3",
          "step": "D",
          "alter": -1,
          "octave": 3,
          "midi": 49,
          "scale_degree": 2,
          "key_color": "black"
        },
        {
          "note": "Cb3",
          "step": "C",
          "alter": -1,
          "octave": 3,
          "midi": 47,
          "scale_degree": 1,
          "key_color": "white"
        }
      ]
    },
    "evidence_status": "[推断]",
    "basis": "MIDI = 12*(written_octave+1)+natural_letter_pitch_class+alter; computed from verified spelling. Cb4=59, equivalent to B3, not B4.",
    "source_ids": [
      "AM-NOTES-C-FLAT-MAJOR",
      "AM-CB-SPELLING",
      "AM-MUSICXML",
      "AM-MIDI"
    ]
  },
  "fingering": {
    "instrument": "piano",
    "motion": "similar motion or hands separately",
    "octaves": 1,
    "directions_in_performance_order": true,
    "RH": {
      "ascending": [
        1,
        2,
        3,
        1,
        2,
        3,
        4,
        5
      ],
      "descending": [
        5,
        4,
        3,
        2,
        1,
        3,
        2,
        1
      ]
    },
    "LH": {
      "ascending": [
        4,
        3,
        2,
        1,
        4,
        3,
        2,
        1
      ],
      "descending": [
        1,
        2,
        3,
        4,
        1,
        2,
        3,
        4
      ]
    },
    "evidence_status": "[已核实]",
    "verification": "explicit_single_source",
    "source_ids": [
      "AM-CB-FINGER"
    ],
    "source_locator": "C-flat-specific one-octave RH/LH prose",
    "review_status": "second_fingering_source_or_pianist_check_pending",
    "variant_note": "A source-documented single-octave choice, not a claim that no alternative fingering is valid. Do not extend to multiple octaves by repeating these rows.",
    "additional_octave_fingerings": null,
    "direction_evidence": "C-flat-specific source explicitly states both one-octave ascending sequences and both one-octave descending sequences at lines 87,91,95,99.",
    "visual_evidence_refs": []
  },
  "renderer_payload": {
    "clefs": {
      "RH": "treble",
      "LH": "bass"
    },
    "key_fifths": -7,
    "mode": "major",
    "duration_beats_per_note": 1,
    "default_tempo_bpm": 60,
    "tempo_status": "editorial playback default; not a sourced examination speed or promised learning target",
    "ascending_then_descending_index_order": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "source_of_truth": "pitch_sequences plus same-hand fingering rows; no automatic enharmonic respelling",
    "print_fields": [
      "title",
      "key_signature",
      "note_spelling",
      "selected_hand",
      "one_octave_range",
      "ascending_and_descending_staff_notes",
      "matching_fingering",
      "short_practice_tip",
      "source_ids"
    ],
    "status": "content_and_data_handoff; notation/audio/print implementations have not been built or tested"
  },
  "labels": {
    "hand": "Hand",
    "right_hand": "Right hand",
    "left_hand": "Left hand",
    "both_hands": "Both hands",
    "direction": "Direction",
    "ascending": "Ascending",
    "descending": "Descending",
    "up_and_down": "Up and down",
    "octaves": "1 octave",
    "play": "Play scale",
    "stop": "Stop",
    "print": "Print current scale"
  },
  "related_links": [
    {
      "url": "/scales",
      "label": "All piano scales",
      "activation": "only when target is live"
    }
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P209 | content_data_prepared; rendered delivery pending | ['independent English page content', 'notes and key signature cross-checked', 'spelled pitches with octave and MIDI mapping', 'source-specific one-octave RH/LH ascending and descending fingering', 'key-specific hand-crossing explanation', 'original short practice check', 'notation/audio/print common data payload'] | ['professional release review', 'visual keyboard and staff rendering plus playback/print consistency QA', 'second C-flat-specific fingering source'] |

### 待确认

- AM-C-FLAT-MAJOR-RENDER — notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-C-FLAT-MAJOR-RANGE — fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.
- AM-CB-SECOND-FINGERING — fingering.verification：[已核实] The C-flat-specific source explicitly supplies both hands and directions for one octave. An independently readable second C-flat fingering source was not obtained. This is not a guessed B-major substitution.；解决：Cross-check the transcribed C-flat one-octave numbers with a second C-flat-specific teaching chart or qualified pianist before marking professional review complete.

来源：AM-NOTES-C-FLAT-MAJOR, AM-CB-SPELLING, AM-CB-FINGER, AM-THEORY, AM-MUSICXML, AM-MIDI

## /arpeggios

[已核实] 目标关键词：`arpeggios piano`；模板 T14；基线优先级：后做。
状态：`content_and_pitch_data_prepared_with_open_issues`；发布状态：未验收。

任务：Understand an arpeggio and use the existing C/G major examples, including C scale versus arpeggio.

### 页面需回答的问题

- What does arpeggio mean?
- How does the C major arpeggio differ from its scale?
- Which notes are in G major?
- Which exact hand and octave does each fingering cover?

### 英文页面内容

**Piano Arpeggios: C and G Major**

Find C and G major arpeggio notes, compare scales with chord tones, and use precisely scoped fingering examples.

#### Play the chord notes in sequence

An arpeggio presents chord tones one after another. This reference covers root-position C and G major triads. The C-major notes are C, E and G; the G-major notes are G, B and D. Repeating the root one octave higher gives a short ascending reference, followed here by the same notes descending.

[已核实] 来源：AT-26, AT-27, AT-28。 

#### C major: scale and arpeggio

The C-major scale reads C, D, E, F, G, A, B, C. Its tonic arpeggio uses C, E, G, C: degrees 1, 3, 5 and the octave. Compare the two note rows before playing. The arpeggio skips the intervening scale notes instead of moving through each degree.

[已核实] 来源：AT-03, AT-26, AT-27, AT-28。 

#### G major: keep the triad in view

G major has F-sharp in its scale, but the G-major tonic triad contains G, B and D. The one-octave arpeggio is G, B, D, G. The scale and arpeggio share a key label while containing different numbers of distinct notes.

[已核实] 来源：AT-27, AT-28, AT-29。 

#### Read the scope of the finger numbers

The verified examples below cover C major in the right hand and G major in the left hand, each for one octave up and back. Their source prints every finger number. Follow the hand and register labels; these numbers are not a two-octave fingering chart. Other hand-specific examples remain to be checked.

[已核实] 来源：AT-28。 

#### Try one note check

Name the three chord tones, then read the short arpeggio upward and back. Compare it with the corresponding scale row. Work with one labeled hand example at a time, using the printed finger sequence only for its stated range.

[推断] 来源：AT-27, AT-28。 

### 结构化数据

```json
{
  "scope": "original C/G major objects only",
  "examples": [
    {
      "id": "c-major-arpeggio",
      "label": "C major arpeggio",
      "root": "C",
      "pitch_names": [
        "C",
        "E",
        "G"
      ],
      "degrees": [
        "1",
        "3",
        "5"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-26",
        "AT-27",
        "AT-28",
        "AT-03"
      ],
      "cross_check": "C/G pitch notation cross-checked in Denton and Faber official examples; C triad also confirmed by Yale",
      "ascending_notes": [
        "C",
        "E",
        "G",
        "C"
      ],
      "descending_notes": [
        "C",
        "G",
        "E",
        "C"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "keyboard": {
        "pitch_offsets_semitones": [
          0,
          4,
          7,
          12
        ],
        "evidence_status": "[推断]",
        "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave."
      },
      "staff": {
        "clef": "treble",
        "key_signature": "none; spell accidentals explicitly",
        "events_ascending": [
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "events_descending": [
          {
            "pitch": "C",
            "octave": 5,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "G",
            "octave": 4,
            "letter": "G",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "E",
            "octave": 4,
            "letter": "E",
            "accidental": "natural",
            "key_color": "white"
          },
          {
            "pitch": "C",
            "octave": 4,
            "letter": "C",
            "accidental": "natural",
            "key_color": "white"
          }
        ],
        "evidence_status": "[推断]",
        "basis": "Editorial octave placement for rendering; note spelling sourced above."
      },
      "fingering": {
        "right_hand": {
          "range_octaves": 1,
          "direction": "ascending_then_descending",
          "register": "C4–C5–C4",
          "notes": [
            "C4",
            "E4",
            "G4",
            "C5",
            "G4",
            "E4",
            "C4"
          ],
          "fingers": [
            1,
            2,
            3,
            5,
            3,
            2,
            1
          ],
          "evidence_status": "[已核实]",
          "source_ids": [
            "AT-28"
          ],
          "source_locator": "PDF page 2, printed page 3, C major one-octave arpeggio example",
          "cross_check_status": "single explicit all-note fingering source; second source and teacher review pending"
        },
        "left_hand": null,
        "status": "partial_single_source_verified"
      },
      "playback": {
        "sequence": "ascending_notes then descending_notes without repeated apex",
        "source_audio_asset": null,
        "live_playback_verified": false
      },
      "print": {
        "content": [
          "label",
          "degrees",
          "pitch_names",
          "staff",
          "keyboard"
        ],
        "pdf_asset": null
      },
      "kind": "major triad arpeggio",
      "position": "root position",
      "comparison_scale_notes": [
        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "B"
      ],
      "step_pattern_semitones": [
        4,
        3,
        5
      ]
    },
    {
      "id": "g-major-arpeggio",
      "label": "G major arpeggio",
      "root": "G",
      "pitch_names": [
        "G",
        "B",
        "D"
      ],
      "degrees": [
        "1",
        "3",
        "5"
      ],
      "pitch_evidence_status": "[已核实]",
      "source_ids": [
        "AT-27",
        "AT-28",
        "AT-29"
      ],
      "cross_check": "C/G pitch notation cross-checked in Denton and Faber official examples; C triad also confirmed by Yale",
      "ascending_notes": [
        "G",
        "B",
        "D",
        "G"
      ],
      "descending_notes": [
        "G",
        "D",
        "B",
        "G"
      ],
      "sequence_evidence_status": "[推断]",
      "sequence_basis": "Endpoint octave and descending reverse are editorial reference sequences built from the verified pitch collection; not a inferred fingering.",
      "fingering": {
        "right_hand": null,
        "left_hand": {
          "range_octaves": 1,
          "direction": "ascending_then_descending",
          "register": "G2–G3–G2",
          "notes": [
            "G2",
            "B2",
            "D3",
            "G3",
            "D3",
            "B2",
            "G2"
          ],
          "fingers": [
            5,
            3,
            2,
            1,
            2,
            3,
            5
          ],
          "evidence_status": "[已核实]",
          "source_ids": [
            "AT-28"
          ],
          "source_locator": "PDF page 2, printed page 3, question 4, G major arpeggio in bass clef",
          "cross_check_status": "single explicit all-note fingering source; do not apply to two-octave arpeggios",
          "view_id": "g-major-lh-one-octave"
        },
        "status": "partial_single_source_verified"
      },
      "kind": "major triad arpeggio",
      "position": "root position",
      "comparison_scale_notes": [
        "G",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F#"
      ],
      "step_pattern_semitones": [
        4,
        3,
        5
      ],
      "views": [
        {
          "view_id": "g-major-lh-one-octave",
          "role": "verified_hand_specific_example",
          "label": "G major arpeggio — left hand, G2–G3–G2",
          "hand": "left_hand",
          "range_octaves": 1,
          "register": "G2–G3–G2",
          "evidence_status": "[已核实]",
          "source_ids": [
            "AT-28"
          ],
          "source_locator": "PDF page 2, printed page 3, question 4, G major arpeggio in bass clef",
          "staff": {
            "clef": "bass",
            "key_signature": "none; all example notes natural",
            "events_ascending": [
              {
                "pitch": "G",
                "octave": 2,
                "letter": "G",
                "accidental": "natural",
                "key_color": "white",
                "finger": 5
              },
              {
                "pitch": "B",
                "octave": 2,
                "letter": "B",
                "accidental": "natural",
                "key_color": "white",
                "finger": 3
              },
              {
                "pitch": "D",
                "octave": 3,
                "letter": "D",
                "accidental": "natural",
                "key_color": "white",
                "finger": 2
              },
              {
                "pitch": "G",
                "octave": 3,
                "letter": "G",
                "accidental": "natural",
                "key_color": "white",
                "finger": 1
              }
            ],
            "events_descending": [
              {
                "pitch": "G",
                "octave": 3,
                "letter": "G",
                "accidental": "natural",
                "key_color": "white",
                "finger": 1
              },
              {
                "pitch": "D",
                "octave": 3,
                "letter": "D",
                "accidental": "natural",
                "key_color": "white",
                "finger": 2
              },
              {
                "pitch": "B",
                "octave": 2,
                "letter": "B",
                "accidental": "natural",
                "key_color": "white",
                "finger": 3
              },
              {
                "pitch": "G",
                "octave": 2,
                "letter": "G",
                "accidental": "natural",
                "key_color": "white",
                "finger": 5
              }
            ],
            "direction": "ascending_then_descending",
            "show_fingering": true,
            "evidence_status": "[已核实]",
            "source_ids": [
              "AT-28"
            ],
            "basis": "Actual bass-clef pitches and all seven finger numerals visually transcribed from Faber PDF page 2 (printed page 3), question 4."
          },
          "keyboard": {
            "start_pitch": "G2",
            "end_pitch": "G3",
            "highlighted_pitch_sequence": [
              "G2",
              "B2",
              "D3",
              "G3",
              "D3",
              "B2",
              "G2"
            ],
            "fingers": [
              5,
              3,
              2,
              1,
              2,
              3,
              5
            ],
            "pitch_offsets_semitones": [
              0,
              4,
              7,
              12
            ],
            "evidence_status": "[推断]",
            "basis": "Keyboard mapping of the source-verified bass-clef notes; finger sequence remains a direct transcription."
          },
          "playback": {
            "absolute_pitch_sequence": [
              "G2",
              "B2",
              "D3",
              "G3",
              "D3",
              "B2",
              "G2"
            ],
            "direction": "ascending_then_descending",
            "repeat_apex": false,
            "synchronized_staff_view_id": "g-major-lh-one-octave",
            "live_playback_verified": false,
            "evidence_status": "[推断]",
            "basis": "Playback order directly follows the verified seven-note example; synthesis not yet implemented."
          },
          "print": {
            "view_id": "g-major-lh-one-octave",
            "title": "G Major Arpeggio — Left Hand, One Octave",
            "include": [
              "label",
              "staff",
              "keyboard",
              "fingering.left_hand"
            ],
            "register": "G2–G3–G2",
            "pdf_asset": null,
            "source_graphics_reuse": false
          },
          "fingering": {
            "range_octaves": 1,
            "direction": "ascending_then_descending",
            "register": "G2–G3–G2",
            "notes": [
              "G2",
              "B2",
              "D3",
              "G3",
              "D3",
              "B2",
              "G2"
            ],
            "fingers": [
              5,
              3,
              2,
              1,
              2,
              3,
              5
            ],
            "evidence_status": "[已核实]",
            "source_ids": [
              "AT-28"
            ],
            "source_locator": "PDF page 2, printed page 3, question 4, G major arpeggio in bass clef",
            "cross_check_status": "single explicit all-note fingering source; do not apply to two-octave arpeggios",
            "view_id": "g-major-lh-one-octave"
          }
        },
        {
          "view_id": "g-major-pitch-only-treble",
          "role": "pitch_only_reference",
          "label": "G major chord tones — treble reference, G4–G5–G4",
          "hand": null,
          "register": "G4–G5–G4",
          "evidence_status": "[推断]",
          "basis": "Editorial treble register for pitch reading only; no hand-specific fingering is assigned.",
          "staff": {
            "clef": "treble",
            "key_signature": "none; spell accidentals explicitly",
            "events_ascending": [
              {
                "pitch": "G",
                "octave": 4,
                "letter": "G",
                "accidental": "natural",
                "key_color": "white"
              },
              {
                "pitch": "B",
                "octave": 4,
                "letter": "B",
                "accidental": "natural",
                "key_color": "white"
              },
              {
                "pitch": "D",
                "octave": 5,
                "letter": "D",
                "accidental": "natural",
                "key_color": "white"
              },
              {
                "pitch": "G",
                "octave": 5,
                "letter": "G",
                "accidental": "natural",
                "key_color": "white"
              }
            ],
            "events_descending": [
              {
                "pitch": "G",
                "octave": 5,
                "letter": "G",
                "accidental": "natural",
                "key_color": "white"
              },
              {
                "pitch": "D",
                "octave": 5,
                "letter": "D",
                "accidental": "natural",
                "key_color": "white"
              },
              {
                "pitch": "B",
                "octave": 4,
                "letter": "B",
                "accidental": "natural",
                "key_color": "white"
              },
              {
                "pitch": "G",
                "octave": 4,
                "letter": "G",
                "accidental": "natural",
                "key_color": "white"
              }
            ],
            "evidence_status": "[推断]",
            "basis": "Editorial octave placement for rendering; note spelling sourced above.",
            "show_fingering": false,
            "hand": null,
            "fingering_binding": null
          },
          "keyboard": {
            "pitch_offsets_semitones": [
              0,
              4,
              7,
              12
            ],
            "evidence_status": "[推断]",
            "basis": "Deterministic mapping of verified note spelling to a 12-semitone keyboard octave.",
            "start_pitch": "G4",
            "end_pitch": "G5",
            "show_fingering": false
          },
          "fingering": null,
          "playback": {
            "absolute_pitch_sequence": [
              "G4",
              "B4",
              "D5",
              "G5",
              "D5",
              "B4",
              "G4"
            ],
            "repeat_apex": false,
            "synchronized_staff_view_id": "g-major-pitch-only-treble",
            "live_playback_verified": false
          },
          "print": {
            "view_id": "g-major-pitch-only-treble",
            "title": "G Major Chord Tones — Pitch Reference",
            "include": [
              "label",
              "staff",
              "keyboard"
            ],
            "show_fingering": false,
            "pdf_asset": null
          }
        }
      ],
      "default_view_id": "g-major-lh-one-octave",
      "render_contract": {
        "evidence_status": "[推断]",
        "rule": "Select exactly one view. Staff, keyboard highlighting, absolute playback pitches, fingering and print must all come from that same view_id. Never bind the LH G2–G3 fingering to the treble G4–G5 reference.",
        "generic_pitch_names_role": "Root-independent note names and ascending_notes/descending_notes are pitch collections only; they do not specify playback register.",
        "generic_fingering_role": "Left-hand fingering binds exclusively to view_id g-major-lh-one-octave; right_hand remains null.",
        "legacy_staff_fields": "Unscoped top-level staff, keyboard, playback and print removed from this G example to prevent mixed-register rendering."
      }
    }
  ],
  "related_urls": [
    "/scales/c-major",
    "/scales/g-major",
    "/chords"
  ],
  "content_role_note": "数据准备稿，不代表网页交互或打印资源已上线。实际谱表/键盘图须由这些具体音符数据渲染后验收。"
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P215 | partial_pending_assets_and_applicable_fingering | 独立英文内容、具体对象音符与构成、键盘/谱表渲染数据、出处、编辑练习；见本页数据及各组专门结果。 | 实际图示/播放/打印成品验收；未核实的手别方向八度指法。 |
| P216 | partial_pending_assets_and_applicable_fingering | C大调音阶与琶音两行实际音名；单八度C4–C5右手完整指法；键位/谱表输入数据；非只有链接。 | 实际图示/播放/打印成品验收；未核实的手别方向八度指法。 |
| P217 | partial_pending_assets_and_applicable_fingering | G大调实际琶音G–B–D；单八度G2–G3左手完整指法；与G大调F#音阶区别；键位/谱表输入数据。 | 实际图示/播放/打印成品验收；未核实的手别方向八度指法。 |

### 待确认

- AT-arpeggios-FINGERING — data.examples[*].fingering：缺少对应对象、手别、方向、八度范围的完整专业指法来源；不得由模式补写。；解决：逐个选择明确标注全部音符指法的正规教学资料，并经钢琴教师复核；已明确收录的例外见对象数据。
- AT-arpeggios-OUTPUT — rendered_staff_keyboard_audio_pdf：已提供音符与渲染数据；本轮未生成并视检实际谱表/键盘图、音频或打印PDF，不能声称这些功能已可用。；解决：实现时用本页数据渲染并逐音视检/试听；PDF生成检查成功后才显示下载入口。
- AT-arpeggios-PRACTICE — blocks.practice：练习是基于已核实音符的编辑提议，未通过专业教学效果或动作审核。；解决：钢琴教师核对适用水平和练习安排；不承诺学习效果。
- AT-arpeggios-FINGER-CROSSCHECK — data.examples[*].fingering：Faber 两个单八度完整序列均已逐音看图核验，但没有第二处相同范围、逐音明确的指法来源；Denton 为双八度且只印关键数字。Baylor 正文403。；解决：补同手别同八度的可靠来源或教师确认。G左手单八度3指选择不得套用为双八度常规4指。

来源：AT-26, AT-27, AT-28, AT-03, AT-29

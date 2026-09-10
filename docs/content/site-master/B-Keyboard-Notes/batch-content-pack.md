# Batch B — Keyboard / Notes

[已核实] 共 7 页。基线字段原样保留，核查日期 2026-09-09。

证据标签为后台记录；英文文案在各模块 body 中。计算数据与编辑建议标 [推断]。待确认字段不供上线渲染。

## /keyboard-notes

[已核实] 目标关键词：`piano keys`；模板 T03；基线优先级：先做。
状态：`content_data_ready_with_rendering_pending`；发布状态：未验收。

任务：Identify one key or find a named pitch without guessing its octave.

### 页面需回答的问题

- What is this piano key called?
- Where are F3, A4, A5 and C3?
- Which octave do C and A-flat refer to?
- How many white/black keys and octaves are in the chosen layout?
- Which black key is next to G?
- Where are B-sharp and C-flat, including octave boundaries?
- Is D8 included?

### 英文页面内容

**Piano Keys and Notes: Find Any Key**

Identify a piano key, locate a note by octave and compare verified 88-key and 61-key example ranges.

#### Find a piano key or note

Choose a keyboard layout, then select a key to see its note name and octave. To find a note from its name, enter a full label such as F3 or A4. A letter alone, such as C, identifies several keys; choose an octave before selecting one. Use Play note when you want to hear the selected pitch.

[推断] 来源：BK-OMT。 Page interaction copy applying the confirmed lookup task and the verified distinction between pitch class and pitch.

#### Read the repeating pattern

The white-key letters repeat A, B, C, D, E, F, G. Black keys form groups of two and three. Find C just before a two-black-key group, and F just before a three-black-key group. Between one C and the next C are twelve semitone steps; the upper C begins the next repeat.

[推断] 来源：BK-YAMAHA-COUNT, BK-HOFFMAN, BK-ENHARMONIC, BK-MIT。 Summary and direct keyboard-position deductions from verified naming and grouping rules.

#### How many keys and octaves?

The standard 88-key layout shown here runs from A0 to C8: 52 white keys and 36 black keys. Its lowest-to-highest span is seven octaves plus three semitones. The alternative 61-key example runs from C2 to C7, spanning five octaves with 36 white and 25 black keys. Check your instrument’s endpoints before using that example.

[推断] 来源：BK-KORG, BK-ROLAND, BK-YAMAHA-COUNT, BK-YAMAHA-SPAN, BK-MIT。 Endpoints and 88-key count independently verified; 61-key counts and exact interval spans counted from the complete checked key arrays.

#### Black keys, sharps and flats

A black key can have two familiar names: C♯/D♭, D♯/E♭, F♯/G♭, G♯/A♭, or A♯/B♭. These pairs point to the same piano key. Sharps and flats can also name white keys. The black key to the left of G is F♯/G♭; the one to its right is G♯/A♭.

[已核实] 来源：BK-ENHARMONIC, BK-YAMAHA-COUNT。 

#### Which C, A or F?

This reference calls middle C C4. C3 is one octave below it; A5 is one octave above A4. F3 is the F in octave 3. An A-flat query keeps the name A♭ while offering its matching octaves. For staff positions, open the notes chart; for A4 or another note in hertz, open the frequency table.

[推断] 来源：BK-OMT, BK-MIT。 Examples follow the verified octave-label rule; internal links follow the frozen URL plan.

#### Keep spelling and range visible

B♯3 shares the C4 key; B♯4 shares C5. C♭4 shares B3, not B4. Keep the written name and its octave together. D8 lies above this 88-key layout’s C8 endpoint. An out-of-range result should stay visible as a message, rather than moving the requested note to another octave.

[推断] 来源：BK-OMT, BK-MIT, BK-KORG。 B#3 and Cb4 examples explicitly sourced; neighboring examples and out-of-range state calculated from the same verified rules and endpoints.

### 结构化数据

```json
{
  "layouts": [
    {
      "layout_id": "88-key-A0-C8",
      "label": "88 keys: A0–C8",
      "key_count": 88,
      "lowest_note": "A0",
      "highest_note": "C8",
      "midi_range": [
        21,
        108
      ],
      "range_source_ids": [
        "BK-KORG",
        "BK-YAMAHA-SPAN"
      ],
      "range_status": "[已核实]",
      "white_key_count": 52,
      "black_key_count": 36,
      "semitone_span": 87,
      "octave_span": {
        "complete_octave_intervals": 7,
        "remaining_semitones": 3,
        "exact_octave_ratio": 7.25
      },
      "middle_c_key_id": "pitch-60",
      "middle_c_position_from_left": 40,
      "keys": [
        {
          "key_id": "pitch-21",
          "position_from_left": 1,
          "midi": 21,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 0,
          "default_label": "A",
          "label_with_octave": "A0",
          "lookup_spellings": [
            "A0"
          ],
          "white_key_index": 0,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-22",
          "position_from_left": 2,
          "midi": 22,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 0,
          "default_label": "A# / Bb",
          "label_with_octave": "A#0 / Bb0",
          "lookup_spellings": [
            "A#0",
            "Bb0"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            0,
            1
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-23",
          "position_from_left": 3,
          "midi": 23,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 0,
          "default_label": "B",
          "label_with_octave": "B0",
          "lookup_spellings": [
            "B0",
            "Cb1"
          ],
          "white_key_index": 1,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-24",
          "position_from_left": 4,
          "midi": 24,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 1,
          "default_label": "C",
          "label_with_octave": "C1",
          "lookup_spellings": [
            "C1",
            "B#0"
          ],
          "white_key_index": 2,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-25",
          "position_from_left": 5,
          "midi": 25,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 1,
          "default_label": "C# / Db",
          "label_with_octave": "C#1 / Db1",
          "lookup_spellings": [
            "C#1",
            "Db1"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            2,
            3
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-26",
          "position_from_left": 6,
          "midi": 26,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 1,
          "default_label": "D",
          "label_with_octave": "D1",
          "lookup_spellings": [
            "D1"
          ],
          "white_key_index": 3,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-27",
          "position_from_left": 7,
          "midi": 27,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 1,
          "default_label": "D# / Eb",
          "label_with_octave": "D#1 / Eb1",
          "lookup_spellings": [
            "D#1",
            "Eb1"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            3,
            4
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-28",
          "position_from_left": 8,
          "midi": 28,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 1,
          "default_label": "E",
          "label_with_octave": "E1",
          "lookup_spellings": [
            "E1",
            "Fb1"
          ],
          "white_key_index": 4,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-29",
          "position_from_left": 9,
          "midi": 29,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 1,
          "default_label": "F",
          "label_with_octave": "F1",
          "lookup_spellings": [
            "F1",
            "E#1"
          ],
          "white_key_index": 5,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-30",
          "position_from_left": 10,
          "midi": 30,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 1,
          "default_label": "F# / Gb",
          "label_with_octave": "F#1 / Gb1",
          "lookup_spellings": [
            "F#1",
            "Gb1"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            5,
            6
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-31",
          "position_from_left": 11,
          "midi": 31,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 1,
          "default_label": "G",
          "label_with_octave": "G1",
          "lookup_spellings": [
            "G1"
          ],
          "white_key_index": 6,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-32",
          "position_from_left": 12,
          "midi": 32,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 1,
          "default_label": "G# / Ab",
          "label_with_octave": "G#1 / Ab1",
          "lookup_spellings": [
            "G#1",
            "Ab1"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            6,
            7
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-33",
          "position_from_left": 13,
          "midi": 33,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 1,
          "default_label": "A",
          "label_with_octave": "A1",
          "lookup_spellings": [
            "A1"
          ],
          "white_key_index": 7,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-34",
          "position_from_left": 14,
          "midi": 34,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 1,
          "default_label": "A# / Bb",
          "label_with_octave": "A#1 / Bb1",
          "lookup_spellings": [
            "A#1",
            "Bb1"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            7,
            8
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-35",
          "position_from_left": 15,
          "midi": 35,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 1,
          "default_label": "B",
          "label_with_octave": "B1",
          "lookup_spellings": [
            "B1",
            "Cb2"
          ],
          "white_key_index": 8,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-36",
          "position_from_left": 16,
          "midi": 36,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 2,
          "default_label": "C",
          "label_with_octave": "C2",
          "lookup_spellings": [
            "C2",
            "B#1"
          ],
          "white_key_index": 9,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-37",
          "position_from_left": 17,
          "midi": 37,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 2,
          "default_label": "C# / Db",
          "label_with_octave": "C#2 / Db2",
          "lookup_spellings": [
            "C#2",
            "Db2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            9,
            10
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-38",
          "position_from_left": 18,
          "midi": 38,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 2,
          "default_label": "D",
          "label_with_octave": "D2",
          "lookup_spellings": [
            "D2"
          ],
          "white_key_index": 10,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-39",
          "position_from_left": 19,
          "midi": 39,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 2,
          "default_label": "D# / Eb",
          "label_with_octave": "D#2 / Eb2",
          "lookup_spellings": [
            "D#2",
            "Eb2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            10,
            11
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-40",
          "position_from_left": 20,
          "midi": 40,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 2,
          "default_label": "E",
          "label_with_octave": "E2",
          "lookup_spellings": [
            "E2",
            "Fb2"
          ],
          "white_key_index": 11,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-41",
          "position_from_left": 21,
          "midi": 41,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 2,
          "default_label": "F",
          "label_with_octave": "F2",
          "lookup_spellings": [
            "F2",
            "E#2"
          ],
          "white_key_index": 12,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-42",
          "position_from_left": 22,
          "midi": 42,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 2,
          "default_label": "F# / Gb",
          "label_with_octave": "F#2 / Gb2",
          "lookup_spellings": [
            "F#2",
            "Gb2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            12,
            13
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-43",
          "position_from_left": 23,
          "midi": 43,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 2,
          "default_label": "G",
          "label_with_octave": "G2",
          "lookup_spellings": [
            "G2"
          ],
          "white_key_index": 13,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-44",
          "position_from_left": 24,
          "midi": 44,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 2,
          "default_label": "G# / Ab",
          "label_with_octave": "G#2 / Ab2",
          "lookup_spellings": [
            "G#2",
            "Ab2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            13,
            14
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-45",
          "position_from_left": 25,
          "midi": 45,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 2,
          "default_label": "A",
          "label_with_octave": "A2",
          "lookup_spellings": [
            "A2"
          ],
          "white_key_index": 14,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-46",
          "position_from_left": 26,
          "midi": 46,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 2,
          "default_label": "A# / Bb",
          "label_with_octave": "A#2 / Bb2",
          "lookup_spellings": [
            "A#2",
            "Bb2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            14,
            15
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-47",
          "position_from_left": 27,
          "midi": 47,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 2,
          "default_label": "B",
          "label_with_octave": "B2",
          "lookup_spellings": [
            "B2",
            "Cb3"
          ],
          "white_key_index": 15,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-48",
          "position_from_left": 28,
          "midi": 48,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 3,
          "default_label": "C",
          "label_with_octave": "C3",
          "lookup_spellings": [
            "C3",
            "B#2"
          ],
          "white_key_index": 16,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-49",
          "position_from_left": 29,
          "midi": 49,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 3,
          "default_label": "C# / Db",
          "label_with_octave": "C#3 / Db3",
          "lookup_spellings": [
            "C#3",
            "Db3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            16,
            17
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-50",
          "position_from_left": 30,
          "midi": 50,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 3,
          "default_label": "D",
          "label_with_octave": "D3",
          "lookup_spellings": [
            "D3"
          ],
          "white_key_index": 17,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-51",
          "position_from_left": 31,
          "midi": 51,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 3,
          "default_label": "D# / Eb",
          "label_with_octave": "D#3 / Eb3",
          "lookup_spellings": [
            "D#3",
            "Eb3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            17,
            18
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-52",
          "position_from_left": 32,
          "midi": 52,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 3,
          "default_label": "E",
          "label_with_octave": "E3",
          "lookup_spellings": [
            "E3",
            "Fb3"
          ],
          "white_key_index": 18,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-53",
          "position_from_left": 33,
          "midi": 53,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 3,
          "default_label": "F",
          "label_with_octave": "F3",
          "lookup_spellings": [
            "F3",
            "E#3"
          ],
          "white_key_index": 19,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-54",
          "position_from_left": 34,
          "midi": 54,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 3,
          "default_label": "F# / Gb",
          "label_with_octave": "F#3 / Gb3",
          "lookup_spellings": [
            "F#3",
            "Gb3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            19,
            20
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-55",
          "position_from_left": 35,
          "midi": 55,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 3,
          "default_label": "G",
          "label_with_octave": "G3",
          "lookup_spellings": [
            "G3"
          ],
          "white_key_index": 20,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-56",
          "position_from_left": 36,
          "midi": 56,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 3,
          "default_label": "G# / Ab",
          "label_with_octave": "G#3 / Ab3",
          "lookup_spellings": [
            "G#3",
            "Ab3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            20,
            21
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-57",
          "position_from_left": 37,
          "midi": 57,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 3,
          "default_label": "A",
          "label_with_octave": "A3",
          "lookup_spellings": [
            "A3"
          ],
          "white_key_index": 21,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-58",
          "position_from_left": 38,
          "midi": 58,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 3,
          "default_label": "A# / Bb",
          "label_with_octave": "A#3 / Bb3",
          "lookup_spellings": [
            "A#3",
            "Bb3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            21,
            22
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-59",
          "position_from_left": 39,
          "midi": 59,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 3,
          "default_label": "B",
          "label_with_octave": "B3",
          "lookup_spellings": [
            "B3",
            "Cb4"
          ],
          "white_key_index": 22,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-60",
          "position_from_left": 40,
          "midi": 60,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 4,
          "default_label": "C",
          "label_with_octave": "C4",
          "lookup_spellings": [
            "C4",
            "B#3"
          ],
          "white_key_index": 23,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-61",
          "position_from_left": 41,
          "midi": 61,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 4,
          "default_label": "C# / Db",
          "label_with_octave": "C#4 / Db4",
          "lookup_spellings": [
            "C#4",
            "Db4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            23,
            24
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-62",
          "position_from_left": 42,
          "midi": 62,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 4,
          "default_label": "D",
          "label_with_octave": "D4",
          "lookup_spellings": [
            "D4"
          ],
          "white_key_index": 24,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-63",
          "position_from_left": 43,
          "midi": 63,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 4,
          "default_label": "D# / Eb",
          "label_with_octave": "D#4 / Eb4",
          "lookup_spellings": [
            "D#4",
            "Eb4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            24,
            25
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-64",
          "position_from_left": 44,
          "midi": 64,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 4,
          "default_label": "E",
          "label_with_octave": "E4",
          "lookup_spellings": [
            "E4",
            "Fb4"
          ],
          "white_key_index": 25,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-65",
          "position_from_left": 45,
          "midi": 65,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 4,
          "default_label": "F",
          "label_with_octave": "F4",
          "lookup_spellings": [
            "F4",
            "E#4"
          ],
          "white_key_index": 26,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-66",
          "position_from_left": 46,
          "midi": 66,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 4,
          "default_label": "F# / Gb",
          "label_with_octave": "F#4 / Gb4",
          "lookup_spellings": [
            "F#4",
            "Gb4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            26,
            27
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-67",
          "position_from_left": 47,
          "midi": 67,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 4,
          "default_label": "G",
          "label_with_octave": "G4",
          "lookup_spellings": [
            "G4"
          ],
          "white_key_index": 27,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-68",
          "position_from_left": 48,
          "midi": 68,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 4,
          "default_label": "G# / Ab",
          "label_with_octave": "G#4 / Ab4",
          "lookup_spellings": [
            "G#4",
            "Ab4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            27,
            28
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-69",
          "position_from_left": 49,
          "midi": 69,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 4,
          "default_label": "A",
          "label_with_octave": "A4",
          "lookup_spellings": [
            "A4"
          ],
          "white_key_index": 28,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-70",
          "position_from_left": 50,
          "midi": 70,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 4,
          "default_label": "A# / Bb",
          "label_with_octave": "A#4 / Bb4",
          "lookup_spellings": [
            "A#4",
            "Bb4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            28,
            29
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-71",
          "position_from_left": 51,
          "midi": 71,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 4,
          "default_label": "B",
          "label_with_octave": "B4",
          "lookup_spellings": [
            "B4",
            "Cb5"
          ],
          "white_key_index": 29,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-72",
          "position_from_left": 52,
          "midi": 72,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 5,
          "default_label": "C",
          "label_with_octave": "C5",
          "lookup_spellings": [
            "C5",
            "B#4"
          ],
          "white_key_index": 30,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-73",
          "position_from_left": 53,
          "midi": 73,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 5,
          "default_label": "C# / Db",
          "label_with_octave": "C#5 / Db5",
          "lookup_spellings": [
            "C#5",
            "Db5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            30,
            31
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-74",
          "position_from_left": 54,
          "midi": 74,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 5,
          "default_label": "D",
          "label_with_octave": "D5",
          "lookup_spellings": [
            "D5"
          ],
          "white_key_index": 31,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-75",
          "position_from_left": 55,
          "midi": 75,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 5,
          "default_label": "D# / Eb",
          "label_with_octave": "D#5 / Eb5",
          "lookup_spellings": [
            "D#5",
            "Eb5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            31,
            32
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-76",
          "position_from_left": 56,
          "midi": 76,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 5,
          "default_label": "E",
          "label_with_octave": "E5",
          "lookup_spellings": [
            "E5",
            "Fb5"
          ],
          "white_key_index": 32,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-77",
          "position_from_left": 57,
          "midi": 77,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 5,
          "default_label": "F",
          "label_with_octave": "F5",
          "lookup_spellings": [
            "F5",
            "E#5"
          ],
          "white_key_index": 33,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-78",
          "position_from_left": 58,
          "midi": 78,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 5,
          "default_label": "F# / Gb",
          "label_with_octave": "F#5 / Gb5",
          "lookup_spellings": [
            "F#5",
            "Gb5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            33,
            34
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-79",
          "position_from_left": 59,
          "midi": 79,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 5,
          "default_label": "G",
          "label_with_octave": "G5",
          "lookup_spellings": [
            "G5"
          ],
          "white_key_index": 34,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-80",
          "position_from_left": 60,
          "midi": 80,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 5,
          "default_label": "G# / Ab",
          "label_with_octave": "G#5 / Ab5",
          "lookup_spellings": [
            "G#5",
            "Ab5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            34,
            35
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-81",
          "position_from_left": 61,
          "midi": 81,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 5,
          "default_label": "A",
          "label_with_octave": "A5",
          "lookup_spellings": [
            "A5"
          ],
          "white_key_index": 35,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-82",
          "position_from_left": 62,
          "midi": 82,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 5,
          "default_label": "A# / Bb",
          "label_with_octave": "A#5 / Bb5",
          "lookup_spellings": [
            "A#5",
            "Bb5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            35,
            36
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-83",
          "position_from_left": 63,
          "midi": 83,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 5,
          "default_label": "B",
          "label_with_octave": "B5",
          "lookup_spellings": [
            "B5",
            "Cb6"
          ],
          "white_key_index": 36,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-84",
          "position_from_left": 64,
          "midi": 84,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 6,
          "default_label": "C",
          "label_with_octave": "C6",
          "lookup_spellings": [
            "C6",
            "B#5"
          ],
          "white_key_index": 37,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-85",
          "position_from_left": 65,
          "midi": 85,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 6,
          "default_label": "C# / Db",
          "label_with_octave": "C#6 / Db6",
          "lookup_spellings": [
            "C#6",
            "Db6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            37,
            38
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-86",
          "position_from_left": 66,
          "midi": 86,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 6,
          "default_label": "D",
          "label_with_octave": "D6",
          "lookup_spellings": [
            "D6"
          ],
          "white_key_index": 38,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-87",
          "position_from_left": 67,
          "midi": 87,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 6,
          "default_label": "D# / Eb",
          "label_with_octave": "D#6 / Eb6",
          "lookup_spellings": [
            "D#6",
            "Eb6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            38,
            39
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-88",
          "position_from_left": 68,
          "midi": 88,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 6,
          "default_label": "E",
          "label_with_octave": "E6",
          "lookup_spellings": [
            "E6",
            "Fb6"
          ],
          "white_key_index": 39,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-89",
          "position_from_left": 69,
          "midi": 89,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 6,
          "default_label": "F",
          "label_with_octave": "F6",
          "lookup_spellings": [
            "F6",
            "E#6"
          ],
          "white_key_index": 40,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-90",
          "position_from_left": 70,
          "midi": 90,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 6,
          "default_label": "F# / Gb",
          "label_with_octave": "F#6 / Gb6",
          "lookup_spellings": [
            "F#6",
            "Gb6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            40,
            41
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-91",
          "position_from_left": 71,
          "midi": 91,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 6,
          "default_label": "G",
          "label_with_octave": "G6",
          "lookup_spellings": [
            "G6"
          ],
          "white_key_index": 41,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-92",
          "position_from_left": 72,
          "midi": 92,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 6,
          "default_label": "G# / Ab",
          "label_with_octave": "G#6 / Ab6",
          "lookup_spellings": [
            "G#6",
            "Ab6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            41,
            42
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-93",
          "position_from_left": 73,
          "midi": 93,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 6,
          "default_label": "A",
          "label_with_octave": "A6",
          "lookup_spellings": [
            "A6"
          ],
          "white_key_index": 42,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-94",
          "position_from_left": 74,
          "midi": 94,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 6,
          "default_label": "A# / Bb",
          "label_with_octave": "A#6 / Bb6",
          "lookup_spellings": [
            "A#6",
            "Bb6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            42,
            43
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-95",
          "position_from_left": 75,
          "midi": 95,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 6,
          "default_label": "B",
          "label_with_octave": "B6",
          "lookup_spellings": [
            "B6",
            "Cb7"
          ],
          "white_key_index": 43,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-96",
          "position_from_left": 76,
          "midi": 96,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 7,
          "default_label": "C",
          "label_with_octave": "C7",
          "lookup_spellings": [
            "C7",
            "B#6"
          ],
          "white_key_index": 44,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-97",
          "position_from_left": 77,
          "midi": 97,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 7,
          "default_label": "C# / Db",
          "label_with_octave": "C#7 / Db7",
          "lookup_spellings": [
            "C#7",
            "Db7"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            44,
            45
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-98",
          "position_from_left": 78,
          "midi": 98,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 7,
          "default_label": "D",
          "label_with_octave": "D7",
          "lookup_spellings": [
            "D7"
          ],
          "white_key_index": 45,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-99",
          "position_from_left": 79,
          "midi": 99,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 7,
          "default_label": "D# / Eb",
          "label_with_octave": "D#7 / Eb7",
          "lookup_spellings": [
            "D#7",
            "Eb7"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            45,
            46
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-100",
          "position_from_left": 80,
          "midi": 100,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 7,
          "default_label": "E",
          "label_with_octave": "E7",
          "lookup_spellings": [
            "E7",
            "Fb7"
          ],
          "white_key_index": 46,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-101",
          "position_from_left": 81,
          "midi": 101,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 7,
          "default_label": "F",
          "label_with_octave": "F7",
          "lookup_spellings": [
            "F7",
            "E#7"
          ],
          "white_key_index": 47,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-102",
          "position_from_left": 82,
          "midi": 102,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 7,
          "default_label": "F# / Gb",
          "label_with_octave": "F#7 / Gb7",
          "lookup_spellings": [
            "F#7",
            "Gb7"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            47,
            48
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-103",
          "position_from_left": 83,
          "midi": 103,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 7,
          "default_label": "G",
          "label_with_octave": "G7",
          "lookup_spellings": [
            "G7"
          ],
          "white_key_index": 48,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-104",
          "position_from_left": 84,
          "midi": 104,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 7,
          "default_label": "G# / Ab",
          "label_with_octave": "G#7 / Ab7",
          "lookup_spellings": [
            "G#7",
            "Ab7"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            48,
            49
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-105",
          "position_from_left": 85,
          "midi": 105,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 7,
          "default_label": "A",
          "label_with_octave": "A7",
          "lookup_spellings": [
            "A7"
          ],
          "white_key_index": 49,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-106",
          "position_from_left": 86,
          "midi": 106,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 7,
          "default_label": "A# / Bb",
          "label_with_octave": "A#7 / Bb7",
          "lookup_spellings": [
            "A#7",
            "Bb7"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            49,
            50
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-107",
          "position_from_left": 87,
          "midi": 107,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 7,
          "default_label": "B",
          "label_with_octave": "B7",
          "lookup_spellings": [
            "B7",
            "Cb8"
          ],
          "white_key_index": 50,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-108",
          "position_from_left": 88,
          "midi": 108,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 8,
          "default_label": "C",
          "label_with_octave": "C8",
          "lookup_spellings": [
            "C8",
            "B#7"
          ],
          "white_key_index": 51,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        }
      ],
      "reading_segments": [
        {
          "octave": 0,
          "first_key_id": "pitch-21",
          "last_key_id": "pitch-23",
          "label": "A0–B0",
          "key_count": 3,
          "midi_range": [
            21,
            23
          ]
        },
        {
          "octave": 1,
          "first_key_id": "pitch-24",
          "last_key_id": "pitch-35",
          "label": "C1–B1",
          "key_count": 12,
          "midi_range": [
            24,
            35
          ]
        },
        {
          "octave": 2,
          "first_key_id": "pitch-36",
          "last_key_id": "pitch-47",
          "label": "C2–B2",
          "key_count": 12,
          "midi_range": [
            36,
            47
          ]
        },
        {
          "octave": 3,
          "first_key_id": "pitch-48",
          "last_key_id": "pitch-59",
          "label": "C3–B3",
          "key_count": 12,
          "midi_range": [
            48,
            59
          ]
        },
        {
          "octave": 4,
          "first_key_id": "pitch-60",
          "last_key_id": "pitch-71",
          "label": "C4–B4",
          "key_count": 12,
          "midi_range": [
            60,
            71
          ]
        },
        {
          "octave": 5,
          "first_key_id": "pitch-72",
          "last_key_id": "pitch-83",
          "label": "C5–B5",
          "key_count": 12,
          "midi_range": [
            72,
            83
          ]
        },
        {
          "octave": 6,
          "first_key_id": "pitch-84",
          "last_key_id": "pitch-95",
          "label": "C6–B6",
          "key_count": 12,
          "midi_range": [
            84,
            95
          ]
        },
        {
          "octave": 7,
          "first_key_id": "pitch-96",
          "last_key_id": "pitch-107",
          "label": "C7–B7",
          "key_count": 12,
          "midi_range": [
            96,
            107
          ]
        },
        {
          "octave": 8,
          "first_key_id": "pitch-108",
          "last_key_id": "pitch-108",
          "label": "C8–C8",
          "key_count": 1,
          "midi_range": [
            108,
            108
          ]
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Enumerated each semitone within independently checked layout endpoints using verified C4=60 and named-note spelling rules. Counts, key positions and segmentation are calculated data, not inferred instrument dimensions.",
      "source_ids": [
        "BK-KORG",
        "BK-YAMAHA-SPAN",
        "BK-OMT",
        "BK-MIT",
        "BK-UTK",
        "BK-ENHARMONIC"
      ],
      "scope_note": "Standard A0–C8 88-key layout; does not describe every extended-range or historical piano."
    },
    {
      "layout_id": "61-key-C2-C7",
      "label": "61 keys: C2–C7",
      "key_count": 61,
      "lowest_note": "C2",
      "highest_note": "C7",
      "midi_range": [
        36,
        96
      ],
      "range_source_ids": [
        "BK-KORG",
        "BK-ROLAND"
      ],
      "range_status": "[已核实]",
      "white_key_count": 36,
      "black_key_count": 25,
      "semitone_span": 60,
      "octave_span": {
        "complete_octave_intervals": 5,
        "remaining_semitones": 0,
        "exact_octave_ratio": 5.0
      },
      "middle_c_key_id": "pitch-60",
      "middle_c_position_from_left": 25,
      "keys": [
        {
          "key_id": "pitch-36",
          "position_from_left": 1,
          "midi": 36,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 2,
          "default_label": "C",
          "label_with_octave": "C2",
          "lookup_spellings": [
            "C2",
            "B#1"
          ],
          "white_key_index": 0,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-37",
          "position_from_left": 2,
          "midi": 37,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 2,
          "default_label": "C# / Db",
          "label_with_octave": "C#2 / Db2",
          "lookup_spellings": [
            "C#2",
            "Db2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            0,
            1
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-38",
          "position_from_left": 3,
          "midi": 38,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 2,
          "default_label": "D",
          "label_with_octave": "D2",
          "lookup_spellings": [
            "D2"
          ],
          "white_key_index": 1,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-39",
          "position_from_left": 4,
          "midi": 39,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 2,
          "default_label": "D# / Eb",
          "label_with_octave": "D#2 / Eb2",
          "lookup_spellings": [
            "D#2",
            "Eb2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            1,
            2
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-40",
          "position_from_left": 5,
          "midi": 40,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 2,
          "default_label": "E",
          "label_with_octave": "E2",
          "lookup_spellings": [
            "E2",
            "Fb2"
          ],
          "white_key_index": 2,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-41",
          "position_from_left": 6,
          "midi": 41,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 2,
          "default_label": "F",
          "label_with_octave": "F2",
          "lookup_spellings": [
            "F2",
            "E#2"
          ],
          "white_key_index": 3,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-42",
          "position_from_left": 7,
          "midi": 42,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 2,
          "default_label": "F# / Gb",
          "label_with_octave": "F#2 / Gb2",
          "lookup_spellings": [
            "F#2",
            "Gb2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            3,
            4
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-43",
          "position_from_left": 8,
          "midi": 43,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 2,
          "default_label": "G",
          "label_with_octave": "G2",
          "lookup_spellings": [
            "G2"
          ],
          "white_key_index": 4,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-44",
          "position_from_left": 9,
          "midi": 44,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 2,
          "default_label": "G# / Ab",
          "label_with_octave": "G#2 / Ab2",
          "lookup_spellings": [
            "G#2",
            "Ab2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            4,
            5
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-45",
          "position_from_left": 10,
          "midi": 45,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 2,
          "default_label": "A",
          "label_with_octave": "A2",
          "lookup_spellings": [
            "A2"
          ],
          "white_key_index": 5,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-46",
          "position_from_left": 11,
          "midi": 46,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 2,
          "default_label": "A# / Bb",
          "label_with_octave": "A#2 / Bb2",
          "lookup_spellings": [
            "A#2",
            "Bb2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            5,
            6
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-47",
          "position_from_left": 12,
          "midi": 47,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 2,
          "default_label": "B",
          "label_with_octave": "B2",
          "lookup_spellings": [
            "B2",
            "Cb3"
          ],
          "white_key_index": 6,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-48",
          "position_from_left": 13,
          "midi": 48,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 3,
          "default_label": "C",
          "label_with_octave": "C3",
          "lookup_spellings": [
            "C3",
            "B#2"
          ],
          "white_key_index": 7,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-49",
          "position_from_left": 14,
          "midi": 49,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 3,
          "default_label": "C# / Db",
          "label_with_octave": "C#3 / Db3",
          "lookup_spellings": [
            "C#3",
            "Db3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            7,
            8
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-50",
          "position_from_left": 15,
          "midi": 50,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 3,
          "default_label": "D",
          "label_with_octave": "D3",
          "lookup_spellings": [
            "D3"
          ],
          "white_key_index": 8,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-51",
          "position_from_left": 16,
          "midi": 51,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 3,
          "default_label": "D# / Eb",
          "label_with_octave": "D#3 / Eb3",
          "lookup_spellings": [
            "D#3",
            "Eb3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            8,
            9
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-52",
          "position_from_left": 17,
          "midi": 52,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 3,
          "default_label": "E",
          "label_with_octave": "E3",
          "lookup_spellings": [
            "E3",
            "Fb3"
          ],
          "white_key_index": 9,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-53",
          "position_from_left": 18,
          "midi": 53,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 3,
          "default_label": "F",
          "label_with_octave": "F3",
          "lookup_spellings": [
            "F3",
            "E#3"
          ],
          "white_key_index": 10,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-54",
          "position_from_left": 19,
          "midi": 54,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 3,
          "default_label": "F# / Gb",
          "label_with_octave": "F#3 / Gb3",
          "lookup_spellings": [
            "F#3",
            "Gb3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            10,
            11
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-55",
          "position_from_left": 20,
          "midi": 55,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 3,
          "default_label": "G",
          "label_with_octave": "G3",
          "lookup_spellings": [
            "G3"
          ],
          "white_key_index": 11,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-56",
          "position_from_left": 21,
          "midi": 56,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 3,
          "default_label": "G# / Ab",
          "label_with_octave": "G#3 / Ab3",
          "lookup_spellings": [
            "G#3",
            "Ab3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            11,
            12
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-57",
          "position_from_left": 22,
          "midi": 57,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 3,
          "default_label": "A",
          "label_with_octave": "A3",
          "lookup_spellings": [
            "A3"
          ],
          "white_key_index": 12,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-58",
          "position_from_left": 23,
          "midi": 58,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 3,
          "default_label": "A# / Bb",
          "label_with_octave": "A#3 / Bb3",
          "lookup_spellings": [
            "A#3",
            "Bb3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            12,
            13
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-59",
          "position_from_left": 24,
          "midi": 59,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 3,
          "default_label": "B",
          "label_with_octave": "B3",
          "lookup_spellings": [
            "B3",
            "Cb4"
          ],
          "white_key_index": 13,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-60",
          "position_from_left": 25,
          "midi": 60,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 4,
          "default_label": "C",
          "label_with_octave": "C4",
          "lookup_spellings": [
            "C4",
            "B#3"
          ],
          "white_key_index": 14,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-61",
          "position_from_left": 26,
          "midi": 61,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 4,
          "default_label": "C# / Db",
          "label_with_octave": "C#4 / Db4",
          "lookup_spellings": [
            "C#4",
            "Db4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            14,
            15
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-62",
          "position_from_left": 27,
          "midi": 62,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 4,
          "default_label": "D",
          "label_with_octave": "D4",
          "lookup_spellings": [
            "D4"
          ],
          "white_key_index": 15,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-63",
          "position_from_left": 28,
          "midi": 63,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 4,
          "default_label": "D# / Eb",
          "label_with_octave": "D#4 / Eb4",
          "lookup_spellings": [
            "D#4",
            "Eb4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            15,
            16
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-64",
          "position_from_left": 29,
          "midi": 64,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 4,
          "default_label": "E",
          "label_with_octave": "E4",
          "lookup_spellings": [
            "E4",
            "Fb4"
          ],
          "white_key_index": 16,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-65",
          "position_from_left": 30,
          "midi": 65,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 4,
          "default_label": "F",
          "label_with_octave": "F4",
          "lookup_spellings": [
            "F4",
            "E#4"
          ],
          "white_key_index": 17,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-66",
          "position_from_left": 31,
          "midi": 66,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 4,
          "default_label": "F# / Gb",
          "label_with_octave": "F#4 / Gb4",
          "lookup_spellings": [
            "F#4",
            "Gb4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            17,
            18
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-67",
          "position_from_left": 32,
          "midi": 67,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 4,
          "default_label": "G",
          "label_with_octave": "G4",
          "lookup_spellings": [
            "G4"
          ],
          "white_key_index": 18,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-68",
          "position_from_left": 33,
          "midi": 68,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 4,
          "default_label": "G# / Ab",
          "label_with_octave": "G#4 / Ab4",
          "lookup_spellings": [
            "G#4",
            "Ab4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            18,
            19
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-69",
          "position_from_left": 34,
          "midi": 69,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 4,
          "default_label": "A",
          "label_with_octave": "A4",
          "lookup_spellings": [
            "A4"
          ],
          "white_key_index": 19,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-70",
          "position_from_left": 35,
          "midi": 70,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 4,
          "default_label": "A# / Bb",
          "label_with_octave": "A#4 / Bb4",
          "lookup_spellings": [
            "A#4",
            "Bb4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            19,
            20
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-71",
          "position_from_left": 36,
          "midi": 71,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 4,
          "default_label": "B",
          "label_with_octave": "B4",
          "lookup_spellings": [
            "B4",
            "Cb5"
          ],
          "white_key_index": 20,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-72",
          "position_from_left": 37,
          "midi": 72,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 5,
          "default_label": "C",
          "label_with_octave": "C5",
          "lookup_spellings": [
            "C5",
            "B#4"
          ],
          "white_key_index": 21,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-73",
          "position_from_left": 38,
          "midi": 73,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 5,
          "default_label": "C# / Db",
          "label_with_octave": "C#5 / Db5",
          "lookup_spellings": [
            "C#5",
            "Db5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            21,
            22
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-74",
          "position_from_left": 39,
          "midi": 74,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 5,
          "default_label": "D",
          "label_with_octave": "D5",
          "lookup_spellings": [
            "D5"
          ],
          "white_key_index": 22,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-75",
          "position_from_left": 40,
          "midi": 75,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 5,
          "default_label": "D# / Eb",
          "label_with_octave": "D#5 / Eb5",
          "lookup_spellings": [
            "D#5",
            "Eb5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            22,
            23
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-76",
          "position_from_left": 41,
          "midi": 76,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 5,
          "default_label": "E",
          "label_with_octave": "E5",
          "lookup_spellings": [
            "E5",
            "Fb5"
          ],
          "white_key_index": 23,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-77",
          "position_from_left": 42,
          "midi": 77,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 5,
          "default_label": "F",
          "label_with_octave": "F5",
          "lookup_spellings": [
            "F5",
            "E#5"
          ],
          "white_key_index": 24,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-78",
          "position_from_left": 43,
          "midi": 78,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 5,
          "default_label": "F# / Gb",
          "label_with_octave": "F#5 / Gb5",
          "lookup_spellings": [
            "F#5",
            "Gb5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            24,
            25
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-79",
          "position_from_left": 44,
          "midi": 79,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 5,
          "default_label": "G",
          "label_with_octave": "G5",
          "lookup_spellings": [
            "G5"
          ],
          "white_key_index": 25,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-80",
          "position_from_left": 45,
          "midi": 80,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 5,
          "default_label": "G# / Ab",
          "label_with_octave": "G#5 / Ab5",
          "lookup_spellings": [
            "G#5",
            "Ab5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            25,
            26
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-81",
          "position_from_left": 46,
          "midi": 81,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 5,
          "default_label": "A",
          "label_with_octave": "A5",
          "lookup_spellings": [
            "A5"
          ],
          "white_key_index": 26,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-82",
          "position_from_left": 47,
          "midi": 82,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 5,
          "default_label": "A# / Bb",
          "label_with_octave": "A#5 / Bb5",
          "lookup_spellings": [
            "A#5",
            "Bb5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            26,
            27
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-83",
          "position_from_left": 48,
          "midi": 83,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 5,
          "default_label": "B",
          "label_with_octave": "B5",
          "lookup_spellings": [
            "B5",
            "Cb6"
          ],
          "white_key_index": 27,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-84",
          "position_from_left": 49,
          "midi": 84,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 6,
          "default_label": "C",
          "label_with_octave": "C6",
          "lookup_spellings": [
            "C6",
            "B#5"
          ],
          "white_key_index": 28,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-85",
          "position_from_left": 50,
          "midi": 85,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 6,
          "default_label": "C# / Db",
          "label_with_octave": "C#6 / Db6",
          "lookup_spellings": [
            "C#6",
            "Db6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            28,
            29
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-86",
          "position_from_left": 51,
          "midi": 86,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 6,
          "default_label": "D",
          "label_with_octave": "D6",
          "lookup_spellings": [
            "D6"
          ],
          "white_key_index": 29,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-87",
          "position_from_left": 52,
          "midi": 87,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 6,
          "default_label": "D# / Eb",
          "label_with_octave": "D#6 / Eb6",
          "lookup_spellings": [
            "D#6",
            "Eb6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            29,
            30
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-88",
          "position_from_left": 53,
          "midi": 88,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 6,
          "default_label": "E",
          "label_with_octave": "E6",
          "lookup_spellings": [
            "E6",
            "Fb6"
          ],
          "white_key_index": 30,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-89",
          "position_from_left": 54,
          "midi": 89,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 6,
          "default_label": "F",
          "label_with_octave": "F6",
          "lookup_spellings": [
            "F6",
            "E#6"
          ],
          "white_key_index": 31,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-90",
          "position_from_left": 55,
          "midi": 90,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 6,
          "default_label": "F# / Gb",
          "label_with_octave": "F#6 / Gb6",
          "lookup_spellings": [
            "F#6",
            "Gb6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            31,
            32
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-91",
          "position_from_left": 56,
          "midi": 91,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 6,
          "default_label": "G",
          "label_with_octave": "G6",
          "lookup_spellings": [
            "G6"
          ],
          "white_key_index": 32,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-92",
          "position_from_left": 57,
          "midi": 92,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 6,
          "default_label": "G# / Ab",
          "label_with_octave": "G#6 / Ab6",
          "lookup_spellings": [
            "G#6",
            "Ab6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            32,
            33
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-93",
          "position_from_left": 58,
          "midi": 93,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 6,
          "default_label": "A",
          "label_with_octave": "A6",
          "lookup_spellings": [
            "A6"
          ],
          "white_key_index": 33,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-94",
          "position_from_left": 59,
          "midi": 94,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 6,
          "default_label": "A# / Bb",
          "label_with_octave": "A#6 / Bb6",
          "lookup_spellings": [
            "A#6",
            "Bb6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            33,
            34
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-95",
          "position_from_left": 60,
          "midi": 95,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 6,
          "default_label": "B",
          "label_with_octave": "B6",
          "lookup_spellings": [
            "B6",
            "Cb7"
          ],
          "white_key_index": 34,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-96",
          "position_from_left": 61,
          "midi": 96,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 7,
          "default_label": "C",
          "label_with_octave": "C7",
          "lookup_spellings": [
            "C7",
            "B#6"
          ],
          "white_key_index": 35,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        }
      ],
      "reading_segments": [
        {
          "octave": 2,
          "first_key_id": "pitch-36",
          "last_key_id": "pitch-47",
          "label": "C2–B2",
          "key_count": 12,
          "midi_range": [
            36,
            47
          ]
        },
        {
          "octave": 3,
          "first_key_id": "pitch-48",
          "last_key_id": "pitch-59",
          "label": "C3–B3",
          "key_count": 12,
          "midi_range": [
            48,
            59
          ]
        },
        {
          "octave": 4,
          "first_key_id": "pitch-60",
          "last_key_id": "pitch-71",
          "label": "C4–B4",
          "key_count": 12,
          "midi_range": [
            60,
            71
          ]
        },
        {
          "octave": 5,
          "first_key_id": "pitch-72",
          "last_key_id": "pitch-83",
          "label": "C5–B5",
          "key_count": 12,
          "midi_range": [
            72,
            83
          ]
        },
        {
          "octave": 6,
          "first_key_id": "pitch-84",
          "last_key_id": "pitch-95",
          "label": "C6–B6",
          "key_count": 12,
          "midi_range": [
            84,
            95
          ]
        },
        {
          "octave": 7,
          "first_key_id": "pitch-96",
          "last_key_id": "pitch-96",
          "label": "C7–C7",
          "key_count": 1,
          "midi_range": [
            96,
            96
          ]
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Enumerated each semitone within independently checked layout endpoints using verified C4=60 and named-note spelling rules. Counts, key positions and segmentation are calculated data, not inferred instrument dimensions.",
      "source_ids": [
        "BK-KORG",
        "BK-ROLAND",
        "BK-OMT",
        "BK-MIT",
        "BK-UTK",
        "BK-ENHARMONIC"
      ],
      "scope_note": "Representative untransposed C2–C7 61-key layout; confirm instrument endpoints and naming convention before matching a real keyboard."
    }
  ],
  "notation_convention": {
    "system": "Scientific pitch notation with middle C=C4",
    "internal_pitch_reference": "C4=MIDI60; semitone increments are 1",
    "display_numeric_mode": "optional octave suffix only",
    "other_number_systems": null,
    "evidence_status": "[已核实]",
    "source_ids": [
      "BK-OMT",
      "BK-MIT",
      "BK-W3C"
    ],
    "boundary": "Internal MIDI/array positions are implementation data and must not become finger numbers, scale degrees, numbered notation, or an extra student numbering scheme."
  },
  "chromatic_cycle": [
    {
      "pitch_class": 0,
      "sharp_name": "C",
      "flat_name": "C",
      "color": "white"
    },
    {
      "pitch_class": 1,
      "sharp_name": "C#",
      "flat_name": "Db",
      "color": "black"
    },
    {
      "pitch_class": 2,
      "sharp_name": "D",
      "flat_name": "D",
      "color": "white"
    },
    {
      "pitch_class": 3,
      "sharp_name": "D#",
      "flat_name": "Eb",
      "color": "black"
    },
    {
      "pitch_class": 4,
      "sharp_name": "E",
      "flat_name": "E",
      "color": "white"
    },
    {
      "pitch_class": 5,
      "sharp_name": "F",
      "flat_name": "F",
      "color": "white"
    },
    {
      "pitch_class": 6,
      "sharp_name": "F#",
      "flat_name": "Gb",
      "color": "black"
    },
    {
      "pitch_class": 7,
      "sharp_name": "G",
      "flat_name": "G",
      "color": "white"
    },
    {
      "pitch_class": 8,
      "sharp_name": "G#",
      "flat_name": "Ab",
      "color": "black"
    },
    {
      "pitch_class": 9,
      "sharp_name": "A",
      "flat_name": "A",
      "color": "white"
    },
    {
      "pitch_class": 10,
      "sharp_name": "A#",
      "flat_name": "Bb",
      "color": "black"
    },
    {
      "pitch_class": 11,
      "sharp_name": "B",
      "flat_name": "B",
      "color": "white"
    }
  ],
  "chromatic_cycle_evidence": {
    "status": "[已核实]",
    "source_ids": [
      "BK-ENHARMONIC",
      "BK-YAMAHA-COUNT",
      "BK-MIT"
    ]
  },
  "black_key_groups": [
    {
      "sharp": "C#",
      "flat": "Db",
      "between_white_keys": [
        "C",
        "D"
      ],
      "group_size": 2,
      "position_in_group": 1
    },
    {
      "sharp": "D#",
      "flat": "Eb",
      "between_white_keys": [
        "D",
        "E"
      ],
      "group_size": 2,
      "position_in_group": 2
    },
    {
      "sharp": "F#",
      "flat": "Gb",
      "between_white_keys": [
        "F",
        "G"
      ],
      "group_size": 3,
      "position_in_group": 1
    },
    {
      "sharp": "G#",
      "flat": "Ab",
      "between_white_keys": [
        "G",
        "A"
      ],
      "group_size": 3,
      "position_in_group": 2
    },
    {
      "sharp": "A#",
      "flat": "Bb",
      "between_white_keys": [
        "A",
        "B"
      ],
      "group_size": 3,
      "position_in_group": 3
    }
  ],
  "layout_data_status": "[推断] 逐键数据由已核实端点与音名/八度/MIDI规则计算，已自检；不是实测琴键尺寸",
  "audio_assets": null,
  "print_assets": null,
  "fingering": null,
  "default_state": {
    "layout_id": "88-key-A0-C8",
    "visible_midi_range": [
      48,
      72
    ],
    "selected_note": "C4",
    "selected_key_id": "pitch-60",
    "autoplay": false
  },
  "exact_note_examples": [
    {
      "query": "F3",
      "preserve_display_spelling": "F3",
      "midi": 53,
      "sounding_default_label": "F3",
      "color": "white",
      "position_explanation": "F immediately to the left of the three-black-key group in octave 3.",
      "layout_results": [
        {
          "layout_id": "88-key-A0-C8",
          "status": "in_range",
          "key_id": "pitch-53",
          "position_from_left": 33
        },
        {
          "layout_id": "61-key-C2-C7",
          "status": "in_range",
          "key_id": "pitch-53",
          "position_from_left": 18
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Exact examples calculated from the verified note, accidental, octave and MIDI rules.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT",
        "BK-W3C",
        "BK-ENHARMONIC"
      ]
    },
    {
      "query": "A4",
      "preserve_display_spelling": "A4",
      "midi": 69,
      "sounding_default_label": "A4",
      "color": "white",
      "position_explanation": "A between the second and third black keys of the three-black-key group in octave 4.",
      "layout_results": [
        {
          "layout_id": "88-key-A0-C8",
          "status": "in_range",
          "key_id": "pitch-69",
          "position_from_left": 49
        },
        {
          "layout_id": "61-key-C2-C7",
          "status": "in_range",
          "key_id": "pitch-69",
          "position_from_left": 34
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Exact examples calculated from the verified note, accidental, octave and MIDI rules.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT",
        "BK-W3C",
        "BK-ENHARMONIC"
      ]
    },
    {
      "query": "A5",
      "preserve_display_spelling": "A5",
      "midi": 81,
      "sounding_default_label": "A5",
      "color": "white",
      "position_explanation": "The A one octave above A4.",
      "layout_results": [
        {
          "layout_id": "88-key-A0-C8",
          "status": "in_range",
          "key_id": "pitch-81",
          "position_from_left": 61
        },
        {
          "layout_id": "61-key-C2-C7",
          "status": "in_range",
          "key_id": "pitch-81",
          "position_from_left": 46
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Exact examples calculated from the verified note, accidental, octave and MIDI rules.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT",
        "BK-W3C",
        "BK-ENHARMONIC"
      ]
    },
    {
      "query": "C3",
      "preserve_display_spelling": "C3",
      "midi": 48,
      "sounding_default_label": "C3",
      "color": "white",
      "position_explanation": "The C one octave below middle C.",
      "layout_results": [
        {
          "layout_id": "88-key-A0-C8",
          "status": "in_range",
          "key_id": "pitch-48",
          "position_from_left": 28
        },
        {
          "layout_id": "61-key-C2-C7",
          "status": "in_range",
          "key_id": "pitch-48",
          "position_from_left": 13
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Exact examples calculated from the verified note, accidental, octave and MIDI rules.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT",
        "BK-W3C",
        "BK-ENHARMONIC"
      ]
    },
    {
      "query": "Ab4",
      "preserve_display_spelling": "Ab4",
      "midi": 68,
      "sounding_default_label": "G#4",
      "color": "black",
      "position_explanation": "The black key immediately below A4; also called G#4.",
      "layout_results": [
        {
          "layout_id": "88-key-A0-C8",
          "status": "in_range",
          "key_id": "pitch-68",
          "position_from_left": 48
        },
        {
          "layout_id": "61-key-C2-C7",
          "status": "in_range",
          "key_id": "pitch-68",
          "position_from_left": 33
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Exact examples calculated from the verified note, accidental, octave and MIDI rules.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT",
        "BK-W3C",
        "BK-ENHARMONIC"
      ]
    },
    {
      "query": "B#3",
      "preserve_display_spelling": "B#3",
      "midi": 60,
      "sounding_default_label": "C4",
      "color": "white",
      "position_explanation": "The white key C4; retain the queried B-sharp spelling.",
      "layout_results": [
        {
          "layout_id": "88-key-A0-C8",
          "status": "in_range",
          "key_id": "pitch-60",
          "position_from_left": 40
        },
        {
          "layout_id": "61-key-C2-C7",
          "status": "in_range",
          "key_id": "pitch-60",
          "position_from_left": 25
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Exact examples calculated from the verified note, accidental, octave and MIDI rules.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT",
        "BK-W3C",
        "BK-ENHARMONIC"
      ]
    },
    {
      "query": "B#4",
      "preserve_display_spelling": "B#4",
      "midi": 72,
      "sounding_default_label": "C5",
      "color": "white",
      "position_explanation": "The white key C5; B#4 is not C4.",
      "layout_results": [
        {
          "layout_id": "88-key-A0-C8",
          "status": "in_range",
          "key_id": "pitch-72",
          "position_from_left": 52
        },
        {
          "layout_id": "61-key-C2-C7",
          "status": "in_range",
          "key_id": "pitch-72",
          "position_from_left": 37
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Exact examples calculated from the verified note, accidental, octave and MIDI rules.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT",
        "BK-W3C",
        "BK-ENHARMONIC"
      ]
    },
    {
      "query": "Cb4",
      "preserve_display_spelling": "Cb4",
      "midi": 59,
      "sounding_default_label": "B3",
      "color": "white",
      "position_explanation": "The white key B3; the flat stays attached to written C in octave 4.",
      "layout_results": [
        {
          "layout_id": "88-key-A0-C8",
          "status": "in_range",
          "key_id": "pitch-59",
          "position_from_left": 39
        },
        {
          "layout_id": "61-key-C2-C7",
          "status": "in_range",
          "key_id": "pitch-59",
          "position_from_left": 24
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Exact examples calculated from the verified note, accidental, octave and MIDI rules.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT",
        "BK-W3C",
        "BK-ENHARMONIC"
      ]
    },
    {
      "query": "Cb3",
      "preserve_display_spelling": "Cb3",
      "midi": 47,
      "sounding_default_label": "B2",
      "color": "white",
      "position_explanation": "The white key B2.",
      "layout_results": [
        {
          "layout_id": "88-key-A0-C8",
          "status": "in_range",
          "key_id": "pitch-47",
          "position_from_left": 27
        },
        {
          "layout_id": "61-key-C2-C7",
          "status": "in_range",
          "key_id": "pitch-47",
          "position_from_left": 12
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Exact examples calculated from the verified note, accidental, octave and MIDI rules.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT",
        "BK-W3C",
        "BK-ENHARMONIC"
      ]
    },
    {
      "query": "D8",
      "preserve_display_spelling": "D8",
      "midi": 110,
      "sounding_default_label": "D8",
      "color": "white",
      "position_explanation": "Above C8; not a key in either supplied layout.",
      "layout_results": [
        {
          "layout_id": "88-key-A0-C8",
          "status": "outside_selected_layout",
          "key_id": null,
          "position_from_left": null
        },
        {
          "layout_id": "61-key-C2-C7",
          "status": "outside_selected_layout",
          "key_id": null,
          "position_from_left": null
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Exact examples calculated from the verified note, accidental, octave and MIDI rules.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT",
        "BK-W3C",
        "BK-ENHARMONIC"
      ]
    }
  ],
  "ambiguous_queries": [
    {
      "query": "C",
      "behavior": "Show every matching note inside the selected layout, preserving the requested spelling; require an octave choice before selecting a single pitch.",
      "results": [
        {
          "layout_id": "88-key-A0-C8",
          "candidates": [
            "C1",
            "C2",
            "C3",
            "C4",
            "C5",
            "C6",
            "C7",
            "C8"
          ],
          "selected_note": null,
          "status": "choose_octave"
        },
        {
          "layout_id": "61-key-C2-C7",
          "candidates": [
            "C2",
            "C3",
            "C4",
            "C5",
            "C6",
            "C7"
          ],
          "selected_note": null,
          "status": "choose_octave"
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Original interaction rule applying verified pitch-class versus pitch distinction.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT"
      ]
    },
    {
      "query": "Ab",
      "behavior": "Show every matching note inside the selected layout, preserving the requested spelling; require an octave choice before selecting a single pitch.",
      "results": [
        {
          "layout_id": "88-key-A0-C8",
          "candidates": [
            "Ab1",
            "Ab2",
            "Ab3",
            "Ab4",
            "Ab5",
            "Ab6",
            "Ab7"
          ],
          "selected_note": null,
          "status": "choose_octave"
        },
        {
          "layout_id": "61-key-C2-C7",
          "candidates": [
            "Ab2",
            "Ab3",
            "Ab4",
            "Ab5",
            "Ab6"
          ],
          "selected_note": null,
          "status": "choose_octave"
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Original interaction rule applying verified pitch-class versus pitch distinction.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT"
      ]
    },
    {
      "query": "B#",
      "behavior": "Show every matching note inside the selected layout, preserving the requested spelling; require an octave choice before selecting a single pitch.",
      "results": [
        {
          "layout_id": "88-key-A0-C8",
          "candidates": [
            "B#0",
            "B#1",
            "B#2",
            "B#3",
            "B#4",
            "B#5",
            "B#6",
            "B#7"
          ],
          "selected_note": null,
          "status": "choose_octave"
        },
        {
          "layout_id": "61-key-C2-C7",
          "candidates": [
            "B#1",
            "B#2",
            "B#3",
            "B#4",
            "B#5",
            "B#6"
          ],
          "selected_note": null,
          "status": "choose_octave"
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Original interaction rule applying verified pitch-class versus pitch distinction.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT"
      ]
    },
    {
      "query": "Cb",
      "behavior": "Show every matching note inside the selected layout, preserving the requested spelling; require an octave choice before selecting a single pitch.",
      "results": [
        {
          "layout_id": "88-key-A0-C8",
          "candidates": [
            "Cb1",
            "Cb2",
            "Cb3",
            "Cb4",
            "Cb5",
            "Cb6",
            "Cb7",
            "Cb8"
          ],
          "selected_note": null,
          "status": "choose_octave"
        },
        {
          "layout_id": "61-key-C2-C7",
          "candidates": [
            "Cb3",
            "Cb4",
            "Cb5",
            "Cb6",
            "Cb7"
          ],
          "selected_note": null,
          "status": "choose_octave"
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Original interaction rule applying verified pitch-class versus pitch distinction.",
      "source_ids": [
        "BK-OMT",
        "BK-MIT"
      ]
    },
    {
      "query": "black piano key next to G",
      "behavior": "Ask which side of G, then which octave.",
      "choices": [
        {
          "direction": "lower / left of G",
          "names": [
            "F#",
            "Gb"
          ]
        },
        {
          "direction": "higher / right of G",
          "names": [
            "G#",
            "Ab"
          ]
        }
      ],
      "selected_note": null,
      "evidence_status": "[推断]",
      "basis": "Derived from the verified keyboard ordering; the query contains neither side nor octave.",
      "source_ids": [
        "BK-ENHARMONIC",
        "BK-OMT"
      ]
    }
  ],
  "query_rules": {
    "supported_input_examples": [
      "C",
      "C4",
      "F3",
      "A4",
      "A5",
      "C3",
      "Ab",
      "A-flat",
      "A♭4",
      "B#",
      "B-sharp3",
      "Cb",
      "C-flat4"
    ],
    "normalize_accidental_glyphs_and_words": true,
    "preserve_written_spelling": true,
    "no_octave_provided": "show choices; selected_note remains null",
    "outside_layout": "return outside_selected_layout with entered name and actual endpoints; do not clamp or transpose",
    "click_to_query_round_trip": "A keyboard click uses a default spelling; an explicit text spelling is preserved after resolving the same key_id.",
    "compound_or_chord_query": "ask for a single note rather than interpreting Cb as a chord",
    "internal_midi_not_a_feature": "MIDI IDs align data; no MIDI input or MIDI device feature is introduced"
  },
  "related_links": [
    {
      "url": "/keyboard-notes/labeled",
      "label": "Labeled keyboard and print reference"
    },
    {
      "url": "/keyboard-notes/chart",
      "label": "Match piano notes to the staff"
    },
    {
      "url": "/keyboard-notes/frequencies",
      "label": "Piano note frequencies"
    }
  ],
  "ui_copy": {
    "input_label": "Find a note",
    "input_placeholder": "Try F3, A4, C or A-flat",
    "choose_octave": "Which octave?",
    "which_side": "Which side of G?",
    "out_of_range": "This note is outside the selected keyboard range.",
    "play_note": "Play note",
    "stop": "Stop",
    "full_range": "Full keyboard range",
    "visible_range": "Currently showing"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P117 | content_data_prepared; rendering_pending | ['Click-to-name and text-to-key data for both defined ranges'] | ['Implement and verify matching visible result from this data'] |
| P118 | content_data_prepared; rendering_pending | ['88=52+36 and example61=36+25; specific ranges'] | ['Implement and verify matching visible result from this data'] |
| P120 | content_data_prepared; rendering_pending | ['A–G names plus 12 pitch classes and separate octave labels; link to chart'] | ['Implement and verify matching visible result from this data'] |
| P122 | content_data_prepared; rendering_pending | ['Complete ordered physical-key positions and grouping data'] | ['Implement and verify matching visible result from this data'] |
| P123 | content_data_prepared; rendering_pending | ['88 spans7octaves+3semitones;61 C2–C7 spans5'] | ['Implement and verify matching visible result from this data'] |
| P124 | content_data_prepared; rendering_pending | ['Pitch class versus particular octave; no piano-exclusive demand claim'] | ['Implement and verify matching visible result from this data'] |
| P127 | content_data_prepared; rendering_pending | ['All5 sharp/flat pairs; left/right ofG ambiguity'] | ['Implement and verify matching visible result from this data'] |
| P129 | content_data_prepared; rendering_pending | ['C1–C8 choices on88 and C2–C7 on61; middleC explicitlyC4'] | ['Implement and verify matching visible result from this data'] |
| P130 | content_data_prepared; rendering_pending | ['88 A0 and example61 C2'] | ['Implement and verify matching visible result from this data'] |
| P133 | content_data_prepared; rendering_pending | ['Ab octave choices preserve flat spelling'] | ['Implement and verify matching visible result from this data'] |
| P134 | content_data_prepared; rendering_pending | ['A4 exact key and octave; Hz task routes to frozen frequency page'] | ['Implement and verify matching visible result from this data'] |
| P138 | content_data_prepared; rendering_pending | ['B#3=C4 and B#4=C5 explicitly preserve spelling'] | ['Implement and verify matching visible result from this data'] |
| P139 | content_data_prepared; rendering_pending | ['F3 exact key in both supplied layouts'] | ['Implement and verify matching visible result from this data'] |
| P140 | content_data_prepared; rendering_pending | ['A5 exact key in both supplied layouts'] | ['Implement and verify matching visible result from this data'] |
| P141 | content_data_prepared; rendering_pending | ['C3 exact key in both supplied layouts'] | ['Implement and verify matching visible result from this data'] |
| P142 | content_data_prepared; rendering_pending | ['C8/C7 upper endpoints; D8 outside both ranges'] | ['Implement and verify matching visible result from this data'] |
| P147 | content_data_prepared; rendering_pending | ['Cb4=B3, retained as single note query'] | ['Implement and verify matching visible result from this data'] |

### 待确认

- BK-RENDER-QA — keyboard_visual_and_audio：[已核实] Ordered key and lookup data have been prepared; no website interaction or playback has been implemented or tested.；解决：Render each supplied layout and verify every click resolves to the same note as text lookup; test chosen range, preserved spellings and active-play behavior.

来源：BK-KORG, BK-ROLAND, BK-YAMAHA-COUNT, BK-YAMAHA-SPAN, BK-OMT, BK-MIT, BK-UTK, BK-W3C, BK-ENHARMONIC, BK-HOFFMAN

## /keyboard-notes/labeled

[已核实] 目标关键词：`keys on a piano keyboard labeled`；模板 T04；基线优先级：先做。
状态：`content_data_ready_print_asset_pending`；发布状态：未验收。

任务：Choose an accurate labeling reference matching the keyboard endpoints and prepare a readable print reference.

### 页面需回答的问题

- Which 88-key or61-key labeling diagram matches my instrument?
- How do octave suffixes distinguish repeated letters?
- Where do labels start on a C2–C7 61-key keyboard?
- How can I label real keys using the black-key groups?
- Is the printout a reference or a full-size sticker template?

### 英文页面内容

**Labeled Piano Keys: 88-Key and 61-Key References**

Match letter and octave labels to a defined 88-key or 61-key layout, with clear steps for labeling your keyboard.

#### Choose the layout that matches your keyboard

Start with the 88-key reference, A0–C8, or select the 61-key example, C2–C7. Both use letter names and an optional octave suffix, with middle C labeled C4. The 61-key chart describes this specific range; a key count alone does not establish the labels of every keyboard model. Compare the leftmost and rightmost notes with your instrument.

[已核实] 来源：BK-KORG, BK-ROLAND, BK-OMT, BK-MIT。 

#### Read letters and octave labels

The white keys repeat C–D–E–F–G–A–B within each numbered octave. Turn octave labels on to distinguish C3 from C4, or A4 from A5. The black-key labels show familiar sharp/flat pairs, such as F♯/G♭. An octave number identifies the note’s register; it is not a finger number or a scale degree.

[已核实] 来源：BK-OMT, BK-MIT, BK-ENHARMONIC。 

#### Label a small section first

First locate a group of two black keys and find the C immediately before it. Match that C to the correct octave in the reference. Next, label the following white keys D, E, F, G, A and B. Check the three-black-key group above F, G, A and B before continuing. Add the sharp/flat names only after the white-key labels match.

[推断] 来源：BK-YAMAHA-COUNT, BK-HOFFMAN, BK-ENHARMONIC, BK-OMT。 Original step order built from verified keyboard landmarks and note naming; no claim about a superior learning method.

#### Where to start on the 61-key example

For the C2–C7 layout, label the leftmost white key C2. Continue through B2, then begin C3, and repeat until the final C7. This layout has six C keys but spans five C-to-C octaves. On the A0–C8 layout, the first three keys are A0, A♯0/B♭0 and B0 before C1. Do not begin that layout with C.

[推断] 来源：BK-KORG, BK-ROLAND, BK-OMT, BK-MIT。 Step-by-step labeling and counts derived from the verified endpoints and complete ordered key data.

#### Print a reference you can read

Choose the same layout and octave-label setting for screen and print. Use the marked octave sections to read a long keyboard in smaller pieces. The printout is a reference diagram, not a full-size sticker template. If you use physical labels, match each one to the verified key before applying it and follow the label and instrument instructions for placement.

[推断] 来源：原创编辑建议。 Editorial instructions within the confirmed reference-print and physical-labeling task; dimensions, adhesives and manufacturer compatibility have not been established.

### 结构化数据

```json
{
  "layouts": [
    {
      "layout_id": "88-key-A0-C8",
      "label": "88 keys: A0–C8",
      "key_count": 88,
      "lowest_note": "A0",
      "highest_note": "C8",
      "midi_range": [
        21,
        108
      ],
      "range_source_ids": [
        "BK-KORG",
        "BK-YAMAHA-SPAN"
      ],
      "range_status": "[已核实]",
      "white_key_count": 52,
      "black_key_count": 36,
      "semitone_span": 87,
      "octave_span": {
        "complete_octave_intervals": 7,
        "remaining_semitones": 3,
        "exact_octave_ratio": 7.25
      },
      "middle_c_key_id": "pitch-60",
      "middle_c_position_from_left": 40,
      "keys": [
        {
          "key_id": "pitch-21",
          "position_from_left": 1,
          "midi": 21,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 0,
          "default_label": "A",
          "label_with_octave": "A0",
          "lookup_spellings": [
            "A0"
          ],
          "white_key_index": 0,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-22",
          "position_from_left": 2,
          "midi": 22,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 0,
          "default_label": "A# / Bb",
          "label_with_octave": "A#0 / Bb0",
          "lookup_spellings": [
            "A#0",
            "Bb0"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            0,
            1
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-23",
          "position_from_left": 3,
          "midi": 23,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 0,
          "default_label": "B",
          "label_with_octave": "B0",
          "lookup_spellings": [
            "B0",
            "Cb1"
          ],
          "white_key_index": 1,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-24",
          "position_from_left": 4,
          "midi": 24,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 1,
          "default_label": "C",
          "label_with_octave": "C1",
          "lookup_spellings": [
            "C1",
            "B#0"
          ],
          "white_key_index": 2,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-25",
          "position_from_left": 5,
          "midi": 25,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 1,
          "default_label": "C# / Db",
          "label_with_octave": "C#1 / Db1",
          "lookup_spellings": [
            "C#1",
            "Db1"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            2,
            3
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-26",
          "position_from_left": 6,
          "midi": 26,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 1,
          "default_label": "D",
          "label_with_octave": "D1",
          "lookup_spellings": [
            "D1"
          ],
          "white_key_index": 3,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-27",
          "position_from_left": 7,
          "midi": 27,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 1,
          "default_label": "D# / Eb",
          "label_with_octave": "D#1 / Eb1",
          "lookup_spellings": [
            "D#1",
            "Eb1"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            3,
            4
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-28",
          "position_from_left": 8,
          "midi": 28,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 1,
          "default_label": "E",
          "label_with_octave": "E1",
          "lookup_spellings": [
            "E1",
            "Fb1"
          ],
          "white_key_index": 4,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-29",
          "position_from_left": 9,
          "midi": 29,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 1,
          "default_label": "F",
          "label_with_octave": "F1",
          "lookup_spellings": [
            "F1",
            "E#1"
          ],
          "white_key_index": 5,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-30",
          "position_from_left": 10,
          "midi": 30,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 1,
          "default_label": "F# / Gb",
          "label_with_octave": "F#1 / Gb1",
          "lookup_spellings": [
            "F#1",
            "Gb1"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            5,
            6
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-31",
          "position_from_left": 11,
          "midi": 31,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 1,
          "default_label": "G",
          "label_with_octave": "G1",
          "lookup_spellings": [
            "G1"
          ],
          "white_key_index": 6,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-32",
          "position_from_left": 12,
          "midi": 32,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 1,
          "default_label": "G# / Ab",
          "label_with_octave": "G#1 / Ab1",
          "lookup_spellings": [
            "G#1",
            "Ab1"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            6,
            7
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-33",
          "position_from_left": 13,
          "midi": 33,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 1,
          "default_label": "A",
          "label_with_octave": "A1",
          "lookup_spellings": [
            "A1"
          ],
          "white_key_index": 7,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-34",
          "position_from_left": 14,
          "midi": 34,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 1,
          "default_label": "A# / Bb",
          "label_with_octave": "A#1 / Bb1",
          "lookup_spellings": [
            "A#1",
            "Bb1"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            7,
            8
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-35",
          "position_from_left": 15,
          "midi": 35,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 1,
          "default_label": "B",
          "label_with_octave": "B1",
          "lookup_spellings": [
            "B1",
            "Cb2"
          ],
          "white_key_index": 8,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-36",
          "position_from_left": 16,
          "midi": 36,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 2,
          "default_label": "C",
          "label_with_octave": "C2",
          "lookup_spellings": [
            "C2",
            "B#1"
          ],
          "white_key_index": 9,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-37",
          "position_from_left": 17,
          "midi": 37,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 2,
          "default_label": "C# / Db",
          "label_with_octave": "C#2 / Db2",
          "lookup_spellings": [
            "C#2",
            "Db2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            9,
            10
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-38",
          "position_from_left": 18,
          "midi": 38,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 2,
          "default_label": "D",
          "label_with_octave": "D2",
          "lookup_spellings": [
            "D2"
          ],
          "white_key_index": 10,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-39",
          "position_from_left": 19,
          "midi": 39,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 2,
          "default_label": "D# / Eb",
          "label_with_octave": "D#2 / Eb2",
          "lookup_spellings": [
            "D#2",
            "Eb2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            10,
            11
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-40",
          "position_from_left": 20,
          "midi": 40,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 2,
          "default_label": "E",
          "label_with_octave": "E2",
          "lookup_spellings": [
            "E2",
            "Fb2"
          ],
          "white_key_index": 11,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-41",
          "position_from_left": 21,
          "midi": 41,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 2,
          "default_label": "F",
          "label_with_octave": "F2",
          "lookup_spellings": [
            "F2",
            "E#2"
          ],
          "white_key_index": 12,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-42",
          "position_from_left": 22,
          "midi": 42,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 2,
          "default_label": "F# / Gb",
          "label_with_octave": "F#2 / Gb2",
          "lookup_spellings": [
            "F#2",
            "Gb2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            12,
            13
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-43",
          "position_from_left": 23,
          "midi": 43,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 2,
          "default_label": "G",
          "label_with_octave": "G2",
          "lookup_spellings": [
            "G2"
          ],
          "white_key_index": 13,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-44",
          "position_from_left": 24,
          "midi": 44,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 2,
          "default_label": "G# / Ab",
          "label_with_octave": "G#2 / Ab2",
          "lookup_spellings": [
            "G#2",
            "Ab2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            13,
            14
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-45",
          "position_from_left": 25,
          "midi": 45,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 2,
          "default_label": "A",
          "label_with_octave": "A2",
          "lookup_spellings": [
            "A2"
          ],
          "white_key_index": 14,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-46",
          "position_from_left": 26,
          "midi": 46,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 2,
          "default_label": "A# / Bb",
          "label_with_octave": "A#2 / Bb2",
          "lookup_spellings": [
            "A#2",
            "Bb2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            14,
            15
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-47",
          "position_from_left": 27,
          "midi": 47,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 2,
          "default_label": "B",
          "label_with_octave": "B2",
          "lookup_spellings": [
            "B2",
            "Cb3"
          ],
          "white_key_index": 15,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-48",
          "position_from_left": 28,
          "midi": 48,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 3,
          "default_label": "C",
          "label_with_octave": "C3",
          "lookup_spellings": [
            "C3",
            "B#2"
          ],
          "white_key_index": 16,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-49",
          "position_from_left": 29,
          "midi": 49,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 3,
          "default_label": "C# / Db",
          "label_with_octave": "C#3 / Db3",
          "lookup_spellings": [
            "C#3",
            "Db3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            16,
            17
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-50",
          "position_from_left": 30,
          "midi": 50,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 3,
          "default_label": "D",
          "label_with_octave": "D3",
          "lookup_spellings": [
            "D3"
          ],
          "white_key_index": 17,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-51",
          "position_from_left": 31,
          "midi": 51,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 3,
          "default_label": "D# / Eb",
          "label_with_octave": "D#3 / Eb3",
          "lookup_spellings": [
            "D#3",
            "Eb3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            17,
            18
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-52",
          "position_from_left": 32,
          "midi": 52,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 3,
          "default_label": "E",
          "label_with_octave": "E3",
          "lookup_spellings": [
            "E3",
            "Fb3"
          ],
          "white_key_index": 18,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-53",
          "position_from_left": 33,
          "midi": 53,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 3,
          "default_label": "F",
          "label_with_octave": "F3",
          "lookup_spellings": [
            "F3",
            "E#3"
          ],
          "white_key_index": 19,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-54",
          "position_from_left": 34,
          "midi": 54,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 3,
          "default_label": "F# / Gb",
          "label_with_octave": "F#3 / Gb3",
          "lookup_spellings": [
            "F#3",
            "Gb3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            19,
            20
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-55",
          "position_from_left": 35,
          "midi": 55,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 3,
          "default_label": "G",
          "label_with_octave": "G3",
          "lookup_spellings": [
            "G3"
          ],
          "white_key_index": 20,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-56",
          "position_from_left": 36,
          "midi": 56,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 3,
          "default_label": "G# / Ab",
          "label_with_octave": "G#3 / Ab3",
          "lookup_spellings": [
            "G#3",
            "Ab3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            20,
            21
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-57",
          "position_from_left": 37,
          "midi": 57,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 3,
          "default_label": "A",
          "label_with_octave": "A3",
          "lookup_spellings": [
            "A3"
          ],
          "white_key_index": 21,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-58",
          "position_from_left": 38,
          "midi": 58,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 3,
          "default_label": "A# / Bb",
          "label_with_octave": "A#3 / Bb3",
          "lookup_spellings": [
            "A#3",
            "Bb3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            21,
            22
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-59",
          "position_from_left": 39,
          "midi": 59,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 3,
          "default_label": "B",
          "label_with_octave": "B3",
          "lookup_spellings": [
            "B3",
            "Cb4"
          ],
          "white_key_index": 22,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-60",
          "position_from_left": 40,
          "midi": 60,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 4,
          "default_label": "C",
          "label_with_octave": "C4",
          "lookup_spellings": [
            "C4",
            "B#3"
          ],
          "white_key_index": 23,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-61",
          "position_from_left": 41,
          "midi": 61,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 4,
          "default_label": "C# / Db",
          "label_with_octave": "C#4 / Db4",
          "lookup_spellings": [
            "C#4",
            "Db4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            23,
            24
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-62",
          "position_from_left": 42,
          "midi": 62,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 4,
          "default_label": "D",
          "label_with_octave": "D4",
          "lookup_spellings": [
            "D4"
          ],
          "white_key_index": 24,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-63",
          "position_from_left": 43,
          "midi": 63,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 4,
          "default_label": "D# / Eb",
          "label_with_octave": "D#4 / Eb4",
          "lookup_spellings": [
            "D#4",
            "Eb4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            24,
            25
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-64",
          "position_from_left": 44,
          "midi": 64,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 4,
          "default_label": "E",
          "label_with_octave": "E4",
          "lookup_spellings": [
            "E4",
            "Fb4"
          ],
          "white_key_index": 25,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-65",
          "position_from_left": 45,
          "midi": 65,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 4,
          "default_label": "F",
          "label_with_octave": "F4",
          "lookup_spellings": [
            "F4",
            "E#4"
          ],
          "white_key_index": 26,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-66",
          "position_from_left": 46,
          "midi": 66,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 4,
          "default_label": "F# / Gb",
          "label_with_octave": "F#4 / Gb4",
          "lookup_spellings": [
            "F#4",
            "Gb4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            26,
            27
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-67",
          "position_from_left": 47,
          "midi": 67,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 4,
          "default_label": "G",
          "label_with_octave": "G4",
          "lookup_spellings": [
            "G4"
          ],
          "white_key_index": 27,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-68",
          "position_from_left": 48,
          "midi": 68,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 4,
          "default_label": "G# / Ab",
          "label_with_octave": "G#4 / Ab4",
          "lookup_spellings": [
            "G#4",
            "Ab4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            27,
            28
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-69",
          "position_from_left": 49,
          "midi": 69,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 4,
          "default_label": "A",
          "label_with_octave": "A4",
          "lookup_spellings": [
            "A4"
          ],
          "white_key_index": 28,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-70",
          "position_from_left": 50,
          "midi": 70,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 4,
          "default_label": "A# / Bb",
          "label_with_octave": "A#4 / Bb4",
          "lookup_spellings": [
            "A#4",
            "Bb4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            28,
            29
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-71",
          "position_from_left": 51,
          "midi": 71,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 4,
          "default_label": "B",
          "label_with_octave": "B4",
          "lookup_spellings": [
            "B4",
            "Cb5"
          ],
          "white_key_index": 29,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-72",
          "position_from_left": 52,
          "midi": 72,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 5,
          "default_label": "C",
          "label_with_octave": "C5",
          "lookup_spellings": [
            "C5",
            "B#4"
          ],
          "white_key_index": 30,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-73",
          "position_from_left": 53,
          "midi": 73,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 5,
          "default_label": "C# / Db",
          "label_with_octave": "C#5 / Db5",
          "lookup_spellings": [
            "C#5",
            "Db5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            30,
            31
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-74",
          "position_from_left": 54,
          "midi": 74,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 5,
          "default_label": "D",
          "label_with_octave": "D5",
          "lookup_spellings": [
            "D5"
          ],
          "white_key_index": 31,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-75",
          "position_from_left": 55,
          "midi": 75,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 5,
          "default_label": "D# / Eb",
          "label_with_octave": "D#5 / Eb5",
          "lookup_spellings": [
            "D#5",
            "Eb5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            31,
            32
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-76",
          "position_from_left": 56,
          "midi": 76,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 5,
          "default_label": "E",
          "label_with_octave": "E5",
          "lookup_spellings": [
            "E5",
            "Fb5"
          ],
          "white_key_index": 32,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-77",
          "position_from_left": 57,
          "midi": 77,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 5,
          "default_label": "F",
          "label_with_octave": "F5",
          "lookup_spellings": [
            "F5",
            "E#5"
          ],
          "white_key_index": 33,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-78",
          "position_from_left": 58,
          "midi": 78,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 5,
          "default_label": "F# / Gb",
          "label_with_octave": "F#5 / Gb5",
          "lookup_spellings": [
            "F#5",
            "Gb5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            33,
            34
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-79",
          "position_from_left": 59,
          "midi": 79,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 5,
          "default_label": "G",
          "label_with_octave": "G5",
          "lookup_spellings": [
            "G5"
          ],
          "white_key_index": 34,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-80",
          "position_from_left": 60,
          "midi": 80,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 5,
          "default_label": "G# / Ab",
          "label_with_octave": "G#5 / Ab5",
          "lookup_spellings": [
            "G#5",
            "Ab5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            34,
            35
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-81",
          "position_from_left": 61,
          "midi": 81,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 5,
          "default_label": "A",
          "label_with_octave": "A5",
          "lookup_spellings": [
            "A5"
          ],
          "white_key_index": 35,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-82",
          "position_from_left": 62,
          "midi": 82,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 5,
          "default_label": "A# / Bb",
          "label_with_octave": "A#5 / Bb5",
          "lookup_spellings": [
            "A#5",
            "Bb5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            35,
            36
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-83",
          "position_from_left": 63,
          "midi": 83,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 5,
          "default_label": "B",
          "label_with_octave": "B5",
          "lookup_spellings": [
            "B5",
            "Cb6"
          ],
          "white_key_index": 36,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-84",
          "position_from_left": 64,
          "midi": 84,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 6,
          "default_label": "C",
          "label_with_octave": "C6",
          "lookup_spellings": [
            "C6",
            "B#5"
          ],
          "white_key_index": 37,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-85",
          "position_from_left": 65,
          "midi": 85,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 6,
          "default_label": "C# / Db",
          "label_with_octave": "C#6 / Db6",
          "lookup_spellings": [
            "C#6",
            "Db6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            37,
            38
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-86",
          "position_from_left": 66,
          "midi": 86,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 6,
          "default_label": "D",
          "label_with_octave": "D6",
          "lookup_spellings": [
            "D6"
          ],
          "white_key_index": 38,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-87",
          "position_from_left": 67,
          "midi": 87,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 6,
          "default_label": "D# / Eb",
          "label_with_octave": "D#6 / Eb6",
          "lookup_spellings": [
            "D#6",
            "Eb6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            38,
            39
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-88",
          "position_from_left": 68,
          "midi": 88,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 6,
          "default_label": "E",
          "label_with_octave": "E6",
          "lookup_spellings": [
            "E6",
            "Fb6"
          ],
          "white_key_index": 39,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-89",
          "position_from_left": 69,
          "midi": 89,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 6,
          "default_label": "F",
          "label_with_octave": "F6",
          "lookup_spellings": [
            "F6",
            "E#6"
          ],
          "white_key_index": 40,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-90",
          "position_from_left": 70,
          "midi": 90,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 6,
          "default_label": "F# / Gb",
          "label_with_octave": "F#6 / Gb6",
          "lookup_spellings": [
            "F#6",
            "Gb6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            40,
            41
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-91",
          "position_from_left": 71,
          "midi": 91,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 6,
          "default_label": "G",
          "label_with_octave": "G6",
          "lookup_spellings": [
            "G6"
          ],
          "white_key_index": 41,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-92",
          "position_from_left": 72,
          "midi": 92,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 6,
          "default_label": "G# / Ab",
          "label_with_octave": "G#6 / Ab6",
          "lookup_spellings": [
            "G#6",
            "Ab6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            41,
            42
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-93",
          "position_from_left": 73,
          "midi": 93,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 6,
          "default_label": "A",
          "label_with_octave": "A6",
          "lookup_spellings": [
            "A6"
          ],
          "white_key_index": 42,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-94",
          "position_from_left": 74,
          "midi": 94,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 6,
          "default_label": "A# / Bb",
          "label_with_octave": "A#6 / Bb6",
          "lookup_spellings": [
            "A#6",
            "Bb6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            42,
            43
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-95",
          "position_from_left": 75,
          "midi": 95,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 6,
          "default_label": "B",
          "label_with_octave": "B6",
          "lookup_spellings": [
            "B6",
            "Cb7"
          ],
          "white_key_index": 43,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-96",
          "position_from_left": 76,
          "midi": 96,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 7,
          "default_label": "C",
          "label_with_octave": "C7",
          "lookup_spellings": [
            "C7",
            "B#6"
          ],
          "white_key_index": 44,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-97",
          "position_from_left": 77,
          "midi": 97,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 7,
          "default_label": "C# / Db",
          "label_with_octave": "C#7 / Db7",
          "lookup_spellings": [
            "C#7",
            "Db7"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            44,
            45
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-98",
          "position_from_left": 78,
          "midi": 98,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 7,
          "default_label": "D",
          "label_with_octave": "D7",
          "lookup_spellings": [
            "D7"
          ],
          "white_key_index": 45,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-99",
          "position_from_left": 79,
          "midi": 99,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 7,
          "default_label": "D# / Eb",
          "label_with_octave": "D#7 / Eb7",
          "lookup_spellings": [
            "D#7",
            "Eb7"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            45,
            46
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-100",
          "position_from_left": 80,
          "midi": 100,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 7,
          "default_label": "E",
          "label_with_octave": "E7",
          "lookup_spellings": [
            "E7",
            "Fb7"
          ],
          "white_key_index": 46,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-101",
          "position_from_left": 81,
          "midi": 101,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 7,
          "default_label": "F",
          "label_with_octave": "F7",
          "lookup_spellings": [
            "F7",
            "E#7"
          ],
          "white_key_index": 47,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-102",
          "position_from_left": 82,
          "midi": 102,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 7,
          "default_label": "F# / Gb",
          "label_with_octave": "F#7 / Gb7",
          "lookup_spellings": [
            "F#7",
            "Gb7"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            47,
            48
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-103",
          "position_from_left": 83,
          "midi": 103,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 7,
          "default_label": "G",
          "label_with_octave": "G7",
          "lookup_spellings": [
            "G7"
          ],
          "white_key_index": 48,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-104",
          "position_from_left": 84,
          "midi": 104,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 7,
          "default_label": "G# / Ab",
          "label_with_octave": "G#7 / Ab7",
          "lookup_spellings": [
            "G#7",
            "Ab7"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            48,
            49
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-105",
          "position_from_left": 85,
          "midi": 105,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 7,
          "default_label": "A",
          "label_with_octave": "A7",
          "lookup_spellings": [
            "A7"
          ],
          "white_key_index": 49,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-106",
          "position_from_left": 86,
          "midi": 106,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 7,
          "default_label": "A# / Bb",
          "label_with_octave": "A#7 / Bb7",
          "lookup_spellings": [
            "A#7",
            "Bb7"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            49,
            50
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-107",
          "position_from_left": 87,
          "midi": 107,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 7,
          "default_label": "B",
          "label_with_octave": "B7",
          "lookup_spellings": [
            "B7",
            "Cb8"
          ],
          "white_key_index": 50,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-108",
          "position_from_left": 88,
          "midi": 108,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 8,
          "default_label": "C",
          "label_with_octave": "C8",
          "lookup_spellings": [
            "C8",
            "B#7"
          ],
          "white_key_index": 51,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        }
      ],
      "reading_segments": [
        {
          "octave": 0,
          "first_key_id": "pitch-21",
          "last_key_id": "pitch-23",
          "label": "A0–B0",
          "key_count": 3,
          "midi_range": [
            21,
            23
          ]
        },
        {
          "octave": 1,
          "first_key_id": "pitch-24",
          "last_key_id": "pitch-35",
          "label": "C1–B1",
          "key_count": 12,
          "midi_range": [
            24,
            35
          ]
        },
        {
          "octave": 2,
          "first_key_id": "pitch-36",
          "last_key_id": "pitch-47",
          "label": "C2–B2",
          "key_count": 12,
          "midi_range": [
            36,
            47
          ]
        },
        {
          "octave": 3,
          "first_key_id": "pitch-48",
          "last_key_id": "pitch-59",
          "label": "C3–B3",
          "key_count": 12,
          "midi_range": [
            48,
            59
          ]
        },
        {
          "octave": 4,
          "first_key_id": "pitch-60",
          "last_key_id": "pitch-71",
          "label": "C4–B4",
          "key_count": 12,
          "midi_range": [
            60,
            71
          ]
        },
        {
          "octave": 5,
          "first_key_id": "pitch-72",
          "last_key_id": "pitch-83",
          "label": "C5–B5",
          "key_count": 12,
          "midi_range": [
            72,
            83
          ]
        },
        {
          "octave": 6,
          "first_key_id": "pitch-84",
          "last_key_id": "pitch-95",
          "label": "C6–B6",
          "key_count": 12,
          "midi_range": [
            84,
            95
          ]
        },
        {
          "octave": 7,
          "first_key_id": "pitch-96",
          "last_key_id": "pitch-107",
          "label": "C7–B7",
          "key_count": 12,
          "midi_range": [
            96,
            107
          ]
        },
        {
          "octave": 8,
          "first_key_id": "pitch-108",
          "last_key_id": "pitch-108",
          "label": "C8–C8",
          "key_count": 1,
          "midi_range": [
            108,
            108
          ]
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Enumerated each semitone within independently checked layout endpoints using verified C4=60 and named-note spelling rules. Counts, key positions and segmentation are calculated data, not inferred instrument dimensions.",
      "source_ids": [
        "BK-KORG",
        "BK-YAMAHA-SPAN",
        "BK-OMT",
        "BK-MIT",
        "BK-UTK",
        "BK-ENHARMONIC"
      ],
      "scope_note": "Standard A0–C8 88-key layout; does not describe every extended-range or historical piano."
    },
    {
      "layout_id": "61-key-C2-C7",
      "label": "61 keys: C2–C7",
      "key_count": 61,
      "lowest_note": "C2",
      "highest_note": "C7",
      "midi_range": [
        36,
        96
      ],
      "range_source_ids": [
        "BK-KORG",
        "BK-ROLAND"
      ],
      "range_status": "[已核实]",
      "white_key_count": 36,
      "black_key_count": 25,
      "semitone_span": 60,
      "octave_span": {
        "complete_octave_intervals": 5,
        "remaining_semitones": 0,
        "exact_octave_ratio": 5.0
      },
      "middle_c_key_id": "pitch-60",
      "middle_c_position_from_left": 25,
      "keys": [
        {
          "key_id": "pitch-36",
          "position_from_left": 1,
          "midi": 36,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 2,
          "default_label": "C",
          "label_with_octave": "C2",
          "lookup_spellings": [
            "C2",
            "B#1"
          ],
          "white_key_index": 0,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-37",
          "position_from_left": 2,
          "midi": 37,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 2,
          "default_label": "C# / Db",
          "label_with_octave": "C#2 / Db2",
          "lookup_spellings": [
            "C#2",
            "Db2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            0,
            1
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-38",
          "position_from_left": 3,
          "midi": 38,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 2,
          "default_label": "D",
          "label_with_octave": "D2",
          "lookup_spellings": [
            "D2"
          ],
          "white_key_index": 1,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-39",
          "position_from_left": 4,
          "midi": 39,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 2,
          "default_label": "D# / Eb",
          "label_with_octave": "D#2 / Eb2",
          "lookup_spellings": [
            "D#2",
            "Eb2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            1,
            2
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-40",
          "position_from_left": 5,
          "midi": 40,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 2,
          "default_label": "E",
          "label_with_octave": "E2",
          "lookup_spellings": [
            "E2",
            "Fb2"
          ],
          "white_key_index": 2,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-41",
          "position_from_left": 6,
          "midi": 41,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 2,
          "default_label": "F",
          "label_with_octave": "F2",
          "lookup_spellings": [
            "F2",
            "E#2"
          ],
          "white_key_index": 3,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-42",
          "position_from_left": 7,
          "midi": 42,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 2,
          "default_label": "F# / Gb",
          "label_with_octave": "F#2 / Gb2",
          "lookup_spellings": [
            "F#2",
            "Gb2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            3,
            4
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-43",
          "position_from_left": 8,
          "midi": 43,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 2,
          "default_label": "G",
          "label_with_octave": "G2",
          "lookup_spellings": [
            "G2"
          ],
          "white_key_index": 4,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-44",
          "position_from_left": 9,
          "midi": 44,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 2,
          "default_label": "G# / Ab",
          "label_with_octave": "G#2 / Ab2",
          "lookup_spellings": [
            "G#2",
            "Ab2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            4,
            5
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-45",
          "position_from_left": 10,
          "midi": 45,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 2,
          "default_label": "A",
          "label_with_octave": "A2",
          "lookup_spellings": [
            "A2"
          ],
          "white_key_index": 5,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-46",
          "position_from_left": 11,
          "midi": 46,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 2,
          "default_label": "A# / Bb",
          "label_with_octave": "A#2 / Bb2",
          "lookup_spellings": [
            "A#2",
            "Bb2"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            5,
            6
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-47",
          "position_from_left": 12,
          "midi": 47,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 2,
          "default_label": "B",
          "label_with_octave": "B2",
          "lookup_spellings": [
            "B2",
            "Cb3"
          ],
          "white_key_index": 6,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-48",
          "position_from_left": 13,
          "midi": 48,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 3,
          "default_label": "C",
          "label_with_octave": "C3",
          "lookup_spellings": [
            "C3",
            "B#2"
          ],
          "white_key_index": 7,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-49",
          "position_from_left": 14,
          "midi": 49,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 3,
          "default_label": "C# / Db",
          "label_with_octave": "C#3 / Db3",
          "lookup_spellings": [
            "C#3",
            "Db3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            7,
            8
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-50",
          "position_from_left": 15,
          "midi": 50,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 3,
          "default_label": "D",
          "label_with_octave": "D3",
          "lookup_spellings": [
            "D3"
          ],
          "white_key_index": 8,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-51",
          "position_from_left": 16,
          "midi": 51,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 3,
          "default_label": "D# / Eb",
          "label_with_octave": "D#3 / Eb3",
          "lookup_spellings": [
            "D#3",
            "Eb3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            8,
            9
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-52",
          "position_from_left": 17,
          "midi": 52,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 3,
          "default_label": "E",
          "label_with_octave": "E3",
          "lookup_spellings": [
            "E3",
            "Fb3"
          ],
          "white_key_index": 9,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-53",
          "position_from_left": 18,
          "midi": 53,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 3,
          "default_label": "F",
          "label_with_octave": "F3",
          "lookup_spellings": [
            "F3",
            "E#3"
          ],
          "white_key_index": 10,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-54",
          "position_from_left": 19,
          "midi": 54,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 3,
          "default_label": "F# / Gb",
          "label_with_octave": "F#3 / Gb3",
          "lookup_spellings": [
            "F#3",
            "Gb3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            10,
            11
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-55",
          "position_from_left": 20,
          "midi": 55,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 3,
          "default_label": "G",
          "label_with_octave": "G3",
          "lookup_spellings": [
            "G3"
          ],
          "white_key_index": 11,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-56",
          "position_from_left": 21,
          "midi": 56,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 3,
          "default_label": "G# / Ab",
          "label_with_octave": "G#3 / Ab3",
          "lookup_spellings": [
            "G#3",
            "Ab3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            11,
            12
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-57",
          "position_from_left": 22,
          "midi": 57,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 3,
          "default_label": "A",
          "label_with_octave": "A3",
          "lookup_spellings": [
            "A3"
          ],
          "white_key_index": 12,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-58",
          "position_from_left": 23,
          "midi": 58,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 3,
          "default_label": "A# / Bb",
          "label_with_octave": "A#3 / Bb3",
          "lookup_spellings": [
            "A#3",
            "Bb3"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            12,
            13
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-59",
          "position_from_left": 24,
          "midi": 59,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 3,
          "default_label": "B",
          "label_with_octave": "B3",
          "lookup_spellings": [
            "B3",
            "Cb4"
          ],
          "white_key_index": 13,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-60",
          "position_from_left": 25,
          "midi": 60,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 4,
          "default_label": "C",
          "label_with_octave": "C4",
          "lookup_spellings": [
            "C4",
            "B#3"
          ],
          "white_key_index": 14,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-61",
          "position_from_left": 26,
          "midi": 61,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 4,
          "default_label": "C# / Db",
          "label_with_octave": "C#4 / Db4",
          "lookup_spellings": [
            "C#4",
            "Db4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            14,
            15
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-62",
          "position_from_left": 27,
          "midi": 62,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 4,
          "default_label": "D",
          "label_with_octave": "D4",
          "lookup_spellings": [
            "D4"
          ],
          "white_key_index": 15,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-63",
          "position_from_left": 28,
          "midi": 63,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 4,
          "default_label": "D# / Eb",
          "label_with_octave": "D#4 / Eb4",
          "lookup_spellings": [
            "D#4",
            "Eb4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            15,
            16
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-64",
          "position_from_left": 29,
          "midi": 64,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 4,
          "default_label": "E",
          "label_with_octave": "E4",
          "lookup_spellings": [
            "E4",
            "Fb4"
          ],
          "white_key_index": 16,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-65",
          "position_from_left": 30,
          "midi": 65,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 4,
          "default_label": "F",
          "label_with_octave": "F4",
          "lookup_spellings": [
            "F4",
            "E#4"
          ],
          "white_key_index": 17,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-66",
          "position_from_left": 31,
          "midi": 66,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 4,
          "default_label": "F# / Gb",
          "label_with_octave": "F#4 / Gb4",
          "lookup_spellings": [
            "F#4",
            "Gb4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            17,
            18
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-67",
          "position_from_left": 32,
          "midi": 67,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 4,
          "default_label": "G",
          "label_with_octave": "G4",
          "lookup_spellings": [
            "G4"
          ],
          "white_key_index": 18,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-68",
          "position_from_left": 33,
          "midi": 68,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 4,
          "default_label": "G# / Ab",
          "label_with_octave": "G#4 / Ab4",
          "lookup_spellings": [
            "G#4",
            "Ab4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            18,
            19
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-69",
          "position_from_left": 34,
          "midi": 69,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 4,
          "default_label": "A",
          "label_with_octave": "A4",
          "lookup_spellings": [
            "A4"
          ],
          "white_key_index": 19,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-70",
          "position_from_left": 35,
          "midi": 70,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 4,
          "default_label": "A# / Bb",
          "label_with_octave": "A#4 / Bb4",
          "lookup_spellings": [
            "A#4",
            "Bb4"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            19,
            20
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-71",
          "position_from_left": 36,
          "midi": 71,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 4,
          "default_label": "B",
          "label_with_octave": "B4",
          "lookup_spellings": [
            "B4",
            "Cb5"
          ],
          "white_key_index": 20,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-72",
          "position_from_left": 37,
          "midi": 72,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 5,
          "default_label": "C",
          "label_with_octave": "C5",
          "lookup_spellings": [
            "C5",
            "B#4"
          ],
          "white_key_index": 21,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-73",
          "position_from_left": 38,
          "midi": 73,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 5,
          "default_label": "C# / Db",
          "label_with_octave": "C#5 / Db5",
          "lookup_spellings": [
            "C#5",
            "Db5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            21,
            22
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-74",
          "position_from_left": 39,
          "midi": 74,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 5,
          "default_label": "D",
          "label_with_octave": "D5",
          "lookup_spellings": [
            "D5"
          ],
          "white_key_index": 22,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-75",
          "position_from_left": 40,
          "midi": 75,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 5,
          "default_label": "D# / Eb",
          "label_with_octave": "D#5 / Eb5",
          "lookup_spellings": [
            "D#5",
            "Eb5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            22,
            23
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-76",
          "position_from_left": 41,
          "midi": 76,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 5,
          "default_label": "E",
          "label_with_octave": "E5",
          "lookup_spellings": [
            "E5",
            "Fb5"
          ],
          "white_key_index": 23,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-77",
          "position_from_left": 42,
          "midi": 77,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 5,
          "default_label": "F",
          "label_with_octave": "F5",
          "lookup_spellings": [
            "F5",
            "E#5"
          ],
          "white_key_index": 24,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-78",
          "position_from_left": 43,
          "midi": 78,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 5,
          "default_label": "F# / Gb",
          "label_with_octave": "F#5 / Gb5",
          "lookup_spellings": [
            "F#5",
            "Gb5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            24,
            25
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-79",
          "position_from_left": 44,
          "midi": 79,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 5,
          "default_label": "G",
          "label_with_octave": "G5",
          "lookup_spellings": [
            "G5"
          ],
          "white_key_index": 25,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-80",
          "position_from_left": 45,
          "midi": 80,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 5,
          "default_label": "G# / Ab",
          "label_with_octave": "G#5 / Ab5",
          "lookup_spellings": [
            "G#5",
            "Ab5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            25,
            26
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-81",
          "position_from_left": 46,
          "midi": 81,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 5,
          "default_label": "A",
          "label_with_octave": "A5",
          "lookup_spellings": [
            "A5"
          ],
          "white_key_index": 26,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-82",
          "position_from_left": 47,
          "midi": 82,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 5,
          "default_label": "A# / Bb",
          "label_with_octave": "A#5 / Bb5",
          "lookup_spellings": [
            "A#5",
            "Bb5"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            26,
            27
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-83",
          "position_from_left": 48,
          "midi": 83,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 5,
          "default_label": "B",
          "label_with_octave": "B5",
          "lookup_spellings": [
            "B5",
            "Cb6"
          ],
          "white_key_index": 27,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-84",
          "position_from_left": 49,
          "midi": 84,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 6,
          "default_label": "C",
          "label_with_octave": "C6",
          "lookup_spellings": [
            "C6",
            "B#5"
          ],
          "white_key_index": 28,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-85",
          "position_from_left": 50,
          "midi": 85,
          "pitch_class": 1,
          "color": "black",
          "sharp_label": "C#",
          "flat_label": "Db",
          "octave": 6,
          "default_label": "C# / Db",
          "label_with_octave": "C#6 / Db6",
          "lookup_spellings": [
            "C#6",
            "Db6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            28,
            29
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-86",
          "position_from_left": 51,
          "midi": 86,
          "pitch_class": 2,
          "color": "white",
          "sharp_label": "D",
          "flat_label": "D",
          "octave": 6,
          "default_label": "D",
          "label_with_octave": "D6",
          "lookup_spellings": [
            "D6"
          ],
          "white_key_index": 29,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-87",
          "position_from_left": 52,
          "midi": 87,
          "pitch_class": 3,
          "color": "black",
          "sharp_label": "D#",
          "flat_label": "Eb",
          "octave": 6,
          "default_label": "D# / Eb",
          "label_with_octave": "D#6 / Eb6",
          "lookup_spellings": [
            "D#6",
            "Eb6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            29,
            30
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-88",
          "position_from_left": 53,
          "midi": 88,
          "pitch_class": 4,
          "color": "white",
          "sharp_label": "E",
          "flat_label": "E",
          "octave": 6,
          "default_label": "E",
          "label_with_octave": "E6",
          "lookup_spellings": [
            "E6",
            "Fb6"
          ],
          "white_key_index": 30,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-89",
          "position_from_left": 54,
          "midi": 89,
          "pitch_class": 5,
          "color": "white",
          "sharp_label": "F",
          "flat_label": "F",
          "octave": 6,
          "default_label": "F",
          "label_with_octave": "F6",
          "lookup_spellings": [
            "F6",
            "E#6"
          ],
          "white_key_index": 31,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-90",
          "position_from_left": 55,
          "midi": 90,
          "pitch_class": 6,
          "color": "black",
          "sharp_label": "F#",
          "flat_label": "Gb",
          "octave": 6,
          "default_label": "F# / Gb",
          "label_with_octave": "F#6 / Gb6",
          "lookup_spellings": [
            "F#6",
            "Gb6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            31,
            32
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-91",
          "position_from_left": 56,
          "midi": 91,
          "pitch_class": 7,
          "color": "white",
          "sharp_label": "G",
          "flat_label": "G",
          "octave": 6,
          "default_label": "G",
          "label_with_octave": "G6",
          "lookup_spellings": [
            "G6"
          ],
          "white_key_index": 32,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-92",
          "position_from_left": 57,
          "midi": 92,
          "pitch_class": 8,
          "color": "black",
          "sharp_label": "G#",
          "flat_label": "Ab",
          "octave": 6,
          "default_label": "G# / Ab",
          "label_with_octave": "G#6 / Ab6",
          "lookup_spellings": [
            "G#6",
            "Ab6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            32,
            33
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-93",
          "position_from_left": 58,
          "midi": 93,
          "pitch_class": 9,
          "color": "white",
          "sharp_label": "A",
          "flat_label": "A",
          "octave": 6,
          "default_label": "A",
          "label_with_octave": "A6",
          "lookup_spellings": [
            "A6"
          ],
          "white_key_index": 33,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-94",
          "position_from_left": 59,
          "midi": 94,
          "pitch_class": 10,
          "color": "black",
          "sharp_label": "A#",
          "flat_label": "Bb",
          "octave": 6,
          "default_label": "A# / Bb",
          "label_with_octave": "A#6 / Bb6",
          "lookup_spellings": [
            "A#6",
            "Bb6"
          ],
          "white_key_index": null,
          "black_key_between_white_indices": [
            33,
            34
          ],
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-95",
          "position_from_left": 60,
          "midi": 95,
          "pitch_class": 11,
          "color": "white",
          "sharp_label": "B",
          "flat_label": "B",
          "octave": 6,
          "default_label": "B",
          "label_with_octave": "B6",
          "lookup_spellings": [
            "B6",
            "Cb7"
          ],
          "white_key_index": 34,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        },
        {
          "key_id": "pitch-96",
          "position_from_left": 61,
          "midi": 96,
          "pitch_class": 0,
          "color": "white",
          "sharp_label": "C",
          "flat_label": "C",
          "octave": 7,
          "default_label": "C",
          "label_with_octave": "C7",
          "lookup_spellings": [
            "C7",
            "B#6"
          ],
          "white_key_index": 35,
          "black_key_between_white_indices": null,
          "visible_numeric_label": null
        }
      ],
      "reading_segments": [
        {
          "octave": 2,
          "first_key_id": "pitch-36",
          "last_key_id": "pitch-47",
          "label": "C2–B2",
          "key_count": 12,
          "midi_range": [
            36,
            47
          ]
        },
        {
          "octave": 3,
          "first_key_id": "pitch-48",
          "last_key_id": "pitch-59",
          "label": "C3–B3",
          "key_count": 12,
          "midi_range": [
            48,
            59
          ]
        },
        {
          "octave": 4,
          "first_key_id": "pitch-60",
          "last_key_id": "pitch-71",
          "label": "C4–B4",
          "key_count": 12,
          "midi_range": [
            60,
            71
          ]
        },
        {
          "octave": 5,
          "first_key_id": "pitch-72",
          "last_key_id": "pitch-83",
          "label": "C5–B5",
          "key_count": 12,
          "midi_range": [
            72,
            83
          ]
        },
        {
          "octave": 6,
          "first_key_id": "pitch-84",
          "last_key_id": "pitch-95",
          "label": "C6–B6",
          "key_count": 12,
          "midi_range": [
            84,
            95
          ]
        },
        {
          "octave": 7,
          "first_key_id": "pitch-96",
          "last_key_id": "pitch-96",
          "label": "C7–C7",
          "key_count": 1,
          "midi_range": [
            96,
            96
          ]
        }
      ],
      "evidence_status": "[推断]",
      "basis": "Enumerated each semitone within independently checked layout endpoints using verified C4=60 and named-note spelling rules. Counts, key positions and segmentation are calculated data, not inferred instrument dimensions.",
      "source_ids": [
        "BK-KORG",
        "BK-ROLAND",
        "BK-OMT",
        "BK-MIT",
        "BK-UTK",
        "BK-ENHARMONIC"
      ],
      "scope_note": "Representative untransposed C2–C7 61-key layout; confirm instrument endpoints and naming convention before matching a real keyboard."
    }
  ],
  "notation_convention": {
    "system": "Scientific pitch notation with middle C=C4",
    "internal_pitch_reference": "C4=MIDI60; semitone increments are 1",
    "display_numeric_mode": "optional octave suffix only",
    "other_number_systems": null,
    "evidence_status": "[已核实]",
    "source_ids": [
      "BK-OMT",
      "BK-MIT",
      "BK-W3C"
    ],
    "boundary": "Internal MIDI/array positions are implementation data and must not become finger numbers, scale degrees, numbered notation, or an extra student numbering scheme."
  },
  "chromatic_cycle": [
    {
      "pitch_class": 0,
      "sharp_name": "C",
      "flat_name": "C",
      "color": "white"
    },
    {
      "pitch_class": 1,
      "sharp_name": "C#",
      "flat_name": "Db",
      "color": "black"
    },
    {
      "pitch_class": 2,
      "sharp_name": "D",
      "flat_name": "D",
      "color": "white"
    },
    {
      "pitch_class": 3,
      "sharp_name": "D#",
      "flat_name": "Eb",
      "color": "black"
    },
    {
      "pitch_class": 4,
      "sharp_name": "E",
      "flat_name": "E",
      "color": "white"
    },
    {
      "pitch_class": 5,
      "sharp_name": "F",
      "flat_name": "F",
      "color": "white"
    },
    {
      "pitch_class": 6,
      "sharp_name": "F#",
      "flat_name": "Gb",
      "color": "black"
    },
    {
      "pitch_class": 7,
      "sharp_name": "G",
      "flat_name": "G",
      "color": "white"
    },
    {
      "pitch_class": 8,
      "sharp_name": "G#",
      "flat_name": "Ab",
      "color": "black"
    },
    {
      "pitch_class": 9,
      "sharp_name": "A",
      "flat_name": "A",
      "color": "white"
    },
    {
      "pitch_class": 10,
      "sharp_name": "A#",
      "flat_name": "Bb",
      "color": "black"
    },
    {
      "pitch_class": 11,
      "sharp_name": "B",
      "flat_name": "B",
      "color": "white"
    }
  ],
  "chromatic_cycle_evidence": {
    "status": "[已核实]",
    "source_ids": [
      "BK-ENHARMONIC",
      "BK-YAMAHA-COUNT",
      "BK-MIT"
    ]
  },
  "black_key_groups": [
    {
      "sharp": "C#",
      "flat": "Db",
      "between_white_keys": [
        "C",
        "D"
      ],
      "group_size": 2,
      "position_in_group": 1
    },
    {
      "sharp": "D#",
      "flat": "Eb",
      "between_white_keys": [
        "D",
        "E"
      ],
      "group_size": 2,
      "position_in_group": 2
    },
    {
      "sharp": "F#",
      "flat": "Gb",
      "between_white_keys": [
        "F",
        "G"
      ],
      "group_size": 3,
      "position_in_group": 1
    },
    {
      "sharp": "G#",
      "flat": "Ab",
      "between_white_keys": [
        "G",
        "A"
      ],
      "group_size": 3,
      "position_in_group": 2
    },
    {
      "sharp": "A#",
      "flat": "Bb",
      "between_white_keys": [
        "A",
        "B"
      ],
      "group_size": 3,
      "position_in_group": 3
    }
  ],
  "layout_data_status": "[推断] 逐键数据由已核实端点与音名/八度/MIDI规则计算，已自检；不是实测琴键尺寸",
  "audio_assets": null,
  "print_assets": null,
  "fingering": null,
  "default_state": {
    "layout_id": "88-key-A0-C8",
    "label_mode": "letters_with_sharp_flat_pairs",
    "show_octave_suffix": true,
    "autoplay": false
  },
  "label_modes": [
    {
      "id": "letters_with_sharp_flat_pairs",
      "label": "Letters",
      "octave_suffix_optional": true
    }
  ],
  "how_to_label_steps": [
    {
      "step": 1,
      "action": "Confirm the instrument’s lowest/highest notes and choose the matching supplied reference.",
      "data_reference": "layouts"
    },
    {
      "step": 2,
      "action": "Locate C before a pair of black keys; choose the correct C octave.",
      "data_reference": "notation_convention"
    },
    {
      "step": 3,
      "action": "Match and label one C–D–E–F–G–A–B white-key group.",
      "data_reference": "layouts.keys"
    },
    {
      "step": 4,
      "action": "Check the F/G/A/B region against the group of three black keys.",
      "data_reference": "black_key_groups"
    },
    {
      "step": 5,
      "action": "Match the black-key pairs C#/Db, D#/Eb, F#/Gb, G#/Ab and A#/Bb.",
      "data_reference": "chromatic_cycle"
    },
    {
      "step": 6,
      "action": "Continue through the chosen range, keeping octave suffixes consistent; use the instrument/label instructions for any physical application.",
      "data_reference": "layouts.keys"
    }
  ],
  "print_payload": {
    "reference_only": true,
    "physical_scale": null,
    "sticker_dimensions": null,
    "layout_id_bound_to_selection": true,
    "octave_suffix_bound_to_selection": true,
    "segments_source": "selected layouts.reading_segments",
    "fields": [
      "title",
      "layout label and exact endpoints",
      "ordered key labels",
      "selected octave-label setting",
      "legend for sharp/flat pairs",
      "middle C marker",
      "reference diagram—not a full-size sticker template",
      "source IDs"
    ],
    "deliverable_status": "data_prepared; no PDF or printable graphic generated"
  },
  "sixty_one_specific": {
    "leftmost_note": "C2",
    "rightmost_note": "C7",
    "C_notes": [
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
      "C7"
    ],
    "middle_C_position_from_left": 25,
    "octave_intervals": 5,
    "evidence_status": "[推断]",
    "source_ids": [
      "BK-KORG",
      "BK-ROLAND",
      "BK-MIT"
    ],
    "scope": "Only the supplied C2–C7 reference; no automatic claim for all 61-key instruments"
  },
  "other_number_schemes": null,
  "other_keyboard_counts": null,
  "related_links": [
    {
      "url": "/keyboard-notes",
      "label": "Find an individual note"
    },
    {
      "url": "/keyboard-notes/chart",
      "label": "Notes on the staff"
    },
    {
      "url": "/keyboard-notes/finger-numbers",
      "label": "Learn finger numbers"
    }
  ],
  "ui_copy": {
    "layout": "Keyboard layout",
    "octave_numbers": "Show octave numbers",
    "zoom": "Zoom labels",
    "section": "Octave section",
    "print": "Print this reference",
    "pdf": "Download reference PDF",
    "print_button_activation": "only after a tested PDF/print asset exists"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P119 | content_data_prepared; rendering_pending | ['All88 and61 keys and optional octave suffix; screen-ready segmented labeling data'] | ['Implement and verify matching visible result from this data'] |
| P137 | partial_print_asset_pending | ['Complete print content/data prepared; no exportedPDF delivered'] | ['Generate and verify the original printable/PDF reference'] |
| P223 | content_data_prepared; rendering_pending | ['Six practical steps; verified keyboard landmarks; physical fit not assumed'] | ['Implement and verify matching visible result from this data'] |
| P241 | content_data_prepared; rendering_pending | ['C2 start/C7 end; stepwise61 labeling; only defined range'] | ['Implement and verify matching visible result from this data'] |

### 待确认

- BK-RENDER-QA — keyboard_visual_and_audio：[已核实] Ordered key and lookup data have been prepared; no website interaction or playback has been implemented or tested.；解决：Render each supplied layout and verify every click resolves to the same note as text lookup; test chosen range, preserved spellings and active-play behavior.
- BK-PRINT-ASSET — print_assets：[已核实] No 88/61-key print graphic or PDF file was generated in this content/data task. Printable keyword delivery is therefore partial.；解决：Generate original readable reference diagrams from the supplied key arrays and verify screen/print selection parity before enabling download.
- BK-STICKER-FIT — print_payload.sticker_dimensions：[已核实] No physical dimensions or material/adhesive compatibility for the user’s keyboard model have been established.；解决：Keep the output as a reference diagram. Do not claim a full-size sticker template or model-specific application instructions.
- BK-OTHER-NUMBERS — other_number_schemes：[已核实] Baseline does not define what an additional “with numbers” system means. Only optional octave suffixes are specified here.；解决：Retain the demand as undecided; do not substitute finger numbers, scale degrees or numbered notation.

来源：BK-KORG, BK-ROLAND, BK-YAMAHA-COUNT, BK-YAMAHA-SPAN, BK-OMT, BK-MIT, BK-UTK, BK-W3C, BK-ENHARMONIC, BK-HOFFMAN

## /keyboard-notes/chart

[已核实] 目标关键词：`piano notes chart`；模板 T05；基线优先级：先做。
状态：`content_and_mapping_ready_render_pending_solfege_reserved`；发布状态：未验收。

任务：知道谱上的音叫什么、对应哪一个琴键。

### 页面需回答的问题

- Which piano key matches this note on the staff?
- What are the treble and bass clef line and space notes?
- Where is middle C in each clef?
- How do ledger lines and octave numbers work?
- How does the C2-C7 61-key range compare with 88 keys?
- Can the selected note range be printed?
- Is do re mi available under a defined rule?

### 英文页面内容

**Piano Notes Chart: Staff, Note Names & Keyboard**

Match treble and bass clef notes to piano keys, find middle C, and compare note names across 88-key and C2-C7 keyboard ranges.

#### Match the note to the key

Start with middle C, labeled C4 here. It is one ledger line below the treble staff and one ledger line above the bass staff. Both spellings point to the same piano key. The clef changes where that pitch is written; it does not create a different middle C.

[已核实] 来源：BN-MUSICCA-CLEFS, BN-PUGET-OCTAVES。 

#### Treble clef: read from the bottom

The five treble-staff lines are E4, G4, B4, D5, and F5, read upward. The four spaces are F4, A4, C5, and E5. The curl of the clef identifies the G4 line. Use that anchor and the repeating musical alphabet to find nearby notes.

[已核实] 来源：BN-OMT-CLEFS, BN-MUSICCA-CLEFS, BN-MUSICCA-NOTES。 

#### Bass clef: a different set of positions

The bass-staff lines are G2, B2, D3, F3, and A3. Its spaces are A2, C3, E3, and G3. The two dots surround the F3 line. A note in the bottom space is therefore A2 in bass clef, while the bottom treble space is F4.

[已核实] 来源：BN-OMT-CLEFS, BN-MUSICCA-CLEFS, BN-PUGET-OCTAVES。 

#### Follow the lines beyond the staff

Ledger lines extend the same line-and-space sequence. D4 lies just below the treble staff without a ledger line; C4 uses the first ledger line below it. Above bass clef, B3 needs no ledger line, and C4 uses the first one. Keep octave numbers visible when comparing notes with the same letter.

[已核实] 来源：BN-MUSICCA-STAFF, BN-PUGET-OCTAVES, BN-OMT-CLEFS。 

#### Choose the range shown on your keyboard

The full-piano view uses the standard 88-key range A0-C8. The 61-key view here uses C2-C7, a layout documented by VOX and Roland. Check your instrument’s endpoints and transpose setting before using that view. A key-count setting changes the visible keyboard range; it does not rename the clefs.

[已核实] 来源：BN-YAMAHA-88, BN-VOX-61, BN-ROLAND-61, BN-MUSICCA-CLEFS。 

#### Try one note in both directions

Select C4 on the staff, then locate its highlighted key. Next, select G4 on the keyboard and read its treble position. Compare C3 with C4 to check the octave. For black keys, compare a sharp and a flat spelling while keeping the same physical key selected. Use the selected range for a readable printout.

[推断] 来源：BN-OMT-CLEFS, BN-MUSICCA-NOTES, BN-MUSICCA-ACCIDENTALS。 

### 结构化数据

```json
{
  "pitch_convention": {
    "name": "Scientific pitch notation; middle C = C4",
    "midi_anchor": {
      "note": "C4",
      "midi": 60
    },
    "evidence_status": "[已核实]",
    "source_ids": [
      "BN-MUSICCA-NOTES",
      "BN-PUGET-OCTAVES",
      "BN-BMT-MIDI"
    ]
  },
  "mapping_evidence": {
    "evidence_status": "[推断]",
    "basis": "根据已核实E4为高音谱第一线、G2为低音谱第一线、C4=MIDI60、自然字母顺序和升降半音规则运算完整映射；数值坐标为本站定义，已运行端点/线间/等音检查。",
    "source_ids": [
      "BN-OMT-CLEFS",
      "BN-MUSICCA-CLEFS",
      "BN-PUGET-OCTAVES",
      "BN-MUSICCA-NOTES",
      "BN-MUSICCA-ACCIDENTALS",
      "BN-BMT-MIDI"
    ]
  },
  "staff_coordinate_system": {
    "step_zero": "bottom staff line",
    "positive_direction": "up",
    "step_unit": "one diatonic letter step, i.e. adjacent line/space",
    "staff_line_steps": [
      0,
      2,
      4,
      6,
      8
    ],
    "staff_space_steps": [
      1,
      3,
      5,
      7
    ],
    "renderer_rule": "Set y = staff_bottom_y - staff_step * half_line_spacing. Accidentals affect pitch, not the letter-based staff coordinate. Ledger lines are explicit in each item."
  },
  "core_views": {
    "treble": {
      "range": [
        "C4",
        "C6"
      ],
      "natural_notes": [
        {
          "note": "C4",
          "letter": "C",
          "accidental": null,
          "octave": 4,
          "midi": 60,
          "clef": "treble",
          "staff_step_from_bottom_line": -2,
          "position": {
            "type": "ledger_line",
            "side": "below",
            "description": "below staff"
          },
          "ledger_line_steps": [
            -2
          ],
          "key_number_88": 40,
          "key_number_61_C2_C7": 25
        },
        {
          "note": "D4",
          "letter": "D",
          "accidental": null,
          "octave": 4,
          "midi": 62,
          "clef": "treble",
          "staff_step_from_bottom_line": -1,
          "position": {
            "type": "outer_space",
            "side": "below",
            "description": "below staff"
          },
          "ledger_line_steps": [],
          "key_number_88": 42,
          "key_number_61_C2_C7": 27
        },
        {
          "note": "E4",
          "letter": "E",
          "accidental": null,
          "octave": 4,
          "midi": 64,
          "clef": "treble",
          "staff_step_from_bottom_line": 0,
          "position": {
            "type": "line",
            "number_from_bottom": 1
          },
          "ledger_line_steps": [],
          "key_number_88": 44,
          "key_number_61_C2_C7": 29
        },
        {
          "note": "F4",
          "letter": "F",
          "accidental": null,
          "octave": 4,
          "midi": 65,
          "clef": "treble",
          "staff_step_from_bottom_line": 1,
          "position": {
            "type": "space",
            "number_from_bottom": 1
          },
          "ledger_line_steps": [],
          "key_number_88": 45,
          "key_number_61_C2_C7": 30
        },
        {
          "note": "G4",
          "letter": "G",
          "accidental": null,
          "octave": 4,
          "midi": 67,
          "clef": "treble",
          "staff_step_from_bottom_line": 2,
          "position": {
            "type": "line",
            "number_from_bottom": 2
          },
          "ledger_line_steps": [],
          "key_number_88": 47,
          "key_number_61_C2_C7": 32
        },
        {
          "note": "A4",
          "letter": "A",
          "accidental": null,
          "octave": 4,
          "midi": 69,
          "clef": "treble",
          "staff_step_from_bottom_line": 3,
          "position": {
            "type": "space",
            "number_from_bottom": 2
          },
          "ledger_line_steps": [],
          "key_number_88": 49,
          "key_number_61_C2_C7": 34
        },
        {
          "note": "B4",
          "letter": "B",
          "accidental": null,
          "octave": 4,
          "midi": 71,
          "clef": "treble",
          "staff_step_from_bottom_line": 4,
          "position": {
            "type": "line",
            "number_from_bottom": 3
          },
          "ledger_line_steps": [],
          "key_number_88": 51,
          "key_number_61_C2_C7": 36
        },
        {
          "note": "C5",
          "letter": "C",
          "accidental": null,
          "octave": 5,
          "midi": 72,
          "clef": "treble",
          "staff_step_from_bottom_line": 5,
          "position": {
            "type": "space",
            "number_from_bottom": 3
          },
          "ledger_line_steps": [],
          "key_number_88": 52,
          "key_number_61_C2_C7": 37
        },
        {
          "note": "D5",
          "letter": "D",
          "accidental": null,
          "octave": 5,
          "midi": 74,
          "clef": "treble",
          "staff_step_from_bottom_line": 6,
          "position": {
            "type": "line",
            "number_from_bottom": 4
          },
          "ledger_line_steps": [],
          "key_number_88": 54,
          "key_number_61_C2_C7": 39
        },
        {
          "note": "E5",
          "letter": "E",
          "accidental": null,
          "octave": 5,
          "midi": 76,
          "clef": "treble",
          "staff_step_from_bottom_line": 7,
          "position": {
            "type": "space",
            "number_from_bottom": 4
          },
          "ledger_line_steps": [],
          "key_number_88": 56,
          "key_number_61_C2_C7": 41
        },
        {
          "note": "F5",
          "letter": "F",
          "accidental": null,
          "octave": 5,
          "midi": 77,
          "clef": "treble",
          "staff_step_from_bottom_line": 8,
          "position": {
            "type": "line",
            "number_from_bottom": 5
          },
          "ledger_line_steps": [],
          "key_number_88": 57,
          "key_number_61_C2_C7": 42
        },
        {
          "note": "G5",
          "letter": "G",
          "accidental": null,
          "octave": 5,
          "midi": 79,
          "clef": "treble",
          "staff_step_from_bottom_line": 9,
          "position": {
            "type": "outer_space",
            "side": "above",
            "description": "above staff"
          },
          "ledger_line_steps": [],
          "key_number_88": 59,
          "key_number_61_C2_C7": 44
        },
        {
          "note": "A5",
          "letter": "A",
          "accidental": null,
          "octave": 5,
          "midi": 81,
          "clef": "treble",
          "staff_step_from_bottom_line": 10,
          "position": {
            "type": "ledger_line",
            "side": "above",
            "description": "above staff"
          },
          "ledger_line_steps": [
            10
          ],
          "key_number_88": 61,
          "key_number_61_C2_C7": 46
        },
        {
          "note": "B5",
          "letter": "B",
          "accidental": null,
          "octave": 5,
          "midi": 83,
          "clef": "treble",
          "staff_step_from_bottom_line": 11,
          "position": {
            "type": "outer_space",
            "side": "above",
            "description": "above staff"
          },
          "ledger_line_steps": [
            10
          ],
          "key_number_88": 63,
          "key_number_61_C2_C7": 48
        },
        {
          "note": "C6",
          "letter": "C",
          "accidental": null,
          "octave": 6,
          "midi": 84,
          "clef": "treble",
          "staff_step_from_bottom_line": 12,
          "position": {
            "type": "ledger_line",
            "side": "above",
            "description": "above staff"
          },
          "ledger_line_steps": [
            10,
            12
          ],
          "key_number_88": 64,
          "key_number_61_C2_C7": 49
        }
      ],
      "lines_bottom_to_top": [
        "E4",
        "G4",
        "B4",
        "D5",
        "F5"
      ],
      "spaces_bottom_to_top": [
        "F4",
        "A4",
        "C5",
        "E5"
      ]
    },
    "bass": {
      "range": [
        "C2",
        "C4"
      ],
      "natural_notes": [
        {
          "note": "C2",
          "letter": "C",
          "accidental": null,
          "octave": 2,
          "midi": 36,
          "clef": "bass",
          "staff_step_from_bottom_line": -4,
          "position": {
            "type": "ledger_line",
            "side": "below",
            "description": "below staff"
          },
          "ledger_line_steps": [
            -2,
            -4
          ],
          "key_number_88": 16,
          "key_number_61_C2_C7": 1
        },
        {
          "note": "D2",
          "letter": "D",
          "accidental": null,
          "octave": 2,
          "midi": 38,
          "clef": "bass",
          "staff_step_from_bottom_line": -3,
          "position": {
            "type": "outer_space",
            "side": "below",
            "description": "below staff"
          },
          "ledger_line_steps": [
            -2
          ],
          "key_number_88": 18,
          "key_number_61_C2_C7": 3
        },
        {
          "note": "E2",
          "letter": "E",
          "accidental": null,
          "octave": 2,
          "midi": 40,
          "clef": "bass",
          "staff_step_from_bottom_line": -2,
          "position": {
            "type": "ledger_line",
            "side": "below",
            "description": "below staff"
          },
          "ledger_line_steps": [
            -2
          ],
          "key_number_88": 20,
          "key_number_61_C2_C7": 5
        },
        {
          "note": "F2",
          "letter": "F",
          "accidental": null,
          "octave": 2,
          "midi": 41,
          "clef": "bass",
          "staff_step_from_bottom_line": -1,
          "position": {
            "type": "outer_space",
            "side": "below",
            "description": "below staff"
          },
          "ledger_line_steps": [],
          "key_number_88": 21,
          "key_number_61_C2_C7": 6
        },
        {
          "note": "G2",
          "letter": "G",
          "accidental": null,
          "octave": 2,
          "midi": 43,
          "clef": "bass",
          "staff_step_from_bottom_line": 0,
          "position": {
            "type": "line",
            "number_from_bottom": 1
          },
          "ledger_line_steps": [],
          "key_number_88": 23,
          "key_number_61_C2_C7": 8
        },
        {
          "note": "A2",
          "letter": "A",
          "accidental": null,
          "octave": 2,
          "midi": 45,
          "clef": "bass",
          "staff_step_from_bottom_line": 1,
          "position": {
            "type": "space",
            "number_from_bottom": 1
          },
          "ledger_line_steps": [],
          "key_number_88": 25,
          "key_number_61_C2_C7": 10
        },
        {
          "note": "B2",
          "letter": "B",
          "accidental": null,
          "octave": 2,
          "midi": 47,
          "clef": "bass",
          "staff_step_from_bottom_line": 2,
          "position": {
            "type": "line",
            "number_from_bottom": 2
          },
          "ledger_line_steps": [],
          "key_number_88": 27,
          "key_number_61_C2_C7": 12
        },
        {
          "note": "C3",
          "letter": "C",
          "accidental": null,
          "octave": 3,
          "midi": 48,
          "clef": "bass",
          "staff_step_from_bottom_line": 3,
          "position": {
            "type": "space",
            "number_from_bottom": 2
          },
          "ledger_line_steps": [],
          "key_number_88": 28,
          "key_number_61_C2_C7": 13
        },
        {
          "note": "D3",
          "letter": "D",
          "accidental": null,
          "octave": 3,
          "midi": 50,
          "clef": "bass",
          "staff_step_from_bottom_line": 4,
          "position": {
            "type": "line",
            "number_from_bottom": 3
          },
          "ledger_line_steps": [],
          "key_number_88": 30,
          "key_number_61_C2_C7": 15
        },
        {
          "note": "E3",
          "letter": "E",
          "accidental": null,
          "octave": 3,
          "midi": 52,
          "clef": "bass",
          "staff_step_from_bottom_line": 5,
          "position": {
            "type": "space",
            "number_from_bottom": 3
          },
          "ledger_line_steps": [],
          "key_number_88": 32,
          "key_number_61_C2_C7": 17
        },
        {
          "note": "F3",
          "letter": "F",
          "accidental": null,
          "octave": 3,
          "midi": 53,
          "clef": "bass",
          "staff_step_from_bottom_line": 6,
          "position": {
            "type": "line",
            "number_from_bottom": 4
          },
          "ledger_line_steps": [],
          "key_number_88": 33,
          "key_number_61_C2_C7": 18
        },
        {
          "note": "G3",
          "letter": "G",
          "accidental": null,
          "octave": 3,
          "midi": 55,
          "clef": "bass",
          "staff_step_from_bottom_line": 7,
          "position": {
            "type": "space",
            "number_from_bottom": 4
          },
          "ledger_line_steps": [],
          "key_number_88": 35,
          "key_number_61_C2_C7": 20
        },
        {
          "note": "A3",
          "letter": "A",
          "accidental": null,
          "octave": 3,
          "midi": 57,
          "clef": "bass",
          "staff_step_from_bottom_line": 8,
          "position": {
            "type": "line",
            "number_from_bottom": 5
          },
          "ledger_line_steps": [],
          "key_number_88": 37,
          "key_number_61_C2_C7": 22
        },
        {
          "note": "B3",
          "letter": "B",
          "accidental": null,
          "octave": 3,
          "midi": 59,
          "clef": "bass",
          "staff_step_from_bottom_line": 9,
          "position": {
            "type": "outer_space",
            "side": "above",
            "description": "above staff"
          },
          "ledger_line_steps": [],
          "key_number_88": 39,
          "key_number_61_C2_C7": 24
        },
        {
          "note": "C4",
          "letter": "C",
          "accidental": null,
          "octave": 4,
          "midi": 60,
          "clef": "bass",
          "staff_step_from_bottom_line": 10,
          "position": {
            "type": "ledger_line",
            "side": "above",
            "description": "above staff"
          },
          "ledger_line_steps": [
            10
          ],
          "key_number_88": 40,
          "key_number_61_C2_C7": 25
        }
      ],
      "lines_bottom_to_top": [
        "G2",
        "B2",
        "D3",
        "F3",
        "A3"
      ],
      "spaces_bottom_to_top": [
        "A2",
        "C3",
        "E3",
        "G3"
      ]
    }
  },
  "keyboard_notes": [
    {
      "key_number_88": 1,
      "midi": 21,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "A0"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "A0",
          "treble": {
            "note": "A0",
            "letter": "A",
            "accidental": null,
            "octave": 0,
            "midi": 21,
            "clef": "treble",
            "staff_step_from_bottom_line": -25,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20,
              -22,
              -24
            ],
            "key_number_88": 1,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "A0",
            "letter": "A",
            "accidental": null,
            "octave": 0,
            "midi": 21,
            "clef": "bass",
            "staff_step_from_bottom_line": -13,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12
            ],
            "key_number_88": 1,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 2,
      "midi": 22,
      "key_number_61_C2_C7": null,
      "color": "black",
      "display_names": [
        "A#0",
        "Bb0"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "A#0",
          "treble": {
            "note": "A#0",
            "letter": "A",
            "accidental": "#",
            "octave": 0,
            "midi": 22,
            "clef": "treble",
            "staff_step_from_bottom_line": -25,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20,
              -22,
              -24
            ],
            "key_number_88": 2,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "A#0",
            "letter": "A",
            "accidental": "#",
            "octave": 0,
            "midi": 22,
            "clef": "bass",
            "staff_step_from_bottom_line": -13,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12
            ],
            "key_number_88": 2,
            "key_number_61_C2_C7": null
          }
        },
        {
          "name": "Bb0",
          "treble": {
            "note": "Bb0",
            "letter": "B",
            "accidental": "b",
            "octave": 0,
            "midi": 22,
            "clef": "treble",
            "staff_step_from_bottom_line": -24,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20,
              -22,
              -24
            ],
            "key_number_88": 2,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "Bb0",
            "letter": "B",
            "accidental": "b",
            "octave": 0,
            "midi": 22,
            "clef": "bass",
            "staff_step_from_bottom_line": -12,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12
            ],
            "key_number_88": 2,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 3,
      "midi": 23,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "B0"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "B0",
          "treble": {
            "note": "B0",
            "letter": "B",
            "accidental": null,
            "octave": 0,
            "midi": 23,
            "clef": "treble",
            "staff_step_from_bottom_line": -24,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20,
              -22,
              -24
            ],
            "key_number_88": 3,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "B0",
            "letter": "B",
            "accidental": null,
            "octave": 0,
            "midi": 23,
            "clef": "bass",
            "staff_step_from_bottom_line": -12,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12
            ],
            "key_number_88": 3,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 4,
      "midi": 24,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "C1"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "C1",
          "treble": {
            "note": "C1",
            "letter": "C",
            "accidental": null,
            "octave": 1,
            "midi": 24,
            "clef": "treble",
            "staff_step_from_bottom_line": -23,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20,
              -22
            ],
            "key_number_88": 4,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "C1",
            "letter": "C",
            "accidental": null,
            "octave": 1,
            "midi": 24,
            "clef": "bass",
            "staff_step_from_bottom_line": -11,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10
            ],
            "key_number_88": 4,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 5,
      "midi": 25,
      "key_number_61_C2_C7": null,
      "color": "black",
      "display_names": [
        "C#1",
        "Db1"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "C#1",
          "treble": {
            "note": "C#1",
            "letter": "C",
            "accidental": "#",
            "octave": 1,
            "midi": 25,
            "clef": "treble",
            "staff_step_from_bottom_line": -23,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20,
              -22
            ],
            "key_number_88": 5,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "C#1",
            "letter": "C",
            "accidental": "#",
            "octave": 1,
            "midi": 25,
            "clef": "bass",
            "staff_step_from_bottom_line": -11,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10
            ],
            "key_number_88": 5,
            "key_number_61_C2_C7": null
          }
        },
        {
          "name": "Db1",
          "treble": {
            "note": "Db1",
            "letter": "D",
            "accidental": "b",
            "octave": 1,
            "midi": 25,
            "clef": "treble",
            "staff_step_from_bottom_line": -22,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20,
              -22
            ],
            "key_number_88": 5,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "Db1",
            "letter": "D",
            "accidental": "b",
            "octave": 1,
            "midi": 25,
            "clef": "bass",
            "staff_step_from_bottom_line": -10,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10
            ],
            "key_number_88": 5,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 6,
      "midi": 26,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "D1"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "D1",
          "treble": {
            "note": "D1",
            "letter": "D",
            "accidental": null,
            "octave": 1,
            "midi": 26,
            "clef": "treble",
            "staff_step_from_bottom_line": -22,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20,
              -22
            ],
            "key_number_88": 6,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "D1",
            "letter": "D",
            "accidental": null,
            "octave": 1,
            "midi": 26,
            "clef": "bass",
            "staff_step_from_bottom_line": -10,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10
            ],
            "key_number_88": 6,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 7,
      "midi": 27,
      "key_number_61_C2_C7": null,
      "color": "black",
      "display_names": [
        "D#1",
        "Eb1"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "D#1",
          "treble": {
            "note": "D#1",
            "letter": "D",
            "accidental": "#",
            "octave": 1,
            "midi": 27,
            "clef": "treble",
            "staff_step_from_bottom_line": -22,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20,
              -22
            ],
            "key_number_88": 7,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "D#1",
            "letter": "D",
            "accidental": "#",
            "octave": 1,
            "midi": 27,
            "clef": "bass",
            "staff_step_from_bottom_line": -10,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10
            ],
            "key_number_88": 7,
            "key_number_61_C2_C7": null
          }
        },
        {
          "name": "Eb1",
          "treble": {
            "note": "Eb1",
            "letter": "E",
            "accidental": "b",
            "octave": 1,
            "midi": 27,
            "clef": "treble",
            "staff_step_from_bottom_line": -21,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20
            ],
            "key_number_88": 7,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "Eb1",
            "letter": "E",
            "accidental": "b",
            "octave": 1,
            "midi": 27,
            "clef": "bass",
            "staff_step_from_bottom_line": -9,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8
            ],
            "key_number_88": 7,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 8,
      "midi": 28,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "E1"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "E1",
          "treble": {
            "note": "E1",
            "letter": "E",
            "accidental": null,
            "octave": 1,
            "midi": 28,
            "clef": "treble",
            "staff_step_from_bottom_line": -21,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20
            ],
            "key_number_88": 8,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "E1",
            "letter": "E",
            "accidental": null,
            "octave": 1,
            "midi": 28,
            "clef": "bass",
            "staff_step_from_bottom_line": -9,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8
            ],
            "key_number_88": 8,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 9,
      "midi": 29,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "F1"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "F1",
          "treble": {
            "note": "F1",
            "letter": "F",
            "accidental": null,
            "octave": 1,
            "midi": 29,
            "clef": "treble",
            "staff_step_from_bottom_line": -20,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20
            ],
            "key_number_88": 9,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "F1",
            "letter": "F",
            "accidental": null,
            "octave": 1,
            "midi": 29,
            "clef": "bass",
            "staff_step_from_bottom_line": -8,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8
            ],
            "key_number_88": 9,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 10,
      "midi": 30,
      "key_number_61_C2_C7": null,
      "color": "black",
      "display_names": [
        "F#1",
        "Gb1"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "F#1",
          "treble": {
            "note": "F#1",
            "letter": "F",
            "accidental": "#",
            "octave": 1,
            "midi": 30,
            "clef": "treble",
            "staff_step_from_bottom_line": -20,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18,
              -20
            ],
            "key_number_88": 10,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "F#1",
            "letter": "F",
            "accidental": "#",
            "octave": 1,
            "midi": 30,
            "clef": "bass",
            "staff_step_from_bottom_line": -8,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8
            ],
            "key_number_88": 10,
            "key_number_61_C2_C7": null
          }
        },
        {
          "name": "Gb1",
          "treble": {
            "note": "Gb1",
            "letter": "G",
            "accidental": "b",
            "octave": 1,
            "midi": 30,
            "clef": "treble",
            "staff_step_from_bottom_line": -19,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18
            ],
            "key_number_88": 10,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "Gb1",
            "letter": "G",
            "accidental": "b",
            "octave": 1,
            "midi": 30,
            "clef": "bass",
            "staff_step_from_bottom_line": -7,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6
            ],
            "key_number_88": 10,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 11,
      "midi": 31,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "G1"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "G1",
          "treble": {
            "note": "G1",
            "letter": "G",
            "accidental": null,
            "octave": 1,
            "midi": 31,
            "clef": "treble",
            "staff_step_from_bottom_line": -19,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18
            ],
            "key_number_88": 11,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "G1",
            "letter": "G",
            "accidental": null,
            "octave": 1,
            "midi": 31,
            "clef": "bass",
            "staff_step_from_bottom_line": -7,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6
            ],
            "key_number_88": 11,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 12,
      "midi": 32,
      "key_number_61_C2_C7": null,
      "color": "black",
      "display_names": [
        "G#1",
        "Ab1"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "G#1",
          "treble": {
            "note": "G#1",
            "letter": "G",
            "accidental": "#",
            "octave": 1,
            "midi": 32,
            "clef": "treble",
            "staff_step_from_bottom_line": -19,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18
            ],
            "key_number_88": 12,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "G#1",
            "letter": "G",
            "accidental": "#",
            "octave": 1,
            "midi": 32,
            "clef": "bass",
            "staff_step_from_bottom_line": -7,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6
            ],
            "key_number_88": 12,
            "key_number_61_C2_C7": null
          }
        },
        {
          "name": "Ab1",
          "treble": {
            "note": "Ab1",
            "letter": "A",
            "accidental": "b",
            "octave": 1,
            "midi": 32,
            "clef": "treble",
            "staff_step_from_bottom_line": -18,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18
            ],
            "key_number_88": 12,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "Ab1",
            "letter": "A",
            "accidental": "b",
            "octave": 1,
            "midi": 32,
            "clef": "bass",
            "staff_step_from_bottom_line": -6,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6
            ],
            "key_number_88": 12,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 13,
      "midi": 33,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "A1"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "A1",
          "treble": {
            "note": "A1",
            "letter": "A",
            "accidental": null,
            "octave": 1,
            "midi": 33,
            "clef": "treble",
            "staff_step_from_bottom_line": -18,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18
            ],
            "key_number_88": 13,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "A1",
            "letter": "A",
            "accidental": null,
            "octave": 1,
            "midi": 33,
            "clef": "bass",
            "staff_step_from_bottom_line": -6,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6
            ],
            "key_number_88": 13,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 14,
      "midi": 34,
      "key_number_61_C2_C7": null,
      "color": "black",
      "display_names": [
        "A#1",
        "Bb1"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "A#1",
          "treble": {
            "note": "A#1",
            "letter": "A",
            "accidental": "#",
            "octave": 1,
            "midi": 34,
            "clef": "treble",
            "staff_step_from_bottom_line": -18,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16,
              -18
            ],
            "key_number_88": 14,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "A#1",
            "letter": "A",
            "accidental": "#",
            "octave": 1,
            "midi": 34,
            "clef": "bass",
            "staff_step_from_bottom_line": -6,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6
            ],
            "key_number_88": 14,
            "key_number_61_C2_C7": null
          }
        },
        {
          "name": "Bb1",
          "treble": {
            "note": "Bb1",
            "letter": "B",
            "accidental": "b",
            "octave": 1,
            "midi": 34,
            "clef": "treble",
            "staff_step_from_bottom_line": -17,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16
            ],
            "key_number_88": 14,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "Bb1",
            "letter": "B",
            "accidental": "b",
            "octave": 1,
            "midi": 34,
            "clef": "bass",
            "staff_step_from_bottom_line": -5,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4
            ],
            "key_number_88": 14,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 15,
      "midi": 35,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "B1"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "B1",
          "treble": {
            "note": "B1",
            "letter": "B",
            "accidental": null,
            "octave": 1,
            "midi": 35,
            "clef": "treble",
            "staff_step_from_bottom_line": -17,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16
            ],
            "key_number_88": 15,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "B1",
            "letter": "B",
            "accidental": null,
            "octave": 1,
            "midi": 35,
            "clef": "bass",
            "staff_step_from_bottom_line": -5,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4
            ],
            "key_number_88": 15,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 16,
      "midi": 36,
      "key_number_61_C2_C7": 1,
      "color": "white",
      "display_names": [
        "C2"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "C2",
          "treble": {
            "note": "C2",
            "letter": "C",
            "accidental": null,
            "octave": 2,
            "midi": 36,
            "clef": "treble",
            "staff_step_from_bottom_line": -16,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16
            ],
            "key_number_88": 16,
            "key_number_61_C2_C7": 1
          },
          "bass": {
            "note": "C2",
            "letter": "C",
            "accidental": null,
            "octave": 2,
            "midi": 36,
            "clef": "bass",
            "staff_step_from_bottom_line": -4,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4
            ],
            "key_number_88": 16,
            "key_number_61_C2_C7": 1
          }
        }
      ]
    },
    {
      "key_number_88": 17,
      "midi": 37,
      "key_number_61_C2_C7": 2,
      "color": "black",
      "display_names": [
        "C#2",
        "Db2"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "C#2",
          "treble": {
            "note": "C#2",
            "letter": "C",
            "accidental": "#",
            "octave": 2,
            "midi": 37,
            "clef": "treble",
            "staff_step_from_bottom_line": -16,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14,
              -16
            ],
            "key_number_88": 17,
            "key_number_61_C2_C7": 2
          },
          "bass": {
            "note": "C#2",
            "letter": "C",
            "accidental": "#",
            "octave": 2,
            "midi": 37,
            "clef": "bass",
            "staff_step_from_bottom_line": -4,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4
            ],
            "key_number_88": 17,
            "key_number_61_C2_C7": 2
          }
        },
        {
          "name": "Db2",
          "treble": {
            "note": "Db2",
            "letter": "D",
            "accidental": "b",
            "octave": 2,
            "midi": 37,
            "clef": "treble",
            "staff_step_from_bottom_line": -15,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14
            ],
            "key_number_88": 17,
            "key_number_61_C2_C7": 2
          },
          "bass": {
            "note": "Db2",
            "letter": "D",
            "accidental": "b",
            "octave": 2,
            "midi": 37,
            "clef": "bass",
            "staff_step_from_bottom_line": -3,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2
            ],
            "key_number_88": 17,
            "key_number_61_C2_C7": 2
          }
        }
      ]
    },
    {
      "key_number_88": 18,
      "midi": 38,
      "key_number_61_C2_C7": 3,
      "color": "white",
      "display_names": [
        "D2"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "D2",
          "treble": {
            "note": "D2",
            "letter": "D",
            "accidental": null,
            "octave": 2,
            "midi": 38,
            "clef": "treble",
            "staff_step_from_bottom_line": -15,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14
            ],
            "key_number_88": 18,
            "key_number_61_C2_C7": 3
          },
          "bass": {
            "note": "D2",
            "letter": "D",
            "accidental": null,
            "octave": 2,
            "midi": 38,
            "clef": "bass",
            "staff_step_from_bottom_line": -3,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2
            ],
            "key_number_88": 18,
            "key_number_61_C2_C7": 3
          }
        }
      ]
    },
    {
      "key_number_88": 19,
      "midi": 39,
      "key_number_61_C2_C7": 4,
      "color": "black",
      "display_names": [
        "D#2",
        "Eb2"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "D#2",
          "treble": {
            "note": "D#2",
            "letter": "D",
            "accidental": "#",
            "octave": 2,
            "midi": 39,
            "clef": "treble",
            "staff_step_from_bottom_line": -15,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14
            ],
            "key_number_88": 19,
            "key_number_61_C2_C7": 4
          },
          "bass": {
            "note": "D#2",
            "letter": "D",
            "accidental": "#",
            "octave": 2,
            "midi": 39,
            "clef": "bass",
            "staff_step_from_bottom_line": -3,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2
            ],
            "key_number_88": 19,
            "key_number_61_C2_C7": 4
          }
        },
        {
          "name": "Eb2",
          "treble": {
            "note": "Eb2",
            "letter": "E",
            "accidental": "b",
            "octave": 2,
            "midi": 39,
            "clef": "treble",
            "staff_step_from_bottom_line": -14,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14
            ],
            "key_number_88": 19,
            "key_number_61_C2_C7": 4
          },
          "bass": {
            "note": "Eb2",
            "letter": "E",
            "accidental": "b",
            "octave": 2,
            "midi": 39,
            "clef": "bass",
            "staff_step_from_bottom_line": -2,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2
            ],
            "key_number_88": 19,
            "key_number_61_C2_C7": 4
          }
        }
      ]
    },
    {
      "key_number_88": 20,
      "midi": 40,
      "key_number_61_C2_C7": 5,
      "color": "white",
      "display_names": [
        "E2"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "E2",
          "treble": {
            "note": "E2",
            "letter": "E",
            "accidental": null,
            "octave": 2,
            "midi": 40,
            "clef": "treble",
            "staff_step_from_bottom_line": -14,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12,
              -14
            ],
            "key_number_88": 20,
            "key_number_61_C2_C7": 5
          },
          "bass": {
            "note": "E2",
            "letter": "E",
            "accidental": null,
            "octave": 2,
            "midi": 40,
            "clef": "bass",
            "staff_step_from_bottom_line": -2,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2
            ],
            "key_number_88": 20,
            "key_number_61_C2_C7": 5
          }
        }
      ]
    },
    {
      "key_number_88": 21,
      "midi": 41,
      "key_number_61_C2_C7": 6,
      "color": "white",
      "display_names": [
        "F2"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "F2",
          "treble": {
            "note": "F2",
            "letter": "F",
            "accidental": null,
            "octave": 2,
            "midi": 41,
            "clef": "treble",
            "staff_step_from_bottom_line": -13,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12
            ],
            "key_number_88": 21,
            "key_number_61_C2_C7": 6
          },
          "bass": {
            "note": "F2",
            "letter": "F",
            "accidental": null,
            "octave": 2,
            "midi": 41,
            "clef": "bass",
            "staff_step_from_bottom_line": -1,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [],
            "key_number_88": 21,
            "key_number_61_C2_C7": 6
          }
        }
      ]
    },
    {
      "key_number_88": 22,
      "midi": 42,
      "key_number_61_C2_C7": 7,
      "color": "black",
      "display_names": [
        "F#2",
        "Gb2"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "F#2",
          "treble": {
            "note": "F#2",
            "letter": "F",
            "accidental": "#",
            "octave": 2,
            "midi": 42,
            "clef": "treble",
            "staff_step_from_bottom_line": -13,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12
            ],
            "key_number_88": 22,
            "key_number_61_C2_C7": 7
          },
          "bass": {
            "note": "F#2",
            "letter": "F",
            "accidental": "#",
            "octave": 2,
            "midi": 42,
            "clef": "bass",
            "staff_step_from_bottom_line": -1,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [],
            "key_number_88": 22,
            "key_number_61_C2_C7": 7
          }
        },
        {
          "name": "Gb2",
          "treble": {
            "note": "Gb2",
            "letter": "G",
            "accidental": "b",
            "octave": 2,
            "midi": 42,
            "clef": "treble",
            "staff_step_from_bottom_line": -12,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12
            ],
            "key_number_88": 22,
            "key_number_61_C2_C7": 7
          },
          "bass": {
            "note": "Gb2",
            "letter": "G",
            "accidental": "b",
            "octave": 2,
            "midi": 42,
            "clef": "bass",
            "staff_step_from_bottom_line": 0,
            "position": {
              "type": "line",
              "number_from_bottom": 1
            },
            "ledger_line_steps": [],
            "key_number_88": 22,
            "key_number_61_C2_C7": 7
          }
        }
      ]
    },
    {
      "key_number_88": 23,
      "midi": 43,
      "key_number_61_C2_C7": 8,
      "color": "white",
      "display_names": [
        "G2"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "G2",
          "treble": {
            "note": "G2",
            "letter": "G",
            "accidental": null,
            "octave": 2,
            "midi": 43,
            "clef": "treble",
            "staff_step_from_bottom_line": -12,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12
            ],
            "key_number_88": 23,
            "key_number_61_C2_C7": 8
          },
          "bass": {
            "note": "G2",
            "letter": "G",
            "accidental": null,
            "octave": 2,
            "midi": 43,
            "clef": "bass",
            "staff_step_from_bottom_line": 0,
            "position": {
              "type": "line",
              "number_from_bottom": 1
            },
            "ledger_line_steps": [],
            "key_number_88": 23,
            "key_number_61_C2_C7": 8
          }
        }
      ]
    },
    {
      "key_number_88": 24,
      "midi": 44,
      "key_number_61_C2_C7": 9,
      "color": "black",
      "display_names": [
        "G#2",
        "Ab2"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "G#2",
          "treble": {
            "note": "G#2",
            "letter": "G",
            "accidental": "#",
            "octave": 2,
            "midi": 44,
            "clef": "treble",
            "staff_step_from_bottom_line": -12,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10,
              -12
            ],
            "key_number_88": 24,
            "key_number_61_C2_C7": 9
          },
          "bass": {
            "note": "G#2",
            "letter": "G",
            "accidental": "#",
            "octave": 2,
            "midi": 44,
            "clef": "bass",
            "staff_step_from_bottom_line": 0,
            "position": {
              "type": "line",
              "number_from_bottom": 1
            },
            "ledger_line_steps": [],
            "key_number_88": 24,
            "key_number_61_C2_C7": 9
          }
        },
        {
          "name": "Ab2",
          "treble": {
            "note": "Ab2",
            "letter": "A",
            "accidental": "b",
            "octave": 2,
            "midi": 44,
            "clef": "treble",
            "staff_step_from_bottom_line": -11,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10
            ],
            "key_number_88": 24,
            "key_number_61_C2_C7": 9
          },
          "bass": {
            "note": "Ab2",
            "letter": "A",
            "accidental": "b",
            "octave": 2,
            "midi": 44,
            "clef": "bass",
            "staff_step_from_bottom_line": 1,
            "position": {
              "type": "space",
              "number_from_bottom": 1
            },
            "ledger_line_steps": [],
            "key_number_88": 24,
            "key_number_61_C2_C7": 9
          }
        }
      ]
    },
    {
      "key_number_88": 25,
      "midi": 45,
      "key_number_61_C2_C7": 10,
      "color": "white",
      "display_names": [
        "A2"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "A2",
          "treble": {
            "note": "A2",
            "letter": "A",
            "accidental": null,
            "octave": 2,
            "midi": 45,
            "clef": "treble",
            "staff_step_from_bottom_line": -11,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10
            ],
            "key_number_88": 25,
            "key_number_61_C2_C7": 10
          },
          "bass": {
            "note": "A2",
            "letter": "A",
            "accidental": null,
            "octave": 2,
            "midi": 45,
            "clef": "bass",
            "staff_step_from_bottom_line": 1,
            "position": {
              "type": "space",
              "number_from_bottom": 1
            },
            "ledger_line_steps": [],
            "key_number_88": 25,
            "key_number_61_C2_C7": 10
          }
        }
      ]
    },
    {
      "key_number_88": 26,
      "midi": 46,
      "key_number_61_C2_C7": 11,
      "color": "black",
      "display_names": [
        "A#2",
        "Bb2"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "A#2",
          "treble": {
            "note": "A#2",
            "letter": "A",
            "accidental": "#",
            "octave": 2,
            "midi": 46,
            "clef": "treble",
            "staff_step_from_bottom_line": -11,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10
            ],
            "key_number_88": 26,
            "key_number_61_C2_C7": 11
          },
          "bass": {
            "note": "A#2",
            "letter": "A",
            "accidental": "#",
            "octave": 2,
            "midi": 46,
            "clef": "bass",
            "staff_step_from_bottom_line": 1,
            "position": {
              "type": "space",
              "number_from_bottom": 1
            },
            "ledger_line_steps": [],
            "key_number_88": 26,
            "key_number_61_C2_C7": 11
          }
        },
        {
          "name": "Bb2",
          "treble": {
            "note": "Bb2",
            "letter": "B",
            "accidental": "b",
            "octave": 2,
            "midi": 46,
            "clef": "treble",
            "staff_step_from_bottom_line": -10,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10
            ],
            "key_number_88": 26,
            "key_number_61_C2_C7": 11
          },
          "bass": {
            "note": "Bb2",
            "letter": "B",
            "accidental": "b",
            "octave": 2,
            "midi": 46,
            "clef": "bass",
            "staff_step_from_bottom_line": 2,
            "position": {
              "type": "line",
              "number_from_bottom": 2
            },
            "ledger_line_steps": [],
            "key_number_88": 26,
            "key_number_61_C2_C7": 11
          }
        }
      ]
    },
    {
      "key_number_88": 27,
      "midi": 47,
      "key_number_61_C2_C7": 12,
      "color": "white",
      "display_names": [
        "B2"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "B2",
          "treble": {
            "note": "B2",
            "letter": "B",
            "accidental": null,
            "octave": 2,
            "midi": 47,
            "clef": "treble",
            "staff_step_from_bottom_line": -10,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8,
              -10
            ],
            "key_number_88": 27,
            "key_number_61_C2_C7": 12
          },
          "bass": {
            "note": "B2",
            "letter": "B",
            "accidental": null,
            "octave": 2,
            "midi": 47,
            "clef": "bass",
            "staff_step_from_bottom_line": 2,
            "position": {
              "type": "line",
              "number_from_bottom": 2
            },
            "ledger_line_steps": [],
            "key_number_88": 27,
            "key_number_61_C2_C7": 12
          }
        }
      ]
    },
    {
      "key_number_88": 28,
      "midi": 48,
      "key_number_61_C2_C7": 13,
      "color": "white",
      "display_names": [
        "C3"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "C3",
          "treble": {
            "note": "C3",
            "letter": "C",
            "accidental": null,
            "octave": 3,
            "midi": 48,
            "clef": "treble",
            "staff_step_from_bottom_line": -9,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8
            ],
            "key_number_88": 28,
            "key_number_61_C2_C7": 13
          },
          "bass": {
            "note": "C3",
            "letter": "C",
            "accidental": null,
            "octave": 3,
            "midi": 48,
            "clef": "bass",
            "staff_step_from_bottom_line": 3,
            "position": {
              "type": "space",
              "number_from_bottom": 2
            },
            "ledger_line_steps": [],
            "key_number_88": 28,
            "key_number_61_C2_C7": 13
          }
        }
      ]
    },
    {
      "key_number_88": 29,
      "midi": 49,
      "key_number_61_C2_C7": 14,
      "color": "black",
      "display_names": [
        "C#3",
        "Db3"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "C#3",
          "treble": {
            "note": "C#3",
            "letter": "C",
            "accidental": "#",
            "octave": 3,
            "midi": 49,
            "clef": "treble",
            "staff_step_from_bottom_line": -9,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8
            ],
            "key_number_88": 29,
            "key_number_61_C2_C7": 14
          },
          "bass": {
            "note": "C#3",
            "letter": "C",
            "accidental": "#",
            "octave": 3,
            "midi": 49,
            "clef": "bass",
            "staff_step_from_bottom_line": 3,
            "position": {
              "type": "space",
              "number_from_bottom": 2
            },
            "ledger_line_steps": [],
            "key_number_88": 29,
            "key_number_61_C2_C7": 14
          }
        },
        {
          "name": "Db3",
          "treble": {
            "note": "Db3",
            "letter": "D",
            "accidental": "b",
            "octave": 3,
            "midi": 49,
            "clef": "treble",
            "staff_step_from_bottom_line": -8,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8
            ],
            "key_number_88": 29,
            "key_number_61_C2_C7": 14
          },
          "bass": {
            "note": "Db3",
            "letter": "D",
            "accidental": "b",
            "octave": 3,
            "midi": 49,
            "clef": "bass",
            "staff_step_from_bottom_line": 4,
            "position": {
              "type": "line",
              "number_from_bottom": 3
            },
            "ledger_line_steps": [],
            "key_number_88": 29,
            "key_number_61_C2_C7": 14
          }
        }
      ]
    },
    {
      "key_number_88": 30,
      "midi": 50,
      "key_number_61_C2_C7": 15,
      "color": "white",
      "display_names": [
        "D3"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "D3",
          "treble": {
            "note": "D3",
            "letter": "D",
            "accidental": null,
            "octave": 3,
            "midi": 50,
            "clef": "treble",
            "staff_step_from_bottom_line": -8,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8
            ],
            "key_number_88": 30,
            "key_number_61_C2_C7": 15
          },
          "bass": {
            "note": "D3",
            "letter": "D",
            "accidental": null,
            "octave": 3,
            "midi": 50,
            "clef": "bass",
            "staff_step_from_bottom_line": 4,
            "position": {
              "type": "line",
              "number_from_bottom": 3
            },
            "ledger_line_steps": [],
            "key_number_88": 30,
            "key_number_61_C2_C7": 15
          }
        }
      ]
    },
    {
      "key_number_88": 31,
      "midi": 51,
      "key_number_61_C2_C7": 16,
      "color": "black",
      "display_names": [
        "D#3",
        "Eb3"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "D#3",
          "treble": {
            "note": "D#3",
            "letter": "D",
            "accidental": "#",
            "octave": 3,
            "midi": 51,
            "clef": "treble",
            "staff_step_from_bottom_line": -8,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6,
              -8
            ],
            "key_number_88": 31,
            "key_number_61_C2_C7": 16
          },
          "bass": {
            "note": "D#3",
            "letter": "D",
            "accidental": "#",
            "octave": 3,
            "midi": 51,
            "clef": "bass",
            "staff_step_from_bottom_line": 4,
            "position": {
              "type": "line",
              "number_from_bottom": 3
            },
            "ledger_line_steps": [],
            "key_number_88": 31,
            "key_number_61_C2_C7": 16
          }
        },
        {
          "name": "Eb3",
          "treble": {
            "note": "Eb3",
            "letter": "E",
            "accidental": "b",
            "octave": 3,
            "midi": 51,
            "clef": "treble",
            "staff_step_from_bottom_line": -7,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6
            ],
            "key_number_88": 31,
            "key_number_61_C2_C7": 16
          },
          "bass": {
            "note": "Eb3",
            "letter": "E",
            "accidental": "b",
            "octave": 3,
            "midi": 51,
            "clef": "bass",
            "staff_step_from_bottom_line": 5,
            "position": {
              "type": "space",
              "number_from_bottom": 3
            },
            "ledger_line_steps": [],
            "key_number_88": 31,
            "key_number_61_C2_C7": 16
          }
        }
      ]
    },
    {
      "key_number_88": 32,
      "midi": 52,
      "key_number_61_C2_C7": 17,
      "color": "white",
      "display_names": [
        "E3"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "E3",
          "treble": {
            "note": "E3",
            "letter": "E",
            "accidental": null,
            "octave": 3,
            "midi": 52,
            "clef": "treble",
            "staff_step_from_bottom_line": -7,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6
            ],
            "key_number_88": 32,
            "key_number_61_C2_C7": 17
          },
          "bass": {
            "note": "E3",
            "letter": "E",
            "accidental": null,
            "octave": 3,
            "midi": 52,
            "clef": "bass",
            "staff_step_from_bottom_line": 5,
            "position": {
              "type": "space",
              "number_from_bottom": 3
            },
            "ledger_line_steps": [],
            "key_number_88": 32,
            "key_number_61_C2_C7": 17
          }
        }
      ]
    },
    {
      "key_number_88": 33,
      "midi": 53,
      "key_number_61_C2_C7": 18,
      "color": "white",
      "display_names": [
        "F3"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "F3",
          "treble": {
            "note": "F3",
            "letter": "F",
            "accidental": null,
            "octave": 3,
            "midi": 53,
            "clef": "treble",
            "staff_step_from_bottom_line": -6,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6
            ],
            "key_number_88": 33,
            "key_number_61_C2_C7": 18
          },
          "bass": {
            "note": "F3",
            "letter": "F",
            "accidental": null,
            "octave": 3,
            "midi": 53,
            "clef": "bass",
            "staff_step_from_bottom_line": 6,
            "position": {
              "type": "line",
              "number_from_bottom": 4
            },
            "ledger_line_steps": [],
            "key_number_88": 33,
            "key_number_61_C2_C7": 18
          }
        }
      ]
    },
    {
      "key_number_88": 34,
      "midi": 54,
      "key_number_61_C2_C7": 19,
      "color": "black",
      "display_names": [
        "F#3",
        "Gb3"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "F#3",
          "treble": {
            "note": "F#3",
            "letter": "F",
            "accidental": "#",
            "octave": 3,
            "midi": 54,
            "clef": "treble",
            "staff_step_from_bottom_line": -6,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4,
              -6
            ],
            "key_number_88": 34,
            "key_number_61_C2_C7": 19
          },
          "bass": {
            "note": "F#3",
            "letter": "F",
            "accidental": "#",
            "octave": 3,
            "midi": 54,
            "clef": "bass",
            "staff_step_from_bottom_line": 6,
            "position": {
              "type": "line",
              "number_from_bottom": 4
            },
            "ledger_line_steps": [],
            "key_number_88": 34,
            "key_number_61_C2_C7": 19
          }
        },
        {
          "name": "Gb3",
          "treble": {
            "note": "Gb3",
            "letter": "G",
            "accidental": "b",
            "octave": 3,
            "midi": 54,
            "clef": "treble",
            "staff_step_from_bottom_line": -5,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4
            ],
            "key_number_88": 34,
            "key_number_61_C2_C7": 19
          },
          "bass": {
            "note": "Gb3",
            "letter": "G",
            "accidental": "b",
            "octave": 3,
            "midi": 54,
            "clef": "bass",
            "staff_step_from_bottom_line": 7,
            "position": {
              "type": "space",
              "number_from_bottom": 4
            },
            "ledger_line_steps": [],
            "key_number_88": 34,
            "key_number_61_C2_C7": 19
          }
        }
      ]
    },
    {
      "key_number_88": 35,
      "midi": 55,
      "key_number_61_C2_C7": 20,
      "color": "white",
      "display_names": [
        "G3"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "G3",
          "treble": {
            "note": "G3",
            "letter": "G",
            "accidental": null,
            "octave": 3,
            "midi": 55,
            "clef": "treble",
            "staff_step_from_bottom_line": -5,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4
            ],
            "key_number_88": 35,
            "key_number_61_C2_C7": 20
          },
          "bass": {
            "note": "G3",
            "letter": "G",
            "accidental": null,
            "octave": 3,
            "midi": 55,
            "clef": "bass",
            "staff_step_from_bottom_line": 7,
            "position": {
              "type": "space",
              "number_from_bottom": 4
            },
            "ledger_line_steps": [],
            "key_number_88": 35,
            "key_number_61_C2_C7": 20
          }
        }
      ]
    },
    {
      "key_number_88": 36,
      "midi": 56,
      "key_number_61_C2_C7": 21,
      "color": "black",
      "display_names": [
        "G#3",
        "Ab3"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "G#3",
          "treble": {
            "note": "G#3",
            "letter": "G",
            "accidental": "#",
            "octave": 3,
            "midi": 56,
            "clef": "treble",
            "staff_step_from_bottom_line": -5,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4
            ],
            "key_number_88": 36,
            "key_number_61_C2_C7": 21
          },
          "bass": {
            "note": "G#3",
            "letter": "G",
            "accidental": "#",
            "octave": 3,
            "midi": 56,
            "clef": "bass",
            "staff_step_from_bottom_line": 7,
            "position": {
              "type": "space",
              "number_from_bottom": 4
            },
            "ledger_line_steps": [],
            "key_number_88": 36,
            "key_number_61_C2_C7": 21
          }
        },
        {
          "name": "Ab3",
          "treble": {
            "note": "Ab3",
            "letter": "A",
            "accidental": "b",
            "octave": 3,
            "midi": 56,
            "clef": "treble",
            "staff_step_from_bottom_line": -4,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4
            ],
            "key_number_88": 36,
            "key_number_61_C2_C7": 21
          },
          "bass": {
            "note": "Ab3",
            "letter": "A",
            "accidental": "b",
            "octave": 3,
            "midi": 56,
            "clef": "bass",
            "staff_step_from_bottom_line": 8,
            "position": {
              "type": "line",
              "number_from_bottom": 5
            },
            "ledger_line_steps": [],
            "key_number_88": 36,
            "key_number_61_C2_C7": 21
          }
        }
      ]
    },
    {
      "key_number_88": 37,
      "midi": 57,
      "key_number_61_C2_C7": 22,
      "color": "white",
      "display_names": [
        "A3"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "A3",
          "treble": {
            "note": "A3",
            "letter": "A",
            "accidental": null,
            "octave": 3,
            "midi": 57,
            "clef": "treble",
            "staff_step_from_bottom_line": -4,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4
            ],
            "key_number_88": 37,
            "key_number_61_C2_C7": 22
          },
          "bass": {
            "note": "A3",
            "letter": "A",
            "accidental": null,
            "octave": 3,
            "midi": 57,
            "clef": "bass",
            "staff_step_from_bottom_line": 8,
            "position": {
              "type": "line",
              "number_from_bottom": 5
            },
            "ledger_line_steps": [],
            "key_number_88": 37,
            "key_number_61_C2_C7": 22
          }
        }
      ]
    },
    {
      "key_number_88": 38,
      "midi": 58,
      "key_number_61_C2_C7": 23,
      "color": "black",
      "display_names": [
        "A#3",
        "Bb3"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "A#3",
          "treble": {
            "note": "A#3",
            "letter": "A",
            "accidental": "#",
            "octave": 3,
            "midi": 58,
            "clef": "treble",
            "staff_step_from_bottom_line": -4,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2,
              -4
            ],
            "key_number_88": 38,
            "key_number_61_C2_C7": 23
          },
          "bass": {
            "note": "A#3",
            "letter": "A",
            "accidental": "#",
            "octave": 3,
            "midi": 58,
            "clef": "bass",
            "staff_step_from_bottom_line": 8,
            "position": {
              "type": "line",
              "number_from_bottom": 5
            },
            "ledger_line_steps": [],
            "key_number_88": 38,
            "key_number_61_C2_C7": 23
          }
        },
        {
          "name": "Bb3",
          "treble": {
            "note": "Bb3",
            "letter": "B",
            "accidental": "b",
            "octave": 3,
            "midi": 58,
            "clef": "treble",
            "staff_step_from_bottom_line": -3,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2
            ],
            "key_number_88": 38,
            "key_number_61_C2_C7": 23
          },
          "bass": {
            "note": "Bb3",
            "letter": "B",
            "accidental": "b",
            "octave": 3,
            "midi": 58,
            "clef": "bass",
            "staff_step_from_bottom_line": 9,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [],
            "key_number_88": 38,
            "key_number_61_C2_C7": 23
          }
        }
      ]
    },
    {
      "key_number_88": 39,
      "midi": 59,
      "key_number_61_C2_C7": 24,
      "color": "white",
      "display_names": [
        "B3"
      ],
      "preferred_clef": "bass",
      "staff_spellings": [
        {
          "name": "B3",
          "treble": {
            "note": "B3",
            "letter": "B",
            "accidental": null,
            "octave": 3,
            "midi": 59,
            "clef": "treble",
            "staff_step_from_bottom_line": -3,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2
            ],
            "key_number_88": 39,
            "key_number_61_C2_C7": 24
          },
          "bass": {
            "note": "B3",
            "letter": "B",
            "accidental": null,
            "octave": 3,
            "midi": 59,
            "clef": "bass",
            "staff_step_from_bottom_line": 9,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [],
            "key_number_88": 39,
            "key_number_61_C2_C7": 24
          }
        }
      ]
    },
    {
      "key_number_88": 40,
      "midi": 60,
      "key_number_61_C2_C7": 25,
      "color": "white",
      "display_names": [
        "C4"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "C4",
          "treble": {
            "note": "C4",
            "letter": "C",
            "accidental": null,
            "octave": 4,
            "midi": 60,
            "clef": "treble",
            "staff_step_from_bottom_line": -2,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2
            ],
            "key_number_88": 40,
            "key_number_61_C2_C7": 25
          },
          "bass": {
            "note": "C4",
            "letter": "C",
            "accidental": null,
            "octave": 4,
            "midi": 60,
            "clef": "bass",
            "staff_step_from_bottom_line": 10,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10
            ],
            "key_number_88": 40,
            "key_number_61_C2_C7": 25
          }
        }
      ]
    },
    {
      "key_number_88": 41,
      "midi": 61,
      "key_number_61_C2_C7": 26,
      "color": "black",
      "display_names": [
        "C#4",
        "Db4"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "C#4",
          "treble": {
            "note": "C#4",
            "letter": "C",
            "accidental": "#",
            "octave": 4,
            "midi": 61,
            "clef": "treble",
            "staff_step_from_bottom_line": -2,
            "position": {
              "type": "ledger_line",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [
              -2
            ],
            "key_number_88": 41,
            "key_number_61_C2_C7": 26
          },
          "bass": {
            "note": "C#4",
            "letter": "C",
            "accidental": "#",
            "octave": 4,
            "midi": 61,
            "clef": "bass",
            "staff_step_from_bottom_line": 10,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10
            ],
            "key_number_88": 41,
            "key_number_61_C2_C7": 26
          }
        },
        {
          "name": "Db4",
          "treble": {
            "note": "Db4",
            "letter": "D",
            "accidental": "b",
            "octave": 4,
            "midi": 61,
            "clef": "treble",
            "staff_step_from_bottom_line": -1,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [],
            "key_number_88": 41,
            "key_number_61_C2_C7": 26
          },
          "bass": {
            "note": "Db4",
            "letter": "D",
            "accidental": "b",
            "octave": 4,
            "midi": 61,
            "clef": "bass",
            "staff_step_from_bottom_line": 11,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10
            ],
            "key_number_88": 41,
            "key_number_61_C2_C7": 26
          }
        }
      ]
    },
    {
      "key_number_88": 42,
      "midi": 62,
      "key_number_61_C2_C7": 27,
      "color": "white",
      "display_names": [
        "D4"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "D4",
          "treble": {
            "note": "D4",
            "letter": "D",
            "accidental": null,
            "octave": 4,
            "midi": 62,
            "clef": "treble",
            "staff_step_from_bottom_line": -1,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [],
            "key_number_88": 42,
            "key_number_61_C2_C7": 27
          },
          "bass": {
            "note": "D4",
            "letter": "D",
            "accidental": null,
            "octave": 4,
            "midi": 62,
            "clef": "bass",
            "staff_step_from_bottom_line": 11,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10
            ],
            "key_number_88": 42,
            "key_number_61_C2_C7": 27
          }
        }
      ]
    },
    {
      "key_number_88": 43,
      "midi": 63,
      "key_number_61_C2_C7": 28,
      "color": "black",
      "display_names": [
        "D#4",
        "Eb4"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "D#4",
          "treble": {
            "note": "D#4",
            "letter": "D",
            "accidental": "#",
            "octave": 4,
            "midi": 63,
            "clef": "treble",
            "staff_step_from_bottom_line": -1,
            "position": {
              "type": "outer_space",
              "side": "below",
              "description": "below staff"
            },
            "ledger_line_steps": [],
            "key_number_88": 43,
            "key_number_61_C2_C7": 28
          },
          "bass": {
            "note": "D#4",
            "letter": "D",
            "accidental": "#",
            "octave": 4,
            "midi": 63,
            "clef": "bass",
            "staff_step_from_bottom_line": 11,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10
            ],
            "key_number_88": 43,
            "key_number_61_C2_C7": 28
          }
        },
        {
          "name": "Eb4",
          "treble": {
            "note": "Eb4",
            "letter": "E",
            "accidental": "b",
            "octave": 4,
            "midi": 63,
            "clef": "treble",
            "staff_step_from_bottom_line": 0,
            "position": {
              "type": "line",
              "number_from_bottom": 1
            },
            "ledger_line_steps": [],
            "key_number_88": 43,
            "key_number_61_C2_C7": 28
          },
          "bass": {
            "note": "Eb4",
            "letter": "E",
            "accidental": "b",
            "octave": 4,
            "midi": 63,
            "clef": "bass",
            "staff_step_from_bottom_line": 12,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12
            ],
            "key_number_88": 43,
            "key_number_61_C2_C7": 28
          }
        }
      ]
    },
    {
      "key_number_88": 44,
      "midi": 64,
      "key_number_61_C2_C7": 29,
      "color": "white",
      "display_names": [
        "E4"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "E4",
          "treble": {
            "note": "E4",
            "letter": "E",
            "accidental": null,
            "octave": 4,
            "midi": 64,
            "clef": "treble",
            "staff_step_from_bottom_line": 0,
            "position": {
              "type": "line",
              "number_from_bottom": 1
            },
            "ledger_line_steps": [],
            "key_number_88": 44,
            "key_number_61_C2_C7": 29
          },
          "bass": {
            "note": "E4",
            "letter": "E",
            "accidental": null,
            "octave": 4,
            "midi": 64,
            "clef": "bass",
            "staff_step_from_bottom_line": 12,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12
            ],
            "key_number_88": 44,
            "key_number_61_C2_C7": 29
          }
        }
      ]
    },
    {
      "key_number_88": 45,
      "midi": 65,
      "key_number_61_C2_C7": 30,
      "color": "white",
      "display_names": [
        "F4"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "F4",
          "treble": {
            "note": "F4",
            "letter": "F",
            "accidental": null,
            "octave": 4,
            "midi": 65,
            "clef": "treble",
            "staff_step_from_bottom_line": 1,
            "position": {
              "type": "space",
              "number_from_bottom": 1
            },
            "ledger_line_steps": [],
            "key_number_88": 45,
            "key_number_61_C2_C7": 30
          },
          "bass": {
            "note": "F4",
            "letter": "F",
            "accidental": null,
            "octave": 4,
            "midi": 65,
            "clef": "bass",
            "staff_step_from_bottom_line": 13,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12
            ],
            "key_number_88": 45,
            "key_number_61_C2_C7": 30
          }
        }
      ]
    },
    {
      "key_number_88": 46,
      "midi": 66,
      "key_number_61_C2_C7": 31,
      "color": "black",
      "display_names": [
        "F#4",
        "Gb4"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "F#4",
          "treble": {
            "note": "F#4",
            "letter": "F",
            "accidental": "#",
            "octave": 4,
            "midi": 66,
            "clef": "treble",
            "staff_step_from_bottom_line": 1,
            "position": {
              "type": "space",
              "number_from_bottom": 1
            },
            "ledger_line_steps": [],
            "key_number_88": 46,
            "key_number_61_C2_C7": 31
          },
          "bass": {
            "note": "F#4",
            "letter": "F",
            "accidental": "#",
            "octave": 4,
            "midi": 66,
            "clef": "bass",
            "staff_step_from_bottom_line": 13,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12
            ],
            "key_number_88": 46,
            "key_number_61_C2_C7": 31
          }
        },
        {
          "name": "Gb4",
          "treble": {
            "note": "Gb4",
            "letter": "G",
            "accidental": "b",
            "octave": 4,
            "midi": 66,
            "clef": "treble",
            "staff_step_from_bottom_line": 2,
            "position": {
              "type": "line",
              "number_from_bottom": 2
            },
            "ledger_line_steps": [],
            "key_number_88": 46,
            "key_number_61_C2_C7": 31
          },
          "bass": {
            "note": "Gb4",
            "letter": "G",
            "accidental": "b",
            "octave": 4,
            "midi": 66,
            "clef": "bass",
            "staff_step_from_bottom_line": 14,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14
            ],
            "key_number_88": 46,
            "key_number_61_C2_C7": 31
          }
        }
      ]
    },
    {
      "key_number_88": 47,
      "midi": 67,
      "key_number_61_C2_C7": 32,
      "color": "white",
      "display_names": [
        "G4"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "G4",
          "treble": {
            "note": "G4",
            "letter": "G",
            "accidental": null,
            "octave": 4,
            "midi": 67,
            "clef": "treble",
            "staff_step_from_bottom_line": 2,
            "position": {
              "type": "line",
              "number_from_bottom": 2
            },
            "ledger_line_steps": [],
            "key_number_88": 47,
            "key_number_61_C2_C7": 32
          },
          "bass": {
            "note": "G4",
            "letter": "G",
            "accidental": null,
            "octave": 4,
            "midi": 67,
            "clef": "bass",
            "staff_step_from_bottom_line": 14,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14
            ],
            "key_number_88": 47,
            "key_number_61_C2_C7": 32
          }
        }
      ]
    },
    {
      "key_number_88": 48,
      "midi": 68,
      "key_number_61_C2_C7": 33,
      "color": "black",
      "display_names": [
        "G#4",
        "Ab4"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "G#4",
          "treble": {
            "note": "G#4",
            "letter": "G",
            "accidental": "#",
            "octave": 4,
            "midi": 68,
            "clef": "treble",
            "staff_step_from_bottom_line": 2,
            "position": {
              "type": "line",
              "number_from_bottom": 2
            },
            "ledger_line_steps": [],
            "key_number_88": 48,
            "key_number_61_C2_C7": 33
          },
          "bass": {
            "note": "G#4",
            "letter": "G",
            "accidental": "#",
            "octave": 4,
            "midi": 68,
            "clef": "bass",
            "staff_step_from_bottom_line": 14,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14
            ],
            "key_number_88": 48,
            "key_number_61_C2_C7": 33
          }
        },
        {
          "name": "Ab4",
          "treble": {
            "note": "Ab4",
            "letter": "A",
            "accidental": "b",
            "octave": 4,
            "midi": 68,
            "clef": "treble",
            "staff_step_from_bottom_line": 3,
            "position": {
              "type": "space",
              "number_from_bottom": 2
            },
            "ledger_line_steps": [],
            "key_number_88": 48,
            "key_number_61_C2_C7": 33
          },
          "bass": {
            "note": "Ab4",
            "letter": "A",
            "accidental": "b",
            "octave": 4,
            "midi": 68,
            "clef": "bass",
            "staff_step_from_bottom_line": 15,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14
            ],
            "key_number_88": 48,
            "key_number_61_C2_C7": 33
          }
        }
      ]
    },
    {
      "key_number_88": 49,
      "midi": 69,
      "key_number_61_C2_C7": 34,
      "color": "white",
      "display_names": [
        "A4"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "A4",
          "treble": {
            "note": "A4",
            "letter": "A",
            "accidental": null,
            "octave": 4,
            "midi": 69,
            "clef": "treble",
            "staff_step_from_bottom_line": 3,
            "position": {
              "type": "space",
              "number_from_bottom": 2
            },
            "ledger_line_steps": [],
            "key_number_88": 49,
            "key_number_61_C2_C7": 34
          },
          "bass": {
            "note": "A4",
            "letter": "A",
            "accidental": null,
            "octave": 4,
            "midi": 69,
            "clef": "bass",
            "staff_step_from_bottom_line": 15,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14
            ],
            "key_number_88": 49,
            "key_number_61_C2_C7": 34
          }
        }
      ]
    },
    {
      "key_number_88": 50,
      "midi": 70,
      "key_number_61_C2_C7": 35,
      "color": "black",
      "display_names": [
        "A#4",
        "Bb4"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "A#4",
          "treble": {
            "note": "A#4",
            "letter": "A",
            "accidental": "#",
            "octave": 4,
            "midi": 70,
            "clef": "treble",
            "staff_step_from_bottom_line": 3,
            "position": {
              "type": "space",
              "number_from_bottom": 2
            },
            "ledger_line_steps": [],
            "key_number_88": 50,
            "key_number_61_C2_C7": 35
          },
          "bass": {
            "note": "A#4",
            "letter": "A",
            "accidental": "#",
            "octave": 4,
            "midi": 70,
            "clef": "bass",
            "staff_step_from_bottom_line": 15,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14
            ],
            "key_number_88": 50,
            "key_number_61_C2_C7": 35
          }
        },
        {
          "name": "Bb4",
          "treble": {
            "note": "Bb4",
            "letter": "B",
            "accidental": "b",
            "octave": 4,
            "midi": 70,
            "clef": "treble",
            "staff_step_from_bottom_line": 4,
            "position": {
              "type": "line",
              "number_from_bottom": 3
            },
            "ledger_line_steps": [],
            "key_number_88": 50,
            "key_number_61_C2_C7": 35
          },
          "bass": {
            "note": "Bb4",
            "letter": "B",
            "accidental": "b",
            "octave": 4,
            "midi": 70,
            "clef": "bass",
            "staff_step_from_bottom_line": 16,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16
            ],
            "key_number_88": 50,
            "key_number_61_C2_C7": 35
          }
        }
      ]
    },
    {
      "key_number_88": 51,
      "midi": 71,
      "key_number_61_C2_C7": 36,
      "color": "white",
      "display_names": [
        "B4"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "B4",
          "treble": {
            "note": "B4",
            "letter": "B",
            "accidental": null,
            "octave": 4,
            "midi": 71,
            "clef": "treble",
            "staff_step_from_bottom_line": 4,
            "position": {
              "type": "line",
              "number_from_bottom": 3
            },
            "ledger_line_steps": [],
            "key_number_88": 51,
            "key_number_61_C2_C7": 36
          },
          "bass": {
            "note": "B4",
            "letter": "B",
            "accidental": null,
            "octave": 4,
            "midi": 71,
            "clef": "bass",
            "staff_step_from_bottom_line": 16,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16
            ],
            "key_number_88": 51,
            "key_number_61_C2_C7": 36
          }
        }
      ]
    },
    {
      "key_number_88": 52,
      "midi": 72,
      "key_number_61_C2_C7": 37,
      "color": "white",
      "display_names": [
        "C5"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "C5",
          "treble": {
            "note": "C5",
            "letter": "C",
            "accidental": null,
            "octave": 5,
            "midi": 72,
            "clef": "treble",
            "staff_step_from_bottom_line": 5,
            "position": {
              "type": "space",
              "number_from_bottom": 3
            },
            "ledger_line_steps": [],
            "key_number_88": 52,
            "key_number_61_C2_C7": 37
          },
          "bass": {
            "note": "C5",
            "letter": "C",
            "accidental": null,
            "octave": 5,
            "midi": 72,
            "clef": "bass",
            "staff_step_from_bottom_line": 17,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16
            ],
            "key_number_88": 52,
            "key_number_61_C2_C7": 37
          }
        }
      ]
    },
    {
      "key_number_88": 53,
      "midi": 73,
      "key_number_61_C2_C7": 38,
      "color": "black",
      "display_names": [
        "C#5",
        "Db5"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "C#5",
          "treble": {
            "note": "C#5",
            "letter": "C",
            "accidental": "#",
            "octave": 5,
            "midi": 73,
            "clef": "treble",
            "staff_step_from_bottom_line": 5,
            "position": {
              "type": "space",
              "number_from_bottom": 3
            },
            "ledger_line_steps": [],
            "key_number_88": 53,
            "key_number_61_C2_C7": 38
          },
          "bass": {
            "note": "C#5",
            "letter": "C",
            "accidental": "#",
            "octave": 5,
            "midi": 73,
            "clef": "bass",
            "staff_step_from_bottom_line": 17,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16
            ],
            "key_number_88": 53,
            "key_number_61_C2_C7": 38
          }
        },
        {
          "name": "Db5",
          "treble": {
            "note": "Db5",
            "letter": "D",
            "accidental": "b",
            "octave": 5,
            "midi": 73,
            "clef": "treble",
            "staff_step_from_bottom_line": 6,
            "position": {
              "type": "line",
              "number_from_bottom": 4
            },
            "ledger_line_steps": [],
            "key_number_88": 53,
            "key_number_61_C2_C7": 38
          },
          "bass": {
            "note": "Db5",
            "letter": "D",
            "accidental": "b",
            "octave": 5,
            "midi": 73,
            "clef": "bass",
            "staff_step_from_bottom_line": 18,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18
            ],
            "key_number_88": 53,
            "key_number_61_C2_C7": 38
          }
        }
      ]
    },
    {
      "key_number_88": 54,
      "midi": 74,
      "key_number_61_C2_C7": 39,
      "color": "white",
      "display_names": [
        "D5"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "D5",
          "treble": {
            "note": "D5",
            "letter": "D",
            "accidental": null,
            "octave": 5,
            "midi": 74,
            "clef": "treble",
            "staff_step_from_bottom_line": 6,
            "position": {
              "type": "line",
              "number_from_bottom": 4
            },
            "ledger_line_steps": [],
            "key_number_88": 54,
            "key_number_61_C2_C7": 39
          },
          "bass": {
            "note": "D5",
            "letter": "D",
            "accidental": null,
            "octave": 5,
            "midi": 74,
            "clef": "bass",
            "staff_step_from_bottom_line": 18,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18
            ],
            "key_number_88": 54,
            "key_number_61_C2_C7": 39
          }
        }
      ]
    },
    {
      "key_number_88": 55,
      "midi": 75,
      "key_number_61_C2_C7": 40,
      "color": "black",
      "display_names": [
        "D#5",
        "Eb5"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "D#5",
          "treble": {
            "note": "D#5",
            "letter": "D",
            "accidental": "#",
            "octave": 5,
            "midi": 75,
            "clef": "treble",
            "staff_step_from_bottom_line": 6,
            "position": {
              "type": "line",
              "number_from_bottom": 4
            },
            "ledger_line_steps": [],
            "key_number_88": 55,
            "key_number_61_C2_C7": 40
          },
          "bass": {
            "note": "D#5",
            "letter": "D",
            "accidental": "#",
            "octave": 5,
            "midi": 75,
            "clef": "bass",
            "staff_step_from_bottom_line": 18,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18
            ],
            "key_number_88": 55,
            "key_number_61_C2_C7": 40
          }
        },
        {
          "name": "Eb5",
          "treble": {
            "note": "Eb5",
            "letter": "E",
            "accidental": "b",
            "octave": 5,
            "midi": 75,
            "clef": "treble",
            "staff_step_from_bottom_line": 7,
            "position": {
              "type": "space",
              "number_from_bottom": 4
            },
            "ledger_line_steps": [],
            "key_number_88": 55,
            "key_number_61_C2_C7": 40
          },
          "bass": {
            "note": "Eb5",
            "letter": "E",
            "accidental": "b",
            "octave": 5,
            "midi": 75,
            "clef": "bass",
            "staff_step_from_bottom_line": 19,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18
            ],
            "key_number_88": 55,
            "key_number_61_C2_C7": 40
          }
        }
      ]
    },
    {
      "key_number_88": 56,
      "midi": 76,
      "key_number_61_C2_C7": 41,
      "color": "white",
      "display_names": [
        "E5"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "E5",
          "treble": {
            "note": "E5",
            "letter": "E",
            "accidental": null,
            "octave": 5,
            "midi": 76,
            "clef": "treble",
            "staff_step_from_bottom_line": 7,
            "position": {
              "type": "space",
              "number_from_bottom": 4
            },
            "ledger_line_steps": [],
            "key_number_88": 56,
            "key_number_61_C2_C7": 41
          },
          "bass": {
            "note": "E5",
            "letter": "E",
            "accidental": null,
            "octave": 5,
            "midi": 76,
            "clef": "bass",
            "staff_step_from_bottom_line": 19,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18
            ],
            "key_number_88": 56,
            "key_number_61_C2_C7": 41
          }
        }
      ]
    },
    {
      "key_number_88": 57,
      "midi": 77,
      "key_number_61_C2_C7": 42,
      "color": "white",
      "display_names": [
        "F5"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "F5",
          "treble": {
            "note": "F5",
            "letter": "F",
            "accidental": null,
            "octave": 5,
            "midi": 77,
            "clef": "treble",
            "staff_step_from_bottom_line": 8,
            "position": {
              "type": "line",
              "number_from_bottom": 5
            },
            "ledger_line_steps": [],
            "key_number_88": 57,
            "key_number_61_C2_C7": 42
          },
          "bass": {
            "note": "F5",
            "letter": "F",
            "accidental": null,
            "octave": 5,
            "midi": 77,
            "clef": "bass",
            "staff_step_from_bottom_line": 20,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20
            ],
            "key_number_88": 57,
            "key_number_61_C2_C7": 42
          }
        }
      ]
    },
    {
      "key_number_88": 58,
      "midi": 78,
      "key_number_61_C2_C7": 43,
      "color": "black",
      "display_names": [
        "F#5",
        "Gb5"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "F#5",
          "treble": {
            "note": "F#5",
            "letter": "F",
            "accidental": "#",
            "octave": 5,
            "midi": 78,
            "clef": "treble",
            "staff_step_from_bottom_line": 8,
            "position": {
              "type": "line",
              "number_from_bottom": 5
            },
            "ledger_line_steps": [],
            "key_number_88": 58,
            "key_number_61_C2_C7": 43
          },
          "bass": {
            "note": "F#5",
            "letter": "F",
            "accidental": "#",
            "octave": 5,
            "midi": 78,
            "clef": "bass",
            "staff_step_from_bottom_line": 20,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20
            ],
            "key_number_88": 58,
            "key_number_61_C2_C7": 43
          }
        },
        {
          "name": "Gb5",
          "treble": {
            "note": "Gb5",
            "letter": "G",
            "accidental": "b",
            "octave": 5,
            "midi": 78,
            "clef": "treble",
            "staff_step_from_bottom_line": 9,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [],
            "key_number_88": 58,
            "key_number_61_C2_C7": 43
          },
          "bass": {
            "note": "Gb5",
            "letter": "G",
            "accidental": "b",
            "octave": 5,
            "midi": 78,
            "clef": "bass",
            "staff_step_from_bottom_line": 21,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20
            ],
            "key_number_88": 58,
            "key_number_61_C2_C7": 43
          }
        }
      ]
    },
    {
      "key_number_88": 59,
      "midi": 79,
      "key_number_61_C2_C7": 44,
      "color": "white",
      "display_names": [
        "G5"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "G5",
          "treble": {
            "note": "G5",
            "letter": "G",
            "accidental": null,
            "octave": 5,
            "midi": 79,
            "clef": "treble",
            "staff_step_from_bottom_line": 9,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [],
            "key_number_88": 59,
            "key_number_61_C2_C7": 44
          },
          "bass": {
            "note": "G5",
            "letter": "G",
            "accidental": null,
            "octave": 5,
            "midi": 79,
            "clef": "bass",
            "staff_step_from_bottom_line": 21,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20
            ],
            "key_number_88": 59,
            "key_number_61_C2_C7": 44
          }
        }
      ]
    },
    {
      "key_number_88": 60,
      "midi": 80,
      "key_number_61_C2_C7": 45,
      "color": "black",
      "display_names": [
        "G#5",
        "Ab5"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "G#5",
          "treble": {
            "note": "G#5",
            "letter": "G",
            "accidental": "#",
            "octave": 5,
            "midi": 80,
            "clef": "treble",
            "staff_step_from_bottom_line": 9,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [],
            "key_number_88": 60,
            "key_number_61_C2_C7": 45
          },
          "bass": {
            "note": "G#5",
            "letter": "G",
            "accidental": "#",
            "octave": 5,
            "midi": 80,
            "clef": "bass",
            "staff_step_from_bottom_line": 21,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20
            ],
            "key_number_88": 60,
            "key_number_61_C2_C7": 45
          }
        },
        {
          "name": "Ab5",
          "treble": {
            "note": "Ab5",
            "letter": "A",
            "accidental": "b",
            "octave": 5,
            "midi": 80,
            "clef": "treble",
            "staff_step_from_bottom_line": 10,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10
            ],
            "key_number_88": 60,
            "key_number_61_C2_C7": 45
          },
          "bass": {
            "note": "Ab5",
            "letter": "A",
            "accidental": "b",
            "octave": 5,
            "midi": 80,
            "clef": "bass",
            "staff_step_from_bottom_line": 22,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22
            ],
            "key_number_88": 60,
            "key_number_61_C2_C7": 45
          }
        }
      ]
    },
    {
      "key_number_88": 61,
      "midi": 81,
      "key_number_61_C2_C7": 46,
      "color": "white",
      "display_names": [
        "A5"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "A5",
          "treble": {
            "note": "A5",
            "letter": "A",
            "accidental": null,
            "octave": 5,
            "midi": 81,
            "clef": "treble",
            "staff_step_from_bottom_line": 10,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10
            ],
            "key_number_88": 61,
            "key_number_61_C2_C7": 46
          },
          "bass": {
            "note": "A5",
            "letter": "A",
            "accidental": null,
            "octave": 5,
            "midi": 81,
            "clef": "bass",
            "staff_step_from_bottom_line": 22,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22
            ],
            "key_number_88": 61,
            "key_number_61_C2_C7": 46
          }
        }
      ]
    },
    {
      "key_number_88": 62,
      "midi": 82,
      "key_number_61_C2_C7": 47,
      "color": "black",
      "display_names": [
        "A#5",
        "Bb5"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "A#5",
          "treble": {
            "note": "A#5",
            "letter": "A",
            "accidental": "#",
            "octave": 5,
            "midi": 82,
            "clef": "treble",
            "staff_step_from_bottom_line": 10,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10
            ],
            "key_number_88": 62,
            "key_number_61_C2_C7": 47
          },
          "bass": {
            "note": "A#5",
            "letter": "A",
            "accidental": "#",
            "octave": 5,
            "midi": 82,
            "clef": "bass",
            "staff_step_from_bottom_line": 22,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22
            ],
            "key_number_88": 62,
            "key_number_61_C2_C7": 47
          }
        },
        {
          "name": "Bb5",
          "treble": {
            "note": "Bb5",
            "letter": "B",
            "accidental": "b",
            "octave": 5,
            "midi": 82,
            "clef": "treble",
            "staff_step_from_bottom_line": 11,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10
            ],
            "key_number_88": 62,
            "key_number_61_C2_C7": 47
          },
          "bass": {
            "note": "Bb5",
            "letter": "B",
            "accidental": "b",
            "octave": 5,
            "midi": 82,
            "clef": "bass",
            "staff_step_from_bottom_line": 23,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22
            ],
            "key_number_88": 62,
            "key_number_61_C2_C7": 47
          }
        }
      ]
    },
    {
      "key_number_88": 63,
      "midi": 83,
      "key_number_61_C2_C7": 48,
      "color": "white",
      "display_names": [
        "B5"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "B5",
          "treble": {
            "note": "B5",
            "letter": "B",
            "accidental": null,
            "octave": 5,
            "midi": 83,
            "clef": "treble",
            "staff_step_from_bottom_line": 11,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10
            ],
            "key_number_88": 63,
            "key_number_61_C2_C7": 48
          },
          "bass": {
            "note": "B5",
            "letter": "B",
            "accidental": null,
            "octave": 5,
            "midi": 83,
            "clef": "bass",
            "staff_step_from_bottom_line": 23,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22
            ],
            "key_number_88": 63,
            "key_number_61_C2_C7": 48
          }
        }
      ]
    },
    {
      "key_number_88": 64,
      "midi": 84,
      "key_number_61_C2_C7": 49,
      "color": "white",
      "display_names": [
        "C6"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "C6",
          "treble": {
            "note": "C6",
            "letter": "C",
            "accidental": null,
            "octave": 6,
            "midi": 84,
            "clef": "treble",
            "staff_step_from_bottom_line": 12,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12
            ],
            "key_number_88": 64,
            "key_number_61_C2_C7": 49
          },
          "bass": {
            "note": "C6",
            "letter": "C",
            "accidental": null,
            "octave": 6,
            "midi": 84,
            "clef": "bass",
            "staff_step_from_bottom_line": 24,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24
            ],
            "key_number_88": 64,
            "key_number_61_C2_C7": 49
          }
        }
      ]
    },
    {
      "key_number_88": 65,
      "midi": 85,
      "key_number_61_C2_C7": 50,
      "color": "black",
      "display_names": [
        "C#6",
        "Db6"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "C#6",
          "treble": {
            "note": "C#6",
            "letter": "C",
            "accidental": "#",
            "octave": 6,
            "midi": 85,
            "clef": "treble",
            "staff_step_from_bottom_line": 12,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12
            ],
            "key_number_88": 65,
            "key_number_61_C2_C7": 50
          },
          "bass": {
            "note": "C#6",
            "letter": "C",
            "accidental": "#",
            "octave": 6,
            "midi": 85,
            "clef": "bass",
            "staff_step_from_bottom_line": 24,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24
            ],
            "key_number_88": 65,
            "key_number_61_C2_C7": 50
          }
        },
        {
          "name": "Db6",
          "treble": {
            "note": "Db6",
            "letter": "D",
            "accidental": "b",
            "octave": 6,
            "midi": 85,
            "clef": "treble",
            "staff_step_from_bottom_line": 13,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12
            ],
            "key_number_88": 65,
            "key_number_61_C2_C7": 50
          },
          "bass": {
            "note": "Db6",
            "letter": "D",
            "accidental": "b",
            "octave": 6,
            "midi": 85,
            "clef": "bass",
            "staff_step_from_bottom_line": 25,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24
            ],
            "key_number_88": 65,
            "key_number_61_C2_C7": 50
          }
        }
      ]
    },
    {
      "key_number_88": 66,
      "midi": 86,
      "key_number_61_C2_C7": 51,
      "color": "white",
      "display_names": [
        "D6"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "D6",
          "treble": {
            "note": "D6",
            "letter": "D",
            "accidental": null,
            "octave": 6,
            "midi": 86,
            "clef": "treble",
            "staff_step_from_bottom_line": 13,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12
            ],
            "key_number_88": 66,
            "key_number_61_C2_C7": 51
          },
          "bass": {
            "note": "D6",
            "letter": "D",
            "accidental": null,
            "octave": 6,
            "midi": 86,
            "clef": "bass",
            "staff_step_from_bottom_line": 25,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24
            ],
            "key_number_88": 66,
            "key_number_61_C2_C7": 51
          }
        }
      ]
    },
    {
      "key_number_88": 67,
      "midi": 87,
      "key_number_61_C2_C7": 52,
      "color": "black",
      "display_names": [
        "D#6",
        "Eb6"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "D#6",
          "treble": {
            "note": "D#6",
            "letter": "D",
            "accidental": "#",
            "octave": 6,
            "midi": 87,
            "clef": "treble",
            "staff_step_from_bottom_line": 13,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12
            ],
            "key_number_88": 67,
            "key_number_61_C2_C7": 52
          },
          "bass": {
            "note": "D#6",
            "letter": "D",
            "accidental": "#",
            "octave": 6,
            "midi": 87,
            "clef": "bass",
            "staff_step_from_bottom_line": 25,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24
            ],
            "key_number_88": 67,
            "key_number_61_C2_C7": 52
          }
        },
        {
          "name": "Eb6",
          "treble": {
            "note": "Eb6",
            "letter": "E",
            "accidental": "b",
            "octave": 6,
            "midi": 87,
            "clef": "treble",
            "staff_step_from_bottom_line": 14,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14
            ],
            "key_number_88": 67,
            "key_number_61_C2_C7": 52
          },
          "bass": {
            "note": "Eb6",
            "letter": "E",
            "accidental": "b",
            "octave": 6,
            "midi": 87,
            "clef": "bass",
            "staff_step_from_bottom_line": 26,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26
            ],
            "key_number_88": 67,
            "key_number_61_C2_C7": 52
          }
        }
      ]
    },
    {
      "key_number_88": 68,
      "midi": 88,
      "key_number_61_C2_C7": 53,
      "color": "white",
      "display_names": [
        "E6"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "E6",
          "treble": {
            "note": "E6",
            "letter": "E",
            "accidental": null,
            "octave": 6,
            "midi": 88,
            "clef": "treble",
            "staff_step_from_bottom_line": 14,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14
            ],
            "key_number_88": 68,
            "key_number_61_C2_C7": 53
          },
          "bass": {
            "note": "E6",
            "letter": "E",
            "accidental": null,
            "octave": 6,
            "midi": 88,
            "clef": "bass",
            "staff_step_from_bottom_line": 26,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26
            ],
            "key_number_88": 68,
            "key_number_61_C2_C7": 53
          }
        }
      ]
    },
    {
      "key_number_88": 69,
      "midi": 89,
      "key_number_61_C2_C7": 54,
      "color": "white",
      "display_names": [
        "F6"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "F6",
          "treble": {
            "note": "F6",
            "letter": "F",
            "accidental": null,
            "octave": 6,
            "midi": 89,
            "clef": "treble",
            "staff_step_from_bottom_line": 15,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14
            ],
            "key_number_88": 69,
            "key_number_61_C2_C7": 54
          },
          "bass": {
            "note": "F6",
            "letter": "F",
            "accidental": null,
            "octave": 6,
            "midi": 89,
            "clef": "bass",
            "staff_step_from_bottom_line": 27,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26
            ],
            "key_number_88": 69,
            "key_number_61_C2_C7": 54
          }
        }
      ]
    },
    {
      "key_number_88": 70,
      "midi": 90,
      "key_number_61_C2_C7": 55,
      "color": "black",
      "display_names": [
        "F#6",
        "Gb6"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "F#6",
          "treble": {
            "note": "F#6",
            "letter": "F",
            "accidental": "#",
            "octave": 6,
            "midi": 90,
            "clef": "treble",
            "staff_step_from_bottom_line": 15,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14
            ],
            "key_number_88": 70,
            "key_number_61_C2_C7": 55
          },
          "bass": {
            "note": "F#6",
            "letter": "F",
            "accidental": "#",
            "octave": 6,
            "midi": 90,
            "clef": "bass",
            "staff_step_from_bottom_line": 27,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26
            ],
            "key_number_88": 70,
            "key_number_61_C2_C7": 55
          }
        },
        {
          "name": "Gb6",
          "treble": {
            "note": "Gb6",
            "letter": "G",
            "accidental": "b",
            "octave": 6,
            "midi": 90,
            "clef": "treble",
            "staff_step_from_bottom_line": 16,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16
            ],
            "key_number_88": 70,
            "key_number_61_C2_C7": 55
          },
          "bass": {
            "note": "Gb6",
            "letter": "G",
            "accidental": "b",
            "octave": 6,
            "midi": 90,
            "clef": "bass",
            "staff_step_from_bottom_line": 28,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28
            ],
            "key_number_88": 70,
            "key_number_61_C2_C7": 55
          }
        }
      ]
    },
    {
      "key_number_88": 71,
      "midi": 91,
      "key_number_61_C2_C7": 56,
      "color": "white",
      "display_names": [
        "G6"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "G6",
          "treble": {
            "note": "G6",
            "letter": "G",
            "accidental": null,
            "octave": 6,
            "midi": 91,
            "clef": "treble",
            "staff_step_from_bottom_line": 16,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16
            ],
            "key_number_88": 71,
            "key_number_61_C2_C7": 56
          },
          "bass": {
            "note": "G6",
            "letter": "G",
            "accidental": null,
            "octave": 6,
            "midi": 91,
            "clef": "bass",
            "staff_step_from_bottom_line": 28,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28
            ],
            "key_number_88": 71,
            "key_number_61_C2_C7": 56
          }
        }
      ]
    },
    {
      "key_number_88": 72,
      "midi": 92,
      "key_number_61_C2_C7": 57,
      "color": "black",
      "display_names": [
        "G#6",
        "Ab6"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "G#6",
          "treble": {
            "note": "G#6",
            "letter": "G",
            "accidental": "#",
            "octave": 6,
            "midi": 92,
            "clef": "treble",
            "staff_step_from_bottom_line": 16,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16
            ],
            "key_number_88": 72,
            "key_number_61_C2_C7": 57
          },
          "bass": {
            "note": "G#6",
            "letter": "G",
            "accidental": "#",
            "octave": 6,
            "midi": 92,
            "clef": "bass",
            "staff_step_from_bottom_line": 28,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28
            ],
            "key_number_88": 72,
            "key_number_61_C2_C7": 57
          }
        },
        {
          "name": "Ab6",
          "treble": {
            "note": "Ab6",
            "letter": "A",
            "accidental": "b",
            "octave": 6,
            "midi": 92,
            "clef": "treble",
            "staff_step_from_bottom_line": 17,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16
            ],
            "key_number_88": 72,
            "key_number_61_C2_C7": 57
          },
          "bass": {
            "note": "Ab6",
            "letter": "A",
            "accidental": "b",
            "octave": 6,
            "midi": 92,
            "clef": "bass",
            "staff_step_from_bottom_line": 29,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28
            ],
            "key_number_88": 72,
            "key_number_61_C2_C7": 57
          }
        }
      ]
    },
    {
      "key_number_88": 73,
      "midi": 93,
      "key_number_61_C2_C7": 58,
      "color": "white",
      "display_names": [
        "A6"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "A6",
          "treble": {
            "note": "A6",
            "letter": "A",
            "accidental": null,
            "octave": 6,
            "midi": 93,
            "clef": "treble",
            "staff_step_from_bottom_line": 17,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16
            ],
            "key_number_88": 73,
            "key_number_61_C2_C7": 58
          },
          "bass": {
            "note": "A6",
            "letter": "A",
            "accidental": null,
            "octave": 6,
            "midi": 93,
            "clef": "bass",
            "staff_step_from_bottom_line": 29,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28
            ],
            "key_number_88": 73,
            "key_number_61_C2_C7": 58
          }
        }
      ]
    },
    {
      "key_number_88": 74,
      "midi": 94,
      "key_number_61_C2_C7": 59,
      "color": "black",
      "display_names": [
        "A#6",
        "Bb6"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "A#6",
          "treble": {
            "note": "A#6",
            "letter": "A",
            "accidental": "#",
            "octave": 6,
            "midi": 94,
            "clef": "treble",
            "staff_step_from_bottom_line": 17,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16
            ],
            "key_number_88": 74,
            "key_number_61_C2_C7": 59
          },
          "bass": {
            "note": "A#6",
            "letter": "A",
            "accidental": "#",
            "octave": 6,
            "midi": 94,
            "clef": "bass",
            "staff_step_from_bottom_line": 29,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28
            ],
            "key_number_88": 74,
            "key_number_61_C2_C7": 59
          }
        },
        {
          "name": "Bb6",
          "treble": {
            "note": "Bb6",
            "letter": "B",
            "accidental": "b",
            "octave": 6,
            "midi": 94,
            "clef": "treble",
            "staff_step_from_bottom_line": 18,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18
            ],
            "key_number_88": 74,
            "key_number_61_C2_C7": 59
          },
          "bass": {
            "note": "Bb6",
            "letter": "B",
            "accidental": "b",
            "octave": 6,
            "midi": 94,
            "clef": "bass",
            "staff_step_from_bottom_line": 30,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30
            ],
            "key_number_88": 74,
            "key_number_61_C2_C7": 59
          }
        }
      ]
    },
    {
      "key_number_88": 75,
      "midi": 95,
      "key_number_61_C2_C7": 60,
      "color": "white",
      "display_names": [
        "B6"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "B6",
          "treble": {
            "note": "B6",
            "letter": "B",
            "accidental": null,
            "octave": 6,
            "midi": 95,
            "clef": "treble",
            "staff_step_from_bottom_line": 18,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18
            ],
            "key_number_88": 75,
            "key_number_61_C2_C7": 60
          },
          "bass": {
            "note": "B6",
            "letter": "B",
            "accidental": null,
            "octave": 6,
            "midi": 95,
            "clef": "bass",
            "staff_step_from_bottom_line": 30,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30
            ],
            "key_number_88": 75,
            "key_number_61_C2_C7": 60
          }
        }
      ]
    },
    {
      "key_number_88": 76,
      "midi": 96,
      "key_number_61_C2_C7": 61,
      "color": "white",
      "display_names": [
        "C7"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "C7",
          "treble": {
            "note": "C7",
            "letter": "C",
            "accidental": null,
            "octave": 7,
            "midi": 96,
            "clef": "treble",
            "staff_step_from_bottom_line": 19,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18
            ],
            "key_number_88": 76,
            "key_number_61_C2_C7": 61
          },
          "bass": {
            "note": "C7",
            "letter": "C",
            "accidental": null,
            "octave": 7,
            "midi": 96,
            "clef": "bass",
            "staff_step_from_bottom_line": 31,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30
            ],
            "key_number_88": 76,
            "key_number_61_C2_C7": 61
          }
        }
      ]
    },
    {
      "key_number_88": 77,
      "midi": 97,
      "key_number_61_C2_C7": null,
      "color": "black",
      "display_names": [
        "C#7",
        "Db7"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "C#7",
          "treble": {
            "note": "C#7",
            "letter": "C",
            "accidental": "#",
            "octave": 7,
            "midi": 97,
            "clef": "treble",
            "staff_step_from_bottom_line": 19,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18
            ],
            "key_number_88": 77,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "C#7",
            "letter": "C",
            "accidental": "#",
            "octave": 7,
            "midi": 97,
            "clef": "bass",
            "staff_step_from_bottom_line": 31,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30
            ],
            "key_number_88": 77,
            "key_number_61_C2_C7": null
          }
        },
        {
          "name": "Db7",
          "treble": {
            "note": "Db7",
            "letter": "D",
            "accidental": "b",
            "octave": 7,
            "midi": 97,
            "clef": "treble",
            "staff_step_from_bottom_line": 20,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20
            ],
            "key_number_88": 77,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "Db7",
            "letter": "D",
            "accidental": "b",
            "octave": 7,
            "midi": 97,
            "clef": "bass",
            "staff_step_from_bottom_line": 32,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32
            ],
            "key_number_88": 77,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 78,
      "midi": 98,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "D7"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "D7",
          "treble": {
            "note": "D7",
            "letter": "D",
            "accidental": null,
            "octave": 7,
            "midi": 98,
            "clef": "treble",
            "staff_step_from_bottom_line": 20,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20
            ],
            "key_number_88": 78,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "D7",
            "letter": "D",
            "accidental": null,
            "octave": 7,
            "midi": 98,
            "clef": "bass",
            "staff_step_from_bottom_line": 32,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32
            ],
            "key_number_88": 78,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 79,
      "midi": 99,
      "key_number_61_C2_C7": null,
      "color": "black",
      "display_names": [
        "D#7",
        "Eb7"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "D#7",
          "treble": {
            "note": "D#7",
            "letter": "D",
            "accidental": "#",
            "octave": 7,
            "midi": 99,
            "clef": "treble",
            "staff_step_from_bottom_line": 20,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20
            ],
            "key_number_88": 79,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "D#7",
            "letter": "D",
            "accidental": "#",
            "octave": 7,
            "midi": 99,
            "clef": "bass",
            "staff_step_from_bottom_line": 32,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32
            ],
            "key_number_88": 79,
            "key_number_61_C2_C7": null
          }
        },
        {
          "name": "Eb7",
          "treble": {
            "note": "Eb7",
            "letter": "E",
            "accidental": "b",
            "octave": 7,
            "midi": 99,
            "clef": "treble",
            "staff_step_from_bottom_line": 21,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20
            ],
            "key_number_88": 79,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "Eb7",
            "letter": "E",
            "accidental": "b",
            "octave": 7,
            "midi": 99,
            "clef": "bass",
            "staff_step_from_bottom_line": 33,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32
            ],
            "key_number_88": 79,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 80,
      "midi": 100,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "E7"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "E7",
          "treble": {
            "note": "E7",
            "letter": "E",
            "accidental": null,
            "octave": 7,
            "midi": 100,
            "clef": "treble",
            "staff_step_from_bottom_line": 21,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20
            ],
            "key_number_88": 80,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "E7",
            "letter": "E",
            "accidental": null,
            "octave": 7,
            "midi": 100,
            "clef": "bass",
            "staff_step_from_bottom_line": 33,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32
            ],
            "key_number_88": 80,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 81,
      "midi": 101,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "F7"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "F7",
          "treble": {
            "note": "F7",
            "letter": "F",
            "accidental": null,
            "octave": 7,
            "midi": 101,
            "clef": "treble",
            "staff_step_from_bottom_line": 22,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22
            ],
            "key_number_88": 81,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "F7",
            "letter": "F",
            "accidental": null,
            "octave": 7,
            "midi": 101,
            "clef": "bass",
            "staff_step_from_bottom_line": 34,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32,
              34
            ],
            "key_number_88": 81,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 82,
      "midi": 102,
      "key_number_61_C2_C7": null,
      "color": "black",
      "display_names": [
        "F#7",
        "Gb7"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "F#7",
          "treble": {
            "note": "F#7",
            "letter": "F",
            "accidental": "#",
            "octave": 7,
            "midi": 102,
            "clef": "treble",
            "staff_step_from_bottom_line": 22,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22
            ],
            "key_number_88": 82,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "F#7",
            "letter": "F",
            "accidental": "#",
            "octave": 7,
            "midi": 102,
            "clef": "bass",
            "staff_step_from_bottom_line": 34,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32,
              34
            ],
            "key_number_88": 82,
            "key_number_61_C2_C7": null
          }
        },
        {
          "name": "Gb7",
          "treble": {
            "note": "Gb7",
            "letter": "G",
            "accidental": "b",
            "octave": 7,
            "midi": 102,
            "clef": "treble",
            "staff_step_from_bottom_line": 23,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22
            ],
            "key_number_88": 82,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "Gb7",
            "letter": "G",
            "accidental": "b",
            "octave": 7,
            "midi": 102,
            "clef": "bass",
            "staff_step_from_bottom_line": 35,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32,
              34
            ],
            "key_number_88": 82,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 83,
      "midi": 103,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "G7"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "G7",
          "treble": {
            "note": "G7",
            "letter": "G",
            "accidental": null,
            "octave": 7,
            "midi": 103,
            "clef": "treble",
            "staff_step_from_bottom_line": 23,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22
            ],
            "key_number_88": 83,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "G7",
            "letter": "G",
            "accidental": null,
            "octave": 7,
            "midi": 103,
            "clef": "bass",
            "staff_step_from_bottom_line": 35,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32,
              34
            ],
            "key_number_88": 83,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 84,
      "midi": 104,
      "key_number_61_C2_C7": null,
      "color": "black",
      "display_names": [
        "G#7",
        "Ab7"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "G#7",
          "treble": {
            "note": "G#7",
            "letter": "G",
            "accidental": "#",
            "octave": 7,
            "midi": 104,
            "clef": "treble",
            "staff_step_from_bottom_line": 23,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22
            ],
            "key_number_88": 84,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "G#7",
            "letter": "G",
            "accidental": "#",
            "octave": 7,
            "midi": 104,
            "clef": "bass",
            "staff_step_from_bottom_line": 35,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32,
              34
            ],
            "key_number_88": 84,
            "key_number_61_C2_C7": null
          }
        },
        {
          "name": "Ab7",
          "treble": {
            "note": "Ab7",
            "letter": "A",
            "accidental": "b",
            "octave": 7,
            "midi": 104,
            "clef": "treble",
            "staff_step_from_bottom_line": 24,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24
            ],
            "key_number_88": 84,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "Ab7",
            "letter": "A",
            "accidental": "b",
            "octave": 7,
            "midi": 104,
            "clef": "bass",
            "staff_step_from_bottom_line": 36,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32,
              34,
              36
            ],
            "key_number_88": 84,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 85,
      "midi": 105,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "A7"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "A7",
          "treble": {
            "note": "A7",
            "letter": "A",
            "accidental": null,
            "octave": 7,
            "midi": 105,
            "clef": "treble",
            "staff_step_from_bottom_line": 24,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24
            ],
            "key_number_88": 85,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "A7",
            "letter": "A",
            "accidental": null,
            "octave": 7,
            "midi": 105,
            "clef": "bass",
            "staff_step_from_bottom_line": 36,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32,
              34,
              36
            ],
            "key_number_88": 85,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 86,
      "midi": 106,
      "key_number_61_C2_C7": null,
      "color": "black",
      "display_names": [
        "A#7",
        "Bb7"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "A#7",
          "treble": {
            "note": "A#7",
            "letter": "A",
            "accidental": "#",
            "octave": 7,
            "midi": 106,
            "clef": "treble",
            "staff_step_from_bottom_line": 24,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24
            ],
            "key_number_88": 86,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "A#7",
            "letter": "A",
            "accidental": "#",
            "octave": 7,
            "midi": 106,
            "clef": "bass",
            "staff_step_from_bottom_line": 36,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32,
              34,
              36
            ],
            "key_number_88": 86,
            "key_number_61_C2_C7": null
          }
        },
        {
          "name": "Bb7",
          "treble": {
            "note": "Bb7",
            "letter": "B",
            "accidental": "b",
            "octave": 7,
            "midi": 106,
            "clef": "treble",
            "staff_step_from_bottom_line": 25,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24
            ],
            "key_number_88": 86,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "Bb7",
            "letter": "B",
            "accidental": "b",
            "octave": 7,
            "midi": 106,
            "clef": "bass",
            "staff_step_from_bottom_line": 37,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32,
              34,
              36
            ],
            "key_number_88": 86,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 87,
      "midi": 107,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "B7"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "B7",
          "treble": {
            "note": "B7",
            "letter": "B",
            "accidental": null,
            "octave": 7,
            "midi": 107,
            "clef": "treble",
            "staff_step_from_bottom_line": 25,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24
            ],
            "key_number_88": 87,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "B7",
            "letter": "B",
            "accidental": null,
            "octave": 7,
            "midi": 107,
            "clef": "bass",
            "staff_step_from_bottom_line": 37,
            "position": {
              "type": "outer_space",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32,
              34,
              36
            ],
            "key_number_88": 87,
            "key_number_61_C2_C7": null
          }
        }
      ]
    },
    {
      "key_number_88": 88,
      "midi": 108,
      "key_number_61_C2_C7": null,
      "color": "white",
      "display_names": [
        "C8"
      ],
      "preferred_clef": "treble",
      "staff_spellings": [
        {
          "name": "C8",
          "treble": {
            "note": "C8",
            "letter": "C",
            "accidental": null,
            "octave": 8,
            "midi": 108,
            "clef": "treble",
            "staff_step_from_bottom_line": 26,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26
            ],
            "key_number_88": 88,
            "key_number_61_C2_C7": null
          },
          "bass": {
            "note": "C8",
            "letter": "C",
            "accidental": null,
            "octave": 8,
            "midi": 108,
            "clef": "bass",
            "staff_step_from_bottom_line": 38,
            "position": {
              "type": "ledger_line",
              "side": "above",
              "description": "above staff"
            },
            "ledger_line_steps": [
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              32,
              34,
              36,
              38
            ],
            "key_number_88": 88,
            "key_number_61_C2_C7": null
          }
        }
      ]
    }
  ],
  "range_modes": [
    {
      "id": "focus",
      "label": "Around middle C",
      "min_midi": 48,
      "max_midi": 72,
      "display_range": [
        "C3",
        "C5"
      ],
      "status": "content_prepared",
      "evidence_status": "[推断] 编辑默认显示范围"
    },
    {
      "id": "88_keys",
      "label": "88 keys: A0-C8",
      "min_midi": 21,
      "max_midi": 108,
      "key_count": 88,
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-YAMAHA-88"
      ]
    },
    {
      "id": "61_keys",
      "label": "61 keys: C2-C7 layout",
      "min_midi": 36,
      "max_midi": 96,
      "key_count": 61,
      "evidence_status": "[已核实] 布局实例；[推断] 作为本页61键预设",
      "source_ids": [
        "BN-VOX-61",
        "BN-ROLAND-61"
      ],
      "first_release_scope": "后续同页补齐",
      "device_detection": false
    }
  ],
  "default_linked_example": {
    "selected_note": "C4",
    "selected_midi": 60,
    "key_number_88": 40,
    "key_number_61_C2_C7": 25,
    "treble": {
      "note": "C4",
      "letter": "C",
      "accidental": null,
      "octave": 4,
      "midi": 60,
      "clef": "treble",
      "staff_step_from_bottom_line": -2,
      "position": {
        "type": "ledger_line",
        "side": "below",
        "description": "below staff"
      },
      "ledger_line_steps": [
        -2
      ],
      "key_number_88": 40,
      "key_number_61_C2_C7": 25
    },
    "bass": {
      "note": "C4",
      "letter": "C",
      "accidental": null,
      "octave": 4,
      "midi": 60,
      "clef": "bass",
      "staff_step_from_bottom_line": 10,
      "position": {
        "type": "ledger_line",
        "side": "above",
        "description": "above staff"
      },
      "ledger_line_steps": [
        10
      ],
      "key_number_88": 40,
      "key_number_61_C2_C7": 25
    },
    "caption": "Middle C (C4): one piano key, shown in two clefs.",
    "interaction_status": "specified_not_implemented",
    "evidence_status": "[推断] 示例选择与数值映射；谱位关系已双源核实"
  },
  "additional_linked_examples": [
    {
      "label": "Treble anchor G4",
      "staff": {
        "note": "G4",
        "letter": "G",
        "accidental": null,
        "octave": 4,
        "midi": 67,
        "clef": "treble",
        "staff_step_from_bottom_line": 2,
        "position": {
          "type": "line",
          "number_from_bottom": 2
        },
        "ledger_line_steps": [],
        "key_number_88": 47,
        "key_number_61_C2_C7": 32
      }
    },
    {
      "label": "Bass anchor F3",
      "staff": {
        "note": "F3",
        "letter": "F",
        "accidental": null,
        "octave": 3,
        "midi": 53,
        "clef": "bass",
        "staff_step_from_bottom_line": 6,
        "position": {
          "type": "line",
          "number_from_bottom": 4
        },
        "ledger_line_steps": [],
        "key_number_88": 33,
        "key_number_61_C2_C7": 18
      }
    },
    {
      "label": "Same key, different spelling",
      "spellings": [
        {
          "note": "F#4",
          "letter": "F",
          "accidental": "#",
          "octave": 4,
          "midi": 66,
          "clef": "treble",
          "staff_step_from_bottom_line": 1,
          "position": {
            "type": "space",
            "number_from_bottom": 1
          },
          "ledger_line_steps": [],
          "key_number_88": 46,
          "key_number_61_C2_C7": 31
        },
        {
          "note": "Gb4",
          "letter": "G",
          "accidental": "b",
          "octave": 4,
          "midi": 66,
          "clef": "treble",
          "staff_step_from_bottom_line": 2,
          "position": {
            "type": "line",
            "number_from_bottom": 2
          },
          "ledger_line_steps": [],
          "key_number_88": 46,
          "key_number_61_C2_C7": 31
        }
      ],
      "same_midi": 66
    }
  ],
  "solfege": {
    "enabled": false,
    "mapping": null,
    "status": "reserved_rule_undecided",
    "source_group_id": "P146"
  },
  "print_and_interaction": {
    "status": "implementation_pending",
    "pdf_asset": null,
    "button_enable_when": "An actual printable layout or PDF exists and passes visual QA.",
    "print_payload": [
      "selected range endpoints",
      "clef names",
      "staff coordinates and ledger lines",
      "note names with octave numbers",
      "matching keyboard keys",
      "legend: same pitch may have multiple spellings"
    ],
    "autoplay": false,
    "sound_rule": "Only explicit play action triggers the selected MIDI pitch; changing clef preserves selected pitch.",
    "exclude": [
      "photo or score upload recognition",
      "microphone recognition",
      "scoring",
      "solfege toggle"
    ]
  },
  "related_links": [
    {
      "label": "Learn to read piano sheet music",
      "url": "/guide/read-sheet-music"
    },
    {
      "label": "Piano key signatures",
      "url": "/keyboard-notes/key-signatures"
    }
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P121 | content_and_data_ready_render_pending | ['88键逐键数据，含音名、两谱号位置、加线和键序', '默认中央C双谱号同键示例', '英文读图说明与当前范围打印字段'] | ['谱表/键盘联动实现和打印视觉验收'] |
| P132 | later_scope_data_prepared | ['C2-C7的61键映射，首末键及中央C位置', '两家厂商实际范围来源与型号/移调限定'] | ['谱表/键盘联动实现和打印视觉验收', '保持原后续同页范围发布顺序'] |
| P143 | content_and_data_ready_render_pending | ['低音谱C2-C4实际15个自然音位置与25个半音琴键映射', 'G2/B2/D3/F3/A3线与A2/C3/E3/G3间对照', '完整88键各自低音谱位可按范围取用'] | ['谱表/键盘联动实现和打印视觉验收'] |
| P145 | content_and_data_ready_render_pending | ['高音谱C4-C6实际15个自然音位置与25个半音琴键映射', 'E4/G4/B4/D5/F5线与F4/A4/C5/E5间对照', '完整88键各自高音谱位可按范围取用'] | ['谱表/键盘联动实现和打印视觉验收'] |
| P146 | reserved_not_enabled_rule_pending | ['任务和原限制保留；enabled=false与mapping=null'] | ['明确唱名规则后才能写映射和开放'] |

### 待确认

- BN-U069-SOLFEGE — data.solfege：原规划明确 do re mi 规则未定，首版不开放。；解决：后续明确固定唱名或首调唱名、minor规则及显示目的，再单独准备与审核映射；当前不补写、不开放。
- BN-U069-RENDER — data.print_and_interaction：音名/键位/谱位数据及默认联动样例已交付；尚未生成并视觉验收实际谱表、键盘图、交互或PDF。；解决：Codex用本包坐标与音高数据渲染；逐点检查C4两谱号同键、黑键两种拼写不同谱位、范围端点，打印不能挤成不可读整行。
- BN-U069-RANGE — data.range_modes.61_keys：C2-C7布局已核实，但原规划仍是后续同页补齐；不是根据61键数自动推定所有型号与设置相同。；解决：保留起止音说明并在实现时验收范围模式；不改变原first_release_scope，不默认开放任何具体设备自动识别。

来源：BN-OMT-CLEFS, BN-MUSICCA-CLEFS, BN-MUSICCA-STAFF, BN-MUSICCA-NOTES, BN-PUGET-OCTAVES, BN-MUSICCA-ACCIDENTALS, BN-VOX-61, BN-ROLAND-61, BN-YAMAHA-88, BN-BMT-MIDI

## /keyboard-notes/frequencies

[已核实] 目标关键词：`note frequency chart`；模板 T20；基线优先级：后做。
状态：`content_and_calculated_88_note_dataset_ready; rendered chart pending`；发布状态：未验收。

任务：Look up a named piano note or MIDI number and locate its key and A440 equal-tempered frequency.

### 页面需回答的问题

- What is the frequency of C4?
- Which frequency corresponds to each of the 88 piano keys?
- What tuning reference does this chart use?
- How do MIDI numbers differ from piano key numbers and octave names?

### 英文页面内容

**Piano Note Frequency Chart: A0–C8**

Look up all 88 piano keys by note, MIDI number and calculated frequency in hertz, using A4 = 440 Hz.

#### Read the tuning label first

This chart uses twelve-tone equal temperament with A4 set to 440 Hz. Each semitone has the same frequency ratio, and an octave doubles the frequency. The values are calculated reference frequencies. They are not measurements of an individual piano or a promise about its current tuning.

[已核实] 来源：BR-01, BR-02。 

#### Find the note and the key

The table runs from A0, piano key 1, to C8, piano key 88. It includes black keys and their common sharp/flat names. Use the piano key number to locate a key from the left end of an 88-key keyboard; use the MIDI number when matching a software note event. These are different numbering systems.

[已核实] 来源：BR-02。 

#### What is the frequency of C4?

With the stated A440 reference, C4 is approximately 261.63 Hz. It is MIDI note 60 and piano key 40 in this chart. A4 is MIDI note 69 and 440.00 Hz. Frequencies in the visible table are rounded to two decimal places; calculations retain more precision.

[推断] 来源：BR-01, BR-02。 

#### Check labels when using other software

This page names middle C as C4. Some instruments or programs use a different octave label for the same MIDI number. Check the numeric MIDI value as well as the note name. Changing the reference frequency changes the resulting frequencies, so comparisons must use the same reference.

[已核实] 来源：BR-01, BR-02。 

#### How the values are calculated

For MIDI note number m, the reference frequency is f = 440 × 2^((m − 69)/12) Hz. For example, moving twelve semitones above A4 gives A5 at 880 Hz. If a comparison instead assumes A4 = 442 Hz, replace 440 with 442; that is a different reference table.

[推断] 来源：BR-01, BR-02。 

### 结构化数据

```json
{
  "reference": {
    "temperament": "12-tone equal temperament",
    "reference_note": "A4",
    "reference_midi_number": 69,
    "reference_frequency_hz": 440,
    "octave_naming": "scientific pitch notation; middle C=C4; octave increments at C",
    "evidence_status": "[已核实]",
    "source_ids": [
      "BR-01",
      "BR-02"
    ],
    "not_a_universal_instrument_setting": true
  },
  "formula": {
    "expression": "f(m) = 440 * 2^((m - 69) / 12)",
    "units": "Hz",
    "m": "integer MIDI note number",
    "evidence_status": "[已核实]",
    "source_ids": [
      "BR-01",
      "BR-02"
    ]
  },
  "calculation": {
    "evidence_status": "[推断]",
    "basis": "All 88 values calculated from verified formula; numeric endpoints and six internal landmarks cross-checked with BR-02. No recorded piano measurements.",
    "unrounded_calculation": "Use full numerical precision before display formatting.",
    "stored_precision_decimal_places": 9,
    "display_precision_decimal_places": 2
  },
  "range": {
    "first_note": "A0",
    "last_note": "C8",
    "first_midi": 21,
    "last_midi": 108,
    "piano_keys": 88,
    "source_ids": [
      "BR-02"
    ],
    "evidence_status": "[已核实]"
  },
  "frequency_rows": [
    {
      "piano_key_number": 1,
      "midi_number": 21,
      "note": "A0",
      "pitch_class": "A",
      "octave": 0,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 27.5,
      "frequency_display_hz": "27.50",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 1,
        "midi_number": 21
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 2,
      "midi_number": 22,
      "note": "A#0",
      "pitch_class": "A#",
      "octave": 0,
      "enharmonic_aliases": [
        "Bb0"
      ],
      "key_color": "black",
      "frequency_hz": 29.135235095,
      "frequency_display_hz": "29.14",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 2,
        "midi_number": 22
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 3,
      "midi_number": 23,
      "note": "B0",
      "pitch_class": "B",
      "octave": 0,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 30.867706329,
      "frequency_display_hz": "30.87",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 3,
        "midi_number": 23
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 4,
      "midi_number": 24,
      "note": "C1",
      "pitch_class": "C",
      "octave": 1,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 32.703195663,
      "frequency_display_hz": "32.70",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 4,
        "midi_number": 24
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 5,
      "midi_number": 25,
      "note": "C#1",
      "pitch_class": "C#",
      "octave": 1,
      "enharmonic_aliases": [
        "Db1"
      ],
      "key_color": "black",
      "frequency_hz": 34.647828872,
      "frequency_display_hz": "34.65",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 5,
        "midi_number": 25
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 6,
      "midi_number": 26,
      "note": "D1",
      "pitch_class": "D",
      "octave": 1,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 36.70809599,
      "frequency_display_hz": "36.71",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 6,
        "midi_number": 26
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 7,
      "midi_number": 27,
      "note": "D#1",
      "pitch_class": "D#",
      "octave": 1,
      "enharmonic_aliases": [
        "Eb1"
      ],
      "key_color": "black",
      "frequency_hz": 38.890872965,
      "frequency_display_hz": "38.89",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 7,
        "midi_number": 27
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 8,
      "midi_number": 28,
      "note": "E1",
      "pitch_class": "E",
      "octave": 1,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 41.203444614,
      "frequency_display_hz": "41.20",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 8,
        "midi_number": 28
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 9,
      "midi_number": 29,
      "note": "F1",
      "pitch_class": "F",
      "octave": 1,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 43.653528929,
      "frequency_display_hz": "43.65",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 9,
        "midi_number": 29
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 10,
      "midi_number": 30,
      "note": "F#1",
      "pitch_class": "F#",
      "octave": 1,
      "enharmonic_aliases": [
        "Gb1"
      ],
      "key_color": "black",
      "frequency_hz": 46.249302839,
      "frequency_display_hz": "46.25",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 10,
        "midi_number": 30
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 11,
      "midi_number": 31,
      "note": "G1",
      "pitch_class": "G",
      "octave": 1,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 48.999429498,
      "frequency_display_hz": "49.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 11,
        "midi_number": 31
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 12,
      "midi_number": 32,
      "note": "G#1",
      "pitch_class": "G#",
      "octave": 1,
      "enharmonic_aliases": [
        "Ab1"
      ],
      "key_color": "black",
      "frequency_hz": 51.913087197,
      "frequency_display_hz": "51.91",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 12,
        "midi_number": 32
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 13,
      "midi_number": 33,
      "note": "A1",
      "pitch_class": "A",
      "octave": 1,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 55.0,
      "frequency_display_hz": "55.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 13,
        "midi_number": 33
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 14,
      "midi_number": 34,
      "note": "A#1",
      "pitch_class": "A#",
      "octave": 1,
      "enharmonic_aliases": [
        "Bb1"
      ],
      "key_color": "black",
      "frequency_hz": 58.27047019,
      "frequency_display_hz": "58.27",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 14,
        "midi_number": 34
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 15,
      "midi_number": 35,
      "note": "B1",
      "pitch_class": "B",
      "octave": 1,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 61.735412657,
      "frequency_display_hz": "61.74",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 15,
        "midi_number": 35
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 16,
      "midi_number": 36,
      "note": "C2",
      "pitch_class": "C",
      "octave": 2,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 65.406391325,
      "frequency_display_hz": "65.41",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 16,
        "midi_number": 36
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 17,
      "midi_number": 37,
      "note": "C#2",
      "pitch_class": "C#",
      "octave": 2,
      "enharmonic_aliases": [
        "Db2"
      ],
      "key_color": "black",
      "frequency_hz": 69.295657744,
      "frequency_display_hz": "69.30",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 17,
        "midi_number": 37
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 18,
      "midi_number": 38,
      "note": "D2",
      "pitch_class": "D",
      "octave": 2,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 73.416191979,
      "frequency_display_hz": "73.42",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 18,
        "midi_number": 38
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 19,
      "midi_number": 39,
      "note": "D#2",
      "pitch_class": "D#",
      "octave": 2,
      "enharmonic_aliases": [
        "Eb2"
      ],
      "key_color": "black",
      "frequency_hz": 77.781745931,
      "frequency_display_hz": "77.78",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 19,
        "midi_number": 39
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 20,
      "midi_number": 40,
      "note": "E2",
      "pitch_class": "E",
      "octave": 2,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 82.406889228,
      "frequency_display_hz": "82.41",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 20,
        "midi_number": 40
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 21,
      "midi_number": 41,
      "note": "F2",
      "pitch_class": "F",
      "octave": 2,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 87.307057858,
      "frequency_display_hz": "87.31",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 21,
        "midi_number": 41
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 22,
      "midi_number": 42,
      "note": "F#2",
      "pitch_class": "F#",
      "octave": 2,
      "enharmonic_aliases": [
        "Gb2"
      ],
      "key_color": "black",
      "frequency_hz": 92.498605678,
      "frequency_display_hz": "92.50",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 22,
        "midi_number": 42
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 23,
      "midi_number": 43,
      "note": "G2",
      "pitch_class": "G",
      "octave": 2,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 97.998858995,
      "frequency_display_hz": "98.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 23,
        "midi_number": 43
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 24,
      "midi_number": 44,
      "note": "G#2",
      "pitch_class": "G#",
      "octave": 2,
      "enharmonic_aliases": [
        "Ab2"
      ],
      "key_color": "black",
      "frequency_hz": 103.826174395,
      "frequency_display_hz": "103.83",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 24,
        "midi_number": 44
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 25,
      "midi_number": 45,
      "note": "A2",
      "pitch_class": "A",
      "octave": 2,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 110.0,
      "frequency_display_hz": "110.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 25,
        "midi_number": 45
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 26,
      "midi_number": 46,
      "note": "A#2",
      "pitch_class": "A#",
      "octave": 2,
      "enharmonic_aliases": [
        "Bb2"
      ],
      "key_color": "black",
      "frequency_hz": 116.54094038,
      "frequency_display_hz": "116.54",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 26,
        "midi_number": 46
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 27,
      "midi_number": 47,
      "note": "B2",
      "pitch_class": "B",
      "octave": 2,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 123.470825314,
      "frequency_display_hz": "123.47",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 27,
        "midi_number": 47
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 28,
      "midi_number": 48,
      "note": "C3",
      "pitch_class": "C",
      "octave": 3,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 130.81278265,
      "frequency_display_hz": "130.81",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 28,
        "midi_number": 48
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 29,
      "midi_number": 49,
      "note": "C#3",
      "pitch_class": "C#",
      "octave": 3,
      "enharmonic_aliases": [
        "Db3"
      ],
      "key_color": "black",
      "frequency_hz": 138.591315488,
      "frequency_display_hz": "138.59",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 29,
        "midi_number": 49
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 30,
      "midi_number": 50,
      "note": "D3",
      "pitch_class": "D",
      "octave": 3,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 146.832383959,
      "frequency_display_hz": "146.83",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 30,
        "midi_number": 50
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 31,
      "midi_number": 51,
      "note": "D#3",
      "pitch_class": "D#",
      "octave": 3,
      "enharmonic_aliases": [
        "Eb3"
      ],
      "key_color": "black",
      "frequency_hz": 155.563491861,
      "frequency_display_hz": "155.56",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 31,
        "midi_number": 51
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 32,
      "midi_number": 52,
      "note": "E3",
      "pitch_class": "E",
      "octave": 3,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 164.813778456,
      "frequency_display_hz": "164.81",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 32,
        "midi_number": 52
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 33,
      "midi_number": 53,
      "note": "F3",
      "pitch_class": "F",
      "octave": 3,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 174.614115717,
      "frequency_display_hz": "174.61",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 33,
        "midi_number": 53
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 34,
      "midi_number": 54,
      "note": "F#3",
      "pitch_class": "F#",
      "octave": 3,
      "enharmonic_aliases": [
        "Gb3"
      ],
      "key_color": "black",
      "frequency_hz": 184.997211356,
      "frequency_display_hz": "185.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 34,
        "midi_number": 54
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 35,
      "midi_number": 55,
      "note": "G3",
      "pitch_class": "G",
      "octave": 3,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 195.997717991,
      "frequency_display_hz": "196.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 35,
        "midi_number": 55
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 36,
      "midi_number": 56,
      "note": "G#3",
      "pitch_class": "G#",
      "octave": 3,
      "enharmonic_aliases": [
        "Ab3"
      ],
      "key_color": "black",
      "frequency_hz": 207.65234879,
      "frequency_display_hz": "207.65",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 36,
        "midi_number": 56
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 37,
      "midi_number": 57,
      "note": "A3",
      "pitch_class": "A",
      "octave": 3,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 220.0,
      "frequency_display_hz": "220.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 37,
        "midi_number": 57
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 38,
      "midi_number": 58,
      "note": "A#3",
      "pitch_class": "A#",
      "octave": 3,
      "enharmonic_aliases": [
        "Bb3"
      ],
      "key_color": "black",
      "frequency_hz": 233.081880759,
      "frequency_display_hz": "233.08",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 38,
        "midi_number": 58
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 39,
      "midi_number": 59,
      "note": "B3",
      "pitch_class": "B",
      "octave": 3,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 246.941650628,
      "frequency_display_hz": "246.94",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 39,
        "midi_number": 59
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 40,
      "midi_number": 60,
      "note": "C4",
      "pitch_class": "C",
      "octave": 4,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 261.625565301,
      "frequency_display_hz": "261.63",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 40,
        "midi_number": 60
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 41,
      "midi_number": 61,
      "note": "C#4",
      "pitch_class": "C#",
      "octave": 4,
      "enharmonic_aliases": [
        "Db4"
      ],
      "key_color": "black",
      "frequency_hz": 277.182630977,
      "frequency_display_hz": "277.18",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 41,
        "midi_number": 61
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 42,
      "midi_number": 62,
      "note": "D4",
      "pitch_class": "D",
      "octave": 4,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 293.664767917,
      "frequency_display_hz": "293.66",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 42,
        "midi_number": 62
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 43,
      "midi_number": 63,
      "note": "D#4",
      "pitch_class": "D#",
      "octave": 4,
      "enharmonic_aliases": [
        "Eb4"
      ],
      "key_color": "black",
      "frequency_hz": 311.126983722,
      "frequency_display_hz": "311.13",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 43,
        "midi_number": 63
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 44,
      "midi_number": 64,
      "note": "E4",
      "pitch_class": "E",
      "octave": 4,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 329.627556913,
      "frequency_display_hz": "329.63",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 44,
        "midi_number": 64
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 45,
      "midi_number": 65,
      "note": "F4",
      "pitch_class": "F",
      "octave": 4,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 349.228231433,
      "frequency_display_hz": "349.23",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 45,
        "midi_number": 65
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 46,
      "midi_number": 66,
      "note": "F#4",
      "pitch_class": "F#",
      "octave": 4,
      "enharmonic_aliases": [
        "Gb4"
      ],
      "key_color": "black",
      "frequency_hz": 369.994422712,
      "frequency_display_hz": "369.99",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 46,
        "midi_number": 66
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 47,
      "midi_number": 67,
      "note": "G4",
      "pitch_class": "G",
      "octave": 4,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 391.995435982,
      "frequency_display_hz": "392.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 47,
        "midi_number": 67
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 48,
      "midi_number": 68,
      "note": "G#4",
      "pitch_class": "G#",
      "octave": 4,
      "enharmonic_aliases": [
        "Ab4"
      ],
      "key_color": "black",
      "frequency_hz": 415.30469758,
      "frequency_display_hz": "415.30",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 48,
        "midi_number": 68
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 49,
      "midi_number": 69,
      "note": "A4",
      "pitch_class": "A",
      "octave": 4,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 440.0,
      "frequency_display_hz": "440.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 49,
        "midi_number": 69
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 50,
      "midi_number": 70,
      "note": "A#4",
      "pitch_class": "A#",
      "octave": 4,
      "enharmonic_aliases": [
        "Bb4"
      ],
      "key_color": "black",
      "frequency_hz": 466.163761518,
      "frequency_display_hz": "466.16",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 50,
        "midi_number": 70
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 51,
      "midi_number": 71,
      "note": "B4",
      "pitch_class": "B",
      "octave": 4,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 493.883301256,
      "frequency_display_hz": "493.88",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 51,
        "midi_number": 71
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 52,
      "midi_number": 72,
      "note": "C5",
      "pitch_class": "C",
      "octave": 5,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 523.251130601,
      "frequency_display_hz": "523.25",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 52,
        "midi_number": 72
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 53,
      "midi_number": 73,
      "note": "C#5",
      "pitch_class": "C#",
      "octave": 5,
      "enharmonic_aliases": [
        "Db5"
      ],
      "key_color": "black",
      "frequency_hz": 554.365261954,
      "frequency_display_hz": "554.37",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 53,
        "midi_number": 73
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 54,
      "midi_number": 74,
      "note": "D5",
      "pitch_class": "D",
      "octave": 5,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 587.329535835,
      "frequency_display_hz": "587.33",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 54,
        "midi_number": 74
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 55,
      "midi_number": 75,
      "note": "D#5",
      "pitch_class": "D#",
      "octave": 5,
      "enharmonic_aliases": [
        "Eb5"
      ],
      "key_color": "black",
      "frequency_hz": 622.253967444,
      "frequency_display_hz": "622.25",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 55,
        "midi_number": 75
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 56,
      "midi_number": 76,
      "note": "E5",
      "pitch_class": "E",
      "octave": 5,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 659.255113826,
      "frequency_display_hz": "659.26",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 56,
        "midi_number": 76
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 57,
      "midi_number": 77,
      "note": "F5",
      "pitch_class": "F",
      "octave": 5,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 698.456462866,
      "frequency_display_hz": "698.46",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 57,
        "midi_number": 77
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 58,
      "midi_number": 78,
      "note": "F#5",
      "pitch_class": "F#",
      "octave": 5,
      "enharmonic_aliases": [
        "Gb5"
      ],
      "key_color": "black",
      "frequency_hz": 739.988845423,
      "frequency_display_hz": "739.99",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 58,
        "midi_number": 78
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 59,
      "midi_number": 79,
      "note": "G5",
      "pitch_class": "G",
      "octave": 5,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 783.990871963,
      "frequency_display_hz": "783.99",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 59,
        "midi_number": 79
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 60,
      "midi_number": 80,
      "note": "G#5",
      "pitch_class": "G#",
      "octave": 5,
      "enharmonic_aliases": [
        "Ab5"
      ],
      "key_color": "black",
      "frequency_hz": 830.60939516,
      "frequency_display_hz": "830.61",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 60,
        "midi_number": 80
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 61,
      "midi_number": 81,
      "note": "A5",
      "pitch_class": "A",
      "octave": 5,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 880.0,
      "frequency_display_hz": "880.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 61,
        "midi_number": 81
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 62,
      "midi_number": 82,
      "note": "A#5",
      "pitch_class": "A#",
      "octave": 5,
      "enharmonic_aliases": [
        "Bb5"
      ],
      "key_color": "black",
      "frequency_hz": 932.327523036,
      "frequency_display_hz": "932.33",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 62,
        "midi_number": 82
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 63,
      "midi_number": 83,
      "note": "B5",
      "pitch_class": "B",
      "octave": 5,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 987.766602512,
      "frequency_display_hz": "987.77",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 63,
        "midi_number": 83
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 64,
      "midi_number": 84,
      "note": "C6",
      "pitch_class": "C",
      "octave": 6,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 1046.502261202,
      "frequency_display_hz": "1046.50",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 64,
        "midi_number": 84
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 65,
      "midi_number": 85,
      "note": "C#6",
      "pitch_class": "C#",
      "octave": 6,
      "enharmonic_aliases": [
        "Db6"
      ],
      "key_color": "black",
      "frequency_hz": 1108.730523907,
      "frequency_display_hz": "1108.73",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 65,
        "midi_number": 85
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 66,
      "midi_number": 86,
      "note": "D6",
      "pitch_class": "D",
      "octave": 6,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 1174.65907167,
      "frequency_display_hz": "1174.66",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 66,
        "midi_number": 86
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 67,
      "midi_number": 87,
      "note": "D#6",
      "pitch_class": "D#",
      "octave": 6,
      "enharmonic_aliases": [
        "Eb6"
      ],
      "key_color": "black",
      "frequency_hz": 1244.507934888,
      "frequency_display_hz": "1244.51",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 67,
        "midi_number": 87
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 68,
      "midi_number": 88,
      "note": "E6",
      "pitch_class": "E",
      "octave": 6,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 1318.510227651,
      "frequency_display_hz": "1318.51",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 68,
        "midi_number": 88
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 69,
      "midi_number": 89,
      "note": "F6",
      "pitch_class": "F",
      "octave": 6,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 1396.912925732,
      "frequency_display_hz": "1396.91",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 69,
        "midi_number": 89
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 70,
      "midi_number": 90,
      "note": "F#6",
      "pitch_class": "F#",
      "octave": 6,
      "enharmonic_aliases": [
        "Gb6"
      ],
      "key_color": "black",
      "frequency_hz": 1479.977690847,
      "frequency_display_hz": "1479.98",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 70,
        "midi_number": 90
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 71,
      "midi_number": 91,
      "note": "G6",
      "pitch_class": "G",
      "octave": 6,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 1567.981743927,
      "frequency_display_hz": "1567.98",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 71,
        "midi_number": 91
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 72,
      "midi_number": 92,
      "note": "G#6",
      "pitch_class": "G#",
      "octave": 6,
      "enharmonic_aliases": [
        "Ab6"
      ],
      "key_color": "black",
      "frequency_hz": 1661.21879032,
      "frequency_display_hz": "1661.22",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 72,
        "midi_number": 92
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 73,
      "midi_number": 93,
      "note": "A6",
      "pitch_class": "A",
      "octave": 6,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 1760.0,
      "frequency_display_hz": "1760.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 73,
        "midi_number": 93
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 74,
      "midi_number": 94,
      "note": "A#6",
      "pitch_class": "A#",
      "octave": 6,
      "enharmonic_aliases": [
        "Bb6"
      ],
      "key_color": "black",
      "frequency_hz": 1864.655046072,
      "frequency_display_hz": "1864.66",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 74,
        "midi_number": 94
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 75,
      "midi_number": 95,
      "note": "B6",
      "pitch_class": "B",
      "octave": 6,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 1975.533205024,
      "frequency_display_hz": "1975.53",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 75,
        "midi_number": 95
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 76,
      "midi_number": 96,
      "note": "C7",
      "pitch_class": "C",
      "octave": 7,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 2093.004522405,
      "frequency_display_hz": "2093.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 76,
        "midi_number": 96
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 77,
      "midi_number": 97,
      "note": "C#7",
      "pitch_class": "C#",
      "octave": 7,
      "enharmonic_aliases": [
        "Db7"
      ],
      "key_color": "black",
      "frequency_hz": 2217.461047815,
      "frequency_display_hz": "2217.46",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 77,
        "midi_number": 97
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 78,
      "midi_number": 98,
      "note": "D7",
      "pitch_class": "D",
      "octave": 7,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 2349.318143339,
      "frequency_display_hz": "2349.32",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 78,
        "midi_number": 98
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 79,
      "midi_number": 99,
      "note": "D#7",
      "pitch_class": "D#",
      "octave": 7,
      "enharmonic_aliases": [
        "Eb7"
      ],
      "key_color": "black",
      "frequency_hz": 2489.015869777,
      "frequency_display_hz": "2489.02",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 79,
        "midi_number": 99
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 80,
      "midi_number": 100,
      "note": "E7",
      "pitch_class": "E",
      "octave": 7,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 2637.020455303,
      "frequency_display_hz": "2637.02",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 80,
        "midi_number": 100
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 81,
      "midi_number": 101,
      "note": "F7",
      "pitch_class": "F",
      "octave": 7,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 2793.825851464,
      "frequency_display_hz": "2793.83",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 81,
        "midi_number": 101
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 82,
      "midi_number": 102,
      "note": "F#7",
      "pitch_class": "F#",
      "octave": 7,
      "enharmonic_aliases": [
        "Gb7"
      ],
      "key_color": "black",
      "frequency_hz": 2959.955381693,
      "frequency_display_hz": "2959.96",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 82,
        "midi_number": 102
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 83,
      "midi_number": 103,
      "note": "G7",
      "pitch_class": "G",
      "octave": 7,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 3135.963487854,
      "frequency_display_hz": "3135.96",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 83,
        "midi_number": 103
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 84,
      "midi_number": 104,
      "note": "G#7",
      "pitch_class": "G#",
      "octave": 7,
      "enharmonic_aliases": [
        "Ab7"
      ],
      "key_color": "black",
      "frequency_hz": 3322.43758064,
      "frequency_display_hz": "3322.44",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 84,
        "midi_number": 104
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 85,
      "midi_number": 105,
      "note": "A7",
      "pitch_class": "A",
      "octave": 7,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 3520.0,
      "frequency_display_hz": "3520.00",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 85,
        "midi_number": 105
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 86,
      "midi_number": 106,
      "note": "A#7",
      "pitch_class": "A#",
      "octave": 7,
      "enharmonic_aliases": [
        "Bb7"
      ],
      "key_color": "black",
      "frequency_hz": 3729.310092145,
      "frequency_display_hz": "3729.31",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 86,
        "midi_number": 106
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 87,
      "midi_number": 107,
      "note": "B7",
      "pitch_class": "B",
      "octave": 7,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 3951.066410049,
      "frequency_display_hz": "3951.07",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 87,
        "midi_number": 107
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    },
    {
      "piano_key_number": 88,
      "midi_number": 108,
      "note": "C8",
      "pitch_class": "C",
      "octave": 8,
      "enharmonic_aliases": [],
      "key_color": "white",
      "frequency_hz": 4186.00904481,
      "frequency_display_hz": "4186.01",
      "frequency_evidence_status": "[推断]",
      "basis": "Computed from BR-01/BR-02 formula with A4=440; not a measurement.",
      "keyboard_locator": {
        "coordinate_system": "88-key ascending index, including black keys",
        "key_number": 88,
        "midi_number": 108
      },
      "source_ids": [
        "BR-01",
        "BR-02"
      ]
    }
  ],
  "alias_policy": {
    "included": "Common sharp/flat aliases for black keys, under equal temperament.",
    "not_included": "Exhaustive theoretical spellings such as B#, Cb, E# and Fb.",
    "evidence_status": "[推断]",
    "basis": "Editorial lookup scope; frequencies attach to numeric pitch, not the spelling."
  },
  "lookup_examples": [
    {
      "query": "frequency of c4",
      "matched_note": "C4",
      "midi_number": 60,
      "piano_key_number": 40,
      "frequency_hz": 261.625565301,
      "display": "261.63 Hz",
      "evidence_status": "[推断]",
      "basis": "Formula result rounded from A440."
    },
    {
      "query": "Bb4",
      "matched_note": "A#4",
      "midi_number": 70,
      "piano_key_number": 50,
      "frequency_hz": 466.163761518,
      "display": "466.16 Hz",
      "evidence_status": "[推断]",
      "basis": "Enharmonic alias maps to the same numeric pitch in this temperament."
    }
  ],
  "print": {
    "content": [
      "title",
      "tuning reference",
      "full 88-row table",
      "rounding note",
      "source credits"
    ],
    "pdf_asset": null
  },
  "audio": {
    "tuner": false,
    "microphone_input": false,
    "measured_frequencies": null
  },
  "related_urls": [
    "/keyboard-notes",
    "/keyboard-notes/labeled",
    "/keyboard-notes/chart"
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P125 | content_and_data_ready; rendering_pending | 88键逐音音名/常用等音名、MIDI号、琴键号、频率、基准公式、C4直接答复、键位定位输入。 | 最终可视图表/键位高亮验收；打印为可选后续输出。 |

### 待确认

- BR-FREQ-RENDER — rendered_chart_and_keyboard：88行表格与键定位数据已提供；最终桌面/移动端显示与高亮尚未实现验收。；解决：按key_number和MIDI两个独立字段渲染，检查A0/C4/A4/C8及黑键定位；不添加调音器。
- BR-FREQ-PRINT — data.print.pdf_asset：尚未生成实际打印PDF；不得显示已有下载文件。；解决：需要打印入口时生成并检查全部88行和调律说明，无截行/缺页。

来源：BR-01, BR-02, BR-07

## /keyboard-notes/finger-numbers

[已核实] 目标关键词：`piano fingering chart`；模板 T20；基线优先级：后做。
状态：`content_and_hand_mapping_ready; original_diagram_pending`；发布状态：未验收。

任务：Identify the finger meant by a piano fingering number on either hand and follow the correct specific reference.

### 页面需回答的问题

- Which finger is 1 on the left and right hand?
- Why do the two hand diagrams read in opposite directions?
- Do finger numbers name piano keys?
- How are finger numbers different from scale degrees?

### 英文页面内容

**Piano Finger Numbers: Left and Right Hand**

Learn piano finger numbers 1–5 for both hands and distinguish finger labels from note names and scale degrees.

#### Both thumbs are 1

Piano finger numbers use the same labels on both hands: thumb 1, index finger 2, middle finger 3, ring finger 4 and little finger 5. The little finger is also called the pinky. LH means left hand and RH means right hand. Start by checking the hand label as well as the number.

[已核实] 来源：BR-03, BR-04。 

#### Read each hand separately

The diagrams show the backs of your hands as you look down with your fingertips pointing away. The thumbs face inward. From left to right, the left-hand labels read 5, 4, 3, 2, 1, while the right-hand labels read 1, 2, 3, 4, 5. The fingers keep their identities when the picture is mirrored.

[推断] 来源：BR-04。 

#### A number identifies a finger

Finger 1 does not permanently mean C. A fingering mark says which finger is intended for that note in that passage. Published exercises can ask the same thumb to play C and then D. For a particular scale, chord or arpeggio, use its own stated hand, direction and range.

[已核实] 来源：BR-03, BR-06。 

#### Finger numbers and scale degrees

A finger number labels part of your hand. A scale degree labels a note’s position relative to the tonic. Finger 3 means the middle finger; scale degree 3 means the third degree of the scale. Reading one does not tell you the other.

[已核实] 来源：BR-03, BR-05。 

#### Try a quick identification check

Find the left thumb, then the right little finger. Name their numbers before checking the table. Next find finger 2 on each hand. This check only asks you to identify fingers; choose a specific scale or chord reference when you need instructions for playing notes.

[推断] 来源：BR-03, BR-04。 

### 结构化数据

```json
{
  "hands": [
    {
      "hand": "left",
      "abbreviation": "LH",
      "label": "Left hand",
      "fingers": [
        {
          "number": 1,
          "name": "thumb",
          "aliases": [],
          "evidence_status": "[已核实]",
          "source_ids": [
            "BR-03",
            "BR-04"
          ]
        },
        {
          "number": 2,
          "name": "index finger",
          "aliases": [
            "pointer finger"
          ],
          "evidence_status": "[已核实]",
          "source_ids": [
            "BR-03",
            "BR-04"
          ]
        },
        {
          "number": 3,
          "name": "middle finger",
          "aliases": [],
          "evidence_status": "[已核实]",
          "source_ids": [
            "BR-03",
            "BR-04"
          ]
        },
        {
          "number": 4,
          "name": "ring finger",
          "aliases": [],
          "evidence_status": "[已核实]",
          "source_ids": [
            "BR-03",
            "BR-04"
          ]
        },
        {
          "number": 5,
          "name": "little finger",
          "aliases": [
            "pinky"
          ],
          "evidence_status": "[已核实]",
          "source_ids": [
            "BR-03",
            "BR-04"
          ]
        }
      ],
      "diagram": {
        "view": "player looking down at backs of hands; palms down; fingertips away",
        "fingertip_numbers_left_to_right": [
          5,
          4,
          3,
          2,
          1
        ],
        "thumb_side": "right / inward",
        "text_must_not_be_mirrored": true,
        "exact_anatomical_geometry": null,
        "evidence_status": "[推断]",
        "basis": "Diagram orientation chosen for clarity; ordering follows opposite hand layouts and verified finger identities. No hand pose or technique prescription."
      }
    },
    {
      "hand": "right",
      "abbreviation": "RH",
      "label": "Right hand",
      "fingers": [
        {
          "number": 1,
          "name": "thumb",
          "aliases": [],
          "evidence_status": "[已核实]",
          "source_ids": [
            "BR-03",
            "BR-04"
          ]
        },
        {
          "number": 2,
          "name": "index finger",
          "aliases": [
            "pointer finger"
          ],
          "evidence_status": "[已核实]",
          "source_ids": [
            "BR-03",
            "BR-04"
          ]
        },
        {
          "number": 3,
          "name": "middle finger",
          "aliases": [],
          "evidence_status": "[已核实]",
          "source_ids": [
            "BR-03",
            "BR-04"
          ]
        },
        {
          "number": 4,
          "name": "ring finger",
          "aliases": [],
          "evidence_status": "[已核实]",
          "source_ids": [
            "BR-03",
            "BR-04"
          ]
        },
        {
          "number": 5,
          "name": "little finger",
          "aliases": [
            "pinky"
          ],
          "evidence_status": "[已核实]",
          "source_ids": [
            "BR-03",
            "BR-04"
          ]
        }
      ],
      "diagram": {
        "view": "player looking down at backs of hands; palms down; fingertips away",
        "fingertip_numbers_left_to_right": [
          1,
          2,
          3,
          4,
          5
        ],
        "thumb_side": "left / inward",
        "text_must_not_be_mirrored": true,
        "exact_anatomical_geometry": null,
        "evidence_status": "[推断]",
        "basis": "Diagram orientation chosen for clarity; ordering follows opposite hand layouts and verified finger identities. No hand pose or technique prescription."
      }
    }
  ],
  "diagram_contract": {
    "order_on_page": [
      "left",
      "right"
    ],
    "shared_caption": "Finger numbers for piano — view from the player, backs of hands facing up.",
    "pair_geometry": "Left-hand thumb at the inner right edge; right-hand thumb at the inner left edge.",
    "finger_mapping_is_authoritative": true,
    "no_fixed_key_assignment": true,
    "must_label_both_hands": true,
    "svg_or_image_asset": null,
    "evidence_status": "[推断]",
    "basis": "Editorial layout specification using verified finger identities; source artwork is not reproduced."
  },
  "number_system_comparison": [
    {
      "system": "piano fingering",
      "example": "3",
      "meaning": "middle finger of the indicated hand",
      "evidence_status": "[已核实]",
      "source_ids": [
        "BR-03"
      ]
    },
    {
      "system": "scale degree",
      "example": "3 (often with a caret)",
      "meaning": "third degree relative to the tonic",
      "evidence_status": "[已核实]",
      "source_ids": [
        "BR-05"
      ]
    }
  ],
  "reading_examples": [
    {
      "instruction": "LH 1",
      "answer": "left thumb",
      "evidence_status": "[推断]",
      "basis": "Editorial example applying verified LH and finger1 definitions.",
      "source_ids": [
        "BR-03",
        "BR-04"
      ]
    },
    {
      "instruction": "RH 5",
      "answer": "right little finger",
      "evidence_status": "[推断]",
      "basis": "Editorial example applying verified RH and finger5 definitions.",
      "source_ids": [
        "BR-03",
        "BR-04"
      ]
    }
  ],
  "general_piece_fingering": null,
  "specific_reference_links": [
    {
      "url": "/scales/c-major",
      "label": "C major scale reference",
      "activation_condition": "Show only after this target publishes verified hand/direction/octave fingering."
    },
    {
      "url": "/chords/a-minor",
      "label": "A minor chord reference",
      "activation_condition": "Use existing unchanged chord package; show only its verified finger guidance."
    },
    {
      "url": "/arpeggios",
      "label": "C and G major arpeggio examples",
      "activation_condition": "Keep each verified hand-specific fingering bound to its stated octave/register."
    }
  ],
  "print": {
    "content": [
      "both labeled hand diagrams",
      "five-finger mapping table",
      "finger numbers vs scale degrees note"
    ],
    "pdf_asset": null
  },
  "related_urls": [
    "/keyboard-notes",
    "/scales/c-major",
    "/chords/a-minor",
    "/arpeggios"
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P126 | content_and_mapping_ready; diagram_pending | 双手分别1–5映射、准确示意朝向、RH/LH说明、与音名/音级区别、具体参考入口条件。 | 最终原创左右手编号图与专业视觉复核；打印资源如需提供则实际生成。 |

### 待确认

- BR-FINGERS-DIAGRAM — data.diagram_contract.svg_or_image_asset：左右手编号映射和图示方向已明确；尚未交付最终原创手图。；解决：按player-view绘制并检查左右手、拇指朝内、1–5对应、文字不镜像；专业复核后使用。
- BR-FINGERS-SCOPE — fingering_chart_intent：原词可能包含具体乐句/音阶指法需求；本基线职责为手指编号与具体参考入口。；解决：保留本页职责；仅链接已有具体对象，不把编号图视为通用曲目指法方案。
- BR-FINGERS-PRINT — data.print.pdf_asset：尚未生成实际打印PDF。；解决：最终手图完成后生成打印版并视检；资源不存在时不显示下载承诺。

来源：BR-03, BR-04, BR-05, BR-06

## /keyboard-notes/blank

[已核实] 目标关键词：`piano keys blank page`；模板 T20；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Get a printable empty keyboard diagram with room to add personal answers.

### 页面需回答的问题

- Which key ranges can I print?
- Are the key labels already filled in?
- How can I check my answers?
- Is this a life-size label template?

### 英文页面内容

**Blank Piano Keyboard Worksheet**

Print an unlabeled keyboard segment and write in note names, mark a scale, or make your own keyboard exercise.

#### Choose an empty keyboard

Choose a 13-key or 25-key C-to-C segment. The key faces are left unlabeled so you can write your own answers. The printable worksheet includes both sizes, with two copies of each. These are practice segments, not complete 61-key or 88-key instrument diagrams.

[已核实] 本包原创文件实际内容 来源：原创编辑建议。 

#### Make it your own

Try naming the white keys first. Find each group of two black keys: the white key immediately to its left is C. Then add the other note names or mark the notes of one scale. For a second attempt, cover your first answers and use the next empty row.

[推断] 基于核实键位规律设计的原创练习 来源：BB-01, BB-02。 

#### Print and check

Choose US Letter or A4 paper and use Fit to page. To check note names, compare your work with the labeled keyboard reference. This worksheet is a diagram for writing on; it is not measured for cutting into stickers for a real piano.

[已核实] 本包文件规格；使用步骤为编辑建议 来源：原创编辑建议。 

### 结构化数据

```json
{
  "layouts": [
    {
      "id": "blank-13",
      "key_count": 13,
      "white_keys": 8,
      "black_keys": 5,
      "range": "C to C across 1 octave(s)",
      "absolute_register": null,
      "geometry": [
        {
          "kind": "white",
          "x": 0.0,
          "y": 0,
          "width": 63.75,
          "height": 90,
          "white_index": 0
        },
        {
          "kind": "white",
          "x": 63.75,
          "y": 0,
          "width": 63.75,
          "height": 90,
          "white_index": 1
        },
        {
          "kind": "white",
          "x": 127.5,
          "y": 0,
          "width": 63.75,
          "height": 90,
          "white_index": 2
        },
        {
          "kind": "white",
          "x": 191.25,
          "y": 0,
          "width": 63.75,
          "height": 90,
          "white_index": 3
        },
        {
          "kind": "white",
          "x": 255.0,
          "y": 0,
          "width": 63.75,
          "height": 90,
          "white_index": 4
        },
        {
          "kind": "white",
          "x": 318.75,
          "y": 0,
          "width": 63.75,
          "height": 90,
          "white_index": 5
        },
        {
          "kind": "white",
          "x": 382.5,
          "y": 0,
          "width": 63.75,
          "height": 90,
          "white_index": 6
        },
        {
          "kind": "white",
          "x": 446.25,
          "y": 0,
          "width": 63.75,
          "height": 90,
          "white_index": 7
        },
        {
          "kind": "black",
          "x": 44.625,
          "y": 0,
          "width": 38.25,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 108.375,
          "y": 0,
          "width": 38.25,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 235.875,
          "y": 0,
          "width": 38.25,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 299.625,
          "y": 0,
          "width": 38.25,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 363.375,
          "y": 0,
          "width": 38.25,
          "height": 52.199999999999996
        }
      ],
      "svg_asset": "assets/blank-keyboard-13-keys.svg",
      "evidence_status": "[推断] 按核实黑白键排列构造的练习片段；并非某型号完整键盘"
    },
    {
      "id": "blank-25",
      "key_count": 25,
      "white_keys": 15,
      "black_keys": 10,
      "range": "C to C across 2 octave(s)",
      "absolute_register": null,
      "geometry": [
        {
          "kind": "white",
          "x": 0.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 0
        },
        {
          "kind": "white",
          "x": 34.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 1
        },
        {
          "kind": "white",
          "x": 68.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 2
        },
        {
          "kind": "white",
          "x": 102.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 3
        },
        {
          "kind": "white",
          "x": 136.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 4
        },
        {
          "kind": "white",
          "x": 170.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 5
        },
        {
          "kind": "white",
          "x": 204.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 6
        },
        {
          "kind": "white",
          "x": 238.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 7
        },
        {
          "kind": "white",
          "x": 272.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 8
        },
        {
          "kind": "white",
          "x": 306.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 9
        },
        {
          "kind": "white",
          "x": 340.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 10
        },
        {
          "kind": "white",
          "x": 374.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 11
        },
        {
          "kind": "white",
          "x": 408.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 12
        },
        {
          "kind": "white",
          "x": 442.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 13
        },
        {
          "kind": "white",
          "x": 476.0,
          "y": 0,
          "width": 34.0,
          "height": 90,
          "white_index": 14
        },
        {
          "kind": "black",
          "x": 23.8,
          "y": 0,
          "width": 20.4,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 57.8,
          "y": 0,
          "width": 20.4,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 125.8,
          "y": 0,
          "width": 20.4,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 159.8,
          "y": 0,
          "width": 20.4,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 193.8,
          "y": 0,
          "width": 20.4,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 261.8,
          "y": 0,
          "width": 20.4,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 295.8,
          "y": 0,
          "width": 20.4,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 363.8,
          "y": 0,
          "width": 20.4,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 397.8,
          "y": 0,
          "width": 20.4,
          "height": 52.199999999999996
        },
        {
          "kind": "black",
          "x": 431.8,
          "y": 0,
          "width": 20.4,
          "height": 52.199999999999996
        }
      ],
      "svg_asset": "assets/blank-keyboard-25-keys.svg",
      "evidence_status": "[推断] 按核实黑白键排列构造的练习片段；并非某型号完整键盘"
    }
  ],
  "default_layout": "blank-13",
  "pdf_assets": [
    {
      "paper": "US Letter",
      "file": "assets/blank-keyboard-worksheet-letter.pdf",
      "pages": 1
    },
    {
      "paper": "A4",
      "file": "assets/blank-keyboard-worksheet-a4.pdf",
      "pages": 1
    }
  ],
  "answer_key_url": "/keyboard-notes/labeled",
  "button_labels": {
    "preview": "Preview keyboard",
    "print": "Print worksheet",
    "download_letter": "Download US Letter PDF",
    "download_a4": "Download A4 PDF"
  },
  "assets_rights": {
    "creator": "Piano Reference",
    "status": "original diagram generated for this project",
    "third_party_graphics_copied": false
  },
  "physical_scale": "diagram only; not life-size",
  "visual_qa": {
    "status": "passed",
    "files_checked": [
      "assets/blank-keyboard-worksheet-letter.pdf",
      "assets/blank-keyboard-worksheet-a4.pdf"
    ],
    "scope": "all pages rendered and visually inspected"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P128 | assets_and_content_prepared | 13/25键实际SVG；Letter/A4真实PDF；独立文案与打印说明 | 页面选择和预览的实现验收 |

### 待确认

- B-BLANK-UI — key_count_selector：13/25键预览SVG与两种纸张PDF已准备；网页选择器未实现。；解决：实现选择器并确认选项调用对应SVG；提供实际PDF链接。

来源：BB-01, BB-02

## /keyboard-notes/key-signatures

[已核实] 目标关键词：`piano key signatures`；模板 T20；基线优先级：后做。
状态：`content_and_table_ready_render_pending`；发布状态：未验收。

任务：查调号，并理解钢琴乐器与调性的关系

### 页面需回答的问题

- Which major and minor keys share this signature?
- What is the order of sharps and flats?
- Does an empty key signature always mean C major?
- Are harmonic-minor alterations part of the signature?
- What does instrument in C mean for piano?
- Which related scale page can I open?

### 英文页面内容

**Piano Key Signatures: Major & Minor Chart**

Look up sharp and flat key signatures, their relative major and minor keys, and what it means to call piano a non-transposing instrument.

#### Read the signature as a pair

The chart lists 15 written major-key signatures and their relative minors, from no accidentals through seven sharps or seven flats. A signature alone does not tell you whether the music is major or minor. For example, two sharps belong to D major or B minor; look at the melody and harmony for the tonal center.

[已核实] 来源：BN-MUSICCA-KEYS, BN-STROHMAN-KEYS。 

#### Keep the accidental order

Sharps enter in this order: F#, C#, G#, D#, A#, E#, B#. Flats enter in the reverse letter order: Bb, Eb, Ab, Db, Gb, Cb, Fb. Use the whole row when reading a signature. Six flats include Cb, and seven flats also include Fb; those spellings should not be removed because their piano keys are white.

[已核实] 来源：BN-STROHMAN-KEYS, BN-MUSICCA-KEYS, BN-YAMAHA-CONCERT。 

#### Separate the key signature from minor-scale changes

C major and A minor both have an empty key signature. A minor may still use G# as a leading tone; that note is written as an accidental when needed. The minor column in this chart names the key, not a promise that every passage uses only the natural-minor collection.

[已核实] 来源：BN-MUSICCA-KEYS。 

#### What key is the piano in?

Piano is a non-transposing instrument: in ordinary notation, a written C sounds as C. Calling it an instrument in C describes this relationship between written and sounding pitch. It does not restrict piano music to C major. For example, a pianist can read an F-major signature with Bb or a D-major signature with F# and C#.

[已核实] 来源：BN-YAMAHA-CONCERT, BN-TAMU-CONCERT, BN-MUSICCA-KEYS。 

#### Try the two-sharp example

Select the row for two sharps. Check F# first, then C#, and compare the D-major and B-minor names beside it. Follow an available scale link to see how those notes are ordered from the chosen tonic. Keep enharmonic names visible as separate written choices instead of silently replacing one signature with another.

[推断] 来源：BN-MUSICCA-KEYS, BN-STROHMAN-KEYS。 

### 结构化数据

```json
{
  "chart_rows": [
    {
      "id": "sig-none",
      "major": "C major",
      "relative_minor": "A minor",
      "signed_fifths": 0,
      "accidental_type": "none",
      "accidental_count": 0,
      "ordered_accidentals": [],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "C",
          "D",
          "E",
          "F",
          "G",
          "A",
          "B",
          "C"
        ],
        "minor": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "A"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": "/scales/c-major",
      "minor_scale_url": "/scales/a-minor",
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-sharp-1",
      "major": "G major",
      "relative_minor": "E minor",
      "signed_fifths": 1,
      "accidental_type": "sharp",
      "accidental_count": 1,
      "ordered_accidentals": [
        "F#"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "G",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F#",
          "G"
        ],
        "minor": [
          "E",
          "F#",
          "G",
          "A",
          "B",
          "C",
          "D",
          "E"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": "/scales/g-major",
      "minor_scale_url": "/scales/e-minor",
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-sharp-2",
      "major": "D major",
      "relative_minor": "B minor",
      "signed_fifths": 2,
      "accidental_type": "sharp",
      "accidental_count": 2,
      "ordered_accidentals": [
        "F#",
        "C#"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "D",
          "E",
          "F#",
          "G",
          "A",
          "B",
          "C#",
          "D"
        ],
        "minor": [
          "B",
          "C#",
          "D",
          "E",
          "F#",
          "G",
          "A",
          "B"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": "/scales/d-major",
      "minor_scale_url": "/scales/b-minor",
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-sharp-3",
      "major": "A major",
      "relative_minor": "F# minor",
      "signed_fifths": 3,
      "accidental_type": "sharp",
      "accidental_count": 3,
      "ordered_accidentals": [
        "F#",
        "C#",
        "G#"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "A",
          "B",
          "C#",
          "D",
          "E",
          "F#",
          "G#",
          "A"
        ],
        "minor": [
          "F#",
          "G#",
          "A",
          "B",
          "C#",
          "D",
          "E",
          "F#"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": "/scales/a-major",
      "minor_scale_url": "/scales/f-sharp-minor",
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-sharp-4",
      "major": "E major",
      "relative_minor": "C# minor",
      "signed_fifths": 4,
      "accidental_type": "sharp",
      "accidental_count": 4,
      "ordered_accidentals": [
        "F#",
        "C#",
        "G#",
        "D#"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "E",
          "F#",
          "G#",
          "A",
          "B",
          "C#",
          "D#",
          "E"
        ],
        "minor": [
          "C#",
          "D#",
          "E",
          "F#",
          "G#",
          "A",
          "B",
          "C#"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": "/scales/e-major",
      "minor_scale_url": null,
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-sharp-5",
      "major": "B major",
      "relative_minor": "G# minor",
      "signed_fifths": 5,
      "accidental_type": "sharp",
      "accidental_count": 5,
      "ordered_accidentals": [
        "F#",
        "C#",
        "G#",
        "D#",
        "A#"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "B",
          "C#",
          "D#",
          "E",
          "F#",
          "G#",
          "A#",
          "B"
        ],
        "minor": [
          "G#",
          "A#",
          "B",
          "C#",
          "D#",
          "E",
          "F#",
          "G#"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": "/scales/b-major",
      "minor_scale_url": null,
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-sharp-6",
      "major": "F# major",
      "relative_minor": "D# minor",
      "signed_fifths": 6,
      "accidental_type": "sharp",
      "accidental_count": 6,
      "ordered_accidentals": [
        "F#",
        "C#",
        "G#",
        "D#",
        "A#",
        "E#"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "F#",
          "G#",
          "A#",
          "B",
          "C#",
          "D#",
          "E#",
          "F#"
        ],
        "minor": [
          "D#",
          "E#",
          "F#",
          "G#",
          "A#",
          "B",
          "C#",
          "D#"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": null,
      "minor_scale_url": null,
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-sharp-7",
      "major": "C# major",
      "relative_minor": "A# minor",
      "signed_fifths": 7,
      "accidental_type": "sharp",
      "accidental_count": 7,
      "ordered_accidentals": [
        "F#",
        "C#",
        "G#",
        "D#",
        "A#",
        "E#",
        "B#"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "C#",
          "D#",
          "E#",
          "F#",
          "G#",
          "A#",
          "B#",
          "C#"
        ],
        "minor": [
          "A#",
          "B#",
          "C#",
          "D#",
          "E#",
          "F#",
          "G#",
          "A#"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": null,
      "minor_scale_url": "/scales/a-sharp-minor",
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-flat-1",
      "major": "F major",
      "relative_minor": "D minor",
      "signed_fifths": -1,
      "accidental_type": "flat",
      "accidental_count": 1,
      "ordered_accidentals": [
        "Bb"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "F",
          "G",
          "A",
          "Bb",
          "C",
          "D",
          "E",
          "F"
        ],
        "minor": [
          "D",
          "E",
          "F",
          "G",
          "A",
          "Bb",
          "C",
          "D"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": "/scales/f-major",
      "minor_scale_url": "/scales/d-minor",
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-flat-2",
      "major": "Bb major",
      "relative_minor": "G minor",
      "signed_fifths": -2,
      "accidental_type": "flat",
      "accidental_count": 2,
      "ordered_accidentals": [
        "Bb",
        "Eb"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "Bb",
          "C",
          "D",
          "Eb",
          "F",
          "G",
          "A",
          "Bb"
        ],
        "minor": [
          "G",
          "A",
          "Bb",
          "C",
          "D",
          "Eb",
          "F",
          "G"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": "/scales/b-flat-major",
      "minor_scale_url": "/scales/g-minor",
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-flat-3",
      "major": "Eb major",
      "relative_minor": "C minor",
      "signed_fifths": -3,
      "accidental_type": "flat",
      "accidental_count": 3,
      "ordered_accidentals": [
        "Bb",
        "Eb",
        "Ab"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "Eb",
          "F",
          "G",
          "Ab",
          "Bb",
          "C",
          "D",
          "Eb"
        ],
        "minor": [
          "C",
          "D",
          "Eb",
          "F",
          "G",
          "Ab",
          "Bb",
          "C"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": "/scales/e-flat-major",
      "minor_scale_url": "/scales/c-minor",
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-flat-4",
      "major": "Ab major",
      "relative_minor": "F minor",
      "signed_fifths": -4,
      "accidental_type": "flat",
      "accidental_count": 4,
      "ordered_accidentals": [
        "Bb",
        "Eb",
        "Ab",
        "Db"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "Ab",
          "Bb",
          "C",
          "Db",
          "Eb",
          "F",
          "G",
          "Ab"
        ],
        "minor": [
          "F",
          "G",
          "Ab",
          "Bb",
          "C",
          "Db",
          "Eb",
          "F"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": null,
      "minor_scale_url": "/scales/f-minor",
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-flat-5",
      "major": "Db major",
      "relative_minor": "Bb minor",
      "signed_fifths": -5,
      "accidental_type": "flat",
      "accidental_count": 5,
      "ordered_accidentals": [
        "Bb",
        "Eb",
        "Ab",
        "Db",
        "Gb"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "Db",
          "Eb",
          "F",
          "Gb",
          "Ab",
          "Bb",
          "C",
          "Db"
        ],
        "minor": [
          "Bb",
          "C",
          "Db",
          "Eb",
          "F",
          "Gb",
          "Ab",
          "Bb"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": null,
      "minor_scale_url": null,
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-flat-6",
      "major": "Gb major",
      "relative_minor": "Eb minor",
      "signed_fifths": -6,
      "accidental_type": "flat",
      "accidental_count": 6,
      "ordered_accidentals": [
        "Bb",
        "Eb",
        "Ab",
        "Db",
        "Gb",
        "Cb"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "Gb",
          "Ab",
          "Bb",
          "Cb",
          "Db",
          "Eb",
          "F",
          "Gb"
        ],
        "minor": [
          "Eb",
          "F",
          "Gb",
          "Ab",
          "Bb",
          "Cb",
          "Db",
          "Eb"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": null,
      "minor_scale_url": null,
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    },
    {
      "id": "sig-flat-7",
      "major": "Cb major",
      "relative_minor": "Ab minor",
      "signed_fifths": -7,
      "accidental_type": "flat",
      "accidental_count": 7,
      "ordered_accidentals": [
        "Bb",
        "Eb",
        "Ab",
        "Db",
        "Gb",
        "Cb",
        "Fb"
      ],
      "evidence_status": "[已核实]",
      "source_ids": [
        "BN-MUSICCA-KEYS",
        "BN-STROHMAN-KEYS"
      ],
      "natural_scale_collections": {
        "major": [
          "Cb",
          "Db",
          "Eb",
          "Fb",
          "Gb",
          "Ab",
          "Bb",
          "Cb"
        ],
        "minor": [
          "Ab",
          "Bb",
          "Cb",
          "Db",
          "Eb",
          "Fb",
          "Gb",
          "Ab"
        ],
        "evidence_status": "[推断] 根据双源调号表+起音字母顺序展开；仅自然小调，不把和声/旋律临时记号加入调号"
      },
      "major_scale_url": "/scales/c-flat-major",
      "minor_scale_url": null,
      "fallback_scale_hub_url": "/scales",
      "link_release_rule": "Only render a baseline route link when that route is actually published; null means no dedicated baseline URL, not permission to invent a new one."
    }
  ],
  "major_key_count": 15,
  "minor_key_count": 15,
  "signature_row_count": 15,
  "count_scope": "Written conventional signatures: enharmonic spellings remain separate entries; not 15 different sounding pitch classes.",
  "sharp_order": [
    "F#",
    "C#",
    "G#",
    "D#",
    "A#",
    "E#",
    "B#"
  ],
  "flat_order": [
    "Bb",
    "Eb",
    "Ab",
    "Db",
    "Gb",
    "Cb",
    "Fb"
  ],
  "table_evidence_status": "[已核实]",
  "source_ids": [
    "BN-MUSICCA-KEYS",
    "BN-STROHMAN-KEYS"
  ],
  "default_example": {
    "selected_signature_id": "sig-sharp-2",
    "major": "D major",
    "relative_minor": "B minor",
    "ordered_accidentals": [
      "F#",
      "C#"
    ],
    "keyboard_reference_octave": 4,
    "highlighted_example_keys": [
      {
        "name": "F#4",
        "midi": 66
      },
      {
        "name": "C#4",
        "midi": 61
      }
    ],
    "major_scale_notes": [
      "D",
      "E",
      "F#",
      "G",
      "A",
      "B",
      "C#",
      "D"
    ],
    "minor_natural_scale_notes": [
      "B",
      "C#",
      "D",
      "E",
      "F#",
      "G",
      "A",
      "B"
    ],
    "evidence_status": "[已核实] 配对与音集；[推断] 展示八度与MIDI运算",
    "source_ids": [
      "BN-MUSICCA-KEYS",
      "BN-STROHMAN-KEYS",
      "BN-BMT-MIDI"
    ]
  },
  "instrument_and_key": {
    "instrument_transposition": "none for ordinary acoustic-piano notation",
    "written_C_sounds": "C at the written octave, absent explicit octave notation",
    "can_play_only_C_major": false,
    "evidence_status": "[已核实]",
    "source_ids": [
      "BN-YAMAHA-CONCERT",
      "BN-TAMU-CONCERT"
    ],
    "electronic_transpose_scope": "Any electronic transpose/voice/octave setting must be considered separately; this reference does not detect it."
  },
  "minor_form_boundary": {
    "signature_form": "natural_minor_signature",
    "harmonic_or_melodic_alterations": "written locally as needed; not added to the static signature list",
    "source_ids": [
      "BN-MUSICCA-KEYS"
    ],
    "evidence_status": "[已核实]"
  },
  "enharmonic_signature_pairs": [
    {
      "major": [
        "B major",
        "Cb major"
      ],
      "minor": [
        "G# minor",
        "Ab minor"
      ]
    },
    {
      "major": [
        "F# major",
        "Gb major"
      ],
      "minor": [
        "D# minor",
        "Eb minor"
      ]
    },
    {
      "major": [
        "C# major",
        "Db major"
      ],
      "minor": [
        "A# minor",
        "Bb minor"
      ]
    }
  ],
  "print_and_render": {
    "status": "implementation_pending",
    "pdf_asset": null,
    "show_download_button": false,
    "fields": [
      "major name",
      "relative minor name",
      "accidental type and count",
      "ordered sharp/flat names",
      "source and checked date"
    ],
    "signature_glyph_positions": null,
    "glyph_position_status": "Actual treble/bass signature engraving has not been visually verified in a generated output. Use a standard notation engine then inspect, rather than guessing graphic coordinates.",
    "asset_reuse": "external reference only: source PDFs/images are not downloadable assets for this site."
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P136 | content_and_data_ready_render_pending | ['15大调与15关系小调的配对、升降数量与顺序', '2升号默认示例', '原基线存在的调性音阶链接及缺页中心兜底', '独立英文内容和来源'] | ['实际谱上调号刻印/打印视觉验收', '仅在目标真实上线时显示链接'] |
| P244 | content_ready_original_later_scope_preserved | ['明确非移调/实际音高说明', '明确钢琴可演奏C大调以外的调性并给F大调/D大调实例', 'Yamaha和Texas A&M教材交叉核验'] | [] |

### 待确认

- BN-U074-RENDER — data.print_and_render：15组文字/数据调号表已完成；实际高低谱号中的调号刻印图与打印件尚未生成验收。；解决：Codex依据signed_fifths用规范制谱引擎绘图并视觉检查全部0–7升降号；生成真实打印输出后才显示下载按钮。
- BN-U074-LINKS — data.chart_rows.*_scale_url：部分调性没有独立基线URL；已保留null并使用现有/scales中心兜底。；解决：只链接已上线的现有基线页面；不得为填满表格增建URL。

来源：BN-MUSICCA-KEYS, BN-STROHMAN-KEYS, BN-YAMAHA-CONCERT, BN-TAMU-CONCERT, BN-BMT-MIDI

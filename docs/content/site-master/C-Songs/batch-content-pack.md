# Batch C — Songs

[已核实] 共 22 页。基线字段原样保留，核查日期 2026-09-09。

证据标签为后台记录；英文文案在各模块 body 中。计算数据与编辑建议标 [推断]。待确认字段不供上线渲染。

## /songs

[已核实] 目标关键词：`piano songs`；模板 T15；基线优先级：先做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a piece by playing goal, version, level and resource format.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Piano Songs: Find Your Next Piece**

Choose a piece by playing goal, version, level and resource format.

#### Choose your next version

Choose a specific arrangement before starting. The cards below offer a reflective piece, a cheerful programme option, a familiar theme, an intermediate solo and an accompaniment resource.

[推断] editorial guidance using verified version metadata 来源：CR-18, CR-17, CR-16, CR-14, CR-19, CR-04, CR-22, CR-23, CR-22, CR-23。 

#### Sad or reflective

Gymnopédie No. 1 is our reflective selection because the publisher describes long phrases and wide bass-to-chord spacing. “Sad” is an editorial listening lens; it is not an objective property of every performance.

[推断] selection guidance; version facts verified in listed sources 来源：CR-18, CR-17, CR-16, CR-14, CR-19, CR-04, CR-22, CR-23, CR-22, CR-23。 

#### Happy, cool or fun

The Happy Farmer is a cheerful-title selection. Addams Family Theme is a theme-song choice for a playful programme. Their appeal depends on your audience and preferences.

[推断] selection guidance; version facts verified in listed sources 来源：CR-18, CR-17, CR-16, CR-14, CR-19, CR-04, CR-22, CR-23, CR-22, CR-23。 

#### Beautiful

For a spacious, reflective goal, audition the selected Gymnopédie. Choose the sound you want to work on; this is not a beauty ranking.

[推断] selection guidance; version facts verified in listed sources 来源：CR-18, CR-17, CR-16, CR-14, CR-19, CR-04, CR-22, CR-23, CR-22, CR-23。 

#### Intermediate

The Gymnopédie edition is late intermediate and calls attention to long phrases and bass-to-chord spacing. Empire State of Mind is in an explicitly intermediate piano-solo collection; inspect its own sample before comparing the two.

[推断] selection guidance; version facts verified in listed sources 来源：CR-18, CR-17, CR-16, CR-14, CR-19, CR-04, CR-22, CR-23, CR-22, CR-23。 

#### Types of piece

The catalogue includes an étude route on the challenging page, a fantasy there, soundtrack tracks such as Sweden, simplified classical excerpts and songs arranged for singing. These labels help you choose a playing task.

[推断] selection guidance; version facts verified in listed sources 来源：CR-18, CR-17, CR-16, CR-14, CR-19, CR-04, CR-22, CR-23, CR-22, CR-23。 

#### Sing and play

All of Me has a vocal line and piano part with guitar chord frames. Start there when you need singing support; choose the Easy Songs page for a melody-first solo task.

[推断] selection guidance; version facts verified in listed sources 来源：CR-18, CR-17, CR-16, CR-14, CR-19, CR-04, CR-22, CR-23, CR-22, CR-23。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-18, CR-17, CR-16, CR-14, CR-19, CR-04, CR-22, CR-23, CR-22, CR-23。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-18-1",
      "work_title": "Gymnopédie No. 1",
      "creator": "Erik Satie",
      "artist": null,
      "edition": "Gymnopédie No. 1 — Hoffman Academy",
      "publisher": "Hoffman Academy",
      "level": "Late Intermediate",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/gymnopedie-no-1",
      "access": "paid PDF or included in provider Premium membership",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "For a reflective programme; the publisher identifies long phrases and wide bass-to-chord spacing.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-18"
      ],
      "edition_features": "Two-page PDF; purchased single-user or teacher-studio license does not permit website redistribution."
    },
    {
      "id": "cr-17-3",
      "work_title": "The Happy Farmer",
      "creator": null,
      "artist": null,
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A title for a cheerful-programme shortlist; mood is an editorial choice.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-17"
      ],
      "edition_features": "Simplified arrangements; some entries are themes or excerpts."
    },
    {
      "id": "cr-16-1",
      "work_title": "Addams Family Theme",
      "creator": null,
      "artist": null,
      "edition": "The Halloween Songbook — 2nd Edition, HL 00310162",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/310162/the-halloween-songbook-2nd-edition",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A theme-song option for a Halloween programme.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-16"
      ],
      "edition_features": "16-song easy piano second edition."
    },
    {
      "id": "cr-14-1",
      "work_title": "Empire State of Mind",
      "creator": null,
      "artist": null,
      "edition": "Hip-Hop for Piano Solo — Intermediate Level, HL 00360950",
      "publisher": "Hal Leonard",
      "level": "Intermediate",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/360950/hip-hop-for-piano-solo",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A piano-solo option from an explicitly intermediate collection.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-14"
      ],
      "edition_features": "Arranged by Logan Evan Thomas; publisher page includes a demonstration.",
      "arranger": "Logan Evan Thomas"
    },
    {
      "id": "cr-19-1",
      "work_title": "All of Me",
      "creator": null,
      "artist": "John Legend",
      "edition": "All of Me — Piano Vocal, HL 00126844",
      "publisher": "Hal Leonard",
      "level": null,
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "piano/vocal with guitar chord frames",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/126844/all-of-me",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Use the vocal staff for singing and the chord frames for a guitar collaborator.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-19"
      ],
      "edition_features": "Piano and vocal melody with guitar chord frames."
    },
    {
      "id": "cr-04-1",
      "work_title": "Sweden",
      "creator": "Daniel Rosenfeld",
      "artist": "C418 / Daniel Rosenfeld",
      "edition": "Music from Minecraft — Easy Piano Collection, HL 00369016",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/369016/music-from-minecraft",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Start with a named Volume Alpha track.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-04"
      ],
      "edition_features": "Tracks from Volume Alpha and Volume Beta.",
      "album": "Minecraft: Volume Alpha"
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  },
  "sections": [
    {
      "id": "reflective",
      "resource_ids": [
        "cr-18-1"
      ]
    },
    {
      "id": "happy",
      "resource_ids": [
        "cr-17-3"
      ]
    },
    {
      "id": "fun",
      "resource_ids": [
        "cr-16-1"
      ]
    },
    {
      "id": "beautiful",
      "resource_ids": [
        "cr-18-1"
      ]
    },
    {
      "id": "intermediate",
      "resource_ids": [
        "cr-18-1",
        "cr-14-1"
      ]
    },
    {
      "id": "soundtrack",
      "resource_ids": [
        "cr-04-1"
      ]
    },
    {
      "id": "sing-and-play",
      "resource_ids": [
        "cr-19-1"
      ]
    }
  ],
  "topic_links": [
    "/songs/easy",
    "/songs/christmas",
    "/songs/challenging",
    "/songs/pop",
    "/songs/classical",
    "/songs/easy-chords",
    "/songs/anime",
    "/songs/minecraft",
    "/songs/rock",
    "/songs/taylor-swift",
    "/songs/disney",
    "/songs/wedding",
    "/songs/worship",
    "/songs/rap",
    "/songs/piano-and-guitar",
    "/songs/beatles",
    "/songs/coldplay",
    "/songs/country",
    "/songs/jazz",
    "/songs/halloween",
    "/songs/undertale"
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P002 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P009 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P014 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P018 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P022 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P041 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P042 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P043 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-center-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-18, CR-17, CR-16, CR-14, CR-19, CR-04, CR-22, CR-23, CR-22, CR-23

## /songs/easy

[已核实] 目标关键词：`easy piano songs`；模板 T16；基线优先级：先做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose an accessible next piece by version, prerequisites, occasion and actual access.

### 页面需回答的问题

- Which version should I start with?
- Which options suit children or adult-method learners?
- Which selected arrangements are in C major?
- Which music can I use for a gentle piece or a small performance?
- Are these free individual downloads or songs in a paid collection?

### 英文页面内容

**Easy Piano Songs: Choose a Version That Fits**

Compare beginner arrangements, C-major options, adult-method pieces and exact resources before choosing your next piano song.

#### Choose an easy version you can actually use

Start with the arrangement, not just the song title. The featured choices below identify a specific score or lesson and explain the next thing to check. Publisher labels such as Early Elementary and Easy Piano come from different series; treat them as starting points for comparing the actual music.

[推断] 编辑选择方法；依据所列出版方采用不同级别标签 来源：CE-01, CE-02, CE-05。 

#### For a child’s first few pieces

Hot Cross Buns comes with first-lesson materials and a parent guide. The early-elementary Twinkle version adds a hand-position graphic and a matching tutorial. For a birthday goal, the early-elementary Happy Birthday divides the melody between the hands. Choose the version and lesson together.

[已核实] 版本功能；儿童起步选择为[推断] 来源：CE-04, CE-02, CE-07。 

#### If you want a C-major version

The listed early-elementary Twinkle, Jingle Bells and Happy Birthday editions are in C major. The selected Ode to Joy arrangement is in D major, so it is outside this filter. A key name alone does not describe the rhythm, hand movement or reading work.

[已核实] 调性；难度比较建议为[推断] 来源：CE-02, CE-06, CE-07, CE-05。 

#### For adult beginners

If you follow Alfred’s adult course, compare The Rainbow Connection or Nadia’s Theme in its Greatest Hits Book 1 with your current lesson. If you want a broader menu, the edition-backed list offers fifty titles from one Easy Piano collection. Those are purchased arrangements, not fifty free downloads or fifty individually tested recommendations.

[已核实] 版本归属；选择为[推断] 来源：CE-10, CE-01。 

#### For a gentle piece or a small performance

For a gentle option, compare the two Twinkle arrangements and listen to their separate samples. For a small performance, choose a meaningful occasion: Happy Birthday gives you a clear audience and purpose. “Beautiful” and “impressive” describe your goal here; neither is a guaranteed listener response.

[推断] 主观编辑选择，依据标注Dreamily与生日场合；不承诺效果 来源：CE-02, CE-03, CE-07。 

#### Before you commit

Open the exact resource, check how to obtain it, and try a short section at a comfortable pace. Prefer a version whose instructions you understand. Several free provider downloads request your name and email. For a printed copy, check the chosen format: an online digital book and a downloadable PDF are different products.

[推断] 编辑操作建议；获取方式已核实 来源：CE-01, CE-02, CE-04, CE-06。 

### 结构化数据

```json
{
  "featured_resources": [
    {
      "id": "ce-hot-cross-buns",
      "work_title": "Hot Cross Buns",
      "creator": null,
      "arranger": null,
      "edition": "Materials for Lesson 1 with Parent Guide",
      "publisher": "Hoffman Academy",
      "format": "PDF / Digital Print",
      "level": "Early Elementary",
      "level_basis": "exact publisher product classification",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "why_choose": "Start with a first-lesson package that includes a parent guide and audio.",
      "selection_evidence_status": "[推断] 原创选择建议；依据该版本公开级别、曲目/配器说明",
      "prerequisites_or_first_check": "Follow the Lesson 1 keyboard introduction; no assumed prior chord reading.",
      "resource_url": "https://www.hoffmanacademy.com/store/learning-and-teaching-resources/materials-for-lesson-1",
      "access": "external free download; name/email form or provider account",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-04"
      ],
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方"
    },
    {
      "id": "ce-twinkle-early",
      "work_title": "Twinkle, Twinkle, Little Star",
      "creator": "Anonymous (publisher attribution)",
      "arranger": "Aron Bernstein",
      "edition": "Twinkle, Twinkle, Little Star — Early Elementary",
      "publisher": "Hoffman Academy",
      "format": "PDF / Digital Print",
      "level": "Early Elementary",
      "level_basis": "exact publisher product classification",
      "key": "C major",
      "tempo_bpm": null,
      "fingering": null,
      "why_choose": "Use the version with a hand-position graphic and its matching tutorial.",
      "selection_evidence_status": "[推断] 原创选择建议；依据该版本公开级别、曲目/配器说明",
      "prerequisites_or_first_check": "Follow the melody transfer between hands and check the leap of a fifth against the lesson.",
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/twinkle-twinkle-little-star-early-elementary-version",
      "access": "external free download; name/email form or provider account",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-02",
        "CE-08"
      ],
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方",
      "prerequisite_evidence_status": "[已核实] 对应教程说明换手与五度跳进；建议先检查为编辑选择"
    },
    {
      "id": "ce-twinkle-elementary",
      "work_title": "Twinkle, Twinkle, Little Star",
      "creator": "Anonymous (publisher attribution)",
      "arranger": "Aron Bernstein",
      "edition": "Twinkle, Twinkle, Little Star — Elementary",
      "publisher": "Hoffman Academy",
      "format": "PDF / Digital Print",
      "level": "Elementary",
      "level_basis": "exact publisher product classification",
      "key": "C major",
      "tempo_bpm": null,
      "fingering": null,
      "why_choose": "Compare a second arrangement of the same melody when you want a different reading task.",
      "selection_evidence_status": "[推断] 原创选择建议；依据该版本公开级别、曲目/配器说明",
      "prerequisites_or_first_check": "Use this edition’s sample; do not assume the easier version’s hand placement transfers.",
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/twinkle-twinkle-little-star-elementary-version",
      "access": "external purchase or Premium; conflicting free wording in body, so no free badge",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-03"
      ],
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方"
    },
    {
      "id": "ce-jingle-early",
      "work_title": "Jingle Bells",
      "creator": "James Pierpont",
      "arranger": null,
      "edition": "Jingle Bells — Early Elementary",
      "publisher": "Hoffman Academy",
      "format": "PDF / Digital Print",
      "level": "Early Elementary",
      "level_basis": "exact publisher product classification",
      "key": "C major",
      "tempo_bpm": null,
      "fingering": null,
      "why_choose": "Choose a seasonal piece with a lesson tied to the exact edition.",
      "selection_evidence_status": "[推断] 原创选择建议；依据该版本公开级别、曲目/配器说明",
      "prerequisites_or_first_check": "Check dotted-eighth/sixteenth patterns in the tutorial before deciding it feels easy.",
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/jingle-bells-early-elementary",
      "access": "external free download; name/email form or provider account",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-06",
        "CE-09"
      ],
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方"
    },
    {
      "id": "ce-birthday-early",
      "work_title": "Happy Birthday",
      "creator": "Patty and Mildred Hill (publisher credit)",
      "arranger": "Aron Bernstein",
      "edition": "Happy Birthday — Early Elementary",
      "publisher": "Hoffman Academy",
      "format": "PDF / Digital Print",
      "level": "Early Elementary",
      "level_basis": "exact publisher product classification",
      "key": "C major",
      "tempo_bpm": null,
      "fingering": null,
      "why_choose": "Prepare a short piece for a real birthday occasion.",
      "selection_evidence_status": "[推断] 原创选择建议；依据该版本公开级别、曲目/配器说明",
      "prerequisites_or_first_check": "This edition splits the melody between hands; it is not a full left-hand chord accompaniment.",
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/happy-birthday-early-elementary-version",
      "access": "external free download; name/email form or provider account",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-07"
      ],
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方"
    },
    {
      "id": "ce-ode",
      "work_title": "Ode to Joy",
      "creator": "Ludwig van Beethoven",
      "arranger": "Joseph Hoffman",
      "edition": "Ode to Joy",
      "publisher": "Hoffman Academy",
      "format": "PDF / Digital Print",
      "level": "Early Elementary",
      "level_basis": "exact publisher product classification",
      "key": "D major",
      "tempo_bpm": null,
      "fingering": null,
      "why_choose": "Try a clearly identified simplified classical melody.",
      "selection_evidence_status": "[推断] 原创选择建议；依据该版本公开级别、曲目/配器说明",
      "prerequisites_or_first_check": "Check the key signature and dotted-rhythm material; use the linked Unit 4 lesson.",
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/ode-to-joy",
      "access": "external purchase or Premium",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-05"
      ],
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方"
    },
    {
      "id": "ce-birthday-lead",
      "work_title": "Happy Birthday to You",
      "creator": "Patty and Mildred Hill (publisher credit)",
      "arranger": null,
      "edition": "Happy Birthday to You — Elementary lead sheet",
      "publisher": "Hoffman Academy",
      "format": "PDF / Digital Print",
      "level": "Elementary",
      "level_basis": "exact publisher product classification",
      "key": "F major",
      "tempo_bpm": null,
      "fingering": null,
      "why_choose": "Choose this when the goal is making an accompaniment from chord symbols.",
      "selection_evidence_status": "[推断] 原创选择建议；依据该版本公开级别、曲目/配器说明",
      "prerequisites_or_first_check": "Read melody and chord symbols; use the linked Unit 6 accompaniment lesson. Do not copy the page’s incomplete C7 note list.",
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/happy-birthday-to-you",
      "access": "external free download; name/email form or provider account",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-11"
      ],
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方"
    },
    {
      "id": "ce-adult-rainbow",
      "work_title": "The Rainbow Connection",
      "creator": null,
      "edition": "Alfred’s Basic Adult Piano Course: Greatest Hits Book 1",
      "edition_id": "00-16505",
      "isbn": "9780739002810",
      "editor": [
        "E. L. Lancaster",
        "Morton Manus"
      ],
      "publisher": "Alfred Music",
      "format": "piano book",
      "level": "Adult course Book 1",
      "level_basis": "publisher course correlation; not an exam grade",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "why_choose": "Use an adult-method supplement when you are following the matching lesson book.",
      "selection_evidence_status": "[推断] 成人学习场景来自书系定位，不代表其他年龄不能使用",
      "prerequisites_or_first_check": "Check which matching lesson-book concepts are needed before assigning this particular arrangement.",
      "resource_url": "https://www.alfred.com/products/alfred-s-basic-adult-piano-course-greatest-hits-book-1-00-16505",
      "access": "external purchased print book",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-10"
      ]
    },
    {
      "id": "ce-adult-nadia",
      "work_title": "Nadia’s Theme",
      "creator": null,
      "edition": "Alfred’s Basic Adult Piano Course: Greatest Hits Book 1",
      "edition_id": "00-16505",
      "isbn": "9780739002810",
      "editor": [
        "E. L. Lancaster",
        "Morton Manus"
      ],
      "publisher": "Alfred Music",
      "format": "piano book",
      "level": "Adult course Book 1",
      "level_basis": "publisher course correlation; not an exam grade",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "why_choose": "Use an adult-method supplement when you are following the matching lesson book.",
      "selection_evidence_status": "[推断] 成人学习场景来自书系定位，不代表其他年龄不能使用",
      "prerequisites_or_first_check": "Check which matching lesson-book concepts are needed before assigning this particular arrangement.",
      "resource_url": "https://www.alfred.com/products/alfred-s-basic-adult-piano-course-greatest-hits-book-1-00-16505",
      "access": "external purchased print book",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-10"
      ]
    }
  ],
  "additional_catalog_options": [
    {
      "id": "ce-hl50-01",
      "work_title": "Against The Wind",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-02",
      "work_title": "Angel",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-03",
      "work_title": "Autumn Leaves",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-04",
      "work_title": "Bad Moon Rising",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-05",
      "work_title": "Ben",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-06",
      "work_title": "Blackbird",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-07",
      "work_title": "Born Free",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-08",
      "work_title": "Boulevard Of Broken Dreams",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-09",
      "work_title": "Candle In The Wind",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-10",
      "work_title": "Chopsticks",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-11",
      "work_title": "Don't Know Why",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-12",
      "work_title": "Drops Of Jupiter (Tell Me)",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-13",
      "work_title": "Eye Of The Tiger",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-14",
      "work_title": "Falling Slowly",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-15",
      "work_title": "Free Fallin'",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-16",
      "work_title": "Golden Slumbers",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-17",
      "work_title": "Good Riddance (Time Of Your Life)",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-18",
      "work_title": "Hallelujah",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-19",
      "work_title": "Happy",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-20",
      "work_title": "Happy Birthday To You",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-21",
      "work_title": "Heart And Soul",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-22",
      "work_title": "Home",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-23",
      "work_title": "A Horse With No Name",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-24",
      "work_title": "Hotel California",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-25",
      "work_title": "I Walk The Line",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-26",
      "work_title": "I'm Yours",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-27",
      "work_title": "If You Love Me Really Love Me (Hymne A L'amour)",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-28",
      "work_title": "The Impossible Dream (The Quest)",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-29",
      "work_title": "Just The Way You Are",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-30",
      "work_title": "Lean On Me",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-31",
      "work_title": "Let It Be",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-32",
      "work_title": "Let It Go",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-33",
      "work_title": "Love Story",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-34",
      "work_title": "The Luckiest",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-35",
      "work_title": "Man In The Mirror",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-36",
      "work_title": "Moon River",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-37",
      "work_title": "Over The Rainbow",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-38",
      "work_title": "Peaceful Easy Feeling",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-39",
      "work_title": "Piano Man",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-40",
      "work_title": "Somewhere, My Love",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-41",
      "work_title": "Stand By Me",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-42",
      "work_title": "Summertime",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-43",
      "work_title": "Take Me Home, Country Roads",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-44",
      "work_title": "Too Little Time",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-45",
      "work_title": "Unchained Melody",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-46",
      "work_title": "We Will Rock You",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-47",
      "work_title": "What A Wonderful World",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-48",
      "work_title": "Windmills Of Your Mind",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-49",
      "work_title": "Yesterday",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    },
    {
      "id": "ce-hl50-50",
      "work_title": "Your Song",
      "creator": null,
      "creator_status": "individual credit not independently inspected; title identifies a track within this exact edition, not an unspecified song of the same name",
      "edition": "First 50 Popular Songs You Should Play on the Piano",
      "edition_id": "HL00131140",
      "isbn": "9781480398023",
      "publisher": "Hal Leonard",
      "format": "Easy Piano Songbook; purchased collection",
      "level": "Easy Piano",
      "level_basis": "publisher collection label; not independent track-by-track playing assessment",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "technical_demands": null,
      "resource_url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
      "access": "external paid collection; choose print book if paper is needed; publisher digital-book option is online viewing and not a printable PDF",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Edition supplied by its publisher; no license for this site to redistribute the score or recording has been established."
      },
      "source_ids": [
        "CE-01"
      ],
      "evidence_status": "[已核实] 目录曲名、具体合集身份与出版方级别；未核字段为空",
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list"
    }
  ],
  "sections": {
    "kids": [
      "ce-hot-cross-buns",
      "ce-twinkle-early",
      "ce-birthday-early"
    ],
    "c-major": [
      "ce-twinkle-early",
      "ce-jingle-early",
      "ce-birthday-early"
    ],
    "beautiful": [
      "ce-twinkle-early",
      "ce-twinkle-elementary"
    ],
    "adults": [
      "ce-adult-rainbow",
      "ce-adult-nadia"
    ],
    "impress": [
      "ce-birthday-early",
      "ce-jingle-early"
    ]
  },
  "counts": {
    "featured_versions": 9,
    "catalog_tracks": 50,
    "individually_performance_tested": 0
  },
  "number_query_policy": "50 exact edition-backed options are available; never describe them as a graded top50 ranking. A 10/30 subset must name its explicit selection criteria and preserve version metadata.",
  "sort": "editorial use-case order, not popularity or difficulty ranking",
  "audio_policy": "Open each publisher’s matching sample or linked tutorial; no source audio redistributed.",
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P001 | content_and_edition_resources_prepared | 9详细版本+50精确合集曲名；非个人逐曲试弹排名 | 50合集曲目的个别署名/逐首技术细评；无需为合页子任务另建URL |
| P006 | content_and_edition_resources_prepared | 3个儿童起步版本与各自所需动作 | 前端筛选与目标版本链接验收 |
| P036 | content_and_edition_resources_prepared | 3个已核C大调版本，明确排除所选D大调Ode | 前端筛选与目标版本链接验收 |
| P037 | content_and_edition_resources_prepared | 同一温和曲调的两个难度版本并标主观选择 | 前端筛选与目标版本链接验收 |
| P039 | content_and_edition_resources_prepared | Alfred成人方法书具体两首和正式版本入口 | 前端筛选与目标版本链接验收 |
| P040 | content_and_edition_resources_prepared | 生日/节庆两个实际用途与版本，不承诺惊艳效果 | 前端筛选与目标版本链接验收 |

### 待确认

- C-EASY-FIFTY-DETAIL — data.additional_catalog_options[].creator/key/technical_demands：50条有精确合集与出版社Easy Piano标签，但未逐首读取全部谱页/个别同名作品署名。不能作为50首已逐曲专业评测的榜单。；解决：对拟重点推荐的曲目读取出版方预览/目录版权页确认署名及技术难点；未核数据保持null。
- C-EASY-TWINKLE-PRICE — ce-twinkle-elementary.access：正文写Free，但商品面板为单次付费/Premium。；解决：页面不加免费标签；用户获取时以出版方所选许可/结账条件为准。
- C-EASY-RIGHTS — resources.rights：已找到原作者/出版社版本；未取得本站复制乐谱/音频许可。；解决：本阶段仅提供明确外部资源入口；若需本地乐谱，逐版本取得再分发依据后再制作。
- C-EASY-SOURCE-ERROR — ce-birthday-lead.chord_notes：Hoffman lead-sheet说明将C7写为C-E-G，缺少七音；本包不沿用该错误。；解决：该字段不取该页FAQ；和弦组成使用独立已核实乐理数据。

来源：CE-01, CE-02, CE-03, CE-04, CE-05, CE-06, CE-07, CE-08, CE-09, CE-10, CE-11

## /songs/christmas

[已核实] 目标关键词：`easy christmas songs in piano`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a playable Christmas version for a seasonal goal.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Easy Christmas Piano Songs**

Choose a playable Christmas version for a seasonal goal.

#### Choose your next version

Compare Jingle Bells with the named Really Easy Piano arrangements. Decide whether you want a lesson-led start or a wider holiday collection.

[推断] editorial guidance using verified version metadata 来源：CR-02。 

#### A first seasonal piece

Use the early-elementary Jingle Bells resource in the easy-song collection for a matching lesson. For Feliz Navidad, Frosty the Snowman or Winter Wonderland, use the exact collection below and its playing tips.

[推断] selection guidance; version facts verified in listed sources 来源：CR-02。 

#### Plan your performance

Choose the song your listeners know, mark a stopping point, and rehearse the beginning and ending. Familiarity does not determine technical level.

[推断] selection guidance; version facts verified in listed sources 来源：CR-02。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-02。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-02-1",
      "work_title": "Feliz Navidad",
      "creator": null,
      "artist": null,
      "edition": "Christmas Hits — Really Easy Piano, HL 01473664",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/1473664/christmas-hits-really-easy-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "An alternative to the traditional carol route.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-02"
      ],
      "edition_features": "Background notes, lyrics and performance tips."
    },
    {
      "id": "cr-02-2",
      "work_title": "Frosty the Snowman",
      "creator": null,
      "artist": null,
      "edition": "Christmas Hits — Really Easy Piano, HL 01473664",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/1473664/christmas-hits-really-easy-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A seasonal title to choose by familiarity.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-02"
      ],
      "edition_features": "Background notes, lyrics and performance tips."
    },
    {
      "id": "cr-02-3",
      "work_title": "Winter Wonderland",
      "creator": null,
      "artist": null,
      "edition": "Christmas Hits — Really Easy Piano, HL 01473664",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/1473664/christmas-hits-really-easy-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Compare its performance tips with your holiday goal.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-02"
      ],
      "edition_features": "Background notes, lyrics and performance tips."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  },
  "related_urls": [
    "/songs/easy",
    "/sheet-music/christmas"
  ]
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P003 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P008 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-christmas-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-02

## /songs/challenging

[已核实] 目标关键词：`hardest piano song`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Compare difficult repertoire without claiming one universal hardest piece.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Challenging Piano Pieces**

Compare difficult repertoire without claiming one universal hardest piece.

#### Choose your next version

Henle rates Mazeppa, Feux follets and Islamey at level 9. These are examples within its own scale.

[推断] editorial guidance using verified version metadata 来源：CR-22, CR-23, CR-24。 

#### Difficulty has several dimensions

Henle considers reading, rhythmic and structural complexity as well as technique. Its scale includes subjective judgement, so a shared number does not make two pieces equally difficult for every player.

[推断] selection guidance; version facts verified in listed sources 来源：CR-24。 

#### Speed and technique

Before choosing, inspect fast passages separately from leaps, chord textures, voicing and endurance. Exact tempo targets and passage-specific demands remain unverified here; do not turn them into ranking badges.

[推断] selection guidance; version facts verified in listed sources 来源：CR-22, CR-23, CR-24。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-22, CR-23, CR-24。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-22-1",
      "work_title": "Mazeppa",
      "creator": null,
      "artist": "Franz Liszt",
      "edition": "Transcendental Studies — Henle HN 717",
      "publisher": "G. Henle Verlag",
      "level": "Henle 9 (difficult)",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.henle.de/en/Transcendental-Studies/HN-717",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Compare a publisher-rated difficult étude with your teacher.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-22"
      ],
      "edition_features": "Both listed as 9 difficult. Piano solo Urtext."
    },
    {
      "id": "cr-22-2",
      "work_title": "Feux follets",
      "creator": null,
      "artist": "Franz Liszt",
      "edition": "Transcendental Studies — Henle HN 717",
      "publisher": "G. Henle Verlag",
      "level": "Henle 9 (difficult)",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.henle.de/en/Transcendental-Studies/HN-717",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A second Henle-9 étude; the matching number is not a personal ranking.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-22"
      ],
      "edition_features": "Both listed as 9 difficult. Piano solo Urtext."
    },
    {
      "id": "cr-23-1",
      "work_title": "Islamey",
      "creator": null,
      "artist": "Mily Balakirev",
      "edition": "Islamey — Fantaisie orientale, Henle HN 793",
      "publisher": "G. Henle Verlag",
      "level": "Henle 9 (difficult)",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.henle.de/us/Islamey-Fantaisie-orientale/HN-793",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A difficult fantasy to compare with the two études; this edition has no fingering.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-23"
      ],
      "edition_features": "Difficulty 9, Urtext without fingering."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  },
  "difficulty_scale": "Henle 1–9",
  "universal_rank": null,
  "speed_comparison": null,
  "passage_difficulty_review": null
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P004 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P025 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-challenging-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。
- C-challenging-tech — P004/P025 speed and technical examples：出版方等级已确认，逐曲具体速度/技术段落未核，当前为选曲基础记录，未完全满足该源任务。；解决：按合法版本逐段核验速度标记、实际难点及示范；不补写最难排名。

来源：CR-22, CR-23, CR-24

## /songs/pop

[已核实] 目标关键词：`easiest pop piano songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Compare beginner pop arrangements with clear notation support.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Easy Pop Piano Songs**

Compare beginner pop arrangements with clear notation support.

#### Choose your next version

Flowers, Vampire, Anti-Hero and Easy On Me are available in the specified Super Easy collection. These are simplified arrangements.

[推断] editorial guidance using verified version metadata 来源：CR-01。 

#### For newer pop repertoire

This selection uses the titles in the verified Pop Hits edition. It is a fixed editorial selection, not a live chart or an easiest-to-hardest ranking.

[推断] selection guidance; version facts verified in listed sources 来源：CR-01。 

#### What the printed letters do

The melody has note names and the left hand has chord diagrams. Check the rhythm as well as the letters before choosing a first piece.

[推断] selection guidance; version facts verified in listed sources 来源：CR-01。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-01。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-01-1",
      "work_title": "Flowers",
      "creator": null,
      "artist": null,
      "edition": "Pop Hits — Super Easy Songbook, HL 01853036",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/1853036/pop-hits-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Choose a pop melody with printed note names.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-01"
      ],
      "edition_features": "Right-hand melody with note names, left-hand chord diagrams; digital book is streaming, not printable."
    },
    {
      "id": "cr-01-2",
      "work_title": "Vampire",
      "creator": null,
      "artist": null,
      "edition": "Pop Hits — Super Easy Songbook, HL 01853036",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/1853036/pop-hits-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Use this simplified version when comparing pop arrangements.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-01"
      ],
      "edition_features": "Right-hand melody with note names, left-hand chord diagrams; digital book is streaming, not printable."
    },
    {
      "id": "cr-01-3",
      "work_title": "Anti-Hero",
      "creator": null,
      "artist": null,
      "edition": "Pop Hits — Super Easy Songbook, HL 01853036",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/1853036/pop-hits-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A Taylor Swift option in this beginner-oriented format.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-01"
      ],
      "edition_features": "Right-hand melody with note names, left-hand chord diagrams; digital book is streaming, not printable."
    },
    {
      "id": "cr-01-4",
      "work_title": "Easy On Me",
      "creator": null,
      "artist": null,
      "edition": "Pop Hits — Super Easy Songbook, HL 01853036",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/1853036/pop-hits-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Compare the letter-labelled melody before choosing a fuller score.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-01"
      ],
      "edition_features": "Right-hand melody with note names, left-hand chord diagrams; digital book is streaming, not printable."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P005 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P013 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P026 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-pop-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-01

## /songs/classical

[已核实] 目标关键词：`classical piano songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Compare simplified classical arrangements with a fuller repertoire edition.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Classical Piano Pieces**

Compare simplified classical arrangements with a fuller repertoire edition.

#### Choose your next version

Start with the Easy Piano versions of Für Elise, Clair de lune or The Happy Farmer. For a later stage, compare Hoffman Academy’s late-intermediate Gymnopédie No. 1.

[推断] editorial guidance using verified version metadata 来源：CR-17, CR-18。 

#### Original work and easy arrangement

A theme or simplified arrangement is a version of the music, not a claim to present the complete original. Keep the exact edition on the card.

[推断] selection guidance; version facts verified in listed sources 来源：CR-17, CR-18。 

#### A fifty-piece collection

The catalogue below identifies fifty entries in one simplified classical collection. Use it as a repertoire menu. These are purchased arrangements, including themes and excerpts; the list is not an independently ranked top fifty.

[推断] selection guidance; version facts verified in listed sources 来源：CR-17, CR-18。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-17, CR-18。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-17-1",
      "work_title": "Für Elise, WoO 59",
      "creator": null,
      "artist": null,
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Choose the simplified arrangement before the complete original.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-17"
      ],
      "edition_features": "Simplified arrangements; some entries are themes or excerpts."
    },
    {
      "id": "cr-17-2",
      "work_title": "Clair de lune",
      "creator": null,
      "artist": null,
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "This collection supplies an easy arrangement rather than the complete original text.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-17"
      ],
      "edition_features": "Simplified arrangements; some entries are themes or excerpts."
    },
    {
      "id": "cr-17-3",
      "work_title": "The Happy Farmer",
      "creator": null,
      "artist": null,
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A title for a cheerful-programme shortlist; mood is an editorial choice.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-17"
      ],
      "edition_features": "Simplified arrangements; some entries are themes or excerpts."
    },
    {
      "id": "cr-18-1",
      "work_title": "Gymnopédie No. 1",
      "creator": "Erik Satie",
      "artist": null,
      "edition": "Gymnopédie No. 1 — Hoffman Academy",
      "publisher": "Hoffman Academy",
      "level": "Late Intermediate",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/gymnopedie-no-1",
      "access": "paid PDF or included in provider Premium membership",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "For a reflective programme; the publisher identifies long phrases and wide bass-to-chord spacing.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-18"
      ],
      "edition_features": "Two-page PDF; purchased single-user or teacher-studio license does not permit website redistribution."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  },
  "full_collection_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
  "featured_count": 4,
  "ranked_top_50": null,
  "additional_catalog_options": [
    {
      "id": "classical-catalog-1",
      "work_title": "Allegro K.545",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-2",
      "work_title": "Arabesque Op.100 No.2",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-3",
      "work_title": "Arioso",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-4",
      "work_title": "Ave Maria Op.52 No.6",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-5",
      "work_title": "Can Can",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-6",
      "work_title": "Canon in D",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-7",
      "work_title": "Clair de lune",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-8",
      "work_title": "Eine kleine Nachtmusik K.525",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-9",
      "work_title": "Fantasie Impromptu in C-sharp minor Op.66",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-10",
      "work_title": "Funeral March Op.35",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-11",
      "work_title": "Für Elise WoO59",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-12",
      "work_title": "Gymnopédie No.1",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-13",
      "work_title": "Habanera",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-14",
      "work_title": "Hallelujah Chorus",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-15",
      "work_title": "The Happy Farmer",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-16",
      "work_title": "Humoresque",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-17",
      "work_title": "Hungarian Dance No.5",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-18",
      "work_title": "In the Hall of the Mountain King",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-19",
      "work_title": "Jesu Joy of Man’s Desiring",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-20",
      "work_title": "La donna è mobile",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-21",
      "work_title": "La fille aux cheveux de lin",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-22",
      "work_title": "Largo",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-23",
      "work_title": "Liebestraum No.3",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-24",
      "work_title": "Lullaby (Cradle Song)",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-25",
      "work_title": "March Op.71a",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-26",
      "work_title": "Meditation",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-27",
      "work_title": "Minuet in G",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-28",
      "work_title": "Minuet in G Major",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-29",
      "work_title": "Moonlight Sonata First Movement Theme",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-30",
      "work_title": "Morning",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-31",
      "work_title": "Night on Bald Mountain",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-32",
      "work_title": "Nocturne in E-flat major Op.9 No.2",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-33",
      "work_title": "Ode to Joy",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-34",
      "work_title": "Pavane pour une infante défunte",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-35",
      "work_title": "Piano Concerto No.2 Third Movement Excerpt",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-36",
      "work_title": "Pictures at an Exhibition (Theme)",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-37",
      "work_title": "Polovtsian Dance Theme",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-38",
      "work_title": "Pomp and Circumstance",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-39",
      "work_title": "Rêverie",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-40",
      "work_title": "Rhapsody on a Theme of Paganini Variation XVIII",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-41",
      "work_title": "Romeo and Juliet (Love Theme)",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-42",
      "work_title": "Rondo Alla Turca K.331",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-43",
      "work_title": "Sicilienne",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-44",
      "work_title": "Sonatina in C major Op.36 No.1",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-45",
      "work_title": "Spinning Song",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-46",
      "work_title": "The Surprise Symphony",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-47",
      "work_title": "The Swan",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-48",
      "work_title": "To a Wild Rose Op.51 No.1",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-49",
      "work_title": "Waltz in A minor",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    },
    {
      "id": "classical-catalog-50",
      "work_title": "William Tell Overture",
      "edition": "First 50 Classical Pieces You Should Play on the Piano, HL 00131436",
      "level": "Easy Piano (collection classification)",
      "creator": null,
      "key": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
      "source_ids": [
        "CR-17"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "selection_basis": "Listed option in a simplified classical collection; not individually ranked."
    }
  ],
  "catalog_options_count": 50
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P007 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P015 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-classical-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-17, CR-18

## /songs/easy-chords

[已核实] 目标关键词：`easy chords songs for beginners piano`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a chord-led song tutorial and practise the required changes.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Easy Piano Songs with Chords**

Choose a chord-led song tutorial and practise the required changes.

#### Choose your next version

The linked Pianote lesson provides separate chord charts for Cups, Just the Way You Are and Someone You Loved.

[推断] editorial guidance using verified version metadata 来源：CR-25, CR-26, CR-27, CR-28。 

#### Chords in these tutorial versions

Cups uses C, Am, F and G. Just the Way You Are uses G, Em and C. Someone You Loved uses C, G, Am, F and Dm. The tutorial’s four-chord summary omits Dm found in its chart. These inventories refer to the linked tutorial charts; they do not establish the original recording keys.

[已核实] 来源：CR-26, CR-27, CR-28。 

#### Follow the chord chart

Open the matching chart and tutorial together. These resources show chord symbols with lyrics, so use the song or lesson to follow where changes fall.

[推断] selection guidance; version facts verified in listed sources 来源：CR-25, CR-26, CR-27, CR-28。 

#### Practise a transition

Choose two adjacent chord symbols, locate their tones in the chord reference, and move between them slowly. The practice method is an editorial suggestion; no fingering sequence is inferred from the tutorial.

[推断] selection guidance; version facts verified in listed sources 来源：CR-25, CR-26, CR-27, CR-28。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-25, CR-26, CR-27, CR-28。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-26",
      "work_title": "Cups (When I’m Gone)",
      "artist": "Anna Kendrick",
      "creator": null,
      "edition": "Pianote / Lisa Witt beginner tutorial chord chart",
      "publisher": "Pianote",
      "level": "beginner tutorial (provider label)",
      "format": "chord symbols with lyrics; no notated melody",
      "resource_url": "https://www.pianote.com/blog/perfect-beginner-songs/",
      "chart_url": "https://pianote.s3.amazonaws.com/blog/perfect-beginner-songs/When-Im-Gone.pdf",
      "access": "external free chord-chart link",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "required_chords": [
        "C",
        "Am",
        "F",
        "G"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Provider-hosted tutorial; rightsholder permission for the chart is not established."
      },
      "why_choose": "Practise following chord changes with the matching tutorial.",
      "selection_evidence_status": "[推断]",
      "source_ids": [
        "CR-25",
        "CR-26"
      ],
      "chord_inventory_basis": "[已核实] symbols present in linked provider PDF; transposed tutorial version only"
    },
    {
      "id": "cr-27",
      "work_title": "Just the Way You Are",
      "artist": "Bruno Mars",
      "creator": null,
      "edition": "Pianote / Lisa Witt beginner tutorial chord chart",
      "publisher": "Pianote",
      "level": "beginner tutorial (provider label)",
      "format": "chord symbols with lyrics; no notated melody",
      "resource_url": "https://www.pianote.com/blog/perfect-beginner-songs/",
      "chart_url": "https://pianote.s3.amazonaws.com/blog/perfect-beginner-songs/Just-The-Way-You-Are.pdf",
      "access": "external free chord-chart link",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "required_chords": [
        "G",
        "Em",
        "C"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Provider-hosted tutorial; rightsholder permission for the chart is not established."
      },
      "why_choose": "Practise following chord changes with the matching tutorial.",
      "selection_evidence_status": "[推断]",
      "source_ids": [
        "CR-25",
        "CR-27"
      ],
      "chord_inventory_basis": "[已核实] symbols present in linked provider PDF; transposed tutorial version only"
    },
    {
      "id": "cr-28",
      "work_title": "Someone You Loved",
      "artist": "Lewis Capaldi",
      "creator": null,
      "edition": "Pianote / Lisa Witt beginner tutorial chord chart",
      "publisher": "Pianote",
      "level": "beginner tutorial (provider label)",
      "format": "chord symbols with lyrics; no notated melody",
      "resource_url": "https://www.pianote.com/blog/perfect-beginner-songs/",
      "chart_url": "https://pianote.s3.amazonaws.com/blog/perfect-beginner-songs/Someone-You-Loved.pdf",
      "access": "external free chord-chart link",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "required_chords": [
        "C",
        "G",
        "Am",
        "F",
        "Dm"
      ],
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Provider-hosted tutorial; rightsholder permission for the chart is not established."
      },
      "why_choose": "Practise following chord changes with the matching tutorial.",
      "selection_evidence_status": "[推断]",
      "source_ids": [
        "CR-25",
        "CR-28"
      ],
      "chord_inventory_basis": "[已核实] symbols present in linked provider PDF; transposed tutorial version only"
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P010 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-easy-chords-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-25, CR-26, CR-27, CR-28

## /songs/anime

[已核实] 目标关键词：`most lovely piano anime songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose an anime theme with a named intermediate piano edition.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Anime Piano Songs**

Choose an anime theme with a named intermediate piano edition.

#### Choose your next version

Begin with the three named themes in The Piano Player: Anime. Its publisher describes the collection as intermediate.

[推断] editorial guidance using verified version metadata 来源：CR-03。 

#### Ghibli or another series

Theme from Princess Mononoke and Nausicaä Requiem give you two Ghibli choices; Killer from JoJo widens the shortlist.

[推断] selection guidance; version facts verified in listed sources 来源：CR-03。 

#### Choose for the sound you want

For a reflective programme, audition Nausicaä Requiem. “Lovely” is a listening preference here, not a verified ranking or a promise about every arrangement.

[推断] selection guidance; version facts verified in listed sources 来源：CR-03。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-03。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-03-1",
      "work_title": "Theme from Princess Mononoke",
      "creator": null,
      "artist": null,
      "edition": "The Piano Player: Anime, ISBN 0571543669",
      "publisher": "Faber Music",
      "level": "Intermediate",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.fabermusic.com/shop/the-piano-player-anime-p480805",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "For a Ghibli-focused recital choice.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-03"
      ],
      "edition_features": "Piano solo collection."
    },
    {
      "id": "cr-03-2",
      "work_title": "Nausicaä Requiem",
      "creator": null,
      "artist": null,
      "edition": "The Piano Player: Anime, ISBN 0571543669",
      "publisher": "Faber Music",
      "level": "Intermediate",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.fabermusic.com/shop/the-piano-player-anime-p480805",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A reflective-title option; decide its mood by listening to your chosen performance.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-03"
      ],
      "edition_features": "Piano solo collection."
    },
    {
      "id": "cr-03-3",
      "work_title": "Killer (from JoJo)",
      "creator": null,
      "artist": null,
      "edition": "The Piano Player: Anime, ISBN 0571543669",
      "publisher": "Faber Music",
      "level": "Intermediate",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.fabermusic.com/shop/the-piano-player-anime-p480805",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "An option outside the Ghibli group.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-03"
      ],
      "edition_features": "Piano solo collection."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P011 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-anime-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-03

## /songs/minecraft

[已核实] 目标关键词：`piano minecraft songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Compare specific Minecraft tracks in an Easy Piano edition.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Minecraft Piano Songs**

Compare specific Minecraft tracks in an Easy Piano edition.

#### Choose your next version

Choose Sweden or Dry Hands from Volume Alpha, or Aria Math from Volume Beta. All three are included in this exact piano collection.

[推断] editorial guidance using verified version metadata 来源：CR-04。 

#### Keep the version visible

The game recording and an Easy Piano arrangement are different resources. Use the piano sample to judge the reading task.

[推断] selection guidance; version facts verified in listed sources 来源：CR-04。 

#### Start a short comparison

Try the opening of your preferred title, then compare one other track. Choose the version whose instructions and notation you can follow.

[推断] selection guidance; version facts verified in listed sources 来源：CR-04。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-04。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-04-1",
      "work_title": "Sweden",
      "creator": "Daniel Rosenfeld",
      "artist": "C418 / Daniel Rosenfeld",
      "edition": "Music from Minecraft — Easy Piano Collection, HL 00369016",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/369016/music-from-minecraft",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Start with a named Volume Alpha track.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-04"
      ],
      "edition_features": "Tracks from Volume Alpha and Volume Beta.",
      "album": "Minecraft: Volume Alpha"
    },
    {
      "id": "cr-04-2",
      "work_title": "Dry Hands",
      "creator": "Daniel Rosenfeld",
      "artist": "C418 / Daniel Rosenfeld",
      "edition": "Music from Minecraft — Easy Piano Collection, HL 00369016",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/369016/music-from-minecraft",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Compare another Volume Alpha arrangement.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-04"
      ],
      "edition_features": "Tracks from Volume Alpha and Volume Beta.",
      "album": "Minecraft: Volume Alpha"
    },
    {
      "id": "cr-04-3",
      "work_title": "Aria Math",
      "creator": "Daniel Rosenfeld",
      "artist": "C418 / Daniel Rosenfeld",
      "edition": "Music from Minecraft — Easy Piano Collection, HL 00369016",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/369016/music-from-minecraft",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Choose a Volume Beta track instead.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-04"
      ],
      "edition_features": "Tracks from Volume Alpha and Volume Beta.",
      "album": "Minecraft: Volume Beta"
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P012 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-minecraft-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-04

## /songs/rock

[已核实] 目标关键词：`piano rock songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a simplified keyboard arrangement of a rock song.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Rock Songs for Piano**

Choose a simplified keyboard arrangement of a rock song.

#### Choose your next version

Compare Don’t Stop Believin’, Dust in the Wind and Smoke on the Water in the Super Easy collection.

[推断] editorial guidance using verified version metadata 来源：CR-06。 

#### From a band song to a piano task

Use the arranged melody and left-hand chord diagrams. This format gives a keyboard route into the song; it does not provide every instrumental part.

[推断] selection guidance; version facts verified in listed sources 来源：CR-06。 

#### What to compare

Check where the printed chords change and whether the melody rhythm is comfortable. Choose by the song you want to practise, not the fame of its original recording.

[推断] selection guidance; version facts verified in listed sources 来源：CR-06。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-06。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-06-1",
      "work_title": "Don't Stop Believin'",
      "creator": null,
      "artist": null,
      "edition": "Classic Rock — Super Easy Songbook, HL 00287526",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/287526/classic-rock-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Choose the melody-and-chord version before an original-recording transcription.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-06"
      ],
      "edition_features": "Note names inside melody notes and left-hand chord diagrams."
    },
    {
      "id": "cr-06-2",
      "work_title": "Dust in the Wind",
      "creator": null,
      "artist": null,
      "edition": "Classic Rock — Super Easy Songbook, HL 00287526",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/287526/classic-rock-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A familiar-title option in a piano arrangement.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-06"
      ],
      "edition_features": "Note names inside melody notes and left-hand chord diagrams."
    },
    {
      "id": "cr-06-3",
      "work_title": "Smoke on the Water",
      "creator": null,
      "artist": null,
      "edition": "Classic Rock — Super Easy Songbook, HL 00287526",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/287526/classic-rock-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Compare a keyboard adaptation rather than expecting a guitar part.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-06"
      ],
      "edition_features": "Note names inside melody notes and left-hand chord diagrams."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P016 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-rock-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-06

## /songs/taylor-swift

[已核实] 目标关键词：`taylor swift piano songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose an easy Taylor Swift arrangement from an identified edition.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Taylor Swift Piano Songs**

Choose an easy Taylor Swift arrangement from an identified edition.

#### Choose your next version

Love Story, Shake It Off, Cardigan and Willow are confirmed entries in 40 Taylor Swift Songs — Really Easy Piano.

[推断] editorial guidance using verified version metadata 来源：CR-07。 

#### Build a personal shortlist

Choose Love Story for that song’s familiarity, or compare Cardigan and Willow if those are the titles you prefer. Shake It Off is an editorial option for a lively-programme goal.

[推断] selection guidance; version facts verified in listed sources 来源：CR-07。 

#### What easy means here

The label applies to this collection. It does not describe Taylor Swift’s recordings, every online transcription, or your personal learning time.

[推断] selection guidance; version facts verified in listed sources 来源：CR-07。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-07。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-07-1",
      "work_title": "Love Story",
      "creator": null,
      "artist": "Taylor Swift",
      "edition": "40 Taylor Swift Songs — Really Easy Piano, HL 00365513",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/365513/40-taylor-swift-songs",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A title-led choice from this specific collection.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-07"
      ],
      "edition_features": "Background notes and performance tips."
    },
    {
      "id": "cr-07-2",
      "work_title": "Shake It Off",
      "creator": null,
      "artist": "Taylor Swift",
      "edition": "40 Taylor Swift Songs — Really Easy Piano, HL 00365513",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/365513/40-taylor-swift-songs",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "An alternative for a lively-programme goal; mood selection is subjective.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-07"
      ],
      "edition_features": "Background notes and performance tips."
    },
    {
      "id": "cr-07-3",
      "work_title": "Cardigan",
      "creator": null,
      "artist": "Taylor Swift",
      "edition": "40 Taylor Swift Songs — Really Easy Piano, HL 00365513",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/365513/40-taylor-swift-songs",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Compare this version with Love Story using the performance tips.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-07"
      ],
      "edition_features": "Background notes and performance tips."
    },
    {
      "id": "cr-07-4",
      "work_title": "Willow",
      "creator": null,
      "artist": "Taylor Swift",
      "edition": "40 Taylor Swift Songs — Really Easy Piano, HL 00365513",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/365513/40-taylor-swift-songs",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Another included title for players who prefer this song.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-07"
      ],
      "edition_features": "Background notes and performance tips."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P017 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P031 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-taylor-swift-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-07

## /songs/disney

[已核实] 目标关键词：`disney easy piano songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a beginner Disney arrangement by film and exact edition.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Easy Disney Piano Songs**

Choose a beginner Disney arrangement by film and exact edition.

#### Choose your next version

The verified Really Easy Piano collection includes Let It Go, A Whole New World and We Don’t Talk About Bruno.

[推断] editorial guidance using verified version metadata 来源：CR-08。 

#### Choose the film song first

For a Frozen goal, start with Let It Go. For an Encanto goal, inspect We Don’t Talk About Bruno. Use the individual playing tips before deciding which is easiest for you.

[推断] selection guidance; version facts verified in listed sources 来源：CR-08。 

#### Need letters on the staff?

The edition below is a beginner collection; letter annotation is a separate feature. Use the sheet-music Disney directory to compare verified notation formats.

[推断] selection guidance; version facts verified in listed sources 来源：CR-08。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-08。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-08-1",
      "work_title": "Let It Go",
      "creator": null,
      "artist": null,
      "edition": "Really Easy Piano: 40 Disney Songs, HL 00457282",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/457282/really-easy-piano-40-disney-songs",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A Frozen choice in the specified beginner arrangement.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-08"
      ],
      "edition_features": "Beginner piano arrangements with background notes and tips."
    },
    {
      "id": "cr-08-2",
      "work_title": "A Whole New World",
      "creator": null,
      "artist": null,
      "edition": "Really Easy Piano: 40 Disney Songs, HL 00457282",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/457282/really-easy-piano-40-disney-songs",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Choose a different film song in the same notation format.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-08"
      ],
      "edition_features": "Beginner piano arrangements with background notes and tips."
    },
    {
      "id": "cr-08-3",
      "work_title": "We Don’t Talk About Bruno",
      "creator": null,
      "artist": null,
      "edition": "Really Easy Piano: 40 Disney Songs, HL 00457282",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/457282/really-easy-piano-40-disney-songs",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A choice from Encanto; inspect its rhythm before committing.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-08"
      ],
      "edition_features": "Beginner piano arrangements with background notes and tips."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P019 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P021 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-disney-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-08

## /songs/wedding

[已核实] 目标关键词：`piano wedding songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a wedding resource for solo piano or a vocalist.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Wedding Songs for Piano**

Choose a wedding resource for solo piano or a vocalist.

#### Choose your next version

A Thousand Years has a separate Easy Piano edition and a Piano/Vocal/Guitar edition. All of Me offers another vocal resource.

[推断] editorial guidance using verified version metadata 来源：CR-21, CR-20, CR-19。 

#### Choose by the part you must play

For a solo slot, inspect the Easy Piano version. For a singer, inspect the vocal staff and accompaniment format. A song title alone does not answer this choice.

[推断] selection guidance; version facts verified in listed sources 来源：CR-21, CR-20, CR-19。 

#### Plan the ceremony cue

Ask for the available time and the cue to finish. Mark an agreed ending in your lawful copy. These are planning suggestions; no arrangement duration is assumed.

[推断] selection guidance; version facts verified in listed sources 来源：CR-21, CR-20, CR-19。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-21, CR-20, CR-19。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-21-1",
      "work_title": "A Thousand Years",
      "creator": null,
      "artist": "Christina Perri",
      "edition": "A Thousand Years — Easy Piano, HL 00117056",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/117056/a-thousand-years",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Choose this solo version when a singer is not part of your plan.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-21"
      ],
      "edition_features": "Exact Easy Piano edition, separate from Piano Vocal HL 00354270."
    },
    {
      "id": "cr-20-1",
      "work_title": "A Thousand Years",
      "creator": null,
      "artist": "Christina Perri",
      "edition": "A Thousand Years — Piano Vocal, HL 00354270",
      "publisher": "Hal Leonard",
      "level": null,
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "piano/vocal/guitar",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/354270/a-thousand-years",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A second piano/vocal/guitar option for an ensemble shortlist.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-20"
      ],
      "edition_features": "Piano/Vocal/Guitar instrumentation."
    },
    {
      "id": "cr-19-1",
      "work_title": "All of Me",
      "creator": null,
      "artist": "John Legend",
      "edition": "All of Me — Piano Vocal, HL 00126844",
      "publisher": "Hal Leonard",
      "level": null,
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "piano/vocal with guitar chord frames",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/126844/all-of-me",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Use the vocal staff for singing and the chord frames for a guitar collaborator.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-19"
      ],
      "edition_features": "Piano and vocal melody with guitar chord frames."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P020 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-wedding-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-21, CR-20, CR-19

## /songs/worship

[已核实] 目标关键词：`piano worship songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Compare contemporary worship selections and hymn arrangements.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Worship Songs and Hymns for Piano**

Compare contemporary worship selections and hymn arrangements.

#### Choose your next version

Choose How Great Is Our God, In Christ Alone or Cornerstone from the Worship edition. For a hymn route, compare Amazing Grace, Be Thou My Vision or What a Friend We Have in Jesus.

[推断] editorial guidance using verified version metadata 来源：CR-12, CR-13。 

#### Match the version used by your group

Titles can appear in different arrangements. Amazing Grace in the hymn collection is a different entry from Amazing Grace (My Chains Are Gone) in the worship collection.

[推断] selection guidance; version facts verified in listed sources 来源：CR-12, CR-13。 

#### Private practice and group use

The Super Easy format supplies melody letters and chord diagrams. For a service, agree the key, repeats and ending with the musicians before using a particular score.

[推断] selection guidance; version facts verified in listed sources 来源：CR-12, CR-13。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-12, CR-13。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-12-1",
      "work_title": "How Great Is Our God",
      "creator": null,
      "artist": null,
      "edition": "Worship — Super Easy Songbook, HL 00294871",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/294871/worship-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A contemporary worship choice in an annotated format.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-12"
      ],
      "edition_features": "Right-hand letter-labelled melody and left-hand chord diagrams."
    },
    {
      "id": "cr-12-2",
      "work_title": "In Christ Alone",
      "creator": null,
      "artist": null,
      "edition": "Worship — Super Easy Songbook, HL 00294871",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/294871/worship-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Compare the printed melody with the version your group sings.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-12"
      ],
      "edition_features": "Right-hand letter-labelled melody and left-hand chord diagrams."
    },
    {
      "id": "cr-12-3",
      "work_title": "Cornerstone",
      "creator": null,
      "artist": null,
      "edition": "Worship — Super Easy Songbook, HL 00294871",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/294871/worship-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A third option for a personal worship shortlist.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-12"
      ],
      "edition_features": "Right-hand letter-labelled melody and left-hand chord diagrams."
    },
    {
      "id": "cr-13-1",
      "work_title": "Amazing Grace",
      "creator": null,
      "artist": null,
      "edition": "Hymns — Super Easy Songbook, HL 00194659",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/194659/hymns-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Use the hymn entry, distinct from Amazing Grace (My Chains Are Gone).",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-13"
      ],
      "edition_features": "Publisher list confirms these titles."
    },
    {
      "id": "cr-13-2",
      "work_title": "Be Thou My Vision",
      "creator": null,
      "artist": null,
      "edition": "Hymns — Super Easy Songbook, HL 00194659",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/194659/hymns-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A hymn alternative to the contemporary worship collection.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-13"
      ],
      "edition_features": "Publisher list confirms these titles."
    },
    {
      "id": "cr-13-3",
      "work_title": "What a Friend We Have in Jesus",
      "creator": null,
      "artist": null,
      "edition": "Hymns — Super Easy Songbook, HL 00194659",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/194659/hymns-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A third hymn option in the same specified edition.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-13"
      ],
      "edition_features": "Publisher list confirms these titles."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P023 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P032 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-worship-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-12, CR-13

## /songs/rap

[已核实] 目标关键词：`rap songs for piano`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose an intermediate instrumental arrangement of a hip-hop song.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Rap and Hip-Hop Songs for Piano**

Choose an intermediate instrumental arrangement of a hip-hop song.

#### Choose your next version

Empire State of Mind, Hotline Bling and Sunflower are included in Logan Evan Thomas’s Hip-Hop for Piano Solo.

[推断] editorial guidance using verified version metadata 来源：CR-14。 

#### What this piano version provides

These are instrumental piano arrangements, with an Intermediate publisher label. Choose this resource when your goal is a piano performance.

[推断] selection guidance; version facts verified in listed sources 来源：CR-14。 

#### Compare the demonstration

Use the demonstration on the publisher page to hear the arranged result. A solo arrangement should not be mistaken for a complete rap vocal transcription or a backing track.

[推断] selection guidance; version facts verified in listed sources 来源：CR-14。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-14。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-14-1",
      "work_title": "Empire State of Mind",
      "creator": null,
      "artist": null,
      "edition": "Hip-Hop for Piano Solo — Intermediate Level, HL 00360950",
      "publisher": "Hal Leonard",
      "level": "Intermediate",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/360950/hip-hop-for-piano-solo",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A piano-solo option from an explicitly intermediate collection.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-14"
      ],
      "edition_features": "Arranged by Logan Evan Thomas; publisher page includes a demonstration.",
      "arranger": "Logan Evan Thomas"
    },
    {
      "id": "cr-14-2",
      "work_title": "Hotline Bling",
      "creator": null,
      "artist": null,
      "edition": "Hip-Hop for Piano Solo — Intermediate Level, HL 00360950",
      "publisher": "Hal Leonard",
      "level": "Intermediate",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/360950/hip-hop-for-piano-solo",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Compare an instrumental arrangement without needing to deliver the rap vocal.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-14"
      ],
      "edition_features": "Arranged by Logan Evan Thomas; publisher page includes a demonstration.",
      "arranger": "Logan Evan Thomas"
    },
    {
      "id": "cr-14-3",
      "work_title": "Sunflower",
      "creator": null,
      "artist": null,
      "edition": "Hip-Hop for Piano Solo — Intermediate Level, HL 00360950",
      "publisher": "Hal Leonard",
      "level": "Intermediate",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/360950/hip-hop-for-piano-solo",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A further solo choice; inspect the publisher demonstration.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-14"
      ],
      "edition_features": "Arranged by Logan Evan Thomas; publisher page includes a demonstration.",
      "arranger": "Logan Evan Thomas"
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P024 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-rap-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-14

## /songs/piano-and-guitar

[已核实] 目标关键词：`piano and guitar songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose resources that support a pianist and guitarist working together.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Songs for Piano and Guitar**

Choose resources that support a pianist and guitarist working together.

#### Choose your next version

Compare All of Me and A Thousand Years in their Piano/Vocal/Guitar editions.

[推断] editorial guidance using verified version metadata 来源：CR-19, CR-20。 

#### Know what the score contains

All of Me includes piano and vocal melody plus guitar chord frames. It is a practical chord-support resource for a guitarist; it is not described as two fully notated instrumental parts.

[推断] selection guidance; version facts verified in listed sources 来源：CR-19, CR-20。 

#### Agree your roles

Choose who carries the melody, which player marks the pulse, and how to start and stop. Agree the same key and arrangement before rehearsing.

[推断] selection guidance; version facts verified in listed sources 来源：CR-19, CR-20。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-19, CR-20。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-19-1",
      "work_title": "All of Me",
      "creator": null,
      "artist": "John Legend",
      "edition": "All of Me — Piano Vocal, HL 00126844",
      "publisher": "Hal Leonard",
      "level": null,
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "piano/vocal with guitar chord frames",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/126844/all-of-me",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Use the vocal staff for singing and the chord frames for a guitar collaborator.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-19"
      ],
      "edition_features": "Piano and vocal melody with guitar chord frames."
    },
    {
      "id": "cr-20-1",
      "work_title": "A Thousand Years",
      "creator": null,
      "artist": "Christina Perri",
      "edition": "A Thousand Years — Piano Vocal, HL 00354270",
      "publisher": "Hal Leonard",
      "level": null,
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "piano/vocal/guitar",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/354270/a-thousand-years",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A second piano/vocal/guitar option for an ensemble shortlist.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-20"
      ],
      "edition_features": "Piano/Vocal/Guitar instrumentation."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P027 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-piano-and-guitar-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-19, CR-20

## /songs/beatles

[已核实] 目标关键词：`beatles piano songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a Beatles arrangement with printed chords and performance notes.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Beatles Songs for Piano**

Choose a Beatles arrangement with printed chords and performance notes.

#### Choose your next version

Let It Be, Here Comes the Sun, Yesterday and In My Life are all in the named Really Easy Piano edition.

[推断] editorial guidance using verified version metadata 来源：CR-09。 

#### Solo practice or singing

The collection includes chords and lyrics. Before accompanying a singer, agree the version and starting pitch; the mere presence of lyrics does not establish a separate accompaniment part.

[推断] selection guidance; version facts verified in listed sources 来源：CR-09。 

#### Choose a manageable excerpt

Read the tips for your chosen title and try a short passage. Keep its arrangement title with your practice notes so another edition does not get mixed in.

[推断] selection guidance; version facts verified in listed sources 来源：CR-09。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-09。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-09-1",
      "work_title": "Let It Be",
      "creator": null,
      "artist": "The Beatles",
      "edition": "The Beatles Collection — Really Easy Piano, HL 00359244",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/359244/the-beatles-collection-really-easy-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Use the printed chords and performance notes in this arrangement.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-09"
      ],
      "edition_features": "Chords, lyrics, background notes and playing tips."
    },
    {
      "id": "cr-09-2",
      "work_title": "Here Comes the Sun",
      "creator": null,
      "artist": "The Beatles",
      "edition": "The Beatles Collection — Really Easy Piano, HL 00359244",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/359244/the-beatles-collection-really-easy-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Choose by the song you want to play, then inspect the sample.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-09"
      ],
      "edition_features": "Chords, lyrics, background notes and playing tips."
    },
    {
      "id": "cr-09-3",
      "work_title": "Yesterday",
      "creator": null,
      "artist": "The Beatles",
      "edition": "The Beatles Collection — Really Easy Piano, HL 00359244",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/359244/the-beatles-collection-really-easy-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A contrasting title for a reflective programme.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-09"
      ],
      "edition_features": "Chords, lyrics, background notes and playing tips."
    },
    {
      "id": "cr-09-4",
      "work_title": "In My Life",
      "creator": null,
      "artist": "The Beatles",
      "edition": "The Beatles Collection — Really Easy Piano, HL 00359244",
      "publisher": "Hal Leonard",
      "level": "Really Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/359244/the-beatles-collection-really-easy-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "An alternative from the same edition with its own performance notes.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-09"
      ],
      "edition_features": "Chords, lyrics, background notes and playing tips."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P028 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-beatles-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-09

## /songs/coldplay

[已核实] 目标关键词：`coldplay piano songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a Coldplay song from the verified Easy Piano second edition.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Coldplay Songs for Piano**

Choose a Coldplay song from the verified Easy Piano second edition.

#### Choose your next version

Yellow, The Scientist, Clocks, Fix You and Viva La Vida are included in this 16-song edition.

[推断] editorial guidance using verified version metadata 来源：CR-10。 

#### Choose the arrangement you mean

A familiar recording does not tell you how this piano arrangement is written. Compare the publisher’s sample with your reading ability.

[推断] selection guidance; version facts verified in listed sources 来源：CR-10。 

#### A practical shortlist

Choose the title you most want to play; then compare one alternative from the same edition. The five cards are not ranked by difficulty.

[推断] selection guidance; version facts verified in listed sources 来源：CR-10。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-10。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-10-1",
      "work_title": "Yellow",
      "creator": null,
      "artist": "Coldplay",
      "edition": "The Best of Coldplay for Easy Piano — Second Edition, HL 00306560",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/306560/the-best-of-coldplay-for-easy-piano-second-edition",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A choice for players who want this particular song.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-10"
      ],
      "edition_features": "16-song second edition; not every Coldplay song is included."
    },
    {
      "id": "cr-10-2",
      "work_title": "The Scientist",
      "creator": null,
      "artist": "Coldplay",
      "edition": "The Best of Coldplay for Easy Piano — Second Edition, HL 00306560",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/306560/the-best-of-coldplay-for-easy-piano-second-edition",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Compare the sample with Clocks before choosing.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-10"
      ],
      "edition_features": "16-song second edition; not every Coldplay song is included."
    },
    {
      "id": "cr-10-3",
      "work_title": "Clocks",
      "creator": null,
      "artist": "Coldplay",
      "edition": "The Best of Coldplay for Easy Piano — Second Edition, HL 00306560",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/306560/the-best-of-coldplay-for-easy-piano-second-edition",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Use the Easy Piano edition; do not assume an original transcription.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-10"
      ],
      "edition_features": "16-song second edition; not every Coldplay song is included."
    },
    {
      "id": "cr-10-4",
      "work_title": "Fix You",
      "creator": null,
      "artist": "Coldplay",
      "edition": "The Best of Coldplay for Easy Piano — Second Edition, HL 00306560",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/306560/the-best-of-coldplay-for-easy-piano-second-edition",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Another verified title in the same edition.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-10"
      ],
      "edition_features": "16-song second edition; not every Coldplay song is included."
    },
    {
      "id": "cr-10-5",
      "work_title": "Viva La Vida",
      "creator": null,
      "artist": "Coldplay",
      "edition": "The Best of Coldplay for Easy Piano — Second Edition, HL 00306560",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/306560/the-best-of-coldplay-for-easy-piano-second-edition",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "An alternative for a recital shortlist.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-10"
      ],
      "edition_features": "16-song second edition; not every Coldplay song is included."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P029 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-coldplay-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-10

## /songs/country

[已核实] 目标关键词：`country music piano songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a country song with melody letters and left-hand chord support.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Country Songs for Piano**

Choose a country song with melody letters and left-hand chord support.

#### Choose your next version

Always on My Mind, The Gambler and On the Road Again are in this Super Easy edition.

[推断] editorial guidance using verified version metadata 来源：CR-11。 

#### For melody-first practice

Use the printed note names to locate pitches, then follow the written rhythm. The chord diagrams give a separate left-hand task.

[推断] selection guidance; version facts verified in listed sources 来源：CR-11。 

#### For a sing-along goal

Lyrics are included in the book. Test the starting pitch with the singer and decide whether you will play the printed melody or a simpler accompaniment.

[推断] selection guidance; version facts verified in listed sources 来源：CR-11。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-11。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-11-1",
      "work_title": "Always on My Mind",
      "creator": null,
      "artist": null,
      "edition": "Country — Super Easy Songbook, HL 00285257",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/285257/country-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A melody-led choice with printed note names.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-11"
      ],
      "edition_features": "Melody note names, left-hand chord diagrams and lyrics."
    },
    {
      "id": "cr-11-2",
      "work_title": "The Gambler",
      "creator": null,
      "artist": null,
      "edition": "Country — Super Easy Songbook, HL 00285257",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/285257/country-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Choose a song you know and follow this edition’s chord diagrams.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-11"
      ],
      "edition_features": "Melody note names, left-hand chord diagrams and lyrics."
    },
    {
      "id": "cr-11-3",
      "work_title": "On the Road Again",
      "creator": null,
      "artist": null,
      "edition": "Country — Super Easy Songbook, HL 00285257",
      "publisher": "Hal Leonard",
      "level": "Super Easy Songbook",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/285257/country-super-easy-songbook",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "An alternative country title in the same beginner format.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-11"
      ],
      "edition_features": "Melody note names, left-hand chord diagrams and lyrics."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P030 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-country-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-11

## /songs/jazz

[已核实] 目标关键词：`jazz piano songs`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a written jazz-standard arrangement before improvising.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Easy Jazz Piano Songs**

Choose a written jazz-standard arrangement before improvising.

#### Choose your next version

Autumn Leaves, Misty and Fly Me to the Moon are available in the selected Easy Piano collection.

[推断] editorial guidance using verified version metadata 来源：CR-15。 

#### Choose your first written standard

Read a short phrase and check its rhythm and chord texture. Use the version you can follow while keeping time.

[推断] selection guidance; version facts verified in listed sources 来源：CR-15。 

#### Keep two goals separate

Learning the written arrangement and inventing a solo are different practice goals. These cards identify the score; they do not claim to teach all of jazz improvisation.

[推断] selection guidance; version facts verified in listed sources 来源：CR-15。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-15。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-15-1",
      "work_title": "Autumn Leaves",
      "creator": null,
      "artist": null,
      "edition": "First 50 Jazz Standards You Should Play on Piano, HL 00196269",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/196269/first-50-jazz-standards-you-should-play-on-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Choose a written arrangement as a starting point.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-15"
      ],
      "edition_features": "Written piano arrangements with lyrics; no claim of improvised-solo transcription."
    },
    {
      "id": "cr-15-2",
      "work_title": "Misty",
      "creator": null,
      "artist": null,
      "edition": "First 50 Jazz Standards You Should Play on Piano, HL 00196269",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/196269/first-50-jazz-standards-you-should-play-on-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A second standard to compare by sample and musical preference.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-15"
      ],
      "edition_features": "Written piano arrangements with lyrics; no claim of improvised-solo transcription."
    },
    {
      "id": "cr-15-3",
      "work_title": "Fly Me to the Moon (In Other Words)",
      "creator": null,
      "artist": null,
      "edition": "First 50 Jazz Standards You Should Play on Piano, HL 00196269",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/196269/first-50-jazz-standards-you-should-play-on-piano",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A further standard in this specific Easy Piano collection.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-15"
      ],
      "edition_features": "Written piano arrangements with lyrics; no claim of improvised-solo transcription."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P033 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |
| P038 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-jazz-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-15

## /songs/halloween

[已核实] 目标关键词：`piano songs for halloween`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose an Easy Piano version for a seasonal performance.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**Halloween Songs for Piano**

Choose an Easy Piano version for a seasonal performance.

#### Choose your next version

Addams Family Theme, Monster Mash and This Is Halloween are confirmed in the second edition below.

[推断] editorial guidance using verified version metadata 来源：CR-16。 

#### Pick the audience connection

Choose the theme or song your group wants to hear, then check the exact sample. The seasonal connection is the selection criterion.

[推断] selection guidance; version facts verified in listed sources 来源：CR-16。 

#### Practise the cue and ending

Rehearse a clear count-in and a deliberate final stop. Those are editorial performance suggestions, not claims about the printed arrangement.

[推断] selection guidance; version facts verified in listed sources 来源：CR-16。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-16。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-16-1",
      "work_title": "Addams Family Theme",
      "creator": null,
      "artist": null,
      "edition": "The Halloween Songbook — 2nd Edition, HL 00310162",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/310162/the-halloween-songbook-2nd-edition",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A theme-song option for a Halloween programme.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-16"
      ],
      "edition_features": "16-song easy piano second edition."
    },
    {
      "id": "cr-16-2",
      "work_title": "Monster Mash",
      "creator": null,
      "artist": null,
      "edition": "The Halloween Songbook — 2nd Edition, HL 00310162",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/310162/the-halloween-songbook-2nd-edition",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A different seasonal title from the same edition.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-16"
      ],
      "edition_features": "16-song easy piano second edition."
    },
    {
      "id": "cr-16-3",
      "work_title": "This Is Halloween",
      "creator": null,
      "artist": null,
      "edition": "The Halloween Songbook — 2nd Edition, HL 00310162",
      "publisher": "Hal Leonard",
      "level": "Easy Piano",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/310162/the-halloween-songbook-2nd-edition",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A further verified title; compare before choosing.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-16"
      ],
      "edition_features": "16-song easy piano second edition."
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P034 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-halloween-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-16

## /songs/undertale

[已核实] 目标关键词：`undertale songs on piano`；模板 T16；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose between the simplified score book and performance collections.

### 页面需回答的问题

- Which specific versions fit this task?
- What does the difficulty label apply to?
- Where can I get the selected resource?

### 英文页面内容

**UNDERTALE Piano Songs**

Choose between the simplified score book and performance collections.

#### Choose your next version

Fallen Down, Home and MEGALOVANIA appear in the Complete Piano Score Book, adapted by David Peacock from Toby Fox’s soundtrack.

[推断] editorial guidance using verified version metadata 来源：CR-05。 

#### Which book do you need?

Fangamer describes this book as simpler than the separate Piano Collections volumes. That comparison does not make every track a first lesson.

[推断] selection guidance; version facts verified in listed sources 来源：CR-05。 

#### Choose the exact track

Home and Home (Music Box) are separate entries. Use the title shown on the card and check the publisher’s availability before planning a recital.

[推断] selection guidance; version facts verified in listed sources 来源：CR-05。 

#### Open the exact edition

Each resource names its edition and access route. Publisher difficulty labels describe that arrangement. Use the provider’s preview before purchasing; check the chosen digital format before expecting a printable PDF.

[推断] acquisition guidance 来源：CR-05。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "cr-05-1",
      "work_title": "Fallen Down",
      "creator": "Toby Fox",
      "artist": "Toby Fox",
      "edition": "UNDERTALE — Complete Piano Score Book",
      "publisher": "Fangamer / Materia Collective",
      "level": "simpler arrangements; no formal grade supplied",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.fangamer.com/products/undertale-piano-score-book",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "A choice from the early part of the track list.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-05"
      ],
      "edition_features": "101 tracks adapted by David Peacock; Piano Collections Volumes 1 and 2 are separate, more challenging arrangements.",
      "arranger": "David Peacock"
    },
    {
      "id": "cr-05-2",
      "work_title": "Home",
      "creator": "Toby Fox",
      "artist": "Toby Fox",
      "edition": "UNDERTALE — Complete Piano Score Book",
      "publisher": "Fangamer / Materia Collective",
      "level": "simpler arrangements; no formal grade supplied",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.fangamer.com/products/undertale-piano-score-book",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Choose the Home entry; Home (Music Box) is a separate item.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-05"
      ],
      "edition_features": "101 tracks adapted by David Peacock; Piano Collections Volumes 1 and 2 are separate, more challenging arrangements.",
      "arranger": "David Peacock"
    },
    {
      "id": "cr-05-3",
      "work_title": "MEGALOVANIA",
      "creator": "Toby Fox",
      "artist": "Toby Fox",
      "edition": "UNDERTALE — Complete Piano Score Book",
      "publisher": "Fangamer / Materia Collective",
      "level": "simpler arrangements; no formal grade supplied",
      "level_basis": "publisher edition label; not an individual performance assessment",
      "format": "published piano arrangement",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.fangamer.com/products/undertale-piano-score-book",
      "access": "external publisher purchase; select print/digital product and check provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false,
        "reason": "Publisher resource only; no Piano Reference reproduction permission established."
      },
      "why_choose": "Choose the simplified book version before comparing a performance arrangement.",
      "selection_evidence_status": "[推断] editorial choice",
      "first_check": "Inspect the exact sample for reading, rhythm and hand movement before choosing.",
      "source_ids": [
        "CR-05"
      ],
      "edition_features": "101 tracks adapted by David Peacock; Piano Collections Volumes 1 and 2 are separate, more challenging arrangements.",
      "arranger": "David Peacock"
    }
  ],
  "filter_contract": {
    "search_fields": [
      "work_title",
      "artist",
      "edition"
    ],
    "level": "publisher label; preserve original wording",
    "mood": "editorial subjective tags only",
    "unknown_values": "exclude from positive filters"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P035 | prepared_with_explicit_limits | Specific version cards, task-specific English guidance and verified provider resources. | Individual technical analysis and permissions only where null; see issues. |

### 待确认

- C-undertale-review — per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

来源：CR-05

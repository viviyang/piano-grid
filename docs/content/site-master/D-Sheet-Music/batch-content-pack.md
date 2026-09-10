# Batch D — Sheet Music

[已核实] 共 42 页。基线字段原样保留，核查日期 2026-09-09。

证据标签为后台记录；英文文案在各模块 body 中。计算数据与编辑建议标 [推断]。待确认字段不供上线渲染。

## /tools/blank-sheet-music

[已核实] 目标关键词：`empty piano sheet music`；模板 T19；基线优先级：先做。
状态：`content_and_data_prepared`；发布状态：未验收。

任务：Get usable blank piano manuscript paper without an account.

### 页面需回答的问题

- Does the page show piano grand staffs?
- Can I print Letter or A4 paper?
- Are these files available now?

### 英文页面内容

**Blank Piano Sheet Music**

Print blank grand staffs for piano notation, lessons and composition.

#### Print a blank piano staff

Choose Letter or A4. Each sheet has six pairs of treble and bass staves, with room to write a title and your own music. Download the PDF and print it at 100% if your printer can keep the margins.

[已核实] original generated asset inspection 来源：DB-01。 

#### Write your own music

Add a key signature, time signature and barlines to suit your exercise. The blank pairs leave the musical choices to you.

[推断] editorial usage suggestion 来源：DB-01。 

### 结构化数据

```json
{
  "assets": [
    {
      "path": "assets/blank-piano-staff-letter.pdf",
      "format": "PDF",
      "pages": 1,
      "grand_staff_systems": 6,
      "access": "free local download",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference worksheet; distributable",
        "third_party_font_license": "Bravura SIL OFL; retained in assets/Bravura-LICENSE.txt"
      },
      "visual_qa": "passed; both complete PDF pages rendered and inspected"
    },
    {
      "path": "assets/blank-piano-staff-a4.pdf",
      "format": "PDF",
      "pages": 1,
      "grand_staff_systems": 6,
      "access": "free local download",
      "rights": {
        "edition_status": "official / authorized",
        "site_use": "original Piano Reference worksheet; distributable",
        "third_party_font_license": "Bravura SIL OFL; retained in assets/Bravura-LICENSE.txt"
      },
      "visual_qa": "passed; both complete PDF pages rendered and inspected"
    }
  ],
  "preview_asset": "assets/blank-piano-staff-preview.svg",
  "notation": {
    "staff_lines": 5,
    "clefs": [
      "treble G2",
      "bass F4"
    ],
    "system_count": 6,
    "music_content": "blank"
  },
  "account_required": false
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P079 | content_and_print_assets_prepared | Original SVG preview and actual Letter/A4 PDFs with six grand-staff systems. | Website download and print action integration QA. |

### 待确认

- 无新增音乐事实缺项；开发后仍需按基线完成播放、打印、资源链接等验收。

来源：DB-01, DB-02

## /sheet-music

[已核实] 目标关键词：`piano music sheet`；模板 T17；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Find an actual score by level, notation and access.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Piano Sheet Music**

Find an actual score by level, notation and access.

#### Free and easy

Amazing Grace Preparatory is a publicly accessible provider PDF. Silent Night Early Elementary uses the provider’s free-download form. These routes have different access steps.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-AMAZING-PREP, D-D-SILENT, CR-18, CR-14, CR-12, CR-13, D-D-GOSPEL。 

#### Intermediate

Compare the named late-intermediate Gymnopédie edition with intermediate hip-hop solos. Difficulty refers to these specific editions.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-AMAZING-PREP, D-D-SILENT, CR-18, CR-14, CR-12, CR-13, D-D-GOSPEL。 

#### Gospel, worship and hymns

The hymn and worship resources identify exact collections. For a Gospel selection, His Eye Is on the Sparrow is in the publisher’s First 50 Gospel Songs Easy Piano book.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-AMAZING-PREP, D-D-SILENT, CR-18, CR-14, CR-12, CR-13, D-D-GOSPEL。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-amazing-prep",
      "work_title": "Amazing Grace",
      "creator": "Traditional hymn; lyrics by John Newton (PDF credit)",
      "arranger": null,
      "edition": "Amazing Grace — Preparatory Level, ©2017 Hoffman Academy",
      "level": "Preparatory Level (PDF heading)",
      "format": "grand staff with note letters and hand-placement finger numbers",
      "publisher": "Hoffman Academy",
      "key": "C major",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://cdn.hoffmanacademy.com/blog/wp-content/uploads/2021/07/Amazing-Grace-Prep.pdf",
      "access": "publicly accessible provider PDF; no site redistribution",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-AMAZING-PREP"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "time_signature": "3/4",
      "page_count": 1,
      "fingering_visually_checked": true,
      "notation_visually_checked": true,
      "notation_check": "First page inspected: letter names adjacent to staff notes; RH 1 on C4 and LH 3 on G3 explicitly printed; diagram includes other starting fingers. No sequence inferred.",
      "preview": {
        "mode": "provider_page",
        "url": "https://cdn.hoffmanacademy.com/blog/wp-content/uploads/2021/07/Amazing-Grace-Prep.pdf",
        "local_asset": null
      }
    },
    {
      "id": "d-silent",
      "work_title": "Silent Night",
      "creator": "Franz Xaver Gruber",
      "arranger": null,
      "edition": "Silent Night — Early Elementary",
      "level": "Early Elementary",
      "format": "staff notation with finger guides (publisher description)",
      "publisher": "Hoffman Academy",
      "key": "F major",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/silent-night-early-elementary-version",
      "access": "free provider PDF after name/email form or account",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-SILENT"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "time_signature": "3/4",
      "page_count": 1,
      "finger_guides_publisher_reported": true,
      "fingering_visually_checked": false,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/silent-night-early-elementary-version",
        "local_asset": null
      }
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
      "edition_features": "Two-page PDF; purchased single-user or teacher-studio license does not permit website redistribution.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/gymnopedie-no-1",
        "local_asset": null
      }
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
      "arranger": "Logan Evan Thomas",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/360950/hip-hop-for-piano-solo",
        "local_asset": null
      }
    },
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
      "edition_features": "Right-hand letter-labelled melody and left-hand chord diagrams.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/294871/worship-super-easy-songbook",
        "local_asset": null
      }
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
      "edition_features": "Publisher list confirms these titles.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/194659/hymns-super-easy-songbook",
        "local_asset": null
      }
    },
    {
      "id": "d-gospel",
      "work_title": "His Eye Is on the Sparrow",
      "creator": null,
      "arranger": null,
      "edition": "First 50 Gospel Songs You Should Play on Piano, HL 00282526",
      "level": "Easy Piano",
      "format": "piano arrangement collection",
      "publisher": "Hal Leonard",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/282526/first-50-gospel-songs-you-should-play-on-piano",
      "access": "paid printed collection; streaming digital book is not printable",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-GOSPEL"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "genre": "Gospel (publisher collection classification)",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/282526/first-50-gospel-songs-you-should-play-on-piano",
        "local_asset": null
      }
    }
  ],
  "sections": [
    "free",
    "easy",
    "intermediate",
    "worship",
    "hymns",
    "gospel"
  ],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "CollectionPage",
    "name": "Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P047 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P048 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P060 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P063 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P070 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-sheet-music-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-AMAZING-PREP, D-D-SILENT, CR-18, CR-14, CR-12, CR-13, D-D-GOSPEL

## /sheet-music/easy

[已核实] 目标关键词：`easy piano sheet music`；模板 T17；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose an easy score for an adult or child learner.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Easy Piano Sheet Music**

Choose an easy score for an adult or child learner.

#### Children and first lessons

Hot Cross Buns provides a first-lesson package and parent guide; the annotated Amazing Grace PDF offers a later reading task with fingers and letters.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-04, D-D-AMAZING-PREP, CE-10。 

#### Adult learners

The adult-course Greatest Hits selections have an explicit method context. Compare them with your current lesson rather than assuming children’s repertoire is the only beginner option.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-04, D-D-AMAZING-PREP, CE-10。 

### 结构化数据

```json
{
  "resources": [
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
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/learning-and-teaching-resources/materials-for-lesson-1",
        "local_asset": null
      }
    },
    {
      "id": "d-amazing-prep",
      "work_title": "Amazing Grace",
      "creator": "Traditional hymn; lyrics by John Newton (PDF credit)",
      "arranger": null,
      "edition": "Amazing Grace — Preparatory Level, ©2017 Hoffman Academy",
      "level": "Preparatory Level (PDF heading)",
      "format": "grand staff with note letters and hand-placement finger numbers",
      "publisher": "Hoffman Academy",
      "key": "C major",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://cdn.hoffmanacademy.com/blog/wp-content/uploads/2021/07/Amazing-Grace-Prep.pdf",
      "access": "publicly accessible provider PDF; no site redistribution",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-AMAZING-PREP"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "time_signature": "3/4",
      "page_count": 1,
      "fingering_visually_checked": true,
      "notation_visually_checked": true,
      "notation_check": "First page inspected: letter names adjacent to staff notes; RH 1 on C4 and LH 3 on G3 explicitly printed; diagram includes other starting fingers. No sequence inferred.",
      "preview": {
        "mode": "provider_page",
        "url": "https://cdn.hoffmanacademy.com/blog/wp-content/uploads/2021/07/Amazing-Grace-Prep.pdf",
        "local_asset": null
      }
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
      ],
      "preview": {
        "mode": "provider_page",
        "url": "https://www.alfred.com/products/alfred-s-basic-adult-piano-course-greatest-hits-book-1-00-16505",
        "local_asset": null
      }
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
      ],
      "preview": {
        "mode": "provider_page",
        "url": "https://www.alfred.com/products/alfred-s-basic-adult-piano-course-greatest-hits-book-1-00-16505",
        "local_asset": null
      }
    }
  ],
  "sections": [
    "children",
    "adults"
  ],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "CollectionPage",
    "name": "Easy Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P044 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P110 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P111 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-easy-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CE-04, D-D-AMAZING-PREP, CE-10

## /sheet-music/beginner

[已核实] 目标关键词：`beginner piano sheet music`；模板 T17；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Find a first score with known reading and finger-guide support.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Beginner Piano Sheet Music**

Find a first score with known reading and finger-guide support.

#### Finger-number resource

The inspected Amazing Grace Preparatory PDF prints starting finger numbers and a hand-placement diagram. That is verified on this resource itself.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-AMAZING-PREP, CE-04, D-D-SILENT。 

#### Before playing

Locate the notes on the keyboard, follow the matching clefs and count the written rhythm. Finger numbers guide this edition; they are not a general rule for every song.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-AMAZING-PREP, CE-04, D-D-SILENT。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-amazing-prep",
      "work_title": "Amazing Grace",
      "creator": "Traditional hymn; lyrics by John Newton (PDF credit)",
      "arranger": null,
      "edition": "Amazing Grace — Preparatory Level, ©2017 Hoffman Academy",
      "level": "Preparatory Level (PDF heading)",
      "format": "grand staff with note letters and hand-placement finger numbers",
      "publisher": "Hoffman Academy",
      "key": "C major",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://cdn.hoffmanacademy.com/blog/wp-content/uploads/2021/07/Amazing-Grace-Prep.pdf",
      "access": "publicly accessible provider PDF; no site redistribution",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-AMAZING-PREP"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "time_signature": "3/4",
      "page_count": 1,
      "fingering_visually_checked": true,
      "notation_visually_checked": true,
      "notation_check": "First page inspected: letter names adjacent to staff notes; RH 1 on C4 and LH 3 on G3 explicitly printed; diagram includes other starting fingers. No sequence inferred.",
      "preview": {
        "mode": "provider_page",
        "url": "https://cdn.hoffmanacademy.com/blog/wp-content/uploads/2021/07/Amazing-Grace-Prep.pdf",
        "local_asset": null
      }
    },
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
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/learning-and-teaching-resources/materials-for-lesson-1",
        "local_asset": null
      }
    },
    {
      "id": "d-silent",
      "work_title": "Silent Night",
      "creator": "Franz Xaver Gruber",
      "arranger": null,
      "edition": "Silent Night — Early Elementary",
      "level": "Early Elementary",
      "format": "staff notation with finger guides (publisher description)",
      "publisher": "Hoffman Academy",
      "key": "F major",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/silent-night-early-elementary-version",
      "access": "free provider PDF after name/email form or account",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-SILENT"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "time_signature": "3/4",
      "page_count": 1,
      "finger_guides_publisher_reported": true,
      "fingering_visually_checked": false,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/silent-night-early-elementary-version",
        "local_asset": null
      }
    }
  ],
  "sections": [
    "verified-finger-guides",
    "first-lessons"
  ],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "CollectionPage",
    "name": "Beginner Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P045 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P106 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-beginner-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-AMAZING-PREP, CE-04, D-D-SILENT

## /sheet-music/christmas

[已核实] 目标关键词：`christmas songs piano score`；模板 T17；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Compare seasonal piano scores by edition and level.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Christmas Piano Sheet Music**

Compare seasonal piano scores by edition and level.

#### A beginner route

Choose Jingle Bells in C major or Silent Night in F major, both in their named early-elementary editions.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-06, CE-09, D-D-SILENT, D-D-CAROL, CR-02。 

#### A later option

Carol of the Bells is a separate elementary arrangement in A minor. Its paid access differs from the free Silent Night resource.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-06, CE-09, D-D-SILENT, D-D-CAROL, CR-02。 

### 结构化数据

```json
{
  "resources": [
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
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/jingle-bells-early-elementary",
        "local_asset": null
      }
    },
    {
      "id": "d-silent",
      "work_title": "Silent Night",
      "creator": "Franz Xaver Gruber",
      "arranger": null,
      "edition": "Silent Night — Early Elementary",
      "level": "Early Elementary",
      "format": "staff notation with finger guides (publisher description)",
      "publisher": "Hoffman Academy",
      "key": "F major",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/silent-night-early-elementary-version",
      "access": "free provider PDF after name/email form or account",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-SILENT"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "time_signature": "3/4",
      "page_count": 1,
      "finger_guides_publisher_reported": true,
      "fingering_visually_checked": false,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/silent-night-early-elementary-version",
        "local_asset": null
      }
    },
    {
      "id": "d-carol",
      "work_title": "Carol of the Bells",
      "creator": "Mykola Leyontovych (publisher spelling)",
      "arranger": "Aron Bernstein",
      "edition": "Carol of the Bells — Elementary, Aron Bernstein",
      "level": "Elementary",
      "format": "staff notation",
      "publisher": "Hoffman Academy",
      "key": "A minor",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/carol-of-the-bells",
      "access": "paid provider PDF or Premium membership",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-CAROL"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "tempo_marking": "Allegretto",
      "page_count": 2,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/carol-of-the-bells",
        "local_asset": null
      }
    },
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
      "edition_features": "Background notes, lyrics and performance tips.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/1473664/christmas-hits-really-easy-piano",
        "local_asset": null
      }
    }
  ],
  "sections": [
    "early-elementary",
    "elementary",
    "published-collection"
  ],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "CollectionPage",
    "name": "Christmas Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P046 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P065 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-christmas-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CE-06, CE-09, D-D-SILENT, D-D-CAROL, CR-02

## /sheet-music/letter-notes

[已核实] 目标关键词：`songs with letters piano`；模板 T17；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Find letter-text tutorials and understand what their letters omit.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Piano Songs with Letter Notes**

Find letter-text tutorials and understand what their letters omit.

#### Start with a familiar melody

Twinkle and Jingle Bells have separate letter-name tutorial pages. Follow the matching video for timing and register; plain letters alone do not fully specify rhythm and octave.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-TWINKLELETTERS, D-D-JINGLELETTERS, D-D-ALLMELETTERS, D-D-PINKLETTERS。 

#### Popular-song route

All of Me and The Pink Panther provide additional letter-text references. These are external tutorials with unresolved reuse permission. Staff notation with note names is available in the Annotated directory.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-TWINKLELETTERS, D-D-JINGLELETTERS, D-D-ALLMELETTERS, D-D-PINKLETTERS。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-twinkleletters",
      "work_title": "Twinkle, Twinkle, Little Star",
      "creator": null,
      "arranger": null,
      "edition": "Piano Keyboard Guide — Twinkle, Twinkle, Little Star tutorial",
      "level": "Easy (tutorial author label)",
      "format": "letter-name text plus matching keyboard video",
      "publisher": "Piano Keyboard Guide",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.piano-keyboard-guide.com/how-to-play-twinkle-twinkle-little-star-easy-piano-tutorial/",
      "access": "free external tutorial page",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-TWINKLELETTERS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "octave_and_rhythm": "Use the paired video; the letter-text format is not a full rhythmic staff score.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.piano-keyboard-guide.com/how-to-play-twinkle-twinkle-little-star-easy-piano-tutorial/",
        "local_asset": null
      }
    },
    {
      "id": "d-jingleletters",
      "work_title": "Jingle Bells",
      "creator": null,
      "arranger": null,
      "edition": "Piano Keyboard Guide — Jingle Bells tutorial",
      "level": "Easy (tutorial author label)",
      "format": "letter-name text plus matching keyboard video",
      "publisher": "Piano Keyboard Guide",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.piano-keyboard-guide.com/how-to-play-jingle-bells-easy-piano-keyboard-tutorial-for-beginners/",
      "access": "free external tutorial page",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-JINGLELETTERS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "octave_and_rhythm": "Use the paired video; the letter-text format is not a full rhythmic staff score.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.piano-keyboard-guide.com/how-to-play-jingle-bells-easy-piano-keyboard-tutorial-for-beginners/",
        "local_asset": null
      }
    },
    {
      "id": "d-allmeletters",
      "work_title": "All of Me",
      "creator": null,
      "arranger": null,
      "edition": "Piano Keyboard Guide — All of Me tutorial",
      "level": "Easy (tutorial author label)",
      "format": "letter-name text plus matching keyboard video",
      "publisher": "Piano Keyboard Guide",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.piano-keyboard-guide.com/how-to-play-all-of-me-by-john-legend-easy-piano-tutorial/",
      "access": "free external tutorial page",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-ALLMELETTERS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "octave_and_rhythm": "Use the paired video; the letter-text format is not a full rhythmic staff score.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.piano-keyboard-guide.com/how-to-play-all-of-me-by-john-legend-easy-piano-tutorial/",
        "local_asset": null
      }
    },
    {
      "id": "d-pinkletters",
      "work_title": "The Pink Panther",
      "creator": null,
      "arranger": null,
      "edition": "Piano Keyboard Guide — The Pink Panther tutorial",
      "level": "Easy (tutorial author label)",
      "format": "letter-name text plus matching keyboard video",
      "publisher": "Piano Keyboard Guide",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.piano-keyboard-guide.com/how-to-play-the-pink-panther-theme-song-easy-piano-tutorial-for-beginners/",
      "access": "free external tutorial page",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-PINKLETTERS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "octave_and_rhythm": "Use the paired video; the letter-text format is not a full rhythmic staff score.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.piano-keyboard-guide.com/how-to-play-the-pink-panther-theme-song-easy-piano-tutorial-for-beginners/",
        "local_asset": null
      }
    }
  ],
  "sections": [
    "easy",
    "popular",
    "letter-text"
  ],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "CollectionPage",
    "name": "Piano Songs with Letter Notes",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P050 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P051 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P097 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-letter-notes-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-TWINKLELETTERS, D-D-JINGLELETTERS, D-D-ALLMELETTERS, D-D-PINKLETTERS

## /sheet-music/annotated

[已核实] 目标关键词：`piano sheet music with letters`；模板 T17；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose staff notation that visibly includes pitch letters.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Piano Sheet Music with Letters**

Choose staff notation that visibly includes pitch letters.

#### Verified staff and letters

Amazing Grace Preparatory has letter names next to its notes and an explicit grand staff. The printed rhythm and clefs remain part of the reading task.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-AMAZING-PREP, CR-01, D-D-DISNEYLETTERS。 

#### Published pop options

The Pop Hits Super Easy edition places note names inside the melody notes and supplies chord diagrams. Compare this with pure letter text if you need rhythmic notation.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-AMAZING-PREP, CR-01, D-D-DISNEYLETTERS。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-amazing-prep",
      "work_title": "Amazing Grace",
      "creator": "Traditional hymn; lyrics by John Newton (PDF credit)",
      "arranger": null,
      "edition": "Amazing Grace — Preparatory Level, ©2017 Hoffman Academy",
      "level": "Preparatory Level (PDF heading)",
      "format": "grand staff with note letters and hand-placement finger numbers",
      "publisher": "Hoffman Academy",
      "key": "C major",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://cdn.hoffmanacademy.com/blog/wp-content/uploads/2021/07/Amazing-Grace-Prep.pdf",
      "access": "publicly accessible provider PDF; no site redistribution",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-AMAZING-PREP"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "time_signature": "3/4",
      "page_count": 1,
      "fingering_visually_checked": true,
      "notation_visually_checked": true,
      "notation_check": "First page inspected: letter names adjacent to staff notes; RH 1 on C4 and LH 3 on G3 explicitly printed; diagram includes other starting fingers. No sequence inferred.",
      "preview": {
        "mode": "provider_page",
        "url": "https://cdn.hoffmanacademy.com/blog/wp-content/uploads/2021/07/Amazing-Grace-Prep.pdf",
        "local_asset": null
      }
    },
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
      "edition_features": "Right-hand melody with note names, left-hand chord diagrams; digital book is streaming, not printable.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/1853036/pop-hits-super-easy-songbook",
        "local_asset": null
      }
    },
    {
      "id": "d-disneyletters",
      "work_title": "Can You Feel the Love Tonight",
      "creator": null,
      "arranger": null,
      "edition": "Disney — Super Easy Songbook, HL 00199558",
      "level": "Super Easy Songbook",
      "format": "staff notes with letter names and left-hand chord diagrams",
      "publisher": "Hal Leonard",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/199558/disney-super-easy-songbook",
      "access": "external paid resource; check chosen format and provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-DISNEYLETTERS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "notation_visually_checked": false,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/199558/disney-super-easy-songbook",
        "local_asset": null
      }
    }
  ],
  "sections": [
    "visually-inspected",
    "publisher-described"
  ],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "CollectionPage",
    "name": "Piano Sheet Music with Letters",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P054 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P061 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-annotated-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-AMAZING-PREP, CR-01, D-D-DISNEYLETTERS

## /sheet-music/lead-sheets

[已核实] 目标关键词：`piano chords songs`；模板 T17；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose melody-plus-chords or a chord-only accompaniment chart.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Piano Lead Sheets and Chord Charts**

Choose melody-plus-chords or a chord-only accompaniment chart.

#### Melody plus chords

Use the Happy Birthday lead sheet when you want written melody with harmony symbols. Its chosen key is F major.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-11, CR-25, CR-26, CR-27, CR-28。 

#### Chord-only resources

The Pianote charts show chord symbols with lyrics and use the matching tutorial for song timing. They do not include a fully notated melody. The Someone You Loved chart includes Dm, despite a four-chord summary in the article.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-11, CR-25, CR-26, CR-27, CR-28。 

### 结构化数据

```json
{
  "resources": [
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
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/happy-birthday-to-you",
        "local_asset": null
      }
    },
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
      "chord_inventory_basis": "[已核实] symbols present in linked provider PDF; transposed tutorial version only",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.pianote.com/blog/perfect-beginner-songs/",
        "local_asset": null
      }
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
      "chord_inventory_basis": "[已核实] symbols present in linked provider PDF; transposed tutorial version only",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.pianote.com/blog/perfect-beginner-songs/",
        "local_asset": null
      }
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
      "chord_inventory_basis": "[已核实] symbols present in linked provider PDF; transposed tutorial version only",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.pianote.com/blog/perfect-beginner-songs/",
        "local_asset": null
      }
    }
  ],
  "sections": [
    "melody-plus-chords",
    "chord-only"
  ],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "CollectionPage",
    "name": "Piano Lead Sheets and Chord Charts",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P062 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P071 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-lead-sheets-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CE-11, CR-25, CR-26, CR-27, CR-28

## /sheet-music/pop

[已核实] 目标关键词：`popular piano sheet music`；模板 T17；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Compare readable pop arrangements with specific acquisition routes.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Easy Popular Piano Sheet Music**

Compare readable pop arrangements with specific acquisition routes.

#### Letters and chord diagrams

Flowers and Easy On Me in the Super Easy collection provide annotated melody notes and left-hand diagrams.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-01, CR-19, D-D-ADELE。 

#### A fuller vocal score

All of Me has a separate vocal line and piano part. Choose it when the task is singing with accompaniment, and compare its sample before treating it as an easy solo.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-01, CR-19, D-D-ADELE。 

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
      "edition_features": "Right-hand melody with note names, left-hand chord diagrams; digital book is streaming, not printable.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/1853036/pop-hits-super-easy-songbook",
        "local_asset": null
      }
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
      "edition_features": "Right-hand melody with note names, left-hand chord diagrams; digital book is streaming, not printable.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/1853036/pop-hits-super-easy-songbook",
        "local_asset": null
      }
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
      "edition_features": "Piano and vocal melody with guitar chord frames.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/126844/all-of-me",
        "local_asset": null
      }
    },
    {
      "id": "d-adele",
      "work_title": "Someone Like You",
      "creator": null,
      "arranger": null,
      "edition": "Someone Like You — Easy Piano, HL 00110174",
      "level": "Easy Piano",
      "format": "piano arrangement",
      "publisher": "Hal Leonard",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/110174/someone-like-you",
      "access": "external paid resource; check chosen format and provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-ADELE"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "artist": "Adele",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/110174/someone-like-you",
        "local_asset": null
      }
    }
  ],
  "sections": [
    "easy",
    "annotated",
    "piano-vocal"
  ],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "CollectionPage",
    "name": "Easy Popular Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P076 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P112 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-pop-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CR-01, CR-19, D-D-ADELE

## /sheet-music/disney

[已核实] 目标关键词：`disney song piano sheet for beginners`；模板 T17；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose beginner staff notation, annotated notes or a letter-text tutorial.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Beginner Disney Piano Sheet Music**

Choose beginner staff notation, annotated notes or a letter-text tutorial.

#### Beginner arrangements

Let It Go and A Whole New World are verified entries in Really Easy Piano: 40 Disney Songs.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-08, D-D-DISNEYLETTERS, D-D-LOVELETTERS。 

#### Letters in two different formats

The Super Easy Disney resource uses staff notes with letters. The Can You Feel the Love Tonight tutorial uses letter text and a video. Choose the format that matches your reading goal.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-08, D-D-DISNEYLETTERS, D-D-LOVELETTERS。 

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
      "edition_features": "Beginner piano arrangements with background notes and tips.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/457282/really-easy-piano-40-disney-songs",
        "local_asset": null
      }
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
      "edition_features": "Beginner piano arrangements with background notes and tips.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/457282/really-easy-piano-40-disney-songs",
        "local_asset": null
      }
    },
    {
      "id": "d-disneyletters",
      "work_title": "Can You Feel the Love Tonight",
      "creator": null,
      "arranger": null,
      "edition": "Disney — Super Easy Songbook, HL 00199558",
      "level": "Super Easy Songbook",
      "format": "staff notes with letter names and left-hand chord diagrams",
      "publisher": "Hal Leonard",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/199558/disney-super-easy-songbook",
      "access": "external paid resource; check chosen format and provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-DISNEYLETTERS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "notation_visually_checked": false,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/199558/disney-super-easy-songbook",
        "local_asset": null
      }
    },
    {
      "id": "d-loveletters",
      "work_title": "Can You Feel the Love Tonight",
      "creator": null,
      "arranger": null,
      "edition": "Piano Keyboard Guide — Can You Feel the Love Tonight tutorial",
      "level": "Easy (tutorial author label)",
      "format": "letter-name text plus matching keyboard video",
      "publisher": "Piano Keyboard Guide",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.piano-keyboard-guide.com/elton-john-lion-king-can-you-feel-the-love-tonight-piano-notes-easy-tutorial/",
      "access": "free external tutorial page",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-LOVELETTERS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "octave_and_rhythm": "Use the paired video; the letter-text format is not a full rhythmic staff score.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.piano-keyboard-guide.com/elton-john-lion-king-can-you-feel-the-love-tonight-piano-notes-easy-tutorial/",
        "local_asset": null
      }
    }
  ],
  "sections": [
    "beginner-staff",
    "annotated-staff",
    "letter-text"
  ],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "CollectionPage",
    "name": "Beginner Disney Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P078 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P087 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-disney-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CR-08, D-D-DISNEYLETTERS, D-D-LOVELETTERS

## /sheet-music/classical

[已核实] 目标关键词：`classical piano sheet music`；模板 T17；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Compare beginner arrangements with later repertoire editions.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Classical Piano Sheet Music**

Compare beginner arrangements with later repertoire editions.

#### Beginner classical material

Ode to Joy is an early-elementary arrangement in D major. Allan Small’s Für Elise is a late-elementary simplification.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-05, D-D-FUR, CR-18, CR-17。 

#### Later repertoire

The selected Gymnopédie is late intermediate. An Easy Piano Clair de lune in the First 50 collection is a separate simplified version, not the original score.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-05, D-D-FUR, CR-18, CR-17。 

### 结构化数据

```json
{
  "resources": [
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
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/ode-to-joy",
        "local_asset": null
      }
    },
    {
      "id": "d-fur",
      "work_title": "Für Elise",
      "creator": "Ludwig van Beethoven",
      "arranger": "Allan Small",
      "edition": "Für Elise — Allan Small, Alfred 00-12889",
      "level": "Late Elementary",
      "format": "simplified masterwork piano solo",
      "publisher": "Alfred Music",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.alfred.com/products/fur-elise-00-12889",
      "access": "purchased printed sheet; separate digital edition available at publisher",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-FUR"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "page_count": 4,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.alfred.com/products/fur-elise-00-12889",
        "local_asset": null
      }
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
      "edition_features": "Two-page PDF; purchased single-user or teacher-studio license does not permit website redistribution.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/gymnopedie-no-1",
        "local_asset": null
      }
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
      "edition_features": "Simplified arrangements; some entries are themes or excerpts.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
        "local_asset": null
      }
    }
  ],
  "sections": [
    "early-elementary",
    "late-elementary",
    "late-intermediate"
  ],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "CollectionPage",
    "name": "Classical Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P105 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P107 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-classical-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CE-05, D-D-FUR, CR-18, CR-17

## /sheet-music/jazz

[已核实] 目标关键词：`easy jazz piano sheet music`；模板 T17；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Find written jazz-standard piano arrangements.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Easy Jazz Piano Sheet Music**

Find written jazz-standard piano arrangements.

#### Three actual standards

Autumn Leaves, Misty and Fly Me to the Moon are listed in the selected Easy Piano collection.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-15。 

#### Check the written texture

Use the actual sample to assess the rhythm and chord reading. These are written arrangements; a transcription of an improvised solo is a different kind of resource.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-15。 

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
      "edition_features": "Written piano arrangements with lyrics; no claim of improvised-solo transcription.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/196269/first-50-jazz-standards-you-should-play-on-piano",
        "local_asset": null
      }
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
      "edition_features": "Written piano arrangements with lyrics; no claim of improvised-solo transcription.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/196269/first-50-jazz-standards-you-should-play-on-piano",
        "local_asset": null
      }
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
      "edition_features": "Written piano arrangements with lyrics; no claim of improvised-solo transcription.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/196269/first-50-jazz-standards-you-should-play-on-piano",
        "local_asset": null
      }
    }
  ],
  "sections": [
    "easy-piano-standards"
  ],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "CollectionPage",
    "name": "Easy Jazz Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P108 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-jazz-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CR-15

## /sheet-music/jingle-bells

[已核实] 目标关键词：`jingle bells song sheet for piano`；模板 T18；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Compare an early-elementary staff version with a separate letter-note tutorial.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Jingle Bells Piano Sheet Music**

Compare an early-elementary staff version with a separate letter-note tutorial.

#### Choose this version

The Hoffman edition is in C major and has a matching lesson. The letter-text tutorial is a different arrangement; follow its own video for timing and octave.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-06, CE-09, D-D-JINGLELETTERS。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-06, CE-09, D-D-JINGLELETTERS。 

### 结构化数据

```json
{
  "resources": [
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
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/jingle-bells-early-elementary",
        "local_asset": null
      }
    },
    {
      "id": "d-jingleletters",
      "work_title": "Jingle Bells",
      "creator": null,
      "arranger": null,
      "edition": "Piano Keyboard Guide — Jingle Bells tutorial",
      "level": "Easy (tutorial author label)",
      "format": "letter-name text plus matching keyboard video",
      "publisher": "Piano Keyboard Guide",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.piano-keyboard-guide.com/how-to-play-jingle-bells-easy-piano-keyboard-tutorial-for-beginners/",
      "access": "free external tutorial page",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-JINGLELETTERS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "octave_and_rhythm": "Use the paired video; the letter-text format is not a full rhythmic staff score.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.piano-keyboard-guide.com/how-to-play-jingle-bells-easy-piano-keyboard-tutorial-for-beginners/",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Jingle Bells Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P049 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P053 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P074 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-jingle-bells-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CE-06, CE-09, D-D-JINGLELETTERS

## /sheet-music/amazing-grace

[已核实] 目标关键词：`amazing grace song sheet for piano`；模板 T18；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose between the current early-elementary resource and the labelled preparatory PDF.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Amazing Grace Piano Sheet Music**

Choose between the current early-elementary resource and the labelled preparatory PDF.

#### Choose this version

The preparatory PDF has grand-staff notation, adjacent letter names and explicit starting finger numbers. Keep its 2017 edition identity; do not assume every current arrangement is identical.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-AMAZING, D-D-AMAZING-PREP。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-AMAZING, D-D-AMAZING-PREP。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-amazing",
      "work_title": "Amazing Grace",
      "creator": null,
      "arranger": null,
      "edition": "Amazing Grace — Early Elementary",
      "level": "Early Elementary",
      "format": "piano staff notation",
      "publisher": "Hoffman Academy",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/amazing-grace-early-elementary-level",
      "access": "free provider resource; follow download conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-AMAZING"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/amazing-grace-early-elementary-level",
        "local_asset": null
      }
    },
    {
      "id": "d-amazing-prep",
      "work_title": "Amazing Grace",
      "creator": "Traditional hymn; lyrics by John Newton (PDF credit)",
      "arranger": null,
      "edition": "Amazing Grace — Preparatory Level, ©2017 Hoffman Academy",
      "level": "Preparatory Level (PDF heading)",
      "format": "grand staff with note letters and hand-placement finger numbers",
      "publisher": "Hoffman Academy",
      "key": "C major",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://cdn.hoffmanacademy.com/blog/wp-content/uploads/2021/07/Amazing-Grace-Prep.pdf",
      "access": "publicly accessible provider PDF; no site redistribution",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-AMAZING-PREP"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "time_signature": "3/4",
      "page_count": 1,
      "fingering_visually_checked": true,
      "notation_visually_checked": true,
      "notation_check": "First page inspected: letter names adjacent to staff notes; RH 1 on C4 and LH 3 on G3 explicitly printed; diagram includes other starting fingers. No sequence inferred.",
      "preview": {
        "mode": "provider_page",
        "url": "https://cdn.hoffmanacademy.com/blog/wp-content/uploads/2021/07/Amazing-Grace-Prep.pdf",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Amazing Grace Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P057 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-amazing-grace-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-AMAZING, D-D-AMAZING-PREP

## /sheet-music/fur-elise

[已核实] 目标关键词：`fur elise piano sheet music easy`；模板 T18；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Find an easy arrangement rather than accidentally selecting the complete original.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Für Elise Piano Sheet Music**

Find an easy arrangement rather than accidentally selecting the complete original.

#### Choose this version

Allan Small’s four-page Alfred edition is Late Elementary and explicitly simplified. The First 50 collection is another Easy Piano arrangement; neither card claims to present Beethoven’s complete original text.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-FUR, CR-17。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-FUR, CR-17。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-fur",
      "work_title": "Für Elise",
      "creator": "Ludwig van Beethoven",
      "arranger": "Allan Small",
      "edition": "Für Elise — Allan Small, Alfred 00-12889",
      "level": "Late Elementary",
      "format": "simplified masterwork piano solo",
      "publisher": "Alfred Music",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.alfred.com/products/fur-elise-00-12889",
      "access": "purchased printed sheet; separate digital edition available at publisher",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-FUR"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "page_count": 4,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.alfred.com/products/fur-elise-00-12889",
        "local_asset": null
      }
    },
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
      "edition_features": "Simplified arrangements; some entries are themes or excerpts.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/131436/first-50-classical-pieces-you-should-play-on-the-piano",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Für Elise Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P066 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-fur-elise-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-FUR, CR-17

## /sheet-music/happy-birthday

[已核实] 目标关键词：`happy birthday sheet music piano easy`；模板 T18；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a beginner solo, a melody-and-chord resource, or a letter-note tutorial.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Happy Birthday Piano Sheet Music**

Choose a beginner solo, a melody-and-chord resource, or a letter-note tutorial.

#### Choose this version

The early-elementary solo and the F-major lead sheet have different playing tasks. Use the lead sheet for deciding your own accompaniment; use the matching staff score or tutorial for a defined learning path.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-07, CE-11, D-D-BIRTHDAYLETTERS。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-07, CE-11, D-D-BIRTHDAYLETTERS。 

### 结构化数据

```json
{
  "resources": [
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
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/happy-birthday-early-elementary-version",
        "local_asset": null
      }
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
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/happy-birthday-to-you",
        "local_asset": null
      }
    },
    {
      "id": "d-birthdayletters",
      "work_title": "Happy Birthday to You",
      "creator": null,
      "arranger": null,
      "edition": "Piano Keyboard Guide — Happy Birthday to You tutorial",
      "level": "Easy (tutorial author label)",
      "format": "letter-name text plus matching keyboard video",
      "publisher": "Piano Keyboard Guide",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.piano-keyboard-guide.com/how-to-play-happy-birthday-to-you-easy-piano-tutorial-for-beginners/amp/",
      "access": "free external tutorial page",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-BIRTHDAYLETTERS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "octave_and_rhythm": "Use the paired video; the letter-text format is not a full rhythmic staff score.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.piano-keyboard-guide.com/how-to-play-happy-birthday-to-you-easy-piano-tutorial-for-beginners/amp/",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Happy Birthday Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P073 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P083 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-happy-birthday-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CE-07, CE-11, D-D-BIRTHDAYLETTERS

## /sheet-music/hot-cross-buns

[已核实] 目标关键词：`hot cross buns piano keys`；模板 T18；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Start with the first-lesson materials and parent guide.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Hot Cross Buns Piano Sheet Music**

Start with the first-lesson materials and parent guide.

#### Choose this version

Open the Lesson 1 package and follow the paired instruction. Its resource format and teaching context are verified; no universal fingering is assigned here.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-04。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-04。 

### 结构化数据

```json
{
  "resources": [
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
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/learning-and-teaching-resources/materials-for-lesson-1",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Hot Cross Buns Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P091 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-hot-cross-buns-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CE-04

## /sheet-music/jesus-loves-me

[已核实] 目标关键词：`jesus loves me piano keys`；模板 T18；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Find the free early-elementary hymn arrangement and its hand-placement graphic.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Jesus Loves Me Piano Sheet Music**

Find the free early-elementary hymn arrangement and its hand-placement graphic.

#### Choose this version

This Aron Bernstein arrangement is in C major, 4/4, with a Moderato marking. The graphic belongs to this edition; the later-level version is a separate arrangement.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-JESUS。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-JESUS。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-jesus",
      "work_title": "Jesus Loves Me",
      "creator": "William Batchelder Bradbury / Anna Bartlett Warner (publisher credit)",
      "arranger": "Aron Bernstein",
      "edition": "Jesus Loves Me — Early Elementary, Aron Bernstein",
      "level": "Early Elementary",
      "format": "staff notation with hand-placement graphic",
      "publisher": "Hoffman Academy",
      "key": "C major",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/jesus-loves-me-early-elementary-version",
      "access": "free provider PDF after name/email form or account",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-JESUS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "time_signature": "4/4",
      "tempo_marking": "Moderato",
      "page_count": 1,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/jesus-loves-me-early-elementary-version",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Jesus Loves Me Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P093 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-jesus-loves-me-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-JESUS

## /sheet-music/mary-had-a-little-lamb

[已核实] 目标关键词：`mary had a little lamb piano keys`；模板 T18；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Use the Joseph Hoffman Unit 3 version with its right- and left-hand lessons.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Mary Had a Little Lamb Piano Sheet Music**

Use the Joseph Hoffman Unit 3 version with its right- and left-hand lessons.

#### Choose this version

This one-page early-elementary arrangement is in C major and 2/4. The product is purchased or included with Premium; it is not labelled as a universally free download.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-MARY。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-MARY。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-mary",
      "work_title": "Mary Had a Little Lamb",
      "creator": "Anonymous (publisher credit)",
      "arranger": "Joseph Hoffman",
      "edition": "Mary Had a Little Lamb — Joseph Hoffman, Unit 3",
      "level": "Early Elementary",
      "format": "staff notation",
      "publisher": "Hoffman Academy",
      "key": "C major",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/mary-had-a-little-lamb",
      "access": "paid provider PDF or Premium membership",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-MARY"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "time_signature": "2/4",
      "page_count": 1,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/mary-had-a-little-lamb",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Mary Had a Little Lamb Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P102 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-mary-had-a-little-lamb-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-MARY

## /sheet-music/abc-song

[已核实] 目标关键词：`abc song piano sheet`；模板 T18；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose the labelled Alphabet Song resource and the one- or two-hand tutorial.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**ABC Song (The Alphabet Song) Piano Sheet Music**

Choose the labelled Alphabet Song resource and the one- or two-hand tutorial.

#### Choose this version

Singing Bell provides separate melody/chord and two-hand piano resources. The shared melody with Twinkle does not make their text setting and arrangement files interchangeable.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-ABC。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-ABC。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-abc",
      "work_title": "ABC Song (The Alphabet Song)",
      "creator": null,
      "arranger": null,
      "edition": "Singing Bell — ABC Song, two-hand piano PDF",
      "level": "beginner to intermediate (provider wording)",
      "format": "two-hand piano staff notation; separate melody/chords version on page",
      "publisher": "Singing Bell",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.singing-bell.com/abc-song-piano-tutorial-notes-keys-chords-sheet-music/",
      "access": "free external PDFs and tutorials",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-ABC"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "same_melody_note": "Provider relates the melody to Ah! vous dirai-je, Maman / Twinkle; this is a separately labelled ABC resource.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.singing-bell.com/abc-song-piano-tutorial-notes-keys-chords-sheet-music/",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "ABC Song (The Alphabet Song) Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P104 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-abc-song-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-ABC

## /sheet-music/ode-to-joy

[已核实] 目标关键词：`ode to joy easy piano sheet music`；模板 T18；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose the early-elementary Joseph Hoffman arrangement.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Ode to Joy Piano Sheet Music**

Choose the early-elementary Joseph Hoffman arrangement.

#### Choose this version

The selected edition is in D major. Use its resource and lesson rather than assuming every beginner Ode to Joy arrangement is in C major.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-05。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-05。 

### 结构化数据

```json
{
  "resources": [
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
      "evidence_status": "[已核实] 除编辑建议与空值外的版本元数据来自本条出版方",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/ode-to-joy",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Ode to Joy Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P114 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-ode-to-joy-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CE-05

## /sheet-music/silent-night

[已核实] 目标关键词：`silent night beginner piano sheet music`；模板 T18；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Find a free early-elementary score with provider-supplied finger guides.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Silent Night Piano Sheet Music**

Find a free early-elementary score with provider-supplied finger guides.

#### Choose this version

This edition is in F major and 3/4. The publisher offers other levels on the same page; keep the Early Elementary version when using this card.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-SILENT。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-SILENT。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-silent",
      "work_title": "Silent Night",
      "creator": "Franz Xaver Gruber",
      "arranger": null,
      "edition": "Silent Night — Early Elementary",
      "level": "Early Elementary",
      "format": "staff notation with finger guides (publisher description)",
      "publisher": "Hoffman Academy",
      "key": "F major",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/silent-night-early-elementary-version",
      "access": "free provider PDF after name/email form or account",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-SILENT"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "time_signature": "3/4",
      "page_count": 1,
      "finger_guides_publisher_reported": true,
      "fingering_visually_checked": false,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/silent-night-early-elementary-version",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Silent Night Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P115 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-silent-night-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-SILENT

## /sheet-music/twinkle-twinkle-little-star

[已核实] 目标关键词：`twinkle twinkle little star piano sheet music`；模板 T18；基线优先级：后做。
状态：`content_and_data_prepared_with_issues`；发布状态：未验收。

任务：Choose a staff-and-hand-guide lesson or a letter-text tutorial.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Twinkle, Twinkle, Little Star Piano Sheet Music**

Choose a staff-and-hand-guide lesson or a letter-text tutorial.

#### Choose this version

The early-elementary Hoffman version is in C major and includes a hand-placement graphic. The separate letter tutorial should be followed with its own demonstration.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-02, CE-08, D-D-TWINKLELETTERS。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-02, CE-08, D-D-TWINKLELETTERS。 

### 结构化数据

```json
{
  "resources": [
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
      "prerequisite_evidence_status": "[已核实] 对应教程说明换手与五度跳进；建议先检查为编辑选择",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/twinkle-twinkle-little-star-early-elementary-version",
        "local_asset": null
      }
    },
    {
      "id": "d-twinkleletters",
      "work_title": "Twinkle, Twinkle, Little Star",
      "creator": null,
      "arranger": null,
      "edition": "Piano Keyboard Guide — Twinkle, Twinkle, Little Star tutorial",
      "level": "Easy (tutorial author label)",
      "format": "letter-name text plus matching keyboard video",
      "publisher": "Piano Keyboard Guide",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.piano-keyboard-guide.com/how-to-play-twinkle-twinkle-little-star-easy-piano-tutorial/",
      "access": "free external tutorial page",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-TWINKLELETTERS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "octave_and_rhythm": "Use the paired video; the letter-text format is not a full rhythmic staff score.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.piano-keyboard-guide.com/how-to-play-twinkle-twinkle-little-star-easy-piano-tutorial/",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Twinkle, Twinkle, Little Star Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P116 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-twinkle-twinkle-little-star-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CE-02, CE-08, D-D-TWINKLELETTERS

## /sheet-music/let-it-go

[已核实] 目标关键词：`frozen let it go piano sheet music easy free pdf`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Identify a real beginner arrangement of the Frozen song.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Let It Go Piano Sheet Music**

Identify a real beginner arrangement of the Frozen song.

#### Choose this version

The named Really Easy Piano Disney collection includes this song. A free, reusable easy PDF has not been established; the known collection is a purchased publisher resource.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-08。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-08。 

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
      "edition_features": "Beginner piano arrangements with background notes and tips.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/457282/really-easy-piano-40-disney-songs",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Let It Go Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P052 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P081 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-let-it-go-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。
- D-let-it-go-free — free PDF / letter-note intent：已核正规付费版本；未确认免费PDF和纯字母谱版本，不能声称已满足这些限定。；解决：取得明确可免费使用的准确版本及目标记谱形式，保留原暂停状态。

来源：CR-08

## /sheet-music/super-mario-theme

[已核实] 目标关键词：`super mario theme piano sheet music easy free pdf`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Identify which Mario theme and which Easy Piano edition you need.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Super Mario Theme Piano Sheet Music**

Identify which Mario theme and which Easy Piano edition you need.

#### Choose this version

This selection targets the Super Mario Bros. ground theme in Alfred’s licensed collection. Super Mario 64 Main Theme is a different track. The collection purchase is not a verified free PDF.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-MARIO。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-MARIO。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-mario",
      "work_title": "Super Mario Bros. — Ground Background Music",
      "creator": "Koji Kondo",
      "arranger": null,
      "edition": "Super Mario Series for Easy Piano, Alfred 00-38633",
      "level": "Easy Piano",
      "format": "piano collection",
      "publisher": "Alfred Music",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.alfred.com/products/super-mariotm-series-for-easy-piano-00-38633",
      "access": "purchased officially licensed publisher collection",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-MARIO"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "work_disambiguation": "Selected: Super Mario Bros. ground/background theme; not Super Mario 64 Main Theme.",
      "licensed_claim": "Publisher explicitly identifies the collection as officially licensed; no Piano Reference reuse permission.",
      "page_count": 76,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.alfred.com/products/super-mariotm-series-for-easy-piano-00-38633",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Super Mario Theme Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P055 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P084 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-super-mario-theme-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。
- D-super-mario-theme-free — free PDF / letter-note intent：已核正规付费版本；未确认免费PDF和纯字母谱版本，不能声称已满足这些限定。；解决：取得明确可免费使用的准确版本及目标记谱形式，保留原暂停状态。

来源：D-D-MARIO

## /sheet-music/thats-amore

[已核实] 目标关键词：`what are the piano keys to thats amore`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Locate the Dean Martin song in a Piano/Vocal/Guitar edition.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**That’s Amore Piano Sheet Music**

Locate the Dean Martin song in a Piano/Vocal/Guitar edition.

#### Choose this version

The card points to the Dean Martin Songbook and its That’s Amore entry. A keys-only transcription is not supplied; use the actual piano part in the selected edition.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-THATS。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-THATS。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-thats",
      "work_title": "That’s Amore (That’s Love)",
      "creator": null,
      "arranger": null,
      "edition": "Dean Martin Songbook, HL 00306606",
      "level": null,
      "format": "Piano/Vocal/Guitar collection",
      "publisher": "Hal Leonard",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/306606/dean-martin-songbook",
      "access": "external paid resource; check chosen format and provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-THATS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "artist": "Dean Martin",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/306606/dean-martin-songbook",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "That’s Amore Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P056 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-thats-amore-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-THATS

## /sheet-music/black-parade

[已核实] 目标关键词：`black parade keys piano`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Choose the specific Trish Boril piano-solo arrangement.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Welcome to the Black Parade Piano Sheet Music**

Choose the specific Trish Boril piano-solo arrangement.

#### Choose this version

This seven-page early-intermediate version was arranged as a minimalist wedding processional. The arranger describes a move from C to A; it should not be treated as the album piano transcription.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-BLACK。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-BLACK。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-black",
      "work_title": "Welcome to the Black Parade",
      "creator": [
        "Bob Bryar",
        "Frank Iero",
        "Gerard Way",
        "Mikey Way",
        "Ray Toro"
      ],
      "arranger": "Trish Boril",
      "edition": "Trish Boril, A0.1299157 / #889010",
      "level": "Early Intermediate",
      "format": "piano solo score",
      "publisher": "Trish Boril via Sheet Music Plus / ArrangeMe",
      "key": "C major, then A major (arranger description)",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.sheetmusicplus.com/en/product/welcome-to-the-black-parade-22592862.html",
      "access": "paid digital score",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-BLACK"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "artist": "My Chemical Romance",
      "page_count": 7,
      "version_note": "Minimalist wedding-processional arrangement; not the album piano part.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.sheetmusicplus.com/en/product/welcome-to-the-black-parade-22592862.html",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Welcome to the Black Parade Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P058 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-black-parade-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-BLACK

## /sheet-music/clocks

[已核实] 目标关键词：`clocks piano keys`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Find Clocks in the confirmed Coldplay Easy Piano second edition.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Clocks Piano Sheet Music**

Find Clocks in the confirmed Coldplay Easy Piano second edition.

#### Choose this version

The arrangement is included in this collection. The original recording’s keyboard part and a simplified score are different versions; key, tempo and fingering are not transferred between them.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-10。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-10。 

### 结构化数据

```json
{
  "resources": [
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
      "edition_features": "16-song second edition; not every Coldplay song is included.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/306560/the-best-of-coldplay-for-easy-piano-second-edition",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Clocks Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P059 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-clocks-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CR-10

## /sheet-music/from-the-start

[已核实] 目标关键词：`from the start piano sheet music`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Find the Laufey Piano/Vocal/Guitar edition rather than a choir or jazz-ensemble score.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**From the Start Piano Sheet Music**

Find the Laufey Piano/Vocal/Guitar edition rather than a choir or jazz-ensemble score.

#### Choose this version

Hal Leonard lists the vocal/piano/guitar product as HL 1000742930. Its catalogue also lists choral and ensemble versions. The direct score destination still needs an access check.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-FROM。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-FROM。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-from",
      "work_title": "From the Start",
      "creator": null,
      "arranger": null,
      "edition": "From the Start — Piano/Vocal/Guitar, HL 1000742930",
      "level": null,
      "format": "Piano/Vocal/Guitar",
      "publisher": "Hal Leonard",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/search/artist/390383/laufey?promotion=1520",
      "access": "publisher lists a Sheet Music Direct purchase link; destination access unresolved",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-FROM"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "artist": "Laufey",
      "direct_score_url": "https://www.sheetmusicdirect.com/en-US/se/ID_No/1608704/Product.aspx",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/search/artist/390383/laufey?promotion=1520",
        "local_asset": null
      },
      "destination_access_status": "blocked on direct fetch; exact link extracted from publisher catalogue"
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "From the Start Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P064 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-from-the-start-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。
- D-from-direct — direct score URL：出版社目录列出了准确P/V/G产品；跳转目标当前未能访问。；解决：上线前完成HL 1000742930所连Sheet Music Direct产品访问核验。

来源：D-D-FROM

## /sheet-music/song-of-storms

[已核实] 目标关键词：`song of storms piano sheet music`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Get the Ocarina of Time Easy Piano resource.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Song of Storms Piano Sheet Music**

Get the Ocarina of Time Easy Piano resource.

#### Choose this version

Use Alfred item 00-PS-0015399 for the named game and piece. The resource is a paid digital edition; no unverified note sequence is supplied here.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-STORMS。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-STORMS。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-storms",
      "work_title": "Song of Storms — Ocarina of Time",
      "creator": null,
      "arranger": null,
      "edition": "Song of Storms — Easy Piano, Alfred 00-PS-0015399",
      "level": "Easy Piano",
      "format": "piano staff notation",
      "publisher": "Alfred Music",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.alfred.com/products/the-legend-of-zeldatm-ocarina-of-timetm-song-of-storms-00-ps-0015399",
      "access": "paid publisher digital download",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-STORMS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "work_disambiguation": "The Legend of Zelda: Ocarina of Time",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.alfred.com/products/the-legend-of-zeldatm-ocarina-of-timetm-song-of-storms-00-ps-0015399",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Song of Storms Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P068 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-song-of-storms-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-STORMS

## /sheet-music/pink-panther

[已核实] 目标关键词：`pink panther theme song piano sheet`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Compare a named Easy Piano collection with a separate letter-text tutorial.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**The Pink Panther Piano Sheet Music**

Compare a named Easy Piano collection with a separate letter-text tutorial.

#### Choose this version

The Henry Mancini collection provides a publisher piano arrangement. The tutorial is an external reference with its own demonstration; its availability does not establish permission to copy its notes.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-PINK, D-D-PINKLETTERS。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-PINK, D-D-PINKLETTERS。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-pink",
      "work_title": "The Pink Panther",
      "creator": "Henry Mancini",
      "arranger": null,
      "edition": "The Henry Mancini Easy Piano Collection, HL 00316149",
      "level": "Easy Piano",
      "format": "piano arrangement collection",
      "publisher": "Hal Leonard",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/316149/the-henry-mancini-easy-piano-collection",
      "access": "external paid resource; check chosen format and provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-PINK"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/316149/the-henry-mancini-easy-piano-collection",
        "local_asset": null
      }
    },
    {
      "id": "d-pinkletters",
      "work_title": "The Pink Panther",
      "creator": null,
      "arranger": null,
      "edition": "Piano Keyboard Guide — The Pink Panther tutorial",
      "level": "Easy (tutorial author label)",
      "format": "letter-name text plus matching keyboard video",
      "publisher": "Piano Keyboard Guide",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.piano-keyboard-guide.com/how-to-play-the-pink-panther-theme-song-easy-piano-tutorial-for-beginners/",
      "access": "free external tutorial page",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-PINKLETTERS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "octave_and_rhythm": "Use the paired video; the letter-text format is not a full rhythmic staff score.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.piano-keyboard-guide.com/how-to-play-the-pink-panther-theme-song-easy-piano-tutorial-for-beginners/",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "The Pink Panther Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P072 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |
| P098 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-pink-panther-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-PINK, D-D-PINKLETTERS

## /sheet-music/still-dre

[已核实] 目标关键词：`piano keys for still dre`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Identify a two-page beginner piano arrangement before looking up the keys.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Still D.R.E. Piano Sheet Music**

Identify a two-page beginner piano arrangement before looking up the keys.

#### Choose this version

The selected score is arranged by Milanov and sold through ArrangeMe. Its Beginning level is assigned by the arranger, and its terms limit use to purchased copies.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-STILL。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-STILL。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-still",
      "work_title": "Still D.R.E.",
      "creator": [
        "Andre Romelle Young",
        "Melvin Bradford",
        "Scott Spencer",
        "Shawn Carter"
      ],
      "arranger": "Milanov",
      "edition": "Milanov, A0.1196217 / #795370",
      "level": "Beginning (arranger-assigned)",
      "format": "Easy Piano score",
      "publisher": "Milanov via Sheet Music Plus / ArrangeMe",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.sheetmusicplus.com/en/product/still-d-r-e-22464916.html",
      "access": "paid digital score; purchased copy count applies",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-STILL"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "artist": "Dr. Dre",
      "page_count": 2,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.sheetmusicplus.com/en/product/still-d-r-e-22464916.html",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Still D.R.E. Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P075 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-still-dre-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-STILL

## /sheet-music/carol-of-the-bells

[已核实] 目标关键词：`carol of the bells easy piano sheet music`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Find the elementary Aron Bernstein piano version.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Carol of the Bells Piano Sheet Music**

Find the elementary Aron Bernstein piano version.

#### Choose this version

This two-page arrangement is in A minor and marked Allegretto. It is a purchased PDF or part of the provider’s membership; the Advanced and Late Elementary versions are separate resources.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-CAROL。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-CAROL。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-carol",
      "work_title": "Carol of the Bells",
      "creator": "Mykola Leyontovych (publisher spelling)",
      "arranger": "Aron Bernstein",
      "edition": "Carol of the Bells — Elementary, Aron Bernstein",
      "level": "Elementary",
      "format": "staff notation",
      "publisher": "Hoffman Academy",
      "key": "A minor",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.hoffmanacademy.com/store/sheet-music/carol-of-the-bells",
      "access": "paid provider PDF or Premium membership",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-CAROL"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "tempo_marking": "Allegretto",
      "page_count": 2,
      "preview": {
        "mode": "provider_page",
        "url": "https://www.hoffmanacademy.com/store/sheet-music/carol-of-the-bells",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Carol of the Bells Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P077 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-carol-of-the-bells-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-CAROL

## /sheet-music/edelweiss

[已核实] 目标关键词：`edelweiss song piano sheet`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Locate the Easy Piano sheet from The Sound of Music.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Edelweiss Piano Sheet Music**

Locate the Easy Piano sheet from The Sound of Music.

#### Choose this version

The specific Hal Leonard edition is four pages and lists piano/keyboard, vocal and guitar instrumentation. Inspect its sample for the exact layout before choosing it for a solo or singer.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-EDEL。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-EDEL。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-edel",
      "work_title": "Edelweiss",
      "creator": null,
      "arranger": null,
      "edition": "Edelweiss — Easy Piano, HL 00300526",
      "level": "Easy Piano",
      "format": "piano/keyboard with vocal/guitar instrumentation listed",
      "publisher": "Hal Leonard",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/300526/edelweiss-from-the-sound-of-music",
      "access": "external paid resource; check chosen format and provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-EDEL"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "page_count": 4,
      "work_disambiguation": "From The Sound of Music; not a folk-song attribution.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/300526/edelweiss-from-the-sound-of-music",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Edelweiss Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P088 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-edelweiss-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-EDEL

## /sheet-music/in-my-life

[已核实] 目标关键词：`in my life piano sheet music`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Find the Really Easy Piano arrangement in the Beatles collection.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**In My Life Piano Sheet Music**

Find the Really Easy Piano arrangement in the Beatles collection.

#### Choose this version

The edition includes printed chords, lyrics and performance notes. Keep the collection identity with the song; another Beatles edition may use a different arrangement.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-09。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-09。 

### 结构化数据

```json
{
  "resources": [
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
      "edition_features": "Chords, lyrics, background notes and playing tips.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/359244/the-beatles-collection-really-easy-piano",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "In My Life Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P092 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-in-my-life-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CR-09

## /sheet-music/all-of-me-john-legend

[已核实] 目标关键词：`john legend all of me piano keys`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Choose the John Legend song and the notation format you need.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**All of Me — John Legend Piano Sheet Music**

Choose the John Legend song and the notation format you need.

#### Choose this version

The official Piano Vocal sheet includes a vocal line, piano melody and guitar chord frames. A separate letter-text tutorial is also linked. This page does not identify the jazz standard called All of Me.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-19, D-D-ALLMELETTERS。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-19, D-D-ALLMELETTERS。 

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
      "edition_features": "Piano and vocal melody with guitar chord frames.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/126844/all-of-me",
        "local_asset": null
      }
    },
    {
      "id": "d-allmeletters",
      "work_title": "All of Me",
      "creator": null,
      "arranger": null,
      "edition": "Piano Keyboard Guide — All of Me tutorial",
      "level": "Easy (tutorial author label)",
      "format": "letter-name text plus matching keyboard video",
      "publisher": "Piano Keyboard Guide",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.piano-keyboard-guide.com/how-to-play-all-of-me-by-john-legend-easy-piano-tutorial/",
      "access": "free external tutorial page",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-ALLMELETTERS"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "octave_and_rhythm": "Use the paired video; the letter-text format is not a full rhythmic staff score.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.piano-keyboard-guide.com/how-to-play-all-of-me-by-john-legend-easy-piano-tutorial/",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "All of Me — John Legend Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P094 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-all-of-me-john-legend-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CR-19, D-D-ALLMELETTERS

## /sheet-music/runaway-kanye-west

[已核实] 目标关键词：`piano keys for runaway kanye west`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Choose Kanye West’s vocal edition rather than a same-title solo arrangement.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Runaway — Kanye West Piano Sheet Music**

Choose Kanye West’s vocal edition rather than a same-title solo arrangement.

#### Choose this version

MN0103069 is a ten-page Piano/Vocal/Chords resource in its selected E-major key. The Westworld solo arrangement and transposed product selections are separate versions.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-RUNAWAY。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-RUNAWAY。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-runaway",
      "work_title": "Runaway",
      "creator": null,
      "arranger": null,
      "edition": "Runaway — MN0103069",
      "level": null,
      "format": "Piano/Vocal/Chords, Singer Pro",
      "publisher": "Musicnotes",
      "key": "E major (selected product key)",
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.musicnotes.com/sheetmusic/kanye-west/runaway/MN0103069",
      "access": "paid digital sheet music; transpositions are separate selections",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-RUNAWAY"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "artist": "Kanye West",
      "page_count": 10,
      "version_note": "Kanye West vocal edition; distinct from the Westworld solo arrangement.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.musicnotes.com/sheetmusic/kanye-west/runaway/MN0103069",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Runaway — Kanye West Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P095 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-runaway-kanye-west-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-RUNAWAY

## /sheet-music/piano-man

[已核实] 目标关键词：`piano man sheet music easy`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Find the Easy Piano arrangement in First 50 Popular Songs.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Piano Man Piano Sheet Music**

Find the Easy Piano arrangement in First 50 Popular Songs.

#### Choose this version

This is a song in a purchased collection, not a standalone free file. Use the publisher’s exact book and sample to assess the arrangement.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-01。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CE-01。 

### 结构化数据

```json
{
  "resources": [
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
      "selection_role": "additional edition-backed options; not an individually ranked top-50 list",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/131140/first-50-popular-songs-you-should-play-on-the-piano",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Piano Man Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P096 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-piano-man-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CE-01

## /sheet-music/someone-like-you-adele

[已核实] 目标关键词：`someone like you adele piano keys`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Locate Adele’s named Easy Piano sheet.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Someone Like You — Adele Piano Sheet Music**

Locate Adele’s named Easy Piano sheet.

#### Choose this version

Hal Leonard identifies the selected resource as Easy Piano, HL 00110174. Do not transfer a different recording or tutorial’s hand pattern into this score.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-ADELE。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-ADELE。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-adele",
      "work_title": "Someone Like You",
      "creator": null,
      "arranger": null,
      "edition": "Someone Like You — Easy Piano, HL 00110174",
      "level": "Easy Piano",
      "format": "piano arrangement",
      "publisher": "Hal Leonard",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://www.halleonard.com/product/110174/someone-like-you",
      "access": "external paid resource; check chosen format and provider conditions",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "official / authorized",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-ADELE"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "artist": "Adele",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/110174/someone-like-you",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Someone Like You — Adele Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P099 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-someone-like-you-adele-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：D-D-ADELE

## /sheet-music/song-of-healing

[已核实] 目标关键词：`song of healing piano sheet music`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Keep the Majora’s Mask work separate from the Spirit Tracks track with the same title.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Song of Healing — Majora’s Mask Piano Sheet Music**

Keep the Majora’s Mask work separate from the Spirit Tracks track with the same title.

#### Choose this version

The verified resource is Sheet Music Boss’s Majora’s Mask tutorial, credited there to Koji Kondo. A specific usable score edition is still unresolved, so this record cannot yet satisfy the sheet-download task.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-HEALING。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：D-D-HEALING。 

### 结构化数据

```json
{
  "resources": [
    {
      "id": "d-healing",
      "work_title": "Song of Healing — Majora’s Mask",
      "creator": "Koji Kondo (tutorial attribution)",
      "arranger": null,
      "edition": "Sheet Music Boss — Song of Healing, 2024-12-31",
      "level": null,
      "format": "piano video tutorial; score acquisition not independently resolved",
      "publisher": "Sheet Music Boss",
      "key": null,
      "tempo_bpm": null,
      "fingering": null,
      "resource_url": "https://sheetmusicboss.com/2024/12/31/song-of-healing-from-the-legend-of-zelda-majoras-mask-piano-tutorial/",
      "access": "external free-to-view tutorial; linked score edition pending",
      "rights": {
        "work_status": "license unclear",
        "edition_status": "license unclear",
        "site_use": "external reference only",
        "redistribute_score": false,
        "redistribute_recording": false
      },
      "source_ids": [
        "D-D-HEALING"
      ],
      "evidence_status": "[已核实] populated publisher metadata; null means not established",
      "score_resource_url": null,
      "work_disambiguation": "Majora’s Mask. The Spirit Tracks book has a same-name track; do not substitute it.",
      "preview": {
        "mode": "provider_page",
        "url": "https://sheetmusicboss.com/2024/12/31/song-of-healing-from-the-legend-of-zelda-majoras-mask-piano-tutorial/",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Song of Healing — Majora’s Mask Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P100 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-song-of-healing-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。
- D-healing-score — usable specific sheet edition：只确认匹配作品的演示/教程，未确认可获取的具体谱版本；Spirit Tracks同名曲不可替代。；解决：核实Majora’s Mask Song of Healing的正规具体乐谱SKU和获取方式。

来源：D-D-HEALING

## /sheet-music/a-whole-new-world

[已核实] 目标关键词：`a whole new world piano keys`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Find a beginner piano arrangement of the Disney song.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**A Whole New World Piano Sheet Music**

Find a beginner piano arrangement of the Disney song.

#### Choose this version

The song is listed in Really Easy Piano: 40 Disney Songs. Use that edition for the playing task; this card does not provide a copied keys-only transcription.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-08。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-08。 

### 结构化数据

```json
{
  "resources": [
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
      "edition_features": "Beginner piano arrangements with background notes and tips.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/457282/really-easy-piano-40-disney-songs",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "A Whole New World Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P101 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-a-whole-new-world-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CR-08

## /sheet-music/easy-on-me

[已核实] 目标关键词：`easy on me piano sheet music`；模板 T18；基线优先级：暂不做。
状态：`baseline_paused_content_researched`；发布状态：未验收。

任务：Choose the letter-labelled Super Easy arrangement.

### 页面需回答的问题

- Which work and arrangement does this page identify?
- What notation and difficulty does the resource provide?
- Is access free or paid, and can the file be reused here?

### 英文页面内容

**Easy On Me Piano Sheet Music**

Choose the letter-labelled Super Easy arrangement.

#### Choose this version

The selected Pop Hits edition uses note names inside the melody notes and left-hand chord diagrams. This is annotated staff notation, rather than a pure letter-text score.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-01。 

#### Get the resource

Open the exact provider link below. Compare the preview and access conditions, then obtain your own copy in the format offered. No score or recording is hosted on this page.

[推断] user guidance; exact edition facts supported by listed source IDs 来源：CR-01。 

### 结构化数据

```json
{
  "resources": [
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
      "edition_features": "Right-hand melody with note names, left-hand chord diagrams; digital book is streaming, not printable.",
      "preview": {
        "mode": "provider_page",
        "url": "https://www.halleonard.com/product/1853036/pop-hits-super-easy-songbook",
        "local_asset": null
      }
    }
  ],
  "sections": [],
  "rights_taxonomy": [
    "public domain",
    "official / authorized",
    "external reference only",
    "license unclear"
  ],
  "rights_rule": "Classify composition, edition and site use separately. No public-domain claim is inferred from age or free access.",
  "download_policy": {
    "show_download": false,
    "external_provider_links": true,
    "self_hosted_assets": []
  },
  "schema_org": {
    "@type": "WebPage",
    "name": "Easy On Me Piano Sheet Music",
    "inLanguage": "en-US"
  }
}
```

### 原任务覆盖

| 源组 | 状态 | 已准备 | 待完成 |
| --- | --- | --- | --- |
| P109 | prepared_with_explicit_limits | Named resources with exact notation/access distinctions, English task content and rights fields. | Only unresolved fields and limits recorded in this page’s issues. |

### 待确认

- D-easy-on-me-reuse — self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

来源：CR-01

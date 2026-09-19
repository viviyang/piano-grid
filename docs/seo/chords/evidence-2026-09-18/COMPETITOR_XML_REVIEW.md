# Competitor XML review

XML complete: competitor=true site=true.
Sitemap membership is not Google indexing. No competitor traffic numbers were collected.

| Stat | Value |
|---|---:|
| Raw loc records | 820 |
| Unique URLs | 803 |
| Duplicate loc | 17 |
| HTML / PDF / other unique | 803 / 0 / 0 |
| Written roots | 17 |
| Pitch classes | 12 |
| Combo (multi-topic) URLs | 17 |
| Unclassified URLs | 300 |
| page_type Structure | 1 |
| page_type Unclassified | 300 |
| page_type Family | 9 |
| page_type Root hub | 17 |
| page_type Root collection | 17 |
| page_type Detail candidate | 459 |

## Match cardinality (URL rows, not topic-string sums)

### 158 module URLs

- URL rows: 158
- URLs with a strict spelling topic hit: 153
- Topic-string hits (not a URL count): 153
- 1:1: 129
- 1:N: 0
- N:1 own URLs sharing one competitor URL: 24
- N:1 competitor URLs: 12
- Enharmonic only: 1
- No pattern match: 4

### 138 sample URLs

- URL rows: 138
- URLs with a strict spelling topic hit: 138
- Topic-string hits: 138
- 1:1: 114
- 1:N: 0
- N:1 own URLs: 24
- Enharmonic only: 0
- No pattern match: 0

## Content samples (not XML membership)

- https://www.pianochord.org/sitemap.html: Sitemap / HTML navigation. 目录明确注明未包含全部页面 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/c.html: Root hub / C. 28个类别入口；按根音进入同根不同类型 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/d-flat.html: Root hub / Db. Db拼写单独导航，不等于独立音高类 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/c-major.html: Detail / C major. 一个URL包含根位和转位 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/cm.html: Detail / C minor. 一个URL包含根位和转位 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/cm7.html: Detail / C minor 7. Cm7主题页面 [PRIMARY_SEARCH_SNIPPET; xml=NOT_FETCHED]
- https://www.pianochord.org/b-dim.html: Detail / B diminished. Bdim三和弦；另链Bdim7 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/c-add.html: Detail multi-topic / C add9; C add2. add9和add2同一页面 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/cm-add.html: Detail / C minor add9. Cmadd9独立页面，非Cm9 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/c-sus.html: Detail multi-topic / C sus2; C sus4. sus2和sus4在同一个URL [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/d-flat-sus.html: Detail multi-topic / Db sus2; Db sus4. 低量Db的两种sus也放在一个URL [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/d-flat-m7b5.html: Detail / Db half-diminished 7. 本次读到正文；零量查询并不代表竞品没有对应产品页 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/d7-flat.html: Detail / Db dominant 7. 音符写法仅作为竞品内容，不直接复制进本项目 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/dm-flat.html: Detail / Db minor. 与本项目C# minor属于等音比较，不自动当成相同书写主题 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/c-extended.html: Detail / C dominant 9. 竞品C9独立页；本项目在Extended reference内承接 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]
- https://www.pianochord.org/c-filter.html: Root reference collection / C multiple types. 一个URL汇集多种和弦对象 [PAGE_TEXT_FETCHED; xml=NOT_FETCHED]

Known structure from sampled pages, independent of XML completeness:
- Cadd9/Cadd2 share c-add.html
- Csus2/Csus4 share c-sus.html
- Cmadd9 is cm-add.html, not Cm9
- dim and dim7 are distinct
- Cb/B enharmonic relation must not auto-canonical
- dm-flat.html is Db minor, not D minor

Fetch log files:
- https://www.pianochord.org/sitemap.xml (urlset) -> raw/competitor_506dc914effa.xml bytes=53098 sha256=a9645a0c73c9cfe3be6f9eaa7a8889208477d6f3b19b2d4b0fa299a46ed1966d
- https://pianogrid.com/sitemap.xml (urlset) -> raw/site_fa11803d9d0d.xml bytes=13111 sha256=49c2124b5e5a95ff380239802cce51578d1d7501b51e1b104badbdaa12bdf9d2

Live PianoGrid sitemap unique URLs = 206; chord-module paths = 158; no pack/registry/live-sitemap set difference.

## Unclassified review (300)

The conservative URL-pattern matcher left 300 URLs unclassified. Stem counts are not D-minor misreads of `dm-flat`:

- 17 each: `*-altered.html`, `*-7minus9`, `*-7plus9`, `*-7plus11`, `*-13plus11`, `*-13minus9`, `*-add11`, `*-7plusmaj9`
- Smaller groups: alternative-bass combo pages, `*-7-sus`, `*-m6-9`, `*-minmaj7`, `*-m7-m7b5`

These are extra competitor qualities/combo pages outside PianoGrid's 158 module URLs. They were not remapped into Major/Minor/Seventh details.

## Pattern-match gaps in the 158

- No pattern match (4 structure/hub URLs, not missing chord details): `/chords`, `/chords/finder`, `/chords/by-key`, `/chord-progressions`
- Enharmonic only (1): `/chords/c-flat-major` — relationship only; do not auto-canonical to B
- N:1 (24 own URLs / 12 competitor URLs): every sus2+sus4 pair shares one `*-sus.html`. Granularity review only; competitor same-page is not a merge order

## Title/H1 samples fetched 2026-09-18 (robots + 1s delay)

| URL | Title | H1 |
|---|---|---|
| https://www.pianochord.org/c-add.html | Cadd9 & Cadd2 piano chords | C add chords |
| https://www.pianochord.org/c-sus.html | C sus / piano chords sus2, sus4 | C sus chords |
| https://www.pianochord.org/cm-add.html | Cmadd9 piano chord | C minor add chord |
| https://www.pianochord.org/cm9.html | Cm9 piano chord | C minor 9th chord |
| https://www.pianochord.org/b-dim.html | B dim / piano chords | B dim chord |
| https://www.pianochord.org/c-dim7.html | C dim7 piano chord | Cdim7 chord |
| https://www.pianochord.org/dm-flat.html | Db minor piano chord | Db minor chord |
| https://www.pianochord.org/c-major.html | C major piano chord | C major chord |
| https://www.pianochord.org/c-extended.html | C9 piano chord | C 9th chord |
| https://pianogrid.com/chords/b-minor | B Minor Chord – Piano Notes, Fingering & Inversions / PianoGrid | B Minor Chord |
| https://pianogrid.com/chords/seventh | Seventh Piano Chords: 7, Maj7, Min7 & Half-Diminished | Seventh Piano Chords |

Raw HTML saved under `competitor-xml/page_samples/`. XML membership ≠ Google indexing. No competitor traffic was measured.

# Piano Reference — 内容总索引

[已核实] 125 个剩余页面已按 A→F 批次完成内容和数据准备，并逐批自检；另保留 2 个既有 chords 页面，共 127 个基线 URL。

[已核实] 本次有 209 条逐页待确认记录；既有 chords 的 6 条 gap 原样保留。准备完成不等于专业签核、素材授权或网站功能已验收。

## 交付文件

- `page-content.master.json`：127 页总数据；`pages` 按 URL 索引。
- `source-ledger.master.md`：全部来源及批次；同一来源不同别名不视为独立交叉证据。
- `unresolved-issues.master.md`：逐页问题、旧 chords gaps、19 个暂停页面、17 个未分配任务组及 2 个历史线索。
- A–F 各目录：四个指定 batch 文件。
- `assets/`：本次原创 PDF/SVG 及字体许可。
- `preserved-chords/`：既有 chords 文档、JSON、素材逐字节保留。
- `url-plan.final.json` 与中文最终规划：基线只读副本。

## 交接规则

英文可见内容位于 blocks 的 body；data 为具体音乐数据或资料条目。中文基线、来源与审计标签不直接渲染到产品流程。音乐公式推导、原创练习和情绪选择明确标为 [推断]；待确认值为 null。未完成的功能不显示为可用按钮。

Songs / Sheet Music 的 rights 字段把作品、具体版本与本站使用权限分开。`official / authorized` 表示正规来源身份，不代表本站取得转载权；所有未授权第三方谱面均保持 `external reference only`。没有将网上谱面打包成本站素材。

既有两页使用原 schema；读取 legacy_chords_support 取得其 shared_data、claims、gaps 与原契约。旧页素材根为 preserved-chords/；新页素材根为总包根目录。不要重写旧页来强行套新结构。

## 批次结果

| 批次 | 新页面 | 来源 ID | 逐页问题 | 内容文件 |
| --- | ---: | ---: | ---: | --- |
| A | 26 | 75 | 87 | [A-Scales/batch-content-pack.md](A-Scales/batch-content-pack.md) |
| B | 7 | 33 | 16 | [B-Keyboard-Notes/batch-content-pack.md](B-Keyboard-Notes/batch-content-pack.md) |
| C | 22 | 39 | 26 | [C-Songs/batch-content-pack.md](C-Songs/batch-content-pack.md) |
| D | 42 | 68 | 45 | [D-Sheet-Music/batch-content-pack.md](D-Sheet-Music/batch-content-pack.md) |
| E | 14 | 30 | 13 | [E-Guide-Reading-Practice/batch-content-pack.md](E-Guide-Reading-Practice/batch-content-pack.md) |
| F | 14 | 19 | 22 | [F-Homepage/batch-content-pack.md](F-Homepage/batch-content-pack.md) |

## 逐页索引

| URL | 批次 | 主关键词 | 状态 | 问题数 |
| --- | --- | --- | --- | ---: |
| / | F | （结构页，无主关键词） | content_and_data_prepared_with_issues | 1 |
| /tools | F | （结构页，无主关键词） | content_and_data_prepared_with_issues | 1 |
| /songs | C | piano songs | content_and_data_prepared_with_issues | 1 |
| /songs/easy | C | easy piano songs | content_and_data_prepared_with_issues | 4 |
| /tools/blank-sheet-music | D | empty piano sheet music | content_and_data_prepared | 0 |
| /keyboard-notes | B | piano keys | content_data_ready_with_rendering_pending | 1 |
| /keyboard-notes/labeled | B | keys on a piano keyboard labeled | content_data_ready_print_asset_pending | 4 |
| /keyboard-notes/chart | B | piano notes chart | content_and_mapping_ready_render_pending_solfege_reserved | 3 |
| /chords | preserved | piano chord chart | content_and_data_package_complete_for_declared_batch | 6 |
| /chords/a-major | F | a chord piano | content_and_data_prepared_with_issues | 2 |
| /chords/a-minor | preserved | am piano chord | content_and_data_package_complete_for_declared_batch | 4 |
| /chords/c-major | F | c chords piano | content_and_data_prepared_with_issues | 2 |
| /scales | A | piano scales | content_and_data_prepared_with_issues | 2 |
| /scales/c-major | A | c major scale piano | content_data_ready_with_implementation_qa_pending | 2 |
| /scales/a-minor | A | a minor scale piano | content_and_note_data_ready_with_fingering_gaps | 5 |
| /guide | E | how to play piano for beginners | content_and_data_prepared_with_issues | 1 |
| /guide/read-sheet-music | E | how to read sheet music piano | content_and_data_prepared_with_issues | 1 |
| /songs/christmas | C | easy christmas songs in piano | content_and_data_prepared_with_issues | 1 |
| /songs/challenging | C | hardest piano song | content_and_data_prepared_with_issues | 2 |
| /songs/pop | C | easiest pop piano songs | content_and_data_prepared_with_issues | 1 |
| /songs/classical | C | classical piano songs | content_and_data_prepared_with_issues | 1 |
| /songs/easy-chords | C | easy chords songs for beginners piano | content_and_data_prepared_with_issues | 1 |
| /songs/anime | C | most lovely piano anime songs | content_and_data_prepared_with_issues | 1 |
| /songs/minecraft | C | piano minecraft songs | content_and_data_prepared_with_issues | 1 |
| /songs/rock | C | piano rock songs | content_and_data_prepared_with_issues | 1 |
| /songs/taylor-swift | C | taylor swift piano songs | content_and_data_prepared_with_issues | 1 |
| /songs/disney | C | disney easy piano songs | content_and_data_prepared_with_issues | 1 |
| /songs/wedding | C | piano wedding songs | content_and_data_prepared_with_issues | 1 |
| /songs/worship | C | piano worship songs | content_and_data_prepared_with_issues | 1 |
| /songs/rap | C | rap songs for piano | content_and_data_prepared_with_issues | 1 |
| /songs/piano-and-guitar | C | piano and guitar songs | content_and_data_prepared_with_issues | 1 |
| /songs/beatles | C | beatles piano songs | content_and_data_prepared_with_issues | 1 |
| /songs/coldplay | C | coldplay piano songs | content_and_data_prepared_with_issues | 1 |
| /songs/country | C | country music piano songs | content_and_data_prepared_with_issues | 1 |
| /songs/jazz | C | jazz piano songs | content_and_data_prepared_with_issues | 1 |
| /songs/halloween | C | piano songs for halloween | content_and_data_prepared_with_issues | 1 |
| /songs/undertale | C | undertale songs on piano | content_and_data_prepared_with_issues | 1 |
| /sheet-music | D | piano music sheet | content_and_data_prepared_with_issues | 1 |
| /sheet-music/easy | D | easy piano sheet music | content_and_data_prepared_with_issues | 1 |
| /sheet-music/beginner | D | beginner piano sheet music | content_and_data_prepared_with_issues | 1 |
| /sheet-music/christmas | D | christmas songs piano score | content_and_data_prepared_with_issues | 1 |
| /sheet-music/letter-notes | D | songs with letters piano | content_and_data_prepared_with_issues | 1 |
| /sheet-music/annotated | D | piano sheet music with letters | content_and_data_prepared_with_issues | 1 |
| /sheet-music/lead-sheets | D | piano chords songs | content_and_data_prepared_with_issues | 1 |
| /sheet-music/pop | D | popular piano sheet music | content_and_data_prepared_with_issues | 1 |
| /sheet-music/disney | D | disney song piano sheet for beginners | content_and_data_prepared_with_issues | 1 |
| /sheet-music/classical | D | classical piano sheet music | content_and_data_prepared_with_issues | 1 |
| /sheet-music/jazz | D | easy jazz piano sheet music | content_and_data_prepared_with_issues | 1 |
| /sheet-music/jingle-bells | D | jingle bells song sheet for piano | content_and_data_prepared_with_issues | 1 |
| /sheet-music/amazing-grace | D | amazing grace song sheet for piano | content_and_data_prepared_with_issues | 1 |
| /sheet-music/fur-elise | D | fur elise piano sheet music easy | content_and_data_prepared_with_issues | 1 |
| /sheet-music/happy-birthday | D | happy birthday sheet music piano easy | content_and_data_prepared_with_issues | 1 |
| /sheet-music/hot-cross-buns | D | hot cross buns piano keys | content_and_data_prepared_with_issues | 1 |
| /sheet-music/jesus-loves-me | D | jesus loves me piano keys | content_and_data_prepared_with_issues | 1 |
| /sheet-music/mary-had-a-little-lamb | D | mary had a little lamb piano keys | content_and_data_prepared_with_issues | 1 |
| /sheet-music/abc-song | D | abc song piano sheet | content_and_data_prepared_with_issues | 1 |
| /sheet-music/ode-to-joy | D | ode to joy easy piano sheet music | content_and_data_prepared_with_issues | 1 |
| /sheet-music/silent-night | D | silent night beginner piano sheet music | content_and_data_prepared_with_issues | 1 |
| /sheet-music/twinkle-twinkle-little-star | D | twinkle twinkle little star piano sheet music | content_and_data_prepared_with_issues | 1 |
| /keyboard-notes/frequencies | B | note frequency chart | content_and_calculated_88_note_dataset_ready; rendered chart pending | 2 |
| /keyboard-notes/finger-numbers | B | piano fingering chart | content_and_hand_mapping_ready; original_diagram_pending | 3 |
| /keyboard-notes/blank | B | piano keys blank page | content_and_data_prepared_with_issues | 1 |
| /tools/piano-cheat-sheet | F | piano cheat sheet | content_and_data_prepared_with_issues | 1 |
| /keyboard-notes/key-signatures | B | piano key signatures | content_and_table_ready_render_pending | 2 |
| /chords/b-major | F | b chord piano | content_and_data_prepared_with_issues | 2 |
| /chords/a-flat-major | F | a flat chord piano | content_and_data_prepared_with_issues | 2 |
| /chords/e-major | F | piano e chord | content_and_data_prepared_with_issues | 2 |
| /chords/c-minor | F | c minor in piano | content_and_data_prepared_with_issues | 2 |
| /chords/c-flat-major | F | cb piano chord | content_and_data_prepared_with_issues | 2 |
| /chords/g-major | F | g chord piano | content_and_data_prepared_with_issues | 2 |
| /chords/by-key | F | chords of key | content_and_data_prepared_with_issues | 1 |
| /chords/finder | F | chord finder piano | content_and_data_prepared_with_issues | 1 |
| /chord-progressions | F | piano chord progressions | content_and_data_prepared_with_issues | 1 |
| /scales/modes | A | scale modes | content_and_pitch_data_prepared_with_open_issues | 3 |
| /scales/blues | A | blues scale piano | content_and_pitch_data_prepared_with_open_issues | 3 |
| /scales/d-major | A | d major scale piano | content_data_ready_with_implementation_qa_pending | 2 |
| /scales/e-minor | A | e minor scale piano | content_and_note_data_ready_with_fingering_gaps | 5 |
| /scales/f-major | A | f major scale for piano | content_data_ready_with_implementation_qa_pending | 2 |
| /scales/g-major | A | g major scale piano | content_data_ready_with_implementation_qa_pending | 2 |
| /scales/pentatonic | A | pentatonic scale piano | content_and_pitch_data_prepared_with_open_issues | 3 |
| /scales/a-major | A | a major scale for piano | content_data_ready_with_implementation_qa_pending | 2 |
| /scales/c-minor | A | c minor scale piano | content_and_note_data_ready_with_fingering_gaps | 5 |
| /scales/d-minor | A | d minor scale piano | content_and_note_data_ready_with_fingering_gaps | 5 |
| /scales/e-major | A | e major scale piano | content_data_ready_with_implementation_qa_pending | 2 |
| /scales/b-minor | A | b minor scale piano | content_and_note_data_ready_with_fingering_gaps | 5 |
| /scales/f-minor | A | f minor scale piano | content_and_note_data_ready_with_fingering_gaps | 5 |
| /scales/harmonic-major | A | harmonic major scale | content_and_pitch_data_prepared_with_open_issues | 3 |
| /scales/a-sharp-minor | A | a# minor scale | content_and_note_data_ready_with_fingering_gaps | 5 |
| /scales/b-major | A | b major scale piano | content_data_ready_with_implementation_qa_pending | 2 |
| /scales/b-flat-major | A | b flat major scale piano | content_data_ready_with_implementation_qa_pending | 2 |
| /scales/g-minor | A | g minor scale piano | content_and_note_data_ready_with_fingering_gaps | 5 |
| /scales/chromatic | A | chromatic scale piano | content_and_pitch_data_prepared_with_open_issues | 3 |
| /scales/e-flat-major | A | e flat major scale piano | content_data_ready_with_implementation_qa_pending | 2 |
| /scales/f-sharp-minor | A | f#m piano scale | content_and_note_data_ready_with_fingering_gaps | 5 |
| /scales/c-flat-major | A | cb major scale piano | content_data_ready_with_secondary_fingering_review | 3 |
| /arpeggios | A | arpeggios piano | content_and_pitch_data_prepared_with_open_issues | 4 |
| /guide/sight-reading | E | sight reading piano tips for improvement | content_and_data_prepared_with_issues | 1 |
| /guide/piano-chords | E | how to play chords on piano | content_and_data_prepared_with_issues | 1 |
| /guide/piano-books | E | piano books for beginners | content_and_data_prepared_with_issues | 1 |
| /guide/learn-a-piano-song | E | how to play piano songs | content_and_data_prepared_with_issues | 1 |
| /guide/piano-scales | E | piano scales for beginners | content_and_data_prepared_with_issues | 1 |
| /guide/compose-a-piano-song | E | make a piano song | content_and_data_prepared_with_issues | 1 |
| /guide/hanon-exercises | E | hanon piano exercises | content_and_data_prepared_with_issues | 1 |
| /guide/note-values-and-rhythm | E | kinds of notes music | content_and_data_prepared_with_issues | 1 |
| /guide/piano-exercises | E | piano exercises for beginners | content_and_data_prepared_with_issues | 1 |
| /guide/piano-hand-position | E | piano hand posture | content_and_data_prepared_with_issues | 1 |
| /guide/piano-practice | E | piano practice | content_and_data_prepared_with_issues | 1 |
| /guide/music-symbols-and-piano-terms | E | piano terms | content_and_data_prepared | 0 |
| /sheet-music/let-it-go | D | frozen let it go piano sheet music easy free pdf | baseline_paused_content_researched | 2 |
| /sheet-music/super-mario-theme | D | super mario theme piano sheet music easy free pdf | baseline_paused_content_researched | 2 |
| /sheet-music/thats-amore | D | what are the piano keys to thats amore | baseline_paused_content_researched | 1 |
| /sheet-music/black-parade | D | black parade keys piano | baseline_paused_content_researched | 1 |
| /sheet-music/clocks | D | clocks piano keys | baseline_paused_content_researched | 1 |
| /sheet-music/from-the-start | D | from the start piano sheet music | baseline_paused_content_researched | 2 |
| /sheet-music/song-of-storms | D | song of storms piano sheet music | baseline_paused_content_researched | 1 |
| /sheet-music/pink-panther | D | pink panther theme song piano sheet | baseline_paused_content_researched | 1 |
| /sheet-music/still-dre | D | piano keys for still dre | baseline_paused_content_researched | 1 |
| /sheet-music/carol-of-the-bells | D | carol of the bells easy piano sheet music | baseline_paused_content_researched | 1 |
| /sheet-music/edelweiss | D | edelweiss song piano sheet | baseline_paused_content_researched | 1 |
| /sheet-music/in-my-life | D | in my life piano sheet music | baseline_paused_content_researched | 1 |
| /sheet-music/all-of-me-john-legend | D | john legend all of me piano keys | baseline_paused_content_researched | 1 |
| /sheet-music/runaway-kanye-west | D | piano keys for runaway kanye west | baseline_paused_content_researched | 1 |
| /sheet-music/piano-man | D | piano man sheet music easy | baseline_paused_content_researched | 1 |
| /sheet-music/someone-like-you-adele | D | someone like you adele piano keys | baseline_paused_content_researched | 1 |
| /sheet-music/song-of-healing | D | song of healing piano sheet music | baseline_paused_content_researched | 2 |
| /sheet-music/a-whole-new-world | D | a whole new world piano keys | baseline_paused_content_researched | 1 |
| /sheet-music/easy-on-me | D | easy on me piano sheet music | baseline_paused_content_researched | 1 |

## 自检

- [已核实] Exact 127-URL master set: 125 new + 2 unchanged existing pages
- [已核实] All 125 new page keywords and source groups deep-equal the baseline
- [已核实] Both existing chords page objects deep-equal original JSON; both original content files byte-identical
- [已核实] All six batches passed selfcheck in A→F order; no publication inferred
- [已核实] All nested new source IDs resolve and every declared assets/ file exists
- [已核实] All structured internal page links checked against the baseline URL set
- [已核实] Eight new chord objects / 24 inversions have consistent notes and MIDI, including Cb4 = B3
- [已核实] Seven required key tables contain seven triads each; D-minor alternatives separate
- [已核实] Nine progression realizations each contain four complete 4/4 bars
- [已核实] Original E exercise durations and practice schedule totals verified
- [已核实] 19 paused pages, 17 unassigned groups and 2 historical items retained
- [已核实] Third-party scores and recordings are external references, not bundled materials

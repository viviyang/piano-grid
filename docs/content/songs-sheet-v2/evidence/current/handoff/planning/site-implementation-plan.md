# 全站实现进度

日期：2026-09-10。当前阶段：首轮 17 条路由已经在 `https://pianogrid.com` 公开。08 独立验收为 `PASS_WITH_NOTES`；其后 public-launch 变更和线上自动化复核已完成，当前等待最终公开构建的独立复验与人工／专业门槛收口。01–07 的已验收产品范围保持不变。

[已核实] 全站127 URL保持，17先做、91后做、19暂不做。源数据准备状态不变；当前只有首轮 17 条路由公开，91 条后做与 19 条暂不做仍未授权。现有 A minor 是前阶段成果，不算新建页面。

## 首轮17页

| URL | 模板 | 原优先级 | 工程批次 | source_groups | 实现/测试状态 |
|---|---|---|---|---|---|
| / | T01 | 先做 | 07-site-integration | — | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /tools | T02 | 先做 | 07-site-integration | P113 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /songs | T15 | 先做 | 04-songs | P002, P009, P014, P018, P022, P041, P042, P043 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /songs/easy | T16 | 先做 | 04-songs | P001, P006, P036, P037, P039, P040 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /tools/blank-sheet-music | T19 | 先做 | 06-blank-sheet | P079 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /keyboard-notes | T03 | 先做 | 02-keyboard-notes | P117, P118, P120, P122, P123, P124, P127, P129, P130, P133, P134, P138, P139, P140, P141, P142, P147 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /keyboard-notes/labeled | T04 | 先做 | 02-keyboard-notes | P119, P137, P223, P241 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /keyboard-notes/chart | T05 | 先做 | 02-keyboard-notes | P121, P132, P143, P145, P146 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /chords | T06 | 先做 | 01-chords | P148, P154, P158, P168, P170, P171, P238, P247 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /chords/a-major | T07 | 先做 | 01-chords | P149 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /chords/a-minor | T07 | 先做 | 01 regression | P151 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /chords/c-major | T07 | 先做 | 01-chords | P163 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /scales | T11 | 先做 | 03-scales | P179, P180, P181, P190, P196, P204, P208, P210, P213, P214, P222, P224, P233, P235 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /scales/c-major | T12 | 先做 | 03-scales | P183 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /scales/a-minor | T12 | 先做 | 03-scales | P184 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /guide | T21 | 先做 | 05-guides | P226, P240, P255 | 08 PASS_WITH_NOTES；公开版待独立复验；教师审阅待完成 |
| /guide/read-sheet-music | T22 | 先做 | 05-guides | P218, P228, P229, P236, P248, P249 | 08 PASS_WITH_NOTES；公开版待独立复验；教师审阅待完成 |

## 当前证据与下一步

- 00：checks/batches/00-content-intake/implementation.md；新旧对象和43资产哈希核对、源映射。
- 01：checks/batches/01-chords/implementation.md；check、逐页测试、A minor 回归、构建与截图。
- 每页 template、source_groups、来源ID、问题和schema完整登记在 docs/content/content-source-map.json；资源真实路径/哈希/导出状态见 asset-map.json。
- 01：逐任务组 required_output 与实际覆盖见 checks/batches/01-chords/coverage.json。未做的power/7th/jazz和未上线指南明确保留，不写全部原任务完成。
- 02：checks/batches/02-keyboard-notes/implementation.md 与 checks/reviews/02-keyboard-notes/review.md；独立结论 PASS_WITH_NOTES，用户已接受，保留报告中的非阻塞环境备注。
- 03：checks/batches/03-scales/implementation.md 与 checks/reviews/03-scales/review.md；独立结论 PASS_WITH_NOTES，用户已接受，保留报告中的测试工具时序备注。
- 04：checks/batches/04-songs/implementation.md 与 checks/reviews/04-songs/review.md；独立结论 PASS_WITH_NOTES，用户已接受，保留报告中的390px排版备注。
- 05：checks/batches/05-guides/implementation.md 与 checks/reviews/05-guides/review.md；独立结论 PASS_WITH_NOTES，用户已接受，保留专业审阅与PDF可访问性备注。
- 06：checks/batches/06-blank-sheet/implementation.md 与 checks/reviews/06-blank-sheet/review.md；独立结论 PASS_WITH_NOTES，用户已接受。
- 07：checks/reviews/07-site-integration/review.md 的首轮 NEEDS_FIX 已在同一报告中复验为 PASS_WITH_NOTES；数据153/153、开发态190/190、生产态114/114。
- 08：`checks/release/08/seo-audit.md` 与 `checks/reviews/08-release-readiness/review.md`；独立结论 `PASS_WITH_NOTES`。
- Public launch：`checks/release/public-launch/report.md`；17 条路由、PianoGrid 品牌、正式 origin、导航、`index,follow`、robots 与 sitemap 已进入生产代码并部署到 Vercel。
- 2026-09-10 线上只读复核：HTTPS 与 www→裸域跳转正常；production 125/125；SEO 17/17、0 blocking、0 runtime errors。该复核不是独立验收签发。
- 下一具体动作：最终公开构建独立复验；随后记录具名专业审核和人工验收结果。不得进入 91 条后做页面，也不得把未测项改成 PASS。

## 全127 URL保留表

| URL | 模板 | 原优先级 | 工程批次 | source_groups | 实现/测试状态 |
|---|---|---|---|---|---|
| / | T01 | 先做 | 07-site-integration | — | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /tools | T02 | 先做 | 07-site-integration | P113 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /songs | T15 | 先做 | 04-songs | P002, P009, P014, P018, P022, P041, P042, P043 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /songs/easy | T16 | 先做 | 04-songs | P001, P006, P036, P037, P039, P040 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /tools/blank-sheet-music | T19 | 先做 | 06-blank-sheet | P079 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /keyboard-notes | T03 | 先做 | 02-keyboard-notes | P117, P118, P120, P122, P123, P124, P127, P129, P130, P133, P134, P138, P139, P140, P141, P142, P147 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /keyboard-notes/labeled | T04 | 先做 | 02-keyboard-notes | P119, P137, P223, P241 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /keyboard-notes/chart | T05 | 先做 | 02-keyboard-notes | P121, P132, P143, P145, P146 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /chords | T06 | 先做 | 01-chords | P148, P154, P158, P168, P170, P171, P238, P247 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /chords/a-major | T07 | 先做 | 01-chords | P149 | 08 PASS_WITH_NOTES；公开版待独立复验；专业审阅待完成 |
| /chords/a-minor | T07 | 先做 | 01 regression | P151 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /chords/c-major | T07 | 先做 | 01-chords | P163 | 08 PASS_WITH_NOTES；公开版待独立复验；专业审阅待完成 |
| /scales | T11 | 先做 | 03-scales | P179, P180, P181, P190, P196, P204, P208, P210, P213, P214, P222, P224, P233, P235 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /scales/c-major | T12 | 先做 | 03-scales | P183 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /scales/a-minor | T12 | 先做 | 03-scales | P184 | 08 PASS_WITH_NOTES；公开版待独立复验 |
| /guide | T21 | 先做 | 05-guides | P226, P240, P255 | 08 PASS_WITH_NOTES；公开版待独立复验；教师审阅待完成 |
| /guide/read-sheet-music | T22 | 先做 | 05-guides | P218, P228, P229, P236, P248, P249 | 08 PASS_WITH_NOTES；公开版待独立复验；教师审阅待完成 |
| /songs/christmas | T16 | 后做 | not in 00–07 | P003, P008 | queued / 未授权 |
| /songs/challenging | T16 | 后做 | not in 00–07 | P004, P025 | queued / 未授权 |
| /songs/pop | T16 | 后做 | not in 00–07 | P005, P013, P026 | queued / 未授权 |
| /songs/classical | T16 | 后做 | not in 00–07 | P007, P015 | queued / 未授权 |
| /songs/easy-chords | T16 | 后做 | not in 00–07 | P010 | queued / 未授权 |
| /songs/anime | T16 | 后做 | not in 00–07 | P011 | queued / 未授权 |
| /songs/minecraft | T16 | 后做 | not in 00–07 | P012 | queued / 未授权 |
| /songs/rock | T16 | 后做 | not in 00–07 | P016 | queued / 未授权 |
| /songs/taylor-swift | T16 | 后做 | not in 00–07 | P017, P031 | queued / 未授权 |
| /songs/disney | T16 | 后做 | not in 00–07 | P019, P021 | queued / 未授权 |
| /songs/wedding | T16 | 后做 | not in 00–07 | P020 | queued / 未授权 |
| /songs/worship | T16 | 后做 | not in 00–07 | P023, P032 | queued / 未授权 |
| /songs/rap | T16 | 后做 | not in 00–07 | P024 | queued / 未授权 |
| /songs/piano-and-guitar | T16 | 后做 | not in 00–07 | P027 | queued / 未授权 |
| /songs/beatles | T16 | 后做 | not in 00–07 | P028 | queued / 未授权 |
| /songs/coldplay | T16 | 后做 | not in 00–07 | P029 | queued / 未授权 |
| /songs/country | T16 | 后做 | not in 00–07 | P030 | queued / 未授权 |
| /songs/jazz | T16 | 后做 | not in 00–07 | P033, P038 | queued / 未授权 |
| /songs/halloween | T16 | 后做 | not in 00–07 | P034 | queued / 未授权 |
| /songs/undertale | T16 | 后做 | not in 00–07 | P035 | queued / 未授权 |
| /sheet-music | T17 | 后做 | not in 00–07 | P047, P048, P060, P063, P070 | queued / 未授权 |
| /sheet-music/easy | T17 | 后做 | not in 00–07 | P044, P110, P111 | queued / 未授权 |
| /sheet-music/beginner | T17 | 后做 | not in 00–07 | P045, P106 | queued / 未授权 |
| /sheet-music/christmas | T17 | 后做 | not in 00–07 | P046, P065 | queued / 未授权 |
| /sheet-music/letter-notes | T17 | 后做 | not in 00–07 | P050, P051, P097 | queued / 未授权 |
| /sheet-music/annotated | T17 | 后做 | not in 00–07 | P054, P061 | queued / 未授权 |
| /sheet-music/lead-sheets | T17 | 后做 | not in 00–07 | P062, P071 | queued / 未授权 |
| /sheet-music/pop | T17 | 后做 | not in 00–07 | P076, P112 | queued / 未授权 |
| /sheet-music/disney | T17 | 后做 | not in 00–07 | P078, P087 | queued / 未授权 |
| /sheet-music/classical | T17 | 后做 | not in 00–07 | P105, P107 | queued / 未授权 |
| /sheet-music/jazz | T17 | 后做 | not in 00–07 | P108 | queued / 未授权 |
| /sheet-music/jingle-bells | T18 | 后做 | not in 00–07 | P049, P053, P074 | queued / 未授权 |
| /sheet-music/amazing-grace | T18 | 后做 | not in 00–07 | P057 | queued / 未授权 |
| /sheet-music/fur-elise | T18 | 后做 | not in 00–07 | P066 | queued / 未授权 |
| /sheet-music/happy-birthday | T18 | 后做 | not in 00–07 | P073, P083 | queued / 未授权 |
| /sheet-music/hot-cross-buns | T18 | 后做 | not in 00–07 | P091 | queued / 未授权 |
| /sheet-music/jesus-loves-me | T18 | 后做 | not in 00–07 | P093 | queued / 未授权 |
| /sheet-music/mary-had-a-little-lamb | T18 | 后做 | not in 00–07 | P102 | queued / 未授权 |
| /sheet-music/abc-song | T18 | 后做 | not in 00–07 | P104 | queued / 未授权 |
| /sheet-music/ode-to-joy | T18 | 后做 | not in 00–07 | P114 | queued / 未授权 |
| /sheet-music/silent-night | T18 | 后做 | not in 00–07 | P115 | queued / 未授权 |
| /sheet-music/twinkle-twinkle-little-star | T18 | 后做 | not in 00–07 | P116 | queued / 未授权 |
| /keyboard-notes/frequencies | T20 | 后做 | not in 00–07 | P125 | queued / 未授权 |
| /keyboard-notes/finger-numbers | T20 | 后做 | not in 00–07 | P126 | queued / 未授权 |
| /keyboard-notes/blank | T20 | 后做 | not in 00–07 | P128 | queued / 未授权 |
| /tools/piano-cheat-sheet | T20 | 后做 | not in 00–07 | P131 | queued / 未授权 |
| /keyboard-notes/key-signatures | T20 | 后做 | not in 00–07 | P136, P244 | queued / 未授权 |
| /chords/b-major | T07 | 后做 | not in 00–07 | P150 | queued / 未授权 |
| /chords/a-flat-major | T07 | 后做 | not in 00–07 | P155 | queued / 未授权 |
| /chords/e-major | T07 | 后做 | not in 00–07 | P162 | queued / 未授权 |
| /chords/c-minor | T07 | 后做 | not in 00–07 | P166 | queued / 未授权 |
| /chords/c-flat-major | T07 | 后做 | not in 00–07 | P167 | queued / 未授权 |
| /chords/g-major | T07 | 后做 | not in 00–07 | P169 | queued / 未授权 |
| /chords/by-key | T08 | 后做 | not in 00–07 | P152, P156, P157, P159, P160, P161, P164, P165 | queued / 未授权 |
| /chords/finder | T09 | 后做 | not in 00–07 | P153 | queued / 未授权 |
| /chord-progressions | T10 | 后做 | not in 00–07 | P172, P173, P174, P175, P176, P177, P178, P237 | queued / 未授权 |
| /scales/modes | T13 | 后做 | not in 00–07 | P182 | queued / 未授权 |
| /scales/blues | T13 | 后做 | not in 00–07 | P185 | queued / 未授权 |
| /scales/d-major | T12 | 后做 | not in 00–07 | P186 | queued / 未授权 |
| /scales/e-minor | T12 | 后做 | not in 00–07 | P187 | queued / 未授权 |
| /scales/f-major | T12 | 后做 | not in 00–07 | P188 | queued / 未授权 |
| /scales/g-major | T12 | 后做 | not in 00–07 | P189 | queued / 未授权 |
| /scales/pentatonic | T13 | 后做 | not in 00–07 | P191 | queued / 未授权 |
| /scales/a-major | T12 | 后做 | not in 00–07 | P192 | queued / 未授权 |
| /scales/c-minor | T12 | 后做 | not in 00–07 | P193 | queued / 未授权 |
| /scales/d-minor | T12 | 后做 | not in 00–07 | P194 | queued / 未授权 |
| /scales/e-major | T12 | 后做 | not in 00–07 | P195 | queued / 未授权 |
| /scales/b-minor | T12 | 后做 | not in 00–07 | P197 | queued / 未授权 |
| /scales/f-minor | T12 | 后做 | not in 00–07 | P198 | queued / 未授权 |
| /scales/harmonic-major | T13 | 后做 | not in 00–07 | P199 | queued / 未授权 |
| /scales/a-sharp-minor | T12 | 后做 | not in 00–07 | P200 | queued / 未授权 |
| /scales/b-major | T12 | 后做 | not in 00–07 | P201 | queued / 未授权 |
| /scales/b-flat-major | T12 | 后做 | not in 00–07 | P202 | queued / 未授权 |
| /scales/g-minor | T12 | 后做 | not in 00–07 | P203 | queued / 未授权 |
| /scales/chromatic | T13 | 后做 | not in 00–07 | P205 | queued / 未授权 |
| /scales/e-flat-major | T12 | 后做 | not in 00–07 | P206 | queued / 未授权 |
| /scales/f-sharp-minor | T12 | 后做 | not in 00–07 | P207 | queued / 未授权 |
| /scales/c-flat-major | T12 | 后做 | not in 00–07 | P209 | queued / 未授权 |
| /arpeggios | T14 | 后做 | not in 00–07 | P215, P216, P217 | queued / 未授权 |
| /guide/sight-reading | T22 | 后做 | not in 00–07 | P219, P234, P264 | queued / 未授权 |
| /guide/piano-chords | T22 | 后做 | not in 00–07 | P220, P225, P242 | queued / 未授权 |
| /guide/piano-books | T23 | 后做 | not in 00–07 | P221, P251, P258, P260 | queued / 未授权 |
| /guide/learn-a-piano-song | T22 | 后做 | not in 00–07 | P230, P232 | queued / 未授权 |
| /guide/piano-scales | T22 | 后做 | not in 00–07 | P231, P259 | queued / 未授权 |
| /guide/compose-a-piano-song | T22 | 后做 | not in 00–07 | P239 | queued / 未授权 |
| /guide/hanon-exercises | T22 | 后做 | not in 00–07 | P245 | queued / 未授权 |
| /guide/note-values-and-rhythm | T22 | 后做 | not in 00–07 | P227, P252 | queued / 未授权 |
| /guide/piano-exercises | T22 | 后做 | not in 00–07 | P253, P261 | queued / 未授权 |
| /guide/piano-hand-position | T22 | 后做 | not in 00–07 | P254 | queued / 未授权 |
| /guide/piano-practice | T22 | 后做 | not in 00–07 | P257 | queued / 未授权 |
| /guide/music-symbols-and-piano-terms | T22 | 后做 | not in 00–07 | P144, P256, P262 | queued / 未授权 |
| /sheet-music/let-it-go | T18 | 暂不做 | not in 00–07 | P052, P081 | blocked_reserved |
| /sheet-music/super-mario-theme | T18 | 暂不做 | not in 00–07 | P055, P084 | blocked_reserved |
| /sheet-music/thats-amore | T18 | 暂不做 | not in 00–07 | P056 | blocked_reserved |
| /sheet-music/black-parade | T18 | 暂不做 | not in 00–07 | P058 | blocked_reserved |
| /sheet-music/clocks | T18 | 暂不做 | not in 00–07 | P059 | blocked_reserved |
| /sheet-music/from-the-start | T18 | 暂不做 | not in 00–07 | P064 | blocked_reserved |
| /sheet-music/song-of-storms | T18 | 暂不做 | not in 00–07 | P068 | blocked_reserved |
| /sheet-music/pink-panther | T18 | 暂不做 | not in 00–07 | P072, P098 | blocked_reserved |
| /sheet-music/still-dre | T18 | 暂不做 | not in 00–07 | P075 | blocked_reserved |
| /sheet-music/carol-of-the-bells | T18 | 暂不做 | not in 00–07 | P077 | blocked_reserved |
| /sheet-music/edelweiss | T18 | 暂不做 | not in 00–07 | P088 | blocked_reserved |
| /sheet-music/in-my-life | T18 | 暂不做 | not in 00–07 | P092 | blocked_reserved |
| /sheet-music/all-of-me-john-legend | T18 | 暂不做 | not in 00–07 | P094 | blocked_reserved |
| /sheet-music/runaway-kanye-west | T18 | 暂不做 | not in 00–07 | P095 | blocked_reserved |
| /sheet-music/piano-man | T18 | 暂不做 | not in 00–07 | P096 | blocked_reserved |
| /sheet-music/someone-like-you-adele | T18 | 暂不做 | not in 00–07 | P099 | blocked_reserved |
| /sheet-music/song-of-healing | T18 | 暂不做 | not in 00–07 | P100 | blocked_reserved |
| /sheet-music/a-whole-new-world | T18 | 暂不做 | not in 00–07 | P101 | blocked_reserved |
| /sheet-music/easy-on-me | T18 | 暂不做 | not in 00–07 | P109 | blocked_reserved |

无URL17组与2条历史线索仍在只读master中，未生成路由。未实现页：内容已准备不等于代码或资源已公开；没有默认回退到A minor。


# URL差集：规划、历史线上、dirty快照和实际production分别统计

[已核实] 本包逐条保留原规划64项：22 Songs、41 Sheet、1工具协同；首8页以外55模块页＝36常规后续＋19暂停。数据见`content-data/route-diff.json`。

[已核实] 实际`main@1e3fdec`的Git树尚未读取。下表不是确定404清单，历史sitemap缺席与dirty白名单缺席均不等于公开URL不存在。Codex必须在Keyboard accepted baseline的clean worktree中生成BASELINE_URL_DIFF及最终实际新增/修改/不变URL；`1e3fdec`仅作为production祖先参照。

## 首批差集规则

既有`/songs`、`/songs/easy`增强；另外六个Sheet页是原规划内的条件接入，不是新发明路由。只在source_groups、资源可用性与权利/内容门槛满足后加入当前真实路由注册表。未完成子任务保留原发布规则，不得擅自删主词或关掉验收来上线。

不新增`/songs/[slug]`、原创练习独立索引页、速度/手别/片段过滤索引页。Sheet到Songs使用同arrangement fragment；不用复制整篇学习文案。

## 64项完整表

| URL | 原页面/模板 | 原任务组 | 本批处理 | 历史sitemap / dirty白名单 |
|---|---|---|---|---|
| `/songs` | U003 / T15 | P002, P009, P014, P018, P022, P041, P042, P043 | 首批条件实施 | 有 / 有 |
| `/songs/easy` | U004 / T16 | P001, P006, P036, P037, P039, P040 | 首批条件实施 | 有 / 有 |
| `/tools/blank-sheet-music` | U036 / T19 | P079 | 仅复用协同 | 有 / 有 |
| `/songs/christmas` | U005 / T16 | P003, P008 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/challenging` | U006 / T16 | P004, P025 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/pop` | U007 / T16 | P005, P013, P026 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/classical` | U008 / T16 | P007, P015 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/easy-chords` | U009 / T16 | P010 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/anime` | U010 / T16 | P011 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/minecraft` | U011 / T16 | P012 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/rock` | U012 / T16 | P016 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/taylor-swift` | U013 / T16 | P017, P031 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/disney` | U014 / T16 | P019, P021 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/wedding` | U015 / T16 | P020 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/worship` | U016 / T16 | P023, P032 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/rap` | U017 / T16 | P024 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/piano-and-guitar` | U018 / T16 | P027 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/beatles` | U019 / T16 | P028 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/coldplay` | U020 / T16 | P029 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/country` | U021 / T16 | P030 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/jazz` | U022 / T16 | P033, P038 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/halloween` | U023 / T16 | P034 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/songs/undertale` | U024 / T16 | P035 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/sheet-music` | U025 / T17 | P047, P048, P060, P063, P070 | 首批条件实施 | 未列入 / 未列入 |
| `/sheet-music/easy` | U026 / T17 | P044, P110, P111 | 首批条件实施 | 未列入 / 未列入 |
| `/sheet-music/beginner` | U027 / T17 | P045, P106 | 首批条件实施 | 未列入 / 未列入 |
| `/sheet-music/christmas` | U028 / T17 | P046, P065 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/sheet-music/letter-notes` | U029 / T17 | P050, P051, P097 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/sheet-music/annotated` | U030 / T17 | P054, P061 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/sheet-music/lead-sheets` | U031 / T17 | P062, P071 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/sheet-music/pop` | U032 / T17 | P076, P112 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/sheet-music/disney` | U033 / T17 | P078, P087 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/sheet-music/classical` | U034 / T17 | P105, P107 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/sheet-music/jazz` | U035 / T17 | P108 | S3_TOPIC_COLLECTIONS | 未列入 / 未列入 |
| `/sheet-music/jingle-bells` | U037 / T18 | P049, P053, P074 | S2_REPERTOIRE | 未列入 / 未列入 |
| `/sheet-music/amazing-grace` | U041 / T18 | P057 | S2_REPERTOIRE | 未列入 / 未列入 |
| `/sheet-music/fur-elise` | U045 / T18 | P066 | S2_REPERTOIRE | 未列入 / 未列入 |
| `/sheet-music/happy-birthday` | U048 / T18 | P073, P083 | S2_REPERTOIRE | 未列入 / 未列入 |
| `/sheet-music/hot-cross-buns` | U052 / T18 | P091 | 首批条件实施 | 未列入 / 未列入 |
| `/sheet-music/jesus-loves-me` | U054 / T18 | P093 | S2_REPERTOIRE | 未列入 / 未列入 |
| `/sheet-music/mary-had-a-little-lamb` | U061 / T18 | P102 | S2_REPERTOIRE | 未列入 / 未列入 |
| `/sheet-music/abc-song` | U062 / T18 | P104 | S2_REPERTOIRE | 未列入 / 未列入 |
| `/sheet-music/ode-to-joy` | U064 / T18 | P114 | 首批条件实施 | 未列入 / 未列入 |
| `/sheet-music/silent-night` | U065 / T18 | P115 | S2_REPERTOIRE | 未列入 / 未列入 |
| `/sheet-music/twinkle-twinkle-little-star` | U066 / T18 | P116 | 首批条件实施 | 未列入 / 未列入 |
| `/sheet-music/let-it-go` | U038 / T18 | P052, P081 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/super-mario-theme` | U039 / T18 | P055, P084 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/thats-amore` | U040 / T18 | P056 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/black-parade` | U042 / T18 | P058 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/clocks` | U043 / T18 | P059 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/from-the-start` | U044 / T18 | P064 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/song-of-storms` | U046 / T18 | P068 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/pink-panther` | U047 / T18 | P072, P098 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/still-dre` | U049 / T18 | P075 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/carol-of-the-bells` | U050 / T18 | P077 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/edelweiss` | U051 / T18 | P088 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/in-my-life` | U053 / T18 | P092 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/all-of-me-john-legend` | U055 / T18 | P094 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/runaway-kanye-west` | U056 / T18 | P095 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/piano-man` | U057 / T18 | P096 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/someone-like-you-adele` | U058 / T18 | P099 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/song-of-healing` | U059 / T18 | P100 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/a-whole-new-world` | U060 / T18 | P101 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |
| `/sheet-music/easy-on-me` | U063 / T18 | P109 | PRESERVE_PAUSED_RIGHTS | 未列入 / 未列入 |

## 原任务正文和解除条件

各URL的purpose、required_delivery、original_release_conditions、原优先级与后续阶段在JSON和`content-data/expansion-roadmap.json`逐项保存。不得只按本表短标签验收。

17个未分配任务与2条历史线索保留在同一JSON，不能因为没有URL就删除，也不能本轮无批准造新页承接。

## Codex实际必须补的列

base_git_route_exists、base_http_observation（有授权且可访问时）、final_route_exists、change_type、indexability、canonical、sitemap、task_coverage、content_gate、asset_gate、deployment_status。生产树不存在但已批准且满足门槛的才是实际新增；存在则适配，不创建重复页。

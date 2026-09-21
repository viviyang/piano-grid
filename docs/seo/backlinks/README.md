# PianoGrid 外链台账与每日打法

2026-09-18 起用。这是执行记录，不是排名保证。

目标域名：`https://pianogrid.com`  
默认落地页：首页。不要为了「地址看起来不一样」而随机撒链。按来源页主题选一个相关任务页；同一来源只给一条 URL。

## 落地页规则

相关优先，不是越散越好。对方目录/产品页通常只能填一个网址，这时用首页。资源列表、教学页、和弦/音阶专题才改指向工具页。

| 来源在讲什么 | 落地页 |
| --- | --- |
| 产品目录、启动站、About、「这是什么网站」 | `/` |
| 工具中心、免费音乐工具列表 | `/` 或 `/tools` |
| 钢琴和弦、转位、chord finder | `/chords`；点名 C major 等才用 `/chords/c-major` |
| 按键选和弦、从音符反查 | `/chords/finder` |
| 音阶 | `/scales` |
| 琴键音符、labeled keyboard | `/keyboard-notes` 或 `/keyboard-notes/labeled` |
| 空白五线谱 / 打印稿纸 | `/tools/blank-sheet-music` |
| 入门读谱、教程 | `/guide/read-sheet-music` |

互动工具页可以、也应该进外链，条件是对方读者打开就能完成同一件事。`/chords`、`/chords/finder`、`/scales`、`/keyboard-notes`、`/tools/blank-sheet-music` 都算。不要把每个调的和弦详情页都拿去发外链。`/tools` 只是入口，列表里写「查和弦」时直接给 `/chords`。

不要做：同一篇文章要 5 个不同 URL；为了多样性链到不相关页；把未上线或未授权路由写进投稿。

## 文件

| 文件 | 用途 |
| --- | --- |
| [ledger.csv](ledger.csv) | 唯一台账。每条外链一行，改状态只改这里。 |
| [daily-log.md](daily-log.md) | 按日记录做了什么、卡在哪、下次先做哪条。 |
| [outreach-drafts.md](outreach-drafts.md) | 已核对页面后才写的投稿/联系草稿。 |

## 状态

| 状态 | 含义 |
| --- | --- |
| `LIVE` | 页面上能看到指向 pianogrid.com 的链接 |
| `UNVERIFIED` | 用户记录已发布，但今天没核到规范 URL 或正文 |
| `SUBMITTED` | 已发出，等待对方收录或回复 |
| `PREVIEW_READY` | 表单已预填，差登录/注册才能保存 |
| `NEEDS_LOGIN` | 必须用你的账号，我这边做不完 |
| `DRAFT` | 草稿已写，未发送 |
| `QUEUE` | 已核实值得做，还没动手 |
| `PAUSED` | 平台限制、封号或暂时不做 |
| `REMOVED` | 曾经有过，现在不再作为外链 |
| `SKIP` | 核实后不做（对方明确拒稿、垃圾目录、主题不配） |

`rel`：`dofollow` / `nofollow` / `ugc` / `unknown`。未打开源码核对前写 `unknown`，不把目录站的宣传文案当成已核实权重。

## 每日配额

每天 **1 次抄来源 + 1～3 条真实提交**。不够就停，不要用垃圾目录凑数。

1. 从竞品池里选 1 个站，用公开搜索找「链过它、还活着、主题相关」的来源页。
2. 只把可复制来源写入 `QUEUE`：对方还在维护、能投稿/能联系、和钢琴参考相关。
3. 当天提交 1～3 条，更新 `ledger.csv` 和当日 log。
4. 同一域名不连发。Nofollow 也可以做，但优先新域名。
5. 不买几十块几千条的外链包。不向明确写了「不接受未邀约产品投稿」的站硬推。

## 竞品池（抄来源，不是抄产品）

优先：`musicca.com`、`muted.io`、`pianochord.org`、`piano-keyboard-guide.com`、`skoove.com`  
歌曲/谱：`onlinepianist.com`、`8notes.com`  
新站/独立站：`muted.io` 更接近 PianoGrid 的阶段，优先抄它早期能发的渠道。

第一批已核实的可复制来源：

- [muted.io/music-tools](https://muted.io/music-tools/)：明确欢迎推荐免费、免登录、可立即用的工具。2026-09-18 已通过 [联系表](https://muted.io/contact/) 提交。
- [AlternativeTo Musicca](https://alternativeto.net/software/musicca/)：可把 PianoGrid 加为同类替代。2026-09-21 用户已提交。
- [Uneed 提交页](https://www.uneed.best/submit-a-tool)：2026-09-21 该产品记录已用过免费 launch，弹窗只剩 $14.99 / $29.99。不买，标 SKIP。
- [Colin Dorman 理论资源页](https://colindorman.com/horn/free-online-resources-for-learning-music-theory/)：已列 Musicca。课报名表不适合投稿，草稿待你发。
- [Schooltools](https://www.schooltools.at/kontakt/)：明确欢迎缺漏工具建议，已列 Musicca。2026-09-18 已提交。
- [MusicianStack](https://musicianstack.com/submit/)：明确欢迎缺失的音乐工具。2026-09-18 已提交。
- [Chisnallwood Useful Music Links](https://chisnallwoodmusic.org.nz/useful-music-links/)：已列 muted.io 与 Musicca。学校邮箱，草稿待你决定。
- [Rolando Gomez Learning Resources](https://learn.rolandojgomez.com/submit/)：明确欢迎免费乐理与 web tools。2026-09-18 已提交。
- [Acoustic Bridge piano resources](https://acousticbridge.com/piano-resources/)：已列 pianochord.org。通用联系表，草稿待你决定。
- [SaaSHub muted.io](https://www.saashub.com/muted-io)：已列 muted.io。公开投稿页已提交，见下一行。
- [Launching Next](https://www.launchingnext.com/submit/)：已列 muted.io scales 工具并公开邀稿。2026-09-18 已免费提交，排队号 `151942`。不买 Fast-Track。
- [Music Industry Toolkit](https://themusicindustrytoolkit.com/request-something-1)：已列 Muted.io 并公开邀创作者投稿。2026-09-18 已提交。
- [Building Beats Toolbox](https://buildingbeats.org/toolbox/category/Music+Production)：已列 Muted.io，顶部写 Submit a tool 到 `info@buildingbeats.org`。草稿待你发。
- [Music Tech Hub Free Browser Based Apps](https://musictechhub.org/free-browser-based-apps/)：已列 Musicca 与 Muted.io Piano Chords。2026-09-18 已提交；创始人 Bradley 当日回复会放到 useful music apps for educators 页，需几周。尚未 LIVE。
- [SaaSHub 公开投稿](https://www.saashub.com/services/submit)：已列 muted.io。2026-09-18 已免费提交。2026-09-20 公开页 `/pianogrid` 为 Pending approval。未买 $75。
- [GitHub Useful-Free-Online-Tools-and-Sites](https://github.com/J0rgeSerran0/Useful-Free-Online-Tools-and-Sites)：已列 muted.io 鼓机工具和 8notes piano chord chart。PR 需你登录。
- [PersonalWebsites.org](https://personalwebsites.org/submit)：已列 muted.io。2026-09-18 REJECTED。2026-09-21 用户废弃（流量不足）。
- [GitHub thekeypals/useful-links](https://github.com/thekeypals/useful-links)：已列 Musicca，Tools 区已用 muted.io 计算器。README 欢迎开 issue。需你登录。
- [Startupanz Submit Your Startup](https://startupanz.com/submit-my-startup-profile/)：2022 已列 muted.io。2026-09-21 已免费提交。不要买 $35 Spotlight。
- [MTNA Websites for Kids](https://www.mtna.org/Websites_for_Kids.html)：已列 Musicca。页面欢迎分享网站。草稿待你发 `mtnanet@mtna.org`。

明确不做：

- [Midnight Music](https://midnightmusic.com/contact/)：页面写明不接受未邀约产品投稿。记 `SKIP`。
- TinyLaunch：dofollow 要求在 PianoGrid 放徽章回链。
- GitHub awesome-music：贡献规则要求 tests，不硬提 PR。
- Startup Fast：卖外链包式目录。
- Nova Music：邀的是打印教案 PDF，不是网站工具。
- Producer Society：联系页是咨询通话。
- Plugin Nation：博文链过 muted.io 五度圈，但是 VST 插件站，没有联系页。
- Hip Hop Makers：8notes 和弦表合集，但联系页写明不评测 software。
- Try It Randomly / MusicianGoods：评测或联盟合集，没有邀稿口。
- Berklee Piano LibGuide：馆藏增补邮箱，不是网站工具列表。
- GitHub Free-MusicStuff：个人备忘录，无邀稿。
- BetaList：已列 muted.io，但现在只有付费投稿。
- GitHub ray-oh/sheet-music：个人笔记，无邀稿。
- FlowingData：写过 muted.io，但 Contact 是投稿建议给可视化博客，不当产品冷推。
- Uneed：该账号这条产品记录已用过免费 launch，只剩付费插队。
- PersonalWebsites.org：用户确认流量不足，废弃。

## Semrush 要不要给

**不需要。** 哥飞式抄作业要的是「谁已经链过竞品」，不是关键词搜索量。

仓库里现有的 Semrush 文件在 `_handoff/hords-seo-evidence-2026-09-18/`，是和弦页的关键词量，帮不了找外链来源。

公开搜索 `"musicca.com" classroom resources` 这类查询已经够用。如果你以后愿意加速，只导出这 4 个竞品的 **Backlinks / Referring domains** CSV 即可，不要导出 Keyword Magic：

1. `musicca.com`
2. `muted.io`
3. `pianochord.org`
4. `piano-keyboard-guide.com`

有用的列：来源 URL、来源标题、链到哪条竞品页、dofollow/nofollow、来源域名。有 CSV 就放进 `_handoff/` 或贴到对话里；没有也能继续按日找。

## 判断一条来源值不值得跟

同时看这几项，缺证据就标未核实，不编权重：

1. 来源站还活着、能被索引
2. 来源页主题和落地页相关（钢琴/乐理/教学资源，不是随机目录）
3. 有真实投稿或联系路径
4. 锚文本自然，不堆词
5. 链接在正文或资源列表里，不在页脚农场
6. 这是一个新域名，而不是已经链过我们的同一站再发一条

## 你需要登录才能完成的事

这类不要让我伪造账号。当天把 URL 和草稿准备好，你花几分钟点完成：

- GitHub 个人资料 Website 已设为 `https://pianogrid.com`（2026-09-21）。Profile README 已有 PianoGrid。保持同步。
- Uneed：该产品记录已用过免费 launch。不要买 Fast-track / Skip the line。这条跳过。
- AlternativeTo：2026-09-21 已提交。过几天核产品页；若当时只加了 Musicca，再把 PianoGrid 加成 muted.io 的 alternative。
- PersonalWebsites.org：2026-09-21 用户废弃。不再 Edit。
- Music Tech Hub：若还没回 Bradley，用 outreach-drafts.md 定稿点 Reply。几周后再核 educators 页。
- Startupanz：2026-09-21 已免费提交。等 hello@ 回执，不要买 $35。
- SaaSHub：https://www.saashub.com/pianogrid 已是 Pending approval。可选登录认领，不必付费，不要重提。
- GitHub thekeypals/useful-links、Useful-Free-Online-Tools、awesome-music-production：登录后按 outreach-drafts.md 开 issue / PR。
- MTNA：用 outreach-drafts.md 草稿发 `mtnanet@mtna.org`。

## 联系身份

对外统一用：

- 名：Weiwei Yang
- 站：https://pianogrid.com
- 邮箱：hello@yangweiwei.dev
- 个人站：https://yangweiwei.dev

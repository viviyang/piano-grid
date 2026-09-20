# 16-Page Fix Result

Status: READY_FOR_REVIEW  
Base: `codex/final-integration` @ `8dbf94ddfcc1067036898998166c723833fd03e0`  
Evidence: `checks/reviews/16-page-fix/live-validation.json`  
Local verify origin: `http://127.0.0.1:3019` (production `next start` after `npm run build`)

## 已完成

阶段 A
- 10 个 chord 页按目标 TDH 对齐；G7 Title/H1 已正确，保留。
- 四个受保护 minor Title 去掉 Fingering；f-minor Title 去掉不实 PDF 堆砌，不增加指法承诺。
- 相关区标题改为 `Related Chords and Practice`；by-key 链接文案为 `Browse chords by key`，未发明 `/chords/by-key/...` 子 URL。
- 属七理论句改为 `The {X}7 chord combines a major triad with a minor seventh.`
- 用户可见文案去掉 N2C 代号；Sources 摘要改为 `Sources`（默认消费者仍为 `Sources and scope`）。
- 指法提示改为 `Finger numbers are not included...`；旧 fingering anchor 保留。五个 minor 的用户可见 H2 改为 `Playing the … Chord`，不再使用 fingering 标题。

阶段 B
- Guide：补 C4 高低音谱对照、4/4 时值与休止、拍号/变音、大谱表；原 FACE、四小节练习、PDF 入口保留。
- `/songs`：Title 去掉未实现 Style 筛选；入门 3 卡改为紧凑 teaser；完整目录保留 6 个独立版本。
- `/songs/easy`：3 个入门卡 → Twinkle 计划 → 其余 featured → 50 曲紧凑歌集；工程 firstCheck / numberQueryPolicy 仅展示层改写，未改 master JSON。
- Sheet easy/beginner：比较/第一首选择前置；锁定 originals 从用户视图隐藏，gate 未翻转；帮助链到 Guide 与 labeled。
- Labeled：Title/H1 已是目标，保留；`White-Key Names` 只保留一个 H2；其下 H3 改为 Repeating letter names / Black Keys: Sharps and Flats / Find Middle C。打印专用块屏幕 `display:none`。

阶段 C
- 16 页生产 HTML/DOM TDH 与 35 个 voicing 状态、Playwright 交互、PDF 字节、共享对照页均有实测记录。

## 逐页结果

| URL | Title/H1 | content fix | validation | remaining issue |
|---|---|---|---|---|
| `/chords/b-7` | Title+H1 改为短符号 B7 | 简介/相关/Sources/理论句 | live metadata+4 voicings+play/build/PDF | PDF 正文仍写 Dominant Seventh 全称，未重生成 |
| `/chords/a-7` | Title+H1 改为 A7（不以 6 日缓存为准） | 同上 | 同上 | 同上 |
| `/chords/g-7` | Title/H1 **ALREADY_OK** | Description/intro/相关/Sources 已对齐 | 同上 | PDF 未重生成 |
| `/chords/d-7` | Title+H1 改为 D7 | 同上 | 同上 | 同上 |
| `/chords/e-7` | Title+H1 改为 E7 | 同上 | 同上 | 同上 |
| `/chords/f-minor` | Title 改为 Notes & Inversions | 去掉 Fingering 承诺；H2 改为 Playing the F Minor Chord | live+3 voicings+PDF | PDF 未重生成 |
| `/chords/b-minor` | Title 去掉 Fingering | 同上；H2 改为 Playing the B Minor Chord | 同上 | PDF 标识为 B Minor Piano Chord |
| `/chords/d-minor` | Title 去掉 Fingering | 同上；H2 改为 Playing the D Minor Chord | 同上 | 无 |
| `/chords/e-minor` | Title 去掉 Fingering | 同上；H2 改为 Playing the E Minor Chord | 同上 | 无 |
| `/chords/g-minor` | Title 去掉 Fingering | 同上；H2 改为 Playing the G Minor Chord | 同上 | 无 |
| `/guide/read-sheet-music` | Title/H1 **ALREADY_OK** | 补节奏/休止/拍号/大谱表；Description 含 rests | 新 H2、rest 示例、C4 对照、练习揭晓、PDF `%PDF-` | 人工听音无关；PDF 教学全文逐页审阅 NOT_RUN |
| `/songs/easy` | Title/H1 **ALREADY_OK** | 去重、歌集压缩、firstCheck/政策展示层改写 | 50 曲名、1 个出版社按钮、计划在页 | catalog 搜 Twinkle=0（teaser 数据，不是 6 项 catalog） |
| `/songs` | Title 改为 Find Your Next Piece | 紧凑 teaser + 完整 6 版本目录；去掉 Style 承诺 | 搜索控件可用；相关对照通过 | Twinkle 不在 catalog 数据集 |
| `/keyboard-notes/labeled` | Title/H1 **ALREADY_OK** | White-Key Names 仅一个 H2；H3 为真实子主题 | print-only 屏幕隐藏；资料 PDF 200 | 无 |
| `/sheet-music/easy` | Title/H1 **ALREADY_OK** | 比较前置；无 ledger 文案 | 无锁定 originals；帮助入口有效 | 无 |
| `/sheet-music/beginner` | Title/H1 **ALREADY_OK** | 第一首选择前置；隐藏未发布练习卡 | 同上 | 无 |

## 验证

- 16 页 metadata 与 H1：16/16（`scripts/check-16-page-live.mjs`，base `http://127.0.0.1:3019`）
- Chord 状态：35/35（seventh 5×4 + minor 5×3）
- 资源/链接：10 个 chord PDF 均为 `%PDF-` 且非 HTML；Guide PDF 与 labeled 4 份参考 PDF 200；sitemap 含全部 16 URL；robots 仍 `Allow: /`
- 移动端：代表页 1440 与 390 无整页横向溢出（键盘自身滚动除外）
- 共享回归：`/chords/c-major` 相关标题未改为 Related Chords and Practice，Sources 仍为 `Sources and scope`；`/chords/c-7` 相关未改写；`/sheet-music` hub 仍保留 `Preserved approved mapping`（16 页外）
- Playwright：ran。B7/Bm 点击 Play 后状态为 `Playing chord…`；Build 错误/揭晓反馈通过；Guide 揭晓答案通过；easy/beginner 无 `arr-pg-*` 锁定卡
- 命令结果：
  - `node scripts/check-16-page-fix.mjs` → 172/172 passed
  - `node scripts/check-16-page-live.mjs` (`PIANO_BASE_URL=http://127.0.0.1:3019`) → 327 passed, 0 failed
  - `npm run check` → Foundation 565 passed；`tsc --noEmit` passed；CSS check passed
  - `npm run build` → 成功（默认 `.next`）
- `curl` `/songs/easy`：可见 HTML 无 `Do not copy the page` / `source ledger`；有 50 曲政策展示句

NOT_RUN
- 人工听辨音高（浏览器播放事件 ≠ 音高验收）
- 系统打印预览对话框
- 读屏走查
- Google Search Console / 索引结论
- Guide PDF 四页教学正文逐句审阅（仅确认文件是 PDF 且可打开；未把 FACE/休止写进该 PDF）

## 范围

改动文件
- `src/lib/page-fix-16.ts`（新增）
- `src/lib/seo-editorial.ts`
- `src/lib/chord-detail-seo-copy.ts`
- `src/components/chords/detail-page.tsx`
- `src/components/chords/fingering-guide.tsx`
- `src/components/guides/pages.tsx`
- `src/components/guides/guides.css`
- `src/components/songs/pages.tsx`
- `src/components/songs/edition-cards.tsx`
- `src/components/songs/resource-card.tsx`
- `src/components/songs/songs.css`
- `src/components/songs-sheet/external-arrangement-card.tsx`
- `src/components/sheet-music/pages.tsx`
- `src/components/sheet-music/sheet-music.css`
- `src/components/keyboard-notes/pages.tsx`
- `src/components/keyboard-notes/labeled-experience.tsx`
- `src/components/keyboard-notes/keyboard-notes.css`
- `scripts/check-16-page-fix.mjs`（新增）
- `scripts/check-16-page-live.mjs`（新增）
- `checks/reviews/16-page-fix/`（新增证据）

未纳入本轮交付、仓库里原已存在的未跟踪项：`.next-*`、旧 deploy log、`scripts/debug-b06-*.mjs`、`scripts/tmp-backup-t11.mjs`、`scripts/check-16-page-models.ts`（未使用）。

16 页外输出影响
- `/chords/seventh` 网格里，这五个属七名称跟随已有 `editorialHeading` 使用短 H1（如 `B7 Chord`）。这不是新 URL，也不是第二套引擎。
- 共享组件默认行为未改：非 16 页 chord 仍显示 `Sources and scope`；Sheet hub 工程台账文案仍在。

URL / canonical / robots / sitemap URL 集合：保持。canonical 为 `https://pianogrid.com{path}`。  
原有权限逻辑：保持。`arr-pg-*-v1` 仍 `public_asset_enabled: false`；未解锁未发布资源。  
未改 hashed master JSON，未新增依赖，未新建公开路由。

## 待处理

- 人工听音、打印预览、读屏、GSC：NOT_RUN，需具名验收。
- `/songs` catalog 搜索 Twinkle 为 0：Twinkle 三个入门版本在 teaser，不在 6 项 catalog。未把 teaser 编进 catalog 以免重复。
- Chord PDF 未重生成；G7/Bm 等文件内部标题仍可能是全称。

无实现阻塞项。

## 发布状态

- 未 commit
- 未 push
- 未 deploy

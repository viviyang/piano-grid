# PianoGrid Songs + Sheet Music v2.1 — RESULT

## 结论

[已核实] 本轮所有不依赖新增许可、原谱、具名专业审核、真人听音、真机或实体打印的实施已完成。8 个首批 URL 在最终本地 production build 中均为 200、具有准确 canonical 与 `index,follow`，并进入本地 sitemap。未部署，所以线上仍是 2 个 Songs URL 为 200、6 个 Sheet Music URL 为 404。

[已核实] 三首命名歌曲仅接入其确切外部版本；三个 PianoGrid 原创练习仅完成非公开 staging 数据、门控与播放器能力代码。两组 ID、来源和完成状态分开记录，没有互相冒充。

[已核实] 包内要求的独立只读复验已完成三轮：首轮提出 4 个 P1 与 1 个 P2，二轮提出 2 个 P2，均已修复；末轮确认无剩余 P0/P1 或业务 P2。末轮唯一证据刷新问题已通过更新本文件、build validation 与 handoff 解决，未再修改业务代码。

## Git 与实际文件差集

- Base tree / end `HEAD`：`fb842864dafb35763c51a5b0a2bb62c62b5efc0d`
- Worktree：`C:\Users\Admin\Documents\viviyang_github\pianogrid-songs-sheet-v2`
- Branch：`codex/songs-sheet-v2`
- 状态：[已核实] 未提交；未 push；未部署。
- [已核实] `git status --porcelain` 有 31 个顶层状态项；tracked diff 有 19 个文件，另有新增目录。
- [已核实] 复制到 `docs/content/songs-sheet-v2/` 的完整只读复验包有 136 个文件；24 个本地资产全部位于非公开 staging 路径。
- [已核实] 新增 6 个显式 Sheet Music page entry、7 个 Sheet/Songs 共用组件文件、4 个数据/合约/播放器 lib 文件、2 个专项检查脚本。
- [已核实] 专项证据目录有 46 个文件，其中 42 张截图；最终响应式矩阵覆盖 8 URL × 320/390/1440。

主要实现差集：

- `src/app/sheet-music/**`：6 个显式路由，无 `[slug]` 批量放开。
- `src/components/sheet-music/**`：目录、版本页、保留内容、响应式和 print 样式。
- `src/components/songs-sheet/**`：确切版本卡、严格 share/restore、外部版本与锁定原创的分离、受门控原创播放器。
- `src/lib/songs-sheet-*`：包内 catalog/page patch/learning card 数据读取与合约。
- `src/lib/original-exercise-playback.ts`、`src/lib/a-minor-audio.ts`：复用现有 Web Audio，加入单 owner、片段、速度、音量和取消语义。
- `src/components/songs/**`、`src/lib/song-*`：在保留原 Songs 内容的基础上增加 3 个确切外部版本，并兼容两种 first-check 字段。
- `src/lib/site-routes.ts`、`src/lib/seo-editorial.ts`、`src/lib/integration-content.ts`：6 路由、导航、metadata、首页真实入口与 sitemap 注册。
- `next.config.ts`：从 production file trace 明确排除 staging 资产。
- `scripts/check-songs-sheet-v2.ts`、`scripts/check-songs-sheet-browser.mjs`：数据、门控、URL、SEO、响应式、回归和无 JS 验收。
- `scripts/check-integration-*.mjs`：把旧夹具校准到 accepted Keyboard 导航与本批 Songs 标题；未掩盖仍存在的历史基线失败。

## 8 页逐页结果

| URL | 本地 build | 本轮完成 | 未完成/受阻 |
|---|---:|---|---|
| `/songs` | 200 | 保留原 6 版块；加入 3 个确切外部版本；新版 title/intro | 本站命名曲谱面/音频未获供给与许可 |
| `/songs/easy` | 200 | 保留 9 个精选版本和 50 条合集；加入 3 个确切外部版本与 share restore | 同上 |
| `/sheet-music` | 200 | 新目录页、保留 7 个原外部资源、6 个首批入口 | 本站原创资产仍锁定 |
| `/sheet-music/easy` | 200 | 新分类页、保留原资源与首次检查信息 | 本站原创资产仍锁定 |
| `/sheet-music/beginner` | 200 | 保留 P106 Amazing Grace 证据文案；显示原创未公开说明 | P106 人工逐项核验、原创发布门槛 |
| `/sheet-music/hot-cross-buns` | 200 | 只显示 `arr-ext-0a05b7954f5256` 的确切外部版本 | 本地 score/audio 为 null；无本站播放/打印 |
| `/sheet-music/twinkle-twinkle-little-star` | 200 | 只显示 `arr-ext-c3a78b0c5cb213`；保留独立 letter tutorial | 本地 score/audio 为 null；无本站播放/打印 |
| `/sheet-music/ode-to-joy` | 200 | 只显示 `arr-ext-a60b8d92c5a325`；保留已核 D major，不推导 C/F/G | 本地 score/audio 为 null；无本站播放/打印 |

## 三首命名曲（外部版本）

- [已核实] Hot Cross Buns：`arr-ext-0a05b7954f5256`
- [已核实] Twinkle, Twinkle, Little Star：`arr-ext-c3a78b0c5cb213`
- [已核实] Ode to Joy：`arr-ext-a60b8d92c5a325`
- [已核实] 三条记录均保持 `external_reference`，本地 score/audio 均为 null；页面只提供 HTTPS provider link 与确切版本选择/分享，不出现本站 Play/Print/Download。

## 三个原创练习（非公开 staging）

- [已核实] `arr-pg-step-and-hold-v1`
- [已核实] `arr-pg-left-hand-answer-v1`
- [已核实] `arr-pg-one-hand-at-a-time-v1`
- [已核实] 24 个文件 hash/归属检查通过，但 `runtime_grants=[]`、asset state 为 staging，未放入 `public`，未进入客户端静态文件、source map 或 deployment NFT trace。
- [已核实] 播放器代码支持 Play/Stop、音量 0–100、50/75/100、all/bars-1-2/bars-3-4，切参数先取消；未通过发布门槛时不渲染公开控件。
- [已核实] 没有把它们标成命名歌曲版本、teacher-reviewed 或真人验收通过。

## 全范围去向

- [已核实] 包内保留 64 个规划项：22 Songs、41 Sheet Music、1 Tool。
- [已核实] 首批处理 8 页；`/tools/blank-sheet-music` 只复用现有能力，不重建。
- [已核实] 其余 55 模块页没有误公开：36 个常规后续、19 个 rights-paused。
- [已核实] 265 个既有 occurrence、17 个未分配任务、2 条历史线索均保留在包内数据；专项检查覆盖这些计数。

## 实际命令与退出状态

| 命令 | 结果 |
|---|---|
| `npm ci` | exit 0；49 packages；0 vulnerabilities；无版本升级 |
| `python qa/check_package.py --check-manifest` | exit 0；729 checks；manifest verified |
| `node --test qa/gates.test.mjs` | exit 0；30/30 |
| `node --test qa/contracts.test.mjs` | exit 0；15/15 |
| `python qa/check_music.py ...` | 未执行成功；当前 Python 缺少 `mido`，未安装依赖 |
| `npm run typecheck` | exit 0 |
| `npm run check:css` | exit 0 |
| `npm run check:keyboard-completion` | exit 0；40/40 |
| `npm run check:songs-sheet-v2` | exit 0；78/78 |
| `node scripts/check-songs-sheet-browser.mjs` | exit 0；137/137 |
| `npm run build`（`.next-songs-sheet-v2`） | 最终 exit 0；210 static pages；6 个 Sheet routes 均生成。此前默认 11 workers 的一次尝试因 Windows worker timeout 失败；用 4 workers 的验证配置重跑通过 |
| staging 构建泄漏检查 | `public` 0、client static 0、source map 0、NFT trace 0、prerender HTML 0；验证目录随后已删除 |
| `git diff --check` | exit 0 |
| `npm run check:foundation` | exit 1；563 pass / 2 fail；两项为 accepted Keyboard baseline 已存在的旧 whitelist 断言 |
| `node scripts/check-integration-data.mjs` | exit 1；129/23；23 项为 accepted baseline 中旧 protected-source hash 夹具 |
| `node scripts/check-integration-production.mjs` | exit 1；162/24；剩余为历史 metadata title 与首页插图断言 |
| `node scripts/check-integration-batch.mjs` | exit 1；309/27；同类历史 title/home/tools 夹具，不是本批专项失败 |

## 验证边界

[已核实] 自动浏览器检查覆盖 320、390、1440、无 JS、canonical/robots/sitemap、share 严格恢复（含显式默认 `speed=100` 与 clipboard 拒绝 fallback）、后续路由 404、Songs 9/50 保留、P106 文案、Twinkle 额外教程、Ode 不推导和弦，以及 Chords/Scales/Keyboard smoke。

[已核实] 人工真机、读屏、真人听音、实体打印、具名专业乐谱审核、法律/权限审批尚无证据，因此不标 PASS。详见 `MANUAL_ACCEPTANCE.md` 与 `RIGHTS_AND_CONTENT_BLOCKERS.md`。

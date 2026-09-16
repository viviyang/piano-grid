# PianoGrid 产品升级 S0 Intake

日期：2026-09-15  
执行范围：仅 `S0 → S1`；未执行“样板批准后”、B04–B08、部署、推送或新增公开 URL。

## 1. 仓库、分支与接管

- [已核实] 实际写入仓库根目录：`C:\Users\Admin\Documents\viviyang_github\pianogrid-final-integration`。
- [已核实] 当前分支：`codex/final-integration`。
- [已核实] 取证时 HEAD：`0eac35156271095c35cf08680f7c6314a587cb74`；同一提交也是当时的 `origin/main`。
- [已核实] `fb84286`（Keyboard completion）和 `37a8812`（Songs/Sheet release）都是当前 HEAD 的祖先；当前树已包含它们，不需要回退到历史 `main@1e3fdec`，也不需要重复合并。
- [已核实] 当前集成树在本任务开始写入前是干净的；旧目录 `C:\Users\Admin\Documents\viviyang_github\piano` 位于 `codex/chords-b1@fad3caa` 且有大量既有未提交项，本任务未在那里写业务代码、未 stash/reset/clean。
- [已核实] Codex 任务列表检查时，没有另一个处于 active 状态的 PianoGrid 写入任务；本任务因此取得该集成树的唯一写入权并进入 S1。
- [已核实] 当前公开路由注册表 `src/lib/site-routes.ts` 有 205 条路由；本样板没有修改注册表、sitemap 或 canonical。

## 2. 当前未提交文件归属

以下为本任务创建或修改：

- `src/components/keyboard-notes/practice-sample.tsx`：S1 可点击主题样板。
- `src/components/keyboard-notes/lookup-experience.tsx`：仅在环境变量与查询参数双重满足时挂载样板。
- `src/components/keyboard-notes/keyboard-diagram.tsx`：增加可选的视觉标签开关；无障碍名称保持不变，默认行为不变。
- `src/components/keyboard-notes/keyboard-notes.css`：样板状态样式，只使用现有主题变量和按钮类。
- `checks/product-upgrade-2026-09-15/`：本轮 baseline 与 S1 浏览器截图。
- `docs/product-upgrade/2026-09-15/s1-keyboard-practice/`：本轮四份交付文档。

[已核实] `tsconfig.json` 的工作区哈希与 `HEAD:tsconfig.json` 相同；Next 开发服务器触碰了文件时间/行尾，因此 Git 仍可能显示工作树标记，但没有内容差异。  
[已核实] `.next-s1-baseline/` 是本任务早期隔离开发服务器的本地缓存；不属于产品或交付内容。删除命令被当前执行策略拒绝，因此保留为未跟踪缓存，未把它计入实现成果。

## 3. 取证来源

- [已核实] 执行包：`C:\Users\Admin\Documents\viviyang_github\piano\docs\product-upgrade\2026-09-15\00_先读我_使用顺序.md`、`01`、`02`、`03`、`04`、`06`、`09`、`11`、`12` 与 `07_CODEX_MASTER_PROMPT.md`。
- [已核实] 最新项目交接：`FINAL_INTEGRATION_RESULT.md`、`keyboard-completion/RESULT.md`、`songs-sheet-v2/RESULT.md`、`songs-sheet-v2/INTEGRATION_HANDOFF.md`、`docs/release/release-readiness.md`。
- [已核实] 范围与页面规则：工作区 `../docs/page-rules.md`、`docs/seo/TDH-RULES.md`、项目 `AGENTS.md`。
- [已核实] 主题依据：`docs/design/design-system.md`、`docs/design/inspection.md`、`docs/design/tokens.json`、`src/app/globals.css`、`src/app/tokens.css`、`src/app/foundation.css`。
- [已核实] 产品代码：Keyboard 的 content/resolution/practice/layout/staff/audio/share 代码，Chords 与 Scales 的 matcher/practice/event 代码，以及路由注册表。
- [已核实] 真实浏览器证据：Codex in-app Chromium，1440×1000 与 390×844 两组视口，实际点击而非静态 mockup。

## 4. 当前 10 题练习事实

- [已核实] `/keyboard-notes` 已经有 `Find this note`，页面加载后直接处于 `Question 1 of 10`；不是从零新增 10 题练习。
- [已核实] 现有练习复用 canonical keyboard layout，使用 deterministic generator，支持 Level 1–3 与 exact-MIDI 判定。
- [已核实] 现有每题第一次选键后即锁定：答对或答错都会出现 `Next`；答错后不能在同题继续尝试。
- [已核实] 现有没有独立开始页、无不计分例题、无提示、无揭示状态。
- [已核实] 现有结束态只显示正确数 `/10` 并可重开；不区分首答、辅助完成与揭示，也不生成待复习音符集合。
- [已核实] Lookup/Chart/Labeled 已有分享状态恢复；当前练习本身没有“同题 preset”分享与接收入口。

## 5. 已存在、正在做、真正缺口

### REUSE_VERIFIED

- [已核实] Keyboard pitch identity、88/61 键布局、异名同音拼写与 exact MIDI 判定。
- [已核实] `KeyboardDiagram` 的键盘几何、键盘操作、焦点样式、ARIA 名称与横向滚动。
- [已核实] 现有 10 题生成器、三等级题池与题目顺序可重复性。
- [已核实] Keyboard staff 映射、音频播放/停止、lookup/share restore、print/PDF 资产链路。
- [已核实] Chords matcher；最新集成交接记录 Chords final 369/0、N2D 188/0。
- [已核实] Scales checking/pulse；最新集成交接记录 scale final 670/0、completion contract 9/0。
- [已核实] 系统字体、颜色、间距、圆角、焦点与 `am-button` 组件语言。

### 真正 GAP

- [已核实] 练习开始/例题状态。
- [已核实] 答错后同题重试以及与之匹配的具体方向反馈。
- [已核实] 提示与揭示；揭示不得计作答对。
- [已核实] `首答 / 辅助完成 / 揭示` 结果分桶与待复习音符列表。
- [已核实] 只复练本轮待复习音符。
- [已核实] 同题 preset 的练习分享序列化、接收入口、无效 preset 回退。
- [已核实] Keyboard 练习专属事件 owner/adapter；当前只有 Chords 与 Scales 的本地事件模块。

### 本轮没有接管的范围

- [已核实] B04–B08、首页 Hero、Chord/Scale 引擎、账户、云成绩、排行榜、streak、MIDI、麦克风评分、付费与广告均未进入本轮。

## 6. 基线与本轮验证

- [已核实] `npm run typecheck`：PASS。
- [已核实] `npm run check:css`：PASS。
- [已核实] `npm run check:keyboard-completion`：40 passed / 0 failed。
- [已核实] S1 浏览器流程：合法固定题序、错误重试、提示、揭示、结果分桶、3-note review、分享接收与无效 preset 回退均已实际操作通过。
- [已核实] 默认 `/keyboard-notes` 在环境变量开启但没有 `?practice-sample=1` 时仍显示原有 `Find this note`，证明样板没有替换默认公开体验。
- [已核实] 本轮浏览器控制台 error 日志为空。
- [已核实] `npm run build` 没有通过：编译与 TypeScript 完成，静态生成显示 210/210；随后未改动的 `/chords/e-major` 在导出阶段连续 3 次超过 60 秒，进程以 1 退出。本轮没有重复执行同一路径，也不把它写成通过。
- [推断] 该 build 失败与 S1 Keyboard 变更没有直接代码归属关系，因为本轮 diff 未触及 `/chords/e-major`；但在成功复跑或定位前，不能把完整构建状态标成已通过。

## 7. 仍未验证

- [已核实] 尚未执行真机 iPhone Safari、Android Chrome、NVDA/VoiceOver、物理键盘全流程、打印、听音与具名音乐教育/无障碍专业审阅。
- [已核实] 浏览器的系统原生 Share sheet 未在真机执行；样板验证了分享参数与接收状态，不声称已验证各 OS 分享面板。
- [已核实] 尚未批准把 S1 状态机替换进默认产品；当前只存在双门隔离样板。
- [已核实] 完整 production build 仍未通过，具体阻塞为 `/chords/e-major` 导出超时。
- [已核实] 没有执行部署、推送、搜索平台提交或生产更改。

# PianoGrid 当前交接

生成时间：2026-09-15（Asia/Shanghai）  
用途：Scales 批次收工后的交接；不是新的产品开发、发布或验收签发。

## 读取边界与版本

- [已核实] 指定的 `docs/pianogrid-execution-v2/01_MASTER_CONTROL.md` 在当前工作树及相邻项目目录中未找到；本包不伪造该文件。
- [已核实] 交接生成时 HEAD 为 `bdcc2e134b59c109fbdc7d78434474ddca8eb382`，分支为 `codex/chords-b1`。
- [已核实] 工作树不是 clean。完整 dirty 文件清单、捕获时间和关键源文件 SHA-256 在 `handoff/worktree/`；因此 HEAD 不能代表全部当前工作树。
- [已核实] 未提交、未推送、未部署、未改业务代码、未改依赖。本交接只新建本目录及根目录 ZIP。

## A. Scales 实际状态

### 已交付范围

- [已核实] 三页：`/scales`、`/scales/c-major`、`/scales/a-minor`；中心页 60 个对象，C/A 固定详情，数据、可见音符、MIDI、谱表、键盘、播放、打印及练习取自统一已解析选项模型。
- [已核实] 支持 major、natural minor、harmonic minor、classical melodic minor，运行时 authoring 仅支持 T11/T12；T13/T14 与其余 23 条保留记录不是已实现/已发布的渲染契约。
- [已核实] 单手、单八度练习支持 40–120 BPM、1/2 notes per beat、四拍 count-in、1/2/4 passes、暂停/停止与自报；没有 MIDI/麦克风评分、双手同步或自动补指法。
- [已核实] 历史 Scales STEP 2 RESULT 为 `PASS_WITH_NOTES`。其当时检查：`npm run check`、Scales data 621/621、focused data/contract 670/670、production R01–R06/V09/V10 51/51、Scales regression 338/338、PDF 124/124、隔离生产构建均 PASS。完整原文见 `handoff/results/SCALES_RESULT.md`。

### 未完成与人工待测

- [已核实] 未执行：人耳听音、真机、完整读屏、实体打印、PDF tags/accessibility、谱面刻写专业审阅、具名钢琴教师审阅。
- [已核实] A minor 的部分下行 fingering 仍为 `null`，产品正确显示 notes only；不得通过反转或借用其他行补齐。

### 部署状态

- [已核实] `SCALES_RESULT.md` 写明其 2026-09-11 交付时尚未部署。
- [已核实] 后续生产证据：2026-09-14 已将 commit `1e3fdecd6e9426999689df361a4f47aa2d378848` 发布到 `https://pianogrid.com/`，HTTP 200；同日技术 SEO 审计读取 sitemap 173 URL，结论 `PASS_WITH_NOTES`、0 FAIL。
- [已核实] 当前这个 dirty 工作树不是上述 production commit；没有证据可将其逐字节等同于线上。

### 可复用入口

- `src/lib/scale-types.ts`、`scale-authoring.ts`、`scale-content.ts`、`scale-page-copy.ts`、`scale-practice.ts`、`scale-resolver.ts`：authoring、运行时校验/解析、模型与练习。
- `src/components/scales/`：中心、详情、reference、learning、audio 与 CSS。
- `src/components/keyboard-notes/{keyboard-diagram,staff-diagram}.tsx`：Scales 已复用的谱表与键盘呈现。
- [已核实] 精确 authoring 合同、样例、命令与结果已在既有 Scales 包中；本交接在 `handoff/results/PianoGrid_Scales_Final_Handoff.zip` 直接复用该完整既有包，并在同目录放入其关键 RESULT/contract 副本，不再导出一套新模型。

## B. Chords 仅核对未结事项

### 已解决/后续结果

- [已核实] 早期独立审阅 F-01：`ChordDetailPage` 的 comparison table region 将 aria-label 硬编码为 A minor，影响 A major/C major。
- [已核实] 后续 B3 结果明确记录该轮将 Foundation 白名单加入必要组件，并完成四页的 B3 71/71、B2 40/40、chord batch 251/251；最终 Chords RESULT 记录 15 条 Chords URL 已发布且 production HTTP 200。
- [已核实] 当前 `src/components/chords/detail-page.tsx` 已不含字面量 `A minor inversion comparison table`；此项在当前相关文件中不可复现。

### 当前结论

`NO_ADDITIONAL_CHORDS_WORK`

- [已核实] 未发现有证据支持的 Chords P0/P1 阻塞；本次没有重新运行 Chords 全量回归或开启 Chords 开发。
- [未核验] 人耳、真机触控、具名读屏、实体打印、PDF 标签无障碍、独立钢琴教师复核仍未有当前人工证据。最小补验是按 B3/Final RESULT 中列出的页面、交互与介质逐项人工记录。
- [已核实] 后续新增建议而非阻塞：C-flat 仍没有可靠 fingering 来源；保留无指法边界，不生成占位指法。

## C. 后续四个对话的最小上下文

### Keyboard Notes

- [已核实] 当前代码公开路由：`/keyboard-notes`、`/keyboard-notes/labeled`、`/keyboard-notes/chart`、`/keyboard-notes/finger-numbers`。职责分别为查找、标注键盘、88-key staff chart、手指编号参考。
- [已核实] 主入口：`src/lib/keyboard-content.ts`，类型：`src/lib/keyboard-types.ts`；UI：`src/components/keyboard-notes/`；页面：`src/app/keyboard-notes/**/page.tsx`。
- [已核实] 数据模型包括 `Layout`、88/61 键范围、`PianoKey` MIDI/拼写、`StaffNote` 及 `ChartKey`；`getKeyboardPage()` 通过 `readAuthorizedPage()` 读取正文和元数据。
- [已核实] 复用组件：`KeyboardDiagram`、`StaffDiagram`、`use-note-audio` 与工具控件。
- [已核实] 缺项/边界：全站规划中的 frequencies、blank、key-signatures 为后做；不要把规划 URL 误写为已公开。

### Songs + Sheet Music

- [已核实] 当前代码公开路由：`/songs`、`/songs/easy`；职责为外部曲目/版本参考和简单曲目入口。Sheet Music 路由在全站规划中存在，但当前 `PUBLIC_ROUTES` 无 `/sheet-music*`。
- [已核实] 主入口：`src/lib/song-content.ts`，类型：`src/lib/song-types.ts`；UI：`src/components/songs/`；页面：`src/app/songs/**/page.tsx`。
- [已核实] `SongResource` 保留 work、edition、publisher、format、level、access、rights、source IDs 与 HTTPS external URL；运行时要求 `external reference only` 且禁止站内重分发乐谱/录音。
- [已核实] 既有正文/资料来自 `docs/content/site-master/` 的授权页面数据；全量歌曲和 Sheet Music 扩展是后做规划，当前未在本包中宣称已实现。

### Tools

- [已核实] 当前代码公开路由：`/tools`、`/tools/blank-sheet-music`。`/tools` 仅展示可用 lookup 和可下载资源；Blank Sheet 提供 original Letter/A4 PDF。
- [已核实] 主入口：`src/lib/integration-content.ts`、`src/lib/blank-sheet-content.ts`；类型：`integration-types.ts`、`blank-sheet-types.ts`；UI：`src/components/integration/`、`src/components/blank-sheet/`；页面：`src/app/tools/**/page.tsx`。
- [已核实] `getBlankSheetModel()` 限制两个可分发的一页、六套大谱表 PDF，并显式 `accountRequired: false`。
- [已核实] 规划中的 Piano Cheat Sheet 为后做；不要把它作为现有下载入口。

### 六模块互联

- [已核实] `src/lib/site-routes.ts` 是当前公开路由与导航的代码基线；`src/lib/integration-content.ts` 从实际可用目的地过滤首页/工具中心链接。
- [已核实] `src/lib/support-content.ts` 维护 Chords by Key、Progressions、Finder、Piano Chords Guide、Finger Numbers 的补充模块及内部链接计划。
- [已核实] 全站原规划在 `handoff/planning/url-plan.final.json`，当前实施状态与批准范围在 `handoff/planning/site-implementation-plan.md`、`release-readiness.md`。二者不能互相替代：规划存在不等于路由公开。
- [已核实] `PUBLIC_ROUTES` 当前包含 28 条代码路径；2026-09-14 线上 sitemap 审计的候选为 173 URL。两者不一致，后续模块开始前必须先确认使用哪一个部署工作树/production revision，不能靠本文件推断。

## 包内阅读顺序

1. `HANDOFF_SUMMARY.md`
2. 本文件
3. `handoff/worktree/WORKTREE_SNAPSHOT.md`
4. `handoff/results/`（Scales、Chords、SEO）
5. `handoff/planning/`（全站规划与当前实施/发布基线）
6. `handoff/source-snapshots/` 和 `handoff/SOURCE_INDEX.md`

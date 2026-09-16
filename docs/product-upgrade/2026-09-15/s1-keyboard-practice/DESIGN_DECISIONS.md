# PianoGrid S1 Keyboard Practice — Design Decisions

## 1. 样板身份与打开方式

- [已核实] 样板沿用现有 `/keyboard-notes`，没有新路由。
- [已核实] 本地启动命令（在集成 worktree 执行）：

  ```powershell
  $env:NEXT_PUBLIC_PIANOGRID_PRACTICE_SAMPLE='true'
  npm run dev -- --port 3115
  ```

- [已核实] 实际访问路径：`http://localhost:3115/keyboard-notes?practice-sample=1#note-trainer`。
- [已核实] 分享接收样板：`http://localhost:3115/keyboard-notes?practice-sample=1&practice-preset=natural-keys-v1&practice-shared=1#note-trainer`。
- [已核实] 环境变量和查询参数是双门；缺任一项都不会替换默认练习。

## 2. 默认任务

- [已核实] 默认任务是“看到自然音名称，在 C4–C5 的真实键盘布局中找到对应按键”。
- [已核实] 轮次固定为合法 preset `natural-keys-v1`、seed `23`：D4、C4、F4、A4、F4、B4、C4、G4、E4、C4。
- [已核实] C4 例题不计分；正式轮次为 10 题，无计时、无账号。
- [已核实] 样板只检查屏幕点击的 exact MIDI；不监听真实钢琴，也不评价真实演奏技术。

## 3. 信息层级

1. [已核实] 样板标识与固定 preset，避免被误认作已发布默认体验。
2. [已核实] 任务名、目标与 `Question n of N`。
3. [已核实] 目标音名与可点击键盘；正式题隐藏视觉音名，但保留 accessible key name。
4. [已核实] 当前反馈：neutral / success / error，使用 `aria-live="polite"`。
5. [已核实] 主动作与辅助动作。
6. [已核实] 结束时先解释边界，再给三分桶结果、review set、复练与分享。

## 4. 动作决策

- [已核实] Intro 主动作：`Start 10-note practice`；次动作：返回 lookup。
- [已核实] Practice：错误后 `Try again`；未完成时 `Show a hint` 与 `Show the answer`；完成后只有 `Next note`；始终可 `Leave practice`。
- [已核实] Complete：有 review set 时以 `Review these notes` 为主；另有完整重练、分享与返回 lookup。
- [已核实] Share：面板内 `Share` 与 `Copy link`，同时提供只读 URL；链接明确不包含结果。
- [推断] 主动作随状态只保留一个，是为了降低同一时刻的决策竞争；依据是当前状态机每步只有一个完成目标。

## 5. 错误、帮助与结果

- [已核实] 错误反馈同时说出用户所选音与目标方向；同音不同八度时明确 octave number。
- [已核实] 错误不会结束题目。只有选中目标或 Reveal 才能进入 Next。
- [已核实] `independent` 只包含第一次、无 hint 的正确回答。
- [已核实] 曾答错或用过 hint 后完成进入 `assisted`。
- [已核实] Reveal 进入 `revealed`，不会伪装为 correct。
- [已核实] Review set 是本轮曾答错、hint 或 reveal 的唯一目标音集合；按首次出现顺序展示。
- [已核实] `Review these notes` 实际只跑该集合；浏览器验收从 D4/C4/F4 进入 `Question 1 of 3`。

## 6. 分享接收决策

- [已核实] 分享只序列化版本化 preset，不序列化分数、错误记录、用户标识或本地状态。
- [已核实] 接收者先看到说明与例题，不自动开题。
- [已核实] 未知/退役 preset 显示“link no longer available”，不会静默替换成另一轮并声称同题。
- [推断] preset 而非整份题目数组可复用 canonical generator，并减少 URL 负担；前提是 preset 版本保持可解释。

## 7. 实际主题 token

以下均来自当前项目，没有新增品牌色或字体：

- [已核实] 字体：系统字体栈，来自 `src/app/tokens.css` / `foundation.css`。
- [已核实] `--background: #fff`、`--foreground: #1D1D1F`。
- [已核实] `--surface: #F6F7F9`、`--primary: #0066CC`、primary hover `#0057AE`。
- [已核实] `--border: #E1E4E8`、`--error: #B42318`。
- [已核实] panel radius 12px；默认无阴影；按钮/交互最小高度 44px；mobile breakpoint 48rem。
- [已核实] 样板样式只使用 `var(--...)`、现有 `.am-button` 变体、`.kn-practice` 与已有排版比例。

## 8. 实际复用组件与代码路径

- [已核实] `src/components/keyboard-notes/keyboard-diagram.tsx`：真实键盘渲染、焦点、ARIA、滚动。
- [已核实] `src/lib/keyboard-practice.ts`：真实 deterministic 题目生成。
- [已核实] `src/lib/keyboard-resolution.ts`：显示音名与 MIDI/拼写语义。
- [已核实] `src/components/keyboard-notes/lookup-experience.tsx`：现有页面挂载点。
- [已核实] `src/components/keyboard-notes/keyboard-notes.css`：Keyboard 页面现有主题层。
- [已核实] `.am-button am-primary/am-secondary/am-tertiary`：现有动作样式。
- [已核实] 新增的 `practice-sample.tsx` 只编排样板状态；没有第二套 pitch/layout/staff engine。

## 9. 边界与未决项

- [已核实] 状态只保存在当前 tab；刷新会回到 intro。没有账号、localStorage 成绩或云同步。
- [已核实] 当前 preset 只覆盖自然音 C4–C5；不是完整课程，也不是 scale identification。
- [已核实] 结果不是钢琴技术认证，不含速度或音频准确率。
- [已核实] Keyboard 练习事件 schema 仍是 GAP，S1 没有显示假 analytics。
- [已核实] 真机 Share sheet、Safari/Android、读屏、200% text、forced colors、具名音乐教育审阅仍待批准后的生产候选验收。
- [已核实] 完整 `npm run build` 的 compile、TypeScript 与 210/210 static generation 阶段完成，但 `/chords/e-major` export 连续 3 次超时，最终退出 1；因此不声称完整 build 通过。
- [已核实] 本轮未执行 B04–B08、部署、推送或公开发布。

## 10. 截图证据

- [已核实] Desktop 入口：`checks/product-upgrade-2026-09-15/s1-sample/01-intro-desktop-1440x1000.png`。
- [已核实] Desktop 错误重试：`checks/product-upgrade-2026-09-15/s1-sample/02-error-retry-desktop-1440x1000.png`。
- [已核实] Desktop 结果/分享：`checks/product-upgrade-2026-09-15/s1-sample/03-result-share-desktop-1440x1000.png`。
- [已核实] Desktop 分享接收：`checks/product-upgrade-2026-09-15/s1-sample/04-shared-entry-desktop-1440x1000.png`。
- [已核实] Mobile 错误重试：`checks/product-upgrade-2026-09-15/s1-sample/02-error-retry-mobile-390x844.png`。
- [已核实] Mobile 结果：`checks/product-upgrade-2026-09-15/s1-sample/03-result-mobile-390x844.png`。
- [已核实] Mobile 分享接收：`checks/product-upgrade-2026-09-15/s1-sample/04-shared-entry-mobile-390x844.png`。

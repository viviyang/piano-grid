# Cursor 执行 Prompt｜B02/B03/B04 联合修正

你现在是 PianoGrid 当前集成工作树的实施者。本轮任务：按本包修复已发现的正确性、交互和共享 UI 问题，不重做产品规划。

## 读取顺序与优先级

1. 当前 repository 的基础规则、AGENTS/项目说明（如有）、git status、分支、近期 log、实际文件。
2. 本包 `01_审查结论与证据.md`、`02_修正规格_界面内容与复用.md`、`04_验收用例.md`。
3. 最新 B02/B03 与 B04 Handoff；本包 evidence 只用于定位历史问题。
4. 已批准 Keyboard v2 与 B04 v2 设计，除本包明确修正外继续有效。

当前源码是代码事实；本包是本轮明确的差异规格。不要把 evidence 内的旧源码复制回项目。不得回退至旧 `0eac351` 或 `c9651ba`，不得覆盖已经完成的 B04。

## 授权范围

- 保留主题色、字体、基础样式、导航层级和全部 URL。
- 实施 F01–F12 中本轮有明确修正规格的条目；证据缺口需从当前仓库补齐。
- 本轮新增公开 URL=0，保留 B04 已存在的 `/tools/hear-the-difference`。
- 不做 B05/B06/B07，不大范围迁移 Chords/Scales，不升级依赖，不改统计服务。
- 不 commit / push / deploy / reset / clean；不覆盖与本任务无关的 dirty changes。

## 一次执行流程

### A. 取证与保护

输出 `INTAKE.md`：当前 HEAD、branch、dirty 文件、B04是否已提交/部署的已知证据、实际业务 owners。

逐个核查 F01–F12：仍存在、已修且有证据、需复现、仅文档缺口。不要把历史包缺陷直接断言为当前缺陷，也不要只说“测试通过所以不存在”。

保存本次修改前的可恢复文件/patch清单，不擅自提交；如果无法分离重叠用户改动，停止该文件的修改并明确原因，其他独立工作继续。

### B. 先修正确性

1. 共享链接→更改 option 的脱节：统一 activeRoundConfig，保护旧 v1题序。
2. 黑键/异名同音/错八度提示：复用 pitch/geometry，不只取 label 首字母。
3. 音频 Play/Stop/Next/换 pair/切后台取消：使用当前 ReferenceAudio，不新引擎。
4. 复练退出保留原结果；普通退出确认取消不丢状态。
5. Copy note 保留 requestedSpelling；复制失败显示实际 payload URL。

对每项先添加能在旧行为下失败的针对性用例，再做最小修复。用于旧缺陷复现的 evidence/probe-handoff.mjs 不是新功能验收，不要以“仍复现缺陷”为通过标准。

### C. 再收敛共享 UI 与截图问题

1. 紧凑 ReceiverContext：不再大居中块；更新 custom配置时上下文准确。
2. 共享 ShareDialog/ShareSheet + compatibility wrapper，Practice/Labeled/B04复用，不删分享能力。
3. 共享 Exit confirmation pattern，主操作 Keep practicing，正确焦点/取消/返回。
4. Explore 的范围窗口抽取复用给 Labeled；保持同一 KeyboardDiagram。Labeled：工具栏、窗口、总览、按需 full reference、完整打印。
5. compare roles 的 foreground/background/label/focus 在共享组件层统一；不复制 keyboard CSS。
6. B04 猜前不默认展开答案解释；帮助/揭晓语义统一；不扩新题库。

现有组件能承担职责就扩展；本包的建议组件名不是必须新建文件。不要做一个塞满所有业务状态的“万能组件”。纯 UI/音频/序列化复用，Practice 与 B04 的业务状态仍独立。

### D. 验证同一最新工作树

读取现有 package.json 与脚本，不假定 npm run check 已覆盖全部。
至少运行：
- 当前 check / typecheck / CSS / foundation
- 原 Keyboard owner 单元回归
- 原 B02/B03 浏览器回归
- 原 B04 单元与浏览器回归
- Practical Tools 与本次受影响的 Chart/Labeled/频率/打印路径
- 新 acceptance-cases.json 用例（不适用要写依据）
- build、git diff --check

必须覆盖 shared 配置更改、四个 practice options、退出取消与退出复练、copy拒绝/native取消、音频真实失败路径与中断、compare标签、Labeled完整范围/打印。

禁止：删除断言换PASS、用插入DOM伪造error流程、仅检查200代替交互、借allowlist扩大无关范围。可以增加明确授权文件的allowlist，但不得跳过检查。

### E. 截图与交接

截图：1440×1000、390×844；另测320宽和200%文字。至少覆盖：
- compact shared landing / custom settings
- white-key wrong/hint、black-key hint
- exit dialog、取消恢复、复练返回原结果
- Labeled 88/61、full reference边界、打印预览
- 三类分享面板及复制失败
- B04 landing无默认剧透、reveal可读labels、真实触发audio-error与retry

新交接输出：
`RESULT.md`、`FIX_MATRIX.md`、`COMPONENT_REUSE_MAP.md`、`TEST_REPORT.md`、`ROUTE_DIFF.md`、`MANUAL_CHECKS.md`、`ROLLBACK.md`、screenshots、原始测试结果。

交接包必须包含最新改动业务源码/完整diff（尤其B04 audio hook、compare model、shared keyboard/share）、本次引用的配置/资产清单与hash；排除.env、密钥、node_modules、.git、.next。未跟踪的新文件也纳入。

`FIX_MATRIX.md`逐条连接 Fxx→文件/行→测试→截图→状态，减少用户来回核对。

完成后停止。状态按真实证据给出：`READY_FOR_MANUAL_ACCEPTANCE` 或 `BLOCKED`；不要代替用户宣称真实 iPhone/分享目标/听音/读屏已经通过。

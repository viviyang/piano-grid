# 直接粘贴给 Codex 的指令

先完成README中的两次文件放置。不要把所有任务文件全文一次粘贴进聊天。

## 1. 新主开发对话：现在就用

```text
当前项目的 Foundation 与 /chords/a-minor 已完成。本轮开始按模板批量实现，不重新设计、不重做样板。

请先读取：
docs/tasks/batch-implementation/MASTER-RULES.md
然后依次执行：
docs/tasks/batch-implementation/00-content-intake.md
docs/tasks/batch-implementation/01-chords.md

完整内容包在 docs/content/site-master/。
这是对00接入和01和弦组的明确执行授权，不是仅要求分析。

保护现有代码、锁文件、Foundation修复与A minor成品。允许最小更新AGENTS/检查脚本中的上一阶段单页限制，改为只允许当前批次，不删除长期约束。

01范围为 /chords、/chords/a-major、/chords/c-major；A minor只做必要复用及回归。
不要因为master有127页就开放其余路由。

先核对实际目录、源码、内容schema和素材；记录00结果后无阻塞就直接完成01，不停在计划文档。
发现不影响本批核心任务的缺项，登记并继续；实质数据/权限/依赖/设计冲突提出最小待确认项。

完成后输出实际页面地址、桌面/手机截图、check/build/页面测试、来源及资产映射、未测清单，并更新docs/tasks/site-implementation-plan.md。

不部署、不取消noindex、不自动commit/push。01完成后停止，等待独立验收。
```

## 2. 第一批完成后：新独立验收对话

```text
开发对话已暂停。请审查当前工作区批次 01-chords，连同00内容接入一起核对。

读取并执行：
docs/tasks/batch-implementation/90-independent-review.md

当前源码是审查对象，不只看开发方的自测摘要；检查新三页和既有A minor回归。
只允许写审查报告、截图与测试产物，不修改产品源码/内容/依赖/规则。
报告写到 checks/reviews/01-chords/review.md，给出PASS、PASS_WITH_NOTES、NEEDS_FIX或BLOCKED及证据。
不要部署或自行修复。
```

## 3. 验收有问题：回到主开发对话

```text
请执行 docs/tasks/batch-implementation/91-fix-review.md。
处理 checks/reviews/01-chords/review.md 中可复现且在授权范围内的问题。
保留源内容与视觉基线，完成修复、回归、check/build后停止，等待复验，不进入02。
```

后续批次将其中01-chords改为相应批次ID。

## 4. 第一批通过后：主开发对话继续

```text
01-chords已通过本批验收。我授权执行：
docs/tasks/batch-implementation/02-keyboard-notes.md

先读MASTER-RULES和当前执行记录，连续完成本批三页及必要组件、测试和截图；保持已完成页面不回归。
本批结束停止供独立验收，不扩展其他路由。
```

02完成后在验收对话说：

```text
主开发已暂停。按90-independent-review.md审查当前批次02-keyboard-notes及受影响旧页面。
对实际当前代码重新核验，不沿用上一批PASS。写checks/reviews/02-keyboard-notes/review.md后停止。
```

其余批次也照此操作，只替换任务文件名和批次ID：
- 03-scales.md → 03-scales
- 04-songs.md → 04-songs
- 05-guides.md → 05-guides
- 06-blank-sheet.md → 06-blank-sheet
- 07-site-integration.md → 07-site-integration

## 5. 对话过长时恢复

```text
这是Piano Reference既有主开发任务的恢复。旧开发对话已停止。
请执行 docs/tasks/batch-implementation/92-resume.md，按主开发角色从当前已授权检查点继续。
不要重建项目，不重做已完成页，不扩大当前批次。
```

验收对话恢复时将“主开发”改为“独立验收”，保持90规定的只读边界。

## 6. 首轮结束

07与独立验收通过后，再决定后做91页的批量范围、专业/素材缺项与发布流程。本包不把这些后续事项提前当作已授权任务。

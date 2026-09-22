# PianoGrid 研究校准与产品系统实施交接

**[INFERRED] READY_FOR_IMPLEMENTATION：可从07的P0-0开始。不是发布通过。**

[REPO_VERIFIED] 2026-09-22 fetch远端main后，在独立detached worktree审计 `c1a017a533289616b84e354c97f1345114f809e2`；交付前ls-remote再次确认main未变。本工作区 `C:/Users/Admin/Documents/viviyang_github/piano-main-product-audit`。原 `piano` 工作区的 `codex/chords-b1` 脏改动未参与基线，也未被覆盖。没有修改产品源码、commit、push、部署、新URL或索引策略；检查自动生成的tracked改动已还原。

## 阅读顺序

| 文档 | 用途 |
|---|---|
| [00_CURRENT_STATE](00_CURRENT_STATE.md) | 当前代码/HTTP事实、架构、执行结果与未知项 |
| [01_RESEARCH_EVIDENCE_MATRIX](01_RESEARCH_EVIDENCE_MATRIX.md) | 两份BodyType冲突与PianoGrid研究校准 |
| [ROUTE_TEMPLATE_INVENTORY](ROUTE_TEMPLATE_INVENTORY.md) | 206条完整URL、模板、来源、canonical与职责 |
| [02_PRODUCT_SYSTEM_MAP](02_PRODUCT_SYSTEM_MAP.md) | 七类核心任务链，已有与拟增强区分 |
| [03_URL_TASK_AUDIT](03_URL_TASK_AUDIT.md) | 全模板任务审计与索引建议，不自动执行 |
| [04_GAP_ANALYSIS](04_GAP_ANALYSIS.md) | 10类journey问题、证据、方案和风险 |
| [05_PAGE_GATE](05_PAGE_GATE.md) | 新URL六项准入规则 |
| [06_P0_P1_BACKLOG](06_P0_P1_BACKLOG.md) | 研究十项提案的复核及唯一排序 |
| [07_IMPLEMENTATION_PLAN](07_IMPLEMENTATION_PLAN.md) | 九页pilot、每项16字段执行合同、事件字典、估算 |
| [08_ACCEPTANCE_CRITERIA](08_ACCEPTANCE_CRITERIA.md) | 十维验收、音乐矩阵、代表URL和门禁 |
| [09_DECISION_LOG](09_DECISION_LOG.md) | 接受/拒绝/未知/已有/第一方数据需求 |
| [EVIDENCE_INDEX](EVIDENCE_INDEX.md) | 原始输出与证据边界 |

## 启动摘要

[REPO_VERIFIED] 当前206公开业务URL；145 chord details、433 Finder对象、60 scale对象，这些数字不可互换。本次check/build通过；线上206/206 HTTP200、index/follow、自指canonical。检查数据126通过/26失败，其中23为换行差异、3为Git真实变化；浏览器交互没有通过记录。

[INFERRED] P0先建立可复现验证、修Finder帮助与一个guide锚点、补兼容测量。P1只做9页衔接、Finder目的地状态和限定来源/一份既有打印参考。保留当前品牌、tokens、字体、UI、音频、键盘、音乐事实及公开URL。

Pilot：`/chords`、`/chords/finder`、`/chords/c-major`、`/chords/a-minor`、`/chords/c-maj7`、`/chords/c-diminished`、`/chords/c-add9`、`/scales/c-major`、`/keyboard-notes`。有限依赖页和例外见07，不能扩为全站改版。

[UNRESOLVED] 未获得真实GSC/GA4导出，不能证明流量机会、完成率或增长因果。未完成浏览器视觉/交互、真机、读屏、真人听音/专业审阅、真实打印和PDF无障碍决定；下一实施会话须按08补齐，不能以本README代签。

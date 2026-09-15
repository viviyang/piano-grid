# PianoGrid Songs + Sheet Music · Baseline Change v2.1

[已核实] `main@1e3fdec`继续作为线上production ancestor。

[已核实] Master Context规定业务代码串行：`Keyboard → Songs + Sheet → Tools → Integration`。

[推断｜实施规则] 因而Songs + Sheet Music的直接实施base应继承**Keyboard已完成并验收的代码结果**，而不是机械地再次从旧production commit开始。

## 固定规则

1. Keyboard完成后必须输出RESULT / Integration Handoff，并给出可复用的accepted baseline commit。
2. Songs从该accepted baseline commit建立**新的clean worktree**。
3. 不直接继续使用Keyboard开发worktree。
4. 不退回`main@1e3fdec`重做或绕过Keyboard已经完成的能力。
5. 如果Keyboard尚未形成稳定accepted baseline，则阻塞Songs业务代码写入，先固化已验收Keyboard结果；资料/版权/页面映射等非代码任务可继续。
6. 历史dirty树继续只读保留，不reset / clean / stash / 覆盖。

本文件只修正实施基线链路；v2的产品范围、URL职责、内容、版权gate、资产和QA边界不因此改变。

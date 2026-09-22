# 决策记录

代码基线：`c1a017a533289616b84e354c97f1345114f809e2`。本文件记录规划选择，不执行产品变更。细证据见01、00、04和07。

## ACCEPTED FROM RESEARCH

| 决策 | 状态/理由 | 执行落点 |
|---|---|---|
| 按任务输入→答案→边界→下一动作设计 | [RESEARCH_SUPPORTED] 三份共同建议；[INFERRED]适合当前现成音乐对象与练习 | 02任务图；07九页pilot |
| 答案同时可看、可听、可练 | [REPO_VERIFIED] 当前已具基础；补衔接比新建引擎更合理 | P1-1/2 |
| 可引用资料需要来源与适用边界 | [RESEARCH_SUPPORTED]研究建议；[REPO_VERIFIED]已有source与print可复用 | P1-3 |
| 新URL六项Page Gate | [INFERRED] 防止将数据对象/同义词误当独立页面，符合用户明确规则 | 05；不改变当前206索引 |
| 测量任务行为而不只pageview | [REPO_VERIFIED]有GA和事件基础、独立Finder缺调用 | P0-2兼容字典 |

## REJECTED FROM RESEARCH

这里区分“竞品能力可以成立但不适合照搬”和“证据不足不能采信”，后者保留在UNRESOLVED，不把未证实数字说成已证明虚假。

| 不采用项 | 状态/理由 | 替代 |
|---|---|---|
| 复制身体类型的calculator/comparison URL结构 | [INFERRED]音乐有pitch-class/voicing/key等多解释与既有URL；竞品形式不能决定本站职责 | 已有URL交互状态+Page Gate |
| 用EMD/.org/静态原生JS替换品牌/Next/Vercel | [UNRESOLVED]竞品技术与因果不足；[REPO_VERIFIED]当前架构能输出静态答案和交互 | 保留品牌/框架/部署 |
| 先重建Universal组件、Finder engine、GA、print或source数据库 | [REPO_VERIFIED]现成部分存在，重建重复 | 小范围adapter/关系/状态补齐 |
| 立即实施Practice Queue、Embed、账户和大批comparison页 | [UNRESOLVED]需求未提供；[INFERRED]先完成当前任务连续性更可逆 | P2验证或DEFER |
| 90天/61人日和+15%/+20%照抄成承诺 | [UNRESOLVED]非本仓库估算/基线 | 07按复用程度的区间估算；行为观察不保证增长 |
| 按thin-content印象直接kill/noindex | [UNRESOLVED]无GSC/用户行为证据；本轮未授权 | 保持全部现有URL，建议另议 |

## UNRESOLVED

- [UNRESOLVED] BodyType真实增长时序、完整索引URL、Top pages、60–70%/75%/25–35%/35–45%/90%等份额、链接获取方式、收入、具体hosting/schema/stack、EMD与增长因果；无原始可核对分母/时间序列，不能作为优先级权重。
- [UNRESOLVED] PianoGrid线上部署SHA、全部hosting redirect规则；当前HTTP与本build标题一致只能支持输出一致的范围。
- [UNRESOLVED] 浏览器任务两次未成功，没有可接受截图；可访问性、移动端、听音、纸张打印和PDF无障碍门禁尚未完成。
- [UNRESOLVED] 三个真实内容hash变更是否都已获得与原保护基线相容的批准；不得自行覆盖旧期望值。
- [UNRESOLVED] legacy registry来源空字段的完整映射、具名专业审阅；source存在不等于teacher-reviewed。
- [UNRESOLVED] Universal Next Step对完成率/返回/SEO实际贡献；本轮只确认可试点，不确认效果。

## ALREADY IMPLEMENTED

- [REPO_VERIFIED] 206公开路由、sitemap/robots/canonical；旧17/197不是当前路由总数。
- [REPO_VERIFIED] 433 Finder registry对象、完整/指定省略voicing候选、多解释、bass/root约束；145详情，288嵌入对象不应扩成URL。
- [REPO_VERIFIED] Chord reference/音频/转位/练习；C major独立reference/practice；Scale60对象、quiz/follow-along；keyboard practice。
- [REPO_VERIFIED] 24key、8pattern/96progression；comparison、print/PDF、share、sources及歌曲/乐谱权利合同已有部分。
- [REPO_VERIFIED] GA4/Clarity与事件transport、当前UI组件/主题/键盘基础；不重复安装或换品牌。
- [REPO_VERIFIED] 不在repo的完整octave输入/任意声部跨页恢复不能写为现有能力：`RESEARCH_CLAIM_NOT_IN_REPO`。

## REQUIRES FIRST-PARTY DATA

| 决策问题 | 最少数据 | 缺数据期间处理 |
|---|---|---|
| 哪些URL/query值得rollout | GSC page×query×date×device×country，同口径相邻时间窗，注明匿名/截断 | 不编volume/排名；pilot按模板代表性选 |
| 下一步是否帮助用户 | GA4事件配置/DebugView、按release/page_type的曝光→点击→目标结果→练习 | 先验证事件正确性，收益UNKNOWN |
| 队列/返回需求 | 同意范围内聚合return任务行为、用户研究/教师反馈 | P2探索，不先建账户 |
| 是否发生query cannibalization | 同查询多个页面展示/点击/位置时序与页面职责 | 不合并/noindex；列NEEDS_EVIDENCE |
| PDF/embed是否值得投入 | 既有资源请求/分享、教师引用需求、版权/来源条件 | 优先一份既有资料，无反链增长承诺 |

## 最终裁决

[INFERRED] **READY_FOR_IMPLEMENTATION（限07的小范围P0/P1方案）**。research reconciliation、repo/HTTP审计、完整路由表、Page Gate、P0 backlog和acceptance合同已形成。该状态表示另一个实施会话可以从P0-0开始；不表示本轮做过产品实施，不表示浏览器/人工验收通过，也不包含commit/push/deploy授权。

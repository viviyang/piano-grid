# 新 Indexable URL Page Gate

[INFERRED] 本门禁作为唯一实施计划的发布判断合同；不是搜索排名保证，也不追溯自动删除已有206页。维护者必须保存每项证据定位、日期、范围和未知项。

| Gate | 必答问题 | 最小可审查证据 | 不通过例子 |
|---|---|---|---|
| 1 Distinct Job | 用户完成了什么不同任务？ | 与最相近现有URL逐项比较输入/输出/完成状态 | C chord / C piano chord只改措辞 |
| 2 Unique Utility | 页面比已有入口多解决什么？ | 可演示keyboard/audio/compare/practice/reference的具体作用 | 换root名而无额外任务价值 |
| 3 Unique Information | 有哪些对象/上下文独有信息？ | exact notes/formula/spelling/source scope/示例来自现有事实层 | SEO独立编一套音符、指法或歌单 |
| 4 Evidence / Source Boundary | 来源支持哪一字段，哪些未知？ | sourceIDs+字段范围+日期；音乐QA；edition权利边界 | 泛理论出处被当全部指法已验证 |
| 5 Natural Next Step | 结果后能做什么，能到达吗？ | 已存在目标route/state、真实href、接收端验证 | 规划JSON目标尚未发布 |
| 6 Search / Product Demand | 为什么值得独立URL而不留在工具？ | GSC query×page、注明日期地区的SERP、去重工具事件/真实用户请求，至少一条明确关联任务的直接证据 | registry有对象、猜搜索量、竞品有同名页 |

## 判定程序

1. 六项都有可审查证据 → indexable candidate；仍需08音乐/SEO/产品验收及发布授权。
2. 只有数据对象 → `INTERACTIVE_STATE_ONLY`，hub容纳；不把433对象变433详情。
3. 只有query wording差异 → `NO_NEW_URL`；在现有canonical中表达同义词。此规则不授权迁移已有页。
4. 没有utility → `NO_NEW_URL`。
5. 需求不足或来源/权利不足 → `NEEDS_EVIDENCE`，先验证，不用0填未知。
6. 已有页任务疑似重叠 → 只有query重叠、实际完成任务重复及迁移影响均确认后才可提出 `MERGE_CANDIDATE`；不得自动redirect/noindex/delete。

## 当前候选裁决

| 候选 | 本轮结论 | 原因 |
|---|---|---|
| C chord / C piano chord / C chord on piano / C major piano chord | NO_NEW_URL | 现有 `/chords/c-major`承接 |
| 108 extended + 96 altered对象 | INTERACTIVE_STATE_ONLY | 现有category explorer；无逐对象独立需求证据 |
| C6 vs Am7、root vs bass | NEEDS_EVIDENCE；先Finder内解释 | 独立URL需求未知，已有多候选/说明可增强 |
| maj7 vs 7、sus2 vs sus4、add9 vs 9 | NEEDS_EVIDENCE；优先现有comparison state | 不批量生成6–10篇比较页 |
| Practice Queue | NO_NEW_URL | 若以后验证需要，应先是产品状态 |
| 新谱面/编配页 | NEEDS_EVIDENCE | 任务/需求之外还需具体edition与来源/使用边界 |
| 第一个pilot | KEEP/REWORK现有页面 | 零新增indexable URL，canonical/sitemap不变 |

记录模板：candidate、closestExistingURL、六项证据、missingEvidence、dataOwner、musicQA、decision、reviewDate、approver、rollback。字段为空不得标已通过。当前没有任何新URL获准发布。

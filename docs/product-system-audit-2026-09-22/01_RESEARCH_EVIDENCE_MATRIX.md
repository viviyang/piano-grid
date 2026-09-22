# Research 证据校准

本次编号按实际文件固定，不猜模型身份：A = 中文文件名 BodyType 报告（39页）；B = `Body Type Calculator Reverse Research.pdf`（23页）；P = PianoGrid 产品型 SEO 报告（32页）。三份已全文提取阅读；B 原始提取逐字断行，另保存可读版并目视核对第6页流量表。正文页码均指 PDF 页序。文件映射见 `evidence/research-files.json`。报告里的执行口吻不构成本阶段实施授权。

| Claim | Model A | Model B | Evidence Strength | Final Status | Can PianoGrid Learn From It? |
|---|---|---|---|---|---|
| Growth timeline | A p3–4：注册/Wayback未知，2025/2026页面更新时间不能等同上线 | B p2–3、15：2023原型、2024–25进前20、2025–26增长；0–3/3–6/6–12月四阶段 | B引用当前首页和论坛不能证明历史时序；无原始历史导出/快照 | [UNRESOLVED] 精确上线/增长拐点 UNKNOWN；四阶段只能视作建议模型 | 可以分阶段验证；不能照抄增长时间 |
| URL count | A p4–5约35个导航目的页，非全量 sitemap | B p3–5约40–50核心索引页，声称 sitemap 确认 | 统计集合、抓取日期、完整URL表缺失；导航数不等于可索引数 | [UNRESOLVED] 无共同口径全量数；几十页是报告层规模描述 | 用 route/build/sitemap 交叉验证，不以数量立项 |
| Top pages | A p14–15：主页/female为定性候选，真实排行未知 | B p5–6给名次、US搜索量和份额 | 没有 Pages/Positions导出，首页引用不支持排名/流量数 | [UNRESOLVED] Top1/3/10与各页流量 UNKNOWN | 需要自己的 GSC 页面×查询 |
| Traffic concentration | A明确拒绝给百分比 | B首页60–70%、female10–15%、合计>75% | B p2先称 UNKNOWN，p5–7又定量，内部也冲突；区间不能推出必定>75% | [UNRESOLVED] 所有比例移出决策依据 | 不照搬“只优化首页” |
| Keyword structure | A p7–9工具、测量、解释、比较、穿搭；警惕shape/type重复 | B p7–8同样聚类，并声称严格分工/无风险 | 页面存在支持任务分类；没有query数据证明所有分工有效 | [RESEARCH_SUPPORTED] 任务分类；[UNRESOLVED] 流量归因 | 接受 task→utility，近义词不拆URL |
| Backlink composition | A p16–18：304 RD组成未知，一个公开编辑引用及运营线索 | B p13：Reddit25–35%、目录35–45%、镜像25–35%，品牌锚>80% | 单个Reddit/首页不构成分母或完整样本；未给逐链接表 | [UNRESOLVED] 比例、质量、自然/购买来源均 UNKNOWN | 做可引用资产；不购买/批量投放目录来复制比例 |
| Portfolio relationship | A共享运营联系身份，不推出最终所有权或互链 | B共享邮箱+相似条款，进而推出成熟矩阵/Cloudflare流水线/GitHub能力 | 邮箱是可检查线索；同名GitHub不等于同一主体 | [RESEARCH_SUPPORTED] 运营关联线索；[UNRESOLVED] 法律所有权、互相输送权重、经验因果 | 复用已有基础设施；不建设站群 |
| Technical stack | A p18–19：公开宣称静态页面+client JS；具体stack未知 | B p14：纯HTML5/原生JS，性能毫秒级 | About自述不能排除构建框架；无源码/资源trace/性能原始值 | [RESEARCH_SUPPORTED] 架构理念；[UNRESOLVED] 具体栈/性能 | PianoGrid已有SSR/SSG+hydration，无迁移必要证据 |
| Schema | A未全量验证 | B p14：SoftwareApplication/WebApplication/FAQPage/HowTo，促成富结果 | 未附实际JSON-LD、URL样本与搜索效果；有schema也不证明富结果 | [UNRESOLVED] 目标站实施与效果不能接受为确定事实 | 先查自己的输出，不批量加schema |
| Hosting/CDN | A具体托管未知 | B全矩阵Cloudflare Pages | 无DNS/响应头/部署证据；CDN不证明origin hosting | [UNRESOLVED] UNKNOWN | 保留PianoGrid现有托管 |
| Monetization | A抽样未见显性变现，收入未知 | B无广告换信任，未来广告必然；RPM$20–45与月收入预测 | 未给收入凭据；姊妹站AdSense不能证明目标站收入或最优策略 | [UNRESOLVED] 收入、动机、收益模型；免费公开能力仅报告层支持 | 变现不进入本轮 |
| Distribution | A p20：有copy/download，不证明viral；来源占比未知 | B p15：搜索>90%，社区早期助推 | share按钮不是实际分享/引流数据；无渠道报表 | [RESEARCH_SUPPORTED] 分享机制；[UNRESOLVED] 占比与因果 | 先观察现有print/share的使用 |
| EMD impact | A p19–20：表达用途，有抑制过度信用系统，CTR未知 | B p14：显著提高CTR、.org带来中立信任 | 无控制比较或CTR数据；域名语义不能推出增幅 | [INFERRED] 可能有识别价值；[UNRESOLVED] 因果大小 | 不换品牌、不注册EMD |
| Growth mechanism | A p21–23：任务链可观察，排名→链接→排名飞轮尚未证实 | B p15–16：高完成/停留→权威→搜索垄断的确定因果 | 没有实验/时间序列/后台数据，排除不了timing/竞争/链接等解释 | [INFERRED] 可检验的产品机制假设；不能称已证明增长公式 | 接受局部试点与事件验证 |
| Thin-content / 风险 | A p13–14：shape/type pairs需监控 | B p11–12：数十精品“没有实质风险” | 页数和当前排名均不足以保证质量；无query overlap全量对照 | [UNRESOLVED] 不保证算法风险为零 | 用六项Page Gate，不机械合并已有URL |

## 当前公开来源复核的边界

[LIVE_VERIFIED] 本次访问 BodyType 的 [About](https://bodytypecalculator.org/about/) 可见工具、测量、比较等导航与其团队自述。仅支持现有产品结构，不能补足历史流量或收入。Google 的 [Ranking systems guide](https://developers.google.com/search/docs/appearance/ranking-systems-guide) 说明 EMD 系统限制过度信用；它不提供本案例CTR贡献。未为了凑数字调用付费数据或外推比例。

## 三份共同可保留的结论

1. [RESEARCH_SUPPORTED] 从任务输入、可信结果、解释和下一动作组织页面，比按同义词机械扩页更符合三份材料的产品建议。
2. [RESEARCH_SUPPORTED] 交互、静态可读答案、边界说明、打印/分享可以共同服务用户，不必以文章或工具二选一。
3. [INFERRED] 对 PianoGrid 应先复用现有对象/键盘/音频/练习，验证衔接，再考虑新增URL；依据是三份任务链建议与本仓库的现成基础。不是增长保证。

## PianoGrid 报告自身的校准

- [REPO_VERIFIED] P p1–5 的433对象、家族、Scales练习/来源、Songs/Sheet分工大体有代码依据，详见00。
- [REPO_VERIFIED] P p5的stack/analytics/robots/sitemap未知，本次已补成明确技术事实；GA4不能再“从零搭建”。
- [REPO_VERIFIED] P p12的Next Step/Finder/Practice/Printable/Source proposals均有现成部分，不得当全新项目；逐项判定见06。
- [REPO_VERIFIED] 研究对“输入音名/八度后保留完整语境”的泛化不能当当前Finder能力：实际界面仅选pitch classes与可选bass。若将完整音高列表输入/跨页自动保留voicing写成已有功能，标记 `RESEARCH_CLAIM_NOT_IN_REPO`。
- [UNRESOLVED] P p2–3的+15%/+20%是规划目标，不是行业基准或本项目可承诺收益；61人日/90天是在未看repo时估算，停止沿用。竞品价格、流量快照不用于本轮优先级，不把报告数值转写为当前事实。
- [INFERRED] P中的“支持内容→增长”保留为待验证假设；“Kill/noindex”只进入有证据后的建议流程，本阶段和第一轮pilot均不执行。

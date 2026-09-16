# B07｜SEO、可发现性与内容收口

## 基本原则
[已核实｜T01–T03] Google建议title描述准确清晰；结果标题/摘要可按查询改写；canonical是规范化信号。
[推断｜本批实施规则] 一个页面一个清楚主任务，保留一个明确H1是本项目约定，不声称这是Google硬性唯一排名条件。
不要求800词、关键词3%–5%、H1重复关键词、不因工具页面词少补废话。字符数仅检查异常，不按60/160机械裁剪有用表达。

## T10 基线
从实际route registry、build与sitemap记录业务URL集合；B05/B06前后对比应0个新增业务route。
PDF路径单独列资产清单；不把它们算新HTML页。参数和锚点不进入XML sitemap。
保留已发布B04路径与入口。公开抓取缓存和本地不一致时记录，不因为页面文本旧就删已发布功能。

## T11 逐页实施
使用data/page-seo.json和02。所有草稿元信息只有对应可见功能存在才使用。
/songs和/songs/easy不合并：前者完整曲目版本选择，后者初学者起步/一个plan。
/sheet-music/easy和/beginner维持原职责差异，不做通篇相同三张卡；根据现有catalog保留筛选/格式内容。
每页title/description/H1与可见首答、按钮、能力一致。不能写instant download却跳到外站邮箱表单。
更新metadata owner而非组件里插重复title；查看原始HTML、hydrated DOM和分享变体。
H2分任务，H3用于版本或步骤；不把隐藏调试状态做heading。

## T12 内链/内容
按03逐条落位，优先上下文链接而非footer堆关键词；primary link文本描述目标。
查path + fragment + selected mode + current version，不只HTTP200。
所有wrapper卡片不嵌套a/button，不因整卡可点而导致两个链接冲突。
Provider link只使用已核验https allowlist；标清外站/获取限制。正常编辑外链不机械加nofollow；只有真实赞助关系才按项目与Google相关规范标注，不编联盟资格。
来源与重要权限不删除，开发sourceID从可见正文移到代码/审查记录。

## T13 技术与结构化数据
保留SSG/SSR首答、真实href、JSON-LD已有结构。没有rich result资格不要加假的课程/评分/FAQ评价；默认沿用WebPage/BreadcrumbList，仅内容支持时保留ItemList。
不要为五步自检写Course/评分/认证。
canonical为base self；不把分享query的个性状态放进head，也不新增全局robots禁抓参数策略。
lastmod只使用真实内容修改时间，不每build全部刷新；项目无可靠时间源就保留空，不伪造日期。
检查OG title/description/image是可用资产且不泄露答案/用户信息。B05指向plan/edition；B06展示自有reference而非外部曲谱。
PDF按现有策略处理索引；不额外全站加noindex/robots。仅在PDF与HTML确为同等重复内容、且已有批准策略时沿用非HTML canonical机制；有独立内容的worksheet不能机械canonical到一个不同内容的hub。缺机制不擅自扩大infra改造。

## T14 性能与测量
页面静态正文不等待PDF/音频；PDF静态生成不让用户每次等渲染；预览图指定尺寸避免位移。
只有证据证明瓶颈才优化性能，不在此换Next版本或升级依赖。
事件真实收集见04，独立输出collector状态。

## 交付
SEO_DIFF.json（before/after/why）、ROUTE_COUNTS、LINK_CHECK_RESULTS、HEAD_CHECK_RESULTS、ASSET_CHECK、EVENT_STATUS、截图与命令原始日志。
不自动提交GSC、不登录用户账户、不宣称关键词排名/流量增加或分享病毒传播。

## 内容落地补充
逐页首答与小节正文已放入`data/page-body.en.json`。结合`02_PAGE_TDH_MAP.md`的H1–H3直接接入，不再让Auto自由补SEO长文。原站更详实的内容保留；新版层级是优化入口与说明，不删除未进入样板的曲目/筛选/Guide。Tools标题分组能映射就复用，若当前分组已满足职责，保留实际名称并记映射，不能为了本稿强改导航。

## 静态社媒卡片（设计样张附在 design/social）
仅两个现有base页面使用固定Open Graph资源；不为query建新route或付费截图服务。
- /songs/easy：og:title `A small plan for your next piano session`；description `Five steps for one Early Elementary Twinkle edition. Check the publisher materials, then choose one small practice goal.`；图片alt `PianoGrid five-step practice plan for one Twinkle edition; materials supplied externally.`
- /keyboard-notes/labeled：og:title `Piano key names: a printable practice pack`；description `C4–C5 reference, worksheet and answers, with an optional matching online practice.`；图片alt `PianoGrid C4–C5 key-name pack: reference, worksheet, and answers.`
- 1200×630，静态PNG；宽高、alt、绝对https资产URL在metadata owner设置。图中不得出现第三方谱面、答案得分、用户状态。
- 示例HTML/PNG只确定构图；生产用当前主题/正式logo重新生成或适配。分享query/fragment返回该base元信息即可，不承诺按参数动态变卡。
- 初始原型不会模拟社媒平台抓取；上线验收需实际检查原始HTML与asset响应，社媒缓存更新不可伪称即时生效。

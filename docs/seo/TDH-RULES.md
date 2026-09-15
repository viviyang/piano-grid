# PianoGrid TDH 与导航维护规则

2026-09-15。用户批准的规划实施规则。以下为项目编辑约定，不是 Google 排名保证。

- 首页服务学琴/弹琴整体目标；目录承接查询类别；详情回答具体问题；教程提供学习步骤；公共工具完成明确任务。
- 一页一个主要意图及相关词组。Title、Description、H1 语义一致，无须逐字相同。不把各栏目词在所有内页重复一遍。
- 保留原关键词台账；英文标题自然书写。首页 Learn Piano 是定位候选，未验证搜索量和排名。
- `src/lib/seo-editorial.ts` 是发布层文案调整入口。保留原始内容包；页面 metadata 经 editorialMetadata 输出，同时同步 OG/Twitter。
- 特定页面 H1 通过 editorialHeading 读取。普通目录/内页使用清楚的主标题；打印标题不另建 H1。
- 详情族保留真实能力差异：三和弦/七和弦可以写实际转位；added-note 使用真实 voicings；没有指法就不承诺 Fingering。
- Title 约 45–65、Description 约 130–160 个英文字符仅供检查，不是硬性门槛。避免为了长度删除必要范围或塞词。
- 品牌后缀对短标题补齐；长标题保留具体内容。不得重复品牌。
- 不采用固定关键词密度、最低词数、新页固定首页五天、上线后不能改标题等门禁。
- 公共工具不因功能属性而 noindex；系统页另行评估。noindex 不能保护私密内容。
- 导航用 Piano Notes / Chords / Scales / Songs / Learn / Tools；名称短且一致。Sheet Music 已规划，实际栏目可用后再加入导航与首页完整谱库承诺。
- Tools 聚合现有功能 URL；不复制工具页面。Songs 选作品，Sheet Music 选谱面版本，Learn 教步骤，Chords/Scales 查结果。
- 完整库放类别页；菜单和首页可精选，不把精选链接称全部页面。调整菜单交互前必须验证桌面/移动/键盘。
- 不自动迁移 URL、不改索引或 canonical、不将规划页面加入 sitemap。
- 当前维护基线为 main 的 4bfd070；197 个公开路由，历史 17 页记录是旧阶段证据，不能代表当前全站验收。

来源：[标题](https://developers.google.com/search/docs/appearance/title-link)、[摘要](https://developers.google.com/search/docs/appearance/snippet)、[SEO 入门](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)。

## 发布后抓取

先部署并确认实际 HTML。URL 未变且 sitemap 已被 Google 发现时，不必反复提交同一 sitemap；重点少量页面可在 GSC URL Inspection 请求重新索引。
新增 URL 时更新现有 sitemap；lastmod 仅记录可验证的实际重要修改，不使用每次构建的当前时间。本站本轮保留原 sitemap，不虚构日期。
GSC 提交状态未取得，不能声称已提交/已索引。请求抓取不保证时间或排名。

来源：[重新抓取](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)、[lastmod](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping)。

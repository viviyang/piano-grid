# PianoGrid Master Context — 新对话共同背景

网站：https://pianogrid.com

## 1. 总目标

PianoGrid 要让用户在一个网站里完成以下主要任务：

- Find chords
- Find scales
- Find keyboard notes
- Find beginner songs
- Find sheet music
- Use practical tools

长期目标：

- 对用户真正有用
- 用户愿意回来、打印、分享
- 获得持续自然搜索流量
- 长期目标：月访问 30 万
- 建立广告、affiliate、自有数字产品、未来付费练习能力

注意：

- 30 万是长期目标，不是当前阶段保证
- 网站刚上线，当前没有足够成熟的 GSC / GA / 转化数据
- 不能用“流量赢家、CTR、转化率”作为当前产品规划前提
- 当前阶段重点是：产品补全 + SEO 冷启动 + 数据开始积累

---

## 2. 当前真实状态

### Chords

状态：

`NO_ADDITIONAL_CHORDS_WORK`

含义：

- 不再重新规划
- 不再做一轮功能补全
- 不再继续为了“完整”扩大量 chord 页面
- 只保留后续人工验收：
  - 听音
  - 真机
  - 读屏
  - 实体打印
  - PDF / accessibility
  - 必要的专业音乐核验

### Scales

状态：

`PASS_WITH_NOTES`

当前 Scales 专项已经执行完成或接近完成。

要求：

- 不重做 Scales
- 不重新规划
- 保留真实 RESULT 中的限制
- 未被证明的能力不能假装支持
- 人工听音 / 真机 / 读屏 / 实体打印仍属于后续人工验收

### Keyboard Notes

下一主模块。

原则：

- 基于当前已有能力做差集
- 不从零重做
- 复用已有 keyboard / staff / audio / content data
- 最终目标是用户可以完成：
  - find
  - understand
  - locate
  - basic practice
  - print / share

### Beginner Songs + Sheet Music

联合规划、分开职责。

Songs：

- 选什么
- 为什么适合
- 从哪里开始弹
- 需要哪些 notes / chords / scales
- 如何进入练习

Sheet Music：

- 具体哪个版本 / arrangement
- preview
- difficulty
- format
- rights / access
- 获取 / 打印

底层作品 / 编配 / 谱面 / 音频必须共用统一数据，不做两套。

### Tools

规则：

相同任务只能有一个业务引擎。

例如：

- chord lookup → 复用 Chords
- scale lookup/practice → 复用 Scales
- note lookup → 复用 Keyboard
- blank sheet → 复用现有 Blank Sheet

`/tools` 首先是能力入口，不是第二套功能实现。

---

## 3. 固定产品原则

所有模块都优先回答：

1. 用户来做什么？
2. 现在已有能力是什么？
3. 和竞品相比真正缺什么？
4. 哪些能力值得补？
5. 哪些能力不要重复做？
6. 哪些必须人工核验？
7. 下一步去哪里？
8. 是否适合 Print / Share？
9. 商业化放在哪里不会破坏核心体验？

---

## 4. 变现原则

当前就考虑，但不抢产品优先级。

### 免费核心

核心查询、基础参考、关键工具保持免费。

### Affiliate

可以考虑：

- 结构化钢琴课程
- 正版 sheet music / licensed edition

前提：

- 真实项目存在
- 获批后再放
- 不编造佣金率

### 自有数字产品

优先方向：

- beginner printable pack
- teacher / practice pack
- keyboard / chord / scale reference pack

不能把现有免费 PDF 原样换封面收费。

### 广告

- 以后可做
- 当前不为了广告破坏交互
- 工具页 / practice 页应 ad-light
- 具体接入等待真实流量和平台准入

### Future Pro

暂缓：

- practice history
- MIDI
- progress tracking
- teacher assignment
- ad-free
- saved practice

除非后续出现明确重复需求。

---

## 5. SEO 原则

- 不做批量低价值页面
- 页面必须对应真实用户任务
- technical SEO 正确
- sitemap / canonical / indexability / internal links 正确
- 每个模块完成即上线并让 Google 开始 crawl/index
- 不等全站全部做完再做 SEO

---

## 6. 代码基线原则

Production revision：

`main@1e3fdec`

它代表线上已部署版本。

另有当前 dirty 工作树：

- branch `codex/chords-b1`
- HEAD `bdcc2e1`
- 含大量未提交历史修改

固定规则：

- dirty 工作树保留
- 不 reset / clean / 覆盖
- 只作为参考
- 新模块开发统一从 production revision 建 clean worktree
- 后续业务代码串行开发

顺序：

Keyboard
→ Songs + Sheet
→ Tools
→ Integration

---

## 7. 新对话必须输出

不是抽象建议。

每个专项必须产出：

A. 当前真实状态  
B. 真实产品缺口  
C. 本轮最终范围  
D. 明确不做什么  
E. URL / 页面职责差集  
F. 内容 / 数据要求  
G. UX / 交互  
H. SEO / 内链  
I. Print / Share  
J. Monetization hooks  
K. QA / 人工验收  
L. 可直接给 Codex 的连续执行 Prompt  

规划对话不能假装代码已经完成，也不能预先写 PASS。

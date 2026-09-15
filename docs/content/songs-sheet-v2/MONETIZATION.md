# 免费核心与商业边界

[已核实｜用户约束] 免费查询、基础参考、关键工具保留免费；暂不建订阅/账号。没有账号和收款授权不收费。

## 本轮明确交付

| 类别 | 放置位置 | 当前状态 | 将来启用条件 |
|---|---|---|---|
| 免费核心 | Song学习区、合法示范/谱、原参考与免费资源 | 保持免费；已完成资产仍须过发布门槛 | 不为了付费转化删除原免费入口 |
| 正版sheet affiliate | 具体外部版本获取框；普通正文后可有小型其他版本选项 | 官方Musicnotes项目存在[S09]；本站批准/追踪/合同未知；普通外链可保留 | 项目准入、账号及广告主批准、真实tracking URL、允许渠道、可验证到具体版本 |
| 自有beginner pack | 核心学习任务之后，先交价值再呈现额外材料 | 本轮只有产品设计，不有假购买CTA | 新素材/编排/说明/审核/许可证＋真实支付交付/退款支持/用户授权 |
| 广告 | 选曲/阅读区域后 | disabled；不预留大空广告位、不加载脚本 | 实际平台准入、流量、隐私/同意要求审核；不做收入保证 |
| Future practice subscription | 仅数据契约 | 不实现、不显示coming-soon购买或价格 | 出现重复需求、真实保存/历史/教师作业等价值、权限及付款授权后另批 |

## 首个自有付费候选（不是已完成商品）

[推断] `Beginner Practice Pack`：围绕右手读谱、左手读谱、换手/节奏设计渐进序列；提供新练习、新任务页、答案/教师提示、空白练习记录，以及清楚的个人/教师使用范围。先制作一个完整可核验单元，再决定售价；不在现在猜定价/收入。

已有Step and Hold等核心材料继续免费。付费差异必须来自新增完整编排和教学用途，而不是更换封面、合并已有PDF或让用户为原来免费的下载付费。

教师许可只授予实际拥有/获得的权利：明确人数/工作室/纸本/数字分发边界。AI输出权利分配不等于拥有可售的独占权，必要的专业与权利审查仍需完成。

## Affiliate细节

官方项目存在≠PianoGrid获批，网络账号存在≠广告主批准。`program_exists`、`site_approved`、`tracking_url`分别存。未批准时普通提供方链接保留，不标Sponsored，不虚称partner，不写佣金。

真正启用时在链接附近清楚说明经济关联，如`PianoGrid may earn a commission if you buy through this link.`；`rel="sponsored"`。FTC强调清楚显著披露，Google提供商业外链标记规则。[S13,S15] 只写这些词不代替真实合同/隐私义务。

不要为了更高佣金将不适合的版本置顶，不隐藏免费版本，不把购买付费谱当继续基础练习的门槛。

## Future Pro只留可迁移的契约

`PracticeTarget { arrangement_id, edition_revision, segment_id, hand_mode, speed_percent }`；未来保存系统只引用这个对象，不能复制音乐与许可记录。

不要建立用户表、OAuth、支付SDK、teacher dashboard、MIDI采集或成绩表。现有接口缺省`null/disabled`，不运行空壳订阅代码。

## 事件与真实性

建议支持：`arrangement_selected`, `practice_start_requested`, `practice_started`, `practice_stopped`, `self_check_recorded`, `score_link_clicked`, `print_requested`, `share_requested`, `publisher_link_clicked`。

只传对象ID、片段、来源页、控件状态；不采集用户姓名/弹奏音频。复用已有已授权分析层；没有collector就只本地开发日志，不能声称GA已收到数据。

`print_requested`不是打印完成；链接点击不是购买；播放完不是弹对；自报不是演奏检测。商业上线与用户价值验证单列结果，不预先假设成熟CTR数据。

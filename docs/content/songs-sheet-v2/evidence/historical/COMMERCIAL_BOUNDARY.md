# 本轮商业边界

[推断｜本轮明确决定] 不接支付，不造购买按钮，不建订阅或教师账号。先交付真实可用的免费能力及准确的外部资源选择。核心样例与原有免费资源保持免费。

## 可以准备，但不能冒充已经营

| 优先级 | 候选 | 本轮动作 | 打开商业入口前的条件 |
|---|---|---|---|
| 1 | 新增原创练习编排、答案与教师教学材料 | 记录产品假设；本包练习用于免费体验/工具链，不直接收费 | 有真实新增内容、适当人类创作/专业审核、可授予的教师使用权、实际交付文件及收款授权 |
| 2 | 正式外部曲谱 affiliate | 保留普通原始链接，记录计划来源 | 网络账号和具体广告主批准、实际条款/适用地区、真实追踪链接、清晰披露；未批准不显示 partner 标识 |
| 3 | 广告 | 只约定不遮谱、不截断播放、不进入打印页 | 全站总控处理实际广告账号/隐私/合规；本模块不擅自安装广告脚本 |

[已核实] Musicnotes 官方有 Rakuten affiliate 页面；检查日公开宣传率为 5%，不是 PianoGrid 的已签佣金。Rakuten 的广告主申请和批准是独立步骤。本轮注册链接读取失败，也没有账号或私有 offer，故 Musicnotes 对此站的具体准入、结算与批准状态仍未核实。详见 MN-AFFILIATE、RA-APPLY、RA-REVIEW 来源。

[推断] 优先销售新增、有明确用途的教学交付，而不是重新包装竞品材料或把原免费 PDF 加锁。AI 输出的合同分配不自动意味着能够出售独家版权；教师许可须有实际权利基础。

## 只记录能诚实测量的事件

建议复用现有合规埋点：version_selected、provider_opened、demo_started、demo_stopped、segment_selected、score_preview_opened、print_requested、share_completed。字段仅用 arrangement_id、resource_kind、segment_id、success/error、page_path。不同事件去重规则由原埋点实现确认。

不得把 demo_ended 记为 learned_song；不能从 print_requested 推断实体打印成功；不能从 provider_opened 推断购买或收入。没有同意/配置的分析系统，不为本模块新接第三方追踪。不收儿童姓名、年龄、邮箱、录音或实际弹奏数据。

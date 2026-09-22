# PianoGrid Feedback — 上线门禁与防刷规则

状态：路径级 Vercel 限流规则已生效并完成匿名请求拦截验证；GitHub 最小权限令牌及三项 Preview 环境变量已配置。新的 Preview 构建受 Hobby 每日部署额度限制，尚未验证真实云端提交；生产反馈功能仍未部署或启用。

## 已核实的环境

- 2026-09-22 通过 Vercel API 核实：`piano-grid` 属于 Hobby 团队，设置规则前没有已启用或待发布的防火墙配置。发布过程中没有升级套餐、添加付款方式或修改环境变量。[Hobby 套餐说明](https://vercel.com/docs/plans/hobby)指出该套餐免费且没有计费周期，超出使用额度通常暂停相应功能。
- [Vercel 限流文档](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting)列出 Hobby 可用固定窗口限流，每项目一条规则、每月包含 100 万次允许请求；文档所述仪表盘首次创建流程有价格确认界面，本次 API 创建未显示该界面。创建后再次查询，团队仍为 Hobby；未订阅付费套餐。
- [Cloudflare Turnstile 免费套餐](https://developers.cloudflare.com/turnstile/plans/)可作备选，但会增加独立的浏览器脚本、服务端校验及外部账号。PianoGrid 已使用 Vercel，[推断]先用现有平台的路径级限流可减少接入点。

## 已生效的 Vercel 规则

| 字段 | 当前值 | 理由 |
| --- | --- | --- |
| 名称 | `feedback-post-rate-limit` | 单独识别反馈接口 |
| 条件 | Request Path **Equals** `/api/feedback` **AND** Method **Equals** `POST` | 避免影响页面及其他 API |
| 动作 | Rate Limit → Fixed Window | Hobby 支持 |
| 计数键 | IP address | 无登录用户，也不信任浏览器自报标识 |
| 窗口与阈值 | 每个 IP 每 10 分钟最多 5 次 | [推断]适合低频意见反馈的首轮试运行；共享网络可能误伤，应观察后调整 |
| 超限响应 | 429 | 浏览器已支持非 JSON 的边缘 429 响应并保留表单输入 |

通过 Vercel API 创建后，读取配置发现规则直接成为 active，未留下 draft；这是本次 API 返回后的实际状态。规则 ID `rule_feedback_post_rate_limit_AoLQBq`，仅匹配上述路径与方法。生产当前尚无反馈接口；使用空 JSON 连续发起 7 次请求，前 5 次为 404，第 6、7 次为 429。`GET /` 与 `GET /robots.txt` 均返回 200。该验证证明边缘限流生效且未影响这两个公开 GET 路由；尚未验证反馈功能上线后的完整链路，也未测共享 IP 误报。仅有 honeypot、客户端按钮锁或 GitHub API 限额均不满足本站的防刷门禁。

## 上线顺序

1. [已完成配置，待真实调用验证] GitHub 细粒度令牌 `PianoGrid feedback (Vercel)` 仅选择 `viviyang/pianogrid-feedback`，仓库权限为 **Issues: Read and write**（GitHub 自动附加必需的 Metadata: Read-only），无账户权限；有效期至 2026-12-21。令牌已由账户持有人直接保存为 Vercel **Preview Secret** `FEEDBACK_GITHUB_TOKEN`，未写入代码或 Git。到期前须轮换；不要使用本地开发测试用的广权限凭据。
2. 确定谁能访问私有 Issue、邮箱使用期限、关闭后的清理和删除流程。Issue 关闭不等于删除。将真实的第三方处理说明纳入适用的隐私文案；前台无需公开技术接收仓库名称。
3. 在预览环境验收完整链路：真实创建并清理测试 Issue、合法浏览器提交、无效 Origin/字段、429、GitHub 失败、手机与读屏体验。正向 `Yes` 事件要验证 GA4 可用且不会产生 Issue。
4. [已完成部分] Vercel 路径级规则已发布，第 6 次匿名 POST 得到 429，首页和 robots 未受影响。仍须在预览部署的真实接口上复验合法提交、超限提示、共享 IP 误报和反馈 Issue 量。
5. 上述门禁全通过后，才在生产设置 `FEEDBACK_ENABLED=true`、仓库和令牌，重新构建并部署。根布局的静态页面入口在构建时确定，单纯修改环境变量不会立即更新已发布页面。

如果试运行中出现集中滥用、分布式请求或大量人工刷入，[推断]单纯按 IP 限流可能不足，需评估 Turnstile 或其他保护。紧急停止时应回滚到反馈入口关闭的部署；服务端开关也需单独检查，不能只隐藏前台按钮。

[已核实] `FEEDBACK_GITHUB_REPOSITORY=viviyang/pianogrid-feedback` 与 `FEEDBACK_ENABLED=true` 已作为 Vercel **Preview Config** 保存；三项新变量均只显示 Preview 作用范围。生产没有配置这些变量，代码的默认开关为关闭。环境变量变更需要新部署才能生效。

[已核实] 从已提交反馈分支尝试新建 Preview 部署时，Vercel CLI 准备上传约 1.1 GB 本地文件，该上传已取消。随后对既有反馈分支 Preview 部署（源提交 `380d585`，包含反馈实现）执行 `vercel redeploy --target preview`，Vercel 返回 HTTP 402，错误为 `api-deployments-free-per-day`（每日超过 100 次，提示 24 小时后再试）。没有升级 Hobby 套餐或改动生产部署。免费额度恢复后应重新部署该 Preview，验证新环境变量是否进入构建，再执行第 3、4 步的云端验收；在此之前不能声称令牌已完成真实写入测试。

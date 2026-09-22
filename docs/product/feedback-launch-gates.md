# PianoGrid Feedback — 上线门禁与防刷规则

状态：候选配置，尚未发布到 Vercel；`FEEDBACK_ENABLED` 继续保持 `false`。

## 已核实的环境

- 2026-09-22 通过 Vercel API 核实：`piano-grid` 属于 Hobby 团队，项目当前没有已启用或待发布的防火墙配置。没有修改团队套餐、账单、环境变量或防火墙。
- [Vercel 限流文档](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting)列出 Hobby 可用固定窗口限流，每项目一条规则、每月包含 100 万次允许请求；首次创建规则时会出现价格确认界面。实际计费以项目账单和确认界面为准。
- [Cloudflare Turnstile 免费套餐](https://developers.cloudflare.com/turnstile/plans/)可作备选，但会增加独立的浏览器脚本、服务端校验及外部账号。PianoGrid 已使用 Vercel，[推断]先用现有平台的路径级限流可减少接入点。

## 待审阅的 Vercel 规则

| 字段 | 候选值 | 理由 |
| --- | --- | --- |
| 名称 | `feedback-post-rate-limit` | 单独识别反馈接口 |
| 条件 | Request Path **Equals** `/api/feedback` **AND** Method **Equals** `POST` | 避免影响页面及其他 API |
| 动作 | Rate Limit → Fixed Window | Hobby 支持 |
| 计数键 | IP address | 无登录用户，也不信任浏览器自报标识 |
| 窗口与阈值 | 每个 IP 每 10 分钟最多 5 次 | [推断]适合低频意见反馈的首轮试运行；共享网络可能误伤，应观察后调整 |
| 超限响应 | 429 | 浏览器已支持非 JSON 的边缘 429 响应并保留表单输入 |

规则须先在预览环境验证条件与拦截效果，再启用生产反馈入口。Vercel 防火墙规则可能应用于同项目的多个部署；发布规则会即时改变线上流量处理，不能把保存草稿当作已生效保护。正式启用前复核匹配范围、首次价格确认界面和现有流量。仅有 honeypot、客户端按钮锁或 GitHub API 限额均不满足本站的防刷门禁。

## 上线顺序

1. 在 GitHub 创建只对 `viviyang/pianogrid-feedback` 授予 **Issues: write** 的细粒度运行令牌；不要使用本地开发测试用的广权限凭据。将令牌仅存于 Vercel 服务端环境变量，检查预览与生产作用范围。
2. 确定谁能访问私有 Issue、邮箱使用期限、关闭后的清理和删除流程。Issue 关闭不等于删除。将真实的第三方处理说明纳入适用的隐私文案；前台无需公开技术接收仓库名称。
3. 在预览环境验收完整链路：真实创建并清理测试 Issue、合法浏览器提交、无效 Origin/字段、429、GitHub 失败、手机与读屏体验。正向 `Yes` 事件要验证 GA4 可用且不会产生 Issue。
4. 在 Vercel 配置并验证上述路径级限流，确认连续第 6 次请求得到 429，同时其他路径不受影响。观察共享 IP 的误报和反馈 Issue 量。
5. 上述门禁全通过后，才在生产设置 `FEEDBACK_ENABLED=true`、仓库和令牌，重新构建并部署。根布局的静态页面入口在构建时确定，单纯修改环境变量不会立即更新已发布页面。

如果试运行中出现集中滥用、分布式请求或大量人工刷入，[推断]单纯按 IP 限流可能不足，需评估 Turnstile 或其他保护。紧急停止时应回滚到反馈入口关闭的部署；服务端开关也需单独检查，不能只隐藏前台按钮。

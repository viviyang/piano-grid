# Scales 测量字典

实现入口：`src/lib/scale-events.ts`。默认 `NEXT_PUBLIC_PIANOGRID_ANALYTICS_PROVIDER=none`；候选仅允许值 `ga4` 时尝试复用已存在的 `window.gtag`，且本地 `pianogrid:optional-analytics-consent` 必须为 `granted`。代码不加载 GA4 SDK；脚本缺失、拒绝、撤回、localStorage 异常或广告屏蔽都返回 `externallySent=false`，免费工具继续工作。

| 事件 | 含义 |
|---|---|
| `scale_reference_viewed` / `scale_reference_changed` | 初始参考展示 / 有效设置或 view 变化 |
| `scale_playback_started` / `stopped` / `error` | 示范开始、停止原因、错误 |
| `scale_practice_started` / `stopped` / `self_reported` | 跟练会话及用户自报；不是演奏评分 |
| `scale_question_revealed` / `submitted` / `reset` | attempt 级答案揭示、首次提交、重置；提交含 `assisted` |
| `scale_finder_result` | 已执行查找，含选择数/匹配数，不含自由输入 |
| `scale_resource_requested` | 真实 PDF anchor 请求；不等于下载完成 |
| `scale_print_requested` | 调用原生打印入口；`afterprint` 不计成功 |
| `scale_related_reference_opened` / `scale_next_task_opened` | 关系页与下一任务真实 anchor |

统一白名单包含 `page_path`、`release_version`、对象/形式/view/手别/方向/范围、节奏、attempt/assisted/status、停止原因、资源与目标等枚举字段。不得上报邮箱、自由文本、用户演奏或音频。`checks/launch-monetization/events/validation.json` 为本地 8/8；真实后台仍为 `BLOCKED_ACCOUNT`。

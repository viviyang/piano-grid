# 后续固定Prompt（到对应节点再用，不并行改共享代码）

## B05（当前release已验证后，新开一个Cursor实施任务）
```text
这是PianoGrid B05正式实施。先读最新仓库规则、当前release handoff，以及release-closeout/05_B05_First_10_Minutes_实施规格.md。
只执行B05，不重做已存在三版本卡片，不扩曲库，不新增公开URL。
按规格审计exact version。若缺托管权限/准确事件数据，完成外部指导轨道A并明确轨道B的BLOCKED_CONTENT，不镜像外部谱或补造音符。
UI、导航、英文内容与分享按已定规格实现，复用现有theme/keyboard/audio/share/content owners。
中途不重新询问产品方向。完成测试、Desktop/Mobile截图、版本证据、能力矩阵、交接后停止，不commit/push/deploy。
```

## B06（B05已交接；允许其站内曲谱轨道有内容阻塞，资源不依赖歌曲资产）
```text
执行release-closeout/06_B06_Teacher_Printable_实施规格.md。
基于最新代码，复用Labeled/Blank/Print/Share，制作C4–C5参考+练习+答案3页资源及既有页面入口。
Letter/A4逐页渲染核查；不变更旧参考打印规则，不新增资源URL路由。
准备5个经核验的相关外联候选与邮件草稿；不自动发信、注册、购买链接。
完成测试、资源预览、内容/资产来源、交接后停止，不commit/push/deploy。
```

## B07（相关功能与资料已完成）
```text
执行release-closeout/07_B07_SEO与测量实施规格.md。
以最新路由与真实功能为事实，只做allowlist内意图/首答/TDH/内链/可观测性优化。
不重做全量关键词，不造KD/排名/流量，不批量新页，不改主题，不把query canonical叫做绝不索引。
查清事件collector的实际状态；有已授权provider才接入，只有CustomEvent则明确INSTRUMENTED_NOT_COLLECTED。
完成抓取、视觉/内容回归、事件证据、SEO diff和handoff后停止，不commit/push/deploy。
```

## 各批次发布
沿用04的“实际门禁→明确授权→范围化部署→线上冒烟”。不重新安排一个全新AI审查流程；同批实现者先执行测试与证据化自查，用户仅处理权限、真机和必要专业内容验证。
每个批次保留独立任务上下文，但使用上一批最新完成的代码，不回到旧main或旧worktree。

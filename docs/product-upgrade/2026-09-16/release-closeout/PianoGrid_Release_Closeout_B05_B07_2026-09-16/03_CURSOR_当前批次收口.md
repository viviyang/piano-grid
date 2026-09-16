# Cursor Auto｜当前B02/B03/B04发布收口

直接执行本Prompt，不要求用户重新决定UI或再读全部报告。

## 输入
当前repo/worktree；本包00/01/02/09；已批准Keyboard设计v2和B04设计v2。旧handoff仅定位，不能覆盖当前源。

## 授权与范围
本轮已授权RC01–RC08的定点修改、测试、文档和本地/已有预览环境截图。
未授权commit/push/deploy、B05+代码、外联发信、新付费依赖或全站主题改动。

## 按以下步骤连续完成
1. 读取AGENTS/现有项目规则、git status、HEAD、staged/unstaged/untracked。保存安全的pre-RC范围快照与hash；不得reset/rebase/切到旧基线。
2. 将RC01–RC08逐条映射到最新owner。验证已修复的问题直接记录证据；新缺口按02规格实现。音频契约必须读实际ReferenceAudio后再适配。
3. 执行顺序：RC03+RC06音频/状态 → RC02入口 → RC05生命周期 → RC01样式与RC04披露 → RC07交付+RC08全回归。
4. 实际打开批准稿截图和当前页面。恢复缺失的布局规则；组件CSS随owner加载；不重新设计或引入新配色。
5. 执行09中的用例，特别覆盖默认直开路由、从其他页客户端导航、390/1440、reduced motion、音频失败与Replay竞争、当前分享URL更新。
6. 验证当前v1 preset在既有seed的题序不变；不把新runId写入分享URL，不增加身份或成绩参数。
7. 同树运行现有unit/browser/check/build/diff检查。出错只修本批相关项；既有无关失败记录为BASELINE_FAILURE，不瞒报也不扩展大修。
8. 符合验收后生成release-candidate交接目录：
   - RESULT.md（未做的人工门禁）
   - RC_MATRIX.md（现状、修复owner、测试case、证据）
   - TEST_REPORT.md + raw-results/*.json + command logs
   - UI_COMPARE.md + screenshots/index.json
   - ROUTE_DIFF.md（RC新增公开URL=0；保留B04已有base）
   - DATA_AND_EVENT_STATUS.md（collector实际状态，不模拟用户数据）
   - MANUAL_CHECKS.md（仅剩必须真人的步骤、可访问预览链接）
   - ROLLBACK.md + PRE_RC_MANIFEST.json + RELEASE_SCOPE.json
   - handoff完整scope源码/新增资产、clean patches、SHA256 manifest
9. 做交接恢复演练或记录无法演练的明确原因，不得把路径列表当作可回滚证明。
10. 完成后停止，输出`READY_FOR_MANUAL_ACCEPTANCE`；有阻塞则`NEEDS_FIX`。不能仅因测试全绿标READY_FOR_PRODUCTION。

## 最终回复（不要再写长篇总结）
状态；修了哪些RC；自动失败数；仍待人工项目；预览URL；交接目录/ZIP/SHA256；未提交未部署。

## 停止规则
只有权限、数据/授权依据缺失、无法复现的代码冲突、或真实发布阻塞才提问。布局间距/按钮文案/owner选择已由本包决定，按最小适配执行。不要中途每张截图询问确认。

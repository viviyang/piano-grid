# Keyboard Notes v2 — Test Report

日期：2026-09-15  
分支：`codex/final-integration`  
基线 HEAD：`0eac35156271095c35cf08680f7c6314a587cb74`

## 自动检查

| 命令 | 结果 |
|---|---|
| `npm run check` | [已核实] PASS。Foundation `565 passed / 0 failed`；TypeScript PASS；CSS/Tailwind v4 semantic check PASS。 |
| `npm run check:keyboard-completion` | [已核实] PASS，`40 passed / 0 failed`。 |
| `npm run build` | [已核实] PASS；Next.js 编译、TypeScript、210 个静态页面生成完成。 |
| `node scripts/check-integration-data.mjs` | [已核实] FAIL，`129 passed / 23 failed`；失败均为当前 worktree 中受保护源与 manifest 的历史哈希不一致，这些源不在本轮 diff 中。本轮没有更新/伪造 manifest。 |
| `PIANO_BASE_URL=http://localhost:3115 node scripts/check-integration-batch.mjs` | [已核实] 部分完成，`95 passed / 10 failed`；9 项是脚本旧 title 期望与当前 title 不一致，随后 `/chords/finder` 30s 加载超时。结果保存在 `checks/.../regression/integration-batch/validation.json`。 |

## 浏览器定向回归

- [已核实] 2026-09-16 反馈修正后重新执行 `npm run check`、`npm run check:keyboard-completion`（40/40）与 `npm run build`（210/210），均通过。
- [已核实] 1440×1000 检查 Start、Question、Wrong；390×844 检查 Start、Question、Results、Share bottom sheet。Question 首屏包含进度、分享预告、完整任务标题、局部键盘和反馈区。
- [已核实] 390px 浏览器度量为 `innerWidth=390`、`documentElement.scrollWidth=375`，没有整页横向溢出。
- [已核实] 首页 Hero 同源 `RollingText` 已在 S1 Start 主按钮上通过键盘 `focus-visible` 验证：current track 上移、next track 回到 0；新开样板页控制台 error 为空。
- [已核实] 390px Mobile Explore 中，88-key overview 内部 keyboard 高度为 `22.4px`、overview 总高度为 `35.2px`；`documentElement.scrollWidth=375`，没有横向溢出。
- [已核实] 两个 mode tabs 内 `.pr-rolling-text` 数量为 `0`；tabs 保持静态文字与选中下划线，其他文字 action buttons 继续使用 Hero 同源动效。

- [已核实] 默认 `/keyboard-notes` 不出现 S1 tabs，原生产 lookup/practice 仍存在；只有环境变量与 `practice-sample=1` 同时成立才进入样板。
- [已核实] Wrong：错选键 1 个，correct/revealed 0 个；第一次答错不显示正确答案。
- [已核实] Hint：不产生 selected/correct key；Show answer 后才出现且只出现 1 个 revealed key。
- [已核实] D 提示为“between the two black keys”。
- [已核实] 真实随机 10 题流程得到 8/10；错题复习后返回仍显示原始 8/10 与原 missed-note 清单。
- [已核实] Explore 搜索 `C7` 后选中 C7，并把可见范围移到 G6–G7；`H4` 保留可见 invalid message。
- [已核实] Mode tab 键盘方向键移动焦点且不自动切换答案；切换模式保留 Explore 当前 note。
- [已核实] Leave practice 的 Cancel 保留当前题；Confirm 回到 Start。
- [已核实] Receiver 从 fresh round 开始，不显示发送者成绩或答案。
- [已核实] 320px 与 768px 检查没有元素越出 viewport；320px `clientWidth=scrollWidth=305`（浏览器滚动条占用后的内容宽度）。
- [已核实] 最终新开本地样板页控制台 error 列表为空。

## 截图

- [已核实] Desktop：Explore、Start、Wrong、Hint、Results、Share，全部 `1440×1000`。
- [已核实] Mobile：Explore、Start、Question、Wrong、Results、Share、Receiver，全部 `390×844`。

## 未通过项的解释边界

[推断] 集成数据哈希与旧 title 断言不由本次 S1 引入，依据是这些保护源、metadata 文件不在本轮修改列表；但没有用户授权，本轮不改写其基线或扩大为全站修复。

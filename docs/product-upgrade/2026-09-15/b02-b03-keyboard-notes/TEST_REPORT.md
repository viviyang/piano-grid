# Keyboard Notes B02/B03 — Test Report

日期：`2026-09-16`

## 自动验证

| 命令 | 结果 |
|---|---|
| `npm run check` | [已核实] PASS。Foundation `565/565`；TypeScript PASS；CSS/Tailwind v4 semantic check PASS。 |
| `npm run check:keyboard-completion` | [已核实] PASS，`51/51`。新增 preset 往返、非法参数、确定性题序、三桶分类与错题去重。 |
| `npm run check:keyboard-practice` | [已核实] PASS，`79/79`。报告：`checks/product-upgrade-2026-09-15/b02-b03-keyboard-notes/browser-results.json`。 |
| `npm run check:practical-tools` | [已核实] PASS，`44/44`；既有 `/keyboard-notes#note-trainer` owner anchor 已迁移到新版 Start。 |
| `npm run build` | [已核实] PASS，exit code `0`；编译与 TypeScript 通过，静态页面 `210/210`。8 个既有 Chords 页面首轮超过 60 秒，Next 自动重试后全部生成。 |
| `git diff --check` | [已核实] PASS；没有 whitespace error。 |

## B02 状态回归

- [已核实] Desktop 1440×1000 与 Mobile 390×844 均实际完成 Start → Question → Wrong → Try again → Hint → Correct → Reveal → Result → Review。
- [已核实] 首次错答只产生一个 `wrong` key，目标键保持 `idle`；Hint 不选择答案；Show answer 后才出现一个 `revealed` key。
- [已核实] 测试轮得到 `8 first try / 1 with help / 1 revealed`，三桶合计 10。
- [已核实] 同一事件循环双击 Next 后仍停在 Question 4，而不是跳到 Question 5。
- [已核实] Review 只包含非 first 的去重音符；Review 完成后原结果仍为 8/1/1。
- [已核实] Explore ↔ Practice 切换保留当前错答状态；显式 Leave 才清除本轮。
- [已核实] 无 AudioContext 时仍可完成视觉练习；reduced-motion 下滚动文字 transition 为 `0s`。

## B03 分享回归

- [已核实] Copy link 生成同一路径的 `v1 + option + seed + count` preset；不含答案、结果或身份字段。
- [已核实] 接收者链接还原与发送者相同的第一题和确定性题序，但从自己的 Start 开始。
- [已核实] `navigator.share` 收到与 Copy 相同的 URL；取消不显示成功或错误。
- [已核实] Clipboard 拒绝时显示带 label 的可选择只读 URL。
- [已核实] `v9`、未知 option、负 seed、错误 count 均被 validator 拒绝并进入安全 fallback。
- [已核实] query preset 页 canonical 仍为 `https://pianogrid.com/keyboard-notes`。

## 视口与共享 owner

- [已核实] 320、390、768、1440 无整页横向溢出；390px 下 200% 文本无横向溢出。
- [已核实] Chart 61-key 键数与 exact MIDI 选择、Labeled 61-key、Frequencies C4、Blank、Finger Numbers 路由通过共享 owner 回归。
- [已核实] `/chords/a-minor` 与 `/scales/c-major` HTTP smoke 为 200；本轮未修改其实现。
- [已核实] 浏览器回归最终没有 pageerror 或 console error。

## 截图

- [已核实] Desktop 共 11 张：Explore、Start、Receiver、Question、Wrong、Hint、Correct assisted、Revealed、Result、Review、Share。
- [已核实] Mobile 共 11 张，同一组状态，均来自最终通过的自动状态流。

## 测试中发现并修复

- [已核实] 首轮浏览器回归发现 Next 锁在 React 状态提交前过早释放，快速双击可能跳过一题；锁现改为在 index/phase 提交后释放，最终回归通过。
- [已核实] 首轮 200% 文本检查发现 Mobile Explore 身份区与范围按钮产生横向溢出；改为保持原层级的弹性换行布局，最终 `scrollWidth=innerWidth`。

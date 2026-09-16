# Keyboard Notes v2 — Visual Compare

## 对照方法

- [已核实] 实际打开并检查了 `01_可点击设计稿.html` 的 Explore、Start、Wrong、Hint、Answer、Results、Share、Receiver。
- [已核实] 逐张查看 `screens/desktop/` 与 `screens/mobile/` 对应 PNG，并在本地并排页中比较主内容起点、音名、琴键、反馈、动作层级、移动堆叠与 dialog。
- [已核实] 最终截图使用同一浏览器画布：Desktop `1440×1000`；Mobile `390×844`。截图前校验页面顶部；Desktop 截图由浏览器输出的 1001px 高图机械裁去最末 1px，以消除截图后端像素取整。

## Desktop 1440×1000

| 状态 | 参考 | 实现 | 结果 |
|---|---|---|---|
| Explore | `keyboard-notes-v2/screens/desktop/01-explore.png` | `checks/.../desktop/01-explore.png` | [已核实] 音名与键盘为主体；搜索次级；range/minimap 与 Practice CTA 后置。 |
| Start | `screens/desktop/02-start.png` | `desktop/02-start.png` | [已核实] 直接 Start，无 tutorial question；只保留任务必要信息。 |
| Wrong | `screens/desktop/04-wrong.png` | `desktop/04-wrong.png` | [已核实] 错键、反馈、Try again / Hint / Show answer 分级；不亮正确答案。 |
| Hint | `screens/desktop/05-hint.png` | `desktop/05-hint.png` | [已核实] 提示不选键；正确键仍不可见。 |
| Results | `screens/desktop/08-results.png` | `desktop/08-results.png` | [已核实] 两列结果/复习、三桶轨道、分享条在首屏。 |
| Share | `screens/desktop/10-share.png` | `desktop/10-share.png` | [已核实] 居中 dialog；Primary 仅 Copy practice link。 |

## Mobile 390×844

| 状态 | 参考 | 实现 | 结果 |
|---|---|---|---|
| Explore | `screens/mobile/01-explore.png` | `mobile/01-explore.png` | [已核实] 当前音名、keyboard、范围控制按单列堆叠；无整页横向溢出。 |
| Question | `screens/mobile/03-question.png` | `mobile/03-question.png` | [已核实] 局部键盘与任务处于首屏主层级。 |
| Wrong | `screens/mobile/04-wrong.png` | `mobile/04-wrong.png` | [已核实] 错误标记、反馈、动作组保持可读和 44px 控件。 |
| Results | `screens/mobile/08-results.png` | `mobile/08-results.png` | [已核实] score → review → share 顺序与确定稿一致。 |
| Share | `screens/mobile/10-share.png` | `mobile/10-share.png` | [已核实] dialog 变为 bottom sheet；动作单列。 |
| Receiver | `screens/mobile/11-receiver.png` | `mobile/11-receiver.png` | [已核实] fresh start，不含发送者成绩/答案。 |

## 对照中已修复的漂移

- [已核实] Explore 从纵向说明堆叠改为音名/说明/搜索三列顶区与横向主键盘。
- [已核实] Results 从过高卡片改为稿件的 summary + review 双列及移动单列。
- [已核实] desktop dialog 从页面左上修为居中；mobile 采用底部 sheet。
- [已核实] 移动黑键异名文本避免换行拥挤；Question 反馈与 actions 保持首屏可读。
- [已核实] 最终保留的差异均来自主题合同：PianoGrid 真实 header/nav、系统字体、真实 token、真实随机 note/result 与真实参考文案。

截图根目录：`checks/product-upgrade-2026-09-15/s1-keyboard-notes-v2/`。


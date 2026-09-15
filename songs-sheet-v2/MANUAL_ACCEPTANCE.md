# Manual acceptance — actual status

[已核实] 本文件记录真实状态，不把自动截图、PDF 渲染或静态分析冒充真人验收。

## 已完成的辅助检查

- 自动 Chromium：8 页在 320/390/1440 无整页横向溢出，SEO、share、print CSS、无 JS、旧 Songs 内容和既有 Chords/Scales/Keyboard smoke 通过。
- 对 4 张代表性截图做了屏幕视觉检查：Sheet root desktop、Beginner 320、Songs Easy desktop、Twinkle 390；未观察到明显裁切或重叠。
- 6 个原创 PDF（3 练习 × A4/Letter）已渲染为单页图像并做屏幕视觉检查；纸张尺寸正确，未观察到明显裁切。Poppler 报字体替换警告，且 PDF 均未 tagged。
- staging 资产、客户端输出和 build trace 泄漏检查为 0。

## 人工门槛

| ID | 状态 | 说明 |
|---|---|---|
| M01 | NOT_RUN | 未在真实 Windows Chrome/Edge 与 iPhone Safari 由人工验收 |
| M02 | NOT_RUN | 未完成真人全键盘路径验收 |
| M03 | NOT_RUN | 未用 NVDA / VoiceOver |
| M04 | NOT_RUN | 未用实体键盘逐音比对 3 原创 |
| M05 | NOT_RUN | 未真人听快速连点、后台、打印与跨路由停止 |
| M06 | NOT_RUN | 未真人确认 50/75/100 音高不变与片段起止 |
| M07 | NOT_RUN | 未实体打印 A4/US Letter 各 3 份 |
| M08 | NOT_RUN | 未从 6 张实体打印读回站链接 |
| M09 | NOT_RUN | 未人工完成断网、音频阻止、404、剪贴板拒绝矩阵 |
| M10 | NOT_RUN | 未具名专业审核三份乐谱/音乐内容 |
| M11 | NOT_RUN | 未对 P106 provider 谱面逐项人工核验 |
| M12 | NOT_RUN | 未由权利负责人确认全球公开与各层许可相容 |

最终人工表单应记录：执行人、日期、设备/浏览器或打印机、base/final commit、arrangement/revision/asset hash、动作、结果和证据。一次通过不得跨版本复用。


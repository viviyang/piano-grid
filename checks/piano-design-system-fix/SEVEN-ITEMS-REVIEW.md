# 七项修改与页面复查

2026-09-21。独立分支 `codex/c-major-design-correction`，本地预览 http://localhost:4327/chords/c-major 。未提交、推送或部署。

## 实施结果

[已核实] 已完成确认的七项：普通播放状态不再占用可见行；首页与详情页共用琴键表面与品牌样式、保留各自视角；首页琴身标语移除；练习主按钮并入操作栏；练习时保留参考章节标题并允许主动展开；Hint shown / Stop sound 状态明确；只保留上方打印与下载入口。旧打印锚点转到上方操作，搜索中移除已删除的打印章节。

[已核实] 主动展开参考章节会保留当前练习并记录 viewedReference；先看答案再展开参考仍保持 revealed 分类。开始/恢复练习时折叠参考内容，题目帮助记录不因清空或重试而消失。普通琴键播放不逐键写入 live region；自动播放保留读屏状态，静音与异常仍可见。

[已核实] 本轮复查修复了章节标题语义、展开区 accessible name，以及看过答案后帮助说明错误降级的问题。首两个参考区的布局选择器改用 nth-of-type，使新增辅助说明不影响列布局。

## 实际审查流程与证据

1. 参考模式：检查摘要、谱表、播放控制和主练习入口；打印与 PDF 各一个。截图：audit-reference-viewport.png、audit-controls-viewport.png。
2. 练习模式：进入后章节标题保留且内容折叠；展开参考后答对显示 Correct with help；Hint 使用后禁用并改名，查看答案后隐藏；Clear 清空音符。截图：audit-practice-viewport.png。
3. 首页：品牌副标语已消失，琴键表面与详情页使用同一 CSS；原透视与单音/和弦播放保留。截图：audit-home-viewport.png。
4. 生产预览：逐音播放时 Stop sound 可用，停止后禁用；全新练习 C/E/G 答题仍为 independent；设置 Escape 关闭后焦点返回 Sound settings，canonical 不变。
5. 指法区：查看左右手内容和上方说明。截图：audit-fingering-viewport.png。

所有下列采用的截图均来自本轮实际打开并检查的窄屏视口。全页截图 audit-practice.png 出现缩放/拼接异常，已拒绝作为视觉证据。宽屏以 DOM 几何检查为证据，不声称完成宽屏截图验收。

![参考摘要](./audit-reference-viewport.png)
![谱表和操作栏](./audit-controls-viewport.png)
![练习与参考区](./audit-practice-viewport.png)
![首页钢琴](./audit-home-viewport.png)
![指法说明](./audit-fingering-viewport.png)

## 还建议调整的地方（未擅自扩大修改）

1. [已核实] 摘要显示 C–E–G / 1·3·5，信息卡再次显示 Notes / Formula，键盘上方又有 Formula。[建议] 下一轮可合并重复字段，保留“音级并非指法编号”的解释；此处仍按用户此前确认的完整信息布局保留。
2. [已核实] 双手指法区顶部仍是仅说明右手的原文“RH root position only…”，下方首先显示左手图。[建议] 将该原文放到右手示例内部，双手区顶部改成适用于两手的说明；音乐来源与指法数据不变。
3. [已核实] 窄屏中谱表处于键盘和播放按钮之间，截图中两者距离较大。[推断] 连续弹奏、听音时需要更多上下查看。[建议] 可把播放操作紧接键盘，谱表置于其后；桌面仍保持并排。

## 验证范围

[已核实] npm run check 通过（Foundation 568/0、TypeScript、CSS）；最终 build exit 0；音频/练习脚本 19 条断言通过；边界检查 78/0。320、390、768、1440 宽度没有页面横向溢出。浏览器结果见 seven-items-browser.json，检查与构建日志见 seven-items-check.log、seven-items-build.log。

[未验证] 本轮未做真实读屏、真机多点触控、物理打印、听音质量和 PDF 无障碍验收。截图与键盘焦点检查不能代替这些验收。

# B06｜Teacher / Printable 完整规格

## 固定产品
一份C4–C5白键认音资料，3页：Reference → Worksheet → Answers & use notes。它不是曲谱，不含他人音乐资产。
目标路径：Labeled资源段→看预览→选Letter/A4→下载/打印→线上匹配练习或转给老师。
不新增资源站，不新增账号，不收姓名/邮箱，不做课堂分组管理。

## 页面与入口
主承载 `/keyboard-notes/labeled#teaching-pack`；在现有工作区之后、长说明之前。
现有88/61键参考默认打印和下载保持原样。新资源主按钮明确叫Download 3-page PDF，不与现有Print reference混淆。
Tools沿既有printables列表加一个项目；Keyboard相关区给一条次级链接。全站header不加一级或新菜单层级。

## 1. Resource单一数据模型
```ts
interface TeachingResource {
  id: 'piano-key-names-c4-c5'; revision: 1;
  kind: 'keyboard-worksheet';
  layoutRange: { startMidi: 60; endMidi: 72 };
  answerPolicy: 'white-key-letter-names';
  pageKinds: ['reference','worksheet','answers'];
  printFormats: ['letter','a4'];
  matchingPractice: { optionId: string; presetVersion: string };
  assets: Record<'letter'|'a4', {pdfPath:string; sha256:string; pageCount:3}>;
  sourceRefs: string[];
}
```
实际类型按当前registry适配。生产几何/名称由现有pitch/layout投影；上面的60/72是产品范围，不是授权另写engine。
共享static keyboard renderer输出SVG给HTML预览与打印。屏幕和PDF答案都从同一projection，不手填两套。

## 2. 资源内容
完整英文见02。三页必须严格相同物理范围、黑键位置、白键顺序。
Reference可写音名/八度；Worksheet标签必须真的消失（不是白色文字或display:none但PDF可提取）；Answers准确给出C4 D4 E4 F4 G4 A4 B4 C5。
教师说明可以给定位建议，不能声称提升效果经验证。无姓名、年级、分数收集。

## 3. 屏幕交互
Paper size: US Letter / A4，默认US Letter；用户可切，别按IP猜测。
三页thumbnail为button，含`aria-pressed`；点击更新当前大预览，预览有caption与文本等价内容。
Download使用当前size静态资产href、建议文件名；不先绑定模糊的生成中按钮。资产构建失败则禁用受影响格式并给可读说明，不能指向404。
Print下拉/轻面板允许“Full pack (3 pages)”或“Worksheet only (1 page)”；preview和操作始终说明当前选择。单页Worksheet必须独立成文：页码1 of 1，答案提示改为资源页链接；不能沿用“看第3页”却不给第3页。
Share使用资源base锚点+必要已支持格式参数；不需要个人状态。改变size后清理旧copy状态。
匹配在线练习从现有B03 builder构造天然白键C4–C5 option，不硬编码旧seed。失败要可见，不跳到黑键模式。

## 4. 生成和打印
优先沿现有PDF/static renderer/generation脚本；可扩展新resource adapter，但不引入第三方音乐引擎、付费服务或新音高库。
Letter portrait (8.5×11in) / A4 portrait (210×297mm) 各一份3页PDF；可另生成worksheet-only 1页静态资产，或者使用已有print选择机制。
若项目无现成PDF生成链，采用项目已有可用headless browser + print HTML脚本生成静态PDF；不能用截图栅格化替代可读文字/矢量键盘。缺工具时记录唯一必要依赖及理由，不自行升级全站依赖。
生产使用项目可合法嵌入字体，或PDF标准字体；不把容器字体文件复制进包。

### 打印CSS与状态
新print target必须resource id隔离，不能全局把旧88/61参考改成portrait。
page margin至少约14–16mm；键盘与标题不跨页；每页显式page-break，最后无多余空白页。
打印前关闭ShareDialog或排除全部overlay；打印后/取消后还原纸张/选页选择，不污染下一次旧Labeled print。
`afterprint`事件不是实体打印成功证据，事件名只能print_dialog_closed。
宽度在纸张下重排；保留每页页码、版本、清晰资源短路径；不植入跟踪参数或儿童资料。

## 5. 页面样式
遵守03与design teacher视图。现有Keyboard保持已批准样式。
资源段左文右预览；小预览直接来自生成页面缩略图，不能放虚构谱图。手机不横向挤三页，三小缩略横列可容纳后下方一张放大。
PDF页内白背景、黑色键盘、少量主题蓝标题；打印灰度也清晰。文件体积写实测，未测时不写“42 KB”。

## 6. 许可/可访问性
不复制出版社谱面/Logo；资源为本轮自有说明+现有可用几何。沿项目已有资源使用政策，不擅自加CC/可商业再分发条款。
PDF不宣称PDF/UA除非已验证tagging。必须保留对应HTML等价内容与答案文本，供读屏和不便打开PDF用户使用。

## 7. 完成标准
两个3页PDF+必要worksheet-only资产返回成功；无截断、空页、错误标签；纸张控件/preview/download/print一致；在线匹配option合法；共享行为通过跨页冷启动测试。
外联候选和草稿归本批营销准备，未发出状态清楚。不把联系不上5个站点视为允许编造邮箱或背书。

# 页面UX与实际英文内容

[推断] 复用现有主题和组件，以下为明确实施规格，不是本轮已有UI截图验收。

## 1 Songs：从选版本进入学习

首屏顺序：H1和一句任务说明 → 可理解条件 → 版本结果 → 当前选版的学习区。

过滤：版本标题搜索；资源位置（Practise here / External resource）；技能/手别（仅已核对象）；出版方级别独立展示。保留kids/adults/C-major/beautiful/impress等原用途，不把年龄当客观能力，不把C大调当初级。

每张卡：曲名、明确版本/编配者、资源位置、难度依据、一个主动作。点击`See how to start`锚定同页学习区，不新建`/songs/[slug]`。不要让单曲选择必须经过全屏弹窗。

学习区固定回答：

| 区块 | 内容来源 |
|---|---|
| This version fits you when… | 编辑建议，依据已核具体材料 |
| Before you start | 版本实际note/chord/节奏/手别，未知明确“不曾核验” |
| Start with… | 第一手、第一段及3步；无精确谱不虚构小节 |
| Listen / practise | 同版合法本地播放器或外部试听链接 |
| Self-check | 可执行自检，不装作自动检测 |
| Get this score | 同arrangement的Sheet目标/提供方 |

`content-data/english/learning-cards.v2.json`已有6张实际英文学习卡；数据只存编配ID，不在文案再维护一套key/meter/rights。

外部曲目的站内一般热身必须单独显示：`Separate original exercise — not this song.` 不能在歌曲的Play按钮后播放别的曲子，也不能把它算song_practice_completed。

## 2 Sheet Music：明确哪份谱、如何拿到

首屏：曲名＋选中版 → provider/arranger/version → 难度来源、format、access → 一个主获取动作。

有本地合法SVG：显示响应式预览＋可访问文字谱，旁边同版Play/Stop；A4/Letter下载按钮有版次/格式说明。外部版：不热链/iframe第三方图片或PDF充当本站preview，显示`Preview and obtain this edition on [provider]`，直接到准确提供方页；试听同理。

同作品不同版本：选择器同步所有事实和资源，切换必停旧音频；不能用同一首歌A版本谱面＋B版本音轨。没有本地资产可显示完整外部信息，但主文案明确“external edition”。

获取类型固定：本站免费；外部免费直接获取；外部免费表单/账号；外部付费；访问未核实。另显示打印是“本站已允许/依外部所选许可/在线书不可打印/未知”，不要用一个free布尔值处理全部情况。

## 3 集合页的非重复内容

`/songs/easy`负责选择和学习路径；`/sheet-music/beginner`负责初学谱的记谱支持（音名、实际指法数字、手位图）和获取；`/sheet-music/easy`负责较广Easy版本及成人/儿童具体结果；`/sheet-music`保留free/intermediate/worship/hymns/gospel等原任务。

原始任务和资源映射：`content-data/page-section-contracts.v2.json`。不要只渲染三首就删掉这些条件。P106缺实际证据时本页状态保留PARTIAL，不伪称整个“with finger numbers”任务完成。

## 4 播放状态机

`idle → preparing → playing → stopped/ended`，错误到`error/unavailable`。启动只响应用户手势。

本轮已批准：Play、Stop、音量、50/75/100%速度、all/1–2/3–4小节；仅用于匹配events且过门槛的本地练习。默认1×，学习建议可建议0.75×但不自动播放。速度缩放事件时间，不缩放MIDI pitch；静态WAV只做1×参考/回退。

片段缩放从自身起点重新归零；保持声部休止、时值和尾部停止。切版本/速度/片段、路由离开、卸载、beforeprint、页面隐藏：取消所有声音与UI定时器，异步解锁的旧session不能复活。弹一个键前也先取消歌曲调度，避免跨组件叠音。

共享音量只影响当前音频层，0明确静音；不要求完整混音器。现有音频API缺setVolume时在已有引擎最小增补并回归，不新造第二个AudioContext引擎。没有现成接口则先记录差集，再按本包边界实现，不能假装hook已支持。

## 5 移动与无障碍

320/375/390/768宽度和1440桌面，200%缩放；全页不横滚。谱可以局部滚动但按钮/文字不被挤出；焦点清晰、触控不靠hover、控件名字包含曲目/动作。结果数量变化polite播报，不每音打断读屏。

SVG提供标题/说明与文字谱；动态键位高亮不是唯一信息。音量/速度用带label的原生输入；错误有可重试或合法替代，不无限loading。图或声音失败不抹掉已核版本说明。

无JS仍可读版本、步骤及外部/合法下载链接；禁止将整个正文藏在hydrate之后。未就绪控件给明确说明，不给假播放。

## 6 Print / Share细节

打印版使用已选具体版本；隐藏广告/筛选/导航/其他谱。页脚为回站URL＋版本ID/修订，沿用旧PDF的`#pg-ex`别名。A4/Letter文件不能按按钮名猜纸张，需要实测页面尺寸。

分享时保留ID与可支持片段/速度，不保留姓名/账号/健康等个人信息。打开链接只定位，不发声；未知片段或version给可理解错误而不是悄悄切默认。剪贴板失败展示文本URL。

## 7 具体失败文案（英文）

- `This edition is available on the publisher’s website. PianoGrid does not host its score or recording.`
- `This score is not available to preview here. Open the publisher’s edition to check the preview and access options.`
- `Sound could not start. Try Play again, or use the readable score below.`
- `That shared version is not available. No other arrangement has been selected automatically.`
- `Print requested. Your browser controls whether printing is completed.`
- `We have not verified the note range or starting hand for this exact edition.`

不要在正式产品界面显示内部[已核实]中文标签；用英文事实/来源提示。审计字段继续保存在JSON与报告。

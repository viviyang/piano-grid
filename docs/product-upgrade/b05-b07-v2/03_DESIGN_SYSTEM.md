# 视觉与组件交互确定稿

本节为设计决策，不声称项目源码已实现。`design/index.html`与screens明确“做成什么样”。既有主题规则优先于预览fallback。

## 固定视觉
- 保留现有 Logo、Header、Footer、一级导航、主题蓝、字体；不需要Figma、不重做Hero。
- 主容器68rem（若当前foundation已有等价token取该token）；桌面两侧留白自然居中。
- ≥1024：页面纵向节奏64/48/32px；768–1023降为48/32/24；≤767用32/24/16。
- H1约40/32px，H2约28/24px，H3约20/18px；body16px、行高1.6，辅助文字14px。映射现有type tokens，不全站新设字号。
- 颜色映射候选：`--primary`、`--foreground`、`--muted-foreground`、`--background`、`--border`、`--ring`、`--error`、`--pr-font-sans`、`--pr-radius-control`。这些来自历史样式，不代表最新文件未经核查即可用。
- 原型fallback蓝 #2C68C7 只用于演示。生产一律使用现有token；不可用fallback覆盖当前主题。
- 内容区域白底、细分隔线和排版分组；不用整屏浅灰嵌套Card，不给每条说明加badge。
- 可点击控件设计目标≥44px高度；小文字动作同样留足触控区域。普通文字对比4.5:1依据T06，不能仅靠变淡区分禁用。

## 页面 A｜/songs/easy
1. breadcrumb、H1、一句用途；不要防御性文案占首屏。
2. H2 Choose a starting point，三列等高版本卡；≤767改纵向三张，不做轮播。
3. 第一张Twinkle提供蓝色 See the 10-minute plan；其余仅中性查看材料按钮，不能给不存在的plan入口。
4. 版本名/提供者/获取条件必须可见。key/meter/unknown信息进 Edition details，不让用户先看数据库缺项清单。
5. 五步计划位于 `#first-10-minutes`。开始前一行版本+获取方式、短说明、Start the plan主按钮；下方可展开Read all steps。无琴键/播放器占位。
6. 开始后进入紧凑工作区：页面H1约28px/手机24px，通用介绍隐藏，只保留版本与当前步骤；不在每一步重复一个大Hero。桌面240px步骤目录 + minmax(0,1fr)内容；手机单列，Step n of 5+进度线，五步目录折叠。
7. 下方保留原目录/筛选、来源与教育内容；不得删除现有适用页面的搜索入口。

## 页面 B｜确切Sheet Music详情
左侧主体标题、版本名、提供者和获取条件；一个 Open on Hoffman Academy 主操作。
右侧（手机在下）是Practice this edition小区块，Twinkle有plan链接，其余为已知准备说明。
详细音乐字段用dl；只有核验字段展示具体值。Notes/Keys/SourceIDs不堆主屏，不隐藏影响购买/获取的条件。
无许可时不显示谱面占位图、disabled Player或“Download here”。

## 页面 C｜Labeled #teaching-pack
在现有keyboard工作区之后、长篇说明之前加入资源段；不修改窗口已有操作。
左侧描述/格式控件/动作，右侧实际3页预览。桌面比约45/55，手机预览放动作后。
三页缩略图可选，当前页放大；不用modal看完整也能了解内容。
只一个强主操作 Download 3-page PDF。Print this pack、Share resource为次级；格式Letter/A4放在操作前。
不新增邮箱墙。答案页preview明确写Answers，打印选项清楚说明1页worksheet或完整3页。

## 共享交互
- 点击分享先打开统一站内ShareDialog；Copy主动作、原生分享次级；取消不是错误。
- 失败时展示当前可选中文本URL。更换plan/resource/纸张尺寸后旧异步任务不得覆盖状态。
- Dialog打开焦点在标题或主控件；Tab不逃逸、Escape可关，关闭返回原按钮；dialog CSS按需由组件自身加载。
- 切步骤仅改变active显示，不等于用户完成；复选“我做了”才记录self-report。
- Next/Previous不强制用户填写复选，不计时，不制造倒计时焦虑。
- 切步骤后焦点到当前H3（tabIndex=-1），不要把焦点移出文档主流；减少动画用户不强制平滑滚动。
- 学习内容初始SSR存在；交互enhance后可收起，不生成只有一个空div的爬取正文。

## 不通过的样式
三个按钮同为蓝色；段落中混入SOURCE_ID/UNKNOWN枚举；外部材料CTA伪装本站播放；首屏堆五步全文；空白播放器；手机水平页面溢出；Print打开后把ShareDialog一起打印；固定底栏遮住正文或iOS键盘。

## 原型与生产的边界
原型Header/Footer为定位参照，生产保留现有实际导航和品牌，不复制演示wordmark。teacher视图用简短reference-context代表本轮不改的原有工作区；生产必须保留真正88/61键窗口，不把它替换成“Open the live reference”占位行。原型末尾“Open the full catalogue”代表已存在的完整目录，生产保留真实列表与筛选，不生成返回同页的占位按钮。三张卡桌面主操作行对齐；手机自然高度。

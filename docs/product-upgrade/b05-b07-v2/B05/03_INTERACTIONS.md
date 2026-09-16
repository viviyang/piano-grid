# B05｜状态、URL、可访问性、边界

## 状态机
`overview → active(step1…5) → finished`；`shared-intro → overview`；`unsupported-version → available-plan-choice`。
completion不是练琴分数。每步visited、自报checked独立；Next只记visited，不自动勾check。

| 触发 | 下一状态 | 需要保持 |
|---|---|---|
| Start the plan | active edition | 只聚焦当前H3，不自动发声/开外链 |
| Step index click | active chosen | 可跳步；不能清空已勾项 |
| Previous/Next | adjacent | 防重复点击越界；到边界隐藏对应动作 |
| checkbox | selfChecked更新 | 不跳步、不把checkbox状态写进share |
| Open edition | 新标签外站 | 不将“打开”记为“已取得资料” |
| Finish this check-in | finished | 不要求全勾，文案按自报/visited显示，不假报已练 |
| Revisit a step | active | 保留会话内检查；允许再改focus choice |
| Reset | overview | 若有自报先共享确认样式；默认Keep this session |
| share | shared dialog | URL仅plan+revision；接收者从开始页 |

## 轻量状态保存
不加账户/服务器进度。默认内存。为外站返回和意外刷新，可复用现有sessionStorage owner保存非敏感本标签会话state，key必须包含plan+revision。
storage禁用/配额异常时可用内存；不要渲染失败。首次shared URL进入必须让接收者选择开始新会话，不静默继承另一编配session。
不在localStorage新增长期跟踪ID，不上传自报文本。

## URL parser
白名单plan key与整数revision；重复参数/超长值/未知key给安全overview或explicit unavailable，不自动猜版本。
生产构造绝对链接用当前已配置site URL，预览不把localhost硬编码进生产。
普通内部入口hash先解析、选择相应面板、再scroll；尊重reduce motion，别在页面任何加载都滚顶。
共享状态不会写visited/checks/focusChoice。v1以后不能无版本改变计划含义。
浏览器back/forward恢复路径与模式，不制造每次Next几十条history。仅用户选择分享版本/进入计划用必要history，步骤在内存即可。

## SSR与无JS
服务端含H1、版本、卡片href、访问限制和五步内容；无JS仍可读全部步骤并打开provider/Sheet链接。
JS enhancement再将步骤设为单个active视图。无JS不渲染五个不能用的按钮替代正文。
原型为展示采用client脚本，不是生产SSR实现。

## Share
复用B03/B04 ShareDialog UI及异步取消token。复制成功不等于转发成功；取消native share无错误警报。
每次打开读取当前target，不保留上一版本失败URL。feature detect；失败出现当前链接可选中文本。
Dialog focus trap/Escape/restore由原owner管理，禁止复制一个新的modal。

## 边界UI文案
- 无法确认旧版：`This plan version is unavailable. Choose a current plan.`
- 外站未就绪：`You can read the plan first. Open the edition when you are ready.`
- 存储不可用：通常不打扰，仅不承诺刷新保存；显式保存失败才说明`This check-in is available for this visit only.`
- clipboard失败：沿共享owner当前文案，实际URL要正确。
- 已有合法站内素材但加载失败：沿音频owner停止/重试；不切换到另一个版本作为静默fallback。

## In-site受控扩展
只有当前registry所有许可/谱数据/事件核验就绪，才在对应step显式显示同版短乐句与可用播放controls。多声部停止、切steps停止、后台中断和过期回调一律复用owner并加回归。没有此证据的默认交付不包含该分支的假成功截图。

# 直接发给 Cursor Auto｜B05 启动

这是 PianoGrid B05–B07 产品实施；CURRENT_BATCH=B05。
B04 已发布。本轮不重开 RC，不重做 B02/B03/B04。

## 读取顺序
1. 当前仓库 AGENTS.md、.cursor/rules、design foundation、主题与基础组件规范。
2. `docs/product-upgrade/b05-b07-v2/00_START_HERE.md`。
3. `02_SCOPE_BASELINE_COMPONENTS.md`、`03_DESIGN_SYSTEM.md`。
4. 当前批 `B05/01_SPEC.md`、`B05/02_CONTENT.md`、`B05/03_INTERACTIONS.md`。
5. `data/content.en.json`、`data/page-seo.json`、`data/internal-links.json`、`data/task-board.json`、`data/acceptance.json`。
6. 打开 `design/index.html` 的 B05 状态，以及对应 screens。不是只读 HTML 源码。
7. `90_TEST_RELEASE.md`。下一批文档暂不整体加载。

## 权威关系
实际代码/已发布基线决定“已有能力和具体路径”；项目基础样式决定颜色/字体；本包决定本轮页面职责、交互、内容与范围。
旧源码和原型仅供参考，不得复制覆盖当前代码。若本包数据映射与 registry 不同，按实际 ID 建一次 adapter，不另建歌曲库。
本包 v2 对 B05–B07 的细化取代旧包对应段落，不取代已完成 B04 设计。

## 执行
A. 先完成 T00/T01 取证，写 BASELINE.json、OWNER_MAP.md、TOKEN_MAP.md、EDITION_AUDIT.json。确定实际文件路径，不向用户索取代码中可找到的字段。
B. 按 task-board 顺序逐个实施 B05；每项完成立即跑指定测试，记录实际命令、exit code、证据路径。
C. 必须复用当前 Song/Arrangement、共享键盘、音频、ShareDialog、打印、URL、事件和 metadata owner。
D. 依照本稿实现，不重新设计；生产不要复制原型固定题目、模拟完成状态或 fixture 音乐数据。
E. 每个状态一个主动作；维护初始/返回/过期分享/外部资料未就绪/复制失败/窄屏/键盘操作。
F. 外部版本默认轨道必须完成；无合法精确谱数据就不显示本站播放器，不编造音高、节拍、指法。站内样板轨道单独 BLOCKED_CONTENT，不影响独立 B06。
G. 不新增公开业务 route，不改一级导航，不更新依赖、不换全站主题、不引入账户或排行。
H. 不 commit、push、deploy，不发邮件，不授权付费/统计服务。不要删除已有用户改动。

## 自动收口
完成当批 targeted test → 受影响共享 owner 回归 → build/check/diff → 同视口截图 → 内容/内链检查 → handoff。
不能用人工插 DOM 的截图替代失败路径测试。不能把被跳过的用例报 PASS。
输出 `delivery/b05/RESULT.md`、TEST_REPORT、VERSION_AUDIT、ROUTE_DIFF、SCREENSHOT_DIFF、CONTENT_BLOCKERS、NEXT_PROMPT、handoff。
按90文档生成包含新增文件的可恢复交接。
停止状态：B05_READY_FOR_NEXT_BATCH 或 B05_BLOCKED_CORRECTNESS。
前者可以带单独 B05_IN_SITE_BLOCKED_CONTENT；必须把外部指导与站内演奏能力分开说明。

不要在 B05 自动修改 B06/B07 的页面。但本批新UI及内容必须同时带上本批 TDH、正确内链和可访问性，不能等 B07 才补基础正确性。

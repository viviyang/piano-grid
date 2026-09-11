# Codex Prompt — Chords N1 一次批量实施

这是已 push 后的新批次；不要 rewrite history。

先读取本目录全部文件，尤其：
- `01_navigation/navigation.N1.json`
- `02_routes/routes.master.json`
- `02_routes/hub.additions.N1.json`
- `03_categories/major.page.json`
- `03_categories/minor.page.json`
- `04_details_next/*.page.json`
- `05_seo/url-keyword-tdh.master.json`
- `06_internal_links/internal-links.N1.json`
- `07_model/MODEL_EVOLUTION.md`

并以当前仓库实际代码为第一事实来源。

## 本批目标
一次完成：
1. 修正 Chords 全站导航 IA。
2. 新增 `/chords/major`、`/chords/minor`。
3. 批量接入 `04_details_next` 的 16 个详情页。
4. 将 Hub 从现有 19 个对象补到 25 个 practical major/minor triad objects；并让 25 个对象都有详情链接。
5. 更新 TDK/H1/canonical、内链、route registry、sitemap。
6. 生成/接入当前详情模板需要的 PDF/SVG，沿用现有资产生成与验证方法。
7. 完整回归。

## 导航硬约束
现有菜单中 A Minor / A Major / C Major 等少量实例，不再作为 Chords 下拉的主要 IA。
改为：
- Chord Chart
- Major Chords
- Minor Chords
- Chords by Key
- Chord Progressions
- Chord Finder
- Piano Chord Guide
- Finger Numbers

桌面按 Browse / Explore / Learn 分组；移动端按 navigation.N1.json 顺序。
保持 PianoGrid 当前真实主题、Header 尺寸、交互方式；这是信息架构调整，不重新设计全站 Header。

不要显示尚未发布的 Seventh / Extended / Sus / Dim / Aug / Add / Altered 链接。

## 分类页
Major/Minor 分类页必须：
- 服务端/构建时输出完整 chord grid 与基础理论。
- 根音筛选仅是增强；关闭 JS 仍能看到所有内容。
- 只链接已发布 detail。
- 不用 query filter 制造新的 canonical/indexable URL。
- 保留 PianoGrid 现有视觉系统。

## 详情页
复用现有 shared detail template。
不要复制出 16 套页面组件。
优先通过当前 authoring/adapters 接入本包数据；如果包字段与当前最终 B3 模型不完全一致，写最小 adapter，不要倒退现有架构。

指法：
- 本包默认 null。
- 只有当前仓库已经存在、并有完整来源证据时才可接入。
- 不自动生成指法。

## 数据
本包新补 6 个 Hub 对象用于完成 practical 12 major + 12 minor pitch-class family coverage，另保留已上线 C-flat major。
等音拼写不要擅自统一；F♯ major 不改写成 G♭ major。

## 高级类别
本轮不要实现：
- `/chords/seventh`
- `/chords/extended`
- `/chords/suspended`
- `/chords/diminished`
- `/chords/augmented`
- `/chords/add`
- `/chords/altered`

它们只作为后续信息架构规划存在，不进 sitemap，不进可点击导航。

## 验证
先运行 `python 08_validation/validate_next_details.py` 或将等价校验移入项目。
随后运行仓库现有全部相关：
- Foundation
- TypeScript/CSS
- adapters
- B2/B3
- existing detail/hub
- guide/finger
- by-key
- progressions
- finder
- production integration
- browser regression
- build

新增检查：
- 16 新详情 URL 全部 200
- `/chords/major`、`/chords/minor` 200
- raw HTML 有 H1、notes、formula、inversions、主要正文
- 25 Hub objects 均有有效 detail link
- nav 无死链
- planned advanced categories 仍 404 / 不进 sitemap
- sitemap 数量以实际 registry 为准；说明为什么与 Next build route count 不同

## 完成报告
只输出：
- Status
- Implemented URLs
- Navigation result
- Hub count
- SEO/sitemap count
- Validation
- Remaining manual checks
- Files changed

不要提交，不要 push，不要部署。

# 任务12结果：158 个 Chords 页检查与有限修复

检查日期：2026-09-20。工作目录 `pianogrid-final-integration`。未 commit / push / deploy。

模块 URL 仍是 158 = 145 详情 + 9 分类 + 4 结构页（`/chords`、`/chords/by-key`、`/chords/finder`、`/chord-progressions`）。未改 URL、canonical、robots、sitemap、音乐引擎或任务11 Title/H1/description。

## 覆盖

- 158/158 页做了 HTML 扫描：HTTP 200、H1、`index,follow`、canonical `https://pianogrid.com`+path、站内链接、音符绑定、工程化指法措辞。证据：`docs/seo/chords/evidence-2026-09-18/task-12/_html_scan.json`。
- 13 个目录/分类/工具页：桌面 1440 与移动 390 实际操作。
- 145 详情：全部内容/链接/数据绑定；浏览器按模板与 family 分层，覆盖 CORE_14、五个无正数样本、常用根音及升降号。证据：`docs/seo/chords/evidence-2026-09-18/task-12/_browser.json`。
- 未完成：真机、读屏、打印输出、真人听音。未替用户声称这些已通过。

## 处理结果（唯一 URL，互斥）

| 状态 | 数量 |
|---|---|
| 保持 | 106 |
| 已修好 | 52 |
| 待决定 | 0 |
| 待核实 | 0 |

未检查页：0。

## 修好了什么

1. **目录搜索**（`/chords`、`/chords/extended`、`/chords/altered`）  
   不知道内部 slug 的用户输入 `Bb` 或 `Cmadd9` 时，现在能对到已有的 B♭ major 与 Cm(add9) 页。

2. **工程化指法措辞**（减三/增三 24 页，以及 `/chords/d-flat-m7-flat5`）  
   页面不再写 “independently authorized fingering dataset”。限制仍在：本页不提供指法，图示只标音位。

3. **重复理论句**（全部 48 个 N2B 详情：减/增/sus2/sus4）  
   公式段不再重复引言里已有的构成说明。

4. **移动横向溢出**（`/chords/d-flat-m7-flat5` 原先 390 宽 delta=59）  
   长名称摘要标签改为可换行。复验 delta=0。共用详情模板也收紧了结果条 `nowrap`/`min-width`，其他抽样详情未再溢出。

用户现在能更容易：用常见缩写找到和弦；读懂“没有指法”的真实限制；在窄屏上看完整的半减七名称和音符。

## 需要用户决定的 URL

没有。本轮不建议合并、删除或 noindex。

重点对照后仍保持独立页：

- 同根 Sus2/Sus4（24 页）：1–2–5 与 1–4–5 是不同查阅任务；分类页 `/chords/suspended` 不能承接单个对象的转位/听音/分享状态。没有标准化 SERP 重叠证据，不宣称搜索意图相同。
- Minor add9（12 页）：相对 `/chords/add` 分类索引，每页完成该根音小三和弦加9的查阅。分类页不是同一对象的完整替代。
- 五个无正数样本：`/chords/d-flat-m7-flat5`（已修好排版/措辞，仍保持独立）、`/chords/f-sharp-madd9`、`/chords/a-flat-madd9`、`/chords/b-flat-madd9`、`/chords/d-flat-madd9`。已有观测是 0 或空白，不是去留依据。

## 测试

已运行且通过：

- `npm run typecheck`
- `npm run check`（foundation + typecheck + css）
- `npm run build`（隔离目录 `.next-t12`，211/211）
- `node --experimental-strip-types scripts/check-chords-158-product.mjs`（158 HTML）
- `node scripts/check-chords-158-browser.mjs`（306 项，桌面+移动）
- `node scripts/check-chord-discovery-acceptance.mjs`（先前 FAIL 的 `Bb`/`Cmadd9` 现为 PASS）

lint 脚本：N/A，未安装依赖凑通过。

未做：真机、读屏、打印、听音人工门禁。

## 文件范围

代码：

- `src/lib/chord-search-text.ts`（新增）
- `src/lib/seo-editorial.ts`
- `src/lib/chord-n2b-content.ts`
- `src/components/chords/library-index.tsx`
- `src/components/chords/completion-category-experience.tsx`
- `src/app/chords/a-minor/a-minor.css`

检查与结果：

- `docs/seo/chords/CHORDS_158_ACTIONS.csv`
- `docs/seo/chords/CHORDS_158_RESULTS.md`
- `scripts/check-chords-158-product.mjs`
- `scripts/check-chords-158-browser.mjs`
- `scripts/write-chords-158-actions.mjs`
- `docs/seo/chords/evidence-2026-09-18/task-12/`
- `docs/seo/chords/evidence-2026-09-18/DISCOVERY_ACCEPTANCE.md`（复验改写）

未改：`src/lib/chord-detail-seo-copy.ts`、`src/lib/site-routes.ts`、和弦音符/转位/音频逻辑。

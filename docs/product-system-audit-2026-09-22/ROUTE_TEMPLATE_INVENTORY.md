# 完整 Route / Template Inventory

[REPO_VERIFIED] 基线为远端main `c1a017a533289616b84e354c97f1345114f809e2`。以下206行按PUBLIC_ROUTES原顺序列出；不是抽样。交叉来源：`src/lib/site-routes.ts`、App Router显式文件/两个generateStaticParams、生产build manifest与HTML、当前production sitemap/HTTP。Canonical取实际本地输出；线上同样自指且均200/index,follow（[LIVE_VERIFIED]）。URL indexable不代表Google已收录。

Generated From列给实际route文件及其直接导入的lib adapter；继续追数据源见00。显式静态页面与`[slug]`模板均受当前路由集合限制。`/songs/easy`是SSR，其余205业务页预渲染。next.config未配置业务redirect；hosting控制台完整redirect未知。所有静态资源、API/metadata、404、客户端hash/query状态不计indexable业务页面。

## 数量与边界

| Page Type | Indexable URL count |
|---|---:|
| Home | 1 |
| Tools | 1 |
| Chords Hub | 1 |
| Chord Family | 9 |
| Chord Detail | 145 |
| Supporting / Key | 1 |
| Chord Finder | 1 |
| Progression | 1 |
| Keyboard Notes | 6 |
| Scales Hub | 1 |
| Scale Family | 5 |
| Scale Detail | 19 |
| Supporting / Arpeggios | 1 |
| Songs | 2 |
| Sheet Music | 6 |
| Learn | 4 |
| Printables | 1 |
| Supporting / Comparison | 1 |

Legal：当前App route/PUBLIC_ROUTES/sitemap未找到独立公开legal route，计0，不建议为了填分类新增页面。Printables也存在其他类页面的附属能力，这里按主职责互斥计数；不重复计数。

| DATA OBJECT COUNT | INDEXABLE URL COUNT / boundary |
|---|---|
| Finder 433 =145详情对象+288嵌入参考对象 | Chords 157：145 detail+9family+hub+finder+by-key |
| Scales60拼写/形态对象 | Scales25：19detail+5family+hub；不是60页 |
| Key24、triad/seventh rows336 | by-key仅1 URL，包含于上行Chords总数 |
| Progression8patterns、96examples | 1 URL |
| Songs199works/203arrangements/203resources/24assets | 2 Songs+6 Sheet Music，不按资源数量造页 |
| site-master127规划对象 | 历史包，不是当前全部公开路由表 |

## 全量206行

| URL / Template | Page Type | Generated From | Indexable | Canonical | Current User Job |
|---|---|---|---|---|---|
| `/` | Home | `src/app/page.tsx` | YES · index,follow | https://pianogrid.com | 选择查找、学习或练习入口 |
| `/tools` | Tools | `src/app/tools/page.tsx → integration-content` | YES · index,follow | https://pianogrid.com/tools | 选择实际已存在的工具 |
| `/chords` | Chords Hub | `src/app/chords/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords | 按名称/音符查找和弦与练习入口 |
| `/chords/major` | Chord Family | `src/app/chords/major/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/major | 浏览、比较major家族及对象 |
| `/chords/minor` | Chord Family | `src/app/chords/minor/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/minor | 浏览、比较minor家族及对象 |
| `/chords/diminished` | Chord Family | `src/app/chords/diminished/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/diminished | 浏览、比较diminished家族及对象 |
| `/chords/augmented` | Chord Family | `src/app/chords/augmented/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/augmented | 浏览、比较augmented家族及对象 |
| `/chords/suspended` | Chord Family | `src/app/chords/suspended/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/suspended | 浏览、比较suspended家族及对象 |
| `/chords/seventh` | Chord Family | `src/app/chords/seventh/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/seventh | 浏览、比较seventh家族及对象 |
| `/chords/add` | Chord Family | `src/app/chords/add/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/add | 浏览、比较add家族及对象 |
| `/chords/extended` | Chord Family | `src/app/chords/extended/page.tsx → chord-completion-content` | YES · index,follow | https://pianogrid.com/chords/extended | 浏览、比较extended家族及对象 |
| `/chords/altered` | Chord Family | `src/app/chords/altered/page.tsx → chord-completion-content` | YES · index,follow | https://pianogrid.com/chords/altered | 浏览、比较altered家族及对象 |
| `/chords/c-add9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/c-add9 | 核对c-add9音名、公式、键位与可用练习 |
| `/chords/d-flat-add9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-flat-add9 | 核对d-flat-add9音名、公式、键位与可用练习 |
| `/chords/d-add9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-add9 | 核对d-add9音名、公式、键位与可用练习 |
| `/chords/e-flat-add9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-flat-add9 | 核对e-flat-add9音名、公式、键位与可用练习 |
| `/chords/e-add9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-add9 | 核对e-add9音名、公式、键位与可用练习 |
| `/chords/f-add9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-add9 | 核对f-add9音名、公式、键位与可用练习 |
| `/chords/f-sharp-add9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sharp-add9 | 核对f-sharp-add9音名、公式、键位与可用练习 |
| `/chords/g-add9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/g-add9 | 核对g-add9音名、公式、键位与可用练习 |
| `/chords/a-flat-add9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-flat-add9 | 核对a-flat-add9音名、公式、键位与可用练习 |
| `/chords/a-add9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-add9 | 核对a-add9音名、公式、键位与可用练习 |
| `/chords/b-flat-add9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-flat-add9 | 核对b-flat-add9音名、公式、键位与可用练习 |
| `/chords/b-add9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-add9 | 核对b-add9音名、公式、键位与可用练习 |
| `/chords/c-madd9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/c-madd9 | 核对c-madd9音名、公式、键位与可用练习 |
| `/chords/d-flat-madd9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-flat-madd9 | 核对d-flat-madd9音名、公式、键位与可用练习 |
| `/chords/d-madd9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-madd9 | 核对d-madd9音名、公式、键位与可用练习 |
| `/chords/e-flat-madd9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-flat-madd9 | 核对e-flat-madd9音名、公式、键位与可用练习 |
| `/chords/e-madd9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-madd9 | 核对e-madd9音名、公式、键位与可用练习 |
| `/chords/f-madd9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-madd9 | 核对f-madd9音名、公式、键位与可用练习 |
| `/chords/f-sharp-madd9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sharp-madd9 | 核对f-sharp-madd9音名、公式、键位与可用练习 |
| `/chords/g-madd9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/g-madd9 | 核对g-madd9音名、公式、键位与可用练习 |
| `/chords/a-flat-madd9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-flat-madd9 | 核对a-flat-madd9音名、公式、键位与可用练习 |
| `/chords/a-madd9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-madd9 | 核对a-madd9音名、公式、键位与可用练习 |
| `/chords/b-flat-madd9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-flat-madd9 | 核对b-flat-madd9音名、公式、键位与可用练习 |
| `/chords/b-madd9` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-madd9 | 核对b-madd9音名、公式、键位与可用练习 |
| `/chords/a-7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-7 | 核对a-7音名、公式、键位与可用练习 |
| `/chords/a-flat-7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-flat-7 | 核对a-flat-7音名、公式、键位与可用练习 |
| `/chords/a-flat-m7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-flat-m7 | 核对a-flat-m7音名、公式、键位与可用练习 |
| `/chords/a-flat-m7-flat5` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-flat-m7-flat5 | 核对a-flat-m7-flat5音名、公式、键位与可用练习 |
| `/chords/a-flat-maj7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-flat-maj7 | 核对a-flat-maj7音名、公式、键位与可用练习 |
| `/chords/a-m7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-m7 | 核对a-m7音名、公式、键位与可用练习 |
| `/chords/a-m7-flat5` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-m7-flat5 | 核对a-m7-flat5音名、公式、键位与可用练习 |
| `/chords/a-maj7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-maj7 | 核对a-maj7音名、公式、键位与可用练习 |
| `/chords/b-7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-7 | 核对b-7音名、公式、键位与可用练习 |
| `/chords/b-flat-7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-flat-7 | 核对b-flat-7音名、公式、键位与可用练习 |
| `/chords/b-flat-m7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-flat-m7 | 核对b-flat-m7音名、公式、键位与可用练习 |
| `/chords/b-flat-m7-flat5` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-flat-m7-flat5 | 核对b-flat-m7-flat5音名、公式、键位与可用练习 |
| `/chords/b-flat-maj7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-flat-maj7 | 核对b-flat-maj7音名、公式、键位与可用练习 |
| `/chords/b-m7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-m7 | 核对b-m7音名、公式、键位与可用练习 |
| `/chords/b-m7-flat5` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-m7-flat5 | 核对b-m7-flat5音名、公式、键位与可用练习 |
| `/chords/b-maj7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-maj7 | 核对b-maj7音名、公式、键位与可用练习 |
| `/chords/c-7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/c-7 | 核对c-7音名、公式、键位与可用练习 |
| `/chords/c-m7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/c-m7 | 核对c-m7音名、公式、键位与可用练习 |
| `/chords/c-m7-flat5` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/c-m7-flat5 | 核对c-m7-flat5音名、公式、键位与可用练习 |
| `/chords/c-maj7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/c-maj7 | 核对c-maj7音名、公式、键位与可用练习 |
| `/chords/d-7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-7 | 核对d-7音名、公式、键位与可用练习 |
| `/chords/d-flat-7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-flat-7 | 核对d-flat-7音名、公式、键位与可用练习 |
| `/chords/d-flat-m7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-flat-m7 | 核对d-flat-m7音名、公式、键位与可用练习 |
| `/chords/d-flat-m7-flat5` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-flat-m7-flat5 | 核对d-flat-m7-flat5音名、公式、键位与可用练习 |
| `/chords/d-flat-maj7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-flat-maj7 | 核对d-flat-maj7音名、公式、键位与可用练习 |
| `/chords/d-m7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-m7 | 核对d-m7音名、公式、键位与可用练习 |
| `/chords/d-m7-flat5` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-m7-flat5 | 核对d-m7-flat5音名、公式、键位与可用练习 |
| `/chords/d-maj7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-maj7 | 核对d-maj7音名、公式、键位与可用练习 |
| `/chords/e-7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-7 | 核对e-7音名、公式、键位与可用练习 |
| `/chords/e-flat-7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-flat-7 | 核对e-flat-7音名、公式、键位与可用练习 |
| `/chords/e-flat-m7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-flat-m7 | 核对e-flat-m7音名、公式、键位与可用练习 |
| `/chords/e-flat-m7-flat5` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-flat-m7-flat5 | 核对e-flat-m7-flat5音名、公式、键位与可用练习 |
| `/chords/e-flat-maj7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-flat-maj7 | 核对e-flat-maj7音名、公式、键位与可用练习 |
| `/chords/e-m7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-m7 | 核对e-m7音名、公式、键位与可用练习 |
| `/chords/e-m7-flat5` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-m7-flat5 | 核对e-m7-flat5音名、公式、键位与可用练习 |
| `/chords/e-maj7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-maj7 | 核对e-maj7音名、公式、键位与可用练习 |
| `/chords/f-7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-7 | 核对f-7音名、公式、键位与可用练习 |
| `/chords/f-m7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-m7 | 核对f-m7音名、公式、键位与可用练习 |
| `/chords/f-m7-flat5` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-m7-flat5 | 核对f-m7-flat5音名、公式、键位与可用练习 |
| `/chords/f-maj7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-maj7 | 核对f-maj7音名、公式、键位与可用练习 |
| `/chords/f-sharp-7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sharp-7 | 核对f-sharp-7音名、公式、键位与可用练习 |
| `/chords/f-sharp-m7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sharp-m7 | 核对f-sharp-m7音名、公式、键位与可用练习 |
| `/chords/f-sharp-m7-flat5` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sharp-m7-flat5 | 核对f-sharp-m7-flat5音名、公式、键位与可用练习 |
| `/chords/f-sharp-maj7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sharp-maj7 | 核对f-sharp-maj7音名、公式、键位与可用练习 |
| `/chords/g-7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/g-7 | 核对g-7音名、公式、键位与可用练习 |
| `/chords/g-m7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/g-m7 | 核对g-m7音名、公式、键位与可用练习 |
| `/chords/g-m7-flat5` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/g-m7-flat5 | 核对g-m7-flat5音名、公式、键位与可用练习 |
| `/chords/g-maj7` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/g-maj7 | 核对g-maj7音名、公式、键位与可用练习 |
| `/chords/a-augmented` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-augmented | 核对a-augmented音名、公式、键位与可用练习 |
| `/chords/a-diminished` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-diminished | 核对a-diminished音名、公式、键位与可用练习 |
| `/chords/a-flat-augmented` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-flat-augmented | 核对a-flat-augmented音名、公式、键位与可用练习 |
| `/chords/a-flat-diminished` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-flat-diminished | 核对a-flat-diminished音名、公式、键位与可用练习 |
| `/chords/a-flat-sus2` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-flat-sus2 | 核对a-flat-sus2音名、公式、键位与可用练习 |
| `/chords/a-flat-sus4` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-flat-sus4 | 核对a-flat-sus4音名、公式、键位与可用练习 |
| `/chords/a-sus2` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-sus2 | 核对a-sus2音名、公式、键位与可用练习 |
| `/chords/a-sus4` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/a-sus4 | 核对a-sus4音名、公式、键位与可用练习 |
| `/chords/b-augmented` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-augmented | 核对b-augmented音名、公式、键位与可用练习 |
| `/chords/b-diminished` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-diminished | 核对b-diminished音名、公式、键位与可用练习 |
| `/chords/b-flat-augmented` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-flat-augmented | 核对b-flat-augmented音名、公式、键位与可用练习 |
| `/chords/b-flat-diminished` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-flat-diminished | 核对b-flat-diminished音名、公式、键位与可用练习 |
| `/chords/b-flat-sus2` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-flat-sus2 | 核对b-flat-sus2音名、公式、键位与可用练习 |
| `/chords/b-flat-sus4` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-flat-sus4 | 核对b-flat-sus4音名、公式、键位与可用练习 |
| `/chords/b-sus2` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-sus2 | 核对b-sus2音名、公式、键位与可用练习 |
| `/chords/b-sus4` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-sus4 | 核对b-sus4音名、公式、键位与可用练习 |
| `/chords/c-augmented` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/c-augmented | 核对c-augmented音名、公式、键位与可用练习 |
| `/chords/c-diminished` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/c-diminished | 核对c-diminished音名、公式、键位与可用练习 |
| `/chords/c-sus2` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/c-sus2 | 核对c-sus2音名、公式、键位与可用练习 |
| `/chords/c-sus4` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/c-sus4 | 核对c-sus4音名、公式、键位与可用练习 |
| `/chords/d-augmented` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-augmented | 核对d-augmented音名、公式、键位与可用练习 |
| `/chords/d-diminished` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-diminished | 核对d-diminished音名、公式、键位与可用练习 |
| `/chords/d-flat-augmented` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-flat-augmented | 核对d-flat-augmented音名、公式、键位与可用练习 |
| `/chords/d-flat-diminished` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-flat-diminished | 核对d-flat-diminished音名、公式、键位与可用练习 |
| `/chords/d-flat-sus2` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-flat-sus2 | 核对d-flat-sus2音名、公式、键位与可用练习 |
| `/chords/d-flat-sus4` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-flat-sus4 | 核对d-flat-sus4音名、公式、键位与可用练习 |
| `/chords/d-sus2` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-sus2 | 核对d-sus2音名、公式、键位与可用练习 |
| `/chords/d-sus4` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-sus4 | 核对d-sus4音名、公式、键位与可用练习 |
| `/chords/e-augmented` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-augmented | 核对e-augmented音名、公式、键位与可用练习 |
| `/chords/e-diminished` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-diminished | 核对e-diminished音名、公式、键位与可用练习 |
| `/chords/e-flat-augmented` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-flat-augmented | 核对e-flat-augmented音名、公式、键位与可用练习 |
| `/chords/e-flat-diminished` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-flat-diminished | 核对e-flat-diminished音名、公式、键位与可用练习 |
| `/chords/e-flat-sus2` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-flat-sus2 | 核对e-flat-sus2音名、公式、键位与可用练习 |
| `/chords/e-flat-sus4` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-flat-sus4 | 核对e-flat-sus4音名、公式、键位与可用练习 |
| `/chords/e-sus2` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-sus2 | 核对e-sus2音名、公式、键位与可用练习 |
| `/chords/e-sus4` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-sus4 | 核对e-sus4音名、公式、键位与可用练习 |
| `/chords/f-augmented` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-augmented | 核对f-augmented音名、公式、键位与可用练习 |
| `/chords/f-diminished` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-diminished | 核对f-diminished音名、公式、键位与可用练习 |
| `/chords/f-sharp-augmented` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sharp-augmented | 核对f-sharp-augmented音名、公式、键位与可用练习 |
| `/chords/f-sharp-diminished` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sharp-diminished | 核对f-sharp-diminished音名、公式、键位与可用练习 |
| `/chords/f-sharp-sus2` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sharp-sus2 | 核对f-sharp-sus2音名、公式、键位与可用练习 |
| `/chords/f-sharp-sus4` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sharp-sus4 | 核对f-sharp-sus4音名、公式、键位与可用练习 |
| `/chords/f-sus2` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sus2 | 核对f-sus2音名、公式、键位与可用练习 |
| `/chords/f-sus4` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sus4 | 核对f-sus4音名、公式、键位与可用练习 |
| `/chords/g-augmented` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/g-augmented | 核对g-augmented音名、公式、键位与可用练习 |
| `/chords/g-diminished` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/g-diminished | 核对g-diminished音名、公式、键位与可用练习 |
| `/chords/g-sus2` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/g-sus2 | 核对g-sus2音名、公式、键位与可用练习 |
| `/chords/g-sus4` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/g-sus4 | 核对g-sus4音名、公式、键位与可用练习 |
| `/chords/a-minor` | Chord Detail | `src/app/chords/a-minor/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/a-minor | 核对a-minor音名、公式、键位与可用练习 |
| `/chords/a-major` | Chord Detail | `src/app/chords/a-major/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/a-major | 核对a-major音名、公式、键位与可用练习 |
| `/chords/c-major` | Chord Detail | `src/app/chords/c-major/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/c-major | 核对c-major音名、公式、键位与可用练习 |
| `/chords/g-major` | Chord Detail | `src/app/chords/g-major/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/g-major | 核对g-major音名、公式、键位与可用练习 |
| `/chords/c-minor` | Chord Detail | `src/app/chords/c-minor/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/c-minor | 核对c-minor音名、公式、键位与可用练习 |
| `/chords/e-major` | Chord Detail | `src/app/chords/e-major/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/e-major | 核对e-major音名、公式、键位与可用练习 |
| `/chords/b-major` | Chord Detail | `src/app/chords/b-major/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/b-major | 核对b-major音名、公式、键位与可用练习 |
| `/chords/a-flat-major` | Chord Detail | `src/app/chords/a-flat-major/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/a-flat-major | 核对a-flat-major音名、公式、键位与可用练习 |
| `/chords/c-flat-major` | Chord Detail | `src/app/chords/c-flat-major/page.tsx → chord-content` | YES · index,follow | https://pianogrid.com/chords/c-flat-major | 核对c-flat-major音名、公式、键位与可用练习 |
| `/chords/f-major` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-major | 核对f-major音名、公式、键位与可用练习 |
| `/chords/d-minor` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-minor | 核对d-minor音名、公式、键位与可用练习 |
| `/chords/e-minor` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-minor | 核对e-minor音名、公式、键位与可用练习 |
| `/chords/d-major` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-major | 核对d-major音名、公式、键位与可用练习 |
| `/chords/b-minor` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-minor | 核对b-minor音名、公式、键位与可用练习 |
| `/chords/f-sharp-minor` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sharp-minor | 核对f-sharp-minor音名、公式、键位与可用练习 |
| `/chords/c-sharp-minor` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/c-sharp-minor | 核对c-sharp-minor音名、公式、键位与可用练习 |
| `/chords/g-sharp-minor` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/g-sharp-minor | 核对g-sharp-minor音名、公式、键位与可用练习 |
| `/chords/b-flat-major` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-flat-major | 核对b-flat-major音名、公式、键位与可用练习 |
| `/chords/g-minor` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/g-minor | 核对g-minor音名、公式、键位与可用练习 |
| `/chords/d-flat-major` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/d-flat-major | 核对d-flat-major音名、公式、键位与可用练习 |
| `/chords/e-flat-major` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-flat-major | 核对e-flat-major音名、公式、键位与可用练习 |
| `/chords/f-sharp-major` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-sharp-major | 核对f-sharp-major音名、公式、键位与可用练习 |
| `/chords/f-minor` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/f-minor | 核对f-minor音名、公式、键位与可用练习 |
| `/chords/b-flat-minor` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/b-flat-minor | 核对b-flat-minor音名、公式、键位与可用练习 |
| `/chords/e-flat-minor` | Chord Detail | `src/app/chords/[slug]/page.tsx → chord-content, chord-expansion-content, chord-n2b-content, chord-n2c-content, chord-n2d-content` | YES · index,follow | https://pianogrid.com/chords/e-flat-minor | 核对e-flat-minor音名、公式、键位与可用练习 |
| `/chords/by-key` | Supporting / Key | `src/app/chords/by-key/page.tsx → support-content` | YES · index,follow | https://pianogrid.com/chords/by-key | 查看指定调内和弦及关系 |
| `/chords/finder` | Chord Finder | `src/app/chords/finder/page.tsx → support-content, chord-content` | YES · index,follow | https://pianogrid.com/chords/finder | 由音级集合与可选bass解释候选 |
| `/chord-progressions` | Progression | `src/app/chord-progressions/page.tsx → support-content` | YES · index,follow | https://pianogrid.com/chord-progressions | 选择调和进行示例，听与应用 |
| `/keyboard-notes` | Keyboard Notes | `src/app/keyboard-notes/page.tsx → keyboard-content` | YES · index,follow | https://pianogrid.com/keyboard-notes | 找音/键位/谱位、标注、指号、频率或空白参考：keyboard-notes |
| `/keyboard-notes/labeled` | Keyboard Notes | `src/app/keyboard-notes/labeled/page.tsx → keyboard-content` | YES · index,follow | https://pianogrid.com/keyboard-notes/labeled | 找音/键位/谱位、标注、指号、频率或空白参考：labeled |
| `/keyboard-notes/chart` | Keyboard Notes | `src/app/keyboard-notes/chart/page.tsx → keyboard-content` | YES · index,follow | https://pianogrid.com/keyboard-notes/chart | 找音/键位/谱位、标注、指号、频率或空白参考：chart |
| `/keyboard-notes/finger-numbers` | Keyboard Notes | `src/app/keyboard-notes/finger-numbers/page.tsx → support-content` | YES · index,follow | https://pianogrid.com/keyboard-notes/finger-numbers | 找音/键位/谱位、标注、指号、频率或空白参考：finger-numbers |
| `/keyboard-notes/blank` | Keyboard Notes | `src/app/keyboard-notes/blank/page.tsx → keyboard-content` | YES · index,follow | https://pianogrid.com/keyboard-notes/blank | 找音/键位/谱位、标注、指号、频率或空白参考：blank |
| `/keyboard-notes/frequencies` | Keyboard Notes | `src/app/keyboard-notes/frequencies/page.tsx → keyboard-content` | YES · index,follow | https://pianogrid.com/keyboard-notes/frequencies | 找音/键位/谱位、标注、指号、频率或空白参考：frequencies |
| `/scales` | Scales Hub | `src/app/scales/page.tsx → scale-content` | YES · index,follow | https://pianogrid.com/scales | 选择音阶对象、参考或练习 |
| `/scales/modes` | Scale Family | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/modes | 理解并浏览modes家族 |
| `/scales/blues` | Scale Family | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/blues | 理解并浏览blues家族 |
| `/scales/pentatonic` | Scale Family | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/pentatonic | 理解并浏览pentatonic家族 |
| `/scales/harmonic-major` | Scale Family | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/harmonic-major | 理解并浏览harmonic-major家族 |
| `/scales/chromatic` | Scale Family | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/chromatic | 理解并浏览chromatic家族 |
| `/scales/c-major` | Scale Detail | `src/app/scales/c-major/page.tsx → scale-content` | YES · index,follow | https://pianogrid.com/scales/c-major | 查看c-major音阶、指法范围与练习 |
| `/scales/a-minor` | Scale Detail | `src/app/scales/a-minor/page.tsx → scale-content` | YES · index,follow | https://pianogrid.com/scales/a-minor | 查看a-minor音阶、指法范围与练习 |
| `/scales/d-major` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/d-major | 查看d-major音阶、指法范围与练习 |
| `/scales/e-minor` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/e-minor | 查看e-minor音阶、指法范围与练习 |
| `/scales/f-major` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/f-major | 查看f-major音阶、指法范围与练习 |
| `/scales/g-major` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/g-major | 查看g-major音阶、指法范围与练习 |
| `/scales/a-major` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/a-major | 查看a-major音阶、指法范围与练习 |
| `/scales/c-minor` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/c-minor | 查看c-minor音阶、指法范围与练习 |
| `/scales/d-minor` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/d-minor | 查看d-minor音阶、指法范围与练习 |
| `/scales/e-major` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/e-major | 查看e-major音阶、指法范围与练习 |
| `/scales/b-minor` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/b-minor | 查看b-minor音阶、指法范围与练习 |
| `/scales/f-minor` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/f-minor | 查看f-minor音阶、指法范围与练习 |
| `/scales/a-sharp-minor` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/a-sharp-minor | 查看a-sharp-minor音阶、指法范围与练习 |
| `/scales/b-major` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/b-major | 查看b-major音阶、指法范围与练习 |
| `/scales/b-flat-major` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/b-flat-major | 查看b-flat-major音阶、指法范围与练习 |
| `/scales/g-minor` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/g-minor | 查看g-minor音阶、指法范围与练习 |
| `/scales/e-flat-major` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/e-flat-major | 查看e-flat-major音阶、指法范围与练习 |
| `/scales/f-sharp-minor` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/f-sharp-minor | 查看f-sharp-minor音阶、指法范围与练习 |
| `/scales/c-flat-major` | Scale Detail | `src/app/scales/[slug]/page.tsx → scale-completion-content, scale-types` | YES · index,follow | https://pianogrid.com/scales/c-flat-major | 查看c-flat-major音阶、指法范围与练习 |
| `/arpeggios` | Supporting / Arpeggios | `src/app/arpeggios/page.tsx → scale-completion-content` | YES · index,follow | https://pianogrid.com/arpeggios | 查看琶音参考和实践范围 |
| `/songs` | Songs | `src/app/songs/page.tsx → song-content` | YES · index,follow | https://pianogrid.com/songs | 按学习需要发现歌曲与编配版本 |
| `/songs/easy` | Songs | `src/app/songs/easy/page.tsx → song-content` | YES · index,follow | https://pianogrid.com/songs/easy | 按学习需要发现歌曲与编配版本 |
| `/sheet-music` | Sheet Music | `src/app/sheet-music/page.tsx → songs-sheet-content` | YES · index,follow | https://pianogrid.com/sheet-music | 寻找准确版本、来源与合法可用资源：sheet-music |
| `/sheet-music/easy` | Sheet Music | `src/app/sheet-music/easy/page.tsx → songs-sheet-content` | YES · index,follow | https://pianogrid.com/sheet-music/easy | 寻找准确版本、来源与合法可用资源：easy |
| `/sheet-music/beginner` | Sheet Music | `src/app/sheet-music/beginner/page.tsx → songs-sheet-content` | YES · index,follow | https://pianogrid.com/sheet-music/beginner | 寻找准确版本、来源与合法可用资源：beginner |
| `/sheet-music/hot-cross-buns` | Sheet Music | `src/app/sheet-music/hot-cross-buns/page.tsx → songs-sheet-content` | YES · index,follow | https://pianogrid.com/sheet-music/hot-cross-buns | 寻找准确版本、来源与合法可用资源：hot-cross-buns |
| `/sheet-music/twinkle-twinkle-little-star` | Sheet Music | `src/app/sheet-music/twinkle-twinkle-little-star/page.tsx → songs-sheet-content` | YES · index,follow | https://pianogrid.com/sheet-music/twinkle-twinkle-little-star | 寻找准确版本、来源与合法可用资源：twinkle-twinkle-little-star |
| `/sheet-music/ode-to-joy` | Sheet Music | `src/app/sheet-music/ode-to-joy/page.tsx → songs-sheet-content` | YES · index,follow | https://pianogrid.com/sheet-music/ode-to-joy | 寻找准确版本、来源与合法可用资源：ode-to-joy |
| `/guide` | Learn | `src/app/guide/page.tsx → guide-content` | YES · index,follow | https://pianogrid.com/guide | 学习读谱/和弦/音阶并返回工具：guide |
| `/guide/read-sheet-music` | Learn | `src/app/guide/read-sheet-music/page.tsx → guide-content` | YES · index,follow | https://pianogrid.com/guide/read-sheet-music | 学习读谱/和弦/音阶并返回工具：read-sheet-music |
| `/guide/piano-chords` | Learn | `src/app/guide/piano-chords/page.tsx → support-content` | YES · index,follow | https://pianogrid.com/guide/piano-chords | 学习读谱/和弦/音阶并返回工具：piano-chords |
| `/guide/piano-scales` | Learn | `src/app/guide/piano-scales/page.tsx` | YES · index,follow | https://pianogrid.com/guide/piano-scales | 学习读谱/和弦/音阶并返回工具：piano-scales |
| `/tools/blank-sheet-music` | Printables | `src/app/tools/blank-sheet-music/page.tsx → blank-sheet-content` | YES · index,follow | https://pianogrid.com/tools/blank-sheet-music | 配置并打印空白谱纸 |
| `/tools/hear-the-difference` | Supporting / Comparison | `src/app/tools/hear-the-difference/page.tsx` | YES · index,follow | https://pianogrid.com/tools/hear-the-difference | 听辨并比较已有音乐示例 |

## 验证边界

原始内部链接检查没有不存在的业务路径，206页均有至少一个来自其他业务页的入链。发现7条缺静态fragment的链接：6条`#pg-arr=`由已有客户端协议接收，不能算断链；guide指向`/chords#find-a-chord`的一条确实没有目标。状态跳转正确性、外链可达性、浏览器音频和真机不在HTTP通过范围。全量详情任务能力因模板/对象不同，第三列给定位而非宣称每页具备完全相同练习。

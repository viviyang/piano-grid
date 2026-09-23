# PianoGrid 提交台账

2026-09-18 起用。这是执行记录，不是排名保证，也不保证请求编入索引后一定收录。

目标域名：`https://pianogrid.com`  
URL 名单只跟线上 sitemap：`https://pianogrid.com/sitemap.xml`

Google 和 Bing 分两张表，放在同一目录。Google 按模块排，Bing 按主词 volume 排。

## 文件

| 文件 | 引擎 | 用途 |
| --- | --- | --- |
| [ledger.csv](ledger.csv) | Google | GSC 总表。每个规范 URL 一行；按模块分组，模块内按主词 volume 降序。 |
| [daily-log.md](daily-log.md) | Google | GSC 每天交了哪几条、核对了收录没有。 |
| [bing-ledger.csv](bing-ledger.csv) | Bing | Bing URL Submission 总表。同一批 URL，按 `volume_us` 降序。 |
| [bing-daily-log.md](bing-daily-log.md) | Bing | Bing 每天交了哪几条。 |
| [bing-batch-2026-09-23.txt](bing-batch-2026-09-23.txt) | Bing | 2026-09-23 剩余额度的 86 条。确认提交前不是已交记录。 |

改 Google 状态只改 `ledger.csv`。改 Bing 状态只改 `bing-ledger.csv`。sitemap 增删 URL 时运行：

```text
node scripts/sync-indexing-ledger.mjs
```

同步会重排两边的模块和 volume，不会覆盖已填写的 GSC 提交、收录状态，也不会覆盖 Bing 的提交状态。

## 怎么排序

Google `ledger.csv`：

1. 先按模块：homepage → keyboard-notes → chords → chord-progressions → scales → arpeggios → songs → sheet-music → guide → tools
2. 模块内按 `volume_us` 降序
3. 没有 volume 的排在该模块末尾；同等 volume 时栏目/工具页排在详情页前面

Bing `bing-ledger.csv` 按全站 `volume_us` 降序。每天优先交高 volume：看 `site_volume_rank`，数字越小全站主词量越高。

## Google 列（ledger.csv）

| 列 | 含义 |
| --- | --- |
| `group` | 模块 |
| `submit_rank_in_group` | 该模块内的 volume 顺序，1 最高 |
| `site_volume_rank` | 全站已知 volume 顺序，1 最高；无数据留空 |
| `volume_us` | 主词美国估算月搜索量。不把同页多个词加总 |
| `path` / `url` | 规范路径和完整 URL |
| `page_kind` | `hub` 栏目 · `category` 分类 · `tool` 工具 · `detail` 详情 |
| `primary_keyword` | 用来取 volume 的那一个主词 |
| `volume_status` | 数据来源 |
| `in_sitemap` | 当前是否仍在线上 sitemap |
| `gsc_submitted` | 是否手动在 GSC 请求过编入索引：`yes` / `no` |
| `gsc_submitted_date` | 第一次手动提交日期 |
| `indexed` | `yes` / `no` / `unknown` |
| `indexed_checked_date` | 最近一次核对收录的日期 |
| `indexed_evidence` | `site_search` 或 `gsc_inspection` |
| `notes` | 备注。只写 GSC 相关说明 |

## Bing 列（bing-ledger.csv）

| 列 | 含义 |
| --- | --- |
| `site_volume_rank` | 全站已知 volume 顺序，1 最高；无数据留空 |
| `volume_us` | 主词美国估算月搜索量。与 Google 表同一个数，不把同页多个词加总 |
| `path` / `url` | 规范路径和完整 URL |
| `group` | 模块 |
| `page_kind` | `hub` 栏目 · `category` 分类 · `tool` 工具 · `detail` 详情 |
| `primary_keyword` | 用来取 volume 的那一个主词 |
| `volume_status` | 数据来源 |
| `in_sitemap` | 当前是否仍在线上 sitemap |
| `bing_submitted` | 是否在 Bing Webmaster URL Submission 提交过：`yes` / `no` |
| `bing_submitted_date` | 第一次提交到 Bing 的日期 |
| `notes` | 备注。只写 Bing 相关说明 |

## 搜索量来源

同一 URL 只保留一个主词量，不把词簇加总。

| `volume_status` | 来源 |
| --- | --- |
| `semrush_2026-09-17` | 和弦详情页 Semrush 最佳观察查询，2026-09-17 |
| `url_plan_2026-09-08` | 全站 URL 规划表原词估算 |
| `keyword_task_map_2026-09-11` | 和弦任务映射表历史估算 |
| `unknown` | 没有可用主词量 |

这些是工具估算，不是真实搜索次数，也不是当前排名。

## 状态规则

**手动提交 GSC**

- `yes`：在 GSC 对这条 URL 点过「请求编入索引」
- `no`：没点过
- 同一 URL 再次请求：不新增行，在 `notes` 写 `YYYY-MM-DD 再次请求`

**是否收录**

- `yes`：`site:` 能搜到，或 GSC URL 检查为已编入索引
- `no`：GSC 明确未编入索引
- `unknown`：还没核。`site:` 暂时搜不到不等于 `no`

**Bing URL Submission**

- `yes`：在 Bing Webmaster Tools 的 URL Submission 里提交过这条 URL
- `no`：没提交过
- sitemap 提交不逐条改这个字段
- 同一 URL 再次提交：不新增行，在 `notes` 写 `YYYY-MM-DD 再次提交 Bing`

## sitemap 同步

| sitemap 变化 | 两张表的动作 |
| --- | --- |
| 新 URL | 两张表各加一行：`in_sitemap=yes`，未提交。Google 收录为 `unknown` |
| URL 还在 | 只更新模块、volume、排序。Google 的提交和收录、Bing 的提交状态都保持不动 |
| URL 从 sitemap 消失 | 不删行，两张表都改 `in_sitemap=no` |
| 参数页、非 canonical | 不进表 |

## 当前快照（2026-09-23）

线上 sitemap **206** 条；其中 **183** 条有主词 volume。

Google：已手动提交 **45** 条。截图 `site:` 可见的 10 条标为已收录；其余已提交条收录仍为 `unknown`。

Bing：URL Submission 已交 **14** 条。sitemap 另已提交，不逐条计入。

Google 各模块：

| 模块 | 条数 | 已提交 | 已收录 | 有 volume |
| --- | ---: | ---: | ---: | ---: |
| homepage | 1 | 1 | 1 | 0 |
| keyboard-notes | 6 | 3 | 1 | 6 |
| chords | 157 | 32 | 5 | 140 |
| chord-progressions | 1 | 1 | 1 | 1 |
| scales | 25 | 1 | 1 | 25 |
| arpeggios | 1 | 1 | 1 | 0 |
| songs | 2 | 2 | 0 | 2 |
| sheet-music | 6 | 2 | 0 | 4 |
| guide | 4 | 2 | 0 | 4 |
| tools | 3 | 0 | 0 | 1 |

给用户待提交名单时，一律写完整规范 URL，例如 `https://pianogrid.com/chords/b-7`，不写路径缩写。

Bing 下一批 86 条在 [bing-batch-2026-09-23.txt](bing-batch-2026-09-23.txt)，主词量从 18100 到 390。用户确认提交前，`bing-ledger.csv` 里这 86 条保持 `bing_submitted=no`。

## 每天怎么用

交完后可以直接贴完整 URL：

> 今天 GSC 提交了：https://pianogrid.com/chords/b-minor

Google 改 `ledger.csv` 的 `gsc_submitted` 和日期，并写进 `daily-log.md`。核对收录时说明是 GSC 检查还是 `site:` 搜索。

> 今天 Bing 提交了：https://pianogrid.com/chords/b-minor

Bing 改 `bing-ledger.csv` 的 `bing_submitted` 和 `bing_submitted_date`，并写进 `bing-daily-log.md`。

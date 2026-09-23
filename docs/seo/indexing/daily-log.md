# GSC 提交每日记录

只写实际提交或实际核对过的 URL。截图可见不等于已经对每一条都点过 GSC，除非当天注明。

## 2026-09-18

### 做了什么

1. 建台账：`docs/seo/indexing/`（README、ledger.csv、本文件）和同步脚本 `scripts/sync-indexing-ledger.mjs`。
2. 从线上 `https://pianogrid.com/sitemap.xml` 写入 **206** 条规范 URL。
3. 按模块分组，模块内按主词 `volume_us` 降序。183 条有估算量；23 条暂无。
4. 按当天 `site:https://pianogrid.com/` 截图（约 10 条结果）预填已提交且已收录：
   - `/`
   - `/keyboard-notes`
   - `/chords`
   - `/chords/major`
   - `/chords/minor`
   - `/chords/diminished`
   - `/chords/seventh`
   - `/chord-progressions`
   - `/scales`
   - `/arpeggios`
5. 下午用户确认又手动提交 8 条（收录仍为 `unknown`）：
   - `/chords/b-minor`（b minor chord）
   - `/chords/d-minor`（d minor chord）
   - `/chords/e-minor`（e minor chord）
   - `/chords/g-minor`（g minor chord）
   - `/guide/read-sheet-music`（how to read sheet music piano）
   - `/songs`（piano songs）
   - `/songs/easy`（easy piano songs）
   - `/keyboard-notes/labeled`（keys on a piano keyboard labeled）
6. 累计已提交 **18** 条；其中截图可见已收录 10 条，下午那 8 条等待收录核对。

## 2026-09-20

### 做了什么

用户确认提交 8 条（收录仍为 `unknown`）：

- https://pianogrid.com/chords/b-7（b7 chord）
- https://pianogrid.com/chords/a-7（a7 chord）
- https://pianogrid.com/chords/g-7（g7 chord）
- https://pianogrid.com/sheet-music/easy（easy piano sheet music）
- https://pianogrid.com/chords/d-7（d7 chord）
- https://pianogrid.com/chords/e-7（e7 chord）
- https://pianogrid.com/chords/f-minor（f minor chord）
- https://pianogrid.com/sheet-music/beginner（beginner piano sheet music）

累计已提交 **26 / 206**。已收录仍为截图那 10 条。

### 下一波建议

| 提交 URL | 关键词 | volume |
| --- | --- | ---: |
| https://pianogrid.com/chords/c-7 | c7 chord | 5400 |
| https://pianogrid.com/chords/g-major | g major chord | 5400 |
| https://pianogrid.com/chords/a-major | a chord piano | 4400 |
| https://pianogrid.com/chords/d-major | d major chord | 4400 |
| https://pianogrid.com/chords/f-major | f major chord | 4400 |
| https://pianogrid.com/keyboard-notes/chart | piano notes chart | 4400 |
| https://pianogrid.com/chords/a-m7 | am7 chord | 3600 |
| https://pianogrid.com/chords/b-major | b chord piano | 3600 |

## 2026-09-21

### 做了什么

用户确认当天只提交 1 条：https://pianogrid.com/chords/d-m7（dm7 chord）。其余此前列出的 URL 当时未写入台账；2026-09-22 用户更正为此前给出的都已提交。

### 明天待确认（10 条，未提交）

| 提交 URL | 关键词 | volume |
| --- | --- | ---: |
| https://pianogrid.com/chords/c-7 | c7 chord | 5400 |
| https://pianogrid.com/chords/g-major | g major chord | 5400 |
| https://pianogrid.com/chords/a-major | a chord piano | 4400 |
| https://pianogrid.com/chords/d-major | d major chord | 4400 |
| https://pianogrid.com/chords/f-major | f major chord | 4400 |
| https://pianogrid.com/keyboard-notes/chart | piano notes chart | 4400 |
| https://pianogrid.com/chords/a-m7 | am7 chord | 3600 |
| https://pianogrid.com/chords/b-major | b chord piano | 3600 |
| https://pianogrid.com/chords/e-m7 | em7 chord | 3600 |
| https://pianogrid.com/chords/f-sharp-minor | f sharp minor chord | 3600 |

## 2026-09-22

### 做了什么

用户更正：此前给出、台账里还标着未提交的 URL 都已经交过。补记 11 条为 `gsc_submitted=yes`（2026-09-22）：

- https://pianogrid.com/chords/c-7
- https://pianogrid.com/chords/g-major
- https://pianogrid.com/chords/a-major
- https://pianogrid.com/chords/d-major
- https://pianogrid.com/chords/f-major
- https://pianogrid.com/keyboard-notes/chart
- https://pianogrid.com/chords/a-m7
- https://pianogrid.com/chords/b-major
- https://pianogrid.com/chords/e-m7
- https://pianogrid.com/chords/f-sharp-minor
- https://pianogrid.com/chords/c-maj7

累计已提交 **38 / 206**。下面这 10 条是新一批，台账里未提交。

用户下午确认：这 10 条里除下面 3 条外都已提交。未提交：

- https://pianogrid.com/sheet-music
- https://pianogrid.com/chords/b-m7
- https://pianogrid.com/chords/f-7

已补记 7 条。累计 **45 / 206**。

### 明天待提交（3 条未交 + 7 条新）

| 提交 URL | 关键词 | volume |
| --- | --- | ---: |
| https://pianogrid.com/sheet-music | piano music sheet | 2900 |
| https://pianogrid.com/chords/b-m7 | bm7 chord | 2400 |
| https://pianogrid.com/chords/f-7 | f7 chord | 2400 |
| https://pianogrid.com/scales/modes | scale modes | 1600 |
| https://pianogrid.com/chords/e-diminished | e diminished chord | 1300 |
| https://pianogrid.com/chords/finder | chord finder piano | 1300 |
| https://pianogrid.com/chords/g-m7 | gm7 chord | 1300 |
| https://pianogrid.com/guide | how to play piano for beginners | 1300 |
| https://pianogrid.com/keyboard-notes/finger-numbers | piano fingering chart | 1300 |
| https://pianogrid.com/keyboard-notes/frequencies | note frequency chart | 1300 |


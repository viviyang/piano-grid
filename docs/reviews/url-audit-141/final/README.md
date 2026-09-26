# PianoGrid 141 URL 最终修复 — 2026-09-26

原基线：`audit/141-url-content-intent@c7699615bf1554a9df676644ec14d992d9f614a2`。
产品代码与 PDF 修复提交：`6dda6927b1b6962a42e92f13ef74db5960ea3bf1`。只更新审查分支，没有合并 main 或执行生产部署。

## 修了什么

1. **来源清理不再误删限制。** 统一使用 `public-source-copy.ts`，移除内部编号、审核口吻和工具截图 ID，保留 `no contents verified`、比较适用范围、真实引用和页码、指法及版权限制。紧凑来源显示也不得隐藏整段限制。
2. **指法空状态安全。** 所选手没有原位示例时，不再强制非空断言后读取 notes；显示真实的无可用示例状态。没有增加未经支持的指法。
3. **TDH 定向纠错。** 五个 major/minor 三和弦 Description 的 `compare three inversions` 改为 `compare root position and two inversions`。其中四个属于141清单，另一个是共享影响的 `/chords/f-sharp-minor`。七和弦、Title、H1 和其他正确 Description 不改。
4. **公开文案。** 音阶目录不再展示 filter-state URLs 等实现说明，正常目录与内链保留；前两轮的 C Major 标题去重、Twinkle 全曲名及 Sheet Music 意图修正保留。
5. **PDF 生成。** 五个和弦导出入口支持 `PIANOGRID_PDF_FONT`，检查字体嵌入标志、许可说明、字符覆盖、静态/可变字体和缓存身份。没有下载或分发字体文件，也没有重做已正确的和弦 PDF。
6. **八份音阶 PDF。** 删除可见的生成器版本、输入哈希、内部来源编号，保留真实来源、使用范围和音乐文本。页数与纸张尺寸不变，生成器输出可重复。
7. **内链审计。** main 内目录链接不再误归为全站菜单；全 sitemap 抓取，正文、正文目录和全站导航分别统计，BFS 计算深度。未抓取记未知，不用固定三条内链作为 Google 合格线，没有盲目加链接。

## 已完成验证

完整验证在 Actions run `36234661441` 成功：其已校验的工作树随后提交为 `6dda6927`，不是拿旧生产页面证明新代码通过。见 `RESULT.json`。后续验证工作流只有读取权限，不再修改分支。

| 检查 | 结果 |
|---|---|
| 针对性单元测试 | 22 通过 |
| Foundation、TypeScript、CSS | 通过；Foundation 568/568 |
| 完整生产构建 | 通过 |
| 同构建运行时 sitemap 抓取 | 206/206 |
| 141 页 TDH、canonical、索引指令和已定义公开措辞检查 | 141/141 通过 |
| 141 页正文或正文目录来源 | 全部有；不是纯导航孤儿页 |
| 公开 PDF 扫描 | 171 份、396 页；所查缺字/内部措辞为零 |
| 生成目录与公开 PDF 副本 | 136 组哈希一致 |
| 重生成音阶 PDF | 8 份音乐文本行、页数、纸张尺寸不变 |
| Chrome 桌面/手机模拟 | 6 路由 × 2 尺寸 = 12 通过 |

PDF 已抽样渲染检查，部分样本用第二个 PDF 引擎复核。浏览器检查包括 DOM、公开措辞、溢出、C Major 面板标题与截图；不是全交互、实体手机、听音、实体打印或完整无障碍验收。

## 保留的边界

GSC 索引原因、Google 最后抓取版本与 Google canonical 均未取得。技术与内容检查通过不等于 Google 已收录。
Hot Cross Buns 仍负责 Sheet Music 版本/获取；键位教程仍为 `NOT_IMPLEMENTED`，新关键词 volume 仍为 `UNKNOWN`，没有继承320。
没有新增路由、批量扩写、虚构歌曲/指法、noindex、canonical 或视觉主题改动。

## 本地复验

```bash
python -m pip install -r scripts/url-audit-python-requirements.txt
node --experimental-strip-types --test tests/url-audit/public-source-copy.test.mjs
python -m unittest discover -s tests/url-audit -p 'test_*.py'
python scripts/generate-scale-pdfs.py
python scripts/generate-scale-completion-pdfs.py
python scripts/check-url-audit-pdfs.py
npm run check
npm run build
# 另一个终端：npm run start -- --hostname 127.0.0.1 --port 8123
python scripts/audit-url-141.py --base-url http://127.0.0.1:8123
# CHROME_BIN 指向本机已安装的 Chrome：
node scripts/check-url-audit-browser.mjs
```

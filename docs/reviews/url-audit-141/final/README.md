# 141 URL 最终代码修复 — 2026-09-26

基线：`audit/141-url-content-intent@c7699615bf1554a9df676644ec14d992d9f614a2`。只更新审查分支，不合并 main、不部署生产。

## 实际修改

- 来源清理共用 `public-source-copy.ts`。只移除内部编号和审核口吻，保留 `no contents verified`、比较适用范围、原始引用、页码、指法和版权限制。紧凑来源模式也不得把限制整段隐藏。
- 指法组件在所选手没有原位示例时给出诚实的空状态，不再强制非空断言后访问 notes。
- 修正 major/minor 三和弦 Description 中 `compare three inversions` 为 `compare root position and two inversions`。七和弦真正的三个转位不改，Title/H1 不改。
- 音阶目录移除实现说明 `These links do not create filter-state URLs`，保留既有目录和链接。
- 五个和弦 PDF 生成入口统一支持 `PIANOGRID_PDF_FONT`，验证字体嵌入许可、字符覆盖、静态/可变字体及缓存身份。没有下载或分发字体文件，既有正确和弦 PDF 不重做。
- 八份音阶 PDF 清理正文里的生成器版本、输入哈希、内部来源 ID 和工具截图编号；真实来源、使用范围、音乐数据和纸张尺寸保留。生成记录留在内部 metadata，导出可重复。
- 内链脚本不再删除所有 nav：main 内的目录链接与全站导航分开统计；使用全 sitemap 快照和 BFS 测量真实深度。未抓到的页面记未知，不按固定三条内链阈值判定合格。

## 已完成的本地验证

22 项针对性单元测试通过。171 份公开 PDF、396 页扫描未发现缺字或所查内部措辞；136 组生成文件/公开副本哈希一致；8 份重生成音阶 PDF 的音乐文本行、页数和纸张尺寸与提交前一致。抽样渲染已检查，但不是实体打印或完整 PDF 无障碍验收。

基线完整构建成功。基线静态 HTML 可读取 205/206 sitemap 路由；缺少的 `/songs/easy` 是动态路由，不当作孤儿页。141 个目标都有 main 正文或 main 目录来源。最终代码的完整检查、运行时 HTML 抓取与浏览器结果以同目录 `RESULT.json` 和对应 Actions 日志为准；在它们生成前不得声称最终全套通过。

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
# 另一个终端先启动生产构建服务，再执行：
python scripts/audit-url-141.py --base-url http://127.0.0.1:8123
# 设置 CHROME_BIN 为已安装 Chrome 的路径：
node scripts/check-url-audit-browser.mjs
```

Google 收录原因、最后抓取版本、Google canonical 均未取得，本轮不将 GSC UNKNOWN 写成通过。没有批量扩写、歌曲/指法编造、新增路由、noindex 或 canonical 修改。Hot Cross Buns 保留 Sheet Music 获取/版本任务，键位教程仍为 NOT_IMPLEMENTED；不继承原词搜索量。

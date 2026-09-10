# Piano Reference｜A minor 最终交互样板

仅 `/chords/a-minor`。这是当前对话完成的独立原型，不是已上线网站。

## 查看

直接用浏览器打开 `index.html` 即可，不需要安装Node或启动服务器。样式、脚本、音乐数据和可下载PDF均内置。播放需要用户点击；初次打开可能需要浏览器允许声音。

`chords/a-minor/index.html`是相同页面的路由目录版本。根目录index只是本地查看入口，不是新设计的首页。

主要检查：切换三个位置；分别齐奏、逐音、停止；切换过程中停止旧声音；查看当前位置打印；下载三个位置PDF；在手机宽度查看键盘；展开FAQ。本页搜索只搜索此页，不是全站搜索。

## 文件

- `index.html`：可直接打开的独立样板。
- `source/styles.css`、`source/app.js`：可维护的样式与交互源码。
- `source/build.py`：从真实输入生成HTML、映射和PDF模板。
- `source/page-content.extract.json`：保留本页九个block及三个voicing。
- `assets/a-minor-notes-inversions.pdf`：本轮从同源数据重新渲染的一页参考。
- `design.md`：视觉、布局、状态与复用规则。
- `content-adaptations.md`：唯一指代改动、重排和资源来源。
- `checks/acceptance.json`：本轮检查结果与未测项。
- `checks/provenance.json`：输入、旧稿保护和PDF来源记录。
- `previews/`：真实浏览器截图、状态和打印预览。
- `inputs/`：本轮实际使用且未修改的源输入副本。

## 与旧稿的关系

采用A的浅色基线，重点修改首屏顺序、音符答案的强调、手机键盘视口和控件状态。没有覆盖旧A/B/C/D；也没有再次生成四个方向。

规划Markdown在文件库中检索到，但原文件二进制未挂载到当前工作目录；相关范围通过文件库摘要核对，具体可重现的模板、URL、关键词和交付字段使用完整url-plan.final JSON。未声称取得或重新生成完整Markdown原件。

## 源码再构建

普通查看HTML不需要安装依赖。可选源码维护需要Python 3.12及以上（使用UTF-8模式，兼容Windows中文输入文件）。已有PDF放在assets中。

```bash
python -X utf8 source/build.py
```

可选重渲染、浏览器验收：

```bash
python -m pip install -r requirements-dev.txt
python -m playwright install chromium
python -X utf8 source/render.py
python -X utf8 source/verify.py
```

浏览器脚本优先使用环境变量`PIANO_CHROMIUM_PATH`或系统Chromium，否则使用Playwright安装的Chromium。校验脚本仅在上级目录仍有原四版文件时重新比较其哈希；解压包不含这些旧稿时明确记录为跳过。包内输入仍按保存的哈希验证。
页面为静态HTML/CSS/JS，无外部样式、字体、音频采样或CDN依赖；未加入账号、支付、MIDI输入、保存、评分或其他页面。

## 验收边界

检查方法是把HTML源加载到真实Headless Chromium中渲染和交互，并生成浏览器打印PDF。本运行环境阻止file://导航，因此测试使用set_content加载HTML字节；这不是发布或远程托管。

自动检查覆盖数据、布局、按键、状态和Web Audio调度，不等于人耳已经试听，也不等于实物打印。未进行真机Safari/Firefox/Edge、完整屏幕阅读器或完整WCAG合规验收。页面没有被标为ready_for_publish。

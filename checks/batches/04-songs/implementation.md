# 04-songs 实施记录

日期：2026-09-09  
状态：`implementation_checked`，开发已停止，等待独立验收。  
范围：仅`/songs`、`/songs/easy`及本批必要组件、模板、测试和进度文档。Foundation与00–03成果保留；未进入05。

## 交付

- [已核实] T15 `/songs`：打开即显示6个具体版本；搜索只覆盖源合同的作品名、artist与edition。出版方级别只列三个已有标签，缺level的All of Me不进入正向级别筛选；六个选曲目标均有实际结果。
- [已核实] 每个中心条目显示作品、作者或artist、具体edition/编配、publisher、format、publisher level basis、选择理由、检查建议、access及准确外链。源为null的key、tempo、fingering不显示或推算。
- [已核实] T16 `/songs/easy`：打开即显示9个重点版本；kids、C-major、beautiful、adults、impress五个源section均可切换且有2–3个匹配。两个Twinkle版本及两个Happy Birthday任务保持不同edition、level、key与access。
- [已核实] 同一Hal Leonard `HL00131140`合集中的50个曲名全部按独立resource ID呈现；页面明确它们共用合集级Easy Piano标签，0条经过本站逐曲performance test，不写成top-50排行或50个免费下载。
- [已核实] `SongResourceCard`被T15与T16实际共用；中心与专题各自拥有筛选状态。`SongShell`、`ReadingSection`和`CatalogTable`由服务器模板组合，页面职责未被统一外壳抹平。
- [已核实] `SiteHeader`增加Songs当前栏目显示；既有页面仍由原调用方使用。未新增依赖、动画库、静态资产、动态路由、其他歌曲专题、Sheet Music、首页或指南页面。

## 来源、版本与权限边界

- [已核实] `song-content.ts`通过全站白名单读取两个URL，检查template、已知核心block、重复ID、空section、HTTPS外链与rights。未知核心block或非external-only资源直接失败。
- [已核实] 页面对象与`C-Songs/batch-page-content.json`逐字节JSON结构相等；8+6个原文blocks逐一呈现，14个source_group均登记在`coverage.json`。
- [已核实] 6个中心资源、9个重点Easy版本和50个合集目录对象逐一核对ID、edition、publisher、level basis、access、resource URL及`redistribute_score=false`、`redistribute_recording=false`。
- [已核实] UI仅打开出版方外链；没有下载、缓存、iframe或分发第三方谱面、录音、封面和教程。Hoffman Academy、Hal Leonard、Alfred Music各抽样一个入口可访问，结果在`external-link-sample.json`；其余链接没有逐一发起网络访问。
- [已核实] `docs/content/site-master/`、`docs/product/`和`docs/design/reference/`基线哈希逐文件核对未变；依赖和锁文件未变。

## 实际验证

| 命令 / 证据 | 结果 |
|---|---|
| `npm run check` | [已核实] Foundation 560/560；TypeScript通过；Tailwind v4真实编译、语义声明与`cn`检查通过。 |
| `node scripts/check-song-data.mjs` | [已核实] 902/902。逐URL同源、block/source_group、65个资源对象、section归属、rights、版本差异、50曲合集及只读源哈希。 |
| `node scripts/check-song-batch.mjs` | [已核实] 119/119。逐block/ID/版本/外链、搜索、级别与目标组合、空结果/清除、Easy五类、50行目录、无JS、404、1440/390截图、320/768及200%文字。 |
| 三家出版方节制抽样 | [已核实] 3/3入口可访问并匹配资源身份；没有购买、登录、下载或媒体播放。 |
| `npm run build` | [已核实] Next.js生产构建成功，只有十二条授权业务路由与`/_not-found`。首次受限环境在TypeScript工作进程出现`spawn EPERM`；按同一命令在本机执行后成功。 |
| production server + `node scripts/check-song-production.mjs` | [已核实] 54/54。十二路由200/noindex/无内部master payload，两条新页四宽度与200%文本通过，七条越权路由404。 |
| A minor回归 | [已核实] 162/162。依据03独立验收的P3备注，在旧脚本`afterprint`断言前等待React提交；产品代码未因此修改。 |

浏览器套件使用项目既有Playwright运行时和本机Chrome，不安装或升级依赖。代表截图位于`screenshots/`；1440与390已人工查看，视觉待独立验收的判断与代码自动检查分开。

## 已保留问题与未测项

- [已核实] `C-center-review`保留：中心未阅读全文的具体编配，key、tempo、fingering为null；若以后展示这些字段，需要合法取得并核对准确版本。
- [已核实] `C-EASY-FIFTY-DETAIL`保留：50曲目录的个别署名、key、technical_demands未逐首读取。`C-EASY-TWINKLE-PRICE`保留：冲突版本不显示free标签。`C-EASY-RIGHTS`与源错误台账保持。
- [已核实] NOT RUN：真人试弹、真实移动设备、NVDA/JAWS/VoiceOver人工长流程、购买或登录流程、全部外链逐一访问、第三方sample音频播放、专业钢琴教师签核、部署和04独立验收。
- [推断] 自动化与人工截图检查支持“实现符合当前页面和数据合同”的开发结论；依据是逐对象断言、真实浏览器交互、四宽度、生产构建和权限边界检查。它不能替代主观选曲判断、第三方结账条件或专业教学审阅。

## 停止点

- [已核实] 没有P0–P3开发阻塞。04独立验收尚未运行；状态保持`independent_review_pending`，未进入05-guides、发布、索引或部署。

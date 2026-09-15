# Rights and content blockers

以下项目只阻止对应资产或动作；它们没有被用来省略其他安全实施。

| 对象 | 当前已核实状态 | 被阻止动作 / URL | 解除所需证据 | 责任角色 |
|---|---|---|---|---|
| 3 个命名曲外部版本 | 仅 external reference；local score/audio 为 null | 本站展示、下载、打印或播放命名曲谱面/音频；3 个命名曲 Sheet URL 只能导向提供方 | 确切编配/刻写/录音供给；逐层权利、动作、商业、地域、期限证据；对应 hash/revision grant | 内容供给 + 权利审批人 |
| 3 个 PianoGrid 原创练习、24 文件 | staging；`runtime_grants=[]` | 任何 public/CDN/静态构建发布；公开 Play/Print/Download | 作品、编配、刻写、录音/采样、字体各层适用证据；准确 action/territory/commercial/expiry；匹配 asset hash 与 arrangement revision 的真实 grant | 权利审批人 + 发布负责人 |
| 原创练习音乐正确性 | 包附自动结果可参考；当前环境无法运行 `mido` 检查；无真人听音或具名专业审阅 | teacher-reviewed 声明；音乐质量最终放行 | 独立音高/节奏/格式复核；具名专业审核；逐音真人听音，证据指向准确 hash/revision | 音乐编辑 / 专业审阅者 |
| 原创 PDF | 自动渲染与屏幕视觉检查不等于实体打印；PDF 未 tagged | 下载/打印发布；PDF 无障碍结论 | A4/Letter 实体打印各版本；裁切/字线/记谱核验；决定并记录 tagged PDF 或替代可访问方案 | QA + 无障碍负责人 |
| 设备、浏览器、读屏 | 自动 Chromium 320/390/1440 与 no-JS 已过；无真实 iPhone Safari/NVDA/VoiceOver | 人工可用性最终验收 | M01–M03、M05、M09 的执行人、设备、日期和结果 | QA / 无障碍审阅者 |
| P106 Amazing Grace 指法 | 页面保留包内“已查看起始指号”事实；未做本轮真人逐项复核 | 更强的逐音指法承诺 | 在确切 provider edition 逐项记录数字、位置、获取与权限 | 内容审阅者 |
| Affiliate / 付费 / Ads | 无批准、无跟踪 URL、无产品交付 | sponsored link、Offer、购买、收费、广告脚本 | 平台/合同批准、真实跟踪 URL、披露、产品与交付、退款/税务/隐私决定 | 商业/法务/产品负责人 |
| 公共部署 | 用户明确禁止部署；线上 6 个 Sheet URL 当前 404 | 生产上线 | 独立只读验收完成；人工/权利门槛按动作解决；另行明确部署授权 | 用户 / 发布负责人 |

[已核实] 不可用按钮没有靠 `robots` 或 `noindex` 掩盖；对应资产未进入 `public`、client static、source map 或 production NFT trace。


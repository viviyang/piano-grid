# 本轮交付包质量记录

检查对象：v2资料包，不是PianoGrid生产网站。日期：2026-09-15。

## 已实际执行

[已核实] `node --test qa/gates.test.mjs`：30个测试通过。包括真实catalog引用与staging、许可动作/资产hash/revision/地域/期限、缺证据、商业用途、音频/打印人工门槛、同版分享、旧打印别名与未知参数。正向授权是明确标记的synthetic test fixture，**不是PianoGrid真实许可**。

[已核实] `python qa/check_music.py --output qa/music-check-results.v2.json`：3原创练习跨events/MusicXML/MIDI/WAV的格式与信号检查通过；3个故意损坏版本（XML音高、MIDI音高、静音WAV）被拒绝。用固定字面期望、不同解码器与频谱测量，不从生成器导入期望；但生成和检查由同一助手提供，**不是独立专业人员审核**。

[已核实] 6个PDF在PyMuPDF中渲染，逐份检查页数/尺寸/回站链接，并目视检查渲染。初版加线音符C4下方标签间距偏紧，本轮调整3 SVG＋6 PDF为engraving rev2；音乐事件、MIDI与WAV不变。重渲染后没有观察到明显裁切和该标签碰撞。**这不是实体打印、PDF/UA认证或完整专业刻谱审定。**

[已核实] 文件完整性检查脚本核对64行C/D与新交接一致、全部URL/子任务与265位置映射、8页增补/6张卡、24资产hash与同版归属、无字体二进制、无虚假本地三首曲谱。实际数目与结果在`package-check-results.v2.json`。

## 未执行，不能标PASS

| 层 | 状态与原因 |
|---|---|
| production/Keyboard Git tree/build/test | NOT_RUN：当前不是完整Git仓库；Codex须读取Keyboard最新RESULT/Handoff，确认accepted baseline后从其新建Songs clean worktree |
| 网站实际UI/播放器/真实资产下载 | NOT_RUN：本轮编写执行包，不实施站点 |
| 真机听音、iPhone/Windows浏览器完整流程 | NOT_RUN |
| 实体A4/Letter打印、VoiceOver/NVDA | NOT_RUN |
| 具名专业音乐审核 | NOT_REVIEWED |
| 三首命名歌曲本地编配/谱面/录音 | BLOCKED_SOURCE_AND_RIGHTS，不用原创热身替代 |
| 全球版权清权/具体再授权 | NOT_ESTABLISHED；文档记录不等于许可 |
| affiliate获批、支付/订阅、广告、收入 | NOT_IMPLEMENTED / NOT_VERIFIED |
| 线上部署与Google收录 | NOT_RUN |

## 复现与后续

在资料包根目录运行：

```text
python qa/check_package.py
python qa/check_music.py --output qa/music-check-results.local.json
node --test qa/gates.test.mjs
python qa/check_package.py --check-manifest
```

`check_package.py`只用标准库；音乐脚本需numpy和mido。重新生成谱面才需工具头部列出的ReportLab/fontTools/svglib等。不要升级网站依赖来跑资料包工具。重生成后文件hash可能变化，必须更新manifest/资产审核，不能沿用旧批准。

文件机器检查通过不能提升`runtime_grants`或public启用状态。实际实施结束后按照`MANUAL_ACCEPTANCE.md`和根目录独立验收Prompt交接。

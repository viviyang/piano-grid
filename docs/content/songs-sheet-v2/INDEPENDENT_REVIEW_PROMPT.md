# 独立验收 Prompt（业务代码默认只读）

审核PianoGrid Songs＋Sheet Music的实际实施，不重新设计产品。先读取本包`01_MASTER_CONTEXT.md`、`PLAN.md`、`CODEX_PROMPT.md`、`DATA_CONTRACT.md`、`URL_DIFF.md`与实施者真实RESULT/基线和最终diff。

确认production ancestor是`1e3fdecd6e9426999689df361a4f47aa2d378848`；再读取Keyboard RESULT / Integration Handoff，确认Songs实际base等于Keyboard accepted baseline commit。验证Songs使用独立clean worktree，而不是直接续写Keyboard开发worktree，也没有绕过Keyboard成果退回`1e3fdec`。历史dirty worktree未被reset/clean/覆盖；本轮业务只有一个writer。附件dirty快照只作线索，最终判断以真实accepted base/diff/运行结果为准。

不要盲信上一会话PASS。用独立方法检查：
1. 原64项/265位置保留，首8页差集真实、55后续和19暂停未误激活；所有必须子任务有材料而非只剩标题。
2. 外部版、本站原创/许可版和未知资源严格区别；三首知名曲不是三个原创练习。所有Song与Sheet关系同arrangement/revision；无虚假的notes/chords/hand/免费/试听/打印宣称。
3. 复现首批字段兼容与计数修复；原卡片/50合集用途/分区不回退。不同职责不是重复整篇文案。
4. 逐小节读三份原创SVG/PDF，对照事件与MusicXML/MIDI及实际播放。不得调用同一生成器生成“期望”后声称独立核验。包内频谱检查与人工听音区别记录；具名教师审核没做就是没做。
5. 改坏hash/revision/asset归属、伪造US-only全局许可、grant过期/撤回/空source、资源staging、音频失败、未知参数均应失败关闭。静态构建/CDN资源本身不能绕过gate公开。
6. 播放/停止/切换/切页/打印/隐藏无挂音；速度正确不改pitch；片段不跨版本，播放结束不等于用户弹对。
7. 在实际浏览器测试窄屏、键盘操作/焦点、无JS、失败状态、下载/打印回站与分享恢复；自动检查不冒充VoiceOver/NVDA和实体打印。
8. SEO与商业诚实：canonical、indexability、sitemap正确；没有假的Offer/试听/teacher-reviewed；无未批准affiliate、购买、广告或账户。

输出`REVIEW_RESULT.md`：每个发现含severity、证据位置/复现、预期/实际、影响范围、最小修复；无复现的疑问标UNVERIFIED。给出针对本批可实施范围的判定，同时单列命名曲版权/素材和人工发布门槛，不能把它们统称“已经全部PASS”。

不要修改业务代码。把需修复内容交还原实施会话；可以运行只读检查并在独立验收目录写报告。未做的测试明确写未做，不要求用户再重做整站规划。

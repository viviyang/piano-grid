# PianoLab V1｜实际验收记录

日期：2026-09-10  
环境：Chromium 144.0.7559.96，Linux headless；使用 viewport 模拟不同宽度。  
范围：本包独立 `index.html`，不是用户原仓库或生产网站。

[已核实] **28 项检查通过，0 项失败。** 详细记录见 `qa/report.json`；每项包含检查名称与结果。由于运行环境浏览器策略限制本地 file URL，测试通过 `page.set_content()` 装载完整 HTML，不将其伪装为已在用户 Windows 上双击验收。

## 已执行

| 检查 | 结果 |
|---|---|
| `audio_not_initialized_on_load` | PASS |
| `no_external_requests` | PASS |
| `single_h1` | PASS |
| `preview_noindex` | PASS |
| `no_sheet_music_navigation` | PASS |
| `no_account_or_paid_feature_claims` | PASS |
| `piano_sequence_desktop` | PASS |
| `piano_sequence_mobile` | PASS |
| `responsive_no_horizontal_overflow` | PASS |
| `mobile_menu_opens` | PASS |
| `mobile_menu_closes_on_escape` | PASS |
| `primary_cta_scrolls_to_tasks` | PASS |
| `route_preview_works` | PASS |
| `dialog_closes_on_escape` | PASS |
| `dialog_focus_restored` | PASS |
| `major_toggle_updates_notes` | PASS |
| `user_gesture_initializes_audio` | PASS |
| `major_audio_correct_midi` | PASS |
| `audio_nodes_cleaned_up` | PASS |
| `minor_audio_correct_midi` | PASS |
| `keyboard_arrow_moves_by_semitone` | PASS |
| `keyboard_enter_schedules_pitch` | PASS |
| `reduced_motion_static` | PASS |
| `motion_pause_works` | PASS |
| `offscreen_motion_stops` | PASS |
| `all_route_previews_have_content` | PASS |
| `no_browser_exceptions` | PASS |
| `no_js_headline_and_links_visible` | PASS |

## 视觉验收

真实浏览器渲染 1440px 桌面与 390px 手机全页；已查看总览和首屏，检查层级、键位、标记、按钮与结构。色值对比单独按相对亮度公式核对；不把截图或颜色计算当作完整 WCAG 认证。

`design/desktop-hero.png` 从首次完整桌面截图的顶部裁切；不使用交互测试结束后的滚动位置当作首屏。总览图组合的也是同一份 HTML 截图，不是另外生成的网页 UI。

## 尚未执行

- Physical iPhone/Safari or Windows device
- Human listening / piano timbre approval
- Screen-reader testing with NVDA or VoiceOver
- Existing Next.js repository build and production routes
- Trademark clearance, registrability, domain availability
- Live Core Web Vitals or search indexing
- Independent third-party acceptance

## 结果解释

音频测试核对用户动作后 AudioContext 进入运行、指定音高被调度、节点结束后清理；没有声称人工听过扬声器输出或确认音色。移动端检查是尺寸模拟，不是实际 iPhone Safari。

初次测试遇到运行环境本地文件策略限制，调整为装载 HTML 内容后完成测试；录像工具所需的 ffmpeg 使用环境中已有的 ffmpeg。未修改用户项目依赖。

本文件为制作环节自检，不是项目独立验收人员签署的发布许可。

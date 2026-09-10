# Batch B open issues

内容准备与线上功能分开验收。以下问题不能由 Codex 自行补写；重复页面上的独立数据缺项均保留。

## /keyboard-notes

- BK-RENDER-QA / keyboard_visual_and_audio：[已核实] Ordered key and lookup data have been prepared; no website interaction or playback has been implemented or tested.；解决：Render each supplied layout and verify every click resolves to the same note as text lookup; test chosen range, preserved spellings and active-play behavior.

## /keyboard-notes/labeled

- BK-RENDER-QA / keyboard_visual_and_audio：[已核实] Ordered key and lookup data have been prepared; no website interaction or playback has been implemented or tested.；解决：Render each supplied layout and verify every click resolves to the same note as text lookup; test chosen range, preserved spellings and active-play behavior.
- BK-PRINT-ASSET / print_assets：[已核实] No 88/61-key print graphic or PDF file was generated in this content/data task. Printable keyword delivery is therefore partial.；解决：Generate original readable reference diagrams from the supplied key arrays and verify screen/print selection parity before enabling download.
- BK-STICKER-FIT / print_payload.sticker_dimensions：[已核实] No physical dimensions or material/adhesive compatibility for the user’s keyboard model have been established.；解决：Keep the output as a reference diagram. Do not claim a full-size sticker template or model-specific application instructions.
- BK-OTHER-NUMBERS / other_number_schemes：[已核实] Baseline does not define what an additional “with numbers” system means. Only optional octave suffixes are specified here.；解决：Retain the demand as undecided; do not substitute finger numbers, scale degrees or numbered notation.

## /keyboard-notes/chart

- BN-U069-SOLFEGE / data.solfege：原规划明确 do re mi 规则未定，首版不开放。；解决：后续明确固定唱名或首调唱名、minor规则及显示目的，再单独准备与审核映射；当前不补写、不开放。
- BN-U069-RENDER / data.print_and_interaction：音名/键位/谱位数据及默认联动样例已交付；尚未生成并视觉验收实际谱表、键盘图、交互或PDF。；解决：Codex用本包坐标与音高数据渲染；逐点检查C4两谱号同键、黑键两种拼写不同谱位、范围端点，打印不能挤成不可读整行。
- BN-U069-RANGE / data.range_modes.61_keys：C2-C7布局已核实，但原规划仍是后续同页补齐；不是根据61键数自动推定所有型号与设置相同。；解决：保留起止音说明并在实现时验收范围模式；不改变原first_release_scope，不默认开放任何具体设备自动识别。

## /keyboard-notes/frequencies

- BR-FREQ-RENDER / rendered_chart_and_keyboard：88行表格与键定位数据已提供；最终桌面/移动端显示与高亮尚未实现验收。；解决：按key_number和MIDI两个独立字段渲染，检查A0/C4/A4/C8及黑键定位；不添加调音器。
- BR-FREQ-PRINT / data.print.pdf_asset：尚未生成实际打印PDF；不得显示已有下载文件。；解决：需要打印入口时生成并检查全部88行和调律说明，无截行/缺页。

## /keyboard-notes/finger-numbers

- BR-FINGERS-DIAGRAM / data.diagram_contract.svg_or_image_asset：左右手编号映射和图示方向已明确；尚未交付最终原创手图。；解决：按player-view绘制并检查左右手、拇指朝内、1–5对应、文字不镜像；专业复核后使用。
- BR-FINGERS-SCOPE / fingering_chart_intent：原词可能包含具体乐句/音阶指法需求；本基线职责为手指编号与具体参考入口。；解决：保留本页职责；仅链接已有具体对象，不把编号图视为通用曲目指法方案。
- BR-FINGERS-PRINT / data.print.pdf_asset：尚未生成实际打印PDF。；解决：最终手图完成后生成打印版并视检；资源不存在时不显示下载承诺。

## /keyboard-notes/blank

- B-BLANK-UI / key_count_selector：13/25键预览SVG与两种纸张PDF已准备；网页选择器未实现。；解决：实现选择器并确认选项调用对应SVG；提供实际PDF链接。

## /keyboard-notes/key-signatures

- BN-U074-RENDER / data.print_and_render：15组文字/数据调号表已完成；实际高低谱号中的调号刻印图与打印件尚未生成验收。；解决：Codex依据signed_fifths用规范制谱引擎绘图并视觉检查全部0–7升降号；生成真实打印输出后才显示下载按钮。
- BN-U074-LINKS / data.chart_rows.*_scale_url：部分调性没有独立基线URL；已保留null并使用现有/scales中心兜底。；解决：只链接已上线的现有基线页面；不得为填满表格增建URL。

## 自检

- [已核实] {'check': 'Baseline task-group coverage', 'status': 'pass', 'result': '17/17 lookup groups and4/4 labeling groups retain explicit delivered/pending records'}
- [已核实] {'check': 'Complete key arrays', 'status': 'pass', 'result': '88 consecutive MIDI21–108 keys,52white/36black;61 consecutive MIDI36–96 keys,36white/25black'}
- [已核实] {'check': 'Lookup alias round trips and octave boundaries', 'status': 'pass', 'result': 'Every stored alias resolves to its key; B#3=C4=60, B#4=C5=72, Cb4=B3=59; D8 remains outside both selected ranges'}
- [已核实] {'check': 'Scope and evidence distinctions', 'status': 'pass', 'result': '61-key layout expressly representative; positions/calculated data marked inference; no extra numeric-label scheme, physical sticker sizing, MIDI input feature or finishedPDF claimed'}
- [已核实] {'check': 'Conflicting source span statement', 'status': 'resolved', 'result': 'Excluded Yamaha Vietnam 7⅓ wording; adopted exactA0–C8=87semitones=7¼octaves corroborated by YamahaUS andKorg endpoints'}
- [已核实] {'check': 'baseline', 'status': 'passed', 'detail': '2/2 routes and all 7 source groups retained. No new keyword, URL, scope or solfege rule introduced.'}
- [已核实] {'check': 'staff mapping', 'status': 'passed', 'detail': '88 chromatic keys, both clefs for all spellings; 15 natural-note anchors in each focused view. C4 is treble -2 and bass +10, same MIDI60/key40. Core line/space/ledger endpoints checked.'}
- [已核实] {'check': 'range and pitch consistency', 'status': 'passed', 'detail': 'A0-C8 =88 keys; C2-C7 =61 keys; middle C position25 in this61-key layout. F#4/Gb4 share MIDI66 but have distinct staff positions.'}
- [已核实] {'check': 'key signatures', 'status': 'passed', 'detail': '15 major+15 minor names; ordered accidental counts0–7 checked; all derived major/natural-minor note sets satisfy their interval rules. Exact signature pairs cross-checked in Musicca and visually inspected original Strohman PDF.'}
- [已核实] {'check': 'assets and deferred features', 'status': 'passed_with_open_issues', 'detail': 'No nonexistent PDF/download claims; no source graphic/audio reused. do re mi remains disabled with null mapping. Actual visual/interactivity/print QA remains for implementation.'}
- [已核实] {'check': 'baseline URLs and task groups', 'status': 'passed', 'detail': 'Exactly /keyboard-notes/frequencies P125 and /keyboard-notes/finger-numbers P126; linked URLs all exist in baseline.'}
- [已核实] {'check': '88-key dataset', 'status': 'passed', 'detail': '88 unique notes, MIDI21–108, key1–88, A0–C8; 52 white/36 black metadata.'}
- [已核实] {'check': 'frequency mathematics', 'status': 'passed', 'detail': 'Every adjacent ratio and every available octave ratio checked against verified formula. Eight source-table landmarks independently agree at 2 decimal places.'}
- [已核实] {'check': 'calculated vs measured separation', 'status': 'passed', 'detail': 'Every frequency row is labeled [推断] with formula basis; no microphone, tuner or recorded measurements.'}
- [已核实] {'check': 'hand labels and orientation', 'status': 'passed', 'detail': 'Both hands map thumb1 through little5; opposite left-to-right display order; no guessed piece fingering.'}
- [已核实] {'check': 'source discipline', 'status': 'passed_with_documented_access_limits', 'detail': 'Formula independently supported by UNSW and Inspired Acoustics; finger identities from Yamaha and original Hoffman lesson. Open Music Theory scale-degree chapter retrieved as full search text; direct-open failure disclosed.'}
- [已核实] 13键=8白+5黑；25键=15白+10黑
- [已核实] SVG无音名字母，均为C-C片段；不冒充完整键盘
- [已核实] Letter/A4两份PDF均已渲染并视觉检查，键盘与文字无截断/重叠；使用嵌入字体
- [已核实] URL集合与本批基线完全一致
- [已核实] 逐页关键词与源任务原样保留
- [已核实] 来源ID可解析
- [已核实] 未修改已完成chords页
- [已核实] 全部ready_for_publish=false，未将内容准备当作功能验收
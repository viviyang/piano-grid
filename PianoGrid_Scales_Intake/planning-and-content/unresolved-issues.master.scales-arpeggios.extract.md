# Scales / Arpeggios unresolved-issues master extract

> Exact Batch A section copied from `docs/content/site-master/unresolved-issues.master.md`.

### Batch A

#### /scales

- A-CENTER-PRINT / data.print_assets：本轮提供打印内容及字段；尚无涵盖全中心范围的真实PDF资产，不能宣称all/双手PDF交付。；解决：由本批已核实手别/方向数据生成原创PDF并视觉验收；未核指法组合不输出数字。
- A-CENTER-IMPLEMENT / playback/print：提供内容与选择数据；查询、播放、打印功能未开发验收。；解决：Codex实现后对显示/发声/打印三者一致性验收。

#### /scales/c-major

- AM-C-MAJOR-RENDER / notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-C-MAJOR-RANGE / fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

#### /scales/a-minor

- AN-U091-natural_minor-FINGER / data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U091-harmonic_minor-FINGER / data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U091-melodic_minor_classical-FINGER / data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U091-RANGE / data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U091-QA / data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

#### /scales/modes

- AT-scales-modes-FINGERING / data.examples[*].fingering：缺少对应对象、手别、方向、八度范围的完整专业指法来源；不得由模式补写。；解决：逐个选择明确标注全部音符指法的正规教学资料，并经钢琴教师复核；已明确收录的例外见对象数据。
- AT-scales-modes-OUTPUT / rendered_staff_keyboard_audio_pdf：已提供音符与渲染数据；本轮未生成并视检实际谱表/键盘图、音频或打印PDF，不能声称这些功能已可用。；解决：实现时用本页数据渲染并逐音视检/试听；PDF生成检查成功后才显示下载入口。
- AT-scales-modes-PRACTICE / blocks.practice：练习是基于已核实音符的编辑提议，未通过专业教学效果或动作审核。；解决：钢琴教师核对适用水平和练习安排；不承诺学习效果。

#### /scales/blues

- AT-scales-blues-FINGERING / data.examples[*].fingering：缺少对应对象、手别、方向、八度范围的完整专业指法来源；不得由模式补写。；解决：逐个选择明确标注全部音符指法的正规教学资料，并经钢琴教师复核；已明确收录的例外见对象数据。
- AT-scales-blues-OUTPUT / rendered_staff_keyboard_audio_pdf：已提供音符与渲染数据；本轮未生成并视检实际谱表/键盘图、音频或打印PDF，不能声称这些功能已可用。；解决：实现时用本页数据渲染并逐音视检/试听；PDF生成检查成功后才显示下载入口。
- AT-scales-blues-PRACTICE / blocks.practice：练习是基于已核实音符的编辑提议，未通过专业教学效果或动作审核。；解决：钢琴教师核对适用水平和练习安排；不承诺学习效果。

#### /scales/d-major

- AM-D-MAJOR-RENDER / notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-D-MAJOR-RANGE / fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

#### /scales/e-minor

- AN-U094-natural_minor-FINGER / data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U094-harmonic_minor-FINGER / data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U094-melodic_minor_classical-FINGER / data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U094-RANGE / data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U094-QA / data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

#### /scales/f-major

- AM-F-MAJOR-RENDER / notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-F-MAJOR-RANGE / fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

#### /scales/g-major

- AM-G-MAJOR-RENDER / notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-G-MAJOR-RANGE / fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

#### /scales/pentatonic

- AT-scales-pentatonic-FINGERING / data.examples[*].fingering：缺少对应对象、手别、方向、八度范围的完整专业指法来源；不得由模式补写。；解决：逐个选择明确标注全部音符指法的正规教学资料，并经钢琴教师复核；已明确收录的例外见对象数据。
- AT-scales-pentatonic-OUTPUT / rendered_staff_keyboard_audio_pdf：已提供音符与渲染数据；本轮未生成并视检实际谱表/键盘图、音频或打印PDF，不能声称这些功能已可用。；解决：实现时用本页数据渲染并逐音视检/试听；PDF生成检查成功后才显示下载入口。
- AT-scales-pentatonic-PRACTICE / blocks.practice：练习是基于已核实音符的编辑提议，未通过专业教学效果或动作审核。；解决：钢琴教师核对适用水平和练习安排；不承诺学习效果。

#### /scales/a-major

- AM-A-MAJOR-RENDER / notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-A-MAJOR-RANGE / fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

#### /scales/c-minor

- AN-U099-natural_minor-FINGER / data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U099-harmonic_minor-FINGER / data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U099-melodic_minor_classical-FINGER / data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U099-RANGE / data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U099-QA / data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

#### /scales/d-minor

- AN-U100-natural_minor-FINGER / data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U100-harmonic_minor-FINGER / data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U100-melodic_minor_classical-FINGER / data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U100-RANGE / data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U100-QA / data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

#### /scales/e-major

- AM-E-MAJOR-RENDER / notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-E-MAJOR-RANGE / fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

#### /scales/b-minor

- AN-U102-natural_minor-FINGER / data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U102-harmonic_minor-FINGER / data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U102-melodic_minor_classical-FINGER / data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U102-RANGE / data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U102-QA / data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

#### /scales/f-minor

- AN-U103-natural_minor-FINGER / data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U103-harmonic_minor-FINGER / data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U103-melodic_minor_classical-FINGER / data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U103-RANGE / data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U103-QA / data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

#### /scales/harmonic-major

- AT-scales-harmonic-major-FINGERING / data.examples[*].fingering：缺少对应对象、手别、方向、八度范围的完整专业指法来源；不得由模式补写。；解决：逐个选择明确标注全部音符指法的正规教学资料，并经钢琴教师复核；已明确收录的例外见对象数据。
- AT-scales-harmonic-major-OUTPUT / rendered_staff_keyboard_audio_pdf：已提供音符与渲染数据；本轮未生成并视检实际谱表/键盘图、音频或打印PDF，不能声称这些功能已可用。；解决：实现时用本页数据渲染并逐音视检/试听；PDF生成检查成功后才显示下载入口。
- AT-scales-harmonic-major-PRACTICE / blocks.practice：练习是基于已核实音符的编辑提议，未通过专业教学效果或动作审核。；解决：钢琴教师核对适用水平和练习安排；不承诺学习效果。

#### /scales/a-sharp-minor

- AN-U105-natural_minor-FINGER / data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U105-harmonic_minor-FINGER / data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U105-melodic_minor_classical-FINGER / data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, descending.right_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U105-RANGE / data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U105-QA / data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

#### /scales/b-major

- AM-B-MAJOR-RENDER / notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-B-MAJOR-RANGE / fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

#### /scales/b-flat-major

- AM-B-FLAT-MAJOR-RENDER / notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-B-FLAT-MAJOR-RANGE / fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

#### /scales/g-minor

- AN-U108-natural_minor-FINGER / data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U108-harmonic_minor-FINGER / data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U108-melodic_minor_classical-FINGER / data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U108-RANGE / data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U108-QA / data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

#### /scales/chromatic

- AT-scales-chromatic-FINGERING / data.examples[*].fingering：缺少对应对象、手别、方向、八度范围的完整专业指法来源；不得由模式补写。；解决：逐个选择明确标注全部音符指法的正规教学资料，并经钢琴教师复核；已明确收录的例外见对象数据。
- AT-scales-chromatic-OUTPUT / rendered_staff_keyboard_audio_pdf：已提供音符与渲染数据；本轮未生成并视检实际谱表/键盘图、音频或打印PDF，不能声称这些功能已可用。；解决：实现时用本页数据渲染并逐音视检/试听；PDF生成检查成功后才显示下载入口。
- AT-scales-chromatic-PRACTICE / blocks.practice：练习是基于已核实音符的编辑提议，未通过专业教学效果或动作审核。；解决：钢琴教师核对适用水平和练习安排；不承诺学习效果。

#### /scales/e-flat-major

- AM-E-FLAT-MAJOR-RENDER / notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-E-FLAT-MAJOR-RANGE / fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.

#### /scales/f-sharp-minor

- AN-U111-natural_minor-FINGER / data.forms.natural_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U111-harmonic_minor-FINGER / data.forms.harmonic_minor.fingering：未取得并逐音核对以下手别/方向的明确指法：descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U111-melodic_minor_classical-FINGER / data.forms.melodic_minor_classical.fingering：未取得并逐音核对以下手别/方向的明确指法：ascending.right_hand, ascending.left_hand, descending.right_hand, descending.left_hand。不从上行倒推，不从另一形式套用。；解决：取得本调本形式明确标注一八度、手别和方向的教学谱/图，或钢琴教师逐音审核；AN-HA-GUIDE 仅为需用户领取的资料线索。
- AN-U111-RANGE / data.approved_playback_octaves：现有主要指法证据为一八度；多八度、连续转向的连接指法和手型尚未逐项审定。；解决：按具体调性、形式、左右手分别审核更大范围及上下行连接；不得重复拼接一八度终止指法。
- AN-U111-QA / data.print_and_audio：本包交付音符、谱表事件和打印字段；实际键盘绘图、谱表排版、声音文件/合成输出与 PDF 尚未制作验收。；解决：Codex 依据同一 notes/pitch_mapping 数据实现后逐音对齐视觉、播放和打印，保留 E#/B#/双升号并检查谱号、八度和临时记号。

#### /scales/c-flat-major

- AM-C-FLAT-MAJOR-RENDER / notation_audio_print：[已核实] This deliverable contains content and the common rendering data, not rendered keyboard/staff images, tested audio or an exported PDF. Source assets are external references only.；解决：Codex must render from these same pitches/fingers, then compare staff, keyboard, playback direction and print against this page’s source row before release.
- AM-C-FLAT-MAJOR-RANGE / fingering.additional_octave_fingerings：[已核实] Only one-octave fingering was transcribed for this handoff. No verified multi-octave sequence is included.；解决：Keep octave selector at 1; if a larger range is to be enabled, obtain and review the exact hand/direction/range-specific source chart.
- AM-CB-SECOND-FINGERING / fingering.verification：[已核实] The C-flat-specific source explicitly supplies both hands and directions for one octave. An independently readable second C-flat fingering source was not obtained. This is not a guessed B-major substitution.；解决：Cross-check the transcribed C-flat one-octave numbers with a second C-flat-specific teaching chart or qualified pianist before marking professional review complete.

#### /arpeggios

- AT-arpeggios-FINGERING / data.examples[*].fingering：缺少对应对象、手别、方向、八度范围的完整专业指法来源；不得由模式补写。；解决：逐个选择明确标注全部音符指法的正规教学资料，并经钢琴教师复核；已明确收录的例外见对象数据。
- AT-arpeggios-OUTPUT / rendered_staff_keyboard_audio_pdf：已提供音符与渲染数据；本轮未生成并视检实际谱表/键盘图、音频或打印PDF，不能声称这些功能已可用。；解决：实现时用本页数据渲染并逐音视检/试听；PDF生成检查成功后才显示下载入口。
- AT-arpeggios-PRACTICE / blocks.practice：练习是基于已核实音符的编辑提议，未通过专业教学效果或动作审核。；解决：钢琴教师核对适用水平和练习安排；不承诺学习效果。
- AT-arpeggios-FINGER-CROSSCHECK / data.examples[*].fingering：Faber 两个单八度完整序列均已逐音看图核验，但没有第二处相同范围、逐音明确的指法来源；Denton 为双八度且只印关键数字。Baylor 正文403。；解决：补同手别同八度的可靠来源或教师确认。G左手单八度3指选择不得套用为双八度常规4指。

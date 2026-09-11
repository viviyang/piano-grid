# Piano Reference — Unresolved Issues Master

[已核实] 新页面共有 209 条逐页问题记录。重复出现的指法、授权、资料缺项仍按页面保留；不把记录数当作独立音乐错误数。另保留 6 条旧 chords gaps。

## 需要优先区分的事项

- 数据待确认：未核验的手别/音区/方向指法、部分曲谱版本和音乐属性保持 null。
- 素材与版本：官方或免费可见不代表可以在本站转载；Songs/Sheet Music 逐条保留权利状态。Song of Healing 的目标曲谱版本尚未核定。
- 专业签核：来源核查与程序自检不能替代基线要求的教师/专业人员审阅。
- 实现验收：此任务未生成网站代码；音图同步、播放、打印交互、选择器和上线链接按原条件验收。
- 暂停与无 URL 任务：保留原状态，不新增 URL 或改变承接关系。

## 逐页待确认

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

### Batch B

#### /keyboard-notes

- BK-RENDER-QA / keyboard_visual_and_audio：[已核实] Ordered key and lookup data have been prepared; no website interaction or playback has been implemented or tested.；解决：Render each supplied layout and verify every click resolves to the same note as text lookup; test chosen range, preserved spellings and active-play behavior.

#### /keyboard-notes/labeled

- BK-RENDER-QA / keyboard_visual_and_audio：[已核实] Ordered key and lookup data have been prepared; no website interaction or playback has been implemented or tested.；解决：Render each supplied layout and verify every click resolves to the same note as text lookup; test chosen range, preserved spellings and active-play behavior.
- BK-PRINT-ASSET / print_assets：[已核实] No 88/61-key print graphic or PDF file was generated in this content/data task. Printable keyword delivery is therefore partial.；解决：Generate original readable reference diagrams from the supplied key arrays and verify screen/print selection parity before enabling download.
- BK-STICKER-FIT / print_payload.sticker_dimensions：[已核实] No physical dimensions or material/adhesive compatibility for the user’s keyboard model have been established.；解决：Keep the output as a reference diagram. Do not claim a full-size sticker template or model-specific application instructions.
- BK-OTHER-NUMBERS / other_number_schemes：[已核实] Baseline does not define what an additional “with numbers” system means. Only optional octave suffixes are specified here.；解决：Retain the demand as undecided; do not substitute finger numbers, scale degrees or numbered notation.

#### /keyboard-notes/chart

- BN-U069-SOLFEGE / data.solfege：原规划明确 do re mi 规则未定，首版不开放。；解决：后续明确固定唱名或首调唱名、minor规则及显示目的，再单独准备与审核映射；当前不补写、不开放。
- BN-U069-RENDER / data.print_and_interaction：音名/键位/谱位数据及默认联动样例已交付；尚未生成并视觉验收实际谱表、键盘图、交互或PDF。；解决：Codex用本包坐标与音高数据渲染；逐点检查C4两谱号同键、黑键两种拼写不同谱位、范围端点，打印不能挤成不可读整行。
- BN-U069-RANGE / data.range_modes.61_keys：C2-C7布局已核实，但原规划仍是后续同页补齐；不是根据61键数自动推定所有型号与设置相同。；解决：保留起止音说明并在实现时验收范围模式；不改变原first_release_scope，不默认开放任何具体设备自动识别。

#### /keyboard-notes/frequencies

- BR-FREQ-RENDER / rendered_chart_and_keyboard：88行表格与键定位数据已提供；最终桌面/移动端显示与高亮尚未实现验收。；解决：按key_number和MIDI两个独立字段渲染，检查A0/C4/A4/C8及黑键定位；不添加调音器。
- BR-FREQ-PRINT / data.print.pdf_asset：尚未生成实际打印PDF；不得显示已有下载文件。；解决：需要打印入口时生成并检查全部88行和调律说明，无截行/缺页。

#### /keyboard-notes/finger-numbers

- BR-FINGERS-DIAGRAM / data.diagram_contract.svg_or_image_asset：左右手编号映射和图示方向已明确；尚未交付最终原创手图。；解决：按player-view绘制并检查左右手、拇指朝内、1–5对应、文字不镜像；专业复核后使用。
- BR-FINGERS-SCOPE / fingering_chart_intent：原词可能包含具体乐句/音阶指法需求；本基线职责为手指编号与具体参考入口。；解决：保留本页职责；仅链接已有具体对象，不把编号图视为通用曲目指法方案。
- BR-FINGERS-PRINT / data.print.pdf_asset：尚未生成实际打印PDF。；解决：最终手图完成后生成打印版并视检；资源不存在时不显示下载承诺。

#### /keyboard-notes/blank

- B-BLANK-UI / key_count_selector：13/25键预览SVG与两种纸张PDF已准备；网页选择器未实现。；解决：实现选择器并确认选项调用对应SVG；提供实际PDF链接。

#### /keyboard-notes/key-signatures

- BN-U074-RENDER / data.print_and_render：15组文字/数据调号表已完成；实际高低谱号中的调号刻印图与打印件尚未生成验收。；解决：Codex依据signed_fifths用规范制谱引擎绘图并视觉检查全部0–7升降号；生成真实打印输出后才显示下载按钮。
- BN-U074-LINKS / data.chart_rows.*_scale_url：部分调性没有独立基线URL；已保留null并使用现有/scales中心兜底。；解决：只链接已上线的现有基线页面；不得为填满表格增建URL。

### Batch C

#### /songs

- C-center-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/easy

- C-EASY-FIFTY-DETAIL / data.additional_catalog_options[].creator/key/technical_demands：50条有精确合集与出版社Easy Piano标签，但未逐首读取全部谱页/个别同名作品署名。不能作为50首已逐曲专业评测的榜单。；解决：对拟重点推荐的曲目读取出版方预览/目录版权页确认署名及技术难点；未核数据保持null。
- C-EASY-TWINKLE-PRICE / ce-twinkle-elementary.access：正文写Free，但商品面板为单次付费/Premium。；解决：页面不加免费标签；用户获取时以出版方所选许可/结账条件为准。
- C-EASY-RIGHTS / resources.rights：已找到原作者/出版社版本；未取得本站复制乐谱/音频许可。；解决：本阶段仅提供明确外部资源入口；若需本地乐谱，逐版本取得再分发依据后再制作。
- C-EASY-SOURCE-ERROR / ce-birthday-lead.chord_notes：Hoffman lead-sheet说明将C7写为C-E-G，缺少七音；本包不沿用该错误。；解决：该字段不取该页FAQ；和弦组成使用独立已核实乐理数据。

#### /songs/christmas

- C-christmas-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/challenging

- C-challenging-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。
- C-challenging-tech / P004/P025 speed and technical examples：出版方等级已确认，逐曲具体速度/技术段落未核，当前为选曲基础记录，未完全满足该源任务。；解决：按合法版本逐段核验速度标记、实际难点及示范；不补写最难排名。

#### /songs/pop

- C-pop-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/classical

- C-classical-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/easy-chords

- C-easy-chords-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/anime

- C-anime-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/minecraft

- C-minecraft-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/rock

- C-rock-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/taylor-swift

- C-taylor-swift-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/disney

- C-disney-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/wedding

- C-wedding-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/worship

- C-worship-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/rap

- C-rap-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/piano-and-guitar

- C-piano-and-guitar-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/beatles

- C-beatles-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/coldplay

- C-coldplay-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/country

- C-country-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/jazz

- C-jazz-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/halloween

- C-halloween-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

#### /songs/undertale

- C-undertale-review / per-arrangement technical profile and reuse：未阅读全文的具体编配，不填调性、速度或指法。资源为外部参考，未取得本网站转载授权。；解决：若需这些字段或自托管谱面，检查合法取得的准确版本及其授权；目录现可用来源信息。

### Batch D

#### /sheet-music

- D-sheet-music-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/easy

- D-easy-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/beginner

- D-beginner-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/christmas

- D-christmas-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/letter-notes

- D-letter-notes-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/annotated

- D-annotated-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/lead-sheets

- D-lead-sheets-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/pop

- D-pop-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/disney

- D-disney-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/classical

- D-classical-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/jazz

- D-jazz-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/jingle-bells

- D-jingle-bells-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/amazing-grace

- D-amazing-grace-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/fur-elise

- D-fur-elise-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/happy-birthday

- D-happy-birthday-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/hot-cross-buns

- D-hot-cross-buns-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/jesus-loves-me

- D-jesus-loves-me-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/mary-had-a-little-lamb

- D-mary-had-a-little-lamb-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/abc-song

- D-abc-song-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/ode-to-joy

- D-ode-to-joy-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/silent-night

- D-silent-night-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/twinkle-twinkle-little-star

- D-twinkle-twinkle-little-star-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/let-it-go

- D-let-it-go-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。
- D-let-it-go-free / free PDF / letter-note intent：已核正规付费版本；未确认免费PDF和纯字母谱版本，不能声称已满足这些限定。；解决：取得明确可免费使用的准确版本及目标记谱形式，保留原暂停状态。

#### /sheet-music/super-mario-theme

- D-super-mario-theme-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。
- D-super-mario-theme-free / free PDF / letter-note intent：已核正规付费版本；未确认免费PDF和纯字母谱版本，不能声称已满足这些限定。；解决：取得明确可免费使用的准确版本及目标记谱形式，保留原暂停状态。

#### /sheet-music/thats-amore

- D-thats-amore-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/black-parade

- D-black-parade-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/clocks

- D-clocks-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/from-the-start

- D-from-the-start-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。
- D-from-direct / direct score URL：出版社目录列出了准确P/V/G产品；跳转目标当前未能访问。；解决：上线前完成HL 1000742930所连Sheet Music Direct产品访问核验。

#### /sheet-music/song-of-storms

- D-song-of-storms-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/pink-panther

- D-pink-panther-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/still-dre

- D-still-dre-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/carol-of-the-bells

- D-carol-of-the-bells-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/edelweiss

- D-edelweiss-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/in-my-life

- D-in-my-life-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/all-of-me-john-legend

- D-all-of-me-john-legend-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/runaway-kanye-west

- D-runaway-kanye-west-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/piano-man

- D-piano-man-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/someone-like-you-adele

- D-someone-like-you-adele-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/song-of-healing

- D-song-of-healing-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。
- D-healing-score / usable specific sheet edition：只确认匹配作品的演示/教程，未确认可获取的具体谱版本；Spirit Tracks同名曲不可替代。；解决：核实Majora’s Mask Song of Healing的正规具体乐谱SKU和获取方式。

#### /sheet-music/a-whole-new-world

- D-a-whole-new-world-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

#### /sheet-music/easy-on-me

- D-easy-on-me-reuse / self-hosted scores/audio and unfilled edition fields：未取得本站转载授权；只有具体已核字段可用于页面。null调性/速度/完整作者或指法不可自动补齐。；解决：若需自托管或新增技术字段，取得明确权利并核对指定版本；当前交付为真实外部版本资料。

### Batch E

#### /guide

- E-REVIEW-guide / professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

#### /guide/read-sheet-music

- E-REVIEW-read-sheet-music / professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

#### /guide/sight-reading

- E-REVIEW-sight-reading / professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

#### /guide/piano-chords

- E-REVIEW-piano-chords / professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

#### /guide/piano-books

- E-BOOK-FORMAT / Joining the Dots delivery format：ABRSM details say Book and item requires shipping, but a generic digital banner also appears.；解决：Confirm format in checkout; do not promise an instant PDF download.

#### /guide/learn-a-piano-song

- E-REVIEW-learn-a-piano-song / professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

#### /guide/piano-scales

- E-REVIEW-piano-scales / professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

#### /guide/compose-a-piano-song

- E-REVIEW-compose-a-piano-song / professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

#### /guide/hanon-exercises

- E-REVIEW-hanon-exercises / professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

#### /guide/note-values-and-rhythm

- E-REVIEW-note-values-and-rhythm / professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

#### /guide/piano-exercises

- E-REVIEW-piano-exercises / professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

#### /guide/piano-hand-position

- E-REVIEW-piano-hand-position / professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

#### /guide/piano-practice

- E-REVIEW-piano-practice / professional_review：Professional teaching/notation review required by the baseline has not been performed by a named reviewer.；解决：Have a qualified piano educator review the examples, fingering scope and wording before release.

### Batch F

#### /

- F-HOME-RELEASE / navigation and site claims：Homepage copy is prepared; destination release status must be supplied by implementation.；解决：Use actual release manifest so paused and unpublished pages are not offered as working routes.

#### /tools

- F-TOOLS-LINKS / release-dependent links：Prepared pages and files are not proof that website routes are live.；解决：Enable only published destinations and verified downloadable files.

#### /chords/a-major

- F-FINGER-a-major / fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-a-major / runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

#### /chords/c-major

- F-FINGER-c-major / fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-c-major / runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

#### /tools/piano-cheat-sheet

- F-CHEAT-REVIEW / professional review：The compact reference is generated from checked data; named music review remains a baseline gate.；解决：Review note spellings and the final print before publishing.

#### /chords/b-major

- F-FINGER-b-major / fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-b-major / runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

#### /chords/a-flat-major

- F-FINGER-a-flat-major / fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-a-flat-major / runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

#### /chords/e-major

- F-FINGER-e-major / fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-e-major / runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

#### /chords/c-minor

- F-FINGER-c-minor / fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-c-minor / runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

#### /chords/c-flat-major

- F-FINGER-c-flat-major / fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-c-flat-major / runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

#### /chords/g-major

- F-FINGER-g-major / fingering：No reviewed hand-specific fingering for every displayed inversion. Unknown cells remain null.；解决：Obtain explicit source or named professional review for each hand and voicing.
- F-RELEASE-g-major / runtime and professional review：Keyboard/playback/print interaction and named professional approval are not delivered by this content task.；解决：Implement the prepared note arrays; confirm visual, playback and print consistency.

#### /chords/by-key

- F-KEY-UI / selector and professional review：All seven key datasets exist; interactive rendering and specialist review remain.；解决：Verify every selector result and retain the explicit minor-form distinction.

#### /chords/finder

- F-FINDER-ENGINE / classification scope：Verified examples are prepared; a general recognition engine and exhaustive vocabulary are not implemented or validated.；解决：Implement only reviewed vocabulary, reproduce these examples and show unsupported/ambiguous states.

#### /chord-progressions

- F-PROGRESSION-REVIEW / voicing and interface：Original examples and printable data are prepared; performance review and key/effect selector integration remain.；解决：Check all nine realizations, labels and printed notes before release.

## 既有 chords gaps（原记录）

```json
[
  {
    "gap_id": "G-AUDIO",
    "applies_to": [
      "/chords",
      "/chords/a-minor"
    ],
    "kind": "implementation_acceptance",
    "fields": [
      "shared_data.voicings.*.playback",
      "pages.*.verification.functional_playback_test"
    ],
    "status": "not_implemented",
    "ready_for_design_blocker": false,
    "ready_for_publish_blocker": true,
    "owner": "开发与验收",
    "next_action": "以本包事件实现主动播放/逐音/停止；先用无第三方采样的合成参考音；逐个验证音高、顺序、停止与切换，实际试听并记录结果。",
    "user_action_required": false
  },
  {
    "gap_id": "G-PRINT-RUNTIME",
    "applies_to": [
      "/chords",
      "/chords/a-minor"
    ],
    "kind": "implementation_acceptance",
    "fields": [
      "pages.*.controls.print_current_voicing",
      "pages./chords.controls.print_filtered_collection"
    ],
    "status": "static_pdfs_and_svg_ready_dynamic_print_not_implemented",
    "ready_for_design_blocker": false,
    "ready_for_publish_blocker": true,
    "owner": "开发与验收",
    "next_action": "实现当前位置/过滤集合的打印，渲染后与print_data逐项核对；静态整组PDF不能代替动态打印验收。",
    "user_action_required": false
  },
  {
    "gap_id": "G-LINKS",
    "applies_to": [
      "/chords",
      "/chords/a-minor"
    ],
    "kind": "implementation_acceptance",
    "fields": [
      "pages.*.blocks.*.content.links.*.published",
      "assets.*.public_url",
      "pages.*.metadata.canonical_absolute_url"
    ],
    "status": "not_deployed",
    "ready_for_design_blocker": false,
    "ready_for_publish_blocker": true,
    "owner": "开发与验收",
    "next_action": "绑定真实文件地址和域名；只开放已发布目标，未制作的A major/音阶等链接不显示。",
    "user_action_required": false
  },
  {
    "gap_id": "G-FINGERING",
    "applies_to": [
      "/chords",
      "/chords/a-minor"
    ],
    "kind": "professional_review",
    "fields": [
      "shared_data.voicings.*.fingering.right_hand",
      "shared_data.voicings.*.fingering.left_hand"
    ],
    "status": "display_values_null_reference_candidates_recorded",
    "ready_for_design_blocker": false,
    "ready_for_publish_blocker": false,
    "owner": "钢琴教师（仅启用指法时）",
    "next_action": "Am候选逐个核对手别、具体音区、密集排列与静态按和弦情境；确认适用条件和署名后才写入公开字段。未复核时维持无指法版本，P148 finger-position PDF不记完成。",
    "user_action_required": false
  },
  {
    "gap_id": "G-CATALOG",
    "applies_to": [
      "/chords"
    ],
    "kind": "planned_followup",
    "fields": [
      "P148.all/full",
      "P154.complete_minor_collection",
      "P158.complete_major_collection"
    ],
    "status": "partial_collection",
    "ready_for_design_blocker": false,
    "ready_for_publish_blocker": false,
    "owner": "后续内容批次",
    "next_action": "维持9命名和弦范围说明；后续依原任务补齐已有中心任务的数据集合，不生成规划外URL。",
    "user_action_required": false
  },
  {
    "gap_id": "G-TYPES",
    "applies_to": [
      "/chords"
    ],
    "kind": "planned_followup",
    "fields": [
      "P168",
      "P170",
      "P171"
    ],
    "status": "deferred_not_started",
    "ready_for_design_blocker": false,
    "ready_for_publish_blocker": false,
    "owner": "后续内容批次",
    "next_action": "分别准备power、明确类别的7th、jazz语境数据和解释；本批不显示空类型按钮。",
    "user_action_required": false
  }
]
```

## 原暂停页面（19）

| URL | 优先级 | 原发布条件 |
| --- | --- | --- |
| /sheet-music/let-it-go | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/super-mario-theme | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/thats-amore | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/black-parade | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/clocks | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/from-the-start | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/song-of-storms | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/pink-panther | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/still-dre | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/carol-of-the-bells | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/edelweiss | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/in-my-life | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/all-of-me-john-legend | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/runaway-kanye-west | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/piano-man | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/someone-like-you-adele | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/song-of-healing | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/a-whole-new-world | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |
| /sheet-music/easy-on-me | 暂不做 | 作品身份、具体版本、素材与用途权限尚未核验；没有可交付资源不发布；导购不可冒充免费PDF |

## 未分配 URL 的任务组（17，原样保留）

```json
[
  {
    "source_group_id": "P067",
    "keyword": "piano tab",
    "keywords": [
      "piano tab",
      "keyboard music tabs",
      "piano tablature"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "Tab/数字/字母的实际记谱体系与交付对象未明确；不能直接等同钢琴五线谱、电脑键盘谱或手指编号",
    "next_step": "确认原查询对应的记谱形式后，再决定并入letter-notes/annotated或独立任务"
  },
  {
    "source_group_id": "P103",
    "keyword": "piano sheet numbers letters",
    "keywords": [
      "piano sheet numbers letters",
      "piano song notes in numbers"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "Tab/数字/字母的实际记谱体系与交付对象未明确；不能直接等同钢琴五线谱、电脑键盘谱或手指编号",
    "next_step": "确认原查询对应的记谱形式后，再决定并入letter-notes/annotated或独立任务"
  },
  {
    "source_group_id": "P069",
    "keyword": "hallelujah song piano chords",
    "keywords": [
      "hallelujah song piano chords"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页",
    "next_step": "核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题"
  },
  {
    "source_group_id": "P080",
    "keyword": "for good piano sheet music",
    "keywords": [
      "for good piano sheet music"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页",
    "next_step": "核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题"
  },
  {
    "source_group_id": "P082",
    "keyword": "milonga with lover song piano sheet music",
    "keywords": [
      "milonga with lover song piano sheet music"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页",
    "next_step": "核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题"
  },
  {
    "source_group_id": "P085",
    "keyword": "up theme song piano sheet music",
    "keywords": [
      "up theme song piano sheet music"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页",
    "next_step": "核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题"
  },
  {
    "source_group_id": "P086",
    "keyword": "charlie brown theme song piano sheet music",
    "keywords": [
      "charlie brown theme song piano sheet music"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页",
    "next_step": "核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题"
  },
  {
    "source_group_id": "P089",
    "keyword": "golden piano sheet music easy",
    "keywords": [
      "golden piano sheet music easy",
      "golden easy piano sheet music"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页",
    "next_step": "核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题"
  },
  {
    "source_group_id": "P090",
    "keyword": "hallelujah song piano sheet music",
    "keywords": [
      "hallelujah song piano sheet music"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "现有资料不足以唯一确认具体作品、主题或版本；同名词不应被直接固化成一张曲谱页",
    "next_step": "核对作品/作者/编曲和可获取版本；保留所有原词，不扩写歌手或标题"
  },
  {
    "source_group_id": "P135",
    "keyword": "number keys piano",
    "keywords": [
      "number keys piano",
      "piano key numbering",
      "piano key numbers",
      "piano keyboard numbered",
      "piano numbers",
      "numbered piano keys",
      "numbered piano notes",
      "piano keyboard numbers",
      "number notes piano",
      "number piano notes",
      "piano keys number",
      "piano keys labeled with numbers"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "number keys piano尚不能唯一确定是键号、音级还是手指编号",
    "next_step": "确认数字所指对象；在正确标注/指法页承接，不先制造独立数字页面"
  },
  {
    "source_group_id": "P211",
    "keyword": "grade 1 piano scales",
    "keywords": [
      "grade 1 piano scales"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "grade 1/2未提供考试体系、版本和适用年份，无法确定准确音阶清单",
    "next_step": "确认体系与版本后再定义页面；暂不擅自生成ABRSM或Trinity URL"
  },
  {
    "source_group_id": "P212",
    "keyword": "grade 2 piano scales",
    "keywords": [
      "grade 2 piano scales"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "grade 1/2未提供考试体系、版本和适用年份，无法确定准确音阶清单",
    "next_step": "确认体系与版本后再定义页面；暂不擅自生成ABRSM或Trinity URL"
  },
  {
    "source_group_id": "P243",
    "keyword": "piano substitute chords on bb key",
    "keywords": [
      "piano substitute chords on bb key"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "降B调替代和弦的问题范围和专业材料尚未明确",
    "next_step": "先确认查询任务与可用案例；可补入走向页，不预先承诺独立教程"
  },
  {
    "source_group_id": "P246",
    "keyword": "how to play golden hour on piano",
    "keywords": [
      "how to play golden hour on piano"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "Golden Hour的作品版本与可用教学素材未核实",
    "next_step": "核对作品与可使用示例，再决定歌曲资源页或教程"
  },
  {
    "source_group_id": "P250",
    "keyword": "how to use scales in any song",
    "keywords": [
      "how to use scales in any song"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "仅有视频标题提取，尚无独立Google查询与量化支持",
    "next_step": "保留需求线索；核实搜索表达和任务后再决定独立页或音阶练习章节"
  },
  {
    "source_group_id": "P263",
    "keyword": "play along piano",
    "keywords": [
      "play along piano"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "play along piano未明确是伴奏、跟弹视频、谱面同步还是软件功能",
    "next_step": "确认用户想获得的输出，不默认设计新App或页面"
  },
  {
    "source_group_id": "P265",
    "keyword": "what are some difficult music notes to learn",
    "keywords": [
      "what are some difficult music notes to learn"
    ],
    "priority": "暂不做",
    "url": null,
    "reason": "哪些音符难学的问题未限定谱号、音区或读谱障碍",
    "next_step": "先留在问题库；明确后合入read-sheet-music或其他准确页面"
  }
]
```

## 历史未回挂线索（2，原样保留）

```json
[
  {
    "keyword": "am7 piano chord",
    "suggested_category": "chords",
    "url": null,
    "source": "本对话用户2026-09-08第一轮8词手查截图；旧规划说明第7节",
    "status": "历史手查证据保留，当前265任务基表未纳入",
    "note": "不删除该线索，不算进127URL/1437词；需要并回时先核对原记录与映射，不自动复制任意Volume。Am7不是A minor三和弦的同义词。"
  },
  {
    "keyword": "bohemian rhapsody piano sheet music",
    "suggested_category": "sheet_music",
    "url": null,
    "source": "本对话用户2026-09-08第一轮8词手查截图；旧规划说明第7节",
    "status": "历史手查证据保留，当前265任务基表未纳入",
    "note": "单列历史待回挂项；不默认能提供谱面，也不把它自动加进当前页面数或曲谱总量。"
  }
]
```

## 总体状态

没有新增 URL，没有更改任务职责，没有把待确认数据补成确定值。后续只解决上述明确问题并完成原发布条件；无需重新规划网站。

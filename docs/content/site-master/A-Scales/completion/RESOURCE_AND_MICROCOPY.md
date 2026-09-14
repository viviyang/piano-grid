# 资源、正文补充与状态文案

以下资源规格/文案为 **[推断｜本次新增交付建议]**。音乐真值使用本包原始输入和最终审核模型，实际格式服从仓库。**本文件不是声称这些新PDF已生成。** Codex以最终模型生成、渲染检查后才能开放按钮。原两PDF原路径保留，不回灌较早坏版。

## 1. 三项新增资源，不是三个新的SEO网页

资源资产优先服从仓库已经使用的目录和命名。本节给出的文件名是唯一建议名，若现有相同任务资源已存在则复用其正确路径并记录映射，不增加近似副本。`/downloads/scales/`只表示资源资产的候选目录，**不是授权新建HTML路由**。发布授权仍单独获得。

| 资源ID | 英文公开名称 | 精确覆盖 | 建议Letter资产名 / A4版本 |
|---|---|---|---|
| R-MAJ12 | 12 Major Scales — Note Reference | C, D♭, D, E♭, E, F, F♯, G, A♭, A, B♭, B；每项一八度上/下行音名、键盘与已核实谱图。由中心15种拼写挑选12个不同主音pitch class，不删除另3种中心拼写。 | `pianogrid-12-major-scales-note-reference.pdf` / 同名`-a4.pdf` |
| R-ATLAS60 | Major & Minor Scale Note Atlas | 中心15个major命名记录与15主音×natural/harmonic/classical melodic=45个minor记录，合计60个命名参考；保持全部原拼写。每个minor明确上下行。 | `pianogrid-major-minor-note-atlas.pdf` / 同名`-a4.pdf` |
| R-TWOHAND-C | C Major Two-Hand Starter Reference | C major一八度，RH C4–C5、LH C3–C4；同步对齐的两行/大谱表、分别的手指标号、上下行，以及“先分手看清参考”的说明。不是两八度，不是反向进行，不是自动双手演奏评分。 | `pianogrid-c-major-two-hand-starter.pdf` / 同名`-a4.pdf` |

12大调速查适合快速拿一小册；60记录图册是更完整的离线参考，二者不用各建宣传落地页。整本页数、文件体积和生成日期只能由实物计算，不能在按钮先填“8 pages”之类猜值。

### R-MAJ12完整内容规格

封面/标题说明：

> Twelve tonic pitch classes, one written major-scale reference for each. Each entry shows one octave in both directions. This is a note reference, not an all-keys fingering method.

按所列12主音排列，每项包含：正式名称、调号说明、whole/half pattern、上行与实际下行逐音标签（含音区）、准确键盘、可读谱表、可选已核实的指法来源。没有指法就不标成fingering book，也不复制另一调数字。

D♭等拼写不能转换成C♯以图方便；末端主音不可省略。默认展示RH参考音区，但标题需写 `Reference register`，无指号时不能冒充右手唯一技法。C♭等另3个中心拼写从R-ATLAS60提供，不把它们说成不存在。

### R-ATLAS60完整内容规格

封面说明：

> Sixty named major and minor references from PianoGrid's current chart: 15 major-key spellings and natural, harmonic and classical melodic minor for 15 tonics. Enharmonic names can share piano keys. This is not a list of every scale or every fingering.

包含目录与覆盖清单。按原目录major、natural、harmonic、classical melodic分章；每条的真实上/下行都印，不能仅在封面说“minor differs”而内文只印一套序列。对classical melodic显式标 `Ascending — raised sixth and seventh` / `Descending — natural-minor collection`，音名以当前调为准。

指法可在有精准依据时作为附注，但不是这项资料的必要承诺；资料页必须明确“Fingering coverage varies by selection”。不会因为无指法就删音名、键盘、谱图。此图册不包含家族20例或琶音；这些页的当前参考可独立打印，不暗称已进60册。

### R-TWOHAND-C完整内容规格

数据引用当前C-major模型的两个手别与各方向。不得把C3音钉在同一高度或采用无谱号的假五线谱。

| 行 | 上行音高 | 上行手指 | 下行音高 | 下行手指 |
|---|---|---|---|---|
| RH | C4 D4 E4 F4 G4 A4 B4 C5 | 1 2 3 1 2 3 4 5 | C5 B4 A4 G4 F4 E4 D4 C4 | 5 4 3 2 1 3 2 1 |
| LH | C3 D3 E3 F3 G3 A3 B3 C4 | 5 4 3 2 1 3 2 1 | C4 B3 A3 G3 F3 E3 D3 C3 | 1 2 3 1 2 3 4 5 |

[已核实｜已有C-major输入] 此表是已有精确记录的整理，不新增技法结论。排版上下音事件对齐，谱号清楚，两手各自有图/名称。说明：

> Read the two hand references separately first. The staves are aligned to show corresponding notes one octave apart. Use this as a labeled reference, not an assessment of two-hand coordination. The website's guided-playback mode remains single-hand.

资料明确“一项C大调入门参考”，不能用“all beginner two-hand scales”作为下载按钮标题。P180可记录已交付这个明确范围；若原任务后续要求更多曲目/调性，不把单份C参考夸大。

## 2. 所有资料通用验收

生成器读取最终合法输入，而不是从截图识谱、从网页CSS绝对坐标猜音，或从这张规格表重新硬编码一套平行真值。为每份输出记录精确音乐对象列表、模型版本、输入子集SHA256、生成器SHA256、纸张、页数、文件SHA256和来源依赖。

需测试Letter与A4两种纸张。每项至少渲染并目检：第一页、每种模板、首尾音区、双升/降号、classical melodic下降、低音谱号、长来源/标题及分页。自动检查对象覆盖、音名/MIDI/谱位、字符缺失、截断与空白页；程序通过不等于实体打印已查。

不得共享机器字体文件。使用项目许可允许的字体/嵌入方式；来源网址与可转载权分别核对。原音乐来源PDF不作为PianoGrid自有下载包再版。

PDF无法提供可靠的逻辑阅读顺序/标签时，在资源旁保留可访问HTML等价内容；在交接中记 `PDF_TAGGING_NOT_VERIFIED`，不要写“PDF完全无障碍”。

## 3. 中心还需明确兑现的原章节

以下是对已有内容的补充稿，不要求替换正确原文。

### Jazz scales：放在 /scales#jazz

> Jazz scales are not one single scale type. Compare specific choices and the musical context in which they are used. The modes, pentatonic and blues references below provide limited starting examples; they do not decide the only scale for a chord or song. The classical melodic-minor exercise shown in our minor chart changes its descending collection. A jazz melodic-minor convention commonly keeps the ascending collection in both directions; it is explained here, not silently substituted into the classical exercise.

[已核实｜已有理论资料及W01/W04对应范围] classical/jazz约定区分；具体应用限制为[推断｜产品边界]。给实际C Dorian、C Mixolydian、C minor pentatonic、C minor blues四例音名及其已完成家族链接，由原家族records读出，不只写四个标签。不新增“Jazz”万能音阶选项。

### Scale degrees：/scales#scale-degrees

> A scale degree describes a note's place relative to the tonic. In C major: C is tonic, D supertonic, E mediant, F subdominant, G dominant, A submediant and B leading tone. In A natural minor, G is a subtonic: a whole step below A. A harmonic minor uses G♯, a leading tone a half step below A. The function and interval matter; “degree seven” is not always the same label.

[已核实｜W01及原center音级数据] 将固定7级名称按当前形式显示，不能只在正文纠正而动态表仍全部叫leading tone。

### A small application：已有关系模块中，不新建教程URL

> Compare the stepwise C-major scale with C–E–G–E–C, an original chord-tone exercise. For A minor, compare the E–G–B triad available in the natural-minor collection with E–G♯–B in the harmonic-minor collection. This comparison identifies changed notes; it is not a rule that every note will suit every harmony.

对应实际音名、可主动播放的短例和语义正确和弦/琶音链接。只在当前模型支持该短例序列且检查一致后启用播放，否则保留静态例，不给假按钮。技法指法未知不填。

## 4. 交互微文案及判定

| 场景 | 英文文案 | 触发/注意 |
|---|---|---|
| 未提供指法 | Notes only — fingering is not available for this selection. | 同时清空旧指号；不能把未知当错误 |
| 仅单源转录 | Fingering documented in the linked source for this hand, direction and one-octave range. | 不写teacher-approved |
| 实际音区适配 | Displayed an octave higher than the source reference. | 只在真实如此时显示具体移位 |
| 换状态清题 | Your selection changed. This question has been reset. | 保留控件焦点，只简短播报 |
| 选音漏/多 | Missing: {notes}. Extra: {notes}. | 空项不渲染；顺序不参与集合判题 |
| 等音不同拼写 | This is the same piano key, but this scale is spelled {expected}. | 不说音高弹错；拼写分项反馈 |
| 音序错误 | Check note {position}: expected {expected}, received {actual}. | 位置从1计；独立报长度错误 |
| 少事件 | Your sequence has {actualCount} notes; this reference needs {expectedCount}, including the ending tonic. | 不能对五声硬写8 |
| 揭示答案 | Answer shown — this attempt is not counted as independently correct. | revealed状态不是correct |
| 引导结束 | Guided playback finished. Did you practice along? | 等待自报，不自动评演奏 |
| 自报按钮 | I practiced this | 明确self_report，不产生accuracy |
| 音频失败 | Playback could not start. Select Play to try again; the note reference is still available. | 没成功启动就不显示playing |
| 打印前停止 | Playback stopped for printing. Select Play to start again. | afterprint不得复活旧任务 |
| finder空输入 | Select at least one note to find candidates. | 不显示全部catalog为成功 |
| 只选一个音 | One note leaves many possibilities. Add more notes to narrow the list. | 不说已确定调性 |
| finder无匹配 | No match in the current reference collection. Try Contains these notes, or change your selection. | 保留原输入；不声称不存在这种音阶 |
| finder含括匹配 | Contains your notes; also uses {remainingNotes}. | 不叫percent confidence |
| finderexact | Exact note-set match — more than one name may share these keys. | 不去掉等音/relative多解 |
| 旋律下降匹配 | Classical descending collection | 音集证据不是演奏方向识别 |
| 已复制 | Reference copied. | 只有Clipboard成功后 |
| 复制失败 | Copy was not available. Select and copy the reference below. | 给可选文本，不假成功 |
| 反馈入口 | Report a problem with this reference | 带对象/形式/方向/范围；仅复用真实反馈渠道 |

练习、反查、资料不得塞满首屏；不因微文案长而缩字号。完整原FAQ/原例保留，这些只补实际新增状态。

# B05｜英文内容接入说明

`data/content.en.json` 是本批新写英文文案的单一内容源。本文件解释摆放，避免再次自由改写。

## 页面与标题
- /songs：`songs.h1`、intro、beginner teaser、原catalog。
- /songs/easy：`easy.h1`、intro、selectionHeading、cards、plan、learnSections。
- 三首Sheet：`sheet`公共字段 + `editionEvidence`确切来源信息；主体说明不要拼接虚构音符。

## 卡片顺序
Twinkle（优先plan）→Hot Cross Buns（Lesson 1材料）→Ode to Joy（其他旋律/付费条件）。这是产品入口顺序，不宣称难度或SEO排名顺序。
Twinkle主按钮`See the 10-minute plan`。后两张不使用这个按钮，因为本轮没有它们的五步计划。

## Plan五步摘要（全文在JSON）
| 步 | 时段是建议而非倒计时 | 标题 | 可验证完成动作 |
|---|---|---|---|
| edition | 0–2 min | Get the right edition | 用户自选材料已就绪 |
| setup | 2–4 min | Find the starting position | 用户自行找到当前版起始位置 |
| phrase | 4–6 min | Choose one short phrase | 用户尝试一小段 |
| repeat | 6–8 min | Repeat one small section | 用户回看不确定处 |
| reflect | 8–10 min | Choose what to revisit | notes/rhythm/hands/undecided |

用户可跳步，也可不勾任何项就读完。把“读到最后”与“用户自报完成”分开记录。

## 三首Sheet的补充说明（新写建议）
### Twinkle
`Use the Early Elementary edition from Hoffman Academy. Its publisher page links to the matching tutorial and describes a hand-position graphic. Open those materials first, then use the short plan to organize a focused session.`
下方：`Start this edition’s 10-minute plan`。
### Hot Cross Buns
`This link is for the Lesson 1 materials with the parent guide. Begin with the instructions and matching tracks supplied in that package. A different Hot Cross Buns arrangement may use a different starting setup.`
下方：`Compare beginner editions`。
### Ode to Joy
`Check the publisher’s Early Elementary edition and access conditions before starting. Use that edition’s own instructions and available preview to decide what to practice first.`
下方：`Compare beginner editions`。

## 禁用文案
- “Learn the whole song in 10 minutes”、 “You mastered this song”。
- “Play here”“Free PDF download”用于仅外部资源。
- 不写固定正确音序、小节、手别、节拍和指法，除非当前exact edition evidence支持。
- 不把publisher Early Elementary当作PianoGrid实测难度，也不把C4–C5在线认音练习说成这首曲全部用音。
- 不写AI讲解、verified mapping、preserved sections等内部流程语。

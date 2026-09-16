# 三页固定英文内容与版式

下面为新写教学说明/设计文案，不是第三方教材摘录。图形准确性来自现有layout投影；本包PDF是排版参考。

## 每页共同规则
顶部：PianoGrid wordmark（生产用项目正式logo）。侧边小号：PIANO KEY NAMES / C4–C5。
页脚：`pianogrid.com/keyboard-notes/labeled#teaching-pack`（可点击）+`v1 · n / 3`。
正文11–12pt，主标题24–28pt，note labels至少12pt。无大灰背景，不用全页UI卡片打印。

## Page 1 — Reference
Title: `Meet the white keys`
Subtitle: `One small part of the piano: C4 to C5.`
Main: 8白键+5黑键，白键标签C4,D4,E4,F4,G4,A4,B4,C5。C4下标`Middle C`，不要用蓝色作为唯一意义。

H2: `Look for the groups`
- `C is the white key just before a group of two black keys.`
- `D sits between those two black keys.`
- `F is the white key just before a group of three black keys.`

H2: `Say the names, then find them`
`Move from left to right: C, D, E, F, G, A, B, C. The letters repeat; the octave number changes at the next C.`

Footnote: `Middle C is labeled C4 in this pack. Octave numbers are not finger numbers. This is a reference diagram, not a full-size sticker template.`

## Page 2 — Worksheet
Title: `Your turn: name the keys`
Subtitle: `Use the same C4–C5 range. Cover the reference page while you try.`
Main: 同一键盘，无任何note text；每个白键下部一条填写线，不能预填某键字母。
Instruction: `Write the letter name on each white key. Add octave numbers when you are ready.`

H2: `Look again`
`Circle the white key just before the group of three black keys.`
`Put a dot on the higher C.`
`Point to the white key between the group of two black keys.`
下方留足空间，不加自动分数或姓名字段。
Footer: `Use page 3 to check your answers. You can return to the reference page at any time.`

## Page 3 — Answers & use notes
Title: `Check the names together`
Subtitle: `White keys, from left to right.`
Main: 同一键盘+全标签。
Answer row: `C4 · D4 · E4 · F4 · G4 · A4 · B4 · C5`
Look-again answers: `Circle: F4. Dot: C5. Between the pair: D4.`

H2: `Use the pack in a lesson`
`Begin with the labeled page. Ask the learner to notice the two- and three-black-key groups. Move to the worksheet, then use this page to check and discuss the answers. Repeat a small part rather than treating the page as a speed test.`

H2: `Try it on screen`
`Open the resource page and choose “Try the matching online practice.” It uses this same white-key range. The exercise checks note recognition, not piano technique.`
CTA printed path: `pianogrid.com/keyboard-notes/labeled#teaching-pack`。
资源页面再经当前builder进入练习，避免把长seed链接直接印满纸。

## 页面上 How to use the pack
H3 `Start with the reference`：`Point out the two- and three-black-key groups. Find the white keys beside and between them.`
H3 `Try the worksheet`：`Cover the labels and write the white-key names. Add octave numbers only when they are part of your lesson.`
H3 `Check and revisit`：`Compare with the answer page. Revisit the notes that need another look, then optionally try the online practice.`

## PDF样张使用说明
本包已生成Letter/A4参考PDF，保证设计可见；这些PDF用本包范围fixture生成，不是最新仓库的共享renderer产物。
Cursor须复用生产renderer重新输出，并核对标签/键数/页序/文本。不得长期同时维护样张fixture和生产音高数据。

## Worksheet-only 独立文件
纸张可选择Letter/A4，正文保持同一练习。底部使用：`Find the reference and answers on the resource page below.`，页码`v1 · worksheet · 1 / 1`。完整包Page2继续指向Page3，两个选择不可共享不适用的页码/答案说明。

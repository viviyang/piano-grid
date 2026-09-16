# Keyboard Notes v2 — UI Implementation Map

状态：`S1_APPROVED_FROZEN`  
正式 B02/B03 状态：见 `../b02-b03-keyboard-notes/RESULT.md`。
样板路径：`http://localhost:3115/keyboard-notes?practice-sample=1`

## 状态到实现的映射

| 设计状态 | 实际组件 / 入口 | 复用 owner | 状态 |
|---|---|---|---|
| Explore | `practice-sample.tsx` `ExploreSample`，由 `lookup-experience.tsx` 双重门控挂入现有 `/keyboard-notes` | `KeyboardDiagram`、`keyboard-geometry`、`keyboard-resolution`、`use-note-audio`、页面真实 layout/note data | `REUSE_VERIFIED` |
| Practice start | `PracticeSample` `phase=start` | 真实 `generateFindPractice()`、现有 layout | `REUSE_VERIFIED` |
| Question | `PracticeSample` `phase=question` + 局部 `KeyboardDiagram` | 真实 trainer target、keyboard engine、pitch labels | `REUSE_VERIFIED` |
| Wrong answer | `selectedState=wrong`；只标错选键，正确键不泄露 | 扩展现有 keyboard presentation props，不建第二 engine | `REUSE_VERIFIED` |
| Hint | `hinted=true`；只显示目标键位置文字 | 真实 target 与现有 pitch label | `REUSE_VERIFIED` |
| Revealed answer | `selectedState=revealed`；Show answer 后才标目标 | 现有 keyboard key/midi | `REUSE_VERIFIED` |
| Result | `phase=results`；first try / with help / revealed 三桶互斥 | 真实本轮 records；没有固定成绩 | `S1_LOCAL_STATE` |
| Missed-note review | 去重 missed set；复习结果不覆盖 `savedResult` | 真实本轮 targets | `S1_LOCAL_STATE` |
| Share dialog | native `<dialog>` + 项目 button/token；只分享干净起点的设计状态 | `share-control.tsx` 导出的 URL/copy/native share helper | `GAP_FIXTURE` |
| Receiver | 同一路由查询夹具 `practice-receiver=1`；只显示 fresh start，不显示发送者答案/成绩 | 同一 Practice 组件与真实 generator | `GAP_FIXTURE` |
| Reference / SEO content | `pages.tsx` 的真实 model blocks/links 传入样板后置区 | 现有内容模型与链接 | `REUSE_VERIFIED` |

## Action hierarchy

| 状态 | Primary | Secondary | Tertiary / 分离动作 |
|---|---|---|---|
| Explore | Hear current note | Practice notes；Find | Copy link；range/picker |
| Practice start | Start 10-note practice | 无 | Explore with note names first；options |
| Question idle | 琴键选择 | Hint | Show answer；Leave practice 独立于答题 action group |
| Wrong | Try again | Hint | Show answer；Leave practice 独立 |
| Hint | 琴键选择 | 无 | Show answer；Leave practice 独立 |
| Correct / revealed | Next note / See results | 无 | Leave practice 独立 |
| Result with misses | Review N notes | Share practice | Practice again；Back to explore |
| Receiver | Start 10-note practice | 无 | Explore with note names first |

## REUSE_VERIFIED

- [已核实] 主题、字体、间距语义：`src/styles/tokens.css`、`src/styles/foundation.css`、现有 `.am-button` variants。
- [已核实] keyboard：`src/components/keyboard-notes/keyboard-diagram.tsx` 与 `src/lib/keyboard-geometry.ts`。
- [已核实] pitch / spelling / deep-link parsing：`src/lib/keyboard-resolution.ts`。
- [已核实] trainer target：`src/lib/keyboard-practice.ts` 的真实生成器；每轮随机，不复制原型固定题序。
- [已核实] audio：`src/components/keyboard-notes/use-note-audio.ts` 与 `src/lib/a-minor-audio.ts`。
- [已核实] share 基础 helper：`src/components/keyboard-notes/share-control.tsx`。
- [已核实] 头尾、Logo、导航、breadcrumb、页面数据、SEO/reference 内容保持现有 owner。

## 真正 GAP

- [已核实] 没有 Practice versioned preset serializer / validator / receiver owner；S1 receiver 查询参数只是开发夹具，不是 B03。
- [已核实] 生产 trainer 尚未拥有三桶计分、去重 missed review 与原成绩不可变回返；本轮仅在双重门控 S1 内验证交互模型。
- [已核实] 仓库没有可直接复用的通用 Tabs/Dialog primitive；S1 使用局部 ARIA tabs 与原生 dialog，但沿用项目 token/button。

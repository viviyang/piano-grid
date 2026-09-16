# 导航与内链落位表
[推断｜产品决策] 不增加一级菜单。用户从现有Songs、Sheet Music、Piano Notes、Tools进入。
| ID | 来源 | 目标 | 文案 | 放置 |
|---|---|---|---|---|
| L01 | `header Songs menu` | `/songs/easy` | Easy Piano Songs | existing nav row only |
| L02 | `/songs` | `/songs/easy#first-10-minutes` | Try a 10-minute starting plan | beginner teaser; one contextual link |
| L03 | `/songs/easy` | `/sheet-music/twinkle-twinkle-little-star` | Edition details | Twinkle card |
| L04 | `/songs/easy` | `/sheet-music/hot-cross-buns` | See lesson materials | Hot Cross Buns card |
| L05 | `/songs/easy` | `/sheet-music/ode-to-joy` | See edition details | Ode card |
| L06 | `/songs/easy` | `/keyboard-notes` | Find a piano note | step setup optional help |
| L07 | `/songs/easy` | `/keyboard-notes/finger-numbers` | Read piano finger numbers | step setup optional help |
| L08 | `/sheet-music/twinkle-twinkle-little-star` | `/songs/easy#first-10-minutes` | Start this edition’s 10-minute plan | after access summary |
| L09 | `/sheet-music/hot-cross-buns` | `/songs/easy` | Compare beginner editions | after provider introduction |
| L10 | `/sheet-music/ode-to-joy` | `/songs/easy` | Compare beginner editions | after provider introduction |
| L11 | `/sheet-music` | `/songs/easy` | Choose a beginner practice goal | beginner section only |
| L12 | `/sheet-music/easy` | `/songs/easy` | Choose what to practice first | existing beginner section |
| L13 | `/sheet-music/beginner` | `/songs/easy#first-10-minutes` | Use a short practice plan | only contextual Twinkle mention |
| L14 | `/keyboard-notes/labeled` | `/keyboard-notes#note-trainer` | Try the matching online practice | must resolve C4–C5 white preset via existing builder; shown href illustrative base |
| L15 | `/keyboard-notes` | `/keyboard-notes/labeled#teaching-pack` | Print a note-name practice pack | existing resource/related area, not duplicate primary |
| L16 | `/tools` | `/keyboard-notes/labeled#teaching-pack` | Piano key-name practice pack | one printable resource item |
| L17 | `/keyboard-notes/blank` | `/keyboard-notes/labeled#teaching-pack` | Get the reference and answers | only if this approved route exists |
| L18 | `/keyboard-notes/labeled` | `/keyboard-notes` | Find or hear a piano note | existing related link; deduplicate |

## 三个深链用法
1. 内部普通plan CTA：`/songs/easy#first-10-minutes` → 展开plan overview，不自动开始、不自动勾完成。
2. 用户分享plan：`/songs/easy?plan=twinkle-early-elementary&plan-v=1#first-10-minutes` → 校验版本，显示接收说明，再start。
3. teacher pack匹配练习：用现有B03 URL builder及固定natural C4–C5 option；示意base `/keyboard-notes#note-trainer` 不足以证明option已匹配，必须从当前registry解析。

## 反向关系
Songs负责选/练；Sheet负责具体版本访问；Labeled负责看/打印；Tools负责发现与进入。每条跨模块链接要有真实用户原因。
不能仅因为Twinkle标了C major就强制插入C major scale/chord练习。需要该版步骤依据才加。

## URL校验
- 必須确认`/keyboard-notes/blank`实际存在才加该来源链接；不存在标NOT_APPLICABLE，不新造route。
- 老分享version的题序/含义不变；B05 plan namespace与B03 practice namespace不相互误解析。
- header桌面/手机的既有Songs子项都有效。资源段不新增全局submenu，最多在现有Tools资源列表加一项。
- 一次点击不能既打开provider又跳plan；嵌套a和button视为失败。

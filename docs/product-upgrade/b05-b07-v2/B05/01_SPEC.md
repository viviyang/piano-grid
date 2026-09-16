# B05｜确定范围与实施步骤

## 目标与边界
[推断] 用户完成“选择确切版本→获取正确材料→按五步安排一次短练习→决定下次复练什么”。不是自动演奏评分，更不是十分钟学会一首曲子的保证。
[已核实｜W01–W08] 三个起步版本已有；Twinkle来源含手位图与对应教程；另外两个也有明确访问资料。
保留现有目录；只升级三个入口，先为Twinkle做一个完整plan。Hot Cross Buns和Ode卡片直接到版本页，不生成三份雷同五步计划。

## A. 版本审计
先从实际registry查 workId、arrangementId、revision、source、访问方式、key/meter/hand/fingering来源、score/audio资源权限和状态。
本包未取得该版本谱面逐音数据。key=C major不能推出“C4–C5、先右手、1–4小节、60BPM”。不能拿同名曲另一个版本填空。

## B. 产品轨道（Cursor按条件执行，不重新问选题）
### 必交 External guided
默认Twinkle external-guided按本包英文内容完成。材料来自出版社，不下载/镜像。状态 `B05_EXTERNAL_GUIDED_COMPLETE`。
步骤里“Open this edition”使用provider allowlist URL；访客外出获取后可以回原页继续。链接打开新标签须 `rel=noopener`，按钮标明outside site；不尝试读取外站是否已下载。
### 仅现有合格素材才接 In-site
若最新仓库已有同一编配的明确展示/播放许可、准确结构化谱数据及已核验事件，接原有sheet/audio owner。步骤引用phraseId，显示真实可用controls。
如果没有，输出 `B05_IN_SITE_BLOCKED_CONTENT`，包含缺少哪些证据与资产；不得显示占位播放器，也不为了通过改编一份新谱冒充Hoffman版本。
不因为此阻塞中断B06/B07。不要默默把另一版变成Twinkle同一版。

## C. 实施任务
1. 整理EditionCard展示：曲名、版本、来源、获取方式、一个理由、一个主动作；细节放原Sheet页。
2. /songs只保留简洁三版本入口/既有catalog；/songs/easy承载完整plan。
3. plan registry引用arrangement，只新增自有指导步骤/证据引用和view data。
4. 实现start/active/self-check/finished/shared/expired/error状态，见03。
5. 接共享ShareDialog及URL；先完成receiver路径，再写分享按钮。
6. 更新三首Sheet页布局和真实CTA：Twinkle回plan；其他回easy目录。
7. 把原先内部验收语言从主内容移到开发记录；合法来源/材料范围/获取限制在用户需要处保留。
8. 同批加入TDH、导航、anchor和真实事件白名单。B07做整体回归，而不是补缺失基本功能。

## D. 数据契约（适配现有命名）
```ts
interface PracticePlan {
  id: string; revision: number;
  arrangementId: string;
  mode: 'external_guided' | 'in_site';
  stepIds: readonly ['edition','setup','phrase','repeat','reflect'];
  contentKey: string;
  capabilities: {
    hostedScore: boolean; playback: boolean; phraseLoop: boolean;
    tempoControl: boolean; handParts: boolean;
  };
  evidenceRefs: string[];
}
```
只有能力与资产都就绪才展示对应按钮；capabilities不是为了让UI变好看而置true。
uiState与音乐数据分离：activeStep、visited、selfChecked、focusChoice，不写入arrangement事实。
每条计划revision冻结；退役版本保留解析并显示可用性说明，不静默替换其他编配。

## E. 内容组织
完整文案来源 `data/content.en.json`；B05/02是使用说明。文案不是出版社原话，不写教师背书或“经过老师验证”。
三张卡的获取方式要看得见，不把paid藏details。
大部分未核验技术字段不必出现在卡片；Sheet详情保持Not confirmed与依据。

## F. SEO与导航
主canonical仍/songs/easy。示例分享：`/songs/easy?plan=twinkle-early-elementary&plan-v=1#first-10-minutes`。
这个publicKey映射真实ID，不直接暴露数据库ID。无身份/自检/成绩/步骤进度参数。
普通内链使用干净路径+anchor，不把UTM/随机seed写满导航。
完整TDH见B07文件；本批按B05标记行实施。

## G. 完成判定
同一版本从Songs卡→Sheet→plan→share receiver闭环；五步不依赖自动计时；不同完成方式不混淆；手机动作清晰；无新业务URL；原catalog仍可筛选；旧B02–B04回归无损。

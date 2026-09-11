from pathlib import Path
import json
out=Path(__file__).parent
models=json.loads((out/'models.json').read_text(encoding='utf-8'))
def cell(v):return str(v).replace('|','&#124;').replace('\n',' ')
lines=[]
count=0
for n,(url,m) in enumerate(models.items(),2):
 lines += [f'### 4.{n} {url}：逐项正文、表格、FAQ及链接','', '[已核实] 以下原内容逐项来自当前页面模型及对应原始HTML；每行的KEEP/MOVE/CORRECT属于建议，未实施。','', '| 原位置 / 内容索引 | 原内容或功能（完整条目） | 动作 | 建议新位置 / 原因 |','|---|---|---|---|']
 def row(pos,text,action='KEEP',dest='原章节原锚点；保留原信息与用途'):
  global count
  count+=1;lines.append('| '+' | '.join(map(cell,[pos,text,action,dest]))+' |')
 meta=m['metadata'];row('页面metadata',f"Title: {meta['title']}；Description: {meta['description']}；canonical: https://pianogrid.com{meta['canonical_path']}",dest='仍在原页面head；不回退到历史JSON的短标题')
 if url!='/chords':
  d=m['data'];row('工作区摘要 / H1',f"{d['heading']}；名称 {d['chord']['name_en']}；符号 {d['chord']['symbol']}；组成音 {'–'.join(d['chord']['note_spellings'])}；公式 {'·'.join(d['chord']['formula_degrees'])}；范围 {d['rangeLabel']}",dest='原顶部答案和工作区；原音区不变')
 for b in m['blocks']:
  bid=b['block_id'];c=b['content'];is_next=bid=='am-next'
  action='CORRECT' if is_next else 'KEEP'
  dest='恢复原相关区；目标按实际PUBLIC_ROUTES判断，保留原JSON历史值' if is_next else f'仍在 #{bid}；保留标题/锚点与章节职责'
  if bid=='chords-chart':dest='查询章节，位于真实结果前；保留锚点'
  row(bid+'/heading',c['heading'],action,dest)
  paragraphs=c['paragraphs']
  if bid=='am-intro':
   row(bid+'/直接答案',m['answer'],dest='仍在H1后')
   row('root-example-heading/H2','Root-position example',dest='仍在工作区之后，保持原位说明独立于当前转位')
   for i,p in enumerate(m['introduction'],1):row('am-intro/原位说明'+str(i),p,dest='仍在Root-position example；仅沿用现有适配文案，不重写原JSON')
  else:
   for i,p in enumerate(paragraphs,1):
    if bid=='chords-chart' or (bid=='chords-intro' and i==2):row(f'{bid}/p{i}',p,'MOVE','查询标题之后、筛选/结果之前；避免解释在19项列表尾部')
    else:row(f'{bid}/p{i}',p,action,dest)
  for i,s in enumerate(c['steps'],1):row(f'{bid}/step{i}',s,dest=f'#{bid} 原有顺序列表；不替换成概括卡片')
  table=c['table']
  if table:
   is_faq=bid.endswith('questions')
   if not is_faq:row(f'{bid}/table-head',' / '.join(table['columns']),dest=f'#{bid} 表头；保留列语义与可滚动边界')
   for i,cells in enumerate(table['rows'],1):row(f'{bid}/'+('FAQ' if is_faq else 'row')+str(i),' / '.join(cells),dest=f'#{bid} '+('原生details，问题与完整答案仍预渲染' if is_faq else '原完整表格，不只显示当前行'))
  for i,l in enumerate(c['links'],1):row(f'{bid}/link{i}',f"{l['label']} → {l['url']}",action,dest)
 if url=='/chords':
  lines += ['', '**19个结果的逐项映射（每条均保留名称/H3、全部音高、低音、键盘、当前项radio、两种播放、Stop及Print this chord）：**','', '| 原结果 / 身份 | 原位低到高 / 低音 | 已有详情入口 | 动作与新位置 |','|---|---|---|---|']
  for i in m['items']:
   v=i['voicing'];lines.append('| '+' | '.join(map(cell,[i['id']+' / '+i['name']+' / '+v['chord_symbol'],'–'.join(x['display_pitch'] for x in v['notes_low_to_high'])+' / '+v['bass_spelling'],i['url'] or '无；不能创建假详情链接','KEEP：仍在原顺序结果网格，C3–C5完整键盘窗口']))+' |');count+=1
  lines += ['', '**比较图（静态图，不带新的试听按钮）：**','', '| 原章节 / 图标题 | 音高 | 动作 / 去向 |','|---|---|---|']
  for pair in m['comparisons']:
   for side in ['left','right']:
    i=pair[side];lines.append('| '+' | '.join(map(cell,['chords-major-minor / '+i['name'],'–'.join(x['display_pitch'] for x in i['voicing']['notes_low_to_high']),'KEEP：原对比表后；C3–C5、middle C说明、各图完整音名和局部滚动保留']))+' |');count+=1
 else:
  lines += ['', '**三个排列的图示/声音/打印共同数据（全部保留，不归一到另一页音区）：**','', '| 原排列ID | 标签 / 符号 / 低音 | 原始音高 / MIDI | 动作 / 去向 |','|---|---|---|']
  for v in m['data']['voicings']:
   lines.append('| '+' | '.join(map(cell,[v['voicing_id'],v['inversion_label']+' / '+v['chord_symbol']+' / '+v['bass_spelling'],'–'.join(x['display_pitch'] for x in v['notes_low_to_high'])+' / '+','.join(str(x['midi']) for x in v['notes_low_to_high']),'KEEP：原工作区选择、完整转位表、当前打印；PDF原字节不变']))+' |');count+=1
  if url!='/chords/a-minor':lines += ['', '[已核实] 本页当前没有独立FAQ或文字练习章节；提案中的“原FAQ/原文字练习”不能被理解成此页原先就有。已有Compare three positions指导文字和表格仍全部保留。']
 lines+=['']
lines+= [f'[已核实] 上述自动逐项展开共 **{count}项**；每项均有动作和明确去向。另有共用控件/隐藏层/资源见下表；不存在用一句“正文保留”代替未盘点内容的条目。','']
p=out.parent/'review.md';text=p.read_text(encoding='utf-8');assert text.count('<!-- CONTENT_MAPPING -->')==1
# Number the four page subsections 4.2–4.5. Common features then remain 4.6.
p.write_text(text.replace('<!-- CONTENT_MAPPING -->','\n'.join(lines)),encoding='utf-8')
print('Expanded mapping rows:',count)

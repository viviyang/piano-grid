"""Build an offline, data-bound Piano Reference prototype without changing source files.
Run: python source/build.py
The PDF should already exist in assets/ (generate via render.py on first build).
"""
from pathlib import Path
import json, hashlib, html, re, base64
ROOT=Path(__file__).resolve().parent.parent
INPUT=ROOT/'inputs'
data=json.loads((INPUT/'page-content.json').read_text())
plan=json.loads((INPUT/'url-plan.final(1).json').read_text())
page=data['pages']['/chords/a-minor']; blocks={b['block_id']:b for b in page['blocks']}
voicings={i:data['shared_data']['voicings'][i] for i in page['data']['voicing_ids']}
chord=data['shared_data']['chords']['a-minor']; default=voicings[page['selection']['default_voicing_id']]
pp=next(p for p in plan['pages'] if p['url']==page['url'])
assert pp['template_id']==page['template_id']=='T07'
assert pp['keyword']==page['main_keyword']=='am piano chord'
assert pp['final_scope']==page['full_planning_scope']
esc=lambda s:html.escape(str(s),quote=True)
css=(ROOT/'source/styles.css').read_text();js=(ROOT/'source/app.js').read_text()
icons={
'play':'<path d="m7 4 13 8-13 8z" fill="currentColor" stroke="none"/>',
'stop':'<rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor" stroke="none"/>',
'sequence':'<path d="M3 17h4M10 12h4M17 7h4"/>',
'print':'<path d="M7 8V3h10v5M7 17H4V9h16v8h-3M7 14h10v7H7z"/><path d="M17 11h.01"/>',
'download':'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
'left':'<path d="m14 5-7 7 7 7"/>',
'right':'<path d="m10 5 7 7-7 7"/>',
'search':'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
'close':'<path d="m6 6 12 12M6 18 18 6"/>'}
def icon(name):return f'<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">{icons[name]}</svg>'
white_pcs=data['shared_data']['conventions']['white_pitch_classes']
lo,hi=data['shared_data']['conventions']['diagram_range_midi']
whites=[m for m in range(lo,hi+1) if m%12 in white_pcs]
letters=dict(zip(white_pcs,'CDEFGAB'))
def keyboard(v, prefix='screen'):
    selected=v['diagram']['highlight_midi']; keys=[]; labels=[]
    for idx,m in enumerate(whites):
        sel=' is-selected' if m in selected else ''
        keys.append(f'<span aria-hidden="true" class="key white{sel}" data-midi="{m}" style="left:{idx/len(whites)*100:.6f}%;width:{100/len(whites):.6f}%"><i class="marker"></i></span>')
        labels.append(f'<span class="key-label{sel}" data-midi="{m}" style="left:{idx/len(whites)*100:.6f}%;width:{100/len(whites):.6f}%">{letters[m%12]}{m//12-1}</span>')
    for m in range(lo,hi+1):
        if m in whites:continue
        windex=sum(1 for w in whites if w<m)
        keys.append(f'<span aria-hidden="true" class="key black" data-midi="{m}" style="left:{(windex-.30)/len(whites)*100:.6f}%;width:{.60/len(whites)*100:.6f}%"><i class="marker"></i></span>')
    return f'<div class="keyboard"><div class="key-bed" role="img" aria-label="{esc(v["diagram"]["alt_text"])}">{"".join(keys)}</div><div class="key-labels" aria-hidden="true">{"".join(labels)}</div></div>'

def paragraph(text):return f'<p>{esc(text)}</p>'
def paragraphs(items):return ''.join(map(paragraph,items))
def steps(items):return '<ol class="steps">'+''.join('<li><span>'+esc(t)+'</span></li>' for t in items)+'</ol>' if items else ''
def pdf_anchor(classes='btn tertiary',uid=''):
    pdf=ROOT/'assets/a-minor-notes-inversions.pdf'
    if not pdf.exists():
        return '<span class="btn tertiary" aria-disabled="true">PDF is being prepared</span>'
    encoded=base64.b64encode(pdf.read_bytes()).decode()
    return f'<a {"id="+chr(34)+uid+chr(34) if uid else ""} class="{classes}" href="data:application/pdf;base64,{encoded}" download="a-minor-notes-inversions.pdf">{icon("download")}<span>Download A minor PDF</span></a>'
def print_button(uid=''):
    return f'<button type="button" {"id="+chr(34)+uid+chr(34) if uid else ""} class="btn tertiary print" data-print-current disabled>{icon("print")}<span>Print this position</span></button>'

def supporting(id):
    block=blocks[id]; c=block['content']; inner=paragraphs(c['paragraphs'])+steps(c['steps'])
    if id=='am-inversions':
        table=c['table']; rows=[]
        for index,row in enumerate(table['rows']):
            vid=page['selection']['options'][index]['value'];sel=' class="is-current"' if index==0 else ''
            cells=[f'<td><span class="current-row-mark" aria-hidden="true"></span>{esc(row[0])}<span class="sr-only row-selected-label">, current selection</span></td>',f'<td>{esc(row[1])}</td>',f'<td class="pitch-cell">{esc(row[2])}</td>',f'<td>{esc(row[3])}</td>']
            rows.append(f'<tr data-voicing-id="{vid}"{sel}>{"".join(cells)}</tr>')
        inner+='<div class="table-scroll" tabindex="0" role="region" aria-label="A minor inversion comparison table"><table class="inversion-table"><caption class="sr-only">A minor: root position, first inversion, and second inversion</caption><thead><tr>'+''.join('<th scope="col">'+esc(t)+'</th>' for t in table['columns'])+'</tr></thead><tbody>'+''.join(rows)+'</tbody></table></div>'
    elif id=='am-questions':
        inner=''.join(f'<details class="faq-item"><summary><span>{esc(q)}</span><span class="faq-icon" aria-hidden="true"></span></summary><p>{esc(a)}</p></details>' for q,a in c['table']['rows'])
    elif id=='am-print':
        inner+='<div class="section-actions">'+pdf_anchor()+print_button()+'</div>'
    return f'<section class="content-section" id="{id}" data-block-id="{id}" tabindex="-1" aria-labelledby="{id}-heading"><h2 id="{id}-heading">{esc(c["heading"])}</h2><div class="content-body">{inner}</div></section>'
intro=blocks['am-intro']['content'];first,remainder=intro['paragraphs'][0].split('. ',1);first+='.'
intro_second=intro['paragraphs'][1].replace('The example below','The root-position example',1)
result=blocks['am-result']['content']
nav=''.join(f'<span {"aria-current=\"page\"" if name=="Chords" else "aria-disabled=\"true\" title=\"Not included in this preview\""}>{name}</span>' for name in ['Keyboard Notes','Chords','Scales','Guide'])
radios=''.join(f'<label class="radio-label"><input type="radio" name="position" value="{o["value"]}" {"checked" if i==0 else ""}><span class="segment">{esc(o["label"])}</span></label>' for i,o in enumerate(page['selection']['options']))
note_spans='<span class="separator" aria-hidden="true">–</span>'.join(f'<span class="pitch" data-midi="{n["midi"]}">{esc(n["display_pitch"])}</span>' for n in default['notes_low_to_high'])
support_ids=['am-find-notes','am-inversions','am-why-minor','am-practice','am-print','am-questions']
search_sections=[{'id':'am-result','heading':result['heading'],'text':result['heading']+' '+first+' Position Play chord '+ ' '.join(result['paragraphs'])}]+[{'id':i,'heading':blocks[i]['content']['heading'],'text':blocks[i]['content']['heading']+' '+json.dumps(blocks[i]['content'],ensure_ascii=False)} for i in support_ids]
extracted={'content_version':data['version'],'page':page,'chord':chord,'voicings':voicings,'conventions':data['shared_data']['conventions'],'searchSections':search_sections}
(ROOT/'source/page-content.extract.json').write_text(json.dumps(extracted,ensure_ascii=False,indent=2))
serial=json.dumps(extracted,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
tone_markup='<span class="separator" aria-hidden="true">–</span>'.join('<span>'+esc(n)+'</span>' for n in chord['note_spellings'])
formula_markup='<span class="separator" aria-hidden="true">·</span>'.join('<span>'+esc(n.replace('b','♭'))+'</span>' for n in chord['formula_degrees'])
body=f'''<a class="skip" href="#am-result">Skip to chord tool</a>
<header class="site-header"><div class="container header-inner"><span class="brand">Piano Reference</span><div class="header-right"><nav class="site-nav" aria-label="Site sections (other pages not included in this preview)">{nav}</nav><button type="button" class="search-trigger" id="search-trigger" aria-label="Search this page" aria-haspopup="dialog" hidden>{icon('search')}<span>Search this page</span></button></div></div></header>
<main class="container" id="main">
<header class="page-heading" data-block-id="am-intro"><nav class="breadcrumb" aria-label="Breadcrumb"><span>Chords</span><span class="slash" aria-hidden="true">/</span><span aria-current="page">A minor</span></nav><h1>{esc(intro['heading'])}</h1><p class="direct-answer">{esc(first)}</p></header>
<section class="tool" id="am-result" data-block-id="am-result" data-voicing-id="{default['voicing_id']}" data-audio-state="idle" tabindex="-1" aria-labelledby="tool-heading">
<h2 class="sr-only" id="tool-heading">{esc(result['heading'])}</h2>
<dl class="summary"><div><dt>{esc(chord["name_en"])}</dt><dd class="chord-id">{esc(chord['symbol'])}</dd></div><div><dt>Chord tones</dt><dd class="tone-list">{tone_markup}</dd></div><div><dt>Formula</dt><dd class="formula">{formula_markup}</dd></div></dl>
<div class="select-result"><fieldset class="position-fieldset" id="position-fieldset" disabled><legend>Position</legend><div class="positions">{radios}</div></fieldset><div class="current-result"><div><div class="field-label">{esc(page['microcopy']['selected_note_summary'])}</div><div class="note-order" id="note-order" aria-label="Notes from low to high: A3, C4, E4">{note_spans}</div></div><div class="current-symbol"><strong id="current-symbol">{esc(default['chord_symbol'])}</strong><div>Bass: <span id="current-bass">{esc(default['bass_spelling'])}</span></div></div></div></div>
<figure class="figure"><div class="keyboard-scroll" id="keyboard-scroll" tabindex="0" role="region" aria-label="Piano keyboard, C3 to C5. Use left and right arrow keys to scroll.">{keyboard(default)}</div><figcaption class="keyboard-footer"><div class="keyboard-meta"><span>C4 is middle C</span><span class="range">C3–C5</span></div><div class="keyboard-pan" id="keyboard-pan" hidden aria-label="Keyboard view"><button type="button" class="pan-btn" id="pan-left" aria-label="Show lower keys">{icon('left')}</button><button type="button" class="pan-btn" id="pan-right" aria-label="Show higher keys">{icon('right')}</button></div></figcaption></figure>
<div class="controls"><div class="control-bar"><div class="playback-actions"><button type="button" id="am-play-together" class="btn primary play-btn" data-play-mode="together" disabled>{icon('play')}<span>Play chord</span></button><button type="button" id="am-play-apart" class="btn secondary sequence-btn" data-play-mode="ascending" disabled>{icon('sequence')}<span>Play notes one at a time</span></button><button type="button" id="am-stop" class="btn secondary stop-btn" disabled>{icon('stop')}<span>Stop</span></button></div><div class="print-actions">{print_button('am-print-current')}{pdf_anchor(uid='am-download')}</div></div><div class="playback-feedback"><span>{esc(page['microcopy']['playback_note'])}</span><div id="audio-status" class="playback-status" role="status" aria-live="polite" aria-atomic="true"></div></div><div id="resource-status" class="resource-feedback" role="status"></div></div>
<noscript><p class="nojs-note">JavaScript is off. The root-position diagram, comparison table, explanations, and PDF remain available. Enable JavaScript to switch positions or play sound.</p></noscript>
<div class="tool-notes">{paragraphs(result['paragraphs'])}</div></section>
<div id="selection-announcement" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>
<section class="intro-rest" data-block-id="am-intro" aria-labelledby="root-example-heading"><h2 class="eyebrow" id="root-example-heading">Root-position example</h2>{paragraph(remainder)}{paragraph(intro_second)}</section>
<div class="reading">{''.join(supporting(i) for i in support_ids)}</div>
<!-- am-next is retained in source/page-content.extract.json. All targets are unpublished; no empty public related-links section is rendered. -->
</main>
<footer class="site-footer"><div class="container footer-inner"><span class="footer-brand">Piano Reference</span><span class="footer-note">Local design preview · /chords/a-minor</span><a href="#main">Back to top ↑</a></div></footer>
<dialog id="page-search" aria-labelledby="search-title"><div class="dialog-head"><h2 id="search-title">Search this page</h2><button class="btn tertiary" id="search-close" type="button" aria-label="Close search">{icon('close')}</button></div><label for="page-search-input" class="search-label">Find notes, inversions, or an explanation on this page</label><input class="search-input" id="page-search-input" type="search" autocomplete="off" placeholder="For example: inversions"><div id="search-status" class="search-status" role="status"></div><div class="search-results" id="search-results"></div></dialog>
<article class="print-only" id="print-content" data-voicing-id="{default['voicing_id']}"><div class="print-brand">Piano Reference</div><h1>{esc(intro['heading'])}</h1><p class="print-lead">Chord tones: A–C–E · Formula: 1, ♭3, 5</p><div class="print-selection"><div><h2 id="print-position">{esc(default['inversion_label'])}</h2><div class="print-notes" id="print-notes">{' – '.join(default['print_data']['spelled_pitches'])}</div></div><div><strong id="print-symbol">{esc(default['chord_symbol'])}</strong><div>Bass: <span id="print-bass">{esc(default['bass_spelling'])}</span></div></div></div>{keyboard(default,'print')}<p class="print-helper">Dots mark the notes to play. C4 is middle C. Numbers identify octaves, not fingers.</p><div class="print-footer">{esc(blocks['am-find-notes']['content']['paragraphs'][1])}<br>/chords/a-minor · Current position reference</div></article>
<script type="application/json" id="piano-data">{serial}</script><script>{js}</script>'''
head=f'<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="color-scheme" content="light"><meta name="description" content="{esc(page["metadata"]["description"])}"><title>{esc(page["metadata"]["title"])}</title><style>{css}</style></head><body>'
doc=head+body+'</body></html>'
(ROOT/'index.html').write_text(doc)
(ROOT/'chords/a-minor/index.html').write_text(doc)
# One page for the three-voicing PDF, using the same keyboard builder, not the prior image assets.
pdf_sections=[]
for v in voicings.values():
    pdf_sections.append(f'<section class="pdf-voicing"><div class="pdf-head"><h2>{esc(v["inversion_label"])}</h2><strong>{esc(v["chord_symbol"])}</strong></div><p>{" – ".join(v["print_data"]["spelled_pitches"])}<span>Bass: {esc(v["bass_spelling"])}</span></p>{keyboard(v)}</section>')
pdf_css='''@page{size:Letter portrait;margin:14mm}*{box-sizing:border-box}body{margin:0;background:#fff;color:#1D1D1F;font-family:system-ui,sans-serif;font-size:11pt}.pdf-brand{font-size:10pt;margin-bottom:8pt}h1{font-size:24pt;line-height:1.2;margin:0 0 8pt}h2{font-size:14pt;margin:0}p{line-height:1.45;margin:0}.pdf-lead{margin-bottom:8pt}.pdf-voicing{border-top:1px solid #888;padding-top:10pt;margin-top:12pt;break-inside:avoid}.pdf-head{display:flex;justify-content:space-between;align-items:baseline}.pdf-voicing p{font-size:12pt;font-weight:600;margin:4pt 0 10pt}.pdf-voicing p span{float:right;font-size:10pt;font-weight:400}.keyboard{width:100%;position:relative}.key-bed{height:76pt;position:relative}.key{position:absolute;top:0;border:1px solid #666;border-radius:0 0 2px 2px;box-sizing:border-box}.key.white{height:100%;background:white}.key.black{height:62%;background:#1D1D1F;border-color:#1D1D1F;z-index:3;print-color-adjust:exact}.key .marker{display:none}.key.is-selected{border:1.5px solid #000}.key.is-selected .marker{display:block;width:6pt;height:6pt;position:absolute;bottom:10pt;left:50%;transform:translateX(-50%);background:#111;border-radius:50%;print-color-adjust:exact}.key-labels{height:23pt;position:relative}.key-label{position:absolute;top:4pt;text-align:center;font-size:8.5pt;color:#41454D}.key-label.is-selected{font-weight:750;color:#000;text-decoration:underline}.pdf-foot{margin-top:10pt;border-top:1px solid #bbb;padding-top:10pt;font-size:9.5pt;line-height:1.5}'''
pdf_doc=f'<!doctype html><html lang="en"><meta charset="utf-8"><title>A minor notes and inversions</title><style>{pdf_css}</style><body><div class="pdf-brand">Piano Reference</div><h1>A Minor Piano Chord (Am)</h1><p class="pdf-lead">Chord tones: A–C–E · Formula: 1, ♭3, 5</p>{"".join(pdf_sections)}<div class="pdf-foot">Dots mark notes to play. C4 is middle C. Numbers identify octaves, not fingers.<br>{esc(blocks["am-find-notes"]["content"]["paragraphs"][1])}<br>/chords/a-minor · Notes and inversions reference</div></body></html>'
(ROOT/'source/pdf-layout.html').write_text(pdf_doc)
# Verify prose literally against the supplied Markdown, allowing markup normalization only.
md=(INPUT/'content-pack.md').read_text()
missing=[]
for bid,b in blocks.items():
 for kind in ['paragraphs','steps']:
  for t in b['content'][kind]:
   if t not in md:missing.append({'block_id':bid,'field':kind,'text':t})
(ROOT/'checks/copy-agreement.json').write_text(json.dumps({'mismatches':missing,'all_page_paragraphs_and_steps_match_markdown':not missing},ensure_ascii=False,indent=2))
print('Built',len(doc.encode()),'bytes; content mismatches:',len(missing))

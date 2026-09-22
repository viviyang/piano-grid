from pathlib import Path
p=Path('src/components/keyboard-notes/keyboard-notes-workspace.tsx');s=p.read_text(encoding='utf8');line='<ProductContinuation path="/keyboard-notes" primaryHref={selected?`/keyboard-notes?${lookupShareParams(layout,resolution.selected!)}#note-trainer`:"#note-trainer"}/>'
old='<ProductContinuation path="/keyboard-notes" primaryHref={selected?`/keyboard-notes?${lookupShareParams(layout,resolution.selected!)}#note-trainer`:\'#note-trainer\'}/>'
assert old in s;s=s.replace(old,'',1);anchor='\n  </section>;\n}\n\nfunction PracticeNotes';assert anchor in s;s=s.replace(anchor,'\n    '+line+anchor,1);p.write_text(s,encoding='utf8')

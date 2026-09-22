from pathlib import Path
p=Path('src/components/support/by-key-experience.tsx');s=p.read_text(encoding='utf8');needle="const match=keys.find(key=>anchorFor(key)===anchor);";assert needle in s;s=s.replace(needle,"if(['read-degrees','minor-options','build-a-row','by-key-table-heading'].includes(anchor)){setReady(true);return;}"+needle,1);p.write_text(s,encoding='utf8')
for name in ['src/components/keyboard-notes/keyboard-notes-workspace.tsx','src/lib/chord-learning-content.ts']:
 p=Path(name);p.write_text('\n'.join(line.rstrip() for line in p.read_text(encoding='utf-8-sig').splitlines()).rstrip()+'\n',encoding='utf8')

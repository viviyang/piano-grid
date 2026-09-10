from pathlib import Path
p=Path('src/components/a-minor/experience.tsx');s=p.read_text(encoding='utf-8')
s=s.replace("import { Keyboard } from './keyboard';", "import { KeyboardViewport } from '../chords/keyboard-viewport';\nimport { PrintVoicing } from '../chords/print-voicing';")
s=s.replace('  const scroller=useRef<HTMLDivElement>(null);\n  const [pan,setPan]=useState({overflow:false,left:false,right:false});\n','')
a=s.index('  function updatePan()');b=s.index('  function change(',a);s=s[:a]+s[b:]
a=s.index('        <figure className="am-figure">');b=s.index('\n        <div className="am-controls">',a);s=s[:a]+'        <KeyboardViewport id="keyboard-scroll" voicing={voicing} whitePitchClasses={data.whitePitchClasses} sounding={sounding} ready={ready} rangeLabel={data.rangeLabel}/>'+s[b:]
a=s.index('<div className="am-print-brand">');b=s.index('</article>',a);s=s[:a]+'<PrintVoicing voicing={printed} whitePitchClasses={data.whitePitchClasses} title={data.heading} tones={data.chord.note_spellings} formula={data.chord.formula_degrees} url={data.url} disclaimer={data.printDisclaimer}/>'+s[b:]
p.write_text(s,encoding='utf-8')

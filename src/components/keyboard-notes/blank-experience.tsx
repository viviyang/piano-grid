'use client';
import { useState } from 'react';

type BlankLayout = { id: string; keyCount: number; whiteKeys: number; blackKeys: number; range: string; asset: string };
type BlankPDF = { paper: string; pages: number; asset: string };

export function BlankExperience({ layouts, pdfs, answerURL }: { layouts: BlankLayout[]; pdfs: BlankPDF[]; answerURL: string }) {
  const [layoutID, setLayoutID] = useState(layouts[0].id);
  const layout = layouts.find(item => item.id === layoutID) ?? layouts[0];
  return <section className="am-tool kn-tool kn-blank" aria-label="Blank piano keyboard worksheet"><div className="kn-toolbar kn-screen"><label className="kn-field">Keyboard segment<select value={layoutID} onChange={event => setLayoutID(event.target.value)}>{layouts.map(item => <option value={item.id} key={item.id}>{item.keyCount} keys · {item.range}</option>)}</select></label><button type="button" className="am-button am-secondary" onClick={() => window.print()}>Print selected segment</button></div><div className="kn-result"><h2>{layout.keyCount}-key blank keyboard</h2><p>{layout.whiteKeys} white keys and {layout.blackKeys} black keys · {layout.range}</p></div><div className="kn-blank-preview"><img src={layout.asset} alt={`Unlabeled ${layout.keyCount}-key piano keyboard segment`}/></div><p>Reference diagram - not a full-size sticker template.</p><div className="kn-actions kn-screen">{pdfs.map(pdf => <a className="am-button am-tertiary" download href={pdf.asset} key={pdf.paper}>Download {pdf.paper} PDF</a>)}<a className="am-button am-tertiary" href={answerURL}>Check note names</a></div><p className="kn-print-footer">PianoGrid · pianogrid.com/keyboard-notes/blank · Write note names or mark a scale. Not life-size.</p></section>;
}

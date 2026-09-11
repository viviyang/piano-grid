'use client';

import { useEffect, useState } from 'react';
import type { BlankSheetAsset, PaperID } from '@/lib/blank-sheet-types';

export function BlankSheetTool({ assets, previewURL, systemCount }: { assets: BlankSheetAsset[]; previewURL: string; systemCount: number }) {
  const [paper, setPaper] = useState<PaperID>('letter');
  const [zoom, setZoom] = useState(100);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const selected = assets.find((asset) => asset.id === paper) ?? assets[0];
  return <section className="bs-tool" aria-labelledby="bs-tool-title">
    <div className="bs-tool-head"><div><p className="bs-overline">Printable worksheet · no account</p><h2 id="bs-tool-title">Choose your paper</h2></div><p>{systemCount} blank grand-staff systems on one page.</p></div>
    <fieldset className="bs-paper-options" disabled={!ready}><legend>Paper size</legend>{assets.map((asset) => <label key={asset.id} className={paper === asset.id ? 'bs-paper-option bs-selected' : 'bs-paper-option'}><input type="radio" name="paper" value={asset.id} checked={paper === asset.id} onChange={() => setPaper(asset.id)}/><span><strong>{asset.label}</strong><small>{asset.dimensions} · {asset.pages} page</small></span><a href={asset.url} download onClick={(event) => event.stopPropagation()}>Download {asset.label}</a></label>)}</fieldset>
    <div className="bs-preview-head"><div><p className="bs-overline">Sheet preview</p><h2>{selected.label} · {selected.dimensions}</h2></div><label><span>Screen zoom: {zoom}%</span><input type="range" min="75" max="150" step="25" value={zoom} disabled={!ready} onChange={(event) => setZoom(Number(event.target.value))}/></label></div>
    <div className="bs-preview-scroll" role="region" tabIndex={0} aria-label={`${selected.label} blank piano grand staff preview at ${zoom}%`}><div className="bs-preview-paper" style={{ width: `${zoom}%` }}><img src={previewURL} alt={`Blank piano manuscript preview with ${systemCount} paired treble and bass staff systems`}/></div></div>
    <div className="bs-actions"><a className="am-button am-primary" href={selected.url} target="_blank" rel="noreferrer">Open {selected.label} PDF to print</a><a className="am-button am-secondary" href={selected.url} download>Download selected PDF</a><p>Print at 100% when your printer can keep the page margins; otherwise use the printer’s printable-area option.</p></div>
  </section>;
}

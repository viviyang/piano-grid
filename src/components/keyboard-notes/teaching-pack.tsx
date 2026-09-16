'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { Layout } from '@/lib/keyboard-types';
import { getB06TeacherCopy } from '@/lib/b06-content';
import { emitTeachingPackEvent } from '@/lib/b06-events';
import {
  PAGE_COPY,
  TEACHING_PACK_ANCHOR,
  TEACHING_PACK_ID,
  TEACHING_PACK_PATH,
  TEACHING_PACK_REVISION,
  assertTeachingPackProjection,
  parseTeachingPageKind,
  parseTeachingPageSet,
  parseTeachingPaper,
  projectTeachingPackKeys,
  teachingPackAsset,
  teachingPackPracticeHref,
  teachingPackShareParams,
  type TeachingPageKind,
  type TeachingPageSet,
  type TeachingPaper,
} from '@/lib/b06-teaching-pack';
import { KeyboardDiagram } from './keyboard-diagram';
import { ShareDialog, buildShareURL } from './share-control';
import './teaching-pack.css';

const PAGE_ORDER: TeachingPageKind[] = ['reference', 'worksheet', 'answers'];

function pageIndex(kind: TeachingPageKind) {
  return PAGE_ORDER.indexOf(kind);
}

function PaperKeyboard({
  layout,
  mode,
  labeled,
}: {
  layout: Layout;
  mode: TeachingPageKind;
  labeled: boolean;
}) {
  const projection = useMemo(() => assertTeachingPackProjection(projectTeachingPackKeys(layout)), [layout]);
  const keyLabels = labeled
    ? Object.fromEntries(projection.whiteKeys.map((key, index) => [key.midi, projection.whiteLabels[index]]))
    : {};
  return (
    <KeyboardDiagram
      keys={projection.keys}
      octaves={labeled}
      keyLabels={keyLabels}
      showVisualLabels={labeled}
      fit
      autoCenter={false}
      label={labeled ? 'Labeled keyboard from C4 to C5' : 'Blank keyboard from C4 to C5'}
      className={`pg-teaching-pack-keyboard ${mode === 'worksheet' ? 'pg-teaching-pack-keyboard-worksheet' : ''}`}
    />
  );
}

function PackPageBody({
  layout,
  kind,
  pageSet,
  paper,
}: {
  layout: Layout;
  kind: TeachingPageKind;
  pageSet: TeachingPageSet;
  paper: TeachingPaper;
}) {
  const copy = PAGE_COPY[kind];
  const pageNumber = pageSet === 'worksheet' ? 1 : pageIndex(kind) + 1;
  const pageTotal = pageSet === 'worksheet' ? 1 : 3;
  const footerNote = kind === 'worksheet'
    ? (pageSet === 'worksheet' ? PAGE_COPY.worksheet.footerSolo : PAGE_COPY.worksheet.footerFull)
    : null;

  return (
    <article
      className={`pg-teaching-pack-sheet pg-teaching-pack-sheet-${kind}`}
      data-page-kind={kind}
      data-page-set={pageSet}
      data-paper={paper}
    >
      <header className="pg-teaching-pack-sheet-brand">
        <span>PianoGrid</span>
        <span className="pg-teaching-pack-sheet-side">PIANO KEY NAMES / C4–C5</span>
      </header>
      <h2 className="pg-teaching-pack-sheet-title">{copy.title}</h2>
      <p className="pg-teaching-pack-sheet-subtitle">{copy.subtitle}</p>
      <PaperKeyboard layout={layout} mode={kind} labeled={kind !== 'worksheet'} />
      {kind === 'reference' ? (
        <>
          <h3>{PAGE_COPY.reference.groupsHeading}</h3>
          <ul>{PAGE_COPY.reference.groups.map(item => <li key={item}>{item}</li>)}</ul>
          <h3>{PAGE_COPY.reference.sayHeading}</h3>
          <p>{PAGE_COPY.reference.sayBody}</p>
          <p className="pg-teaching-pack-sheet-note">{PAGE_COPY.reference.footnote}</p>
        </>
      ) : null}
      {kind === 'worksheet' ? (
        <>
          <p>{PAGE_COPY.worksheet.instruction}</p>
          <h3>{PAGE_COPY.worksheet.lookHeading}</h3>
          <ul>{PAGE_COPY.worksheet.lookItems.map(item => <li key={item}>{item}</li>)}</ul>
          {footerNote ? <p className="pg-teaching-pack-sheet-note">{footerNote}</p> : null}
        </>
      ) : null}
      {kind === 'answers' ? (
        <>
          <p className="pg-teaching-pack-answer-row"><strong>{PAGE_COPY.answers.answerRow}</strong></p>
          <p>{PAGE_COPY.answers.lookAgain}</p>
          <h3>{PAGE_COPY.answers.useHeading}</h3>
          <p>{PAGE_COPY.answers.useBody}</p>
          <h3>{PAGE_COPY.answers.screenHeading}</h3>
          <p>{PAGE_COPY.answers.screenBody}</p>
          <p className="pg-teaching-pack-sheet-note">pianogrid.com/keyboard-notes/labeled#teaching-pack</p>
        </>
      ) : null}
      <footer className="pg-teaching-pack-sheet-foot">
        <a href={`${TEACHING_PACK_PATH}#${TEACHING_PACK_ANCHOR}`}>pianogrid.com/keyboard-notes/labeled#teaching-pack</a>
        <span>
          {pageSet === 'worksheet'
            ? `v${TEACHING_PACK_REVISION} · worksheet · ${pageNumber} / ${pageTotal}`
            : `v${TEACHING_PACK_REVISION} · ${pageNumber} / ${pageTotal}`}
          {' · '}
          {paper === 'a4' ? 'A4' : 'US Letter'}
        </span>
      </footer>
    </article>
  );
}

function PreviewThumb({
  layout,
  kind,
  active,
  label,
  onSelect,
}: {
  layout: Layout;
  kind: TeachingPageKind;
  active: boolean;
  label: string;
  onSelect: () => void;
}) {
  return (
    <button type="button" className="pg-teaching-pack-thumb" aria-pressed={active} onClick={onSelect}>
      <span className="pg-teaching-pack-thumb-label">{label}</span>
      <span className="pg-teaching-pack-thumb-paper" aria-hidden="true">
        <PaperKeyboard layout={layout} mode={kind} labeled={kind !== 'worksheet'} />
      </span>
    </button>
  );
}

export function TeachingPackExperience({ layout }: { layout: Layout }) {
  const copy = getB06TeacherCopy();
  const [paper, setPaper] = useState<TeachingPaper>('letter');
  const [pageKind, setPageKind] = useState<TeachingPageKind>('reference');
  const [pageSet, setPageSet] = useState<TeachingPageSet>('full');
  const [shareOpen, setShareOpen] = useState(false);
  const [printOpen, setPrintOpen] = useState(false);
  const [printActive, setPrintActive] = useState(false);
  const [printSnapshot, setPrintSnapshot] = useState<{ paper: TeachingPaper; pageSet: TeachingPageSet } | null>(null);
  const [practiceHref, setPracticeHref] = useState(() => teachingPackPracticeHref(TEACHING_PACK_REVISION));
  const shareReturnRef = useRef<HTMLButtonElement>(null);
  const printReturnRef = useRef<HTMLButtonElement>(null);
  const asset = teachingPackAsset(paper, 'full');
  const worksheetAsset = teachingPackAsset(paper, 'worksheet');
  const activePrint = printSnapshot ?? { paper, pageSet };
  const printPages = activePrint.pageSet === 'worksheet' ? (['worksheet'] as TeachingPageKind[]) : PAGE_ORDER;

  useEffect(() => {
    assertTeachingPackProjection(projectTeachingPackKeys(layout));
  }, [layout]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPaper(parseTeachingPaper(params.get('paper')));
    if (params.has('page')) setPageKind(parseTeachingPageKind(params.get('page')));
    const resource = params.get('printResource');
    if (resource === TEACHING_PACK_ID) {
      const nextPaper = parseTeachingPaper(params.get('paper'));
      const nextSet = parseTeachingPageSet(params.get('pageSet'));
      setPaper(nextPaper);
      setPageSet(nextSet);
      setPrintSnapshot({ paper: nextPaper, pageSet: nextSet });
      setPrintActive(true);
      document.documentElement.dataset.pgPrintResource = TEACHING_PACK_ID;
      document.documentElement.dataset.pgPrintPaper = nextPaper;
      const pageStyle = document.getElementById('pg-teaching-pack-page-style') ?? document.createElement('style');
      pageStyle.id = 'pg-teaching-pack-page-style';
      pageStyle.textContent = nextPaper === 'a4'
        ? '@page{size:A4 portrait;margin:14mm}'
        : '@page{size:Letter portrait;margin:0.55in}';
      document.head.appendChild(pageStyle);
    }
    setPracticeHref(teachingPackPracticeHref());
    emitTeachingPackEvent('teaching_pack_view', { resource_id: TEACHING_PACK_ID, revision: TEACHING_PACK_REVISION });
  }, []);

  useEffect(() => {
    const clear = () => {
      setPrintActive(false);
      setPrintSnapshot(null);
      delete document.documentElement.dataset.pgPrintResource;
      delete document.documentElement.dataset.pgPrintPaper;
      document.getElementById('pg-teaching-pack-page-style')?.remove();
      emitTeachingPackEvent('teaching_pack_print_dialog_closed', {
        resource_id: TEACHING_PACK_ID,
        paper: activePrint.paper,
        page_set: activePrint.pageSet,
      });
    };
    window.addEventListener('afterprint', clear);
    return () => window.removeEventListener('afterprint', clear);
  }, [activePrint.paper, activePrint.pageSet]);

  const shareParams = useMemo(() => teachingPackShareParams(paper), [paper]);
  const shareURL = buildShareURL(TEACHING_PACK_PATH, shareParams) + `#${TEACHING_PACK_ANCHOR}`;

  function changePaper(next: TeachingPaper) {
    setPaper(next);
    emitTeachingPackEvent('teaching_pack_format_change', { resource_id: TEACHING_PACK_ID, paper: next });
  }

  function changePage(next: TeachingPageKind) {
    setPageKind(next);
    emitTeachingPackEvent('teaching_pack_preview_page', { resource_id: TEACHING_PACK_ID, page_kind: next });
  }

  function startPackPrint(nextSet: TeachingPageSet) {
    setShareOpen(false);
    setPrintOpen(false);
    const pageStyle = document.getElementById('pg-teaching-pack-page-style') ?? document.createElement('style');
    pageStyle.id = 'pg-teaching-pack-page-style';
    pageStyle.textContent = paper === 'a4'
      ? '@page{size:A4 portrait;margin:14mm}'
      : '@page{size:Letter portrait;margin:0.55in}';
    document.head.appendChild(pageStyle);
    flushSync(() => {
      setPageSet(nextSet);
      setPrintSnapshot({ paper, pageSet: nextSet });
      setPrintActive(true);
      document.documentElement.dataset.pgPrintResource = TEACHING_PACK_ID;
      document.documentElement.dataset.pgPrintPaper = paper;
    });
    emitTeachingPackEvent('teaching_pack_print_dialog', {
      resource_id: TEACHING_PACK_ID,
      paper,
      page_set: nextSet,
    });
    try {
      window.print();
    } catch {
      setPrintActive(false);
      setPrintSnapshot(null);
      delete document.documentElement.dataset.pgPrintResource;
      delete document.documentElement.dataset.pgPrintPaper;
      pageStyle.remove();
    }
  }

  return (
    <>
      <section className="pg-teaching-pack kn-screen" id={TEACHING_PACK_ANCHOR} aria-labelledby="pg-teaching-pack-title">
        <p className="pg-teaching-pack-kicker">{copy.subtitle}</p>
        <h2 id="pg-teaching-pack-title">{copy.title}</h2>
        <div className="pg-teaching-pack-grid">
          <div className="pg-teaching-pack-copy">
            <p className="pg-teaching-pack-body">{copy.body}</p>
            <fieldset className="pg-teaching-pack-formats">
              <legend>{copy.formatLegend}</legend>
              <label>
                <input type="radio" name="pg-teaching-paper" checked={paper === 'letter'} onChange={() => changePaper('letter')} />
                {copy.letter}
              </label>
              <label>
                <input type="radio" name="pg-teaching-paper" checked={paper === 'a4'} onChange={() => changePaper('a4')} />
                {copy.a4}
              </label>
            </fieldset>
            <div className="pg-teaching-pack-actions">
              <a
                className="am-button am-primary"
                href={asset.pdfPath}
                download={asset.suggestedName}
                onClick={() => emitTeachingPackEvent('teaching_pack_download', { resource_id: TEACHING_PACK_ID, paper, page_set: 'full' })}
              >
                {copy.download}
              </a>
              <div className="pg-teaching-pack-secondary">
                <button type="button" className="am-button am-tertiary" ref={printReturnRef} onClick={() => setPrintOpen(true)}>
                  {copy.print}
                </button>
                <button type="button" className="am-button am-tertiary" ref={shareReturnRef} onClick={() => {
                  setShareOpen(true);
                  emitTeachingPackEvent('teaching_pack_share_open', { resource_id: TEACHING_PACK_ID, paper });
                }}>
                  {copy.share}
                </button>
              </div>
            </div>
            <div className="pg-teaching-pack-help">
              <a
                className="am-button am-tertiary"
                href={practiceHref}
                onClick={() => emitTeachingPackEvent('teaching_pack_practice_open', { resource_id: TEACHING_PACK_ID })}
              >
                {copy.practice} →
              </a>
              <p className="pg-teaching-pack-note">{copy.scope}</p>
              <p className="pg-teaching-pack-note">{copy.caveat}</p>
              <p className="pg-teaching-pack-note">
                <a href={worksheetAsset.pdfPath} download={worksheetAsset.suggestedName}>Worksheet-only PDF ({paper === 'a4' ? 'A4' : 'US Letter'})</a>
              </p>
            </div>
          </div>
          <div className="pg-teaching-pack-preview">
            <div className="pg-teaching-pack-paper" data-paper={paper} aria-live="polite">
              <PackPageBody layout={layout} kind={pageKind} pageSet="full" paper={paper} />
            </div>
            <div className="pg-teaching-pack-thumbs" aria-label="Preview page">
              {PAGE_ORDER.map((kind, index) => (
                <PreviewThumb
                  key={kind}
                  layout={layout}
                  kind={kind}
                  active={pageKind === kind}
                  label={`${index + 1}. ${copy.pageLabels[index]}`}
                  onSelect={() => changePage(kind)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pg-teaching-pack-howto kn-screen" aria-labelledby="pg-teaching-pack-howto-title">
        <h2 id="pg-teaching-pack-howto-title">How to use the pack</h2>
        <div className="pg-teaching-pack-howto-grid">
          {PAGE_COPY.howTo.map(item => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <details className="pg-teaching-pack-accessible">
          <summary>{copy.accessible}</summary>
          {PAGE_COPY.accessible.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </details>
      </section>

      <div
        className={`pg-teaching-pack-print-only${printActive ? ' is-print-active' : ''}`}
        data-print-resource={TEACHING_PACK_ID}
        data-print-paper={activePrint.paper}
        data-print-page-set={activePrint.pageSet}
        hidden={!printActive}
        aria-hidden={!printActive}
      >
        {printPages.map(kind => (
          <PackPageBody key={`${activePrint.pageSet}-${kind}`} layout={layout} kind={kind} pageSet={activePrint.pageSet} paper={activePrint.paper} />
        ))}
      </div>

      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        returnFocusRef={shareReturnRef}
        title={copy.shareTitle}
        description={`${copy.shareBody} ${copy.footerInstruction}`}
        url={shareURL}
        shareTitle={copy.shareTitle}
        shareText={copy.shareBody}
        onCopied={(_url, ok) => emitTeachingPackEvent('teaching_pack_share_copy', { resource_id: TEACHING_PACK_ID, ok })}
      />

      <PrintOptionsDialog
        open={printOpen}
        onClose={() => setPrintOpen(false)}
        returnFocusRef={printReturnRef}
        pageSet={pageSet}
        onPageSet={setPageSet}
        onConfirm={() => startPackPrint(pageSet)}
        worksheetHref={worksheetAsset.pdfPath}
        fullHref={asset.pdfPath}
      />
    </>
  );
}

function PrintOptionsDialog({
  open,
  onClose,
  returnFocusRef,
  pageSet,
  onPageSet,
  onConfirm,
  worksheetHref,
  fullHref,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
  pageSet: TeachingPageSet;
  onPageSet: (value: TeachingPageSet) => void;
  onConfirm: () => void;
  worksheetHref: string;
  fullHref: string;
}) {
  const titleId = 'pg-teaching-pack-print-title';
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = document.getElementById('pg-teaching-pack-print-dialog');
    dialog?.querySelector<HTMLElement>('button, a, input')?.focus();
    return () => {
      returnFocusRef.current?.focus();
      previous?.focus?.();
    };
  }, [open, returnFocusRef]);

  if (!open) return null;
  return (
    <div className="pg-teaching-pack-dialog-root" role="presentation">
      <button type="button" className="pg-teaching-pack-dialog-backdrop" aria-label="Close print options" onClick={onClose} />
      <div
        id="pg-teaching-pack-print-dialog"
        className="pg-teaching-pack-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button type="button" className="pg-teaching-pack-dialog-close" aria-label="Close print options" onClick={onClose}>×</button>
        <h2 id={titleId}>Print this pack</h2>
        <p>Choose what to print. The PDF opens with the selected paper size.</p>
        <label className="pg-teaching-pack-choice">
          <input type="radio" name="pg-teaching-pageset" checked={pageSet === 'full'} onChange={() => onPageSet('full')} />
          Full pack · 3 pages
        </label>
        <label className="pg-teaching-pack-choice">
          <input type="radio" name="pg-teaching-pageset" checked={pageSet === 'worksheet'} onChange={() => onPageSet('worksheet')} />
          Worksheet only · 1 page
        </label>
        <div className="pg-teaching-pack-dialog-actions">
          <button type="button" className="am-button am-primary" onClick={onConfirm}>Print with browser</button>
          <a className="am-button am-tertiary" href={pageSet === 'worksheet' ? worksheetHref : fullHref} target="_blank" rel="noopener noreferrer">
            Open print PDF
          </a>
        </div>
        <p className="pg-teaching-pack-note">A print preview is not confirmation that paper was printed.</p>
      </div>
    </div>
  );
}

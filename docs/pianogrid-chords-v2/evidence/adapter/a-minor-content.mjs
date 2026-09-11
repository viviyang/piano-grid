import { readFileSync } from 'node:fs';
import { join } from 'node:path';
// Server-only adapter. Client props contain no whole-site ledger, keywords or base64 PDF.
export function getAMinorContent() {
    const source = JSON.parse(readFileSync(join(process.cwd(), 'docs/content/chords/page-content.json'), 'utf8'));
    const page = source.pages['/chords/a-minor'];
    const blocks = page.blocks;
    const byId = Object.fromEntries(blocks.map(block => [block.block_id, block]));
    const chord = source.shared_data.chords['a-minor'];
    const voicings = page.data.voicing_ids.map((id) => {
        const v = source.shared_data.voicings[id];
        return { voicing_id: v.voicing_id, inversion_label: v.inversion_label, chord_symbol: v.chord_symbol,
            bass_spelling: v.bass_spelling, notes_low_to_high: v.notes_low_to_high.map((n) => ({ display_pitch: n.display_pitch, midi: n.midi })),
            diagram: v.diagram, playback: { together: v.playback.together, ascending: v.playback.ascending }, print_data: v.print_data };
    });
    const intro = byId['am-intro'].content;
    const split = intro.paragraphs[0].indexOf('. ') + 1;
    // Approved final reference adaptation; source JSON stays unchanged.
    const introduction = [intro.paragraphs[0].slice(split + 1), intro.paragraphs[1].replace('The example below', 'The root-position example')];
    const data = {
        url: '/chords/a-minor', namespace: 'am', toolId: 'am-result', pdf: { url: '/assets/chords/a-minor-notes-inversions.pdf', label: 'Download A minor PDF' }, rangeLabel: 'C3–C5',
        defaultId: page.selection.default_voicing_id, options: page.selection.options.map((o) => ({ value: o.value, label: o.label })),
        chord: { name_en: chord.name_en, symbol: chord.symbol, root_spelling: chord.root_spelling, note_spellings: chord.note_spellings, formula_degrees: chord.formula_degrees },
        voicings, whitePitchClasses: source.shared_data.conventions.white_pitch_classes,
        microcopy: page.microcopy, heading: intro.heading, toolHeading: byId['am-result'].content.heading, printDisclaimer: byId['am-find-notes'].content.paragraphs[1],
    };
    const searchSections = blocks.filter(b => !['am-next', 'am-intro'].includes(b.block_id)).map(b => ({ id: b.block_id, heading: b.content.heading, text: JSON.stringify(b.content) }));
    return { metadata: page.metadata, blocks, byId, data, introduction,
        answer: intro.paragraphs[0].slice(0, split), searchSections };
}

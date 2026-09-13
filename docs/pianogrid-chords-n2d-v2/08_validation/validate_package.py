#!/usr/bin/env python3
"""Validate N2D v2 authoring data and reject seeded errors. No network or dependencies.

Run from any directory. This is NOT a test of the user's Next.js application.
"""
from pathlib import Path
from collections import Counter
import argparse
import copy
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
NAT = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
ACC = {'': 0, '♭': -1, '♯': 1, '𝄫': -2, '𝄪': 2}
NOTE = re.compile(r'^([A-G])(♭|♯|𝄫|𝄪)?(-?\d+)?$')
LETTERS = 'CDEFGAB'
CHECKS = 0

def load(p):
    return json.loads((ROOT / p).read_text(encoding='utf-8'))

def check(ok, message):
    global CHECKS
    CHECKS += 1
    if not ok:
        raise ValueError(message)

def parsed(s):
    m = NOTE.fullmatch(s)
    if m is None:
        raise ValueError('Bad pitch spelling: ' + str(s))
    return m[1], ACC[m[2] or ''], None if m[3] is None else int(m[3])

def pitch_class(s):
    l, a, _ = parsed(s)
    return (NAT[l] + a) % 12

def midi(s):
    l, a, octave = parsed(s)
    if octave is None:
        raise ValueError('Missing octave: ' + str(s))
    return 12 * (octave + 1) + NAT[l] + a

def validate_detail(d, golden, source_ids):
    tag = d.get('id', '<missing-id>')
    check(d.get('schemaVersion') == 'N2D-2.0', tag + ': schema version')
    check(d.get('family') == 'add', tag + ': family')
    check(d['subtype'] in ('add9', 'minorAdd9'), tag + ': subtype')
    check(d['url'] == '/chords/' + tag, tag + ': route')
    check(d['categoryRoute'] == '/chords/add', tag + ': category')
    third = '3' if d['subtype'] == 'add9' else '♭3'
    third_semi = 4 if d['subtype'] == 'add9' else 3
    degrees = ['1', third, '5', '9']
    offsets = [0, third_semi, 7, 2]
    definition = d['definition']
    check(definition['formulaDegrees'] == degrees, tag + ': formula')
    check(definition['expectedUniquePitchClassCount'] == 4, tag + ': expected size')
    check(definition['requiredDegrees'] == degrees, tag + ': required degrees')
    check(definition['optionalDegrees'] == [], tag + ': optional degrees')
    check(set(definition['forbiddenDegrees']) == {'7', '♭7'}, tag + ': forbidden seventh')
    components = definition['components']
    check(len(components) == 4, tag + ': component count')
    check([x['spelling'] for x in components] == golden[tag], tag + ': golden spelling')
    check(len({pitch_class(x['spelling']) for x in components}) == 4, tag + ': unique classes')
    root_pc = pitch_class(d['rootSpelling'])
    root_letter = LETTERS.index(d['rootSpelling'][0])
    for i, (c, deg, offset) in enumerate(zip(components, degrees, offsets)):
        check(c['degree'] == deg, tag + ': degree order')
        check(c['spelling'][0] == LETTERS[(root_letter + [0, 2, 4, 1][i]) % 7], tag + ': diatonic letter')
        check(c['pitchClass'] == pitch_class(c['spelling']), tag + ': component PC')
        check(c['semitonesMod12'] == offset, tag + ': semitone annotation')
        check((c['pitchClass'] - root_pc) % 12 == offset, tag + ': interval')
    check(set(d['sourceIds']) <= source_ids, tag + ': source reference')
    check(d['positionPolicy']['kind'] == 'voicingExamples', tag + ': position policy')
    check(d['positionPolicy']['enumerateInversions'] is False, tag + ': not inversion catalogue')
    rs = d['realizations']
    check(len(rs) == 2, tag + ': two examples')
    check([r['id'] for r in rs] == ['ninth-above', 'added-note-inside'], tag + ': realization IDs')
    check(d['positionPolicy']['defaultRealizationId'] == 'ninth-above', tag + ': default')
    comp_map = {c['degree']: c for c in components}
    for r in rs:
        prefix = tag + ':' + r['id']
        names, mm, dd = r['notesLowToHigh'], r['midiLowToHigh'], r['realizedDegrees']
        check(len(names) == len(mm) == len(dd) == 4, prefix + ': sizes')
        check(mm == sorted(set(mm)), prefix + ': strict low-to-high')
        check([midi(n) for n in names] == mm, prefix + ': octave spelling/MIDI')
        check({m % 12 for m in mm} == {c['pitchClass'] for c in components}, prefix + ': definition/realization membership')
        check(set(dd) == set(degrees), prefix + ': realized degrees complete')
        for n, m, degree in zip(names, mm, dd):
            check(degree in comp_map, prefix + ': unknown degree')
            c = comp_map[degree]
            check(re.sub(r'-?\d+$', '', n) == c['spelling'], prefix + ': written degree mapping')
            check(m % 12 == c['pitchClass'], prefix + ': sounding degree mapping')
        expected_dd = degrees if r['id'] == 'ninth-above' else ['1', '9', third, '5']
        expected_intervals = [0, third_semi, 7, 14] if r['id'] == 'ninth-above' else [0, 2, third_semi, 7]
        check(dd == expected_dd, prefix + ': degree ordering')
        check([m - mm[0] for m in mm] == expected_intervals, prefix + ': this example register')
        check(r['intervalsFromBassSemitones'] == expected_intervals, prefix + ': interval metadata')
        check(r['bass'] == {'spelling': names[0], 'midi': mm[0], 'degree': '1'}, prefix + ': bass')
        check(mm[0] % 12 == root_pc, prefix + ': root bass example')
        check(r['omittedDegrees'] == [] and r['doubledDegrees'] == [], prefix + ': omitted/doubled')
        kb = r['keyboard']
        check(kb['highlightMidi'] == mm and kb['highlightLabels'] == names, prefix + ': keyboard sync')
        check(all(kb['minimumMidi'] <= m <= kb['maximumMidi'] for m in mm), prefix + ': keyboard clipping')
        check(kb['minimumMidi'] == 48 and kb['maximumMidi'] == 76 and kb['rangeLabel'] == 'C3–E5', prefix + ': range label')
        for mode, expected_midis in [('together', mm), ('ascending', mm), ('descending', list(reversed(mm)))]:
            events = r['playback'][mode]
            check(len(events) == 4, prefix + ':' + mode + ': event count')
            check([e['midi'] for e in events] == expected_midis, prefix + ':' + mode + ': event notes')
            check([e['onsetMs'] for e in events] == ([0] * 4 if mode == 'together' else [0, 600, 1200, 1800]), prefix + ':' + mode + ': onset')
            check(all(e['durationMs'] == 1400 for e in events), prefix + ':' + mode + ': duration')
        check(r['print'] == {'pitches': names, 'midi': mm, 'formulaDegrees': dd}, prefix + ': print')
        check(r['fingering'] == {'status': 'not_provided', 'left': None, 'right': None}, prefix + ': no invented fingers')
        check(r['provenance']['teacherReviewed'] is False, prefix + ': teacher status')
    tasks = {m['id']: m for m in d['practice']['modes']}
    check(set(tasks) == {'chordTones', 'matchExample'}, tag + ': tasks')
    check(tasks['chordTones']['matchKind'] == 'pitchClassSet', tag + ': tone matching')
    check(tasks['chordTones']['ignoreOctave'] and tasks['chordTones']['allowOctaveDoublings'], tag + ': tone octave handling')
    check(tasks['chordTones']['expectedPitchClasses'] == sorted(c['pitchClass'] for c in components), tag + ': tone answers')
    check(tasks['matchExample']['matchKind'] == 'exactMidiSet', tag + ': exact matching')
    check(not tasks['matchExample']['ignoreOctave'] and not tasks['matchExample']['allowOctaveDoublings'], tag + ': exact octave handling')
    check(tasks['matchExample']['target'] == 'activeRealization', tag + ': active target')
    check(d['seo']['canonical'] == 'https://pianogrid.com' + d['url'], tag + ': canonical')
    check(d['seo']['keywordVolume'] is None, tag + ': no fabricated volume')
    check(d['symbol'] in d['seo']['title'] and d['symbol'] in d['content']['directAnswer'], tag + ': correct object copy')
    check(d['assets']['status'] == 'to_generate_and_validate_in_repository', tag + ': asset status')
    check(d['fingering']['status'] == 'not_provided', tag + ': fingering policy')
    for block in d['content']['blocks']:
        check(set(block.get('sourceIds', [])) <= source_ids, tag + ': block source')

def grade(d, mode, active_id, selected):
    selected_set = set(selected)
    if not selected_set:
        return 'empty'
    expected_pcs = {c['pitchClass'] for c in d['definition']['components']}
    actual_pcs = {m % 12 for m in selected_set}
    if mode == 'chordTones':
        return 'correct' if actual_pcs == expected_pcs else 'incorrect'
    if mode != 'matchExample':
        raise ValueError('Unknown task')
    active = next(r for r in d['realizations'] if r['id'] == active_id)
    if selected_set == set(active['midiLowToHigh']):
        return 'correct'
    return 'same_tones_different_voicing' if actual_pcs == expected_pcs else 'incorrect'

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    files = sorted((ROOT / '03_content/details').glob('*.page.json'))
    pages = [json.loads(f.read_text(encoding='utf-8')) for f in files]
    check(len(pages) == 24, 'Exactly 24 detail files required')
    by_id = {p['id']: p for p in pages}
    check(len(by_id) == 24, 'Unique IDs')
    check(Counter(p['subtype'] for p in pages) == {'add9': 12, 'minorAdd9': 12}, '12/12')
    golden = load('08_validation/golden-definitions.json')
    check(set(golden) == set(by_id), 'golden oracle coverage')
    source_ids = {s['id'] for s in load('07_sources/source-ledger.json')}
    for p in pages:
        validate_detail(p, golden, source_ids)
    category = load('03_content/add.category.page.json')
    check(category['url'] == '/chords/add', 'category route')
    check(set(category['detailIds']) == set(by_id), 'category coverage')
    lock = load('01_decision/scope-lock.json')
    expected_routes = {category['url']} | {p['url'] for p in pages}
    check(len(expected_routes) == 25 and set(lock['routes']) == expected_routes, '25 route whitelist')
    seo = load('04_seo/route-seo.manifest.json')
    by_url = {p['url']: p for p in pages + [category]}
    check({r['url'] for r in seo} == expected_routes, 'SEO route set')
    check(len({r['title'] for r in seo}) == 25, 'Unique SEO titles')
    for item in seo:
        for key, value in by_url[item['url']]['seo'].items():
            check(item[key] == value, 'Generated SEO mirror: ' + key)
    baseline = set(load('01_decision/baseline.chord-routes.json')['routes'])
    check(len(baseline) == 133, 'Historical chord subset size')
    for l in load('05_navigation_links/internal-links.json'):
        check(l['from'] in baseline | expected_routes and l['to'] in baseline | expected_routes, 'Known link boundary')
        check(bool(l['anchor'].strip()), 'Descriptive anchor required')
    assets = load('06_assets/asset-inputs.json')
    check(not assets['filesAreGeneratedHere'], 'Do not imply binary assets exist')
    check({a['page'] for a in assets['files']} == {p['url'] for p in pages}, '24 asset inputs')
    for a in assets['files']:
        p = by_url[a['page']]
        check(a['pdf'] == p['assets']['pdf'] and a['svg'] == p['assets']['svg'], 'asset mirror')
    cases = load('08_validation/practice-cases.json')
    check(len({c['id'] for c in cases}) == len(cases), 'Unique practice cases')
    for case in cases:
        check(grade(by_id[case['detailId']], case['mode'], case['activeRealizationId'], case['selectedMidi']) == case['expectedStatus'], case['id'])
    # Seed data errors in memory and confirm the semantic validator rejects them.
    def bad_membership(d):
        r = d['realizations'][0]
        r['notesLowToHigh'][1] = 'F3'; r['midiLowToHigh'][1] = 53
        r['keyboard']['highlightMidi'][1] = 53; r['keyboard']['highlightLabels'][1] = 'F3'
        for mode in ('together', 'ascending', 'descending'):
            for event in r['playback'][mode]:
                if event['midi'] == 52:
                    event['midi'] = 53
        r['print']['pitches'][1] = 'F3'; r['print']['midi'][1] = 53
    def bad_letter(d):
        d['definition']['components'][1]['spelling'] = 'F♭'
    def bad_low_register(d):
        r = d['realizations'][1]
        # Convert lower example to higher one while keeping its semantic ID.
        h = copy.deepcopy(d['realizations'][0])
        h['id'] = r['id']; d['realizations'][1] = h
    changes = [
        ('definition_realization_mismatch', bad_membership),
        ('enharmonic_wrong_diatonic_letter', bad_letter),
        ('forbidden_seventh_annotation', lambda d: d['definition'].__setitem__('forbiddenDegrees', [])),
        ('missing_realized_degree', lambda d: d['realizations'][0]['realizedDegrees'].pop()),
        ('clipped_ninth', lambda d: d['realizations'][0]['keyboard'].__setitem__('maximumMidi', 60)),
        ('wrong_bass', lambda d: d['realizations'][0]['bass'].__setitem__('degree', '9')),
        ('sound_mode_mixup', lambda d: d['realizations'][0]['playback']['together'][1].__setitem__('onsetMs', 600)),
        ('print_desynchronization', lambda d: d['realizations'][0]['print']['pitches'].__setitem__(1, 'F3')),
        ('false_teacher_badge', lambda d: d['realizations'][0]['provenance'].__setitem__('teacherReviewed', True)),
        ('universal_exact_task', lambda d: d['practice']['modes'][0].__setitem__('ignoreOctave', False)),
        ('wrong_example_register', bad_low_register),
        ('unknown_source', lambda d: d['sourceIds'].append('FAKE-SOURCE')),
    ]
    negative_results = []
    for name, mutate in changes:
        bad = copy.deepcopy(by_id['c-add9'])
        mutate(bad)
        try:
            validate_detail(bad, golden, source_ids)
        except (ValueError, KeyError, IndexError, TypeError) as e:
            negative_results.append({'id': name, 'rejected': True, 'message': str(e)})
        else:
            raise ValueError('Seeded error escaped validation: ' + name)
    report = {
        'status': 'PASS', 'scope': 'authoring package only; application not run',
        'detailDefinitions': 24, 'explicitRealizations': 48, 'plannedPublicUrls': 25,
        'practiceCases': len(cases), 'rejectedSeededErrors': len(negative_results),
        'checksExecutedIncludingNegativeRuns': CHECKS,
        'mutationResults': negative_results,
        'repositoryBuild': 'NOT_RUN', 'liveDeployment': 'NOT_VERIFIED',
        'humanAudioPrintScreenReaderTeacherReview': 'NOT_PERFORMED'
    }
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        print('FAIL: ' + str(exc), file=sys.stderr)
        sys.exit(1)

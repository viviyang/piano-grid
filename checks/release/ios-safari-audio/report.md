# iPhone Safari Web Audio compatibility fix

- Date: 2026-09-11
- User-reported device: iPhone Safari, iOS 26.6.1
- Reported symptom: tapping a piano key changes the control to `Stop sound` and highlights the key, but produces no audible output
- Scope: shared synthesized Web Audio engine only
- Deployment: not performed

## Implementation

- [已核实] `ReferenceAudio.play()` now requests `navigator.audioSession.type = "playback"` when Safari exposes the Audio Session API.
- [已核实] Oscillator nodes are created, connected and started before the first `await`, keeping source activation inside the trusted tap/click task.
- [已核实] A context used while the document becomes hidden is closed and discarded instead of being reused after foregrounding.
- [已核实] An unexpected non-running state during playback also discards the affected context.
- [已核实] The change is shared by homepage keys/chords, chord pages, keyboard-note tools and scale tools.

## Validation

| Check | Result |
| --- | --- |
| `npm run check` | PASS; Foundation 564/564, TypeScript and CSS PASS |
| `npm run build` | PASS; 17 authorized business routes generated |
| iOS activation-order compatibility harness | PASS; 5/5 |
| Local production integration | PASS; 125/125 |
| Local browser integration | PASS; 237/237 |

The compatibility harness verifies:

1. playback audio-session selection occurs;
2. `oscillator.start()` occurs before `AudioContext.resume()` returns control across an await;
3. a mobile key reaches the playing state;
4. backgrounding closes the old context;
5. the next tap creates a fresh context.

## Evidence limit

- [未测试或待确认] Automated browsers cannot confirm that an iPhone speaker emitted audible sound.
- [未测试或待确认] The user must retest on the same iPhone Safari after this code is deployed through the separately authorized production workflow.
- [已核实] This task did not deploy or modify production configuration.

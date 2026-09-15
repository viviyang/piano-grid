'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  formatPracticeTime,
  PRACTICE_TIMER_BOUNDARY,
  PRACTICE_TIMER_PRESETS,
  PracticeTimerController,
} from '@/lib/practice-timer';

export function PracticeTimer() {
  const [controller] = useState(() => new PracticeTimerController());
  const timer = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot);
  useEffect(() => () => controller.dispose(), [controller]);
  const locked = timer.state === 'running' || timer.state === 'paused';

  return <section className="in-practice-timer" id="practice-timer" tabIndex={-1} aria-labelledby="practice-timer-title">
    <div className="in-section-head"><p>Focused practice block</p><h2 id="practice-timer-title">Practice Timer</h2></div>
    <div className="in-timer-panel">
      <div className="in-timer-setup">
        <fieldset disabled={locked}>
          <legend>Choose minutes</legend>
          <div className="in-timer-presets">{PRACTICE_TIMER_PRESETS.map(minutes => <button type="button" className={timer.selectedMinutes === minutes && !timer.validationMessage ? 'is-selected' : ''} aria-pressed={timer.selectedMinutes === minutes && !timer.validationMessage} onClick={() => controller.selectPreset(minutes)} key={minutes}>{minutes} min</button>)}</div>
          <label className="in-timer-custom">Custom minutes
            <input type="text" inputMode="numeric" value={timer.customInput} aria-describedby="practice-timer-range practice-timer-error" aria-invalid={Boolean(timer.validationMessage)} onChange={event => controller.setCustomInput(event.target.value)}/>
          </label>
          <p id="practice-timer-range" className="in-timer-help">Whole minutes from 1 to 120.</p>
          <p id="practice-timer-error" className="in-timer-error">{timer.validationMessage}</p>
        </fieldset>
      </div>
      <div className="in-timer-clock">
        <p className="in-timer-state">{timer.state}</p>
        <output role="timer" aria-label={`${formatPracticeTime(timer.remainingSeconds)} remaining`}>{formatPracticeTime(timer.remainingSeconds)}</output>
        <div className="in-timer-actions">
          {timer.state === 'idle' && <button className="am-button am-primary" type="button" disabled={Boolean(timer.validationMessage)} onClick={() => controller.start()}>Start</button>}
          {timer.state === 'running' && <button className="am-button am-primary" type="button" onClick={() => controller.pause()}>Pause</button>}
          {timer.state === 'paused' && <button className="am-button am-primary" type="button" onClick={() => controller.resume()}>Resume</button>}
          {timer.state === 'complete' && <button className="am-button am-primary" type="button" onClick={() => controller.startAgain()}>Start again</button>}
          {timer.state !== 'idle' && <button className="am-button" type="button" onClick={() => controller.reset()}>Reset</button>}
        </div>
        <p className="in-timer-announcement" aria-live="polite" aria-atomic="true">{timer.announcement}</p>
      </div>
    </div>
    <p className="in-timer-boundary">{PRACTICE_TIMER_BOUNDARY}</p>
  </section>;
}

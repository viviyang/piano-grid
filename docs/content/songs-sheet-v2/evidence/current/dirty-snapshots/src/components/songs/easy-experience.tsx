'use client';

import { useEffect, useMemo, useState } from 'react';
import type { SongGoal, SongResource } from '@/lib/song-types';
import { SongResourceCard } from './resource-card';

export function EasySongChooser({ resources, sections }: { resources: SongResource[]; sections: SongGoal[] }) {
  const [ready, setReady] = useState(false);
  const [section, setSection] = useState('all');
  useEffect(() => setReady(true), []);
  const shown = useMemo(() => {
    const ids = sections.find((item) => item.id === section)?.resourceIDs;
    return ids ? resources.filter((resource) => ids.includes(resource.id)) : resources;
  }, [resources, section, sections]);
  return <section className="sg-easy-chooser" aria-labelledby="sg-easy-heading">
    <div className="sg-discovery-head"><div><p className="sg-overline">Nine specific versions</p><h2 id="sg-easy-heading">Choose by starting point</h2></div><p>Each view keeps the exact arrangement, acquisition route and reason for choosing it together.</p></div>
    <fieldset className="sg-topic-choices" disabled={!ready}><legend>Show versions for</legend><label><input type="radio" name="easy-topic" value="all" checked={section === 'all'} onChange={() => setSection('all')}/><span>All featured</span></label>{sections.map((item) => <label key={item.id}><input type="radio" name="easy-topic" value={item.id} checked={section === item.id} onChange={() => setSection(item.id)}/><span>{item.label}</span></label>)}</fieldset>
    <p className="sg-result-note" aria-live="polite">Showing {shown.length} {shown.length === 1 ? 'version' : 'versions'} in editorial use-case order.</p>
    <div className="sg-resource-list">{shown.map((resource) => <SongResourceCard resource={resource} key={resource.id}/>)}</div>
  </section>;
}

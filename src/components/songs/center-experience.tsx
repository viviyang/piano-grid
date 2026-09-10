'use client';

import { useEffect, useMemo, useState } from 'react';
import type { SongGoal, SongResource } from '@/lib/song-types';
import { SongResourceCard } from './resource-card';

export function SongCenterExperience({ resources, goals }: { resources: SongResource[]; goals: SongGoal[] }) {
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('all');
  const [goal, setGoal] = useState('all');
  useEffect(() => setReady(true), []);
  const levels = useMemo(() => [...new Set(resources.flatMap((resource) => resource.level ? [resource.level] : []))], [resources]);
  const shown = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    const goalIDs = goal === 'all' ? null : new Set(goals.find((item) => item.id === goal)?.resourceIDs ?? []);
    return resources.filter((resource) => {
      const haystack = [resource.workTitle, resource.artist, resource.edition].filter(Boolean).join(' ').toLocaleLowerCase();
      return (!normalized || haystack.includes(normalized)) && (level === 'all' || resource.level === level) && (!goalIDs || goalIDs.has(resource.id));
    });
  }, [goal, goals, level, query, resources]);
  const clear = () => { setQuery(''); setLevel('all'); setGoal('all'); };
  return <section className="sg-discovery" aria-labelledby="sg-find-heading">
    <div className="sg-discovery-head"><div><p className="sg-overline">Version-led discovery</p><h2 id="sg-find-heading">Find a checked edition</h2></div><p>Search titles and editions, then narrow only by publisher labels and editorial goals that have real matches.</p></div>
    <div className="sg-filters" aria-label="Song filters">
      <label className="sg-search"><span>Search title, artist or edition</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Gymnopédie or Minecraft" disabled={!ready}/></label>
      <label><span>Publisher level</span><select value={level} onChange={(event) => setLevel(event.target.value)} disabled={!ready}><option value="all">All publisher levels</option>{levels.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label><span>Playing goal</span><select value={goal} onChange={(event) => setGoal(event.target.value)} disabled={!ready}><option value="all">All playing goals</option>{goals.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label>
      <button className="am-button am-secondary" type="button" onClick={clear} disabled={!ready || (!query && level === 'all' && goal === 'all')}>Clear filters</button>
    </div>
    <div className="sg-results-heading"><p aria-live="polite"><strong>{shown.length}</strong> {shown.length === 1 ? 'edition' : 'editions'}</p><p>Labels apply to the named arrangement or collection.</p></div>
    {shown.length ? <div className="sg-resource-list">{shown.map((resource) => <SongResourceCard resource={resource} key={resource.id}/>)}</div> : <div className="sg-empty"><h3>No checked edition matches</h3><p>Clear one or more filters to return to the six available editions.</p><button className="am-button am-primary" type="button" onClick={clear}>Show all editions</button></div>}
  </section>;
}

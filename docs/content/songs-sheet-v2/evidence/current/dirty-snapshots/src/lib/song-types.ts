export type SongURL = '/songs' | '/songs/easy';

export type SongBlock = {
  id: string;
  heading: string;
  body: string;
  evidenceStatus: string;
  sourceIDs: string[];
};

export type SongRights = {
  work_status: string;
  edition_status: string;
  site_use: string;
  redistribute_score: boolean;
  redistribute_recording: boolean;
  reason: string;
};

export type SongResource = {
  id: string;
  workTitle: string;
  creator: string | null;
  artist: string | null;
  arranger: string | null;
  edition: string;
  editionID: string | null;
  publisher: string;
  format: string;
  level: string | null;
  levelBasis: string;
  key: string | null;
  technicalDemands: string | null;
  whyChoose: string | null;
  firstCheck: string | null;
  editionFeatures: string | null;
  access: string;
  acquisitionFormat: string;
  resourceURL: string;
  rights: SongRights;
  sourceIDs: string[];
  selectionRole: string | null;
};

export type SongPageModel = {
  url: SongURL;
  templateID: 'T15' | 'T16';
  title: string;
  description: string;
  userTask: string;
  metadata: { title: string; description: string; canonicalPath: string };
  blocks: SongBlock[];
  sourceGroups: string[];
};

export type SongGoal = { id: string; label: string; resourceIDs: string[] };

export type SongCenterData = {
  model: SongPageModel;
  resources: SongResource[];
  goals: SongGoal[];
  levels: string[];
  easyURLAvailable: boolean;
};

export type EasySongsData = {
  model: SongPageModel;
  featuredResources: SongResource[];
  catalogResources: SongResource[];
  sections: SongGoal[];
  counts: { featuredVersions: number; catalogTracks: number; individuallyPerformanceTested: number };
  numberQueryPolicy: string;
  sort: string;
  audioPolicy: string;
};

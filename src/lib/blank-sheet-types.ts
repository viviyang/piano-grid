export type PaperID = 'letter' | 'a4';
export type BlankSheetAsset = {
  id: PaperID;
  label: string;
  dimensions: string;
  url: string;
  pages: number;
  grandStaffSystems: number;
  access: string;
};
export type BlankSheetModel = {
  url: '/tools/blank-sheet-music';
  title: string;
  description: string;
  blocks: { id: string; heading: string; body: string }[];
  metadata: { title: string; description: string; canonicalPath: string };
  assets: BlankSheetAsset[];
  previewURL: string;
  notation: { staffLines: number; clefs: string[]; systemCount: number; musicContent: string };
  accountRequired: false;
  sourceGroups: string[];
};

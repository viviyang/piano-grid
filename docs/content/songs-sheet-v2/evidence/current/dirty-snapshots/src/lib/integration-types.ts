export type IntegrationAction = { label: string; url: string };
export type IntegrationBlock = { id: string; heading: string; body: string; actions?: IntegrationAction[] };
export type Destination = { label: string; url: string; available: boolean };
export type PrintableDestination = Destination & { task: string; downloadURL: string | null };
export type IntegrationPageModel = { url: '/' | '/tools'; title: string; description: string; metadata: { title: string; description: string; canonicalPath: string }; blocks: IntegrationBlock[] };
export type HomeModel = { model: IntegrationPageModel; primaryTasks: Destination[]; secondaryLink: Destination; firstAction: { notes: string[]; instruction: string } };
export type ToolsModel = { model: IntegrationPageModel; lookupLinks: Destination[]; printables: PrintableDestination[] };

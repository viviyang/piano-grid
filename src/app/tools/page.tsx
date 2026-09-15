import { editorialMetadata } from '@/lib/seo-editorial';
import { ToolsPage } from '@/components/integration/pages';
import { getToolsModel } from '@/lib/integration-content';

const {metadata:meta}=getToolsModel().model;
export const metadata=editorialMetadata({title:meta.title,description:meta.description,alternates:{canonical:meta.canonicalPath},robots:{index:true,follow:true}});
export default ToolsPage;

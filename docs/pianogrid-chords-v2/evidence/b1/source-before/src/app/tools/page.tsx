import { ToolsPage } from '@/components/integration/pages';
import { getToolsModel } from '@/lib/integration-content';

const {metadata:meta}=getToolsModel().model;
export const metadata={title:meta.title,description:meta.description,alternates:{canonical:meta.canonicalPath},robots:{index:true,follow:true}};
export default ToolsPage;

import { HomePage } from '@/components/integration/pages';
import { getHomeModel } from '@/lib/integration-content';

const {metadata:meta}=getHomeModel().model;
export const metadata={title:meta.title,description:meta.description,alternates:{canonical:meta.canonicalPath},robots:{index:false,follow:false}};
export default HomePage;

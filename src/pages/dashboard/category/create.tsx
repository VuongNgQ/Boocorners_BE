import { Helmet } from 'react-helmet-async';

import CategoryCreateView from 'src/sections/_dashboard/category/view/category-create-view';

const metadata = { title: `Create new category` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <CategoryCreateView />
    </>
  );
}

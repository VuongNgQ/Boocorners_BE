import { Helmet } from 'react-helmet-async';

import CategoryListView from 'src/sections/_dashboard/category/view/category-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Category list` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CategoryListView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';

import ProductListView from 'src/sections/_dashboard/product/view/product-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Product list` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductListView />
    </>
  );
}

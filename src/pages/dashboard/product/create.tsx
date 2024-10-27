import { Helmet } from 'react-helmet-async';

import ProductCreateView from 'src/sections/_dashboard/product/view/product-create-view';

const metadata = { title: `Create new product` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ProductCreateView />
    </>
  );
}

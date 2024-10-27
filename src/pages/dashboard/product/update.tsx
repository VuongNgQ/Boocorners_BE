import type { Product } from 'src/types/product';

import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useGetProductById } from 'src/actions/product';

import ProductUpdateView from 'src/sections/_dashboard/product/view/product-update-view ';

const metadata = { title: `Update product` };

export default function Page() {
  const { id = '' } = useParams();
  const { product, productError, productLoading } = useGetProductById({ id });
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ProductUpdateView
        currentRecord={product as Product}
        empty={productError}
        loading={productLoading}
      />
    </>
  );
}

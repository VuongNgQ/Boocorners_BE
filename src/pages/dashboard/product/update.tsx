import type { Product } from 'src/types/product';

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useGetProductById } from 'src/actions/product';

import ProductUpdateView from 'src/sections/_dashboard/product/view/product-update-view ';

const metadata = { title: `Update product` };

export default function Page() {
  const { id = '' } = useParams();

  const { product, productError, productLoading, productMutate } = useGetProductById({ id });

  useEffect(() => {
    productMutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

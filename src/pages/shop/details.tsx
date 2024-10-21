import { Helmet } from 'react-helmet-async';

import { Box, CircularProgress } from '@mui/material';

import { useParams } from 'src/routes/hooks';

import { useGetProductById } from 'src/actions/product';

import ShopDetailsView from 'src/sections/shop/view/shop-details-view';

// ----------------------------------------------------------------------

const metadata = { title: `Product details` };

export default function Page() {
  const { slug = '' } = useParams();

  // Assume loading is handled within the hook
  const { product, productLoading, productError } = useGetProductById({ id: slug });

  if (productLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (productError) {
    return <Box>Error loading product details</Box>;
  }

  if (!product) {
    return <Box>Product not found</Box>;
  }

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box sx={{ height: { xs: 88, md: 200 } }} />
      <ShopDetailsView product={product} loading={false} error={false} />
    </>
  );
}

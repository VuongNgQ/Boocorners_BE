import { Helmet } from 'react-helmet-async';

import { Box, CircularProgress } from '@mui/material';

import { useParams } from 'src/routes/hooks';

import { useGetProductById } from 'src/actions/product';

import ShopDetailsView from 'src/sections/shop/view/shop-details-view';

// ----------------------------------------------------------------------

const metadata = { title: `Product details` };

export default function Page() {
  const { slug = '' } = useParams();
  let content;
  // Assume loading is handled within the hook
  const { product, productLoading, productError } = useGetProductById({ id: slug });

  if (productLoading) {
    content = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          mb: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (productError) {
    content = <Box>Error loading product details</Box>;
  }

  if (!product) {
    content = <Box sx={{ textAlign: 'center', pb: 12, pt: 3 }}>Product not found</Box>;
  } else content = <ShopDetailsView product={product} />;

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box sx={{ height: { xs: 88, md: 200 } }} />
      {content}
    </>
  );
}

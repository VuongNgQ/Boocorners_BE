import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import ShopView from 'src/sections/shop/view/shop-view';

// ----------------------------------------------------------------------

const metadata = { title: `Shop now!` };

export default function Page() {
  //   const { products, productsLoading } = useGetProducts();

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          height: { xs: 88, md: 200 },
        }}
      />
      <ShopView loading={false} />
    </>
  );
}

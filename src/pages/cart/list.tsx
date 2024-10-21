import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import CartView from 'src/sections/cart/view/cart-view';

// ----------------------------------------------------------------------

const metadata = { title: `Your cart` };

export default function Page() {
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
      <CartView />
    </>
  );
}

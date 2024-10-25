import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import OnSaleView from 'src/sections/on-sale/view/on-sale-view';

// ----------------------------------------------------------------------

const metadata = { title: `On Sale!` };

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
      <OnSaleView />
    </>
  );
}

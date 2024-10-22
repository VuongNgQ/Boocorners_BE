import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import OrderStatusView from 'src/sections/order/view/order-status-view';

// ----------------------------------------------------------------------

const metadata = { title: `Oops! Order failed` };

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
      <OrderStatusView status="failed" />
    </>
  );
}

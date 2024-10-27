import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import OrderStatusView from 'src/sections/order/view/order-status-view';

// ----------------------------------------------------------------------

const metadata = { title: `Oops! Order failed` };

export default function Page() {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const orderID = queryParams.get('id');

  // useEffect(() => {
  //   const handleCancelOrder = () => {
  //     if (orderID) {
  //       cancelOrder(orderID);
  //     } else {
  //       console.error('Order ID is undefined');
  //     }
  //   };

  //   handleCancelOrder();
  // }, [orderID]);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
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

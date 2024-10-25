import { Helmet } from 'react-helmet-async';

import OrderListView from 'src/sections/_dashboard/order/view/order-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Order list` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OrderListView />
    </>
  );
}

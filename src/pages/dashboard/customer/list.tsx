import { Helmet } from 'react-helmet-async';

import CustomerListView from 'src/sections/_dashboard/customer/view/customer-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Customer list` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CustomerListView />
    </>
  );
}

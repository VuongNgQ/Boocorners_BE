import { Helmet } from 'react-helmet-async';

import { OverviewAnalyticsView } from 'src/sections/_dashboard/analytics/view';

// ----------------------------------------------------------------------

const metadata = { title: `Dashboard` };

export default function OverviewAppPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}

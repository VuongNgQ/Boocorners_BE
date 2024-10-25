import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function CustomerListView() {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Customer List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Customer', href: paths.dashboard.customer.root },
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      list
    </DashboardContent>
  );
}

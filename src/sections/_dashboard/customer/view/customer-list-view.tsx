import { useState } from 'react';

import { paths } from 'src/routes/paths';

import { useGetCustomers } from 'src/actions/customer';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CustomerList from '../customer-list';

export default function CustomerListView() {
  const [pageSize, setPageSize] = useState(10);

  const [page, setPage] = useState(0);

  const { customers, customersLoading, customerPaginate } = useGetCustomers({
    page,
    pageSize,
  });
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Danh sách khách hàng"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Khách hàng', href: paths.dashboard.customer.root },
          { name: 'Danh sách' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      Danh sách
      <CustomerList
        data={customers}
        loading={customersLoading}
        rowCount={customerPaginate.totalElements}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </DashboardContent>
  );
}

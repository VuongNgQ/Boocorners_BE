import { useState } from 'react';

import { paths } from 'src/routes/paths';

import { useGetOrdersN } from 'src/actions/order';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import OrderList from '../order-list';

export default function OrderListView() {
  const [pageSize, setPageSize] = useState(10);

  const [page, setPage] = useState(0);

  const { orders, ordersLoading, ordersPaginate } = useGetOrdersN({
    page,
    pageSize,
  });

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Order List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Order', href: paths.dashboard.order.root },
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <OrderList
        data={orders}
        loading={ordersLoading}
        rowCount={ordersPaginate.totalElements}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </DashboardContent>
  );
}

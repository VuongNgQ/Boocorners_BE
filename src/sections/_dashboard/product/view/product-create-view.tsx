import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import ProductCreateEditForm from '../product-create-edit-form';

export default function ProductCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Tạo mới sản phẩm"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Sản phẩm', href: paths.dashboard.product.root },
          { name: 'Tạo mới' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProductCreateEditForm />
    </DashboardContent>
  );
}

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import ProductCreateEditForm from '../product-create-edit-form';

import type { ProductCreateEditFormProps } from '../product-create-edit-form';

export default function ProductUpdateView(props: ProductCreateEditFormProps) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Chỉnh sửa sản phẩm"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Sản phẩm', href: paths.dashboard.product.root },
          { name: props?.currentRecord?.productName },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        loading={!!props?.loading}
      />

      <ProductCreateEditForm {...props} />
    </DashboardContent>
  );
}

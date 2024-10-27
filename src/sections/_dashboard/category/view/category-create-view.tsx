import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CategoryCreateEditForm from '../category-create-edit-form';

export default function CategoryCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Tạo mới loại sản phẩm"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Loại sản phẩm', href: paths.dashboard.category.root },
          { name: 'Tạo mới' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CategoryCreateEditForm />
    </DashboardContent>
  );
}

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CategoryCreateEditForm from '../category-create-edit-form';

import type { CategoryCreateEditFormProps } from '../category-create-edit-form';

export default function CategoryUpdateView(props: CategoryCreateEditFormProps) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Chỉnh sửa loại sản phẩm"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Loại sản phẩm', href: paths.dashboard.category.root },
          { name: props?.currentRecord?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        loading={!!props?.loading}
      />

      <CategoryCreateEditForm {...props} />
    </DashboardContent>
  );
}

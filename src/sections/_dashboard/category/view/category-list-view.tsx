import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetCategories } from 'src/actions/category';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CategoryList from '../category-list';

export default function CategoryListView() {
  const { categories, categoriesLoading, categoriesMutate } = useGetCategories();

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Danh sách loại sản phẩm"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Loại sản phẩm', href: paths.dashboard.category.root },
          { name: 'Danh sách' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Button
            variant="contained"
            LinkComponent={RouterLink}
            href={paths.dashboard.category.create}
            size="large"
          >
            Tạo mới
          </Button>
        }
      />
      <CategoryList
        data={categories}
        loading={categoriesLoading}
        mutate={categoriesMutate}
        rowCount={categories.length}
      />
    </DashboardContent>
  );
}

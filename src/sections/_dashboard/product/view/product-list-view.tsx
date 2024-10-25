import { useState } from 'react';

import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetProductsN } from 'src/actions/product';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import ProductList from '../product-list';

export default function ProductListView() {
  const [pageSize, setPageSize] = useState(10);

  const [page, setPage] = useState(0);

  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<any>(null);

  const { products, productsLoading, productPaginate, productsMutate } = useGetProductsN({
    page,
    pageSize,
    productName: search,
    categoryId,
  });

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Product List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Product', href: paths.dashboard.product.root },
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Button
            variant="contained"
            LinkComponent={RouterLink}
            href={paths.dashboard.product.create}
            size="large"
          >
            Add new
          </Button>
        }
      />
      <ProductList
        data={products}
        loading={productsLoading}
        mutate={productsMutate}
        search={search}
        rowCount={productPaginate?.totalElements || 1}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSearchChange={setSearch}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
      />
    </DashboardContent>
  );
}
import type { Product } from 'src/types/product';

import { useState, useCallback } from 'react';

import { Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { gridClasses } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleteProduct } from 'src/actions/product';

import { toast } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { baseColumns } from './table/columns';
import TableBase from '../_partials/table-base';
import tableRowActions from '../_partials/table-row-actions';
import ProductTableToolbar from './table/product-table-toolbar';

type Props = {
  data: Product[];
  mutate: any;
  loading: boolean;
  rowCount: number;

  categoryId: number;
  onCategoryChange: (value: number) => void;
  search: string;
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSearchChange: (value: string) => void;
};
export default function ProductList({
  data,
  mutate,
  loading,
  rowCount,
  search,
  pageSize,
  page,
  categoryId,
  onCategoryChange,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
}: Props) {
  const router = useRouter();

  const isDeleting = useBoolean();

  const [deleted, setDeleted] = useState<Product | null>(null);

  const handleEditRow = useCallback(
    (id: any) => {
      router.push(paths.dashboard.product.edit(id));
    },
    [router]
  );

  const handleDeleteRow = useCallback(async () => {
    if (!deleted) return;
    isDeleting.onTrue();
    await deleteProduct(deleted.id);
    mutate();
    setDeleted(null);
    toast.success('Delete row successfully!');
    isDeleting.onFalse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, deleted]);

  return (
    <>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          height: { xs: 800, md: 2 },
          flexDirection: { md: 'column' },
        }}
      >
        <TableBase
          rows={data}
          columns={[
            ...baseColumns,
            tableRowActions({
              onDelete: handleDeleteRow,
              onEdit: handleEditRow,
            }) as any,
          ]}
          loading={loading}
          mutate={mutate}
          search={search}
          totalRecord={rowCount}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSearchChange={onSearchChange}
          slots={{
            toolbar: () => (
              <ProductTableToolbar
                search={search}
                onSearchChange={(query) => {
                  onPageChange(0);
                  onSearchChange(query);
                }}
                onPageChange={onPageChange}
                categoryId={categoryId}
                onCategoryChange={onCategoryChange}
              />
            ),
          }}
          sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
        />
      </Card>
      <ConfirmDialog
        open={!!deleted}
        onClose={() => {
          setDeleted(null);
          isDeleting.onFalse();
        }}
        title="Xóa"
        content={
          <>
            Are you sure want to delete <strong> {deleted?.productName} </strong>?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={handleDeleteRow}
            loading={isDeleting.value}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}

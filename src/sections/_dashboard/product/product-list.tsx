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

  const handleDeleteRow = useCallback(
    async (id: any) => {
      try {
        isDeleting.onTrue();
        await deleteProduct(id);
        mutate();
        toast.success('Xóa thành công!');
      } catch {
        toast.error('Không thể xóa!');
      } finally {
        isDeleting.onFalse();

        setDeleted(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mutate]
  );

  return (
    <>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          minHeight: 400,
          height: 1,
          maxHeight: 800,
          flexDirection: { md: 'column' },
        }}
      >
        <TableBase
          rows={data}
          columns={[
            ...baseColumns,
            tableRowActions({
              onDelete: setDeleted,
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
                onSearchChange={onSearchChange}
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
          isDeleting.onFalse();
          setDeleted(null);
        }}
        title="Xóa"
        content={
          <>
            Bạn có chắc chắn muốn xóa <strong>{deleted?.productName}</strong>?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={() => handleDeleteRow(deleted!.id)}
            loading={isDeleting.value}
          >
            Xóa
          </LoadingButton>
        }
      />
    </>
  );
}

import type { Category } from 'src/types/category';

import { useMemo, useState, useCallback } from 'react';

import { Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { gridClasses } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleteCategory } from 'src/actions/category';

import { toast } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { baseColumns } from './table/columns';
import TableBase from '../_partials/table-base';
import TableSearch from '../_partials/table-search';
import tableRowActions from '../_partials/table-row-actions';

type Props = {
  data: Category[];
  mutate: any;
  loading: boolean;
  rowCount: number;
};
export default function CategoryList({ data, mutate, loading, rowCount }: Props) {
  const [search, setSearch] = useState('');

  const router = useRouter();

  const isDeleting = useBoolean();

  const [deleted, setDeleted] = useState<Category | null>(null);

  const dataFilter = useMemo(
    () => data.filter((row) => row.name.toLowerCase().includes(search.toLowerCase())),
    [data, search]
  );

  const handleEditRow = useCallback(
    (id: any) => {
      router.push(paths.dashboard.category.edit(id));
    },
    [router]
  );

  const handleDeleteRow = useCallback(
    async (id: any) => {
      try {
        isDeleting.onTrue();
        await deleteCategory(id);
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
          rows={dataFilter}
          columns={[
            ...baseColumns,
            tableRowActions({
              onDelete: setDeleted,
              onEdit: handleEditRow,
            }) as any,
          ]}
          loading={loading}
          mutate={mutate}
          search=""
          totalRecord={rowCount}
          onSearchChange={() => {}}
          density="standard"
          sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
          paginationMode="client"
          filterMode="client"
          slots={{
            toolbar: () => (
              <TableSearch search={search} onSearch={setSearch} onPageChange={() => {}} />
            ),
          }}
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
            Bạn có chắc chắn muốn xóa <strong>{deleted?.name}</strong>?
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

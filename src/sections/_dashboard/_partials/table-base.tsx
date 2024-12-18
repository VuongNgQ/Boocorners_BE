import type { DataGridProps } from '@mui/x-data-grid';

import { useRef, useMemo } from 'react';

import { Card } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

import { EmptyContent } from 'src/components/empty-content';

import TableSearch from './table-search';

type Props = DataGridProps & {
  loading?: boolean;
  totalRecord?: number;
  mutate?: VoidFunction;

  search: string;
  pageSize?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSearchChange: (value: string) => void;
};
export default function TableBase({
  rows,
  columns,
  loading,
  totalRecord,
  mutate,
  search,
  pageSize,
  page,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  slots,
  sx,
  ...dataTableProps
}: Props) {
  const rowCountRef = useRef(totalRecord || 0);

  const rowCount = useMemo(() => {
    if (totalRecord !== 0 && totalRecord !== undefined) {
      rowCountRef.current = totalRecord;
    }
    return rowCountRef.current;
  }, [totalRecord]);
  return (
    <Card
      sx={{
        flexGrow: { md: 1 },
        display: { md: 'flex' },
        height: {
          xs: 600,
          md: 600,
        },
        flexDirection: 'column',
      }}
    >
      <DataGrid
        disableRowSelectionOnClick
        disableColumnMenu
        rows={rows}
        columns={columns}
        loading={loading}
        getRowHeight={() => 'auto'}
        pageSizeOptions={[5, 10, 50]}
        density="compact"
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        rowCount={rowCount}
        {...(page !== undefined &&
          pageSize !== undefined &&
          onPageSizeChange !== undefined &&
          onPageChange !== undefined && {
            paginationModel: { page, pageSize },

            onPaginationModelChange: (params) => {
              onPageSizeChange(params.pageSize);
              onPageChange(params.page);
            },
          })}
        paginationMode="server"
        filterMode="server"
        slots={{
          toolbar: () => (
            <TableSearch
              onPageChange={onPageChange || (() => {})}
              search={search}
              onSearch={onSearchChange}
            />
          ),
          noRowsOverlay: () => <EmptyContent />,
          noResultsOverlay: () => <EmptyContent title="No results" />,
          ...slots,
        }}
        sx={{
          [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' },

          ...sx,
        }}
        {...dataTableProps}
      />
    </Card>
  );
}

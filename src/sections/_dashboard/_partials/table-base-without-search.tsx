import type { DataGridProps } from '@mui/x-data-grid';

import { useRef, useMemo } from 'react';

import { Card } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

import { EmptyContent } from 'src/components/empty-content';

type Props = DataGridProps & {
  loading?: boolean;
  totalRecord?: number;
  mutate?: VoidFunction;

  pageSize?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
};

export default function TableBaseWithoutSearch({
  rows,
  columns,
  loading,
  totalRecord,
  mutate,
  pageSize,
  page,
  onPageChange,
  onPageSizeChange,
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

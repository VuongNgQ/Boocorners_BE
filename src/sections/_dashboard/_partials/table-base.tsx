import type { DataGridProps } from '@mui/x-data-grid';

import { Card } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

import { EmptyContent } from 'src/components/empty-content';

import TableSearch from './table-search';

type Props = DataGridProps & {
  loading?: boolean;
  totalRecord?: number;
  mutate?: VoidFunction;

  search: string;
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
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
  return (
    <Card
      sx={{
        flexGrow: { md: 1 },
        display: { md: 'flex' },
        height: {
          xs: 600,
          md: 800,
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
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        rowCount={totalRecord || 1}
        paginationModel={{ page, pageSize }}
        paginationMode="server"
        filterMode="server"
        onPaginationModelChange={(params) => {
          onPageSizeChange(params.pageSize);
          onPageChange(params.page);
        }}
        slots={{
          toolbar: () => (
            <TableSearch
              search={search}
              onSearch={(query) => {
                onPageChange(0);
                onSearchChange(query);
              }}
            />
          ),
          noRowsOverlay: () => <EmptyContent />,
          noResultsOverlay: () => <EmptyContent title="No results" />,
          ...slots,
        }}
        sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' }, ...sx }}
        {...dataTableProps}
      />
    </Card>
  );
}

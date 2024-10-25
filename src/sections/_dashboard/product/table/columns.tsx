import type { Product } from 'src/types/product';
import type { GridColDef } from '@mui/x-data-grid';
import type { Category } from 'src/types/category';

import { Box } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

export const baseColumns: GridColDef<Product>[] = [
  {
    field: 'imageName',
    headerName: 'Thumbnail',
    width: 120,
    renderCell: (params) => (
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={params.value}
          sx={{
            minHeight: 80,
            alignContent: 'center',
          }}
          alt={params.row.productName}
        />
      </Box>
    ),
  },
  {
    field: 'productName',
    headerName: 'Name',
    minWidth: 200,
    flex: 3,
    hideable: true,
    sortable: false,
    filterable: false,
  },
  {
    field: 'category',
    headerName: 'Category',
    minWidth: 200,
    flex: 2,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (value: Category) => value?.name,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'price',
    headerName: 'Price',
    minWidth: 150,
    flex: 2,
    headerAlign: 'center',
    align: 'center',
    valueFormatter: (value: any) => fCurrency(value),
  },
  {
    field: 'lastModifiedDate',
    headerName: 'Last updated',
    minWidth: 180,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: any) => fDateTime(params.value),
  },
];

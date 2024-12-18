import type { Product } from 'src/types/product';
import type { GridColDef } from '@mui/x-data-grid';
import type { Category } from 'src/types/category';

import { Box, Typography } from '@mui/material';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { maxLine, pxToRem } from 'src/theme/styles';

export const baseColumns: GridColDef<Product>[] = [
  {
    field: 'imageName',
    headerName: 'Ảnh bìa',
    width: 120,
    renderCell: (params) => (
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={params.value}
          sx={{
            width: 100,
            alignContent: 'center',
            aspectRatio: '1/1',
          }}
          alt={params.row.productName}
        />
      </Box>
    ),
  },
  {
    field: 'productName',
    headerName: 'Tên',
    minWidth: 200,
    flex: 4,
    renderCell: (params) => (
      <Box maxWidth={1} width={1}>
        <Typography
          variant="overline"
          sx={{ display: 'block', fontWeight: 700, fontSize: pxToRem(10), mb: 0.5 }}
        >
          {params.row.manufacturer}
        </Typography>
        <Typography variant="body2" sx={{ ...maxLine({ line: 2 }) }} title={params.value}>
          {params.value}
        </Typography>
        <Typography variant="caption">{params.row.volume}</Typography>
      </Box>
    ),
  },
  {
    field: 'category',
    headerName: 'Loại',
    minWidth: 200,
    flex: 2,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (value: Category) => value?.name,
  },
  {
    field: 'quantity',
    headerName: 'Só lượng',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'price',
    headerName: 'Giá',
    minWidth: 150,
    flex: 2,
    headerAlign: 'center',
    align: 'center',
    valueFormatter: (value: any) => fCurrency(value),
  },
  {
    field: 'lastModifiedDate',
    headerName: 'Ngày chỉnh sủa cuối',
    minWidth: 180,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: any) => fDateTime(params.value),
  },
];

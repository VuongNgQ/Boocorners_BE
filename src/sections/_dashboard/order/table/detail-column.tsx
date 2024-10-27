import type { Product } from 'src/types/product';
import type { GridColDef } from '@mui/x-data-grid';
import type { Category } from 'src/types/category';

import { Box, Typography } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import { maxLine, pxToRem } from 'src/theme/styles';

export const detailColumns: GridColDef<Product>[] = [
  {
    field: 'imageName',
    headerName: 'Ảnh bìa',
    width: 100,
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
    headerName: 'Sản phẩm',
    minWidth: 150,
    flex: 1,
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
    minWidth: 100,

    headerAlign: 'center',
    align: 'center',
    valueGetter: (value: Category) => value?.name,
  },
  {
    field: 'price',
    headerName: 'Giá',
    minWidth: 150,

    headerAlign: 'center',
    align: 'center',
    valueFormatter: (value: any) => fCurrency(value),
  },
  {
    field: 'quantity',
    headerName: 'Số lượng',
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'totalPrice',
    headerName: 'Tổng tiền',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    valueFormatter: (param) => fCurrency(param),
  },
];

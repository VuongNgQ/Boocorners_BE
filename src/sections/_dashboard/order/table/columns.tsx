import type { Order } from 'src/types/order';
import type { GridColDef } from '@mui/x-data-grid';
import type { LabelColor } from 'src/components/label';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';

import getOrderStatus from './get-order-status';

export const baseColumns: GridColDef<Order>[] = [
  {
    field: 'orderTrackingNumber',
    headerName: 'Tracking number',
    headerAlign: 'center',
    align: 'center',
    minWidth: 150,
  },
  {
    field: 'totalQuantity',
    headerName: 'Tổng SL',
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'totalPrice',
    headerName: 'Tổng tiền',
    headerAlign: 'center',
    align: 'center',
    valueFormatter: (param) => fCurrency(param),
  },
  {
    field: 'dateCreated',
    headerName: 'Ngày lập',
    minWidth: 150,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: any) => fDateTime(params.value, 'DD/MM/YYYY HH:mm'),
  },
  {
    field: 'deliveryDate',
    headerName: 'Ngày vận chuyển',
    width: 150,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: any) => fDateTime(params.value, 'DD/MM/YYYY HH:mm'),
  },
  {
    field: 'orderStatus',
    headerName: 'Trạng thái',
    width: 200,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: any) => {
      const status = getOrderStatus(params.value);

      return <Label color={status.color as LabelColor}>{status.label}</Label>;
    },
  },
  {
    field: 'paidAmount',
    headerName: 'Đã trả',

    headerAlign: 'center',
    align: 'center',
    valueFormatter: (value: any) => fCurrency(value),
  },
];

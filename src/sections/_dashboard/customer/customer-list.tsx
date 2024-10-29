import type { Customer } from 'src/types/customer';

import { useMemo } from 'react';

import { Card } from '@mui/material';
import { gridClasses } from '@mui/x-data-grid';

import TableBaseWithoutSearch from '../_partials/table-base-without-search';

type Props = {
  data: Customer[];
  loading: boolean;
  rowCount: number;
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function CustomerList({
  data,
  loading,
  rowCount,
  pageSize,
  page,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', flex: 0.1 },
      { field: 'fullName', headerName: 'Họ và tên', flex: 0.3 },
      { field: 'email', headerName: 'Email', flex: 0.3 },
      { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 0.2 },
      { field: 'shippingAddress', headerName: 'Địa chỉ giao hàng', flex: 0.4 },
      {
        field: 'sendMailFlag',
        headerName: 'Gửi Email',
        flex: 0.2,
        renderCell: (params: any) => (params.value ? 'Có' : 'Không'),
      },
    ],
    []
  );

  return (
    <Card
      sx={{
        flexGrow: 1,
        display: 'flex',
        minHeight: 400,
        height: 1,
        maxHeight: 800,
        flexDirection: 'column',
      }}
    >
      <TableBaseWithoutSearch
        rows={data}
        columns={columns}
        loading={loading}
        totalRecord={rowCount}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
      />
    </Card>
  );
}

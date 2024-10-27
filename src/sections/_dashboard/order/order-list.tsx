import type { Order } from 'src/types/order';

import { useState } from 'react';

import { Card } from '@mui/material';
import { gridClasses, GridActionsCellItem } from '@mui/x-data-grid';

import { Iconify } from 'src/components/iconify';

import { baseColumns } from './table/columns';
import TableBase from '../_partials/table-base';
import OrderModalDetails from './order-modal-details';

type Props = {
  data: Order[];
  loading: boolean;
  rowCount: number;

  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};
export default function OrderList({
  data,
  loading,
  rowCount,
  pageSize,
  page,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const [view, setView] = useState<Order | null>(null);
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
            {
              type: 'actions',
              field: 'actions',
              headerName: 'Actions',
              align: 'center',
              headerAlign: 'center',
              width: 100,
              getActions: (params: any) => [
                <GridActionsCellItem
                  icon={<Iconify icon="lsicon:view-filled" />}
                  label="Xem"
                  onClick={() => setView(params.row)}
                />,
              ],
            },
          ]}
          loading={loading}
          search=""
          totalRecord={rowCount}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          onSearchChange={() => {}}
          density="comfortable"
          slots={{
            toolbar: () => <></>,
          }}
          sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
        />
      </Card>
      <OrderModalDetails open={!!view} onClose={() => setView(null)} order={view as Order} />
    </>
  );
}

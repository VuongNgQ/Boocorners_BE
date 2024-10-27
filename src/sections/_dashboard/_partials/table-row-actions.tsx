import { GridActionsCellItem } from '@mui/x-data-grid';

import { Iconify } from 'src/components/iconify';

type Props = {
  onEdit: (id: any) => any;
  onDelete: (row: any) => any;
};
export default function tableRowActions({ onDelete, onEdit }: Props) {
  return {
    type: 'actions',
    field: 'actions',
    headerName: 'Actions',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    getActions: (params: any) => [
      <GridActionsCellItem
        icon={<Iconify icon="solar:pen-bold" />}
        label="Chỉnh sửa"
        onClick={() => onEdit(params.id)}
      />,
      <GridActionsCellItem
        icon={<Iconify icon="solar:trash-bin-trash-bold" />}
        label="Xóa"
        onClick={() => onDelete(params.row)}
        sx={{ color: 'error.main' }}
      />,
    ],
  };
}

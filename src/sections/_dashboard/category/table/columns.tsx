import type { GridColDef } from '@mui/x-data-grid';
import type { Category } from 'src/types/category';

export const baseColumns: GridColDef<Category>[] = [
  {
    field: 'id',
    headerName: 'ID',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Tên',
    minWidth: 200,
    flex: 4,
  },
];

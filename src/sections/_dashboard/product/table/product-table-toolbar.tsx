import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { useGetCategories } from 'src/actions/category';

import TableSearch from '../../_partials/table-search';

type Props = {
  onPageChange: (page: number) => void;
  search: string;
  onSearchChange: (value: string) => void;
  categoryId: number;
  onCategoryChange: (value: number) => void;
};
export default function ProductTableToolbar({
  search,
  onSearchChange,
  onPageChange,
  categoryId,
  onCategoryChange,
}: Props) {
  const { categories } = useGetCategories();
  return (
    <TableSearch
      search={search}
      onSearch={onSearchChange}
      onPageChange={onPageChange}
      moreFilters={
        <FormControl
          sx={{
            width: 1,
            maxWidth: { md: 250 },
          }}
        >
          <InputLabel id="category">Lọc theo loại</InputLabel>
          <Select
            labelId="category"
            fullWidth
            value={categoryId}
            onChange={(event) => {
              onCategoryChange(event.target.value as any);
              onPageChange(0);
            }}
            label="Lọc theo loại"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      }
    />
  );
}

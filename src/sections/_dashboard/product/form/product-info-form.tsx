import Grid from '@mui/material/Unstable_Grid2';
import { Card, MenuItem, CardHeader, CardContent } from '@mui/material';

import { useGetCategories } from 'src/actions/category';

import { Field } from 'src/components/hook-form';

export default function ProductInfoForm() {
  const { categories } = useGetCategories();
  return (
    <Card>
      <CardHeader title="Thông tin sản phẩm" subheader="Tên, số lượng, mô tả..." />
      <CardContent>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Field.Text
              InputLabelProps={{ shrink: true }}
              name="productName"
              label="sản phẩm"
              placeholder="Nhập tên.."
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Text
              InputLabelProps={{ shrink: true }}
              name="manufacturer"
              label="Nhà sản xuất"
              placeholder="Nhập nhà sản xuất.."
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Text
              type="number"
              InputLabelProps={{ shrink: true }}
              name="quantity"
              label="Số lượng"
              placeholder="10.."
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Text
              InputLabelProps={{ shrink: true }}
              name="volume"
              label="Thể tích"
              placeholder="50 grams.."
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Text
              InputLabelProps={{ shrink: true }}
              type="number"
              name="price"
              label="Giá"
              placeholder="100000.."
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Select
              InputLabelProps={{ shrink: true }}
              name="categoryId"
              label="Loại"
              placeholder="Skincare.."
            >
              {categories.map((category) => (
                <MenuItem value={category.id}> {category.name}</MenuItem>
              ))}
            </Field.Select>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardHeader, CardContent } from '@mui/material';

import { Field } from 'src/components/hook-form';

export default function CategoryInfoForm() {
  return (
    <Card>
      <CardHeader title="Thông tin loại sản phẩm" subheader="Category name" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Field.Text
              InputLabelProps={{ shrink: true }}
              name="categoryName"
              label="Tên loại sản phẩm"
              placeholder="Nhập tên loại sản phẩm.."
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

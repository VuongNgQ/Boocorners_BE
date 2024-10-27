import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardHeader, CardContent } from '@mui/material';

import { Field } from 'src/components/hook-form';

export default function ProductDetailsForm() {
  return (
    <Card>
      <CardHeader title="Mô tả" subheader="Mô tả chung về chức năng, công dụng..." />
      <CardContent>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Field.Text
              multiline
              minRows={3}
              maxRows={7}
              InputLabelProps={{ shrink: true }}
              name="productDetails"
              label="Mô tả sản phẩm"
              placeholder="Nhập mô tả.."
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

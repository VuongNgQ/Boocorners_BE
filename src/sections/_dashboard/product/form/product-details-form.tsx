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
              name="description"
              label="Mô tả sản phẩm"
              placeholder="Nhập mô tả.."
            />
          </Grid>
          <Grid xs={12}>
            <Field.Text
              multiline
              minRows={3}
              maxRows={7}
              InputLabelProps={{ shrink: true }}
              name="productDetails"
              label="Chi tiết sản phẩm"
              placeholder="Nhập chi tiết sản phẩm.."
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

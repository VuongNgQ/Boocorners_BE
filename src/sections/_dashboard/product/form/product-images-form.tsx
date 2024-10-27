import { useFieldArray, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Card,
  Stack,
  Button,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  InputAdornment,
} from '@mui/material';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

export default function ProductImagesForm() {
  const { control } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    name: 'productPhotos',
    control,
  });

  return (
    <Card>
      <CardHeader title="Ảnh" subheader="Ảnh bìa, ảnh mô tả..." />
      <CardContent>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Typography sx={{ mb: 3 }}>Ảnh bìa</Typography>

            <Field.Text
              InputLabelProps={{ shrink: true }}
              name="imageName"
              label="Ảnh bìa"
              placeholder="Nhập link.."
            />
          </Grid>
          <Grid xs={12}>
            <Typography sx={{ mb: 3 }}>Ảnh sản phẩm</Typography>
            <Stack spacing={2} width={1}>
              {fields.map((field, index) => (
                <Field.Text
                  key={field.id}
                  InputLabelProps={{ shrink: true }}
                  name={`productPhotos[${index}]`}
                  label="Link ảnh"
                  placeholder="Nhập link.."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => remove(index)}
                          disabled={fields.length <= 1}
                        >
                          <Iconify icon="tabler:trash-filled" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
              <Button onClick={() => append('')} sx={{}}>
                Thêm ảnh sản phẩm
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

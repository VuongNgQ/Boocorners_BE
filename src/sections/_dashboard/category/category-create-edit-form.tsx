import type { Category } from 'src/types/category';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { createCategory, updateCategory } from 'src/actions/category';

import { Form } from 'src/components/hook-form';

import { CategorySchema } from './form/category-schema';
import CategoryInfoForm from './form/category-info-form';

import type { CategorySchemaType } from './form/category-schema';

export type CategoryCreateEditFormProps = {
  currentRecord?: Category;
  loading?: boolean;
  empty?: boolean;
};
export default function CategoryCreateEditForm({
  currentRecord,
  loading,
  empty,
}: CategoryCreateEditFormProps) {
  const isEdit = !!currentRecord;
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      categoryName: currentRecord?.name || '',
    }),
    [currentRecord]
  );

  const methods = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentRecord) {
      reset(defaultValues);
    }
  }, [currentRecord, defaultValues, reset]);
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!isEdit) {
        await createCategory(data);
      } else {
        await updateCategory(currentRecord.id, data);
      }
      reset();
      toast.success(isEdit ? 'Chỉnh sửa thành công!' : 'Tạo mới thành công!');
      router.push(paths.dashboard.category.list);
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong!');
    }
  });
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        <CategoryInfoForm />
        <Stack
          spacing={3}
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          justifyContent="flex-end"
        >
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting || loading}
            disabled={loading || empty}
          >
            {!isEdit ? 'Tạo mới' : 'Chỉnh sửa'}
          </LoadingButton>
        </Stack>
      </Stack>
    </Form>
  );
}

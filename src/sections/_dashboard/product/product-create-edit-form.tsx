import type { Product } from 'src/types/product';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { createProduct, updateProduct } from 'src/actions/product';

import { Form } from 'src/components/hook-form';

import { ProductSchema } from './form/product-schema';
import ProductInfoForm from './form/product-info-form';
import ProductImagesForm from './form/product-images-form';
import ProductDetailsForm from './form/product-details-form';

import type { ProductSchemaType } from './form/product-schema';

export type ProductCreateEditFormProps = {
  currentRecord?: Product;
  loading?: boolean;
  empty?: boolean;
};
export default function ProductCreateEditForm({
  currentRecord,
  loading,
  empty,
}: ProductCreateEditFormProps) {
  const isEdit = !!currentRecord;
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      productName: currentRecord?.productName || '',
      manufacturer: currentRecord?.manufacturer || '',
      quantity: currentRecord?.quantity || ('' as any),
      price: currentRecord?.price || ('' as any),
      categoryId: (currentRecord?.category?.id as any) || '',
      volume: currentRecord?.volume || '',
      productDetails: currentRecord?.productDetails || '',
      description: currentRecord?.description || '',
      productPhotos: currentRecord?.productPhotos
        ? currentRecord.productPhotos.map((photo) => photo.path)
        : [''],
      imageName: currentRecord?.imageName || '',
    }),
    [currentRecord]
  );

  const methods = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
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
        await createProduct({
          ...data,
          description: data.productDetails,
          productPhotos: data.productPhotos.map((photo) => ({
            path: photo,
            alt: data.productName,
          })),
        });
      } else {
        await updateProduct(currentRecord.id, {
          ...data,
          productPhotos: data.productPhotos.map((photo) => ({
            path: photo,
            alt: data.productName,
          })),
        });
      }
      reset();
      toast.success(isEdit ? 'Chỉnh sủa thành công!' : 'Tạo mới thành công!');
      router.push(paths.dashboard.product.list);
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong!');
    }
  });
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        <ProductInfoForm />
        <ProductDetailsForm />
        <ProductImagesForm />
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

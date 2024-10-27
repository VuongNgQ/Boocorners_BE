import { z as zod } from 'zod';
// ----------------------------------------------------------------------

export type ProductSchemaType = zod.infer<typeof ProductSchema>;

export const ProductSchema = zod.object({
  productName: zod.string().min(1, { message: 'Tên sản phẩm là bắt buộc' }),
  manufacturer: zod.string().min(1, { message: 'Nhà sản xuất là bắt buộc' }),
  quantity: zod
    .number({ message: 'Số lượng không được bỏ trống' })
    .int('Số nguyên')
    .nonnegative('Lớn hơn 0'),
  price: zod.number({ message: 'Giá không đươc bỏ trống' }).nonnegative('Lớn hơn 0'),
  categoryId: zod.number({
    required_error: 'Loại sản phẩm không được bỏ trống',
    invalid_type_error: 'Loại sản phẩm không được bỏ trống',
  }),
  volume: zod.string().min(1, { message: 'Thể tích không được bỏ trống' }),
  productDetails: zod.string().min(1, { message: 'Mô tả sản phẩm không được bỏ trống' }),
  productPhotos: zod
    .union([zod.string(), zod.instanceof(File)])
    .array()
    .min(1, { message: 'Ảnh sản phẩm không được bỏ trống' }),
  imageName: zod.union([zod.string().min(1, 'Ảnh bìa không được bỏ trống'), zod.instanceof(File)]),
});

import { z as zod } from 'zod';
// ----------------------------------------------------------------------

export type CategorySchemaType = zod.infer<typeof CategorySchema>;

export const CategorySchema = zod.object({
  categoryName: zod.string().min(1, { message: 'Tên loại sản phẩm không được bỏ trống' }),
});

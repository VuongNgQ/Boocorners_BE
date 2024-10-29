type Category = {
  id: number;
  name: string;
};

type ProductPhotos = {
  id: number;
  path: string;
  alt: string;
};

type Sale = {
  saleId: number;
  product: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  active: boolean;
};

export type Product = {
  id: number;
  productName: string;
  manufacturer: string;
  quantity: number;
  category: Category;
  price: number;
  description: string;
  productDetails: string;
  createdDate: string;
  lastModifiedDate: string;
  imageName: string;
  volume: string;
  sales: Sale[];
  deleted: boolean;
  productPhotos: ProductPhotos[];
};

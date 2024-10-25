import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IProductFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};

export type IProductTableFilters = {
  stock: string[];
  publish: string[];
};

export type IProductReviewNewForm = {
  rating: number | null;
  review: string;
  name: string;
  email: string;
};

export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  postedAt: IDateValue;
  isPurchased: boolean;
  attachments?: string[];
};

export type IProductItem = {
  id: string;
  sku: string;
  name: string;
  code: string;
  price: number;
  taxes: number;
  tags: string[];
  sizes: string[];
  publish: string;
  gender: string[];
  coverUrl: string;
  images: string[];
  colors: string[];
  quantity: number;
  category: string;
  available: number;
  totalSold: number;
  description: string;
  totalRatings: number;
  totalReviews: number;
  createdAt: IDateValue;
  inventoryType: string;
  subDescription: string;
  priceSale: number | null;
  reviews: IProductReview[];
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  newLabel: {
    enabled: boolean;
    content: string;
  };
};

// Dùng

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

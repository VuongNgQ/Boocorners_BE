import type { Product } from 'src/types/product';

import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------
type FilterListParams = {
  page?: number;
  pageSize?: number;
  productName?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  sort?: string;
};

// ----------------------------------------------------------------------

type ProductsDataN = {
  code: number;
  message: string;
  lists: {
    content: Product[];

    number: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};

export function useGetProductsN({
  page = 0,
  pageSize = 10,
  maxPrice,
  minPrice,
  productName,
  categoryId,
  sort,
}: FilterListParams) {
  let url = `${endpoints.product.list}?page=${page}&size=${pageSize}`;

  if (categoryId && categoryId !== undefined && categoryId !== -1) {
    url = `${endpoints.product.list}/category/${categoryId}?page=${page}&size=${pageSize}`;
  }

  if (minPrice != null) {
    url += `&minPrice=${minPrice}`;
  }
  if (maxPrice != null) {
    url += `&maxPrice=${maxPrice}`;
  }
  if (productName) {
    url += `&productName=${encodeURIComponent(productName)}`;
  }

  if (sort) {
    switch (sort) {
      case 'most-popular':
        url += `&sort=createdDate&sort=desc`;
        break;
      case 'latest':
        url += `&sort=createdDate&sort=asc`;
        break;
      case 'highest-price':
        url += `&sort=price&sort=desc`;
        break;
      case 'lowest-price':
        url += `&sort=price&sort=asc`;
        break;
      default:
        break;
    }
  }

  const { data, isLoading, error, isValidating, mutate } = useSWR<ProductsDataN>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(() => {
    const paginate = data?.lists
      ? {
          pageNumber: data.lists.number,
          pageSize: data.lists.size,
          totalPages: data.lists.totalPages,
          totalElements: data.lists.totalElements,
        }
      : {
          pageNumber: 0,
          pageSize: 0,
          totalPages: 0,
          totalElements: 0,
        };
    return {
      products: data?.lists?.content || [],
      productPaginate: paginate,
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.lists?.content?.length,
      productsMutate: mutate,
    };
  }, [data?.lists, error, isLoading, isValidating, mutate]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

type ProductDataN = {
  code: number;
  message: string;
  details: Product;
};

export function useGetProductById({ id }: { id: string }) {
  const url = `${endpoints.product.list}/${id}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR<ProductDataN>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      product: data?.details,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
      productEmpty: !isLoading && !data?.details,
      productMutate: mutate,
    }),
    [data?.details, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProductsNewArrival({
  page = 0,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}) {
  const url = `${endpoints.product.list}/new-arrival?page=${page}&size=${pageSize}`;

  const { data, isLoading, error, isValidating } = useSWR<ProductsDataN>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    const paginate = data?.lists
      ? {
          pageNumber: data.lists.number,
          pageSize: data.lists.size,
          totalPages: data.lists.totalPages,
          totalElements: data.lists.totalElements,
        }
      : {
          pageNumber: 0,
          pageSize: 0,
          totalPages: 0,
          totalElements: 0,
        };
    return {
      products: data?.lists?.content || [],
      productPaginate: paginate,
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.lists?.content?.length,
    };
  }, [data?.lists, error, isLoading, isValidating]);

  return memoizedValue;
}

export const createProduct = async (data: any) => {
  const url = endpoints.product.create;

  const response = await axios.post(url, data);

  return response.data;
};

export const updateProduct = async (id: number, data: any) => {
  const url = id ? endpoints.product.update(id) : '';

  const response = await axios.put(url, data);

  return response.data;
};

export const deleteProduct = async (id: any) => {
  const url = id ? endpoints.product.delete(id) : null;

  const response = await axios.delete(url as string);

  return response.data;
};

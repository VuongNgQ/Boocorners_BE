import type { Category } from 'src/types/category';

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

type CategoriesData = {
  code: number;
  message: string;
  lists: Category[];
  detail: any;
};

export function useGetCategories() {
  const url = endpoints.category.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<CategoriesData>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      categories: data?.lists || [],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesValidating: isValidating,
      categoriesEmpty: !isLoading && !data?.lists.length,
      categoriesMutate: mutate,
    }),
    [data?.lists, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
type CategoryDetails = {
  code: number;
  message: string;
  details: Category;
};

export function useGetCategoryById({ id }: { id: string }) {
  const url = `${endpoints.category.list}/${id}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR<CategoryDetails>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      category: data?.details,
      categoryLoading: isLoading,
      categoryError: error,
      categoryValidating: isValidating,
      categoryEmpty: !isLoading && !data?.details,
      categoryMutate: mutate,
    }),
    [data?.details, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export const createCategory = async (data: any) => {
  const url = endpoints.category.create;

  const response = await axios.post(url, data);

  return response.data;
};

export const updateCategory = async (id: number, data: any) => {
  const url = id ? endpoints.category.update(id) : '';

  const response = await axios.put(url, data);

  return response.data;
};

export const deleteCategory = async (id: any) => {
  const url = id ? endpoints.category.delete(id) : null;

  const response = await axios.delete(url as string);

  return response.data;
};

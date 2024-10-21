import type { Category } from 'src/types/category';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
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

  const { data, isLoading, error, isValidating } = useSWR<CategoriesData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      categories: data?.lists || [],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesValidating: isValidating,
      categoriesEmpty: !isLoading && !data?.lists.length,
    }),
    [data?.lists, error, isLoading, isValidating]
  );

  return memoizedValue;
}

import type { ICustomerCheckout } from 'src/types/order';

import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const ENDPOINT = endpoints.customer;
// ----------------------------------------------------------------------

export async function createCustomerInfo(payload: ICustomerCheckout) {
  const response = await axios.post(ENDPOINT.create, {
    ...payload,
    sendMailFlag: true,
  });
  return response?.data;
}

// ----------------------------------------------------------------------

export function useGetCustomers({ page = 0, pageSize = 10 }: any) {
  const url = `${endpoints.customer.create}?page=${page}&size=${pageSize}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR<CustomerResponse>(
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
      customers: data?.lists?.content || [],
      customerPaginate: paginate,
      customersLoading: isLoading,
      customersError: error,
      customersValidating: isValidating,
      customersEmpty: !isLoading && !data?.lists?.content?.length,
      customersMutate: mutate,
    };
  }, [data?.lists, error, isLoading, isValidating, mutate]);

  return memoizedValue;
}

import type { Order } from 'src/types/order';

import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
// ----------------------------------------------------------------------
const ENDPOINT = endpoints.order;
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
type FilterListParams = {
  page?: number;
  pageSize?: number;
  sort?: string;
};
type ProductsDataN = {
  code: number;
  message: string;
  lists: {
    content: Order[];

    number: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};
export function useGetOrdersN({ page = 0, pageSize = 10, sort }: FilterListParams) {
  let url = `${endpoints.order.list}?page=${page}&size=${pageSize}`;

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
      orders: data?.lists?.content || [],
      ordersPaginate: paginate,
      ordersLoading: isLoading,
      ordersError: error,
      ordersValidating: isValidating,
      ordersEmpty: !isLoading && !data?.lists?.content?.length,
      ordersMutate: mutate,
    };
  }, [data?.lists, error, isLoading, isValidating, mutate]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createOrder(payload: {
  cartId: number;
  customerInfoId: number;
  description: string;
  returnUrl: string;
  cancelUrl: string;
  prepaid: boolean;
}) {
  const response = await axios.post(ENDPOINT.create, payload);
  return response?.data;
}

// ----------------------------------------------------------------------

export async function confirmOrder(orderId: string) {
  const response = await axios.put(`${ENDPOINT.list}/${orderId}/confirm`);
  return response?.data;
}

// ----------------------------------------------------------------------

export async function cancelOrder(orderId: string) {
  const response = await axios.put(`${ENDPOINT.list}/${orderId}/cancel`);
  return response?.data;
}

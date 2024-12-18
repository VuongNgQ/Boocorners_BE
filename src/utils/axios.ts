import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
    verify: '/api/auth/verify',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  // dùng
  file: {
    upload: '/api/file/import',
  },
  product: {
    list: '/api/products',
    onSale: '/api/products/on-sale',
    details: '/api/product/details',
    search: '/api/products',
    create: '/api/products',
    update: (id: any) => `/api/products/${id}`,
    delete: (id: any) => `/api/products/${id}`,
  },
  category: {
    list: '/api/categories',
    details: '/api/categories',
    search: '/api/categories',
    create: '/api/categories',
    update: (id: any) => `/api/categories/${id}`,
    delete: (id: any) => `/api/categories/${id}`,
  },
  customer: {
    create: '/api/customer-info',
  },
  cart: {
    batch: '/api/cart/batch',
  },
  order: {
    list: '/api/order',
    create: '/api/order/create',
  },
  statistic: {
    detail: 'api/dashboard',
  },
};

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

// Overview
const IndexPage = lazy(() => import('src/pages/dashboard'));
// Category
const CategoryListPage = lazy(() => import('src/pages/dashboard/category/list'));
// Product
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
// Order
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
// Customer
const CustomerListPage = lazy(() => import('src/pages/dashboard/customer/list'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'category',
        children: [
          { element: <CategoryListPage />, index: true },
          { path: 'list', element: <CategoryListPage /> },
          // { path: ':id', element: <CategoryDetailsPage /> },
        ],
      },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          // { path: ':id', element: <ProductDetailsPage /> },
        ],
      },

      {
        path: 'order',
        element: <OrderListPage />,
      },
      {
        path: 'customer',
        element: <CustomerListPage />,
      },
    ],
  },
];

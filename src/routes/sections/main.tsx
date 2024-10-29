import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

import { CartProvider } from 'src/sections/cart/context';

// ----------------------------------------------------------------------

// Error
const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));
// Shop
const ShopViewPage = lazy(() => import('src/pages/shop/list'));
const ShopDetailsPage = lazy(() => import('src/pages/shop/details'));
// News Arrival
const NewsArrivalsPage = lazy(() => import('src/pages/news-arrival/list'));
// On Sale
const OnSalePage = lazy(() => import('src/pages/on-sale/list'));
// Cart
const CartViewPage = lazy(() => import('src/pages/cart/list'));
// Order
const OrderSuccessPage = lazy(() => import('src/pages/order/order-success'));
const OrderFailedPage = lazy(() => import('src/pages/order/order-failed'));
// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <CartProvider>
          <Outlet />
        </CartProvider>
      </Suspense>
    ),
    children: [
      {
        element: (
          <MainLayout>
            <Outlet />
          </MainLayout>
        ),
        children: [
          {
            path: 'shop',
            children: [
              {
                element: <ShopViewPage />,
                index: true,
              },
              {
                element: <ShopDetailsPage />,
                path: ':slug',
              },
            ],
          },
          {
            path: 'new-arrivals',
            element: <NewsArrivalsPage />,
          },
          {
            path: 'on-sale',
            element: <OnSalePage />,
          },
          {
            path: 'cart',
            element: <CartViewPage />,
          },
          {
            path: 'order',
            children: [
              {
                path: 'success',
                element: <OrderSuccessPage />,
              },
              {
                path: 'failed',
                element: <OrderFailedPage />,
              },
            ],
          },
        ],
      },

      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
];

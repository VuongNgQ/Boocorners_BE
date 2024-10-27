// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  maintenance: '/maintenance',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  // AUTH
  auth: {
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
      verifyPhone: `${ROOTS.AUTH}/jwt/verify-phone`,
    },
  },
  // LANDING
  main: {
    shop: {
      root: '/shop',
      details: (slug: any) => `/shop/${slug}`,
    },
    news_arrival: {
      root: '/new-arrivals',
    },
    on_sale: {
      root: '/on-sale',
    },
    cart: {
      root: '/cart',
    },
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    category: {
      root: `${ROOTS.DASHBOARD}/category`,
      list: `${ROOTS.DASHBOARD}/category/list`,
      create: `${ROOTS.DASHBOARD}/category/create`,
      edit: (id: any) => `${ROOTS.DASHBOARD}/category/${id}/edit`,
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      list: `${ROOTS.DASHBOARD}/product/list`,
      create: `${ROOTS.DASHBOARD}/product/create`,
      edit: (id: any) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
    },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      list: `${ROOTS.DASHBOARD}/order`,
      details: (id: any) => `${ROOTS.DASHBOARD}/order/${id}`,
    },
    customer: {
      root: `${ROOTS.DASHBOARD}/customer`,
      list: `${ROOTS.DASHBOARD}/customer`,
      details: (id: any) => `${ROOTS.DASHBOARD}/customer/${id}`,
    },
  },
};

// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
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
    cart: {
      root: '/cart',
    },
  },
};

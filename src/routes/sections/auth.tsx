import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthCenteredLayout } from 'src/layouts/auth-centered';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

/** **************************************
 * Jwt
 *************************************** */
const Jwt = {
  SignInPage: lazy(() => import('src/pages/auth/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth/sign-up')),
  VerifyPhonePage: lazy(() => import('src/pages/auth/verify-phone')),
};

const authJwt = {
  path: 'jwt',
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <AuthCenteredLayout>
            <Jwt.SignInPage />
          </AuthCenteredLayout>
        </GuestGuard>
      ),
    },
    // {
    //   path: 'sign-up',
    //   element: (
    //     <GuestGuard>
    //       <AuthCenteredLayout>
    //         <Jwt.SignUpPage />
    //       </AuthCenteredLayout>
    //     </GuestGuard>
    //   ),
    // },
    // {
    //   path: 'verify-phone',
    //   element: (
    //     <GuestGuard>
    //       <AuthCenteredLayout>
    //         <Jwt.VerifyPhonePage />
    //       </AuthCenteredLayout>
    //     </GuestGuard>
    //   ),
    // },
  ],
};

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [authJwt],
  },
];

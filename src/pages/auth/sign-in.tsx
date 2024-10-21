import { Helmet } from 'react-helmet-async';

import { SignInView } from 'src/sections/auth/sign-in-view';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SignInView />
    </>
  );
}

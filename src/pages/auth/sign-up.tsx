import { Helmet } from 'react-helmet-async';

import { SignUpView } from 'src/sections/auth/sign-up-view';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SignUpView />
    </>
  );
}

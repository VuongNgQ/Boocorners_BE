import { Helmet } from 'react-helmet-async';

import { VerifyPhoneView } from 'src/sections/auth/verify-phone-view';

// ----------------------------------------------------------------------

const metadata = { title: `Verify phone` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <VerifyPhoneView />
    </>
  );
}

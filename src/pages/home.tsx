import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

const metadata = {
  title: 'BooCorners',
};

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <Box
        sx={{
          height: { xs: 88, md: 200 },
        }}
      />
      <HomeView />
    </>
  );
}

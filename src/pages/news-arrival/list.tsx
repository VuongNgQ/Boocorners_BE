import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import NewsArrivalsView from 'src/sections/news-arrivals/view/news-arrivals-view';

// ----------------------------------------------------------------------

const metadata = { title: `News Arrival!` };

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
      <NewsArrivalsView />
    </>
  );
}

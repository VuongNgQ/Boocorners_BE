import Stack from '@mui/material/Stack';

import { pxToRem } from 'src/theme/styles';
import { useGetProductsN, useGetProductsNewArrival } from 'src/actions/product';

import { BackToTop } from 'src/components/animate/back-to-top';

import { HomeHero } from '../home-hero';
import HomeDisplay from '../home-display';

// ----------------------------------------------------------------------

export function HomeView() {
  const { products, productsEmpty } = useGetProductsN({ page: 0, pageSize: 4 });
  const { products: productsNewArrival, productsEmpty: productsNewArrivalEmpty } =
    useGetProductsNewArrival({
      page: 0,
      pageSize: 4,
    });

  return (
    <>
      <BackToTop />

      <HomeHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        {productsNewArrivalEmpty ?? (
          <HomeDisplay title="New Arrivals" product={productsNewArrival} href="./new-arrivals" />
        )}

        <HomeDisplay
          title="Shop"
          product={products}
          href="./shop"
          sx={{
            mb: {
              xs: pxToRem(23),
              md: pxToRem(144),
            },
          }}
        />
      </Stack>
    </>
  );
}

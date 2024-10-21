import { Box, Stack, useTheme, Container, Typography } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CartList from '../cart-list';
import CartInfo from '../cart-info';

export default function CartView() {
  const theme = useTheme();
  return (
    <Container
      maxWidth={false}
      sx={{
        mx: 'auto',

        [theme.breakpoints.up('lg')]: {
          maxWidth: pxToRem(1240),
          px: '0px !important',
        },
        pb: pxToRem(58),
      }}
    >
      <CustomBreadcrumbs
        links={[
          {
            href: '/',
            name: 'Home',
          },
          {
            name: 'Skincare',
          },
        ]}
        sx={{
          ml: { xs: 0, md: pxToRem(55) },
          mb: pxToRem(8),
        }}
      />
      <Typography
        sx={{
          fontSize: pxToRem(40),
          fontWeight: 300,
          lineHeight: pxToRem(60.48),
          mb: pxToRem(24),
          ml: pxToRem(55),
          textDecoration: 'uppercase',
          [theme.breakpoints.down('md')]: {
            fontSize: pxToRem(32),
            lineHeight: pxToRem(48.38),
            mb: pxToRem(29),
            ml: 0,
          },
        }}
      >
        YOUR CART
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box
          sx={{
            pr: {
              xs: 0,
              md: pxToRem(49),
            },
          }}
        >
          <CartList />
        </Box>
        <Box
          sx={{
            mt: {
              xs: pxToRem(82),
              md: 0,
            },
            borderLeft: { xs: 0, md: '1px solid #000000' },
            pl: { xs: 0, md: pxToRem(22), lg: pxToRem(44) },
            pr: {
              xs: 0,
              md: 0,
            },
            width: { lg: 1 },
            maxWidth: {
              lg: pxToRem(444.8),
            },
          }}
        >
          <CartInfo />
        </Box>
      </Stack>
    </Container>
  );
}

import { Box, Link, Stack, useTheme, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { pxToRem } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CartList from '../cart-list';
import CartInfo from '../cart-info';
import { useCartContext } from '../context';

export default function CartView() {
  const theme = useTheme();
  const { products } = useCartContext();

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
            name: 'Cart',
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
      {products.length === 0 ? (
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{
            paddingTop: '50px',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              width: '100%',
            }}
          >
            Giỏ hàng của bạn đang trống
          </Typography>
          <Link
            component={RouterLink}
            href={paths.main.shop.root}
            sx={{
              color: 'black',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SvgColor
              src="/assets/icons/arrow-left-bold.svg"
              sx={{
                height: pxToRem(9.09),
                width: pxToRem(7),
                mr: pxToRem(6.49),
              }}
            />
            <Box
              sx={{
                fontSize: pxToRem(14),
                lineHeight: '1.51222',
                fontWeight: 600,
              }}
            >
              Continue Shopping
            </Box>
          </Link>
        </Stack>
      ) : (
        <Stack direction={{ xs: 'column', md: 'row' }}>
          <Box
            sx={{
              pr: {
                xs: 0,
                md: pxToRem(49),
              },
              flex: 1,
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
      )}
    </Container>
  );
}

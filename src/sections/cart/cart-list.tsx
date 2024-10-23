import type { ProductInCart } from 'src/types/cart';

import { Box, Link, Stack, useTheme, IconButton, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';

import { maxLine, pxToRem } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { SvgColor } from 'src/components/svg-color';

import { useCartContext } from './context';
import CartQuantityBox from './cart-quantity-box';

export default function CartList() {
  const { products } = useCartContext();

  return (
    <Box>
      {products.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            width: '100%',
            textAlign: 'center',
            paddingTop: '50px',
          }}
        >
          Giỏ hàng của bạn đang trống
        </Typography>
      ) : (
        <Stack
          spacing={{
            xs: pxToRem(16),
            md: pxToRem(28),
          }}
        >
          {products.map((cart, index) => (
            <CartItem key={index} isLastItem={index === products.length - 1} cart={cart} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

type CartItemProps = {
  isLastItem: boolean;
  cart: ProductInCart;
};
function CartItem({ isLastItem, cart }: CartItemProps) {
  const theme = useTheme();

  const { onDeleteCart, onChangeAmount } = useCartContext();

  return (
    <Stack direction="row" alignItems="center">
      <Box
        sx={{
          flexShrink: 0,
          width: { xs: 'unset', md: pxToRem(56) },
        }}
      >
        <IconButton
          sx={{
            transform: { xs: 'translateX(6px)', md: 'translateX(-10px)' },
            mr: { xs: pxToRem(18), md: pxToRem(34 - 8) },
            mt: {
              xs: pxToRem(-16),
              md: pxToRem(-28),
            },
            ml: {
              xs: pxToRem(-18),
              md: 0,
            },
          }}
          onClick={() => {
            onDeleteCart(cart.id);
          }}
        >
          <SvgColor
            src="/assets/icons/close.svg"
            sx={{
              width: pxToRem(24),
              height: pxToRem(24),
            }}
          />
        </IconButton>
      </Box>
      <Stack
        direction="row"
        sx={{
          borderBottom: isLastItem ? 'unset' : '1px solid #0000001A',
          pb: {
            xs: pxToRem(16),
            md: pxToRem(28),
          },
          width: 1,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            flexShrink: 0,
            mr: {
              xs: pxToRem(14),
              md: pxToRem(22),
            },
          }}
        >
          <Image
            src={cart.imageName}
            alt={cart.productName}
            ratio="1/1"
            sx={{
              width: { xs: pxToRem(99), md: pxToRem(92) },
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            height: { xs: pxToRem(99), md: pxToRem(92) },
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',

            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
            },
          }}
        >
          <Box sx={{}}>
            <Link
              component={RouterLink}
              href={paths.main.shop.details(cart.id)}
              sx={{
                fontSize: pxToRem(16),
                fontWeight: 600,
                lineHeight: pxToRem(24.19),
                ...maxLine({ line: 2 }),
              }}
              title={cart.productName}
            >
              {cart.productName}
            </Link>
            <Typography
              sx={{
                fontSize: pxToRem(12),
                fontWeight: 300,
                lineHeight: pxToRem(18.14),
                color: '#00000099',
              }}
            >
              {cart.manufacturer}
            </Typography>
          </Box>
          <Box
            sx={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'row',

              minWidth: 0,
              [theme.breakpoints.down('md')]: {
                width: 1,
                alignItems: 'center',
                mt: 'auto',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
              },
            }}
          >
            <Box
              sx={{
                mr: {
                  xs: 0,
                  md: pxToRem(80),
                },
              }}
            >
              <CartQuantityBox
                sx={{
                  mt: {
                    xs: 0,
                    md: pxToRem(6),
                  },
                }}
                quantity={cart.quantityInCart}
                onChange={(amount) => onChangeAmount(cart.id, amount)}
              />
            </Box>
            <Typography
              sx={{
                fontSize: pxToRem(24),
                lineHeight: pxToRem(36.29),
                fontWeight: 600,

                [theme.breakpoints.down('md')]: {
                  fontSize: pxToRem(20),
                  lineHeight: 1,
                },
              }}
            >
              {fCurrency(cart.price)}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}

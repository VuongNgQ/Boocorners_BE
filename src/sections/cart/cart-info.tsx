import type { SxProps } from '@mui/material';

import { useMemo } from 'react';

import { Box, Link, Stack, Divider, useTheme, Typography, RadioGroup } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import { pxToRem } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';

import { useCartContext } from './context';
import CartDialogForm from './cart-dialog-form';
import CustomRadio from './_partials/custom-radio';
import { ContainedButton } from '../_partials/buttons';

export default function CartInfo() {
  const theme = useTheme();
  const open = useBoolean();
  const { products } = useCartContext();
  const total = useMemo(
    () => products.reduce((acc, product) => acc + product.price * product.quantityInCart, 0),
    [products]
  );
  return (
    <>
      <Box
        sx={{
          maxWidth: { xs: 1, md: pxToRem(400) },
        }}
      >
        <Box
          sx={{
            px: {
              xs: pxToRem(20),
              md: 0,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: pxToRem(18),
              fontWeight: 500,
              lineHeight: pxToRem(27.22),
              mb: pxToRem(4),
            }}
          >
            Thông tin
          </Typography>
          <Box
            sx={{
              cursor: 'pointer',
              backgroundColor: '#D1D1D1A6',
              px: pxToRem(14),
              py: pxToRem(7),
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: {
                xs: pxToRem(43),
                md: pxToRem(39),
              },
            }}
            onClick={open.onTrue}
          >
            <Typography
              sx={{
                color: '#000000A6',
                fontSize: pxToRem(16),
                lineHeight: '1.51222',
                fontWeight: 275,
                [theme.breakpoints.down('md')]: {
                  fontSize: pxToRem(12),
                },
              }}
            >
              Nguyễn Thị Anh Thư | (+84) 123 123 123 <br />
              23 Tên đường Phường, Quận, Thành phố
            </Typography>
            <SvgColor
              src="/assets/icons/arrow-down.svg"
              sx={{
                transform: 'rotate(270deg)',
                color: '#0000004D',
                height: pxToRem(9),
                width: pxToRem(17),
              }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: pxToRem(24),
                fontWeight: 700,
                lineHeight: '1.512',
                [theme.breakpoints.up('md')]: {
                  letterSpacing: '2px',
                },
              }}
            >
              CART TOTALS
            </Typography>
            <Divider
              sx={{
                border: '0.7px solid #000000',
                my: {
                  xs: pxToRem(16),
                  md: pxToRem(13),
                },
              }}
            />
            <Block label="Tổng tiền sản phẩm" value={fCurrency(total)} />
            <Block
              label="Phí vận chuyển"
              value="$15"
              sx={{
                root: { mt: pxToRem(20) },
              }}
            />
            <Divider
              sx={{
                border: '2px solid #000000',
                my: pxToRem(20),
              }}
            />
            <Block
              label="Tổng đơn"
              value="$580"
              sx={{
                label: {
                  color: '#000000',
                  fontWeight: 600,
                  fontSize: pxToRem(20),
                },
                value: {
                  fontSize: pxToRem(20),
                },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            pb: pxToRem(16),
            mt: {
              xs: pxToRem(41),
              md: pxToRem(14),
            },
          }}
        >
          <Typography
            sx={{ fontSize: pxToRem(16), lineHeight: '1.51222', fontWeight: 500, mb: pxToRem(6) }}
          >
            Chọn hạng mức thanh toán trước
          </Typography>

          <RadioGroup
            defaultValue="70"
            row
            sx={{
              '& .MuiButtonBase-root.MuiRadio-root': {
                p: 0,
              },
              columnGap: pxToRem(42),
            }}
          >
            <CustomRadio value="100" label="100%" />
            <CustomRadio value="70" label="70%" />
          </RadioGroup>
        </Box>
        <ContainedButton
          sx={{ borderRadius: 0, p: pxToRem(20), maxWidth: 1, width: 1 }}
          mobileSxProps={{
            p: pxToRem(20),
          }}
        >
          <Block
            label="Thanh toán trước để đặt hàng"
            value="$406"
            sx={{
              label: {
                color: 'white',
                fontWeight: 500,
                fontSize: pxToRem(16),
              },
              value: {
                fontSize: pxToRem(16),
                fontWeight: 700,
                color: 'white',
              },
            }}
          />
        </ContainedButton>
        <ContainedButton
          sx={{
            borderRadius: 0,
            p: pxToRem(20),
            maxWidth: 1,
            width: 1,
            backgroundColor: '#D1D1D1',
          }}
          mobileSxProps={{
            p: pxToRem(20),
          }}
        >
          <Block
            label="Cần thanh toán khi nhận hàng"
            value="$174"
            sx={{
              label: {
                color: '#000',
                fontWeight: 500,
                fontSize: pxToRem(16),
              },
              value: {
                fontSize: pxToRem(16),
                fontWeight: 700,
                color: '#000',
              },
            }}
          />
        </ContainedButton>

        <ContainedButton
          smallFontSize
          sx={{ mt: pxToRem(22), borderRadius: 0, p: pxToRem(20), maxWidth: 1, width: 1 }}
          mobileSxProps={{
            p: pxToRem(20),
          }}
        >
          Go to Checkout
        </ContainedButton>
        <Link
          component={RouterLink}
          href={paths.main.shop.root}
          sx={{
            color: 'black',
            mt: pxToRem(20),
            width: 1,
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
      </Box>
      <CartDialogForm open={open.value} onClose={open.onFalse} />
    </>
  );
}

type BlockProps = {
  value: any;
  label: any;
  sx?: {
    root?: SxProps;
    value?: SxProps;
    label?: SxProps;
  };
};
function Block({ value, label, sx }: BlockProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={sx?.root}
      width={1}
    >
      <Typography
        sx={{
          fontSize: pxToRem(18),
          fontWeight: 300,
          lineHeight: '1.51222',

          color: '#00000099',
          ...sx?.label,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: pxToRem(18),
          fontWeight: 600,
          lineHeight: 1.5122,
          color: '#000000',
          ...sx?.value,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

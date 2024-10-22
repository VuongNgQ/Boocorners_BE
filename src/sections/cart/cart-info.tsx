import type { SxProps } from '@mui/material';
import type { ICustomerCheckout } from 'src/types/order';

import { useMemo, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Link,
  Stack,
  Divider,
  useTheme,
  Typography,
  RadioGroup,
  FormHelperText,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';
import { truncateTextMiddle } from 'src/utils/text';

import { pxToRem } from 'src/theme/styles';
import { createOrder } from 'src/actions/order';
import { createCartBatch } from 'src/actions/cart';
import {
  SHIPPING_COST,
  CHECKOUT_FAILED_RETURN_URL,
  CHECKOUT_SUCCESS_RETURN_URL,
} from 'src/config-global';

import { toast } from 'src/components/snackbar';
import { SvgColor } from 'src/components/svg-color';

import { useCartContext } from './context';
import CartDialogForm from './cart-dialog-form';
import CustomRadio from './_partials/custom-radio';
import { ContainedButton } from '../_partials/buttons';

type ICustomerInfo = ICustomerCheckout & {
  id: number;
};
export default function CartInfo() {
  const [shipCost, setShipCost] = useState(() => SHIPPING_COST || 0);

  const [customerInfo, setCustomerInfo] = useState<ICustomerInfo | null | 'empty'>(null);

  const theme = useTheme();

  const open = useBoolean();

  const isSubmitting = useBoolean();

  const isPrepaid = useBoolean();

  const { products } = useCartContext();

  const total = useMemo(
    () => products.reduce((acc, product) => acc + product.price * product.quantityInCart, 0),
    [products]
  );

  const paidAmount = useMemo(() => {
    if (isPrepaid.value) return (total + shipCost) * 0.7;
    return total + shipCost;
  }, [isPrepaid.value, total, shipCost]);
  const handleCheckout = async () => {
    if ((customerInfo as any)?.id) {
      try {
        isSubmitting.onTrue();
        const customerId = (customerInfo as ICustomerInfo).id;
        const createCartResponse = await createCartBatch({
          cartId: customerId,
          items: products.map((product) => ({
            productId: product.id,
            quantity: product.quantityInCart,
          })),
        });
        const cartId = createCartResponse.details.id as number;
        const orderResponse = await createOrder({
          cartId,
          customerInfoId: customerId,
          returnUrl: CHECKOUT_SUCCESS_RETURN_URL,
          cancelUrl: CHECKOUT_FAILED_RETURN_URL,
          prepaid: isPrepaid.value,
          description: '',
        });
        const qrPageUrl = orderResponse?.data?.checkoutUrl;
        if (qrPageUrl) window.location.replace(qrPageUrl);
        else toast.error('Something went wrong! Please try again later.');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong! Please try again later.');
      } finally {
        isSubmitting.onFalse();
      }
    }
  };
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

              ...(customerInfo === 'empty' && {
                border: `1px solid ${theme.palette.error.light}`,
              }),
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
              {customerInfo === null || customerInfo === 'empty' ? (
                <>
                  Nguyễn Thị Anh Thư | (+84) 123 123 123 <br />
                  23 Tên đường Phường, Quận, Thành phố
                </>
              ) : (
                <>
                  {customerInfo.fullName} | {customerInfo.phoneNumber} <br />
                  {truncateTextMiddle(customerInfo.shippingAddress, 36)}
                </>
              )}
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
          <FormHelperText error sx={{ mt: pxToRem(4) }}>
            {customerInfo === 'empty' ? 'Bạn chưa điền thông tin!' : ''}
          </FormHelperText>
          <Box
            sx={{
              mt: {
                xs: pxToRem(21),
                md: pxToRem(17),
              },
            }}
          >
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
            {/* <Block
              label="Phí vận chuyển"
              value={fCurrency(shipCost)}
              sx={{
                root: { mt: pxToRem(20) },
              }}
            /> */}
            <Divider
              sx={{
                border: '2px solid #000000',
                my: pxToRem(20),
              }}
            />
            <Block
              label="Tổng đơn"
              value={fCurrency(total + shipCost)}
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
            defaultValue="100"
            row
            sx={{
              '& .MuiButtonBase-root.MuiRadio-root': {
                p: 0,
              },
              columnGap: pxToRem(42),
            }}
          >
            <CustomRadio value="100" label="100%" onClick={isPrepaid.onFalse} />
            <CustomRadio value="70" label="70%" onClick={isPrepaid.onTrue} />
          </RadioGroup>
        </Box>
        <ContainedButton
          sx={{
            borderRadius: 0,
            p: pxToRem(20),
            maxWidth: 1,
            width: 1,
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
          mobileSxProps={{
            p: pxToRem(20),
          }}
        >
          <Block
            label="Thanh toán trước để đặt hàng"
            value={fCurrency(paidAmount)}
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
            '&:hover': {
              backgroundColor: '#D1D1D1',
            },
          }}
          mobileSxProps={{
            p: pxToRem(20),
          }}
        >
          <Block
            label="Cần thanh toán khi nhận hàng"
            value={fCurrency(total + shipCost - paidAmount)}
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

        <LoadingButton
          variant="contained"
          sx={{
            mt: pxToRem(22),
            fontSize: pxToRem(14),
            lineHeight: '1.51222',
            backgroundColor: 'black',
            borderRadius: 0,
            p: pxToRem(20),
            maxWidth: 1,
            width: 1,
            [theme.breakpoints.down('md')]: {
              p: pxToRem(20),
              fontSize: pxToRem(14),
            },
          }}
          loading={isSubmitting.value}
          onClick={() => {
            if (customerInfo === null) setCustomerInfo('empty');
            else if (customerInfo !== 'empty') {
              handleCheckout();
            }
          }}
        >
          Go to Checkout
        </LoadingButton>
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
      <CartDialogForm open={open.value} onClose={open.onFalse} onInfo={setCustomerInfo} />
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

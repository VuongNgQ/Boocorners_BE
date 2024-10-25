import type { DialogProps } from '@mui/material';
import type { ICustomerCheckout } from 'src/types/order';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Dialog, useTheme, Typography, DialogTitle } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type CustomerInfoSchemaType = zod.infer<typeof customerInfoSchema>;

export const customerInfoSchema = zod.object({
  fullName: zod.string().min(1, { message: 'Full name is required!' }),
  phoneNumber: zod
    .string()
    .min(1, { message: 'Phone number is required!' })
    .refine(
      (value) => {
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
        return phoneRegex.test(value);
      },
      {
        message: 'Invalid phone number format!',
      }
    ),
  email: zod
    .string()
    .email('Invalid email address format!')
    .min(1, { message: 'Email address is required!' }),
  shippingAddress: zod.string().min(1, { message: 'Shipping address is required!' }),
});

// ----------------------------------------------------------------------

type Props = Omit<DialogProps, 'children' | 'onClose'> & {
  onClose: VoidFunction;
  onInfo: (info: ICustomerCheckout) => void;
};
export default function CartDialogForm({ onClose, onInfo: onSubmitEvent, ...props }: Props) {
  const theme = useTheme();
  const defaultValues = useMemo(
    () => ({
      fullName: '',
      email: '',
      phoneNumber: '',
      shippingAddress: '',
    }),
    []
  );
  const methods = useForm<CustomerInfoSchemaType>({
    mode: 'all',
    resolver: zodResolver(customerInfoSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [props.open, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      onSubmitEvent(data);
      onClose();
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      {...props}
      onClose={onClose}
      PaperProps={{
        sx: {
          maxWidth: pxToRem(757),
          width: '75%',
          px: pxToRem(64),
          pt: pxToRem(46),
          pb: pxToRem(86),
          borderRadius: pxToRem(19),
          overflowY: 'visible',
          [theme.breakpoints.down('md')]: {
            px: pxToRem(25),
            pt: pxToRem(14),
            pb: pxToRem(45),
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 0,
          pb: pxToRem(18),
          borderBottom: '0.7px solid #000000',
          [theme.breakpoints.down('md')]: {
            pb: pxToRem(9.26),
          },
        }}
      >
        <SvgColor
          src="/assets/icons/arrow-left-bold.svg"
          sx={{
            flexShrink: 0,
            height: pxToRem(17),
            width: pxToRem(9),
            mr: pxToRem(11),
            [theme.breakpoints.down('md')]: {
              width: pxToRem(3.52),
              height: pxToRem(9.01),
              mr: pxToRem(7),
            },
          }}
        />
        <Box
          sx={{
            fontSize: pxToRem(24),
            lineHeight: '1.51222',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            [theme.breakpoints.down('md')]: {
              fontSize: pxToRem(12),
              letterSpacing: '1px',
            },
          }}
        >
          Thông tin
        </Box>
      </DialogTitle>
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack
          sx={{
            maxWidth: { xs: 160, md: 410 },
            pt: { xs: pxToRem(28), md: pxToRem(54) },
            mx: 'auto',
          }}
          width={1}
          spacing={{ xs: pxToRem(9.5), md: pxToRem(18) }}
        >
          <FieldBlock name="fullName" label="Họ và Tên" />
          <FieldBlock name="shippingAddress" label="Địa chỉ" />
          <FieldBlock name="phoneNumber" label="Số điện thoại" />
          <FieldBlock name="email" label="Gmail " />

          <LoadingButton
            variant="contained"
            sx={{
              mt: pxToRem(76 - 18),
              borderRadius: 0,
              py: pxToRem(15),
              maxWidth: pxToRem(256),
              mx: 'auto',
              width: 1,
              fontSize: pxToRem(14),
              fontWeight: 500,
              lineHeight: pxToRem(21.17),
              backgroundColor: 'black',
              color: 'white',
              [theme.breakpoints.down('md')]: {
                mt: pxToRem(40 - 9.5),
                maxWidth: pxToRem(100),
                fontSize: pxToRem(10),
                py: pxToRem(8),
                width: 1,
                px: 0,
              },
            }}
            loading={isSubmitting}
            type="submit"
          >
            Xác nhận
          </LoadingButton>
        </Stack>
      </Form>
    </Dialog>
  );
}

type FieldBlockProps = {
  label: string;
  name: string;
};
function FieldBlock({ label, name }: FieldBlockProps) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: { xs: pxToRem(10), md: pxToRem(16) },
          lineHeight: '1.51222',
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>
      <Field.Text
        name={name}
        fullWidth
        sx={{
          borderRadius: 0,
          height: { xs: 22.5, md: 42 },
          '& .MuiInputBase-root': {
            height: 1,
          },
          '& fieldset': {
            borderRadius: 0,
            border: '0.5px solid #000000',
          },
          '& .MuiFormHelperText-root': {
            mt: pxToRem(2),
          },
        }}
      />
    </Box>
  );
}

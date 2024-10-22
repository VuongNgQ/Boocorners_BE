/* eslint-disable react/no-unescaped-entities */
import { Box, Stack, Container, Typography } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

type Props = {
  status?: 'success' | 'failed';
};
export default function OrderStatusView({ status }: Props) {
  let content = (
    <Stack spacing={2} sx={{ p: 4, height: 1 }} justifyContent="center" alignItems="center">
      <Iconify
        icon="lets-icons:done-ring-round"
        sx={{
          width: 150,
          height: 150,
          color: 'success.main',
        }}
      />
      <Typography variant="h3" sx={{ textAlign: 'center', maxWidth: pxToRem(600) }}>
        🎉 Success! Your order is confirmed!
      </Typography>

      <Typography sx={{ maxWidth: pxToRem(700) }}>
        Thank you for shopping with us. Your order has been successfully placed, and we’re getting
        it ready for shipment. <br /> <br /> We’ve sent a confirmation email with your order
        details. Track your order status from your account or contact support if you need any
        assistance.
        <br /> <br />
        Happy shopping!
      </Typography>
    </Stack>
  );
  if (status === 'failed')
    content = (
      <Stack spacing={2} sx={{ p: 4, height: 1 }} justifyContent="center" alignItems="center">
        <Box
          component="video"
          muted
          autoPlay
          width={150}
          height={150}
          loop
          sx={{ transform: 'scale(1.2)' }}
        >
          <source src="/assets/checkout-failed.webm" type="video/webm" />
        </Box>
        <Typography variant="h3" sx={{ textAlign: 'center', maxWidth: pxToRem(600) }}>
          Oops! Order Not Completed
        </Typography>

        <Typography sx={{ maxWidth: pxToRem(700) }}>
          Unfortunately, we couldn't process your payment. Please check your payment details or try
          another method. <br />
          <br />
          If the issue persists, feel free to contact our support team for assistance. We're here to
          help you complete your purchase.
        </Typography>
      </Stack>
    );
  return (
    <Container
      sx={{
        mb: 8,
      }}
    >
      {content}
    </Container>
  );
}

import type { DialogProps } from '@mui/material';

import { Box, Stack, Dialog, useTheme, InputBase, Typography, DialogTitle } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';

import { ContainedButton } from '../_partials/buttons';

type Props = Omit<DialogProps, 'children' | 'onClose'> & {
  onClose: VoidFunction;
};
export default function CartDialogForm({ onClose, ...props }: Props) {
  const theme = useTheme();
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

      <Stack
        sx={{
          maxWidth: { xs: 160, md: 410 },
          pt: { xs: pxToRem(28), md: pxToRem(54) },
          mx: 'auto',
        }}
        width={1}
        spacing={{ xs: pxToRem(9.5), md: pxToRem(18) }}
      >
        <FieldBlock label="Họ và Tên" />
        <FieldBlock label="Địa chỉ" />
        <FieldBlock label="Số điện thoại" />
        <FieldBlock label="Gmail " />

        <ContainedButton
          smallFontSize
          sx={{
            mt: pxToRem(76 - 18),
            borderRadius: 0,
            py: pxToRem(15),
            maxWidth: pxToRem(256),
            mx: 'auto',
            width: 1,
            lineHeight: '1.51222',
            [theme.breakpoints.down('md')]: {
              mt: pxToRem(40 - 9.5),
              maxWidth: pxToRem(100),
              fontSize: pxToRem(10),
              py: pxToRem(8),
              px: 0,
            },
          }}
        >
          Xác nhận
        </ContainedButton>
      </Stack>
    </Dialog>
  );
}

type FieldBlockProps = {
  label: string;
};
function FieldBlock({ label }: FieldBlockProps) {
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
      <InputBase
        fullWidth
        sx={{ borderRadius: 0, border: '0.5px solid #000000', height: { xs: 22.5, md: 42 } }}
      />
    </Box>
  );
}

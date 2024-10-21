import type { SxProps, ButtonProps } from '@mui/material';

import { Button, useTheme } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { pxToRem } from 'src/theme/styles';

type Props = ButtonProps & {
  smallFontSize?: boolean;
  mobileSxProps?: SxProps;
};
export default function TextedButton({
  children,
  smallFontSize,
  sx,
  mobileSxProps,
  ...buttonProps
}: Props) {
  const theme = useTheme();
  return (
    <Button
      LinkComponent={RouterLink}
      href="."
      sx={{
        px: pxToRem(54),
        py: pxToRem(16),
        fontWeight: 500,
        ...(smallFontSize
          ? { fontSize: pxToRem(14), lineHeight: pxToRem(21.17) }
          : { fontSize: pxToRem(16), lineHeight: pxToRem(24.19) }),

        borderRadius: 0,
        backgroundColor: 'transparent',
        color: 'black',
        [theme.breakpoints.down('md')]: {
          fontSize: pxToRem(14),
          lineHeight: pxToRem(21.17),
          width: 1,
          ...mobileSxProps,
        },
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
        },
        ...sx,
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

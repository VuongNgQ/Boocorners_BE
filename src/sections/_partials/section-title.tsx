import type { TypographyProps } from '@mui/material';

import { useTheme, Typography } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

type Props = TypographyProps;
export default function SectionTitle({ children, ...props }: Props) {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        fontSize: pxToRem(48),
        lineHeight: pxToRem(57.6),
        textAlign: 'center',
        fontWeight: 900,
        textTransform: 'uppercase',
        mb: pxToRem(55),
        color: 'black',
        fontFamily: theme.typography.fontSecondaryFamily,
        [theme.breakpoints.down('md')]: {
          fontSize: pxToRem(32),
          lineHeight: pxToRem(38.4),
          mb: pxToRem(32),
        },
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}

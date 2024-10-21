import { Stack, useTheme, Typography } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';

type Props = {
  label: string;
  onClick: () => void;
};

export default function ShopFiterItem({ label, onClick }: Props) {
  const theme = useTheme();

  return (
    <Stack
      minWidth={0}
      width={1}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      onClick={onClick}
      sx={{
        borderBottom: '1px solid transparent',
        '&:hover': {
          cursor: 'pointer',
          borderBottom: '1px solid #333',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: pxToRem(16),
          fontWeight: 400,
          lineHeight: pxToRem(24.19),
          color: '#797979',
          flex: 1,
          [theme.breakpoints.down('md')]: {
            fontSize: pxToRem(14),
            lineHeight: pxToRem(21.17),
            fontWeight: 300,
          },
        }}
      >
        {label}
      </Typography>
      <SvgColor
        src="/assets/icons/arrow-down.svg"
        sx={{
          flexShrink: 0,
          transform: 'rotate(270deg)',
          width: pxToRem(11.5),
          height: pxToRem(6.5),
          color: '#797979',
        }}
      />
    </Stack>
  );
}

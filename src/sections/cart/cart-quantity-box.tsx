import type { SxProps } from '@mui/material';

import { useState } from 'react';

import { Box } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';

type Props = {
  sx?: SxProps;
  quantity: number;
  onChange: (value: number) => void;
};
export default function CartQuantityBox({ sx, quantity, onChange }: Props) {
  const [value, setValue] = useState(quantity || 1);

  const handleDescrease = () => {
    if (value > 1) {
      setValue(value - 1);
      onChange(value - 1);
    }
  };
  const handleIncrease = () => {
    setValue(value + 1);
    onChange(value + 1);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: pxToRem(7), ...sx }}>
      <Block onClick={handleDescrease} sx={{ position: 'relative' }}>
        <SvgColor
          src="/assets/icons/minus.svg"
          sx={{
            width: pxToRem(10),
            height: pxToRem(2.3),
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </Block>
      <Block sx={{ position: 'relative' }}>
        <Box
          sx={{
            fontSize: pxToRem(10),
            lineHeight: pxToRem(10),
            fontWeight: 500,
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-43%)',
          }}
        >
          {value}
        </Box>
      </Block>
      <Block onClick={handleIncrease}>
        <SvgColor
          src="/assets/icons/plus.svg"
          sx={{
            width: pxToRem(10),
            height: pxToRem(10),
          }}
        />
      </Block>
    </Box>
  );
}
type BlockProps = {
  children: any;
  onClick?: VoidFunction;
  sx?: SxProps;
};
function Block({ children, onClick, sx }: BlockProps) {
  return (
    <Box
      sx={{
        width: pxToRem(20),
        height: pxToRem(20),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.2px solid #000000',
        borderRadius: 9999,
        ...(onClick && {
          cursor: 'pointer',
          transition: 'all 200ms ease-in',
          '&:hover': {
            backgroundColor: 'black',
            color: 'white',
          },
        }),
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
}

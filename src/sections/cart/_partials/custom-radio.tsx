import type { FormControlLabelProps } from '@mui/material';

import { Box, Radio, FormControlLabel } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';

type Props = Omit<FormControlLabelProps, 'control'>;
export default function CustomRadio({ sx, ...props }: Props) {
  return (
    <FormControlLabel
      control={
        <Radio
          size="small"
          icon={
            <Box
              sx={{
                width: pxToRem(20),
                height: pxToRem(20),
                borderRadius: 9999,

                border: '0.2px solid #000000',
              }}
            />
          }
          checkedIcon={
            <Box
              sx={{
                width: pxToRem(20),
                height: pxToRem(20),
                backgroundColor: 'black',
                borderRadius: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SvgColor
                src="/assets/icons/check.svg"
                sx={{
                  width: pxToRem(9),
                  height: pxToRem(7),
                  color: 'white',
                }}
              />
            </Box>
          }
        />
      }
      sx={{
        fontSize: pxToRem(18),
        fontWeight: 300,
        color: 'black',
        lineHeight: '1.51222',
        alignItems: 'center',
        mx: 0,
        '& .MuiFormControlLabel-label': {
          ml: pxToRem(4),
        },
        ...sx,
      }}
      {...props}
    />
  );
}

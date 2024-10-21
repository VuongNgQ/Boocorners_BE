import type { IconButtonProps } from '@mui/material/IconButton';

import IconButton from '@mui/material/IconButton';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

export type MenuButtonProps = IconButtonProps;

export function MenuButton({ sx, ...other }: IconButtonProps) {
  return (
    <IconButton sx={sx} {...other}>
      <SvgColor src="/assets/icons/menu.svg" />
    </IconButton>
  );
}

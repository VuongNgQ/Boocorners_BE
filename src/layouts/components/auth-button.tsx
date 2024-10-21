import { useState } from 'react';

import { Box, Menu, Portal, Divider, MenuItem, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { pxToRem } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

import { useAuthContext } from 'src/auth/hooks';

export default function AuthButton() {
  const { authenticated, user } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // logoutt
  };

  return (
    <>
      <Box
        sx={{
          minWidth: 0,
          flexShrink: 0,
          cursor: 'pointer',
          width: { xs: pxToRem(15), md: pxToRem(24) },
          height: { xs: pxToRem(15), md: pxToRem(24) },
          color: 'inherit',
        }}
        {...(authenticated
          ? { onClick: handleClick }
          : {
              component: RouterLink,
              href: paths.auth.jwt.signIn,
            })}
      >
        <Iconify
          icon={authenticated ? 'octicon:feed-person-16' : 'gravity-ui:person'}
          sx={{
            width: 1,
            height: 1,
            display: 'block',
          }}
        />
      </Box>
      {authenticated && (
        <Portal>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              sx: {},
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: {
                sx: {
                  background: '#fff',
                  borderRadius: 0,
                  minWidth: 150,
                  maxWidth: 320,
                  mt: 2,
                },
                elevation: 20,
              },
            }}
          >
            <Typography
              noWrap
              sx={{ fontSize: { xs: pxToRem(12), md: pxToRem(20) }, fontWeight: 300, px: 0.5 }}
            >
              {user?.email || 'Your mail'}
            </Typography>
            <Divider
              sx={{
                my: 1,
              }}
            />
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogout();
              }}
              sx={{
                color: 'error.main',
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Portal>
      )}
    </>
  );
}

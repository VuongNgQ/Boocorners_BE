import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { pxToRem } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type FooterProps = {
  layoutQuery: Breakpoint;
  sx?: SxProps<Theme>;
};

export function Footer({ layoutQuery, sx }: FooterProps) {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
        borderTop: '1px solid #000',
        backgroundColor: '#F0F0F0',
        pt: pxToRem(73),
        pb: pxToRem(45),
        [theme.breakpoints.down(layoutQuery)]: {
          pt: pxToRem(26),
          pb: pxToRem(38),
        },
        ...sx,
      }}
    >
      <Container
        sx={{
          [theme.breakpoints.up(layoutQuery)]: { textAlign: 'unset' },
          [theme.breakpoints.up('lg')]: {
            px: 0,
            maxWidth: pxToRem(1240),
          },
        }}
      >
        <Grid
          container
          sx={{
            [theme.breakpoints.up(layoutQuery)]: { justifyContent: 'space-between' },
          }}
        >
          <Grid {...{ xs: 12, [layoutQuery]: 3 }}>
            <Logo />

            <Typography
              variant="body2"
              sx={{
                mt: { xs: pxToRem(9), md: 3 },

                maxWidth: { xs: 1, [layoutQuery]: 248 },
              }}
            >
              Browse a wide range of internationally branded cosmetics with clear origins to support
              your beauty and meet your needs.
            </Typography>

            <Stack
              direction="row"
              sx={{
                mt: { xs: pxToRem(4), md: 3 },
                mb: { xs: pxToRem(34.42), md: 5 },
              }}
            >
              <IconButton
                sx={{
                  border: '1px solid currentColor',
                  backgroundColor: 'black',
                  width: pxToRem(28),
                  height: pxToRem(28),
                  mr: pxToRem(12),
                  '&:hover': {
                    backgroundColor: 'black',
                    opacity: 0.6,
                  },
                }}
                href="https://www.facebook.com/profile.php?id=61567142842383&mibextid=LQQJ4d"
                rel="noreferrer"
                target="_blank"
              >
                <SvgColor
                  src="/assets/icons/socials/facebook.svg"
                  sx={{ color: 'white', width: pxToRem(6.5) }}
                />
              </IconButton>
              <IconButton
                sx={{
                  border: '1px solid #00000033',
                  p: pxToRem(7.23),
                  flexShrink: 0,
                  width: pxToRem(28),
                  height: pxToRem(28),
                }}
                href="https://www.instagram.com/boo.corners?igsh=dzV0b3IwMWVueXcz"
                target="_blank"
                rel="noreferrer"
              >
                <SvgColor
                  src="/assets/icons/socials/instagram.svg"
                  sx={{
                    width: pxToRem(13.55),
                    height: pxToRem(13.55),
                  }}
                />
              </IconButton>
            </Stack>
          </Grid>

          <Grid {...{ xs: 12, [layoutQuery]: 6 }}>
            <Stack
              spacing={5}
              sx={{
                flexDirection: 'row',
                [theme.breakpoints.up(layoutQuery)]: { flexDirection: 'row' },
              }}
            >
              <Stack
                sx={{
                  width: 1,
                }}
              >
                <Typography
                  component="div"
                  variant="overline"
                  sx={{
                    fontSize: pxToRem(16),
                    lineHeight: pxToRem(18),
                    letterSpacing: pxToRem(3),
                    fontWeight: 500,
                    mb: pxToRem(7),
                  }}
                >
                  HELP
                </Typography>

                {[
                  {
                    name: 'Customer Support',
                    href: '',
                  },
                  {
                    name: 'Delivery Details',
                    href: '',
                  },
                  {
                    name: 'Terms & Conditions',
                    href: '',
                  },
                  {
                    name: 'Privacy Policy',
                    href: '',
                  },
                ].map((link) => (
                  <Link
                    key={link.name}
                    component={RouterLink}
                    href={link.href}
                    color="inherit"
                    variant="body2"
                    sx={{
                      color: '#606060',
                      mt: pxToRem(19),
                      fontSize: pxToRem(16),
                      lineHeight: pxToRem(19),
                      fontWeight: 400,
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export type HomeFooterProps = {
  sx?: SxProps<Theme>;
};

export function HomeFooter({ sx }: HomeFooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
        ...sx,
      }}
    >
      <Container>
        <Logo />
        <Box sx={{ mt: 1, typography: 'caption' }}>
          © All rights reserved.
          <br /> made by
          <Link href="https://minimals.cc/"> minimals.cc </Link>
        </Box>
      </Container>
    </Box>
  );
}

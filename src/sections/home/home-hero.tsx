import type { StackProps } from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { pxToRem } from 'src/theme/styles';

import Link from '@mui/material/Link';
import { ContainedButton } from '../_partials/buttons';

// ----------------------------------------------------------------------

export function HomeHero({ sx, ...other }: StackProps) {
  const theme = useTheme();

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: '#F2F0F1',
          pt: { xs: pxToRem(36), md: pxToRem(100) },
          pb: { xs: pxToRem(38), md: pxToRem(55) },
        }}
      >
        <Grid
          container
          spacing={{
            xs: 0,
            md: 8.625,
            [theme.breakpoints.between('md', 1100)]: 5,
          }}
          sx={{
            mx: 'auto',
            [theme.breakpoints.up('lg')]: {
              maxWidth: pxToRem(1240),
              px: '0px !important',
            },
          }}
        >
          <Grid
            xs={12}
            md={6}
            sx={{
              pl: 0,
            }}
          >
            <Box sx={{ px: { xs: 2, md: 0 } }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: pxToRem(36), md: pxToRem(64) },
                  lineHeight: 1,
                  fontFamily: theme.typography.fontSecondaryFamily,
                  color: 'black',
                }}
              >
                FIND{' '}
                <Box
                  component="br"
                  sx={{
                    display: {
                      xs: 'block',
                      sm: 'none',
                    },
                  }}
                />
                PRODUCTS{' '}
                <Box
                  component="br"
                  sx={{
                    display: {
                      xs: 'block',
                      sm: 'none',
                    },
                  }}
                />
                THAT MATCHES YOURSELF
              </Typography>
              <Typography
                sx={{
                  color: '#616060',
                  fontWeight: 400,

                  lineHeight: pxToRem(22),
                  mt: pxToRem(23),
                  [theme.breakpoints.down('md')]: {
                    mt: pxToRem(16),
                    fontSize: pxToRem(14),
                    lineHeight: pxToRem(20),
                  },
                }}
              >
                Browse a wide range of internationally branded cosmetics with clear origins to
                support your beauty and meet your needs.
              </Typography>
              <ContainedButton
                href="./shop"
                sx={{
                  fontSize: pxToRem(16),
                  lineHeight: pxToRem(24.19),
                  mt: pxToRem(46),
                  maxWidth: pxToRem(210),
                  width: 1,
                  [theme.breakpoints.down('md')]: {
                    mt: pxToRem(28),
                    fontSize: pxToRem(16),
                    lineHeight: pxToRem(24.19),
                    maxWidth: 'unset',
                  },
                }}
              >
                Shop Now
              </ContainedButton>{' '}
            </Box>
          </Grid>
          <Grid xs={12} md={6} sx={{ pr: 0 }}>
            <Box
              component="img"
              src="/assets/images/home/hero-girl.png"
              alt="Hero girl"
              sx={{
                mt: {
                  xs: pxToRem(28),
                  md: 0,
                },
                maxWidth: { xs: 1, md: pxToRem(649) },
                maxHeight: { xs: 'unset', md: pxToRem(508) },
                width: 1,
                aspectRatio: 'auto 390/269',
              }}
            />
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          width: 1,
          height: { xs: pxToRem(84), md: pxToRem(122) },
          backgroundColor: 'black',
        }}
      />
    </>
  );
}

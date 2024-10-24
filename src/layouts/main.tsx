import type { Breakpoint } from '@mui/material';

import { useRef } from 'react';

import { Box, Link, Paper, Popover, useTheme, Container } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { pxToRem } from 'src/theme/styles';
import { useGetCategories } from 'src/actions/category';

import { SvgColor } from 'src/components/svg-color';
import { navSectionClasses } from 'src/components/nav-section';

import { Footer } from './footer';
import { layoutClasses } from './classes';
import SearchBar from './components/search-bar';
import MenuMobile from './components/menu-mobile';
import { HeaderSection } from './core/header-section';
import { MenuButton } from './components/menu-button';

export type MainLayoutProps = {
  children: React.ReactNode;
};
export default function MainLayout({ children }: MainLayoutProps) {
  const theme = useTheme();

  const navItemRef = useRef<HTMLAnchorElement | null>(null);

  const mobileNavOpen = useBoolean();

  const isHoverOnShop = useBoolean();

  const layoutQuery: Breakpoint = 'md';

  const { categories } = useGetCategories();

  return (
    <>
      <MenuMobile
        open={mobileNavOpen.value}
        onClose={mobileNavOpen.onFalse}
        categories={categories}
      />
      <Box id="root__layout" className={layoutClasses.root}>
        <HeaderSection
          layoutQuery={layoutQuery}
          sx={{
            '--layout-header-desktop-height': pxToRem(96),
            '--layout-header-mobile-height': pxToRem(88),
            '--layout-header-zIndex': 99,
            backgroundColor: 'white',
            pb: { xs: 0, md: pxToRem(29) },
          }}
          slotProps={{
            container: {
              sx: {
                [theme.breakpoints.up('lg')]: {
                  maxWidth: pxToRem(1240),
                  px: 0,
                },
              },
            },
          }}
          slots={{
            leftArea: (
              <>
                {/* -- Menu button -- */}
                <MenuButton
                  data-slot="menu-button"
                  onClick={mobileNavOpen.onTrue}
                  sx={{ mr: 1, ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
                />

                {/* -- Logo -- */}
                <Box
                  component={RouterLink}
                  href="/"
                  sx={{
                    textDecoration: 'none',
                    color: 'black',
                    fontSize: {
                      xs: pxToRem(25.2),
                      md: pxToRem(40),
                    },

                    lineHeight: { xs: 1, md: 1.2 },
                    fontWeight: 700,
                    fontFamily: theme.typography.fontSecondaryFamily,
                  }}
                >
                  BOOCORNERS
                </Box>
              </>
            ),
            rightArea: (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: pxToRem(16), md: pxToRem(34) },
                  flexShrink: 0,
                  minWidth: 0,
                  maxWidth: '50%',
                  justifyContent: 'flex-end',
                  width: { xs: 'unset', md: 1 },
                  ml: {
                    xs: 'auto',
                    md: '0',
                  },
                  pr: {
                    xs: pxToRem(16),
                    md: 0,
                  },
                }}
              >
                <SearchBar
                  sx={{
                    [theme.breakpoints.down(layoutQuery)]: {
                      display: 'none',
                    },
                  }}
                />
                {/* <Box
                  sx={{
                    cursor: 'pointer',
                    minWidth: 0,
                    flexShrink: 0,
                    width: {
                      xs: pxToRem(16),
                      md: pxToRem(27),
                    },
                    height: { xs: pxToRem(15), md: pxToRem(22.63) },
                  }}
                >
                   <Box
                  component="img"
                  alt="Heart icon"
                  src="/assets/icons/heart.png"
                  sx={{
                    display: 'block',
                    width: 1,
                    height: 1,
                  }}
                /> 
                </Box> */}
                <Box
                  sx={{
                    minWidth: 0,
                    flexShrink: 0,

                    cursor: 'pointer',
                    width: { xs: pxToRem(24), md: pxToRem(22) },
                    height: { xs: pxToRem(24), md: pxToRem(23.57) },
                  }}
                  component={RouterLink}
                  href={paths.main.cart.root}
                >
                  <Box
                    component="img"
                    alt="Heart icon"
                    src="/assets/icons/bag.png"
                    sx={{
                      display: 'block',
                      width: 1,
                      height: 1,
                    }}
                  />
                </Box>
                {/* <AuthButton /> */}
              </Box>
            ),
            bottomArea: (
              <Container
                sx={{
                  [theme.breakpoints.down(layoutQuery)]: {
                    display: 'none',
                  },
                  backgroundColor: 'white',
                  [theme.breakpoints.up('lg')]: {
                    maxWidth: pxToRem(1240),
                    px: 0,
                  },
                }}
              >
                <Box
                  component="ul"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    borderTop: '0.7px solid #000',
                    borderBottom: '0.7px solid #000',
                    pt: pxToRem(16),
                    pb: pxToRem(12),
                    color: '#000000',
                    fontSize: pxToRem(24),
                    fontWeight: 300,
                  }}
                >
                  <Box component="li">
                    <Link
                      component={RouterLink}
                      href={paths.main.news_arrival.root}
                      color="inherit"
                    >
                      New Arrival
                    </Link>
                  </Box>
                  <Box component="li">
                    <Link component={RouterLink} href={paths.main.on_sale.root} color="inherit">
                      On Sale
                    </Link>
                  </Box>
                  <Box component="li">
                    <Link
                      ref={navItemRef}
                      component={RouterLink}
                      href={paths.main.shop.root}
                      color="inherit"
                      sx={{ position: 'relative' }}
                      onMouseEnter={isHoverOnShop.onTrue}
                      onMouseLeave={isHoverOnShop.onFalse}
                    >
                      Shop
                      <SvgColor
                        src="/assets/icons/arrow-down.svg"
                        sx={{
                          width: pxToRem(11.5),
                          height: pxToRem(6.5),
                          position: 'absolute',
                          ml: pxToRem(6.5),
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      />
                    </Link>
                    <Popover
                      disableScrollLock
                      open={isHoverOnShop.value}
                      anchorEl={navItemRef.current}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                      slotProps={{
                        paper: {
                          onMouseEnter: isHoverOnShop.onTrue,
                          onMouseLeave: isHoverOnShop.onFalse,
                          sx: {
                            px: 0.75,
                            overflow: 'unset',
                            boxShadow: 'none',
                            backdropFilter: 'none',
                            background: 'transparent',
                            pt: 1,
                            mr: -100,
                            ...(isHoverOnShop.value && { pointerEvents: 'auto' }),
                          },
                        },
                      }}
                      sx={{ pointerEvents: 'none' }}
                    >
                      <Paper
                        className={navSectionClasses.paper}
                        elevation={20}
                        sx={{
                          minWidth: 180,
                          backgroundColor: 'white',
                          borderRadius: 1,
                          p: 1,
                          borderTop: '0.7px solid #000',
                          borderBottom: '0.7px solid #000',
                          fontSize: pxToRem(24),
                          fontWeight: 300,
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 1,
                        }}
                      >
                        {categories.map((item, index) => (
                          <Link
                            component={RouterLink}
                            key={index}
                            href={`${paths.main.shop.root}?page=0&pageSize=12&categoryId=${item.id}`}
                            sx={{ color: 'inherit' }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </Paper>
                    </Popover>
                  </Box>
                </Box>
              </Container>
            ),
          }}
        />
        {children}
        <Footer layoutQuery={layoutQuery} />
      </Box>
    </>
  );
}

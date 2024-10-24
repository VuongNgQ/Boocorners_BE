import type { Category } from 'src/types/category';

import { useEffect } from 'react';

import { Box, Link, Drawer, Collapse, Typography, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { pxToRem } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Scrollbar } from 'src/components/scrollbar';
import { navSectionClasses } from 'src/components/nav-section';

type Props = {
  open: boolean;
  onClose: () => void;
  categories: Category[];
};

export default function MenuMobile({ open, onClose, categories }: Props) {
  const pathname = usePathname();
  const showCate = useBoolean();

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClose = () => {
    onClose();
    showCate.onFalse();
  };
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          width: pxToRem(340),
          p: 4,
          position: 'relative',
          background: 'white',
        },
      }}
    >
      <IconButton
        size="small"
        sx={{ position: 'absolute', top: 8, right: 8 }}
        onClick={handleClose}
      >
        <Iconify icon="line-md:close" />
      </IconButton>
      <Box sx={{ mb: 3 }}>
        <Logo />
      </Box>
      <Scrollbar fillContent>
        <Box component="nav" display="flex" flexDirection="column" flex="1 1 auto" sx={{ pb: 3 }}>
          <Box
            component="ul"
            className={navSectionClasses.ul}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: pxToRem(24),
              '& li': {
                width: 1,
                fontSize: pxToRem(24),
                fontWeight: 300,
                cursor: 'pointer',
              },
            }}
          >
            <Box component="li">
              <Link component={RouterLink} href={paths.main.news_arrival.root} color="inherit">
                New Arrival
              </Link>
            </Box>
            <Box component="li">
              <Link component={RouterLink} href={paths.main.on_sale.root} color="inherit">
                On Sale
              </Link>
            </Box>
            <Box component="li">
              <Typography
                color="inherit"
                sx={{ position: 'relative', fontSize: pxToRem(24), fontWeight: 300 }}
                onClick={showCate.onToggle}
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
              </Typography>
              <Collapse in={showCate.value} sx={{ pl: 1 }}>
                {categories.map((item, index) => (
                  <Link
                    component={RouterLink}
                    key={index}
                    href={`/shop?page=0&pageSize=12&categoryId=${item.id}`}
                    sx={{ color: 'inherit', display: 'block', mt: 2 }}
                  >
                    {item.name}
                  </Link>
                ))}
              </Collapse>
            </Box>
          </Box>
        </Box>
      </Scrollbar>
    </Drawer>
  );
}

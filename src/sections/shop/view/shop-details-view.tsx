import type { Product } from 'src/types/product';

import { useMemo } from 'react';
import { useLocation } from 'react-router';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, useTheme, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';

import { pxToRem } from 'src/theme/styles';
import { useGetProductsN } from 'src/actions/product';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import HomeDisplay from 'src/sections/home/home-display';
import { useCartContext } from 'src/sections/cart/context';
import { TextedButton, ContainedButton } from 'src/sections/_partials/buttons';

import { ShopDetailsCarousel } from '../shop-details-carousel';

export type PreviousPage = 'news-arrivals' | 'on-sale' | 'shop';
type Props = {
  product: Product;
};
export default function ShopDetailsView({ product }: Props) {
  const theme = useTheme();
  const location = useLocation();
  const { products } = useGetProductsN({ page: 0, pageSize: 4, categoryId: product.category.id });
  const { onAddToCart, isInCart, onDeleteCart } = useCartContext();

  const queryParams = new URLSearchParams(location.search);
  const previous = queryParams.get('previous');

  const isAdd = useMemo(() => !isInCart(product?.id), [product, isInCart]);
  const breadCrumbsArr = useMemo(() => {
    const cateHref = (root: any) => `${root}?categoryId=${product.category.id}`;
    switch (previous) {
      case 'news-arrivals':
        return [
          {
            name: 'News Arrivals',
            href: paths.main.news_arrival.root,
          },
          {
            name: product.category.name,
            href: cateHref(paths.main.news_arrival.root),
          },
        ];

      case 'on-sale':
        return [
          {
            name: 'On Sale',
            href: paths.main.on_sale.root,
          },
          {
            name: product.category.name,
            href: cateHref(paths.main.on_sale.root),
          },
        ];

      default:
        return [
          {
            name: 'Shop',
            href: paths.main.shop.root,
          },
          {
            name: product.category.name,
            href: cateHref(paths.main.shop.root),
          },
        ];
    }
  }, [previous, product]);
  const links = [
    {
      href: '/',
      name: 'Home',
    },
    ...breadCrumbsArr,
    {
      name: product.manufacturer,
    },
  ];

  return (
    <Container
      maxWidth={false}
      sx={{
        [theme.breakpoints.up('lg')]: {
          maxWidth: pxToRem(1240),
          px: '0px !important',
        },
      }}
    >
      <CustomBreadcrumbs
        links={links}
        sx={{
          mb: pxToRem(22),
        }}
      />
      <Grid container sx={{ backgroundColor: 'white' }}>
        <Grid xs={12} md={6}>
          <Box sx={{ pr: { xs: 0, md: pxToRem(40) } }}>
            <ShopDetailsCarousel images={product.productPhotos.map((item) => item.path)} />
          </Box>
        </Grid>
        <Grid xs={12} md={6}>
          <Typography
            sx={{
              fontSize: pxToRem(40),
              lineHeight: pxToRem(48),
              fontWeight: 700,
              fontFamily: theme.typography.fontSecondaryFamily,
              [theme.breakpoints.down('md')]: {
                fontSize: pxToRem(24),
                lineHeight: pxToRem(28),
              },
            }}
          >
            {product.productName}
          </Typography>
          <Typography
            sx={{
              mt: pxToRem(13),
              fontSize: pxToRem(16),
              lineHeight: pxToRem(22),
              fontWeight: 400,
              [theme.breakpoints.down('md')]: {
                fontSize: pxToRem(14),
                lineHeight: pxToRem(20),
                pl: pxToRem(41),
              },
            }}
          >
            {product.description}
          </Typography>
          <Typography
            sx={{
              mt: pxToRem(58),
              fontWeight: 600,
              fontSize: pxToRem(32),
              lineHeight: pxToRem(48.38),
              [theme.breakpoints.down('md')]: {
                mt: pxToRem(90),

                fontSize: pxToRem(24),
                lineHeight: pxToRem(36.29),
              },
            }}
          >
            {fCurrency(product.price)}
          </Typography>

          <Box sx={{ width: 1, mt: { xs: pxToRem(88), md: pxToRem(165) } }}>
            <ContainedButton
              smallFontSize
              sx={{
                width: 1,
                maxWidth: '50%',
                borderRadius: 0,

                ...(!isAdd && {
                  backgroundColor: 'error.main',
                  color: 'white',
                }),
              }}
              mobileSxProps={{
                px: pxToRem(20),
              }}
              onClick={() => {
                if (isAdd) onAddToCart(product);
                else onDeleteCart(product.id);
              }}
            >
              {isAdd ? 'Add to cart' : 'Remove from cart'}
            </ContainedButton>
            <TextedButton
              smallFontSize
              sx={{ width: 1, maxWidth: '50%' }}
              mobileSxProps={{
                px: pxToRem(20),
              }}
              onClick={() => {
                onAddToCart(product);
                window.location.href = '/cart';
              }}
            >
              Buy Now
            </TextedButton>
          </Box>
        </Grid>

        <Grid xs={12}>
          <Box sx={{ mt: pxToRem(80) }}>
            <Typography
              sx={{
                display: 'block',
                mx: 'auto',
                textAlign: 'center',
                fontSize: pxToRem(20),
                lineHeight: pxToRem(22),
                pb: pxToRem(24),
                borderBottom: '2px solid #000',
                maxWidth: { xs: pxToRem(144), md: pxToRem(414) },
              }}
            >
              Product detail
            </Typography>
            <Typography
              sx={{
                maxWidth: { xs: pxToRem(318), md: pxToRem(1016) },
                mx: 'auto',
                mt: pxToRem(78),
                fontSize: pxToRem(16),
                lineHeight: pxToRem(22),
                fontWeight: 400,
                minHeight: { xs: 122, md: 344 },
                [theme.breakpoints.down('md')]: {
                  mt: pxToRem(33),
                  fontSize: pxToRem(14),
                  lineHeight: pxToRem(20),
                },
              }}
            >
              {product.productDetails.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Box
            sx={{
              width: 'fit-content',
              mx: 'auto',
              display: 'flex',
              alignItems: 'center',
              mb: {
                xs: pxToRem(120),
                md: pxToRem(176),
              },
              [theme.breakpoints.down('md')]: {
                maxWidth: pxToRem(318),
                width: 1,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: pxToRem(16),
                lineHeight: pxToRem(24.19),
                fontWeight: 400,
                [theme.breakpoints.down('md')]: {
                  fontSize: pxToRem(12),
                  lineHeight: pxToRem(18.14),
                },
              }}
            >
              Loại sản phẩm : {product.category.name}
            </Typography>
            <Typography
              sx={{
                ml: {
                  xs: 'auto',
                  md: pxToRem(199),
                },
                fontSize: pxToRem(16),
                lineHeight: pxToRem(24.19),
                fontWeight: 400,
                [theme.breakpoints.down('md')]: {
                  fontSize: pxToRem(12),
                  lineHeight: pxToRem(18.14),
                },
              }}
            >
              Thể tích : {product.volume}
            </Typography>
          </Box>
        </Grid>

        <Grid xs={12} marginBottom={10}>
          <HomeDisplay title="You might also like" product={products} />
        </Grid>
      </Grid>
    </Container>
  );
}

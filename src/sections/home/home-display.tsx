import type { SxProps } from '@mui/material';
import type { Product } from 'src/types/product';

import { Link as RouterLink } from 'react-router-dom';

import { Button, Divider, useTheme, Container } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { pxToRem } from 'src/theme/styles';

import { Carousel, useCarousel } from 'src/components/carousel';

import ProductCard from '../_partials/product-card';
import SectionTitle from '../_partials/section-title';

type Props = {
  title: string;
  product: Product[];
  href?: string;
  sx?: SxProps;
};
export default function HomeDisplay({ title, product, href, sx }: Props) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const carousel = useCarousel({
    slidesToShow: { xs: '70%', sm: 2, md: 4 },
    slideSpacing: mdUp ? '20px' : '16px',
  });
  return (
    <Container
      sx={{
        pt: pxToRem(59),
        [theme.breakpoints.up('lg')]: {
          maxWidth: pxToRem(1240),
          px: '0px !important',
        },

        ...sx,
      }}
    >
      <SectionTitle>{title}</SectionTitle>
      <Carousel carousel={carousel}>
        {product.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </Carousel>

      {href && (
        <Button
          component={RouterLink}
          to="/shop"
          href={href}
          sx={{
            mt: pxToRem(34),
            maxWidth: pxToRem(218),
            fontWeight: 500,
            lineHeight: pxToRem(24.19),
            fontSize: pxToRem(16),
            border: '1px solid #0000001A',
            width: 1,
            mx: 'auto',
            borderRadius: 99999,
            py: pxToRem(14),
            display: 'block',
            textAlign: 'center',
            [theme.breakpoints.down('md')]: {
              mt: pxToRem(23),
              maxWidth: 1,
              fontSize: pxToRem(14),
              lineHeight: pxToRem(21.17),
              py: pxToRem(12.5),
            },
          }}
        >
          View All
        </Button>
      )}
      {href && (
        <Divider
          sx={{
            backgroundColor: '#0000001A',
            borderBottomWidth: '1px',
            mt: { xs: pxToRem(40), md: pxToRem(64) },

            mx: 'auto',
          }}
        />
      )}
    </Container>
  );
}

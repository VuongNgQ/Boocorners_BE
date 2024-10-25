import type { SxProps } from '@mui/material';
import type { Product } from 'src/types/product';

import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react'; // Nhập Link

import dayjs from 'dayjs';

import { Box, Paper, useTheme, Typography } from '@mui/material';

import { fPercent, fCurrency } from 'src/utils/format-number';

import { pxToRem } from 'src/theme/styles';

import { Image } from 'src/components/image';

type Props = {
  product: Product;
  visibleByDefault?: boolean;
  sx?: SxProps;
  previousPage?: string;
};

export default function ProductCard({ product, visibleByDefault, sx, previousPage }: Props) {
  const theme = useTheme();

  const [imageSrc, setImageSrc] = useState(
    product.imageName ||
      'https://plus.unsplash.com/premium_photo-1683140435505-afb6f1738d11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hpcnR8ZW58MHx8MHx8fDA%3D'
  );

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageSrc(
      'https://plus.unsplash.com/premium_photo-1683140435505-afb6f1738d11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hpcnR8ZW58MHx8MHx8fDA%3D'
    );
  };

  const saleInfo = useMemo(() => {
    if (product?.sales?.length) {
      return product.sales.find((sale) => {
        const now = dayjs();
        return (
          sale.active && now.isBefore(dayjs(sale.endDate)) && now.isAfter(dayjs(sale.startDate))
        );
      });
    }
    return null;
  }, [product]);

  return (
    <Link
      to={`/shop/${product.id}?previous=${previousPage || 'shop'}`}
      style={{ textDecoration: 'none' }}
    >
      {' '}
      {/* Thêm Link ở đây */}
      <Paper sx={sx}>
        <Box sx={{ position: 'relative' }}>
          <Image
            src={imageSrc}
            alt={product.productName}
            ratio="1/1"
            sx={{ maxWidth: pxToRem(295), borderRadius: pxToRem(16) }}
            onError={handleError}
            visibleByDefault={visibleByDefault}
          />
        </Box>
        <Box id="cardContent">
          <Typography
            sx={{
              mt: pxToRem(14),
              fontWeight: 600,
              fontSize: pxToRem(20),
              lineHeight: pxToRem(30.24),
              textTransform: 'capitalize',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: pxToRem(60.48), // 2 lines * lineHeight
              [theme.breakpoints.down('md')]: {
                mt: pxToRem(9),
                fontWeight: 700,
                fontSize: pxToRem(16),
                lineHeight: pxToRem(24.19),
                minHeight: pxToRem(48.38), // 2 lines * lineHeight (for small screens)
              },
            }}
          >
            {product.productName}
          </Typography>

          {saleInfo ? (
            <Box
              sx={{
                mt: pxToRem(34),
                [theme.breakpoints.down('md')]: {
                  mt: pxToRem(21),
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: 0.5,
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    display: 'inline-table',
                    fontWeight: 500,
                    fontSize: pxToRem(18),
                    lineHeight: '1.51222',
                    textDecoration: 'line-through',
                    color: '#666',
                    [theme.breakpoints.down('md')]: {
                      mt: pxToRem(21),
                      fontWeight: 500,
                      fontSize: pxToRem(16),
                    },
                  }}
                >
                  {fCurrency(product.price)}
                </Typography>

                <Box
                  component="span"
                  sx={{ backgroundColor: 'error.light', color: 'error.darker', px: 0.5 }}
                >
                  {fPercent(saleInfo.discountPercentage)}
                </Box>
              </Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: pxToRem(24),
                  lineHeight: pxToRem(36.29),
                  [theme.breakpoints.down('md')]: {
                    mt: pxToRem(21),
                    fontWeight: 600,
                    fontSize: pxToRem(20),
                    lineHeight: pxToRem(30.24),
                  },
                }}
              >
                {fCurrency(product.price * (100 - saleInfo.discountPercentage))}
              </Typography>
            </Box>
          ) : (
            <Typography
              sx={{
                mt: pxToRem(34),
                fontWeight: 700,
                fontSize: pxToRem(24),
                lineHeight: pxToRem(36.29),
                [theme.breakpoints.down('md')]: {
                  mt: pxToRem(21),
                  fontWeight: 600,
                  fontSize: pxToRem(20),
                  lineHeight: pxToRem(30.24),
                },
              }}
            >
              {fCurrency(product.price)}
            </Typography>
          )}
        </Box>
      </Paper>
    </Link>
  );
}

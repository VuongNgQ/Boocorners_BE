import type { Product } from 'src/types/product';

import { useMemo, useState } from 'react';

import PaginationItem from '@mui/material/PaginationItem';
import {
  Box,
  Menu,
  Stack,
  Divider,
  useTheme,
  MenuItem,
  Typography,
  Pagination,
  paginationClasses,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { pxToRem } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';

import { useCartContext } from '../cart/context';
import ProductCard from '../_partials/product-card';
import { OutlinedButton } from '../_partials/buttons';

import type { PreviousPage } from './view/shop-details-view';

type Props = {
  products: Product[];
  onFilterClick: VoidFunction;
  categoryName: string | null;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  sort: string;
  onPageChange: (page: number) => void;
  onSortChange: (sort: string) => void;
  previoustPage?: PreviousPage;
};
export default function ShopList({
  onFilterClick,
  onPageChange,
  products,
  categoryName,
  currentPage,
  pageSize,
  totalItems: count,
  totalPages,
  previoustPage,
  sort,
  onSortChange,
}: Props) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const sortText = useMemo(() => {
    switch (sort) {
      case 'latest':
        return 'Latest';
      case 'highest-price':
        return 'Highest Price';
      case 'lowest-price':
        return 'Lowest Price';
      default:
        return 'Most Popular';
    }
  }, [sort]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (newSort: string) => {
    onSortChange(newSort);
    handleClose();
  };
  return (
    <Box width={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        width={1}
        sx={{
          [theme.breakpoints.only('xs')]: {
            px: pxToRem(16),
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: pxToRem(32),
            lineHeight: pxToRem(48.38),
            color: 'black',

            [theme.breakpoints.down('md')]: {
              fontSize: pxToRem(24),

              lineHeight: pxToRem(36.29),
            },
          }}
          noWrap
        >
          {categoryName || ''}
        </Typography>
        <Box
          sx={{
            flexShrink: 0,
            color: '#666',
            fontSize: pxToRem(16),
            fontWeight: 400,
            lineHeight: pxToRem(24.19),
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            columnGap: pxToRem(12),
            [theme.breakpoints.down('md')]: {
              fontSize: pxToRem(14),
              fontWeight: 300,
              lineHeight: pxToRem(21.17),
              columnGap: 0,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 'inherit',
              fontWeight: 'inherit',
              lineHeight: 'inherit',
              pt: {
                xs: pxToRem(3),
                md: 0,
              },
            }}
          >
            Showing {`${pageSize * currentPage + 1} - ${pageSize * currentPage + products.length}`}{' '}
            of {count} Products
          </Typography>
          {mdUp ? (
            <>
              <Typography sx={{ fontWeight: 500, mr: pxToRem(17) }}>
                Sort by:{' '}
                <Box
                  component="span"
                  sx={{
                    color: 'black',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.7,
                    },
                  }}
                  onClick={handleClick}
                >
                  {sortText}
                </Box>
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
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  sx: {},
                }}
                slotProps={{
                  paper: {
                    sx: {
                      background: '#fff',
                      borderRadius: 0,
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={() => handleSortChange('most-popular')}
                  selected={sort === 'most-popular'}
                >
                  Most Popular
                </MenuItem>
                <MenuItem onClick={() => handleSortChange('latest')} selected={sort === 'latest'}>
                  Latest
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortChange('highest-price')}
                  selected={sort === 'highest-price'}
                >
                  Highest Price
                </MenuItem>
                <MenuItem
                  onClick={() => handleSortChange('lowest-price')}
                  selected={sort === 'lowest-price'}
                >
                  Lowest Price
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box
              sx={{
                p: pxToRem(8),
                borderRadius: 99999,
                width: pxToRem(32),
                height: pxToRem(32),
                backgroundColor: '#F0F0F0',
                ml: 0.5,
              }}
              onClick={onFilterClick}
            >
              <SvgColor
                src="/assets/icons/filter.svg"
                sx={{
                  width: pxToRem(16),
                  height: pxToRem(16),
                  color: 'black',
                }}
              />
            </Box>
          )}
        </Box>
      </Stack>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{
          mt: pxToRem(14),
          borderTop: '0.5px solid #000',
          borderLeft: '0.5px solid #000',
        }}
      >
        {products.map((item, index) => (
          <ShopItem key={index} index={index} product={item} previoustPage={previoustPage} />
        ))}
      </Box>
      <Divider
        sx={{
          mt: pxToRem(13),
          mb: pxToRem(20),
          border: '1px solid #0000001A',
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
        }}
      />
      <Pagination
        count={totalPages}
        shape="rounded"
        page={currentPage + 1}
        onChange={(event, page) => onPageChange(page)}
        sx={{
          [`& .${paginationClasses.ul}`]: { justifyContent: { xs: 'center', md: 'flex-end' } },
          mb: { xs: pxToRem(85), md: pxToRem(205) },
          [`& li button`]: {
            width: pxToRem(40),
            height: pxToRem(40),
            borderRadius: pxToRem(8),
            color: '#00000080',
            [theme.breakpoints.down('md')]: {
              width: pxToRem(30),
              height: pxToRem(30),
            },
          },
          '& #next, & #previous': {
            py: pxToRem(12.17),
            px: pxToRem(18.17),
            width: pxToRem(48),
            height: pxToRem(36),
            border: '1px solid #0000001A',
            [theme.breakpoints.down('md')]: {
              width: pxToRem(40),
              height: pxToRem(30),
            },
          },
          '& .Mui-disabled': {
            opacity: 1,
          },
          '& #selected': {
            backgroundColor: '#0000000F',
            color: 'black',
          },
          '& .MuiPagination-ul li:ntn-child(1),& .MuiPagination-ul li:ntn-child(6)': {
            display: 'none!important',
          },
          mt: {
            xs: pxToRem(24),
            md: 0,
          },
        }}
        renderItem={(item: any) => (
          <PaginationItem
            slots={{ previous: ArrowLeft, next: ArrowRight }}
            id={item.selected ? 'selected' : item.type}
            {...item}
          />
        )}
      />
    </Box>
  );
}
function ArrowLeft() {
  return (
    <SvgColor
      src="/assets/icons/long-arrow-left.svg"
      sx={{ width: pxToRem(11.67), height: pxToRem(11.67), color: 'black!important' }}
    />
  );
}
function ArrowRight() {
  return (
    <SvgColor
      src="/assets/icons/long-arrow-left.svg"
      sx={{
        transform: 'rotate(180deg)',
        width: pxToRem(11.67),
        height: pxToRem(11.67),
        color: 'black!important',
      }}
    />
  );
}

type ShopItemProps = {
  index: number;
  product: Product;
  previoustPage?: string;
};
function ShopItem({ index, product, previoustPage }: ShopItemProps) {
  const theme = useTheme();

  const { isInCart, onAddToCart, onDeleteCart } = useCartContext();

  const isAdd = useMemo(() => !isInCart(product.id), [product, isInCart]);

  return (
    <Box
      sx={{
        borderRight: '0.5px solid #000',
        borderBottom: '0.5px solid #000',
      }}
    >
      <ProductCard
        product={product}
        visibleByDefault={index < 6}
        previousPage={previoustPage}
        sx={{
          '& .mnl__image__root': {
            borderRadius: 0,
            maxWidth: 1,
          },
          '& #cardContent': {
            px: pxToRem(29),
            textAlign: 'center',
            [theme.breakpoints.down('md')]: {
              px: pxToRem(18),
            },
          },
        }}
      />
      <Box
        sx={{
          mx: pxToRem(30),
          mb: pxToRem(10),
          [theme.breakpoints.down('md')]: {
            mb: pxToRem(7.7),
            mx: pxToRem(18),
          },
        }}
      >
        <OutlinedButton
          sx={{
            mt: pxToRem(11),
            width: 1,
            px: pxToRem(0),
            ...(!isAdd && {
              backgroundColor: 'error.main',
              color: 'white',
            }),
          }}
          mobileSxProps={{
            py: pxToRem(9),
          }}
          onClick={() => {
            if (isAdd) onAddToCart(product);
            else onDeleteCart(product.id);
          }}
        >
          {isAdd ? 'Add to cart' : 'In cart'}
        </OutlinedButton>
      </Box>
    </Box>
  );
}

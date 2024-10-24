import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, useTheme, Container, SwipeableDrawer } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { pxToRem } from 'src/theme/styles';
import { useGetProductsN } from 'src/actions/product';
import { useGetCategories } from 'src/actions/category';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import ShopList from '../shop-list';
import ShopFilter from '../shop-filter';

type Props = {
  loading?: boolean;
};
export default function ShopView({ loading }: Props) {
  const theme = useTheme();
  const openMobileFilter = useBoolean();
  const { categories } = useGetCategories();
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<string>('most-popular');
  const navigate = useNavigate();
  const location = useLocation();

  const categoryName = useMemo(() => {
    const cate = categories.find((category) => category.id === categoryId);
    if (cate) return cate.name;
    return null;
  }, [categoryId, categories]);

  const syncParamsToURL = () => {
    const params = new URLSearchParams(location.search);
    if (page !== undefined) params.set('page', page.toString());
    if (pageSize !== undefined) params.set('pageSize', pageSize.toString());
    if (categoryId !== -1) params.set('categoryId', categoryId.toString());
    if (minPrice !== undefined) params.set('minPrice', minPrice.toString());
    if (maxPrice !== undefined) params.set('maxPrice', maxPrice.toString());
    if (sort !== undefined) params.set('sort', sort);

    navigate(`?${params.toString()}`, { replace: true });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryIdFromUrl = params.get('categoryId');
    const minPriceFromUrl = params.get('minPrice');
    const maxPriceFromUrl = params.get('maxPrice');
    const pageFromUrl = params.get('page');
    const pageSizeFromUrl = params.get('pageSize');
    const sortFromUrl = params.get('sort');

    if (categoryIdFromUrl) {
      if (Number(categoryIdFromUrl) !== categoryId) {
        setCategoryId(Number(categoryIdFromUrl));
      }
    } else {
      setCategoryId(-1);
    }
    if (minPriceFromUrl && Number(minPriceFromUrl) !== minPrice)
      setMinPrice(Number(minPriceFromUrl));
    if (maxPriceFromUrl && Number(maxPriceFromUrl) !== maxPrice)
      setMaxPrice(Number(maxPriceFromUrl));
    if (pageFromUrl && Number(pageFromUrl) !== page) setPage(Number(pageFromUrl));
    if (pageSizeFromUrl && Number(pageSizeFromUrl) !== pageSize)
      setPageSize(Number(pageSizeFromUrl));
    if (sortFromUrl && sortFromUrl !== sort) setSort(sortFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    syncParamsToURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, minPrice, maxPrice, page, pageSize, minPrice, maxPrice, sort]);

  const { products, productPaginate } = useGetProductsN({
    page,
    pageSize: pageSize || 12,
    categoryId,
    minPrice,
    maxPrice,
    sort,
  });

  const onCategorySelect = (id: number) => {
    setCategoryId(id);
  };

  const onPriceChange = (minPriceFilter: number, maxPriceFilter: number) => {
    setMinPrice(minPriceFilter);
    setMaxPrice(maxPriceFilter);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        [theme.breakpoints.up('lg')]: {
          maxWidth: pxToRem(1240),
          px: '0px !important',
        },
        [theme.breakpoints.only('xs')]: {
          px: '0px !important',
        },
      }}
    >
      <CustomBreadcrumbs
        links={[
          {
            href: '/',
            name: 'Home',
          },
          {
            href: '/shop',
            name: 'Shop',
          },
          ...(categoryName ? [{ href: `/shop?categoryId=${categoryId}`, name: categoryName }] : []),
        ]}
        sx={{
          mb: pxToRem(22),
          [theme.breakpoints.only('xs')]: {
            px: pxToRem(16),
          },
        }}
      />

      <Grid container sx={{ backgroundColor: 'white' }}>
        <Grid xs={0} md={3}>
          <Box
            sx={{
              pr: pxToRem(18),
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
          >
            <ShopFilter
              categories={categories}
              onCategorySelect={onCategorySelect}
              onPriceChange={onPriceChange}
            />
          </Box>
        </Grid>
        <Grid xs={12} md={9}>
          <Box>
            <ShopList
              onFilterClick={openMobileFilter.onTrue}
              products={products}
              categoryName={categoryName}
              pageSize={productPaginate.pageSize}
              totalItems={productPaginate.totalElements}
              currentPage={page || 0}
              onPageChange={(newPage) => setPage(newPage - 1)}
              totalPages={productPaginate.totalPages}
              sort={sort}
              onSortChange={(s) => setSort(s)}
            />
          </Box>
        </Grid>
      </Grid>
      <SwipeableDrawer
        anchor="bottom"
        open={openMobileFilter.value}
        onClose={openMobileFilter.onFalse}
        onOpen={openMobileFilter.onTrue}
        PaperProps={{
          sx: {
            borderTopLeftRadius: pxToRem(20),
            borderTopRightRadius: pxToRem(20),
          },
        }}
      >
        <ShopFilter
          categories={categories}
          onCategorySelect={(category) => {
            onCategorySelect(category);
            openMobileFilter.onFalse();
          }}
          onPriceChange={(...prices) => {
            onPriceChange(...prices);
            openMobileFilter.onFalse();
          }}
        />
      </SwipeableDrawer>
    </Container>
  );
}

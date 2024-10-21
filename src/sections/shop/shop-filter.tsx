import { useState, useEffect } from 'react';

import { Box, Paper, Stack, Slider, Divider, useTheme, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { pxToRem } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';

import ShopFiterItem from './shop-filter-item';
import { ContainedButton } from '../_partials/buttons';

export type Category = {
  id: number;
  name: string;
};

type ShopFilterProps = {
  categories: Category[];
  onCategorySelect: (id: number) => void;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
};

export default function ShopFilter({
  categories,
  onCategorySelect,
  onPriceChange,
}: ShopFilterProps) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const [price, setPrice] = useState<number[]>([100000, 5000000]);

  const changePrice = useBoolean();

  useEffect(
    () => changePrice.onFalse,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Paper
      sx={{
        border: '1px solid #0000001A',
        px: pxToRem(24),
        py: pxToRem(20),
        width: 1,
        [theme.breakpoints.down('md')]: {
          borderTopLeftRadius: pxToRem(20),
          borderTopRightRadius: pxToRem(20),
        },
      }}
    >
      <Stack minWidth={0} direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: pxToRem(20),
            lineHeight: pxToRem(30.24),
          }}
        >
          Filters
        </Typography>
        <SvgColor
          src={mdUp ? '/assets/icons/filter.svg' : '/assets/icons/close.svg'}
          sx={{
            width: pxToRem(24),
            height: pxToRem(24),
            cursor: 'pointer',
          }}
          onClick={() => {
            if (mdUp) onCategorySelect(-1);
          }}
        />
      </Stack>
      <FilterDivider />
      <Stack component="ul" spacing={pxToRem(22.5)}>
        {categories.map((category) => (
          <ShopFiterItem
            key={category.id}
            label={category.name}
            onClick={() => onCategorySelect(category.id)}
          />
        ))}
      </Stack>
      <FilterDivider />
      <Box>
        <Stack minWidth={0} direction="row" alignItems="center" justifyContent="space-between">
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: pxToRem(20),
              lineHeight: pxToRem(30.24),
            }}
          >
            Price
          </Typography>
          <SvgColor
            src="/assets/icons/arrow-down.svg"
            sx={{
              flexShrink: 0,
              transform: 'rotate(180deg)',
              width: pxToRem(11.5),
              height: pxToRem(6.5),
              color: '#000',
            }}
          />
        </Stack>
        <Slider
          min={100000}
          max={5000000}
          value={price}
          onChange={(event, value) => {
            setPrice(value as number[]);
            changePrice.onTrue();
          }}
          valueLabelDisplay="on"
          valueLabelFormat={(value) => `${value.toLocaleString('vi-VN')}`}
          color={'black' as any}
          sx={{
            height: pxToRem(31),
            '& .MuiSlider-thumb': {
              backgroundColor: 'black',
            },
            '& .MuiSlider-valueLabel::before': {
              content: 'unset',
            },
            '& .MuiSlider-valueLabel.MuiSlider-valueLabelOpen': {
              transform: 'translateY(76%) scale(1)',
              color: 'black',
              backgroundColor: 'transparent',
              fontSize: pxToRem(14),
              lineHeight: pxToRem(21.17),
              fontWeight: 500,
            },
          }}
        />
        {/* <Stack direction="row" justifyContent="space-between" sx={{ mt: pxToRem(16) }}>
          <Typography>Min Price: {price[0].toLocaleString('vi-VN')} VND</Typography>
          <Typography>Max Price: {price[1].toLocaleString('vi-VN')} VND</Typography>
        </Stack> */}
      </Box>
      <FilterDivider />
      <ContainedButton
        smallFontSize
        sx={{
          width: 1,
          textAlign: 'center',
        }}
        onClick={() => onPriceChange(price[0], price[1])}
        disabled={!changePrice.value}
      >
        Apply Filter
      </ContainedButton>
    </Paper>
  );
}

function FilterDivider() {
  const theme = useTheme();
  return (
    <Divider
      sx={{
        my: pxToRem(24),
        border: '1px solid #0000001A',
        display: 'block',
        [theme.breakpoints.down('md')]: {
          mt: pxToRem(12),
          mb: pxToRem(20),
        },
      }}
    />
  );
}

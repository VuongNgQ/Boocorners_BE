import type { SxProps } from '@mui/material';
import type { Product } from 'src/types/product';

import { useMemo, useState } from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import {
  Box,
  Link,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  LinearProgress,
  autocompleteClasses,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';

import { pxToRem } from 'src/theme/styles';
import { useGetProductsN } from 'src/actions/product';

import { SvgColor } from 'src/components/svg-color';

type Props = {
  sx?: SxProps;
};
export default function SearchBar({ sx }: Props) {
  const [query, setQuery] = useState('');
  const queryDebounce = useDebounce(query, 1000);
  const { products, productsLoading, productsEmpty } = useGetProductsN({
    productName: queryDebounce,
  });
  const isFocused = useBoolean();

  const options = useMemo(() => {
    if (!queryDebounce || productsEmpty) return [];

    if (products.length) {
      return products.map((product: Product) => ({
        label: product.productName,
        value: product.id,
      }));
    }
    return [{ label: 'Product not found', value: -1 }];
  }, [products, queryDebounce, productsEmpty]);

  return (
    <Box
      sx={{
        maxWidth: pxToRem(416),
        width: 1,
        ...sx,
      }}
    >
      <Autocomplete
        fullWidth
        freeSolo
        size="small"
        onInputChange={(event, newValue) => setQuery(newValue)}
        options={isFocused.value && queryDebounce ? options : []}
        loading={productsLoading}
        value={query}
        inputValue={query}
        // BE search
        loadingText={
          <Box>
            <LinearProgress />
          </Box>
        }
        filterOptions={(x) => x}
        getOptionDisabled={(option) => option.label === 'Không tìm thấy tour'}
        slotProps={{
          popper: { placement: 'bottom-start', sx: { minWidth: 320 } },
          paper: { sx: { [` .${autocompleteClasses.option}`]: { pl: 0.75 } } },
        }}
        clearOnBlur
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            onFocus={isFocused.onTrue}
            onBlur={isFocused.onFalse}
            fullWidth
            placeholder="Search for products..."
            InputProps={{
              ...params.InputProps,
              sx: {
                backgroundColor: '#F0F0F0',
                borderRadius: pxToRem(62),
                fontWeight: 300,
                fontSize: pxToRem(16),
                lineHeight: '24.19px',
                border: 'none',

                height: pxToRem(48),
                '& ': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                },
              },
              startAdornment: (
                <InputAdornment position="end">
                  <SvgColor src="/assets/icons/search.svg" />
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, product, { inputValue }) => {
          const matches = match(product.label, inputValue, {
            insideWords: true,
          });
          const parts = parse(product.label, matches);
          return (
            <Box component="li" {...props} key={product.value} sx={{ p: 0 }}>
              <Link
                component={RouterLink}
                href={paths.main.shop.details(product.value)}
                sx={{
                  width: 1,
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}
              >
                <div key={inputValue}>
                  {parts.map((part, index) => (
                    <Typography
                      key={index}
                      component="span"
                      color={part.highlight ? 'secondary' : 'textPrimary'}
                      sx={{
                        typography: 'body2',
                        fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                      }}
                    >
                      {part.text}
                    </Typography>
                  ))}
                </div>
              </Link>
            </Box>
          );
        }}
      />
    </Box>
  );
}

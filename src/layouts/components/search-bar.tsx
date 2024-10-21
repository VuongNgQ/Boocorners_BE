import type { SxProps } from '@mui/material';

import { useState } from 'react';

import {
  Box,
  TextField,
  Autocomplete,
  InputAdornment,
  LinearProgress,
  autocompleteClasses,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { pxToRem } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';

type Props = {
  sx?: SxProps;
};
export default function SearchBar({ sx }: Props) {
  const [query, setQuery] = useState('');
  // const queryDebounce = useDebounce(query, 1000);
  //  const { tours, toursLoading, toursEmpty } = useSearchTour(queryDebounce);
  const isFocused = useBoolean();

  //  const options = useMemo(() => {
  //    if (!queryDebounce || toursEmpty) return [];

  //    if (tours.length) {
  //      return tours.map((tour) => ({ label: tour.title, value: tour.slug }));
  //    }
  //    return [{ label: 'Không tìm thấy tour', value: 'NOT_FOUND' }];
  //  }, [tours, queryDebounce, toursEmpty]);

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
        //   options={isFocused.value && queryDebounce ? options : []}
        options={[]}
        //   loading={toursLoading}
        value={query}
        inputValue={query}
        // clearOnBlur
        // BE search
        loadingText={
          <Box>
            <LinearProgress />
          </Box>
        }
        filterOptions={(x) => x}
        //   getOptionDisabled={(option) => option.label === 'Không tìm thấy tour'}
        slotProps={{
          popper: { placement: 'bottom-start', sx: { minWidth: 320 } },
          paper: { sx: { [` .${autocompleteClasses.option}`]: { pl: 0.75 } } },
        }}
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
              type: 'search',
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
        //   renderOption={(props, tour, { inputValue }) => {
        //     const matches = match(tour.label, inputValue, {
        //       insideWords: true,
        //     });
        //     const parts = parse(tour.label, matches);
        //     return (
        //       <Box component="li" {...props} key={tour.value}>
        //         <Link
        //           component={RouterLink}
        //           href={paths.main.tour.details(tour.value)}
        //           sx={{
        //             '&:hover': {
        //               textDecoration: 'none',
        //             },
        //           }}
        //         >
        //           <div key={inputValue}>
        //             {parts.map((part, index) => (
        //               <Typography
        //                 key={index}
        //                 component="span"
        //                 color={part.highlight ? 'primary' : 'textPrimary'}
        //                 sx={{
        //                   typography: 'body2',
        //                   fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
        //                 }}
        //               >
        //                 {part.text}
        //               </Typography>
        //             ))}
        //           </div>
        //         </Link>
        //       </Box>
        //     );
        //   }}
      />
    </Box>
  );
}

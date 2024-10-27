import React, { useState } from 'react';

import { GridSearchIcon, GridToolbarContainer } from '@mui/x-data-grid';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { pxToRem, varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

type Props = {
  search: string;
  onSearch: (value: string) => void;
  moreFilters?: React.ReactNode;
  onPageChange: (page: number) => void;
};

export default function TableSearch({ onSearch, search, moreFilters, onPageChange }: Props) {
  const [query, setQuery] = useState(search);

  const isFocus = useBoolean();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onPageChange(0);
      onSearch(query);
    }
  };

  return (
    <GridToolbarContainer
      sx={{
        '& .MuiFormControl-root': {
          width: '100%',
        },
        flexDirection: {
          xs: 'column-reverse',
          md: 'row',
        },
      }}
    >
      {moreFilters}
      <Box
        width={1}
        maxWidth={{
          xs: 1,
          md: 400,
        }}
        sx={{ ml: 'auto' }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Tìm kiếm..."
          value={query}
          inputProps={{
            onKeyDown: handleSearch,
          }}
          onChange={(event) => setQuery(event.target.value)}
          InputProps={{
            onFocus: isFocus.onTrue,
            onBlur: isFocus.onFalse,
            startAdornment: (
              <InputAdornment position="start">
                <GridSearchIcon sx={{ fontSize: pxToRem(20) }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" title="Press 'Enter' to search!">
                <IconButton
                  size="small"
                  sx={
                    isFocus.value
                      ? {
                          background: (theme) => varAlpha(theme.palette.primary.mainChannel, 0.1),
                          color: 'black',
                        }
                      : {}
                  }
                >
                  <Iconify icon="uil:enter" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </GridToolbarContainer>
  );
}

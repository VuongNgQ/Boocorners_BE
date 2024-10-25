import React, { useState } from 'react';

import { Box, TextField, InputAdornment } from '@mui/material';
import { GridSearchIcon, GridToolbarContainer } from '@mui/x-data-grid';

type Props = {
  search: string;
  onSearch: (value: string) => void;
  moreFilters?: React.ReactNode;
};

export default function TableSearch({ onSearch, search, moreFilters }: Props) {
  const [query, setQuery] = useState(search);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
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
          placeholder="Search product..."
          value={query}
          inputProps={{
            onKeyDown: handleSearch,
          }}
          onChange={(event) => setQuery(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" title="Press 'Enter' to search!">
                <GridSearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </GridToolbarContainer>
  );
}

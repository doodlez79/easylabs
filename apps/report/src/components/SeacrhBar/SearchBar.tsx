import React, { FC } from 'react';
import { Box, Button, FormControl, InputAdornment, TextField, Typography } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import SearchIcon from '@material-ui/icons/Search';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { TypeContent } from 'constants/enums';
import { SearchBarProps } from './SearchBar.types';

export const customNameForReportBtn = {
  [TypeContent.RESULT]: 'Back to Results',
  [TypeContent.REPORT]: 'Generate Report',
};

const SearchBar: FC<SearchBarProps> = ({
  onChangeContent,
  CurrentContent,
  onSearchHandler,
  searchValue,
  onClearSearchValue,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      mb={1}
      justifyContent="space-between"
      displayPrint="none"
      style={{ background: 'white' }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Box width="80%">
          <FormControl fullWidth>
            <TextField
              id="input-with-icon-textfield"
              placeholder="Search..."
              value={searchValue}
              onChange={onSearchHandler}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
        <Button
          onClick={() => {
            onChangeContent(CurrentContent === TypeContent.RESULT ? TypeContent.REPORT : TypeContent.RESULT);
          }}
          variant="contained"
          color="primary"
          startIcon={<PaymentIcon />}
        >
          {CurrentContent === TypeContent.RESULT
            ? customNameForReportBtn[TypeContent.RESULT]
            : customNameForReportBtn[TypeContent.REPORT]}
        </Button>
      </Box>
      {searchValue && (
        <Box
          mt={1}
          borderRadius={5}
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          style={{
            background: 'rgba(255, 185, 0, 0.2)',
          }}
        >
          <Box display="flex">
            <InfoOutlinedIcon />
            <Typography
              style={{
                wordBreak: 'break-all',
              }}
            >
              {`You are filtering results that contain "${searchValue}"`}
            </Typography>
          </Box>
          <Button color="primary" variant="contained" onClick={onClearSearchValue}>
            Clear
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;

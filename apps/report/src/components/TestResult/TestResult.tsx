import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';

import { TestResultProps } from './TestResult.types';

const TestResult: FC<TestResultProps> = ({ title, description }) => {
  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      <Typography>{description}</Typography>
    </Box>
  );
};

export default TestResult;

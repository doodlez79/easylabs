import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

import { NormalReportProps } from './NormalReport.types';
import { useStyles } from './styles';

const NormalReport: FC<NormalReportProps> = () => {
  const classes = useStyles();
  return (
    <Box borderRadius={5} p={2} display="flex" className={classes.blockCool}>
      <ReportProblemOutlinedIcon />
      <Typography>No abnormal metabolic health results.</Typography>
    </Box>
  );
};

export default NormalReport;

import React, { FC } from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { HeaderModalProfileProps } from './HeaderModalProfile.types';
import { useStyles } from './styles';

const HeaderModalProfile: FC<HeaderModalProfileProps> = ({ onClose }) => {
  const classes = useStyles();

  return (
    <Box p={1} className={classes.header} display="flex" alignItems="center" justifyContent="space-between">
      <Typography>Easylabs.org v2.11</Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default HeaderModalProfile;

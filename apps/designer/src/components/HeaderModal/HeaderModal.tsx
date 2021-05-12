import React, { FC } from 'react';
import { Box, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { HeaderModalProps } from './HeaderModal.types';
import { useStyles } from './styles';

const HeaderModal: FC<HeaderModalProps> = ({ title, onCloseModal }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className={classes.header}
      p={2}
      width="100%"
    >
      <Typography>{title}</Typography>
      <IconButton onClick={onCloseModal}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default HeaderModal;

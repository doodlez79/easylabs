import React, { FC } from 'react';
import { Box, IconButton, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { ModalInformationProps } from './ModalInformation.types';
import { useStyles } from './styles';

const ModalInformation: FC<ModalInformationProps> = ({ onClose, open }) => {
  const classes = useStyles();
  return (
    <Modal className={classes.modal} open={open} onClose={onClose}>
      <Box border={1}>
        <Box p={1} className={classes.header} display="flex" alignItems="center" justifyContent="space-between">
          <Typography>Easylabs.org v2.11</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box p={3} className={classes.content}>
          <Typography gutterBottom> You are using Easylabs.org version v2.11</Typography>
          <Typography> For more information or help, please contact </Typography>
          <a href="mailto:info@meditserv.com">info@easylabs.org</a>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalInformation;

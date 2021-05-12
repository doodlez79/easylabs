import React, { createRef, FC, useState } from 'react';
import copy from 'copy-to-clipboard';
import { Box, IconButton, Input, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import { useProfileContext } from 'helpers/useProfileContext';

import { useStyles } from './styles';
import { ModalLinkProps } from './ModalLink.types';
import { useResultsContext } from '../../helpers/useResultsContext';

const ModalLink: FC<ModalLinkProps> = ({ onClose, open }) => {
  const classes = useStyles();
  const [copySuccess, setCopySuccess] = useState('');

  const profile = useProfileContext();
  const resultTest = useResultsContext();

  const resultDictionary = resultTest.reduce((acc, item) => {
    if (item.value) {
      return {
        ...acc,
        [item.fullId]: {
          value: item.value,
          unit: item.unit,
        },
      };
    }
    return acc;
  }, {});

  const copyBlockRef = createRef<HTMLInputElement>();

  const url = `${window.location.origin}${window.location.pathname}`;

  const copyToClipboard = () => {
    copy(`${url}?profile=${JSON.stringify(profile)}&results=${window.btoa(JSON.stringify(resultDictionary))}`);
    setCopySuccess('Copied to your clipboard!!');
  };

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
          <Typography gutterBottom> Share your results with your family, friends or your doctor</Typography>
          <Box display="flex" mb={2}>
            <Box p={1} border={1} overflow="auto" width="100%">
              <Input
                inputRef={copyBlockRef}
                disabled
                disableUnderline
                defaultValue={`${url}?profile=${JSON.stringify(profile)}`}
                className={classes.linkText}
              />
            </Box>
            <IconButton onClick={copyToClipboard}>
              <FileCopyOutlinedIcon />
            </IconButton>
          </Box>
          <Typography gutterBottom className={classes.copyText} variant="body2">
            {copySuccess}
          </Typography>

          <Typography gutterBottom> * your results are private and anonymous.</Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalLink;

import React, { FC } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';

import { FileUploadControlProps } from './FileUploadControl.types';

const FileUploadControl: FC<FileUploadControlProps> = ({ openFileDialog, helperText, error }) => {
  return (
    <div>
      <IconButton onClick={openFileDialog} color="primary" disableRipple>
        <PublishRoundedIcon color={error ? 'error' : 'primary'} />
      </IconButton>
      {error && (
        <Typography variant="caption" color="error">
          {helperText}
        </Typography>
      )}
    </div>
  );
};

export default FileUploadControl;

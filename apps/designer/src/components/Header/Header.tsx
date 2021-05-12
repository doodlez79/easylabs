import React, { FC, useCallback, ChangeEvent } from 'react';
import { Button, Box, Input, IconButton } from '@material-ui/core';
import { Field } from 'react-final-form';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import WarningIcon from '@material-ui/icons/Warning';
import PublishIcon from '@material-ui/icons/Publish';
import SaveIcon from '@material-ui/icons/Save';

import { FileUploadInput } from 'components/FileUploadInput';
import { MimeType } from 'constants/enums';
import { useFilterContext } from 'helpers/useFilterContext';
import { ImgFileField } from 'components/ImgFileField';
import { RenderControl } from 'components/FileUploadInput/FileUploadInput.types';

import { HeaderProps } from './Header.types';
import { useStyles } from './styles';

const Header: FC<HeaderProps> = ({
  onHandlerSearch = () => {},
  onWarning,
  onUpload = () => {},
  onSave,
  onClear,
  imgPath = './logo.png',
}) => {
  const classes = useStyles();

  const { onlyWarnings } = useFilterContext();

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onHandlerSearch(event.target.value);
    },
    [onHandlerSearch]
  );

  const renderControlImg: RenderControl = (openFileDialog) => (
    <Button color="primary" onClick={openFileDialog} className={classes.button} startIcon={<PublishIcon />}>
      Upload Logo
    </Button>
  );

  return (
    <Box display="flex" className={classes.header} p={1} mb={1} justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Box maxHeight="50px" maxWidth="50px">
          <img src={imgPath} className={classes.logo} alt="logo" />
        </Box>
        <Field name="logo" renderControl={renderControlImg} component={ImgFileField} />
      </Box>

      <Box display="flex">
        <Input
          id="input-with-icon-adornment"
          className={classes.button}
          onChange={handleSearchChange}
          placeholder="Search tests"
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          }
        />
        <Button
          color="primary"
          className={`${classes.button} ${onlyWarnings ? classes.pressedButton : ''}`}
          onClick={onWarning}
          startIcon={<WarningIcon />}
        >
          Only Warnings
        </Button>
        <FileUploadInput
          acceptedMimes={[MimeType.JSON]}
          fileSizeLimitMap={{
            [MimeType.JSON]: 5 * 1024 ** 2,
          }}
          onUpload={(error, file) => {
            if (!error && file) {
              onUpload(file);
            }
          }}
          renderControl={(openFileDialog) => (
            <Button
              color="primary"
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                const isUpload = confirm(
                  'You are about to update the configuration of the report, all previous settings will be lost. Do you want to continue?'
                );
                if (isUpload) {
                  openFileDialog();
                }
              }}
              className={classes.button}
              startIcon={<PublishIcon />}
            >
              Upload
            </Button>
          )}
        />
        <Button color="primary" onClick={onSave} className={classes.button} startIcon={<SaveIcon />}>
          Save
        </Button>
        <Button color="primary" onClick={onClear} className={classes.button} startIcon={<DeleteOutlineOutlinedIcon />}>
          Clear
        </Button>
      </Box>
      <Box display="flex">
        <IconButton color="primary" aria-label="info" component="span">
          <InfoOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;

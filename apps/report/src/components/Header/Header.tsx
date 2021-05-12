import React, { FC } from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LinkIcon from '@material-ui/icons/Link';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import PublishIcon from '@material-ui/icons/Publish';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Box, IconButton, Typography } from '@material-ui/core';
// import SettingsIcon from '@material-ui/icons/Settings';

import { FileUploadInput } from 'components/FileUploadInput';
import { MimeType } from 'constants/enums';
import { useProfileContext } from 'helpers/useProfileContext';
import { AdultMapLabels, AdultMapLabelsKids } from 'components/Profile/Profile';

import { HeaderProps } from './Header.types';

import { useStyles } from './styles';

const Header: FC<HeaderProps> = ({
  onClickProfile,
  onClickLink,
  onClickSave,
  onClickUpload,
  onClickInfo,
  onClickPrint,
  // onUploadSettings,
  logoPath = './logo.png',
}) => {
  const classes = useStyles();
  const profile = useProfileContext();

  const { age, sex } = profile;

  const isKids = age < 18;

  return (
    <Box
      className={classes.header}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      mb={1}
      displayPrint="none"
    >
      <Box display="flex" alignItems="center" className={classes.headerLogoBlock}>
        <Box maxHeight="50px" maxWidth="50px">
          <img src={logoPath} className={classes.logo} alt="logo" />
        </Box>
        <Box display="flex" overflow="auto">
          <IconButton onClick={onClickProfile}>
            <AccountBoxIcon />
            <Typography
              style={{
                marginLeft: '7px',
              }}
            >
              {`${age || 0} y/o ${isKids ? AdultMapLabelsKids[sex] : AdultMapLabels[sex]}`}
            </Typography>
          </IconButton>
          <IconButton onClick={onClickLink}>
            <LinkIcon />
          </IconButton>
          <IconButton onClick={onClickSave}>
            <SaveAltIcon />
          </IconButton>
          <FileUploadInput
            acceptedMimes={[MimeType.JSON]}
            fileSizeLimitMap={{
              [MimeType.JSON]: 5 * 1024 ** 2,
            }}
            onUpload={(error, file) => {
              if (!error && file) {
                onClickUpload(file);
              }
            }}
            renderControl={(openFileDialog) => (
              <IconButton onClick={openFileDialog}>
                <PublishIcon />
              </IconButton>
            )}
          />
          {/* <FileUploadInput */}
          {/*  acceptedMimes={[MimeType.JSON]} */}
          {/*  fileSizeLimitMap={{ */}
          {/*    [MimeType.JSON]: 5 * 1024 ** 2, */}
          {/*  }} */}
          {/*  onUpload={(error, file) => { */}
          {/*    if (!error && file) { */}
          {/*      onUploadSettings(file); */}
          {/*    } */}
          {/*  }} */}
          {/*  renderControl={(openFileDialog) => ( */}
          {/*    <IconButton onClick={openFileDialog}> */}
          {/*      <SettingsIcon /> */}
          {/*    </IconButton> */}
          {/*  )} */}
          {/* /> */}

          <IconButton onClick={onClickInfo}>
            <InfoOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <IconButton onClick={onClickPrint}>
        <PrintOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default Header;

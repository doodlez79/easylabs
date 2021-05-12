import React, { FC } from 'react';
import { Modal } from '@material-ui/core';

import { HeaderModalProfile } from 'components/HeaderModalProfile';
import { Profile } from 'components/Profile';

import { ModalProfileProps } from './ModalProfile.types';
import { useStyles } from './styles';

const ModalProfile: FC<ModalProfileProps> = ({ open, onClose, onChangeProfile, profileState, onSaveProfile }) => {
  const classes = useStyles();

  return (
    <Modal className={classes.modal} open={open} onClose={onClose}>
      <>
        <HeaderModalProfile onClose={onClose} />
        <Profile onChangeProfile={onChangeProfile} profileState={profileState} onSaveProfile={onSaveProfile} />
      </>
    </Modal>
  );
};

export default ModalProfile;

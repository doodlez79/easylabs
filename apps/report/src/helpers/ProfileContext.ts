import React from 'react';

import { ProfileType } from 'components/Profile/Profile.types';
import { initialProfile } from 'constants/constants';

const ProfileContext = React.createContext<ProfileType>(initialProfile);

export const ProfileProvider = ProfileContext.Provider;
export const ProfileConsumer = ProfileContext.Consumer;

export default ProfileContext;

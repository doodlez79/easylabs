import { useContext } from 'react';

import { ProfileType } from 'components/Profile/Profile.types';

import ProfileContext from './ProfileContext';

export const useProfileContext = (): ProfileType => useContext(ProfileContext);

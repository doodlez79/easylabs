import { EasyLabsSex } from '@easy-labs-int/shared';

import { EventCb } from 'types';

export interface ProfileProps {
  profileState: ProfileType;
  onSaveProfile: EventCb;
  onChangeProfile: (prop: keyof ProfileType) => (event: string | number | boolean) => void;
}

export interface ProfileType {
  age: number;
  sex: EasyLabsSex;
}

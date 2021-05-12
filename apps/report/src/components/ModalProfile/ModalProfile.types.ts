import { EventCb } from 'types';
import { ProfileType } from 'components/Profile/Profile.types';

export interface ModalProfileProps {
  open: boolean;
  onClose: EventCb;
  onSaveProfile: EventCb;
  profileState: ProfileType;
  onChangeProfile: (prop: keyof ProfileType) => (event: string | number | boolean) => void;
}

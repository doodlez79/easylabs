import { EventCb } from 'types';

export interface HeaderProps {
  onClickProfile: EventCb;
  onClickLink: EventCb;
  onClickSave: EventCb;
  onClickPrint: EventCb;
  onClickInfo: EventCb;
  onClickUpload: (file: File) => void;

  onUploadSettings?: (file: File) => void;
  logoPath?: string;
}

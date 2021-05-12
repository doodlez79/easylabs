import { EventCb } from 'types';

export interface HeaderProps {
  onWarning?: EventCb;
  imgPath?: string;
  onHandlerSearch?: EventCb;
  onUpload?: EventCb<File>;
  onSave?: EventCb;
  onClear?: EventCb;
}

import { FieldRenderProps } from 'react-final-form';

import { EasyLabsRange } from '@easy-labs-int/shared';

import { EventCb } from 'types';

export interface EditTestModalProps extends FieldRenderProps<EasyLabsRange> {
  onClose: EventCb;
  open: boolean;
}

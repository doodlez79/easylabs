import { FieldRenderProps } from 'react-final-form';

import { ParseType } from 'constants/enums';

export interface TextFieldProps extends FieldRenderProps<string> {
  parseType?: ParseType;
}

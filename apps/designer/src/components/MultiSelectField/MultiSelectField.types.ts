import { FieldRenderProps } from 'react-final-form';

import { SelectOption } from 'types/select';

export interface MultiSelectFieldProps extends FieldRenderProps<string[]> {
  options: SelectOption[];
}

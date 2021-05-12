import { FieldRenderProps } from 'react-final-form';

import { SelectOption } from 'types/select';

export interface SelectFieldProps extends FieldRenderProps<string> {
  options: SelectOption[];

  filterValueByOptions?: boolean;
}

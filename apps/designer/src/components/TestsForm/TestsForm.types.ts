import React from 'react';

export interface TestsFormProps {
  onSubmit?: (
    event?: Partial<Pick<React.SyntheticEvent, 'preventDefault' | 'stopPropagation'>>
  ) => Promise<{ [key: string]: any } | undefined> | undefined;
}

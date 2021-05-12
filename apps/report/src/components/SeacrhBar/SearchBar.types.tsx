import { ChangeEvent } from 'react';

import { EventCb } from 'types';

export interface SearchBarProps {
  CurrentContent: string;
  searchValue?: string;
  onClearSearchValue: EventCb;
  onSearchHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (type: string) => void;
}

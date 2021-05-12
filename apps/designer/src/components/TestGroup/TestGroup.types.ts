import { EventCb } from 'types';

export interface TestGroupProps {
  fieldName: string;
  availableTestsCount: number;

  onDelete?: EventCb;
  onNewGroup?: EventCb;
  disableDelete?: boolean;
}

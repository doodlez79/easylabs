import { SelectOption } from 'types/select';

type EventCb = () => void;

export interface TestProps {
  fieldName: string;
  onNew: EventCb;
  onDelete: EventCb;
  selectedUnits: SelectOption[];

  disableDelete?: boolean;
}

import { EasyLabsGroup } from '@easy-labs-int/shared';

export interface GroupsProps {
  groups: EasyLabsGroup[];
  handlerTestInput: (id: string, value: number, unit: string) => void;
  categoryId: string;
}

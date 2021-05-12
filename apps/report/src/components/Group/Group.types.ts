import { EasyLabsTest } from '@easy-labs-int/shared';

export interface GroupProps {
  title: string;
  groupId: string;
  id: string;
  tests: EasyLabsTest[];
  handlerTestInput: (id: string, value: number, unit: string) => void;
}

import { Unit } from '@easy-labs-int/shared';

export interface TestProps {
  name: string;
  idTest: string;
  description: string;
  units: string[];
  id?: string;
  handlerTestInput: (id: string, value: number, unit: string) => void;

  defaultUnit?: Unit;
}

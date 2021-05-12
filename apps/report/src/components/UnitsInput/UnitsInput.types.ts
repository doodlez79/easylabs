import { EasyLabsRange, EasyLabsRangeSetType } from '@easy-labs-int/shared';

export interface UnitsInputProps {
  idTest: string;
  handlerTestInput: (id: string, value: number, unit: string) => void;
  units: string[];
  type?: EasyLabsRangeSetType;
  defaultUnit?: string;
  range?: EasyLabsRange;
  value?: number;
}

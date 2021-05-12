import { ColorByTypeResult, EasyLabsRange, EasyLabsRangeSetType, EasyLabsSetDescription } from '@easy-labs-int/shared';

export interface ResultsConfig {
  fullId: string;
  unit: string;

  groupId: string;
  categoryId: string;
  testId: string;
  value: number;
  color?: ColorByTypeResult;
  currentRange: Partial<EasyLabsRange>;
  type: EasyLabsRangeSetType;
  fieldInfo: EasyLabsSetDescription | { title: string; type: string } | undefined;

  defaultUnit?: string;
  valueInDefaultUnit?: number;
}

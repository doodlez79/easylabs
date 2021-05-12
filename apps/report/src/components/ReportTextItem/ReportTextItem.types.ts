import { EasyLabsSetDescription, EasyLabsRange, EasyLabsRangeSetType } from '@easy-labs-int/shared';

export interface ReportTextItemProps {
  title: string;
  descr: string;
  value: number;
  type: EasyLabsRangeSetType;

  currentValue?: number;
  range?: Partial<EasyLabsRange>;
  field?: EasyLabsSetDescription | { title: string; type: string };
}

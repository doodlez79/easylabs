import { EasyLabsRangeSetType } from '@easy-labs-int/shared';

export interface RangeSetProps {
  fieldName: string;
  usedTypes: EasyLabsRangeSetType[];
  type: EasyLabsRangeSetType;
  hasMin: boolean;
  hasMax: boolean;
}

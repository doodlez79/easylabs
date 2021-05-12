import { EasyLabsRangeSetType } from '@easy-labs-int/shared';

export const TypeLabel = {
  [EasyLabsRangeSetType.NORMAL]: 'Optimal',
  [EasyLabsRangeSetType.BORDERLINE]: 'Normal',
  [EasyLabsRangeSetType.ABNORMAL]: 'Borderline',
  [EasyLabsRangeSetType.DEFAULT]: 'Default',
  [EasyLabsRangeSetType.CRITICAL]: 'Critical',
};

import { EasyLabsRangeSetType } from '@easy-labs-int/shared';

export const getTextByResult = (name: EasyLabsRangeSetType, count: number) => {
  if (count > 0) {
    if (name === EasyLabsRangeSetType.BORDERLINE) {
      return `${count}  borderline result${count > 1 ? 's' : ''}`;
    }
    if (name === EasyLabsRangeSetType.NORMAL) {
      return `${count}  normal result${count > 1 ? 's' : ''}`;
    }
    if (name === EasyLabsRangeSetType.ABNORMAL) {
      return `${count}  abnormal result${count > 1 ? 's' : ''}`;
    }
    if (name === EasyLabsRangeSetType.CRITICAL) {
      return `${count} critical result${count > 1 ? 's' : ''}`;
    }
    if (name === EasyLabsRangeSetType.OPTIMAL) {
      return `${count} optimal result${count > 1 ? 's' : ''}`;
    }
  }
};

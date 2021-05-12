import { EasyLabsRange, EasyLabsRangeType } from '@easy-labs-int/shared';

export const getCurrentRangeByAge = (ranges: EasyLabsRange[] | undefined, age: number) => {
  if (ranges) {
    if (ranges.length > 0) {
      return ranges.filter((item) => {
        if (item.type === EasyLabsRangeType.ABOVE_OR_EQUAL) {
          return item.aboveAge && age >= item.aboveAge;
        }
        if (item.type === EasyLabsRangeType.BELOW_OR_EQUAL) {
          return item.belowAge && age <= item.belowAge;
        }
        if (item.type === EasyLabsRangeType.BETWEEN) {
          return item.belowAge && item.aboveAge && age >= item.belowAge && age <= item.aboveAge;
        }
        return item.type === EasyLabsRangeType.ALL;
      });
    }
  }
};

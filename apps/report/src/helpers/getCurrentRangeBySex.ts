import { EasyLabsRange, EasyLabsSex } from '@easy-labs-int/shared';

export const getCurrentRangeBySex = (range: Partial<EasyLabsRange[] | undefined>, sex: EasyLabsSex) => {
  if (range) {
    return range.find((el) => el?.sex === sex || el?.sex === EasyLabsSex.DSNT_MATTER);
  }
  return null;
};

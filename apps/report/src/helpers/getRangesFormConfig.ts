import { EasyLabsCategory, EasyLabsRange } from '@easy-labs-int/shared';

import { getTestFormConfig } from './getTestFromConfig';

export const getRangesFormConfig = (
  categoryId: string,
  groupId: string,
  testId: string,
  categories: EasyLabsCategory[]
): EasyLabsRange[] | undefined => {
  return getTestFormConfig(categoryId, groupId, testId, categories)?.ranges;
};

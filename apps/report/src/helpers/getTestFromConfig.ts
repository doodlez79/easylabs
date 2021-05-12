import { EasyLabsCategory, EasyLabsTest } from '@easy-labs-int/shared';

export const getTestFormConfig = (
  categoryId: string,
  groupId: string,
  testId: string,
  categories: EasyLabsCategory[]
): EasyLabsTest | undefined => {
  return categories
    .find((el) => el.id === categoryId)
    ?.groups.find((el) => el.id === groupId)
    ?.tests.find((el) => el.id === testId);
};

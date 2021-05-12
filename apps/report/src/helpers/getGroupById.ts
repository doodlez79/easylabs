import { EasyLabsGroup } from '@easy-labs-int/shared';

export const getGroupById = (id: string, groups: EasyLabsGroup[]) => {
  return groups.find((item) => item.id === id);
};

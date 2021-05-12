export const parseIdByType = (id: string) => {
  const [categoryId, groupId, testId] = id.split('###');
  return {
    categoryId,
    groupId,
    testId,
  };
};

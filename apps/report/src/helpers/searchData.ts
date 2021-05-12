import { EasyLabsCategory, EasyLabsGroup, EasyLabsTest } from '@easy-labs-int/shared';

export const searchData = (data: EasyLabsCategory[], value: string) => {
  const searchLower = value ? (value as string).toLowerCase() : '';
  const tests: EasyLabsCategory[] = [];

  data.forEach((category) => {
    const tmpCat: EasyLabsCategory = { ...category, groups: [] };

    category.groups.forEach((group) => {
      const tmpGrp: EasyLabsGroup = { ...group, tests: [] };

      group.tests.forEach((test) => {
        const searchValid = value
          ? test.name.toLowerCase().indexOf(searchLower) >= 0 ||
            test.description.toLowerCase().indexOf(searchLower) >= 0
          : true;

        if (searchValid) {
          const tmpTst: EasyLabsTest = {
            ...test,
          };
          tmpGrp.tests.push(tmpTst);
        }
      });
      if (tmpGrp.tests.length > 0) {
        tmpCat.groups.push(tmpGrp);
      }
    });
    if (tmpCat.groups.length > 0) {
      tests.push(tmpCat);
    }
  });
  return tests;
};

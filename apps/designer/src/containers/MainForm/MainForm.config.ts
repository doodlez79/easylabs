import { nanoid } from 'nanoid';
import difference from 'lodash/difference';

import {
  EasyLabsCategory,
  EasyLabsConfig,
  EasyLabsGroup,
  EasyLabsRange,
  EasyLabsRangeSet,
  EasyLabsRangeSetType,
  EasyLabsRangeType,
  EasyLabsSex,
  EasyLabsTest,
} from '@easy-labs-int/shared';

const allRangeSetTypes = [
  EasyLabsRangeSetType.OPTIMAL,
  EasyLabsRangeSetType.NORMAL,
  EasyLabsRangeSetType.BORDERLINE,
  EasyLabsRangeSetType.ABNORMAL,
];

export const getDefaultRangeSet = (usedTypes: EasyLabsRangeSetType[]): EasyLabsRangeSet => {
  const typesDiff = difference(allRangeSetTypes, usedTypes);

  return {
    id: nanoid(),
    type: typesDiff[0],
    min: undefined,
    max: undefined,
    tooHigh: {
      significance: '',
      treatment: '',
    },
    tooLow: {
      significance: '',
      treatment: '',
    },
    optimal: {
      significance: '',
      treatment: '',
    },
  };
};

interface ExistedRangeValues {
  sex: EasyLabsSex[];
  type: EasyLabsRangeType[];
}

export const getDefaultRange = (): EasyLabsRange => {
  return {
    id: nanoid(),
    sex: EasyLabsSex.DSNT_MATTER,
    type: EasyLabsRangeType.ALL,
    aboveAge: undefined,
    belowAge: undefined,
    sets: [getDefaultRangeSet([])],
  };
};

export const getDefaultTest = (): EasyLabsTest => ({
  id: nanoid(),
  name: 'Default Name',
  description: '',
  units: [],
  defaultUnit: undefined,
  ranges: [getDefaultRange()],
});

export const getDefaultGroup = (): EasyLabsGroup => ({
  id: nanoid(),
  title: 'Default Title',
  tests: [getDefaultTest()],
});

export const getDefaultCategory = (): EasyLabsCategory => ({
  id: nanoid(),
  title: 'Default Title',
  description: '',
  icon: '',
  groups: [getDefaultGroup()],
});

export const initialValues: EasyLabsConfig = {
  categories: [getDefaultCategory()],
  color: '#98B1CD',
  logo: './logo.png',
  header: '',
};

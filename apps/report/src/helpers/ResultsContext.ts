import React from 'react';
import { ColorByTypeResult, EasyLabsRangeSetType } from '@easy-labs-int/shared';

import { ResultsConfig } from 'types/ResultsConfigType';

const ResultsContext = React.createContext<ResultsConfig[]>([
  {
    fullId: '',
    unit: '',
    fieldInfo: {
      significance: '',
      treatment: '',
    },
    groupId: '',
    categoryId: '',
    testId: '',
    value: 0,
    currentRange: {},
    color: ColorByTypeResult.DEFAULT,
    type: EasyLabsRangeSetType.DEFAULT,
  },
]);

export const ResultsProvider = ResultsContext.Provider;
export const ResultsConsumer = ResultsContext.Consumer;

export default ResultsContext;

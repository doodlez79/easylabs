import { useContext } from 'react';

import { ResultsConfig } from 'types/ResultsConfigType';
import ResultsContext from './ResultsContext';

export const useResultsContext = (): ResultsConfig[] => useContext(ResultsContext);

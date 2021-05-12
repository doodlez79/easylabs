import { useContext } from 'react';

import FilterContext from './FilterContext';

export const useFilterContext = (): { filterString: string; onlyWarnings: boolean } => useContext(FilterContext);

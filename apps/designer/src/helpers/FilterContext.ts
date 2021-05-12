import { createContext } from 'react';

const FilterContext = createContext({
  filterString: '',
  onlyWarnings: false,
});

export const FilterProvider = FilterContext.Provider;

export default FilterContext;

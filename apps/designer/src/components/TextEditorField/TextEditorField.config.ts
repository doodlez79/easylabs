import { Image } from './Image';
import { findImageEntities } from './helpers';

export const decorators = [
  {
    strategy: findImageEntities,
    component: Image,
  },
];

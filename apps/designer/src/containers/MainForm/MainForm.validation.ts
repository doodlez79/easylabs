import * as yup from 'yup';

import { Unit } from '@easy-labs-int/shared';
import { molarMassIsRequired } from '@easy-labs-int/shared/dist/helpers';

import { rangeSchema } from 'components/EditTestModal/EditTestModal.validation';

export const testSchema = yup.object({
  id: yup.string(),
  name: yup.string().required().label('Name'),
  description: yup.string().required().label('Description'),
  defaultUnit: yup.string().required().label('Default Unit'),
  units: yup.array().of(yup.string()).required().label('Units'),
  ranges: yup.array().of(rangeSchema).min(1),
  molarMass: yup
    .mixed()
    .when('units', (units: Unit[]) => (molarMassIsRequired(units) ? yup.number().required() : yup.number()))
    .label('Molar Mass'),
});

export const groupSchema = yup.object({
  id: yup.string(),
  title: yup.string().required().label('Title'),
  tests: yup.array().of(testSchema).min(1),
});

export const categorySchema = yup.object({
  id: yup.string(),
  title: yup.string().required().label('Title'),
  description: yup.string().required().label('Description'),
  icon: yup.string().label('Icon'),
  groups: yup.array().of(groupSchema).min(1),
});

export const mainSchema = yup.object({
  categories: yup.array().of(categorySchema).min(1),
});

import * as yup from 'yup';
import groupBy from 'lodash/groupBy';

import { EasyLabsRangeType, EasyLabsSex } from '@easy-labs-int/shared';
import {
  isAbnormalSet,
  isNormalSet,
  isBorderlineSet,
  getNormalSet,
  getBorderlineSet,
  getAbnormalSet,
  isOptimalSet,
  getOptimalSet,
} from '@easy-labs-int/shared/dist/helpers';

type Limit = {
  field: 'min' | 'max';
  method: 'min' | 'max';
  value?: number;
};

export const numberGenericSchema = (limitations: Omit<Limit, 'field'>[]) => {
  const minimums = limitations.filter(({ method, value }) => value && method === 'min').map(({ value }) => value!);
  const maximums = limitations.filter(({ method, value }) => value && method === 'max').map(({ value }) => value!);

  const minimumFromMinimums = Math.min(...minimums);
  const maximumFromMaximums = Math.max(...maximums);

  const methods: Omit<Limit, 'field'>[] = [];

  // eslint-disable-next-line no-unused-expressions
  Math.abs(minimumFromMinimums) !== Infinity && methods.push({ method: 'max', value: minimumFromMinimums });
  // eslint-disable-next-line no-unused-expressions
  Math.abs(maximumFromMaximums) !== Infinity && methods.push({ method: 'min', value: maximumFromMaximums });

  return methods.reduce((acc, { method, value }) => acc[method](value!), yup.number().label('Value'));
};

export const setSchema = (limitations: Limit[]) => {
  const groupedFields = groupBy(limitations, 'field');

  const fields = Object.entries(groupedFields).reduce(
    (acc, [field, limits]) => ({ ...acc, [field]: numberGenericSchema(limits) }),
    {}
  );

  return yup.object({
    ...fields,
  });
};

export const rangeSchema = yup.object().shape(
  {
    sex: yup.mixed().oneOf([EasyLabsSex.DSNT_MATTER, EasyLabsSex.MALE, EasyLabsSex.FEMALE]).required().label('Sex'),
    type: yup
      .mixed()
      .oneOf([
        EasyLabsRangeType.ABOVE_OR_EQUAL,
        EasyLabsRangeType.BELOW_OR_EQUAL,
        EasyLabsRangeType.ALL,
        EasyLabsRangeType.BETWEEN,
      ])
      .required()
      .label('Type'),
    belowAge: yup
      .number()
      .when(['type', 'aboveAge'], (type: EasyLabsRangeType, aboveAge: number) => {
        const commonSchema = yup.number();

        if (type === EasyLabsRangeType.BELOW_OR_EQUAL) {
          return commonSchema.min(0).required();
        }

        if (type === EasyLabsRangeType.BETWEEN && aboveAge) {
          return commonSchema.max(aboveAge).required();
        }

        return commonSchema;
      })
      .label('Below Age'),
    aboveAge: yup
      .number()
      .when(['type', 'belowAge'], (type: EasyLabsRangeType, belowAge: number) => {
        const commonSchema = yup.number();

        if (type === EasyLabsRangeType.ABOVE_OR_EQUAL) {
          return commonSchema.min(0).required();
        }

        if (type === EasyLabsRangeType.BETWEEN && belowAge) {
          return commonSchema.min(belowAge).required();
        }

        return commonSchema;
      })
      .label('Above Age'),
    sets: yup
      .array()
      .min(1)
      .of(
        // @ts-ignore
        yup.lazy((currentSet, { parent: sets }) => {
          if (!Array.isArray(sets)) {
            return yup.mixed();
          }

          const normalSet = getNormalSet(sets || []);
          const borderlineSet = getBorderlineSet(sets || []);
          const abnormalSet = getAbnormalSet(sets || []);
          const optimalSet = getOptimalSet(sets || []);

          if (isOptimalSet(currentSet)) {
            return setSchema([
              { field: 'min', method: 'max', value: normalSet?.min },
              { field: 'min', method: 'min', value: normalSet?.max },
              { field: 'min', method: 'max', value: normalSet?.min },
              { field: 'max', method: 'min', value: normalSet?.max },

              { field: 'min', method: 'min', value: borderlineSet?.max },
              { field: 'min', method: 'max', value: borderlineSet?.min },
              { field: 'min', method: 'max', value: borderlineSet?.min },
              { field: 'max', method: 'min', value: borderlineSet?.max },

              { field: 'min', method: 'max', value: abnormalSet?.min },
              { field: 'min', method: 'min', value: abnormalSet?.max },
              { field: 'max', method: 'min', value: abnormalSet?.max },
              { field: 'max', method: 'max', value: abnormalSet?.min },

              { field: 'min', method: 'min', value: optimalSet?.max },
            ]);
          }

          if (isNormalSet(currentSet)) {
            return setSchema([
              { field: 'min', method: 'min', value: normalSet?.max },
              { field: 'min', method: 'min', value: borderlineSet?.max },
              { field: 'min', method: 'min', value: abnormalSet?.max },
              { field: 'min', method: 'max', value: borderlineSet?.min },
              { field: 'min', method: 'max', value: abnormalSet?.min },

              { field: 'min', method: 'min', value: optimalSet?.min },
              { field: 'max', method: 'max', value: optimalSet?.max },

              { field: 'max', method: 'min', value: borderlineSet?.max },
              { field: 'max', method: 'min', value: abnormalSet?.max },
              { field: 'max', method: 'max', value: normalSet?.min },
              { field: 'max', method: 'max', value: borderlineSet?.min },
              { field: 'max', method: 'max', value: abnormalSet?.min },
            ]);
          }

          if (isBorderlineSet(currentSet)) {
            return setSchema([
              { field: 'min', method: 'min', value: normalSet?.min },
              { field: 'min', method: 'min', value: normalSet?.max },
              { field: 'min', method: 'min', value: borderlineSet?.max },
              { field: 'min', method: 'min', value: abnormalSet?.max },
              { field: 'min', method: 'max', value: abnormalSet?.min },

              { field: 'min', method: 'min', value: optimalSet?.min },
              { field: 'max', method: 'max', value: optimalSet?.max },

              { field: 'max', method: 'min', value: abnormalSet?.max },
              { field: 'max', method: 'max', value: normalSet?.max },
              { field: 'max', method: 'max', value: normalSet?.min },
              { field: 'max', method: 'max', value: borderlineSet?.min },
              { field: 'max', method: 'max', value: abnormalSet?.min },
            ]);
          }

          if (isAbnormalSet(currentSet)) {
            return setSchema([
              { field: 'min', method: 'min', value: normalSet?.min },
              { field: 'min', method: 'min', value: normalSet?.max },
              { field: 'min', method: 'min', value: borderlineSet?.min },
              { field: 'min', method: 'min', value: borderlineSet?.max },
              { field: 'min', method: 'min', value: abnormalSet?.max },

              { field: 'min', method: 'min', value: optimalSet?.min },
              { field: 'max', method: 'max', value: optimalSet?.max },

              { field: 'max', method: 'max', value: normalSet?.min },
              { field: 'max', method: 'max', value: normalSet?.max },
              { field: 'max', method: 'max', value: borderlineSet?.min },
              { field: 'max', method: 'max', value: borderlineSet?.max },
              { field: 'max', method: 'max', value: abnormalSet?.min },
            ]);
          }

          return setSchema([]);
        })
      ),
  },
  [
    ['belowAge', 'aboveAge'],
    ['aboveAge', 'belowAge'],
  ]
);

export const validationSchema = yup.object({
  ranges: yup.array().of(rangeSchema).min(1),
});

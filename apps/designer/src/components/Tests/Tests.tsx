import React, { FC } from 'react';
import { ValidationErrors } from 'final-form';

import { unitOptions, EasyLabsTest } from '@easy-labs-int/shared';

import { Test } from 'components/Test';
import { getDefaultTest } from 'containers/MainForm/MainForm.config';
import { useFilterContext } from 'helpers/useFilterContext';

import { TestsProps } from './Tests.types';

const filterTests = (tests: EasyLabsTest[], error: ValidationErrors, filterString: string, onlyWarnings: boolean) => {
  return tests.reduce((acc, test, index) => {
    const { name, description, defaultUnit, units } = test;

    const testError = error && error[index];

    const condition = [name, description, defaultUnit, units.join('#')].join('#').toLowerCase().includes(filterString);

    if (condition && (!onlyWarnings || testError)) {
      return [...acc, test];
    }

    return acc;
  }, [] as EasyLabsTest[]);
};

const Tests: FC<TestsProps> = ({ fields, meta: { error } }) => {
  const { filterString, onlyWarnings } = useFilterContext();

  const filteredTests = filterTests(fields.value, error, filterString, onlyWarnings);

  return (
    <>
      {filteredTests.map((test) => {
        const testIndex = fields.value.findIndex((o) => o.id === test.id);
        const name = `${fields.name}[${testIndex}]`;

        return (
          <Test
            key={name}
            selectedUnits={unitOptions.filter((item) => (fields.value[testIndex].units || []).includes(item.value))}
            fieldName={name}
            onDelete={() => {
              // eslint-disable-next-line no-restricted-globals
              const isDelete = confirm('Are you sure you want to delete this test?');

              if (isDelete) {
                fields.remove(testIndex);
              }
            }}
            onNew={() => {
              fields.push(getDefaultTest());
            }}
            disableDelete={fields.length === 1}
          />
        );
      })}
    </>
  );
};

export default Tests;

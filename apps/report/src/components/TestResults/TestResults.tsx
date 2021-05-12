import React, { FC, Fragment } from 'react';

import { CategoryHeader } from 'components/CategoryHeader';
import { ReportContent } from 'components/ReportContent';
import { NormalReport } from 'components/NormalReport';
import { useResultsContext } from 'helpers/useResultsContext';

import { TestResultsProps } from './TestResults.types';

const TestResults: FC<TestResultsProps> = ({ config }) => {
  const testResults = useResultsContext();

  return (
    <>
      {config.map(({ id, title, description, icon, groups }) => {
        const filledTests = testResults.filter((el) => el.categoryId === id);

        return (
          <Fragment key={id}>
            <CategoryHeader title={title} description={description} icon={icon} />
            {filledTests.length ? <ReportContent data={filledTests} groups={groups} /> : <NormalReport />}
          </Fragment>
        );
      })}
    </>
  );
};

export default TestResults;

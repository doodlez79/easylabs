import React, { FC } from 'react';
import { Box } from '@material-ui/core';
import { EasyLabsRangeSetType } from '@easy-labs-int/shared';

import { getGroupById } from 'helpers/getGroupById';
import { ReportTextItem } from 'components/ReportTextItem';

import { ReportContentProps } from './ReportContent.types';

const ReportContent: FC<ReportContentProps> = ({ data, groups }) => {
  return (
    <>
      {data.map((item) => {
        const { tests } = getGroupById(item.groupId, groups) || {};
        const filter = item.type !== EasyLabsRangeSetType.DEFAULT;
        return (
          <Box key={item.testId}>
            {(tests || []).map((test: { id: string | number | undefined; name: string; description: string }) =>
              test.id === item.testId && filter ? (
                <ReportTextItem
                  field={item.fieldInfo}
                  key={test.id}
                  range={item.currentRange}
                  type={item.type}
                  title={test.name}
                  descr={test.description}
                  value={item.value}
                  currentValue={item.valueInDefaultUnit}
                />
              ) : (
                ''
              )
            )}
          </Box>
        );
      })}
    </>
  );
};

export default ReportContent;

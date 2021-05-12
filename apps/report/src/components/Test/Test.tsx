import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { getColorByResult } from '@easy-labs-int/shared/dist/helpers';
import { EasyLabsRangeSetType } from '@easy-labs-int/shared';

import { UnitsInput } from 'components/UnitsInput';
import { useResultsContext } from 'helpers/useResultsContext';

import { TestProps } from './Test.types';
import { useStyles } from './styles';

const Test: FC<TestProps> = ({ name, description, units, defaultUnit, id, idTest, handlerTestInput }) => {
  const classes = useStyles();

  const testResults = useResultsContext();

  const infoSelectTest = testResults.find((el) => el.fullId === idTest);

  let value: number | undefined;
  let type: EasyLabsRangeSetType | undefined = EasyLabsRangeSetType.DEFAULT;

  if (testResults.length) {
    const testResult = testResults.find((el) => el.testId === id);
    value = testResult?.value;
    type = testResult?.type;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      p="20px 10px 20px 10px"
      justifyContent="space-between"
      className={classes.testItem}
      mb={1}
    >
      <Box display="flex" className={classes.box} flexDirection="column">
        <Typography
          style={{
            color: getColorByResult(type),
          }}
          variant="h4"
        >
          {name}
        </Typography>
        <Box>
          <div
            style={{
              marginBottom: '10px',
              overflow: 'auto',
            }}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </Box>
      </Box>
      <Box>
        {infoSelectTest && (
          <Typography>
            {`${infoSelectTest.valueInDefaultUnit} ${infoSelectTest.defaultUnit} = ${infoSelectTest.value} ${infoSelectTest.unit}`}
          </Typography>
        )}

        <Box minWidth="250px" maxWidth="250px">
          <UnitsInput
            units={units}
            type={type}
            defaultUnit={defaultUnit}
            value={value}
            idTest={idTest}
            handlerTestInput={handlerTestInput}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Test;

import React, { FC, useCallback, useState, Fragment } from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Box, Collapse, Typography } from '@material-ui/core';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { getColorByResult } from '@easy-labs-int/shared/dist/helpers';
import { EasyLabsRangeSetType } from '@easy-labs-int/shared';

import { Test } from 'components/Test';
import { useProfileContext } from 'helpers/useProfileContext';
import { getCurrentRangeByAge } from 'helpers/getCurrentRangeByAge';
import { useResultsContext } from 'helpers/useResultsContext';
import { ResultsConfig } from 'types/ResultsConfigType';
import { getTextByResult } from 'helpers/getTextByResult';
import { getCurrentRangeBySex } from 'helpers/getCurrentRangeBySex';

import { useStyles } from './styles';
import { GroupProps } from './Group.types';

const Group: FC<GroupProps> = ({ title, tests, groupId, id: idGroupCurrent, handlerTestInput }) => {
  const [openCollapse, setOpenCollapse] = useState(true);
  const classes = useStyles();

  const handleCollapse = useCallback(() => {
    setOpenCollapse((s) => !s);
  }, [setOpenCollapse]);

  const profile = useProfileContext();

  const { age, sex } = profile;

  const testResults = useResultsContext();

  const countTest = tests.reduce((acc, item) => {
    if (getCurrentRangeBySex(getCurrentRangeByAge(item.ranges, age), sex)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const filledTest = testResults.reduce((acc, item) => {
    if (item.groupId === idGroupCurrent && item.currentRange) {
      return acc + 1;
    }
    return acc;
  }, 0);

  let testResultArray: ResultsConfig[] | undefined;
  let countTypes: Record<string, number>;

  if (testResults.length) {
    testResultArray = testResults.filter((el) => el.groupId === idGroupCurrent);
    countTypes = testResultArray.reduce(
      (acc, item) => {
        if (item.type === EasyLabsRangeSetType.BORDERLINE) {
          acc[EasyLabsRangeSetType.BORDERLINE] += 1;
        }
        if (item.type === EasyLabsRangeSetType.CRITICAL) {
          acc[EasyLabsRangeSetType.CRITICAL] += 1;
        }
        if (item.type === EasyLabsRangeSetType.NORMAL) {
          acc[EasyLabsRangeSetType.NORMAL] += 1;
        }
        if (item.type === EasyLabsRangeSetType.ABNORMAL) {
          acc[EasyLabsRangeSetType.ABNORMAL] += 1;
        }
        if (item.type === EasyLabsRangeSetType.OPTIMAL) {
          acc[EasyLabsRangeSetType.OPTIMAL] += 1;
        }

        return acc;
      },
      {
        [EasyLabsRangeSetType.BORDERLINE]: 0,
        [EasyLabsRangeSetType.CRITICAL]: 0,
        [EasyLabsRangeSetType.NORMAL]: 0,
        [EasyLabsRangeSetType.ABNORMAL]: 0,
        [EasyLabsRangeSetType.OPTIMAL]: 0,
      }
    );
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        onClick={handleCollapse}
        className={classes.collapseItemBtn}
        alignItems="center"
        justifyContent="space-between"
        p={2}
        mb={1}
        flexDirection="column"
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography>{title}</Typography>
          {openCollapse ? <ExpandLess /> : <ExpandMore />}
        </Box>
        <Box display="flex" width="100%" minHeight="25px">
          {testResultArray &&
            [
              EasyLabsRangeSetType.CRITICAL,
              EasyLabsRangeSetType.NORMAL,
              EasyLabsRangeSetType.ABNORMAL,
              EasyLabsRangeSetType.BORDERLINE,
              EasyLabsRangeSetType.OPTIMAL,
            ].map((item) => {
              return (
                <Fragment key={item}>
                  {getTextByResult(item, countTypes[item]) && (
                    <Box display="flex" alignItems="center">
                      <ReportProblemOutlinedIcon
                        style={{
                          fill: getColorByResult(item),
                        }}
                        fontSize="small"
                      />
                      <Typography
                        key={item}
                        variant="body1"
                        style={{
                          color: getColorByResult(item),
                          marginRight: '10px',
                        }}
                      >
                        {getTextByResult(item, countTypes[item])}
                      </Typography>
                    </Box>
                  )}
                </Fragment>
              );
            })}
        </Box>
      </Box>
      {tests.map(({ id, description, defaultUnit, name, units, ranges }) => {
        const resultByAge = getCurrentRangeByAge(ranges, age);

        const resultBySex = getCurrentRangeBySex(resultByAge, sex);

        return (
          <Collapse key={id} in={openCollapse} className={classes.collapseItems}>
            {resultBySex && (
              <Test
                id={id}
                idTest={`${groupId}###${id}`}
                description={description}
                defaultUnit={defaultUnit}
                name={name}
                units={units}
                handlerTestInput={handlerTestInput}
              />
            )}
          </Collapse>
        );
      })}

      <Box mb={1} p={2} display="flex" justifyContent="space-between" className={classes.collapseItemBtn}>
        <Typography align="left">
          {filledTest ? `${filledTest} of ${countTest} ${title} tests` : `${countTest} available tests in this group`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Group;

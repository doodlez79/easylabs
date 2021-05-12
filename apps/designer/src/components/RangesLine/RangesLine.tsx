import React, { FC } from 'react';
import { Box, Tooltip, Typography } from '@material-ui/core';
import _min from 'lodash/min';
import _max from 'lodash/max';

import {
  getNormalSet,
  getBorderlineSet,
  getAbnormalSet,
  getColorByResult,
  getOptimalSet,
} from '@easy-labs-int/shared/dist/helpers';
import { EasyLabsRangeSetType } from '@easy-labs-int/shared';

import { RangesLineProps, Interval, DisplayInterval } from './RangesLine.types';
// import { TypeLabel } from './helpers';

import { useStyles } from './styles';
import { ResultTypesForDesigner } from '../RangeSet/RangeSet';

const RangesLine: FC<RangesLineProps> = ({ sets = [] }) => {
  const classes = useStyles();

  const normalSet = getNormalSet(sets);
  const borderlineSet = getBorderlineSet(sets);
  const abnormalSet = getAbnormalSet(sets);
  const optimalSet = getOptimalSet(sets);

  const LC_LL: Interval = {
    min: abnormalSet?.min,
    max: borderlineSet?.min,
    type: EasyLabsRangeSetType.ABNORMAL,
  };

  const LL_LM: Interval = {
    min: borderlineSet?.min,
    max: normalSet?.min,
    type: EasyLabsRangeSetType.BORDERLINE,
  };

  const LH_HM: Interval = {
    min: normalSet?.min,
    max: optimalSet?.min,
    type: EasyLabsRangeSetType.NORMAL,
  };

  const LO_HM: Interval = {
    min: optimalSet?.min,
    max: optimalSet?.max,
    type: EasyLabsRangeSetType.OPTIMAL,
  };

  const HH_HM: Interval = {
    min: optimalSet?.max,
    max: normalSet?.max,
    type: EasyLabsRangeSetType.NORMAL,
  };

  const HM_HH: Interval = {
    min: normalSet?.max,
    max: borderlineSet?.max,
    type: EasyLabsRangeSetType.BORDERLINE,
  };

  const HH_HC: Interval = {
    min: borderlineSet?.max,
    max: abnormalSet?.max,
    type: EasyLabsRangeSetType.ABNORMAL,
  };

  const minimums = [LC_LL.min, LL_LM.min, LH_HM.min, LO_HM.min, HH_HM.min, HM_HH.min, HH_HC.min];
  const maximums = [LC_LL.max, LL_LM.max, LH_HM.max, LO_HM.max, HH_HM.max, HM_HH.max, HH_HC.max];

  const globalMinimum = _min(minimums) || 0;
  const globalMaximum = _max(maximums) || 0;

  let localLength = globalMaximum - globalMinimum;

  if (localLength === 0) {
    localLength = globalMaximum;
  }

  const OVER_LC: Interval = {
    min: globalMinimum - localLength * 0.4,
    max: globalMinimum - localLength * 0.2,
  };

  const HC_OVER: Interval = {
    min: globalMaximum + localLength * 0.2,
    max: globalMaximum + localLength * 0.4,
  };

  const globalLength = HC_OVER.max! - OVER_LC.min!;

  const multiplier = 100 / globalLength;

  const displayIntervals: DisplayInterval[] = [OVER_LC, LC_LL, LL_LM, LH_HM, LO_HM, HH_HM, HM_HH, HH_HC, HC_OVER]
    .filter((o) => o.min || o.max)
    .reduce((acc: DisplayInterval[], interval, index, a) => {
      const prevInterval = a[index - 1];
      const nextInterval = a[index + 1];

      if (prevInterval && !interval.min && interval.min !== 0) {
        const min = prevInterval.max || 0;
        const { max = 0 } = interval;

        return [
          ...acc,
          {
            ...interval,
            min,
            displayMin: -Infinity,
            displayMax: interval.max,
            value: multiplier * (max - min),
          },
        ];
      }

      if (nextInterval && !interval.max && interval.max !== 0) {
        const max = nextInterval.min || 0;
        const { min = 0 } = interval;

        return [
          ...acc,
          {
            ...interval,
            max,
            displayMin: interval.min,
            displayMax: Infinity,
            value: multiplier * (max - min),
          },
        ];
      }

      return [
        ...acc,
        {
          ...interval,
          displayMin: interval.min,
          displayMax: interval.max,
          value: multiplier * ((interval.max || 0) - (interval.min || 0)),
        },
      ];
    }, [] as DisplayInterval[]);

  return (
    <Box display="flex" position="relative" height="20px" justifyContent="center" borderRadius={5} overflow="hidden">
      <Box width="100%" display="flex" height="100%" justifyContent="center">
        {displayIntervals.map((item, index) => {
          const key = `${index} ${item.type}`;

          return (
            <Tooltip
              key={key}
              title={
                <Box display="flex" flexDirection="column">
                  <Typography color="inherit">{`Type: ${item.type && ResultTypesForDesigner[item.type]}`}</Typography>
                  <Typography color="inherit">{`Min: ${item.displayMin}`}</Typography>
                  <Typography color="inherit">{`Max: ${item.displayMax}`}</Typography>
                </Box>
              }
              placement="top"
              arrow
              disableHoverListener={!item.type}
            >
              <Box
                className={classes.result}
                width={`${item.value}%`}
                height="100%"
                textAlign="center"
                style={{
                  background: getColorByResult(item.type),
                }}
              >
                {item.type && ResultTypesForDesigner[item.type]}
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

export default RangesLine;

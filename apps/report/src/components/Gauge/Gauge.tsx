import React, { FC } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

import {
  getAbnormalSet,
  getBorderlineSet,
  getColorByResult,
  getNormalSet,
  getOptimalSet,
} from '@easy-labs-int/shared/dist/helpers';
import { ColorByTypeResult, EasyLabsRangeSetType } from '@easy-labs-int/shared';

import _min from 'lodash/min';
import _max from 'lodash/max';
import { GaugeProps, Interval } from './Gauge.types';

const Gauge: FC<GaugeProps> = ({ value, sets }) => {
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

  const displayIntervals: any[] = [LC_LL, LL_LM, LH_HM, LO_HM, HH_HM, HM_HH, HH_HC];
  const minimums = [LC_LL.min, LL_LM.min, LH_HM.min, LO_HM.min, HH_HM.min, HM_HH.min, HH_HC.min];
  const maximums = [LC_LL.max, LL_LM.max, LH_HM.max, LO_HM.max, HH_HM.max, HM_HH.max, HH_HC.max];

  const globalMinimum = _min(minimums) || 0;
  const globalMaximum = _max(maximums) || 0;

  const IntervalsNumbers: number[] = displayIntervals
    .reduce((acc, item, index, { length }) => acc.concat(index + 1 === length ? [item?.min, item?.max] : item?.min), [])
    .filter((e: number) => e === 0 || e);

  const IntervalsColors: (ColorByTypeResult | string)[] = displayIntervals
    .map((item) => {
      if (item.min || item.min === 0) {
        return getColorByResult(item.type);
      }
      return '';
    })
    .filter((e) => e);

  let newValue: number = value;
  if (value > globalMaximum) {
    newValue = globalMaximum;
  } else if (value < globalMinimum) {
    newValue = globalMinimum;
  }

  return (
    <>
      {IntervalsNumbers && (
        <ReactSpeedometer
          height={155}
          width={300}
          labelFontSize="8px"
          minValue={IntervalsNumbers[0]}
          maxValue={IntervalsNumbers[IntervalsNumbers.length - 1]}
          customSegmentStops={IntervalsNumbers}
          segmentColors={IntervalsColors}
          value={newValue}
          currentValueText={`${value}`}
        />
      )}
    </>
  );
};

export default Gauge;

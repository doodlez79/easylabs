import { EasyLabsRange, EasyLabsRangeSetType } from '@easy-labs-int/shared';
import { getAbnormalSet, getBorderlineSet, getNormalSet, getOptimalSet } from '@easy-labs-int/shared/dist/helpers';

export const getResultTest = (range: Partial<EasyLabsRange | undefined>, value: number) => {
  if (range && value >= 0 && range.sets) {
    const normalSet = getNormalSet(range.sets);
    const borderLineSet = getBorderlineSet(range.sets);
    const abnoramlSet = getAbnormalSet(range.sets);
    const optimalSet = getOptimalSet(range.sets);

    // console.log("optimalSet", optimalSet)

    const d = {
      optimal: {
        toLow: optimalSet?.min,
        tooHigh: optimalSet?.max,
        description: optimalSet?.optimal,
      },
      normal: {
        toLow: normalSet?.min,
        tooHigh: normalSet?.max,
        descriptionLow: normalSet?.tooLow,
        descriptionHigh: normalSet?.tooHigh,
      },
      borderline: {
        toLow: borderLineSet?.min,
        tooHigh: borderLineSet?.max,
        descriptionLow: borderLineSet?.tooLow,
        descriptionHigh: borderLineSet?.tooHigh,
      },
      abnormal: {
        toLow: abnoramlSet?.min,
        tooHigh: abnoramlSet?.max,
        descriptionLow: abnoramlSet?.tooLow,
        descriptionHigh: abnoramlSet?.tooHigh,
      },
    };
    // if (typeof d.optimal.toLow === 'number' && typeof d.optimal.tooHigh === 'number' && value > d.optimal.toLow && value < d.optimal.tooHigh) {
    //   // Optimal
    //   return {
    //     type: EasyLabsRangeSetType.OPTIMAL,
    //     description: d.optimal.description,
    //   };
    // }
    if (typeof d.abnormal.tooHigh === 'number' && value > d.abnormal.tooHigh) {
      // abnormalMax
      return {
        type: EasyLabsRangeSetType.CRITICAL,
        description: {
          title:
            'Your result is in the critical high range. Please ensure that you used the appropriate units (units are mmol/l vs µmol/L vs mg/dl and so on) and that the values you entered match the results in your lab report. If the units and inputs are correct, you should speak to a physician and ask for further medical advice as soon as possible. This may be considered an emergency.',
          type: 'high',
        },
      };
    }
    if (typeof d.borderline.tooHigh === 'number' && value > d.borderline.tooHigh) {
      // abnormalMax
      return {
        type: EasyLabsRangeSetType.ABNORMAL,
        description: d.abnormal.descriptionHigh,
      };
    }
    if (typeof d.normal.tooHigh === 'number' && value > d.normal.tooHigh) {
      // normalMax
      return {
        type: EasyLabsRangeSetType.BORDERLINE,
        description: d.borderline.descriptionHigh,
      };
    }
    if (typeof d.optimal.tooHigh === 'number' && value > d.optimal.tooHigh) {
      // optimalMax
      return {
        type: EasyLabsRangeSetType.NORMAL,
        description: d.normal.descriptionHigh,
      };
    }
    if (typeof d.abnormal.toLow === 'number' && value < d.abnormal.toLow) {
      // abnormalMin
      return {
        type: EasyLabsRangeSetType.CRITICAL,
        description: {
          title:
            'Your result is in the critical low range. Please ensure that you used the appropriate units (units are mmol/l vs µmol/L vs mg/dl and so on) and that the values you entered match the results in your lab report. If the units and inputs are correct, you should speak to a physician and ask for further medical advice as soon as possible. This may be considered an emergency.',
          type: 'low',
        },
      };
    }
    if (typeof d.borderline.toLow === 'number' && value < d.borderline.toLow) {
      // borderlineMin
      return {
        type: EasyLabsRangeSetType.ABNORMAL,
        description: d.abnormal.descriptionLow,
      };
    }
    if (typeof d.normal.toLow === 'number' && value < d.normal.toLow) {
      // normalMin
      return {
        type: EasyLabsRangeSetType.BORDERLINE,
        description: d.borderline.descriptionLow,
      };
    }
    if (typeof d.optimal.toLow === 'number' && value < d.optimal.toLow) {
      // optimalMin
      return {
        type: EasyLabsRangeSetType.NORMAL,
        description: d.normal.descriptionLow,
      };
    }
    return {
      type: EasyLabsRangeSetType.OPTIMAL,
      description: d.optimal.description,
    };
  }
  return {
    type: EasyLabsRangeSetType.DEFAULT,
    description: '',
  };
};

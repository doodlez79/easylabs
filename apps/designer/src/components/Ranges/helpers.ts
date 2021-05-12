import uniqBy from 'lodash/uniqBy';

import { EasyLabsRangeType, EasyLabsSex, EasyLabsRangeSet, EasyLabsRange } from '@easy-labs-int/shared';
import { getNormalSet, getBorderlineSet, getAbnormalSet } from '@easy-labs-int/shared/dist/helpers';

const getGoal = (sets: EasyLabsRangeSet[]) => {
  const normalSet = getNormalSet(sets);
  const borderlineSet = getBorderlineSet(sets);
  const abnormalSet = getAbnormalSet(sets);

  const moderate = {
    tooLow: normalSet?.min,
    tooHigh: normalSet?.max,
  };

  const high = {
    tooLow: borderlineSet?.min,
    tooHigh: borderlineSet?.max,
  };

  const critical = {
    tooLow: abnormalSet?.min,
    tooHigh: abnormalSet?.max,
  };

  let tooLowRange = null;

  if (moderate.tooLow) {
    tooLowRange = moderate.tooLow;
  } else if (high.tooLow) {
    tooLowRange = high.tooLow;
  } else if (critical.tooLow) {
    tooLowRange = critical.tooLow;
  }

  let tooHighRange = null;

  if (moderate.tooHigh) {
    tooHighRange = moderate.tooHigh;
  } else if (high.tooHigh) {
    tooHighRange = high.tooHigh;
  } else if (critical.tooHigh) {
    tooHighRange = critical.tooHigh;
  }

  let goal = 'Optimal: ';

  if (tooLowRange === null) {
    if (tooHighRange === null) {
      goal += 'no range';
    } else {
      goal += `< ${tooHighRange}`;
    }
  } else if (tooHighRange === null) {
    goal += `> ${tooLowRange}`;
  } else {
    goal += `${tooLowRange}-${tooHighRange}`;
  }

  return goal;
};

export const getRangeTitle = <T extends EasyLabsRangeType>(
  sex: EasyLabsSex,
  ageRangeType: T,
  aboveAge: number | undefined,
  belowAge: number | undefined,
  sets: EasyLabsRangeSet[]
): string => {
  let summary = 'Applies to';
  switch (sex) {
    case EasyLabsSex.MALE:
      summary += ' men';
      break;
    case EasyLabsSex.FEMALE:
      summary += ' woman';
      break;
    case EasyLabsSex.DSNT_MATTER:
    default:
      summary += ' people';
      break;
  }

  switch (ageRangeType) {
    case EasyLabsRangeType.ALL:
      summary += ' of all ages';
      break;
    case EasyLabsRangeType.BETWEEN: {
      summary += ` between ${belowAge} to ${aboveAge} y/o`;
      break;
    }
    case EasyLabsRangeType.ABOVE_OR_EQUAL:
      summary += ` above ${aboveAge} y/o `;
      break;
    case EasyLabsRangeType.BELOW_OR_EQUAL:
    default:
      summary += ` below ${belowAge} y/o`;
      break;
  }

  return `${summary} ${getGoal(sets)}`;
};

export const crossRanges = (currentRange: EasyLabsRange, ranges: EasyLabsRange[]) => {
  const crosses = ranges.filter((range) => {
    if (range.sex === currentRange.sex || range.sex === EasyLabsSex.DSNT_MATTER) {
      if (range.type === EasyLabsRangeType.ALL || currentRange.type === EasyLabsRangeType.ALL) {
        return true;
      }

      if (range.type === EasyLabsRangeType.ABOVE_OR_EQUAL) {
        if (currentRange.type === EasyLabsRangeType.ABOVE_OR_EQUAL) {
          return true;
        }

        if (currentRange.type === EasyLabsRangeType.BELOW_OR_EQUAL) {
          return currentRange.belowAge! > range.aboveAge!;
        }

        if (currentRange.type === EasyLabsRangeType.BETWEEN) {
          return currentRange.belowAge! > range.aboveAge!;
        }
      }

      if (range.type === EasyLabsRangeType.BELOW_OR_EQUAL) {
        if (currentRange.type === EasyLabsRangeType.ABOVE_OR_EQUAL) {
          return currentRange.aboveAge! < range.belowAge!;
        }

        if (currentRange.type === EasyLabsRangeType.BELOW_OR_EQUAL) {
          return true;
        }

        if (currentRange.type === EasyLabsRangeType.BETWEEN) {
          return currentRange.aboveAge! < range.belowAge!;
        }
      }

      if (range.type === EasyLabsRangeType.BETWEEN) {
        if (currentRange.type === EasyLabsRangeType.ABOVE_OR_EQUAL) {
          return currentRange.aboveAge! < range.belowAge!;
        }

        if (currentRange.type === EasyLabsRangeType.BELOW_OR_EQUAL) {
          return currentRange.belowAge! > range.aboveAge!;
        }

        if (currentRange.type === EasyLabsRangeType.BETWEEN) {
          return currentRange.aboveAge! < range.belowAge! || currentRange.belowAge! > range.aboveAge!;
        }
      }
    }

    return false;
  });

  return crosses;
};

export const getRangeCrosses = (ranges: EasyLabsRange[]) => {
  return uniqBy<EasyLabsRange>(
    ranges.reduce((acc: EasyLabsRange[], range) => {
      const crosses = crossRanges(
        range,
        ranges.filter((o) => o.id !== range.id)
      );

      return [...acc, ...crosses];
    }, []),
    'id'
  );
};

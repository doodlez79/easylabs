import { EasyLabsRangeSet, EasyLabsRangeSetType } from '@easy-labs-int/shared';

export interface RangesLineProps {
  sets: EasyLabsRangeSet[];
}

export interface Interval {
  min?: number;
  max?: number;
  type?: EasyLabsRangeSetType;
}

export interface DisplayInterval extends Interval {
  displayMin?: number;
  displayMax?: number;
  value: number;
}

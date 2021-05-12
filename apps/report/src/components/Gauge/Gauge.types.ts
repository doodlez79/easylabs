import { EasyLabsRangeSet, EasyLabsRangeSetType } from '@easy-labs-int/shared';

export interface GaugeProps {
  sets: EasyLabsRangeSet[];
  value: number;
}

export interface Interval {
  min?: number;
  max?: number;
  type?: EasyLabsRangeSetType;
}

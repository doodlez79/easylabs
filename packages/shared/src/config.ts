import { Unit } from './units';

export enum EasyLabsSex {
  MALE = 'male',
  FEMALE = 'female',
  DSNT_MATTER = 'dsnt_matter',
}

export enum EasyLabsRangeType {
  ALL = 'all',
  BELOW_OR_EQUAL = 'below_or_equal',
  ABOVE_OR_EQUAL = 'above_or_equal',
  BETWEEN = 'between',
}

export const RangeTypeLabel = {
  [EasyLabsRangeType.ALL]: 'All ages',
  [EasyLabsRangeType.ABOVE_OR_EQUAL]: 'Above or equal to',
  [EasyLabsRangeType.BELOW_OR_EQUAL]: 'Below or equal to',
  [EasyLabsRangeType.BETWEEN]: 'Between ages',
};

export const SexLabel = {
  [EasyLabsSex.DSNT_MATTER]: 'Female and Male',
  [EasyLabsSex.FEMALE]: 'Female only',
  [EasyLabsSex.MALE]: 'Male only',
};

export const sexOptions = [
  { value: EasyLabsSex.DSNT_MATTER, label: SexLabel[EasyLabsSex.DSNT_MATTER] },
  { value: EasyLabsSex.FEMALE, label: SexLabel[EasyLabsSex.FEMALE] },
  { value: EasyLabsSex.MALE, label: SexLabel[EasyLabsSex.MALE] },
];

export const rangeTypeOptions = [
  { value: EasyLabsRangeType.ALL, label: RangeTypeLabel[EasyLabsRangeType.ALL] },
  { value: EasyLabsRangeType.ABOVE_OR_EQUAL, label: RangeTypeLabel[EasyLabsRangeType.ABOVE_OR_EQUAL] },
  { value: EasyLabsRangeType.BELOW_OR_EQUAL, label: RangeTypeLabel[EasyLabsRangeType.BELOW_OR_EQUAL] },
  { value: EasyLabsRangeType.BETWEEN, label: RangeTypeLabel[EasyLabsRangeType.BETWEEN] },
];

export enum EasyLabsRangeSetType {
  NORMAL = 'normal',
  OPTIMAL = 'optimal',
  ABNORMAL = 'abnormal',
  BORDERLINE = 'borderline',
  CRITICAL = 'critical',
  DEFAULT = 'default',
}

export interface EasyLabsSetDescription {
  significance: string;
  treatment: string;
}

export interface EasyLabsBaseRangeSet {
  id: string;
  type: EasyLabsRangeSetType;
  min?: number;
  max?: number;
  tooLow?: EasyLabsSetDescription;
  tooHigh?: EasyLabsSetDescription;
  optimal?: EasyLabsSetDescription;
}

export type EasyLabsRangeSet = EasyLabsBaseRangeSet;

export interface EasyLabsRange {
  id: string;
  sex: EasyLabsSex;
  type: EasyLabsRangeType;
  belowAge?: number;
  aboveAge?: number;
  sets: EasyLabsRangeSet[];
  optimal?: EasyLabsSetDescription;
}

export interface EasyLabsTest {
  id: string;
  name: string;
  description: string;
  units: Unit[];
  defaultUnit?: Unit;
  ranges: EasyLabsRange[];
  molarMass?: number;
}

export interface EasyLabsGroup {
  id: string;
  title: string;
  tests: EasyLabsTest[];
}

export interface EasyLabsCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  groups: EasyLabsGroup[];
}

export interface EasyLabsConfig {
  header: string;
  color: string;
  logo: string;
  categories: EasyLabsCategory[];
}

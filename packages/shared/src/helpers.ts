import { Unit, group1, group2, group3, group4, group5 } from './units';
import { EasyLabsRangeSet, EasyLabsRangeSetType } from './config';
import { ColorByTypeResult } from './colors';

export const isNormalSet = (set: EasyLabsRangeSet): boolean => set.type === EasyLabsRangeSetType.NORMAL;
export const isBorderlineSet = (set: EasyLabsRangeSet): boolean => set.type === EasyLabsRangeSetType.BORDERLINE;
export const isAbnormalSet = (set: EasyLabsRangeSet): boolean => set.type === EasyLabsRangeSetType.ABNORMAL;
export const isOptimalSet = (set: EasyLabsRangeSet): boolean => set.type === EasyLabsRangeSetType.OPTIMAL;

export const getNormalSet = (sets: EasyLabsRangeSet[]): EasyLabsRangeSet | undefined => sets.find(isNormalSet);
export const getBorderlineSet = (sets: EasyLabsRangeSet[]): EasyLabsRangeSet | undefined => sets.find(isBorderlineSet);
export const getAbnormalSet = (sets: EasyLabsRangeSet[]): EasyLabsRangeSet | undefined => sets.find(isAbnormalSet);
export const getOptimalSet = (sets: EasyLabsRangeSet[]): EasyLabsRangeSet | undefined => sets.find(isOptimalSet);

export const isGroup1 = (unit: Unit): boolean => group1.includes(unit);
export const isGroup2 = (unit: Unit): boolean => group2.includes(unit);
export const isGroup3 = (unit: Unit): boolean => group3.includes(unit);
export const isGroup4 = (unit: Unit): boolean => group4.includes(unit);
export const isGroup5 = (unit: Unit): boolean => group5.includes(unit);

export const molarMassIsRequired = (units: Unit[]): boolean => {
  const grammUnits = [Unit.G_DL, Unit.MG_DL, Unit.MUG_DL, Unit.NG_ML, Unit.PG_ML, Unit.MG_L, Unit.NG_DL];
  const molUnits = [Unit.MMOL_L, Unit.MUMOL_ML, Unit.NMOL_L];

  const everyUnitIsGramm = units.every((unit) => grammUnits.includes(unit));
  const everyUnitIsMol = units.every((unit) => molUnits.includes(unit));

  return !everyUnitIsGramm && !everyUnitIsMol;
};

export const ResultTypesAnother = {
  [EasyLabsRangeSetType.NORMAL]: 'Normal',
  [EasyLabsRangeSetType.BORDERLINE]: 'Borderline',
  [EasyLabsRangeSetType.ABNORMAL]: 'Abnormal',
  [EasyLabsRangeSetType.DEFAULT]: 'Default',
  [EasyLabsRangeSetType.CRITICAL]: 'Critical',
  [EasyLabsRangeSetType.OPTIMAL]: 'Optimal',
};

export const getColorByResult = (type: EasyLabsRangeSetType | undefined) => {
  if (type === EasyLabsRangeSetType.ABNORMAL) {
    return ColorByTypeResult.ABNORMAL;
  }
  if (type === EasyLabsRangeSetType.OPTIMAL) {
    return ColorByTypeResult.OPTIMAL;
  }
  if (type === EasyLabsRangeSetType.NORMAL) {
    return ColorByTypeResult.NORMAL;
  }
  if (type === EasyLabsRangeSetType.CRITICAL) {
    return ColorByTypeResult.CRITICAL;
  }
  if (type === EasyLabsRangeSetType.BORDERLINE) {
    return ColorByTypeResult.BORDERLINE;
  }

  return ColorByTypeResult.DEFAULT;
};

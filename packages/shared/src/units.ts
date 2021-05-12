export enum Unit {
  /** При наличии молярной массы это можно конвертировать */
  // g/dL
  G_DL = 'g/dL',
  // mg/dL
  MG_DL = 'mg/dL',
  // µg/dL
  MUG_DL = 'µg/dL',
  // ng/mL
  NG_ML = 'ng/mL',
  // pg/mL
  PG_ML = 'pg/mL',
  // mmol/L
  MMOL_L = 'mmol/L',
  // mg/L
  MG_L = 'mg/L',
  // µmol/mL
  MUMOL_ML = 'µmol/mL',
  // nmol/L
  NMOL_L = 'nmol/L',
  // ng/dL
  NG_DL = 'ng/dL',

  /** Как конвертировать не понятно */

  /** Группа с общим mcL */

  // M/mcL - 10^6 cells per micro liter
  M_MCL = 'M/mcL',
  // K/mcL - 10^3 cells per micro liter
  K_MCL = 'K/mcL',

  /** Группа с общим IU */

  // IU/mL
  IU_ML = 'IU/mL',
  // mcIU/mL
  MCIU_ML = 'mcIU/mL',
  // mIU/L
  MIU_L = 'mIU/L',
  // µIU/mL
  MUIU_ML = 'µIU/mL',

  /** Группа с общим U - 1 U (μmol/min) */

  // U/L
  U_L = 'U/L',
  // µU/mL
  MUU_ML = 'µU/mL',
  // U/mL
  U_ML = 'U/mL',

  /** Непонятная группа */

  // pg
  PG = 'pg',
  // fL
  FL = 'fL',
  // mm/hr
  MM_HR = 'mm/hr',
  // mL/min/m2
  ML_MIN_M2 = 'mL/min/m2',
  // Ratio
  RATIO = 'Ratio',
  // %
  PERCENT = '%',
  // --
  NOTHING = '--',
}

export const group1 = [
  Unit.G_DL,
  Unit.MG_DL,
  Unit.MUG_DL,
  Unit.NG_ML,
  Unit.PG_ML,
  Unit.MMOL_L,
  Unit.MG_L,
  Unit.MUMOL_ML,
  Unit.NMOL_L,
  Unit.NG_DL,
];
export const group2 = [Unit.M_MCL, Unit.K_MCL];
export const group3 = [Unit.IU_ML, Unit.MCIU_ML, Unit.MIU_L, Unit.MUIU_ML];
export const group4 = [Unit.U_L, Unit.MUU_ML, Unit.U_ML];
export const group5 = [Unit.PG, Unit.FL, Unit.MM_HR, Unit.ML_MIN_M2, Unit.RATIO, Unit.PERCENT, Unit.NOTHING];

export const UnitLabel = {
  [Unit.M_MCL]: 'M/mcL',
  [Unit.PERCENT]: '%',
  [Unit.FL]: 'fL',
  [Unit.PG]: 'pg',
  [Unit.G_DL]: 'g/dL',
  [Unit.K_MCL]: 'K/mcL',
  [Unit.IU_ML]: 'IU/mL',
  [Unit.MG_DL]: 'mg/dL',
  [Unit.MUG_DL]: 'µg/dL',
  [Unit.NG_ML]: 'ng/mL',
  [Unit.PG_ML]: 'pg/mL',
  [Unit.MM_HR]: 'mm/hr',
  [Unit.U_ML]: 'U/mL',
  [Unit.MMOL_L]: 'mmol/L',
  [Unit.ML_MIN_M2]: 'mL/min/m2',
  [Unit.MG_L]: 'mg/L',
  [Unit.NOTHING]: '--',
  [Unit.U_L]: 'U/L',
  [Unit.RATIO]: 'Ratio',
  [Unit.MUMOL_ML]: 'µmol/mL',
  [Unit.MUU_ML]: 'µU/mL',
  [Unit.NMOL_L]: 'nmol/L',
  [Unit.NG_DL]: 'ng/dL',
  [Unit.MCIU_ML]: 'mcIU/mL',
  [Unit.MIU_L]: 'mIU/L',
  [Unit.MUIU_ML]: 'µIU/mL',
};

const mapValueLabel = (units: Unit[]) =>
  units.map((unit) => ({
    value: unit,
    label: UnitLabel[unit],
  }));

export const unitOptions = mapValueLabel(Object.values(Unit));

export const unitGroupsOptions = [
  {
    id: 'group1',
    groupLabel: 'Group 1',
    options: mapValueLabel(group1),
  },
  {
    id: 'group2',
    groupLabel: 'Group 2',
    options: mapValueLabel(group2),
  },
  {
    id: 'group3',
    groupLabel: 'Group 3',
    options: mapValueLabel(group3),
  },
  {
    id: 'group4',
    groupLabel: 'Group 4',
    options: mapValueLabel(group4),
  },
  {
    id: 'group5',
    groupLabel: 'Group 5',
    options: mapValueLabel(group5),
  },
];

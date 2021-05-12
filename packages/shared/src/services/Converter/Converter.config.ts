import { Unit } from '../../units';
import { MetricPrefix } from '../../metric-prefix';

export const UnitMetricPrefix = {
  [Unit.G_DL]: 1 / MetricPrefix.DECI,
  [Unit.MG_DL]: MetricPrefix.MILLI / MetricPrefix.DECI,
  [Unit.MUG_DL]: MetricPrefix.MICRO / MetricPrefix.DECI,
  [Unit.NG_ML]: MetricPrefix.NANO / MetricPrefix.MILLI,
  [Unit.PG_ML]: MetricPrefix.PICO / MetricPrefix.MILLI,
  [Unit.MMOL_L]: 1,
  [Unit.MG_L]: MetricPrefix.MILLI / 1,
  [Unit.MUMOL_ML]: MetricPrefix.MICRO / MetricPrefix.MILLI,
  [Unit.NMOL_L]: MetricPrefix.NANO / 1,
  [Unit.NG_DL]: MetricPrefix.NANO / MetricPrefix.DECI,

  [Unit.M_MCL]: MetricPrefix.MEGA / MetricPrefix.MICRO,
  [Unit.K_MCL]: MetricPrefix.KILO / MetricPrefix.MICRO,

  [Unit.IU_ML]: 1 / MetricPrefix.MILLI,
  [Unit.MCIU_ML]: MetricPrefix.MICRO / MetricPrefix.MILLI,
  [Unit.MIU_L]: MetricPrefix.MILLI / 1,
  [Unit.MUIU_ML]: MetricPrefix.MICRO / MetricPrefix.MILLI,

  [Unit.U_L]: 1,
  [Unit.MUU_ML]: MetricPrefix.MICRO / MetricPrefix.MILLI,
  [Unit.U_ML]: 1 / MetricPrefix.MILLI,

  [Unit.PG]: MetricPrefix.PICO,
  [Unit.FL]: MetricPrefix.FEMTO,
  [Unit.MM_HR]: MetricPrefix.MILLI,
  [Unit.ML_MIN_M2]: 1, // ???
  [Unit.RATIO]: 1,
  [Unit.PERCENT]: 1,
  [Unit.NOTHING]: 1, // ???
};

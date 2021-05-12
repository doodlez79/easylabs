import { Unit } from '../../units';

export interface ConvertUnit {
  value: number;
  unit: Unit;
}

export interface ConvertUnitMolToGram extends ConvertUnit {
  molarMass: number;
}

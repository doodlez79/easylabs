import { Unit } from '../../units';

import { isGroup1, isGroup2, isGroup3, isGroup4, isGroup5, molarMassIsRequired } from '../../helpers';
import { UnitMetricPrefix } from './Converter.config';
import { ConvertUnit, ConvertUnitMolToGram } from './Converter.types';

class Converter {
  public convert(from: ConvertUnit | ConvertUnitMolToGram, toUnit: Unit): number {
    const { unit: fromUnit } = from;

    if (isGroup1(fromUnit) && isGroup1(toUnit)) {
      return this.convertGroup1(from as ConvertUnitMolToGram, toUnit);
    }

    if (isGroup2(fromUnit) && isGroup2(toUnit)) {
      return this.convertOnlyMetricPrefix(from, toUnit);
    }

    if (isGroup3(fromUnit) && isGroup3(toUnit)) {
      return this.convertOnlyMetricPrefix(from, toUnit);
    }

    if (isGroup4(fromUnit) && isGroup4(toUnit)) {
      return this.convertOnlyMetricPrefix(from, toUnit);
    }

    if (isGroup5(fromUnit) && isGroup5(toUnit)) {
      return this.convertOnlyMetricPrefix(from, toUnit);
    }

    throw new Error('Convert can be only with units from the same group');
  }

  private convertGroup1(from: ConvertUnitMolToGram, toUnit: Unit): number {
    const grammUnits = [Unit.G_DL, Unit.MG_DL, Unit.MUG_DL, Unit.NG_ML, Unit.PG_ML, Unit.MG_L, Unit.NG_DL];
    const molUnits = [Unit.MMOL_L, Unit.MUMOL_ML, Unit.NMOL_L];

    const { value, unit: fromUnit, molarMass } = from;

    // И граммы и моли
    if (molarMassIsRequired([fromUnit, toUnit])) {
      // граммы в моли
      if (grammUnits.includes(fromUnit)) {
        const pristineValueInGramms = value / molarMass;

        return this.convertOnlyMetricPrefix(
          {
            unit: fromUnit,
            value: pristineValueInGramms,
          },
          toUnit
        );
      }

      // моли в граммы
      if (molUnits.includes(fromUnit)) {
        const pristineValueInMols = value * molarMass;

        return this.convertOnlyMetricPrefix(
          {
            unit: fromUnit,
            value: pristineValueInMols,
          },
          toUnit
        );
      }
    }

    return this.convertOnlyMetricPrefix(from, toUnit);
  }

  // eslint-disable-next-line class-methods-use-this
  private convertOnlyMetricPrefix(from: ConvertUnit, toUnit: Unit): number {
    const { value, unit: fromUnit } = from;

    const fromUnitMetricPrefix = UnitMetricPrefix[fromUnit];
    const toUnitMetricPrefix = UnitMetricPrefix[toUnit];

    return (value / toUnitMetricPrefix) * fromUnitMetricPrefix;
  }
}

export default new Converter();

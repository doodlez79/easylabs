import React, { FC, useState } from 'react';
import { Box, Input, MenuItem, Select } from '@material-ui/core';
import { EasyLabsRangeSetType } from '@easy-labs-int/shared';
import { getColorByResult } from '@easy-labs-int/shared/dist/helpers';

import { UnitsInputProps } from './UnitsInput.types';
import { useResultsContext } from '../../helpers/useResultsContext';

const UnitsInput: FC<UnitsInputProps> = ({
  defaultUnit,
  units,
  handlerTestInput,
  idTest,
  type,
  value: inputValue = '',
}) => {
  const [defaultValueUnit, setDefaultValueUnit] = useState(defaultUnit);
  const testResults = useResultsContext();
  const selectedUnit = testResults.find((item) => item.fullId === idTest)
    ? testResults.find((item) => item.fullId === idTest)?.unit
    : '';
  const isNumber = (value: number | string): value is number => !Number.isNaN(Number(value));

  const onChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDefaultValueUnit(event.target.value as string);
    handlerTestInput(
      idTest,
      parseFloat(String(isNumber(inputValue) && inputValue > 0 ? inputValue : 0)),
      (event.target.value as string) || ''
    );
  };

  const handlerTestInputResult = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handlerTestInput(idTest, parseFloat(value), selectedUnit || defaultValueUnit || '');
  };

  return (
    <>
      <Box
        border={type === EasyLabsRangeSetType.CRITICAL ? 6 : 4}
        color={getColorByResult(type)}
        borderRadius={16}
        p={1}
        display="flex"
        justifyContent="space-between"
      >
        <Input
          disableUnderline
          value={isNumber(inputValue) && inputValue >= 0 ? inputValue : ''}
          type="number"
          onChange={handlerTestInputResult}
        />
        <Select disableUnderline onChange={onChangeSelect} value={defaultValueUnit}>
          {units.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
    </>
  );
};

export default UnitsInput;

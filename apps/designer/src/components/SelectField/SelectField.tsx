import React, { FC, useMemo } from 'react';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { SelectFieldProps } from './SelectField.types';

const SelectField: FC<SelectFieldProps> = ({
  input: { name, value: inputValue, onChange, ...restInput },
  meta,
  label,
  filterValueByOptions = false,
  className,
  options,
  formControlProps,
  ...rest
}) => {
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

  const value = useMemo(() => {
    if (filterValueByOptions && !options.map(({ value: v }) => v).includes(inputValue)) {
      return '';
    }
    return inputValue;
  }, [inputValue, options, filterValueByOptions]);

  return (
    <>
      <FormControl variant="outlined" fullWidth className={className}>
        <InputLabel error={showError}>{label}</InputLabel>
        <Select {...rest} value={value} onChange={onChange} label={label} inputProps={restInput} error={showError}>
          {options.map(({ value: optionValue, label: optionLabel }) => {
            return (
              <MenuItem key={optionValue} value={optionValue}>
                {optionLabel}
              </MenuItem>
            );
          })}
        </Select>
        {showError && <FormHelperText error={showError}>{meta.error || meta.submitError}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default SelectField;

import React, { FC } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TextField } from '@material-ui/core';

import { SelectOption } from 'types/select';

import { MultiSelectFieldProps } from './MultiSelectField.types';

const MultiSelectField: FC<MultiSelectFieldProps> = ({
  input: { name, value, onChange, ...restInput },
  meta,
  label,
  options = [],
  formControlProps,
  ...rest
}) => {
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

  return (
    <FormControl {...formControlProps} fullWidth>
      <Autocomplete
        {...rest}
        multiple
        filterSelectedOptions
        getOptionSelected={(option, _value) => _value.value === option.value}
        onChange={(e, selectedOptions) => onChange(selectedOptions.map((item) => item.value))}
        options={options}
        value={value.map((item) => {
          return { value: item, label: options.find((el) => el.value === item)?.label || '' };
        })}
        getOptionLabel={(option: SelectOption) => option.label}
        renderInput={(params) => (
          <TextField
            id={params.id}
            disabled={params.disabled}
            fullWidth={params.fullWidth}
            size={params.size}
            InputLabelProps={params.InputLabelProps}
            InputProps={{ ...params.InputProps, ...restInput }}
            inputProps={params.inputProps}
            error={showError}
            variant="outlined"
            label={label}
          />
        )}
      />
      {showError && <FormHelperText error={showError}>{meta.error || meta.submitError}</FormHelperText>}
    </FormControl>
  );
};

export default MultiSelectField;

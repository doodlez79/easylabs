import React, { FC } from 'react';
import { FormControl, OutlinedInput, FormHelperText } from '@material-ui/core';

import { InputFieldProps } from './InputField.types';

const InputField: FC<InputFieldProps> = ({
  input: { name, onChange, label, variant, value, ...restInput },
  meta,
  ...rest
}) => {
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

  return (
    <FormControl fullWidth>
      <OutlinedInput
        {...rest}
        labelWidth={70}
        id="outlined-adornment-password"
        name={name}
        error={showError}
        inputProps={restInput}
        onChange={onChange}
        value={value}
      />
      <FormHelperText id="filled-weight-helper-text">
        {showError ? meta.error || meta.submitError : undefined}
      </FormHelperText>
    </FormControl>
  );
};

export default InputField;

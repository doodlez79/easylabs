import React, { FC, useCallback, ChangeEvent } from 'react';
import { FormControl, TextField as MuiTextField } from '@material-ui/core';

import { ParseType } from 'constants/enums';

import { TextFieldProps } from './TextField.types';
import { useStyles } from './styles';

const TextField: FC<TextFieldProps> = ({
  input: { name, onChange, value, className, ...restInput },
  meta,
  parseType = ParseType.NONE,
  ...rest
}) => {
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;
  const classes = useStyles();
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const pureValue = event.target.value;

      if (pureValue) {
        switch (parseType) {
          case ParseType.NUMBER:
            onChange(parseInt(pureValue, 10));
            break;
          case ParseType.FLOAT:
            onChange(parseFloat(pureValue));
            break;
          case ParseType.NONE:
          default:
            onChange(pureValue);
        }
      } else {
        onChange(pureValue);
      }
    },
    [parseType, onChange]
  );

  return (
    <FormControl className={className} fullWidth>
      <MuiTextField
        {...rest}
        name={name}
        className={classes.inputText}
        helperText={showError ? meta.error || meta.submitError : undefined}
        error={showError}
        inputProps={restInput}
        onChange={handleChange}
        value={value}
      />
    </FormControl>
  );
};

export default TextField;

import React, { FC } from 'react';
import { Box, InputAdornment } from '@material-ui/core';
import { Field, useField } from 'react-final-form';

import { EasyLabsRangeType, rangeTypeOptions, sexOptions } from '@easy-labs-int/shared';

import { SelectField } from 'components/SelectField';
import { TextField } from 'components/TextField';
import { ParseType } from 'constants/enums';

import { RangeMainInfoProps } from './RangeMainInfo.types';

import { useStyles } from './styles';

const RangeMainInfo: FC<RangeMainInfoProps> = ({ fieldName }) => {
  const classes = useStyles();

  const typeFieldValue = useField(`${fieldName}.type`);

  const renderFieldsAges = () => {
    if (typeFieldValue.input.value === EasyLabsRangeType.BELOW_OR_EQUAL) {
      return (
        <Field
          subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
          label={`${EasyLabsRangeType.ABOVE_OR_EQUAL === typeFieldValue.input.value ? 'Above' : 'Below'} or equal to`}
          name={`${fieldName}.belowAge`}
          component={TextField}
          className={classes.input}
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">Y/O</InputAdornment>,
            min: '0',
            step: '1',
          }}
          fullWidth
          color="primary"
          variant="outlined"
          parseType={ParseType.NUMBER}
        />
      );
    }
    if (typeFieldValue.input.value === EasyLabsRangeType.ABOVE_OR_EQUAL) {
      return (
        <Field
          subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
          label={`${EasyLabsRangeType.ABOVE_OR_EQUAL === typeFieldValue.input.value ? 'Above' : 'Below'} or equal to`}
          name={`${fieldName}.aboveAge`}
          component={TextField}
          className={classes.input}
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">Y/O</InputAdornment>,
            min: '0',
            step: '1',
          }}
          fullWidth
          color="primary"
          variant="outlined"
          parseType={ParseType.NUMBER}
        />
      );
    }
    if (typeFieldValue.input.value === EasyLabsRangeType.BETWEEN) {
      return (
        <>
          <Field
            subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
            label="Above or equal to"
            name={`${fieldName}.belowAge`}
            component={TextField}
            className={classes.input}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">Y/O</InputAdornment>,
              min: '0',
              step: '1',
            }}
            color="primary"
            variant="outlined"
            parseType={ParseType.NUMBER}
          />
          <Field
            subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
            label="Below or equal to"
            name={`${fieldName}.aboveAge`}
            component={TextField}
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">Y/O</InputAdornment>,
              min: '0',
              step: '1',
            }}
            className={classes.input}
            color="primary"
            variant="outlined"
            parseType={ParseType.NUMBER}
          />
        </>
      );
    }

    return null;
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box display="flex" alignItems="center" width="100%">
        <Field
          subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
          name={`${fieldName}.sex`}
          component={SelectField}
          color="primary"
          className={classes.input}
          options={sexOptions}
          variant="outlined"
          label="Sex"
        />
        <Field
          subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
          name={`${fieldName}.type`}
          component={SelectField}
          color="primary"
          className={classes.input}
          options={rangeTypeOptions}
          variant="outlined"
          label="Ages range"
          fullWidth
        />
        {renderFieldsAges()}
      </Box>
    </Box>
  );
};

export default RangeMainInfo;

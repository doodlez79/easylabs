import React, { FC, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';

import { TextField } from 'components/TextField';
import { TextEditorField } from 'components/TextEditorField';
import { ParseType } from 'constants/enums';

import { ThreasholdProps } from './Threashold.types';
import { ThreasholdCriteria } from './Threashold.config';

import { useStyles } from './styles';

const Threashold: FC<ThreasholdProps> = ({ title, high, fieldName }) => {
  const classes = useStyles();

  const [currentThreasholdId, setCurrentThreashold] = useState(ThreasholdCriteria.Critical);

  const threasholdType = high ? 'tooHigh' : 'tooLow';

  const renderThreashold = (type: ThreasholdCriteria) => {
    const criteriaPath = {
      [ThreasholdCriteria.Critical]: 'critical',
      [ThreasholdCriteria.Moderate]: 'moderate',
      [ThreasholdCriteria.Low]: 'low',
      [ThreasholdCriteria.High]: 'high',
    };

    return (
      <Box key={type} display="flex" flexDirection="column">
        <Typography>{type}</Typography>
        <Field
          subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
          name={`${fieldName}.${threasholdType}.${criteriaPath[type]}.significance`}
          component={TextEditorField}
        />
        <Field
          subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
          name={`${fieldName}.${threasholdType}.${criteriaPath[type]}.treatment`}
          component={TextEditorField}
        />
      </Box>
    );
  };

  const onClickInput = (type: ThreasholdCriteria) => {
    setCurrentThreashold(type);
  };

  const fields = [
    <Field
      key={`${fieldName}.${threasholdType}.critical.value`}
      subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
      name={`${fieldName}.${threasholdType}.critical.value`}
      component={TextField}
      onClick={() => onClickInput(ThreasholdCriteria.Critical)}
      type="number"
      label="Сritical"
      className={classes.input}
      fullWidth
      inputProps={{ 'aria-label': 'description' }}
      parseType={ParseType.FLOAT}
    />,
    <Field
      key={`${fieldName}.${threasholdType}.${high ? 'high' : 'low'}.value`}
      subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
      name={`${fieldName}.${threasholdType}.${high ? 'high' : 'low'}.value`}
      component={TextField}
      onClick={() => onClickInput(high ? ThreasholdCriteria.High : ThreasholdCriteria.Low)}
      type="number"
      label={high ? 'High' : 'Low'}
      className={`${classes.input} ${classes.high}`}
      fullWidth
      inputProps={{ 'aria-label': 'description' }}
      parseType={ParseType.FLOAT}
    />,
    <Field
      key={`${fieldName}.${threasholdType}.moderate.value`}
      subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
      name={`${fieldName}.${threasholdType}.moderate.value`}
      component={TextField}
      onClick={() => onClickInput(ThreasholdCriteria.Moderate)}
      type="number"
      label="Moderate"
      className={classes.input}
      fullWidth
      inputProps={{ 'aria-label': 'description' }}
      parseType={ParseType.FLOAT}
    />,
  ];

  return (
    <Box m={1} border={1} p={2}>
      <Typography>{title}</Typography>
      <Box display="flex">{high ? fields.reverse() : fields}</Box>
      {renderThreashold(currentThreasholdId)}
    </Box>
  );
};

export default Threashold;

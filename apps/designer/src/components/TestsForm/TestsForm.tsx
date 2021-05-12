import React, { FC } from 'react';
import { FieldArray } from 'react-final-form-arrays';

import { Categories } from 'components/Categories';
import { TextEditorField } from 'components/TextEditorField';

import { Field } from 'react-final-form';
import { Box, Typography } from '@material-ui/core';
import { TestsFormProps } from './TestsForm.types';

const TestsForm: FC<TestsFormProps> = () => {
  return (
    <form>
      <Box display="flex" flexDirection="column" p={2}>
        <Box mb={1}>
          <Typography variant="h5">Header</Typography>
        </Box>
        <Field
          subscription={{
            value: true,
            submitError: true,
            dirtySinceLastSubmit: true,
            error: true,
            touched: true,
          }}
          placeholder="Header..."
          name="header"
          component={TextEditorField}
          inputProps={{ 'aria-label': 'description' }}
        />
      </Box>
      <FieldArray subscription={{ value: true }} name="categories">
        {Categories}
      </FieldArray>
    </form>
  );
};

export default TestsForm;

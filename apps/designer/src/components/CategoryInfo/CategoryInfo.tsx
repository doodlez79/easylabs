import React, { FC } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import { TextField } from 'components/TextField';
import { Groups } from 'components/Groups';
import { TextEditorField } from 'components/TextEditorField';

import { CategoryInfoProps } from './CategoryInfo.types';

import { useStyles } from './styles';

const CategoryInfo: FC<CategoryInfoProps> = ({ onDeleteCategory, fieldName }) => {
  const classes = useStyles();

  return (
    <>
      <Box mb={2} p={2}>
        <Grid container spacing={3} justify="flex-end">
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Field
              subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
              label="Name"
              name={`${fieldName}.title`}
              component={TextField}
              fullWidth
              color="primary"
              variant="outlined"
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Field
              subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
              label="Icon"
              name={`${fieldName}.icon`}
              component={TextField}
              fullWidth
              color="primary"
              variant="outlined"
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Field
              subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
              placeholder="Description"
              name={`${fieldName}.description`}
              component={TextEditorField}
              fullWidth
              color="primary"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={10} className={classes.GridBtn}>
            <Button
              color="secondary"
              className={classes.button}
              onClick={onDeleteCategory}
              startIcon={<DeleteOutlineOutlinedIcon />}
            >
              delete category
            </Button>
          </Grid>
        </Grid>
      </Box>
      <FieldArray subscription={{ value: true }} name={`${fieldName}.groups`}>
        {Groups}
      </FieldArray>
    </>
  );
};

export default CategoryInfo;

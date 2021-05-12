import React, { FC, useState, useCallback } from 'react';
import { Grid, Button, Box } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddIcon from '@material-ui/icons/Add';
import { Field } from 'react-final-form';

import { unitGroupsOptions, Unit } from '@easy-labs-int/shared';
import { molarMassIsRequired } from '@easy-labs-int/shared/dist/helpers';

import { EditTestModal } from 'components/EditTestModal';
import { SelectField } from 'components/SelectField';
import { TextField } from 'components/TextField';
import { MultiSelectField } from 'components/MultiSelectField';
import { TextEditorField } from 'components/TextEditorField';
import { ParseType } from 'constants/enums';

import { TestProps } from './Test.types';
import { TestField } from './Test.config';

import { useStyles } from './styles';

const Test: FC<TestProps> = ({ onNew, onDelete, disableDelete, fieldName, selectedUnits }) => {
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = useCallback(
    (withConfirm = true) => {
      if (!withConfirm) {
        return setOpenModal(false);
      }

      // eslint-disable-next-line no-restricted-globals
      const isClose = confirm('Are you sure you want to close this form? You can lose your data.');

      if (isClose) {
        setOpenModal(false);
      }
    },
    [setOpenModal]
  );

  const unitsOptions = unitGroupsOptions.reduce(
    (acc, group) => [...acc, ...group.options.map((item) => ({ ...item, groupLabel: group.groupLabel }))],
    [] as {
      value: string;
      label: string;
      groupLabel: string;
    }[]
  );

  const selectedGroup =
    selectedUnits.length > 0 && unitsOptions.find((o) => o.value === selectedUnits[0].value)?.groupLabel;

  return (
    <>
      <Box mb={2} p={2} border={4} borderRadius={5}>
        <Grid container spacing={3} justify="flex-end">
          <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
            <Field
              subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
              name={`${fieldName}.${TestField.name}`}
              component={TextField}
              color="primary"
              variant="outlined"
              label="Name:"
              fullWidth
            />
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
            <Field
              subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
              name={`${fieldName}.${TestField.units}`}
              component={MultiSelectField}
              color="primary"
              options={unitsOptions.filter((o) => o.groupLabel === selectedGroup || !selectedGroup)}
              groupBy={(option: { value: string; label: string; groupLabel: string }) => option.groupLabel}
              multiple
              variant="outlined"
              label="Units:"
              fullWidth
            />
          </Grid>
          {molarMassIsRequired(selectedUnits.map((item) => item.value) as Unit[]) && (
            <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
              <Field
                subscription={{
                  value: true,
                  submitError: true,
                  dirtySinceLastSubmit: true,
                  error: true,
                  touched: true,
                }}
                name={`${fieldName}.${TestField.molarMass}`}
                component={TextField}
                parseType={ParseType.FLOAT}
                type="number"
                color="primary"
                variant="outlined"
                label="Molar Mass:"
                fullWidth
              />
            </Grid>
          )}
          <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
            <Field
              subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
              name={`${fieldName}.${TestField.defaultUnit}`}
              component={SelectField}
              filterValueByOptions
              color="primary"
              options={selectedUnits}
              label="Default Unit:"
              fullWidth
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Field
              subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
              name={`${fieldName}.${TestField.description}`}
              component={TextEditorField}
              placeholder="Description:"
              fullWidth
            />
          </Grid>
          <Box display="flex">
            <Button color="primary" className={classes.button} onClick={onNew} startIcon={<AddIcon />}>
              insert new test
            </Button>
            <Button
              color="primary"
              onClick={handleOpenModal}
              className={classes.button}
              startIcon={<EditOutlinedIcon />}
            >
              edit
            </Button>
            {!disableDelete && (
              <Button
                color="secondary"
                onClick={onDelete}
                className={classes.button}
                startIcon={<DeleteOutlineOutlinedIcon />}
              >
                delete test
              </Button>
            )}
          </Box>
        </Grid>
      </Box>
      <Field
        name={`${fieldName}.ranges`}
        subscription={{ value: true }}
        component={EditTestModal}
        open={openModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Test;

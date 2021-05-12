import React, { FC, MouseEventHandler, useCallback, useState } from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Collapse, Box, Button, Typography } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import { TextField } from 'components/TextField';
import { Tests } from 'components/Tests';

import { TestGroupProps } from './TestGroup.types';

import { useStyles } from './styles';

const TestGroup: FC<TestGroupProps> = ({ fieldName, onDelete, onNewGroup, availableTestsCount, disableDelete }) => {
  const [openCollapse, setOpenCollapse] = useState(true);
  const classes = useStyles();

  const handleCollapse = useCallback(() => {
    setOpenCollapse((s) => !s);
  }, [setOpenCollapse]);

  const handleInputClick: MouseEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <Box
        display="flex"
        onClick={handleCollapse}
        className={classes.collapseItemBtn}
        alignItems="center"
        justifyContent="space-between"
        p={2}
        mb={1}
      >
        <Field
          subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
          name={`${fieldName}.title`}
          component={TextField}
          onClick={handleInputClick}
        />
        {openCollapse ? <ExpandLess /> : <ExpandMore />}
      </Box>
      <Collapse in={openCollapse}>
        <FieldArray subscription={{ value: true, error: true }} name={`${fieldName}.tests`}>
          {Tests}
        </FieldArray>
      </Collapse>
      <Box mb={1} p={2} display="flex" justifyContent="space-between" className={classes.collapseItemBtn}>
        <Typography align="left">{`${availableTestsCount} available tests in this group`}</Typography>
        <Box display="flex">
          <Button color="primary" className={classes.button} onClick={onNewGroup} startIcon={<AddIcon />}>
            insert new group
          </Button>
          {!disableDelete && (
            <Button
              color="secondary"
              onClick={onDelete}
              className={classes.button}
              startIcon={<DeleteOutlineOutlinedIcon />}
            >
              delete group
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default TestGroup;

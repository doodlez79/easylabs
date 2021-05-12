import React, { FC, useState } from 'react';
import { Box, Button, Collapse, Tooltip, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';
import difference from 'lodash/difference';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { EasyLabsRangeSetType } from '@easy-labs-int/shared';

import { TextField } from 'components/TextField';
import { SelectField } from 'components/SelectField';
import { TextEditorField } from 'components/TextEditorField';
import { ParseType } from 'constants/enums';

import { rangeSetTypeOptions } from './RangeSet.config';
import { RangeSetProps } from './RangeSet.types';

import { useStyles } from './styles';

const allRangeSetTypes = [
  EasyLabsRangeSetType.OPTIMAL,
  EasyLabsRangeSetType.NORMAL,
  EasyLabsRangeSetType.ABNORMAL,
  EasyLabsRangeSetType.BORDERLINE,
];

export const ResultTypesForDesigner = {
  [EasyLabsRangeSetType.OPTIMAL]: 'Optimal',
  [EasyLabsRangeSetType.NORMAL]: 'Normal',
  [EasyLabsRangeSetType.BORDERLINE]: 'Borderline',
  [EasyLabsRangeSetType.ABNORMAL]: 'Abnormal',
  [EasyLabsRangeSetType.DEFAULT]: 'Default',
  [EasyLabsRangeSetType.CRITICAL]: 'Critical',
};

const RangeSet: FC<RangeSetProps> = ({ fieldName, usedTypes, type, hasMax, hasMin }) => {
  const classes = useStyles();

  const typesDiff = difference(allRangeSetTypes, usedTypes);
  const typeOptions = rangeSetTypeOptions.filter(({ value }) => typesDiff.includes(value));

  const [openCollapse, setOpenCollapse] = useState(false);
  const [openCollapseEditor, setOpenCollapseEditor] = useState(false);

  return (
    <Box border={1} borderRadius={5} p={2}>
      <Box mb={2}>
        <Button
          className={classes.setTypeButton}
          variant="contained"
          color="primary"
          onClick={() => setOpenCollapse(!openCollapse)}
          endIcon={openCollapse ? <ExpandLess /> : <ExpandMore />}
        >
          {ResultTypesForDesigner[type]}
        </Button>
      </Box>

      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <Box display="flex" className={classes.setValuesContainer}>
          <Box maxWidth="200px" width="100%" className={classes.typeFieldBox}>
            <Field
              subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
              name={`${fieldName}.type`}
              component={SelectField}
              color="primary"
              options={typeOptions}
              variant="outlined"
              label="Type"
            />
          </Box>

          <Box display="flex" className={classes.valuesBox}>
            <Box maxWidth="200px" m={1}>
              <Field
                subscription={{
                  value: true,
                  submitError: true,
                  dirtySinceLastSubmit: true,
                  error: true,
                  touched: true,
                }}
                name={`${fieldName}.min`}
                component={TextField}
                type="number"
                label="Min"
                fullWidth
                inputProps={{ 'aria-label': 'description' }}
                parseType={ParseType.FLOAT}
              />
            </Box>
            <Box maxWidth="200px" m={1}>
              <Field
                subscription={{
                  value: true,
                  submitError: true,
                  dirtySinceLastSubmit: true,
                  error: true,
                  touched: true,
                }}
                name={`${fieldName}.max`}
                component={TextField}
                type="number"
                label="Max"
                fullWidth
                inputProps={{ 'aria-label': 'description' }}
                parseType={ParseType.FLOAT}
              />
            </Box>
          </Box>
        </Box>
        {(hasMax || hasMin) && (
          <Box display="flex" flexDirection="column">
            <Box mb={2} mt={2}>
              <Button
                onClick={() => setOpenCollapseEditor(!openCollapseEditor)}
                variant="contained"
                color="primary"
                endIcon={openCollapseEditor ? <ExpandLess /> : <ExpandMore />}
              >
                significance/treatment
              </Button>
            </Box>
            <Collapse in={openCollapseEditor} timeout="auto" unmountOnExit>
              <Box display="flex" flexWrap="wrap" boxSizing="border-box" justifyContent="space-between">
                {type === EasyLabsRangeSetType.OPTIMAL && (
                  <Box display="flex">
                    <Box display="flex" flexDirection="column" p={2} m={2} maxWidth="48%" width="100%" border={1}>
                      <Typography gutterBottom>Significance</Typography>
                      <Field
                        subscription={{
                          value: true,
                          submitError: true,
                          dirtySinceLastSubmit: true,
                          error: true,
                          touched: true,
                        }}
                        name={`${fieldName}.optimal.significance`}
                        component={TextEditorField}
                      />
                    </Box>
                    <Box display="flex" flexDirection="column" p={2} m={2} maxWidth="48%" width="100%" border={1}>
                      <Typography gutterBottom>Treatment</Typography>
                      <Field
                        subscription={{
                          value: true,
                          submitError: true,
                          dirtySinceLastSubmit: true,
                          error: true,
                          touched: true,
                        }}
                        name={`${fieldName}.optimal.treatment`}
                        component={TextEditorField}
                      />
                    </Box>
                  </Box>
                )}
                {hasMin && type !== EasyLabsRangeSetType.OPTIMAL && (
                  <Box display="flex" flexDirection="column">
                    <Box display="flex">
                      <Typography
                        gutterBottom
                        style={{
                          marginRight: '5px',
                        }}
                      >
                        Too Low
                      </Typography>
                      <Tooltip
                        title={
                          <Typography
                            gutterBottom
                            style={{
                              marginRight: '5px',
                            }}
                          >
                            {`Description for values over the left border of the range - ${ResultTypesForDesigner[type]}`}
                          </Typography>
                        }
                        placement="top"
                      >
                        <HelpOutlineIcon />
                      </Tooltip>
                    </Box>
                    <Box display="flex">
                      <Box display="flex" flexDirection="column" p={2} m={2} maxWidth="48%" width="100%" border={1}>
                        <Typography gutterBottom>Significance</Typography>
                        <Field
                          subscription={{
                            value: true,
                            submitError: true,
                            dirtySinceLastSubmit: true,
                            error: true,
                            touched: true,
                          }}
                          name={`${fieldName}.tooLow.significance`}
                          component={TextEditorField}
                        />
                      </Box>
                      <Box display="flex" flexDirection="column" p={2} m={2} maxWidth="48%" width="100%" border={1}>
                        <Typography gutterBottom>Treatment</Typography>
                        <Field
                          subscription={{
                            value: true,
                            submitError: true,
                            dirtySinceLastSubmit: true,
                            error: true,
                            touched: true,
                          }}
                          name={`${fieldName}.tooLow.treatment`}
                          component={TextEditorField}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
                {hasMax && hasMin && type !== EasyLabsRangeSetType.OPTIMAL && (
                  <Box display="flex" flexDirection="column">
                    <Box display="flex">
                      <Typography
                        gutterBottom
                        style={{
                          marginRight: '5px',
                        }}
                      >
                        Too High
                      </Typography>
                      <Tooltip
                        title={
                          <Typography
                            gutterBottom
                            style={{
                              marginRight: '5px',
                            }}
                          >
                            {`Description for values over the right border of the range - ${ResultTypesForDesigner[type]}`}
                          </Typography>
                        }
                        placement="top"
                      >
                        <HelpOutlineIcon />
                      </Tooltip>
                    </Box>
                    <Box display="flex">
                      <Box display="flex" flexDirection="column" p={2} m={2} maxWidth="48%" width="100%" border={1}>
                        <Typography gutterBottom>Significance</Typography>
                        <Field
                          subscription={{
                            value: true,
                            submitError: true,
                            dirtySinceLastSubmit: true,
                            error: true,
                            touched: true,
                          }}
                          name={`${fieldName}.tooHigh.significance`}
                          component={TextEditorField}
                        />
                      </Box>
                      <Box display="flex" flexDirection="column" p={2} m={2} maxWidth="48%" width="100%" border={1}>
                        <Typography gutterBottom>Treatment</Typography>
                        <Field
                          subscription={{
                            value: true,
                            submitError: true,
                            dirtySinceLastSubmit: true,
                            error: true,
                            touched: true,
                          }}
                          name={`${fieldName}.tooHigh.treatment`}
                          component={TextEditorField}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Collapse>
          </Box>
        )}
      </Collapse>
    </Box>
  );
};

export default RangeSet;

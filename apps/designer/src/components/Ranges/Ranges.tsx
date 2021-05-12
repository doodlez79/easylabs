import React, { FC } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { FieldArray } from 'react-final-form-arrays';
import { nanoid } from 'nanoid';

import { EasyLabsRangeType, EasyLabsSex, RangeTypeLabel, SexLabel } from '@easy-labs-int/shared';

import { Sets } from 'components/Sets';
import { RangeMainInfo } from 'components/RangeMainInfo';
import { getDefaultRange } from 'containers/MainForm/MainForm.config';
import RangesLine from 'components/RangesLine/RangesLine';

import { RangesProps } from './Ranges.types';
import { getRangeTitle, getRangeCrosses } from './helpers';

import { useStyles } from './styles';

const Ranges: FC<RangesProps> = ({ fields }) => {
  const classes = useStyles();

  const existedSexes = fields.value.map((o) => o.sex);
  const existedTypes = fields.value.map((o) => o.type);

  const cantAdd = existedSexes.includes(EasyLabsSex.DSNT_MATTER) && existedTypes.includes(EasyLabsRangeType.ALL);

  const crosses = getRangeCrosses(fields.value);

  return (
    <>
      {fields.map((name, index) => {
        const currentRange = fields.value[index];
        const { sex, type, aboveAge, belowAge, sets } = currentRange;

        return (
          <Box key={name}>
            <Box p={2} border={1} mb={1}>
              <Typography>{getRangeTitle(sex, type, aboveAge, belowAge, sets)}</Typography>
              <Box>
                <RangeMainInfo fieldName={name} />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <FieldArray name={`${name}.sets`}>{Sets}</FieldArray>
              </Box>
              <RangesLine sets={sets} />
              {!cantAdd && (
                <>
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                      fields.push(getDefaultRange());
                    }}
                    startIcon={<AddIcon />}
                  >
                    insert new range
                  </Button>
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                      fields.push({
                        ...currentRange,
                        id: nanoid(),
                      });
                    }}
                    startIcon={<FileCopyIcon />}
                  >
                    duplicate
                  </Button>
                </>
              )}
              {fields.length !== 1 && (
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    // eslint-disable-next-line no-restricted-globals
                    const isDelete = confirm('Are you sure you want to delete this range?');

                    if (isDelete) {
                      fields.remove(index);
                    }
                  }}
                  startIcon={<DeleteOutlineOutlinedIcon />}
                >
                  delete
                </Button>
              )}
            </Box>
            {crosses.length > 0 && (
              <Box mt={1} mb={1}>
                <Typography>You have an intersection of ranges:</Typography>
                {crosses.map((range, _index) => (
                  <Box key={range.id}>
                    <Typography>
                      {`${_index + 1}. Sex ${SexLabel[range.sex]}, Type ${RangeTypeLabel[range.type]}, Range: ${
                        range.belowAge || -Infinity
                      } - ${range.aboveAge || Infinity}.`}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        );
      })}
    </>
  );
};

export default Ranges;

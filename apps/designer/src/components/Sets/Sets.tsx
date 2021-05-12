import React, { FC } from 'react';
import { Box, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import { RangeSet } from 'components/RangeSet';
import { getDefaultRangeSet } from 'containers/MainForm/MainForm.config';

import { SetsProps } from './Sets.types';

import { useStyles } from './styles';

const Sets: FC<SetsProps> = ({ fields }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      {fields.map((name, index) => {
        const { type, min, max } = fields.value[index];
        const usedTypes = (fields.value || []).map((o) => o.type);

        return (
          <Box className={classes.setContainer} pt={2} key={name}>
            <RangeSet
              fieldName={name}
              usedTypes={usedTypes.filter((o) => o !== type)}
              type={type}
              hasMin={Boolean(min)}
              hasMax={Boolean(max)}
            />
            {usedTypes.length <= 3 && (
              <Button
                color="primary"
                onClick={() => {
                  fields.push(getDefaultRangeSet(usedTypes));
                }}
                startIcon={<AddIcon />}
              >
                insert new set
              </Button>
            )}
            {fields.length !== 1 && (
              <Button
                color="primary"
                onClick={() => {
                  // eslint-disable-next-line no-restricted-globals
                  const isDelete = confirm('Are you sure you want to delete this set?');

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
        );
      })}
    </Box>
  );
};

export default Sets;

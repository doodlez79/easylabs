import React, { FC, useEffect } from 'react';
import { Box, Button, createMuiTheme, IconButton, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SketchPicker } from 'react-color';
import { Field, useField } from 'react-final-form';

import { useEasyLabsThemeContext } from 'helpers/useEasyLabsThemeContext';

import { ColorModalProps } from './ColorModal.types';

import { useStyles } from './styles';

const ColorModal: FC<ColorModalProps> = ({ open, onClose }) => {
  const classes = useStyles();

  const { changeTheme } = useEasyLabsThemeContext();

  const {
    input: { value: color },
  } = useField('color');

  useEffect(() => {
    if (color) {
      // @ts-ignore
      changeTheme((t) =>
        createMuiTheme({
          ...t,
          palette: {
            ...t.palette,
            primary: {
              main: color,
            },
          },
        })
      );
    }
  }, [color, changeTheme]);

  return (
    <Modal open={open} className={classes.modal}>
      <Box>
        <Box p={1} className={classes.header} display="flex" alignItems="center" justifyContent="space-between">
          <Typography>Change color theme</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className={classes.content}>
          <Box display="flex" alignItems="center" justifyContent="center" mb={2} p={2}>
            <Field
              subscription={{ value: true, submitError: true, dirtySinceLastSubmit: true, error: true, touched: true }}
              name="color"
              component={({ input: { value, onChange } }) => {
                return (
                  <SketchPicker
                    color={value}
                    onChangeComplete={(valueColor) => {
                      onChange(valueColor.hex);
                    }}
                  />
                );
              }}
            />
          </Box>
          <Button onClick={onClose} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ColorModal;

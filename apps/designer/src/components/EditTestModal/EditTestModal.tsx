import React, { FC, useCallback } from 'react';
import { Modal, Fade, Backdrop, Box, Typography, Button } from '@material-ui/core';
import { FieldArray } from 'react-final-form-arrays';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { EasyLabsTest } from '@easy-labs-int/shared';

import { HeaderModal } from 'components/HeaderModal';
import { Ranges } from 'components/Ranges';
import { validate } from 'helpers/final-form';

import { EditTestModalProps } from './EditTestModal.types';
import { validationSchema } from './EditTestModal.validation';

import { useStyles } from './styles';

const EditTestModal: FC<EditTestModalProps> = ({ input: { onChange, value }, open, onClose }) => {
  const classes = useStyles();

  const onSubmit = useCallback(
    (values: Pick<EasyLabsTest, 'ranges'>) => {
      onChange(values.ranges);

      onClose(false);
    },
    [onChange, onClose]
  );

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box className={classes.content} display="flex" flexDirection="column" alignItems="flex-end">
          <HeaderModal title="Edit ranges for this test" onCloseModal={onClose} />
          <Box className={classes.rangeContent} p={2}>
            <Typography>
              This test will only show for users who meet the criteria of one of the ranges you set up here.
            </Typography>
            <Form
              onSubmit={onSubmit}
              subscription={{ pristine: true, submitting: true }}
              initialValues={{ ranges: value }}
              validate={validate<Pick<EasyLabsTest, 'ranges'>>(validationSchema)}
              mutators={{
                ...arrayMutators,
              }}
            >
              {({ handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <FieldArray subscription={{ value: true }} name="ranges">
                      {Ranges}
                    </FieldArray>
                    <Button type="submit" color="primary" variant="contained">
                      SAVE
                    </Button>
                  </form>
                );
              }}
            </Form>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditTestModal;

import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      maxWidth: '400px',
      zIndex: 99999,
      margin: '100px auto',
    },
    modalContent: {},
  })
);

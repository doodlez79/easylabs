import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    GridBtn: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    Test: {
      borderBottom: '1px solid',
    },
    button: {
      fontSize: '11px',
      textTransform: 'lowercase',
    },
  })
);

import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    button: {
      fontSize: '11px',
      textTransform: 'lowercase',
    },
  })
);

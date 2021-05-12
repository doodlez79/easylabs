import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    setContainer: {
      width: '100%',
    },
  })
);

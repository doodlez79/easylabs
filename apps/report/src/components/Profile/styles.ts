import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    contentModal: {
      overflow: 'auto',
      height: '100%',
      maxHeight: '470px',
      background: '#fff',
    },
  })
);

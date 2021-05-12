import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
    },
    fileInput: {
      display: 'none',
      visibility: 'hidden',
      width: 0,
      height: 0,
      pointerEvents: 'none',
    },
  })
);

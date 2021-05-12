import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    result: {
      transition: 'all 0.3s',
      color: '#000',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
  })
);

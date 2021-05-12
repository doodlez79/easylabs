import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    arrowUp: {
      position: 'fixed',
      bottom: '15px',
      zIndex: 99,
      right: '15px',
      [theme.breakpoints.down(567)]: {
        width: '36px',
        height: '36px',
        right: '7px',
      },
    },
  })
);

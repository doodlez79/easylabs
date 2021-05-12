import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorBtn: {
      position: 'fixed',
      bottom: '80px',
      zIndex: 99,
      right: '15px',
      borderRadius: '100%',
      height: '56px',
      width: '56px',
      minWidth: '56px',
      [theme.breakpoints.down(567)]: {
        width: '36px',
        height: '36px',
        right: '7px',
        bottom: '60px',
        minWidth: '36px',
      },
    },
    container: {
      [theme.breakpoints.down(567)]: {
        paddingTop: '75px',
      },
    },
    defaultStyle: {
      fontSize: 14,
    },
  })
);

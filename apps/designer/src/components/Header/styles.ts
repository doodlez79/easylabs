import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: '50px',
      height: '50px',
    },
    header: {
      background: theme.palette.primary.light,
      [theme.breakpoints.down(567)]: {
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '999999',
        maxWidth: '100vw',
        overflow: 'auto',
      },
    },
    button: {
      margin: '0 10px',
      fontSize: theme.typography.fontSize,
      color: theme.palette.primary.contrastText,
    },
    pressedButton: {
      background: theme.palette.primary.dark,
    },
  })
);

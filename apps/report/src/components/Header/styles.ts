import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: '50px',
      height: '50px',
    },
    headerLogoBlock: {
      [theme.breakpoints.down(567)]: {
        width: '80vw',
      },
    },
    header: {
      background: theme.palette.primary.dark,
      [theme.breakpoints.down(567)]: {
        position: 'fixed',
        width: '100%',
        top: '0',
        left: '0',
        zIndex: '1299',
        maxWidth: '100vw',
        overflow: 'auto',
      },
    },
  })
);

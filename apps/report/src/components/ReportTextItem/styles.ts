import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mobileVersion: {
      [theme.breakpoints.down(567)]: {
        flexDirection: 'column',
      },
    },
  })
);

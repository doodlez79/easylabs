import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      width: '60%',
      [theme.breakpoints.down(567)]: {
        width: '100%',
      },
    },
    testItem: {
      borderBottom: '1px solid',
      [theme.breakpoints.down(567)]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
  })
);

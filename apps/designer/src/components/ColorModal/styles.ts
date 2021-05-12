import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      maxWidth: '400px',
      margin: '100px auto',
    },
    header: {
      color: theme.palette.primary.contrastText,
      background: theme.palette.primary.dark,
    },
    content: {
      background: 'white',
    },
  })
);

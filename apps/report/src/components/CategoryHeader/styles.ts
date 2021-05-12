import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      color: theme.palette.primary.contrastText,
    },
    header: {
      borderRadius: '0 0 5px 5px',
      background: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
  })
);

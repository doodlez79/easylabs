import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputText: {
      color: theme.palette.primary.contrastText,
    },
  })
);

import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    blockCool: {
      background: theme.palette.success.light,
    },
  })
);

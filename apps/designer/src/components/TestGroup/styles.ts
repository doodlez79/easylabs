import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    collapseItemBtn: {
      background: theme.palette.primary.light,
      borderRadius: '5px',
    },
    button: {
      fontSize: theme.typography.fontSize,
      color: theme.palette.text.primary,
    },
  })
);

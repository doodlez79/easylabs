import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      maxWidth: '400px',
      zIndex: 99999,
      margin: '100px auto',
    },
    copyText: {
      color: theme.palette.info.main,
    },

    linkText: {
      width: '100%',
      whiteSpace: 'nowrap',
    },
    header: {
      background: theme.palette.primary.dark,
    },
    content: {
      background: 'white',
    },
  })
);

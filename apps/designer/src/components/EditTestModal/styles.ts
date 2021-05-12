import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      fontSize: '11px',
      textTransform: 'lowercase',
    },
    content: {
      maxWidth: '90vw',
      maxHeight: '90vh',
      height: '100%',
      backgroundColor: theme.palette.background.paper,
      width: '100%',
    },
    rangeContent: {
      overflow: 'auto',
      background: '#fff',
      width: '100%',
    },
    paper: {
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

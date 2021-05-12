import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerTabs: {
      position: 'relative',
      borderRadius: '5px',
    },
    tabs: {
      paddingRight: '50px',
    },
    addNewCategory: {
      marginLeft: '10px',
    },
    submitBtn: {
      position: 'fixed',
      right: '10px',
      bottom: '10px',
    },
    addBtn: {
      width: '40px',
      height: '40px',
      position: 'absolute',
      right: '12px',
      top: 'calc(50% - 20px)',
      background: theme.palette.primary.light,
    },
    collapseItemBtn: {
      background: theme.palette.primary.light,
      borderRadius: '5px',
    },
    collapseItems: {
      // padding: '25px',
    },
    button: {
      fontSize: theme.typography.fontSize,
      color: theme.palette.text.primary,
    },
  })
);

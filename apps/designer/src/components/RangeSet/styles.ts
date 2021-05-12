import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    setTypeButton: {
      width: '100%',
      justifyContent: 'flex-start',
    },
    setValuesContainer: {
      justifyContent: 'space-between',
    },
    typeFieldBox: {
      flex: 1,
    },
    valuesBox: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    outsideHeader: {
      marginTop: '-16px',
    },
  })
);

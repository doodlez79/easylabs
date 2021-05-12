import React, { FC } from 'react';
import { Fab } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { ArrowUpProps } from './ArrowUp.types';
import { useStyles } from './styles';

const ArrowUp: FC<ArrowUpProps> = () => {
  const classes = useStyles();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fab color="primary" className={classes.arrowUp} onClick={scrollTop}>
      <ArrowUpwardIcon />
    </Fab>
  );
};

export default ArrowUp;

import React, { FC, useState } from 'react';
import { Box, Typography } from '@material-ui/core';

import { ReactComponent as HeartSvg } from 'assets/svg/heart.svg';

import { CategoryHeaderProps } from './CategoryHeader.types';
import { useStyles } from './styles';

const CategoryHeader: FC<CategoryHeaderProps> = ({ description, title, icon }) => {
  const classes = useStyles();
  const [iconImg, setIconImg] = useState(icon);

  return (
    <Box display="flex" flexDirection="column" p={2} className={classes.header} mb={1}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" flexDirection="column">
          <Typography className={classes.text} variant="h4" gutterBottom>
            {title}
          </Typography>
          <Box>
            <div
              className={classes.text}
              style={{
                marginBottom: '10px',
              }}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </Box>
        </Box>
        <Box maxWidth="70px" maxHeight="70px" display="flex" justifyContent="flex-end" alignItems="center">
          {iconImg ? (
            <img
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              onError={() => {
                setIconImg('');
              }}
              src={icon}
              alt="img"
            />
          ) : (
            <HeartSvg />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryHeader;

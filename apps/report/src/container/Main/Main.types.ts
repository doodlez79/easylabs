import React from 'react';
import { Theme } from '@material-ui/core';

import { EasyLabsConfig, EasyLabsConfig as EasyLabsConfigTypes } from '@easy-labs-int/shared';

export interface MainProps {
  config: EasyLabsConfig;
  setEasyLabConfig: React.Dispatch<React.SetStateAction<EasyLabsConfigTypes>>;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

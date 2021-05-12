import React, { createContext } from 'react';
import { Theme } from '@material-ui/core';

const EasyLabsThemeContext = createContext<{ changeTheme: React.Dispatch<React.SetStateAction<Theme>> }>({
  changeTheme: () => {},
});

export const EasyLabsThemeProvider = EasyLabsThemeContext.Provider;

export default EasyLabsThemeContext;

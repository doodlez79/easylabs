import React, { FC, useEffect, useState } from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
  Box,
  CircularProgress,
} from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';

import { EasyLabsConfig as EasyLabsConfigTypes } from '@easy-labs-int/shared';

import { MainForm } from 'containers/MainForm';
import { EasyLabsThemeProvider } from 'helpers/EasyLabsThemeContext';
import { initialValues } from 'containers/MainForm/MainForm.config';

const App: FC = () => {
  const [EasyLabConfig, setEasyLabConfig] = useState<EasyLabsConfigTypes>(initialValues);
  const [loading, setLoading] = useState(true);
  const defaultTheme = createMuiTheme({
    typography: {
      fontSize: 12,
    },
    palette: {
      primary: {
        main: '#98B1CD',
      },
      secondary: {
        main: '#000',
      },
    },
  });
  const [theme, setTheme] = useState(responsiveFontSizes(defaultTheme));

  useEffect(() => {
    fetch('./settings.json')
      .then((res) => res.json())
      .then((res) => {
        if (!isEmpty(res)) {
          setEasyLabConfig(res);
          if (res.color) {
            setTheme((t) =>
              createMuiTheme({
                ...t,
                palette: {
                  ...t.palette,
                  primary: {
                    main: res.color,
                  },
                },
              })
            );
          }
        } else {
          setEasyLabConfig(initialValues);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <EasyLabsThemeProvider
      value={{
        changeTheme: setTheme,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100vh">
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <MainForm EasyLabConfig={EasyLabConfig} />
        )}
      </ThemeProvider>
    </EasyLabsThemeProvider>
  );
};

export default App;

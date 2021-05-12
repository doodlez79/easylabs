import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  responsiveFontSizes,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import { EasyLabsConfig as EasyLabsConfigTypes } from '@easy-labs-int/shared';

import { Main } from 'container/Main';

import { AppProps } from './App.types';

const App: FC<AppProps> = () => {
  const [EasyLabConfig, setEasyLabConfig] = useState<EasyLabsConfigTypes>({
    color: '#98B1CD',
    logo: './logo.png',
    header: '',
    categories: [],
  });
  const [loading, setLoading] = useState(true);
  const defaultTheme = createMuiTheme({
    typography: {
      fontSize: 12,
    },
    palette: {
      primary: {
        main: '#a3e27c',
      },
      secondary: {
        main: '#4f7a3c',
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
          setEasyLabConfig({
            color: '#98B1CD',
            logo: './logo.png',
            header: '',
            categories: [],
          });
        }

        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading && !EasyLabConfig.categories.length ? (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100vh">
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Main config={EasyLabConfig} setTheme={setTheme} setEasyLabConfig={setEasyLabConfig} />
      )}
    </ThemeProvider>
  );
};

export default App;

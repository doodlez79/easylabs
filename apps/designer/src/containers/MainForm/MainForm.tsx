import React, { FC, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Button, Container } from '@material-ui/core';
import PaletteIcon from '@material-ui/icons/Palette';

import { EasyLabsConfig } from '@easy-labs-int/shared';

import { ColorModal } from 'components/ColorModal';
import { ArrowUp } from 'components/ArrowUp';
import { Header } from 'components/Header';
import { TestsForm } from 'components/TestsForm';
import { validate } from 'helpers/final-form';
import { FilterProvider } from 'helpers/FilterContext';
import { updateSettings } from 'helpers/updateSettings';

import { MainFormProps } from './MainForm.types';
import { mainSchema } from './MainForm.validation';
import { initialValues as _initialValues } from './MainForm.config';

import { useStyles } from './styles';

const MainForm: FC<MainFormProps> = ({ EasyLabConfig }) => {
  const classes = useStyles();
  const [initialValues, setInitialValues] = useState(EasyLabConfig);
  const [colorModal, setColorModal] = useState(false);
  const [filterString, setFilterString] = useState('');
  const [onlyWarnings, setOnlyWarnings] = useState(false);

  const saveFile = (data: EasyLabsConfig, name: string, type: string) => {
    const file = new Blob([JSON.stringify(data)], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = name;
    updateSettings(data)
      .then(() => {
        a.click();
        alert('File saved successfully');
      })
      .catch((e) => console.log(e));
  };

  // const interval = React.useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    setInitialValues(EasyLabConfig);
  }, [EasyLabConfig]);

  // useEffect(() => {
  //   const configLocalStorage = localStorage.getItem('ConfigEasyLabs');
  //   if (configLocalStorage != null) {
  //     setInitialValues(JSON.parse(configLocalStorage));
  //   }
  //
  //   return () => {
  //     if (interval.current) {
  //       clearTimeout(interval.current);
  //     }
  //   };
  // }, []);

  const onClear = () => {
    localStorage.setItem('ConfigEasyLabs', JSON.stringify(EasyLabConfig));
    setInitialValues(EasyLabConfig);
  };
  const openColorModal = () => {
    setColorModal(true);
  };
  const closeColorModal = () => {
    setColorModal(false);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Form
        onSubmit={onClear}
        subscription={{ pristine: true, submitting: true, values: true }}
        initialValues={initialValues}
        validate={validate<EasyLabsConfig>(mainSchema)}
        mutators={{
          ...arrayMutators,
        }}
      >
        {({ values }) => {
          // console.log(values, "values")
          // if (interval.current) {
          //   clearTimeout(interval.current);
          // }
          // // @ts-ignore
          // interval.current = setTimeout(
          //   (_values) => {
          //     localStorage.setItem('ConfigEasyLabs', JSON.stringify(_values));
          //   },
          //   2000,
          //   values
          // );

          return (
            <FilterProvider value={{ filterString, onlyWarnings }}>
              <Header
                imgPath={values.logo}
                onClear={() => {
                  updateSettings(_initialValues)
                    .then(() => {
                      setInitialValues(_initialValues);
                    })
                    .catch((e) => console.log(e));
                }}
                onHandlerSearch={(value) => setFilterString(value)}
                onSave={() => saveFile(values, 'settings.json', 'text/json')}
                onUpload={(file: File) => {
                  if (file) {
                    const fileReader = new FileReader();
                    fileReader.onload = (event) => {
                      const result = event.target?.result;

                      if (typeof result === 'string') {
                        try {
                          const config = JSON.parse(result);
                          setInitialValues(config);
                          updateSettings(config)
                            .then(() => {})
                            .catch((e) => console.log(e));
                        } catch (e) {
                          alert('Incorrect file format!');
                        }
                      }
                    };
                    fileReader.readAsText(file);
                  }
                }}
                onWarning={() => setOnlyWarnings((v) => !v)}
              />

              <TestsForm />
              <ColorModal open={colorModal} onClose={closeColorModal} />
            </FilterProvider>
          );
        }}
      </Form>
      <ArrowUp />
      <Button className={classes.colorBtn} variant="contained" color="primary" onClick={openColorModal}>
        <PaletteIcon />
      </Button>
    </Container>
  );
};

export default MainForm;

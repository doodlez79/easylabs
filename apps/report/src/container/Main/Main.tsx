import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Box, Container, createMuiTheme, Typography } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Converter } from '@easy-labs-int/shared/dist/services/Converter';
import { Unit } from '@easy-labs-int/shared';

import { SearchBar } from 'components/SeacrhBar';
import { Header } from 'components/Header';
import { Categories } from 'components/Categories';
import { TestResults } from 'components/TestResults';
import { TypeContent } from 'constants/enums';
import { ModalProfile } from 'components/ModalProfile';
import { ProfileType } from 'components/Profile/Profile.types';
import { ResultsProvider } from 'helpers/ResultsContext';
import { parseIdByType } from 'helpers/parseIdByType';
import { getResultTest } from 'helpers/getResultTest';
import { getCurrentRangeByAge } from 'helpers/getCurrentRangeByAge';
import { getRangesFormConfig } from 'helpers/getRangesFormConfig';
import { ResultsConfig } from 'types/ResultsConfigType';
import { ProfileProvider } from 'helpers/ProfileContext';
import { initialProfile } from 'constants/constants';
import { getCurrentRangeBySex } from 'helpers/getCurrentRangeBySex';
import { searchData } from 'helpers/searchData';
import { ModalInformation } from 'components/ModalInformation';
import { ModalLink } from 'components/ModalLink';
import { ArrowUp } from 'components/ArrowUp';
import { getTestFormConfig } from 'helpers/getTestFromConfig';

import { MainProps } from './Main.types';
import { useStyles } from './styles';

const Main: FC<MainProps> = ({ config, setTheme, setEasyLabConfig }) => {
  const [CurrentContent, setCurrentContent] = useState(TypeContent.REPORT);
  const [searchValue, setSearchValue] = useState('');
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [openModalLink, setOpenModalLink] = useState(false);
  const [profile, setProfile] = useState<ProfileType>(initialProfile);
  const [testResultsDictionary, setTestResultsDictionary] = useState<{ [id: string]: { value: number; unit: string } }>(
    {}
  );
  const [testResultUpload, setTestResultUpload] = useState([]);
  const classes = useStyles();

  const handlerTestInput = (id: string, value: number, unit: string) => {
    setTestResultsDictionary((s) => ({
      ...s,
      [id]: {
        value,
        unit,
      },
    }));
  };

  useEffect(() => {
    const profileData = localStorage.getItem('Profile');
    if (profileData != null) {
      setProfile(JSON.parse(profileData));
    } else {
      setOpenModalProfile(true);
    }

    const urlPath = window.location.href;
    const url = new URL(urlPath);
    const ProfileFromUrl = url.searchParams.get('profile');
    const resultsFromUrl = url.searchParams.get('results');
    if (ProfileFromUrl != null) {
      setProfile(JSON.parse(ProfileFromUrl));
    }
    if (resultsFromUrl != null) {
      setCurrentContent(TypeContent.RESULT);
      setTestResultsDictionary(JSON.parse(window.atob(resultsFromUrl)));
    }
  }, []);

  const onChangeContent = useCallback((type) => {
    setCurrentContent(type);
  }, []);

  const onClickPrint = () => {
    onChangeContent(TypeContent.RESULT);
    setTimeout(() => window.print(), 5);
  };

  const handleOpenModalProfile = useCallback(() => {
    setOpenModalProfile(true);
  }, []);

  const handleOpenModalInformation = useCallback(() => {
    setOpenModalInfo(true);
  }, []);
  const handleOpenModalLink = useCallback(() => {
    setOpenModalLink(true);
  }, []);

  const handleCloseModalLink = useCallback(() => {
    setOpenModalLink(false);
  }, []);

  const handleCloseModalProfile = useCallback(() => {
    setOpenModalProfile(false);
  }, []);

  const handleCloseModalInformation = useCallback(() => {
    setOpenModalInfo(false);
  }, []);

  const handleChangeProfileFields = (prop: keyof ProfileType) => (value: string | number | boolean) => {
    setProfile({ ...profile, [prop]: value });
  };

  const uploadSettings = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const result = event.target?.result;

      if (typeof result === 'string') {
        try {
          const configResults = JSON.parse(result);
          setEasyLabConfig(configResults);
          if (configResults.color) {
            setTheme((t) =>
              createMuiTheme({
                ...t,
                palette: {
                  ...t.palette,
                  primary: {
                    main: configResults.color,
                  },
                },
              })
            );
          }
          localStorage.setItem('ReportConfig', JSON.stringify(configResults));
        } catch (e) {
          alert('Incorrect file format!');
        }
      }
    };
    fileReader.readAsText(file);
  };

  const onSaveProfile = () => {
    localStorage.setItem('Profile', JSON.stringify(profile));
    handleCloseModalProfile();
  };

  const onSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const saveFile = (data: { testResults: ResultsConfig[]; profile: ProfileType }, name: string, type: string) => {
    const file = new Blob([JSON.stringify(data)], { type });

    const a = document.createElement('a');

    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
  };

  const uploadFileResults = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const result = event.target?.result;

      if (typeof result === 'string') {
        try {
          const configResults = JSON.parse(result);

          setTestResultUpload(configResults.testResults);
          setProfile(configResults.profile);
          localStorage.setItem('Profile', JSON.stringify(configResults.profile));
        } catch (e) {
          alert('Incorrect file format!');
        }
      }
    };
    fileReader.readAsText(file);
  };

  const onClearSearchValue = () => {
    setSearchValue('');
  };

  const categories = searchData(config.categories, searchValue);

  console.log(categories, 'categories');

  const testResults = Object.entries(testResultsDictionary || {}).reduce((acc, [key, { value, unit }]) => {
    const { groupId, testId, categoryId } = parseIdByType(key);
    const { age, sex } = profile;
    const ranges = getRangesFormConfig(categoryId, groupId, testId, categories);
    const currentRangeByAge = getCurrentRangeByAge(ranges, age);

    const currentRangeBySex = getCurrentRangeBySex(currentRangeByAge, sex);

    const currentTest = getTestFormConfig(categoryId, groupId, testId, categories);

    const molarMass = currentTest ? currentTest?.molarMass : undefined;

    const defaultUnit = currentTest ? currentTest.defaultUnit : '';

    const result = currentTest ? Converter.convert({ unit: unit as Unit, value, molarMass }, defaultUnit as Unit) : 0;

    const resultTest = getResultTest(currentRangeBySex || {}, result);

    const currentRangeBySexBeSelectedUnit = currentRangeBySex
      ? currentRangeBySex.sets.map((item) => {
          return {
            ...item,
            max: item.max
              ? Converter.convert({ unit: defaultUnit as Unit, value: item.max, molarMass }, unit as Unit).toFixed(3)
              : item.max,
            min: item.min
              ? Converter.convert({ unit: defaultUnit as Unit, value: item.min, molarMass }, unit as Unit).toFixed(3)
              : item.min,
          };
        })
      : currentRangeBySex;

    acc.push({
      fullId: key,
      unit,
      defaultUnit,
      valueInDefaultUnit: result,
      groupId,
      testId,
      categoryId,
      value,
      currentRange: {
        ...currentRangeBySex,
        sets: currentRangeBySexBeSelectedUnit,
      },
      type: resultTest.type,
      fieldInfo: resultTest.description,
    } as ResultsConfig);

    return acc;
  }, [] as ResultsConfig[]);

  return (
    <ProfileProvider value={profile}>
      <ResultsProvider value={testResultUpload.length ? testResultUpload : testResults}>
        <Container maxWidth="lg" className={classes.container}>
          <Box position="sticky" top={0} zIndex={1299}>
            <Header
              logoPath={config.logo}
              onUploadSettings={uploadSettings}
              onClickInfo={handleOpenModalInformation}
              onClickLink={handleOpenModalLink}
              onClickPrint={onClickPrint}
              onClickProfile={handleOpenModalProfile}
              onClickSave={() => saveFile({ testResults, profile }, 'result.medical.json', 'text/json')}
              onClickUpload={uploadFileResults}
            />

            <SearchBar
              onSearchHandler={onSearchHandler}
              onChangeContent={onChangeContent}
              CurrentContent={CurrentContent}
              searchValue={searchValue}
              onClearSearchValue={onClearSearchValue}
            />
          </Box>

          <Box>
            <div
              style={{
                marginBottom: '10px',
              }}
              dangerouslySetInnerHTML={{
                __html: config.header,
              }}
            />
          </Box>
          {categories.length ? (
            <>
              {CurrentContent === TypeContent.REPORT ? (
                <Categories testResults={testResultsDictionary} data={categories} handlerTestInput={handlerTestInput} />
              ) : (
                <TestResults config={categories} />
              )}
            </>
          ) : (
            <Box
              mt={1}
              borderRadius={5}
              p={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              style={{
                background: 'rgb(244, 244, 244)',
              }}
            >
              <Box display="flex">
                <InfoOutlinedIcon />
                <Typography>
                  We couldn&apos;t find any blood tests for this criteria. Try changing your search...
                </Typography>
              </Box>
            </Box>
          )}

          <ModalProfile
            onSaveProfile={onSaveProfile}
            profileState={profile}
            onChangeProfile={handleChangeProfileFields}
            onClose={handleCloseModalProfile}
            open={openModalProfile}
          />
          <ModalInformation onClose={handleCloseModalInformation} open={openModalInfo} />
          <ModalLink onClose={handleCloseModalLink} open={openModalLink} />
        </Container>
        <ArrowUp />
      </ResultsProvider>
    </ProfileProvider>
  );
};

export default Main;

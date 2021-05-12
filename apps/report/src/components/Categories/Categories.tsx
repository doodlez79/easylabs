import React, { FC, useCallback, useState } from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';

import { TabPanel } from 'components/TabPanel';
import { CategoryHeader } from 'components/CategoryHeader';
import { Groups } from 'components/Groups';

import { CategoriesProps } from './Categories.types';
import { useStyles } from './styles';

const Categories: FC<CategoriesProps> = ({ data, handlerTestInput, testResults }) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const classes = useStyles();

  const handleTabChange = useCallback(
    (event: React.ChangeEvent<{}>, tab: number) => {
      setCurrentTab(tab);
    },
    [setCurrentTab]
  );

  return (
    <>
      <AppBar position="static" className={classes.headerTabs}>
        <Tabs
          variant="scrollable"
          value={currentTab}
          onChange={handleTabChange}
          aria-label="simple tabs example"
          className={classes.tabs}
        >
          {data.map(({ title, id }) => (
            <Tab className={classes.textTab} key={id} label={title} />
          ))}
        </Tabs>
      </AppBar>
      {data.map(({ title, icon, description, groups, id }, index) => {
        return (
          <TabPanel key={id} currentTab={currentTab} tabIndex={index}>
            <CategoryHeader testResults={testResults} title={title} icon={icon} description={description} />
            <Groups categoryId={id} groups={groups} handlerTestInput={handlerTestInput} />
          </TabPanel>
        );
      })}
    </>
  );
};

export default Categories;

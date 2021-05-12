import React, { FC, useState, useCallback } from 'react';
import { AppBar, Tabs, Tab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { TabPanel } from 'components/TabPanel';
import { CategoryInfo } from 'components/CategoryInfo';
import { getDefaultCategory } from 'containers/MainForm/MainForm.config';

import { CategoriesProps } from './Categories.types';

import { useStyles } from './styles';

const Categories: FC<CategoriesProps> = ({ fields }) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleTabChange = useCallback(
    (event: React.ChangeEvent<{}>, tab: number) => {
      setCurrentTab(tab);
    },
    [setCurrentTab]
  );

  const handleAddCategory = useCallback(() => {
    fields.push(getDefaultCategory());

    if (fields.length) {
      setCurrentTab(fields.length);
    }
  }, [fields, setCurrentTab]);

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
          {(fields.value || []).map(({ title, id }) => (
            <Tab key={id} label={title} />
          ))}
        </Tabs>
        <IconButton className={classes.addBtn} onClick={handleAddCategory}>
          <AddIcon />
        </IconButton>
      </AppBar>
      {fields.map((name, index) => {
        return (
          <TabPanel key={name} currentTab={currentTab} tabIndex={index}>
            <CategoryInfo
              fieldName={name}
              onDeleteCategory={() => {
                if (fields.length && index !== 0 && index === fields.length - 1) {
                  setCurrentTab(index - 1);
                }

                // eslint-disable-next-line no-restricted-globals
                const isDelete = confirm('Are you sure you want to delete this category?');

                if (isDelete) {
                  fields.remove(index);
                }
              }}
            />
          </TabPanel>
        );
      })}
    </>
  );
};

export default Categories;

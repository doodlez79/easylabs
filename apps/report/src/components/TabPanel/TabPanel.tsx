import React, { FC } from 'react';

import { TabPanelProps } from './TabPanel.types';

const TabPanel: FC<TabPanelProps> = ({ tabIndex, currentTab, children }) => {
  return (
    <div
      role="tabpanel"
      hidden={tabIndex !== currentTab}
      id={`tabpanel-${tabIndex}`}
      aria-labelledby={`tab-${tabIndex}`}
    >
      {currentTab === tabIndex && children}
    </div>
  );
};

export default TabPanel;

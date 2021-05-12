import React, { FC, useCallback } from 'react';

import { TestGroup } from 'components/TestGroup';
import { getDefaultGroup } from 'containers/MainForm/MainForm.config';

import { GroupsProps } from './Groups.types';

const Groups: FC<GroupsProps> = ({ fields }) => {
  const handleAddGroup = useCallback(() => {
    fields.push(getDefaultGroup());
  }, [fields]);

  return (
    <>
      {fields.map((name, index) => {
        return (
          <TestGroup
            key={name}
            fieldName={name}
            availableTestsCount={fields.value[index].tests.length}
            onNewGroup={handleAddGroup}
            onDelete={() => {
              // eslint-disable-next-line no-restricted-globals
              const isDelete = confirm('Are you sure you want to delete this group?');

              if (isDelete) {
                fields.remove(index);
              }
            }}
            disableDelete={fields.length === 1}
          />
        );
      })}
    </>
  );
};

export default Groups;

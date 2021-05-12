import React, { FC } from 'react';

import { Group } from 'components/Group';

import { GroupsProps } from './Groups.types';

const Groups: FC<GroupsProps> = ({ groups, handlerTestInput, categoryId }) => {
  return (
    <>
      {groups.map(({ id, title, tests }) => (
        <Group
          key={id}
          id={id}
          tests={tests}
          title={title}
          handlerTestInput={handlerTestInput}
          groupId={`${categoryId}###${id}`}
        />
      ))}
    </>
  );
};

export default Groups;

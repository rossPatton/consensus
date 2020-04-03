import _ from 'lodash';
import React, {memo} from 'react';

import {FilterPanel, Users} from '../../../../components';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <>
    <FilterPanel
      className="flex flex-col d:flex-row items-center mb-3 text-sm text-bold"
      onRoleFilterChange={props.section === 'members' && props.onRoleFilterChange}
      onSearchChange={props.onSearchChange}
      placeholder="Search for someone by username"
    />
    <Users
      removeUser={props.removeUser}
      users={props.users}
      sessionRole={props.role}
      setUserRole={props.setUserRole}
    />
  </>
));

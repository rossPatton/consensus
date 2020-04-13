import _ from 'lodash';
import React, {memo} from 'react';

import {FilterPanel, Users} from '../../../../components';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <div className='bg-white rounded p-2'>
    <FilterPanel
      onRoleFilterChange={props.section === 'members' && props.onRoleFilterChange}
      onSearchChange={props.onSearchChange}
      memberName={props.org.memberName}
      modName={props.org.modName}
      placeholder="Search for someone by username"
    />
    <Users
      memberName={props.org.memberName}
      modName={props.org.modName}
      removeUser={props.removeUser}
      users={props.users}
      sessionRole={props.role}
      setUserRole={props.setUserRole}
    />
  </div>
));

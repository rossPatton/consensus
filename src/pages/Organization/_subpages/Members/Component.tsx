import _ from 'lodash';
import React, {memo} from 'react';

import {FilterPanel, Users} from '../../../../components';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <>
    {console.log('all props for members list => ', props)}
    <FilterPanel
      onRoleFilterChange={props.section === 'members' && props.onRoleFilterChange}
      onSearchChange={props.onSearchChange}
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
  </>
));

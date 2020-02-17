import _ from 'lodash';
import React, {memo} from 'react';

import {FilterPanel, Users} from '../../../../components';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <>
    <FilterPanel
      className="fx aiCtr mB3 fs6 fw600"
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

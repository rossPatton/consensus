import _ from 'lodash';
import React, {memo} from 'react';

import {FilterPanel, Users} from '../../../../../components';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <>
    <h1 className="fs3">
      Manage Members
    </h1>
    <h2 className="fs4 mB3">
      {props.userTotal} members
    </h2>
    <FilterPanel
      onRoleFilterChange={props.onRoleFilterChange}
      onSearchChange={props.onSearchChange}
    />
    <Users
      removeUser={props.removeUser}
      sessionRole="admin"
      setUserRole={props.setUserRole}
      users={props.users}
    />
  </>
));

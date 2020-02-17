import _ from 'lodash';
import React, {memo} from 'react';

import {FilterPanel, Users} from '../../../../../components';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <>
    <h2>Manage Organization Members</h2>
    <h3 className="mB3">{props.userTotal} members</h3>
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

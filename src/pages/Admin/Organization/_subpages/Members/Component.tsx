import _ from 'lodash';
import React, {memo} from 'react';

import {FilterPanel, Users} from '../../../../../components';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <>
    <div className="fx aiCtr">
      <h1 className="fs3 mB2">
        {props.section === 'memberships'
          ? `Manage Membership (${props.userTotal} members)`
          : `${props.userTotal} Pending Approvals`}
      </h1>
    </div>
    <FilterPanel
      className="bgWhite br8 fs6 fw600 fx aiCtr mB3"
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

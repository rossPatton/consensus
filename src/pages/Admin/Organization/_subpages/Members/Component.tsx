import _ from 'lodash';
import React, {memo} from 'react';

import {FilterPanel, Users} from '../../../../../components';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <>
    <div className="bg-white br8 p-3 mb-3">
      <div className="flex flex-col d:flex-row items-center">
        <h1 className="fs3 mb-2">
          Pending Approvals
        </h1>
      </div>
      <Users
        count={1}
        memberName={(props.session.profile as tGroup).memberName}
        modName={(props.session.profile as tGroup).modName}
        removeUser={props.removeUser}
        sessionRole="admin"
        setUserRole={props.setUserRole}
        users={props.approvals}
      />
    </div>
    <div className="bg-white br8 p-3">
      <div className="flex flex-col d:flex-row items-center">
        <h2 className="fs3 mb-2">
          Manage Membership ({props.users.length} members)
        </h2>
      </div>
      <FilterPanel
        className="bg-white br8 text-sm text-bold flex items-center mb-3"
        memberName={(props.session.profile as tGroup).memberName}
        modName={(props.session.profile as tGroup).modName}
        onRoleFilterChange={props.onRoleFilterChange}
        onSearchChange={props.onSearchChange}
      />
      <Users
        memberName={(props.session.profile as tGroup).memberName}
        modName={(props.session.profile as tGroup).modName}
        removeUser={props.removeUser}
        sessionRole="admin"
        setUserRole={props.setUserRole}
        users={props.users}
      />
    </div>
  </>
));

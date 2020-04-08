import _ from 'lodash';
import React, {memo} from 'react';

import {FilterPanel, Users} from '../../../../../components';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <>
    <div className="bg-white rounded p-2 mb-2">
      <div className="flex flex-col d:flex-row items-center">
        <h1 className="text-3 mb-2">
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
    <div className="bg-white rounded p-2">
      <div className="flex flex-col d:flex-row items-center">
        <h2 className="text-3 mb-2">
          Manage Membership ({props.users.length} members)
        </h2>
      </div>
      <FilterPanel
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

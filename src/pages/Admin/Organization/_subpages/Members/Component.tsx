import _ from 'lodash';
import React, {memo} from 'react';

import {FilterPanel, Users} from '../../../../../components';
import {tComponentProps} from './_types';

export const MembersComponent = memo((props: tComponentProps) => (
  <>
    <div className="bgWhite br8 p3 mB3">
      <div className="fx aiCtr">
        <h1 className="fs3 mB2">
          Pending Approvals
        </h1>
      </div>
      <Users
        count={1}
        memberName={(props.session.profile as tOrg).memberName}
        modName={(props.session.profile as tOrg).modName}
        removeUser={props.removeUser}
        sessionRole="admin"
        setUserRole={props.setUserRole}
        users={props.approvals}
      />
    </div>
    <div className="bgWhite br8 p3">
      <div className="fx aiCtr">
        <h2 className="fs3 mB2">
          Manage Membership ({props.users.length} members)
        </h2>
      </div>
      <FilterPanel
        className="bgWhite br8 fs6 fw600 fx aiCtr mB3"
        memberName={(props.session.profile as tOrg).memberName}
        modName={(props.session.profile as tOrg).modName}
        onRoleFilterChange={props.onRoleFilterChange}
        onSearchChange={props.onSearchChange}
      />
      <Users
        memberName={(props.session.profile as tOrg).memberName}
        modName={(props.session.profile as tOrg).modName}
        removeUser={props.removeUser}
        sessionRole="admin"
        setUserRole={props.setUserRole}
        users={props.users}
      />
    </div>
  </>
));

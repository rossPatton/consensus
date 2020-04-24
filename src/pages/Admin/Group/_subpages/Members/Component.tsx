import _ from 'lodash';
import React, {memo} from 'react';

import {Users} from '~app/components';

export const MembersComponent = memo((props: {group: tGroup}) => (
  <>
    <div className="bg-white rounded p-2 mb-2">
      <div className="flex flex-col d:flex-row items-center">
        <h1 className="text-3 mb-2">
          Pending Approvals
        </h1>
      </div>
      <Users
        count={1}
        group={props.group}
        sessionRole="admin"
        type="pending"
      />
    </div>
    <div className="bg-white rounded p-2">
      <div className="flex flex-col d:flex-row items-center">
        <h2 className="text-3 mb-2">
          Manage Membership
        </h2>
      </div>
      <Users
        group={props.group}
        sessionRole="admin"
        type="members"
      />
    </div>
  </>
));

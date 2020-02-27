import _ from 'lodash';
import React, {memo} from 'react';

import {Paginate} from '../../containers';
import {tProps} from './_types';
import {UsersComponent} from './Component';

const Users = memo((props: tProps) => {
  const {sessionRole, users} = props;
  const isEditable = sessionRole === 'admin' || sessionRole === 'facilitator';

  if (users.length === 0) {
    return (
      <>No users found that meet this criteria.</>
    );
  }

  return (
    <Paginate
      count={10}
      items={users}
      render={(usersToRender: tUser[]) => (
        <UsersComponent
          removeUser={props.removeUser}
          isEditable={isEditable}
          sessionRole={sessionRole}
          setUserRole={props.setUserRole}
          users={usersToRender}
        />
      )}
    />
  );
});

export default Users;

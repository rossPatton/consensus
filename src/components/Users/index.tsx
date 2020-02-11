import _ from 'lodash';
import React, {PureComponent} from 'react';

import {Paginate} from '../../containers';
import {tProps} from './_types';
import {UsersComponent} from './Component';

class Users extends PureComponent<tProps> {
  render() {
    const {sessionRole, users} = this.props;
    const isEditable = sessionRole === 'admin' || sessionRole === 'facilitator';

    return (
      <Paginate
        count={4}
        items={users}
        render={(usersToRender: tUser[]) => (
          <UsersComponent
            removeUser={this.props.removeUser}
            isEditable={isEditable}
            sessionRole={sessionRole}
            setUserRole={this.props.setUserRole}
            users={usersToRender}
          />
        )}
      />
    );
  }
}

export default Users;

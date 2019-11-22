import _ from 'lodash';
import React, {Component} from 'react';

import {Paginate} from '../../containers';
import {tContainerProps} from './_types';
import {UsersComponent} from './Component';

// TODO completely decouple this container
// this should be where the redux gets connected, etc
class Users extends Component<tContainerProps> {
  render() {
    const {match, sessionRole, users} = this.props;
    const isEditable = sessionRole === 'admin' || sessionRole === 'facilitator';

    return (
      <Paginate
        items={users}
        page={match.params.page}
        render={(usersToRender: tUser[]) => (
          <UsersComponent
            deleteUserByOrg={this.props.deleteUserByOrg}
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

import React, {PureComponent} from 'react';

import {tProps} from './_types';
import {UserAdminComponent} from './Component';

export class UserAdminContainer extends PureComponent<tProps> {
  render() {
    return (
      <UserAdminComponent
        match={this.props.match}
        session={this.props.session}
      />
    );
  }
}
export const UserAdmin = UserAdminContainer;

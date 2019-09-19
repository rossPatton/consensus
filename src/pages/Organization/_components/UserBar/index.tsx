import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {getRoles, getUsersByOrg} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {UserBarComponent} from './Component';

export class UserBarContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    if (props.org.id !== 0) {
      props.getUsersByOrg({id: props.org.id as number});
    }

    if (props.roles.length === 0 && props.session.id !== 0) {
      props.getRoles({id: props.session.id});
    }
  }

  render() {
    const roleMap = this.props.roles.find(roleMap => {
      return roleMap.orgId === this.props.org.id;
    }) || {};

    return (
      <UserBarComponent
        org={this.props.org}
        match={this.props.match}
        role={roleMap.role}
        session={this.props.session}
        usersByOrg={this.props.usersByOrg}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  roles: store.roles.data,
  session: store.session.data,
  usersByOrg: store.usersByOrg.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getRoles: (query: tIdQuery) => dispatch(getRoles(query)),
  getUsersByOrg: (query: tIdQuery) => dispatch(getUsersByOrg(query)),
});

export const UserBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBarContainer);

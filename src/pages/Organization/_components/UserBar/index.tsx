import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {getRole, getUsersByOrg} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {UserBarComponent} from './Component';

export class UserBarContainer extends PureComponent<tContainerProps> {
  constructor(props: any) {
    super(props);
    const {id} = props.org;
    props.getUsersByOrg({id});
    props.getRole({id});
  }

  render() {
    return (
      <UserBarComponent
        org={this.props.org}
        match={this.props.match}
        role={this.props.role}
        session={this.props.session}
        usersByOrg={this.props.usersByOrg}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  role: store.role.data,
  session: store.session.data,
  usersByOrg: store.usersByOrg.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getUsersByOrg: (query: tIdQuery) => dispatch(getUsersByOrg(query)),
  getRole: (params: any) => dispatch(getRole(params)),
});

export const UserBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBarContainer);

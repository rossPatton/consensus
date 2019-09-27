import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {getRoles, getUsersByOrg} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {UserBarComponent} from './Component';

export class UserBarContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    if (props.session.isAuthenticated && props.org.id !== 0) {
      props.getUsersByOrg({id: props.org.id as number});
    }
  }

  render() {
    // if user not logged in, dont prompt membership or display group stats
    // if (!this.props.session.isAuthenticated) return null;

    return (
      <UserBarComponent
        match={this.props.match}
        org={this.props.org}
        role={this.props.role}
        session={this.props.session}
        usersByOrg={this.props.usersByOrg}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.usersByOrg.isLoading,
  usersByOrg: store.usersByOrg.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getUsersByOrg: (query: tIdQuery) => dispatch(getUsersByOrg(query)),
});

export const UserBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBarContainer);

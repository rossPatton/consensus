import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {getUsersByOrg} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {UserBarComponent} from './Component';

class UserBarContainer extends PureComponent<tContainerProps> {
  componentDidMount() {
    const {org, session} = this.props;
    if (session.isAuthenticated && org.id !== 0) {
      this.props.getUsersByOrg({id: org.id as number});
    }
  }

  render() {
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

const UserBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserBarContainer);

export default UserBar;

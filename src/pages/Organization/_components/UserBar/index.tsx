import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {getUsersByOrgId} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {UserBarComponent} from './Component';

class UserBarContainer extends PureComponent<tContainerProps> {
  componentDidMount() {
    if (!__CLIENT__) return;
    const {org, session} = this.props;
    if (session.isAuthenticated && org.id !== 0) {
      this.props.getUsersByOrgIdDispatch({orgId: org.id});
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

const mapDispatchToProps = (dispatch: Function) => ({
  getUsersByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    dispatch(getUsersByOrgId(query)),
});

const UserBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserBarContainer);

export default UserBar;

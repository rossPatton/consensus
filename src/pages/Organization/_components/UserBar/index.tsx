import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {getUsersByOrgId} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {UserBarComponent} from './Component';

class UserBarContainer extends PureComponent<tContainerProps> {
  componentDidMount() {
    const {org, role} = this.props;
    if (role && (role !== 'n/a' && role !== 'pending')) {
      this.props.getUsersByOrgIdDispatch({orgId: org.id});
    }
  }

  render() {
    const {usersByOrg} = this.props;

    const members = usersByOrg.filter(u => u.role !== 'pending');
    const pending = usersByOrg.filter(u => u.role === 'pending');

    return (
      <UserBarComponent
        match={this.props.match}
        members={members}
        org={this.props.org}
        pending={pending}
        role={this.props.role}
        session={this.props.session}
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

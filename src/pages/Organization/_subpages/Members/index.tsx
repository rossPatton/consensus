import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ErrorBoundary, RoleFilter, SearchFilter} from '../../../../containers';
import {
  deleteUserByOrgId,
  getUsersByOrgId,
  patchUserByOrgId,
} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {MembersComponent} from './Component';

class MembersContainer extends Component<tContainerProps, {role: tRole}> {
  state = {
    role: 'n/a' as tRole,
  };

  componentDidMount() {
    this.props.getUsersByOrgIdDispatch({
      orgId: this.props.session.profile.id,
    });
  }

  removeUser = (ev: React.MouseEvent<HTMLButtonElement>, userId: number) => {
    ev.preventDefault();
    const {deleteUserByOrgIdDispatch, session} = this.props;
    deleteUserByOrgIdDispatch({
      userId,
      orgId: session.profile.id,
    });
  }

  setUserRole = (ev: React.ChangeEvent<HTMLSelectElement>, userId: number) => {
    ev.preventDefault();
    const role = ev.currentTarget.value as tRole;
    const orgId = this.props.session.profile.id;
    this.props.patchUserByOrgIdDispatch({role, orgId, userId});
  }

  render() {
    const {usersByOrg} = this.props;

    return (
      <ErrorBoundary status={_.get(usersByOrg, 'session.error.status', 200)}>
        <RoleFilter
          items={usersByOrg}
          render={(roleProps: tRoleFilterProps) => (
            <SearchFilter
              searchKey="username"
              items={roleProps.items}
              render={(searchProps: tSearchFilterProps) => (
                <MembersComponent
                  {...roleProps}
                  {...searchProps}
                  match={this.props.match}
                  org={this.props.org}
                  removeUser={this.removeUser}
                  role={this.props.role}
                  setUserRole={this.setUserRole}
                  users={searchProps.items}
                  userTotal={usersByOrg.length}
                />
              )}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.usersByOrg.isLoading,
  usersByOrg: store.usersByOrg.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  deleteUserByOrgIdDispatch: (query: tDeleteUserByOrgIdQuery) =>
    dispatch(deleteUserByOrgId(query)),
  getUsersByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    dispatch(getUsersByOrgId(query)),
  patchUserByOrgIdDispatch: (query: tPatchUserRoleQuery) =>
    dispatch(patchUserByOrgId(query)),
});

const Members = connect(mapStateToProps, mapDispatchToProps)(MembersContainer);
export default Members;

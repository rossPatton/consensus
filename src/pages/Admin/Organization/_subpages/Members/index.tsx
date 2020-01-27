import React, {Component} from 'react';
import {connect} from 'react-redux';

import {RoleFilter, SearchFilter} from '../../../../../containers';
import {
  deleteUserByOrgId,
  getUsersByOrgId,
  patchUserByOrgId,
} from '../../../../../redux';
import {tContainerProps, tState, tStore} from './_types';
import {MembersComponent} from './Component';

class MembersContainer extends Component<tContainerProps, tState> {
  state = {
    role: 'n/a' as tRole,
  };

  constructor (props: tContainerProps) {
    super(props);
    const {id: orgId} = props.session.profile;
    props.getUsersByOrgIdDispatch({
      orgId,
    });
  }

  removeUser = (ev: React.MouseEvent<HTMLButtonElement>, userId: number) => {
    ev.preventDefault();
    this.props.deleteUserByOrgIdDispatch({
      userId,
      orgId: this.props.session.profile.id,
    });
  }

  setUserRole = (ev: React.ChangeEvent<HTMLSelectElement>, userId: number) => {
    ev.preventDefault();
    const role = ev.currentTarget.value as tRole;
    const orgId = this.props.session.profile.id;
    this.props.patchUserByOrgIdDispatch({role, orgId, userId});
  }

  render() {
    return (
      <RoleFilter
        items={this.props.usersByOrg}
        render={(roleProps: tRoleFilterProps) => (
          <SearchFilter
            searchKey="username"
            items={roleProps.items}
            render={(searchProps: tSearchFilterProps) => (
              <MembersComponent
                {...roleProps}
                {...searchProps}
                removeUser={this.removeUser}
                match={this.props.match}
                setUserRole={this.setUserRole}
                users={searchProps.items}
                userTotal={this.props.usersByOrg.length}
              />
            )}
          />
        )}
      />
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

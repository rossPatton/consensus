import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';

import {GenericLoader, Paginate, RoleFilter, SearchFilter} from '~app/containers';
import {MediaContext} from '~app/context/MatchMediaProvider/_context';
import {deleteUserByGroupId, getUsersByGroupId, patchUserByGroupId} from '~app/redux';

import {tContainerProps, tState} from './_types';
import {UsersComponent} from './Component';

class UsersContainer extends React.PureComponent<tContainerProps, tState> {
  static contextType = MediaContext;

  state = {
    showMobileControls: null as number | null,
  };

  constructor (props: tContainerProps) {
    super(props);
    const groupId = props.group.id;

    if (groupId) {
      props.getUsersByGroupIdDispatch({groupId, noPending: 'false'});
    }
  }

  removeUser = (ev: React.MouseEvent<HTMLButtonElement>, userId: number) => {
    ev.preventDefault();
    const {deleteUserByGroupIdDispatch, group} = this.props;
    deleteUserByGroupIdDispatch({
      userId,
      groupId: group.id,
    });
  }

  setUserRole = (ev: React.ChangeEvent<HTMLSelectElement>, userId: number) => {
    ev.preventDefault();
    const role = ev.currentTarget.value as tRole;
    const groupId = this.props.group.id;
    if (groupId && userId && role) {
      this.props.patchUserByGroupIdDispatch({role, groupId, userId});
    }

    this.setState({
      showMobileControls: null,
    });
  }

  toggleMobileControls = (index: number) => {
    let showMobileControls = index;
    if (index === this.state.showMobileControls) {
      showMobileControls = null;
    }

    this.setState({
      showMobileControls,
    });
  }

  render() {
    const {count = 10, isLoading, sessionRole, type, usersByGroupId} = this.props;
    const isEditable = sessionRole === 'admin' || sessionRole === 'facilitator';

    let itemsToRender = usersByGroupId.filter(u => u.role !== 'pending');
    if (type === 'pending') {
      const approvals: tUser[] = usersByGroupId.filter(u => u.role === 'pending');
      itemsToRender = approvals;
    }

    if (itemsToRender.length === 0) {
      return (
        <>No users found that meet this criteria.</>
      );
    }

    return (
      <GenericLoader
        isLoading={isLoading}
        render={() => (
          <RoleFilter
            items={itemsToRender}
            render={roleProps => (
              <SearchFilter
                searchKey="username"
                items={roleProps.items}
                render={searchProps => (
                  <Paginate
                    count={count}
                    items={searchProps.items}
                    render={(usersToRender: tUser[]) => (
                      <UsersComponent
                        // mobile/desktop props
                        {...this.context}
                        // passed in props
                        {...this.props}
                        isEditable={isEditable}
                        onRoleFilterChange={roleProps.onRoleFilterChange}
                        onSearchChange={searchProps.onSearchChange}
                        removeUser={this.removeUser}
                        setUserRole={this.setUserRole}
                        showMobileControls={this.state.showMobileControls}
                        toggleMobileControls={this.toggleMobileControls}
                        users={usersToRender}
                      />
                    )}
                  />
                )}
              />
            )}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: any) => ({
  isLoading: store.usersByGroupId.isLoading,
  usersByGroupId: store.usersByGroupId.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getUsersByGroupIdDispatch: (query: tUsersByGroupIdQuery) =>
    dispatch(getUsersByGroupId(query)),

  deleteUserByGroupIdDispatch: (query: tDeleteUserByGroupIdQuery) =>
    dispatch(deleteUserByGroupId(query)),

  patchUserByGroupIdDispatch: (query: tPatchUserRoleQuery) =>
    dispatch(patchUserByGroupId(query)),
});

const Users = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
export default Users;

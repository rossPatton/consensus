import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';

import {GenericLoader, Paginate, RoleFilter, SearchFilter} from '~app/containers';
import {
  checkSuccess,
  deleteUserByGroupId,
  getUsersByGroupId,
  patchUserByGroupId,
} from '~app/redux';

import {tContainerProps, tState, tStore} from './_types';
import {UsersComponent} from './Component';

class UsersContainer extends React.PureComponent<tContainerProps, tState> {
  static defaultProps = {
    className: '',
  };

  state = {
    allSelected: false,
    showMobileControls: null as number | null,
  };

  constructor (props: tContainerProps) {
    super(props);
    const groupId = props.group.id;
    props.getUsersByGroupIdDispatch({groupId, noPending: 'false'});
  }

  toggleAll = (users: ts.user[]) => {
    const selected = !this.state.allSelected;
    let checked = {...this.props.checked};
    if (selected) {
      for (const user of users) {
        checked[user.id] = selected;
      }
    } else {
      checked = {};
    }

    this.props.dispatch(checkSuccess(checked));
    this.setState({
      allSelected: selected,
    });
  }

  toggleCheck = (userId: number) => {
    const isChecked = !this.props.checked[userId];

    let checked = {...this.props.checked};
    if (isChecked) {
      checked = {
        ...this.props.checked,
        [userId]: !this.props.checked[userId],
      };
    } else {
      delete checked[userId];
    }

    this.props.dispatch(checkSuccess(checked));
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
    const role = ev.currentTarget.value as ts.role;
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
    const {
      count = 10,
      sessionRole,
      type,
      usersByGroupIdThunk,
    } = this.props;

    const isAdmin = sessionRole === 'admin' || sessionRole === 'facilitator';
    const isEditable = isAdmin && this.props.isEditable;
    const isSelectable = isAdmin && this.props.isSelectable;

    const {data: allUsers, isLoading} = usersByGroupIdThunk;
    let itemsToRender = allUsers.filter(u => u.role !== 'pending');
    if (type === 'pending') {
      const approvals: ts.user[] = allUsers.filter(u => u.role === 'pending');
      itemsToRender = approvals;
    }

    if (itemsToRender.length === 0) {
      return (
        <>
          {type === 'pending' && 'No users pending approval.'}
          {type !== 'pending' && 'No users found that meet this criteria.'}
        </>
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
                    render={(usersToRender: ts.user[]) => (
                      <UsersComponent
                        // passed in props
                        {...this.props}
                        {...this.state}
                        isEditable={isEditable}
                        isSelectable={isSelectable}
                        onRoleFilterChange={roleProps.onRoleFilterChange}
                        onSearchChange={searchProps.onSearchChange}
                        removeUser={this.removeUser}
                        setUserRole={this.setUserRole}
                        toggleAll={this.toggleAll}
                        toggleCheck={this.toggleCheck}
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

const mapStateToProps = (store: tStore) => ({
  checked: store.checked,
  usersByGroupIdThunk: store.usersByGroupId,
});

const mapDispatchToProps = (dispatch: Function) => ({
  dispatch,
  getUsersByGroupIdDispatch: (query: ts.usersByGroupIdQuery) =>
    dispatch(getUsersByGroupId(query)),

  deleteUserByGroupIdDispatch: (query: ts.deleteUserByGroupIdQuery) =>
    dispatch(deleteUserByGroupId(query)),

  patchUserByGroupIdDispatch: (query: ts.patchUserRoleQuery) =>
    dispatch(patchUserByGroupId(query)),
});

const Users = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
export default Users;

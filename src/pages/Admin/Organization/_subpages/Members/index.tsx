import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate} from '../../../../../containers';
import {deleteUserByOrg, getUsersByOrg, patchUserByOrg} from '../../../../../redux';
import {fuzzFilterList} from '../../../../../utils';
import {tProps, tState} from './_types';
import {MembersComponent} from './Component';

class MembersContainer extends Component<tProps, tState> {
  static defaultProps = {
    usersByOrg: {
      users: [],
      userTotal: 0,
    },
  };

  constructor(props: any) {
    super(props);
    props.getUsersByOrg({id: this.props.session.profile.id});
  }

  state = {
    role: 'n/a' as tRole,
    users: this.props.usersByOrg.users,
  };

  deleteUserByOrg = (ev: React.MouseEvent<HTMLButtonElement>, userId: number) => {
    ev.preventDefault();
    this.props.deleteUserByOrg({userId, orgId: this.props.session.profile.id});
  }

  // re-run the filter whenever the list array or filter text changes:
  // TODO maybe memoize
  filterByRole = (users: tUser[]) => {
    if (this.state.role === 'n/a') return users;
    return users.filter(user => user.role === this.state.role);
  };

  onFilterChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      role: ev.currentTarget.value as tRole,
    });
  }

  onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const filteredList = fuzzFilterList({
      input: this.props.usersByOrg.users || [],
      key: 'username',
      search: ev.currentTarget.value,
    });

    this.setState({
      users: filteredList,
    });
  }

  setRole = (ev: React.ChangeEvent<HTMLSelectElement>, userId: number) => {
    ev.preventDefault();
    const role = ev.currentTarget.value as tRole;
    const orgId = this.props.session.profile.id;
    this.props.updateRole({role, orgId, userId});
  }

  render() {
    const usersToRender = this.filterByRole(
      this.state.users.length > 0
        ? this.state.users
        : this.props.usersByOrg.users
    );

    return (
      <Paginate
        items={usersToRender}
        match={this.props.match}
        render={(itemsToRender: tUser[]) => (
          <MembersComponent
            deleteUserByOrg={this.deleteUserByOrg}
            onFilterChange={this.onFilterChange}
            onSearchChange={this.onSearchChange}
            setRole={this.setRole}
            users={itemsToRender}
            userTotal={this.props.usersByOrg.userTotal}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: any) => ({
  usersByOrg: store.usersByOrg.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  deleteUserByOrg: (query: {orgId: number, userId: number}) =>
    dispatch(deleteUserByOrg(query)),
  getUsersByOrg: (query: tIdQuery) => dispatch(getUsersByOrg(query)),
  updateRole: (query: any) => dispatch(patchUserByOrg(query)),
});

export const Members = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersContainer);

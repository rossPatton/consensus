import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate, Search} from '../../../../../containers';
import {deleteUserByOrg, getUsersByOrg, patchUserByOrg} from '../../../../../redux';
import {tContainerProps, tState, tStore} from './_types';
import {MembersComponent} from './Component';

class MembersContainer extends Component<tContainerProps, tState> {
  state = {
    role: 'n/a' as tRole,
  };

  componentDidMount() {
    this.props.getUsersByOrg({id: this.props.session.profile.id});
  }

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

  setRole = (ev: React.ChangeEvent<HTMLSelectElement>, userId: number) => {
    ev.preventDefault();
    const role = ev.currentTarget.value as tRole;
    const orgId = this.props.session.profile.id;
    this.props.updateRole({role, orgId, userId});
  }

  render() {
    const usersToRender = this.filterByRole(this.props.usersByOrg.users);

    return (
      <Search
        searchKey="username"
        items={usersToRender}
        render={(searchProps: any) => (
          <Paginate
            items={searchProps.items}
            page={this.props.match.params.page}
            render={(itemsToRender: tUser[]) => (
              <MembersComponent
                deleteUserByOrg={this.deleteUserByOrg}
                onFilterChange={this.onFilterChange}
                onSearchChange={searchProps.onSearchChange}
                setRole={this.setRole}
                users={itemsToRender}
                userTotal={this.props.usersByOrg.userTotal}
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

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  deleteUserByOrg: (query: {orgId: number, userId: number}) =>
    dispatch(deleteUserByOrg(query)),
  getUsersByOrg: (query: tIdQuery) => dispatch(getUsersByOrg(query)),
  updateRole: (query: any) => dispatch(patchUserByOrg(query)),
});

const Members = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MembersContainer);

export default Members;

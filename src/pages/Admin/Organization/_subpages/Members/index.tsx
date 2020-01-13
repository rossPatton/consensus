import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RoleFilter, SearchFilter} from '../../../../../containers';
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

  setUserRole = (ev: React.ChangeEvent<HTMLSelectElement>, userId: number) => {
    ev.preventDefault();
    const role = ev.currentTarget.value as tRole;
    const orgId = this.props.session.profile.id;
    this.props.updateRole({role, orgId, userId});
  }

  render() {
    return (
      <RoleFilter
        items={this.props.usersByOrg.users}
        render={(roleProps: any) => (
          <SearchFilter
            searchKey="username"
            items={roleProps.items}
            render={(searchProps: any) => (
              <MembersComponent
                {...roleProps}
                {...searchProps}
                deleteUserByOrg={this.deleteUserByOrg}
                match={this.props.match}
                setUserRole={this.setUserRole}
                users={searchProps.items}
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

const Members = connect(mapStateToProps, mapDispatchToProps)(MembersContainer);
export default Members;

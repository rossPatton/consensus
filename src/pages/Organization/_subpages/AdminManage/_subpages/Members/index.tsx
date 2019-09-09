import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate} from '../../../../../../containers';
import {deleteUserByOrg} from '../../../../../../redux';
import {fuzzFilterList} from '../../../../../../utils';
import {tProps, tState} from './_types';
import {MembersComponent} from './Component';

class MembersContainer extends Component<tProps, tState> {
  static defaultProps = {
    usersByOrg: {
      users: [],
      userTotal: 0,
    },
  };

  state = {
    users: this.props.usersByOrg.users,
  };

  deleteUserByOrg = (ev: React.MouseEvent<HTMLButtonElement>, userId: number) => {
    ev.preventDefault();
    this.props.deleteUserByOrg({userId, orgId: this.props.org.id});
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

  render() {
    const usersToRender = this.state.users.length > 0
      ? this.state.users
      : this.props.usersByOrg.users;

    return (
      <Paginate
        items={usersToRender}
        match={this.props.match}
        render={(itemsToRender: tUser[]) => (
          <MembersComponent
            deleteUserByOrg={this.deleteUserByOrg}
            onSearchChange={this.onSearchChange}
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
});

export const Members = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersContainer);
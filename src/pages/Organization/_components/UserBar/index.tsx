import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GenericLoader} from '../../../../components';
import {getRole, getUsersByOrg} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {UserBarComponent} from './Component';

export class UserBarContainer extends PureComponent<tContainerProps> {
  constructor(props: any) {
    super(props);
    const {id} = props.org;
    props.getUsersByOrg({id});
    props.getRole({id});
  }

  render() {
    return (
      <GenericLoader
        isLoading={this.props.isLoading}
        render={() => (
          <UserBarComponent
            org={this.props.org}
            match={this.props.match}
            role={this.props.role}
            session={this.props.session}
            usersByOrg={this.props.usersByOrg}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.role.isLoading,
  role: store.role.data,
  session: store.session.data,
  usersByOrg: store.usersByOrg.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getUsersByOrg: (query: tIdQuery) => dispatch(getUsersByOrg(query)),
  getRole: (params: any) => dispatch(getRole(params)),
});

export const UserBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBarContainer);

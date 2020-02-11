import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader} from '../../../containers';
import {getRoles, getRsvps} from '../../../redux';
import {tContainerProps, tStore} from './_types';
import {UserAdminComponent} from './Component';

class UserAdminContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    if (!props.session.isAuthenticated) return;
    if (!props.rolesThunk.fetched) props.getRolesDispatch();
    if (!props.rsvpsThunk.fetched) props.getRsvpsDispatch();
  }

  render() {
    return (
      <GenericLoader
        isLoading={this.props.isLoading}
        render={() => (
          <UserAdminComponent
            match={this.props.match}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.roles.isLoading || store.rsvps.isLoading,
  rolesThunk: store.roles,
  rsvpsThunk: store.rsvps,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getRolesDispatch: () => dispatch(getRoles()),
  getRsvpsDispatch: () => dispatch(getRsvps()),
});

export const UserAdmin = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAdminContainer);

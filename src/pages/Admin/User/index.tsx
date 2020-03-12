import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader} from '../../../containers';
import {getOrgsByUserId, getRoles, getRsvps, logout} from '../../../redux';
import {tContainerProps, tStore} from './_types';
import {UserAdminComponent} from './Component';

class UserAdminContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    if (!props.session.isAuthenticated) return;
    if (!props.rolesThunk.fetched) props.getRolesDispatch();
    if (!props.rsvpsThunk.fetched) props.getRsvpsDispatch();

    const userId = _.get(props, 'session.profile.id', null);
    if (userId) {
      props.getOrgsByUserIdDispatch({userId})
        .catch(loglevel.error);
    }
  }

  render() {
    return (
      <GenericLoader
        isLoading={this.props.isLoading}
        render={() => (
          <UserAdminComponent
            match={this.props.match}
            orgsByUserIdThunk={this.props.orgsByUserIdThunk}
            roles={this.props.rolesThunk.data}
            session={this.props.session}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.roles.isLoading || store.rsvps.isLoading,
  orgsByUserIdThunk: store.orgsByUserId,
  rolesThunk: store.roles,
  rsvpsThunk: store.rsvps,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getOrgsByUserIdDispatch: (query: tOrgsByUserIdQuery) =>
    dispatch(getOrgsByUserId(query)),
  getRolesDispatch: () => dispatch(getRoles()),
  getRsvpsDispatch: () => dispatch(getRsvps()),
  logoutDispatch: () => dispatch(logout()),
});

export const UserAdmin = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAdminContainer);

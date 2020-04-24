import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader} from '~app/containers';
import {MediaContext} from '~app/context/MatchMediaProvider/_context';
import {getGroupsByUserId, getRoles, getRsvps, logout} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {UserAdminComponent} from './Component';

class UserAdminContainer extends PureComponent<tContainerProps> {
  static contextType = MediaContext;

  constructor(props: tContainerProps) {
    super(props);
    if (!props.session.isAuthenticated) return;
    if (!props.rolesThunk.fetched) props.getRolesDispatch();
    if (!props.rsvpsThunk.fetched) props.getRsvpsDispatch();

    const userId = _.get(props, 'session.profile.id', null);
    if (userId) {
      props.getGroupsByUserIdDispatch({userId})
        .catch(loglevel.error);
    }
  }

  render() {
    return (
      <GenericLoader
        isLoading={this.props.isLoading}
        render={() => (
          <UserAdminComponent
            history={this.props.history}
            isDesktop={this.context.isDesktop}
            isMobile={this.context.isMobile}
            match={this.props.match}
            groupsByUserIdThunk={this.props.groupsByUserIdThunk}
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
  groupsByUserIdThunk: store.groupsByUserId,
  rolesThunk: store.roles,
  rsvpsThunk: store.rsvps,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getGroupsByUserIdDispatch: (query: tGroupsByUserIdQuery) =>
    dispatch(getGroupsByUserId(query)),
  getRolesDispatch: () => dispatch(getRoles()),
  getRsvpsDispatch: () => dispatch(getRsvps()),
  logoutDispatch: () => dispatch(logout()),
});

export const UserAdmin = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAdminContainer);

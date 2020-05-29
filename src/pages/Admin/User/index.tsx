import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader} from '~app/containers';
import {getGroupsByUserId, logout} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {UserAdminComponent} from './Component';

class UserAdminContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const user = props?.session?.profile;
    const userId = user?.profile?.id;
    if (userId) {
      props.getGroupsByUserIdDispatch({userId})
        .catch(loglevel.error);
    }

    // if (user.cityId) {
    //   props.getMeetingsDispatch({city: user.cityId})
    //     .catch(loglevel.error);
    // }
  }

  render() {
    return (
      <GenericLoader
        isLoading={this.props.isLoading}
        render={() => (
          <UserAdminComponent
            history={this.props.history}
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
  getGroupsByUserIdDispatch: (query: ts.groupsByUserIdQuery) =>
    dispatch(getGroupsByUserId(query)),
  logoutDispatch: () => dispatch(logout()),
});

export const UserAdmin = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAdminContainer);

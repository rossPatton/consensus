import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader} from '../../../components';
import {getRoles, getRsvps} from '../../../redux';
import {tContainerProps, tStore} from './_types';
import {UserAdminComponent} from './Component';

class UserAdminContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getRolesDispatch();
    props.getRsvpsDispatch();
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
});

const mapDispatchToProps = (dispatch: Function) => ({
  getRolesDispatch: () => dispatch(getRoles()),
  getRsvpsDispatch: () => dispatch(getRsvps()),
});

export const UserAdmin = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAdminContainer);

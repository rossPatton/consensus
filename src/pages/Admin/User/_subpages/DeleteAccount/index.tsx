import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {deleteUser, logout} from '~app/redux';

import {tContainerProps} from './_types';
import {DeleteAccountComponent} from './Component';

class DeleteAccountContainer extends PureComponent<tContainerProps> {
  state = {
    error: '',
  };

  deleteUser = async () => {
    try {
      await this.props
        .deleteUserDispatch({id: this.props.sessionThunk.data.id});
    } catch (error) {
      return this.setState({
        error: error.message,
      });
    }
  }

  render() {
    return (
      <DeleteAccountComponent
        deleteUser={this.deleteUser}
        error={this.state.error}
      />
    );
  }
}

const mapStateToProps = (store: {session: ts.thunk<ts.session>}) => ({
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  deleteUserDispatch: (query: ts.idQuery) => dispatch(deleteUser(query)),
  logoutDispatch: () => dispatch(logout()),
});

const DeleteAccount = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteAccountContainer);

export default DeleteAccount;

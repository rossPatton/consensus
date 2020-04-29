import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {deleteAccount, logout} from '~app/redux';

import {tContainerProps, tState, tStateUnion} from './_types';
import {DeleteAccountComponent} from './Component';

class DeleteAccountContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    this.state = {
      hasMounted: false,
      currentPassword: '',
    };
  }

  componentDidMount() {
    this.setState({
      hasMounted: true,
    });
  }

  deleteAccount = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {currentPassword} = this.state;
    this.props
      .deleteAccountDispatch({currentPassword})
      .then(this.props.logoutDispatch)
      .catch(loglevel.error);
    // this.props.logoutDispatch()
    //   .then(() => this.props.deleteAccountDispatch({login, currentPassword}))
    //   .catch(loglevel.error);
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    return (
      <DeleteAccountComponent
        {...this.state}
        deleteAccount={this.deleteAccount}
        updateState={this.updateState}
      />
    );
  }
}

const mapStateToProps = (store: {session: ts.thunk<ts.session>}) => ({
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  deleteAccountDispatch: (query: ts.accountQuery) => dispatch(deleteAccount(query)),
  logoutDispatch: () => dispatch(logout()),
});

const DeleteAccount = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteAccountContainer);

export default DeleteAccount;

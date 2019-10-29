import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {authenticateSession, patchAccount} from '../../../../../redux';
import {tContainerProps, tState, tStateUnion} from './_types';
import {AccountComponent} from './Component';

class AccountContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    this.state = {
      login: props.session.login,
      newPassword: '',
      password: '',
    };
  }

  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {id} = this.props.session;

    let newAccount;
    try {
      newAccount = await this.props.patchAccount({id, ...this.state});
    } catch (err) {
      return loglevel.error(err);
    }

    // TODO trigger error boundary or something
    if (!newAccount.payload) return;

    const {login, newPassword, password} = this.state;
    try {
      await this.props.authenticateSession({
        username: login,
        password: newPassword || password,
      });
    } catch (err) {
      loglevel.error(err);
    }

    this.setState({password: ''});
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    return (
      <AccountComponent
        {...this.state}
        session={this.props.session}
        save={this.save}
        updateState={this.updateState}
      />
    );
  }
}

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  authenticateSession: (login: tLogin) => dispatch(authenticateSession(login)),
  patchAccount: (account: {id: number} & tState) => dispatch(patchAccount(account)),
});

const Account = connect(
  null,
  mapDispatchToProps
)(AccountContainer);

export default Account;

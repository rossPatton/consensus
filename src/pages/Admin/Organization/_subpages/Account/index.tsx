import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {login, patchAccount} from '../../../../../redux';
import {tContainerProps, tState, tStateUnion} from './_types';
import {AccountComponent} from './Component';

class AccountContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    this.state = {
      isVerified: props.session.isVerified,
      login: props.session.login,
      newPassword: '',
      password: '',
    };
  }

  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {id} = this.props.session;

    let newAccount: tActionReturn<tAccount>;
    try {
      newAccount = await this.props.patchAccount({id, ...this.state});
    } catch (err) {
      return loglevel.error(err);
    }

    // TODO trigger error boundary or something
    if (!newAccount.payload) return;

    const {login, newPassword, password} = this.state;
    try {
      await this.props.login({
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

const mapDispatchToProps = (dispatch: Function) => ({
  login: (query: tLogin) => dispatch(login(query)),
  patchAccount: (query: tAccount) => dispatch(patchAccount(query)),
});

const Account = connect(
  null,
  mapDispatchToProps,
)(AccountContainer);

export default Account;

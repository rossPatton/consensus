import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {login, patchAccount} from '~app/redux';

import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
import {AccountComponent} from './Component';

class AccountContainer extends PureComponent<tContainerProps, tState> {
  state = {
    currentPassword: '',
    email: '',
    isVerified: !!this.props?.sessionThunk?.data?.isVerified,
    login: '',
    newPassword: '',
    privateEmail: !!this.props?.sessionThunk?.data?.privateEmail,
  };

  save = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {loginDispatch, patchAccountDispatch, sessionThunk} = this.props;
    const {isVerified, ...patchAccountQuery} = this.state;

    try {
      await patchAccountDispatch(patchAccountQuery);
    } catch (err) {
      return loglevel.error(err);
    }

    try {
      const {login: currentLogin} = sessionThunk.data;
      const {login, newPassword, currentPassword} = this.state;
      await loginDispatch({
        username: login || currentLogin,
        password: newPassword || currentPassword,
      });
    } catch (err) {
      loglevel.error(err);
    }

    this.props.history.push('/admin/account');
  }

  updateState = (stateKey: tKeyUnion, value: string | boolean) => {
    if (!stateKey) return;
    this.setState({
      [stateKey]: value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    const {match, sessionThunk} = this.props;
    const {subsection} = match?.params;

    return (
      <AccountComponent
        {...this.state}
        save={this.save}
        session={sessionThunk.data}
        subsection={subsection}
        updateState={this.updateState}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: ts.loginQuery) => dispatch(login(query)),
  patchAccountDispatch: (query: ts.accountQuery) => dispatch(patchAccount(query)),
});

const Account = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountContainer);

export default Account;

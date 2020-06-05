import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {login, patchUser} from '~app/redux';

import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
import {SecurityComponent} from './Component';

class SecurityContainer extends PureComponent<tContainerProps, tState> {
  state ={
    disableOtp: false,
    error: '',
    token: '',
  }

  save = async () => {
    const {patchUserDispatch, sessionThunk} = this.props;
    const {profile} = sessionThunk.data;

    if (profile.id) {
      try {
        await patchUserDispatch({
          ...this.state,
          id: profile.id,
          otpSecret: sessionThunk?.data?.qr?.secret,
        });
      } catch (err) {
        return this.setState({
          error: err.message,
        });
      }
    }

    // TODO just use action, no thunk needed
    // update current session to reflect new settings
    // try {
    //   await loginDispatch({
    //     username: login,
    //     password: this.state.password,
    //   });
    // } catch (err) {
    //   loglevel.error(err);
    // }
  }

  updateState = (key: tKeyUnion, value: string | boolean) => {
    let newValue = value;
    if (key === 'disableOtp') {
      newValue = !this.state[key];
    }

    this.setState({
      [key]: newValue,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    const {sessionThunk} = this.props;

    return (
      <SecurityComponent
        {...this.state}
        save={this.save}
        session={sessionThunk.data}
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
  patchUserDispatch: (user: Partial<ts.user>) => dispatch(patchUser(user)),
});

const Security = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SecurityContainer);

export default Security;

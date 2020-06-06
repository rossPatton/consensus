import cx from 'classnames';
import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

// import {ValidateToken} from '~app/components';
import {EmailToken, ErrorBoundary, Template} from '~app/containers';
import {login} from '~app/redux';

import {tContainerProps, tKeyUnion, tState} from './_types';
import {LoginComponent} from './Component';

export class LoginContainer extends PureComponent<tContainerProps, tState> {
  state = {
    email: '',
    emailSent: false,
    error: '',
    // requireOtp: false,
    token: '',
    sessionType: 'user' as 'user' | 'group',
  };

  setType = (sessionType: 'user' | 'group') =>
    this.setState({
      sessionType,
    });

  login = async (email: string) => {
    const { token, sessionType } = this.state;

    // and log them in on success
    let account: ts.session;
    try {
      account = await this.props.loginDispatch({
        email,
        token,
        sessionType,
      });
    } catch (error) {
      return this.setState({
        error: error.message,
      });
    }

    return account;
  }

  // if user logs in with no OTP enabled, just log them in
  // otherwise, it kicks them to the 2FA screen
  // if that code is correct, then log them in
  verifyAndLogin = async (email: string) => {
    await this.login(email);
    this.props.history.push('/admin/meetings');
  }

  updateState = (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    const {sessionType} = this.state;

    return (
      <Template className="bg-community m-auto min-h-halfscreen pb-5 pt-4">
        <ErrorBoundary status={this.props?.session?.error?.status}>
          <ul className="contain-sm flex m-auto">
            <li>
              <button
                onClick={() => this.setType('user')}
                className={cx({
                  'p-2 bg-white border-0 rounded-0 rounded-tl rounded-tr mr-1': true,
                  'bg-gray-3': sessionType === 'group',
                  'pointer-events-none': sessionType === 'user',
                })}>
                User
              </button>
            </li>
            <li>
              <button
                onClick={() => this.setType('group')}
                className={cx({
                  'p-2 bg-white border-0 rounded-0 rounded-tl rounded-tr': true,
                  'bg-gray-3': sessionType === 'user',
                  'pointer-events-none': sessionType === 'group',
                })}>
                Group
              </button>
            </li>
          </ul>
          <div className="bg-white rounded shadow m-auto contain-sm mb-3 p-2 d:p-3">
            <h1 className="mb-1 capitalize">
              {this.state.sessionType} Login
              {/* {requireOtp
                ? `Enter your 2FA code.`
                : `${this.state.sessionType} Login`} */}
            </h1>
            {/* {requireOtp && (
              <ValidateToken
                history={this.props.history}
              />
            )} */}
            {/* {!requireOtp && ( */}
            <EmailToken
              actionLabel="Email Login Token"
              renderOnSend={(email: string) => (
                <LoginComponent
                  {...this.state}
                  email={email}
                  verifyAndLogin={this.verifyAndLogin}
                  updateState={this.updateState}
                />
              )}
            />
            {/* )} */}
          </div>
        </ErrorBoundary>
      </Template>
    );
  }
}

const mapStateToProps = (store: {session: ts.session}) => ({
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: ts.loginQuery) => dispatch(login(query)),
});

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
export default Login;

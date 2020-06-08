import cx from 'classnames';
import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Helmet /* ValidateToken*/} from '~app/components';
import {EmailToken, ErrorBoundary, Template} from '~app/containers';
import {login} from '~app/redux';

import {canonical, description, keywords, title} from './_constants';
import {tContainerProps, tKeyUnion, tState} from './_types';
import {LoginComponent} from './Component';

export class LoginContainer extends PureComponent<tContainerProps, tState> {
  state = {
    email: '',
    emailSent: false,
    error: '',
    // requireOtp: false,
    token: '',
  };


  login = async (email: string) => {
    const { token } = this.state;
    const { type: sessionType = 'user' } = this.props?.match?.params;

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
    const { type = 'user' } = this.props?.match?.params;
    console.log('all props for login page => ', this.props);

    return (
      <Template className="bg-community m-auto min-h-halfscreen pb-5 pt-4">
        <ErrorBoundary status={this.props?.session?.error?.status}>
          <Helmet
            canonical={canonical}
            title={title}
            meta={[
              { name: 'description', content: description },
              { name: 'keywords', content: keywords },
            ]}
          />
          <ul className="contain-sm flex m-auto">
            <li>
              <Link
                to="/login/user"
                className={cx({
                  'block p-1 pl-2 pr-2 rounded-tl rounded-tr mr-1': true,
                  'bg-gray-3': type === 'group',
                  'bg-white pointer-events-none': type === 'user',
                })}>
                User
              </Link>
            </li>
            <li>
              <Link
                to="/login/group"
                className={cx({
                  'block p-1 pl-2 pr-2 rounded-tl rounded-tr': true,
                  'bg-gray-3': type === 'user',
                  'bg-white pointer-events-none': type === 'group',
                })}>
                Group
              </Link>
            </li>
          </ul>
          <div className="bg-white rounded-tr rounded-bl rounded-br shadow m-auto contain-sm mb-3 p-2 d:p-3">
            <h1 className="mb-1 capitalize">
              {type} Login
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
              legend={(<h2 className="text-base font-semibold mb-1">
                Enter your email to get your login code.
              </h2>)}
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

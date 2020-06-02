import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';

import {ErrorBoundary, Template} from '~app/containers';
import {login} from '~app/redux';
import {api} from '~app/utils';

import {EmailTokenComponent} from './_components/EmailToken';
import {VerifyAndLoginComponent} from './_components/VerifyAndLogin';
import {tContainerProps, tKeyUnion, tState} from './_types';

export class LoginContainer extends PureComponent<tContainerProps, tState> {
  state = {
    email: '',
    emailSent: false,
    error: '',
    token: '',
    type: 'user' as 'user' | 'group',
  };

  sendToken = async () => {
    try {
      await api({
        path: '/email/v1/sendVerificationToken',
        query: {
          email: this.state.email,
          type: 'user',
        },
      });
    } catch (error) {
      return this.setState({
        error: error.message,
      });
    }

    this.setState({
      emailSent: true,
    });
  }

  setType = (type: 'user' | 'group') =>
    this.setState({
      type,
    });

  verifyAndLogin = async () => {
    const { email, token } = this.state;

    // and log them in on success
    try {
      await this.props.loginDispatch({ email, token });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }

    this.props.history.push('/admin/meetings');
  }

  updateState = (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    const {emailSent, type} = this.state;

    return (
      <Template className="bg-community m-auto min-h-halfscreen pb-5 pt-4">
        <ErrorBoundary status={this.props?.session?.error?.status}>
          <ul className='contain-sm flex m-auto'>
            <li>
              <button
                onClick={() => this.setType('user')}
                className={cx({
                  'p-2 bg-white border-0 rounded-0 rounded-tl rounded-tr mr-1': true,
                  'bg-gray-3': type === 'group',
                  'pointer-events-none': type === 'user',
                })}>
                User
              </button>
            </li>
            <li>
              <button
                onClick={() => this.setType('group')}
                className={cx({
                  'p-2 bg-white border-0 rounded-0 rounded-tl rounded-tr': true,
                  'bg-gray-3': type === 'user',
                  'pointer-events-none': type === 'group',
                })}>
                Group
              </button>
            </li>
          </ul>
          <div className="bg-white rounded shadow m-auto contain-sm mb-3 p-2 d:p-3">
            {!emailSent && (
              <EmailTokenComponent
                {...this.state}
                sendToken={this.sendToken}
                updateState={this.updateState}
              />
            )}
            {emailSent && (
              <VerifyAndLoginComponent
                {...this.state}
                verifyAndLogin={this.verifyAndLogin}
                updateState={this.updateState}
              />
            )}
          </div>
        </ErrorBoundary>
      </Template>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: ts.loginQuery) => dispatch(login(query)),
});

const Login = connect(null, mapDispatchToProps)(LoginContainer);
export default Login;

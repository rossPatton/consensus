import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {ErrorBoundary, Template} from '~app/containers';
import {login} from '~app/redux';
import {api} from '~app/utils';

import {canonical, description, keywords, title} from './_constants';
import {EmailTokenComponent, ResetLoginComponent} from './_subpages';
import {tContainerProps, tState, tStateUnion, tStore} from './_types';

class LoginResetContainer extends PureComponent<tContainerProps, tState> {
  state = {
    email: '',
    hasMounted: false,
    login: '',
    password: '',
    passwordUpdated: false,
    token: '',
  };

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      hasMounted: true,
    });
  }

  resetLoginByEmail = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      await api({
        method: 'PATCH',
        path: '/email/v1/resetLoginByEmail',
        query: {
          login: this.state.login,
          password: this.state.password,
          token: this.state.token,
        },
      });
    } catch (err) {
      return loglevel.error(err);
    }

    try {
      await this.props.loginDispatch({
        password: this.state.password,
        username: this.state.login,
      });
    } catch (err) {
      return loglevel.error(err);
    }

    this.props.history.push('/admin/account');
  }

  sendLoginResetEmail = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      await api({
        path: '/email/v1/emailLoginResetToken',
        query: {email: this.state.email},
      });
    } catch (err) {
      return loglevel.error(err);
    }

    this.props.history.push('/login-reset/enterCode');
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
      passwordUpdated: false,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const enterCode = this.props?.match?.params?.section;

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
          {this.state.passwordUpdated && (
            <div className="w-full p-2 mb-2 text-center bg-green-1 font-bold text-sm">
              Your password has been updated!
            </div>
          )}
          <div className="bg-white rounded shadow m-auto contain-sm mb-3 p-2 d:p-3">
            {enterCode && (
              <ResetLoginComponent
                {...this.state}
                resetLoginByEmail={this.resetLoginByEmail}
                sendLoginResetEmail={this.sendLoginResetEmail}
                updateState={this.updateState}
              />
            )}
            {!enterCode && (
              <EmailTokenComponent
                {...this.state}
                resetLoginByEmail={this.resetLoginByEmail}
                sendLoginResetEmail={this.sendLoginResetEmail}
                updateState={this.updateState}
              />
            )}
          </div>
        </ErrorBoundary>
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: ts.loginQuery) => dispatch(login(query)),
});

const LoginReset = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginResetContainer);

export default LoginReset;

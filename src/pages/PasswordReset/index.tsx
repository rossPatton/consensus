import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {ErrorBoundary, Template} from '~app/containers';
import {login} from '~app/redux';
import {api} from '~app/utils';

import {canonical, description, keywords, title} from './_constants';
import {EmailTokenComponent, ResetPasswordComponent} from './_subpages';
import {tContainerProps, tState, tStateUnion, tStore} from './_types';

class PasswordResetContainer extends PureComponent<tContainerProps, tState> {
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

  resetPasswordByEmail = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    api({
      method: 'PATCH',
      path: '/email/v1/resetPasswordByEmail',
      query: {
        login: this.state.login,
        password: this.state.password,
        token: this.state.token,
      },
    })
      .then(() => {
        return this.props.loginDispatch({
          password: this.state.password,
          username: this.state.login,
        });
      })
      .then(res => {
        if (res.type === '@@auth/v1/LOGIN_SUCCESS') {
          this.setState({
            email: '',
            login: '',
            password: '',
            token: '',
            passwordUpdated: true,
          });
        }

        return null;
      })
      .catch(loglevel.error);
  }

  sendPasswordResetEmail = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    api({
      path: '/email/v1/emailResetToken',
      query: {email: this.state.email},
    })
      .then(() => this.props.history.push('/password-reset/enterCode'))
      .catch(loglevel.error);
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
      <Template>
        <ErrorBoundary status={this.props?.session?.error?.status}>
          <Helmet
            canonical={canonical}
            title={title}
            meta={[
              { name: 'description', content: description },
              { name: 'keywords', content: keywords },
              { property: 'og:title', content: title },
              { property: 'og:description', content: description },
            ]}
          />
          {this.state.passwordUpdated && (
            <div className="w-full p-2 mb-2 text-center bg-green-1 font-bold text-sm">
            Your password has been updated!
            </div>
          )}
          {enterCode && (
            <ResetPasswordComponent
              {...this.state}
              resetPasswordByEmail={this.resetPasswordByEmail}
              updateState={this.updateState}
            />
          )}
          {!enterCode && (
            <EmailTokenComponent
              {...this.state}
              sendPasswordResetEmail={this.sendPasswordResetEmail}
              updateState={this.updateState}
            />
          )}
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

const PasswordReset = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordResetContainer);

export default PasswordReset;

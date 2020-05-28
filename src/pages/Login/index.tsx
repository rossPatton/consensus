import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader, Template} from '~app/containers';
import {login} from '~app/redux';

import {canonical, description, keywords, title} from './_constants';
import {tContainerProps, tState, tStateUnion, tStore} from './_types';
import {LoginComponent} from './Component';

class LoginContainer extends PureComponent<tContainerProps, tState> {
  state = {
    hasMounted: false,
    password: '',
    token: '',
    username: '', // actually login in the DB, but passportjs expects 'username'
  };

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      hasMounted: true,
    });
  }

  handleVerificationSuccess = (token: string) => {
    this.setState({
      token,
    });
  }

  login = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {username, password, token} = this.state;
    return this.props.loginDispatch({username, password, token});
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const {session} = this.props;
    const error = session?.error?.message;

    return (
      <Template>
        <ErrorBoundary status={session?.error?.status}>
          <Helmet
            canonical={canonical}
            title={title}
            meta={[
              { name: 'description', content: description },
              { name: 'keywords', content: keywords },
            ]}
          />
          <GenericLoader
            isLoading={session.isLoading}
            render={() => (
              <>
                {session.data.isAuthenticated && (
                  <Redirect to="/admin/meetings" />
                )}
                {!session.data.isAuthenticated && (
                  <LoginComponent
                    {...this.state}
                    // if theres a login error, it'll show up here
                    error={error}
                    handleVerificationSuccess={this.handleVerificationSuccess}
                    login={this.login}
                    updateState={this.updateState}
                  />
                )}
              </>
            )}
          />
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

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
export default Login;

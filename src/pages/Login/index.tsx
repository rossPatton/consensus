import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getRoles, login} from '../../redux';
import {canonical, description, keywords, title} from './_constants';
import {tContainerProps, tState, tStateUnion, tStore} from './_types';
import {LoginComponent} from './Component';

class LoginContainer extends PureComponent<tContainerProps, tState> {
  state = {
    isClient: false,
    password: '',
    username: '', // actually login in the DB, but passportjs expects 'username'
  };

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      isClient: true,
    });
  }

  login = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {username, password} = this.state;
    return this.props
      .login({username, password})
      .then(res => {
        if (res.payload.orgId) return null;
        return this.props.getRoles();
      })
      .catch(loglevel.error);
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const {session} = this.props;

    return (
      <ErrorBoundary status={_.get(session, 'error.status', 200)}>
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
        {session.data.isAuthenticated && (
          <Redirect to="/admin/profile" />
        )}
        {!session.data.isAuthenticated && (
          <LoginComponent
            {...this.state}
            login={this.login}
            updateState={this.updateState}
          />
        )}
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  login: (query: tLoginQuery) => dispatch(login(query)),
  getRoles: () => dispatch(getRoles()),
});

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
export default Login;

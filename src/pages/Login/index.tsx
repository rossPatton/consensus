import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getRoles, login} from '../../redux';
import {tContainerProps, tState, tStateUnion} from './_types';
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
      // @ts-ignore
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
      <ErrorBoundary>
        <Helmet
          canonical=""
          title=""
          meta={[
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { property: 'og:title', content: '' },
            { property: 'og:description', content: '' },
          ]}
        />
        {session.isAuthenticated && (
          <Redirect to="/admin/profile" />
        )}
        {!session.isAuthenticated && (
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

const mapStateToProps = (store: {session: tThunk<tSession>}) => ({
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  login: (query: tLogin) => dispatch(login(query)),
  getRoles: () => dispatch(getRoles()),
});

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
export default Login;

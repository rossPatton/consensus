import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Dispatch} from 'redux';

import {Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {authenticateSession, getRoles} from '../../redux';
import {tProps, tState, tStateUnion} from './_types';
import {LoginComponent} from './Component';

export class LoginContainer extends PureComponent<tProps, tState> {
  state = {
    isClient: false,
    oLogin: '',
    oPassword: '',
    uLogin: '',
    uPassword: '',
  };

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      isClient: true,
    });
  }

  // TODO is it safe to login on the client like this?

  userLogin = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {uLogin: username, uPassword: password} = this.state;
    return this.props
      .authenticateSession({username, password})
      // @ts-ignore
      .then(res => this.props.getRoles({id: res.payload.id as number}))
      .catch(console.error);
  }

  orgLogin = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {oLogin: username, oPassword: password} = this.state;
    return this.props.authenticateSession({username, password});
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
            userLogin={this.userLogin}
            orgLogin={this.orgLogin}
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

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  authenticateSession: (login: tLogin) => dispatch(authenticateSession(login)),
  getRoles: (query: any) => dispatch(getRoles(query)),
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

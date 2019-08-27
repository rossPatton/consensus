import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';

import { Helmet } from '../../components';
import { authenticateSession } from '../../redux';
import { tProps, tState, tStateUnion } from './_types';
import { LoginComponent } from './Component';

export class LoginContainer extends Component<tProps, tState> {
  state = {
    isClient: false,
    password: '',
    username: '',
  };

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      isClient: true,
    });
  }

  login = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { username, password } = this.state;
    return this.props.authenticateSession({username, password});
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const { session } = this.props;

    return (
      <>
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
        {session.isAuthenticated && <Redirect to="/admin" />}
        {!session.isAuthenticated && (
          <LoginComponent
            {...this.state}
            login={this.login}
            updateState={this.updateState}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: {session: tThunk<tSession>}) => ({
  session: state.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  authenticateSession: (login: tLogin) => dispatch(authenticateSession(login)),
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

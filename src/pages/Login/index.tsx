import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { authenticateSuccess } from '../../redux/async/session/actions';
import { authenticateSession, setActiveSession } from '../../redux';
import { Helmet } from '../../components';
import { tProps, tState } from './_types';
import { LoginComponent } from './Component';

export class LoginContainer extends Component<tProps, tState> {
  state = {
    email: '',
    fname: '',
    lname: '',
    password: '',
    username: '',
  };

  login = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { username, password } = this.state;
    const { authenticateSession, setActiveSession } = this.props;

    const session = await authenticateSession({username, password});
    if (session.payload && session.type === 'AUTHENTICATE_USER_SUCCESS') {
      authenticateSuccess(session.payload);
    }

    // setActiveSession(session.payload);
  }

  updateEmail = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: ev.currentTarget.value,
    });
  }

  updatePassword = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: ev.currentTarget.value,
    });
  }

  updateUsername = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: ev.currentTarget.value,
    });
  }

  updateFname = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      fname: ev.currentTarget.value,
    });
  }

  updateLname = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      lname: ev.currentTarget.value,
    });
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
            updateEmail={this.updateEmail}
            updatePassword={this.updatePassword}
            updateUsername={this.updateUsername}
            updateFname={this.updateFname}
            updateLname={this.updateLname}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: {session: tSession}) => ({session: state.session});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  authenticateSession: (login: tLogin) => dispatch(authenticateSession(login)),
  setActiveSession: (user: tUser) => dispatch(setActiveSession(user)),
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { authenticateSession, registerUser, setActiveSession } from '../../redux';
import { Helmet } from '../../components';
import { tContainerProps, tState, tStore } from './_types';
import { SignupComponent } from './Signup';

export class SignupContainer extends PureComponent<tContainerProps, tState> {
  state = {
    email: '',
    fname: '',
    lname: '',
    password: '',
    username: '',
  };

  register = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const { username, password } = this.state;

    // add user to db, and log them in on success
    await this.props.insertUser(this.state);
    const session = await this.props.authenticateSession({username, password});
    this.props.setActiveSession(session.payload);
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
          <SignupComponent
            {...this.props}
            {...this.state}
            register={this.register}
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

const mapStateToProps = (state: tStore) => ({ session: state.session });

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  authenticateSession: (login: tLogin) => dispatch(authenticateSession(login)),
  insertUser: (user: tState) => dispatch(registerUser(user)),
  setActiveSession: (user: tSession) => dispatch(setActiveSession(user)),
});

export const Signup = connect(mapStateToProps, mapDispatchToProps)(SignupContainer);

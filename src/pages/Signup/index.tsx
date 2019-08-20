import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { isValidEmail } from '../../utils';
import { authenticateSession, registerUser } from '../../redux';
import { Helmet } from '../../components';
import { tContainerProps, tForm, tState, tStateUnion, tStore } from './_types';
import { SignupComponent } from './Component';

export class SignupContainer extends PureComponent<tContainerProps, tState> {
  state = {
    email: '',
    errors: [],
    fname: '',
    lname: '',
    password: '',
    showPW: false,
    username: '',
  };

  checkErrors = (): string[] => {
    let errors = [] as string[];
    const {email, password} = this.state;

    console.log('password.length => ', password.length);

    if (password.length < 12) {
      errors = ['Password must be at least 12 characters'];
    }

    if (!isValidEmail(email)) {
      errors = [...errors, 'Email address must be valid'];
    }

    console.log('errors ? ', errors);

    this.setState({
      errors,
    });

    return errors;
  }

  register = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // errors and showPW are client-side only
    const { errors, showPW, ...state } = this.state;

    // add user to db, and log them in on success
    await this.props.insertUser(state);

    const { username, password } = this.state;
    return this.props.authenticateSession({username, password});
  }

  togglePWVisibility = () => {
    this.setState({
      showPW: !this.state.showPW,
    });
  }

  updateState = (stateKey: tStateUnion, ev: any) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>, this.checkErrors);
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
            togglePWVisibility={this.togglePWVisibility}
            updateState={this.updateState}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: tStore) => ({session: state.session.data});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  authenticateSession: (login: tLogin) => dispatch(authenticateSession(login)),
  insertUser: (user: tForm) => dispatch(registerUser(user)),
});

export const Signup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupContainer);

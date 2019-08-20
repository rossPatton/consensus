import _ from 'lodash';
import React, { PureComponent } from 'react';
import commonPasswordList from 'fxa-common-password-list';
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
    errors: {},
    password: '',
    username: '',
  };

  checkErrors = (): object => {
    const {email, password: pw} = this.state;

    let pwArr = [] as string[];
    if (pw.length > 0 && pw.length < 12) {
      pwArr = [...pwArr, 'Password must be at least 12 characters'];
    }

    if (commonPasswordList.test(pw) || pw === 'correct_horse_battery_staple') {
      pwArr = [...pwArr, 'Please choose a less common password'];
    }


    let emailArr = [] as string[];
    if (email.length > 0 && !isValidEmail(email)) {
      emailArr = ['Email address must be valid'];
    }

    const errors = {
      email: emailArr,
      password: pwArr,
    };

    this.setState({errors});
    return errors;
  }

  register = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // errors and showPW are client-side only
    const { errors, ...state } = this.state;

    // add user to db, and log them in on success
    await this.props.registerUser(state);

    const { username, password } = this.state;
    return this.props.authenticateSession({username, password});
  }

  updateState = (stateKey: tStateUnion, ev: any) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>, this.checkErrors);
  }

  render() {
    const { session } = this.props;
    const { email, errors, password, username } = this.state;
    const errArr = _.flatten(Object.values(errors as string[]));
    const disabled = !email
      || !password
      || !username
      || errArr.length > 0;

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
            disabled={disabled}
            errArr={errArr}
            register={this.register}
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
  registerUser: (user: tForm) => dispatch(registerUser(user)),
});

export const Signup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupContainer);

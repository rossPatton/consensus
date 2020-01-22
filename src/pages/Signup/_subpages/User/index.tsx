import commonPasswordList from 'fxa-common-password-list';
import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {login, registerUser} from '../../../../redux';
import {isValidEmail} from '../../../../utils';
import {tContainerProps, tState, tStateUnion} from './_types';
import {UserSignupComponent} from './Component';

export class UserSignupContainer extends PureComponent<tContainerProps, tState> {
  state = {
    isClient: false,
    email: '',
    errors: {},
    login: '',
    username: '',
    password: '',
  };

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      isClient: true,
    });
  }

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
    const { errors, isClient, ...state } = this.state;

    // add user to db, and log them in on success
    await this.props.registerUser(state);

    const {login, password} = this.state;

    // has to be called username here, or passport will fail with no err
    return this.props.authenticateSession({username: login, password});
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>, this.checkErrors);
  }

  render() {
    const { email, errors, isClient, password, username } = this.state;
    const errArr = _.flatten(Object.values(errors as string[]));
    const disabled = isClient &&
      (!email || !password || !username || errArr.length > 0);

    return (
      <UserSignupComponent
        {...this.props}
        {...this.state}
        disabled={disabled}
        errArr={errArr}
        register={this.register}
        updateState={this.updateState}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  authenticateSession: (query: tLogin) => dispatch(login(query)),
  registerUser: (user: tUserSignupForm) => dispatch(registerUser(user)),
});

export const UserSignup = connect(
  null,
  mapDispatchToProps,
)(UserSignupContainer);

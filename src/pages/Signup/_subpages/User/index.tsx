import {login, postUser} from '@app/redux';
import commonPasswordList from 'fxa-common-password-list';
import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {tContainerProps, tKeyUnion, tPostUserQuery, tState} from './_types';
import {UserSignupComponent} from './Component';

export class UserSignupContainer extends PureComponent<tContainerProps, tState> {
  state = {
    hasMounted: false,
    errors: {},
    login: '',
    password: '',
  };

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      hasMounted: true,
    });
  }

  checkErrors = (): object => {
    const {password: pw} = this.state;

    let pwArr = [] as string[];
    if (pw.length > 0 && pw.length < 12) {
      pwArr = [...pwArr, 'Password must be at least 12 characters'];
    }

    if (commonPasswordList.test(pw) || pw === 'correct_horse_battery_staple') {
      pwArr = [...pwArr, 'Please choose a less common password'];
    }

    const errors = {password: pwArr};
    this.setState({errors});
    return errors;
  }

  register = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // errors and showPW are client-side only
    const { errors, hasMounted, ...state } = this.state;

    // add user to db, and log them in on success
    await this.props.postUserDispatch(state);

    const {login, password} = this.state;
    return this.props.loginDispatch({username: login, password});
  }

  updateState = (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tKeyUnion>, this.checkErrors);
  }

  render() {
    const { errors } = this.state;
    const errArr = _.flatten(Object.values(errors as string[]));

    return (
      <UserSignupComponent
        {...this.props}
        {...this.state}
        errArr={errArr}
        register={this.register}
        updateState={this.updateState}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: tLoginQuery) => dispatch(login(query)),
  postUserDispatch: (user: tPostUserQuery) => dispatch(postUser(user)),
});

export const UserSignup = connect(
  null,
  mapDispatchToProps,
)(UserSignupContainer);

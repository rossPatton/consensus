import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {login, postUser} from '~app/redux';

import {tContainerProps, tKeyUnion, tPostUserQuery, tState} from './_types';
import {UserSignupComponent} from './Component';

export class UserSignupContainer extends PureComponent<tContainerProps, tState> {
  state = {
    email: '',
    error: '',
    login: '',
    password: '',
    username: '',
  };

  register = async () => {
    const { email, login, password, username } = this.state;

    // add user to db, and log them in on success
    try {
      await this.props.postUserDispatch({ email, login, password, username });
    } catch (error) {
      this.setState({
        error,
      });
    }

    // return this.props.loginDispatch({username: login, password});
  }

  updateState = (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    return (
      <>
        <Helmet
          canonical="/signup/newUser"
          title="Create a new Consensus account"
          meta={[
            { name: 'description', content: 'Fill our our signup form and start connecting with groups in your area today!' },
            { name: 'keywords', content: 'user,signup' },
          ]}
        />
        <UserSignupComponent
          {...this.props}
          {...this.state}
          register={this.register}
          updateState={this.updateState}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: ts.loginQuery) => dispatch(login(query)),
  postUserDispatch: (user: tPostUserQuery) => dispatch(postUser(user)),
});

export const UserSignup = connect(null, mapDispatchToProps)(UserSignupContainer);
